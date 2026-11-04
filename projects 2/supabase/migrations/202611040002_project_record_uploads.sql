-- Small transport parts survive FaaS instance changes. They are temporary;
-- completed uploads are removed, abandoned parts expire after 24 hours.
begin;
create table if not exists public.project_save_chunks (
  user_id text not null,
  operation_id uuid not null,
  record_id text not null,
  part_index integer not null,
  total_parts integer not null,
  encoding text not null,
  data_base64 text not null,
  expires_at timestamptz not null default (clock_timestamp() + interval '24 hours'),
  primary key(user_id,operation_id,part_index),
  check(part_index>=0 and part_index<total_parts and total_parts<=160),
  check(encoding in ('identity','gzip'))
);
create index if not exists project_save_chunks_expiry_idx on public.project_save_chunks(expires_at);
alter table public.project_save_chunks enable row level security;
revoke all on public.project_save_chunks from anon,authenticated;
grant select,insert,update,delete on public.project_save_chunks to service_role;

create or replace function public.stage_project_save_chunk(
  p_user_id text,p_record_id text,p_operation_id uuid,p_part_index integer,
  p_total_parts integer,p_encoding text,p_data text
) returns void language plpgsql set search_path=public as $$
declare v_part public.project_save_chunks%rowtype;
begin
  if nullif(p_user_id,'') is null or p_operation_id is null
    or p_record_id !~ '^[a-zA-Z0-9_-]{1,160}$'
    or p_part_index<0 or p_total_parts<1 or p_total_parts>160 or p_part_index>=p_total_parts
    or p_encoding not in ('identity','gzip') or length(p_data)>349528
    or octet_length(decode(p_data,'base64'))>262144 then raise exception 'INVALID_UPLOAD'; end if;
  perform pg_advisory_xact_lock(hashtextextended('project-upload:'||p_user_id||':'||p_operation_id::text,0));
  delete from public.project_save_chunks where expires_at<clock_timestamp();
  select * into v_part from public.project_save_chunks
    where user_id=p_user_id and operation_id=p_operation_id limit 1;
  if found and (v_part.record_id<>p_record_id or v_part.total_parts<>p_total_parts
    or v_part.encoding<>p_encoding) then raise exception 'OPERATION_MISMATCH'; end if;
  select * into v_part from public.project_save_chunks
    where user_id=p_user_id and operation_id=p_operation_id and part_index=p_part_index;
  if found and v_part.data_base64<>p_data then raise exception 'OPERATION_MISMATCH'; end if;
  insert into public.project_save_chunks
    (user_id,operation_id,record_id,part_index,total_parts,encoding,data_base64)
    values(p_user_id,p_operation_id,p_record_id,p_part_index,p_total_parts,p_encoding,p_data)
    on conflict(user_id,operation_id,part_index) do update
      set expires_at=clock_timestamp()+interval '24 hours';
end;
$$;
create or replace function public.read_project_save_upload(
  p_user_id text,p_record_id text,p_operation_id uuid
) returns jsonb language sql set search_path=public as $$
  select coalesce(jsonb_agg(jsonb_build_object(
    'index',part_index,'totalParts',total_parts,'encoding',encoding,'data',data_base64
  ) order by part_index),'[]'::jsonb)
  from public.project_save_chunks where user_id=p_user_id and record_id=p_record_id
    and operation_id=p_operation_id and expires_at>clock_timestamp();
$$;
create or replace function public.drop_project_save_upload(
  p_user_id text,p_record_id text,p_operation_id uuid
) returns void language sql set search_path=public as $$
  delete from public.project_save_chunks
    where user_id=p_user_id and record_id=p_record_id and operation_id=p_operation_id;
$$;
revoke all on function public.stage_project_save_chunk(text,text,uuid,integer,integer,text,text) from public,anon,authenticated;
revoke all on function public.read_project_save_upload(text,text,uuid) from public,anon,authenticated;
revoke all on function public.drop_project_save_upload(text,text,uuid) from public,anon,authenticated;
grant execute on function public.stage_project_save_chunk(text,text,uuid,integer,integer,text,text) to service_role;
grant execute on function public.read_project_save_upload(text,text,uuid) to service_role;
grant execute on function public.drop_project_save_upload(text,text,uuid) to service_role;
commit;
