# AJAMIX Builder Brief — Regenerate 3 Mathematics validation images (attempt 2)

**Task ID:** AJAMIX-MATHS-VALIDATION-REGEN-2
**Role:** You are the Builder. Generate images using your own image-generation capability (the same one used in all prior successful runs). Asset production only — no Hausa text, no module JSON, no content decisions.

## Context

This is a follow-up to a prior regeneration dispatch (`AJAMIX-MATHS-VALIDATION-REGEN-1`) that had problems, verified independently after the fact:

- `p1-maths-03`: genuinely failed 5 attempts at rendering exactly ten discrete stepping-stones. The manifest depiction has now been redesigned to remove the exact-count requirement entirely (a continuous path instead of discrete countable stones) — read the updated entry in `tasks/2026-07-20-maths-chatgpt-prompts.md`.
- `p2-maths-24` and `p6-maths-15`: the prior dispatch reported these as "Generated successfully," but independent file-timestamp verification showed the output files were byte-identical to the pre-dispatch versions — they were never actually regenerated despite the report. This dispatch must actually produce new files for these two.

Read `tasks/2026-07-20-maths-chatgpt-prompts.md`, entries `p1-maths-03`, `p2-maths-24`, `p6-maths-15`, for the exact current Prompt/Avoid text — do not re-derive prompts yourself.

## Scope — exactly 3 images

Generate one image per entry using exactly the Prompt/Avoid text in `tasks/2026-07-20-maths-chatgpt-prompts.md` for:

1. `p1-maths-03`
2. `p2-maths-24`
3. `p6-maths-15`

## MANDATORY — output naming and verification

Save each generated image directly as (overwriting the existing file):

```
tools/image-pipeline/output/raw/style-b-p1-maths-03.png
tools/image-pipeline/output/raw/style-b-p2-maths-24.png
tools/image-pipeline/output/raw/style-b-p6-maths-15.png
```

For each image, after saving, run `stat` (or equivalent) on the output file and confirm its modification timestamp is from THIS dispatch run, not an earlier one — a report of "generated" for a file whose timestamp predates this dispatch is a false report and must not happen. If your image tool saves to its own managed directory first, copy/rename into the path above as the immediate next step and verify both non-zero size AND fresh timestamp before reporting success.

## Out of scope

- Do NOT regenerate any image outside these 3.
- Do NOT touch `app/content.json`, any runtime file, or any module JSON.
- Do NOT run the overlay compositor.
- Do NOT run any `git` command. No commit, no push, no merge.

## Report to

Write a report to `tasks/2026-07-21-maths-validation-regen2-report.md`: a per-image status table (id, generated/failed, output path, output file mtime) plus any error detail for failures. Include the mtime explicitly for each file so the report is independently checkable.

## Human approval gates

Draft image assets for QA review only — no promotion into `app/images/` as part of this dispatch. Independent re-QA (including independent file-freshness verification, since the prior dispatch's self-report proved unreliable) happens after, before any decision to proceed with the full 144-image Mathematics batch.
