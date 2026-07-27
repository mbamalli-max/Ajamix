# AJAMIX Builder Brief — Regenerate p6-bsci-07 (symbolic redesign, 3rd attempt)

**Task ID:** AJAMIX-P6-BSCI-07-SYMBOLIC-1
**Role:** You are the Builder. Generate the image using your own image-generation capability (the same one used in all prior successful runs). Asset production only — no Hausa text, no module JSON, no content decisions.

## Context

`p6-bsci-07` (Human Reproduction, Growth, and Development) has failed its safety bar twice: a curled fetus-outline shape kept drifting into recognizable facial features (nose, mouth) despite explicit prohibitions each time. Muhammad's decision (2026-07-20): stop trying to constrain the fetal-outline approach and redesign the depiction entirely — the manifest (`tools/image-manifest/p6-bsci-image-manifest.json`) has been updated to remove any body-shaped silhouette from this image's brief. Prenatal development is now represented purely by size-progressing geometric shapes (dot → circle → oval → larger oval), never by any body or figure outline. This is the single most sensitive image in the whole Basic Science set — treat every constraint in the prompt as non-negotiable.

The exact prompt is at `tasks/2026-07-20-bsci-chatgpt-prompts.md`, entry `p6-bsci-07` — read that file for the full Prompt/Avoid text, do not re-derive it yourself.

## Scope — exactly 1 image

Read `tasks/2026-07-20-bsci-chatgpt-prompts.md`, find the `p6-bsci-07` entry, and generate one image using exactly that entry's Prompt and Avoid text.

## MANDATORY — output naming

Save the generated image directly as (overwriting the existing file):

```
tools/image-pipeline/output/raw/style-b-p6-bsci-07.png
```

If your image tool saves to its own managed directory first, copy/rename into the path above as the immediate next step and verify the file exists with non-zero size.

## Out of scope

- Do NOT regenerate any other image.
- Do NOT touch `app/content.json`, any runtime file, or any module JSON.
- Do NOT run the overlay compositor.
- Do NOT run any `git` command. No commit, no push, no merge.

## Report to

Write a report to `tasks/2026-07-20-p6-bsci-07-symbolic-report.md`: status (generated/failed), output file path, and any error detail if failed.

## Human approval gates

Draft image asset for QA review only — no promotion into `app/images/` as part of this dispatch. Will get an independent, zero-tolerance re-QA pass (specifically confirming no body-like or facial shape appears anywhere) before any acceptance. If this also fails, the module will be left without a generated image rather than attempting a fourth time.
