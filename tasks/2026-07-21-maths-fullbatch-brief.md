# AJAMIX Builder Brief — Generate remaining Mathematics images (133 images)

**Task ID:** AJAMIX-MATHS-FULLBATCH-1
**Role:** You are the Builder. Generate images using your own image-generation capability (the same one used in all prior successful runs). Asset production only — no Hausa text, no module JSON, no content decisions.

## Context

A 10-image validation batch for Mathematics already ran, went through two rounds of QA/regeneration, and all 10 are now accepted (`tasks/2026-07-21-maths-validation-batch-qa-result.md`, `tasks/2026-07-21-maths-validation-regen2-qa-result.md`). That validation confirmed the digit-stripped, blank-structure prompt strategy works (zero numeral leakage across the highest-risk archetypes: currency, clocks, place-value charts, bar charts), confirmed the global no-religious-architecture template fix holds for this subject, and fixed two real defects (an exact-object-count generation limit, redesigned to avoid needing precise counts; a balance-scale manifest bug that implied a wrong answer). This dispatch generates the remaining 133 images to complete the full 144-image Mathematics set (P1–P6).

All prompts are drafted at `tasks/2026-07-20-maths-chatgpt-prompts.md` — read that file for the exact Prompt/Avoid text per image, do not re-derive or alter any prompt. This file already reflects every fix made during validation.

The prompt doc contains exactly 144 numbered entries (confirmed: `grep -c "^### " tasks/2026-07-20-maths-chatgpt-prompts.md` = 144). Exclude exactly these 11 entries — 10 already accepted from the validation batch, plus `p3-maths-02` (entry #50 in the doc, "Addition with Regrouping"), which is the same module already generated and accepted as the original Style B pilot image at the identical output path:

```
p1-maths-01, p1-maths-03, p1-maths-17, p2-maths-24, p3-maths-01, p3-maths-02,
p4-maths-09, p4-maths-17, p5-maths-22, p6-maths-15, p6-maths-24
```

144 total entries minus these 11 exclusions = exactly 133 images to generate in this dispatch. Generate all other entries across all six bands (P1–P6) using exactly that file's Prompt and Avoid text per image.

## MANDATORY — output naming and freshness verification

Save each generated image directly as:

```
tools/image-pipeline/output/raw/style-b-<id>.png
```

After saving each image, verify it with `stat` (or equivalent): confirm non-zero size AND a modification timestamp from this dispatch run (not a stale/pre-existing file left untouched). A prior dispatch in this project falsely reported two images as "generated" when the files had not actually been overwritten — do not repeat that. Only report an image as generated if you have independently confirmed its output file is fresh.

If your image tool saves to its own managed directory first, copy/rename into the path above as the immediate next step for each image, and verify each file exists with non-zero size and a fresh timestamp before moving to the next.

## Out of scope

- Do NOT regenerate any of the 10 already-accepted validation images listed above, or `p3-maths-02`.
- Do NOT touch `app/content.json`, any runtime file, or any module JSON.
- Do NOT run the overlay compositor.
- Do NOT run any `git` command. No commit, no push, no merge.

## Report to

Write a report to `tasks/2026-07-21-maths-fullbatch-report.md`: a per-image status table (id, generated/failed, output path, output file mtime) plus an overall summary (e.g. "133/133 generated"), plus any error detail for failures.

## Human approval gates

Draft image assets for QA review only — no promotion into `app/images/` as part of this dispatch. Independent QA (per `tools/image-pipeline/qa/manual-checklist.md` and each module's `safetyNote`) happens after, before any acceptance.
