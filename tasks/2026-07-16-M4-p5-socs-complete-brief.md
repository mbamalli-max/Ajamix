# AJAMIX Builder Brief — M4: P5 Social and Citizenship Studies Complete (source-only)

**Task ID:** AJAMIX-SOCS-M4-P5-COMPLETE
**Role:** You are the Builder. Author content only — no scope decisions, no invented citations, no live-file edits.

## Objective

Author exactly 15 module objects — `p5-socs-01` through `p5-socs-15` — as a standalone JSON source file, completing the entire P5 Social and Citizenship Studies band. **This band includes `p5-socs-07` (Drug Abuse), a mandatory user-sign-off module with strict content boundaries — read §3 of this brief before drafting it.**

## Governing documents — read in full before writing any content

1. `/Users/muhammadbamalli/Documents/ajamix/docs/ARCHITECT-BRIEF-SOCS-P3-P6.md` — the full brief, especially:
   - §5 sensitivity/neutrality rules. **`p5-socs-05`, `p5-socs-06`, `p5-socs-14` are on the brief's mandatory explicit-neutrality-review list** — give each a documented attestation, not just a precautionary check.
   - §6 canonical topic map for `p5-socs-01..15`
   - §7 sensitive-topic controls — **`p5-socs-07` (Drug Abuse) boundaries are non-negotiable, read in full before drafting that module (repeated below in §3 of this brief for convenience, but the brief is authoritative).**
   - §8 schema contract (22 keys)
   - §9 terminology gates — read the M1, M2, and M3 "terms locked" subsections in full. All are mandatory. Note especially: `dimokuradiyya`, `kundin tsarin mulki`, `zaɓe`/`jefa ƙuri'a` are now LOCKED as formal terms (unlike in M3, where they stayed open) — use them where genuinely needed in this P5 band, e.g. `p5-socs-05` (Constitution and Rule of Law) may now use `kundin tsarin mulki` where appropriate.
   - §12 Definition of Done (23 gates)
2. `/Users/muhammadbamalli/Documents/ajamix/tasks/2026-07-14-M0-alignment-matrix.md` — read the **Primary 5** table rows for `p5-socs-01..15`. Provisional matrix; note the Notes column cautions:
   - `p5-socs-05`: "Constitution as a standalone P5 topic was not exposed [in public sources]. Teach thematically... do not fabricate section-level objectives."
   - `p5-socs-09`: **family planning is EXCLUDED** — no public source supports it as a P5 objective (M0/M1 standing ruling). Do not introduce it under any framing.
   - `p5-socs-11`: ECOWAS membership and institutional facts must be verified at build time — do NOT hardcode a specific member count or list without checking a current source; if uncertain, describe ECOWAS purpose/function without asserting a specific number.
   - `p5-socs-12`: named UN bodies need fact-checking — verify before naming any specific body's current role.
   - `p5-socs-14`: corruption defined age-appropriately; ICPC/EFCC roles must be current and nonpartisan.
3. `/Users/muhammadbamalli/Documents/ajamix/tools/p4-batch/p4-socs-complete.json` — the approved, patched P4 band. Read for tone, register, and confirmed correct usage of every locked term, including the newly-locked `dimokuradiyya`/`kundin tsarin mulki`/`zaɓe`/`jefa ƙuri'a` (note: these do NOT appear in the P4 file itself since P4 stayed descriptive by design — you are the first batch that may actually use them).
4. Existing live modules `p2-socs-01..15` in `app/content.json` (read-only).
5. Existing image manifests (P3 + P4) — **use this exact compact 8-field schema** for the new 15 entries: `id`, `imagePath`, `titleEn`, `titleHa`, `type`, `depictEn`, `labelsHa`, `safetyNote`.

## Mandatory locked terminology (full list in brief §9 — P5-relevant highlights below)

- `dimokuradiyya` (democracy), `kundin tsarin mulki` (constitution), `zaɓe`/`jefa ƙuri'a` (election/voting) — NOW available for use where genuinely needed, especially `p5-socs-05`.
- `ɗan ƙasa`/`ƴan ƙasa`, `muhalli`, `ƙaramar hukuma` — as relevant.
- `reshen zartarwa`/`reshen kafa doka`/`reshen shari'a` — if government-arms content recurs.
- `sauya wurin zama` (migration) — if relevant.
- Do NOT coin a Hausa term for: Globalisation, Drug/substance abuse (beyond the §7 boundary terms below), Sustainability, Conflict resolution — these remain genuinely open. Use descriptive Hausa and flag as open, following the M3 pattern (see how `p4-socs-06`/`07` handled then-unlocked terms).
- **Pollution**: `p5-socs-03` is the deferred landing spot for a possible formal term (per M3 ruling). You may either continue with descriptive `gurɓata` (safe default) or propose a formal noun in your terminology-open-questions section for user ruling — do NOT silently invent and lock one yourself.

## §3. `p5-socs-07` Drug Abuse — mandatory content boundaries (non-negotiable)

- Harmonise with the AJAMIX safety-treatment standard already used in the Basic Science arc (non-stigmatising, age-appropriate, NAFDAC-consistent framing).
- **Named substances limited to exactly:** `taba` (tobacco/cigarettes), `giya` (alcohol), and medicines not approved or provided by a parent, doctor, or health worker. Do not name, list, or hint at any other substance.
- **Absolutely prohibited:** an illicit-drug catalogue, street names/slang for any substance, methods of use, procurement/sourcing, concealment techniques, or any description of intoxication effects/sensations.
- Frame the module around: what drug misuse is (in the narrow sense above), why it harms health and family, and how to refuse peer pressure and seek help from a trusted adult.
- Draft the full Hausa text as you would any other module — do not skip or stub it. It will receive explicit human sign-off separately; your job is to produce a complete, boundary-compliant draft, not to leave it incomplete.
- In your milestone report, flag this module explicitly and prominently as requiring the user's full-content sign-off before M4 as a whole is approved — this is a standing brief requirement, not new to this dispatch.

## In scope

1. Create `tools/p5-batch/p5-socs-complete.json` — a JSON array of exactly 15 module objects (`p5-socs-01..15`), matching the §8 schema contract exactly, key-for-key.
2. Create `tools/image-manifest/p5-socs-image-manifest.json` — design-intent entries for all 15 modules, using the live 8-field schema. For `p5-socs-07` specifically, the image should be entirely non-graphic (e.g. a child talking to a trusted adult, or a "healthy choices" symbol) — no depiction of any substance, use, or intoxication.
3. Run every applicable source gate from brief §12 against a **temporary merged copy** of `app/content.json` that includes the full P3+P4 bands (already approved) AND this M4 batch — temp merge validates 309 + 15 (P3) + 15 (P4) + 15 (P5) = 354 modules. Do not modify `app/content.json` itself.
   - Schema-contract match (22 keys)
   - `node app/tools/validate-content.mjs` (scratch-copy technique as in M1–M3) against the temp-merged copy
   - IDs unique, `moduleNumber` 1–15 sequential within this batch
   - Word count 120–170 on every `textExplanationHa`
   - Audio-explanation alignment
   - `[PAUSE 1]`/`[PAUSE 2]` text in `audioScript` exactly matches `microPauses[].questionHa`
   - Each micro-pause `correctAnswer` appears exactly once in its `options`
   - Each quiz `answerFormula` does NOT appear among its `distractorFormulas`
   - Every quiz answer is taught in the module's own prose or audio script
   - Quiz question 5 and `[OUTRO]` are topic-specific per module — **except `p5-socs-15` (Revision and Assessment), a genuine full-P5-band consolidation, mirroring `p3-socs-15`/`p4-socs-15`**
   - No raw English leakage outside bracketed markers, except explicitly flagged borrowed terms
   - Hooked-letter lint: `node tools/p2-batch/hook-lint.mjs tools/p5-batch/p5-socs-complete.json` — must exit 0; list WARNINGS
   - Cross-module quiz-answer spelling consistency within this batch
   - Within-module redundancy check scoped to this 15-module batch
   - **Neutrality self-check for every module. `p5-socs-05`, `p5-socs-06`, `p5-socs-14` require documented, explicit attestations (mandatory list). Give `p5-socs-13` (Cultural Diversity) careful attention too — religious/ethnic neutrality — even though not on the mandatory list.**
   - **Family-planning exclusion check**: confirm `p5-socs-09` contains no family-planning content of any kind, in any framing.
   - **Fact-verification check for `p5-socs-11` (ECOWAS/AU) and `p5-socs-12` (UN)**: document what you verified and how; do not assert a specific ECOWAS member count without a checked source.
4. Write a full milestone report per brief §13, to `tasks/2026-07-16-M4-p5-socs-complete-report.md`, same structure as M1–M3 reports, PLUS a dedicated, prominently-flagged section for `p5-socs-07` reproducing its full Hausa text and confirming every §3 boundary above was respected (named substances, prohibited content, framing).
5. In the report, explicitly reprint the **full 15 module JSON objects** verbatim.
6. In the report, list every open terminology question. Explicitly confirm whether `dimokuradiyya`/`kundin tsarin mulki`/`zaɓe` were used and where, and whether a formal pollution term was proposed or deferred again.

## Out of scope — do not do these

- Do NOT edit `app/content.json`.
- Do NOT edit any runtime/engine file.
- Do NOT render, generate, or fetch any image or audio file.
- Do NOT run any `git` command.
- Do NOT author any module outside `p5-socs-01..15`.
- Do NOT modify the brief, the M0 matrix, or any M1/M2/M3 files.
- Do NOT introduce family-planning content anywhere in `p5-socs-09` under any framing.
- Do NOT exceed the `p5-socs-07` substance/content boundaries in §3 under any circumstance, even for pedagogical completeness — narrower is correct here, not broader.
- Do NOT hardcode an unverified ECOWAS member count in `p5-socs-11`.
- Do NOT deviate from any locked terminology term.
- No commit or push.

## Constraints

- Sandbox: `workspace-write`, scoped in practice to `tools/p5-batch/`, `tools/image-manifest/`, and `tasks/`.
- Follow brief §5 neutrality rules strictly, with the mandatory `p5-socs-05`/`06`/`14` documentation.
- All Ajami fields `null`, `ajami_validated: false` — Latin Hausa only.
- Correct hooked letters (ɓ ɗ ƙ).

## Report to

- `tasks/2026-07-16-M4-p5-socs-complete-report.md` (detailed report — full module objects + all gate results + dedicated `p5-socs-07` section)
- `--output-last-message` (brief summary)

## Rollback notes

No live file is touched, so no rollback is needed. If `p5-socs-07` cannot be drafted within the §3 boundaries without either omitting necessary safety content or exceeding scope, stop and report the specific tension rather than guessing which way to resolve it.

## Human approval gates

This produces a **source-only draft candidate**. `p5-socs-07` additionally requires the user's explicit content sign-off (not just Architect gate-passing) before M4 as a whole is treated as accepted — flag this prominently, do not bury it in the general report structure. No integration, merge, commit, or push happens in this slice.
