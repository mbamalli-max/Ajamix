# AJAMIX Backend Setup

This sprint adds a lightweight Vercel + Supabase backend for KPI events and a simple dashboard.

## 1. Create a Supabase project

1. Sign in to Supabase and create a new free project.
2. Wait for the database to finish provisioning.
3. Open the SQL Editor.

## 2. Create the `events` table

Run this SQL:

```sql
create extension if not exists pgcrypto;

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  event_type text not null,
  payload jsonb not null
);
```

## 3. Enable RLS

Run:

```sql
alter table events enable row level security;
```

## 4. Add policies

Allow anonymous inserts from the client sync function:

```sql
create policy "anon_insert_events"
on events
for insert
to anon
with check (true);
```

Keep reads restricted to the service role. Do not add a public `select` policy.

## 5. Copy Supabase keys

From Supabase Project Settings:

1. Copy `SUPABASE_URL`
2. Copy the public anon key as `SUPABASE_ANON_KEY`
3. Copy the service role key as `SUPABASE_SERVICE_ROLE_KEY`

## 6. Add Vercel environment variables

In Vercel Project Settings → Environment Variables, add:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Use the service-role key only in server-side code. It is consumed by `api/dashboard.js` and must never be shipped to the browser bundle.

## 7. Install dependencies

At the repo root:

```bash
npm install
```

This installs `@supabase/supabase-js` from `package.json`.

## 8. Deploy

Deploy to Vercel after the environment variables are present.

Expected endpoints:

- `POST /api/kpi` — accepts batched client events
- `GET /api/dashboard` — returns aggregate KPI JSON for the dashboard
- `/dashboard` — static dashboard page

## 9. Verify

1. Open AJAMIX, turn analytics consent on, and generate a few events.
2. Confirm `POST /api/kpi` appears in the browser Network tab.
3. Open `/dashboard` and verify the KPI cards populate.
4. If inserts fail, inspect the Vercel function logs and confirm the RLS policy and env vars are set correctly.
