-- Apply after the history and collaboration migrations, before deploying the app.
begin;

create or replace function public.sync_project_collaboration_record()
returns trigger language plpgsql set search_path = public as $$
declare v_snapshot jsonb;
begin
  if new.deleted_at is not null then
    delete from public.collaboration_records where project_id = new.id;
    return new;
  end if;
  if new.latest_version_id is null then return new; end if;
  select snapshot_json into v_snapshot from public.project_versions
    where id = new.latest_version_id;
  if v_snapshot is null then return new; end if;
  insert into public.collaboration_records
    (id, project_id, owner_id, name, scope, group_id, snapshot_json, created_at, updated_at)
  values (new.id::text, new.id, new.owner_id, new.name, 'personal', null,
    v_snapshot, new.created_at, new.updated_at)
  on conflict (id) do update set name = excluded.name,
    snapshot_json = excluded.snapshot_json, updated_at = excluded.updated_at;
  return new;
end;
$$;

delete from public.collaboration_records r using public.projects p
  where r.project_id = p.id and p.deleted_at is not null;

-- One RPC commits the project, snapshot and destination together.
create or replace function public.write_history_project(
  p_owner_id text, p_project_id uuid, p_input jsonb
) returns jsonb language plpgsql set search_path = public as $$
declare
  v_project public.projects%rowtype;
  v_version public.project_versions%rowtype;
  v_id uuid;
  v_time timestamptz := clock_timestamp();
  v_snapshot jsonb := p_input->'snapshot';
begin
  perform pg_advisory_xact_lock(hashtext('history-collaboration-write'));
  if p_project_id is null then
    select id into v_id from public.create_history_project(
      p_owner_id, p_input->>'name', p_input->>'prdUrl', p_input->>'templateId',
      (v_snapshot->>'schemaVersion')::integer, v_snapshot->>'appVersion', v_snapshot);
    if p_input->>'scope' = 'team' then
      if not exists (select 1 from public.collaboration_groups where id = p_input->>'teamId') then
        raise exception 'INVALID_GROUP';
      end if;
      update public.collaboration_records set scope = 'team', group_id = p_input->>'teamId'
        where id = v_id::text;
    end if;
  else
    select * into v_project from public.projects where id = p_project_id for update;
    if not found or v_project.deleted_at is not null then raise exception 'PROJECT_NOT_FOUND'; end if;
    if v_project.owner_id <> p_owner_id then raise exception 'PROJECT_FORBIDDEN'; end if;
    if (p_input->>'baseUpdatedAt')::timestamptz is distinct from v_project.updated_at then
      raise exception 'VERSION_CONFLICT';
    end if;
    update public.project_versions set
      schema_version = (v_snapshot->>'schemaVersion')::integer,
      app_version = coalesce(v_snapshot->>'appVersion', ''),
      snapshot_json = v_snapshot, snapshot_saved_at = (v_snapshot->>'savedAt')::timestamptz,
      created_at = v_time
      where id = v_project.latest_version_id and project_id = p_project_id;
    if not found then raise exception 'PROJECT_NOT_FOUND'; end if;
    update public.projects set name = p_input->>'name',
      prd_url = coalesce(p_input->>'prdUrl', ''),
      template_id = coalesce(p_input->>'templateId', ''), updated_at = v_time
      where id = p_project_id;
    v_id := p_project_id;
  end if;
  select * into v_project from public.projects where id = v_id;
  select * into v_version from public.project_versions where id = v_project.latest_version_id;
  return jsonb_build_object('project', to_jsonb(v_project), 'version', to_jsonb(v_version));
end;
$$;

-- The input contains changed objects only. Older clients without a base timestamp
-- may send identical cached objects, but cannot overwrite an existing object.
create or replace function public.sync_collaboration_changes(
  p_user_id text, p_state jsonb, p_is_admin boolean
) returns jsonb language plpgsql set search_path = public as $$
declare
  v_item jsonb;
  v_record public.collaboration_records%rowtype;
  v_group public.collaboration_groups%rowtype;
  v_project public.projects%rowtype;
  v_exists boolean;
  v_id text;
  v_owner text;
  v_scope text;
  v_project_id uuid;
  v_snapshot jsonb;
  v_time timestamptz;
begin
  perform pg_advisory_xact_lock(hashtext('history-collaboration-write'));
  for v_item in select value from jsonb_array_elements(p_state->'users') loop
    if not p_is_admin and v_item->>'id' <> p_user_id then continue; end if;
    insert into public.app_users (id, name, avatar_url)
      values (v_item->>'id', v_item->>'name', coalesce(v_item->>'avatarUrl', ''))
      on conflict (id) do update set name = excluded.name, avatar_url = excluded.avatar_url,
        updated_at = clock_timestamp();
  end loop;
  for v_item in select value from jsonb_array_elements(p_state->'teams') loop
    select * into v_group from public.collaboration_groups where id = v_item->>'id' for update;
    if found then
      if v_group.name = v_item->>'name' then continue; end if;
      if (v_item->>'baseUpdatedAt')::timestamptz is distinct from v_group.updated_at then
        raise exception 'VERSION_CONFLICT';
      end if;
      update public.collaboration_groups set name = v_item->>'name', updated_at = clock_timestamp()
        where id = v_group.id;
    else
      insert into public.collaboration_groups (id, name, created_by)
        values (v_item->>'id', v_item->>'name', p_user_id);
    end if;
  end loop;
  for v_item in select value from jsonb_array_elements(p_state->'records') loop
    v_id := v_item->>'id';
    v_scope := v_item->>'scope';
    v_snapshot := v_item->'snapshot';
    select * into v_record from public.collaboration_records where id = v_id for update;
    v_exists := found;
    if v_exists then
      if v_record.scope = 'personal' and v_record.owner_id <> p_user_id and not p_is_admin then
        raise exception 'RECORD_FORBIDDEN';
      end if;
      if v_record.name = v_item->>'name' and v_record.snapshot_json = v_snapshot
        and v_record.scope = v_scope
        and v_record.group_id is not distinct from nullif(v_item->>'teamId', '')
        then continue;
      end if;
      if (v_item->>'baseUpdatedAt')::timestamptz is distinct from v_record.updated_at then
        raise exception 'VERSION_CONFLICT';
      end if;
      v_owner := v_record.owner_id;
      v_project_id := v_record.project_id;
    else
      if v_item->>'baseUpdatedAt' is not null then raise exception 'RECORD_NOT_FOUND'; end if;
      v_owner := case when p_is_admin then coalesce(v_item->>'ownerId', p_user_id) else p_user_id end;
      v_project_id := nullif(v_item->>'projectId', '')::uuid;
      -- Linked records are created by the project trigger only. This also
      -- prevents a stale browser from resurrecting a deleted project.
      if v_project_id is not null then raise exception 'RECORD_NOT_FOUND'; end if;
    end if;
    if v_scope = 'personal' and v_owner <> p_user_id and not p_is_admin then
      raise exception 'RECORD_FORBIDDEN';
    end if;
    if jsonb_typeof(v_snapshot) is distinct from 'object'
      or jsonb_typeof(v_snapshot #> '{editor,pages}') is distinct from 'array'
      or coalesce((v_snapshot->>'schemaVersion')::integer, 0) < 1
      or v_snapshot->>'savedAt' is null then raise exception 'INVALID_SNAPSHOT'; end if;
    -- Validate the timestamp even for standalone copies.
    perform (v_snapshot->>'savedAt')::timestamptz;
    v_time := clock_timestamp();
    if v_project_id is not null then
      select * into v_project from public.projects where id = v_project_id for update;
      if not found or v_project.deleted_at is not null then raise exception 'RECORD_NOT_FOUND'; end if;
      update public.project_versions set snapshot_json = v_snapshot,
        schema_version = (v_snapshot->>'schemaVersion')::integer,
        app_version = coalesce(v_snapshot->>'appVersion', ''),
        snapshot_saved_at = (v_snapshot->>'savedAt')::timestamptz, created_at = v_time
        where id = v_project.latest_version_id and project_id = v_project_id;
      if not found then raise exception 'RECORD_NOT_FOUND'; end if;
      update public.projects set name = v_item->>'name',
        prd_url = coalesce(v_snapshot #>> '{source,prdUrl}', ''),
        template_id = coalesce(v_snapshot #>> '{editor,currentTemplateId}', ''),
        updated_at = v_time where id = v_project_id;
    end if;
    insert into public.collaboration_records
      (id, project_id, owner_id, name, scope, group_id, snapshot_json, updated_at)
      values (v_id, v_project_id, v_owner, v_item->>'name', v_scope,
        case when v_scope = 'team' then v_item->>'teamId' else null end, v_snapshot, v_time)
      on conflict (id) do update set name = excluded.name, scope = excluded.scope,
        group_id = excluded.group_id, snapshot_json = excluded.snapshot_json, updated_at = excluded.updated_at;
  end loop;
  -- Return the committed snapshot while still holding the write lock. A second
  -- bootstrap request could otherwise adopt a newer timestamp without its editor content.
  return jsonb_build_object(
    'users', (select coalesce(jsonb_agg(to_jsonb(u)), '[]'::jsonb)
      from public.app_users u where p_is_admin or u.id = p_user_id),
    'teams', (select coalesce(jsonb_agg(to_jsonb(g) order by g.updated_at desc), '[]'::jsonb)
      from public.collaboration_groups g),
    'records', (select coalesce(jsonb_agg(to_jsonb(r) order by r.updated_at desc), '[]'::jsonb)
      from public.collaboration_records r where p_is_admin or r.scope = 'team' or r.owner_id = p_user_id)
  );
end;
$$;

revoke all on function public.write_history_project(text, uuid, jsonb) from public, anon, authenticated;
revoke all on function public.sync_collaboration_changes(text, jsonb, boolean) from public, anon, authenticated;
grant execute on function public.write_history_project(text, uuid, jsonb) to service_role;
grant execute on function public.sync_collaboration_changes(text, jsonb, boolean) to service_role;
commit;
