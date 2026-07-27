# AJAMIX Builder Brief — P4 Social Studies Image Generation, remaining 6

**Task ID:** AJAMIX-SOCS-IMAGES-P4-REMAINDER
**Role:** You are the Builder. Generate images using your own image-generation capability (the same one used in the two prior runs — 9 images under `~/.codex/generated_images/`, then 32 more filed correctly into `tools/image-pipeline/output/raw/`). Asset production only — no Hausa text, no module JSON, no content decisions.

## Context

This closes a scope gap from prior dispatches: `p4-socs-10` through `p4-socs-15` were never included in any generation batch. All other Social Studies P3–P6 modules are now covered (P3 in progress separately, P4-01 through P4-09 done, all of P5 and P6 done). This is the last piece of P4.

## Scope — exactly 6 images

Read the prompt and negative-prompt text for each of the following module IDs from `tasks/2026-07-17-socs-60image-chatgpt-prompts.md` (each entry has a `### N. \`<module-id>\`` heading — use exactly that module's Prompt and Avoid text):

- `p4-socs-10`, `p4-socs-11`, `p4-socs-12`, `p4-socs-13`, `p4-socs-14`, `p4-socs-15`

## MANDATORY — output naming

Save each generated image directly as:

```
tools/image-pipeline/output/raw/style-b-<module-id>.png
```

E.g. `tools/image-pipeline/output/raw/style-b-p4-socs-10.png`. If your image tool saves to its own managed directory first, copy/rename into the path above as the immediate next step and verify the file exists with non-zero size before moving to the next prompt.

## Content notes

- `p4-socs-13` (Child Labour and Child Rights) is a comparison image (safe task vs. hazard icons) — follow the prompt's crossed-out hazard-icon approach exactly; no graphic injury or real-world workplace depiction.
- All other five are standard diagram/illustration/comparison types with no elevated sensitivity — follow each prompt and negative-prompt text as written.
- No baked-in text, numbers, or labels in any image — deterministic overlay handles that separately, later, not part of this task.

## Batching

Only 6 images — a single continuous run is fine, no need to stage into groups like the prior 32-image dispatch. If you hit a throughput/rate limit, stop immediately and report exactly how many completed and which remain.

## Out of scope

- Do NOT regenerate any other module image (P3, P4-01..09, P5, P6 are all already done — do not touch them).
- Do NOT touch `app/content.json`, any runtime file, or any module JSON.
- Do NOT run the overlay compositor.
- Do NOT run any `git` command. No commit, no push, no merge.

## Report to

Write a report to `tasks/2026-07-18-p4-socs-remainder-report.md` listing, for each of the 6 module IDs: status (generated/failed/skipped), output file path, and any error detail if failed. Plus a one-line summary (generated/failed/remaining counts).

## Human approval gates

Draft image assets for QA review only — no promotion into `app/images/` as part of this dispatch.
