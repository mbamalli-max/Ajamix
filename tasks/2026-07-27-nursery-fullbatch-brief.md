# AJAMIX Builder Brief — Generate Nursery 1/2 Mathematics images (24 images)

**Task ID:** AJAMIX-NURSERY-FULLBATCH-1
**Role:** You are the Builder. Generate images using your own image-generation capability (the same one used in all prior successful runs — Basic Science P1-P6, Social Studies P1-P2, the P3 maths pilot). Asset production only — no Hausa text, no module JSON, no content decisions.

## Context

The nursery1/nursery2 Mathematics band (24 modules) has never had images produced — this is new production,
not a regeneration. All prompts are drafted at `tasks/2026-07-27-nursery-chatgpt-prompts.md` — read that
file for the exact Prompt/Avoid text per image, do not re-derive or alter any prompt. It already includes
the mosque-architecture exclusion clause from the Basic Science batch's lesson learned; do not weaken or
remove it.

## Scope — all 24 images

Generate one image for every entry in `tasks/2026-07-27-nursery-chatgpt-prompts.md`:

```
n1-maths-01 through n1-maths-12 (Nursery 1)
n2-maths-01 through n2-maths-12 (Nursery 2)
```

## MANDATORY — output naming

Save each generated image directly as:

```
tools/image-pipeline/output/raw/style-b-<id>.png
```

If your image tool saves to its own managed directory first, copy/rename into the path above as the
immediate next step for each image, and verify each file exists with non-zero size before moving to the
next.

## Out of scope

- Do NOT touch `app/content.json`, any runtime file, or any module JSON.
- Do NOT touch either image manifest file.
- Do NOT run the overlay compositor.
- Do NOT promote anything into `app/images/`.
- Do NOT run any `git` command. No commit, no push, no merge.

## Report contents

A per-image status table (id, generated/failed, output path) plus an overall summary (e.g. "24/24
generated"), plus any error detail for failures.

Report to:        /Users/muhammadbamalli/Documents/ajamix/tasks/2026-07-27-nursery-fullbatch-report.md
Add-dir required: none

## Human approval gates

Draft image assets for QA review only — no promotion into `app/images/` as part of this dispatch.
Independent QA (per `tools/image-pipeline/qa/manual-checklist.md` and each module's `safetyNote`) happens
after, before any acceptance.
