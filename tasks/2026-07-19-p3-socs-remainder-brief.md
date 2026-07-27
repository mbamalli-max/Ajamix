# AJAMIX Builder Brief — P3 Social Studies Image Generation, remaining 9

**Task ID:** AJAMIX-SOCS-IMAGES-P3-REMAINDER
**Role:** You are the Builder. Generate images using your own image-generation capability (same one used in all prior successful runs). Asset production only — no Hausa text, no module JSON, no content decisions.

## Context

A prior dispatch (AJAMIX-SOCS-IMAGES-P3) generated 5 of 14 targeted images (`p3-socs-01`, `03`, `04`, `05`, `06`) before the run hit a network/connectivity failure to the Codex backend (WebSocket and HTTPS transport both disconnected — not a content or policy issue). Those 5, plus the earlier `p3-socs-02` (manually composited, untouched), are done and verified. This dispatch covers exactly what's left.

## Scope — exactly 9 images

Read the prompt and negative-prompt text for each of the following module IDs from `tasks/2026-07-17-socs-60image-chatgpt-prompts.md` (each entry has a `### N. \`<module-id>\`` heading — use exactly that module's Prompt and Avoid text, nothing else):

- `p3-socs-07`, `p3-socs-08`, `p3-socs-09`, `p3-socs-10`, `p3-socs-11`, `p3-socs-12`, `p3-socs-13`, `p3-socs-14`, `p3-socs-15`

## MANDATORY — output naming

Save each generated image directly as:

```
tools/image-pipeline/output/raw/style-b-<module-id>.png
```

Verify each file exists with non-zero size before moving to the next prompt.

## Batching

Process in two groups: batch 1 = `07, 08, 09, 10, 11`; batch 2 = `12, 13, 14, 15`. Pause and write a short progress note to the report file after batch 1. If you hit a network/connectivity error, retry a reasonable number of times; if it persists, stop and report exactly how many completed and which remain — do not leave the run in an ambiguous state.

## Content notes

- Standard diagram/illustration/comparison types, no elevated sensitivity.
- No baked-in text, numbers, or labels in any image — deterministic overlay handles that separately.
- Per QA findings from the P5/P6 batch: no real-world identifiable landmarks/monuments, no logos or brand-like signage, no letter-like texture anywhere in any image.

## Out of scope

- Do NOT touch `p3-socs-01` through `06` — already done and verified.
- Do NOT touch `app/content.json`, any runtime file, or any module JSON.
- Do NOT run the overlay compositor.
- Do NOT run any `git` command. No commit, no push, no merge.

## Report to

Write a report to `tasks/2026-07-19-p3-socs-remainder-report.md` listing, for each of the 9 module IDs: status (generated/failed/skipped), output file path, and any error detail if failed. Plus a one-line summary (generated/failed/remaining counts).

## Human approval gates

Draft image assets for QA review only — no promotion into `app/images/` as part of this dispatch.
