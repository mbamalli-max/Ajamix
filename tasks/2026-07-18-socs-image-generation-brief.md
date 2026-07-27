# AJAMIX Builder Brief — Social Studies P4-P6 Image Generation (remaining 32)

**Task ID:** AJAMIX-SOCS-IMAGES-CONTINUE
**Role:** You are the Builder. Generate images using your own image-generation capability (the same one used in the prior run that produced 9 files under `~/.codex/generated_images/019f572e-3325-7382-b656-f5b663bb72c7/`). This is an asset-production task, not a content-authoring task — no Hausa text, no module JSON, no content decisions.

## Context — read before generating anything

A prior run of this task generated 9 images and then stopped after hitting a throughput/rate limit partway through a 45-image batch. Those 9 have already been identified, matched to their correct module IDs by content inspection, and copied into `tools/image-pipeline/output/raw/` with correct filenames:

- `style-b-p4-socs-01.png`, `style-b-p4-socs-03.png`, `style-b-p4-socs-04.png`, `style-b-p4-socs-05.png`, `style-b-p4-socs-06.png`, `style-b-p4-socs-07.png`, `style-b-p4-socs-09.png` — **DONE, do not regenerate these.**
- Two of the original 9 were rejected as poor matches for their intended modules and are being redone as part of this dispatch (see scope below).

**Root cause of the naming problem last time:** the prior run saved outputs with random UUID filenames (`exec-<uuid>.png`) with no mapping back to which module each was for. This required manual visual matching against all 60 manifest entries after the fact, which was slow and error-prone. **This dispatch fixes that: see the mandatory naming/reporting requirement below.**

## Scope — exactly 32 images

Read the prompt and negative-prompt text for each of the following module IDs from `tasks/2026-07-17-socs-60image-chatgpt-prompts.md` (each entry has a `### N. \`<module-id>\`` heading — use exactly that module's Prompt and Avoid text, nothing else):

- `p4-socs-02`, `p4-socs-08` (2 images — the remainder of P4)
- `p5-socs-01` through `p5-socs-15` (15 images — all of P5)
- `p6-socs-01` through `p6-socs-15` (15 images — all of P6)

Total: 32 images.

## MANDATORY — output naming (fixes the prior run's problem)

For each generated image, save it directly as:

```
tools/image-pipeline/output/raw/style-b-<module-id>.png
```

For example, the image generated from the `p5-socs-01` prompt must be saved as `tools/image-pipeline/output/raw/style-b-p5-socs-01.png` — not a UUID, not a temp name that gets renamed later. If your image tool only supports saving to its own managed directory first, copy/rename the file into the path above as the very next step before moving to the next prompt, and verify the copy succeeded (file exists, non-zero size) before proceeding.

## MANDATORY — staged batches, not one continuous run

The prior run hit a throughput limit partway through. To avoid repeating that failure:

1. Process in groups of **6 images at a time** (roughly: batch 1 = `p4-socs-02`, `p4-socs-08`, `p5-socs-01..04`; batch 2 = `p5-socs-05..10`; batch 3 = `p5-socs-11..15`, `p6-socs-01`; batch 4 = `p6-socs-02..07`; batch 5 = `p6-socs-08..13`; batch 6 = `p6-socs-14..15` — adjust grouping as convenient, exact boundaries don't matter, just keep each group small).
2. After each group of 6, pause and write a short progress note to the report file (see below) before continuing to the next group. Do not attempt all 32 in one uninterrupted sequence.
3. If you hit a throughput/rate limit again, **stop immediately, do not retry aggressively, and report exactly how many images completed and which module IDs remain** — do not leave the run in an ambiguous state.

## Content and safety requirements (same as the rest of this workstream)

- Each image must match its manifest entry's `depictEn` and respect its `safetyNote` — both are already baked into the Prompt/Avoid text in the prompt-library file, so following that text correctly satisfies this.
- **`p5-socs-07` (Drug Abuse) and `p6-socs-09` (Safety and Security) are the two most sensitive images in this set.** Their prompts in the library file already encode the mandatory boundaries (entirely non-graphic/abstract, no substance depiction, no weapon/extremist/tactic content). Follow them exactly — do not add any detail beyond what's specified, even if it seems like it would improve the image.
- No baked-in text, numbers, labels, or arithmetic in any image — this is a hard constraint from the Style B design (deterministic overlay handles all of that separately, later, not part of this task).
- `p6-socs-06` (Judiciary): the prompt describes a non-ladder court structure — follow it exactly, do not simplify into a single hierarchy.
- `p6-socs-11` (Civic Role Models): the prompt names five specific real historical Nigerians — render respectful, non-caricatured likenesses per the prompt; do not substitute different individuals.

## Out of scope — do not do these

- Do NOT regenerate `p4-socs-01`, `03`, `04`, `05`, `06`, `07`, `09` — already done and filed correctly.
- Do NOT touch `p3-socs-*` images — different band, being handled separately.
- Do NOT touch `app/content.json`, any runtime file, or any module JSON.
- Do NOT run the overlay compositor — that's a separate later step, not part of this dispatch.
- Do NOT run any `git` command.
- No commit, no push, no merge.

## Report to

Write a report to `tasks/2026-07-18-socs-image-generation-report.md` containing, for every one of the 32 target module IDs:

- Module ID
- Status: generated / failed / skipped
- Output file path (should always be `tools/image-pipeline/output/raw/style-b-<module-id>.png` when generated)
- If failed: what happened (rate limit, content policy refusal, other error)

Plus a summary: total generated, total failed, total remaining, and which batch you stopped at if you didn't complete all 32.

## Human approval gates

This produces draft image assets for QA review — not final, not integrated. No promotion into `app/images/` happens as part of this dispatch.
