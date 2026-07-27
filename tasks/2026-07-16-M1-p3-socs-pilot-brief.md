# AJAMIX Builder Brief — M1: P3 Social and Citizenship Studies Pilot (source-only)

**Task ID:** AJAMIX-SOCS-M1-PILOT
**Role:** You are the Builder. Author content only — no scope decisions, no invented citations, no live-file edits.

## Objective

Author exactly 6 module objects — `p3-socs-01` through `p3-socs-06` — as a standalone JSON source file. This is a pilot slice to prove the schema, gates, and Hausa-review loop end-to-end for this subject before scaling to the rest of P3–P6.

## Governing documents — read in full before writing any content

1. `/Users/muhammadbamalli/Documents/ajamix/docs/ARCHITECT-BRIEF-SOCS-P3-P6.md` — the full brief. Pay special attention to:
   - §5 sensitivity/neutrality rules
   - §6 canonical topic map for `p3-socs-01..06` (titles, strand anchors, enrichment notes)
   - §8 schema contract
   - §9 terminology gates (locked terms + open-question list)
   - §12 Definition of Done (23 gates)
   - §14 image-manifest deliverable — **NOTE: use the existing live schema instead of the one printed in §14** (see below).
2. `/Users/muhammadbamalli/Documents/ajamix/tasks/2026-07-14-M0-alignment-matrix.md` — read only the **Primary 3** table rows for `p3-socs-01..06`. This matrix is **provisional** — every row is `BEST-EFFORT — NOT VERIFIED AGAINST OFFICIAL NERDC GRADE DOCUMENT`. Use it as the topic/scope basis for each module, but do not present any content as verified official NERDC wording — the brief's own §5/§6 framing already reflects this.
3. Existing live modules `p2-socs-01` through `p2-socs-15` in `app/content.json` — model tone, sentence length, and register on these (read them directly from the live file — read-only).
4. Existing image manifest `tools/image-manifest/p3-bsci-image-manifest.json` — **use this exact field schema** for your new Social Studies manifest, not the schema printed in brief §14. Live schema fields: `id`, `imagePath`, `titleEn`, `titleHa`, `type`, `depictEn`, `labelsHa`, `safetyNote`.

## In scope

1. Create `tools/p3-batch/p3-socs-pilot.json` — a JSON array of exactly 6 module objects (`p3-socs-01..06`), matching the §8 schema contract exactly, key-for-key.
2. Create `tools/image-manifest/p3-socs-image-manifest.json` — design-intent entries for these 6 modules only, using the **live schema** (`id`, `imagePath`, `titleEn`, `titleHa`, `type`, `depictEn`, `labelsHa`, `safetyNote`) as shown in `p3-bsci-image-manifest.json`. No image files rendered.
3. Run every applicable source gate from brief §12 against a **temporary merged copy** of `app/content.json` (in-memory or a scratch file — do not modify `app/content.json` itself). Specifically:
   - Schema-contract match (all 21 keys, no extras, no omissions)
   - `node app/tools/validate-content.mjs` against the temp-merged copy
   - IDs unique, `moduleNumber` 1–6 sequential
   - Word count 120–170 on every `textExplanationHa`
   - Audio-explanation alignment (script teaches the same facts as the prose)
   - `[PAUSE 1]`/`[PAUSE 2]` text in `audioScript` exactly matches `microPauses[0].questionHa` / `microPauses[1].questionHa`
   - Each micro-pause `correctAnswer` appears exactly once in its `options`
   - Each quiz `answerFormula` does NOT appear among its `distractorFormulas`
   - Every quiz answer is taught in the module's own prose or audio script
   - Quiz question 5 and the `[OUTRO]` are topic-specific per module, not generic filler
   - No raw English leakage outside bracketed audio-script markers, except officially borrowed terms you flag explicitly
   - Hooked-letter lint: `node tools/p2-batch/hook-lint.mjs tools/p3-batch/p3-socs-pilot.json` — must exit 0 (zero ERRORS); list any WARNINGS
   - Cross-module quiz-answer spelling consistency within this 6-module batch
   - Within-module redundancy check: `node tools/p1-batch/check-within-module-redundancy.mjs` scoped to this batch
   - Neutrality self-check for every module against brief §5's six rules — none of `p3-socs-01..06` are on the brief's explicit neutrality-review list, but check anyway and note anything borderline
4. Write a full milestone report per brief §13, to `tasks/2026-07-16-M1-p3-socs-pilot-report.md`, including every item in that section's numbered list (module list, validator output, hook-lint output, word-count summary, audio/pause-match confirmation, quiz integrity checks, English-leakage scan, cross-module consistency, redundancy check, neutrality attestation, terminology open questions, `shasum -a 256 app/content.json` before/after — must be IDENTICAL since you are not touching the live file, engine-file checksum confirmation for `app.js`/`quiz-engine.js`/`styles.css`/`index.html`/`sw.js`/`bootstrap.js` if present).
5. In the report, explicitly reprint the **full 6 module JSON objects** verbatim so the human reviewer can read Hausa content without opening the batch file separately.
6. In the report, list every open terminology question from brief §9 that came up while drafting these 6 modules — do not invent a Hausa term for any concept not already locked; flag it instead.

## Out of scope — do not do these

- Do NOT edit `app/content.json` — read-only access to that file only, for temp-merge validation purposes (write your temp/merged copy elsewhere, e.g. `/tmp` or a scratch path, never overwrite the live file).
- Do NOT edit any runtime/engine file: `app/app.js`, `app/quiz-engine.js`, `app/styles.css`, `app/index.html`, `app/sw.js`, `app/bootstrap.js` if present.
- Do NOT render, generate, or fetch any image or audio file.
- Do NOT run any `git` command (add, commit, push, or otherwise) — this repo's git is known to hang.
- Do NOT author any module outside `p3-socs-01..06`.
- Do NOT modify `docs/ARCHITECT-BRIEF-SOCS-P3-P6.md` or the M0 alignment matrix.
- Do NOT invent a family-planning-adjacent objective, a NERDC citation you did not verify, or a Hausa term not already locked in brief §9 — flag instead.
- No commit or push.

## Constraints

- Sandbox: `workspace-write`, scoped in practice to `tools/p3-batch/`, `tools/image-manifest/`, and `tasks/` — do not touch anything else even though the sandbox technically permits it.
- Follow brief §5 neutrality rules strictly — none of these 6 modules are flagged sensitive, but festivals (`p3-socs-14` is out of this slice, not a concern here) and citizenship content (`p3-socs-12`) still need neutral, non-hierarchical framing.
- All Ajami fields `null`, `ajami_validated: false` — Latin Hausa only.
- Correct hooked letters (ɓ ɗ ƙ) per brief §16 locked terms.

## Report to

- `tasks/2026-07-16-M1-p3-socs-pilot-report.md` (detailed report — full module objects + all gate results)
- `--output-last-message` (brief summary — module list, gate pass/fail, file paths, one-line status)

## Rollback notes

No live file is touched, so no rollback is needed regardless of outcome. If you discover partway through that a module cannot be built without violating a constraint (e.g. no public source basis at all, or a neutrality conflict you cannot resolve), stop and report the specific blocker rather than proceeding with a compromised module.

## Human approval gates

None of this work is shippable — it produces a **source-only draft candidate** for Architect review and then human Hausa/content review. No integration, merge, commit, or push happens in this slice regardless of gate results.
