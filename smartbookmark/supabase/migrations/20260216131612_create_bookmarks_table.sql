-- enable extension for uuid
create extension if not exists "pgcrypto";

-- bookmarks table
create table public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  url text not null,
  created_at timestamptz not null default now()
);

-- index (faster queries per user)
create index bookmarks_user_id_idx on public.bookmarks(user_id);

-- enable row level security
alter table public.bookmarks enable row level security;

-- SELECT: user can read only own bookmarks
create policy "Users can view own bookmarks"
on public.bookmarks
for select
using (auth.uid() = user_id);

-- INSERT: user can insert only their bookmarks
create policy "Users can insert own bookmarks"
on public.bookmarks
for insert
with check (auth.uid() = user_id);

-- DELETE: user can delete only their bookmarks
create policy "Users can delete own bookmarks"
on public.bookmarks
for delete
using (auth.uid() = user_id);
