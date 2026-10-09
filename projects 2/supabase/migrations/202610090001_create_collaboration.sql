create table if not exists public.app_users (
  id text primary key,
  name text not null,
  avatar_url text not null default '',
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.collaboration_groups (
  id text primary key,
  name text not null,
  created_by text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.collaboration_records (
  id text primary key,
  project_id uuid references public.projects(id) on delete set null,
  owner_id text not null,
  name text not null,
  scope text not null check (scope in ('personal', 'team')),
  group_id text references public.collaboration_groups(id) on delete cascade,
  snapshot_json jsonb not null check (jsonb_typeof(snapshot_json) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    (scope = 'personal' and group_id is null)
    or (scope = 'team' and group_id is not null)
  )
);

create index if not exists collaboration_records_owner_updated_idx
  on public.collaboration_records (owner_id, updated_at desc)
  where scope = 'personal';

create index if not exists collaboration_records_group_updated_idx
  on public.collaboration_records (group_id, updated_at desc)
  where scope = 'team';

alter table public.app_users enable row level security;
alter table public.collaboration_groups enable row level security;
alter table public.collaboration_records enable row level security;

revoke all on public.app_users from anon, authenticated;
revoke all on public.collaboration_groups from anon, authenticated;
revoke all on public.collaboration_records from anon, authenticated;

grant select, insert, update, delete on public.app_users to service_role;
grant select, insert, update, delete on public.collaboration_groups to service_role;
grant select, insert, update, delete on public.collaboration_records to service_role;

insert into public.app_users (id, name)
select distinct project_row.owner_id, project_row.owner_id
from public.projects as project_row
where project_row.deleted_at is null
on conflict (id) do nothing;

insert into public.collaboration_records (
  id,
  project_id,
  owner_id,
  name,
  scope,
  group_id,
  snapshot_json,
  created_at,
  updated_at
)
select
  project_row.id::text,
  project_row.id,
  project_row.owner_id,
  project_row.name,
  'personal',
  null,
  version_row.snapshot_json,
  project_row.created_at,
  project_row.updated_at
from public.projects as project_row
join public.project_versions as version_row
  on version_row.id = project_row.latest_version_id
where project_row.deleted_at is null
on conflict (id) do nothing;

create or replace function public.sync_project_collaboration_record()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  v_snapshot jsonb;
begin
  if new.latest_version_id is null or new.deleted_at is not null then
    return new;
  end if;

  select version_row.snapshot_json
  into v_snapshot
  from public.project_versions as version_row
  where version_row.id = new.latest_version_id;

  if v_snapshot is null then
    return new;
  end if;

  insert into public.collaboration_records (
    id,
    project_id,
    owner_id,
    name,
    scope,
    group_id,
    snapshot_json,
    created_at,
    updated_at
  )
  values (
    new.id::text,
    new.id,
    new.owner_id,
    new.name,
    'personal',
    null,
    v_snapshot,
    new.created_at,
    new.updated_at
  )
  on conflict (id) do update
  set
    name = excluded.name,
    snapshot_json = excluded.snapshot_json,
    updated_at = excluded.updated_at;

  return new;
end;
$$;

drop trigger if exists projects_sync_collaboration_record
  on public.projects;

create trigger projects_sync_collaboration_record
after insert or update of latest_version_id, name, deleted_at
on public.projects
for each row
execute function public.sync_project_collaboration_record();
