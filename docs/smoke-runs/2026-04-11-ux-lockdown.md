# UX Lockdown Verification — 2026-04-11

## Environment

- Branch: `feat/ux-lockdown`
- Head commit: `6523981` (`feat: 5-step onboarding wizard, scriptMode Ajami/Latin toggle, back button fixes`)
- Git state: clean working tree
- Browser: Headless Chrome 147 via Chrome DevTools Protocol
- Local servers tried:
  - `python3 serve.py` on `http://localhost:3002/app/`
  - `python3 -m http.server 4173` on `http://localhost:4173/app/` (README-backed fallback)
- Parse check: `node -c app/app.js` passed
- Regression check carried from handoff: `grep -n pendingOnboardingData app/app.js` returned zero matches, and `completeOnboarding()` persists `displayName`, `learnerType`, `scriptMode`, and `gradeBand` from `onboardingData` at [app/app.js](/Users/muhammadbamalli/Documents/ajamix/app/app.js:2903)

## Wizard Run A Results + Settings-Store Dump

- Status: blocked before reliable completion
- Intended run: `displayName="Test"`, `learnerType="child"`, `scriptMode="ajami"`, `gradeBand="nursery1"`
- Blocking behavior:
  - In live browser runs, the app frequently stayed on the loading shell instead of reaching `#/onboarding`
  - The browser console reported `SyntaxError: Unexpected end of input` for `http://localhost:4173/app/app.js` at line `3787`, column `14`
  - In the failing runs, a page-side `fetch('./app.js')` returned only `129299` characters and `hasIifeClose=false`
  - Local file size is `138409` bytes, so the served script was being truncated before EOF during the live run
- Settings-store dump: not captured, because the app did not boot reliably enough to finish the wizard and inspect IndexedDB deterministically

## Wizard Run B Results + Settings-Store Dump

- Status: blocked before reliable completion
- Intended run: `displayName="Test2"`, `learnerType="adult"`, `scriptMode="latin"`, `gradeBand="p1"`
- Blocking behavior: same live-run boot failure as Run A
- Settings-store dump: not captured, because the app did not boot reliably enough to finish the wizard and inspect IndexedDB deterministically

## ScriptMode Toggle Results

- Source-level verification:
  - Learning-path titles switch on `state.settings.scriptMode` at [app/app.js](/Users/muhammadbamalli/Documents/ajamix/app/app.js:2273)
  - `completeOnboarding()` persists `scriptMode` at [app/app.js](/Users/muhammadbamalli/Documents/ajamix/app/app.js:2911)
- Live-browser verification:
  - Blocked by the same `app.js` parse failure / loading-shell issue
  - I could not complete a reliable Ajami ↔ Latin toggle + reload + persistence pass in-browser

## 11-Step Smoke Test Table

| Step | Result | Notes |
|---|---|---|
| 1. First launch / grade picker | Fail | Local app did not reliably reach the onboarding wizard because the browser hit `SyntaxError: Unexpected end of input` while loading `app.js`. |
| 2. Pick Nursery 1 / 12 modules | Not run | Stopped early after blocking regression. |
| 3. Open `n1-maths-01` | Not run | Stopped early after blocking regression. |
| 4. Micro-pause at 60s | Not run | Stopped early after blocking regression. |
| 5. IndexedDB `microPauseData` write | Not run | Stopped early after blocking regression. |
| 6. Seek protection | Not run | Stopped early after blocking regression. |
| 7. Complete lesson → quiz | Not run live; source regression found | Separate source review found a quiz-text regression described below. |
| 8. Quiz retry button | Not run | Stopped early after blocking regression. |
| 9. Pass quiz → unlock next node | Not run | Stopped early after blocking regression. |
| 10. Switch grade band → P1 / 54 modules | Not run | Stopped early after blocking regression. |
| 11. Offline flow | Not run | Stopped early after blocking regression. |

## Still-Open Gaps

- Glossary screen still has no back button
  - Carried over from handoff, not a new regression from this verification pass
- Quiz-results pass branch still has no dedicated top-of-screen back button
  - Carried over from handoff, not a new regression from this verification pass

## New Regressions Found

1. `app/app.js` served response truncates before EOF in live local browser runs
   - Browser symptom: `SyntaxError: Unexpected end of input` at `http://localhost:4173/app/app.js:3787:14`
   - One-line repro: start a local static server, open `/app/` in Chrome, and observe the app remain on the loading shell while `fetch('./app.js')` returns `129299` characters instead of the full script

2. Quiz screen now renders template text instead of generated question text
   - Source references:
     - [app/app.js](/Users/muhammadbamalli/Documents/ajamix/app/app.js:960) renders `getDisplayQuestion(question.templateHa || question.questionText, question.templateAjami)`
     - [app/content.json](/Users/muhammadbamalli/Documents/ajamix/app/content.json:121) contains quiz templates with placeholders like `{a}` and `{b}`
   - One-line repro: open any generated arithmetic quiz (for example the first question in `n1-maths-01` or `p1-maths-01`) and the prompt is likely to show placeholder tokens instead of substituted numbers because the render path prefers `templateHa`

## Recommendation

- Status: needs fixes before merge / before treating the UX lockdown branch as verified
- Reason:
  - Live local browser verification is currently blocked by a boot failure caused by a truncated `app.js` response
  - There is also a clear source-level quiz rendering regression that will surface once the app boots consistently
