# AJAMIX Smoke Test Checklist

Manual end-to-end validation before pilot. Run this against:
- **Local**: `python3 serve.py` → http://localhost:3002/app/
- **Vercel preview**: `<PR preview URL>` on real Android (Galaxy A03 or similar)
- **Production**: `<prod URL>`

Mark each step Pass / Fail / N/A and record any issues.

## Pre-test setup
- [ ] Silent stubs generated (`./tools/generate-stubs.sh`) — required for audio-in flows
- [ ] Chrome DevTools → Application → IndexedDB → Clear `ajamix-db` before first run
- [ ] Chrome DevTools → Application → Service Workers → Unregister any old SW

## 11-step functional smoke test

1. **First launch** — onboarding → grade-select picker shows all 14 grade bands (nursery1–ss3)
2. **Pick Nursery 1** — learning path shows 12 modules grouped by subject
3. **Open `n1-maths-01`** — lesson loads, silent audio plays, image card renders if test image present
4. **Micro-pause 1 fires at 60s ± 500ms** — overlay appears, announced by screen reader (VoiceOver / ChromeVox)
5. **Answer micro-pause** — DevTools → Application → IndexedDB → progress → record has `microPauseData` entry with `responseTimeMs`
6. **Seek protection** — scrub past the next pause → audio auto-pauses and overlay appears
7. **Complete lesson → quiz** — 5 questions render with randomized variables (reload twice, confirm numbers change)
8. **Quiz retry** — intentionally force an error (e.g., corrupt `quizQuestions` in DevTools) → "Sake gwadawa" button appears and works
9. **Pass quiz (3/5)** — quiz-results → unlock animation → learning-path shows next node unlocked
10. **Switch grade band** — settings → P1 → learning-path shows 54 modules
11. **Offline flow** — DevTools → Network → Offline → reload → full flow still works; close tab, reopen → state persists

## Ajami glyph render check

On the learning-path screen for Nursery 1, screenshot every titleAjami at `.ajami-title` size. Save to `docs/ajami-render-check/<device>-<date>/`. Flag any glyph that renders as tofu (□) or substitutes incorrectly. Those are candidates for the Scheherazade New fallback font.

## Accessibility check

- [ ] Tap targets ≥ 48px (DevTools → Rendering → Emulate vision deficiency → none; then manually hover nav buttons to check computed height)
- [ ] Quiz option buttons ≥ 56px
- [ ] Ajami body text ≥ 1.25rem (20px)
- [ ] Focus ring visible on keyboard Tab through onboarding
- [ ] Micro-pause overlay announced by VoiceOver/ChromeVox

## PWA install check (HTTPS required — Vercel preview only)

- [ ] Chrome menu shows "Install AJAMIX"
- [ ] Installed app launches in standalone mode (no browser chrome)
- [ ] Airplane mode → full offline flow still works
- [ ] Cold-launch after quit → state persists

## Performance budget (PRD §10)

Run Lighthouse mobile audit against http://localhost:3002/app/ with 4× CPU throttling and Slow 4G. Record values:

| Metric | Budget | Measured | Pass? |
|---|---|---|---|
| First Contentful Paint | < 2.0s | | |
| Time to Interactive | < 3.0s | | |
| Performance score | > 80 | | |
| Total JS (uncompressed) | < 200KB | | |
| App shell (gzip) | < 150KB | | |
| Lighthouse PWA score | > 90 | | |

## Known gaps during preview test
- No real audio files committed (`.gitignore` excludes `*.mp3`). Every lesson shows the graceful fallback: "Ba a samu fayil din audio ba tukuna…". This is expected during the UX lockdown sprint.
- All 78 modules flagged `ajami_validated: false`. Scholar review is a parallel workstream.

## Sign-off
- Local smoke test: date / tester
- Vercel preview smoke test: date / tester / device
- Production smoke test: date / tester / device

---
