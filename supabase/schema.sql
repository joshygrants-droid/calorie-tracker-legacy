create table if not exists public.app_states (
  user_id uuid primary key references auth.users (id) on delete cascade,
  schema_version integer not null default 5,
  state jsonb not null,
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists app_states_updated_at_idx on public.app_states (updated_at desc);

create or replace function public.set_app_states_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists app_states_set_updated_at on public.app_states;
create trigger app_states_set_updated_at
before update on public.app_states
for each row
execute procedure public.set_app_states_updated_at();

alter table public.app_states enable row level security;

drop policy if exists "Users can read their app state" on public.app_states;
create policy "Users can read their app state"
on public.app_states
for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their app state" on public.app_states;
create policy "Users can insert their app state"
on public.app_states
for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their app state" on public.app_states;
create policy "Users can update their app state"
on public.app_states
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

revoke all on public.app_states from anon;
grant select, insert, update on public.app_states to authenticated;
