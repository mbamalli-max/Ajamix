# AJAMIX Builder Brief — Regenerate 5 flagged P1–P2 Social Studies images

**Task ID:** AJAMIX-SOCS-P1P2-REGEN-1
**Role:** You are the Builder. Generate images using your own image-generation capability (the same one used in all prior successful runs). Asset production only — no Hausa text, no module JSON, no content decisions.

## Context

QA on the 30-image P1–P2 Social Studies batch (`tasks/2026-07-20-socs-p1p2-qa-result.md`) found 1 FAIL and 4 BORDERLINE images: a recurring mosque-architecture default where manifests explicitly required a "neutral place of worship," plus one factual error (coat-of-arms eagle rendered red instead of black). Strengthened prompts targeting exactly these defects are already drafted at `tasks/2026-07-20-socs-p1p2-regen-prompts.md` — read that file for the full Prompt/Avoid text per image, do not re-derive prompts yourself.

## Scope — exactly 5 images

Read `tasks/2026-07-20-socs-p1p2-regen-prompts.md` and generate one image per entry using exactly that file's Prompt and Avoid text:

1. `p1-socs-09`
2. `p1-socs-14`
3. `p2-socs-04`
4. `p2-socs-05`
5. `p2-socs-11`

## MANDATORY — output naming

Save each generated image directly as (overwriting the existing file):

```
tools/image-pipeline/output/raw/style-b-p1-socs-09.png
tools/image-pipeline/output/raw/style-b-p1-socs-14.png
tools/image-pipeline/output/raw/style-b-p2-socs-04.png
tools/image-pipeline/output/raw/style-b-p2-socs-05.png
tools/image-pipeline/output/raw/style-b-p2-socs-11.png
```

If your image tool saves to its own managed directory first, copy/rename into the path above as the immediate next step for each image, and verify each file exists with non-zero size before moving to the next.

## Out of scope

- Do NOT regenerate any image outside these 5.
- Do NOT touch `app/content.json`, any runtime file, or any module JSON.
- Do NOT run the overlay compositor.
- Do NOT run any `git` command. No commit, no push, no merge.

## Report to

Write a report to `tasks/2026-07-20-socs-p1p2-regen-report.md`: a per-image status table (id, generated/failed, output path) plus any error detail for failures.

## Human approval gates

Draft image assets for QA review only — no promotion into `app/images/` as part of this dispatch. Independent re-QA (specifically re-checking worship-building architecture and the coat-of-arms eagle colour) happens after, before any acceptance.
