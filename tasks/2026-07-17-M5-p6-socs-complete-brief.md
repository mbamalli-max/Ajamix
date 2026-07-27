# AJAMIX Builder Brief — M5: P6 Social and Citizenship Studies Complete (source-only)

**Task ID:** AJAMIX-SOCS-M5-P6-COMPLETE — FINAL BAND of the P3–P6 Social and Citizenship Studies workstream.
**Role:** You are the Builder. Author content only — no scope decisions, no invented citations, no live-file edits.

## Objective

Author exactly 15 module objects — `p6-socs-01` through `p6-socs-15` — as a standalone JSON source file, completing the entire P6 band and the entire P3–P6 Social and Citizenship Studies workstream (60 modules total across P3–P6, all source-only pending final integration).

## CRITICAL: Two modules in this batch require special human-approval handling

### `p6-socs-03` (Gender Equality and Women's Empowerment) — tone pre-approved by user, 2026-07-17

The user has ALREADY approved this exact framing before drafting (do not deviate):
1. Girls' civic right to education and to pursue any lawful occupation.
2. Real Nigerian women in public/professional/community life as civic role models (do not invent named individuals beyond what's already locked elsewhere in the workstream — if you want to name someone, it must be someone whose civic contribution is already well-documented and age-appropriate, e.g. figures already used in `p6-socs-11`, or keep it non-named/generic).
3. Equal civic standing framed as **citizenship**, not as critique of any family, cultural, or religious practice.
4. **Explicitly exclude**: domestic-role prescriptions, marriage content, reproduction content.

This module does NOT require a full-content sign-off packet like `p5-socs-07`/`p6-socs-09` (the tone was pre-approved), but still needs the standard neutrality attestation.

### `p6-socs-09` (Safety and Security — Staying Safe as a Citizen) — MANDATORY full-content sign-off required after drafting

Same treatment as `p5-socs-07` in M4: this module CANNOT be integrated or accepted without the user's own explicit sign-off on its complete Hausa content, separate from and in addition to passing all automated gates. Boundaries (non-negotiable):
- **Title is "Safety and Security — Staying Safe as a Citizen," NOT "Terrorism and Security."**
- **Prohibited absolutely:** extremist/militant/armed group names (real or invented), tactics, recruitment narratives or signs, attack methods, current or historical conflict-zone examples, profiling by religion/ethnicity/clothing/behavior, "community-level warning signs" of any kind.
- **Permitted content only:** moving away from immediate physical danger, not touching suspicious or unknown objects, following official/adult instructions in an emergency, telling a trusted adult or contacting emergency services, general personal/neighbourhood safety (the kind of content already touched in `p4-socs-13`/`p5-socs-04` disaster-safety modules — extend that pattern, don't introduce security-service or counter-terrorism framing).
- Produce a dedicated, clearly marked sign-off section in the milestone report (mirror M4's `p5-socs-07` §14 structure exactly — boundary audit checklist, then the complete verbatim Hausa content, then an explicit sign-off question for the user).
- The image manifest entry must be entirely non-graphic/abstract — no weapon, no danger scene, no group of people depicted as a threat.

## Governing documents — read in full before writing any content

1. `/Users/muhammadbamalli/Documents/ajamix/docs/ARCHITECT-BRIEF-SOCS-P3-P6.md` — the full brief, especially:
   - §5 sensitivity/neutrality rules
   - §6 canonical topic map for `p6-socs-01..15` — **`p6-socs-06` (Judiciary) has an exact required framing** printed in the brief's own table: "Magistrate Courts handle many first cases; High Courts hear important matters and some appeals; Court of Appeal reviews specified decisions; Supreme Court of Nigeria is the highest court. Nigeria also has parallel state, Sharia and customary court structures — present this honestly rather than as one simple ladder." Use this framing precisely; do not simplify it into a single linear ladder.
   - §7 sensitive-topic controls for `p6-socs-03` and `p6-socs-09` (full text, matches the summary above)
   - §8 schema contract (22 keys)
   - §9 terminology gates — read ALL FOUR locked-term subsections (M1, M2, M3, M4) plus the current open-questions table. `dimokuradiyya`, `kundin tsarin mulki`, `zaɓe`, `jefa ƙuri'a` are now available for use where genuinely needed (e.g. `p6-socs-05` Electoral Process, which may need `zaɓe`/`jefa ƙuri'a`).
   - §12 Definition of Done (23 gates)
2. `/Users/muhammadbamalli/Documents/ajamix/tasks/2026-07-14-M0-alignment-matrix.md` — read the **Primary 6** table rows. Pay attention to Notes:
   - `p6-socs-06`: court structure "requires legal fact-checking and careful non-ladder framing" — verify the Supreme Court of Nigeria's actual role before writing (it is genuinely the apex court; Court of Appeal is the level below it; do not invent incorrect court names or a false strict hierarchy given the parallel Sharia/customary systems).
   - `p6-socs-07`: "Do not identify live conflicts, sects, or armed groups."
   - `p6-socs-08`: "No direct P6 migration/IDP/refugee objective was found... require authoritative sourcing during authoring" — if citing UNHCR facts, verify them; if uncertain, keep descriptive rather than asserting a specific figure.
   - `p6-socs-11`: the five named Nigerians (Nana Asma'u, Aminu Kano, Funmilayo Ransome-Kuti, Herbert Macaulay, Wole Soyinka) are Architect-selected — use exactly these five, one-sentence biography maximum each, civic contribution is the substance.
   - `p6-socs-12`: "Any population statistic must carry a reference year and authoritative source; avoid coercive family-size messaging." If you cannot verify a current, dated figure, stay qualitative (e.g. "Nigeria's population is large and growing") rather than inventing a number.
   - `p6-socs-13`: "Bank of Agriculture and BOI are brief-selected institutions and require current official verification at authoring time" — verify these are still the correct, current institution names before using them (do not use the retired NACRDB name).
   - `p6-socs-14`: "Avoid operational conflict details and current conflict actors."
3. `/Users/muhammadbamalli/Documents/ajamix/tools/p5-batch/p5-socs-complete.json` — the approved, terminology-locked P5 band (including the user-signed-off `p5-socs-07`). Read for tone, register, and the established pattern for how `p5-socs-07` handled its sensitive content — `p6-socs-09` should follow a similar disciplined, narrow-scope pattern.
4. Existing live modules `p2-socs-01..15` in `app/content.json` (read-only).
5. **Mandatory locked terminology** — consult brief §9 for the full list across all four prior locked-term subsections. Highlights relevant to P6: `zaɓe`/`jefa ƙuri'a`/`dimokuradiyya`/`kundin tsarin mulki` (now available), `ɗan ƙasa`/`ƴan ƙasa`, `ƙaramar hukuma`, `muhalli`, `sufuri`/`sadarwa`.
6. Existing image manifests (`tools/image-manifest/p3-socs-image-manifest.json`, `-part2.json`, `p4-socs-image-manifest.json`, `p5-socs-image-manifest.json`) — use the exact same 8-field compact schema.

## In scope

1. Create `tools/p6-batch/p6-socs-complete.json` — exactly 15 module objects (`p6-socs-01..15`), matching the §8 schema contract exactly.
2. Create `tools/image-manifest/p6-socs-image-manifest.json` — 15 design-intent entries, live 8-field schema. `p6-socs-09`'s entry must be entirely abstract/non-graphic per the boundary above.
3. Run every applicable source gate from brief §12 against a **temporary merged copy** of `app/content.json` that includes the full P3+P4+P5 bands (all approved) AND this M5 batch — temp merge validates 309 + 15 + 15 + 15 + 15 = 369 modules. Do not modify `app/content.json` itself.
   - Schema-contract match, validator (scratch-copy technique as in M1–M4)
   - IDs unique, `moduleNumber` 1–15 sequential
   - Word count 120–170 per module (note: recent bands have trended toward the 170 ceiling — if a module is naturally shorter, that's fine, don't pad artificially)
   - Audio-explanation alignment
   - `[PAUSE 1]`/`[PAUSE 2]` exact match to `microPauses[].questionHa`
   - Micro-pause answer-uniqueness; quiz answer-not-in-distractors
   - Quiz fact grounding
   - Q5/OUTRO topic-specific per module — except `p6-socs-15` (Revision and Consolidation — Bridge to JSS1), which should span the ENTIRE P3–P6 workstream's key facts as the final consolidation, not just the P6 band
   - No raw English leakage outside bracketed markers except explicitly flagged borrowed terms
   - Hooked-letter lint: `node tools/p2-batch/hook-lint.mjs tools/p6-batch/p6-socs-complete.json` — must exit 0
   - Cross-module quiz-answer consistency within the batch
   - Within-module redundancy check scoped to this batch
   - Neutrality self-check for every module against brief §5. **Mandatory explicit attestations required for**: `p6-socs-02`, `p6-socs-03`, `p6-socs-05`, `p6-socs-07`, `p6-socs-09`, `p6-socs-11` (all six are on the brief's explicit neutrality-review list).
4. Write a full milestone report per brief §13, to `tasks/2026-07-17-M5-p6-socs-complete-report.md`, same structure as prior reports, PLUS:
   - A dedicated `p6-socs-09` sign-off packet (mirror M4's `p5-socs-07` §14 exactly).
   - A dedicated `p6-socs-03` tone-compliance confirmation (confirm the pre-approved framing was followed exactly, quote the relevant prose).
   - A dedicated `p6-socs-06` court-structure fact-check note (what was verified, what source, confirm the non-ladder framing was used).
5. In the report, explicitly reprint the **full 15 module JSON objects** verbatim.
6. In the report, list every open terminology question, and explicitly confirm which of the now-available formal terms (`zaɓe`, `jefa ƙuri'a`, `dimokuradiyya`, `kundin tsarin mulki`) were used and where.
7. Since this is the FINAL band of the P3–P6 workstream, include a closing summary section confirming: total modules across all five milestones (M1–M5) = 60; all four bands (P3/P4/P5/P6) complete at 15/15 each; live `app/content.json` still untouched at 309; full workstream ready for the Architect's final consolidated review before any integration planning begins.

## Out of scope — do not do these

- Do NOT edit `app/content.json` — read-only, temp-merge validation only.
- Do NOT edit any runtime/engine file.
- Do NOT render, generate, or fetch any image or audio file.
- Do NOT run any `git` command.
- Do NOT author any module outside `p6-socs-01..15`.
- Do NOT modify the brief, the M0 matrix, or any P3/P4/P5 files.
- Do NOT deviate from the pre-approved `p6-socs-03` framing.
- Do NOT introduce ANY extremist group name, tactic, recruitment narrative, conflict-zone example, or profiling language in `p6-socs-09` — this is an absolute prohibition, not a style preference.
- Do NOT invent a false linear court hierarchy in `p6-socs-06` — use the brief's exact framing.
- Do NOT invent undated population statistics in `p6-socs-12`.
- Do NOT use the retired NACRDB name in `p6-socs-13` — verify Bank of Agriculture/BOI are current.
- Do NOT deviate from any other locked terminology.
- No commit or push.

## Constraints

- Sandbox: `workspace-write`, scoped to `tools/p6-batch/`, `tools/image-manifest/`, and `tasks/`.
- All Ajami fields `null`, `ajami_validated: false`.
- Correct hooked letters.

## Report to

- `tasks/2026-07-17-M5-p6-socs-complete-report.md`
- `--output-last-message`

## Rollback notes

No live file is touched. If `p6-socs-09` cannot be built within its absolute prohibitions, or `p6-socs-03` cannot follow the pre-approved framing, stop and report the specific blocker rather than proceeding with a compromised module.

## Human approval gates

Source-only draft candidate. `p6-socs-09` additionally requires the user's own explicit full-content sign-off, separate from gate-passing, before M5 (and the whole P3–P6 workstream) can be considered complete.
