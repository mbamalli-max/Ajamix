# Launch Checklist

## Supabase setup (manual)

- [ ] Create free project at supabase.com
- [ ] Run the SQL from [backend-setup.md](/Users/muhammadbamalli/Documents/ajamix/docs/backend-setup.md:1) to create events table
- [ ] Enable RLS + INSERT-only anon policy
- [ ] Copy `SUPABASE_URL` and `SUPABASE_ANON_KEY`

## Vercel deploy (manual)

- [ ] Set env vars: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Run: `vercel --prod`
- [ ] Verify [https://ajamix.ng/app/](https://ajamix.ng/app/) loads the PWA
- [ ] Verify `GET /api/health` returns `{ ok: true }`
- [ ] Verify `GET /dashboard` loads and then set password protection in Vercel Dashboard
- [ ] Install the PWA on Samsung A03, Tecno Spark 8C, and Infinix Hot 11; verify offline works

## Content (manual)

- [ ] Record audio for `V01`–`V10` (mono MP3, 64 kbps, single founder voice)
- [ ] Upload files to `app/audio/vocational/` and redeploy
- [ ] Run `node app/tools/validate-content.mjs` after any `content.json` edits

## Pilot handoff (manual)

- [ ] Pre-install the PWA on pilot devices before giving them to Mallams
- [ ] Export a `.ajamix` package from Settings → Raba App for offline distribution
- [ ] Share the dashboard URL and password with no one except the founder

## Week-1 monitoring

- [ ] Check the dashboard daily for the 7 KPIs
- [ ] Watch Supabase and Vercel usage panels; the free-tier cliff starts to matter around ~50K function calls/month
- [ ] If Day-2 retention falls below 30%, review `gapTeaser` copy for the first 3 vocational modules
