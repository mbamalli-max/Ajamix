# Doc correction — Gate 5 checklist references wrong field for Tomorrow-Check trigger

**Filed:** 2026-07-04
**Filed by:** Architect (Claude), from Gate 5 release-gate walkthrough
**Type:** Documentation fix only — `docs/VALIDATION-CHECKLIST.md`, not an app.js ticket
**Status:** Open, awaiting Foreman correction to the checklist file

---

## The issue

`docs/VALIDATION-CHECKLIST.md:149` currently reads:

> Simulate 12h later: DevTools → IndexedDB → `ajamix-db` → `progress` → edit `lastAccessedAt` back 13 hours, reload. **Tomorrow-Check sheet** appears with correct Hausa copy.

Tested this literally during Gate 5 — editing `lastAccessedAt` back 13 hours and reloading does **not** trigger the Tomorrow-Check sheet.

Traced the actual trigger in code: `getDueTomorrowChecks()` (`app.js:1060-1076`) filters `state.progress` records where `commitment.committedAt + TOMORROW_CHECK_DELAY_MS < now` (`TOMORROW_CHECK_DELAY_MS = 12 * 60 * 60 * 1000`, `app.js:10`), where `commitment = record.useTodayCommitment` — a completely different field from `lastAccessedAt`.

Editing the correct field (`progress[moduleId].useTodayCommitment.committedAt`, not `lastAccessedAt`) back 13 hours and reloading **does** correctly trigger the "DUBA GOBE" (Tomorrow-Check) sheet with correct Hausa copy — so the underlying feature works fine; only the checklist's instructions point at the wrong field.

## Recommended correction

Replace line 149 with:

> Simulate 12h later: DevTools → IndexedDB → `ajamix-db` → `progress` → edit the relevant record's `useTodayCommitment.committedAt` back 13 hours, reload. **Tomorrow-Check sheet** appears with correct Hausa copy.

(Note: `useTodayCommitment` only exists on a progress record after actually completing the Use-Today sheet for that module — so this step should follow, not precede, the "Finish a module → Use-Today sheet appears" step directly above it on line 148.)
