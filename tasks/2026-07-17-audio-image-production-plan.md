# AJAMIX — Audio and Image Asset Production Plan (P3–P6 Social Studies, 60 modules)

**Status:** PLAN ONLY. Nothing in this document has been executed. Scope covers the 60 Social and Citizenship Studies modules just merged live (`p3-socs-01..15` through `p6-socs-01..15`), all of which currently have placeholder `audioFile`/`imageCard` paths and no real assets.

**Decisions already made (2026-07-17):**
- Images: resume Style B as the working direction; run the already-built, dry-run-verified 3-image live test first, before any Social Studies production.
- Audio: user has voice talent/a recording process already lined up. Claude's role is to prepare the recording package and QA tooling, not to produce audio.

---

## PART A — Images

### A0. What already exists (built 2026-07-06 to 2026-07-12, never run live)

- Three style bibles (`tools/image-pipeline/style-bibles/{a,b,c}-*.md`), a shared character/consistency doc (`characters.md`).
- Style B locked as the working direction with 6 numbered constraints (high-contrast focal objects, no pale/muddy washes, selective indigo contours, unpainted label-safe zones, deterministic-only treatment for text/numbers/relationship-lines, and a documented fallback rule: *"if Style B repeatedly fails contrast or consistency on this 3-item test, the next candidate is C. Never A."*).
- A 3-item Style B test queue (`tools/image-pipeline/generate/style-b-archetype-queue.json`) — dry-run verified twice, deterministic, zero live calls made. Items are from Basic Science/Maths (`p2-bsci-16`, `p4-bsci-18`, `p3-maths-02`), not Social Studies — this test validates the *style*, not Social Studies content specifically.
- A deterministic overlay compositor (`tools/image-pipeline/overlay/compositor.mjs`) for adding text/numbers/relationship-lines after generation (these are deliberately excluded from the AI-generated art itself).
- A QA framework (`tools/image-pipeline/qa/`) with a manual acceptance checklist for the 3-item test (contrast/consistency thresholds, deterministic-content-absence check).
- Four Social Studies image-design-intent manifests already built during content authoring (`tools/image-manifest/p{3,4,5,6}-socs-image-manifest*.json`) — 60 entries total, each with `depictEn`, `labelsHa`, `safetyNote`, `type`, and `imagePath` matching the live `content.json`'s `imageCard` field exactly. **These are the source for Step A3 below — no new manifest authoring needed.**

### A1. Prerequisite — credential and cost awareness

- `OPENAI_API_KEY` is not set in this shell (checked presence only, not value, per standing rule). The user needs to supply it in their own environment when ready to run anything `--live`.
- `generate/client.mjs --live` requires both `--authorize-live` AND the env var — a deliberate double-gate. Claude will not attempt to obtain, request, or handle this credential directly; the user sets it up themselves.
- **Real cost note:** each `gpt-image-1` generation call costs money. The 3-item test is cheap; 60 production images (plus retries for QA failures) is a larger, real spend. Recommend the user set a rough budget expectation before authorizing the production run in Step A5.

### A2. Run the pending 3-image Style B live test (before anything else)

1. User sets `OPENAI_API_KEY` in their environment and gives explicit authorization to run the exact command already documented in the 2026-07-12 report:
   ```sh
   cd tools/image-pipeline
   NODE_PATH='...' node generate/client.mjs --live --authorize-live --queue generate/style-b-archetype-queue.json
   ```
2. Claude reviews the 3 output images against the existing QA checklist (`qa/manual-checklist.md` → "Style B archetype test acceptance") — contrast/consistency thresholds, deterministic-content absence — and reports findings.
3. **User makes the Go/Fallback call** (this is explicitly documented as never automatic): accept Style B, or fall back to Style C. If C, the plan below re-runs with Style C's bible instead — same structure, different style source.

### A3. Build the Social Studies production queue (60 items)

- Convert the 4 existing `p{3,4,5,6}-socs-image-manifest*.json` files into the `generate/client.mjs` queue format (same structure as the 3-item test: full/negative Style B prompts per item, output path, source-manifest provenance, deterministic-overlay instructions for any labelsHa content).
- No new creative decisions here — this is mechanical transformation of already-approved design intent (each manifest entry already has `depictEn`/`labelsHa`/`safetyNote` from the content-authoring phase, independently verified at the time).
- Claude builds this queue file directly (mechanical task, same pattern as the merge scripts) — not dispatched to Codex.

### A4. Pilot batch before full production

Recommend piloting a small batch (e.g., the 6 `p3-socs-01..06` images) fully through generation → overlay → QA → promotion before running all 60, mirroring the same "prove it small before scaling" discipline used throughout content authoring (M1 pilot). This catches queue-format bugs, style-consistency issues, or cost surprises before they multiply across 60 items.

### A5. Full production run (post-pilot approval)

- Dry-run each band's queue first (zero cost, catches structural bugs), then live-run with explicit `--authorize-live` per band (or per whatever batch size the user prefers after seeing pilot results).
- Recommend band-by-band (15 at a time) to match the content workstream's checkpoint pattern — review each band's output before moving to the next, rather than committing to all 60 at once.

### A6. Overlay compositing pass

- Run `overlay/compositor.mjs` against each accepted raw image + its manifest's `labelsHa` to add deterministic Hausa text labels (the AI generation step deliberately excludes rendered text per the style-bible constraints).

### A7. QA pass per image

- Automated: deterministic-content-absence check (no AI-rendered text/numbers where overlay should supply them), file format/dimensions.
- Manual: human review against `depictEn` and `safetyNote` per manifest entry — does the image show what was asked, and does it avoid what was prohibited (this is the same neutrality/safety discipline applied to the Hausa content itself).

### A8. Guarded promotion into `app/`

- A new guarded script (mirroring the merge-script pattern): moves accepted, overlaid PNGs from `tools/image-pipeline/output/accepted/` into `app/images/`, verifies each filename exactly matches the live `content.json`'s `imageCard` value for that module, fails loudly on any mismatch or collision, and touches nothing else under `app/`.

---

## PART B — Audio

### B0. Reality check from the project's own PRD

> "Bottleneck: audio recording and TIMSAN review (not writing)" — `docs/PRD.md`

Audio production for AJAMIX is a **human voice-recording + TIMSAN-review workflow**, not a generation task. There is no TTS pipeline in this repo, and commercial Hausa TTS quality is generally poor. Claude's role is limited to: preparing the recording package, defining the technical spec, building QA/verification tooling for delivered audio, and building the guarded promotion script — not producing audio itself.

### B1. Technical spec (from `docs/PRD.md` and `docs/TAS.md`)

- **Format:** MP3, 64kbps, mono.
- **Duration:** 3–5 minutes per module (PRD spec; the actual `audioScript` length per module should roughly determine natural spoken duration — no hard per-module target beyond this range).
- **Structure:** each `audioScript` already contains `[INTRO]`, `[MAIN]`, `[PAUSE 1]`, `[MAIN]`, `[PAUSE 2]`, `[OUTRO]` markers — these are the voice talent's cues for where to pause naturally in delivery, not literal spoken text.
- **Micro-pause timing:** the app's audio engine (`app/app.js`) triggers a pause when playback time is within **±500ms** of the module's `microPauses[].pauseAtMs` value. The current live values (90000ms / 150000ms, i.e. 1:30 and 2:30) were placeholder estimates set during content authoring — **they will almost certainly not match real human narration pacing.** After each module is recorded, the actual timestamp of each `[PAUSE N]` moment in the final audio must be measured and `pauseAtMs` updated to match (see B4).

### B2. Recording package (Claude builds this directly, mechanical extraction)

One package per module (or per band, whichever the user's recording process prefers), containing:
- `titleEn` / `titleHa` for reference.
- The full `audioScript` text with `[INTRO]`/`[MAIN]`/`[PAUSE N]`/`[OUTRO]` markers clearly formatted for a reader.
- The two `microPauses[].questionHa` texts, so the voice talent/director knows what's being asked at each pause (context, not something to read aloud).
- Target filename (`audioFile` field, e.g. `audio/p3-socs-01.mp3`) so delivered files are named correctly from the start.
- The technical spec from B1.

This is pure extraction from the already-live, already-approved `content.json` — no new authoring or judgment calls.

### B3. Recording (external, user's process)

Not Claude's task. User's voice talent records per the package in B2.

### B4. Delivered-audio QA tooling (Claude builds, requires `ffmpeg`/`ffprobe`)

**Prerequisite:** `ffmpeg`/`ffprobe` are not currently installed in this environment — needed to programmatically check format/bitrate/channels/duration. User needs to install these (e.g. `brew install ffmpeg`) before this tooling can run.

A script per delivered batch that checks, for each file:
- Exists at the exact expected path/filename.
- Format is MP3, mono, ~64kbps (tolerance range), duration within roughly 2.5–5.5 minutes (a little slack around the 3–5 min spec).
- Flags anything out of spec for the user's attention rather than silently accepting or rejecting.
- Does NOT and cannot check Hausa pronunciation/accuracy/naturalness — that's TIMSAN's job (B5).

### B5. TIMSAN content-accuracy review (external, per PRD's existing process)

Per the PRD, this already has an established channel (WhatsApp group with TIMSAN reviewers). Not something Claude builds or participates in — the delivered audio goes through that existing human review process before being considered final.

### B6. Pause-timestamp reconciliation

After a module's audio passes B4 (format) and B5 (content) review:
- Someone (user's process — could be the recording engineer noting timestamps during editing, or a simple listen-and-mark step) identifies the actual playback time of each `[PAUSE N]` moment in the final MP3.
- A narrowly-scoped guarded script updates only that module's `microPauses[0].pauseAtMs` and `microPauses[1].pauseAtMs` in `app/content.json` to the real values — same guarded/verified/backed-up pattern as the content merges, but touching only two numeric fields per module, nothing else.

### B7. Pilot batch before full recording

Recommend recording and fully QA-ing a small pilot batch (e.g., 2–3 modules) before committing to all 60 — validates the recording quality, the pause-timing workflow end-to-end, and TIMSAN review turnaround time, before scaling up.

### B8. Guarded promotion into `app/`

- A new guarded script: moves QA-passed, TIMSAN-approved MP3s from wherever they're delivered into `app/audio/`, verifies filenames match `audioFile` exactly, fails loudly on mismatch, touches nothing else.

---

## Open sequencing question for the user

Images (Part A) and audio (Part B) are fully independent tracks — they can run in parallel, or one after the other, in either order. Recommend starting with **A2 (the pending 3-image Style B test)** since it's a small, cheap, already-fully-prepared step that's been sitting ready since July 12, while B2 (building the audio recording package, a zero-cost mechanical task) can happen anytime in parallel.
