# AJAMIX Builder Brief — M2: P3 Social and Citizenship Studies Complete (source-only)

**Task ID:** AJAMIX-SOCS-M2-P3-COMPLETE
**Role:** You are the Builder. Author content only — no scope decisions, no invented citations, no live-file edits.

## Objective

Author exactly 9 module objects — `p3-socs-07` through `p3-socs-15` — as a standalone JSON source file, completing the P3 Social and Citizenship Studies band (`p3-socs-01..15`, 15/15 total once M1+M2 are both accepted).

## Governing documents — read in full before writing any content

1. `/Users/muhammadbamalli/Documents/ajamix/docs/ARCHITECT-BRIEF-SOCS-P3-P6.md` — the full brief, especially:
   - §5 sensitivity/neutrality rules
   - §6 canonical topic map for `p3-socs-07..15`
   - §8 schema contract (**22 keys**, not 21 — see live `p2-socs-01` or M1's `p3-socs-pilot.json` for the exact enumeration)
   - §9 terminology gates — **read the newly added "Social and Citizenship Studies terms locked 2026-07-16" subsection carefully; these are now mandatory, not optional candidates**
   - §12 Definition of Done (23 gates)
2. `/Users/muhammadbamalli/Documents/ajamix/tasks/2026-07-14-M0-alignment-matrix.md` — read the **Primary 3** table rows for `p3-socs-07..15` only. This matrix is provisional (`BEST-EFFORT — NOT VERIFIED AGAINST OFFICIAL NERDC GRADE DOCUMENT`). Use it as the topic/scope basis; do not present any content as verified official NERDC wording.
3. `/Users/muhammadbamalli/Documents/ajamix/tools/p3-batch/p3-socs-pilot.json` — the **already-approved M1 pilot** (`p3-socs-01..06`). Read this for tone, register, sentence rhythm, and — critically — as the working example of every locked term listed in item 5 below, already applied correctly in context.
4. Existing live modules `p2-socs-01..15` in `app/content.json` (read-only).
5. **Mandatory locked terminology — use exactly these, do not deviate:**
   - `ƙaramar hukuma` — Local Government Area (main term; `LGA` only as one parenthetical mention per module, if the concept recurs)
   - `ɗan ƙasa` / `ƴan ƙasa` — citizen / citizens (singular / plural) — this is directly relevant to `p3-socs-12` (Nigerian Citizenship)
   - `muhalli` — environment — directly relevant to `p3-socs-08` and `p3-socs-09`
   - `ƙananan yankuna` — ward/sub-area (P3-appropriate; do not introduce a more technical governance term)
   - `kansila` (naming the office) / `wakilin yanki` (descriptive)
   - `hidimar jama'a` (a public service, singular) vs `ayyukan jama'a` (public works/services, plural/general)
   - `rigar kariya ta ruwa` — life jacket (never plain `rigar kariya` for this meaning)
   - `mai shela` — town crier
   - `ganga ko kalangu` (drum, broad) / `kalangu` (specifically talking drum)
   - `sufuri` — transportation; `sadarwa` — communication — directly relevant to `p3-socs-07` (Communication — Modern Methods)
6. Existing image manifest `tools/image-manifest/p3-socs-image-manifest.json` (M1's 6 entries) — **use this exact field schema** for the new 9 entries: `id`, `imagePath`, `titleEn`, `titleHa`, `type`, `depictEn`, `labelsHa`, `safetyNote`.

## In scope

1. Create `tools/p3-batch/p3-socs-complete.json` — a JSON array of exactly 9 module objects (`p3-socs-07..15`), matching the §8 schema contract exactly, key-for-key (22 keys — see M1 pilot file for confirmed enumeration).
2. Create `tools/image-manifest/p3-socs-image-manifest-part2.json` — design-intent entries for these 9 modules only, using the live 8-field schema. (Keep as a separate file from M1's manifest; do not edit M1's file.)
3. Run every applicable source gate from brief §12 against a **temporary merged copy** of `app/content.json` that includes BOTH the M1 pilot (`p3-socs-01..06`, already approved) AND this M2 batch (`p3-socs-07..15`) — so the full P3 band is validated together as 15 modules, not just this batch in isolation. Do not modify `app/content.json` itself; write your temp/merged copy to `/tmp/` or a scratch path.
   - Schema-contract match (22 keys, no extras, no omissions)
   - `node app/tools/validate-content.mjs` (via a scratch copy of the validator pointed at the temp file, same technique as M1) against the temp-merged copy
   - IDs unique, `moduleNumber` 7–15 sequential in this batch (and 1–15 sequential across the full P3 band in the temp merge)
   - Word count 120–170 on every `textExplanationHa`
   - Audio-explanation alignment
   - `[PAUSE 1]`/`[PAUSE 2]` text in `audioScript` exactly matches `microPauses[0].questionHa` / `microPauses[1].questionHa`
   - Each micro-pause `correctAnswer` appears exactly once in its `options`
   - Each quiz `answerFormula` does NOT appear among its `distractorFormulas`
   - Every quiz answer is taught in the module's own prose or audio script
   - Quiz question 5 and `[OUTRO]` are topic-specific per module, not generic filler — **except `p3-socs-15` (Revision and Assessment), which is explicitly a consolidation module: its quiz questions should span the P3 band's key facts (drawing from the now-15-module P3 set), not just this batch**
   - No raw English leakage outside bracketed audio-script markers, except officially borrowed terms flagged explicitly (mirror M1's `LGA` handling pattern for any similar case)
   - Hooked-letter lint: `node tools/p2-batch/hook-lint.mjs tools/p3-batch/p3-socs-complete.json` — must exit 0 (zero ERRORS); list any WARNINGS
   - Cross-module quiz-answer spelling consistency **across the full 15-module P3 band** (M1 + M2 combined) — re-check M1's locked answer strings are not accidentally respelled in M2
   - Within-module redundancy check scoped to this 9-module batch, AND a redundancy/close-paraphrase check across the full 15-module P3 band (does any M2 module duplicate an M1 module's content, e.g. `p3-socs-09` Caring for Our Environment vs `p3-socs-08` Our Natural Environment — these are adjacent topics, watch for overlap)
   - Neutrality self-check for every module against brief §5's six rules. **`p3-socs-14` (Festivals and Special Occasions) is NOT on the brief's explicit sign-off list but names specific religious festivals (Eid al-Fitr, Eid al-Adha, New Yam, Christmas) per the brief's own topic map — apply the neutrality rules with extra care here: factual and descriptive only, no ranking, no "our festival vs their festival" framing, verify current public-holiday names rather than assuming.**
4. Write a full milestone report per brief §13, to `tasks/2026-07-16-M2-p3-socs-complete-report.md`, including every item in that section's numbered list — same structure as the M1 report (module list, validator output, hook-lint output, word-count summary, audio/pause-match confirmation, quiz integrity checks, English-leakage scan, cross-module consistency — for the full 15-module band, redundancy check — batch AND full-band, neutrality attestation with special note on `p3-socs-14`, terminology open questions, checksums, engine-file confirmation).
5. In the report, explicitly reprint the **full 9 module JSON objects** verbatim.
6. In the report, list every open terminology question from brief §9 that came up while drafting these 9 modules — do not invent a Hausa term for any concept not already locked; flag it instead. Pay attention to any NEW concepts this batch introduces that M1 didn't touch (e.g. market/trade vocabulary for `p3-socs-11`, farming/livestock vocabulary for `p3-socs-10`, cultural-heritage vocabulary for `p3-socs-13`).

## Out of scope — do not do these

- Do NOT edit `app/content.json` — read-only, temp-merge validation only, write scratch copies elsewhere.
- Do NOT edit any runtime/engine file: `app/app.js`, `app/quiz-engine.js`, `app/styles.css`, `app/index.html`, `app/sw.js`, `app/bootstrap.js`.
- Do NOT render, generate, or fetch any image or audio file.
- Do NOT run any `git` command.
- Do NOT author any module outside `p3-socs-07..15`.
- Do NOT modify `docs/ARCHITECT-BRIEF-SOCS-P3-P6.md`, the M0 alignment matrix, or the M1 files (`p3-socs-pilot.json`, `p3-socs-image-manifest.json`).
- Do NOT deviate from the locked terminology list in item 5 above under any circumstance — if a locked term seems awkward in a specific sentence, use it anyway and note the awkwardness in the report rather than substituting a different word.
- Do NOT invent a family-planning-adjacent objective anywhere (not directly relevant to P3, but the exclusion is a standing rule) or any NERDC citation not already in the M0 matrix.
- No commit or push.

## Constraints

- Sandbox: `workspace-write`, scoped in practice to `tools/p3-batch/`, `tools/image-manifest/`, and `tasks/`.
- Follow brief §5 neutrality rules strictly, with the `p3-socs-14` extra-care note above.
- All Ajami fields `null`, `ajami_validated: false` — Latin Hausa only.
- Correct hooked letters (ɓ ɗ ƙ).

## Report to

- `tasks/2026-07-16-M2-p3-socs-complete-report.md` (detailed report — full module objects + all gate results)
- `--output-last-message` (brief summary — module list, gate pass/fail, file paths, one-line status)

## Rollback notes

No live file is touched, so no rollback is needed regardless of outcome. If a module cannot be built without violating a constraint or without inventing an unlocked term, stop and report the specific blocker rather than proceeding with a compromised module.

## Human approval gates

This produces a **source-only draft candidate** for Architect review and then human Hausa/content review. No integration, merge, commit, or push happens in this slice.
