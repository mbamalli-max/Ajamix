# AJAMIX Audio Recording Packages — index

**Technical spec (applies to every formal-track module):**

**Technical spec:** MP3, 64kbps, mono. Target duration 3–5 minutes per module — no hard
per-module target beyond this range; let the script's natural spoken length determine it.

**Markers:** `[INTRO]`, `[MAIN]`, `[PAUSE N]`, `[OUTRO]` are delivery cues for where to pause
naturally — they are not spoken aloud. At each `[PAUSE N]` marker, the listed question is where the
app will pause playback and show an interactive quiz question to the learner; the question/answer
options below are for the reader's context only (so pacing and tone can anticipate the pause), not
text to read aloud.

**Pause timing note:** the app triggers each pause based on a timestamp (`pauseAtMs`) that is
currently a placeholder estimate from content authoring, not measured from real narration. After this
module is recorded, the actual playback time of each `[PAUSE N]` moment in the final audio must be
measured and reconciled back into `content.json` — a separate step after recording, not something the
reader needs to worry about.

---

- [`nursery1-recording-package.md`](nursery1-recording-package.md) — 12 modules
- [`nursery2-recording-package.md`](nursery2-recording-package.md) — 12 modules
- [`p1-recording-package.md`](p1-recording-package.md) — 54 modules
- [`p2-recording-package.md`](p2-recording-package.md) — 58 modules
- [`p3-recording-package.md`](p3-recording-package.md) — 55 modules
- [`p4-recording-package.md`](p4-recording-package.md) — 60 modules
- [`p5-recording-package.md`](p5-recording-package.md) — 54 modules
- [`p6-recording-package.md`](p6-recording-package.md) — 54 modules

**Technical spec (applies to every adult-track module):**

**Technical spec:** MP3, 64kbps, mono, one clip per card. No hard duration target per
clip — most run a few seconds to ~20 seconds; let each card's natural spoken length determine it.

**Chopped-recording model.** Each adult-track module (Vocational Skills, Philosophy, Critical
Thinking) is broken into its on-screen "lesson cards" (intro/prose, glossary term, worked example,
closing prose). Record **one short clip per card**, not one continuous file per module — the app
advances to the next card automatically when a card's clip finishes playing, so what's heard always
matches what's on screen with no timestamp measurement needed after recording. Read only the text
under "Script to read" for each card; card headings like "Prose card" / "Glossary card" / "Example
card" below are structural labels for the reader, not spoken text.

---

- [`vocational-recording-package.md`](vocational-recording-package.md) — 10 modules, 50 card clips (Vocational Skills)
- [`falsafa-recording-package.md`](falsafa-recording-package.md) — 10 modules, 50 card clips (Philosophy)
- [`critical-thinking-recording-package.md`](critical-thinking-recording-package.md) — 10 modules, 50 card clips (Critical Thinking)
