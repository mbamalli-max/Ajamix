# AJAMIX Builder Brief — Regenerate 3 flagged Mathematics validation images

**Task ID:** AJAMIX-MATHS-VALIDATION-REGEN-1
**Role:** You are the Builder. Generate images using your own image-generation capability (the same one used in all prior successful runs). Asset production only — no Hausa text, no module JSON, no content decisions.

## Context

QA on the 10-image Mathematics validation batch (`tasks/2026-07-21-maths-validation-batch-qa-result.md`) found 1 FAIL and 2 BORDERLINE requiring regeneration (a 4th BORDERLINE, `p6-maths-24`, was resolved by a ruling — operator glyphs are acceptable artwork — and needs no regeneration). The manifests for these 3 were updated with strengthened language and the shared prompt doc was regenerated. Read the exact Prompt/Avoid text from `tasks/2026-07-20-maths-chatgpt-prompts.md`, entries `p1-maths-03`, `p2-maths-24`, `p6-maths-15` — do not re-derive prompts yourself.

Defects being fixed:
- `p1-maths-03`: twelve stepping-stones rendered instead of the required ten (fatal for a counting module), plus a tree canopy breaking into the required blank top band.
- `p2-maths-24`: the two clocks' hour hands were supposed to match exactly (only the minute hand should differ) — one clock read ~7:00, the other ~10:30, both hands mismatched.
- `p6-maths-15`: this was a manifest wording bug, not a rendering bug — the two balance-scale pans were described as "matching" counter groups, so the model correctly rendered them equal, which visually implies the unknown box equals zero. The manifest now explicitly requires an unequal, visibly larger group on the non-box side.

## Scope — exactly 3 images

Generate one image per entry using exactly the Prompt/Avoid text in `tasks/2026-07-20-maths-chatgpt-prompts.md` for:

1. `p1-maths-03`
2. `p2-maths-24`
3. `p6-maths-15`

## MANDATORY — output naming

Save each generated image directly as (overwriting the existing file):

```
tools/image-pipeline/output/raw/style-b-p1-maths-03.png
tools/image-pipeline/output/raw/style-b-p2-maths-24.png
tools/image-pipeline/output/raw/style-b-p6-maths-15.png
```

If your image tool saves to its own managed directory first, copy/rename into the path above as the immediate next step for each image, and verify each file exists with non-zero size before moving to the next.

## Out of scope

- Do NOT regenerate any image outside these 3.
- Do NOT touch `app/content.json`, any runtime file, or any module JSON.
- Do NOT run the overlay compositor.
- Do NOT run any `git` command. No commit, no push, no merge.

## Report to

Write a report to `tasks/2026-07-21-maths-validation-regen-report.md`: a per-image status table (id, generated/failed, output path) plus any error detail for failures.

## Human approval gates

Draft image assets for QA review only — no promotion into `app/images/` as part of this dispatch. Independent re-QA happens after — specifically re-counting `p1-maths-03`'s stepping-stones, re-checking `p2-maths-24`'s hour-hand alignment, and confirming `p6-maths-15`'s two pans are now visibly unequal — before any decision to proceed with the full 144-image Mathematics batch.
