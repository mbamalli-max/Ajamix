# AJAMIX Builder Brief — P3 Social Studies Image Generation, remaining 14

**Task ID:** AJAMIX-SOCS-IMAGES-P3
**Role:** You are the Builder. Generate images using your own image-generation capability (the same one used in the three prior successful runs — 32 images, then 6 images, then 4 regenerations, all filed correctly into `tools/image-pipeline/output/raw/`). Asset production only — no Hausa text, no module JSON, no content decisions.

## Context

This is the last Social Studies image band. P4 (15/15), P5 (15/15), and P6 (15/15) are all done and QA-accepted. P3 has only `p3-socs-02` done (a manually-composited 6-panel image, already in place — do not touch it). This dispatch covers everything else in P3.

## Scope — exactly 14 images

Read the prompt and negative-prompt text for each of the following module IDs from `tasks/2026-07-17-socs-60image-chatgpt-prompts.md` (each entry has a `### N. \`<module-id>\`` heading — use exactly that module's Prompt and Avoid text, nothing else):

- `p3-socs-01`, `p3-socs-03`, `p3-socs-04`, `p3-socs-05`, `p3-socs-06`, `p3-socs-07`, `p3-socs-08`, `p3-socs-09`, `p3-socs-10`, `p3-socs-11`, `p3-socs-12`, `p3-socs-13`, `p3-socs-14`, `p3-socs-15`

## MANDATORY — output naming

Save each generated image directly as:

```
tools/image-pipeline/output/raw/style-b-<module-id>.png
```

E.g. `tools/image-pipeline/output/raw/style-b-p3-socs-01.png`. If your image tool saves to its own managed directory first, copy/rename into the path above as the immediate next step and verify the file exists with non-zero size before moving to the next prompt.

## MANDATORY — staged batches, not one continuous run

Process in groups of 6 images at a time (e.g. batch 1 = 01, 03, 04, 05, 06, 07; batch 2 = 08, 09, 10, 11, 12, 13; batch 3 = 14, 15). After each group, pause and write a short progress note to the report file before continuing. If you hit a throughput/rate limit, stop immediately and report exactly how many completed and which remain — do not leave the run in an ambiguous state.

## Content notes

- `p3-socs-05` (Transportation — Air and Water) involves an airport and boat scene — follow the prompt as written; no real airline or shipping-company branding, no identifiable real airport terminal.
- All other modules are standard diagram/illustration/comparison types with no elevated sensitivity — follow each prompt and negative-prompt text as written.
- No baked-in text, numbers, or labels in any image — deterministic overlay handles that separately, later, not part of this task.
- Given QA findings from the P5/P6 batch, pay extra attention to the base negative-prompt constraints already in the library text: no real-world identifiable landmarks/monuments, no logos or brand-like signage, no letter-like texture anywhere in the image.

## Out of scope

- Do NOT regenerate `p3-socs-02` — already done, manually composited, do not touch.
- Do NOT touch `app/content.json`, any runtime file, or any module JSON.
- Do NOT run the overlay compositor.
- Do NOT run any `git` command. No commit, no push, no merge.

## Report to

Write a report to `tasks/2026-07-18-p3-socs-image-generation-report.md` listing, for each of the 14 module IDs: status (generated/failed/skipped), output file path, and any error detail if failed. Plus a one-line summary (generated/failed/remaining counts) and which batch you stopped at if incomplete.

## Human approval gates

Draft image assets for QA review only — no promotion into `app/images/` as part of this dispatch. These will get an independent QA pass before acceptance.
