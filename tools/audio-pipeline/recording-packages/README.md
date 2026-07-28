# AJAMIX Audio Recording Packages — index

**Technical spec (applies to every formal-track segment):**

**Technical spec:** MP3, 64kbps, mono, one clip per segment. There is no fixed duration
target: let each segment's natural spoken length determine it (typically well under one minute).

**Segmented-recording model.** Each formal-track module is broken into three clips. Record one clip for
each labelled segment, using its exact target filename. The app shows the matching text and opens the
quiz gate when segments 1 and 2 end, so no timestamp measurement or reconciliation is needed. Read only
the text under "Script to read"; segment labels and gate notes are structural instructions, not spoken text.

---

- [`nursery1-recording-package.md`](nursery1-recording-package.md) — 12 modules, 36 segment clips
- [`nursery2-recording-package.md`](nursery2-recording-package.md) — 12 modules, 36 segment clips
- [`p1-recording-package.md`](p1-recording-package.md) — 54 modules, 162 segment clips
- [`p2-recording-package.md`](p2-recording-package.md) — 58 modules, 174 segment clips
- [`p3-recording-package.md`](p3-recording-package.md) — 55 modules, 165 segment clips
- [`p4-recording-package.md`](p4-recording-package.md) — 60 modules, 180 segment clips
- [`p5-recording-package.md`](p5-recording-package.md) — 54 modules, 162 segment clips
- [`p6-recording-package.md`](p6-recording-package.md) — 54 modules, 162 segment clips

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
