# AJAMIX M4 P5 Social and Citizenship Studies Complete Report

**Task:** `AJAMIX-SOCS-M4-P5-COMPLETE`  
**Status:** BUILD-COMPLETE SOURCE-ONLY DRAFT CANDIDATE — requires Architect review, human Hausa/content review, and the user’s explicit full-content sign-off on `p5-socs-07`; not integrated or shippable.  
**Date:** 2026-07-17  
**Scope:** Exactly `p5-socs-01..15`; no live content, runtime, image, or audio mutation.

> [!CAUTION]
> **MANDATORY HUMAN APPROVAL GATE — `p5-socs-07`:** M4 must not be treated as accepted until Muhammad explicitly reviews and signs off the complete Hausa content reproduced in §14. Passing automated, safety-boundary, and Architect gates does not replace this sign-off.

## Deliverables

- `tools/p5-batch/p5-socs-complete.json` — exactly 15 module objects.
- `tools/image-manifest/p5-socs-image-manifest.json` — exactly 15 compact eight-field design-intent entries.
- `tasks/2026-07-16-M4-p5-socs-complete-report.md` — this gate report, including all 15 source objects verbatim.
- Temporary validation tree only: `/tmp/ajamix-p5-socs-complete/`.

`app/content.json` was read and copied to the temporary tree but was not edited. No runtime/engine file was edited. No image or audio was fetched, rendered, or generated. No git command was run.

## 1. Module list

| ID | titleEn | titleHa |
|---|---|---|
| `p5-socs-01` | Natural Resources of Nigeria | Albarkatun Ƙasa na Nijeriya |
| `p5-socs-02` | Conservation of Natural Resources | Kula da Albarkatun Ƙasa |
| `p5-socs-03` | Environmental Pollution | Gurɓata Muhalli |
| `p5-socs-04` | Disaster Preparedness and Safety | Shiri da Kariya Lokacin Bala’i |
| `p5-socs-05` | The Nigerian Constitution and Rule of Law | Kundin Tsarin Mulkin Nijeriya da Bin Doka |
| `p5-socs-06` | Civic Education — Rights and Responsibilities | Ilimin Ɗan Ƙasa — Haƙƙoƙi da Nauyi |
| `p5-socs-07` | Social Issues — Drug Abuse | Matsalar Amfani da Taba, Giya, ko Magani Ba Bisa Ƙa’ida Ba |
| `p5-socs-08` | Social Issues — Conflict and Conflict Resolution | Saɓani da Yadda Ake Warware Shi Cikin Lumana |
| `p5-socs-09` | The Nigerian Family — Change and Continuity | Iyalan Nijeriya — Sauyi da Abubuwan da Suke Ci Gaba |
| `p5-socs-10` | Education and Its Importance | Ilimi da Muhimmancinsa |
| `p5-socs-11` | Nigeria and Africa — ECOWAS and the African Union | Nijeriya da Afirka — ECOWAS da Tarayyar Afirka |
| `p5-socs-12` | Nigeria and the World — United Nations | Nijeriya da Duniya — Majalisar Ɗinkin Duniya |
| `p5-socs-13` | Cultural Diversity and National Unity | Bambancin Al’adu da Haɗin Kan Ƙasa |
| `p5-socs-14` | Leadership and Good Governance | Jagoranci da Kyakkyawan Mulki |
| `p5-socs-15` | Revision and Assessment — P5 Social and Citizenship Studies | Bita da Tantancewa — Nazarin Zamantakewa na Aji Biyar |

## 2. Validator and structure output

Final temporary merge composition:

```text
temporary merge refreshed: 309 + 15 P3 + 15 P4 + 15 P5 = 354
only modules grew: true
all 309 pre-existing objects frozen: true
pre-existing aggregate=5231f49b178a4f64a6de434de75492bdd3e93354deed262065139119fc5ba090
scratch-prefix aggregate=5231f49b178a4f64a6de434de75492bdd3e93354deed262065139119fc5ba090
P1/P2 Social Studies count=30 aggregate=13ade4ed8865ceda8cee7c7dfce0ce7274a22d1e231752420f8ad2c1f99c10b2
unique IDs: true (354/354)
```

The scratch additions were the approved P3 M1+M2 files, the approved P4 M3 file, and this M4 P5 batch. Existing sections other than `modules[]` were canonically identical.

Command and output:

```text
node app/tools/validate-content.mjs

validate-content: OK — 354 module(s) pass.
  track=vocational: 10
  track=formal:     344
  isChainLeaf:      345
  chainNext set:    9
```

Exit code: **0**.

Schema/sequence assertions: **PASS** — 15/15 modules have exactly the 22 §8 keys in contract order; IDs are `p5-socs-01..15`; `moduleNumber` is 1–15; every module has exactly two micro-pauses and five quiz questions; all Ajami fields are `null`; every `ajami_validated` is `false`; paths match IDs; every leaf/track/audience field matches the contract.

Image-manifest assertion: **PASS** — 15/15 entries, unique sequential IDs, ID-matched paths, module-matched titles, and exactly these eight keys: `id`, `imagePath`, `titleEn`, `titleHa`, `type`, `depictEn`, `labelsHa`, `safetyNote`.

## 3. Hooked-letter lint

```text
node tools/p2-batch/hook-lint.mjs tools/p5-batch/p5-socs-complete.json

hook-lint: 0 error(s), 0 warning(s).
```

Exit code: **0**. ERRORS: **0**. WARNINGS: **0**. There are no linter warnings awaiting adjudication.

## 4. Word-count summary

Whitespace-token counts for `textExplanationHa`:

| ID | Words | Result |
|---|---:|---|
| `p5-socs-01` | 165 | PASS |
| `p5-socs-02` | 170 | PASS |
| `p5-socs-03` | 162 | PASS |
| `p5-socs-04` | 164 | PASS |
| `p5-socs-05` | 170 | PASS |
| `p5-socs-06` | 161 | PASS |
| `p5-socs-07` | 160 | PASS |
| `p5-socs-08` | 167 | PASS |
| `p5-socs-09` | 170 | PASS |
| `p5-socs-10` | 163 | PASS |
| `p5-socs-11` | 169 | PASS |
| `p5-socs-12` | 170 | PASS |
| `p5-socs-13` | 166 | PASS |
| `p5-socs-14` | 167 | PASS |
| `p5-socs-15` | 170 | PASS |

Minimum: **160**. Maximum: **170**. Out of range: **0/15**.

## 5. Audio-explanation alignment

Manual topic-by-topic review: **PASS, 15/15**. Each audio script teaches the same core facts and safety boundaries as its prose while shortening and sequencing them for listening:

- 01 resource categories, benefits, unequal distribution, and responsible use;
- 02 resource care, tree/grass/water actions, and renewable-energy examples;
- 03 air/water/land contamination, effects, and safe citizen action;
- 04 warning systems, evacuation, distance from hazards, and trained rescue;
- 05 thematic constitution/rule-of-law treatment without section memorisation;
- 06 rights balanced by responsibilities and trusted-adult help;
- 07 the same narrow three-part substance boundary, health/family harm, refusal, exit, and trusted help;
- 08 ordinary family/school/community disagreement and peaceful mediation;
- 09 family forms, continuity, change, and gender-neutral shared responsibilities;
- 10 school, organised out-of-school, and everyday learning, UBE, and equal education;
- 11 ECOWAS/AU purpose and scale without a membership count or list;
- 12 UN founding, current roles of the General Assembly/Security Council/UNICEF, and Nigeria’s membership;
- 13 cultural and religious diversity without ranking, plus NYSC as one integration example;
- 14 leadership, age-appropriate corruption definition, ICPC/EFCC roles, courts, and citizen accountability;
- 15 genuine consolidation across the complete P5 band.

No audio script introduces a quiz fact absent from both its own prose and audio teaching.

## 6. Micro-pause exact-match confirmation

Programmatic exact-string comparison: **PASS, 30/30**.

- `[PAUSE 1]` text equals `microPauses[0].questionHa` for all 15 modules.
- `[PAUSE 2]` text equals `microPauses[1].questionHa` for all 15 modules.
- Each pause `correctAnswer` occurs exactly once among its three options: **30/30 PASS**.

## 7. Quiz answer integrity, Q5, OUTRO, and revision quality

- Quiz answer absent from its distractors: **75/75 PASS**.
- Five quiz questions per module: **15/15 PASS**.
- Q5 exact duplicates across modules: **0**.
- `[OUTRO]` exact duplicates across modules: **0**.
- Manual Q5 review: **15/15 topic-specific**.
- Manual OUTRO review: **15/15 topic-specific**.
- `p5-socs-15` is genuine full-band consolidation: prose spans resources, conservation, pollution, disaster safety, constitution/law, rights/duties, the narrow drug-safety arc, conflict skills, family, education, international cooperation, cultural unity, and accountable leadership. Its pauses test the sensitive-module safety sequence and the constitution’s thematic role; its five quizzes cover resource stewardship, equal application of law, peaceful disagreement, international organisations, and good leadership.

## 8. Quiz fact grounding and current-fact verification

Case-insensitive literal substring check of every `answerFormula` against its own module’s `textExplanationHa + audioScript`: **75/75 PASS**. Manual semantic review confirmed the surrounding teaching supports the question and does not rely on another module.

### `p5-socs-11` — ECOWAS and African Union

Verified on **2026-07-17** using current primary institutional sources:

- The [ECOWAS basic-information page](https://www.ecowas.int/basic-information/) supports the **28 May 1975** founding date and economic-integration purposes, including trade, transport, communications, energy, agriculture, and related cooperation.
- The same basic-information page still displays a 15-member statement/list, but ECOWAS’s later [29 January 2025 withdrawal press statement](https://www.ecowas.int/press-statement-2/) says Burkina Faso, Mali, and Niger’s withdrawals became effective that day. Because the official pages are not synchronised and transitional arrangements continued, the module intentionally asserts **no current count and no member list**. It teaches purpose/function and directs learners to current official information.
- The [African Union overview](https://au.int/en/overview) supports the AU’s 2002 launch and its current aims of continental integration, cooperation, peace, security, and development. The learner text does not rely on a volatile office-holder or current office composition.

Result: **PASS — no unverified ECOWAS count/list; current-source inconsistency is documented rather than hidden.**

### `p5-socs-12` — United Nations

Verified on **2026-07-17** using current primary UN sources:

- The [UN history page](https://www.un.org/en/about-us/history-of-the-un) supports the organisation’s official start on 24 October 1945 and its broad work on peace/security, humanitarian assistance, human rights, and international law.
- The [UN main-bodies page](https://www.un.org/en/about-us/main-bodies) and [UN Charter Chapter V](https://www.un.org/en/about-us/un-charter/chapter-5) support that the General Assembly represents all Member States and that the Security Council has primary responsibility for international peace and security.
- The [UNICEF “What we do” page](https://www.unicef.org/what-we-do) supports its child-rights, health, nutrition, education, water/sanitation, and protection roles.
- The [UN Member States page](https://www.un.org/en/about-us/member-states) and [UN in Nigeria page](https://nigeria.un.org/en/about/about-the-un) support Nigeria’s admission date of **7 October 1960**.

Result: **PASS — each named body’s role is current, bounded, and distinguished from the others.**

### `p5-socs-14` — ICPC and EFCC

Verified on **2026-07-17** using current primary Nigerian institutional/legal sources:

- The [ICPC About Us page](https://icpc.gov.ng/about-us/) and [ICPC legislative-background page](https://icpc.gov.ng/legislative-background/) support its enforcement/investigation, corruption-prevention/system-review, and public-education functions.
- The official [EFCC Establishment Act](https://www.efcc.gov.ng/assets/EFCC_establishment_act-D6hK95Tu.pdf) supports prevention and investigation of economic and financial crimes and a legal/prosecution function.
- The module explicitly states that courts determine guilt, names no current leader, party, candidate, case, region, ethnicity, or religion, and does not imply either agency replaces the courts.

Result: **PASS — roles are current, simple, lawful, and nonpartisan.**

## 9. English-leakage scan

After bracketed audio markers were removed, no casual raw-English prose or open English concept label appeared in learner-facing Hausa fields. The complete uppercase inventory was:

| Official acronym | Count | Context |
|---|---:|---|
| `AU` | 2 | African Union acronym after `Tarayyar Afirka` |
| `ECOWAS` | 14 | Official regional-organisation acronym |
| `EFCC` | 4 | Official Nigerian agency acronym |
| `ICPC` | 3 | Official Nigerian agency acronym |
| `NYSC` | 3 | Official national-service acronym |
| `UBE` | 3 | Official basic-education programme acronym |
| `UN` | 2 | Official United Nations acronym after `Majalisar Ɗinkin Duniya` |
| `UNICEF` | 6 | Official UN fund acronym |

Targeted scan found zero raw occurrences of `constitution`, `democracy`, `election`, `voting`, `pollution`, `globalisation`, `sustainability`, `conflict resolution`, `drug abuse`, `family planning`, `security council`, `general assembly`, `united nations`, `african union`, `rule of law`, or `corruption` in the Hausa learner fields.

Result: **PASS with documented official-acronym exceptions only.**

## 10. Cross-module quiz-answer spelling consistency

Programmatic inventory of every `correctAnswer`, `options`, `answerFormula`, and `distractorFormulas` found **25 exact strings reused across more than one module and zero competing spellings**. Reviewed repeated strings included `gwamnati da jama’a`, `kotu`, `kula da kayan jama’a`, `jita-jita`, `karɓa, ɓoyewa, da gardama`, `ɓarnatar da ruwa`, `raina juna`, and the institutional years used in questions/distractors.

Locked-term whole-batch spot-check:

- `muhalli`: one hooked spelling throughout;
- `Ƴan ƙasa` / `ɗan ƙasa`: locked singular/plural spellings throughout;
- `ƙaramar hukuma`: locked spelling where used;
- `sauya wurin zama`: locked phrase in `p5-socs-09`;
- `dimokuradiyya`, `kundin tsarin mulki`, `zaɓe`, `jefa ƙuri’a`: locked spellings in `p5-socs-05` and relevant consolidation/reference fields;
- `gurɓata`: the approved descriptive form throughout `p5-socs-01..03` and revision;
- `kiwo`, `iskar gas`, `sufuri`: prior locked spellings throughout.

The government-arm terms did not recur because no module reteaches the three arms. No retired or unhooked variant was introduced. Result: **PASS**.

## 11. Within-module redundancy check

```text
node tools/p1-batch/check-within-module-redundancy.mjs --file=tools/p5-batch/p5-socs-complete.json

Within-module redundancy check passed for 15 module(s).
```

Exit code: **0**. Findings: **0**.

## 12. Close-paraphrase review

Automated cross-module sentence comparison at a 0.72 token-Jaccard threshold found **0 pairs**. Manual review found intentional concept recurrence only in the genuine revision module and in necessary links among resources/conservation/pollution, rights/constitution, and diversity/good governance. No accidental close paraphrase or boilerplate sentence requires adjudication.

## 13. Neutrality and scope attestation — every module

Six-rule batch self-check: **PASS**. No prescriptive religious instruction, party/candidate endorsement, gender-role stereotype, ethnic ranking/blame, historical narrative, named live conflict, armed group, sectarian dispute, or conflict-zone example appears.

| Module | Explicit attestation |
|---|---|
| `p5-socs-01` | PASS — resource examples are descriptive and geographically unowned; no community, region, company, or gender is credited with or blamed for resource distribution or damage. |
| `p5-socs-02` | PASS — conservation is shared among farmers, pastoral workers, artisans, authorities, and citizens; no livelihood or group is blamed, ranked, or stereotyped. |
| `p5-socs-03` | PASS — pollution causes and remedies are civic/environmental; no region, company, ethnicity, religion, or political actor is singled out. |
| `p5-socs-04` | PASS — safety instructions are universal, age-appropriate, and nonpolitical; no current disaster/conflict zone, agency endorsement, or group attribution appears. |
| `p5-socs-05` | **PASS — MANDATORY EXPLICIT NEUTRALITY REVIEW.** Constitution, dimokuradiyya, election/voting, courts, rights, duties, and rule of law are taught as structures and shared legal principles. No party, candidate, ideology, leader, constitutional section, religious rule, group hierarchy, or claim that anyone is above the law appears. |
| `p5-socs-06` | **PASS — MANDATORY EXPLICIT NEUTRALITY REVIEW.** Rights and duties apply across groups; the text expressly rejects preference by group, religion, gender, or political view. No right is framed as permission to harm, no legal section is fabricated, and no ideology is endorsed. |
| `p5-socs-07` | PASS — non-stigmatising health/family/help framing only; no person or family is blamed or shamed, and the safe response uses trusted adults and professionals. Full boundary/sign-off audit is in §14. |
| `p5-socs-08` | PASS — ordinary family/school/community disagreements only; no current conflict, militant group, sect, ethnicity, region, or coerced reconciliation appears. |
| `p5-socs-09` | PASS — household forms are not ranked; care, study, work, and leadership are not assigned by gender. Family planning and reproduction are absent. |
| `p5-socs-10` | PASS — girls and boys have equal educational rights; school, organised out-of-school, and everyday learning are complementary rather than socially ranked. |
| `p5-socs-11` | PASS — regional/continental cooperation is descriptive; no country, leader, ideology, flag, or people is ranked, and no stale membership claim is used. |
| `p5-socs-12` | PASS — UN bodies are described by distinct institutional functions; no member state, permanent member, conflict party, or ideology is favoured. |
| `p5-socs-13` | **PASS — ENHANCED RELIGIOUS/ETHNIC NEUTRALITY REVIEW.** No ethnic or religious group is named as superior, inferior, typical, problematic, or visually fixed. The module states that no community, language, or religion is above another and frames unity as respect and shared civic action, not cultural erasure or religious instruction. |
| `p5-socs-14` | **PASS — MANDATORY EXPLICIT NEUTRALITY REVIEW.** Good governance and corruption are defined without a party, candidate, office-holder, case, ethnicity, religion, or region. ICPC/EFCC roles are current and lawful; courts determine guilt. Citizens use peaceful questions and truth, not partisan accusation. |
| `p5-socs-15` | PASS — consolidation retains the same neutral environmental, legal, health, family, international, cultural, and governance framing; no new political or religious claim is introduced. |

## 14. MANDATORY `p5-socs-07` full-content sign-off packet

> [!CAUTION]
> **USER ACTION REQUIRED:** Muhammad must read and explicitly approve the complete Hausa content below before M4 is accepted. Automated compliance is necessary but not sufficient.

### Boundary audit

- **Named-substance boundary:** PASS. The only named items are exactly `taba`, `giya`, and `magani` not approved or provided by `iyaye`, `likita`, or `ma’aikacin lafiya`.
- **No illicit catalogue:** PASS. No other substance, category hint, analogue, or example appears.
- **No street names/slang:** PASS.
- **No methods of use:** PASS. The content defines inappropriate use at a high level and teaches refusal; it gives no consumption technique or operational description.
- **No procurement/sourcing:** PASS. There is no place, seller, route, or acquisition guidance. Peer pressure appears only as the trigger for refusal and help-seeking.
- **No concealment techniques:** PASS. `ɓoye` appears only in the protective instruction **not** to hide what happened and in wrong-answer distractors; no concealment advice is given.
- **No intoxication effects/sensations:** PASS. Harms stay at the general level of health, learning, responsibility, family money, and trust.
- **Required framing:** PASS. The module explains the narrow meaning, health/family harm, calm refusal, leaving for safety, trusted-adult help, and non-stigmatising professional support.
- **AJAMIX safety alignment:** PASS. It follows the established Basic Science arc: medicine belongs under parent/doctor/health-worker approval, another person’s medicine is not the learner’s, the learner refuses, leaves, and tells a trusted adult, and a person with a problem receives dignity rather than shame.
- **Image boundary:** PASS. The manifest requires an abstract healthy-choices/trusted-adult scene and explicitly prohibits depiction of any substance, container, smoke, offer, use, intoxication, sourcing, concealment, slang, distressed person, or shaming.

### Complete learner-facing Hausa content — verbatim

```json
{
  "titleHa": "Matsalar Amfani da Taba, Giya, ko Magani Ba Bisa Ƙa’ida Ba",
  "textExplanationHa": "Amfani ba bisa ƙa’ida ba ya haɗa taba ko giya, ko maganin da iyaye, likita, ko ma’aikacin lafiya bai amince da shi ko ba da shi ba. Taba da giya ba su dace da yara ba. Magani ana amfani da shi ne bisa umarnin iyaye da ƙwararren lafiya; maganin wani ba naka ba ne. Irin wannan amfani yana iya cutar da lafiya, koyo, alhaki, kuɗin iyali, da amincewa a gida. Mutumin da yake fama da matsala yana bukatar mutunci da taimakon ƙwararru, ba zagi, raini, ko kunyatawa ba. Idan aboki ya matsa maka ka karɓi taba, giya, ko maganin da ba a amince da shi ba, ka ce a’a cikin natsuwa. Ka bar wurin, ka je inda yake da aminci, sannan ka gaya wa babban da ka yarda da shi, kamar iyaye, malami, likita, ko ma’aikacin lafiya. Kada ka yi gardama ko ka ɓoye abin da ya faru. Neman taimako alamar ƙarfin hali ce kuma yana kare kai da iyali.",
  "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi yadda za a ƙi abin da zai cutar da lafiya. [MAIN] Taba da giya ba su dace da yara ba. Kada a yi amfani da maganin da iyaye, likita, ko ma’aikacin lafiya bai amince da shi ko ba da shi ba. Rashin amfani da waɗannan abubuwa na iya cutar da lafiya, koyo, da amincewar iyali. [PAUSE 1] Me za ka ce idan aboki ya matsa maka ka karɓi irin wannan abu? [MAIN] Ka ce a’a cikin natsuwa, ka bar wurin, ka je inda yake da aminci, sannan ka gaya wa babban da ka yarda da shi. A mutunta mai matsala; yana bukatar taimakon ƙwararru, ba zagi ba. [PAUSE 2] Wa ya kamata ka gaya wa bayan ka bar wurin? [OUTRO] Ka tuna matakai uku: ka ce a’a, ka bar wurin, ka nemi taimakon babban da ka yarda da shi.",
  "microPauses": [
    {
      "pauseAtMs": 90000,
      "questionHa": "Me za ka ce idan aboki ya matsa maka ka karɓi irin wannan abu?",
      "correctAnswer": "a’a",
      "options": [
        "a’a",
        "zan karɓa",
        "zan ɓoye"
      ]
    },
    {
      "pauseAtMs": 150000,
      "questionHa": "Wa ya kamata ka gaya wa bayan ka bar wurin?",
      "correctAnswer": "babban da na yarda da shi",
      "options": [
        "babban da na yarda da shi",
        "babu kowa",
        "wanda zai kunyata ni"
      ]
    }
  ],
  "quizQuestions": [
    {
      "templateHa": "Wa zai amince da maganin yaro ko ya ba shi?",
      "answerFormula": "iyaye, likita, ko ma’aikacin lafiya",
      "variableRanges": {
        "a": {
          "min": 0,
          "max": 0
        },
        "b": {
          "min": 0,
          "max": 0
        }
      },
      "distractorFormulas": [
        "duk wani aboki",
        "baƙon da ba a sani ba",
        "wani yaro"
      ]
    },
    {
      "templateHa": "Me za ka yi idan aboki ya matsa maka?",
      "answerFormula": "ka ce a’a cikin natsuwa",
      "variableRanges": {
        "a": {
          "min": 0,
          "max": 0
        },
        "b": {
          "min": 0,
          "max": 0
        }
      },
      "distractorFormulas": [
        "ka karɓa",
        "ka ɓoye lamarin",
        "ka yi gardama"
      ]
    },
    {
      "templateHa": "Ina za ka je bayan ka ƙi abin?",
      "answerFormula": "inda yake da aminci",
      "variableRanges": {
        "a": {
          "min": 0,
          "max": 0
        },
        "b": {
          "min": 0,
          "max": 0
        }
      },
      "distractorFormulas": [
        "wurin da babu babba",
        "wurin da za a kunyata ni",
        "wurin da za a yi gardama"
      ]
    },
    {
      "templateHa": "Yaya ya dace a yi wa mutumin da yake fama da matsala?",
      "answerFormula": "mutunta mai matsala",
      "variableRanges": {
        "a": {
          "min": 0,
          "max": 0
        },
        "b": {
          "min": 0,
          "max": 0
        }
      },
      "distractorFormulas": [
        "a kunyata shi",
        "a raina shi",
        "a zage shi"
      ]
    },
    {
      "templateHa": "Waɗanne matakai uku ne suke taimaka wa yaro?",
      "answerFormula": "ka ce a’a, ka bar wurin, ka nemi taimakon babban da ka yarda da shi",
      "variableRanges": {
        "a": {
          "min": 0,
          "max": 0
        },
        "b": {
          "min": 0,
          "max": 0
        }
      },
      "distractorFormulas": [
        "karɓa, ɓoyewa, da gardama",
        "raina mutum, zagi, da tsokana",
        "yin shiru, komawa, da ɓata lokaci"
      ]
    }
  ]
}
```

### Sign-off question

**Does the user explicitly approve the complete `p5-socs-07` Hausa content above, including its title, prose, audio, pauses, quiz questions, refusal/help framing, and boundary treatment?** Until the answer is explicitly yes, this gate remains **OPEN** and M4 remains a draft candidate.

### Family-planning exclusion — `p5-socs-09`

Targeted case-insensitive scan of the complete module object found zero occurrences of `family planning`, `tsarin iyali`, `tazarar haihuwa`, `haihuwa`, `juna biyu`, pregnancy/reproduction terminology, or contraception terminology. Manual review confirms that the module covers household forms, care, continuity, changing responsibilities, education/work, and gender-neutral task sharing only. Result: **PASS — family-planning content is absent under every framing.**

## 15. Terminology open questions and locked-term use

No term below is treated as newly locked by this source draft; user ruling remains authoritative.

1. **Pollution:** no formal noun was proposed. `p5-socs-03` continues the approved descriptive `gurɓata` pattern in `Gurɓata Muhalli`. The formal pollution term is **deferred again** unless the user chooses to lock this description as the formal expression.
2. **Drug/substance abuse:** no formal Hausa technical noun was coined. `p5-socs-07` uses the narrow descriptive title `Matsalar Amfani da Taba, Giya, ko Magani Ba Bisa Ƙa’ida Ba` and `amfani ba bisa ƙa’ida ba` in prose. User ruling remains open, separate from the mandatory full-content sign-off.
3. **Sustainability:** no formal noun was coined. `p5-socs-02` explains the idea as `amfani da su ba tare da lalata damar masu zuwa ba`; `masu ɗorewa` is used only as an ordinary descriptive adjective for actions, consistent with prior-band wording. Formal terminology remains open.
4. **Conflict resolution:** no formal noun was coined. `p5-socs-08` uses `warware saɓani cikin lumana` and concrete steps. User ruling remains open.
5. **Ward, technical/electoral sense:** not required in P5; no new word was introduced. It remains open for a future module that genuinely needs it.
6. **UN body labels:** `Babban Taro` and `Kwamitin Tsaro` are used as transparent learner-facing descriptions for the General Assembly and Security Council, not asserted as newly locked formal terms. User may confirm or replace them before M5.
7. **International-organisation labels:** `Majalisar Ɗinkin Duniya` and `Tarayyar Afirka` are used in learner-facing Hausa alongside official acronyms; they are not added to the locked glossary by this draft.
8. **Good governance/corruption:** `kyakkyawan mulki` and `cin hanci da rashawa` are used as standard descriptive Hausa and not claimed as new locked terms.

Explicit locked-term confirmation:

- `kundin tsarin mulki`: **used centrally in `p5-socs-05`** and consolidated in `p5-socs-15`.
- `dimokuradiyya`: **used in `p5-socs-05`** to explain the constitution’s relationship to lawful public participation.
- `zaɓe`: **used in `p5-socs-05`**; an additional occurrence appears only in a `p5-socs-12` wrong-answer distractor.
- `jefa ƙuri’a`: **used in `p5-socs-05`** with the locked hooked spelling and typographic apostrophe.
- Formal pollution noun: **not proposed; deferred again.**

## 16. Checksums and live-content confirmation

Live `app/content.json` before authoring:

```text
c0aaaeaf79c010d5921ddd02bc91ce944e104cfcb7a2a5d92d3c47d84f9088bb  app/content.json
mtime: 2026-07-13T16:49:37-0400
```

Live `app/content.json` after authoring and validation:

```text
c0aaaeaf79c010d5921ddd02bc91ce944e104cfcb7a2a5d92d3c47d84f9088bb  app/content.json
mtime: 2026-07-13T16:49:37-0400
```

Result: **byte checksum and mtime unchanged**. The 309 live modules remain live-only; P3/P4/P5 existed together only in the 354-module scratch copy. The scratch prefix aggregate equals the live aggregate exactly, as shown in §2.

## 17. Engine-file checksum and mtime confirmation

All six required runtime files plus `bootstrap.js` were unchanged before/after:

| File | SHA-256 | mtime |
|---|---|---|
| `app/app.js` | `de8e10d60c1e10dbe318bb0e675a1934012758aabe56815741483c88797e37af` | `2026-07-04T17:02:28-0400` |
| `app/quiz-engine.js` | `f6c33db5bf6c91e1edc2cf7ae2548221eed3f4e0c2a491afd61198333cc80001` | `2026-04-21T15:50:44-0400` |
| `app/styles.css` | `2e90fb776b97be0187246b01ea6e39b30b91b26c2303904fb4f41a310e76a323` | `2026-07-04T16:12:59-0400` |
| `app/index.html` | `cae50dbe1b435a0bc2cf98ef035824866277b9fe3657cbdad00b0cee7f37dc43` | `2026-04-18T12:08:40-0400` |
| `app/sw.js` | `1818967c86a62fbf802427ae2e535c939e502e99f09ae5d09e66c3f350519409` | `2026-07-04T12:44:20-0400` |
| `app/bootstrap.js` | `c2c64c6ac71d10e8ca5b3a87eb88229e196b7da6ab8b0892d2cc791b79cf0ce7` | `2026-04-17T21:12:19-0400` |

## 18. Alignment-matrix reference and source-support limits

All mappings remain **BEST-EFFORT — NOT VERIFIED AGAINST OFFICIAL NERDC GRADE DOCUMENT**. No M0 classification or scope was changed.

| ID | Curriculum/public-source basis | Public-source topic family | Source page/section | Class | M4 handling note |
|---|---|---|---|---|---|
| `p5-socs-01` | S7 + S1 context | Natural resources and development | S7 pp. 231–232, 259–261 | Combined | Adjacent-grade public coverage; oil/gas brief and descriptive. |
| `p5-socs-02` | S7 + S1 context | Conservation/resource use | S7 pp. 232, 261; S1 p. 3 | Combined | Erosion/overgrazing/renewable energy remain bounded enrichment. |
| `p5-socs-03` | S7 + S1 context | Pollution, health, responsibility | S7 p. 253; S1 p. 3 | Direct | Air/water/land plus short age-appropriate climate link. |
| `p5-socs-04` | S7 + S4 | Disasters, accidents, response, safety | S7 pp. 28, 253–254; S4 P4 SCS third term | Direct | Preparedness instructions keep children away from rescue hazards. |
| `p5-socs-05` | S5 + S7 | Good governance, rule of law, constitutional government | S5 P5 SCS second term; S7 pp. 23–25 | Combined | Thematic constitution treatment only; no fabricated section objective. |
| `p5-socs-06` | S5 + S7 + S1 | Responsibility, justice, rights, duties | S5 P5 SCS first term; S7 pp. 28–30 | Combined | Rights categories are enrichment; no section memorisation. |
| `p5-socs-07` | S5 + S7 | Prevention, peer resistance, help | S5 P5 SCS third term weeks 2–7; S7 pp. 252–253 | Direct | Narrowed to mandatory safety boundary; user sign-off open. |
| `p5-socs-08` | S5 + S7 | Conflict, values, relationships | S5 P5 SCS first term; S7 pp. 263–264 | Combined | Mediation/dialogue only; no live conflict actor. |
| `p5-socs-09` | S5 + S7 | Family values, relationships, social change | S5 P5 SCS first term; S7 pp. 240–241, 255–257 | Combined | Family planning fully excluded; gender-role stereotypes avoided. |
| `p5-socs-10` | S7 + S6 | Education, empowerment, citizenship readiness | S7 pp. 34–35, 261; S6 P6 SCS third term | Combined | Learning categories, equal education, and UBE are bounded enrichment. |
| `p5-socs-11` | S6 + S1 context | Regional cooperation/international relations | S6 P6 SCS second term, week 7 | Enrichment | Grade-shifted; current institutional verification documented in §8. |
| `p5-socs-12` | S6 + S7 | International organisations/global citizenship | S6 P6 SCS second term, week 7; S7 p. 264 | Enrichment | Grade-shifted; every named UN body fact-checked in §8. |
| `p5-socs-13` | S5 + S7 | Diversity, justice, peace, unity | S5 P5 SCS first term; S7 pp. 240–241, 256–258 | Direct | NYSC is brief-selected enrichment; enhanced neutrality applied. |
| `p5-socs-14` | S5 + S7 | Leadership, accountability, good governance | S5 P5 SCS first/second terms; S7 pp. 27, 35 | Direct | Age-appropriate corruption and current nonpartisan ICPC/EFCC roles. |
| `p5-socs-15` | S5 | Revision and assessment | S5 P5 SCS weeks 11–12 | Direct | Genuine consolidation of the broader AJAMIX P5 sequence. |

## Definition-of-Done gate ledger

| Gate | Result |
|---:|---|
| 1. Exact schema | PASS — 15/15, 22 keys |
| 2. Temp validator | PASS — exit 0, 354 modules |
| 3. Only `modules[]` grew | PASS |
| 4. Runtime files frozen | PASS — checksums + mtimes unchanged |
| 5. IDs/sequence | PASS — unique, 1–15 |
| 6. Word counts | PASS — 160–170 |
| 7. Audio alignment | PASS — 15/15 |
| 8. Pause text exact | PASS — 30/30 |
| 9. Pause answer integrity | PASS — 30/30 |
| 10. Quiz answer integrity | PASS — 75/75 |
| 11. Quiz fact grounding | PASS — 75/75 |
| 12. Topic-specific Q5 | PASS — 15/15 |
| 13. Topic-specific OUTRO | PASS — 15/15 |
| 14. Revision quality | PASS — genuine full-band consolidation |
| 15. Raw-English leakage | PASS — official acronyms only |
| 16. Hook lint | PASS — exit 0, 0 errors, 0 warnings |
| 17. Answer spelling consistency | PASS |
| 18. Within-module redundancy | PASS — exit 0, 0 findings |
| 19. Manual close-paraphrase | PASS — no accidental pair |
| 20. Neutrality attestations | PASS — every module; mandatory 05/06/14 explicit |
| 21. Sensitive-topic flags | **OPEN HUMAN GATE** — `p5-socs-07` boundary checks pass, explicit user sign-off still required |
| 22. P1/P2 Social Studies frozen | PASS — 30 objects, aggregate unchanged |
| 23. All pre-existing objects frozen | PASS — 309-object aggregate unchanged |

Additional dispatch gates: `p5-socs-09` family-planning exclusion **PASS**; current ECOWAS/AU/UN/ICPC/EFCC verification **PASS**; 15-entry compact manifest **PASS**.

## 19. Full 15 module JSON objects — verbatim

The following code block is a byte-for-byte textual insertion of `tools/p5-batch/p5-socs-complete.json` at report-generation time.

```json
[
  {
    "id": "p5-socs-01",
    "gradeband": "p5",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 1,
    "titleEn": "Natural Resources of Nigeria",
    "titleHa": "Albarkatun Ƙasa na Nijeriya",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Albarkatun ƙasa abubuwa ne da ake samu daga muhalli kuma suke taimaka wa rayuwa da tattalin arziki. A Nijeriya akwai ƙasa mai amfani ga noma, koguna da ruwan ƙarƙashin ƙasa, dazuzzuka, dabbobi, da ma’adanai. Ana samun man fetur da iskar gas, amma ba su ne kaɗai albarkatun ƙasar ba. Ƙasa tana ba manoma damar shuka gero, dawa, wake, shinkafa, koko, ko rogo gwargwadon yanki. Ruwa yana taimaka wa sha, noma, kamun kifi, da wasu masana’antu. Dazuzzuka suna ba da itace da ganyayyaki, suna kuma taimakawa wajen kare ƙasa da mazaunin dabbobi. Ma’adanai ana hako su daga ƙasa domin sarrafawa da yin kayayyaki. Albarkatu ba su bazu daidai a ko’ina ba, saboda haka yankuna suna musayar kaya da ilimi. Amfani da albarkatu yana samar da ayyukan yi, amma hako ko sarewa ba tare da kulawa ba yana iya gurɓata ruwa, lalata ƙasa, ko rage abin da masu zuwa za su samu. Ƴan ƙasa su san amfaninsu, su sarrafa su cikin alhaki, su kare damar masu zuwa.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi albarkatun ƙasa na Nijeriya. [MAIN] Albarkatun ƙasa abubuwa ne daga muhalli da suke taimaka wa rayuwa. Sun haɗa da ƙasa, ruwa, dazuzzuka, dabbobi, ma’adanai, man fetur, da iskar gas. Ƙasa tana taimaka wa noma, ruwa yana taimaka wa sha da kamun kifi, dazuzzuka kuma suna kare ƙasa da mazaunin dabbobi. [PAUSE 1] Wane albarkatu ne yake taimaka wa noma da shuka amfanin gona? [MAIN] Albarkatu ba su bazu daidai a ko’ina ba. Amfani da su yana samar da ayyukan yi da kayayyaki, amma hako ko sarewa ba tare da kulawa ba yana iya lalata muhalli. [PAUSE 2] Me zai iya faruwa idan aka yi amfani da albarkatu ba tare da kulawa ba? [OUTRO] Ka zaɓi albarkatu ɗaya a yankinku, ka faɗi amfaninsa da hanya ɗaya ta kula da shi domin masu zuwa.",
    "audioFile": "audio/p5-socs-01.mp3",
    "imageCard": "images/p5-socs-01.png",
    "microPauses": [
      {
        "pauseAtMs": 90000,
        "questionHa": "Wane albarkatu ne yake taimaka wa noma da shuka amfanin gona?",
        "correctAnswer": "ƙasa",
        "options": ["ƙasa", "hayaki", "shara"]
      },
      {
        "pauseAtMs": 150000,
        "questionHa": "Me zai iya faruwa idan aka yi amfani da albarkatu ba tare da kulawa ba?",
        "correctAnswer": "lalata muhalli",
        "options": ["lalata muhalli", "ƙara tsabta", "ƙara albarkatu nan da nan"]
      }
    ],
    "quizQuestions": [
      {"templateHa": "Me ake kira abubuwan da ake samu daga muhalli kuma suke taimaka wa rayuwa?", "answerFormula": "albarkatun ƙasa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["kayan wasa", "dokokin aji", "alamomin hanya"]},
      {"templateHa": "Wane albarkatu ne yake taimaka wa sha da kamun kifi?", "answerFormula": "ruwa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ƙura", "hayaki", "toka"]},
      {"templateHa": "Waɗanne albarkatu biyu ake samu a Nijeriya?", "answerFormula": "man fetur da iskar gas", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["takarda da biro", "kujera da allo", "hula da takalmi"]},
      {"templateHa": "Shin albarkatu sun bazu daidai a ko’ina?", "answerFormula": "Albarkatu ba su bazu daidai a ko’ina ba", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["eh, ko’ina iri ɗaya ne", "babu albarkatu a ƙasa", "albarkatu suna birni kaɗai"]},
      {"templateHa": "Me ya sa ya dace a sarrafa albarkatu cikin alhaki?", "answerFormula": "kare damar masu zuwa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["domin a gurɓata ruwa", "domin a sare komai", "domin a hana ayyukan yi"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p5-socs-02",
    "gradeband": "p5",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 2,
    "titleEn": "Conservation of Natural Resources",
    "titleHa": "Kula da Albarkatun Ƙasa",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Kula da albarkatun ƙasa yana nufin amfani da su ba tare da lalata damar masu zuwa ba. Idan aka sare itatuwa da yawa ba tare da dasa wasu ba, daji yana raguwa, iska da ruwa kuma suna iya kwashe ƙasa. Kiwo mai yawa a wuri ɗaya yana iya rage ciyayi ya bar ƙasa a buɗe. Ruwa na iya ɓacewa idan famfo yana zuba ko ana gurɓata rijiya da kogi. Hanyoyin kulawa sun haɗa da dasa itatuwa, rage sarewa, kiyaye ciyayi, amfani da ruwa yadda ya dace, sake amfani da wasu kaya, da bin ƙa’idar hako ma’adanai. Makamashin rana da iska suna sabuntawa ta halitta, don haka za su iya rage dogaro da wasu albarkatun da suke ƙarewa; duk da haka kayan aikinsu ma suna bukatar tsari da kulawa. Manomi, makiyayi, mai sana’a, hukuma, da ɗan ƙasa suna da rawar da za su taka. A makaranta ko gida, za ka iya rufe famfo, kula da itace, da kauce wa ɓarnatar da takarda. Ƙananan ayyuka masu ɗorewa suna haɗuwa su kare muhalli.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi kula da albarkatun ƙasa. [MAIN] Ma’anarsa ita ce amfani da albarkatu cikin hikima ba tare da lalata damar masu zuwa ba. Sare itatuwa ba tare da dasawa ba, kiwo mai yawa a wuri ɗaya, da ɓarnatar da ruwa suna rage albarkatu. [PAUSE 1] Wane aiki ne yake taimaka wa daji bayan an sare itatuwa? [MAIN] Za mu iya dasa itatuwa, rufe famfo, kiyaye ciyayi, sake amfani da wasu kaya, da bin ƙa’idar hako ma’adanai. Makamashin rana da iska suna sabuntawa ta halitta, amma kayan aikinsu ma suna bukatar kulawa. [PAUSE 2] Me ya kamata ka yi idan famfo yana zuba bayan amfani? [OUTRO] Ka lura da albarkatu ɗaya a gida ko makaranta, ka tsara ƙaramin aikin da zai rage ɓarnatar da ita a wannan makon.",
    "audioFile": "audio/p5-socs-02.mp3",
    "imageCard": "images/p5-socs-02.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Wane aiki ne yake taimaka wa daji bayan an sare itatuwa?", "correctAnswer": "dasa wasu itatuwa", "options": ["dasa wasu itatuwa", "barin ƙasa a buɗe", "ƙara sarewa"]},
      {"pauseAtMs": 150000, "questionHa": "Me ya kamata ka yi idan famfo yana zuba bayan amfani?", "correctAnswer": "rufe famfo", "options": ["rufe famfo", "bar shi yana zuba", "zuba shara kusa da shi"]}
    ],
    "quizQuestions": [
      {"templateHa": "Me kula da albarkatun ƙasa yake nufi?", "answerFormula": "amfani da su ba tare da lalata damar masu zuwa ba", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["amfani da komai yau", "sare dukkan itatuwa", "ɓarnatar da ruwa"]},
      {"templateHa": "Me kiwo mai yawa a wuri ɗaya zai iya yi?", "answerFormula": "rage ciyayi", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ƙara daji nan da nan", "cika rijiya", "gyara hanya"]},
      {"templateHa": "Waɗanne makamashi biyu ne suke sabuntawa ta halitta?", "answerFormula": "makamashin rana da iska", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["man fetur da kwal", "takarda da itace", "yashi da laka"]},
      {"templateHa": "Wane aiki ne yaro zai iya yi domin rage ɓarnatar da ruwa?", "answerFormula": "rufe famfo", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["bar shi yana zuba", "gurɓata rijiya", "zuba ruwa a hanya"]},
      {"templateHa": "Waɗanne mutane ne suke da rawar kula da albarkatu?", "answerFormula": "manomi, makiyayi, mai sana’a, hukuma, da ɗan ƙasa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["yara kaɗai", "hukuma kaɗai", "ba kowa ba"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p5-socs-03",
    "gradeband": "p5",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 3,
    "titleEn": "Environmental Pollution",
    "titleHa": "Gurɓata Muhalli",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Gurɓata muhalli yana faruwa idan hayaƙi, shara, najasa, ko wani abu mai cutarwa ya shiga iska, ruwa, ko ƙasa. Hayaƙin ababen hawa, masana’antu, da ƙona shara na iya gurɓata iska. Zubar da shara ko ruwa mai datti a rijiya, magudana, ko kogi yana gurɓata ruwa. Shara da sinadarai a gona ko hanya suna iya gurɓata ƙasa. Irin wannan gurɓatawa na iya sa numfashi ya yi wahala, ya yaɗa cuta, ya cutar da dabbobi, ko ya rage amfanin gona. Yaro kada ya taɓa shara mai kaifi ko wani abin da bai sani ba; ya sanar da babba. Ƴan ƙasa za su iya amfani da kwandon shara, rage ƙonawa, kiyaye magudana, dasa itatuwa, da sanar da hukuma idan wurin jama’a ya gurɓata. Sauyin yanayin duniya yana da dalilai masu yawa, amma taruwar wasu hayaki daga ayyukan mutane tana ƙara ɗumamar duniya. Matakin yaro shi ne kula da muhalli cikin aminci, ba ɗaukar aikin haɗari ba. Tsabtar iska, ruwa, da ƙasa tana kare lafiyar al’umma.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi yadda iska, ruwa, da ƙasa suke gurɓata. [MAIN] Hayaƙin ababen hawa, masana’antu, da ƙona shara na iya gurɓata iska. Shara ko ruwa mai datti na iya gurɓata rijiya da kogi. Shara da wasu sinadarai kuma suna iya lalata ƙasa. [PAUSE 1] Waɗanne sassa uku na muhalli za su iya gurɓata? [MAIN] Gurɓatawa na iya cutar da lafiya, dabbobi, da amfanin gona. A yi amfani da kwandon shara, a kiyaye magudana, a dasa itatuwa, kuma yaro ya sanar da babba idan ya ga abu mai haɗari. [PAUSE 2] Me yaro zai yi idan ya ga shara mai kaifi? [OUTRO] Ka bincika hanyar shara daga gidanku zuwa wurin da ya dace, ka faɗi yadda hakan yake kare iska, ruwa, ko ƙasa.",
    "audioFile": "audio/p5-socs-03.mp3",
    "imageCard": "images/p5-socs-03.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Waɗanne sassa uku na muhalli za su iya gurɓata?", "correctAnswer": "iska, ruwa, da ƙasa", "options": ["iska, ruwa, da ƙasa", "littafi, biro, da allo", "riga, hula, da takalmi"]},
      {"pauseAtMs": 150000, "questionHa": "Me yaro zai yi idan ya ga shara mai kaifi?", "correctAnswer": "ya sanar da babba", "options": ["ya sanar da babba", "ya ɗauka da hannu", "ya ɓoye ta"]}
    ],
    "quizQuestions": [
      {"templateHa": "Me zai iya gurɓata iska?", "answerFormula": "hayaƙin ababen hawa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ruwa mai tsabta", "dasa itatuwa", "rufe kwandon shara"]},
      {"templateHa": "Me zai iya gurɓata ruwa?", "answerFormula": "shara ko ruwa mai datti", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["kiyaye rijiya", "gyara famfo", "amfani da kwando"]},
      {"templateHa": "Wace illa gurɓata muhalli zai iya yi?", "answerFormula": "ya yaɗa cuta", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ya ƙara tsabta", "ya kare ruwa", "ya gyara amfanin gona"]},
      {"templateHa": "Wane aiki ne yake taimaka wa tsaftar muhalli?", "answerFormula": "amfani da kwandon shara", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ƙona shara kusa da gida", "toshe magudana", "zubar da datti a rijiya"]},
      {"templateHa": "Me taruwar wasu hayaki daga ayyukan mutane take ƙarawa?", "answerFormula": "ɗumamar duniya", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["sanyin rana", "tsabtar iska", "yawan ruwan rijiya"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p5-socs-04",
    "gradeband": "p5",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 4,
    "titleEn": "Disaster Preparedness and Safety",
    "titleHa": "Shiri da Kariya Lokacin Bala’i",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Bala’i lamari ne mai tsanani da zai iya cutar da mutane, gidaje, hanya, ko muhalli. Ambaliya, gobara, da babban hatsarin hanya misalai ne. Shiri kafin bala’i yana rage ruɗani. Iyali da makaranta su san hanyar fita, wurin taruwa, da mutumin da za a sanar. Gargadi na iya zuwa daga hukuma, rediyo, mai shela, saƙon waya, ko babban da ke kula da jama’a. Idan an yi gargadin ambaliya, ka bi babba zuwa wuri mai tsayi da aminci; kada ka shiga ruwa mai gudu ko ka koma ɗaukar kaya. Idan ka ga gobara, ka nisanta, ka sanar da babba, kuma kada ka ɓoye ko ka yi ƙoƙarin kashe babbar gobara kai kaɗai. A hatsarin hanya, ka tsaya nesa da motoci, gilashi, ko mai da ya zube, sannan ka kira taimakon babba. Kada a taru domin kallo ko a yaɗa jita-jita. Bayan an tsira, a bi umarnin hukuma kafin komawa. Yaro yana taimakawa ta hanyar sauraro, tuna hanyar aminci, da sanarwa; masu horo ne suke yin ceto.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi shiri da kariya lokacin bala’i. [MAIN] Ambaliya, gobara, da babban hatsarin hanya na iya cutar da mutane da muhalli. Iyali da makaranta su san hanyar fita, wurin taruwa, da wanda za a sanar. Gargadi na iya zuwa daga hukuma, rediyo, mai shela, ko babba. [PAUSE 1] Me ya kamata iyali su sani kafin bala’i? [MAIN] Ka bi babba zuwa wuri mai aminci. Kada ka shiga ruwa mai gudu, kusanci gobara, ko taru a hatsarin hanya. Ka sanar da babba, ka guji jita-jita, ka bi umarnin hukuma. [PAUSE 2] Wa ya kamata ya yi aikin ceto mai haɗari? [OUTRO] Ka yi atisayen tunani: gano hanyar fita, wurin taruwa, da babban da za ka sanar ba tare da shiga haɗari ba.",
    "audioFile": "audio/p5-socs-04.mp3",
    "imageCard": "images/p5-socs-04.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Me ya kamata iyali su sani kafin bala’i?", "correctAnswer": "hanyar fita da wurin taruwa", "options": ["hanyar fita da wurin taruwa", "inda za a ɓoye gaskiya", "inda za a taru domin kallo"]},
      {"pauseAtMs": 150000, "questionHa": "Wa ya kamata ya yi aikin ceto mai haɗari?", "correctAnswer": "masu horo", "options": ["masu horo", "yaro shi kaɗai", "duk mai kallo"]}
    ],
    "quizQuestions": [
      {"templateHa": "Wane lamari ne misalin bala’i?", "answerFormula": "ambaliya", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["karatun aji", "wasan ƙwallo", "gaisuwar safe"]},
      {"templateHa": "Daga ina gargadin bala’i zai iya zuwa?", "answerFormula": "hukuma", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["jita-jita", "wasan yara", "tallar takalmi"]},
      {"templateHa": "Me za ka yi idan an yi gargadin ambaliya?", "answerFormula": "bi babba zuwa wuri mai tsayi da aminci", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["shiga ruwa mai gudu", "komawa ɗaukar kaya", "taruwa domin kallo"]},
      {"templateHa": "Me ya kamata yaro ya yi idan ya ga babbar gobara?", "answerFormula": "ka nisanta, ka sanar da babba", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ya kusanci wutar", "ya ɓoye lamarin", "ya kashe ta shi kaɗai"]},
      {"templateHa": "Me ya kamata a yi kafin komawa bayan bala’i?", "answerFormula": "a bi umarnin hukuma", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["a bi jita-jita", "a yi gaggawa ba tare da izini ba", "a taru a wurin haɗari"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p5-socs-05",
    "gradeband": "p5",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 5,
    "titleEn": "The Nigerian Constitution and Rule of Law",
    "titleHa": "Kundin Tsarin Mulkin Nijeriya da Bin Doka",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Kundin tsarin mulki babbar doka ce da take bayyana yadda ake tafiyar da ƙasa, ikon hukumomi, da haƙƙoƙi da nauyin ƴan ƙasa. A Nijeriya, ya kafa tsarin Tarayya da jihohi, ya kuma nuna cewa hukumomi suna da iyaka. Bin doka yana nufin doka ta shafi gwamnati da jama’a, kuma a bi hanyar doka wajen yanke hukunci. Ba shugaba, jami’i, mai kuɗi, ko ɗan ƙasa da ya kamata ya kasance sama da doka. Mutum yana da damar a saurare shi cikin adalci; kotu ce take yanke hukunci bisa hujja da doka, ba jita-jita ba. Kundin tsarin mulki yana da alaƙa da dimokuradiyya domin yana tsara yadda hukumomi suke samun iko da yadda ƴan ƙasa suke shiga zaɓe da jefa ƙuri’a idan doka ta ba su dama. Haka kuma ƴan ƙasa suna da nauyin bin dokoki, girmama haƙƙin wasu, da kula da kayan jama’a. Wannan darasi yana koyar da jigogi ne; ba haddace lamba ko sashe na kundin ba. Bin doka yana kare adalci da alhaki, ba jam’iyya ko shugaba ɗaya ba.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi kundin tsarin mulki da bin doka. [MAIN] Kundin tsarin mulki babbar doka ce da take bayyana yadda ake tafiyar da ƙasa, ikon hukumomi, da haƙƙoƙi da nauyin ƴan ƙasa. Bin doka yana nufin gwamnati da jama’a su bi doka. [PAUSE 1] Shin akwai shugaba ko ɗan ƙasa da ya kamata ya kasance sama da doka? [MAIN] Kotu tana yanke hukunci bisa hujja da doka. Kundin yana da alaƙa da dimokuradiyya, zaɓe, da jefa ƙuri’a, amma darasinmu ba haddace lambobin sassa ba ne. Ƴan ƙasa su girmama haƙƙin wasu da kayan jama’a. [PAUSE 2] Me kotu take amfani da shi wajen yanke hukunci? [OUTRO] Ka bayyana dalilin da ya sa bin doka yake kare kowa, sannan ka ba da misalin nauyin ɗan ƙasa ba tare da goyon bayan wata jam’iyya ba.",
    "audioFile": "audio/p5-socs-05.mp3",
    "imageCard": "images/p5-socs-05.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Shin akwai shugaba ko ɗan ƙasa da ya kamata ya kasance sama da doka?", "correctAnswer": "babu wanda yake sama da doka", "options": ["babu wanda yake sama da doka", "shugaba yana sama da doka", "mai kuɗi yana sama da doka"]},
      {"pauseAtMs": 150000, "questionHa": "Me kotu take amfani da shi wajen yanke hukunci?", "correctAnswer": "hujja da doka", "options": ["hujja da doka", "jita-jita", "son rai"]}
    ],
    "quizQuestions": [
      {"templateHa": "Me ake kira babbar dokar da take bayyana yadda ake tafiyar da ƙasa?", "answerFormula": "kundin tsarin mulki", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["jadawalin wasa", "dokar aji kaɗai", "takardar kasuwa"]},
      {"templateHa": "Wa doka take shafawa?", "answerFormula": "gwamnati da jama’a", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["yara kaɗai", "talakawa kaɗai", "ba kowa ba"]},
      {"templateHa": "Wace hukuma ce take yanke hukunci bisa hujja da doka?", "answerFormula": "kotu", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["kasuwa", "ƙungiyar wasa", "mai shela"]},
      {"templateHa": "Wane tsari ne yake da alaƙa da kundin tsarin mulki, zaɓe, da jefa ƙuri’a?", "answerFormula": "dimokuradiyya", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["kiwo", "sufuri", "kamun kifi"]},
      {"templateHa": "Me wannan darasi bai bukaci ɗalibi ya haddace ba?", "answerFormula": "lamba ko sashe na kundin", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ma’anar bin doka", "nauyin ɗan ƙasa", "dalilin adalci"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p5-socs-06",
    "gradeband": "p5",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 6,
    "titleEn": "Civic Education — Rights and Responsibilities",
    "titleHa": "Ilimin Ɗan Ƙasa — Haƙƙoƙi da Nauyi",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Haƙƙoƙi kariya da dama ne da suke taimaka wa mutum ya rayu cikin mutunci. Daga cikinsu akwai haƙƙin rayuwa, mutunci, koyo, bayyana ra’ayi cikin doka, yin taro cikin lumana, da a saurare ka cikin adalci. Yara suna da haƙƙin kulawa, lafiya, ilimi, hutu, da kariya daga cutarwa. Haƙƙi ba izinin cutar da wani ba ne. Idan kana bayyana ra’ayi, kana da nauyin yin magana ba tare da zagi ko barazana ba. Idan kana amfani da makaranta, hanya, ko wurin ruwa, kana da nauyin kula da kayan jama’a. Ƴan ƙasa su bi doka, su mutunta haƙƙin wasu, su faɗi gaskiya, kuma su nemi gyara ta hanyar lumana da doka. A duniya, ƙasashe sun amince da ƙa’idojin da suke bayyana mutuncin ɗan Adam, amma kowace ƙasa tana amfani da dokokinta da hukumominta wajen kare haƙƙi. Idan an tauye haƙƙin yaro, ya gaya wa amintaccen babba, malami, ko hukumar da take kare yara. Darasin ba ya fifita wata ƙungiya, addini, jinsi, ko ra’ayin siyasa.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi haƙƙoƙi da nauyin ɗan ƙasa. [MAIN] Haƙƙoƙi suna taimaka wa mutum ya rayu cikin mutunci. Akwai haƙƙin rayuwa, koyo, bayyana ra’ayi cikin doka, yin taro cikin lumana, da a saurare ka cikin adalci. Yara suna da haƙƙin kulawa da kariya. [PAUSE 1] Shin haƙƙi yana ba mutum izinin cutar da wani? [MAIN] Haƙƙi yana tare da nauyi: yin magana ba tare da zagi ba, bin doka, girmama wasu, da kula da kayan jama’a. Idan an tauye haƙƙin yaro, ya gaya wa amintaccen babba ko malami. [PAUSE 2] Wane nauyi ne yake tare da amfani da kayan jama’a? [OUTRO] Ka haɗa haƙƙi ɗaya da nauyin da yake taimaka wa kowa ya more shi cikin adalci da mutunci.",
    "audioFile": "audio/p5-socs-06.mp3",
    "imageCard": "images/p5-socs-06.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Shin haƙƙi yana ba mutum izinin cutar da wani?", "correctAnswer": "a’a, haƙƙi ba izinin cutarwa ba ne", "options": ["a’a, haƙƙi ba izinin cutarwa ba ne", "eh, a cutar da kowa", "eh, a karya doka"]},
      {"pauseAtMs": 150000, "questionHa": "Wane nauyi ne yake tare da amfani da kayan jama’a?", "correctAnswer": "kula da kayan jama’a", "options": ["kula da kayan jama’a", "lalata kayan jama’a", "ɗaukar su ba izini"]}
    ],
    "quizQuestions": [
      {"templateHa": "Me haƙƙoƙi suke taimaka wa mutum ya yi?", "answerFormula": "ya rayu cikin mutunci", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ya cutar da wasu", "ya karya doka", "ya lalata kaya"]},
      {"templateHa": "Wane haƙƙi ne yaro yake da shi?", "answerFormula": "ilimi", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["a kunyata shi", "a hana shi kulawa", "a tilasta masa haɗari"]},
      {"templateHa": "Wane nauyi ne yake tare da bayyana ra’ayi?", "answerFormula": "yin magana ba tare da zagi ko barazana ba", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["yin barazana", "yin zagi", "hana kowa magana"]},
      {"templateHa": "Wa ya kamata yaro ya gaya wa idan an tauye haƙƙinsa?", "answerFormula": "amintaccen babba", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ya ɓoye matsalar", "ya rama da faɗa", "babu wanda zai gaya wa"]},
      {"templateHa": "Ta wace hanya ƴan ƙasa za su nemi gyara?", "answerFormula": "ta hanyar lumana da doka", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ta hanyar barazana", "ta lalata kayan jama’a", "ta yada jita-jita"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p5-socs-07",
    "gradeband": "p5",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 7,
    "titleEn": "Social Issues — Drug Abuse",
    "titleHa": "Matsalar Amfani da Taba, Giya, ko Magani Ba Bisa Ƙa’ida Ba",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Amfani ba bisa ƙa’ida ba ya haɗa taba ko giya, ko maganin da iyaye, likita, ko ma’aikacin lafiya bai amince da shi ko ba da shi ba. Taba da giya ba su dace da yara ba. Magani ana amfani da shi ne bisa umarnin iyaye da ƙwararren lafiya; maganin wani ba naka ba ne. Irin wannan amfani yana iya cutar da lafiya, koyo, alhaki, kuɗin iyali, da amincewa a gida. Mutumin da yake fama da matsala yana bukatar mutunci da taimakon ƙwararru, ba zagi, raini, ko kunyatawa ba. Idan aboki ya matsa maka ka karɓi taba, giya, ko maganin da ba a amince da shi ba, ka ce a’a cikin natsuwa. Ka bar wurin, ka je inda yake da aminci, sannan ka gaya wa babban da ka yarda da shi, kamar iyaye, malami, likita, ko ma’aikacin lafiya. Kada ka yi gardama ko ka ɓoye abin da ya faru. Neman taimako alamar ƙarfin hali ce kuma yana kare kai da iyali.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi yadda za a ƙi abin da zai cutar da lafiya. [MAIN] Taba da giya ba su dace da yara ba. Kada a yi amfani da maganin da iyaye, likita, ko ma’aikacin lafiya bai amince da shi ko ba da shi ba. Rashin amfani da waɗannan abubuwa na iya cutar da lafiya, koyo, da amincewar iyali. [PAUSE 1] Me za ka ce idan aboki ya matsa maka ka karɓi irin wannan abu? [MAIN] Ka ce a’a cikin natsuwa, ka bar wurin, ka je inda yake da aminci, sannan ka gaya wa babban da ka yarda da shi. A mutunta mai matsala; yana bukatar taimakon ƙwararru, ba zagi ba. [PAUSE 2] Wa ya kamata ka gaya wa bayan ka bar wurin? [OUTRO] Ka tuna matakai uku: ka ce a’a, ka bar wurin, ka nemi taimakon babban da ka yarda da shi.",
    "audioFile": "audio/p5-socs-07.mp3",
    "imageCard": "images/p5-socs-07.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Me za ka ce idan aboki ya matsa maka ka karɓi irin wannan abu?", "correctAnswer": "a’a", "options": ["a’a", "zan karɓa", "zan ɓoye"]},
      {"pauseAtMs": 150000, "questionHa": "Wa ya kamata ka gaya wa bayan ka bar wurin?", "correctAnswer": "babban da na yarda da shi", "options": ["babban da na yarda da shi", "babu kowa", "wanda zai kunyata ni"]}
    ],
    "quizQuestions": [
      {"templateHa": "Wa zai amince da maganin yaro ko ya ba shi?", "answerFormula": "iyaye, likita, ko ma’aikacin lafiya", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["duk wani aboki", "baƙon da ba a sani ba", "wani yaro"]},
      {"templateHa": "Me za ka yi idan aboki ya matsa maka?", "answerFormula": "ka ce a’a cikin natsuwa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ka karɓa", "ka ɓoye lamarin", "ka yi gardama"]},
      {"templateHa": "Ina za ka je bayan ka ƙi abin?", "answerFormula": "inda yake da aminci", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["wurin da babu babba", "wurin da za a kunyata ni", "wurin da za a yi gardama"]},
      {"templateHa": "Yaya ya dace a yi wa mutumin da yake fama da matsala?", "answerFormula": "mutunta mai matsala", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["a kunyata shi", "a raina shi", "a zage shi"]},
      {"templateHa": "Waɗanne matakai uku ne suke taimaka wa yaro?", "answerFormula": "ka ce a’a, ka bar wurin, ka nemi taimakon babban da ka yarda da shi", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["karɓa, ɓoyewa, da gardama", "raina mutum, zagi, da tsokana", "yin shiru, komawa, da ɓata lokaci"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p5-socs-08",
    "gradeband": "p5",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 8,
    "titleEn": "Social Issues — Conflict and Conflict Resolution",
    "titleHa": "Saɓani da Yadda Ake Warware Shi Cikin Lumana",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Saɓani yana faruwa idan mutane ba su amince da juna kan bukata, ra’ayi, aiki, ko rabon abu ba. Zai iya faruwa tsakanin ’yan uwa, abokan makaranta, ƙungiyar wasa, ko maƙwabta. Saɓani ba lallai ya zama faɗa ba; yadda aka amsa masa ne zai iya kawo zaman lafiya ko ƙara matsala. Mataki na farko shi ne a natsu, a daina zagi ko barazana, sannan kowane ɓangare ya faɗi abin da ya faru ba tare da ƙarya ba. A saurari juna, a gano abin da suka amince a kai, sannan a nemi mafita mai adalci. Wani lokaci mai shiga tsakani, kamar iyaye, malami, ko dattijo mai adalci, yana taimaka wa mutane su saurari juna. Sulhu na iya haɗawa da neman afuwa, gyara abin da aka lalata, raba aiki daidai, ko amincewa da ƙa’ida. Idan akwai barazana ko haɗari, yaro ya nisanta ya sanar da amintaccen babba; kada ya shiga tsakani shi kaɗai. Tattaunawa ba tana nufin yarda da zalunci ba. Warware saɓani cikin lumana yana kare mutunci da dangantaka.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi saɓani da yadda ake warware shi cikin lumana. [MAIN] Saɓani yana faruwa idan mutane ba su amince da juna kan bukata, ra’ayi, ko aiki ba. Ba lallai ya zama faɗa ba. A natsu, a daina zagi, kowa ya faɗi abin da ya faru, sannan a saurari juna. [PAUSE 1] Wane mataki ne ya dace a fara da shi idan saɓani ya taso? [MAIN] A gano abin da aka amince a kai, a nemi mafita mai adalci, ko a nemi mai shiga tsakani. Idan akwai haɗari, yaro ya nisanta ya sanar da babba. [PAUSE 2] Wa zai iya zama mai shiga tsakani a saɓanin makaranta? [OUTRO] Ka yi amfani da matakai huɗu: natsuwa, faɗin gaskiya, sauraro, da neman mafita mai adalci.",
    "audioFile": "audio/p5-socs-08.mp3",
    "imageCard": "images/p5-socs-08.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Wane mataki ne ya dace a fara da shi idan saɓani ya taso?", "correctAnswer": "a natsu", "options": ["a natsu", "a yi barazana", "a fara zagi"]},
      {"pauseAtMs": 150000, "questionHa": "Wa zai iya zama mai shiga tsakani a saɓanin makaranta?", "correctAnswer": "malami", "options": ["malami", "wanda yake ƙara zagi", "wanda ba ya sauraro"]}
    ],
    "quizQuestions": [
      {"templateHa": "Yaushe saɓani zai iya faruwa?", "answerFormula": "idan mutane ba su amince da juna kan bukata, ra’ayi, ko aiki ba", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["idan kowa ya saurara", "idan an raba aiki daidai", "idan an nemi afuwa"]},
      {"templateHa": "Me ya kamata kowane ɓangare ya yi bayan ya natsu?", "answerFormula": "ya faɗi abin da ya faru ba tare da ƙarya ba", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ya ƙara barazana", "ya ɓoye gaskiya", "ya hana wani magana"]},
      {"templateHa": "Me mai shiga tsakani yake taimaka wa mutane su yi?", "answerFormula": "su saurari juna", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["su ƙara faɗa", "su yi ƙarya", "su lalata kaya"]},
      {"templateHa": "Me yaro zai yi idan akwai barazana ko haɗari?", "answerFormula": "ya nisanta ya sanar da amintaccen babba", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ya shiga tsakani shi kaɗai", "ya tsaya domin kallo", "ya ɓoye haɗarin"]},
      {"templateHa": "Waɗanne matakai huɗu ne suke taimaka wa warware saɓani?", "answerFormula": "natsuwa, faɗin gaskiya, sauraro, da neman mafita mai adalci", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["zagi, barazana, ƙarya, da rama", "gudu, ɓoyewa, tsokana, da raini", "hayaniya, son rai, faɗa, da ƙin sauraro"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p5-socs-09",
    "gradeband": "p5",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 9,
    "titleEn": "The Nigerian Family — Change and Continuity",
    "titleHa": "Iyalan Nijeriya — Sauyi da Abubuwan da Suke Ci Gaba",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Iyalan Nijeriya suna da siffofi dabam-dabam. Wani gida yana da iyaye ko masu kula da yara da ’ya’yansu; wani kuma yana da kakanni, kawu, inna, ’yan uwa, ko wasu dangi kusa. Dukansu za su iya bayar da kulawa, tarbiyya, kariya, da taimako. Wasu abubuwa suna ci gaba daga zamani zuwa zamani, kamar girmama juna, kula da yara da tsofaffi, raba alhaki, da taimakon dangi. Wasu abubuwa kuma suna sauyawa saboda makaranta, sana’a, sauya wurin zama, fasaha, tsadar rayuwa, ko nisan dangi. A yau, maza da mata za su iya yin ayyukan gida, kula da yara, samun ilimi, ko yin sana’a gwargwadon hali da yarjejeniya; babu aikin da ya zama na jinsi ɗaya. Yara su yi aikin da ya dace da shekarunsu cikin aminci. Iyalai suna iya tattauna jadawalin aiki, kashe kuɗi, karatu, da kula da wanda ba shi da lafiya. Sauyi ba yana nufin a watsar da kyawawan ƙima ba. Sauraro, adalci, da sassauci suna taimaka wa iyali ya amsa sabon yanayi ba tare da rasa kulawa da zumunci ba.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi sauyi da ci gaba a iyalan Nijeriya. [MAIN] Wani gida yana da masu kula da yara da ’ya’yansu; wani yana da kakanni da sauran dangi kusa. Iyalai suna bayar da kulawa, tarbiyya, kariya, da taimako. [PAUSE 1] Wane abu ne yake ci gaba a iyali daga zamani zuwa zamani? [MAIN] Makaranta, sana’a, fasaha, tsadar rayuwa, ko sauya wurin zama suna iya sauya yadda ake raba aiki. Maza da mata za su iya raba alhaki gwargwadon hali da yarjejeniya. Yara su yi aikin da ya dace da shekarunsu. [PAUSE 2] Me yake taimaka wa iyali ya amsa sabon yanayi? [OUTRO] Ka kwatanta abu ɗaya da yake ci gaba da abu ɗaya da ya sauya a iyali, sannan ka nuna yadda adalci yake kiyaye zumunci.",
    "audioFile": "audio/p5-socs-09.mp3",
    "imageCard": "images/p5-socs-09.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Wane abu ne yake ci gaba a iyali daga zamani zuwa zamani?", "correctAnswer": "girmama juna", "options": ["girmama juna", "rashin kulawa", "raina dangi"]},
      {"pauseAtMs": 150000, "questionHa": "Me yake taimaka wa iyali ya amsa sabon yanayi?", "correctAnswer": "sauraro, adalci, da sassauci", "options": ["sauraro, adalci, da sassauci", "zargi da raini", "ƙin tattaunawa"]}
    ],
    "quizQuestions": [
      {"templateHa": "Wa za a iya samu a iyali mai yalwar dangi?", "answerFormula": "kakanni, kawu, inna, ’yan uwa, ko wasu dangi", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ɗaliban aji kaɗai", "masu kasuwa kaɗai", "direbobi kaɗai"]},
      {"templateHa": "Wane abu iyali yake bayarwa?", "answerFormula": "kulawa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["rashin tsaro", "rarrabuwar kai", "raini"]},
      {"templateHa": "Wane abu zai iya sauya yadda iyali yake raba aiki?", "answerFormula": "sauya wurin zama", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["launin bango", "sunan titi", "girman allo"]},
      {"templateHa": "Ta yaya maza da mata za su raba alhaki?", "answerFormula": "gwargwadon hali da yarjejeniya", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["bisa jinsi kaɗai", "ba tare da tattaunawa ba", "ta tilasta wa mutum ɗaya"]},
      {"templateHa": "Shin sauyi yana nufin a watsar da kyawawan ƙima?", "answerFormula": "Sauyi ba yana nufin a watsar da kyawawan ƙima ba", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["eh, a daina kulawa", "eh, a daina zumunci", "eh, a daina girmamawa"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p5-socs-10",
    "gradeband": "p5",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 10,
    "titleEn": "Education and Its Importance",
    "titleHa": "Ilimi da Muhimmancinsa",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Ilimi yana taimaka wa mutum ya samu sani, basira, kyawawan halaye, da damar yin amfani da abin da ya koya. Ilimin makaranta yana da jadawali, malamai, darussa, da tantancewa. Koyo a wajen makaranta na iya faruwa a ajin koyon sana’a, karatun manya, ko horaswar al’umma. Koyo na yau da kullum kuma yana faruwa daga iyaye, dattawa, abokai, aiki, da lura da muhalli. Waɗannan hanyoyi suna iya taimakon juna. Karatu da rubutu suna sa mutum ya fahimci saƙo, cika takarda, lissafa kuɗi, da tambayar bayani. Ilimi yana taimaka wa lafiya, sana’a, warware matsala, da shiga harkokin al’umma cikin sani. Shirin UBE yana nufin faɗaɗa damar ilimin asali ga yara. ’Ya mace da ɗa namiji duk suna da haƙƙin koyo; rashin kuɗi, nisa, ko tsohon zato bai kamata ya sa a raina ilimin ’ya mace ba. Iyali, makaranta, al’umma, da hukuma su taimaka wajen aminci, malamai, littattafai, da halartar ɗalibai. Ilimi ba ya ƙare da aji; mutum yana iya ci gaba da koyo tsawon rayuwa.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi ilimi da muhimmancinsa. [MAIN] Ilimi yana ba mutum sani, basira, da damar amfani da abin da ya koya. Ana koyo a makaranta, a horaswar sana’a ko al’umma, da kuma daga iyaye, aiki, da lura da muhalli. [PAUSE 1] Waɗanne hanyoyi uku ne ake iya samun ilimi? [MAIN] Karatu da rubutu suna taimaka wa saƙo, takarda, da kuɗi. Shirin UBE yana faɗaɗa damar ilimin asali. ’Ya mace da ɗa namiji duk suna da haƙƙin koyo. Iyali, makaranta, al’umma, da hukuma su taimaka. [PAUSE 2] Shin ilimi yana ƙarewa da barin aji? [OUTRO] Ka bayyana abin da ka koya a makaranta, daga sana’a, da daga rayuwar yau da kullum, sannan ka nuna yadda hanyoyin suke taimakon juna.",
    "audioFile": "audio/p5-socs-10.mp3",
    "imageCard": "images/p5-socs-10.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Waɗanne hanyoyi uku ne ake iya samun ilimi?", "correctAnswer": "makaranta, horaswa, da rayuwar yau da kullum", "options": ["makaranta, horaswa, da rayuwar yau da kullum", "kasuwa, kogi, da hanya", "riga, hula, da takalmi"]},
      {"pauseAtMs": 150000, "questionHa": "Shin ilimi yana ƙarewa da barin aji?", "correctAnswer": "a’a, ana ci gaba da koyo tsawon rayuwa", "options": ["a’a, ana ci gaba da koyo tsawon rayuwa", "eh, koyo yana ƙarewa", "eh, manya ba sa koyo"]}
    ],
    "quizQuestions": [
      {"templateHa": "Me ilimi yake ba mutum?", "answerFormula": "sani, basira, kyawawan halaye", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["rashin sani", "rashin tambaya", "rashin amfani"]},
      {"templateHa": "Ina koyo na iya faruwa a wajen makaranta?", "answerFormula": "ajin koyon sana’a", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["cikin ruwa", "saman rufi", "ƙarƙashin mota"]},
      {"templateHa": "Waɗanne amfani ne karatu da rubutu suke da su?", "answerFormula": "fahimci saƙo, cika takarda, lissafa kuɗi, da tambayar bayani", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ɓoye bayani", "rufe makaranta", "ƙin tambaya"]},
      {"templateHa": "Wa suke da haƙƙin koyo?", "answerFormula": "’ya mace da ɗa namiji", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ɗa namiji kaɗai", "’ya mace kaɗai", "masu kuɗi kaɗai"]},
      {"templateHa": "Me shirin UBE yake nufi a darasin?", "answerFormula": "faɗaɗa damar ilimin asali ga yara", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["rage damar makaranta", "hana yara karatu", "rufe ajin koyon sana’a"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p5-socs-11",
    "gradeband": "p5",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 11,
    "titleEn": "Nigeria and Africa — ECOWAS and the African Union",
    "titleHa": "Nijeriya da Afirka — ECOWAS da Tarayyar Afirka",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Nijeriya tana aiki tare da wasu ƙasashe domin warware bukatun da suka wuce iyaka. ECOWAS ƙungiya ce ta ƙasashen Yammacin Afirka da aka kafa a shekara ta 1975 domin ƙarfafa haɗin kan tattalin arziki da hulɗar yankin. Ayyukanta sun shafi ciniki, sufuri, sadarwa, makamashi, noma, da sauƙaƙa zirga-zirgar mutane da kaya bisa yarjejeniyoyi. Kasancewar mamba na iya sauyawa, saboda haka darasin nan ba ya haddace takamaiman adadi ko cikakken jerin ƙasashe. Tarayyar Afirka, wato AU, ƙungiya ce ta nahiyar Afirka da aka ƙaddamar a shekara ta 2002. Tana ƙarfafa haɗin kai, zaman lafiya, tsaro, ci gaba, da haɗa ƙoƙarin ƙasashen Afirka. Nijeriya tana shiga waɗannan ƙungiyoyi a matsayin ƙasar Afirka, tana tattaunawa da sauran mambobi kan bukatun yankin da nahiyar. Haɗin gwiwa ba yana kawar da dokar kowace ƙasa ba; ƙasashe suna amincewa da yarjejeniyoyi sannan su aiwatar da alhakinsu. Ɗan ƙasa zai iya ganin amfanin haɗin gwiwa a ciniki, tafiya, lafiya, ilimi, ko taimakon bala’i. Ya dace a duba sabon bayanin hukuma idan ana son sanin mambobin yanzu.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi ECOWAS da Tarayyar Afirka. [MAIN] ECOWAS ƙungiya ce ta Yammacin Afirka da aka kafa a shekara ta 1975 domin haɗin kan tattalin arziki da hulɗar yankin. Tana taimaka wa ciniki, sufuri, sadarwa, noma, da zirga-zirga bisa yarjejeniyoyi. [PAUSE 1] Wane yanki ne ECOWAS take haɗa ƙasashensa? [MAIN] Tarayyar Afirka, wato AU, ƙungiya ce ta nahiyar da aka ƙaddamar a 2002. Tana ƙarfafa haɗin kai, zaman lafiya, tsaro, da ci gaba. Mambobin ƙungiya na iya sauyawa, don haka a duba sabon bayanin hukuma. [PAUSE 2] Me Tarayyar Afirka take ƙarfafawa? [OUTRO] Ka bambanta su: ECOWAS tana mai da hankali ga Yammacin Afirka, Tarayyar Afirka kuma ga nahiyar baki ɗaya.",
    "audioFile": "audio/p5-socs-11.mp3",
    "imageCard": "images/p5-socs-11.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Wane yanki ne ECOWAS take haɗa ƙasashensa?", "correctAnswer": "Yammacin Afirka", "options": ["Yammacin Afirka", "Gabashin Asiya", "Arewacin Turai"]},
      {"pauseAtMs": 150000, "questionHa": "Me Tarayyar Afirka take ƙarfafawa?", "correctAnswer": "haɗin kai, zaman lafiya, tsaro, da ci gaba", "options": ["haɗin kai, zaman lafiya, tsaro, da ci gaba", "rufe iyakoki duka", "hana ƙasashe tattaunawa"]}
    ],
    "quizQuestions": [
      {"templateHa": "A wace shekara aka kafa ECOWAS?", "answerFormula": "1975", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["1960", "1985", "2002"]},
      {"templateHa": "Wane aiki ne ECOWAS take taimakawa a yankinta?", "answerFormula": "ciniki", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["rufe kasuwanni", "hana sufuri", "katse sadarwa"]},
      {"templateHa": "A wace shekara aka ƙaddamar da Tarayyar Afirka?", "answerFormula": "2002", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["1945", "1975", "2012"]},
      {"templateHa": "Wace ƙungiya ce take aiki a matakin nahiyar Afirka?", "answerFormula": "Tarayyar Afirka", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ƙungiyar aji", "kasuwar gari", "ƙaramar hukuma"]},
      {"templateHa": "Me ya sa ba a haddace takamaiman adadin mambobin ECOWAS a darasin ba?", "answerFormula": "kasancewar mamba na iya sauyawa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["saboda babu wata ƙungiya", "saboda Yammacin Afirka ba yanki ba ne", "saboda ba a kafa ECOWAS ba"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p5-socs-12",
    "gradeband": "p5",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 12,
    "titleEn": "Nigeria and the World — United Nations",
    "titleHa": "Nijeriya da Duniya — Majalisar Ɗinkin Duniya",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Majalisar Ɗinkin Duniya, wato UN, ƙungiyar ƙasashe ce da aka kafa a shekara ta 1945. Manufarta ta haɗa da taimaka wa zaman lafiya da tsaro, haƙƙin ɗan Adam, ci gaba, taimakon jin ƙai, da bin dokar ƙasa da ƙasa. Babban Taro yana haɗa dukkan ƙasashe mambobi domin tattauna batutuwa da bayar da shawarwari. Kwamitin Tsaro yana da babban alhakin kula da zaman lafiya da tsaro na duniya bisa kundin ƙungiyar. UNICEF asusun Majalisar Ɗinkin Duniya ne da yake aiki domin haƙƙin yara, lafiya, abinci mai gina jiki, ilimi, ruwa mai tsabta, da kariya. Waɗannan hukumomi ba aiki ɗaya suke yi ba, kuma ba kowace shawara ce take zama doka iri ɗaya ba. Nijeriya ta zama mamba a ranar 7 ga Oktoba, 1960. A matsayinta na mamba, tana tura wakilai, tana shiga tattaunawa, tana aiki da hukumomin ƙungiyar kan bukatun duniya. Haɗin gwiwa zai iya bayyana a rigakafi, makaranta, taimakon bala’i, ko aikin zaman lafiya. Ɗan ƙasa ya bambanta bayani daga hukuma da jita-jita, domin rawar kowace hukuma tana da iyaka.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi Majalisar Ɗinkin Duniya. [MAIN] An kafa UN a 1945 domin haɗin gwiwa kan zaman lafiya, tsaro, haƙƙin ɗan Adam, ci gaba, da taimakon jin ƙai. Babban Taro yana haɗa ƙasashe mambobi. Kwamitin Tsaro yana da babban alhakin zaman lafiya da tsaro na duniya. [PAUSE 1] Wane ɓangare ne yake haɗa dukkan ƙasashe mambobi domin tattaunawa? [MAIN] UNICEF tana aiki domin haƙƙin yara, lafiya, ilimi, ruwa, da kariya. Nijeriya ta zama mamba a ranar 7 ga Oktoba, 1960, kuma tana shiga tattaunawa da ayyukan haɗin gwiwa. [PAUSE 2] Wane rukuni ne UNICEF take mayar da hankali a kai? [OUTRO] Ka haɗa kowane suna da aikinsa: Babban Taro, Kwamitin Tsaro, da UNICEF, sannan ka tuna cewa rawarsu ba iri ɗaya ba ce.",
    "audioFile": "audio/p5-socs-12.mp3",
    "imageCard": "images/p5-socs-12.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Wane ɓangare ne yake haɗa dukkan ƙasashe mambobi domin tattaunawa?", "correctAnswer": "Babban Taro", "options": ["Babban Taro", "ajin makaranta", "ƙungiyar kasuwa"]},
      {"pauseAtMs": 150000, "questionHa": "Wane rukuni ne UNICEF take mayar da hankali a kai?", "correctAnswer": "yara", "options": ["yara", "motoci", "masana’antu"]}
    ],
    "quizQuestions": [
      {"templateHa": "A wace shekara aka kafa Majalisar Ɗinkin Duniya?", "answerFormula": "1945", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["1960", "1975", "2002"]},
      {"templateHa": "Me Babban Taro yake yi?", "answerFormula": "yana haɗa dukkan ƙasashe mambobi", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["yana kula da aji ɗaya", "yana sayar da kaya", "yana gudanar da ƙaramar hukuma"]},
      {"templateHa": "Me Kwamitin Tsaro yake da babban alhaki a kai?", "answerFormula": "zaman lafiya da tsaro na duniya", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["noman gero", "gyaran takalma", "kasuwar unguwa"]},
      {"templateHa": "A wace rana Nijeriya ta zama mamba?", "answerFormula": "7 ga Oktoba, 1960", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["1 ga Janairu, 1945", "28 ga Mayu, 1975", "9 ga Yuli, 2002"]},
      {"templateHa": "Waɗanne fannoni ne UNICEF take aiki a kai?", "answerFormula": "haƙƙin yara, lafiya, abinci mai gina jiki, ilimi, ruwa mai tsabta, da kariya", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["shirya zaɓen Nijeriya", "hako ma’adanai", "gina dukkan hanyoyin ƙasa"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p5-socs-13",
    "gradeband": "p5",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 13,
    "titleEn": "Cultural Diversity and National Unity",
    "titleHa": "Bambancin Al’adu da Haɗin Kan Ƙasa",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Nijeriya tana da al’ummomi, harsuna, addinai, sutura, abinci, waƙoƙi, da bukukuwa iri-iri. Bambancin al’adu yana ba ƴan ƙasa damar koyon sababbin kalmomi, dabaru, fasaha, da hanyoyin rayuwa. Babu al’umma, harshe, ko addini da wannan darasi ya ɗora sama da wani. Haɗin kan ƙasa ba yana nufin kowa ya bar al’adarsa ko ya yi tunani iri ɗaya ba. Yana nufin ƴan ƙasa su girmama bambanci, su bi doka ɗaya, su yi aiki tare, kuma su ƙi raini da nuna bambanci. A makaranta, za ka iya sauraron sunan aboki daidai, ka tambayi ma’anar al’ada cikin ladabi, ka kuma raba aiki ba tare da fifiko ba. Shirin NYSC yana tura wasu matasa masu kammala karatu su yi hidima a wurare dabam da nasu domin su san wasu al’ummomi kuma su taimaka wa ƙasa. Wannan misali ɗaya ne na haɗa jama’a; haɗin kai yana farawa tun gida da makaranta. Idan ka ji maganar da take raina wata ƙungiya, kada ka maimaita ta. Ka zaɓi gaskiya, tattaunawa, da hulɗa cikin mutunci.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi bambancin al’adu da haɗin kan ƙasa. [MAIN] Nijeriya tana da al’ummomi, harsuna, addinai, sutura, abinci, da bukukuwa iri-iri. Babu wata ƙungiya da ta fi wata daraja. Haɗin kai yana nufin girmama bambanci, bin doka, da aiki tare. [PAUSE 1] Shin haɗin kai yana nufin kowa ya bar al’adarsa? [MAIN] A makaranta, ka saurari suna daidai, ka tambaya cikin ladabi, ka raba aiki ba tare da fifiko ba. Shirin NYSC yana taimaka wa wasu matasa su san al’ummomi dabam ta hidima. [PAUSE 2] Me za ka yi idan ka ji maganar da take raina wata ƙungiya? [OUTRO] Ka koyi kalma ko al’ada ɗaya daga aboki cikin ladabi, sannan ka faɗi yadda mutunta bambanci yake ƙarfafa Nijeriya.",
    "audioFile": "audio/p5-socs-13.mp3",
    "imageCard": "images/p5-socs-13.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Shin haɗin kai yana nufin kowa ya bar al’adarsa?", "correctAnswer": "a’a, yana nufin girmama bambanci da aiki tare", "options": ["a’a, yana nufin girmama bambanci da aiki tare", "eh, kowa ya bar al’adarsa", "eh, a hana harsuna dabam"]},
      {"pauseAtMs": 150000, "questionHa": "Me za ka yi idan ka ji maganar da take raina wata ƙungiya?", "correctAnswer": "kada na maimaita ta", "options": ["kada na maimaita ta", "in yaɗa ta", "in ƙara raini"]}
    ],
    "quizQuestions": [
      {"templateHa": "Waɗanne bambance-bambance ake samu a Nijeriya?", "answerFormula": "harsuna, addinai, sutura, abinci, da bukukuwa iri-iri", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["harshe ɗaya tilo", "abinci ɗaya tilo", "al’ada ɗaya tilo"]},
      {"templateHa": "Me bambancin al’adu yake ba ƴan ƙasa damar yi?", "answerFormula": "koyon sababbin kalmomi, dabaru, fasaha, da hanyoyin rayuwa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["raina juna", "hana hulɗa", "ƙin sauraro"]},
      {"templateHa": "Me haɗin kan ƙasa yake nufi?", "answerFormula": "girmama bambanci, bin doka, da aiki tare", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["tilasta al’ada ɗaya", "raina ƙungiyoyi", "hana harsuna dabam"]},
      {"templateHa": "Me shirin NYSC yake taimaka wa wasu matasa su yi?", "answerFormula": "su san wasu al’ummomi kuma su taimaka wa ƙasa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["su fifita yankinsu", "su guji sauran al’umma", "su hana haɗin kai"]},
      {"templateHa": "Ta yaya ɗalibi zai mutunta abokin da al’adarsa ta bambanta?", "answerFormula": "tambayi ma’anar al’ada cikin ladabi", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ya yi masa ba’a", "ya ƙi sunansa", "ya hana shi aikin rukuni"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p5-socs-14",
    "gradeband": "p5",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 14,
    "titleEn": "Leadership and Good Governance",
    "titleHa": "Jagoranci da Kyakkyawan Mulki",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Shugaba mai kyau yana sauraro, faɗin gaskiya, bin doka, raba aiki daidai, da bayyana amfani da kayan jama’a. Kyakkyawan mulki yana bukatar adalci, shiga ta jama’a, amsa tambaya, da aiki kan bukatun al’umma. Cin hanci da rashawa shi ne amfani da mukami ko kayan jama’a domin amfanin kai, ko karɓar kyauta domin sauya hukuncin da bai kamata ba. Hakan yana iya rage kuɗin makaranta, lafiya, ruwa, ko hanya, kuma yana raunana amincewar jama’a. Ba a jingina cin hanci ga wata jam’iyya, ƙabila, addini, ko yanki; mutum ne yake da alhakin abin da ya aikata, kuma kotu ce take tabbatar da laifi. ICPC tana karɓar korafe-korafe, tana binciken zargin cin hanci, tana duba hanyoyin aiki domin rage rashawa, kuma tana ilimantar da jama’a. EFCC tana bincike da taimakawa wajen gurfanar da laifukan tattalin arziki da kuɗi bisa doka. Ƴan ƙasa su nemi bayani cikin lumana, su kiyaye gaskiya, su kula da kayan jama’a, kuma yaro ya sanar da amintaccen babba idan ya ga abin da bai dace ba.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi jagoranci da kyakkyawan mulki. [MAIN] Shugaba mai kyau yana sauraro, faɗin gaskiya, bin doka, da bayyana amfani da kayan jama’a. Cin hanci da rashawa shi ne amfani da mukami ko kayan jama’a domin amfanin kai, ko karɓar kyauta domin sauya hukunci. [PAUSE 1] Wane hali ne shugaba mai kyau yake nunawa? [MAIN] ICPC tana bincike, rigakafi ta hanyar gyaran tsari, da ilimantar da jama’a kan rashawa. EFCC tana binciken laifukan tattalin arziki da kuɗi bisa doka. Kotu ce take tabbatar da laifi. [PAUSE 2] Wace hukuma ce take mai da hankali ga laifukan tattalin arziki da kuɗi? [OUTRO] Ka tambayi yadda ake amfani da kayan jama’a cikin ladabi, ka faɗi gaskiya, kuma kada ka jingina laifi ga wata ƙungiya.",
    "audioFile": "audio/p5-socs-14.mp3",
    "imageCard": "images/p5-socs-14.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Wane hali ne shugaba mai kyau yake nunawa?", "correctAnswer": "sauraro da faɗin gaskiya", "options": ["sauraro da faɗin gaskiya", "ɓoye bayanai", "son kai"]},
      {"pauseAtMs": 150000, "questionHa": "Wace hukuma ce take mai da hankali ga laifukan tattalin arziki da kuɗi?", "correctAnswer": "EFCC", "options": ["EFCC", "ƙungiyar wasa", "majalisar ɗalibai"]}
    ],
    "quizQuestions": [
      {"templateHa": "Wane hali ne na shugaba mai kyau?", "answerFormula": "bin doka", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ɓoye gaskiya", "raba aiki ba daidai ba", "ƙin sauraro"]},
      {"templateHa": "Me cin hanci da rashawa yake nufi?", "answerFormula": "amfani da mukami ko kayan jama’a domin amfanin kai", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["kula da kayan jama’a", "bayyana kashe kuɗi", "raba aiki daidai"]},
      {"templateHa": "Wace hukuma ce take binciken zargin cin hanci da duba hanyoyin rage rashawa?", "answerFormula": "ICPC", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ƙungiyar kasuwa", "ajin makaranta", "ƙungiyar wasa"]},
      {"templateHa": "Wa yake tabbatar da laifi bisa doka?", "answerFormula": "kotu", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["jita-jita", "wani yaro", "mai shela"]},
      {"templateHa": "Me ya sa cin hanci da rashawa yake cutar da al’umma?", "answerFormula": "yana iya rage kuɗin makaranta, lafiya, ruwa, ko hanya", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["yana ƙara amincewa", "yana gyara dukkan hidimomi", "yana sa kowa ya bi doka"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p5-socs-15",
    "gradeband": "p5",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 15,
    "titleEn": "Revision and Assessment — P5 Social and Citizenship Studies",
    "titleHa": "Bita da Tantancewa — Nazarin Zamantakewa na Aji Biyar",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "A bita, ka haɗa darussan aji biyar. Nijeriya tana da albarkatun ƙasa kamar ruwa, dazuzzuka, ma’adanai, man fetur, da iskar gas; kula da su yana kare damar masu zuwa. Gurɓata iska, ruwa, ko ƙasa yana cutar da lafiya, yayin da shiri kafin ambaliya, gobara, ko hatsarin hanya yake rage haɗari. Kundin tsarin mulki yana bayyana tsarin ƙasa, iko, haƙƙoƙi, da nauyi; bin doka ya shafi gwamnati da jama’a. Haƙƙi yana tare da girmama wasu. Ka tuna matakan ƙin taba, giya, ko maganin da ba a amince da shi ba: cewa a’a, barin wurin, da neman taimako. Saɓani yana bukatar natsuwa, sauraro, da mafita mai adalci. Iyalai suna canzawa amma kulawa da zumunci suna ci gaba. Ilimi yana faruwa a makaranta, horaswa, da rayuwar yau da kullum. ECOWAS, Tarayyar Afirka, da Majalisar Ɗinkin Duniya suna nuna haɗin gwiwar ƙasashe. Bambancin al’adu yana buƙatar mutunci da haɗin kai. Jagoranci mai kyau yana bukatar gaskiya, bin doka, da alhaki. Don tantance kanka, ka bayyana gaskiya, dalili, da aikin ɗan ƙasa daga kowane jigo.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa bitar Nazarin Zamantakewa na aji biyar. [MAIN] Ka tuna da albarkatu da kulawa da su, gurɓata muhalli, da shirin bala’i. Ka tuna kundin tsarin mulki, haƙƙoƙi da nauyi, da bin doka. [PAUSE 1] Waɗanne matakai uku ne yaro zai bi idan aka matsa masa ya karɓi taba, giya, ko maganin da ba a amince da shi ba? [MAIN] Saɓani yana bukatar natsuwa da sauraro. Iyali yana bukatar adalci; ilimi yana zuwa ta hanyoyi da dama. ECOWAS, Tarayyar Afirka, da Majalisar Ɗinkin Duniya suna haɗa ƙasashe. Bambancin al’adu yana bukatar mutunci, jagoranci kuma yana bukatar gaskiya da alhaki. [PAUSE 2] Me kundin tsarin mulki yake bayyana? [OUTRO] Ka zaɓi jigogi biyar daga albarkatu, muhalli, doka, lafiya, iyali, ilimi, haɗin gwiwar ƙasashe, al’adu, ko jagoranci; ka ba da gaskiya ɗaya da aikin ɗan ƙasa ɗaya daga kowanne.",
    "audioFile": "audio/p5-socs-15.mp3",
    "imageCard": "images/p5-socs-15.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Waɗanne matakai uku ne yaro zai bi idan aka matsa masa ya karɓi taba, giya, ko maganin da ba a amince da shi ba?", "correctAnswer": "cewa a’a, barin wurin, da neman taimako", "options": ["cewa a’a, barin wurin, da neman taimako", "karɓa, ɓoyewa, da gardama", "raina mutum, zagi, da tsokana"]},
      {"pauseAtMs": 150000, "questionHa": "Me kundin tsarin mulki yake bayyana?", "correctAnswer": "tsarin ƙasa, iko, haƙƙoƙi, da nauyi", "options": ["tsarin ƙasa, iko, haƙƙoƙi, da nauyi", "jadawalin wasa", "farashin kasuwa"]}
    ],
    "quizQuestions": [
      {"templateHa": "Me kula da albarkatu yake karewa?", "answerFormula": "damar masu zuwa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ɓarnatar da ruwa", "gurɓata ƙasa", "sare dukkan itatuwa"]},
      {"templateHa": "Wa doka take shafawa?", "answerFormula": "gwamnati da jama’a", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["yara kaɗai", "talakawa kaɗai", "ba kowa ba"]},
      {"templateHa": "Me yake taimaka wa warware saɓani cikin lumana?", "answerFormula": "natsuwa da sauraro", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["zagi da barazana", "ƙarya da rama", "raina juna"]},
      {"templateHa": "Waɗanne ƙungiyoyi ne suke nuna haɗin gwiwar ƙasashe?", "answerFormula": "ECOWAS, Tarayyar Afirka, da Majalisar Ɗinkin Duniya", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ajin makaranta da kasuwa", "iyali da ƙungiyar wasa", "gona da masana’anta"]},
      {"templateHa": "Waɗanne halaye ne jagoranci mai kyau yake bukata?", "answerFormula": "gaskiya, bin doka, da alhaki", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ɓoye bayani da son kai", "raina jama’a da ƙarya", "cin hanci da rashin sauraro"]}
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

The M4 P5 source batch is **build-complete as a source-only draft candidate**. All automated and Builder self-review gates pass, the 354-module scratch merge validates, and live/runtime files remain unchanged. It is **not approved, integrated, or shippable**. Architect independent review and human Hausa/content validation remain required, and `p5-socs-07` must receive Muhammad’s explicit full-content sign-off before M4 can be accepted.
