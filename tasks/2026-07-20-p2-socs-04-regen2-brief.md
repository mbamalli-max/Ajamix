# AJAMIX Builder Brief — Regenerate p2-socs-04 (second pass, tree/top-band fix)

**Task ID:** AJAMIX-P2-SOCS-04-REGEN-2
**Role:** You are the Builder. Generate the image using your own image-generation capability (the same one used in all prior successful runs). Asset production only — no Hausa text, no module JSON, no content decisions.

## Context

`p2-socs-04` ("The Community") was already regenerated once to fix a mosque-architecture FAIL — that fix worked. But re-QA found a new issue: a tree canopy intrudes into the required blank top 22% band. A strengthened prompt targeting exactly this defect (while preserving the already-working worship-building fix) is drafted at `tasks/2026-07-20-p2-socs-04-regen2-prompt.md` — read that file for the full Prompt/Avoid text, do not re-derive prompts yourself.

## Scope — exactly 1 image

Read `tasks/2026-07-20-p2-socs-04-regen2-prompt.md` and generate one image using exactly that file's Prompt and Avoid text.

## MANDATORY — output naming

Save the generated image directly as (overwriting the existing file):

```
tools/image-pipeline/output/raw/style-b-p2-socs-04.png
```

If your image tool saves to its own managed directory first, copy/rename into the path above as the immediate next step and verify the file exists with non-zero size.

## Out of scope

- Do NOT regenerate any other image.
- Do NOT touch `app/content.json`, any runtime file, or any module JSON.
- Do NOT run the overlay compositor.
- Do NOT run any `git` command. No commit, no push, no merge.

## Report to

Write a report to `tasks/2026-07-20-p2-socs-04-regen2-report.md`: status (generated/failed), output file path, and any error detail if failed.

## Human approval gates

Draft image asset for QA review only — no promotion into `app/images/` as part of this dispatch. Will get an independent re-QA pass (top-band/foliage check plus re-confirming the worship-building fix still holds) before acceptance.
