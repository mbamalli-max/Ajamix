# AJAMIX M5 P6 Social and Citizenship Studies Complete Report

**Task:** `AJAMIX-SOCS-M5-P6-COMPLETE`  
**Status:** BUILD-COMPLETE SOURCE-ONLY DRAFT CANDIDATE — requires Architect review, human Hausa/content review, and the user’s explicit full-content sign-off on `p6-socs-09`; not integrated or shippable.  
**Date:** 2026-07-17  
**Scope:** Exactly `p6-socs-01..15`; no live content, runtime, image, or audio mutation.

> [!CAUTION]
> **MANDATORY HUMAN APPROVAL GATE — `p6-socs-09`:** M5 and the full P3–P6 workstream must not be treated as accepted until Muhammad explicitly reviews and signs off the complete Hausa content reproduced in §14. Automated, safety-boundary, and Architect gates do not replace this sign-off.

## Deliverables

- `tools/p6-batch/p6-socs-complete.json` — exactly 15 module objects.
- `tools/image-manifest/p6-socs-image-manifest.json` — exactly 15 compact eight-field design-intent entries.
- `tasks/2026-07-17-M5-p6-socs-complete-report.md` — this gate report, including all 15 source objects verbatim.
- Temporary validation tree only: `/tmp/ajamix-p6-socs-complete/`.

`app/content.json` was read and copied into the temporary tree but was not edited. No runtime/engine file was edited. No image or audio was fetched, rendered, or generated. No Git command was run.

## 1. Module list

| ID | titleEn | titleHa |
|---|---|---|
| `p6-socs-01` | Globalisation and Its Effects | Haɗuwar Duniya ta Ciniki, Fasaha, da Sadarwa |
| `p6-socs-02` | Human Rights — Deeper Study | Haƙƙin Ɗan Adam — Nazari Mai Zurfi |
| `p6-socs-03` | Gender Equality and Women's Empowerment | Daidaiton Matsayin Mata da Maza a Zama Ƴan Ƙasa |
| `p6-socs-04` | Sustainable Development | Ci Gaba Mai Kare Damar Masu Zuwa |
| `p6-socs-05` | Electoral Process — Deeper Study | Matakan Zaɓe — Nazari Mai Zurfi |
| `p6-socs-06` | The Nigerian Judiciary — Protecting Rights | Reshen Shari’a na Nijeriya — Kare Haƙƙoƙi |
| `p6-socs-07` | Social Cohesion — Inter-ethnic and Inter-religious Tolerance | Haɗin Kan Al’umma — Haƙuri Tsakanin Al’ummomi da Addinai |
| `p6-socs-08` | Migration — Internal and International | Sauya Wurin Zama — Cikin Ƙasa da Ketare |
| `p6-socs-09` | Safety and Security — Staying Safe as a Citizen | Aminci da Tsaro — Yadda Ɗan Ƙasa Zai Tsare Kansa |
| `p6-socs-10` | Technology and Society | Fasaha da Al’umma |
| `p6-socs-11` | Civic Role Models in Nigeria | Mutanen Koyi a Aikin Ɗan Ƙasa a Nijeriya |
| `p6-socs-12` | Population Growth and Civic Responsibility | Ƙaruwar Jama’a da Nauyin Ɗan Ƙasa |
| `p6-socs-13` | Entrepreneurship and Self-Reliance | Kafa Sana’a da Dogaro da Kai |
| `p6-socs-14` | Peace Education and Conflict Prevention | Ilimin Zaman Lafiya da Hana Saɓani |
| `p6-socs-15` | Revision and Consolidation — Bridge to JSS1 | Bita da Ƙarfafawa — Shiri Zuwa Ajin Farko na Sakandare |

## 2. Validator and structure output

Final temporary merge composition:

```text
temporary merge refreshed: 309 + 15 P3 + 15 P4 + 15 P5 + 15 P6 = 369
only modules grew: true
all 309 pre-existing objects frozen: true
pre-existing aggregate=4a0eedd293dcb729a2cc4a837064feebe9d0c105de13e4049f6d703957487b84
scratch-prefix aggregate=4a0eedd293dcb729a2cc4a837064feebe9d0c105de13e4049f6d703957487b84
P1/P2 Social Studies count=30 aggregate=8ac69ce9e959914d52f9636938a6cd2669c8f9388e8bf93ef2fd9e5243fa3723
unique IDs: true (369/369)
```

The scratch additions were the approved P3 M1 and M2 files, the approved P4 M3 file, the approved P5 M4 file, and this M5 P6 batch. Existing sections other than `modules[]` were canonically identical.

```text
node app/tools/validate-content.mjs

validate-content: OK — 369 module(s) pass.
  track=vocational: 10
  track=formal:     359
  isChainLeaf:      360
  chainNext set:    9
```

Exit code: **0**.

Schema/sequence assertions: **PASS** — 15/15 modules have exactly the 22 §8 keys in contract order; IDs are `p6-socs-01..15`; `moduleNumber` is 1–15; every module has exactly two micro-pauses and five quiz questions; all Ajami fields are `null`; every `ajami_validated` is `false`; paths match IDs; every leaf, track, and audience field matches the contract.

Image-manifest assertion: **PASS** — 15/15 entries, unique sequential IDs, ID-matched paths, module-matched titles, and exactly these eight keys: `id`, `imagePath`, `titleEn`, `titleHa`, `type`, `depictEn`, `labelsHa`, `safetyNote`.

## 3. Hooked-letter lint

```text
node tools/p2-batch/hook-lint.mjs tools/p6-batch/p6-socs-complete.json

hook-lint: 0 error(s), 0 warning(s).
```

Exit code: **0**. ERRORS: **0**. WARNINGS: **0**. No linter warning awaits adjudication.

## 4. Word-count summary

| ID | Words | Result |
|---|---:|---|
| `p6-socs-01` | 151 | PASS |
| `p6-socs-02` | 162 | PASS |
| `p6-socs-03` | 163 | PASS |
| `p6-socs-04` | 165 | PASS |
| `p6-socs-05` | 170 | PASS |
| `p6-socs-06` | 170 | PASS |
| `p6-socs-07` | 170 | PASS |
| `p6-socs-08` | 170 | PASS |
| `p6-socs-09` | 169 | PASS |
| `p6-socs-10` | 163 | PASS |
| `p6-socs-11` | 170 | PASS |
| `p6-socs-12` | 168 | PASS |
| `p6-socs-13` | 169 | PASS |
| `p6-socs-14` | 170 | PASS |
| `p6-socs-15` | 157 | PASS |

Minimum: **151**. Maximum: **170**. Out of range: **0/15**.

## 5. Audio-explanation alignment

Manual topic-by-topic review: **PASS, 15/15**. Every audio script teaches the same core facts, distinctions, and safety limits as its prose while sequencing them for listening. In particular, `p6-socs-06` preserves the branching court structure; `p6-socs-08` preserves the border distinction between internal displacement and refugee movement; `p6-socs-09` preserves only the permitted safety actions; `p6-socs-11` keeps the five civic contributions central; and `p6-socs-15` genuinely consolidates P3–P6 rather than only P6.

No audio script introduces a quiz fact absent from the same module’s prose or audio teaching.

## 6. Micro-pause exact-match confirmation

Programmatic exact-string comparison: **PASS, 30/30**.

- `[PAUSE 1]` is followed by `microPauses[0].questionHa` verbatim in all 15 modules.
- `[PAUSE 2]` is followed by `microPauses[1].questionHa` verbatim in all 15 modules.
- Each `correctAnswer` occurs exactly once in its three-option array: **30/30**.
- Pause times are exactly 90,000 ms and 150,000 ms in every module.

## 7. Quiz answer integrity, Q5, and OUTRO

- Correct answer present among its own distractors: **0/75**.
- Static placeholder ranges exactly `{a:{min:0,max:0}, b:{min:0,max:0}}`: **75/75**.
- Topic-specific fifth questions: **15/15**, with **15 unique exact Q5 strings**.
- Topic-specific OUTROs: **15/15**, with **15 unique exact OUTRO strings**.
- `p6-socs-15` Q5 and OUTRO explicitly connect the full P3–P6 arc and readiness for secondary-school inquiry.

Result: **PASS**.

## 8. Quiz fact grounding

Manual question-by-question review: **PASS, 75/75**. Every correct answer is stated directly or taught by an unambiguous close grammatical paraphrase in the same module’s `textExplanationHa` or `audioScript`. No question depends on an external fact that the learner was not taught.

Authoritative fact support used during authoring:

- Human-rights categories: [UN Human Rights — the two Covenants](https://2covenants.ohchr.org/About-The-Covenants.html).
- Election-day, counting, collation, and result roles: [INEC election-day guidance](https://www.inecnigeria.org/what-happens-on-election-day/) and [INEC collation/declaration guidance](https://www.inecnigeria.org/collation-and-declaration-of-results/).
- Internal displacement/refugee distinction and retained rights: [UNHCR internally displaced people](https://www.unhcr.org/about-unhcr/who-we-protect/internally-displaced-people) and [UNHCR refugee overview](https://www.unhcr.org/about-unhcr/who-we-protect/refugees).
- Three dimensions of sustainable development: [United Nations sustainable-development overview](https://www.un.org/sustainabledevelopment/blog/2023/08/what-is-sustainable-development/).
- Current institution names and mandates: [Bank of Agriculture](https://boanig.com/about-boa/) and [Bank of Industry](https://www.boi.ng/about/).

No population statistic was used.

## 9. Raw-English leakage scan

Targeted case-insensitive scan of all learner-facing Hausa fields found **zero raw English topic terms**. Locked Hausa or descriptive forms are used for the substantive concepts. The only unbracketed capital acronyms are `INEC`, `UNHCR`, and `BOI`, each an official institution acronym explicitly introduced or contextually identified. Script markers `[INTRO]`, `[MAIN]`, `[PAUSE 1]`, `[PAUSE 2]`, and `[OUTRO]` are contract-required and excluded from leakage findings. Proper personal names are not English leakage.

`P3` and `P6` do not occur in Hausa prose, audio, pause, or quiz fields; the consolidation module says `aji uku zuwa aji shida`.

Result: **PASS**.

## 10. Cross-module quiz-answer spelling consistency

Programmatic inventory found **10 exact strings reused across more than one module** and no competing spellings:

`ɓarnatar da ruwa`; `duk wani mai kallo`; `jita-jita`; `kotun al’ada`; `ƙungiyar wasa`; `lalata kayan jama’a`; `mai yaɗa jita-jita`; `majalisar ɗalibai`; `rufe dukkan kasuwanni`; `yaɗa jita-jita`.

Locked-term whole-batch checks also confirmed one spelling for `ɗan ƙasa` / `ƴan ƙasa`, `ƙaramar hukuma`, `muhalli`, `sufuri`, `sadarwa`, `sauya wurin zama`, `reshen zartarwa`, `reshen kafa doka`, `reshen shari’a`, `dimokuradiyya`, `kundin tsarin mulki`, `zaɓe`, and `jefa ƙuri’a`. Result: **PASS**.

## 11. Within-module redundancy check

```text
node tools/p1-batch/check-within-module-redundancy.mjs --file=tools/p6-batch/p6-socs-complete.json

Within-module redundancy check passed for 15 module(s).
```

Exit code: **0**. Findings: **0**.

## 12. Close-paraphrase manual review

A cross-module sentence comparison at Jaccard similarity ≥ 0.62 found **0 candidate pairs**. Manual review of the repeated civic vocabulary found no sentence pair that merely restates another module’s lesson. Necessary conceptual bridges are purposeful: rights connect to courts, election petitions, gender citizenship, migration, and revision; safety wording connects to prior disaster-preparedness practice without copying it. Result: **PASS — no close-paraphrase issue to adjudicate**.

## 13. Neutrality attestations

| Module | Builder attestation |
|---|---|
| `p6-socs-02` | PASS — rights are universal and interdependent; redress is evidence-based and lawful; no party, ideology, religion, gender, ethnicity, or social group is ranked or blamed. |
| `p6-socs-03` | PASS — equal civic standing, girls’ education, and access to every lawful occupation are taught as citizenship; no domestic-role prescription, marriage, reproduction, or critique of family, culture, or religion appears. |
| `p6-socs-05` | PASS — INEC roles and electoral stages are descriptive; no candidate, party, platform, colour, ideology, campaign choice, or election outcome is endorsed. |
| `p6-socs-07` | PASS — all ethnic and religious communities have equal standing; no named conflict, sect, armed group, historical grievance, conversion message, or group attribution appears. |
| `p6-socs-09` | PASS — the module contains only general immediate-safety actions; no person or group is described as a threat and no profiling, operational, conflict, or security-service framing appears. Full boundary audit and sign-off packet follow in §14. |
| `p6-socs-11` | PASS — the five Architect-selected Nigerians are equal-sized civic examples; contribution, not partisan endorsement or historical narrative, is the substance, and no person is placed above law. |

Every other module was also checked against brief §5. No religious prescription, political endorsement, gender stereotype, ethnic ranking, group-attributed national problem, named live conflict, or primarily historical narrative was found.

## 14. MANDATORY `p6-socs-09` full-content sign-off packet

> [!CAUTION]
> **USER ACTION REQUIRED:** Muhammad must read and explicitly approve the complete Hausa content below before M5 or the P3–P6 workstream is accepted. Automated compliance is necessary but not sufficient.

### Boundary audit

- **Required title:** PASS. The title is exactly `Safety and Security — Staying Safe as a Citizen`, not the retired title.
- **Immediate-distance action only:** PASS. The learner moves away from immediate physical danger to a safe place and does not stop to watch or return for belongings.
- **Unknown-object boundary:** PASS. The learner is told not to touch, move, open, or carry an unknown or unexplained object and to tell a trusted adult.
- **Instruction boundary:** PASS. The learner follows a parent, teacher, responsible venue worker, or verified official directing people during an emergency.
- **Trusted-adult/emergency-help boundary:** PASS. The learner tells a trusted adult; an adult may contact the appropriate emergency service. No number is invented.
- **General safety only:** PASS. Exit routes, planned assembly points, calm behaviour, and avoiding rumours are the only additional neighbourhood/school safety concepts.
- **No group names:** PASS. No extremist, militant, armed, real, or invented group is named or implied.
- **No tactics or attack methods:** PASS. No operational description, method, capability, target, sequence, or countermeasure appears.
- **No recruitment content:** PASS. No narrative, indicator, sign, approach, or warning-sign framework appears.
- **No conflict-zone example:** PASS. No current or historical conflict location, actor, event, or service operation appears.
- **No profiling:** PASS. No religion, ethnicity, clothing, appearance, behaviour, or community is used to identify danger; the learner-facing content does not discuss profiling at all.
- **No community-level warning signs:** PASS. No person, place, object pattern, behaviour pattern, or neighbourhood indicator is offered as a sign to monitor.
- **No child investigation or rescue:** PASS. The module expressly limits the child’s role to moving away, following instructions, and telling a trusted adult.
- **Image boundary:** PASS. The manifest requires a plain, abstract geometric three-step symbol and absolutely prohibits weapons, danger scenes, threatening people or groups, crowds, uniforms, operational cues, profiling cues, real logos, and phone numbers.

### Complete learner-facing Hausa content — verbatim

```json
{
  "titleHa": "Aminci da Tsaro — Yadda Ɗan Ƙasa Zai Tsare Kansa",
  "textExplanationHa": "Tsare kai a matsayin ɗan ƙasa yana nufin yin natsattsen zaɓi idan akwai haɗari. Idan ka ga haɗari na zahiri nan take, ka nisanta zuwa inda yake da aminci; kada ka tsaya domin kallo ko ka koma ɗaukar kaya. Idan ka ga abin da ba ka sani ba ko abin da aka bari ba tare da bayani ba, kada ka taɓa shi, motsa shi, buɗe shi, ko ɗauka. Ka koma nesa ka gaya wa amintaccen babba. A makaranta, kasuwa, unguwa, ko tafiya, ka saurari umarnin iyaye, malami, ma’aikacin wurin, ko jami’in da aka tantance yana jagorantar mutane a gaggawa. Kada ka yaɗa jita-jita ko hoton da zai ƙara ruɗani. Idan ana bukatar taimakon gaggawa, babba zai iya kiran lambar gaggawa da ta dace; kada a ƙirƙiri lamba. Ka san inda za ka haɗu da iyali ko ajinku bayan umarnin fita. Ka kula da hanyar fita da wurin taruwar da manya suka tsara. Aikin yaro shi ne nisanta, bin umarni, da sanar da amintaccen babba, ba bincike ko ceto ba.",
  "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi yadda ɗan ƙasa zai tsare kansa. [MAIN] Idan akwai haɗari na zahiri nan take, ka nisanta zuwa wuri mai aminci. Kada ka tsaya domin kallo. Idan ka ga abin da ba ka sani ba, kada ka taɓa, motsa, buɗe, ko ɗauka; ka gaya wa amintaccen babba. [PAUSE 1] Me za ka yi idan ka ga wani abu da ba ka sani ba? [MAIN] Ka bi umarnin babban ko jami’in da yake jagorantar mutane a gaggawa. Kada ka yaɗa jita-jita. Babba zai iya kiran lambar gaggawa da ta dace. Aikin yaro shi ne nisanta, bin umarni, da sanarwa. [PAUSE 2] Mene ne aikin yaro a lokacin gaggawa? [OUTRO] Ka maimaita matakai uku na aminci: nisanta, kada ka taɓa abin da ba ka sani ba, sannan ka sanar da amintaccen babba.",
  "microPauses": [
    {
      "pauseAtMs": 90000,
      "questionHa": "Me za ka yi idan ka ga wani abu da ba ka sani ba?",
      "correctAnswer": "kada na taɓa shi; in nisanta in sanar da babba",
      "options": [
        "kada na taɓa shi; in nisanta in sanar da babba",
        "in buɗe shi domin dubawa",
        "in ɗauka zuwa gida"
      ]
    },
    {
      "pauseAtMs": 150000,
      "questionHa": "Mene ne aikin yaro a lokacin gaggawa?",
      "correctAnswer": "nisanta, bin umarni, da sanar da babba",
      "options": [
        "nisanta, bin umarni, da sanar da babba",
        "binciken wurin shi kaɗai",
        "tsayawa domin kallo"
      ]
    }
  ],
  "quizQuestions": [
    {
      "templateHa": "Me za ka fara yi idan akwai haɗari na zahiri nan take?",
      "answerFormula": "nisanta zuwa wuri mai aminci",
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
        "tsaya domin kallo",
        "koma ɗaukar kaya",
        "kusanci wurin"
      ]
    },
    {
      "templateHa": "Me bai kamata ka yi da abin da ba ka sani ba?",
      "answerFormula": "taɓa, motsa, buɗe, ko ɗauka",
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
        "nisanta daga gare shi",
        "sanar da amintaccen babba",
        "bin umarnin babba"
      ]
    },
    {
      "templateHa": "Umarnin wa za ka bi a gaggawa?",
      "answerFormula": "babban ko jami’in da yake jagorantar mutane",
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
        "mai yaɗa jita-jita",
        "duk wani mai kallo",
        "wanda yake ƙara ruɗani"
      ]
    },
    {
      "templateHa": "Wa zai iya kiran lambar gaggawa da ta dace?",
      "answerFormula": "babba",
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
        "wanda ya ƙirƙiri lamba",
        "mai son yaɗa jita-jita",
        "wanda bai san inda yake ba"
      ]
    },
    {
      "templateHa": "Me ya sa bai dace a yaɗa jita-jita a lokacin gaggawa ba?",
      "answerFormula": "za su iya ƙara ruɗani",
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
        "suna nuna hanyar fita",
        "suna maye gurbin umarnin babba",
        "suna tabbatar da kowane bayani"
      ]
    }
  ]
}
```

### Sign-off question

**Does the user explicitly approve the complete `p6-socs-09` Hausa content above, including its title, prose, audio, pauses, quiz questions, immediate-distance/unknown-object/trusted-adult framing, and every boundary treatment?** Until the answer is explicitly yes, this gate remains **OPEN**, M5 remains a draft candidate, and the P3–P6 workstream cannot be considered accepted.

## 15. `p6-socs-03` pre-approved tone-compliance confirmation

The pre-approved framing was followed exactly:

1. **Girls’ civic right to education and lawful occupation:** the prose says, `A matsayin ƴan ƙasa, ’ya mace da ɗa namiji suna da mutunci da haƙƙin koyo.` It then says, `Ilimi yana ba ta damar zaɓar duk wata sana’a ta halal da doka ta yarda da ita` and gives education, health, farming, engineering, law, business, technology, and public service as non-ranked examples.
2. **Women as civic role models:** the prose says, `Mata a Nijeriya suna aiki a makarantu, asibitoci, kotuna, hukumomi, kasuwanni, gonaki, ɗakunan bincike, da ƙungiyoyin al’umma.` It focuses on public, professional, and community contributions without inventing a named woman.
3. **Citizenship, not cultural critique:** the prose says, `Wannan darasi yana magana ne kan daidaiton matsayin ƴan ƙasa; ba ya sukar iyali, al’ada, ko addini.`
4. **Explicit exclusions:** targeted and manual review found no domestic-role prescription, marriage content, pregnancy, childbirth, reproduction, or family-planning content in the title, prose, audio, pauses, quizzes, or image intent.

The manifest repeats the same constraint and requires equal educational and occupational opportunity only. Result: **PASS — tone matches the user’s 2026-07-17 pre-approval without deviation**.

## 16. `p6-socs-06` court-structure fact check and non-ladder confirmation

Facts verified before authoring:

- The [Supreme Court of Nigeria jurisdiction page](https://supremecourt.gov.ng/court-jurisdiction) identifies it as Nigeria’s apex court, with original jurisdiction in specified disputes and appellate jurisdiction from the Court of Appeal.
- The [Court of Appeal of Nigeria](https://courtofappeal.gov.ng/) identifies itself as the penultimate appellate court between High Courts and the Supreme Court.
- The [FCT High Court Department of Magistrates](https://www.fcthighcourt.gov.ng/magistrate/) confirms that Magistrate/District Courts exercise civil and criminal jurisdiction and that appeals from those courts go to the FCT High Court; this supports the age-appropriate statement that Magistrate Courts handle many first matters and High Courts hear some appeals.
- The [National Judicial Council Code of Conduct](https://njc.gov.ng/code-of-conduct) expressly lists the Supreme Court, Court of Appeal, Federal High Court, National Industrial Court, State/FCT High Courts, Sharia Courts of Appeal, and Customary Courts of Appeal, supporting the honest plural structure.
- The constitutional text consulted was the [Constitution of the Federal Republic of Nigeria](https://lawsofnigeria.placng.org/laws/C23.pdf), including the separate federal/state, Sharia, and customary court provisions.

Required framing audit: **PASS**. The module teaches exactly that Magistrate Courts begin many cases; High Courts hear important matters and some appeals; the Court of Appeal reviews specified decisions; and the Supreme Court is the highest court. It then states: `Tsarin kotunan Nijeriya ba tsani guda ba ne` and describes state, federal, Sharia, and customary court structures with legally limited roles and differing appeal routes. The OUTRO asks for a branching map, `ba tsani guda ba`. No false single linear ladder appears in the module or manifest.

## 17. Terminology audit and open questions

### Now-available formal terms used

| Term | Use in M5 |
|---|---|
| `zaɓe` | Used in `p6-socs-02`, throughout `p6-socs-05`, and in `p6-socs-15`. |
| `jefa ƙuri’a` | Used throughout `p6-socs-05` and in `p6-socs-15`. |
| `dimokuradiyya` | Used in `p6-socs-05` and `p6-socs-15`. |
| `kundin tsarin mulki` | Used in `p6-socs-06` and `p6-socs-15`. |

Other locked terms used without variation include `ɗan ƙasa` / `ƴan ƙasa`, `ƙaramar hukuma`, `muhalli`, `sufuri`, `sadarwa`, `intanet`, `gurɓata`, `kiwo`, `sauya wurin zama`, `reshen zartarwa`, `reshen kafa doka`, `reshen shari’a`, and `Yankin Babban Birnin Tarayya`.

### Every open terminology question

| Concept | M5 treatment and requested ruling |
|---|---|
| Formal pollution noun | Still open. M5 does not coin one; `gurɓata muhalli` remains the descriptive locked pattern where recalled. |
| Globalisation | Still open. `p6-socs-01` deliberately uses the descriptive title `Haɗuwar Duniya ta Ciniki, Fasaha, da Sadarwa`; user may confirm this descriptive pattern or rule a formal noun. |
| Formal drug/substance-abuse noun | Still open and not needed in P6. No new term was coined. |
| Sustainability | Still open. `p6-socs-04` uses `Ci Gaba Mai Kare Damar Masu Zuwa` and explains the three pillars descriptively; user may confirm this pattern or rule a formal noun. |
| Conflict resolution | Still open as a formal noun. M5 continues the accepted descriptive phrase `warware saɓani cikin lumana`; user may lock or replace it. |
| UN body labels `Babban Taro` / `Kwamitin Tsaro` | Still open. They are not reused in P6 learner-facing content, so no new ruling was assumed. |
| Technical electoral ward | Still open. `p6-socs-05` does not need a ward term and therefore does not interpolate one. |
| Internal displacement learner term | New P6 review question: the draft uses the descriptive `mutumin da ya rasa matsuguni a cikin gida`; user should confirm or replace this learner-facing phrase before integration. |
| Refugee learner term | New P6 review question: the draft uses `ɗan gudun hijira`; user should confirm this form before integration. |
| Court of Appeal | New P6 review question: the draft uses transparent `Kotun Ɗaukaka Ƙara`; user should confirm the institutional label. |
| Magistrate Court | New P6 review question: the draft uses `kotun majistare`; user should confirm this borrowed institutional form. |
| Bank of Agriculture / Bank of Industry | New P6 review question: the draft uses `Bankin Aikin Gona na Nijeriya` and `Bankin Masana’antu`, with official acronym `BOI`; user should confirm the Hausa labels while the verified English institution names remain authoritative. |
| Cyberbullying | New P6 review question: no borrowed formal noun was coined; `p6-socs-10` uses `cin zarafi ta intanet` descriptively. User should confirm or replace this phrase. |
| Social cohesion | New P6 review question: no formal noun was coined; `p6-socs-07` uses `haɗin kan al’umma` descriptively. User should confirm this pattern. |

No uncertain term was silently declared locked.

## 18. Scope, checksums, and frozen-content confirmation

`shasum -a 256` before and after authoring produced the same live/runtime hashes:

```text
c0aaaeaf79c010d5921ddd02bc91ce944e104cfcb7a2a5d92d3c47d84f9088bb  app/content.json
de8e10d60c1e10dbe318bb0e675a1934012758aabe56815741483c88797e37af  app/app.js
f6c33db5bf6c91e1edc2cf7ae2548221eed3f4e0c2a491afd61198333cc80001  app/quiz-engine.js
2e90fb776b97be0187246b01ea6e39b30b91b26c2303904fb4f41a310e76a323  app/styles.css
cae50dbe1b435a0bc2cf98ef035824866277b9fe3657cbdad00b0cee7f37dc43  app/index.html
1818967c86a62fbf802427ae2e535c939e502e99f09ae5d09e66c3f350519409  app/sw.js
c2c64c6ac71d10e8ca5b3a87eb88229e196b7da6ab8b0892d2cc791b79cf0ce7  app/bootstrap.js
```

The before/after mtimes and byte sizes also matched:

```text
app/content.json|1783975777|1656310
app/app.js|1783198948|273048
app/quiz-engine.js|1776801044|7433
app/styles.css|1783195979|46864
app/index.html|1776528520|2620
app/sw.js|1783183460|5398
app/bootstrap.js|1776474739|349
```

- Live module count remained **309**.
- P1/P2 Social Studies frozen aggregate matched before and after scratch merge.
- All 309 pre-existing module objects matched before and after scratch merge.
- `gradeBands`, `glossary`, and `activities` were canonically identical.
- No runtime/engine file changed.
- No P3, P4, or P5 source or manifest file changed.

Result: **PASS**.

## 19. Alignment-matrix references

Every row remains `BEST-EFFORT — NOT VERIFIED AGAINST OFFICIAL NERDC GRADE DOCUMENT`, as declared in M0.

| Module | M0 source basis | Public-source topic family | Source section | Classification | M5 note |
|---|---|---|---|---|---|
| `p6-socs-01` | S6 + S7 + S1 | Globalisation, trade, culture, technology | S6 P6 second term week 4; S7 pp.255–260; S1 pp.1–3 | Direct | Opportunities and challenges balanced. |
| `p6-socs-02` | S6 + S9 + S7 | Human rights, responsibilities, redress | S6 P6 second term week 7; S9 Human Rights; S7 pp.34–36 | Combined | Categories and lawful redress retained. |
| `p6-socs-03` | S7 + S1 + S6 | Gender equality and inclusion | S7 p.263; S1 p.4; S6 second term | Direct | User-pre-approved civic framing followed. |
| `p6-socs-04` | S1 + S6 | Sustainability and community development | S1 p.3; S6 third term week 9 | Enrichment | Three pillars sourced to UN and taught descriptively. |
| `p6-socs-05` | S6 + S5 | Electoral process and credible elections | S6 second term week 1; S5 second term weeks 4,7 | Direct | INEC facts rechecked; strictly nonpartisan. |
| `p6-socs-06` | S11 + S7 + S1 | Judiciary, rule of law, rights | S11 Jurisdiction/About; S7 p.29; S1 p.3 | Enrichment | Official legal fact check and non-ladder treatment completed. |
| `p6-socs-07` | S7 + S4 + S1 | Tolerance, peace, diversity, cohesion | S7 pp.256–258,263–265; S4 first term; S1 p.3 | Direct | No named conflict, sect, actor, or historical grievance. |
| `p6-socs-08` | S5 + S6 + S7 | Migration, displacement, protection | S5 third term; S6 second term weeks 8–10; S7 pp.249–251,259 | Enrichment | UNHCR definitions verified; no figure or live example. |
| `p6-socs-09` | S4 + S5 + S6 | Personal and neighbourhood safety | S4 third term; S5 third term; S6 third term | Enrichment | Narrow safety boundary and human sign-off gate preserved. |
| `p6-socs-10` | S1 + S6 | Digital citizenship and online safety | S1 pp.1–3; S6 second/third terms | Combined | Privacy and trusted-adult response only. |
| `p6-socs-11` | S7 + S6 | National service and civic role models | S7 pp.32–33; S6 third term weeks 9–10 | Combined | Exactly five Architect-selected names; one sentence each. |
| `p6-socs-12` | S7 + S6 | Population, services, resources, planning | S7 pp.250–252,261; S6 demography | Combined | Qualitative only; no statistic or family-size messaging. |
| `p6-socs-13` | S6 + S7 + S1 | Entrepreneurship and national development | S6 second term week 2/third term week 9; S7 pp.233,259; S1 p.3 | Direct | BOA and BOI current official names verified; NACRDB absent. |
| `p6-socs-14` | S7 + S1 | Peace, tolerance, cooperation | S7 pp.263–265; S1 p.3 | Direct | No operational conflict detail or current actor. |
| `p6-socs-15` | S6 | Consolidation and secondary-school citizenship | S6 third term weeks 10–12 | Direct | Genuine full P3–P6 consolidation. |

No M0 mapping classification was changed.

## 20. Definition-of-Done summary

| Gate | Result |
|---|---|
| 1. Exact schema | PASS |
| 2. Temporary validator | PASS — exit 0, 369 modules |
| 3. Only scratch `modules[]` grew | PASS |
| 4. Runtime files unchanged | PASS |
| 5. IDs and sequence | PASS |
| 6. 120–170 words | PASS — 151–170 |
| 7. Audio alignment | PASS — 15/15 |
| 8. Pause text exact | PASS — 30/30 |
| 9. Pause answer integrity | PASS — 30/30 |
| 10. Quiz answer integrity | PASS — 75/75 |
| 11. Quiz grounding | PASS — 75/75 |
| 12. Topic-specific Q5 | PASS — 15/15 |
| 13. Topic-specific OUTRO | PASS — 15/15 |
| 14. Revision consolidation | PASS — full P3–P6 |
| 15. Raw-English leakage | PASS — only flagged official acronyms |
| 16. Hook lint | PASS — exit 0, zero warnings |
| 17. Cross-module scoring strings | PASS |
| 18. Within-module redundancy | PASS — exit 0 |
| 19. Close paraphrases | PASS — none |
| 20. Neutrality attestations | PASS — six explicit attestations |
| 21. Sensitive-topic flags | **OPEN HUMAN GATE — `p6-socs-09` explicit sign-off required; `p6-socs-03` tone compliance passes** |
| 22. P1/P2 Social Studies frozen | PASS |
| 23. All pre-existing modules frozen | PASS |

## 21. Full 15-module source JSON — verbatim

The following fenced block is a byte-for-byte textual copy of `tools/p6-batch/p6-socs-complete.json`.

```json
[
  {
    "id": "p6-socs-01",
    "gradeband": "p6",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 1,
    "titleEn": "Globalisation and Its Effects",
    "titleHa": "Haɗuwar Duniya ta Ciniki, Fasaha, da Sadarwa",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "A yau ƙasashe da al’ummomi suna ƙara haɗuwa ta ciniki, sufuri, sadarwa, fasaha, da musayar ilimi. Wayar hannu da intanet suna sa labari ko sabuwar dabara ta isa Nijeriya daga nesa cikin sauri. Ciniki yana kawo kayayyaki daga wasu ƙasashe, yana kuma ba masu sana’ar Nijeriya damar kai nasu kaya kasuwannin waje. Haɗuwar nan tana iya buɗe damar koyo, aiki, da sabuwar fasaha. Tana kuma iya kawo ƙalubale: gasa ga ƙananan sana’o’i, yaɗuwar bayanin ƙarya, ko kwaikwayon abin da bai dace da al’ummar mutum ba. Haɗuwa ba tana nufin a raina harshen gida ko al’adar wani ba. Ɗan ƙasa mai lura yana bincika sahihancin bayani, yana daraja kyawawan al’adunsa, yana koyon abin amfani daga wasu, kuma yana saye ko sayarwa bisa doka. Nijeriya tana bayarwa kamar yadda take karɓa: noma, fasaha, waƙa, sana’a, da ilimin jama’arta suna isa wasu wurare. Muhimmin abu shi ne a auna dama da ƙalubale cikin adalci.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi yadda duniya take ƙara haɗuwa. [MAIN] Ciniki, sufuri, sadarwa, fasaha, da musayar ilimi suna haɗa ƙasashe. Wayar hannu da intanet suna sa bayani ya yi saurin isa, kasuwanci kuma yana kai kaya tsakanin ƙasashe. Wannan yana buɗe damar koyo, aiki, da sabuwar fasaha. [PAUSE 1] Waɗanne abubuwa ne suke haɗa ƙasashe a yau? [MAIN] Haɗuwar duniya tana iya kawo gasa ga ƙananan sana’o’i ko bayanin ƙarya. Ba tana nufin a raina al’adar gida ba. Ɗan ƙasa ya binciki bayani, ya daraja al’adunsa, ya kuma koyi abin amfani daga wasu. [PAUSE 2] Me ya kamata ka yi kafin ka amince da bayanin da ya zo daga nesa? [OUTRO] Ka zaɓi kaya ko bayani ɗaya da ya ratsa ƙasashe, ka bayyana damarsa da ƙalubalensa ga Nijeriya.",
    "audioFile": "audio/p6-socs-01.mp3",
    "imageCard": "images/p6-socs-01.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Waɗanne abubuwa ne suke haɗa ƙasashe a yau?", "correctAnswer": "ciniki, sufuri, sadarwa, fasaha, da musayar ilimi", "options": ["ciniki, sufuri, sadarwa, fasaha, da musayar ilimi", "rufe dukkan hanyoyi", "hana musayar ilimi"]},
      {"pauseAtMs": 150000, "questionHa": "Me ya kamata ka yi kafin ka amince da bayanin da ya zo daga nesa?", "correctAnswer": "bincika sahihancinsa", "options": ["bincika sahihancinsa", "yaɗa shi nan da nan", "ƙara masa abin da babu"]}
    ],
    "quizQuestions": [
      {"templateHa": "Me yake sa labari ya isa Nijeriya daga nesa cikin sauri?", "answerFormula": "wayar hannu da intanet", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["rufe sadarwa", "hana sufuri", "ƙin karatu"]},
      {"templateHa": "Wace dama haɗuwar duniya take iya buɗewa?", "answerFormula": "damar koyo da aiki", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["hana sabuwar fasaha", "rufe dukkan kasuwanni", "ƙin musayar ilimi"]},
      {"templateHa": "Wane ƙalubale ne haɗuwar duniya take iya kawowa?", "answerFormula": "gasa ga ƙananan sana’o’i", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["tabbatar da kowane bayani", "kawar da duk wata gasa", "hana duk wata sadarwa"]},
      {"templateHa": "Shin haɗuwar duniya tana nufin a raina al’adar gida?", "answerFormula": "a’a, a daraja kyawawan al’adu", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["eh, a raina kowane harshe", "eh, a bar dukkan al’adu", "eh, a kwaikwayi komai"]},
      {"templateHa": "Me Nijeriya take iya bayarwa ga sauran duniya?", "answerFormula": "noma, fasaha, waƙa, sana’a, da ilimi", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["bayanin ƙarya kaɗai", "rufe kasuwanni kaɗai", "hana sadarwa kaɗai"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p6-socs-02",
    "gradeband": "p6",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 2,
    "titleEn": "Human Rights — Deeper Study",
    "titleHa": "Haƙƙin Ɗan Adam — Nazari Mai Zurfi",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Haƙƙin ɗan Adam kariya da dama ne da kowane mutum yake da su saboda mutuncinsa. Haƙƙoƙin jama’a sun haɗa da rayuwa, ’yanci, tsaro, shari’a mai adalci, da bayyana ra’ayi bisa doka. Haƙƙin siyasa ya haɗa da shiga harkokin jama’a da zaɓe ga wanda ya cika sharuddan doka. Haƙƙin tattalin arziki, zamantakewa, da al’adu sun haɗa da aiki, ilimi, lafiya, abinci, ruwa, da shiga rayuwar al’ada. Waɗannan rukuni suna taimakon juna; ba a ɗora ɗaya sama da sauran ba. Tauye haƙƙi na iya zama hana yaro ilimi saboda jinsinsa, cutar da mutum, ko hana sauraron korafinsa bisa doka. Idan an tauye haƙƙi, kada yaro ya rama ko ya shiga haɗari. Ya rubuta ko ya tuna abin da ya faru, ya gaya wa amintaccen babba, malami, ko hukumar da ta dace. Babba na iya neman shawarar lauya, kai ƙorafi ga Hukumar Kare Haƙƙin Ɗan Adam, ko zuwa kotu. Gyara yana bin hujja, adalci, da doka; ya shafi kowa ba tare da nuna bambanci ba.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu zurfafa nazarin haƙƙin ɗan Adam. [MAIN] Akwai haƙƙoƙin jama’a da siyasa, kamar rayuwa, ’yanci, shari’a mai adalci, shiga harkokin jama’a, da zaɓe bisa doka. Akwai kuma haƙƙin aiki, ilimi, lafiya, abinci, ruwa, da al’adu. Duk suna taimakon juna. [PAUSE 1] Waɗanne misalai ne na haƙƙin zamantakewa? [MAIN] Idan an tauye haƙƙi, yaro kada ya rama. Ya tuna abin da ya faru, ya gaya wa amintaccen babba ko malami, sannan babba ya nemi hanyar doka kamar ƙorafi ko kotu. [PAUSE 2] Me yaro zai fara yi idan an tauye haƙƙinsa? [OUTRO] Ka haɗa haƙƙi ɗaya da hanyar lumana da doka da za a bi domin neman gyara.",
    "audioFile": "audio/p6-socs-02.mp3",
    "imageCard": "images/p6-socs-02.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Waɗanne misalai ne na haƙƙin zamantakewa?", "correctAnswer": "ilimi, lafiya, abinci, da ruwa", "options": ["ilimi, lafiya, abinci, da ruwa", "zagi, barazana, da rama", "ɓoye korafi da hujja"]},
      {"pauseAtMs": 150000, "questionHa": "Me yaro zai fara yi idan an tauye haƙƙinsa?", "correctAnswer": "ya gaya wa amintaccen babba", "options": ["ya gaya wa amintaccen babba", "ya rama da kansa", "ya shiga haɗari"]}
    ],
    "quizQuestions": [
      {"templateHa": "Me ya sa kowane mutum yake da haƙƙin ɗan Adam?", "answerFormula": "saboda mutuncinsa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["saboda dukiyarsa kaɗai", "saboda yankinsa kaɗai", "saboda sana’arsa kaɗai"]},
      {"templateHa": "Wane haƙƙi ne na jama’a?", "answerFormula": "shari’a mai adalci", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["rashin sauraron korafi", "cutar da mutum", "hana hujja"]},
      {"templateHa": "Wane haƙƙi ne na siyasa ga wanda ya cika sharuddan doka?", "answerFormula": "shiga zaɓe", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["tilasta ra’ayi", "raina masu zaɓe", "lalata kayan jama’a"]},
      {"templateHa": "Waɗanne rukunan haƙƙi ne suke taimakon juna?", "answerFormula": "haƙƙoƙin jama’a, siyasa, tattalin arziki, zamantakewa, da al’adu", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["haƙƙin rukuni ɗaya kaɗai", "haƙƙin masu kuɗi kaɗai", "haƙƙin manya kaɗai"]},
      {"templateHa": "Wace hanya ce babba zai iya bi domin neman gyaran tauye haƙƙi?", "answerFormula": "kai ƙorafi ga hukumar da ta dace", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["yaɗa jita-jita", "rama da cutarwa", "ɓoye dukkan hujja"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p6-socs-03",
    "gradeband": "p6",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 3,
    "titleEn": "Gender Equality and Women's Empowerment",
    "titleHa": "Daidaiton Matsayin Mata da Maza a Zama Ƴan Ƙasa",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "A matsayin ƴan ƙasa, ’ya mace da ɗa namiji suna da mutunci da haƙƙin koyo. Ya dace yarinya ta samu damar zuwa makaranta, karatu cikin aminci, tambaya, da bunƙasa basirarta kamar kowane yaro. Ilimi yana ba ta damar zaɓar duk wata sana’a ta halal da doka ta yarda da ita, kamar koyarwa, lafiya, noma, injiniya, shari’a, kasuwanci, fasaha, ko hidimar jama’a. Mata a Nijeriya suna aiki a makarantu, asibitoci, kotuna, hukumomi, kasuwanni, gonaki, ɗakunan bincike, da ƙungiyoyin al’umma. Wasu suna jagorantar ayyukan tsafta, karatun yara, samar da lafiya, ko taimakon masu sana’a. Waɗannan misalai suna nuna cewa hidimar ɗan ƙasa da ƙwarewa ba su taƙaita ga jinsi ɗaya ba. Ƙarfafa mata yana nufin cire shingen da yake hana ilimi, horo, sauraron ra’ayi, ko damar aiki bisa doka. Wannan darasi yana magana ne kan daidaiton matsayin ƴan ƙasa; ba ya sukar iyali, al’ada, ko addini. Ɗalibi zai iya nuna adalci ta raba aikin rukuni bisa basira, sauraron kowa, da ƙin raina buri saboda jinsi.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi daidaiton matsayin mata da maza a zama ƴan ƙasa. [MAIN] ’Ya mace da ɗa namiji suna da mutunci da haƙƙin koyo. Yarinya za ta iya bunƙasa basirarta kuma ta bi duk wata sana’a ta halal da doka ta yarda da ita. Mata suna hidima a ilimi, lafiya, noma, shari’a, kasuwanci, fasaha, da ayyukan al’umma. [PAUSE 1] Wane haƙƙi ne ’ya mace da ɗa namiji suke da shi? [MAIN] Hidimar ɗan ƙasa da ƙwarewa ba su taƙaita ga jinsi ɗaya ba. A raba aikin rukuni bisa basira, a saurari kowa, kuma kada a raina burin wani saboda jinsi. [PAUSE 2] Ta yaya ɗalibi zai nuna adalci a aikin rukuni? [OUTRO] Ka ambaci sana’a ta halal ɗaya da yarinya za ta iya bi, sannan ka bayyana yadda ilimi yake taimaka mata.",
    "audioFile": "audio/p6-socs-03.mp3",
    "imageCard": "images/p6-socs-03.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Wane haƙƙi ne ’ya mace da ɗa namiji suke da shi?", "correctAnswer": "haƙƙin koyo", "options": ["haƙƙin koyo", "hana yarinya karatu", "raina basirar wani"]},
      {"pauseAtMs": 150000, "questionHa": "Ta yaya ɗalibi zai nuna adalci a aikin rukuni?", "correctAnswer": "raba aiki bisa basira", "options": ["raba aiki bisa basira", "raba aiki bisa jinsi", "hana wasu magana"]}
    ],
    "quizQuestions": [
      {"templateHa": "Wace dama ce ilimi yake ba yarinya?", "answerFormula": "bunƙasa basirarta", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["rufe mata sana’o’i", "hana ta tambaya", "rage damar koyo"]},
      {"templateHa": "Wace sana’a ta halal yarinya za ta iya bi?", "answerFormula": "injiniya", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["babu wata sana’a", "sana’ar da ba ta bisa doka ba", "a hana ta ƙwarewa"]},
      {"templateHa": "Ina mata suke hidima a Nijeriya?", "answerFormula": "makarantu, asibitoci, kotuna, hukumomi, kasuwanni, da gonaki", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["wuri ɗaya kawai", "ba sa hidima ko’ina", "ajen wasa kaɗai"]},
      {"templateHa": "Me ƙarfafa mata yake nufi a darasin?", "answerFormula": "cire shingen ilimi, horo, sauraro, da aikin doka", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["sukar kowane iyali", "raina wata al’ada", "hana mata ilimi"]},
      {"templateHa": "Me hidimar ɗan ƙasa da ƙwarewa ba su taƙaita gare shi ba?", "answerFormula": "jinsi ɗaya", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["mutunci", "koyo", "adalci"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p6-socs-04",
    "gradeband": "p6",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 4,
    "titleEn": "Sustainable Development",
    "titleHa": "Ci Gaba Mai Kare Damar Masu Zuwa",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Ci gaba mai kare damar masu zuwa yana biyan bukatun yau ba tare da lalata abin da mutanen gobe za su bukata ba. Yana haɗa ginshiƙai uku. Ginshiƙin tattalin arziki yana neman sana’o’i, ayyukan yi, da amfani da kuɗi ko albarkatu cikin hikima. Ginshiƙin zamantakewa yana neman ilimi, lafiya, adalci, ruwa, da damar shiga al’umma. Ginshiƙin muhalli yana kare ƙasa, ruwa, iska, dazuzzuka, da dabbobi. Ginshiƙan suna dogara da juna. Misali, famfon ruwa mai kyau yana kare lafiya; kula da shi yana rage ɓarna; horar da masu gyara kuma yana samar da sana’a. Gonar da take kiyaye ƙasa da ruwa za ta iya ba da abinci da aiki na dogon lokaci. Manufofin ci gaban duniya guda goma sha bakwai suna taimaka wa ƙasashe su tsara aiki kan talauci, lafiya, ilimi, ruwa, makamashi, muhalli, zaman lafiya, da haɗin gwiwa. Ba aikin gwamnati kaɗai ba ne. Ɗalibi zai iya rage ɓarnar ruwa, kula da littafi, dasa itace tare da babba, da shiga aikin tsaftar makaranta cikin aminci.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi ci gaba mai kare damar masu zuwa. [MAIN] Irin wannan ci gaba yana haɗa tattalin arziki, zamantakewa, da muhalli. Sana’a da aiki suna cikin tattalin arziki; ilimi, lafiya, da adalci suna cikin zamantakewa; ƙasa, ruwa, iska, dazuzzuka, da dabbobi suna cikin muhalli. [PAUSE 1] Waɗanne ginshiƙai uku ne ci gaba mai kyau yake haɗawa? [MAIN] Ginshiƙan suna taimakon juna. Famfon ruwa yana kare lafiya, rage ɓarna, kuma gyaransa yana samar da sana’a. Ɗalibi zai iya kula da ruwa, littafi, itace, da tsaftar makaranta. [PAUSE 2] Wane aikin ɗalibi ne yake kare damar masu zuwa? [OUTRO] Ka tsara ƙaramin aikin makaranta da zai taimaka wa tattalin arziki, jama’a, da muhalli a lokaci ɗaya.",
    "audioFile": "audio/p6-socs-04.mp3",
    "imageCard": "images/p6-socs-04.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Waɗanne ginshiƙai uku ne ci gaba mai kyau yake haɗawa?", "correctAnswer": "tattalin arziki, zamantakewa, da muhalli", "options": ["tattalin arziki, zamantakewa, da muhalli", "wasa, barci, da yawo", "ruwa, takarda, da takalmi"]},
      {"pauseAtMs": 150000, "questionHa": "Wane aikin ɗalibi ne yake kare damar masu zuwa?", "correctAnswer": "rage ɓarnar ruwa", "options": ["rage ɓarnar ruwa", "barin famfo yana zuba", "lalata littattafai"]}
    ],
    "quizQuestions": [
      {"templateHa": "Me ci gaba mai kare damar masu zuwa yake yi?", "answerFormula": "yana biyan bukatun yau ba tare da lalata damar gobe ba", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["yana ɓarnatar da albarkatu", "yana manta da mutanen gobe", "yana gurɓata ruwa"]},
      {"templateHa": "Me yake cikin ginshiƙin tattalin arziki?", "answerFormula": "sana’o’i da ayyukan yi", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["gurɓata ƙasa", "hana ilimi", "ɓarnatar da ruwa"]},
      {"templateHa": "Me yake cikin ginshiƙin zamantakewa?", "answerFormula": "ilimi, lafiya, da adalci", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["sare daji duka", "zubar da shara", "hana shiga al’umma"]},
      {"templateHa": "Me yake cikin ginshiƙin muhalli?", "answerFormula": "kare ƙasa, ruwa, iska, dazuzzuka, da dabbobi", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["lalata ƙasa da ruwa", "ƙara hayaƙi", "ɓarnatar da albarkatu"]},
      {"templateHa": "Manufofin ci gaban duniya nawa ne?", "answerFormula": "goma sha bakwai", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["uku", "takwas", "ashirin da biyar"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p6-socs-05",
    "gradeband": "p6",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 5,
    "titleEn": "Electoral Process — Deeper Study",
    "titleHa": "Matakan Zaɓe — Nazari Mai Zurfi",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "A dimokuradiyya, zaɓe yana ba ƴan ƙasa da suka cika sharuddan doka damar zaɓar wakilai. Hukumar Zaɓe Mai Zaman Kanta ta Ƙasa, wato INEC, tana shirya zaɓuɓɓukan ƙasa: rajistar masu zaɓe, bayanin yadda zaɓe zai gudana, kayan zaɓe, ma’aikata, wuraren jefa ƙuri’a, ƙirga ƙuri’u, tattara sakamako, da sanarwa bisa doka. Kafin ranar zaɓe, ’yan takara suna yaƙin neman zaɓe domin bayyana shirye-shiryensu; dole su bi doka, kuma darasin nan ba ya goyon bayan wani ɗan takara ko jam’iyya. A ranar zaɓe, wanda ya cancanta yana tantance kansa, ya jefa ƙuri’a sau ɗaya a ɓoye, sannan ya kiyaye zaman lafiya. Ma’aikata suna warewa da ƙirga ƙuri’u, ana tattara sakamako daga matakai, jami’in da doka ta ba iko kuma ya sanar. Idan ɗan takara ko jam’iyya suna da ƙorafin doka kan sakamako, suna iya shigar da ƙarar zaɓe ga kotun ko kwamitin shari’ar zaɓe da ya dace. Hujja da doka ne suke jagorantar hukunci, ba jita-jita ko barazana ba. Matashi yana koyo yanzu domin shiga cikin sani idan ya kai shekarun doka.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi matakan zaɓe a dimokuradiyya. [MAIN] INEC tana kula da rajista, bayanin zaɓe, kayan aiki, wuraren jefa ƙuri’a, ƙirga ƙuri’u, tattara sakamako, da sanarwa bisa doka. ’Yan takara suna bayyana shirye-shiryensu amma dole su bi doka. [PAUSE 1] Wace hukuma ce take shirya manyan zaɓuɓɓukan ƙasa? [MAIN] Wanda ya cancanta yana jefa ƙuri’a sau ɗaya a ɓoye. Ana ƙirga ƙuri’u, tattara sakamako, sannan jami’in da doka ta ba iko ya sanar. Ƙorafin sakamako yana bi ta hanyar ƙarar zaɓe, hujja, da doka. [PAUSE 2] Wace hanya ce ta dace idan akwai ƙorafin doka kan sakamakon zaɓe? [OUTRO] Ka jera matakai daga rajista zuwa sanar da sakamako, sannan ka bayyana dalilin da ya sa jita-jita ba ta maye gurbin hujja ba.",
    "audioFile": "audio/p6-socs-05.mp3",
    "imageCard": "images/p6-socs-05.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Wace hukuma ce take shirya manyan zaɓuɓɓukan ƙasa?", "correctAnswer": "INEC", "options": ["INEC", "ƙungiyar wasa", "kasuwar unguwa"]},
      {"pauseAtMs": 150000, "questionHa": "Wace hanya ce ta dace idan akwai ƙorafin doka kan sakamakon zaɓe?", "correctAnswer": "shigar da ƙarar zaɓe", "options": ["shigar da ƙarar zaɓe", "yaɗa jita-jita", "yin barazana"]}
    ],
    "quizQuestions": [
      {"templateHa": "Me zaɓe yake ba ƴan ƙasa da suka cancanta damar yi?", "answerFormula": "zaɓar wakilai", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["tilasta ɗan takara", "jefa ƙuri’a sau da yawa", "hana sanar da sakamako"]},
      {"templateHa": "Me ’yan takara suke yi kafin ranar zaɓe?", "answerFormula": "bayyana shirye-shiryensu", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ƙirga ƙuri’u da kansu", "sanar da kansu a matsayin masu nasara", "hana jama’a sauraro"]},
      {"templateHa": "Sau nawa wanda ya cancanta zai jefa ƙuri’a?", "answerFormula": "sau ɗaya", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["sau biyu", "sau uku", "duk lokacin da ya so"]},
      {"templateHa": "Wa yake sanar da sakamakon zaɓe?", "answerFormula": "jami’in da doka ta ba iko", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["duk wani mai kallo", "wani yaro", "mai yaɗa jita-jita"]},
      {"templateHa": "Me yake jagorantar hukuncin ƙarar zaɓe?", "answerFormula": "hujja da doka", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["barazana da zagi", "jita-jita da son rai", "launin jam’iyya"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p6-socs-06",
    "gradeband": "p6",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 6,
    "titleEn": "The Nigerian Judiciary — Protecting Rights",
    "titleHa": "Reshen Shari’a na Nijeriya — Kare Haƙƙoƙi",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Reshen shari’a yana fassara doka, sauraron shari’o’i, warware takaddama, da kare haƙƙoƙi bisa hujja da doka. Tsarin kotunan Nijeriya ba tsani guda ba ne. Kotunan majistare suna fara sauraron shari’o’i da yawa. Manyan Kotuna suna sauraron muhimman shari’o’i da wasu ɗaukaka ƙara. Kotun Ɗaukaka Ƙara tana sake duba takamaiman hukuncin da doka ta ba ta iko a kai. Kotun Koli ta Nijeriya ita ce kotu mafi girma; tana da wasu shari’o’in da take farawa, tana kuma sauraron ɗaukaka ƙara daga Kotun Ɗaukaka Ƙara bisa kundin tsarin mulki. Haka kuma akwai tsarin kotunan jihohi da na tarayya, tare da kotunan Shari’a da kotunan al’ada masu iyakokin aikin da doka ta kayyade. Wasu hanyoyin ɗaukaka ƙara daga waɗannan kotuna suna haɗuwa da sauran kotuna, amma ba duk shari’a ce take bin hanya ɗaya ba. Alƙali ya kamata ya saurari ɓangarori, ya duba hujja, ya kuma yi hukunci bisa doka. Ɗan ƙasa ya mutunta kotu, ya faɗi gaskiya, ya nemi lauya ko babban da ya dace, kuma kada ya ɗauki doka a hannunsa.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi yadda reshen shari’a yake kare haƙƙoƙi. [MAIN] Kotunan majistare suna fara shari’o’i da yawa. Manyan Kotuna suna sauraron muhimman shari’o’i da wasu ɗaukaka ƙara. Kotun Ɗaukaka Ƙara tana duba takamaiman hukunci. Kotun Koli ita ce kotu mafi girma. [PAUSE 1] Wace kotu ce mafi girma a Nijeriya? [MAIN] Tsarin ba tsani guda ba ne. Akwai kotunan jihohi da na tarayya, kotunan Shari’a, da kotunan al’ada, kowacce da aikin da doka ta kayyade. Alƙali yana sauraro, duba hujja, da bin doka. [PAUSE 2] Shin duk shari’o’i suna bin hanya ɗaya ta kotuna? [OUTRO] Ka zana taswirar hanyoyi masu rassa, ba tsani guda ba, ka sanya rawar kowace kotu da aka koya.",
    "audioFile": "audio/p6-socs-06.mp3",
    "imageCard": "images/p6-socs-06.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Wace kotu ce mafi girma a Nijeriya?", "correctAnswer": "Kotun Koli ta Nijeriya", "options": ["Kotun Koli ta Nijeriya", "kotun majistare", "kotun al’ada"]},
      {"pauseAtMs": 150000, "questionHa": "Shin duk shari’o’i suna bin hanya ɗaya ta kotuna?", "correctAnswer": "a’a, akwai hanyoyi da tsare-tsare masu rassa", "options": ["a’a, akwai hanyoyi da tsare-tsare masu rassa", "eh, tsani guda ne kawai", "eh, babu bambancin aiki"]}
    ],
    "quizQuestions": [
      {"templateHa": "Waɗanne kotuna ne suke fara sauraron shari’o’i da yawa?", "answerFormula": "kotunan majistare", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["Kotun Koli kawai", "Kotun Ɗaukaka Ƙara kawai", "babu wata kotu"]},
      {"templateHa": "Me Manyan Kotuna suke saurara?", "answerFormula": "muhimman shari’o’i da wasu ɗaukaka ƙara", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["jita-jita kawai", "wasannin makaranta", "duk shari’ar duniya"]},
      {"templateHa": "Me Kotun Ɗaukaka Ƙara take yi?", "answerFormula": "sake duba takamaiman hukunci", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["shirya zaɓe", "rubuta kundin makaranta", "tattara haraji"]},
      {"templateHa": "Waɗanne tsare-tsaren kotu ne suke nuna cewa ba tsani guda ba ne?", "answerFormula": "na jihohi, na tarayya, na Shari’a, da na al’ada", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["kotu ɗaya ba rassa", "ƙungiyoyin kasuwa", "azuzuwan makaranta"]},
      {"templateHa": "Me ya kamata alƙali ya yi kafin hukunci?", "answerFormula": "saurari ɓangarori ya duba hujja", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["bi jita-jita", "ƙi sauraron kowa", "zaɓi ɓangare bisa suna"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p6-socs-07",
    "gradeband": "p6",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 7,
    "titleEn": "Social Cohesion — Inter-ethnic and Inter-religious Tolerance",
    "titleHa": "Haɗin Kan Al’umma — Haƙuri Tsakanin Al’ummomi da Addinai",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Haɗin kan al’umma yana samuwa idan mutane masu bambancin harshe, ƙabila, addini, ko yanki suna jin cewa suna cikin ƙasa ɗaya, suna da mutunci, kuma suna iya aiki tare. A Nijeriya, maƙwabta suna haɗuwa a kasuwa, makaranta, sana’a, noma, da ayyukan jama’a. Haƙuri ba yana nufin dole kowa ya yi imani ko al’ada iri ɗaya ba. Yana nufin a saurari wani cikin ladabi, a ƙi zagi da nuna bambanci, a mutunta doka, kuma a yi haɗin gwiwa kan bukatun da aka raba. Idan rashin fahimta ya taso, wakilan al’umma, shugabannin addinai, mata, matasa, malamai, ko dattawa masu adalci za su iya taimaka wa tattaunawa da sasanci. Mai shiga tsakani ya saurari ɓangarori ba tare da fifiko ba. Darasin ba ya danganta matsala da wata ƙabila ko addini, kuma ba ya kiran wata ƙungiya da suna. Kai ɗalibi za ka iya gaisawa, furta sunan aboki yadda ya dace, tambaya ba tare da ba’a ba, ƙin jita-jita, da raba aikin rukuni cikin adalci. Haɗin kai yana girma daga ayyukan yau da kullum.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi haɗin kan al’umma. [MAIN] Mutane masu bambancin harshe, ƙabila, addini, ko yanki suna iya zama ƴan ƙasa ɗaya su yi aiki tare. Haƙuri yana nufin sauraro cikin ladabi, ƙin zagi da nuna bambanci, mutunta doka, da haɗin gwiwa. [PAUSE 1] Shin haƙuri yana nufin dole kowa ya yi imani iri ɗaya? [MAIN] Idan rashin fahimta ya taso, masu shiga tsakani na iya taimaka wa tattaunawa, amma su saurari kowa ba tare da fifiko ba. Ɗalibi ya ƙi jita-jita kuma ya raba aiki cikin adalci. [PAUSE 2] Wane hali mai shiga tsakani yake bukata? [OUTRO] Ka ambaci aikin yau da kullum ɗaya da zai ƙara amincewa tsakanin abokan da suka bambanta.",
    "audioFile": "audio/p6-socs-07.mp3",
    "imageCard": "images/p6-socs-07.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Shin haƙuri yana nufin dole kowa ya yi imani iri ɗaya?", "correctAnswer": "a’a, yana nufin mutunta bambanci", "options": ["a’a, yana nufin mutunta bambanci", "eh, a tilasta imani ɗaya", "eh, a hana wasu magana"]},
      {"pauseAtMs": 150000, "questionHa": "Wane hali mai shiga tsakani yake bukata?", "correctAnswer": "sauraron kowa ba tare da fifiko ba", "options": ["sauraron kowa ba tare da fifiko ba", "zaɓar ɓangare tun farko", "ƙara jita-jita"]}
    ],
    "quizQuestions": [
      {"templateHa": "Me haɗin kan al’umma yake sa mutane su ji?", "answerFormula": "suna cikin ƙasa ɗaya", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ba su da mutunci", "ba za su yi aiki tare ba", "dole su bar al’adunsu"]},
      {"templateHa": "Ina maƙwabta suke iya haɗuwa su yi aiki tare?", "answerFormula": "kasuwa, makaranta, sana’a, noma, da ayyukan jama’a", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["wurin zagi", "wurin nuna bambanci", "wurin yaɗa jita-jita"]},
      {"templateHa": "Wane hali ne yake nuna haƙuri?", "answerFormula": "sauraron wani cikin ladabi", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["raina harshensa", "yi masa ba’a", "tilasta masa ra’ayi"]},
      {"templateHa": "Wa zai iya taimaka wa tattaunawa idan rashin fahimta ya taso?", "answerFormula": "mai shiga tsakani mai adalci", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["mai ƙara zagi", "mai fifita ɓangare", "mai ƙin sauraro"]},
      {"templateHa": "Ta yaya ɗalibi zai ƙarfafa haɗin kai?", "answerFormula": "ƙin jita-jita da raba aiki cikin adalci", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["yaɗa zargi", "raina sunan aboki", "hana wasu aikin rukuni"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p6-socs-08",
    "gradeband": "p6",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 8,
    "titleEn": "Migration — Internal and International",
    "titleHa": "Sauya Wurin Zama — Cikin Ƙasa da Ketare",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Sauya wurin zama shi ne ƙaura daga wuri zuwa wani na ɗan lokaci ko dogon lokaci. Sauyi cikin ƙasa yana faruwa ba tare da ketare iyakar Nijeriya ba, kamar daga ƙauye zuwa birni ko wata jiha. Sauyi zuwa wata ƙasa yana ketare iyaka. Mutane na iya ƙaura domin aiki, karatu, kasuwanci, iyali, ko aminci bayan bala’i. Wanda aka tilasta wa barin gidansa amma ya ci gaba da zama a ƙasarsa ana kiransa mutumin da ya rasa matsuguni a cikin gida. Ɗan gudun hijira yana wajen ƙasarsa yana neman kariya saboda ba zai iya komawa cikin aminci ba. Waɗannan kalmomi ba su nufin laifi ko ƙarancin mutunci. Mutanen da suka rasa matsuguni suna da haƙƙin mutunci, kariya, ilimi, lafiya, ruwa, da sauraron bukatunsu bisa doka. Hukumar UNHCR tana taimakawa wajen kare ƴan gudun hijira, kuma a wasu yanayi tana tallafa wa mutanen da suka rasa matsuguni a cikin gida tare da hukumomi. Kada a ƙirƙiri adadi ko a jingina ƙaura ga wata ƙungiya. A taimaka cikin mutunci, ba nuna bambanci ba.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi sauya wurin zama cikin ƙasa da ketare. [MAIN] Ƙaura cikin ƙasa ba ta ketare iyakar Nijeriya; ƙaura zuwa wata ƙasa tana ketare iyaka. Aiki, karatu, kasuwanci, iyali, ko bala’i na iya sa mutane su sauya wurin zama. [PAUSE 1] Mene ne bambanci tsakanin ƙaura cikin ƙasa da ƙaura zuwa wata ƙasa? [MAIN] Mutumin da aka tilasta wa barin gida amma yana cikin ƙasarsa ya rasa matsuguni a cikin gida. Ɗan gudun hijira yana wajen ƙasarsa yana neman kariya. Dukansu suna da mutunci da haƙƙoƙi. UNHCR tana taimakawa wajen kariya. [PAUSE 2] Shin rasa matsuguni yana rage mutuncin mutum? [OUTRO] Ka kwatanta nau’ikan ƙaura biyu ta iyaka, dalili, da haƙƙin mutanen da abin ya shafa.",
    "audioFile": "audio/p6-socs-08.mp3",
    "imageCard": "images/p6-socs-08.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Mene ne bambanci tsakanin ƙaura cikin ƙasa da ƙaura zuwa wata ƙasa?", "correctAnswer": "ɗaya ba ta ketare iyakar ƙasa, ɗaya tana ketarewa", "options": ["ɗaya ba ta ketare iyakar ƙasa, ɗaya tana ketarewa", "dukansu ba sa canza wuri", "dukansu suna cikin gari ɗaya"]},
      {"pauseAtMs": 150000, "questionHa": "Shin rasa matsuguni yana rage mutuncin mutum?", "correctAnswer": "a’a, mutum yana da mutunci da haƙƙoƙi", "options": ["a’a, mutum yana da mutunci da haƙƙoƙi", "eh, ya rasa dukkan haƙƙi", "eh, ba a saurare shi"]}
    ],
    "quizQuestions": [
      {"templateHa": "Me ake kira ƙaura daga wata jiha zuwa wata ba tare da barin Nijeriya ba?", "answerFormula": "sauya wurin zama cikin ƙasa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ketare nahiyoyi biyu", "zama a gida ɗaya", "tafiya kasuwa na awa ɗaya"]},
      {"templateHa": "Wane dalili ne zai iya sa mutum ya ƙaura?", "answerFormula": "aiki ko karatu", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["launin takalmi", "girman allo", "sunan littafi"]},
      {"templateHa": "Ina mutumin da ya rasa matsuguni a cikin gida yake zama?", "answerFormula": "a cikin ƙasarsa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["dole a wata nahiya", "a wajen duniya", "ba ya wani wuri"]},
      {"templateHa": "Ina ɗan gudun hijira yake neman kariya?", "answerFormula": "a wajen ƙasarsa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["a cikin gidansa kawai", "ba tare da sauya wuri ba", "a ajinsa kaɗai"]},
      {"templateHa": "Wace hukuma ce take taimakawa wajen kare ƴan gudun hijira?", "answerFormula": "UNHCR", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ƙungiyar wasa", "kasuwar gari", "majalisar ɗalibai"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p6-socs-09",
    "gradeband": "p6",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 9,
    "titleEn": "Safety and Security — Staying Safe as a Citizen",
    "titleHa": "Aminci da Tsaro — Yadda Ɗan Ƙasa Zai Tsare Kansa",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Tsare kai a matsayin ɗan ƙasa yana nufin yin natsattsen zaɓi idan akwai haɗari. Idan ka ga haɗari na zahiri nan take, ka nisanta zuwa inda yake da aminci; kada ka tsaya domin kallo ko ka koma ɗaukar kaya. Idan ka ga abin da ba ka sani ba ko abin da aka bari ba tare da bayani ba, kada ka taɓa shi, motsa shi, buɗe shi, ko ɗauka. Ka koma nesa ka gaya wa amintaccen babba. A makaranta, kasuwa, unguwa, ko tafiya, ka saurari umarnin iyaye, malami, ma’aikacin wurin, ko jami’in da aka tantance yana jagorantar mutane a gaggawa. Kada ka yaɗa jita-jita ko hoton da zai ƙara ruɗani. Idan ana bukatar taimakon gaggawa, babba zai iya kiran lambar gaggawa da ta dace; kada a ƙirƙiri lamba. Ka san inda za ka haɗu da iyali ko ajinku bayan umarnin fita. Ka kula da hanyar fita da wurin taruwar da manya suka tsara. Aikin yaro shi ne nisanta, bin umarni, da sanar da amintaccen babba, ba bincike ko ceto ba.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi yadda ɗan ƙasa zai tsare kansa. [MAIN] Idan akwai haɗari na zahiri nan take, ka nisanta zuwa wuri mai aminci. Kada ka tsaya domin kallo. Idan ka ga abin da ba ka sani ba, kada ka taɓa, motsa, buɗe, ko ɗauka; ka gaya wa amintaccen babba. [PAUSE 1] Me za ka yi idan ka ga wani abu da ba ka sani ba? [MAIN] Ka bi umarnin babban ko jami’in da yake jagorantar mutane a gaggawa. Kada ka yaɗa jita-jita. Babba zai iya kiran lambar gaggawa da ta dace. Aikin yaro shi ne nisanta, bin umarni, da sanarwa. [PAUSE 2] Mene ne aikin yaro a lokacin gaggawa? [OUTRO] Ka maimaita matakai uku na aminci: nisanta, kada ka taɓa abin da ba ka sani ba, sannan ka sanar da amintaccen babba.",
    "audioFile": "audio/p6-socs-09.mp3",
    "imageCard": "images/p6-socs-09.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Me za ka yi idan ka ga wani abu da ba ka sani ba?", "correctAnswer": "kada na taɓa shi; in nisanta in sanar da babba", "options": ["kada na taɓa shi; in nisanta in sanar da babba", "in buɗe shi domin dubawa", "in ɗauka zuwa gida"]},
      {"pauseAtMs": 150000, "questionHa": "Mene ne aikin yaro a lokacin gaggawa?", "correctAnswer": "nisanta, bin umarni, da sanar da babba", "options": ["nisanta, bin umarni, da sanar da babba", "binciken wurin shi kaɗai", "tsayawa domin kallo"]}
    ],
    "quizQuestions": [
      {"templateHa": "Me za ka fara yi idan akwai haɗari na zahiri nan take?", "answerFormula": "nisanta zuwa wuri mai aminci", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["tsaya domin kallo", "koma ɗaukar kaya", "kusanci wurin"]},
      {"templateHa": "Me bai kamata ka yi da abin da ba ka sani ba?", "answerFormula": "taɓa, motsa, buɗe, ko ɗauka", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["nisanta daga gare shi", "sanar da amintaccen babba", "bin umarnin babba"]},
      {"templateHa": "Umarnin wa za ka bi a gaggawa?", "answerFormula": "babban ko jami’in da yake jagorantar mutane", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["mai yaɗa jita-jita", "duk wani mai kallo", "wanda yake ƙara ruɗani"]},
      {"templateHa": "Wa zai iya kiran lambar gaggawa da ta dace?", "answerFormula": "babba", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["wanda ya ƙirƙiri lamba", "mai son yaɗa jita-jita", "wanda bai san inda yake ba"]},
      {"templateHa": "Me ya sa bai dace a yaɗa jita-jita a lokacin gaggawa ba?", "answerFormula": "za su iya ƙara ruɗani", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["suna nuna hanyar fita", "suna maye gurbin umarnin babba", "suna tabbatar da kowane bayani"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p6-socs-10",
    "gradeband": "p6",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 10,
    "titleEn": "Technology and Society",
    "titleHa": "Fasaha da Al’umma",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Fasaha tana sauya yadda mutane suke koyo, aiki, kasuwanci, da sadarwa. Wayar hannu da intanet suna ba ɗalibi damar samun darasi, tuntuɓar iyali, sanin labari, ko koyon sana’a. ’Yan kasuwa na iya sanar da kaya da karɓar kuɗi ta hanyoyin zamani. Amma amfani da fasaha yana bukatar alhaki. Bayanin intanet ba duka yake zama gaskiya ba; ka duba tushensa kuma ka tambayi malami ko amintaccen babba. Kada ka ba baƙo kalmar sirri, cikakken adireshi, hoton sirri, ko bayanin iyali. Sanya kalmar sirri mai ƙarfi, kuma kada ka yi amfani da kalma ɗaya a ko’ina. Cin zarafi ta intanet yana nufin maimaita saƙo, hoto, ko magana domin kunyata ko cutar da wani. Kada ka rama ko ka yaɗa saƙon. Ka adana hujjar da ta dace ba tare da ƙara yaɗawa ba, ka toshe mai cutarwa idan tsarin ya ba da dama, sannan ka gaya wa amintaccen babba. Ka nemi izini kafin saka hoton wani. Fasaha mai kyau tana kare mutunci, lokaci, da bayanan mutane.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi fasaha da al’umma. [MAIN] Wayar hannu da intanet suna taimaka wa koyo, sadarwa, aiki, da kasuwanci. Amma ba kowane bayani ne gaskiya ba. A duba tushe, a kuma tambayi amintaccen babba. Kada a ba baƙo kalmar sirri, adireshi, ko hoton sirri. [PAUSE 1] Wane bayani bai kamata ka ba baƙo a intanet ba? [MAIN] Cin zarafi ta intanet yana kunyata ko cutar da wani. Kada ka rama ko ka ƙara yaɗawa. Ka adana hujjar da ta dace, ka toshe mai cutarwa idan zai yiwu, ka sanar da babba. [PAUSE 2] Me za ka yi idan ana cin zarafinka ta intanet? [OUTRO] Ka duba ɗabi’arka ta intanet: kare kalmar sirri, tabbatar da bayani, neman izini, da girmama mutane.",
    "audioFile": "audio/p6-socs-10.mp3",
    "imageCard": "images/p6-socs-10.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Wane bayani bai kamata ka ba baƙo a intanet ba?", "correctAnswer": "kalmar sirri, adireshi, ko hoton sirri", "options": ["kalmar sirri, adireshi, ko hoton sirri", "sunan darasin makaranta", "gaisuwa cikin ladabi"]},
      {"pauseAtMs": 150000, "questionHa": "Me za ka yi idan ana cin zarafinka ta intanet?", "correctAnswer": "kada na rama; in adana hujja in sanar da babba", "options": ["kada na rama; in adana hujja in sanar da babba", "in yaɗa saƙon ga kowa", "in ba baƙo kalmar sirri"]}
    ],
    "quizQuestions": [
      {"templateHa": "Wane amfani fasaha take da shi?", "answerFormula": "koyo, aiki, kasuwanci, da sadarwa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["yaɗa ƙarya kawai", "ɓata lokaci kawai", "hana tuntuɓar iyali"]},
      {"templateHa": "Me za ka yi da bayanin da ka gani a intanet?", "answerFormula": "duba tushensa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["amince da komai", "ƙara masa jita-jita", "aika shi ba karantawa"]},
      {"templateHa": "Yaya kalmar sirri ta dace ta kasance?", "answerFormula": "mai ƙarfi kuma ba iri ɗaya a ko’ina ba", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["mai sauƙin zato", "a ba kowane baƙo", "iri ɗaya a ko’ina"]},
      {"templateHa": "Me cin zarafi ta intanet yake nufi?", "answerFormula": "maimaita saƙo, hoto, ko magana domin kunyata wani", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["tambayar malami", "koyon sana’a", "gaishe da iyali"]},
      {"templateHa": "Me ya kamata ka yi kafin saka hoton wani?", "answerFormula": "nemi izininsa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["saka shi a ɓoye", "canza hoton ba izini", "aika wa baƙi"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p6-socs-11",
    "gradeband": "p6",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 11,
    "titleEn": "Civic Role Models in Nigeria",
    "titleHa": "Mutanen Koyi a Aikin Ɗan Ƙasa a Nijeriya",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Mutumin koyi a aikin ɗan ƙasa shi ne wanda aikinsa ya nuna ilimi, hidima, jarumtar faɗin gaskiya, ko kare mutuncin jama’a. Nana Asma’u malama ce kuma marubuciya daga Sakkwato wadda ta faɗaɗa ilimin mata ta koyarwa da rubuce-rubuce. Aminu Kano malami ne kuma ɗan siyasa wanda ya yi kira ga ilimi, adalcin jama’a, da sauraron talakawa. Funmilayo Ransome-Kuti malama ce kuma mai shirya jama’a wadda ta kare damar mata, ilimi, da shiga harkokin jama’a. Herbert Macaulay ƙwararre ne kuma mai fafutukar jama’a wanda ya yi amfani da ƙungiya da rubutu wajen neman wakilci da adalci. Wole Soyinka marubuci ne kuma malami wanda ya yi amfani da adabi da murya ta jama’a wajen kare ’yancin faɗar ra’ayi da mutuncin ɗan Adam. Ba a koya waɗannan sunaye domin a ɗora mutum sama da doka ko a goyi bayan jam’iyya ba. Ana koyonsu domin gane hanyoyi dabam-dabam na hidima: ilimantarwa, tsara jama’a, rubutu, sauraro, da kare haƙƙi. Kai ma za ka iya fara hidima da gaskiya, karatu, taimako, da kula da kayan jama’a.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi mutanen koyi a aikin ɗan ƙasa. [MAIN] Nana Asma’u ta faɗaɗa ilimin mata. Aminu Kano ya yi kira ga ilimi da adalcin jama’a. Funmilayo Ransome-Kuti ta kare damar mata da shiga harkokin jama’a. Herbert Macaulay ya nemi wakilci ta ƙungiya da rubutu. Wole Soyinka ya yi amfani da adabi wajen kare ’yancin faɗar ra’ayi. [PAUSE 1] Wace ce ta faɗaɗa ilimin mata ta koyarwa da rubuce-rubuce? [MAIN] Ana nazarin su ne domin hanyoyin hidimarsu, ba domin a ɗora su sama da doka ko a goyi bayan jam’iyya ba. [PAUSE 2] Waɗanne hanyoyi ne mutum zai iya hidima wa al’umma? [OUTRO] Ka zaɓi mutum ɗaya daga cikin biyar, ka bayyana gudunmawarsa da ƙaramin aikin da za ka kwaikwaya cikin doka.",
    "audioFile": "audio/p6-socs-11.mp3",
    "imageCard": "images/p6-socs-11.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Wace ce ta faɗaɗa ilimin mata ta koyarwa da rubuce-rubuce?", "correctAnswer": "Nana Asma’u", "options": ["Nana Asma’u", "Herbert Macaulay", "Wole Soyinka"]},
      {"pauseAtMs": 150000, "questionHa": "Waɗanne hanyoyi ne mutum zai iya hidima wa al’umma?", "correctAnswer": "ilimantarwa, tsara jama’a, rubutu, sauraro, da kare haƙƙi", "options": ["ilimantarwa, tsara jama’a, rubutu, sauraro, da kare haƙƙi", "raina jama’a da ɓoye gaskiya", "lalata kaya da yaɗa jita-jita"]}
    ],
    "quizQuestions": [
      {"templateHa": "Wane jigo ne ya fito a gudunmawar Aminu Kano?", "answerFormula": "ilimi da adalcin jama’a", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["raina talakawa", "hana sauraron jama’a", "lalata ilimi"]},
      {"templateHa": "Wace ce ta kare damar mata da shiga harkokin jama’a?", "answerFormula": "Funmilayo Ransome-Kuti", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["Aminu Kano", "Herbert Macaulay", "Wole Soyinka"]},
      {"templateHa": "Wane ne ya yi amfani da ƙungiya da rubutu wajen neman wakilci?", "answerFormula": "Herbert Macaulay", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["Nana Asma’u", "Funmilayo Ransome-Kuti", "Wole Soyinka"]},
      {"templateHa": "Wane ne ya yi amfani da adabi wajen kare ’yancin faɗar ra’ayi?", "answerFormula": "Wole Soyinka", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["Nana Asma’u", "Aminu Kano", "Herbert Macaulay"]},
      {"templateHa": "Me ya sa ake nazarin mutanen koyi a wannan darasi?", "answerFormula": "domin gane hanyoyi dabam-dabam na hidima", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["domin ɗora su sama da doka", "domin goyon bayan jam’iyya", "domin raina sauran jama’a"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p6-socs-12",
    "gradeband": "p6",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 12,
    "titleEn": "Population Growth and Civic Responsibility",
    "titleHa": "Ƙaruwar Jama’a da Nauyin Ɗan Ƙasa",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Yawan jama’a yana nufin adadin mutanen da suke zaune a wuri a wani lokaci. Ƙaruwar jama’a tana faruwa idan adadin mutanen wurin ya ƙaru. Nijeriya tana da jama’a masu yawa kuma yawan yana ƙaruwa, amma wannan darasi ba ya bayar da adadin da ba shi da shekara da sahihin tushe. Ana amfani da ƙidayar jama’a da binciken hukuma domin tsara makarantu, asibitoci, ruwa, gidaje, sufuri, abinci, da ayyukan yi. Jama’a masu yawa na iya ƙara basira, kasuwa, ma’aikata, da sabbin dabaru. Idan hidimomi ba su ƙaru tare da bukata ba, aji zai iya cika, layin asibiti ya yi tsawo, ruwa ya yi kaɗan, ko muhalli ya fuskanci matsin lamba. Nauyin ɗan ƙasa ya haɗa da ba da sahihin bayani a ƙidayar hukuma, kula da kayan jama’a, biyan kuɗin hidima bisa ƙa’ida, rage ɓarna, da shiga tattaunawar bukatun unguwa. Hukumomi su yi amfani da bayanai cikin adalci su tsara gaba. Darasin ba ya tilasta girman iyali ko ɗora laifi ga iyaye; yana koyar da tsari, hidima, da haɗin kai.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi ƙaruwar jama’a da nauyin ɗan ƙasa. [MAIN] Yawan jama’a shi ne adadin mutanen wuri a wani lokaci. Ƙidayar jama’a da binciken hukuma suna taimaka wa tsara makarantu, asibitoci, ruwa, gidaje, sufuri, abinci, da ayyukan yi. [PAUSE 1] Me ake amfani da bayanin yawan jama’a wajen tsarawa? [MAIN] Jama’a masu yawa suna iya ƙara basira da kasuwa, amma hidimomi na iya fuskantar matsin lamba. Ɗan ƙasa ya ba da sahihin bayani, ya kula da kayan jama’a, ya rage ɓarna, ya shiga tattaunawa. [PAUSE 2] Wane nauyi ne ɗan ƙasa yake da shi lokacin ƙidayar hukuma? [OUTRO] Ka zaɓi hidima ɗaya a unguwa, ka nuna yadda bayanin yawan jama’a zai taimaka wajen tsara ta.",
    "audioFile": "audio/p6-socs-12.mp3",
    "imageCard": "images/p6-socs-12.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Me ake amfani da bayanin yawan jama’a wajen tsarawa?", "correctAnswer": "makarantu, asibitoci, ruwa, gidaje, sufuri, abinci, da ayyukan yi", "options": ["makarantu, asibitoci, ruwa, gidaje, sufuri, abinci, da ayyukan yi", "launin kayan makaranta", "sunayen wasannin yara"]},
      {"pauseAtMs": 150000, "questionHa": "Wane nauyi ne ɗan ƙasa yake da shi lokacin ƙidayar hukuma?", "correctAnswer": "ba da sahihin bayani", "options": ["ba da sahihin bayani", "ƙirƙirar adadi", "ɓoye dukkan bayani"]}
    ],
    "quizQuestions": [
      {"templateHa": "Me yawan jama’a yake nufi?", "answerFormula": "adadin mutanen da suke zaune a wuri a wani lokaci", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["adadin gidaje kawai", "yawan motoci kawai", "girman kasuwa kawai"]},
      {"templateHa": "Wane tushe ne yake taimaka wa tsara hidimomi?", "answerFormula": "ƙidayar jama’a da binciken hukuma", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["jita-jita", "adadin da ba shi da tushe", "zaton mutum ɗaya"]},
      {"templateHa": "Wace dama jama’a masu yawa za su iya kawowa?", "answerFormula": "ƙarin basira, kasuwa, ma’aikata, da dabaru", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["hana sabbin dabaru", "rufe dukkan kasuwanni", "rage dukkan ma’aikata"]},
      {"templateHa": "Me zai iya faruwa idan hidimomi ba su ƙaru tare da bukata ba?", "answerFormula": "aji zai iya cika ko ruwa ya yi kaɗan", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["duk hidima ta wadatu nan da nan", "babu bukatar tsari", "ƙidaya ta zama wasa"]},
      {"templateHa": "Wane saƙo ne darasin bai bayar ba?", "answerFormula": "tilasta girman iyali ko ɗora laifi ga iyaye", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["kula da kayan jama’a", "tsara hidimomi", "ba da sahihin bayani"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p6-socs-13",
    "gradeband": "p6",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 13,
    "titleEn": "Entrepreneurship and Self-Reliance",
    "titleHa": "Kafa Sana’a da Dogaro da Kai",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Kafa sana’a yana farawa da gano bukata, ƙirƙirar kaya ko hidima, da tsara aiki bisa doka. Sana’a na iya zama ɗinki, noma, kiwo, gyaran kaya, ƙera sana’ar hannu, sarrafa abinci, ko ciniki. Dogaro da kai ba yana nufin mutum ya ƙi taimako ko haɗin gwiwa ba; yana nufin amfani da ilimi da basira domin samar da mafita da kuɗin halal. Matakan farko sun haɗa da koyon ƙwarewa, binciken masu bukata, rubuta kuɗin shiga da fita, fara abin da za a iya sarrafawa, kula da inganci, da faɗin gaskiya ga mai saye. A ware kuɗin sana’a daga kuɗin kai, kuma kada a karɓi bashi ba tare da fahimtar sharudda ba. Bankin Aikin Gona na Nijeriya yana tallafa wa aikin noma da kasuwancin da ya shafi noma ga waɗanda suka cika sharudda. Bankin Masana’antu, wato BOI, yana ba wasu masana’antu da sana’o’i tallafin kuɗi da shawara bisa ƙa’idojinsa. Ba a tabbatar wa kowa rance; ana duba shiri da cancanta. Sana’a mai alhaki tana samar da aiki, biyan bukata, da ƙarfafa al’umma.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi kafa sana’a da dogaro da kai. [MAIN] A gano bukata, a koyi ƙwarewa, a tsara kaya ko hidima, a rubuta kuɗin shiga da fita, kuma a kula da inganci. Dogaro da kai yana amfani da ilimi da basira, amma yana iya haɗawa da taimako da haɗin gwiwa. [PAUSE 1] Waɗanne matakai ne suke taimaka wa fara sana’a? [MAIN] Bankin Aikin Gona yana tallafa wa noma da kasuwancin noma. BOI yana tallafa wa wasu masana’antu da sana’o’i da kuɗi ko shawara bisa ƙa’idoji. Rance ba tabbaci ba ne; ana duba cancanta. [PAUSE 2] Me ya kamata mutum ya fahimta kafin ya karɓi bashi? [OUTRO] Ka tsara ƙaramin ra’ayin sana’a: bukatar da zai biya, ƙwarewar da ake bukata, da yadda za ka rubuta kuɗi.",
    "audioFile": "audio/p6-socs-13.mp3",
    "imageCard": "images/p6-socs-13.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Waɗanne matakai ne suke taimaka wa fara sana’a?", "correctAnswer": "gano bukata, koyon ƙwarewa, tsari, da rubuta kuɗi", "options": ["gano bukata, koyon ƙwarewa, tsari, da rubuta kuɗi", "fara ba tare da lissafi ba", "ɓoye ingancin kaya"]},
      {"pauseAtMs": 150000, "questionHa": "Me ya kamata mutum ya fahimta kafin ya karɓi bashi?", "correctAnswer": "sharuddan bashin", "options": ["sharuddan bashin", "launin takarda", "sunan mai kallo"]}
    ],
    "quizQuestions": [
      {"templateHa": "Me kafa sana’a yake farawa da shi?", "answerFormula": "gano bukata", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ɓoye kuɗi", "raina kwastoma", "karɓar bashi ba tsari"]},
      {"templateHa": "Me dogaro da kai yake nufi?", "answerFormula": "amfani da ilimi da basira domin samar da mafita", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ƙin duk wani haɗin gwiwa", "fara ba tare da ƙwarewa ba", "ƙin biyan bukatar jama’a"]},
      {"templateHa": "Me ya dace a yi da kuɗin sana’a da na kai?", "answerFormula": "a ware su", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["a haɗa su ba rubutu", "a ɓoye dukkan kashewa", "a manta da kuɗin shiga"]},
      {"templateHa": "Wace hukuma ce take tallafa wa aikin noma da kasuwancin noma?", "answerFormula": "Bankin Aikin Gona na Nijeriya", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ƙungiyar wasan makaranta", "majalisar ɗalibai", "kotun al’ada"]},
      {"templateHa": "Me BOI take iya ba wasu masana’antu da sana’o’i bisa ƙa’idoji?", "answerFormula": "tallafin kuɗi da shawara", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["tabbacin rance ga kowa", "izinin ƙin biyan bashi", "kaya kyauta ba sharadi"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p6-socs-14",
    "gradeband": "p6",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 14,
    "titleEn": "Peace Education and Conflict Prevention",
    "titleHa": "Ilimin Zaman Lafiya da Hana Saɓani",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Zaman lafiya ba rashin faɗa kaɗai ba ne. Yana haɗa aminci, adalci, mutunci, sauraro, da hanyar warware saɓani cikin lumana. Hana saɓani yana farawa kafin matsala ta tsananta. A aji, gida, ko unguwa, mutane za su iya amincewa da ƙa’idoji, raba aiki da albarkatu cikin adalci, sauraron korafi da wuri, da gyara bayanin ƙarya. Idan rashin fahimta ya taso, a natsu, a faɗi abin da ya faru ba tare da zagi ba, a saurari ɓangarori, a gano bukatar kowa, sannan a nemi mafita mai adalci. Matasa suna da rawa: su ƙi jita-jita, su gayyaci waɗanda aka ware cikin aikin rukuni, su shirya wasan haɗin kai ko tsaftar unguwa, kuma su nemi malami ko dattijo mai adalci ya taimaka. Idan akwai barazana ko haɗari, yaro ya nisanta ya sanar da amintaccen babba; kada ya shiga tsakani shi kaɗai. Ilimin zaman lafiya yana koya wa ɗalibi tunani, tausayawa, sadarwa, haɗin gwiwa, da alhaki. Darasin ba ya ambaton rikici ko masu aikata shi; yana gina ƙwarewar da ake amfani da ita a ko’ina.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi ilimin zaman lafiya da hana saɓani. [MAIN] Zaman lafiya yana haɗa aminci, adalci, mutunci, sauraro, da warware saɓani cikin lumana. Ana hana matsala tsananta ta hanyar ƙa’idoji, raba aiki daidai, sauraron korafi da wuri, da gyara bayanin ƙarya. [PAUSE 1] Me zaman lafiya yake haɗawa bayan rashin faɗa? [MAIN] Matasa su ƙi jita-jita, su haɗa waɗanda aka ware, su yi aikin jama’a, su nemi mai shiga tsakani mai adalci. Idan akwai haɗari, yaro ya nisanta ya sanar da babba. [PAUSE 2] Wane aiki ne matashi zai iya yi domin hana saɓani? [OUTRO] Ka tsara aikin haɗin kai ɗaya da zai sa kowa ya samu rawa, a saurari ra’ayi, kuma a warware rashin fahimta da wuri.",
    "audioFile": "audio/p6-socs-14.mp3",
    "imageCard": "images/p6-socs-14.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Me zaman lafiya yake haɗawa bayan rashin faɗa?", "correctAnswer": "aminci, adalci, mutunci, sauraro, da mafita ta lumana", "options": ["aminci, adalci, mutunci, sauraro, da mafita ta lumana", "zagi, jita-jita, da fifiko", "barazana, rama, da raini"]},
      {"pauseAtMs": 150000, "questionHa": "Wane aiki ne matashi zai iya yi domin hana saɓani?", "correctAnswer": "ƙin jita-jita da haɗa waɗanda aka ware", "options": ["ƙin jita-jita da haɗa waɗanda aka ware", "ƙara zagi da wariya", "ɓoye korafi har ya tsananta"]}
    ],
    "quizQuestions": [
      {"templateHa": "Me zaman lafiya yake nufi?", "answerFormula": "aminci, adalci, mutunci, da warware saɓani cikin lumana", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["rashin magana kawai", "tilasta wa kowa shiru", "ɓoye dukkan korafi"]},
      {"templateHa": "Ta yaya za a hana saɓani tsananta?", "answerFormula": "sauraron korafi da wuri", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ƙara bayanin ƙarya", "hana ɓangarori magana", "raba aiki ba daidai ba"]},
      {"templateHa": "Me ya kamata a yi bayan kowane ɓangare ya yi bayani?", "answerFormula": "a gano bukatun kowa a nemi mafita mai adalci", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["a fara zagi", "a zaɓi mai ƙarfi", "a ƙara jita-jita"]},
      {"templateHa": "Wa matashi zai nema ya taimaka wajen saɓani?", "answerFormula": "malami ko dattijo mai adalci", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["mai ƙara faɗa", "mai yaɗa jita-jita", "wanda yake nuna fifiko"]},
      {"templateHa": "Waɗanne ƙwarewa ne ilimin zaman lafiya yake ginawa?", "answerFormula": "tunani, tausayawa, sadarwa, haɗin gwiwa, da alhaki", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["zagi, rama, da raini", "ɓoye gaskiya da barazana", "fifiko da nuna bambanci"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p6-socs-15",
    "gradeband": "p6",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 15,
    "titleEn": "Revision and Consolidation — Bridge to JSS1",
    "titleHa": "Bita da Ƙarfafawa — Shiri Zuwa Ajin Farko na Sakandare",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "A bitar P3 zuwa P6, ka haɗa mutum da al’umma, muhalli, ƙasa, da duniya. Ka tuna aikin ƙaramar hukuma, ayyukan jama’a, sufuri, sadarwa, noma, kasuwa, da kula da muhalli. Ɗan ƙasa yana da haƙƙoƙi da nauyi, yana mutunta bambancin al’adu, alamomin ƙasa, kundin tsarin mulki, da bin doka. Nijeriya tana da jihohi, Yankin Babban Birnin Tarayya, matakan gwamnati, da rassa uku: zartarwa, kafa doka, da shari’a. Dimokuradiyya da zaɓe suna bukatar sahihin bayani, jefa ƙuri’a bisa doka, ƙirga ƙuri’u, da hanyar ƙorafi. Albarkatu, ilimi, sana’a, fasaha, da haɗin gwiwar ƙasashe suna buɗe dama; gurɓata muhalli, bala’i, bayanin ƙarya, da rashin adalci suna bukatar matakin lumana da aminci. Ka bambanta ƙaura cikin ƙasa da ta ketare, ka kare mutuncin kowa, ka yi koyi da masu hidimar jama’a, ka fahimci yawan jama’a, kuma ka gina zaman lafiya. A ajin farko na sakandare, ka riƙa tambayar tushe, kwatanta hujja, sauraron ra’ayi, da bayyana aikin ɗan ƙasa da zai magance matsala.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa bitar ƙarshe daga aji uku zuwa aji shida. [MAIN] Ka tuna ƙaramar hukuma, ayyukan jama’a, sufuri, sadarwa, noma, kasuwa, muhalli, da zama ɗan ƙasa. Ka haɗa alamomin Nijeriya, matakan gwamnati, rassa uku, kundin tsarin mulki, dimokuradiyya, da zaɓe. [PAUSE 1] Waɗanne rassa uku ne gwamnatin Nijeriya take da su? [MAIN] Ka tuna albarkatu, ilimi, sana’a, fasaha, ƙaura, yawan jama’a, haƙƙin ɗan Adam, kotuna, haɗin kai, aminci, da zaman lafiya. A sakandare za ka tambayi tushe, kwatanta hujja, sauraro, da tsara aikin ɗan ƙasa. [PAUSE 2] Waɗanne matakai ne za su taimaka maka ka tantance batun al’umma a sakandare? [OUTRO] Ka zaɓi jigogi huɗu, ɗaya daga kowane aji uku zuwa shida, ka haɗa su cikin bayani ɗaya da aikin ɗan ƙasa mai yiwuwa.",
    "audioFile": "audio/p6-socs-15.mp3",
    "imageCard": "images/p6-socs-15.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Waɗanne rassa uku ne gwamnatin Nijeriya take da su?", "correctAnswer": "reshen zartarwa, reshen kafa doka, da reshen shari’a", "options": ["reshen zartarwa, reshen kafa doka, da reshen shari’a", "kasuwa, gona, da makaranta", "sufuri, sadarwa, da wasa"]},
      {"pauseAtMs": 150000, "questionHa": "Waɗanne matakai ne za su taimaka maka ka tantance batun al’umma a sakandare?", "correctAnswer": "tambayar tushe, kwatanta hujja, sauraro, da tsara aiki", "options": ["tambayar tushe, kwatanta hujja, sauraro, da tsara aiki", "yaɗa jita-jita da raini", "ƙin hujja da ƙin sauraro"]}
    ],
    "quizQuestions": [
      {"templateHa": "Wace hukuma ce take kusa da jama’a wajen wasu ayyukan unguwa?", "answerFormula": "ƙaramar hukuma", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["Majalisar Ɗinkin Duniya", "Kotun Koli", "Tarayyar Afirka"]},
      {"templateHa": "Me kundin tsarin mulki da bin doka suke taimakawa wajen karewa?", "answerFormula": "haƙƙoƙi, nauyi, da tsarin gwamnati", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["jita-jita", "son rai", "lalata kayan jama’a"]},
      {"templateHa": "Wane aiki ne ya haɗa kula da albarkatu da ci gaba mai kyau?", "answerFormula": "amfani da albarkatu ba tare da lalata damar masu zuwa ba", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["sare komai yau", "ɓarnatar da ruwa", "gurɓata muhalli"]},
      {"templateHa": "Me ya haɗa zaɓe, kotuna, da haƙƙin ɗan Adam?", "answerFormula": "hujja, doka, adalci, da hanyar ƙorafi", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["barazana da jita-jita", "fifiko da raini", "ƙarya da rama"]},
      {"templateHa": "Wace ƙwarewa ce za ta haɗa dukan aji uku zuwa aji shida a shirin sakandare?", "answerFormula": "gano gaskiya, bayyana dalili, da tsara aikin ɗan ƙasa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["haddace suna ba fahimta", "yaɗa bayani ba tushe", "ƙin haɗa darussa"]}
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

## 22. Final P3–P6 workstream closing summary

- M1–M5 now contain **60 authored source-only modules** across the P3–P6 workstream.
- P3 is **15/15**, P4 is **15/15**, P5 is **15/15**, and P6 is **15/15**.
- The full scratch review set is **309 live + 60 source-only = 369 modules**, and validator exit is **0**.
- Live `app/content.json` remains untouched at **309 modules**.
- All four bands are authored and ready for the Architect’s final consolidated review before any integration planning begins.
- Human validation remains authoritative for Hausa. In addition, `p6-socs-09`’s full-content sign-off gate in §14 remains **OPEN** until Muhammad explicitly answers yes. Therefore this is a complete source-authoring candidate, not an accepted or shippable workstream.

No integration, commit, push, image generation, audio generation, or runtime change was performed.
