# AJAMIX Builder Brief — Regenerate p3-maths-02 pilot image (margin fix)

**Task ID:** AJAMIX-MATHS-IMAGE-REGEN-1
**Role:** You are the Builder. Generate the image using your own image-generation capability (the same one used in all prior successful runs). Asset production only — no Hausa text, no module JSON, no content decisions.

## Context

This is the original 3-image Style B pilot's maths image, flagged BORDERLINE in QA: decorative desk props (pencil cup, paint bowl, mat, plant, books) bled into the left/right margins, which must stay completely unpainted. A strengthened prompt targeting exactly this defect is already drafted at `tasks/2026-07-19-p3-maths-02-regen-prompt.md` — read that file for the full Prompt/Negative-prompt text, do not re-derive prompts yourself.

## Scope — exactly 1 image

Read `tasks/2026-07-19-p3-maths-02-regen-prompt.md` and generate one image using exactly that file's Prompt and Negative-prompt text.

## MANDATORY — output naming

Save the generated image directly as (overwriting the existing file):

```
tools/image-pipeline/output/raw/style-b-p3-maths-02.png
```

If your image tool saves to its own managed directory first, copy/rename into the path above as the immediate next step and verify the file exists with non-zero size.

## Out of scope

- Do NOT regenerate any other image.
- Do NOT touch `app/content.json`, any runtime file, or any module JSON.
- Do NOT run the overlay compositor.
- Do NOT run any `git` command. No commit, no push, no merge.

## Report to

Write a report to `tasks/2026-07-19-p3-maths-02-regen-report.md`: status (generated/failed), output file path, and any error detail if failed.

## Human approval gates

Draft image asset for QA review only — no promotion into `app/images/` as part of this dispatch. Will get an independent QA pass (specifically re-checking left/right margins) before acceptance.
