-- Apply after 202610250001_history_consistency.sql, before deploying the app.
-- Separate RPC names let the previous application keep working during deployment.
begin;

create index if not exists projects_owner_page_idx
  on public.projects (owner_id, updated_at desc, id desc) where deleted_at is null;
create index if not exists collaboration_personal_page_idx
  on public.collaboration_records (owner_id, updated_at desc, id desc) where scope = 'personal';
create index if not exists collaboration_team_page_idx
  on public.collaboration_records (group_id, updated_at desc, id desc) where scope = 'team';
create index if not exists collaboration_records_page_idx
  on public.collaboration_records (updated_at desc, id desc);

create or replace function public.write_history_project_compact(
  p_owner_id text, p_project_id uuid, p_input jsonb
) returns jsonb language plpgsql set search_path = public as $$
declare v_result jsonb;
begin
  v_result := public.write_history_project(p_owner_id, p_project_id, p_input);
  return jsonb_build_object(
    'project', v_result->'project',
    'version', (v_result->'version') - 'snapshot_json'
  );
end;
$$;

create or replace function public.sync_collaboration_changes_compact(
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
      if v_project_id is not null then raise exception 'RECORD_NOT_FOUND'; end if;
    end if;
    if v_scope = 'personal' and v_owner <> p_user_id and not p_is_admin then
      raise exception 'RECORD_FORBIDDEN';
    end if;
    if jsonb_typeof(v_snapshot) is distinct from 'object'
      or jsonb_typeof(v_snapshot #> '{editor,pages}') is distinct from 'array'
      or coalesce((v_snapshot->>'schemaVersion')::integer, 0) < 1
      or v_snapshot->>'savedAt' is null then raise exception 'INVALID_SNAPSHOT'; end if;
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
  -- Read only submitted IDs, under the same transaction lock as the writes.
  -- The response confirms the committed timestamps without re-sending snapshots.
  return jsonb_build_object(
    'users', (select coalesce(jsonb_agg(to_jsonb(u)), '[]'::jsonb)
      from public.app_users u
      where (p_is_admin or u.id = p_user_id)
        and u.id in (select value->>'id' from jsonb_array_elements(p_state->'users'))),
    'teams', (select coalesce(jsonb_agg(to_jsonb(g)), '[]'::jsonb)
      from public.collaboration_groups g
      where g.id in (select value->>'id' from jsonb_array_elements(p_state->'teams'))),
    'records', (select coalesce(jsonb_agg(jsonb_build_object(
      'id', r.id, 'project_id', r.project_id, 'owner_id', r.owner_id,
      'name', r.name, 'scope', r.scope, 'group_id', r.group_id,
      'created_at', r.created_at, 'updated_at', r.updated_at
    )), '[]'::jsonb)
      from public.collaboration_records r
      where (p_is_admin or r.scope = 'team' or r.owner_id = p_user_id)
        and r.id in (select value->>'id' from jsonb_array_elements(p_state->'records')))
  );
end;
$$;

revoke all on function public.write_history_project_compact(text, uuid, jsonb) from public, anon, authenticated;
revoke all on function public.sync_collaboration_changes_compact(text, jsonb, boolean) from public, anon, authenticated;
grant execute on function public.write_history_project_compact(text, uuid, jsonb) to service_role;
grant execute on function public.sync_collaboration_changes_compact(text, jsonb, boolean) to service_role;
commit;
