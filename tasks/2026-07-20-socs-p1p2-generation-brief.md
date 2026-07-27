# AJAMIX Builder Brief — Generate P1–P2 Social Studies images (30 images)

**Task ID:** AJAMIX-SOCS-P1P2-IMAGE-GEN-1
**Role:** You are the Builder. Generate the images using your own image-generation capability (the same one used in all prior successful runs). Asset production only — no Hausa text, no module JSON, no content decisions.

## Context

This is the next production batch in the AJAMIX Social Studies image set. P3–P6 (60 images) are already generated, QA'd, and accepted. P1–P2 (30 images) have never been generated. The full prompt set is already drafted at `tasks/2026-07-20-socs-p1p2-chatgpt-prompts.md` — read that file for every image's Prompt/Avoid/save-as filename/overlay-label text. Do not re-derive or improvise prompts; use exactly what's in that file.

## Scope — exactly 30 images

Generate one image per entry in `tasks/2026-07-20-socs-p1p2-chatgpt-prompts.md` (Band P1: 15 images, Band P2: 15 images), using exactly that file's Prompt and Negative/Avoid text for each.

## MANDATORY — output naming

Save each generated image directly as (do not rename, do not skip the `style-b-` prefix):

```
tools/image-pipeline/output/raw/style-b-<id>.png
```

e.g. `tools/image-pipeline/output/raw/style-b-p1-socs-01.png`, `style-b-p1-socs-02.png`, ... `style-b-p2-socs-15.png`.

If your image tool saves to its own managed directory first, copy/rename into the path above as the immediate next step for each image and verify the file exists with non-zero size before moving to the next.

## Out of scope

- Do NOT touch `app/content.json`, any runtime file, or any module JSON.
- Do NOT run the overlay compositor.
- Do NOT promote any image into `app/images/`.
- Do NOT run any `git` command. No commit, no push, no merge.
- Do NOT generate any image outside the 30 listed in the prompt doc.

## Report to

Write a report to `tasks/2026-07-20-socs-p1p2-generation-report.md`: a per-image status table (id, generated/failed, output path) plus any error detail for failures.

## Human approval gates

Draft image assets for QA review only — no promotion into `app/images/` as part of this dispatch. Independent QA (dimensions, content-absence check, style/safety review against `tools/image-pipeline/qa/manual-checklist.md`) happens after, before any acceptance.
