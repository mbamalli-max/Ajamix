# AJAMIX Builder Brief — Regenerate 5 flagged Mathematics images

**Task ID:** AJAMIX-MATHS-FULLBATCH-REGEN-1
**Role:** You are the Builder. Generate images using your own image-generation capability (the same one used in all prior successful runs). Asset production only — no Hausa text, no module JSON, no content decisions.

## Context

QA on the 133-image Mathematics full-batch dispatch (`tasks/2026-07-21-maths-fullbatch-qa-result.md`) found 1 FAIL and 4 BORDERLINE. The manifests for all 5 were updated with strengthened, more explicit language and the shared prompt doc was regenerated. Read the exact current Prompt/Avoid text from `tasks/2026-07-20-maths-chatgpt-prompts.md` for each of the 5 entries listed below — do not re-derive prompts yourself.

Defects being fixed:
- `p5-maths-23` (FAIL): a legible "20" was printed into the corners of the naira-note artwork as a decorative engraving pattern — direct numeral leakage. Prompt now explicitly forbids any decorative pattern resembling a digit.
- `p2-maths-14` (BORDERLINE): the side panel meant to show three blank stepping-stones instead rendered unrelated eraser icons. Prompt now explicitly names the required shape and forbids substituting other objects.
- `p6-maths-01` (BORDERLINE): rendered a 10-column place-value chart where exactly 6 columns were required. Prompt now names all six columns explicitly in order.
- `p6-maths-04` (BORDERLINE): rendered a continuous multi-column chart instead of the required two-partial-product-boxes-merging-into-one-result split-diagram. Prompt now explicitly describes the two-box structure and forbids a continuous chart.
- `p6-maths-14` (BORDERLINE): the required connecting arrows between rows were missing entirely. Prompt now explicitly requires visible arrows between each row.

## Scope — exactly 5 images

Generate one image per entry using exactly the Prompt/Avoid text in `tasks/2026-07-20-maths-chatgpt-prompts.md` for:

1. `p5-maths-23`
2. `p2-maths-14`
3. `p6-maths-01`
4. `p6-maths-04`
5. `p6-maths-14`

## MANDATORY — output naming and freshness verification

Save each generated image directly as (overwriting the existing file):

```
tools/image-pipeline/output/raw/style-b-p5-maths-23.png
tools/image-pipeline/output/raw/style-b-p2-maths-14.png
tools/image-pipeline/output/raw/style-b-p6-maths-01.png
tools/image-pipeline/output/raw/style-b-p6-maths-04.png
tools/image-pipeline/output/raw/style-b-p6-maths-14.png
```

For each image, after saving, verify with `stat` that the output file's modification timestamp is from this dispatch run, not a stale/pre-existing file. Only report an image as generated if you have independently confirmed its output file is fresh and non-zero size. If your image tool saves to its own managed directory first, copy/rename into the path above as the immediate next step for each image.

## Out of scope

- Do NOT regenerate any image outside these 5.
- Do NOT touch `app/content.json`, any runtime file, or any module JSON.
- Do NOT run the overlay compositor.
- Do NOT run any `git` command. No commit, no push, no merge.

## Report to

Write a report to `tasks/2026-07-22-maths-fullbatch-regen-report.md`: a per-image status table (id, generated/failed, output path, output file mtime) plus any error detail for failures.

## Human approval gates

Draft image assets for QA review only — no promotion into `app/images/` as part of this dispatch. Independent re-QA happens after — specifically re-checking `p5-maths-23` for any numeral/digit leakage, `p2-maths-14`'s side-panel shapes, `p6-maths-01`'s exact column count, `p6-maths-04`'s two-box structure, and `p6-maths-14`'s arrows — before any final acceptance of the full Mathematics set.
