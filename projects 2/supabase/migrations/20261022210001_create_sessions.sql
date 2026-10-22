-- 登录会话持久化表：让 express-session 的登录态跨 FaaS 实例重启不丢失
-- 仅允许 service_role 读写（会话数据敏感，禁止 anon / authenticated 访问）
create table if not exists public.sessions (
  id text primary key,
  sess jsonb not null check (jsonb_typeof(sess) = 'object'),
  expire timestamptz not null
);

create index if not exists sessions_expire_idx on public.sessions (expire);

alter table public.sessions enable row level security;
revoke all on public.sessions from anon, authenticated;
grant select, insert, update, delete on public.sessions to service_role;