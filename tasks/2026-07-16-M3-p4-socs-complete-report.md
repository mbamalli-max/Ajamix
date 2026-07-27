# AJAMIX M3 P4 Social and Citizenship Studies Complete Report

**Task:** `AJAMIX-SOCS-M3-P4-COMPLETE`  
**Status:** BUILD-COMPLETE SOURCE-ONLY DRAFT CANDIDATE — requires Architect review and human Hausa/content review; not integrated or shippable.  
**Date:** 2026-07-16  
**Scope:** Exactly `p4-socs-01..15`; no live content, runtime, image, or audio mutation.

## Deliverables

- `tools/p4-batch/p4-socs-complete.json` — exactly 15 module objects.
- `tools/image-manifest/p4-socs-image-manifest.json` — exactly 15 compact eight-field design-intent entries.
- `tasks/2026-07-16-M3-p4-socs-complete-report.md` — this gate report, including the full source JSON verbatim.
- Temporary validation tree only: `/tmp/ajamix-p4-socs-complete/`.

`app/content.json` was read and copied to the temporary tree but was not edited. No runtime/engine file was edited. No image or audio was fetched, rendered, or generated. No git command was run.

## 1. Module list

| ID | titleEn | titleHa |
|---|---|---|
| `p4-socs-01` | Nigeria — Our Country | Nijeriya — Ƙasarmu |
| `p4-socs-02` | The Nigerian People — Ethnic Groups and Languages | Al’ummomin Nijeriya da Harsunansu |
| `p4-socs-03` | Nigeria's Geography — Landscape and Regions | Yanayin Ƙasa da Yankunan Nijeriya |
| `p4-socs-04` | National Identity — Our Flag, Anthem, Pledge, and Symbols | Tuta, Taken Ƙasa, Alkawarin Ɗan Ƙasa, da Alamomi |
| `p4-socs-05` | Nigerian Government — The Three Tiers | Matakan Gwamnati Uku a Nijeriya |
| `p4-socs-06` | The Three Arms of Government | Rassan Gwamnati Uku |
| `p4-socs-07` | Democracy and Elections | Yadda Jama’a Ke Nuna Wanda Suke So Ya Jagorance Su |
| `p4-socs-08` | Nigerian Economy — Agriculture | Tattalin Arzikin Nijeriya — Noma da Kiwo |
| `p4-socs-09` | Nigerian Economy — Industry and Trade | Tattalin Arzikin Nijeriya — Masana’antu da Ciniki |
| `p4-socs-10` | Population and Settlement | Yawan Jama’a da Matsugunansu |
| `p4-socs-11` | Migration and Urbanisation | Sauya Wurin Zama da Girman Birane |
| `p4-socs-12` | Social Problems — Poverty and Community Responses | Matsalar Talauci da Yadda Al’umma Take Taimakawa |
| `p4-socs-13` | Social Problems — Child Labour and Child Rights | Aikin da Yake Cutar da Yara da Haƙƙoƙinsu |
| `p4-socs-14` | Cooperation — Family, Community, Nation | Haɗin Kai a Iyali, Al’umma, da Ƙasa |
| `p4-socs-15` | Revision and Assessment — P4 Social and Citizenship Studies | Bita da Tantancewa — Nazarin Zamantakewa na Aji Huɗu |

## 2. Validator and structure output

Temporary merge composition:

```text
temporary merge refreshed: 309 + 15 P3 + 15 P4 = 339
only modules grew: true
all 309 pre-existing objects frozen: true
pre-existing aggregate=5231f49b178a4f64a6de434de75492bdd3e93354deed262065139119fc5ba090
scratch-prefix aggregate=5231f49b178a4f64a6de434de75492bdd3e93354deed262065139119fc5ba090
P1/P2 Social Studies count=30 aggregate=13ade4ed8865ceda8cee7c7dfce0ce7274a22d1e231752420f8ad2c1f99c10b2
```

The first 15 additions were the approved P3 M1+M2 files; the next 15 were this M3 P4 batch. Existing sections other than `modules[]` were canonically identical. IDs were unique across all 339 scratch modules.

Command and output:

```text
node /tmp/ajamix-p4-socs-complete/app/tools/validate-content.mjs

validate-content: OK — 339 module(s) pass.
  track=vocational: 10
  track=formal:     329
  isChainLeaf:      330
  chainNext set:    9
```

Exit code: **0**. The live and scratch validator scripts had the same SHA-256 checksum.

Schema/sequence assertions: **PASS** — 15/15 modules have exactly the 22 §8 keys; `id` values are `p4-socs-01..15`; `moduleNumber` is 1–15; every module has exactly two micro-pauses and five quiz questions; all Ajami fields are `null`; every `ajami_validated` is `false`; paths match IDs; every leaf/track/audience field matches the contract.

Image-manifest assertion: **PASS** — 15/15 entries, unique sequential IDs, ID-matched image paths, module-matched titles, and exactly these eight keys: `id`, `imagePath`, `titleEn`, `titleHa`, `type`, `depictEn`, `labelsHa`, `safetyNote`.

## 3. Hooked-letter lint

```text
node tools/p2-batch/hook-lint.mjs tools/p4-batch/p4-socs-complete.json

hook-lint: 0 error(s), 0 warning(s).
```

Exit code: **0**. ERRORS: **0**. WARNINGS: **0**.

## 4. Word-count summary

Whitespace-token counts for `textExplanationHa`:

| ID | Words | Result |
|---|---:|---|
| `p4-socs-01` | 144 | PASS |
| `p4-socs-02` | 160 | PASS |
| `p4-socs-03` | 157 | PASS |
| `p4-socs-04` | 165 | PASS |
| `p4-socs-05` | 152 | PASS |
| `p4-socs-06` | 156 | PASS |
| `p4-socs-07` | 170 | PASS |
| `p4-socs-08` | 168 | PASS |
| `p4-socs-09` | 169 | PASS |
| `p4-socs-10` | 166 | PASS |
| `p4-socs-11` | 167 | PASS |
| `p4-socs-12` | 168 | PASS |
| `p4-socs-13` | 160 | PASS |
| `p4-socs-14` | 164 | PASS |
| `p4-socs-15` | 170 | PASS |

Minimum: **144**. Maximum: **170**. Out of range: **0/15**.

## 5. Audio-explanation alignment

Manual topic-by-topic review: **PASS, 15/15**. Each audio script teaches the same core facts as its prose while shortening and sequencing them for listening. Specifically: 01 country/map facts; 02 language diversity without ranking; 03 present-day physical geography; 04 symbols and civic unity; 05 three government tiers and shared services; 06 three arms and legal limits; 07 neutral citizen participation and INEC; 08 agriculture/kiwo and farm-to-market work; 09 processing/trade; 10 population/settlement planning; 11 reasons and effects of changing residence; 12 poverty causes and dignified responses; 13 rights and harmful-work distinction; 14 cooperation/gayya; 15 genuine full-band consolidation.

No audio script introduces a quiz fact absent from both its own prose and audio teaching.

## 6. Micro-pause exact-match confirmation

Programmatic exact-string comparison: **PASS, 30/30**.

- `[PAUSE 1]` question text equals `microPauses[0].questionHa` for all 15 modules.
- `[PAUSE 2]` question text equals `microPauses[1].questionHa` for all 15 modules.
- Each pause `correctAnswer` occurs exactly once among its three `options`: **30/30 PASS**.

## 7. Quiz answer integrity, Q5, OUTRO, and revision quality

- Quiz answer not present in its distractors: **75/75 PASS**.
- Five quiz questions per module: **15/15 PASS**.
- Q5 exact duplicates across modules: **0**.
- `[OUTRO]` exact duplicates across modules: **0**.
- Manual Q5 review: **15/15 topic-specific**.
- Manual OUTRO review: **15/15 topic-specific**.
- `p4-socs-15` is genuine consolidation rather than filler: its prose spans national geography, diversity, symbols, government, citizen participation, economy, population/movement, poverty, child rights, and cooperation; its pauses test INEC and the Niger/Benue confluence; its five quizzes cover the capital, government structure, INEC, child learning rights, and the band’s economic sequence.

## 8. Quiz fact grounding

Programmatic case-insensitive substring check of every literal `answerFormula` against its module’s own `textExplanationHa + audioScript`: **75/75 PASS**. Manual semantic review also found every correct answer explicitly taught. No answer depends on another module alone.

## 9. English-leakage scan

After bracketed audio markers were removed, the scan found no casual raw-English prose. Documented exceptions/names are:

- `LGA`: **1** learner-facing occurrence, parenthetical after the primary term `ƙaramar hukuma` in `p4-socs-05`, exactly following the locked M1 rule.
- `INEC`: **9** learner-facing matching-field/prose occurrences across `p4-socs-07` and revision module `p4-socs-15`; this is the official institutional acronym required by the canonical topic, not a coined Hausa term for the civic process.
- `Sahel`: **11** and `Sudan`: **2** occurrences; proper geographic/vegetation-zone names required by `p4-socs-03`.
- `Fulani`, `Yoruba`, `Igbo`, `Kanuri`, `Tiv`, `Edo`, and `Ibibio`: proper community/language names, not English leakage.
- `gas`: **3** occurrences, always in the phrase `iskar gas` in `p4-socs-09`; treated as a borrowed technical word and explicitly raised for user ruling below. No alternative Hausa technical noun was coined.

Forbidden/open candidate scan: `UNCRC` **0**; `dimokuradiyya` **0**; `kundin tsarin mulki` **0**; `zaɓe` **0**; `jefa ƙuri’a` **0**. The English concepts appear only in required `titleEn` metadata and English manifest fields, not Latin-Hausa learner content.

Result: **PASS with documented official/proper-name/borrowed-term exceptions; `gas` remains open for user ruling.**

## 10. Cross-module quiz-answer spelling consistency

Programmatic inventory of all `correctAnswer`, `options`, `answerFormula`, and `distractorFormulas` found only exact reuse, never competing spellings, for repeated matching strings. Key reviewed strings included:

- `ƙaramar hukuma` — exact hooked spelling throughout; four matching-field uses across `p4-socs-05` and `p4-socs-15`.
- `INEC` — exact uppercase spelling throughout; six matching-field uses across `p4-socs-07` and `p4-socs-15`.
- `Kogin Neja da Kogin Binuwai` — exact spelling throughout; five matching-field uses across `p4-socs-03` and `p4-socs-15`.
- `Sahel`, `Abuja`, `zaman lafiya`, `reshen zartarwa`, `reshen kafa doka`, `reshen shari’a`, `kiwo`, `sufuri`, and `muhalli` — one spelling per concept.

P3 answer-string spot-check: the P4 quiz answers that exactly reuse P3 quiz-answer strings are `ƙaramar hukuma` and `koyo`; both are byte-for-byte identical to the approved P3 strings. P4 revision uses the same locked spelling `kiwo`; no P3 locked answer was respelled. `musayar kaya da kaya` was not needed in this batch.

Result: **PASS**.

## 11. Within-module redundancy check

```text
node tools/p1-batch/check-within-module-redundancy.mjs --file=tools/p4-batch/p4-socs-complete.json

Within-module redundancy check passed for 15 module(s).
```

Exit code: **0**. Findings: **0**.

## 12. Close-paraphrase review

Automated cross-module sentence comparison at a 0.72 token-Jaccard threshold found one pair: the `p4-socs-03` river-confluence pause and the deliberately reused `p4-socs-15` revision pause. This is intentional consolidation, not accidental filler. Manual review found no other close-paraphrase pair requiring adjudication.

## 13. Neutrality and scope attestation

Six-rule self-check across all 15 modules:

1. Religion: PASS — no religious instruction, comparison, or ranking occurs.
2. Politics/governance: PASS — roles and processes only; no party, candidate, office-holder, or ideology is endorsed.
3. Gender: PASS — no domestic, occupational, civic, or leadership role is assigned by gender.
4. Ethnicity: PASS — communities are named without ranking, caricature, blame, or fixed traits.
5. History: PASS — no pre-colonial kingdom, colonial period, independence movement, or other historical narrative appears.
6. Conflict: PASS — no current conflict zone, armed group, militant group, sect, or operational conflict example appears.

Per-module attestation:

| Module | Attestation |
|---|---|
| `p4-socs-01` | **PASS — special cross-subject-risk review.** Present-day location, states/FCT, zones, capitals, directions, and map reading only. No historical narrative, pre-colonial content, colonial content, independence content, ethnic ownership, or political endorsement. The OUTRO explicitly keeps the task geographic. |
| `p4-socs-02` | **PASS — enhanced ethnicity review.** Hausa, Fulani, Yoruba, Igbo, Kanuri, Tiv, Edo, Ibibio, and other communities appear with equal dignity. No “major/minor” hierarchy, cultural ranking, caricature, fixed occupation, or claim that every member is alike. |
| `p4-socs-03` | **PASS — mandatory §5 neutrality attestation.** The module is exclusively present-day physical geography/civic environmental literacy: Sahel, Sudan grassland, forest, coastal vegetation, landforms, Niger/Benue rivers, and varied resources. It contains **no historical narrative, no pre-colonial kingdom content, no colonial-era content, no independence narrative, no conflict attribution, and no ethnic resource-ownership claim**. |
| `p4-socs-04` | PASS — national symbols are shared civic symbols, expressly not party or leader property; no compelled ideological loyalty or religious content. |
| `p4-socs-05` | PASS — government tiers and shared services only; no party, office-holder, ideology, or claim that one tier does everything. |
| `p4-socs-06` | PASS — institutional roles, legal limits, and accountability only; no partisan or ideological framing and no punitive conflict imagery. |
| `p4-socs-07` | **PASS — enhanced nonpartisanship review.** No party, candidate, slogan, colour, ideology, result, campaign persuasion, or endorsement appears. The lesson describes eligibility, one person acting once, secrecy, counting, INEC, respect, and lawful complaint routes only. Children are explicitly not participants in the adult process. |
| `p4-socs-08` | PASS — crop/livestock examples are geographic/economic, not ethnic or gendered; child safety is preserved. |
| `p4-socs-09` | PASS — oil/gas, manufacturing, and trade are descriptive; no company, region, or group receives blame, ownership, or superiority. |
| `p4-socs-10` | PASS — rural and urban settlements are compared without ranking, stereotyping, undated population figures, or ethnic mapping. |
| `p4-socs-11` | PASS — changing residence is treated as a neutral social/economic process; newcomers are not criminalised or blamed and no conflict/displacement narrative is introduced. |
| `p4-socs-12` | PASS — poverty is explicitly not treated as personal moral failure; help preserves dignity and is not credited to a party or group. |
| `p4-socs-13` | PASS — non-stigmatising child-protection framing; safe age-appropriate help is distinguished from harmful work; no graphic harm, named convention, exploitation detail, or victim blame. |
| `p4-socs-14` | PASS — cooperation respects disagreement and diversity; no coerced labour, religious hierarchy, national superiority, or conflict actor. |
| `p4-socs-15` | PASS — consolidation preserves the same neutral geographic, civic, economic, and child-rights framing; no historical or partisan filler. |

## 14. Sensitive-topic flags and exclusions

- No M3 module is one of the future full-draft user-signoff modules `p5-socs-07`, `p6-socs-03`, or `p6-socs-09`.
- `p4-socs-03` received the required explicit neutrality review above.
- `p4-socs-01`, `p4-socs-02`, and `p4-socs-07` received the task-requested enhanced reviews above.
- `p4-socs-13` contains no `UNCRC` acronym, no formal convention title, and no article number. Child rights are stated in plain Hausa.
- Family planning, historical narrative, live conflict actors, party/candidate content, and group blame are absent from the full batch.

## 15. Terminology open questions

The following concepts arose and remain open for the user’s ruling; none is treated as newly locked by this draft:

1. **Democracy/democratic:** needed conceptually in `p4-socs-07`. The draft does not use `dimokuradiyya` or any fixed Hausa technical noun. It uses the descriptive title/sentence `Yadda Jama’a Ke Nuna Wanda Suke So Ya Jagorance Su` and explains equal civic participation in plain sentences. Concept remains open.
2. **Constitution:** needed indirectly in `p4-socs-06` to explain legal limits on government arms. The draft does not use `kundin tsarin mulki`; it says `babbar dokar ƙasa`. Concept remains open.
3. **Election/voting:** needed centrally in `p4-socs-07` and in revision. The draft uses neither `zaɓe` nor `jefa ƙuri’a`; it describes registration, going to the designated place, showing one preferred representative once and in secret, and counting what people indicated. Concept remains open.
4. **Migration/urbanisation:** needed in `p4-socs-11`. No borrowed or fixed technical noun is introduced; the draft uses `sauya wurin zama` and `girma birane`. The formal terms remain open.
5. **Ward, technical/electoral sense:** not needed for the selected P4 treatment; neither a new word nor the P3 descriptive `ƙananan yankuna` is forced into `p4-socs-05/07`. The technical term remains open.
6. **FADAMA/fadama label:** the agricultural idea is taught descriptively as small low/wet places retaining water for dry-season cultivation. The uppercase programme label and a fixed learner-facing technical term were not introduced. Please rule whether `fadama` should be locked for later use.
7. **Natural gas:** `iskar gas` appears three times in `p4-socs-09` as a borrowed technical phrase required by the oil-and-gas topic. Please confirm whether `gas` is approved/locked or whether a descriptive Hausa fallback is preferred.
8. **Three arms terminology:** the draft uses `reshen zartarwa`, `reshen kafa doka`, and `reshen shari’a`. Please confirm these as the preferred learner-facing forms before integration.
9. **National pledge:** the draft uses descriptive `alkawarin ɗan ƙasa`. Please confirm whether this should be locked or revised.

Locked M1/M2 terminology was followed exactly: `ƙaramar hukuma` (with `LGA` once), `ɗan ƙasa`/`ƴan ƙasa`, `muhalli`, `sufuri`, `sadarwa`, `kiwo`, and all applicable hooked-letter house forms. No new formal term was introduced for pollution, globalisation, drug misuse, sustainability, or conflict resolution because those concepts did not require a fixed term in this batch.

## 16. Checksums and live-content confirmation

Final SHA-256 values:

```text
c0aaaeaf79c010d5921ddd02bc91ce944e104cfcb7a2a5d92d3c47d84f9088bb  app/content.json
0675243aa04ae550d916104a921d0c569ff1ba6c3ca19d4ea1f03119e00c496e  tools/p4-batch/p4-socs-complete.json
27365ecf1d818bcdd70a4e0e69927a7cd9e04b5a0859b564327a2e4f1f015aaa  tools/image-manifest/p4-socs-image-manifest.json
b3265e14330c9d5a7bcd96d9275c280dea2fb4ad6281b3643015543bdd433426  /tmp/ajamix-p4-socs-complete/app/content.json
9df1ed5fbc9ef1a3973a48c7cb1daa32555eac66f22db3bdfc078e72f9d0ab2a  app/tools/validate-content.mjs
9df1ed5fbc9ef1a3973a48c7cb1daa32555eac66f22db3bdfc078e72f9d0ab2a  /tmp/ajamix-p4-socs-complete/app/tools/validate-content.mjs
```

`app/content.json` before and after: `c0aaaeaf79c010d5921ddd02bc91ce944e104cfcb7a2a5d92d3c47d84f9088bb` — identical. The temporary merge changed only its scratch `modules[]`; the live file stayed at 309 modules.

## 17. Engine-file checksum and mtime confirmation

No engine/runtime file changed. Final SHA-256 and recorded mtimes match the pre-authoring baseline:

| File | SHA-256 | mtime epoch | mtime local |
|---|---|---:|---|
| `app/app.js` | `de8e10d60c1e10dbe318bb0e675a1934012758aabe56815741483c88797e37af` | 1783198948 | 2026-07-04 17:02:28 -0400 |
| `app/quiz-engine.js` | `f6c33db5bf6c91e1edc2cf7ae2548221eed3f4e0c2a491afd61198333cc80001` | 1776801044 | 2026-04-21 15:50:44 -0400 |
| `app/styles.css` | `2e90fb776b97be0187246b01ea6e39b30b91b26c2303904fb4f41a310e76a323` | 1783195979 | 2026-07-04 16:12:59 -0400 |
| `app/index.html` | `cae50dbe1b435a0bc2cf98ef035824866277b9fe3657cbdad00b0cee7f37dc43` | 1776528520 | 2026-04-18 12:08:40 -0400 |
| `app/sw.js` | `1818967c86a62fbf802427ae2e535c939e502e99f09ae5d09e66c3f350519409` | 1783183460 | 2026-07-04 12:44:20 -0400 |
| `app/bootstrap.js` | `c2c64c6ac71d10e8ca5b3a87eb88229e196b7da6ab8b0892d2cc791b79cf0ce7` | 1776474739 | 2026-04-17 21:12:19 -0400 |

## 18. Alignment-matrix columns and source-support limits

The M0 matrix remains the provisional source authority; no classification was upgraded and no official NERDC grade-document verification is claimed.

| ID | Curriculum/source basis | Public-source topic family | Source section | Classification | M3 note |
|---|---|---|---|---|---|
| 01 | S10 compiled P4 Nigerian History/geography; S1 context | national geography/civic identity | S10 regions, states/FCT, map reading; S1 p.3 | Enrichment | Cross-subject source; geographic/civic only, administrative facts taught without history. |
| 02 | S4 P4 SCS; S7 legacy P4; S10 cross-subject | diversity, beliefs, unity | S4 National Values/Beliefs; S7 pp.22,227; S10 peoples | Combined coverage | No major/minor ranking. |
| 03 | S10 P4 Nigerian History/geography; S1 context | physical environment/geographic diversity | S10 Geography and Environment; S1 p.3 | Enrichment | Cross-subject source; no history; resource distribution kept general. |
| 04 | S4 P4 SCS; S3 P3 SCS; S7 legacy P6 Civic | patriotism, identity, symbols | S4 National Values; S3 weeks 1–2; S7 p.33 | Combined coverage | No lyric text; current symbols treated generically pending human review. |
| 05 | S7 legacy P4 Civic/Social Studies | government structure/services | S7 pp.23,229–230 | Direct coverage | Functions age-appropriate and shared where relevant. |
| 06 | S5 P5 SCS; S7 legacy P5 Civic | separation of powers/government | S5 Types of Government II; S7 p.29 | Combined coverage | Grade-shift retained; plain legal-limit explanation. |
| 07 | S4 P4 SCS; S5 P5 SCS; S7 legacy P4 Civic | citizen participation and leadership-selection process | S7 p.23; S5 Electoral Process; S4 values/followership | Combined coverage | INEC/one-person-once detail grade-shifted; strictly nonpartisan. |
| 08 | S7 legacy P4 Social Studies | agriculture, labour, resources | S7 pp.230–232 | Direct coverage | Wet-area/dry-season farming idea described without programme overclaim. |
| 09 | S7 legacy P4/P6 Social Studies; S1 context | resources, production, distribution, trade | S7 pp.232–233,259–260 | Combined coverage | Oil/gas and ports are descriptive extensions. |
| 10 | S7 legacy P5 Social Studies; S6 P6 demography | population, housing, settlement | S7 pp.250–252; S6 Demography & Money I | Enrichment | No population figure; city examples are brief-selected. |
| 11 | S7 adjacent P4/P5/P6; S5 P5 SCS | mobility, settlement, work, community change | S7 pp.233,249–251,259; S5 trafficking-introduction context | Enrichment | **No direct P4 public SCS objective was found.** This is adjacent-concept enrichment; no direct-source claim is made. |
| 12 | S5 P5 SCS; S7 legacy P5 | social justice, services, community mobilisation | S5 Community Mobilization/Social Justice; S7 pp.27,251 | Combined coverage | Poverty not framed as personal moral failure. |
| 13 | S5 P5 SCS; S7 legacy P5 Civic | child rights/protection | S5 Child Rights and Protection; S7 pp.28–30 | Enrichment | **P4 child-labour framing is inferred, not directly sourced.** No convention acronym/title/article introduced. |
| 14 | S4 P4 SCS; S7 legacy P4 Civic | cooperation, volunteerism, communalism | S4 National Values/Volunteerism; S7 p.22 | Direct coverage | Gayya is the local example; international cooperation remains brief. |
| 15 | S4 P4 SCS | revision/assessment | S4 term-end weeks 11–12 | Direct coverage | AJAMIX consolidation covers the broader proposed P4 sequence. |

## Definition-of-Done gate ledger

| Gate | Result |
|---|---|
| 1. Exact §8 schema | PASS — 15/15, 22 keys each |
| 2. Validator on scratch merge | PASS — exit 0, 339 modules |
| 3. Only scratch `modules[]` grew | PASS — +30 total (15 approved P3 + 15 M3 P4); other sections identical |
| 4. Runtime files frozen | PASS — six checksums and mtimes unchanged |
| 5. IDs/module numbers | PASS — unique and sequential 1–15 |
| 6. 120–170 words | PASS — 144–170 |
| 7. Audio/prose alignment | PASS — 15/15 manual review |
| 8. Pause exact matches | PASS — 30/30 |
| 9. Pause answer integrity | PASS — 30/30 |
| 10. Quiz answer integrity | PASS — 75/75 |
| 11. Quiz grounding | PASS — 75/75 exact taught-string plus manual review |
| 12. Unique topic-specific Q5 | PASS — 15/15, no duplicates |
| 13. Unique topic-specific OUTRO | PASS — 15/15, no duplicates |
| 14. Revision quality | PASS — genuine P4 consolidation |
| 15. Raw-English leakage | PASS with documented official/proper/borrowed exceptions; `gas` open |
| 16. Hooked-letter lint | PASS — 0 errors, 0 warnings |
| 17. Cross-module scoring spelling | PASS; P3 reused answers exact |
| 18. Within-module redundancy | PASS — 0 findings |
| 19. Close-paraphrase review | PASS — only intentional 03→15 river revision pair |
| 20. Required neutrality attestation | PASS — explicit `p4-socs-03`; enhanced 01/02/07 and all-module audit |
| 21. Future sensitive-topic flags | N/A for M3; required exclusions confirmed |
| 22. P1/P2 Social Studies frozen | PASS — 30 objects, aggregate unchanged |
| 23. All pre-existing modules frozen | PASS — 309-object aggregate unchanged |

## 19. Full 15 module JSON objects — verbatim

The following fenced block is the complete byte-for-byte text of `tools/p4-batch/p4-socs-complete.json` at the checksum reported above.

```json
[
  {
    "id": "p4-socs-01",
    "gradeband": "p4",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 1,
    "titleEn": "Nigeria — Our Country",
    "titleHa": "Nijeriya — Ƙasarmu",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Nijeriya ƙasa ce a Yammacin Afirka. Tana da jihohi talatin da shida da Babban Birnin Tarayya. Abuja ita ce babban birnin ƙasa, kuma kowace jiha tana da babban birninta. Ana kuma haɗa jihohin cikin yankuna shida domin sauƙaƙa fahimtar wurarensu: Arewa maso Yamma, Arewa maso Gabas, Arewa ta Tsakiya, Kudu maso Yamma, Kudu maso Gabas, da Kudu maso Kudu. Waɗannan yankuna ba sabbin matakan gwamnati ba ne; hanya ce ta bayyana inda jihohi suke. Taswirar Nijeriya tana nuna iyakar ƙasa, jihohi, manyan birane, koguna, da gabar teku. Idan ka duba taswira, ka fara neman arewa, kudu, gabas, da yamma. Za ka iya gano jiharku da babban birninta, sannan ka kwatanta wurinta da Abuja. Sanin sassan ƙasarmu yana taimaka wa ƴan ƙasa su fahimci nisa, tafiya, ayyukan jama’a, da yadda wurare daban-daban suke da alaƙa. Wannan darasi na yanayin ƙasa ne da rayuwar ƴan ƙasa.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi Nijeriya a matsayin ƙasarmu. [MAIN] Nijeriya tana Yammacin Afirka. Tana da jihohi talatin da shida da Babban Birnin Tarayya. Abuja ita ce babban birnin ƙasa, kuma kowace jiha tana da babban birninta. Ana haɗa jihohin cikin yankuna shida domin bayyana wurarensu. Waɗannan yankuna ba matakan gwamnati ba ne. [PAUSE 1] Jihohi nawa ne a Nijeriya? [MAIN] Taswira tana iya nuna iyakar ƙasa, jihohi, manyan birane, koguna, da gabar teku. Idan ka duba taswira, ka fara neman arewa, kudu, gabas, da yamma. Ka gano jiharku da babban birninta, sannan ka kwatanta wurinta da Abuja. Sanin wurare yana taimaka wa ƴan ƙasa su fahimci nisa, tafiya, da ayyukan jama’a. [PAUSE 2] Wane birni ne babban birnin Nijeriya? [OUTRO] Ka nuna jiharku a taswirar Nijeriya, ka faɗi babban birninta, sannan ka nuna inda Abuja take ba tare da ba da labarin tarihi ba.",
    "audioFile": "audio/p4-socs-01.mp3",
    "imageCard": "images/p4-socs-01.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Jihohi nawa ne a Nijeriya?", "correctAnswer": "talatin da shida", "options": ["talatin da shida", "ashirin da shida", "arba’in da shida"]},
      {"pauseAtMs": 150000, "questionHa": "Wane birni ne babban birnin Nijeriya?", "correctAnswer": "Abuja", "options": ["Abuja", "Kano", "Lagos"]}
    ],
    "quizQuestions": [
      {"templateHa": "A wane ɓangaren Afirka Nijeriya take?", "answerFormula": "Yammacin Afirka", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["Gabashin Asiya", "Arewacin Turai", "Kudancin Amurka"]},
      {"templateHa": "Jihohi nawa ne a Nijeriya?", "answerFormula": "talatin da shida", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ashirin da shida", "arba’in da shida", "goma sha shida"]},
      {"templateHa": "Wane birni ne babban birnin Nijeriya?", "answerFormula": "Abuja", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["Kano", "Lagos", "Sokoto"]},
      {"templateHa": "Yankuna nawa ake amfani da su wajen bayyana wuraren jihohi?", "answerFormula": "shida", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["biyu", "huɗu", "takwas"]},
      {"templateHa": "Me ya kamata ka fara nema idan ka duba taswirar Nijeriya?", "answerFormula": "arewa, kudu, gabas, da yamma", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["launin takalma", "yawan kujeru", "sunan ɗalibai"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p4-socs-02",
    "gradeband": "p4",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 2,
    "titleEn": "The Nigerian People — Ethnic Groups and Languages",
    "titleHa": "Al’ummomin Nijeriya da Harsunansu",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Nijeriya tana da al’ummomi da harsuna masu yawa. Daga cikinsu akwai Hausa, Fulani, Yoruba, Igbo, Kanuri, Tiv, Edo, Ibibio, da wasu da dama. Kowane suna yana nufin mutane masu rayuwa da al’adu iri-iri; ba kowa a al’umma ɗaya yake magana, sutura, ko sana’a iri ɗaya ba. Mutum na iya magana da harshen iyalinsa, Hausa ko wani harshen hulɗa, da harshen da ake amfani da shi a makaranta. Harshe yana taimaka wa mutane su bayyana tunani, su koyar, su yi ciniki, kuma su adana labarai da al’adu. Babu al’umma ko harshe da ya fi wani daraja. Ƴan ƙasa suna da haƙƙin a girmama su ko da sun fito daga yanki ko al’ada dabam. Idan ka ji sabon suna ko harshe, ka tambaya cikin ladabi maimakon yin kwaikwayo ko raini. A makaranta, yara daga iyalai daban-daban za su iya aiki tare, su saurari juna, kuma su koyi kalmomi cikin girmamawa. Bambancin mutane yana ƙara ilimi, yayin da haɗin kai yake ƙarfafa Nijeriya.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi al’ummomin Nijeriya da harsunansu. [MAIN] Nijeriya tana da al’ummomi da harsuna masu yawa. Akwai Hausa, Fulani, Yoruba, Igbo, Kanuri, Tiv, Edo, Ibibio, da wasu da dama. Ba kowa a al’umma ɗaya yake magana, sutura, ko sana’a iri ɗaya ba. Mutum kuma na iya magana da harsuna fiye da ɗaya. [PAUSE 1] Me harshe yake taimaka wa mutane su yi? [MAIN] Harshe yana taimaka wa mutane su bayyana tunani, su koyar, su yi ciniki, kuma su adana al’adu. Babu al’umma ko harshe da ya fi wani daraja. Idan ka ji sabon suna, ka tambaya cikin ladabi, kada ka yi raini. Yara daga iyalai daban-daban za su iya aiki tare da sauraron juna. [PAUSE 2] Wane hali ya dace idan ka ji harshen da ba ka sani ba? [OUTRO] Ka faɗi harsuna biyu da ake ji a yankinku, sannan ka bayyana yadda sauraro cikin ladabi yake gina haɗin kai ba tare da fifita wata al’umma ba.",
    "audioFile": "audio/p4-socs-02.mp3",
    "imageCard": "images/p4-socs-02.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Me harshe yake taimaka wa mutane su yi?", "correctAnswer": "bayyana tunani", "options": ["bayyana tunani", "lalata kaya", "toshe hanya"]},
      {"pauseAtMs": 150000, "questionHa": "Wane hali ya dace idan ka ji harshen da ba ka sani ba?", "correctAnswer": "tambaya cikin ladabi", "options": ["tambaya cikin ladabi", "yin raini", "ƙin sauraro"]}
    ],
    "quizQuestions": [
      {"templateHa": "Wane harshe ne ake samu a Nijeriya?", "answerFormula": "Kanuri", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["launin kore", "layin dogo", "magudanar ruwa"]},
      {"templateHa": "Me harshe yake taimaka wa mutane su yi?", "answerFormula": "bayyana tunani", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["toshe hanya", "ɓoye kasuwa", "lalata itace"]},
      {"templateHa": "Shin kowa a al’umma ɗaya yake da sana’a iri ɗaya?", "answerFormula": "ba kowa a al’umma ɗaya yake magana, sutura, ko sana’a iri ɗaya ba", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["eh, sana’a ɗaya ce", "babu sana’a a Nijeriya", "sana’a ta yanki ɗaya ce"]},
      {"templateHa": "Wane hali ya dace idan ka ji harshen da ba ka sani ba?", "answerFormula": "tambaya cikin ladabi", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["yin kwaikwayo", "yin raini", "ƙin sauraro"]},
      {"templateHa": "Me haɗin kan al’ummomi yake yi wa Nijeriya?", "answerFormula": "haɗin kai yake ƙarfafa Nijeriya", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["yana rufe makarantu", "yana hana harsuna", "yana rage ilimi"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p4-socs-03",
    "gradeband": "p4",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 3,
    "titleEn": "Nigeria's Geography — Landscape and Regions",
    "titleHa": "Yanayin Ƙasa da Yankunan Nijeriya",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Yanayin ƙasar Nijeriya yana bambanta daga arewa zuwa kudu. A arewa mai nisa akwai yankin Sahel mai ƙarancin ciyayi da ruwan sama. A mafi yawan Arewa ana samun filayen ciyawa na Sudan, inda ciyayi da itatuwa suke bazuwa. A wasu sassan kudu akwai dazuzzuka masu itatuwa da ruwan sama mai yawa. Kusa da gabar teku kuma akwai wuraren da bishiyoyi suke girma cikin ruwa mai gauraye da gishiri. Kogin Neja da Kogin Binuwai manyan koguna ne; suna haɗuwa a Lokoja. Akwai kuma tsaunuka, kwaruruka, filaye, da gabar teku. Albarkatun ƙasa ba su bazu daidai ba. Wani wuri yana da ƙasa mai kyau ga noma, wani yana da daji, ruwa, kiwo, ko ma’adanai. Wannan bambanci yana shafar amfanin gona, sana’o’i, sufuri, da matsugunan mutane. Taswira tana taimaka maka ka gano yankunan ciyayi da koguna. Ka tuna: darasin yana bayyana wurare da yadda mutane suke amfani da muhalli cikin kulawa; ba labarin sarakuna, mulkin mallaka, ko yaƙi ba ne.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi yanayin ƙasa da yankunan Nijeriya. [MAIN] A arewa mai nisa akwai Sahel mai ƙarancin ciyayi da ruwan sama. A mafi yawan Arewa ana samun filayen ciyawa na Sudan. Wasu sassan kudu suna da dazuzzuka, gabar teku kuma tana da bishiyoyin da suke girma cikin ruwa mai gauraye da gishiri. [PAUSE 1] Waɗanne manyan koguna biyu ne suke haɗuwa a Lokoja? [MAIN] Kogin Neja da Kogin Binuwai suna haɗuwa a Lokoja. Akwai tsaunuka, kwaruruka, filaye, da gabar teku. Albarkatun ƙasa ba su bazu daidai ba; noma, daji, ruwa, kiwo, da ma’adanai suna bambanta tsakanin wurare. Wannan yana shafar sana’o’i, sufuri, da matsugunan mutane. [PAUSE 2] Wane yanki ne yake da ƙarancin ciyayi da ruwan sama? [OUTRO] Ka duba taswirar yanayin Nijeriya ka nuna Sahel, filayen ciyawa, dazuzzuka, da koguna biyu; ka tsaya ga bayanin ƙasa kawai, ba tarihin wani zamani ba.",
    "audioFile": "audio/p4-socs-03.mp3",
    "imageCard": "images/p4-socs-03.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Waɗanne manyan koguna biyu ne suke haɗuwa a Lokoja?", "correctAnswer": "Kogin Neja da Kogin Binuwai", "options": ["Kogin Neja da Kogin Binuwai", "Kogin Neja da Teku", "Kogin Binuwai da Tafki"]},
      {"pauseAtMs": 150000, "questionHa": "Wane yanki ne yake da ƙarancin ciyayi da ruwan sama?", "correctAnswer": "Sahel", "options": ["Sahel", "dazuzzuka", "gabar teku"]}
    ],
    "quizQuestions": [
      {"templateHa": "Wane yanki ne yake da ƙarancin ciyayi da ruwan sama?", "answerFormula": "Sahel", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["dazuzzuka", "gabar teku", "cikin teku"]},
      {"templateHa": "Waɗanne manyan koguna biyu ne suke haɗuwa a Lokoja?", "answerFormula": "Kogin Neja da Kogin Binuwai", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["Kogin Neja da Teku", "Tafki da Kwarin", "Kogin Binuwai da Sahel"]},
      {"templateHa": "A ina ake samun dazuzzuka masu ruwan sama mai yawa?", "answerFormula": "a wasu sassan kudu", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["a saman teku", "a cikin kasuwa", "a kan rufin gida"]},
      {"templateHa": "Shin albarkatun ƙasa sun bazu daidai a ko’ina?", "answerFormula": "Albarkatun ƙasa ba su bazu daidai ba", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["eh, ko’ina iri ɗaya ne", "babu albarkatu", "albarkatu suna cikin birni kaɗai"]},
      {"templateHa": "Me bambancin yanayin ƙasa yake iya shafawa?", "answerFormula": "sana’o’i, sufuri, da matsugunan mutane", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["launin allo", "yawan takalma", "sunan ajin makaranta"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p4-socs-04",
    "gradeband": "p4",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 4,
    "titleEn": "National Identity — Our Flag, Anthem, Pledge, and Symbols",
    "titleHa": "Tuta, Taken Ƙasa, Alkawarin Ɗan Ƙasa, da Alamomi",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Alamomin ƙasa suna taimaka wa ƴan ƙasa su tuna cewa suna cikin ƙasa ɗaya. Tutar Nijeriya tana da launuka kore, fari, kore. Kore yana nuna albarkatun ƙasa da noma, fari kuma yana nuna zaman lafiya. Tambarin Nijeriya yana ɗauke da alamomi da suke wakiltar ƙasa, ƙarfi, albarkatu, da haɗin kai. Taken ƙasa waƙa ce da ake rerawa a lokutan hukuma, makaranta, ko taron ƙasa. Alkawarin ɗan ƙasa kuwa kalmomi ne da mutum yake furtawa domin nuna biyayya ga ƙasa da niyyar yin alhaki. Ba sai kowa ya fito daga jiha, harshe, ko al’ada ɗaya ba kafin ya girmama waɗannan alamomi. Ana girmama tuta ta hanyar kula da ita, tsayawa cikin natsuwa idan tsarin makaranta ya buƙata, da guje wa amfani da ita wajen wasa ko lalatawa. Taken ƙasa da alkawari ba kalmomin haddacewa kawai ba ne; suna tunatar da ƴan ƙasa zaman lafiya, gaskiya, hidima, da haɗin kai. Girmama alama ba yana nufin goyon bayan jam’iyya ko shugaba ɗaya ba; na ƙasa baki ɗaya ne.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi tutar Nijeriya, taken ƙasa, alkawarin ɗan ƙasa, da alamomi. [MAIN] Tutar Nijeriya tana da kore, fari, kore. Kore yana nuna albarkatun ƙasa da noma, fari kuma yana nuna zaman lafiya. Tambarin Nijeriya yana ɗauke da alamomi da suke wakiltar ƙasa, ƙarfi, albarkatu, da haɗin kai. [PAUSE 1] Me farin launin tutar Nijeriya yake nunawa? [MAIN] Taken ƙasa waƙa ce da ake rerawa a lokutan hukuma ko makaranta. Alkawarin ɗan ƙasa kalmomi ne da ake furtawa domin nuna biyayya ga ƙasa da niyyar yin alhaki. Waɗannan alamomi na ƙasa baki ɗaya ne, ba na jam’iyya ko shugaba ɗaya ba. A kula da tuta, a kuma tsaya cikin natsuwa idan tsarin makaranta ya buƙata. [PAUSE 2] Me alamomin ƙasa suke tunatar da ƴan ƙasa? [OUTRO] Lokacin da ka ga tuta ko ka ji taken ƙasa, ka tuna da zaman lafiya, hidima, gaskiya, da haɗin kan dukkan ƴan Nijeriya.",
    "audioFile": "audio/p4-socs-04.mp3",
    "imageCard": "images/p4-socs-04.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Me farin launin tutar Nijeriya yake nunawa?", "correctAnswer": "zaman lafiya", "options": ["zaman lafiya", "hayaniya", "rarrabuwar kai"]},
      {"pauseAtMs": 150000, "questionHa": "Me alamomin ƙasa suke tunatar da ƴan ƙasa?", "correctAnswer": "suna cikin ƙasa ɗaya", "options": ["suna cikin ƙasa ɗaya", "suna cikin jam’iyya ɗaya", "suna magana da harshe ɗaya"]}
    ],
    "quizQuestions": [
      {"templateHa": "Waɗanne launuka ne suke tutar Nijeriya?", "answerFormula": "kore, fari, kore", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ja da baki", "shuɗi da ruwan hoda", "rawaya da shunayya"]},
      {"templateHa": "Me farin launin tutar Nijeriya yake nunawa?", "answerFormula": "zaman lafiya", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["hayaniya", "rarrabuwar kai", "tsoro"]},
      {"templateHa": "Me ake kira alamar ƙasa mai ɗauke da alamomi da dama?", "answerFormula": "tambarin Nijeriya", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["takardar makaranta", "alamar kasuwa", "tambarin ƙungiyar wasa"]},
      {"templateHa": "Shin alamomin ƙasa na jam’iyya ɗaya ne?", "answerFormula": "na ƙasa baki ɗaya ne", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["eh, na jam’iyya ɗaya ne", "na wani gari kaɗai ne", "na makaranta kaɗai ne"]},
      {"templateHa": "Waɗanne halaye taken ƙasa da alkawari suke tunatarwa?", "answerFormula": "zaman lafiya, gaskiya, hidima, da haɗin kai", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["raini da yaudara", "faɗa da hayaniya", "ɓarna da rarrabuwar kai"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p4-socs-05",
    "gradeband": "p4",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 5,
    "titleEn": "Nigerian Government — The Three Tiers",
    "titleHa": "Matakan Gwamnati Uku a Nijeriya",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Nijeriya tana da matakan gwamnati uku: Gwamnatin Tarayya, gwamnatin jiha, da ƙaramar hukuma. Gwamnatin Tarayya tana aiki ga ƙasa baki ɗaya. Tana kula da abubuwa kamar kuɗin ƙasa, tsaron ƙasa, da manyan ayyukan da suka haɗa jihohi. Gwamnatin jiha tana aiki a cikin jiharta. Tana iya kula da wasu makarantu, asibitoci, hanyoyi, da shirye-shiryen ci gaban jiha. Ƙaramar hukuma (LGA) tana kusa da jama’ar gari da ƙauye. Tana iya taimakawa wajen kasuwanni, tsaftar muhalli, wasu hanyoyin cikin gari, wuraren ruwa, da bayanan haihuwa. Ayyuka da dama suna bukatar matakai biyu ko uku su haɗa hannu; ba kowane aiki ne na hukuma ɗaya kaɗai ba. Misali, kula da lafiya ko ilimi na iya samun gudummawa daga matakai daban-daban. Ƴan ƙasa za su iya sanar da bukata ga ofishin da ya dace cikin ladabi. Sanin matakan yana taimaka maka ka fahimci wace hukuma take kusa da matsala da kuma dalilin haɗin gwiwa tsakanin hukumomi.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi matakan Gwamnatin Nijeriya uku. [MAIN] Matakan su ne Gwamnatin Tarayya, gwamnatin jiha, da ƙaramar hukuma. Tarayya tana aiki ga ƙasa baki ɗaya. Jiha tana aiki a cikin jiharta. Ƙaramar hukuma tana kusa da jama’ar gari da ƙauye. [PAUSE 1] Waɗanne matakan gwamnati uku ne Nijeriya take da su? [MAIN] Tarayya tana kula da kuɗin ƙasa da wasu manyan ayyuka. Jiha tana iya kula da wasu makarantu, asibitoci, da hanyoyi. Ƙaramar hukuma tana iya taimakawa wajen kasuwa, tsaftar muhalli, wuraren ruwa, da wasu hanyoyin cikin gari. Ayyuka da dama suna bukatar hukumomi su haɗa hannu. [PAUSE 2] Wace hukuma ce take kusa da jama’ar gari da ƙauye? [OUTRO] Idan ka ga buƙatar kasuwa, makaranta, ko babbar hanya, ka tambayi wane matakin gwamnati ne zai iya shiga da kuma wanda zai haɗa hannu da shi.",
    "audioFile": "audio/p4-socs-05.mp3",
    "imageCard": "images/p4-socs-05.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Waɗanne matakan gwamnati uku ne Nijeriya take da su?", "correctAnswer": "Tarayya, jiha, da ƙaramar hukuma", "options": ["Tarayya, jiha, da ƙaramar hukuma", "gida, aji, da kasuwa", "arewa, kudu, da teku"]},
      {"pauseAtMs": 150000, "questionHa": "Wace hukuma ce take kusa da jama’ar gari da ƙauye?", "correctAnswer": "ƙaramar hukuma", "options": ["ƙaramar hukuma", "ƙungiyar wasa", "ajin makaranta"]}
    ],
    "quizQuestions": [
      {"templateHa": "Matakan gwamnati nawa ne Nijeriya take da su?", "answerFormula": "uku", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["biyu", "biyar", "bakwai"]},
      {"templateHa": "Wace gwamnati ce take aiki ga ƙasa baki ɗaya?", "answerFormula": "Gwamnatin Tarayya", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["gwamnatin aji", "hukumar kasuwa", "ƙungiyar unguwa"]},
      {"templateHa": "Wace gwamnati ce take aiki a cikin jiharta?", "answerFormula": "gwamnatin jiha", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ƙungiyar makaranta", "gidan iyali", "ofishin kasuwa"]},
      {"templateHa": "Wace hukuma ce take kusa da jama’ar gari da ƙauye?", "answerFormula": "ƙaramar hukuma", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ƙungiyar wasa", "ajin makaranta", "gidan iyali"]},
      {"templateHa": "Me ya sa hukumomi suke haɗa hannu?", "answerFormula": "ayyuka da dama suna bukatar hukumomi su haɗa hannu", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["domin a rufe makarantu", "domin a hana jama’a magana", "domin kasuwa ta daina aiki"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p4-socs-06",
    "gradeband": "p4",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 6,
    "titleEn": "The Three Arms of Government",
    "titleHa": "Rassan Gwamnati Uku",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Gwamnati tana da rassa uku masu ayyuka daban-daban. Reshen zartarwa yana gudanar da ayyukan gwamnati kuma yana aiwatar da dokoki. Reshen kafa doka yana tattauna bukatun jama’a, yana tsara dokoki, kuma yana duba yadda ake kashe kuɗin jama’a. Reshen shari’a yana sauraron shari’o’i, yana bayyana yadda doka take aiki, kuma yana warware saɓani bisa doka. A matakan Tarayya da jiha ana samun waɗannan rassa, ko da sunayen ofisoshinsu da girman aikinsu suna bambanta. Babbar dokar ƙasa tana bayyana iyakokin ayyukansu. Rarraba ayyuka yana taimakawa kada reshe ɗaya ya yi komai shi kaɗai. Kowane reshe yana iya duba wani a hanyar da doka ta tanada. Wannan yana ƙarfafa adalci, alhaki, da bin doka. Reshen kafa doka ba ya yanke hukunci a kotu, kuma kotu ba ta gudanar da aikin yau da kullum na gwamnati. Sanin bambancinsu yana taimaka wa ɗan ƙasa ya fahimci inda ake yin doka, inda ake aiwatar da ita, da inda ake warware saɓani.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi rassan gwamnati uku. [MAIN] Reshen zartarwa yana gudanar da ayyukan gwamnati kuma yana aiwatar da dokoki. Reshen kafa doka yana tattauna bukatun jama’a da tsara dokoki. Reshen shari’a yana sauraron shari’o’i, yana bayyana yadda doka take aiki, kuma yana warware saɓani bisa doka. [PAUSE 1] Wane reshe ne yake tsara dokoki? [MAIN] Babbar dokar ƙasa tana bayyana iyakokin ayyukan rassan. Rarraba ayyuka yana taimakawa kada reshe ɗaya ya yi komai shi kaɗai. Kowane reshe yana iya duba wani ta hanyar da doka ta tanada. Wannan yana ƙarfafa adalci, alhaki, da bin doka. [PAUSE 2] Me reshen shari’a yake yi idan mutane suna da saɓani? [OUTRO] Ka haɗa kowane aiki da reshensa: aiwatar da doka, tsara doka, ko warware saɓani bisa doka; wannan rarrabewa tana kare adalci.",
    "audioFile": "audio/p4-socs-06.mp3",
    "imageCard": "images/p4-socs-06.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Wane reshe ne yake tsara dokoki?", "correctAnswer": "reshen kafa doka", "options": ["reshen kafa doka", "reshen zartarwa", "reshen shari’a"]},
      {"pauseAtMs": 150000, "questionHa": "Me reshen shari’a yake yi idan mutane suna da saɓani?", "correctAnswer": "yana warware saɓani bisa doka", "options": ["yana warware saɓani bisa doka", "yana shuka amfanin gona", "yana sayar da kaya"]}
    ],
    "quizQuestions": [
      {"templateHa": "Wane reshe ne yake aiwatar da dokoki?", "answerFormula": "reshen zartarwa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["reshen kafa doka", "reshen shari’a", "ƙungiyar kasuwa"]},
      {"templateHa": "Wane reshe ne yake tsara dokoki?", "answerFormula": "reshen kafa doka", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["reshen zartarwa", "reshen shari’a", "ƙungiyar unguwa"]},
      {"templateHa": "Wane reshe ne yake sauraron shari’o’i?", "answerFormula": "reshen shari’a", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["reshen zartarwa", "reshen kafa doka", "ofishin kasuwa"]},
      {"templateHa": "Me ya sa ake rarraba ayyukan rassan gwamnati?", "answerFormula": "kada reshe ɗaya ya yi komai shi kaɗai", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["domin a hana doka", "domin a rufe kotu", "domin a soke alhaki"]},
      {"templateHa": "Me duba ayyukan juna tsakanin rassan yake ƙarfafawa?", "answerFormula": "adalci, alhaki, da bin doka", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["rashin doka", "ɓoye ayyuka", "reshe ɗaya ya yi komai"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p4-socs-07",
    "gradeband": "p4",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 7,
    "titleEn": "Democracy and Elections",
    "titleHa": "Yadda Jama’a Ke Nuna Wanda Suke So Ya Jagorance Su",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "A Nijeriya, jama’a suna nuna wanda suke so ya jagorance su ta hanyar da doka ta tsara. Mutanen da doka ta ba dama suna yin rajista, su je wurin da aka tanada, su nuna mutum guda da suke so ya wakilce su, sau ɗaya cikin sirri. Wannan yana sa muryar kowane mai shiga ta sami daraja iri ɗaya. Hukumar INEC ce take shirya wannan aiki a matakin ƙasa, tana koyar da jama’a, tana tanadar wurare, sannan ana ƙirga abin da mutane suka nuna. Dole ne aikin ya kasance cikin gaskiya, natsuwa, da bin doka. Ba a tilasta wa mutum ya nuna wanda wani yake so ba, kuma ba a sayen ra’ayinsa da kyauta. Ƴan ƙasa suna da rawar sauraron bayani, tambayar abin da bai bayyana ba, girmama ra’ayin wasu, da karɓar hanyar doka idan suna da ƙorafi. Yara ba sa shiga wannan aikin na manya, amma za su iya koyon gaskiya, sauraro, da yadda ake yanke shawara cikin adalci. Darasin ba ya goyon bayan jam’iyya, mutum, ko ra’ayi na siyasa.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi yadda jama’a ke nuna wanda suke so ya jagorance su. [MAIN] Mutanen da doka ta ba dama suna yin rajista, su je wurin da aka tanada, su nuna mutum guda sau ɗaya kuma cikin sirri. Wannan yana sa muryar kowane mai shiga ta sami daraja iri ɗaya. Hukumar INEC ce take shirya wannan aiki a matakin ƙasa. [PAUSE 1] Wace hukuma ce take shirya wannan aiki a matakin ƙasa? [MAIN] Ana ƙirga abin da mutane suka nuna, kuma aikin ya kasance cikin gaskiya, natsuwa, da bin doka. Ba a tilasta wa mutum ya nuna wanda wani yake so ba. Ƴan ƙasa su saurari bayani, su girmama ra’ayin wasu, su bi hanyar doka idan suna da ƙorafi. [PAUSE 2] Sau nawa mutumin da doka ta ba dama zai nuna mutum guda? [OUTRO] Ka tuna da ƙa’idodi uku na wannan aikin: kowane mutum sau ɗaya, sirri, da ƙirga abin da jama’a suka nuna cikin gaskiya—ba tare da nuna goyon bayan kowa ba.",
    "audioFile": "audio/p4-socs-07.mp3",
    "imageCard": "images/p4-socs-07.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Wace hukuma ce take shirya wannan aiki a matakin ƙasa?", "correctAnswer": "INEC", "options": ["INEC", "ƙungiyar wasa", "kasuwar gari"]},
      {"pauseAtMs": 150000, "questionHa": "Sau nawa mutumin da doka ta ba dama zai nuna mutum guda?", "correctAnswer": "sau ɗaya", "options": ["sau ɗaya", "sau biyu", "sau uku"]}
    ],
    "quizQuestions": [
      {"templateHa": "Me mutanen da doka ta ba dama suke yi kafin su je wurin da aka tanada?", "answerFormula": "suna yin rajista", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["suna ɓoye sunansu", "suna lalata kaya", "suna rufe wurin"]},
      {"templateHa": "Wace hukuma ce take shirya wannan aiki a matakin ƙasa?", "answerFormula": "INEC", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ƙungiyar wasa", "kasuwar gari", "ajin makaranta"]},
      {"templateHa": "Sau nawa mutum zai nuna mutum guda?", "answerFormula": "sau ɗaya", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["sau biyu", "sau uku", "sau huɗu"]},
      {"templateHa": "Wane hali ya dace idan wani yana da ra’ayi dabam?", "answerFormula": "girmama ra’ayin wasu", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["tilasta masa", "yi masa barazana", "ƙin sauraro"]},
      {"templateHa": "Waɗanne ƙa’idodi uku ne suke kare wannan aikin?", "answerFormula": "kowane mutum sau ɗaya, sirri, da ƙirga abin da jama’a suka nuna cikin gaskiya", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["tilas, kyauta, da hayaniya", "ɓoye sakamako da tsoro", "rashin rajista da faɗa"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p4-socs-08",
    "gradeband": "p4",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 8,
    "titleEn": "Nigerian Economy — Agriculture",
    "titleHa": "Tattalin Arzikin Nijeriya — Noma da Kiwo",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Noma da kiwo suna da muhimmanci ga tattalin arzikin Nijeriya. Manoma suna samar da abincin da iyalai suke ci, kamar gero, dawa, shinkafa, masara, wake, rogo, doya, da kayan lambu. Wasu amfanin gona ana shuka su domin sayarwa da sarrafawa. Gyada ta shahara a Arewa, koko a wasu sassan Kudu maso Yamma, manja kuma a wuraren da suke da ruwan sama mai yawa. Kiwo ya haɗa da kula da shanu, awaki, tumaki, kaji, da kifi. Dabbobi suna bukatar ruwa, abinci, mafaka, da kula da lafiya. A wasu ƙananan wuraren da suke riƙe ruwa a lokacin rani, manoma suna shuka kayan lambu da wasu amfanin gona. Wannan yana ƙara lokacin noma, amma ana bukatar kula da ruwa da ƙasa. Noma yana samar da aiki ga manomi, mai ɗaukar kaya, mai sarrafa abinci, da ɗan kasuwa. Matsaloli kamar ƙarancin ruwa, kwari, rashin hanya mai kyau, ko asarar amfanin gona suna rage abin da ake samu. Aiki tare, ajiyar amfanin gona, da amfani da hanya mai aminci suna taimaka wa al’umma.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi noma da kiwo a tattalin arzikin Nijeriya. [MAIN] Manoma suna shuka gero, dawa, shinkafa, masara, wake, rogo, doya, da kayan lambu. Gyada ta shahara a Arewa, koko a wasu sassan Kudu maso Yamma, manja kuma a wuraren da suke da ruwan sama mai yawa. Kiwo ya haɗa da shanu, awaki, tumaki, kaji, da kifi. [PAUSE 1] Wane amfanin gona ne ya shahara a Arewa? [MAIN] A wasu wuraren da suke riƙe ruwa, manoma suna iya shuka kayan lambu lokacin rani. Noma yana samar da aiki ga manomi, mai ɗaukar kaya, mai sarrafa abinci, da ɗan kasuwa. Ajiya mai kyau da hanya mai kyau suna rage asarar amfanin gona. Dabbobi kuma suna bukatar ruwa, abinci, mafaka, da lafiya. [PAUSE 2] Me dabbobin kiwo suke bukata? [OUTRO] Ka bi tafiyar gyada ko gero daga gona zuwa ajiya, sarrafawa, sufuri, da kasuwa, sannan ka faɗi aikin kowane mutum a wannan tafiya.",
    "audioFile": "audio/p4-socs-08.mp3",
    "imageCard": "images/p4-socs-08.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Wane amfanin gona ne ya shahara a Arewa?", "correctAnswer": "gyada", "options": ["gyada", "koko", "manja"]},
      {"pauseAtMs": 150000, "questionHa": "Me dabbobin kiwo suke bukata?", "correctAnswer": "ruwa, abinci, mafaka, da lafiya", "options": ["ruwa, abinci, mafaka, da lafiya", "hayaniya da ƙura", "takarda da biro"]}
    ],
    "quizQuestions": [
      {"templateHa": "Wane amfanin gona ne ya shahara a Arewa?", "answerFormula": "gyada", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["koko", "manja", "ganyen teku"]},
      {"templateHa": "Wane amfanin gona ne ake shukawa a wasu sassan Kudu maso Yamma?", "answerFormula": "koko", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["takalmi", "gilashi", "littafi"]},
      {"templateHa": "Wace dabba ce ake kiwo?", "answerFormula": "tumaki", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["kujeru", "motoci", "tukwane"]},
      {"templateHa": "Me ajiya mai kyau take ragewa?", "answerFormula": "asarar amfanin gona", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["yawan ilimi", "ruwan sama", "haɗin kai"]},
      {"templateHa": "Waɗanne mutane ne noma yake ba aikin yi?", "answerFormula": "manomi, mai ɗaukar kaya, mai sarrafa abinci, da ɗan kasuwa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["direban jirgin sama kaɗai", "ɗalibai kaɗai", "mai shela shi kaɗai"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p4-socs-09",
    "gradeband": "p4",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 9,
    "titleEn": "Nigerian Economy — Industry and Trade",
    "titleHa": "Tattalin Arzikin Nijeriya — Masana’antu da Ciniki",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Masana’antu suna sarrafa albarkatun ƙasa su zama kayan amfani. Misali, hatsi zai iya zama gari, auduga ta zama zare ko tufa, fata ta zama takalmi, manja kuma ta zama kayan abinci. Wasu masana’antu suna haɗa motoci, yin siminti, sarrafa abinci, ko ƙera kayan gida. Nijeriya tana kuma da man fetur da iskar gas. Ana hako su, a sarrafa wasu, sannan a yi amfani da su ko a sayar; aikin ya kamata ya kiyaye lafiya da muhalli. Ciniki yana haɗa masu samarwa, masu ɗaukar kaya, masu sayarwa, da masu saya. Kasuwanni suna rarraba kaya a cikin gari, tashoshin jiragen ruwa kuma suna taimaka wa kaya su shiga ko su fita daga ƙasa. Kaya na iya bin matakai: albarkatun ƙasa, sarrafawa, ɗauka, sayarwa, sannan amfani. Idan hanya, wuta, ajiya, ko sadarwa ta samu matsala, farashi da samuwar kaya za su iya canzawa. Ciniki mai kyau yana bukatar gaskiya, aunawa daidai, biyan kuɗi yadda aka amince, da kula da kayan mutane. Masana’antu da ciniki suna samar da ayyukan yi da kuɗin shiga.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi masana’antu da ciniki a Nijeriya. [MAIN] Masana’antu suna sarrafa albarkatun ƙasa su zama kayayyaki. Hatsi zai iya zama gari, auduga ta zama zare ko tufa, fata ta zama takalmi. Nijeriya tana da man fetur da iskar gas, kuma aikin hako su ya kamata ya kiyaye lafiya da muhalli. [PAUSE 1] Me masana’antu suke yi da albarkatun ƙasa? [MAIN] Ciniki yana haɗa masu samarwa, masu ɗaukar kaya, masu sayarwa, da masu saya. Kasuwanni suna rarraba kaya, tashoshin jiragen ruwa kuma suna taimaka wa kaya su shiga ko su fita daga ƙasa. Kaya na bin sarrafawa, ɗauka, sayarwa, sannan amfani. [PAUSE 2] Wane wuri ne yake taimaka wa kaya su shiga ko su fita daga ƙasa ta ruwa? [OUTRO] Ka zaɓi auduga, hatsi, ko fata, ka bi matakanta daga albarkatun ƙasa zuwa masana’anta, sufuri, kasuwa, da mai amfani.",
    "audioFile": "audio/p4-socs-09.mp3",
    "imageCard": "images/p4-socs-09.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Me masana’antu suke yi da albarkatun ƙasa?", "correctAnswer": "suna sarrafa su su zama kayayyaki", "options": ["suna sarrafa su su zama kayayyaki", "suna jefa su a hanya", "suna ɓoye su duka"]},
      {"pauseAtMs": 150000, "questionHa": "Wane wuri ne yake taimaka wa kaya su shiga ko su fita daga ƙasa ta ruwa?", "correctAnswer": "tashar jiragen ruwa", "options": ["tashar jiragen ruwa", "filin wasa", "ajin makaranta"]}
    ],
    "quizQuestions": [
      {"templateHa": "Me auduga za ta iya zama bayan sarrafawa?", "answerFormula": "zare ko tufa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["dutse ko yashi", "ruwa ko iska", "kujera ko allo"]},
      {"templateHa": "Waɗanne albarkatu biyu ne ake samu a Nijeriya?", "answerFormula": "man fetur da iskar gas", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["takarda da biro", "kujera da allo", "hula da takalmi"]},
      {"templateHa": "Me ciniki yake haɗawa?", "answerFormula": "masu samarwa, masu ɗaukar kaya, masu sayarwa, da masu saya", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ɗalibi ɗaya kaɗai", "mai shela kaɗai", "direban jirgi kaɗai"]},
      {"templateHa": "Waɗanne wurare ne suke taimaka wa kaya su shiga ko su fita daga ƙasa ta ruwa?", "answerFormula": "tashoshin jiragen ruwa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["filayen wasa", "gonaki", "azuzuwan makaranta"]},
      {"templateHa": "Wane tsari kaya zai iya bi kafin mai amfani ya same shi?", "answerFormula": "sarrafawa, ɗauka, sayarwa, sannan amfani", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ɓoye, jefawa, da ƙonawa", "wasa, gudu, da barci", "rubutu, karatu, da lissafi"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p4-socs-10",
    "gradeband": "p4",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 10,
    "titleEn": "Population and Settlement",
    "titleHa": "Yawan Jama’a da Matsugunansu",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Yawan jama’a yana nufin adadin mutanen da suke zaune a wani wuri. Matsuguni kuwa wuri ne da mutane suka kafa gidaje da rayuwa. A ƙauye, gidaje na iya kasancewa warwatse ko kusa da gonaki, kiwo, da ƙananan kasuwanni. A birni, mutane da gidaje suna da yawa, kuma ana samun manyan kasuwanni, makarantu, asibitoci, ofisoshi, da hanyoyi. Kano, Kaduna, Maiduguri, da Sokoto misalan biranen Arewacin Nijeriya ne. Ba kowane ƙauye ko birni yake kama da wani ba; girma da ayyuka suna bambanta. Gwamnati tana ƙirga mutanen ƙasa a lokaci da aka tsara, gida bayan gida, domin sanin yawan jama’a da inda suke zaune. Wannan ƙidaya tana taimaka wa tsara makarantu, wuraren lafiya, ruwa, gidaje, da hanyoyi. Bayanin ya kamata ya kasance daidai, a kuma kiyaye bayanan iyali. Idan jama’a sun yi yawa a wuri, ana bukatar ƙarin hidimomi da tsari. Idan sun warwatse, kai hidima na iya bukatar nisa da ƙarin sufuri. Sanin yawan jama’a yana taimaka wa shiri, ba daraja wani wuri fiye da wani ba.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi yawan jama’a da matsugunansu. [MAIN] Yawan jama’a shi ne adadin mutanen da suke zaune a wuri. A ƙauye, gidaje na iya zama kusa da gonaki da ƙananan kasuwanni. A birni, mutane da gidaje suna da yawa, tare da manyan kasuwanni, makarantu, asibitoci, ofisoshi, da hanyoyi. Kano, Kaduna, Maiduguri, da Sokoto misalan birane ne. [PAUSE 1] Me yawan jama’a yake nufi? [MAIN] Gwamnati tana ƙirga mutanen ƙasa a lokaci da aka tsara domin sanin yawansu da inda suke zaune. Bayanin yana taimaka wa tsara makarantu, lafiya, ruwa, gidaje, da hanyoyi. Idan jama’a sun yi yawa, ana bukatar ƙarin hidimomi. [PAUSE 2] Me ƙidayar jama’a take taimaka wa gwamnati ta tsara? [OUTRO] Ka kwatanta ƙauye da birni ta yawan gidaje da hidimomi, sannan ka bayyana dalilin da ya sa ƙidayar jama’a take taimaka wa shiri.",
    "audioFile": "audio/p4-socs-10.mp3",
    "imageCard": "images/p4-socs-10.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Me yawan jama’a yake nufi?", "correctAnswer": "adadin mutanen da suke zaune a wuri", "options": ["adadin mutanen da suke zaune a wuri", "yawan itatuwa a gona", "adadin kujeru a aji"]},
      {"pauseAtMs": 150000, "questionHa": "Me ƙidayar jama’a take taimaka wa gwamnati ta tsara?", "correctAnswer": "makarantu, lafiya, ruwa, gidaje, da hanyoyi", "options": ["makarantu, lafiya, ruwa, gidaje, da hanyoyi", "launin tufafi", "sunayen wasanni"]}
    ],
    "quizQuestions": [
      {"templateHa": "Me yawan jama’a yake nufi?", "answerFormula": "adadin mutanen da suke zaune a wuri", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["yawan itatuwa a gona", "adadin kujeru", "yawan motoci kaɗai"]},
      {"templateHa": "Wane wuri ne yake da mutane da gidaje da yawa?", "answerFormula": "birni", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["cikin kogi", "saman dutse", "filin wasa"]},
      {"templateHa": "Wane birni ne aka ambata daga Arewacin Nijeriya?", "answerFormula": "Maiduguri", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["Kogin Neja", "Sahel", "Tekun Atlantika"]},
      {"templateHa": "Me ƙidayar jama’a take taimaka wa gwamnati ta sani?", "answerFormula": "yawan jama’a da inda suke zaune", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["launin gidaje", "sunan kowace dabba", "yawan taurari"]},
      {"templateHa": "Me ake bukata idan jama’a sun yi yawa a wuri?", "answerFormula": "ƙarin hidimomi da tsari", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["rufe makarantu", "rage wuraren ruwa", "toshe hanyoyi"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p4-socs-11",
    "gradeband": "p4",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 11,
    "titleEn": "Migration and Urbanisation",
    "titleHa": "Sauya Wurin Zama da Girman Birane",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Mutane suna iya sauya wurin zama daga ƙauye zuwa birni, daga birni zuwa ƙauye, ko tsakanin jihohi. Wasu suna motsawa domin aiki, makaranta, kasuwanci, aure, kula da iyali, samun ƙasa, ko neman hidima. Wani mutum yana komawa na ɗan lokaci, wani kuma yana kafa sabon gida. Idan mutane da yawa suka koma birni, birnin yana iya girma. Wannan girma yana kawo dama kamar ƙarin masu sana’a, kasuwanni, makarantu, sabbin ra’ayoyi, da ayyukan yi. Haka kuma yana iya ƙara buƙatar gidaje, ruwa, sufuri, tsafta, asibitoci, da makarantu. Idan hidimomi ba su ƙaru tare da jama’a ba, cunkoso, tsadar gida, shara, da rashin aiki na iya ƙaruwa. Garuruwan da mutane suka bari su ma za su iya rasa wasu ma’aikata, amma kuɗi, ilimi, ko sababbin dabarun da aka dawo da su za su iya taimakawa. Sauya wurin zama ba laifi ba ne kuma ba ya sa mutum ya fi wani. Kyakkyawan shiri yana bukatar gwamnati da al’umma su san dalilan motsi, su ƙara hidimomi, kuma su girmama sababbin mazauna.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi sauya wurin zama da girman birane. [MAIN] Mutane suna sauya wurin zama domin aiki, makaranta, kasuwanci, aure, kula da iyali, samun ƙasa, ko neman hidima. Wani yana komawa na ɗan lokaci, wani kuma yana kafa sabon gida. Idan mutane da yawa suka koma birni, birnin yana girma. [PAUSE 1] Wane dalili ne zai sa mutum ya sauya wurin zama? [MAIN] Girman birni na iya kawo kasuwanni, makarantu, da ayyukan yi. Haka kuma yana ƙara buƙatar gidaje, ruwa, sufuri, tsafta, asibitoci, da makarantu. Idan hidimomi ba su ƙaru ba, cunkoso da tsadar gida na iya ƙaruwa. Gwamnati da al’umma su tsara hidimomi kuma su girmama sababbin mazauna. [PAUSE 2] Me birni yake bukata idan jama’arsa suka ƙaru? [OUTRO] Ka zana kibiyar motsi daga ƙauye zuwa birni ko akasin haka, ka rubuta dalili ɗaya, dama ɗaya, da hidima ɗaya da za a ƙara.",
    "audioFile": "audio/p4-socs-11.mp3",
    "imageCard": "images/p4-socs-11.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Wane dalili ne zai sa mutum ya sauya wurin zama?", "correctAnswer": "neman aiki", "options": ["neman aiki", "canza launin riga", "ƙirga kujeru"]},
      {"pauseAtMs": 150000, "questionHa": "Me birni yake bukata idan jama’arsa suka ƙaru?", "correctAnswer": "ƙarin hidimomi", "options": ["ƙarin hidimomi", "ƙarancin ruwa", "rufe makarantu"]}
    ],
    "quizQuestions": [
      {"templateHa": "Wane dalili ne zai sa mutum ya sauya wurin zama?", "answerFormula": "domin aiki", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["domin canza launin riga", "domin ƙirga kujeru", "domin ɓoye littafi"]},
      {"templateHa": "Me zai iya faruwa idan mutane da yawa suka koma birni?", "answerFormula": "birnin yana iya girma", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["kogin ya bushe nan da nan", "duk gidaje su ɓace", "babu wanda zai yi kasuwanci"]},
      {"templateHa": "Wace dama ce girman birni zai iya kawowa?", "answerFormula": "ayyukan yi", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["rufe kasuwanni", "rage makarantu", "hana sana’o’i"]},
      {"templateHa": "Wace matsala ce za ta iya ƙaruwa idan hidimomi ba su ƙaru ba?", "answerFormula": "cunkoso", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ƙarin tsafta", "ƙarin ruwa", "sauƙin gidaje"]},
      {"templateHa": "Yaya ya kamata a karɓi sababbin mazauna?", "answerFormula": "girmama sababbin mazauna", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["raina su", "hana su magana", "ɗora musu laifi"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p4-socs-12",
    "gradeband": "p4",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 12,
    "titleEn": "Social Problems — Poverty and Community Responses",
    "titleHa": "Matsalar Talauci da Yadda Al’umma Take Taimakawa",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Talauci yana faruwa idan mutum ko iyali ba su da isassun abubuwan biyan bukatu kamar abinci, ruwa, gida, lafiya, tufafi, ko ilimi. Dalilai suna iya haɗawa da rashin aiki, ƙarancin albashi, rashin lafiya, asarar amfanin gona, tsadar kaya, ko rashin hidimomi. Ba daidai ba ne a ce talauci laifin mutum ne kawai ko a raina iyalin da yake fama da shi. Matsalar tana iya hana yara zuwa makaranta, sa iyali su rasa magani, ko ƙara damuwar gida. Gwamnati za ta iya taimakawa ta hanyar makarantu, cibiyoyin lafiya, ruwa, hanyoyi, koyar da sana’a, da tallafin da aka tsara. Al’umma kuma za ta iya kafa ƙungiyar taimakon juna, ajiyar kuɗi, gayya, ko raba abinci cikin mutunci. Taimako ya kasance cikin gaskiya, ba tare da nuna bambanci ko ɗaukar hoton wanda ake taimakawa domin kunyata shi ba. Yaro zai iya girmama kowa, raba kayan karatu da izini, da sanar da amintaccen babba idan aboki yana bukatar taimako. Magance talauci yana bukatar aiki mai ɗorewa daga hukuma, al’umma, iyalai, da ƴan ƙasa.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi matsalar talauci da amsar al’umma. [MAIN] Talauci yana faruwa idan mutum ko iyali ba su da isassun abubuwan biyan bukatu kamar abinci, ruwa, gida, lafiya, tufafi, ko ilimi. Dalilai na iya haɗawa da rashin aiki, rashin lafiya, asarar amfanin gona, ko tsadar kaya. Talauci ba laifin mutum kawai ba ne. [PAUSE 1] Wane abu ne daga bukatun da talauci zai iya hana iyali samu? [MAIN] Gwamnati za ta iya samar da makarantu, lafiya, ruwa, hanyoyi, da koyar da sana’a. Al’umma za ta iya yin taimakon juna, ajiyar kuɗi, gayya, ko raba abinci cikin mutunci. Kada a raina ko a kunyata wanda ake taimakawa. [PAUSE 2] Wane hali ya dace yayin taimaka wa iyalin da yake cikin bukata? [OUTRO] Ka bambanta taimakon gaggawa, kamar abinci, da taimakon dogon lokaci, kamar ilimi ko koyon sana’a; dukansu su kiyaye mutuncin mutum.",
    "audioFile": "audio/p4-socs-12.mp3",
    "imageCard": "images/p4-socs-12.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Wane abu ne daga bukatun da talauci zai iya hana iyali samu?", "correctAnswer": "ilimi", "options": ["ilimi", "launin riga", "wasan ƙwallo"]},
      {"pauseAtMs": 150000, "questionHa": "Wane hali ya dace yayin taimaka wa iyalin da yake cikin bukata?", "correctAnswer": "kiyaye mutuncinsa", "options": ["kiyaye mutuncinsa", "kunyata shi", "raina shi"]}
    ],
    "quizQuestions": [
      {"templateHa": "Yaushe talauci yake faruwa?", "answerFormula": "ba su da isassun abubuwan biyan bukatu", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["idan an yi wasa", "idan riga ta yi kore", "idan an zana taswira"]},
      {"templateHa": "Wane dalili ne zai iya jawo talauci?", "answerFormula": "rashin aiki", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["sauraro da kyau", "kula da kaya", "yin gaskiya"]},
      {"templateHa": "Wane aiki gwamnati za ta iya yi domin taimako?", "answerFormula": "koyar da sana’a", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["rufe makaranta", "hana ruwa", "toshe hanya"]},
      {"templateHa": "Wane aiki al’umma za ta iya yi?", "answerFormula": "taimakon juna", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["nuna bambanci", "kunyata iyali", "raina marar kuɗi"]},
      {"templateHa": "Wane bambanci ne tsakanin taimakon gaggawa da na dogon lokaci?", "answerFormula": "taimakon gaggawa, kamar abinci, da taimakon dogon lokaci, kamar ilimi ko koyon sana’a", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["duka suna kunyata mutum", "babu taimakon dogon lokaci", "rufe makaranta taimako ne"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p4-socs-13",
    "gradeband": "p4",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 13,
    "titleEn": "Social Problems — Child Labour and Child Rights",
    "titleHa": "Aikin da Yake Cutar da Yara da Haƙƙoƙinsu",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Yara suna da haƙƙin suna, kulawa, kariya, lafiya, koyo, hutu, da wasa. Suna kuma iya taimakawa a gida da ƙananan ayyukan da suka dace da shekarunsu, kamar tattara littattafai ko gyara kayan wasa. Irin wannan taimako ba shi ne aikin da yake cutar da yaro ba. Matsala tana faruwa idan an tilasta wa yaro aiki mai nauyi, mai haɗari, na dogon lokaci, ko wanda yake hana shi makaranta, hutu, lafiya, da wasa. Hakan na iya faruwa saboda talauci, rashin kulawa, ko neman riba daga aikin yaro. Ba laifin yaron ba ne. Yaro bai kamata ya yi aiki da wuƙa, wuta, sinadari, babbar na’ura, ko ɗaukar kaya masu nauyi shi kaɗai ba. Idan kai ko aboki kuna fuskantar aiki mai cutarwa, ku gaya wa amintaccen babba, malami, ma’aikacin lafiya, ko hukumar da take kare yara. Babba ya saurara, ya kare yaron, kuma kada ya kunyata shi. Kare haƙƙin yara yana nufin ba su damar koyo da girma cikin lafiya da mutunci.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi aikin da yake cutar da yara da haƙƙoƙinsu. [MAIN] Yara suna da haƙƙin kulawa, kariya, lafiya, koyo, hutu, da wasa. Za su iya taimakawa da ƙananan ayyuka masu aminci. Matsala tana faruwa idan aiki yana da nauyi, haɗari, tsawo, ko yana hana yaro makaranta da hutu. Wannan ba laifin yaron ba ne. [PAUSE 1] Yaushe aikin yaro yake zama mai cutarwa? [MAIN] Yaro bai kamata ya yi aiki da wuta, wuƙa, sinadari, babbar na’ura, ko kaya masu nauyi shi kaɗai ba. Idan yaro yana fuskantar aiki mai cutarwa, ya gaya wa amintaccen babba, malami, ma’aikacin lafiya, ko hukumar da take kare yara. [PAUSE 2] Wa ya kamata yaro ya gaya wa idan aiki yana cutar da shi? [OUTRO] Ka tuna bambanci: taimako mai sauƙi da aminci yana iya dacewa da shekaru; aikin da ya hana makaranta, hutu, ko lafiya yana bukatar kariyar babba.",
    "audioFile": "audio/p4-socs-13.mp3",
    "imageCard": "images/p4-socs-13.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Yaushe aikin yaro yake zama mai cutarwa?", "correctAnswer": "idan yana hana makaranta, hutu, ko lafiya", "options": ["idan yana hana makaranta, hutu, ko lafiya", "idan yana tattara littafinsa", "idan yana gyara kayan wasansa"]},
      {"pauseAtMs": 150000, "questionHa": "Wa ya kamata yaro ya gaya wa idan aiki yana cutar da shi?", "correctAnswer": "amintaccen babba", "options": ["amintaccen babba", "mutumin da yake tilasta masa", "ya ɓoye matsalar"]}
    ],
    "quizQuestions": [
      {"templateHa": "Wane haƙƙi ne yaro yake da shi?", "answerFormula": "koyo", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["a tilasta masa haɗari", "a hana shi hutu", "a kunyata shi"]},
      {"templateHa": "Wane taimako ne zai iya dacewa da shekarun yaro?", "answerFormula": "tattara littattafai", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ɗaukar kaya masu nauyi", "aiki da babbar na’ura", "taɓa sinadari"]},
      {"templateHa": "Yaushe aikin yaro yake zama mai cutarwa?", "answerFormula": "yana hana yaro makaranta da hutu", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["yana gyara littafinsa", "yana wasa cikin aminci", "yana hutawa"]},
      {"templateHa": "Wa ya kamata yaro ya gaya wa idan aiki yana cutar da shi?", "answerFormula": "amintaccen babba", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ya ɓoye matsalar", "ya gudu shi kaɗai", "mutumin da yake kunyata shi"]},
      {"templateHa": "Me kare haƙƙin yara yake ba su damar yi?", "answerFormula": "koyo da girma cikin lafiya da mutunci", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["barin makaranta", "aiki mai haɗari", "ɗaukar kaya masu nauyi"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p4-socs-14",
    "gradeband": "p4",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 14,
    "titleEn": "Cooperation — Family, Community, Nation",
    "titleHa": "Haɗin Kai a Iyali, Al’umma, da Ƙasa",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Haɗin kai yana nufin mutane su haɗa ƙarfi, ilimi, lokaci, ko kaya domin cimma manufa ta gari. A iyali, kowa zai iya yin aikin da ya dace da shekarunsa da ƙarfinsa. A makaranta, ɗalibai za su iya raba littattafai, shirya aikin rukuni, da sauraron ra’ayin juna. A al’umma, gayya tana haɗa mutane domin aikin da zai amfani jama’a, kamar gyaran wurin taro, dasa itatuwa, ko taimakon iyalin da yake cikin bukata. Yara su yi ayyuka masu aminci kawai ƙarƙashin kulawar babba. A matakin ƙasa, jihohi da al’ummomi suna haɗa hannu wajen sufuri, kasuwanci, lafiya, ilimi, da kiyaye muhalli. Haɗin kai ba yana nufin kowa ya yi tunani iri ɗaya ba. Yana bukatar a saurara, a raba aiki daidai, a mutunta bambanci, sannan a warware saɓani cikin natsuwa. Haka kuma ƙasashe suna iya taimakon juna wajen lafiya, ciniki, ilimi, da bala’i. Idan mutane sun san manufarsu da alhakinsu, haɗin kai yana rage wahala, yana inganta hidima, kuma yana ƙarfafa zaman lafiya daga gida zuwa ƙasa.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi haɗin kai a iyali, al’umma, da ƙasa. [MAIN] Haɗin kai yana nufin mutane su haɗa ƙarfi, ilimi, lokaci, ko kaya domin cimma manufa ta gari. A iyali ana raba aikin da ya dace. A makaranta ana shirya aikin rukuni. A al’umma, gayya tana haɗa mutane domin aikin da zai amfani jama’a. [PAUSE 1] Me gayya take haɗa mutane su yi? [MAIN] A ƙasa, jihohi da al’ummomi suna haɗa hannu wajen sufuri, kasuwanci, lafiya, ilimi, da muhalli. Haɗin kai ba yana nufin kowa ya yi tunani iri ɗaya ba. A saurara, a raba aiki daidai, a mutunta bambanci, a warware saɓani cikin natsuwa. [PAUSE 2] Wane hali ne haɗin kai yake bukata idan ra’ayoyi sun bambanta? [OUTRO] Ka shirya ƙaramin aikin rukuni: ku bayyana manufa, ku raba aiki daidai, ku saurari kowa, sannan ku duba abin da haɗin kai ya inganta.",
    "audioFile": "audio/p4-socs-14.mp3",
    "imageCard": "images/p4-socs-14.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Me gayya take haɗa mutane su yi?", "correctAnswer": "aikin da zai amfani jama’a", "options": ["aikin da zai amfani jama’a", "ɓoye kayan jama’a", "raba kan al’umma"]},
      {"pauseAtMs": 150000, "questionHa": "Wane hali ne haɗin kai yake bukata idan ra’ayoyi sun bambanta?", "correctAnswer": "sauraro da mutunta bambanci", "options": ["sauraro da mutunta bambanci", "yin fushi", "tilasta wa kowa"]}
    ],
    "quizQuestions": [
      {"templateHa": "Me haɗin kai yake nufi?", "answerFormula": "mutane su haɗa ƙarfi, ilimi, lokaci, ko kaya domin cimma manufa ta gari", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["yin aiki shi kaɗai kullum", "raba kan jama’a", "ƙin sauraron kowa"]},
      {"templateHa": "Me gayya take haɗa mutane su yi?", "answerFormula": "aikin da zai amfani jama’a", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ɓoye kayan jama’a", "hana taimako", "ƙara rarrabuwar kai"]},
      {"templateHa": "Wane aiki ne jihohi za su iya yi tare?", "answerFormula": "haɗa hannu wajen sufuri", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["toshe hanyoyi", "rufe kasuwanni", "hana ilimi"]},
      {"templateHa": "Shin haɗin kai yana nufin kowa ya yi tunani iri ɗaya?", "answerFormula": "Haɗin kai ba yana nufin kowa ya yi tunani iri ɗaya ba", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["eh, a tilasta wa kowa", "ba a sauraron kowa", "ra’ayi ɗaya ne kawai"]},
      {"templateHa": "Waɗanne matakai ne suke sa aikin rukuni ya yi kyau?", "answerFormula": "ku bayyana manufa, ku raba aiki daidai, ku saurari kowa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ɓoye manufa da yin fushi", "barin mutum ɗaya ya yi komai", "ƙin duba sakamakon aiki"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p4-socs-15",
    "gradeband": "p4",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 15,
    "titleEn": "Revision and Assessment — P4 Social and Citizenship Studies",
    "titleHa": "Bita da Tantancewa — Nazarin Zamantakewa na Aji Huɗu",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "A wannan bita, ka haɗa darussan aji huɗu. Nijeriya tana da jihohi talatin da shida, Abuja kuma ita ce babban birnin ƙasa. Al’ummomi da harsuna suna rayuwa tare ba tare da wani ya fi wani daraja ba. Yanayin ƙasa ya haɗa da Sahel, filayen ciyawa, dazuzzuka, gabar teku, Kogin Neja, da Kogin Binuwai. Tuta, tambarin Nijeriya, taken ƙasa, da alkawarin ɗan ƙasa suna tunatar da haɗin kai. Gwamnati tana da matakai uku da rassa uku. Mutanen da doka ta ba dama suna nuna wanda suke so sau ɗaya cikin sirri, INEC kuma tana shirya aikin. Noma, kiwo, masana’antu, da ciniki suna haɗa albarkatu da ayyukan yi. Yawan jama’a da sauya wurin zama suna shafar bukatar gidaje, ruwa, makarantu, da sufuri. Talauci yana bukatar martanin hukuma da al’umma, yayin da yara suke da haƙƙin koyo, lafiya, hutu, da kariya daga aiki mai cutarwa. Gayya da raba aiki daidai suna nuna haɗin kai. Don tantance kanka, ka bayyana gaskiya, ka ba da misali, sannan ka faɗi aikin ɗan ƙasa da ya dace.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa bitar Nazarin Zamantakewa na aji huɗu. [MAIN] Ka tuna da jihohi talatin da shida, Abuja, al’ummomi da harsuna, da yanayin ƙasa daga Sahel zuwa gabar teku. Ka tuna da alamomin ƙasa, matakan gwamnati uku, da rassan gwamnati uku. [PAUSE 1] Wace hukuma ce take shirya yadda jama’a ke nuna wanda suke so ya jagorance su a matakin ƙasa? [MAIN] Noma, kiwo, masana’antu, da ciniki suna samar da abinci, kaya, da ayyukan yi. Yawan jama’a da sauya wurin zama suna ƙara bukatar hidimomi. Talauci yana bukatar taimako mai mutunci, yara kuma suna bukatar koyo, lafiya, hutu, da kariya. Gayya tana nuna haɗin kai. [PAUSE 2] Waɗanne koguna biyu ne suke haɗuwa a Lokoja? [OUTRO] Ka zaɓi jigogi biyar—ƙasa, jama’a, gwamnati, tattalin arziki, matsuguni, matsalolin al’umma, haƙƙin yara, ko haɗin kai—ka faɗi gaskiya ɗaya da aikin ɗan ƙasa ɗaya daga kowanne.",
    "audioFile": "audio/p4-socs-15.mp3",
    "imageCard": "images/p4-socs-15.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Wace hukuma ce take shirya yadda jama’a ke nuna wanda suke so ya jagorance su a matakin ƙasa?", "correctAnswer": "INEC", "options": ["INEC", "ƙaramar hukuma", "ƙungiyar kasuwa"]},
      {"pauseAtMs": 150000, "questionHa": "Waɗanne koguna biyu ne suke haɗuwa a Lokoja?", "correctAnswer": "Kogin Neja da Kogin Binuwai", "options": ["Kogin Neja da Kogin Binuwai", "Kogin Neja da Teku", "Sahel da dazuzzuka"]}
    ],
    "quizQuestions": [
      {"templateHa": "Wane birni ne babban birnin Nijeriya?", "answerFormula": "Abuja", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["Kano", "Kaduna", "Sokoto"]},
      {"templateHa": "Matakan gwamnati nawa ne Nijeriya take da su?", "answerFormula": "matakai uku", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["matakai biyu", "matakai biyar", "matakai bakwai"]},
      {"templateHa": "Wace hukuma ce take shirya yadda jama’a ke nuna wanda suke so ya jagorance su a matakin ƙasa?", "answerFormula": "INEC", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ƙungiyar wasa", "kasuwar gari", "ajin makaranta"]},
      {"templateHa": "Wane haƙƙi ne yaro yake da shi?", "answerFormula": "koyo", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["aiki mai haɗari", "barin makaranta", "ɗaukar kaya masu nauyi"]},
      {"templateHa": "Wane jerin ne ya haɗa manyan ayyukan tattalin arziki da aka yi bita?", "answerFormula": "Noma, kiwo, masana’antu, da ciniki", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["kujera, takalmi, da biro", "hula, allo, da fitila", "jaka, tabarma, da ƙwallo"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  }
]
```

## Final disposition

M3 is **build-complete as a source-only draft candidate**. It is not integrated and not shippable. Architect review and the user’s Hausa/content/terminology rulings remain mandatory. No rollback is needed because no live file was touched.
