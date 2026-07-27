# Ticket — Offline download aborts entire batch on first missing audio file

**Filed:** 2026-07-04
**Filed by:** Architect (Claude), from Audio Asset Audit (delegated by Foreman)
**Severity:** PATCH — blocks the "download for offline" feature for every user, every gradeband, today
**Status:** Open, awaiting Foreman/Codex fix

---

## Context

Real audio production is at effectively 0% across the app. Of 142 `audioFile` references in `app/content.json`, only 4 files exist on disk (`n1-maths-01`, `n2-maths-01`, `p1-maths-01`, `p1-maths-17`), and all 4 are byte-identical (same sha1, same size) — one shared placeholder file duplicated across a few module IDs, not real distinct recordings. This is expected at this stage and is not itself the bug; it's the precondition that exposes the bug below.

Missing images are also 132/132 missing (separate, lower-severity finding — see Notes).

## The bug

`app.js` — offline audio download flow (`startAudioDownload()` / `downloadAudioItem()`, roughly lines 6992–7048):

- `downloadAudioItem()` does `if (!response.ok) throw new Error(...)` when a fetch for an audio file 404s.
- That throw is only caught by the **outer loop** in `startAudioDownload()`, not per-item.
- Result: the loop aborts on the **first** missing audio file it hits, marks `session.status = "partial"`, and the rest of the batch never downloads — even audio files that do exist.

Since every gradeband currently has far more missing than present audio (nursery1: 11/12 missing, nursery2: 11/12, p1: 52/54, p2: 54/54, vocational: 10/10), tapping "download for offline" today reliably fails on the second module it tries to fetch, for any user, any gradeband. This is app-wide, not P2-specific.

Reproduced directly: `HEAD /app/audio/n1-maths-02.mp3` → 404 (confirmed via network capture and direct fetch during Gate 0 testing).

## Why it matters

Lesson playback already handles this gracefully — `resolveLessonAudioSource()` HEAD-checks the file and, on 404, shows the purpose-built "Sauti yana zuwa" (audio coming soon) banner (`app.js:4058–4075`). No crash, no blocker there.

The download flow has no equivalent per-item handling, so it doesn't degrade gracefully — it just fails the whole session.

## Recommended fix

In `downloadAudioItem()` / `startAudioDownload()`, catch the per-item fetch failure and skip/mark that item (e.g. `status: "missing"`) instead of throwing out of the loop. Let the batch continue and report which items were skipped, mirroring the "coming soon" pattern already used in lesson playback. Scope is contained to `app.js`; no content or schema changes needed.

Not something the Architect should patch unilaterally — it's an engine-logic behavior change, not a mechanical content/asset fix, so it needs Foreman/Codex review before landing.

## Notes / secondary finding (informational, not blocking this ticket)

Images: 0/132 exist, and there is currently no missing-image fallback at all — `imageCard` renders a bare `<img src="...">` (`app.js:5195–5201`), so any module with an image card shows a broken-image icon. Lower severity than the download bug (cosmetic, not a functional abort), but flagged here since it's the same root cause (asset production not yet started) and the same team will likely want to fix both in one pass — e.g. add an image equivalent of the audio "coming soon" banner.

---

## Escalation-style summary (for quick triage)

```
Ticket: Offline download abort-on-404
Component: app.js — startAudioDownload() / downloadAudioItem()
Trigger: any missing audio file during a download session (currently ~97% of audio refs)
Actual: entire download batch aborts on first missing file, session.status = "partial"
Expected: skip/mark missing item, continue batch, report skipped list
Fix location: app.js only, no content/schema changes
Related (lower severity): imageCard has no missing-image fallback (app.js:5195-5201)
```
