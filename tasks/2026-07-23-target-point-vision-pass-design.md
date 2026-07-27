# AJAMIX target-point vision pass — design

## Scope

`autoPlaceLabels()` (built and validated 2026-07-23) needs a `targetPoint: {x, y}` per label to work.
Across all 335 accepted images:

- **693 label instances** need a target point, across **201 images** (the other 134 images have
  `labelsHa: []` and need only the title placement — no vision pass required for those).
- **270 diagram-type / 65 illustration-type** images. Diagrams (community maps, science schematics,
  multi-panel comparisons) typically have one discrete visual element per label. Illustrations
  (single cohesive scenes) typically have thematic labels ("Haɗin kai" = cooperation) that don't map to
  one object — the target is closer to "the part of the scene that best represents this idea."
- Label-count distribution is heavily right-skewed: 134 images need 0, 32 need 1, 51 need 2 — but the
  tail (6+ labels) is 37 images, mostly multi-panel diagrams and revision-poster/wheel archetypes.

## Output contract

One JSON file per subject-band, alongside the existing manifests, e.g.
`tools/image-pipeline/overlay/target-points/p3-socs-target-points.json`:

```json
[
  {
    "id": "p3-socs-02",
    "labels": [
      { "text": "Ofishin Ƙaramar Hukuma", "targetPoint": { "x": 0.50, "y": 0.24 }, "confidence": "high" },
      { "text": "Kasuwa", "targetPoint": { "x": 0.16, "y": 0.24 }, "confidence": "high" }
    ]
  }
]
```

- `targetPoint` is **fractional** (0–1 in both axes), not absolute pixels — all 335 images share the
  1536×1024 canvas today, but fractional coordinates stay correct if that ever changes, and they're what
  a vision reviewer naturally estimates ("about a third of the way down, just left of center") rather
  than a precise pixel guess.
- `text` is included (not just an index) so the file is self-checking against
  `labelsHa` — a consumer can assert the arrays match order/content before calling `autoPlaceLabels`.
- `confidence: "high" | "medium" | "low"` — set by the reviewer. `"low"` means "I couldn't find one
  clear visual anchor for this label" (typical for thematic illustration labels, or a label whose
  referent isn't clearly visible/distinguishable in the art). Low-confidence points still get produced
  (a best-effort estimate), but are surfaced separately for a lighter human spot-check rather than
  silently trusted at the same level as a clear diagram callout.

## Vision-pass instructions (what each reviewer does, per image)

For each image with `labelsHa.length > 0`:

1. Read the manifest entry (`titleEn`, `depictEn`, `type`, `labelsHa`) for context on what each label
   means and what the image is supposed to depict.
2. View the actual PNG (`tools/image-pipeline/output/raw/style-b-<id>.png`).
3. For each label text in `labelsHa`, in order:
   - **Diagram type:** find the specific object/panel/element in the image that the label names, and
     estimate the fractional coordinate of its visual center (or, for a building/object with clear
     bounds, the center of that bounds). Confidence `high` unless the element is ambiguous or the
     art doesn't clearly separate it from something else.
   - **Illustration type:** find the sub-area of the scene that most represents the labeled concept
     (e.g., for "Haɗin kai"/cooperation, the cluster of figures visibly cooperating on something).
     Confidence `medium` by default for thematic labels — they're inherently softer than a diagram
     callout — dropping to `low` only if no sub-area stands out at all.
   - **Multi-panel diagrams:** prefer a point inside the relevant panel, roughly centered, away from
     the panel's own edges — this gives `autoPlaceLabels` the most room to find gutter space nearby
     (this is exactly what worked in the `p3-socs-02` test case).
4. Do not try to guess where the label box itself will end up — that's `autoPlaceLabels`'s job. Only
   estimate where the *labeled thing* is.

## Execution plan

201 images is too many for one subagent call in a single context window (the earlier 91/133-image QA
passes already ran ~15–20 minutes each just reading and reasoning over images without producing
structured per-label output too). Batch it:

- **Chunk size: ~8–10 images per subagent** (Muhammad's call, 2026-07-23 — smaller than the initial
  ~15-image proposal, trading more subagent calls for lower risk of any single subagent running out of
  reasoning budget on a label-heavy image). That's **~22–25 chunks** across the 201 labeled images.
- **Pilot: `p3-socs` band (15 images, all three type values present — illustration/diagram/comparison —
  and includes `p3-socs-15`, the single highest-label-count image in the whole dataset at 8 labels)**,
  run as one dispatch before committing to the full ~22–25 chunk run, per Muhammad's call to pilot first.
- Chunks should be drawn **within a subject-band** (e.g., one chunk = all of `p3-socs`, or a slice of
  `p4-maths`) so each subagent only needs to load one or two manifest files, not the whole set.
- Run chunks as **parallel background subagents** (this project's established pattern for QA passes),
  each writing its own `<band>-target-points.json` file (or a slice of one, merged after).
- Each subagent gets: the relevant manifest file(s), the vision-pass instructions above, and its
  specific list of image ids to cover — mirroring how QA dispatches have been scoped all along this
  session.

## Validation / QA strategy

Full manual re-verification of 693 individual coordinates isn't worth the cost. Two-tier approach:

1. **Automatic**: every target point flows into `autoPlaceLabels`, which independently verifies real
   blank space exists near it — a badly-wrong target point usually just produces more `unplaceable`
   results (safe failure) rather than a silently bad placement, since the algorithm never places a label
   over non-blank pixels regardless of where the target point says to look.
2. **Spot-check**: after generation, sample a handful of composited outputs per subject (say 3–5 each,
   prioritizing `low`-confidence points and images with 6+ labels, the highest-complexity cases) and
   visually confirm the callout lines point at sensible things. This is a QA pass in the same style
   already used throughout this project — not exhaustive, but targeted at the highest-risk cases.

## Rough scale estimate

- ~14 parallel subagent chunks, each covering ~15 images / ~45–50 label estimates.
- Downstream: once target-point files exist, running `autoPlaceLabels` + `compose()` across all 335
  images is fast/deterministic (seconds, not a vision task) — that's a separate, later script, not part
  of this pass.

## Open decision for Muhammad

This design is ready to execute as a dispatch (or a batch of parallel subagent dispatches). Two things
worth confirming before running it at full scale:
1. Chunk size / parallelism level (~14 chunks proposed) — fine as-is, or prefer smaller/larger batches?
2. Whether to run a small pilot chunk first (e.g. one band, ~15 images) to sanity-check the output
   quality before committing to all 14 chunks — consistent with the validation-batch-first pattern used
   for the image-generation phase.
