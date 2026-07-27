# Ticket — Progress tab heading shows literal "null" on vocational track

**Filed:** 2026-07-04
**Filed by:** Architect (Claude), from Gate 2 release-gate walkthrough (`docs/VALIDATION-CHECKLIST.md`)
**Severity:** PATCH — visible broken text on a core screen, not a functional blocker
**Status:** Open, awaiting Foreman/Codex fix

---

## Context

Gate 2 testing (track select + dashboard chrome) opened the Progress tab while on the vocational track (Hanyar Kasuwanci). Confirmed reproducible via the normal UI path — this is not a test-setup artifact.

## The bug

Progress screen heading, `app.js:2908`:

```js
"<h2>" + ha("Abin da aka kammala a ") + escapeHtml(getGradeBandLabel(state.settings.gradeBand)) + "</h2>",
```

`getGradeBandLabel()` (`app.js:180-182`) is a bare lookup with no safe fallback:

```js
return GRADE_BAND_LABELS[band] || band;
```

When `band` is `null`, it returns `null` itself. `escapeHtml(null)` (`app.js:7840-7847`) then does `String(null)`, producing the literal text `"null"`.

`state.settings.gradeBand` is `null` on the vocational track **by design** — the track-switch handler explicitly sets it that way:

```js
// app.js:1775-1778
if (target.dataset.action === "track-set-vocational") {
  await saveSettings({ trackPreference: "vocational", gradeBand: null });
  navigate("#/learning-path");
  return;
}
```

So any user on the vocational track who opens Progress sees:

> **Abin da aka kammala a null**

instead of a real heading. This affects every vocational-track user, every time, since `gradeBand: null` is the permanent, intended state for that track (not a transient/edge value).

## Recommended fix

The Progress heading needs a vocational-aware branch, matching the existing `isVocational` pattern already used elsewhere for this exact purpose (e.g. `app.js:4889`, `renderHomeScreen()`). Suggest either:
- when `trackPreference === "vocational"`, render a grade-band-free heading (e.g. `"Abin da aka kammala"` or `"...a Hanyar Kasuwanci"`), or
- have `getGradeBandLabel()` return a safe default when `band` is falsy, so it never leaks a raw JS value into markup regardless of caller.

Prefer the first (heading-level branch) since it matches the established `isVocational` convention already in this file, but the `getGradeBandLabel()` hardening is worth doing regardless as defense-in-depth — this function is a shared lookup and any other caller passing a null/invalid band would hit the same class of bug.

Contained to `app.js`; no content or schema changes needed.

## Escalation-style summary

```
Ticket: Progress heading literal "null" on vocational track
Component: app.js — Progress screen heading (~line 2908), getGradeBandLabel() (~line 180-182)
Trigger: any vocational-track user opening the Progress tab (gradeBand is null by design for this track, set at app.js:1776)
Actual: heading reads "Abin da aka kammala a null"
Expected: vocational-aware heading with no raw null leaking through, matching existing isVocational branch pattern (app.js:4889)
Fix location: app.js only, no content/schema changes
```
