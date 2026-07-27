# AJAMIX Builder Brief — Mathematics validation batch (10 images)

**Task ID:** AJAMIX-MATHS-VALIDATION-1
**Role:** You are the Builder. Generate images using your own image-generation capability (the same one used in all prior successful runs). Asset production only — no Hausa text, no module JSON, no content decisions.

## Context

This is a small validation batch ahead of the full 144-image Mathematics set. Social Studies (90 images) and Basic Science (101 images) are both complete and accepted; Mathematics is the last remaining subject.

Mathematics carries a specific risk the other subjects did not: 130 of its 144 manifest entries were rewritten to strip literal digits and equations out of the visual description, because the Style B template forbids rendering numerals in the artwork (all numbers are added later by the deterministic overlay compositor). The rewritten prompts therefore ask for *blank* structures — blank place-value columns, stepping-stones with no numerals, clock faces with blank hour markers, unlabelled bar charts. This batch validates that the image model actually honours those blank-structure instructions before 144 images are committed to.

The 10 prompts are already fully drafted at `tasks/2026-07-21-maths-validation-batch-prompts.md` — read that file for the exact Prompt/Avoid text per image, do not re-derive or alter any prompt.

## Scope — exactly 10 images

Generate one image per entry in `tasks/2026-07-21-maths-validation-batch-prompts.md`, using exactly that file's Prompt and Avoid text for each:

1. `p1-maths-01`
2. `p1-maths-03`
3. `p1-maths-17`
4. `p2-maths-24`
5. `p3-maths-01`
6. `p4-maths-09`
7. `p4-maths-17`
8. `p5-maths-22`
9. `p6-maths-15`
10. `p6-maths-24`

## MANDATORY — output naming

Save each generated image directly as:

```
tools/image-pipeline/output/raw/style-b-<id>.png
```

e.g. `tools/image-pipeline/output/raw/style-b-p1-maths-01.png`. If your image tool saves to its own managed directory first, copy/rename into the path above as the immediate next step for each image, and verify each file exists with non-zero size before moving to the next.

## Out of scope

- Do NOT generate any image outside the 10 listed above.
- Do NOT regenerate `p3-maths-02` (the earlier Style B pilot image, already accepted).
- Do NOT touch `app/content.json`, any runtime file, or any module JSON.
- Do NOT run the overlay compositor.
- Do NOT run any `git` command. No commit, no push, no merge.

## Report to

Write a report to `tasks/2026-07-21-maths-validation-batch-report.md`: a per-image status table (id, generated/failed, output path) plus any error detail for failures.

## Human approval gates

Draft image assets for QA review only — no promotion into `app/images/` as part of this dispatch. Independent QA happens after — checking especially whether any numerals were rendered into the artwork despite the blank-structure instructions — before any decision to proceed with the full 144-image batch.
