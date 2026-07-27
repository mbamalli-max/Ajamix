# AJAMIX Builder Brief — Regenerate 4 flagged Social Studies images

**Task ID:** AJAMIX-SOCS-IMAGES-REGEN-4
**Role:** You are the Builder. Generate images using your own image-generation capability (the same one used in the two prior successful runs — 32 images then 6 images, all filed correctly into `tools/image-pipeline/output/raw/`). Asset production only — no Hausa text, no module JSON, no content decisions.

## Context

An independent QA pass reviewed all 30 P5/P6 Social Studies images and flagged 4 as BORDERLINE or FAIL against the Style B safety/style bible. Fixed, strengthened prompts for exactly these 4 have already been drafted at `tasks/2026-07-18-4image-regeneration-prompts.md` — read that file for the full Prompt/Avoid text per image, do not re-derive prompts yourself.

## Scope — exactly 4 images

Read `tasks/2026-07-18-4image-regeneration-prompts.md` and generate one image per each of these 4 sections in that file, using exactly that section's Prompt and Avoid text:

- `p5-socs-04` (Disaster Preparedness and Safety — hazard icons were too graphic)
- `p6-socs-01` (Globalisation — included recognizable real landmarks)
- `p6-socs-04` (Sustainable Development — SDG-wheel color mimicry)
- `p6-socs-15` (Revision/Consolidation — illegible signage text + bank-brand-like livery)

## MANDATORY — output naming

Save each generated image directly as (overwriting the existing flagged file):

```
tools/image-pipeline/output/raw/style-b-<module-id>.png
```

E.g. `tools/image-pipeline/output/raw/style-b-p5-socs-04.png`. If your image tool saves to its own managed directory first, copy/rename into the path above as the immediate next step and verify the file exists with non-zero size before moving to the next prompt.

## Batching

Only 4 images — a single continuous run is fine. If you hit a throughput/rate limit, stop immediately and report exactly how many completed and which remain.

## Out of scope

- Do NOT regenerate any other module image — only these exact 4.
- Do NOT touch `app/content.json`, any runtime file, or any module JSON.
- Do NOT run the overlay compositor.
- Do NOT run any `git` command. No commit, no push, no merge.

## Report to

Write a report to `tasks/2026-07-18-4image-regen-report.md` listing, for each of the 4 module IDs: status (generated/failed/skipped), output file path, and any error detail if failed. Plus a one-line summary (generated/failed/remaining counts).

## Human approval gates

Draft image assets for QA review only — no promotion into `app/images/` as part of this dispatch. These regenerated images will get a second independent QA pass before acceptance.
