# Ticket — No fallback for missing lesson images

**Filed:** 2026-07-04
**Filed by:** Architect (Claude), follow-up from Audio Asset Audit
**Severity:** PATCH — visible UX debt, not a functional blocker
**Status:** Open, awaiting Foreman/Codex fix

---

## Context

Image production is at 0% across the app: 132/132 `imageCard` references in `app/content.json` point to files that don't exist on disk. Vocational modules (V01–V10) have no `imageCard` field at all, so they're unaffected.

This mirrors the missing-audio situation, which already has a graceful degradation path (see [`TICKET-offline-download-abort.md`](TICKET-offline-download-abort.md) and the audio fix now confirmed PASS — the download flow no longer aborts on missing audio, and lesson playback already shows a purpose-built "Sauti yana zuwa" banner via `resolveLessonAudioSource()` / `isLessonAudioMissing()` / `renderLessonAudioComingSoonBanner()`, `app.js:4058-4075`).

## The gap

`imageCard` rendering (`app.js:5195-5201`) is a bare conditional:

```js
module.imageCard ? '<img src="...">' : ""
```

There is no existence check and no fallback markup. Every module with an `imageCard` (132/142) will render a broken-image icon in the lesson's "Katin Ajami" panel once a user opens it.

## Recommended fix

Add an image equivalent of the existing audio "coming soon" pattern: on `<img>` load failure (`onerror`), swap in a placeholder/coming-soon state instead of the broken-image icon — same spirit as `getLessonAudioComingSoonMessage()`, just for the image slot. Contained to `app.js`; no content or schema changes needed.

## Escalation-style summary

```
Ticket: Missing image fallback
Component: app.js — imageCard rendering (~line 5195-5201)
Trigger: any module with an imageCard whose image file doesn't exist (currently 132/142)
Actual: broken-image icon, no fallback
Expected: "coming soon" placeholder, matching the audio pattern already in place
Fix location: app.js only, no content/schema changes
Related: TICKET-offline-download-abort.md (audio equivalent, already fixed and PASS)
```
