-- Apply to the actual application database before deploying the new server.
-- Original tables and snapshots remain intact for migration verification.
begin;

create table if not exists public.project_records (
  id text primary key,
  project_id uuid,
  version_id uuid not null default gen_random_uuid(),
  owner_id text not null,
  name text not null,
  scope text not null check (scope in ('personal', 'team')),
  group_id text references public.collaboration_groups(id),
  snapshot_json jsonb not null check (jsonb_typeof(snapshot_json) = 'object'),
  revision bigint not null default 1 check (revision > 0),
  saved_by text not null,
  created_at timestamptz not null default clock_timestamp(),
  updated_at timestamptz not null default clock_timestamp(),
  deleted_at timestamptz,
  migration_issue text,
  check ((scope = 'personal' and group_id is null) or (scope = 'team' and group_id is not null))
);
create table if not exists public.project_save_receipts (
  user_id text not null,
  operation_id uuid not null,
  record_id text not null references public.project_records(id),
  input_hash text not null,
  result_json jsonb not null,
  created_at timestamptz not null default clock_timestamp(),
  primary key (user_id, operation_id)
);
create index if not exists project_records_personal_page_idx
  on public.project_records(owner_id, updated_at desc, id desc)
  where deleted_at is null and scope = 'personal';
create index if not exists project_records_team_page_idx
  on public.project_records(group_id, updated_at desc, id desc)
  where deleted_at is null and scope = 'team';
create index if not exists project_records_page_idx
  on public.project_records(updated_at desc, id desc) where deleted_at is null;
create index if not exists project_records_legacy_idx on public.project_records(project_id);

alter table public.project_records enable row level security;
alter table public.project_save_receipts enable row level security;
revoke all on public.project_records, public.project_save_receipts from anon, authenticated;
grant select, insert, update on public.project_records, public.project_save_receipts to service_role;

create or replace function public.valid_project_snapshot(p_snapshot jsonb)
returns boolean language plpgsql immutable set search_path = public as $$
begin
  if jsonb_typeof(p_snapshot) is distinct from 'object'
    or jsonb_typeof(p_snapshot #> '{editor,pages}') is distinct from 'array'
    or coalesce(p_snapshot->>'schemaVersion', '') !~ '^[1-9][0-9]*$'
    or p_snapshot->>'savedAt' is null then return false; end if;
  perform (p_snapshot->>'savedAt')::timestamptz;
  return true;
exception when others then return false;
end;
$$;

-- Pick the newer complete snapshot when the old stores disagree. Never rewrite
-- the old snapshots. Invalid records migrate with a visible issue, not a failure.
insert into public.project_records
  (id,project_id,version_id,owner_id,name,scope,group_id,snapshot_json,saved_by,
   created_at,updated_at,deleted_at,migration_issue)
select r.id,r.project_id,coalesce(p.latest_version_id,gen_random_uuid()),r.owner_id,
  case when p.updated_at > r.updated_at and public.valid_project_snapshot(v.snapshot_json)
    then p.name else r.name end,
  r.scope,r.group_id,
  case when p.updated_at > r.updated_at and public.valid_project_snapshot(v.snapshot_json)
    then v.snapshot_json else r.snapshot_json end,
  r.owner_id,r.created_at,greatest(r.updated_at,p.updated_at),p.deleted_at,
  case when not public.valid_project_snapshot(r.snapshot_json)
    and not (p.updated_at > r.updated_at and public.valid_project_snapshot(v.snapshot_json))
    then 'INVALID_LEGACY_SNAPSHOT' else null end
from public.collaboration_records r
left join public.projects p on p.id=r.project_id
left join public.project_versions v on v.id=p.latest_version_id
on conflict (id) do nothing;

-- Includes missing collaboration rows and deleted project IDs as tombstones.
insert into public.project_records
  (id,project_id,version_id,owner_id,name,scope,snapshot_json,saved_by,
   created_at,updated_at,deleted_at,migration_issue)
select p.id::text,p.id,coalesce(p.latest_version_id,gen_random_uuid()),p.owner_id,p.name,
  'personal',coalesce(v.snapshot_json,'{}'::jsonb),p.owner_id,
  p.created_at,p.updated_at,p.deleted_at,
  case when not public.valid_project_snapshot(v.snapshot_json) then 'INVALID_LEGACY_SNAPSHOT' else null end
from public.projects p left join public.project_versions v on v.id=p.latest_version_id
where not exists (select 1 from public.project_records r where r.project_id=p.id)
on conflict (id) do nothing;

create or replace function public.project_record_summary(p_record public.project_records)
returns jsonb language sql immutable set search_path = public as $$
  select to_jsonb(p_record) - 'snapshot_json' - 'deleted_at';
$$;

create or replace function public.write_project_record(
  p_user_id text, p_record_id text, p_input jsonb, p_is_admin boolean default false
) returns jsonb language plpgsql set search_path = public as $$
declare
  v_id text := coalesce(nullif(p_record_id,''),gen_random_uuid()::text);
  v_operation uuid := (p_input->>'operationId')::uuid;
  v_hash text := md5((jsonb_build_object('recordId',p_record_id,'input',p_input-'operationId'))::text);
  v_record public.project_records%rowtype;
  v_receipt public.project_save_receipts%rowtype;
  v_exists boolean;
  v_snapshot jsonb := p_input->'snapshot';
  v_create boolean := p_record_id is null or coalesce((p_input->>'create')::boolean,false);
  v_scope text;
  v_group text;
  v_time timestamptz;
  v_result jsonb;
begin
  if nullif(p_user_id,'') is null or v_operation is null then raise exception 'INVALID_OPERATION'; end if;
  -- Retry lock first, then a lock for this record only (also protects first create).
  perform pg_advisory_xact_lock(hashtextextended('project-operation:'||p_user_id||':'||v_operation::text,0));
  select * into v_receipt from public.project_save_receipts
    where user_id=p_user_id and operation_id=v_operation;
  if found then
    if v_receipt.input_hash <> v_hash then raise exception 'OPERATION_MISMATCH'; end if;
    perform pg_advisory_xact_lock(hashtextextended('project-record:'||v_receipt.record_id,0));
    select * into v_record from public.project_records where id=v_receipt.record_id for update;
    if not found or v_record.deleted_at is not null then raise exception 'RECORD_NOT_FOUND'; end if;
    if v_record.scope='personal' and v_record.owner_id<>p_user_id and not p_is_admin then
      raise exception 'RECORD_FORBIDDEN';
    end if;
    return v_receipt.result_json || jsonb_build_object('replayed',true);
  end if;
  if length(v_id)>160 or v_id !~ '^[a-zA-Z0-9_-]+$' then raise exception 'INVALID_OPERATION'; end if;
  if not public.valid_project_snapshot(v_snapshot) or nullif(btrim(p_input->>'name'),'') is null
    or length(p_input->>'name')>120 then raise exception 'INVALID_SNAPSHOT'; end if;

  perform pg_advisory_xact_lock(hashtextextended('project-record:'||v_id,0));
  select * into v_record from public.project_records where id=v_id for update;
  v_exists := found;
  if v_exists then
    if v_record.deleted_at is not null then raise exception 'RECORD_NOT_FOUND'; end if;
    if v_record.scope='personal' and v_record.owner_id<>p_user_id and not p_is_admin then
      raise exception 'RECORD_FORBIDDEN';
    end if;
    -- A create for an already used ID is not an overwrite. A retried successful
    -- create was handled by its receipt above.
    if v_create then raise exception 'RECORD_EXISTS'; end if;
    v_scope := v_record.scope;
    v_group := v_record.group_id;
    if (p_input ? 'scope' and p_input->>'scope' is distinct from v_scope)
      or (p_input ? 'teamId' and nullif(p_input->>'teamId','') is distinct from v_group)
      then raise exception 'DESTINATION_MISMATCH'; end if;
  else
    if not v_create then raise exception 'RECORD_NOT_FOUND'; end if;
    v_scope := coalesce(p_input->>'scope','personal');
    v_group := case when v_scope='team' then nullif(p_input->>'teamId','') else null end;
    if v_scope not in ('personal','team') then raise exception 'INVALID_SNAPSHOT'; end if;
    if v_scope='team' and not exists (select 1 from public.collaboration_groups where id=v_group)
      then raise exception 'INVALID_GROUP'; end if;
  end if;
  v_time := clock_timestamp();
  if v_exists then
    -- Clock ordering is not the conflict rule; revision follows commit order.
    v_time := greatest(v_time,v_record.updated_at + interval '1 microsecond');
    update public.project_records set name=p_input->>'name',snapshot_json=v_snapshot,
      revision=revision+1,saved_by=p_user_id,updated_at=v_time,migration_issue=null
      where id=v_id returning * into v_record;
  else
    insert into public.project_records
      (id,owner_id,name,scope,group_id,snapshot_json,saved_by,created_at,updated_at)
      values (v_id,p_user_id,p_input->>'name',v_scope,v_group,v_snapshot,p_user_id,v_time,v_time)
      returning * into v_record;
  end if;
  v_result := jsonb_build_object('record',public.project_record_summary(v_record),'replayed',false);
  insert into public.project_save_receipts(user_id,operation_id,record_id,input_hash,result_json)
    values(p_user_id,v_operation,v_id,v_hash,v_result);
  return v_result;
end;
$$;

create or replace function public.delete_project_record(
  p_user_id text, p_record_id text, p_is_admin boolean default false
) returns void language plpgsql set search_path = public as $$
declare v_record public.project_records%rowtype;
begin
  perform pg_advisory_xact_lock(hashtextextended('project-record:'||p_record_id,0));
  select * into v_record from public.project_records where id=p_record_id for update;
  if not found then raise exception 'RECORD_NOT_FOUND'; end if;
  if v_record.scope='personal' and v_record.owner_id<>p_user_id and not p_is_admin then
    raise exception 'RECORD_FORBIDDEN';
  end if;
  if v_record.deleted_at is null then
    update public.project_records set deleted_at=clock_timestamp(),updated_at=clock_timestamp(),
      revision=revision+1 where id=p_record_id;
  end if;
end;
$$;

-- Compatibility for currently deployed callers. All writes go to one record.
create or replace function public.write_history_project_compact(
  p_owner_id text,p_project_id uuid,p_input jsonb
) returns jsonb language plpgsql set search_path = public as $$
declare v_result jsonb; v_record public.project_records%rowtype;
begin
  v_result := public.write_project_record(p_owner_id,p_project_id::text,
    p_input || jsonb_build_object('operationId',coalesce(p_input->>'operationId',gen_random_uuid()::text)));
  select * into v_record from jsonb_populate_record(null::public.project_records,v_result->'record');
  return jsonb_build_object(
    'project',jsonb_build_object('id',v_record.id,'name',v_record.name,
      'prd_url',coalesce(p_input #>> '{snapshot,source,prdUrl}',''),
      'template_id',coalesce(p_input #>> '{snapshot,editor,currentTemplateId}',''),
      'latest_version_id',v_record.version_id,'created_at',v_record.created_at,
      'updated_at',v_record.updated_at,'revision',v_record.revision),
    'version',jsonb_build_object('id',v_record.version_id,'project_id',v_record.id,
      'version_no',v_record.revision,'save_type','manual',
      'schema_version',p_input #> '{snapshot,schemaVersion}',
      'app_version',coalesce(p_input #>> '{snapshot,appVersion}',''),
      'created_at',v_record.updated_at),'replayed',v_result->'replayed');
end;
$$;

create or replace function public.sync_collaboration_changes_compact(
  p_user_id text,p_state jsonb,p_is_admin boolean
) returns jsonb language plpgsql set search_path = public as $$
declare v_item jsonb; v_group public.collaboration_groups%rowtype; v_result jsonb;
  v_records jsonb := '[]'::jsonb; v_create boolean;
begin
  for v_item in select value from jsonb_array_elements(p_state->'users') order by value->>'id' loop
    if not p_is_admin and v_item->>'id'<>p_user_id then continue; end if;
    insert into public.app_users(id,name,avatar_url) values
      (v_item->>'id',v_item->>'name',coalesce(v_item->>'avatarUrl',''))
      on conflict(id) do update set name=excluded.name,avatar_url=excluded.avatar_url,updated_at=clock_timestamp();
  end loop;
  for v_item in select value from jsonb_array_elements(p_state->'teams') order by value->>'id' loop
    perform pg_advisory_xact_lock(hashtextextended('project-group:'||(v_item->>'id'),0));
    select * into v_group from public.collaboration_groups where id=v_item->>'id' for update;
    if found then
      if v_group.name=v_item->>'name' then continue; end if;
      if (v_item->>'baseUpdatedAt')::timestamptz is distinct from v_group.updated_at then
        raise exception 'VERSION_CONFLICT'; end if;
      update public.collaboration_groups set name=v_item->>'name',updated_at=clock_timestamp() where id=v_group.id;
    else
      insert into public.collaboration_groups(id,name,created_by)
        values(v_item->>'id',v_item->>'name',p_user_id);
    end if;
  end loop;
  -- Process record IDs in the same order for all legacy batches.
  -- Canonical client saves never use this batch entry point.
  for v_item in select value from jsonb_array_elements(p_state->'records') order by value->>'id' loop
    v_create := not exists(select 1 from public.project_records where id=v_item->>'id')
      and nullif(v_item->>'projectId','') is null and nullif(v_item->>'baseUpdatedAt','') is null;
    v_result := public.write_project_record(p_user_id,v_item->>'id',
      v_item || jsonb_build_object('create',v_create,
        'operationId',coalesce(v_item->>'operationId',gen_random_uuid()::text)),p_is_admin);
    v_records := v_records || jsonb_build_array(v_result->'record');
  end loop;
  return jsonb_build_object(
    'users',(select coalesce(jsonb_agg(to_jsonb(u)),'[]'::jsonb) from public.app_users u
      where (p_is_admin or u.id=p_user_id)
        and u.id in (select value->>'id' from jsonb_array_elements(p_state->'users'))),
    'teams',(select coalesce(jsonb_agg(to_jsonb(g)),'[]'::jsonb) from public.collaboration_groups g
      where g.id in (select value->>'id' from jsonb_array_elements(p_state->'teams'))),
    'records',v_records);
end;
$$;

create or replace function public.write_history_project(
  p_owner_id text,p_project_id uuid,p_input jsonb
) returns jsonb language sql set search_path=public as $$
  select public.write_history_project_compact(p_owner_id,p_project_id,p_input);
$$;
create or replace function public.sync_collaboration_changes(
  p_user_id text,p_state jsonb,p_is_admin boolean
) returns jsonb language sql set search_path=public as $$
  select public.sync_collaboration_changes_compact(p_user_id,p_state,p_is_admin);
$$;

-- Old direct project delete/create functions still feed the canonical record;
-- new writes do not feed back into (or overwrite) the preserved legacy tables.
create or replace function public.sync_project_collaboration_record()
returns trigger language plpgsql set search_path = public as $$
declare v_snapshot jsonb; v_record_id text; v_result jsonb;
begin
  select id into v_record_id from public.project_records where project_id=new.id limit 1;
  if new.deleted_at is not null then
    if v_record_id is not null then perform public.delete_project_record(new.owner_id,v_record_id,true); end if;
    return new;
  end if;
  select snapshot_json into v_snapshot from public.project_versions where id=new.latest_version_id;
  if not public.valid_project_snapshot(v_snapshot) then return new; end if;
  v_result := public.write_project_record(new.owner_id,coalesce(v_record_id,new.id::text),
    jsonb_build_object('create',v_record_id is null,'operationId',gen_random_uuid(),
      'name',new.name,'snapshot',v_snapshot),true);
  if v_record_id is null then
    update public.project_records set project_id=new.id,version_id=new.latest_version_id,
      created_at=new.created_at where id=new.id::text;
  end if;
  return new;
end;
$$;

revoke all on function public.write_project_record(text,text,jsonb,boolean) from public,anon,authenticated;
revoke all on function public.delete_project_record(text,text,boolean) from public,anon,authenticated;
revoke all on function public.project_record_summary(public.project_records) from public,anon,authenticated;
revoke all on function public.valid_project_snapshot(jsonb) from public,anon,authenticated;
grant execute on function public.write_project_record(text,text,jsonb,boolean) to service_role;
grant execute on function public.delete_project_record(text,text,boolean) to service_role;
grant execute on function public.project_record_summary(public.project_records) to service_role;
grant execute on function public.valid_project_snapshot(jsonb) to service_role;
commit;
