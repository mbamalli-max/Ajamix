# AJAMIX M1 P3 Social and Citizenship Studies Pilot Report

**Task ID:** AJAMIX-SOCS-M1-PILOT  
**Milestone:** M1 — P3 pilot, source-only candidate  
**Date:** 2026-07-16  
**Status:** BUILD-COMPLETE DRAFT CANDIDATE — all applicable source gates passed; not integrated, not shippable, and awaiting Architect plus human Hausa/content review.

## Deliverables

- Source candidate: tools/p3-batch/p3-socs-pilot.json
- Design-intent manifest: tools/image-manifest/p3-socs-image-manifest.json
- Report: tasks/2026-07-16-M1-p3-socs-pilot-report.md
- No image or audio asset was rendered, generated, or fetched.
- No live content or runtime file was edited.
- No git command was run.

The image manifest contains exactly six entries and uses the live eight-field schema: id, imagePath, titleEn, titleHa, type, depictEn, labelsHa, safetyNote.

## 1. Module list

| ID | titleEn | titleHa |
|---|---|---|
| p3-socs-01 | The Meaning and Importance of Social and Citizenship Studies | Ma’ana da Muhimmancin Nazarin Zamantakewa |
| p3-socs-02 | Our Local Government Area | Yankin LGA Namu |
| p3-socs-03 | Community Needs and Services | Bukatun Al’umma da Ayyukan Jama’a |
| p3-socs-04 | Transportation — Road and Rail | Sufuri ta Hanya da Jirgin Ƙasa |
| p3-socs-05 | Transportation — Air and Water | Sufuri ta Sama da Ruwa |
| p3-socs-06 | Communication — Traditional Methods | Sadarwa ta Hanyoyin Gargajiya |

## 2. Validator and structure output

Schema check: PASS.

The brief calls this an “all 21 keys” check, but §8 and live p2-socs-01 enumerate **22** keys. The candidate matches those 22 enumerated live keys exactly, in the same order, with no extras or omissions. Each module has two micro-pauses and five quiz questions. All Ajami fields are null, ajami_validated is false, and all flat-leaf/static-Q&A constants match §8.

Scratch merge:

    temporary merge written: 309 -> 315

The live validator has a hard-coded path to the adjacent app/content.json and accepts no file argument. To keep the live file read-only, an unchanged copy of the validator and the merged content were placed under /tmp/ajamix-p3-socs-pilot/app/. Validator-copy hashes prove the executable was unchanged:

    9df1ed5fbc9ef1a3973a48c7cb1daa32555eac66f22db3bdfc078e72f9d0ab2a  app/tools/validate-content.mjs
    9df1ed5fbc9ef1a3973a48c7cb1daa32555eac66f22db3bdfc078e72f9d0ab2a  /tmp/ajamix-p3-socs-pilot/app/tools/validate-content.mjs

Command:

    node /tmp/ajamix-p3-socs-pilot/app/tools/validate-content.mjs

Exit code: **0**.

    validate-content: OK — 315 module(s) pass.
      track=vocational: 10
      track=formal:     305
      isChainLeaf:      306
      chainNext set:    9

Temporary-merge preservation check: PASS.

    live modules=309; temp modules=315; delta=6
    pre-existing module mismatches=0
    P1/P2 Social modules=30; mismatches=0
    non-modules keys checked=version,generatedAt,gradeBands,activities,glossary,schemaVersion,schemaMigratedAt; mismatches=0
    temp unique IDs=true
    new tail=p3-socs-01,p3-socs-02,p3-socs-03,p3-socs-04,p3-socs-05,p3-socs-06

Aggregate hashes:

    All 309 live modules:
    4a0eedd293dcb729a2cc4a837064feebe9d0c105de13e4049f6d703957487b84
    First 309 scratch modules:
    4a0eedd293dcb729a2cc4a837064feebe9d0c105de13e4049f6d703957487b84

    P1/P2 Social Studies live objects:
    8ac69ce9e959914d52f9636938a6cd2669c8f9388e8bf93ef2fd9e5243fa3723
    P1/P2 Social Studies scratch-prefix objects:
    8ac69ce9e959914d52f9636938a6cd2669c8f9388e8bf93ef2fd9e5243fa3723

IDs are unique and moduleNumber is sequential from 1 through 6.

## 3. Hooked-letter lint

Command:

    node tools/p2-batch/hook-lint.mjs tools/p3-batch/p3-socs-pilot.json

Exit code: **0**.

    hook-lint: 0 error(s), 0 warning(s).

Warnings: **none**.

## 4. Word-count summary

Counts use whitespace-separated words in textExplanationHa.

| Module | Words | Gate |
|---|---:|---|
| p3-socs-01 | 132 | PASS |
| p3-socs-02 | 142 | PASS |
| p3-socs-03 | 154 | PASS |
| p3-socs-04 | 146 | PASS |
| p3-socs-05 | 152 | PASS |
| p3-socs-06 | 156 | PASS |

Minimum: **132**. Maximum: **156**. All six are within 120–170.

## 5. Audio-explanation alignment

Manual content comparison: PASS for 6/6.

| Module | Facts shared by prose and audio |
|---|---|
| p3-socs-01 | Studying how people live together; roles, rules, community needs, cooperation, and practical civic conduct. |
| p3-socs-02 | LGA proximity to residents, smaller subdivisions, office, example services, reporting needs, and representatives’ listening role. |
| p3-socs-03 | Community needs, public services, needs mapping, reporting to adults/authorities, and children avoiding hazardous work. |
| p3-socs-04 | Meaning of transport, road/rail examples and differences, passenger conduct, crossing safety, and rail-line safety. |
| p3-socs-05 | Air/water modes, movement of people and goods, travel/trade, staff instructions, life-jacket and capacity safety. |
| p3-socs-06 | Meaning of communication, announcer/market/drum methods, locally agreed meanings, distance/noise limits, and accurate delivery. |

The scripts are not copies of the prose, but they teach the same material facts.

## 6. Micro-pause exact-match confirmation

Automated exact string comparison: PASS, **12/12**. Each audioScript contains the exact sequence “[PAUSE N] ” followed by the corresponding microPauses[N-1].questionHa.

Micro-pause answer integrity: PASS, **12/12**. Every correctAnswer appears exactly once in its options array.

## 7. Quiz answer integrity, Q5, and OUTRO

- answerFormula absent from distractorFormulas: PASS, **30/30**.
- Exactly three distractors per quiz: PASS, **30/30**.
- Q5 is topic-specific: PASS, **6/6**.
- OUTRO is topic-specific: PASS, **6/6**.

| Module | Topic-specific Q5 focus | Topic-specific OUTRO focus |
|---|---|---|
| p3-socs-01 | Calm problem-solving | Observe cooperation at home/school |
| p3-socs-02 | Reporting a broken public pump | Ask the learner’s LGA and one service |
| p3-socs-03 | A child reporting a public-property problem | Draw a needs/service map |
| p3-socs-04 | Not playing near a rail line | Classify road/rail and recall safety |
| p3-socs-05 | Avoiding overloading a boat | Match each mode to place and safety rule |
| p3-socs-06 | Asking when an announcement is unclear | Identify sender, message, and audience |

No revision module is present in this slice, so the revision-filler gate is not applicable.

## 8. Quiz fact grounding

Automated literal-answer search against each module’s own textExplanationHa plus audioScript: PASS, **30/30**. Every answerFormula occurs literally in at least one of those two teaching fields, in addition to being semantically taught by its question context.

## 9. English-leakage scan

Result: PASS with one explicitly flagged borrowed acronym exception.

After bracketed audio markers were removed, the only uppercase non-Hausa token found in learner-facing prose, audio, pause, or quiz fields was **LGA**, with 21 field occurrences, all in p3-socs-02. No other raw English word or acronym was found manually or by the acronym scan.

LGA is used provisionally because §9 specifically identifies it as the widely used borrowed candidate. It is **not locked** by this report and requires the user’s Hausa ruling before M2. This is the task’s explicitly flagged borrowed-term exception, not a claim that the Hausa equivalent has been settled.

## 10. Cross-module quiz-answer spelling consistency

Automated normalization across every correctAnswer, option, answerFormula, and distractorFormula found three literal strings reused in more than one module:

- filin wasa — p3-socs-02 and p3-socs-04
- ɓoye matsalar — p3-socs-02 and p3-socs-03
- jirgin sama — p3-socs-04 and p3-socs-06

Variants in spelling or case: **0**.

Manual hooked-letter/token review also checked repeated scoring-field uses of haɗin kai, jama’a, ƙasa, ɓoye, ɗaukar, ɗora, saƙo, and ɓangarori. No hooked/unhooked scoring variant was found. Within each module, repeated pause/quiz answers are byte-identical.

## 11. Within-module redundancy check

Command:

    node tools/p1-batch/check-within-module-redundancy.mjs --file=tools/p3-batch/p3-socs-pilot.json

Exit code: **0**.

    Within-module redundancy check passed for 6 module(s).

Findings: **0**.

## 12. Close-paraphrase review

Manual review found no near-duplicate sentence pair across modules. As a supporting screen, token-Jaccard comparison found **0** cross-module sentence pairs at or above 0.55. Repeated functional vocabulary about people, services, safety, and reporting is topic-required rather than templated sentence reuse.

## 13. Neutrality attestation

None of these six IDs appears on §5’s explicit neutrality-review list. A precautionary six-rule check was still completed for every module:

- **p3-socs-01:** PASS — no religious, political, gender, ethnic, historical-grievance, or conflict-group framing; Kano/Katsina are ordinary Northern learner-context examples without ranking.
- **p3-socs-02:** PASS — governance roles and services are descriptive and nonpartisan; no party, candidate, office-holder, ideology, or claim that one tier alone supplies every service.
- **p3-socs-03:** PASS — community needs are framed cooperatively; no group attribution, gender assignment, or unsafe child duty.
- **p3-socs-04:** PASS — transport and safety only; no conflict-zone, political, ethnic, religious, or gender framing.
- **p3-socs-05:** PASS — international travel/trade is brief and descriptive; no national hierarchy or unsafe travel depiction.
- **p3-socs-06:** PASS — traditional communication is described respectfully, without caricature or a claim that drum meanings are universal; meanings are explicitly local and agreed.

Borderline item reviewed: p3-socs-02 touches governance. Its wording remains structural and service-focused, so no neutrality violation was found.

## 14. Sensitive-topic flags

Not applicable. The slice does not include p5-socs-07, p6-socs-03, or p6-socs-09. It contains no family-planning-adjacent objective or content.

## 15. Terminology open questions

These usages are draft candidates only. They are not locked by the Builder and require human Hausa/content ruling:

1. **Local Government Area:** Should LGA remain the borrowed acronym, or should a Hausa equivalent be used? The draft uses LGA and titleHa “Yankin LGA Namu.”
2. **Citizen / citizenship:** §9 proposes ɗan ƙasa / ƴan ƙasa, but this is not locked. To avoid interpolating it, p3-socs-01’s Hausa title uses only the locked subject label and the prose describes civic participation without naming the citizen category. Should the title explicitly add a Hausa rendering of “Citizenship Studies” after the user rules?
3. **Environment:** The draft uses muhalli, already familiar in live P2 content, but §9 still requires confirmation for this workstream.
4. **Ward:** The draft avoids a new technical noun and says ƙananan yankuna. What term should be locked?
5. **Councillor:** The draft avoids kansila and uses wakili descriptively. Should kansila, wakilin yanki, or another form be locked?
6. **Community/public service:** The draft uses hidimar jama’a for a service and ayyukan jama’a in the title. Confirm the preferred singular/plural distinction.
7. **Life jacket:** The draft uses rigar kariya. Confirm whether a more specific locked term is required.
8. **Town crier:** The draft uses mai shela. Confirm.
9. **Talking drum:** The draft uses ganga ko kalangu and says meanings are locally agreed. Confirm the preferred term and whether kalangu is sufficiently precise for this objective.
10. **Transportation / communication headings:** The draft uses sufuri and sadarwa. Confirm these workstream terms before scaling.

Other §9 questions—democracy, constitution, election/voting, pollution, migration, globalisation, drug/substance abuse, sustainability, and conflict resolution—did not arise as named concepts in these six modules and no ruling is proposed here.

## 16. app/content.json checksum before and after

The live content file was not touched.

    Before: c0aaaeaf79c010d5921ddd02bc91ce944e104cfcb7a2a5d92d3c47d84f9088bb  app/content.json
    After:  c0aaaeaf79c010d5921ddd02bc91ce944e104cfcb7a2a5d92d3c47d84f9088bb  app/content.json

Result: **IDENTICAL**.

Scratch candidate checksum, for reproducibility:

    f7b92e3504e1ce21d8770ce7fa1938b7ce1b942b8c8cfe3f01c2caa81685238f  /tmp/ajamix-p3-socs-pilot/app/content.json

Source deliverable checksums:

    6b1a06e1af852c595026f7699c62d5437e3c96e32604eda5739ddcd2e1556055  tools/p3-batch/p3-socs-pilot.json
    b4968a836c84492b38e4d95bb2665c3cd5ad084af5b48b848a46faf55b8c22e4  tools/image-manifest/p3-socs-image-manifest.json

## 17. Engine-file checksum and mtime confirmation

All six named runtime files were present. Their SHA-256 hashes and mtimes are identical before and after:

| File | mtime before/after | SHA-256 before/after |
|---|---:|---|
| app/app.js | 1783198948 | de8e10d60c1e10dbe318bb0e675a1934012758aabe56815741483c88797e37af |
| app/quiz-engine.js | 1776801044 | f6c33db5bf6c91e1edc2cf7ae2548221eed3f4e0c2a491afd61198333cc80001 |
| app/styles.css | 1783195979 | 2e90fb776b97be0187246b01ea6e39b30b91b26c2303904fb4f41a310e76a323 |
| app/index.html | 1776528520 | cae50dbe1b435a0bc2cf98ef035824866277b9fe3657cbdad00b0cee7f37dc43 |
| app/sw.js | 1783183460 | 1818967c86a62fbf802427ae2e535c939e502e99f09ae5d09e66c3f350519409 |
| app/bootstrap.js | 1776474739 | c2c64c6ac71d10e8ca5b3a87eb88229e196b7da6ab8b0892d2cc791b79cf0ce7 |

Runtime changes: **0**.

## 18. Alignment-matrix columns

Every row carries the matrix warning: **BEST-EFFORT — NOT VERIFIED AGAINST OFFICIAL NERDC GRADE DOCUMENT**.

| Module | Curriculum version / actual source | Public-source strand/topic family (not official NERDC strand) | Source page/section | Classification |
|---|---|---|---|---|
| p3-socs-01 | S1 NERDC implementation context; S3 public unified SCS P3 | Civic literacy and leadership | S1 pp. 1–3; S3 P3 SCS first term, weeks 1 and 8–10 | Enrichment |
| p3-socs-02 | S7 Lagos State MoE legacy P4 Civic/Social Studies; S1 context | Local government and citizenship | S7 pp. 22–23 and 229–230, Local Government | Enrichment |
| p3-socs-03 | S3 public unified SCS P3; S7 Lagos State MoE legacy P4/P5 Civic | Community mobilization and public services | S3 P3 SCS first term, weeks 4 and 7; S7 pp. 23 and 27 | Combined coverage |
| p3-socs-04 | S7 Lagos State MoE legacy P5 Social Studies | Transport and road safety | S7 p. 249, Transportation | Enrichment |
| p3-socs-05 | S7 Lagos State MoE legacy P6 Social Studies | Air/water transport and safety | S7 p. 262, Water and Air Transportation | Enrichment |
| p3-socs-06 | S7 Lagos State MoE legacy P4 Social Studies | Communication systems | S7 pp. 234–235, Communication | Enrichment |

No module content is presented as verified official NERDC grade wording.

## Definition-of-Done gate ledger

| Gate | Result |
|---|---|
| 1. Exact schema | PASS — enumerated/live 22-key contract; brief’s “21” count discrepancy noted |
| 2. Live validator on scratch merge | PASS — exit 0 |
| 3. Only modules grew in scratch | PASS — +6; all other sections identical |
| 4. Runtime files unchanged | PASS — six mtimes and hashes identical |
| 5. Unique/sequential IDs | PASS |
| 6. 120–170 words | PASS — 132–156 |
| 7. Audio/prose alignment | PASS |
| 8. Exact pause text | PASS — 12/12 |
| 9. Pause answer integrity | PASS — 12/12 |
| 10. Quiz answer integrity | PASS — 30/30 |
| 11. Quiz grounding | PASS — 30/30 |
| 12. Unique Q5 | PASS — 6/6 |
| 13. Unique OUTRO | PASS — 6/6 |
| 14. Revision filler | N/A — no revision module |
| 15. Raw-English leakage | PASS with flagged LGA exception required by §9/task |
| 16. Hook lint | PASS — 0 errors, 0 warnings |
| 17. Cross-module scoring spelling | PASS — 0 variants |
| 18. Within-module redundancy | PASS — 0 findings |
| 19. Close-paraphrase review | PASS — 0 findings |
| 20. Explicit-list neutrality | N/A for list; precautionary 6/6 self-check PASS |
| 21. Sensitive-topic flags | N/A |
| 22. P1/P2 Social frozen | PASS — 30/30 identical |
| 23. All pre-existing modules frozen | PASS — 309/309 identical |

## Full source module objects — verbatim

The following is the complete content of tools/p3-batch/p3-socs-pilot.json. The six JSON objects are reproduced verbatim for Hausa review.

~~~json
[
  {
    "id": "p3-socs-01",
    "gradeband": "p3",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 1,
    "titleEn": "The Meaning and Importance of Social and Citizenship Studies",
    "titleHa": "Ma’ana da Muhimmancin Nazarin Zamantakewa",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Nazarin Zamantakewa yana koya maka yadda mutane suke rayuwa tare a gida, makaranta, unguwa, da ƙasa. Yana taimaka maka ka fahimci ayyukan mutane, dokoki, al’adu, da hanyoyin taimakon juna. Idan ka san abin da al’umma take bukata, za ka iya kula da kayan jama’a, sauraron wasu, da warware matsala cikin natsuwa. Darasin yana kuma nuna maka cewa kana da muhimmiyar rawa. Za ka iya bin dokar makaranta, zuba shara a inda ya dace, girmama mutane, da faɗin gaskiya. A Kano, Katsina, ko wani gari, mutane suna da ayyuka da al’adu iri-iri, amma haɗin kai yana taimaka musu su zauna lafiya. Koyon wannan darasi ba haddace suna kawai ba ne. Yana koya maka lura, tambaya, tattaunawa, da yin abin kirki. Saboda haka, Nazarin Zamantakewa yana shirya ka ka zama mai kulawa da al’ummarka.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi ma’ana da muhimmancin Nazarin Zamantakewa. [MAIN] Nazarin Zamantakewa yana koya maka yadda mutane suke rayuwa tare a gida, makaranta, unguwa, da ƙasa. Yana bayyana ayyukan mutane, dokoki, al’adu, da taimakon juna. Idan ka fahimci bukatun al’umma, za ka iya kula da kayan jama’a, sauraron wasu, da warware matsala cikin natsuwa. [PAUSE 1] Me Nazarin Zamantakewa yake koya maka game da mutane? [MAIN] Kai ma kana da rawa a al’umma. Za ka iya bin dokar makaranta, zuba shara a inda ya dace, girmama mutane, da faɗin gaskiya. Mutane na iya samun ayyuka da al’adu iri-iri, amma haɗin kai yana taimaka musu su zauna lafiya. Wannan darasi yana koya maka lura, tambaya, tattaunawa, da yin abin kirki. [PAUSE 2] Wane hali ne yake taimaka wa mutane su zauna lafiya? [OUTRO] Ka lura da abu ɗaya da ke nuna haɗin kai a gidanku ko makarantarku; wannan shi ne Nazarin Zamantakewa a aikace.",
    "audioFile": "audio/p3-socs-01.mp3",
    "imageCard": "images/p3-socs-01.png",
    "microPauses": [
      {
        "pauseAtMs": 90000,
        "questionHa": "Me Nazarin Zamantakewa yake koya maka game da mutane?",
        "correctAnswer": "yadda mutane suke rayuwa tare",
        "options": ["yadda mutane suke rayuwa tare", "yadda ake ɓoye kaya", "yadda ake guje wa makaranta"]
      },
      {
        "pauseAtMs": 150000,
        "questionHa": "Wane hali ne yake taimaka wa mutane su zauna lafiya?",
        "correctAnswer": "haɗin kai",
        "options": ["rashin sauraro", "haɗin kai", "lalata kayan jama’a"]
      }
    ],
    "quizQuestions": [
      {
        "templateHa": "Me Nazarin Zamantakewa yake koya maka game da mutane?",
        "answerFormula": "yadda mutane suke rayuwa tare",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["yadda ake ɓoye kaya", "yadda ake tsere", "yadda ake wasa kawai"]
      },
      {
        "templateHa": "Wane abu darasin yake taimaka maka ka fahimta?",
        "answerFormula": "bukatun al’umma",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["launin takalmi", "girman kujera", "yawan ƙwallo"]
      },
      {
        "templateHa": "Wane hali ne yake taimaka wa mutane su zauna lafiya?",
        "answerFormula": "haɗin kai",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["faɗa", "rashin sauraro", "zargi"]
      },
      {
        "templateHa": "Wane aiki ne ɗalibi zai iya yi domin al’umma?",
        "answerFormula": "kula da kayan jama’a",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["lalata kujera", "jefa shara a hanya", "ƙin bin doka"]
      },
      {
        "templateHa": "Wace hanya ce Nazarin Zamantakewa yake koya maka wajen matsala?",
        "answerFormula": "warware matsala cikin natsuwa",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["yin ihu", "ƙin sauraro", "barin matsala kullum"]
      }
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p3-socs-02",
    "gradeband": "p3",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 2,
    "titleEn": "Our Local Government Area",
    "titleHa": "Yankin LGA Namu",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "LGA hukuma ce da take kusa da jama’ar gari da ƙauye. Tana kula da ayyukan da mutane suke bukata a yankinta. Ana raba yankin LGA zuwa ƙananan yankuna domin wakilai da ma’aikata su san bukatun jama’a. Akwai ofishin LGA inda ake tsara ayyuka da karɓar bayani daga al’umma. Ayyukan LGA na iya haɗawa da kula da kasuwa, wasu hanyoyi, tsaftar muhalli, wuraren ruwa, makarantu, da cibiyoyin lafiya. Ba LGA kaɗai take yin komai ba; hukumomin jiha, ma’aikata, da jama’a suna iya haɗa hannu. Idan famfon ruwa ya lalace ko shara ta taru, manya za su iya sanar da ofishin da ya dace cikin ladabi. Shugabanni da wakilai suna da alhakin sauraron bukatun jama’a da tsara yadda za a yi aiki. Sanin LGA ɗinku yana taimaka maka ka fahimci inda ake neman wasu ayyukan jama’a da yadda al’umma take shiga cikin gyara yankinta.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi yankin LGA namu. [MAIN] LGA hukuma ce da take kusa da jama’ar gari da ƙauye. Tana kula da wasu ayyukan da mutane suke bukata a yankinta. Ana raba yankin zuwa ƙananan yankuna domin wakilai da ma’aikata su san bukatun jama’a. A ofishin LGA ake tsara ayyuka da karɓar bayani. [PAUSE 1] Wace hukuma ce take kusa da jama’ar gari da ƙauye? [MAIN] Ayyukan LGA na iya haɗawa da kula da kasuwa, wasu hanyoyi, tsaftar muhalli, wuraren ruwa, makarantu, da cibiyoyin lafiya. Hukumomin jiha, ma’aikata, da jama’a su ma suna iya taimakawa. Idan wani wurin ruwa ya lalace, manya za su iya sanar da ofishin da ya dace cikin ladabi. Shugabanni da wakilai suna sauraron bukatun jama’a kuma suna tsara aiki. [PAUSE 2] Ina ake karɓar bayani game da bukatun yankin LGA? [OUTRO] Ka tambayi babba sunan LGA ɗinku da wani aikin jama’a da take yi a yankinku.",
    "audioFile": "audio/p3-socs-02.mp3",
    "imageCard": "images/p3-socs-02.png",
    "microPauses": [
      {
        "pauseAtMs": 90000,
        "questionHa": "Wace hukuma ce take kusa da jama’ar gari da ƙauye?",
        "correctAnswer": "LGA",
        "options": ["ƙungiyar wasa", "LGA", "ajin makaranta"]
      },
      {
        "pauseAtMs": 150000,
        "questionHa": "Ina ake karɓar bayani game da bukatun yankin LGA?",
        "correctAnswer": "ofishin LGA",
        "options": ["filin wasa", "cikin mota", "ofishin LGA"]
      }
    ],
    "quizQuestions": [
      {
        "templateHa": "Wace hukuma ce take kusa da jama’ar gari da ƙauye?",
        "answerFormula": "LGA",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["ajin makaranta", "ƙungiyar wasa", "gidan iyali"]
      },
      {
        "templateHa": "Wane wuri LGA za ta iya kula da shi?",
        "answerFormula": "kasuwa",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["cikin jakar ɗalibi", "ɗakin kwana", "filin wasa na gida"]
      },
      {
        "templateHa": "Me ya kamata wakilai su saurara?",
        "answerFormula": "bukatun jama’a",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["hayaniyar mota", "waƙar yara", "labarin wasa"]
      },
      {
        "templateHa": "Ina ake karɓar bayani game da bukatun yankin LGA?",
        "answerFormula": "ofishin LGA",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["ƙarƙashin gada", "cikin gona", "filin ƙwallo"]
      },
      {
        "templateHa": "Me manya za su iya yi idan famfon jama’a ya lalace?",
        "answerFormula": "sanar da ofishin da ya dace",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["ɓoye matsalar", "lalata sauran famfuna", "barin ruwa yana zuba"]
      }
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p3-socs-03",
    "gradeband": "p3",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 3,
    "titleEn": "Community Needs and Services",
    "titleHa": "Bukatun Al’umma da Ayyukan Jama’a",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Al’umma tana da bukatun da suke taimaka wa mutane su rayu cikin lafiya da kwanciyar hankali. Ruwa mai tsabta, cibiyar lafiya, hanya, makaranta, kasuwa, da tsaftataccen muhalli misalan bukatun jama’a ne. Aikin da ake yi domin biyan buƙata shi ake kira hidimar jama’a. Misali, gyaran famfo hidima ce da take taimaka wa mutane su sami ruwa. Koyarwa a makaranta da kula da marasa lafiya su ma hidimomi ne. Don gano buƙata, za ka iya lura da yankinku ka tambayi mutane cikin ladabi. Wurin da ruwa yake taruwa a hanya na iya bukatar magudanar ruwa. Makarantar da ba ta da kwandon shara na iya bukatar wurin zuba shara. Bayan gano buƙata, al’umma za ta iya sanar da hukuma ko shirya taimakon da ya dace da manya. Yara ba sa yin aiki mai haɗari, amma za su iya kula da kayan jama’a da bayar da bayani ga babba. Haɗin kai yana sa hidima ta amfani kowa.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi bukatun al’umma da ayyukan jama’a. [MAIN] Ruwa mai tsabta, cibiyar lafiya, hanya, makaranta, kasuwa, da tsaftataccen muhalli bukatun jama’a ne. Aikin da ake yi domin biyan buƙata shi ake kira hidimar jama’a. Gyaran famfo yana taimaka wa mutane su sami ruwa, koyarwa tana taimaka wa yara, kuma kula da marasa lafiya yana taimaka wa masu jinya. [PAUSE 1] Wane abu ne misalin buƙatar al’umma? [MAIN] Don gano buƙata, ka lura da yankinku kuma ka tambayi mutane cikin ladabi. Ruwa da ya taru a hanya na iya nuna buƙatar magudanar ruwa. Bayan an gano matsala, al’umma za ta iya sanar da hukuma ko shirya taimako tare da manya. Yara ba sa yin aiki mai haɗari, amma za su iya kula da kayan jama’a da gaya wa babba abin da suka gani. [PAUSE 2] Me ake kira aikin da ake yi domin biyan buƙatar jama’a? [OUTRO] Ka zana taswirar unguwarku ka nuna buƙata ɗaya da hidimar da za ta iya taimakawa.",
    "audioFile": "audio/p3-socs-03.mp3",
    "imageCard": "images/p3-socs-03.png",
    "microPauses": [
      {
        "pauseAtMs": 90000,
        "questionHa": "Wane abu ne misalin buƙatar al’umma?",
        "correctAnswer": "Ruwa mai tsabta",
        "options": ["Ruwa mai tsabta", "takalmi mai tsada", "abin wasa na mutum"]
      },
      {
        "pauseAtMs": 150000,
        "questionHa": "Me ake kira aikin da ake yi domin biyan buƙatar jama’a?",
        "correctAnswer": "hidimar jama’a",
        "options": ["sirrin gida", "hidimar jama’a", "wasan mutum ɗaya"]
      }
    ],
    "quizQuestions": [
      {
        "templateHa": "Wane abu ne misalin buƙatar al’umma?",
        "answerFormula": "Ruwa mai tsabta",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["abin wasa na mutum", "sabuwar hula", "takalmi mai tsada"]
      },
      {
        "templateHa": "Me ake kira aikin da ake yi domin biyan buƙatar jama’a?",
        "answerFormula": "hidimar jama’a",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["wasan gida", "sirrin mutum", "hutun dare"]
      },
      {
        "templateHa": "Wace hidima ce take taimaka wa yara su koyi karatu?",
        "answerFormula": "Koyarwa a makaranta",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["rufe makaranta", "ɓoye littattafai", "lalata allo"]
      },
      {
        "templateHa": "Me ruwa da ya taru a hanya zai iya nuna bukatarsa?",
        "answerFormula": "magudanar ruwa",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["ƙarin takalma", "doguwar kujera", "sabuwar ƙwallo"]
      },
      {
        "templateHa": "Wane aiki yaro zai iya yi idan ya ga matsalar kayan jama’a?",
        "answerFormula": "gaya wa babba",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["gyara abu mai haɗari shi kaɗai", "ɓoye matsalar", "lalata sauran kayan"]
      }
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p3-socs-04",
    "gradeband": "p3",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 4,
    "titleEn": "Transportation — Road and Rail",
    "titleHa": "Sufuri ta Hanya da Jirgin Ƙasa",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Sufuri yana nufin ɗaukar mutane ko kaya daga wani wuri zuwa wani. A hanya, mutane suna amfani da mota, babur, keke, da babbar mota. Babbar mota tana iya ɗaukar amfanin gona daga ƙauye zuwa kasuwa. Jirgin ƙasa kuma yana tafiya a kan layin dogo, yana ɗaukar fasinjoji ko kaya tsakanin wurare. Hanya tana kaiwa wurare da yawa, yayin da jirgin ƙasa yake bin layinsa. Tsaro yana da muhimmanci a duk tafiya. Ka zauna a wurin da ya dace, ka ɗaura abin kariya idan yana nan, kuma kada ka fitar da hannu daga mota. Kafin ka tsallaka hanya, tsaya ka duba ɓangarori biyu a wuri mai aminci, kuma ka bi umarnin babba. Kada ka yi wasa a kan hanya ko kusa da layin dogo. Kada ka tsallaka layin jirgin ƙasa idan jirgi yana zuwa. Bin dokokin hanya da na tashar jirgi yana kare ka da sauran matafiya.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi sufuri ta hanya da jirgin ƙasa. [MAIN] Sufuri yana nufin ɗaukar mutane ko kaya daga wani wuri zuwa wani. Mota, babur, keke, da babbar mota suna tafiya a hanya. Jirgin ƙasa yana tafiya a kan layin dogo, yana ɗaukar fasinjoji ko kaya. Babbar mota na iya kai amfanin gona kasuwa, jirgin ƙasa kuma yana bin layinsa tsakanin wurare. [PAUSE 1] A ina jirgin ƙasa yake tafiya? [MAIN] Tsaro yana da muhimmanci. Ka zauna a wurin da ya dace, ka ɗaura abin kariya idan yana nan, kuma kada ka fitar da hannu daga mota. Kafin ka tsallaka hanya, tsaya ka duba ɓangarori biyu a wuri mai aminci, ka bi umarnin babba. Kada ka yi wasa a hanya ko kusa da layin dogo. [PAUSE 2] Me ya kamata ka yi kafin ka tsallaka hanya? [OUTRO] A tafiyarka ta gaba, ka bambanta abin hawa na hanya da jirgin da yake bin layin dogo, sannan ka tuna da dokar tsaro ɗaya.",
    "audioFile": "audio/p3-socs-04.mp3",
    "imageCard": "images/p3-socs-04.png",
    "microPauses": [
      {
        "pauseAtMs": 90000,
        "questionHa": "A ina jirgin ƙasa yake tafiya?",
        "correctAnswer": "a kan layin dogo",
        "options": ["a cikin kasuwa", "a kan layin dogo", "a cikin kogin"]
      },
      {
        "pauseAtMs": 150000,
        "questionHa": "Me ya kamata ka yi kafin ka tsallaka hanya?",
        "correctAnswer": "tsaya ka duba ɓangarori biyu",
        "options": ["gudu ba tare da dubawa ba", "yi wasa a hanya", "tsaya ka duba ɓangarori biyu"]
      }
    ],
    "quizQuestions": [
      {
        "templateHa": "Me sufuri yake nufi?",
        "answerFormula": "ɗaukar mutane ko kaya",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["gina ɗaki", "dafa abinci", "shuka itace"]
      },
      {
        "templateHa": "A ina jirgin ƙasa yake tafiya?",
        "answerFormula": "a kan layin dogo",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["a cikin kogi", "a filin noma", "a kan rufin gida"]
      },
      {
        "templateHa": "Wane abin hawa ne yake tafiya a hanya?",
        "answerFormula": "mota",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["jirgin ruwa", "jirgin sama", "kwale-kwale"]
      },
      {
        "templateHa": "Me ya kamata ka yi kafin ka tsallaka hanya?",
        "answerFormula": "tsaya ka duba ɓangarori biyu",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["gudu ba dubawa", "rufe ido", "yi wasa a hanya"]
      },
      {
        "templateHa": "Wane wuri ne bai dace yara su yi wasa ba saboda jirgin ƙasa?",
        "answerFormula": "kusa da layin dogo",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["filin wasa", "cikin aji", "farfajiyar gida"]
      }
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p3-socs-05",
    "gradeband": "p3",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 5,
    "titleEn": "Transportation — Air and Water",
    "titleHa": "Sufuri ta Sama da Ruwa",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Ana amfani da jirgin sama da jirgin ruwa domin ɗaukar mutane da kaya. Jirgin sama yana tashi daga filin jirgin sama, yana bi ta sama, sannan ya sauka a wani fili. Yana iya kai matafiya zuwa wurare masu nisa cikin ɗan lokaci. Jirgin ruwa, kwale-kwale, da jirgin fasinja suna tafiya a ruwa kamar kogi, tafki, ko teku. Suna iya ɗaukar mutane, kifi, hatsi, da sauran kaya zuwa kasuwa ko tashar jirgi. Sufurin sama da na ruwa suna taimaka wa tafiye-tafiye da ciniki tsakanin wurare, har ma da wasu ƙasashe. Tsaro ya zama na farko. A jirgin sama, ka bi umarnin ma’aikata kuma ka ɗaura abin kariya idan an ce ka yi. A jirgin ruwa, ka sa rigar kariya, ka zauna cikin natsuwa, kuma kada a ɗora kaya ko mutane fiye da kima. Yaro ya yi tafiya tare da babba. Kada ka shiga ruwa ko jirgi kai kaɗai. Bin umarni yana kare kowa.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi sufuri ta sama da ruwa. [MAIN] Jirgin sama yana tashi daga filin jirgin sama, yana bi ta sama, sannan ya sauka a wani fili. Jirgin ruwa da kwale-kwale suna tafiya a kogi, tafki, ko teku. Dukansu suna ɗaukar mutane da kaya. Sufurin sama da na ruwa suna taimaka wa tafiye-tafiye da ciniki tsakanin wurare da wasu ƙasashe. [PAUSE 1] Daga ina jirgin sama yake tashi? [MAIN] A jirgin sama, ka bi umarnin ma’aikata kuma ka ɗaura abin kariya idan an ce ka yi. A jirgin ruwa, ka sa rigar kariya, ka zauna cikin natsuwa, kuma kada a ɗora kaya ko mutane fiye da kima. Yaro ya yi tafiya tare da babba, kada ya shiga ruwa ko jirgi shi kaɗai. [PAUSE 2] Me ya kamata matafiyi ya sa a jirgin ruwa domin tsaro? [OUTRO] Idan ka ga jirgin sama ko kwale-kwale, ka tuna wurin da yake tafiya da dokar tsaro da ta dace da shi.",
    "audioFile": "audio/p3-socs-05.mp3",
    "imageCard": "images/p3-socs-05.png",
    "microPauses": [
      {
        "pauseAtMs": 90000,
        "questionHa": "Daga ina jirgin sama yake tashi?",
        "correctAnswer": "filin jirgin sama",
        "options": ["filin jirgin sama", "cikin kasuwa", "layin dogo"]
      },
      {
        "pauseAtMs": 150000,
        "questionHa": "Me ya kamata matafiyi ya sa a jirgin ruwa domin tsaro?",
        "correctAnswer": "rigar kariya",
        "options": ["rigar kariya", "jakar kasuwa", "takalmin makaranta"]
      }
    ],
    "quizQuestions": [
      {
        "templateHa": "Daga ina jirgin sama yake tashi?",
        "answerFormula": "filin jirgin sama",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["layin dogo", "cikin kasuwa", "filin noma"]
      },
      {
        "templateHa": "A ina kwale-kwale yake tafiya?",
        "answerFormula": "a ruwa",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["a sama", "a layin dogo", "a cikin gona"]
      },
      {
        "templateHa": "Me sufurin sama da na ruwa suke taimakawa?",
        "answerFormula": "tafiye-tafiye da ciniki",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["lalata kaya", "rufe kasuwa", "hana mutane tafiya"]
      },
      {
        "templateHa": "Me ya kamata matafiyi ya sa a jirgin ruwa domin tsaro?",
        "answerFormula": "rigar kariya",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["jakar kasuwa", "hular biki", "tabarma"]
      },
      {
        "templateHa": "Wane abu ne bai dace a yi wa jirgin ruwa ba?",
        "answerFormula": "ɗora kaya ko mutane fiye da kima",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["sa rigar kariya", "bin umarnin ma’aikata", "zama cikin natsuwa"]
      }
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p3-socs-06",
    "gradeband": "p3",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 6,
    "titleEn": "Communication — Traditional Methods",
    "titleHa": "Sadarwa ta Hanyoyin Gargajiya",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Sadarwa tana nufin isar da saƙo daga mutum zuwa wani. Kafin na’urorin zamani su yawaita, al’umma suna amfani da hanyoyin gargajiya. Mai shela yana zagaya gari yana faɗa wa mutane saƙon shugabanni ko sanarwar taro. A kasuwa, ana iya yin sanarwa da babbar murya domin masu saye da masu sayarwa su ji. Ana kuma buga ganga ko kalangu da wata alama da mutanen yankin suka sani. Wani bugun ganga na iya kiran mutane zuwa taro, amma ma’anarsa tana dogara da abin da al’ummar ta amince da shi. Waɗannan hanyoyi suna amfani idan saƙo ya shafi mutanen da suke kusa. Duk da haka, iska, nisa, ko hayaniya na iya hana wasu ji. Saboda haka, mai isar da saƙo ya yi magana a sarari, ya maimaita muhimmin bayani, kuma kada ya canza saƙon. Mai sauraro kuma ya saurara da kyau ya tambaya idan bai fahimta ba. Sadarwa mai kyau tana taimaka wa al’umma ta samu bayani cikin lokaci.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi sadarwa ta hanyoyin gargajiya. [MAIN] Sadarwa tana nufin isar da saƙo daga mutum zuwa wani. Mai shela yana zagaya gari yana faɗa wa mutane sanarwar taro ko wani saƙon jama’a. A kasuwa, ana iya sanarwa da babbar murya. Ana kuma buga ganga ko kalangu da wata alama da mutanen yankin suka sani. Ma’anar bugun tana dogara da abin da al’ummar ta amince da shi. [PAUSE 1] Wa yake zagaya gari yana faɗa wa mutane sanarwa? [MAIN] Hanyoyin gargajiya suna amfani ga mutanen da suke kusa, amma nisa ko hayaniya na iya hana wasu ji. Mai isar da saƙo ya yi magana a sarari, ya maimaita muhimmin bayani, kuma kada ya canza saƙon. Mai sauraro ya saurara da kyau ya tambaya idan bai fahimta ba. [PAUSE 2] Me mai isar da saƙo ya kamata ya yi da muhimmin bayani? [OUTRO] Idan ka ji shela ko bugun sanarwa, ka lura da wanda ya aika saƙon, abin da aka faɗa, da mutanen da ake son su ji.",
    "audioFile": "audio/p3-socs-06.mp3",
    "imageCard": "images/p3-socs-06.png",
    "microPauses": [
      {
        "pauseAtMs": 90000,
        "questionHa": "Wa yake zagaya gari yana faɗa wa mutane sanarwa?",
        "correctAnswer": "Mai shela",
        "options": ["direban jirgi", "Mai shela", "ɗan wasa"]
      },
      {
        "pauseAtMs": 150000,
        "questionHa": "Me mai isar da saƙo ya kamata ya yi da muhimmin bayani?",
        "correctAnswer": "ya maimaita shi",
        "options": ["ya ɓoye shi", "ya canza shi", "ya maimaita shi"]
      }
    ],
    "quizQuestions": [
      {
        "templateHa": "Me sadarwa take nufi?",
        "answerFormula": "isar da saƙo",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["ɓoye kaya", "gina hanya", "ɗaukar ruwa"]
      },
      {
        "templateHa": "Wa yake zagaya gari yana faɗa wa mutane sanarwa?",
        "answerFormula": "Mai shela",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["direban mota", "ɗan wasa", "mai aikin gona"]
      },
      {
        "templateHa": "Wane kayan gargajiya ake iya bugawa domin isar da alama?",
        "answerFormula": "ganga ko kalangu",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["jirgin sama", "wayar hannu", "talabijin"]
      },
      {
        "templateHa": "Me zai iya hana wasu jin sanarwar gargajiya?",
        "answerFormula": "nisa ko hayaniya",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["sauraro da kyau", "magana a sarari", "maimaita bayani"]
      },
      {
        "templateHa": "Me ya kamata mai sauraro ya yi idan bai fahimci shela ba?",
        "answerFormula": "ya tambaya",
        "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}},
        "distractorFormulas": ["ya canza saƙon", "ya faɗa wa mutane ƙarya", "ya yi kamar ya ji"]
      }
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  }
]
~~~

## Handoff

This is a source-only draft candidate. Architect review and human Hausa/content approval remain mandatory. No integration, merge, commit, push, asset rendering, or rollback action was performed.

