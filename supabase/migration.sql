-- Anmol's portfolio — Supabase schema
-- Run this once against your project (via the Supabase SQL editor, or the
-- Supabase CLI / MCP apply_migration). Safe to re-run: uses IF NOT EXISTS
-- and CREATE OR REPLACE where possible.

-- ---------------------------------------------------------------------
-- Visitor counter
-- No personal data is stored: visitor_id is a random UUID the browser
-- generates and keeps in localStorage, not an IP address or fingerprint.
-- ---------------------------------------------------------------------
create table if not exists public.visits (
  id uuid primary key default gen_random_uuid(),
  visitor_id text not null,
  created_at timestamptz not null default now()
);

create index if not exists visits_created_at_idx on public.visits (created_at);
create index if not exists visits_visitor_id_idx on public.visits (visitor_id);

alter table public.visits enable row level security;

-- No direct select/insert policies are granted here on purpose — all access
-- goes through the record_visit() function below, so the raw log can't be
-- scraped by visitors using the public anon key.

create or replace function public.record_visit(p_visitor_id text)
returns table (total bigint, today bigint, unique_count bigint)
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.visits (visitor_id) values (p_visitor_id);

  return query
  select
    (select count(*) from public.visits) as total,
    (select count(*) from public.visits where created_at >= date_trunc('day', now())) as today,
    (select count(distinct visitor_id) from public.visits) as unique_count;
end;
$$;

-- Anyone using the public anon key can call this function (but not read
-- the table directly).
grant execute on function public.record_visit(text) to anon, authenticated;

-- ---------------------------------------------------------------------
-- Contact form messages
-- Visitors can submit (insert) but not read messages back — only you,
-- via the Supabase dashboard or service role key, can see submissions.
-- ---------------------------------------------------------------------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

drop policy if exists "Anyone can submit a contact message" on public.contact_messages;
create policy "Anyone can submit a contact message"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);

-- No select policy for anon/authenticated — messages are private to the
-- project owner by default.
