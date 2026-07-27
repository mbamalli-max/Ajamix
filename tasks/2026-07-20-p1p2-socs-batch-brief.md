# Slice brief — ajamix
Task ID:          2026-07-20-p1p2-socs-batch
Objective:        Generate 30 Style B images (P1-P2 Social Studies) using your own image-generation capability, exactly per the pre-drafted prompt doc.
In scope:         Read tasks/2026-07-20-socs-p1p2-chatgpt-prompts.md in full. For each of its 30 entries (Band P1 images 1-15, Band P2 images 16-30), generate one image using that entry's exact "Prompt" text, then its "Avoid" text as a follow-up/negative instruction. Save each result at the exact path given under "Save as" (tools/image-pipeline/output/raw/style-b-<id>.png). None of these 30 files exist yet — this is new generation, not overwriting.
Out of scope:     Do NOT re-derive, rewrite, or improve any prompt text — use the doc's Prompt/Avoid verbatim. Do NOT regenerate any image outside this list of 30. Do NOT touch app/content.json, any module JSON, or any runtime/engine file. Do NOT run the overlay compositor (tools/image-pipeline/overlay/compositor.mjs). Do NOT promote any image into app/images/. Do NOT run any git command (no commit, no push, no merge).
Scope globs:
- tools/image-pipeline/output/raw/style-b-p1-socs-*.png
- tools/image-pipeline/output/raw/style-b-p2-socs-*.png
- tasks/2026-07-20-p1p2-socs-batch-report.md
Acceptance gates: All 30 files listed above exist, each a valid PNG at 1536x1024 (matching the established Style B dimensions used by every prior accepted image in this pipeline), non-zero size.
Context to read:  tasks/2026-07-20-socs-p1p2-chatgpt-prompts.md (the full prompt set — read start to finish, do not skip entries), tools/image-pipeline/style-bibles/b-clean-watercolor-editorial.md (style reference, for context only — the prompt doc already encodes its constraints)
Report to:        tasks/2026-07-20-p1p2-socs-batch-report.md — list each of the 30 image ids with status (generated/failed) and, for any failure, the error detail. Do not just say "all done" — enumerate.
Constraints:      No new dependencies. No secrets in output. If any single image's generation fails, continue with the rest and report the failure rather than stopping the whole batch. Stop and report if you hit an ambiguity you cannot resolve from the prompt doc alone.
Rollback notes:   Purely additive — these 30 files do not currently exist, so rollback is deleting them if needed. No existing file is modified.
Human approval gates: This is draft-image generation only. QA review (visual inspection against tools/image-pipeline/qa/manual-checklist.md), overlay compositing, and any promotion into app/images/ all require a separate later step and Muhammad's sign-off — none of that happens in this slice.
