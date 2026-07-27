# AJAMIX Builder Brief — Basic Science validation batch (10 images)

**Task ID:** AJAMIX-BSCI-VALIDATION-1
**Role:** You are the Builder. Generate images using your own image-generation capability (the same one used in all prior successful runs). Asset production only — no Hausa text, no module JSON, no content decisions.

## Context

This is a small validation batch ahead of the full 101-image Basic Science set, since Basic Science includes content-safety-sensitive modules (puberty, human reproduction, hazard/safety-procedure sequences). The 10 prompts are already fully drafted at `tasks/2026-07-20-bsci-validation-batch-prompts.md` — read that file for the exact Prompt/Avoid text per image, do not re-derive or alter any prompt.

## Scope — exactly 10 images

Generate one image per entry in `tasks/2026-07-20-bsci-validation-batch-prompts.md`, using exactly that file's Prompt and Avoid text for each:

1. `p1-bsci-01`
2. `p1-bsci-14`
3. `p2-bsci-01`
4. `p3-bsci-06`
5. `p3-bsci-13`
6. `p5-bsci-15`
7. `p6-bsci-06`
8. `p6-bsci-07`
9. `p6-bsci-09`
10. `p6-bsci-12`

## MANDATORY — output naming

Save each generated image directly as:

```
tools/image-pipeline/output/raw/style-b-<id>.png
```

e.g. `tools/image-pipeline/output/raw/style-b-p1-bsci-01.png`. If your image tool saves to its own managed directory first, copy/rename into the path above as the immediate next step for each image, and verify each file exists with non-zero size before moving to the next.

## Out of scope

- Do NOT generate any image outside the 10 listed above.
- Do NOT touch `app/content.json`, any runtime file, or any module JSON.
- Do NOT run the overlay compositor.
- Do NOT run any `git` command. No commit, no push, no merge.

## Report to

Write a report to `tasks/2026-07-20-bsci-validation-batch-report.md`: a per-image status table (id, generated/failed, output path) plus any error detail for failures.

## Human approval gates

Draft image assets for QA review only — no promotion into `app/images/` as part of this dispatch. Independent QA (dimensions, content-absence check, and especially careful safety review against `tools/image-pipeline/qa/manual-checklist.md` and each module's `safetyNote` for the two sensitive modules, `p6-bsci-06` and `p6-bsci-07`) happens after, before any acceptance or decision to proceed with the full 101-image batch.
