# Ticket — "Delete completed audio" has no confirmation step or feedback

**Filed:** 2026-07-04
**Filed by:** Architect (Claude), from Gate 6 release-gate walkthrough (`docs/VALIDATION-CHECKLIST.md`)
**Severity:** PATCH — UX/consistency gap, not a crash; low data-loss risk since audio is re-downloadable
**Status:** Open, awaiting Foreman/Codex fix

---

## Context

`docs/VALIDATION-CHECKLIST.md:173` expects to test: *"Audio download flow: progress copy, 'completed' copy, 'delete audio' confirmation."* Tested live via the Settings screen's "Goge audio na modules da aka gama" (Delete audio for completed modules) button — clicking it deletes immediately, with **no confirmation dialog at all**, and no success/feedback message afterward (the screen just silently re-renders with updated storage numbers).

## The bug

`app.js:2002-2005`:
```js
if (target.dataset.action === "delete-completed-audio") {
  await deleteAudioForCompletedModules();
  return;
}
```

`app.js:7303-7317` (`deleteAudioForCompletedModules`) runs the deletion unconditionally as soon as called — no confirm-pending state, no dialog, no toast/notice on completion.

Contrast with the sibling destructive action **"Share progress a wannan na'ura"** (reset progress), which correctly uses a two-step confirm pattern:
- `app.js:1945-1946`: first click sets `state.confirmResetPending = true` and re-renders a confirmation panel (`app.js:3212`) instead of acting immediately.
- Only a second, explicit confirm click actually resets progress.

"Delete completed audio" has no equivalent — it behaves like the reset-progress button would if the confirm-pending step were skipped entirely.

## Why it matters

Data-loss risk here is lower than a progress reset (audio is just re-downloadable from network, not permanently lost), but:
- It's inconsistent with the established confirm-before-destroy pattern already used elsewhere in the same screen, one button apart.
- It's silent — a user who taps it by mistake gets no "are you sure" and no feedback that anything happened, so they can't tell if the tap registered or if something went wrong.
- The checklist itself was written expecting a confirmation to exist, suggesting this was the intended design, not a deliberate one-click choice.

## Recommended fix

Match the existing `reset-progress` pattern:
1. Add a `confirmDeleteAudioPending` (or similar) state flag, set on first click, rendering a confirm panel (reuse the same visual pattern as `state.confirmResetPending` at `app.js:3212`).
2. Only call `deleteAudioForCompletedModules()` on the second, explicit confirm click.
3. Consider adding a brief success notice after deletion completes (e.g. how many files/MB were freed), matching the feedback style already used for export/import (`state.fileTransfer.shareNotice`, `setImportMessage`).

Contained to `app.js`; no content/schema changes needed.

## Escalation-style summary

```
Ticket: "Delete completed audio" has no confirmation step or feedback
Component: app.js:2002-2005 (click handler), app.js:7303-7317 (deleteAudioForCompletedModules)
Trigger: tapping "Goge audio na modules da aka gama" in Settings
Actual: audio deleted immediately, no confirm dialog, no success feedback
Expected: two-step confirm (matching reset-progress pattern at app.js:1945-1946/3212), plus a completion notice
Fix location: app.js only, no content/schema changes
```
