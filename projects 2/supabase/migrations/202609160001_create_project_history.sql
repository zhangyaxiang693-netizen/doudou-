create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id text not null,
  name text not null,
  prd_url text not null default '',
  template_id text not null default '',
  latest_version_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.project_versions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  version_no integer not null check (version_no > 0),
  save_type text not null check (save_type in ('manual', 'autosave')),
  schema_version integer not null check (schema_version > 0),
  app_version text not null default '',
  snapshot_json jsonb not null check (jsonb_typeof(snapshot_json) = 'object'),
  snapshot_saved_at timestamptz not null,
  created_at timestamptz not null default now(),
  unique (project_id, version_no)
);

alter table public.projects
  drop constraint if exists projects_latest_version_id_fkey;

alter table public.projects
  add constraint projects_latest_version_id_fkey
  foreign key (latest_version_id)
  references public.project_versions(id)
  on delete set null;

create index if not exists projects_owner_updated_idx
  on public.projects (owner_id, updated_at desc)
  where deleted_at is null;

create index if not exists project_versions_project_created_idx
  on public.project_versions (project_id, created_at desc);

create unique index if not exists project_versions_one_autosave_idx
  on public.project_versions (project_id)
  where save_type = 'autosave';

alter table public.projects enable row level security;
alter table public.project_versions enable row level security;

revoke all on public.projects from anon, authenticated;
revoke all on public.project_versions from anon, authenticated;
grant select, insert, update, delete on public.projects to service_role;
grant select, insert, update, delete on public.project_versions to service_role;

create or replace function public.create_history_project(
  p_owner_id text,
  p_name text,
  p_prd_url text,
  p_template_id text,
  p_schema_version integer,
  p_app_version text,
  p_snapshot_json jsonb
)
returns table (
  id uuid,
  name text,
  prd_url text,
  template_id text,
  latest_version_id uuid,
  created_at timestamptz,
  updated_at timestamptz,
  version_id uuid,
  version_no integer,
  schema_version integer,
  app_version text,
  version_created_at timestamptz
)
language plpgsql
set search_path = public
as $$
declare
  v_project public.projects%rowtype;
  v_version public.project_versions%rowtype;
begin
  insert into public.projects (
    owner_id,
    name,
    prd_url,
    template_id
  )
  values (
    p_owner_id,
    p_name,
    coalesce(p_prd_url, ''),
    coalesce(p_template_id, '')
  )
  returning * into v_project;

  insert into public.project_versions (
    project_id,
    version_no,
    save_type,
    schema_version,
    app_version,
    snapshot_json,
    snapshot_saved_at
  )
  values (
    v_project.id,
    1,
    'manual',
    p_schema_version,
    coalesce(p_app_version, ''),
    p_snapshot_json,
    (p_snapshot_json ->> 'savedAt')::timestamptz
  )
  returning * into v_version;

  update public.projects as project_row
  set latest_version_id = v_version.id
  where project_row.id = v_project.id
  returning * into v_project;

  return query
  select
    v_project.id,
    v_project.name,
    v_project.prd_url,
    v_project.template_id,
    v_project.latest_version_id,
    v_project.created_at,
    v_project.updated_at,
    v_version.id,
    v_version.version_no,
    v_version.schema_version,
    v_version.app_version,
    v_version.created_at;
end;
$$;

create or replace function public.save_history_project_version(
  p_owner_id text,
  p_project_id uuid,
  p_save_type text,
  p_base_version_id uuid,
  p_schema_version integer,
  p_app_version text,
  p_snapshot_json jsonb
)
returns table (
  id uuid,
  project_id uuid,
  version_no integer,
  save_type text,
  schema_version integer,
  app_version text,
  created_at timestamptz
)
language plpgsql
set search_path = public
as $$
declare
  v_project public.projects%rowtype;
  v_version public.project_versions%rowtype;
  v_next_version_no integer;
begin
  if p_save_type not in ('manual', 'autosave') then
    raise exception 'INVALID_SAVE_TYPE';
  end if;

  select project_row.*
  into v_project
  from public.projects as project_row
  where project_row.id = p_project_id
    and project_row.owner_id = p_owner_id
    and project_row.deleted_at is null
  for update;

  if not found then
    raise exception 'PROJECT_NOT_FOUND';
  end if;

  if p_base_version_id is null
    or p_base_version_id is distinct from v_project.latest_version_id then
    raise exception 'VERSION_CONFLICT' using errcode = '40001';
  end if;

  select coalesce(max(version_row.version_no), 0) + 1
  into v_next_version_no
  from public.project_versions as version_row
  where version_row.project_id = p_project_id;

  if p_save_type = 'autosave' then
    select version_row.*
    into v_version
    from public.project_versions as version_row
    where version_row.project_id = p_project_id
      and version_row.save_type = 'autosave'
    for update;

    if found then
      if (p_snapshot_json ->> 'savedAt')::timestamptz
        < v_version.snapshot_saved_at then
        return query
        select
          v_version.id,
          v_version.project_id,
          v_version.version_no,
          v_version.save_type,
          v_version.schema_version,
          v_version.app_version,
          v_version.created_at;
        return;
      end if;

      update public.project_versions as version_row
      set
        version_no = v_next_version_no,
        schema_version = p_schema_version,
        app_version = coalesce(p_app_version, ''),
        snapshot_json = p_snapshot_json,
        snapshot_saved_at = (p_snapshot_json ->> 'savedAt')::timestamptz,
        created_at = now()
      where version_row.id = v_version.id
      returning * into v_version;
    else
      insert into public.project_versions (
        project_id,
        version_no,
        save_type,
        schema_version,
        app_version,
        snapshot_json,
        snapshot_saved_at
      )
      values (
        p_project_id,
        v_next_version_no,
        'autosave',
        p_schema_version,
        coalesce(p_app_version, ''),
        p_snapshot_json,
        (p_snapshot_json ->> 'savedAt')::timestamptz
      )
      returning * into v_version;
    end if;
  else
    insert into public.project_versions (
      project_id,
      version_no,
      save_type,
      schema_version,
      app_version,
      snapshot_json,
      snapshot_saved_at
    )
    values (
      p_project_id,
      v_next_version_no,
      'manual',
      p_schema_version,
      coalesce(p_app_version, ''),
      p_snapshot_json,
      (p_snapshot_json ->> 'savedAt')::timestamptz
    )
    returning * into v_version;
  end if;

  update public.projects as project_row
  set
    name = coalesce(
      nullif(p_snapshot_json #>> '{editor,activity,name}', ''),
      project_row.name
    ),
    prd_url = coalesce(
      p_snapshot_json #>> '{source,prdUrl}',
      project_row.prd_url
    ),
    template_id = coalesce(
      p_snapshot_json #>> '{editor,currentTemplateId}',
      project_row.template_id
    ),
    latest_version_id = case
      when p_save_type = 'manual' then v_version.id
      else project_row.latest_version_id
    end,
    updated_at = now()
  where project_row.id = p_project_id;

  return query
  select
    v_version.id,
    v_version.project_id,
    v_version.version_no,
    v_version.save_type,
    v_version.schema_version,
    v_version.app_version,
    v_version.created_at;
end;
$$;

revoke all on function public.create_history_project(
  text, text, text, text, integer, text, jsonb
) from public, anon, authenticated;

revoke all on function public.save_history_project_version(
  text, uuid, text, uuid, integer, text, jsonb
) from public, anon, authenticated;

grant execute on function public.create_history_project(
  text, text, text, text, integer, text, jsonb
) to service_role;

grant execute on function public.save_history_project_version(
  text, uuid, text, uuid, integer, text, jsonb
) to service_role;
