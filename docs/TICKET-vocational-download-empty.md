# Ticket — Offline audio download is empty for the entire vocational track

**Filed:** 2026-07-04
**Filed by:** Architect (Claude), from Gate 2 release-gate walkthrough (`docs/VALIDATION-CHECKLIST.md`)
**Severity:** BLOCKER — offline download feature is 100% non-functional for vocational-track users
**Status:** Open, awaiting Foreman/Codex fix

---

## Context

Found while checking the Download tab on the vocational track (Hanyar Kasuwanci) during Gate 2. The screen renders correctly (heading, pills, buttons all fine — no crash), but shows:

- Fayiloli: **0/0**
- "Babu audio files na wannan grade band a bundle din yanzu." (no audio files for this grade band in the current bundle)

This is not a missing-asset issue (the pattern the two prior tickets covered) — it's a matching-key bug that means **zero vocational audio items are ever discoverable**, regardless of whether the underlying `.mp3` files exist on disk.

## The bug

`getAudioEntriesForGradeBand()`, `app.js:6942-6962`:

```js
function getAudioEntriesForGradeBand(gradeBand) {
  var seen = {};
  return state.modules
    .filter(function (module) {
      return module.gradeband === gradeBand && module.audioFile;
    })
    ...
}
```

Called from `prepareDownloadSession()` (`app.js:6974`) as `getAudioEntriesForGradeBand(state.settings.gradeBand)`.

On the vocational track, `state.settings.gradeBand` is `null` by design (set at `app.js:1776`, `track-set-vocational` handler — same root cause noted in `TICKET-progress-heading-null-gradeband.md`).

But vocational modules in `app/content.json` carry `gradeband: "adult"`, not `null`:

```json
{"id":"V01","gradeband":"adult","audioFile":"audio/vocational/V01.mp3"}
{"id":"V02","gradeband":"adult","audioFile":"audio/vocational/V02.mp3"}
{"id":"V03","gradeband":"adult","audioFile":"audio/vocational/V03.mp3"}
```
(all 10 vocational modules, V01–V10, confirmed same pattern)

`"adult"` is also not present in `ALLOWED_GRADE_BANDS` (`app.js:77-82`) at all — it's a value that exists only in content data, never in the settings/validation layer.

Since the filter is `module.gradeband === gradeBand`, and `null !== "adult"`, the filter always returns an empty array for vocational track. There is no code path by which a vocational user can ever populate `downloadSession.items` — this isn't a flaky edge case, it's unconditional.

## Why it matters

This silently breaks a whole feature for a whole track. It doesn't crash or error — it just shows an empty, technically-well-formed screen ("no files available"), which reads as if there's simply nothing to download yet, rather than as a bug. That makes it likely to slip through casual QA. Every vocational-track user who wants offline audio access hits this, unconditionally.

## Recommended fix

`getAudioEntriesForGradeBand()` needs a vocational-aware branch, same convention as the two prior fixes/tickets:
- when `trackPreference === "vocational"`, filter on `module.gradeband === "adult"` (or better, filter on `isVocationalModule(module)` — already exists at `app.js:5843` — rather than hardcoding `"adult"` as a second magic string), instead of comparing against `state.settings.gradeBand`.
- Keep the existing `gradeBand` comparison path for the formal track.

Contained to `app.js`; no content or schema changes needed. Suggest fixing this in the same pass as `TICKET-progress-heading-null-gradeband.md`, since both stem from the same "vocational track leaves `gradeBand: null`, but downstream code assumes a valid gradeBand" pattern — worth a quick audit for any other caller of `state.settings.gradeBand` that doesn't already branch on `trackPreference`.

## Escalation-style summary

```
Ticket: Vocational track offline download is always empty
Component: app.js — getAudioEntriesForGradeBand() (~line 6942), called from prepareDownloadSession() (~line 6974)
Trigger: any vocational-track user opening the Download tab (state.settings.gradeBand is null for this track; vocational modules use gradeband: "adult", never null)
Actual: Download tab shows 0/0 files, "no audio files for this grade band" — unconditionally, always
Expected: vocational-track download session lists the 10 vocational audio items (matching on isVocationalModule() or gradeband === "adult", not on state.settings.gradeBand)
Fix location: app.js only, no content/schema changes
Related: TICKET-progress-heading-null-gradeband.md (same root cause: gradeBand is null by design on vocational track, some downstream code doesn't branch for it)
```
