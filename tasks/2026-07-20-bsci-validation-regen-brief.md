# AJAMIX Builder Brief — Regenerate 3 flagged Basic Science validation images

**Task ID:** AJAMIX-BSCI-VALIDATION-REGEN-1
**Role:** You are the Builder. Generate images using your own image-generation capability (the same one used in all prior successful runs). Asset production only — no Hausa text, no module JSON, no content decisions.

## Context

QA on the 10-image Basic Science validation batch (`tasks/2026-07-20-bsci-validation-batch-qa-result.md`) found 1 FAIL (`p6-bsci-07` — the most sensitive image in the entire Basic Science set, failed its safety bar due to realistic facial detail on fetal-development panels) and 2 BORDERLINE (`p6-bsci-06` incidental mosque background, `p6-bsci-12` legible numerals baked into a ruler/tape measure). Strengthened prompts targeting exactly these defects are already drafted at `tasks/2026-07-20-bsci-validation-regen-prompts.md` — read that file for the full Prompt/Avoid text per image, do not re-derive prompts yourself.

`p6-bsci-07` is the highest-priority fix in this dispatch — treat its prompt's constraints as non-negotiable, not stylistic suggestions.

## Scope — exactly 3 images

Read `tasks/2026-07-20-bsci-validation-regen-prompts.md` and generate one image per entry using exactly that file's Prompt and Avoid text:

1. `p6-bsci-07`
2. `p6-bsci-06`
3. `p6-bsci-12`

## MANDATORY — output naming

Save each generated image directly as (overwriting the existing file):

```
tools/image-pipeline/output/raw/style-b-p6-bsci-07.png
tools/image-pipeline/output/raw/style-b-p6-bsci-06.png
tools/image-pipeline/output/raw/style-b-p6-bsci-12.png
```

If your image tool saves to its own managed directory first, copy/rename into the path above as the immediate next step for each image, and verify each file exists with non-zero size before moving to the next.

## Out of scope

- Do NOT regenerate any image outside these 3.
- Do NOT touch `app/content.json`, any runtime file, or any module JSON.
- Do NOT run the overlay compositor.
- Do NOT run any `git` command. No commit, no push, no merge.

## Report to

Write a report to `tasks/2026-07-20-bsci-validation-regen-report.md`: a per-image status table (id, generated/failed, output path) plus any error detail for failures.

## Human approval gates

Draft image assets for QA review only — no promotion into `app/images/` as part of this dispatch. Independent re-QA happens after — with the same zero-tolerance safety-bar check specifically re-applied to `p6-bsci-07` — before any decision to proceed with the full 101-image Basic Science batch.
