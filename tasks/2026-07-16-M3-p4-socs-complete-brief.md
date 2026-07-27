# AJAMIX Builder Brief — M3: P4 Social and Citizenship Studies Complete (source-only)

**Task ID:** AJAMIX-SOCS-M3-P4-COMPLETE
**Role:** You are the Builder. Author content only — no scope decisions, no invented citations, no live-file edits.

## Objective

Author exactly 15 module objects — `p4-socs-01` through `p4-socs-15` — as a standalone JSON source file, completing the entire P4 Social and Citizenship Studies band.

## Governing documents — read in full before writing any content

1. `/Users/muhammadbamalli/Documents/ajamix/docs/ARCHITECT-BRIEF-SOCS-P3-P6.md` — the full brief, especially:
   - §5 sensitivity/neutrality rules — **`p4-socs-03` (Nigeria's Geography) is on the brief's explicit neutrality-review list**; give it a documented attestation, not just a precautionary check.
   - §6 canonical topic map for `p4-socs-01..15`
   - §8 schema contract (22 keys — see M1/M2 files for the confirmed enumeration)
   - §9 terminology gates — **read both "terms locked" subsections (M1 2026-07-16 and M2 2026-07-16) in full; all of these are now mandatory. The "Terms requiring user ruling in later dispatches" table lists items likely to arise in THIS batch specifically: Democracy, Constitution, Election/voting. Do not invent Hausa forms for these — flag and use the brief's descriptive fallback language instead (e.g. describe the concept in plain Hausa sentences without coining a fixed technical noun), then report the concept as still-open.**
   - §12 Definition of Done (23 gates)
2. `/Users/muhammadbamalli/Documents/ajamix/tasks/2026-07-14-M0-alignment-matrix.md` — read the **Primary 4** table rows for `p4-socs-01..15`. This matrix is provisional. Pay close attention to the Notes column for each row — several P4 rows carry specific authoring cautions:
   - `p4-socs-01` (Nigeria — Our Country) and `p4-socs-03` (Nigeria's Geography): sourced from cross-subject "Nigerian History/geography" material, NOT the Social and Citizenship Studies source. **Keep both modules strictly geographic/civic — no historical narrative, no colonial-era content, no pre-colonial kingdom content.** This is a hard boundary from brief §2, not just a style preference.
   - `p4-socs-11` (Migration and Urbanisation): no direct P4 public-source objective was found; this is enrichment built from adjacent concepts. Do not overclaim source support in your alignment notes.
   - `p4-socs-13` (Social Problems — Child Labour and Child Rights): the child-labour framing at P4 specifically is inferred, not directly sourced. UNCRC is enrichment — per the newly locked M2 ruling, do NOT introduce the UNCRC acronym or a formal convention name; describe children's rights in plain Hausa instead.
3. `/Users/muhammadbamalli/Documents/ajamix/tools/p3-batch/p3-socs-pilot.json` and `p3-socs-complete.json` — the approved, terminology-locked P3 band (all 15 modules). Read for tone, register, and confirmed correct usage of every locked term.
4. Existing live modules `p2-socs-01..15` in `app/content.json` (read-only).
5. **Mandatory locked terminology — use exactly these, do not deviate. (Full list carried from M1+M2; only the P4-relevant highlights are repeated here — consult brief §9 for the complete list.)**
   - `ƙaramar hukuma` (LGA, main term; `LGA` only once parenthetically) — relevant to `p4-socs-05` (Three Tiers)
   - `ɗan ƙasa` / `ƴan ƙasa` — relevant to `p4-socs-02`, `p4-socs-07`
   - `muhalli` — if environment comes up incidentally
   - `sufuri` / `sadarwa` — if these recur
   - `rediyo`, `talabijin`, `waya`, `wayar hannu`, `intanet` — if modern communication recurs
   - `kiwo` — relevant to `p4-socs-08` (Agriculture)
   - `musayar kaya da kaya` — if barter/trade recurs (`p4-socs-09`)
   - Do NOT introduce a Hausa term for Democracy, Constitution, or Election/voting — these remain genuinely open (see item 1 above). Use plain descriptive Hausa sentences instead of coining a fixed noun for `p4-socs-06` (Three Arms) and `p4-socs-07` (Democracy and Elections).
6. Existing image manifests `tools/image-manifest/p3-socs-image-manifest.json` and `p3-socs-image-manifest-part2.json` — **use this exact compact field schema** for the new 15 entries: `id`, `imagePath`, `titleEn`, `titleHa`, `type`, `depictEn`, `labelsHa`, `safetyNote`. Do not introduce a different schema.

## In scope

1. Create `tools/p4-batch/p4-socs-complete.json` — a JSON array of exactly 15 module objects (`p4-socs-01..15`), matching the §8 schema contract exactly, key-for-key.
2. Create `tools/image-manifest/p4-socs-image-manifest.json` — design-intent entries for all 15 modules, using the live 8-field schema.
3. Run every applicable source gate from brief §12 against a **temporary merged copy** of `app/content.json` that includes the full P3 band (M1+M2, already approved) AND this M3 batch — so the temp merge validates 309 + 15 (P3) + 15 (P4) = 339 modules. Do not modify `app/content.json` itself.
   - Schema-contract match (22 keys)
   - `node app/tools/validate-content.mjs` (scratch-copy technique as in M1/M2) against the temp-merged copy
   - IDs unique, `moduleNumber` 1–15 sequential within this batch
   - Word count 120–170 on every `textExplanationHa`
   - Audio-explanation alignment
   - `[PAUSE 1]`/`[PAUSE 2]` text in `audioScript` exactly matches `microPauses[].questionHa`
   - Each micro-pause `correctAnswer` appears exactly once in its `options`
   - Each quiz `answerFormula` does NOT appear among its `distractorFormulas`
   - Every quiz answer is taught in the module's own prose or audio script
   - Quiz question 5 and `[OUTRO]` are topic-specific per module — **except `p4-socs-15` (Revision and Assessment), which should span the P4 band's key facts as a genuine consolidation, mirroring how `p3-socs-15` worked**
   - No raw English leakage outside bracketed markers, except explicitly flagged borrowed terms (mirror the `LGA` and modern-communication-device handling pattern from M1/M2)
   - Hooked-letter lint: `node tools/p2-batch/hook-lint.mjs tools/p4-batch/p4-socs-complete.json` — must exit 0; list any WARNINGS
   - Cross-module quiz-answer spelling consistency within this batch, AND spot-check that P3's locked answer strings were not inadvertently respelled if reused in the P4 revision module
   - Within-module redundancy check scoped to this 15-module batch
   - Neutrality self-check for every module against brief §5's six rules. **`p4-socs-03` requires a documented, explicit attestation (it is on the brief's mandatory neutrality-review list) — confirm no historical narrative, no pre-colonial/colonial content, geographic/civic framing only.** Give `p4-socs-01` the same careful treatment even though it's not on the explicit list, since it shares the same cross-subject source risk. Also give careful attention to `p4-socs-02` (ethnic groups — no ranking) and `p4-socs-07` (democracy/elections — strictly nonpartisan, no party/candidate/ideology content).
4. Write a full milestone report per brief §13, to `tasks/2026-07-16-M3-p4-socs-complete-report.md`, same structure as the M1/M2 reports (module list, validator output, hook-lint output, word-count summary, audio/pause-match confirmation, quiz integrity checks, English-leakage scan, cross-module consistency, redundancy check, neutrality attestation with explicit `p4-socs-01`/`p4-socs-03` documentation, terminology open questions, checksums, engine-file confirmation).
5. In the report, explicitly reprint the **full 15 module JSON objects** verbatim.
6. In the report, list every open terminology question that came up while drafting these 15 modules. Explicitly confirm whether Democracy, Constitution, or Election/voting concepts were needed and, if so, how you handled them without coining an unapproved term.

## Out of scope — do not do these

- Do NOT edit `app/content.json` — read-only, temp-merge validation only.
- Do NOT edit any runtime/engine file.
- Do NOT render, generate, or fetch any image or audio file.
- Do NOT run any `git` command.
- Do NOT author any module outside `p4-socs-01..15`.
- Do NOT modify the brief, the M0 matrix, or any M1/M2 files.
- Do NOT introduce historical narrative (pre-colonial kingdoms, colonial period, independence movement) anywhere in this batch — this content belongs to the separate Nigerian History subject, per brief §2. This applies most directly to `p4-socs-01` and `p4-socs-03` but is a standing rule for the whole batch.
- Do NOT coin a Hausa term for Democracy, Constitution, or Election/voting — use descriptive language and flag as open.
- Do NOT introduce the UNCRC acronym or formal convention title anywhere in `p4-socs-13`.
- Do NOT deviate from any locked terminology term under any circumstance.
- No commit or push.

## Constraints

- Sandbox: `workspace-write`, scoped in practice to `tools/p4-batch/`, `tools/image-manifest/`, and `tasks/`.
- Follow brief §5 neutrality rules strictly, with extra documented care on `p4-socs-01`, `p4-socs-02`, `p4-socs-03`, and `p4-socs-07`.
- All Ajami fields `null`, `ajami_validated: false` — Latin Hausa only.
- Correct hooked letters (ɓ ɗ ƙ).

## Report to

- `tasks/2026-07-16-M3-p4-socs-complete-report.md` (detailed report — full module objects + all gate results)
- `--output-last-message` (brief summary)

## Rollback notes

No live file is touched, so no rollback is needed regardless of outcome. If a module cannot be built without introducing historical narrative, coining an unapproved term, or otherwise violating a constraint, stop and report the specific blocker.

## Human approval gates

This produces a **source-only draft candidate** for Architect review and then human Hausa/content review. No integration, merge, commit, or push happens in this slice.
