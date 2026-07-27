# Remaining image render queue — batch instructions

218 modules still need a rendered image (12 of 230 manifest entries are done — the pilot batch). The full ordered queue, split into batches of 3, is in [`remaining-render-queue.json`](remaining-render-queue.json) (73 batches; the last batch has 2 items).

## Ordering

Per the pilot's own scaling recommendation (`visual-qa-report.md`), the queue is ordered in three tiers, not just sequentially by module id:

1. **Tier 1 — Mathematics diagrams** (138 items, P1–P6): exact, schematic, most mechanically verifiable — numbers, shapes, charts with a checkable right answer.
2. **Tier 2 — Basic Science labelled diagrams** (68 items, P1–P5): multi-part diagrams with Hausa labels, less exact but still structured.
3. **Tier 3 — Basic Science illustrations** (12 items, P1–P5): single-scene, unlabelled, most subjective.

Within each tier, ordered by grade band then module id. Do not reorder — earlier tiers are lower-risk and establish patterns (label placement, safety framing) that later tiers reuse.

## Per-batch process (mirrors the pilot exactly)

For each batch of 3:

1. **Author the SVG.** For each of the 3 items, write a new entry in the `art` object in `render-pilot.mjs`, following the existing helper functions (`text`, `line`, `box`, `circle`, `arrow`, `clock`, `grid100`, `eye`, `bulb`, or new helpers if a genuinely new shape is needed) and the existing visual style (background `#f7fbff`, navy `#183153` strokes/text, the same title+divider header via `base()`). The SVG's content must match that item's `depictEn`, `labelsHa` (every label string must appear verbatim in the SVG), and `safetyNote` (nothing prohibited by the safety note may appear in the image) from the manifest entry.
2. **Render.** Run `render-pilot.mjs` (or its batch equivalent) to produce the 3 PNGs at `app/images/<id>.png`, 1536×1024, PNG format — same spec as the pilot.
3. **Validate.** Extend `validate-pilot.mjs`'s spec list (or run an equivalent check) for the 3 new ids: runtime `imageCard` path match, PNG exists at 1536×1024, every `labelsHa` string present in the SVG source, no branding/watermark tokens, and — for any item with an exact numeric/textual answer in `depictEn` — an independent recomputation confirming the displayed value is correct (same pattern as the pilot's `exact` checks for `p2-maths-08`, `p4-maths-16`, etc.).
4. **Visual QA.** Generate a contact sheet for the 3 images and inspect each individually: no clipped text, no English leakage in Hausa fields, no watermark/branding, no unsafe scene (re-check against `safetyNote`), labels legible at both 390px and 1280px card sizes.
5. **Regenerate if needed.** Any image that fails step 3 or 4 gets its SVG revised and re-rendered before moving on — do not carry a failing asset into the next batch.
6. **Report per batch, not per image.** One short status line per batch: `Batch N: 3/3 accepted` or `Batch N: 2/3 first-render, 1/3 regenerated (<id>: <reason>)`.

## Stop conditions

Stop and report — do not guess — if:
- A `depictEn`/`labelsHa`/`safetyNote` in the queue looks wrong or contradicts the live module content (re-check `app/content.json` for that id before proceeding).
- A genuinely new curriculum-accuracy question comes up that the pilot didn't already establish a pattern for (e.g. a new subject area, a new safety-sensitive scene type).
- More than 1 of 3 images in a batch needs regeneration for the same root cause — that signals a systemic issue (e.g. a helper function bug) worth fixing once rather than patching per-image.

## Hard boundaries (unchanged from the pilot)

- Do not touch `app/content.json`, engine files, or the service worker.
- Do not start P6 curriculum authoring or any other unrelated work.
- Do not commit.
- Batch size is 3 — do not render the remaining 218 as one pass, per the pilot's explicit recommendation.
