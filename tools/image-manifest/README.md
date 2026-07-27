# Image-needs manifests

Every module carries `imageCard: "images/<id>.png"`, but no image assets exist anywhere in the repo yet (`app/images/` does not exist) — for any band, not just the ones built this session. An image-needs manifest is a per-band listing of exactly what each module's image should depict, produced after the module content is written and reviewed, so a designer or image-generation pipeline has a concrete brief instead of just a title.

## Workflow

1. After a curriculum band's content is authored and content-reviewed (terminology/safety/progression), scaffold the mechanical fields:

   ```sh
   node tools/image-manifest/generate-image-manifest.mjs --ids=p5-bsci-01,p5-bsci-02,... > /tmp/scaffold.json
   ```

   or against a whole batch file:

   ```sh
   node tools/image-manifest/generate-image-manifest.mjs --file=tools/p5-batch/p5-bsci.json > /tmp/scaffold.json
   ```

2. Fill in the judgment fields for every entry by hand, based on having actually read the module (not guessed from the title):
   - `type` — `"illustration"` (a single scene/object, no labels needed) or `"diagram"` (multiple labeled parts, a process, or a before/after comparison).
   - `depictEn` — a concrete, renderable English description of the scene.
   - `labelsHa` — the exact Hausa words/phrases that should appear as on-image labels, if any. Must be terms already used in the module's own text — do not introduce a new term here that isn't in the learner-facing content.
   - `safetyNote` — anything the image must NOT show, carried forward from the module's own safety boundaries (e.g. no child touching a hazard, no depiction of a substance for a drug-awareness module).

3. Save the completed manifest as `tools/image-manifest/<band>-image-manifest.json` (e.g. `p5-bsci-image-manifest.json`).

## Scope

This produces the *brief* for image work — it does not render or fetch any image, and does not touch `app/content.json` or the `imageCard` field (which already points at the correct future path by convention). Actually generating and placing the PNG files is a separate, later step.

## Existing manifests

- `p1-bsci-image-manifest.json` — P1 Basic Science (`p1-bsci-01..15`).
- `p2-bsci-image-manifest.json` — P2 Basic Science (`p2-bsci-01..19`).
- `p3-bsci-image-manifest.json` — P3 Basic Science (`p3-bsci-01..16`).
- `p4-bsci-image-manifest.json` — P4 Basic Science (`p4-bsci-01..21`).
- `p5-bsci-image-manifest.json` — P5 Basic Science (`p5-bsci-01..15`).
- `p6-bsci-image-manifest.json` — P6 Basic Science (`p6-bsci-01..15`). Includes puberty and human-reproduction modules (`p6-bsci-06`, `p6-bsci-07`); the reproduction image is scoped as an abstract, non-anatomical schematic diagram per an explicit product decision (2026-07-20) — see that entry's `safetyNote` before regenerating.
- `p1-maths-image-manifest.json` through `p6-maths-image-manifest.json` — full Mathematics arc, 24 modules per band (144 total).
- `p1-socs-image-manifest.json` — P1 Social Studies (`p1-socs-01..15`).
- `p2-socs-image-manifest.json` — P2 Social Studies (`p2-socs-01..15`).
- `p3-socs-image-manifest.json` / `p4-socs-image-manifest.json` / `p5-socs-image-manifest.json` / `p6-socs-image-manifest.json` — P3–P6 Social Studies, already generated and QA-accepted (see `tasks/2026-07-17-SOCS-P3-P6-consolidated-review.md`).

`backfill-requested-manifests.mjs` reproduces the P4 Basic Science and P1-P6 Mathematics backfill from live `app/content.json`. It is intentionally content-specific; review its visual rules before rerunning it after lesson-content changes.

Basic Science (p1–p6) and Social Studies (p1–p6) now have full manifest coverage. Mathematics (p1–p6, plus nursery1/nursery2, which are out of image scope) also has full manifest coverage. None of Basic Science's or Mathematics's manifests have been through prompt-doc translation, generation, or QA yet — only Social Studies p3–p6 has completed that pipeline.
