# AJAMIX overlay-compositor fix: auto-place label helper + opacity bug

**Task ID:** AJAMIX-OVERLAY-AUTOPLACE-1
**Role:** You are the Builder. Implement the design below exactly as specified — this is an architecture spec written by the Architect (Claude), not a request to redesign. Ask for clarification via the report file rather than improvising if something is genuinely ambiguous; otherwise follow the spec precisely.

## Context

`tools/image-pipeline/overlay/compositor.mjs` has never been run for real on any of the 335 accepted AJAMIX curriculum images. A design test (2026-07-21/22) found two problems with the existing "fixed side-margin label box" convention used informally in the image prompts:

1. **Opacity bug:** `labelSvg()` draws each label card at `fill-opacity="0.96"`, not fully opaque, so whatever artwork is underneath partially shows through as a ghost behind the label text.
2. **Margin-width mismatch:** the ~6%-wide blank side margin in the accepted artwork (~90px of 1536px) is far narrower than a real label box needs (~300px), so any label box wide enough for text ends up overlapping actual artwork content, not blank space.

Since all 335 images are already generated and accepted, margins cannot be widened by regenerating art. The fix is a **runtime label-placement algorithm** that finds genuinely blank space within each image at compositing time, rather than assuming a fixed margin convention. A further finding: roughly 22% of images use a multi-panel grid layout (e.g. "three panels side by side") with almost no negative space anywhere, not just at the margins — these are expected to often fail placement and must be cleanly flagged for manual/human review, not force-placed into busy artwork.

## Part 1 — fix the opacity bug (compositor.mjs)

In `labelSvg()`, change the label background rectangle's `fill-opacity` from `"0.96"` to `"1"` (fully opaque). Do not change anything else about the function. This applies regardless of which label-placement strategy is used, so it's unconditional.

## Part 2 — build `tools/image-pipeline/overlay/auto-place-labels.mjs`

Export an async function `autoPlaceLabels(input)` with this exact behavior:

### Input shape
```js
{
  baseArtwork: string,        // path to the base PNG
  canvas: { width, height },  // e.g. 1536, 1024
  title: { textHa: string } | null,   // optional single title label
  labels: [
    { id: string, text: string, targetPoint: { x: number, y: number } }
    // targetPoint is the approximate pixel location in the image the label refers to
  ],
  font: { latinFamily: string, ajamiFamily: string, size: number, lineHeight: number }
    // shared font defaults for all placed labels; title uses size * 1.5, min 40
}
```

### Behavior

1. **Reserved top-band zone:** always treat `{x:0, y:0, width:canvas.width, height:Math.round(canvas.height*0.22)}` as reserved — no per-object label may be placed there, matching the "upper 22% band stays unpainted" convention already used across all 335 accepted images.

2. **Title placement (if `title` is provided):** place a single label box at `{x:40, y:20, width:canvas.width-80, height:170}`, font size `font.size*1.5` (minimum 40), mode `latin`, text = `title.textHa`. This box is always placed (it's the one zone guaranteed blank across the whole accepted set) — no blank-space check needed for it.

3. **Per-object label placement**, processed in the order given in `labels`, for each entry:
   - Estimate the required box size from text length, reusing the exact same formula `compositor.mjs`'s `validateRecord` uses internally for its own fit-check: `estimatedWidth = maxLineCharCount * fontSize * 0.58 + 34`, `estimatedHeight = fontSize * lineHeight + 28` (plus ~12px padding you may add on top of this estimate so placed boxes have breathing room — use your judgement, keep it small).
   - Search for a valid placement near `targetPoint`: try candidate box positions at increasing radii `[50, 90, 130, 170, 210, 250, 300]` px from the target point, at 8 compass-direction angles (0°, 45°, 90°, ..., 315°) per radius, checking radii in increasing order (nearest first) and returning the first candidate that passes all checks below. Center each candidate box on the offset point, then clamp so the box stays fully within the canvas (with a 10px margin from any edge).
   - A candidate box is valid only if ALL of these hold:
     - Fully within canvas bounds (10px edge margin).
     - Does not overlap the reserved top-band zone.
     - Does not overlap any label box already placed earlier in this same call (8px buffer between boxes).
     - **Blank-space check:** sample the actual pixels of `baseArtwork` within the candidate box region (use `sharp` — extract that region and read raw pixel data) and compute the fraction of pixels that are "near-white" (R, G, and B all > 245). Require this fraction to be **≥ 0.92** to accept the candidate. Use a reasonable sampling stride (e.g. every 4th pixel in each dimension) for performance rather than every single pixel — this project's own prior QA scripts used a similar sparse-sampling approach successfully.
   - If a valid candidate is found: record its box, and compute a `callout` line from the nearest point on the box's perimeter to `targetPoint` (with `arrow: true`).
   - If NO valid candidate is found after exhausting all radii/angles: do NOT place this label. Add its `id` to an `unplaceable` list in the result instead of forcing a placement.

4. **Build the final record** matching `labels.schema.json` (`version: "1.0"`, `baseArtwork`, `canvas`, `labels: [...]`) containing the title label (if present) plus every successfully-placed per-object label, each with `mode: "latin"`, one line of text (`script: "latin"`, `direction: "ltr"`, the given `text`), the computed `box`, the shared `font`, and the computed `callout` if applicable.

5. **Validate before returning:** call the existing exported `validateRecord()` from `compositor.mjs` on the built record. If it returns any errors, that's a bug in this new placement logic — throw with the validation errors included, don't silently return an invalid record.

6. **Return value:** `{ record, unplaceable: [ids of labels that couldn't be placed] }`.

Write clear, minimal code. No new dependencies beyond `sharp` (already installed) and the existing `compositor.mjs` exports.

## Part 3 — test harness and real test run

Write a small test script (e.g. `tools/image-pipeline/overlay/test-auto-place.mjs`, one-off, doesn't need to be a formal test suite) that runs `autoPlaceLabels` against these two real cases and then calls `compose()` on each successful result to produce an actual composited PNG for visual review:

**Case A — should mostly succeed** (`style-b-p3-socs-01.png`, 1536×1024):
```js
{
  baseArtwork: 'tools/image-pipeline/output/raw/style-b-p3-socs-01.png',
  canvas: { width: 1536, height: 1024 },
  title: { textHa: 'Ma’ana da Muhimmancin Nazarin Zamantakewa' },
  labels: [
    { id: 'hadin-kai', text: 'Hadɗin kai', targetPoint: { x: 260, y: 560 } },
    { id: 'kayan-jamaa', text: 'Kayan jama’a', targetPoint: { x: 700, y: 820 } }
  ],
  font: { latinFamily: 'DejaVu Sans', ajamiFamily: 'DejaVu Sans', size: 28, lineHeight: 1.2 }
}
```
Output composited PNG to `tools/image-pipeline/output/overlay-test/auto-place-case-a.png`.

**Case B — expected to largely fail-flag, not force-place** (`style-b-p3-socs-02.png`, 1536×1024, a 6-panel grid layout with almost no negative space):
```js
{
  baseArtwork: 'tools/image-pipeline/output/raw/style-b-p3-socs-02.png',
  canvas: { width: 1536, height: 1024 },
  title: { textHa: 'Yankin Ǝaramar Hukumarmu' },
  labels: [
    { id: 'ofishin', text: 'Ofishin Ǝaramar Hukuma', targetPoint: { x: 770, y: 250 } },
    { id: 'kasuwa', text: 'Kasuwa', targetPoint: { x: 250, y: 250 } },
    { id: 'wurin-ruwa', text: 'Wurin ruwa', targetPoint: { x: 1280, y: 200 } },
    { id: 'makaranta', text: 'Makaranta', targetPoint: { x: 250, y: 780 } },
    { id: 'cibiyar-lafiya', text: 'Cibiyar lafiya', targetPoint: { x: 1280, y: 780 } }
  ],
  font: { latinFamily: 'DejaVu Sans', ajamiFamily: 'DejaVu Sans', size: 28, lineHeight: 1.2 }
}
```
Output composited PNG to `tools/image-pipeline/output/overlay-test/auto-place-case-b.png`, and print the `unplaceable` array to the console/report — for this case it is EXPECTED that some or most per-object labels end up unplaceable given the panel-grid layout; that is correct behavior, not a bug, as long as the title still places and nothing gets force-placed into busy artwork.

Run both cases, confirm both composited PNGs are produced without errors, and report the `unplaceable` list for each case.

## Out of scope

- Do NOT run this against any other image beyond the two test cases.
- Do NOT touch `app/content.json`, module JSON, or any file outside `tools/image-pipeline/overlay/` and the two output PNGs above.
- Do NOT run any `git` command.
- Do NOT attempt to solve the panel-grid caption-placement problem — that's explicitly out of scope for this dispatch; panel-grid images are meant to end up flagged in `unplaceable`, not handled specially.

## Report to

Write `tasks/2026-07-23-overlay-autoplace-report.md`: confirm the opacity fix, summarize the algorithm as implemented (note any deviation from spec and why), report the `unplaceable` array for both test cases, and list the two output PNG paths for visual review.
