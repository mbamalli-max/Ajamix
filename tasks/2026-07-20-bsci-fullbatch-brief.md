# AJAMIX Builder Brief — Generate remaining Basic Science images (91 images)

**Task ID:** AJAMIX-BSCI-FULLBATCH-1
**Role:** You are the Builder. Generate images using your own image-generation capability (the same one used in all prior successful runs). Asset production only — no Hausa text, no module JSON, no content decisions.

## Context

A 10-image validation batch for Basic Science already ran, was QA'd, and all 10 are now accepted (`tasks/2026-07-20-bsci-validation-batch-qa-result.md`, `tasks/2026-07-20-bsci-validation-regen-qa-result.md`, `tasks/2026-07-20-p6-bsci-07-symbolic-qa-result.md`). That validation confirmed the Style B prompt template holds up, including for the two most safety-sensitive modules in the set. This dispatch generates the remaining 91 images to complete the full 101-image Basic Science set (P1–P6).

All prompts are drafted at `tasks/2026-07-20-bsci-chatgpt-prompts.md` — read that file for the exact Prompt/Avoid text per image, do not re-derive or alter any prompt. Note: the `p6-bsci-07` entry in that file already reflects the corrected, accepted symbolic-diagram version — but `p6-bsci-07` itself is NOT part of this dispatch's scope (already generated and accepted).

## Scope — exactly 91 images (do NOT regenerate the 10 already-accepted validation images)

Generate one image for every entry in `tasks/2026-07-20-bsci-chatgpt-prompts.md` EXCEPT these 10, which are already generated and accepted — skip them entirely:

```
p1-bsci-01, p1-bsci-14, p2-bsci-01, p3-bsci-06, p3-bsci-13,
p5-bsci-15, p6-bsci-06, p6-bsci-07, p6-bsci-09, p6-bsci-12
```

Generate all other entries across all six bands (P1–P6) using exactly that file's Prompt and Avoid text per image.

## MANDATORY — output naming

Save each generated image directly as:

```
tools/image-pipeline/output/raw/style-b-<id>.png
```

If your image tool saves to its own managed directory first, copy/rename into the path above as the immediate next step for each image, and verify each file exists with non-zero size before moving to the next.

## Out of scope

- Do NOT regenerate any of the 10 already-accepted validation images listed above.
- Do NOT touch `app/content.json`, any runtime file, or any module JSON.
- Do NOT run the overlay compositor.
- Do NOT run any `git` command. No commit, no push, no merge.

## Report to

Write a report to `tasks/2026-07-20-bsci-fullbatch-report.md`: a per-image status table (id, generated/failed, output path) plus an overall summary (e.g. "91/91 generated"), plus any error detail for failures.

## Human approval gates

Draft image assets for QA review only — no promotion into `app/images/` as part of this dispatch. Independent QA (per `tools/image-pipeline/qa/manual-checklist.md` and each module's `safetyNote`) happens after, before any acceptance.
