# AJAMIX M2 P3 Social and Citizenship Studies Complete Report

**Task ID:** AJAMIX-SOCS-M2-P3-COMPLETE  
**Milestone:** M2 — P3 complete, source-only candidate  
**Date:** 2026-07-16  
**Status:** BUILD-COMPLETE DRAFT CANDIDATE — all applicable source gates passed; not integrated, not shippable, and awaiting Architect plus human Hausa/content review.

## Deliverables

- Source candidate: `tools/p3-batch/p3-socs-complete.json`
- Design-intent manifest: `tools/image-manifest/p3-socs-image-manifest-part2.json`
- Report: `tasks/2026-07-16-M2-p3-socs-complete-report.md`
- The source contains exactly nine modules, `p3-socs-07..15`.
- The manifest contains exactly nine entries and uses the approved eight-field schema: `id`, `imagePath`, `titleEn`, `titleHa`, `type`, `depictEn`, `labelsHa`, `safetyNote`.
- No image or audio asset was rendered, generated, or fetched.
- No live content, M1 source, governing document, or runtime file was edited.
- No git command was run.

## 1. Module list

| ID | titleEn | titleHa |
|---|---|---|
| p3-socs-07 | Communication — Modern Methods | Sadarwa ta Hanyoyin Zamani |
| p3-socs-08 | Our Natural Environment | Muhallin Halitta Namu |
| p3-socs-09 | Caring for Our Environment | Kula da Muhallinmu |
| p3-socs-10 | Food and Farming in Our Community | Abinci da Noma a Al’ummarmu |
| p3-socs-11 | Market and Trade | Kasuwa da Ciniki |
| p3-socs-12 | Nigerian Citizenship | Zama Ɗan Ƙasar Nijeriya |
| p3-socs-13 | Our Cultural Heritage — Food, Dress, and Language | Abinci, Tufafi, da Harshe a Al’adunmu |
| p3-socs-14 | Festivals and Special Occasions in Nigeria | Bukukuwa da Ranaku na Musamman a Nijeriya |
| p3-socs-15 | Revision and Assessment — P3 Social and Citizenship Studies | Bita da Tantancewa — Nazarin Zamantakewa na Aji Uku |

## 2. Validator and structure output

Schema check: **PASS**.

Every M2 module has exactly the same 22 top-level keys, in the same order, as the approved M1 objects and live `p2-socs-01`. There are no extras or omissions. Each object has exactly two micro-pauses and five quiz questions. All Ajami fields are `null`, `ajami_validated` is `false`, and every flat-leaf/static-Q&A constant and asset placeholder matches §8.

Scratch merge included both approved M1 (`p3-socs-01..06`) and M2 (`p3-socs-07..15`):

    temporary merge refreshed: 309 -> 324

The live validator has a hard-coded adjacent path. An unchanged copy and the merged content were placed in `/tmp/ajamix-p3-socs-complete/app/`.

    9df1ed5fbc9ef1a3973a48c7cb1daa32555eac66f22db3bdfc078e72f9d0ab2a  app/tools/validate-content.mjs
    9df1ed5fbc9ef1a3973a48c7cb1daa32555eac66f22db3bdfc078e72f9d0ab2a  /tmp/ajamix-p3-socs-complete/app/tools/validate-content.mjs

Command:

    node /tmp/ajamix-p3-socs-complete/app/tools/validate-content.mjs

Exit code: **0**.

    validate-content: OK — 324 module(s) pass.
      track=vocational: 10
      track=formal:     314
      isChainLeaf:      315
      chainNext set:    9

Temporary-merge preservation: **PASS**.

    live modules=309; temp modules=324; delta=15
    pre-existing module mismatches=0
    P1/P2 Social modules=30; mismatches=0
    non-modules keys checked=version,generatedAt,gradeBands,activities,glossary,schemaVersion,schemaMigratedAt; mismatches=0
    temp unique IDs=true
    P3 count=15; moduleNumbers=1,2,3,4,5,6,7,8,9,10,11,12,13,14,15
    new tail=p3-socs-01,p3-socs-02,p3-socs-03,p3-socs-04,p3-socs-05,p3-socs-06,p3-socs-07,p3-socs-08,p3-socs-09,p3-socs-10,p3-socs-11,p3-socs-12,p3-socs-13,p3-socs-14,p3-socs-15

Aggregate object hashes:

    live-module aggregate=4a0eedd293dcb729a2cc4a837064feebe9d0c105de13e4049f6d703957487b84
    scratch-prefix aggregate=4a0eedd293dcb729a2cc4a837064feebe9d0c105de13e4049f6d703957487b84
    P1/P2 live aggregate=8ac69ce9e959914d52f9636938a6cd2669c8f9388e8bf93ef2fd9e5243fa3723
    P1/P2 scratch aggregate=8ac69ce9e959914d52f9636938a6cd2669c8f9388e8bf93ef2fd9e5243fa3723

M2 IDs are unique and `moduleNumber` is sequential from 7 through 15. Across M1+M2, the P3 band is unique and sequential from 1 through 15.

## 3. Hooked-letter lint

Command:

    node tools/p2-batch/hook-lint.mjs tools/p3-batch/p3-socs-complete.json

Exit code: **0**.

    hook-lint: 0 error(s), 0 warning(s).

Warnings: **none**.

## 4. Word-count summary

Counts use whitespace-separated words in `textExplanationHa`.

| Module | Words | Gate |
|---|---:|---|
| p3-socs-07 | 150 | PASS |
| p3-socs-08 | 141 | PASS |
| p3-socs-09 | 158 | PASS |
| p3-socs-10 | 160 | PASS |
| p3-socs-11 | 164 | PASS |
| p3-socs-12 | 154 | PASS |
| p3-socs-13 | 159 | PASS |
| p3-socs-14 | 163 | PASS |
| p3-socs-15 | 165 | PASS |

Minimum: **141**. Maximum: **165**. All nine are within 120–170.

## 5. Audio-explanation alignment

Manual content comparison: **PASS, 9/9**.

| Module | Facts shared by prose and audio |
|---|---|
| p3-socs-07 | Radio, television, telephone/mobile communication, unequal access, supervision, privacy, verification, and respectful use. |
| p3-socs-08 | Land, water, air, vegetation, animals, Northern seasonal landscape, natural functions, and differing water availability. |
| p3-socs-09 | Litter/drains, waste burning, tree loss/replanting, safe child actions, adult/public cleanup, and shared responsibility. |
| p3-socs-10 | Northern crops and livestock, animal needs/products, farming stages, drying/storage, farm-to-market movement, and child safety. |
| p3-socs-11 | Buyer/seller roles, price, money, goods-for-goods exchange, why exchange can fail, honest measurement, and child market safety. |
| p3-socs-12 | Meaning of citizen, rights, responsibilities, children’s rights, diversity, public-property care, and shared Nigerian civic identity. |
| p3-socs-13 | Culture through food/dress/language, Northern and wider Nigerian examples, transmission, change, and non-hierarchical respect. |
| p3-socs-14 | Neutral descriptions of all four named festivals, the federal-holiday distinction, diverse practice, equal respect, and safe gatherings. |
| p3-socs-15 | Genuine consolidation across local government, transport, communication, environment, farming, trade, citizenship, and culture. |

The scripts are not copies of the prose, but teach the same material facts.

## 6. Micro-pause exact-match confirmation

- Automated exact string comparison: **PASS, 18/18**.
- Each `audioScript` contains the exact sequence `[PAUSE N] ` plus the corresponding `microPauses[N-1].questionHa`.
- Micro-pause answer integrity: **PASS, 18/18**.
- Every `correctAnswer` appears exactly once in its own `options` array.

## 7. Quiz answer integrity, Q5, OUTRO, and revision quality

- `answerFormula` absent from `distractorFormulas`: **PASS, 45/45**.
- Exactly three distractors per quiz: **PASS, 45/45**.
- Q5 is topic-specific: **PASS, 9/9**.
- OUTRO is topic-specific: **PASS, 9/9**.
- `p3-socs-15` is genuine full-band consolidation: **PASS**; its five questions span local government, water-transport safety, communication, citizenship/public property, and a three-topic environment-food-culture classification.

| Module | Topic-specific Q5 focus | Topic-specific OUTRO focus |
|---|---|---|
| p3-socs-07 | Respectful words in mobile messages | Verify truth and use respectful wording |
| p3-socs-08 | Water availability differs by environment | Identify land, water, and a dependent living thing |
| p3-socs-09 | Combined small actions improve the environment | Choose one safe environmental-care action |
| p3-socs-10 | People in the farm-to-food chain | Trace grain/beans from planting to sale |
| p3-socs-11 | Why goods-for-goods exchange can fail | Observe price, measurement, and payment |
| p3-socs-12 | Respecting others’ rights as good citizenship | Care for public property and another’s rights |
| p3-socs-13 | Respect without cultural ranking | Ask about family culture without demeaning others |
| p3-socs-14 | Equal, non-ranking festival discussion | Ask what a festival marks and whether it is national |
| p3-socs-15 | Environment-food-culture synthesis | Explain facts/actions from three P3 themes |

## 8. Quiz fact grounding

Automated literal-answer search against each module’s own `textExplanationHa` plus `audioScript`: **PASS, 45/45**. Every `answerFormula` appears literally in at least one of those two teaching fields.

## 9. English-leakage scan

Result: **PASS with prescribed proper-name exceptions explicitly flagged**.

After bracketed audio markers were excluded, the only raw English phrases in learner-facing M2 fields are the brief-mandated festival names in `p3-socs-14`: `Eid al-Fitr` (7 occurrences), `Eid al-Adha` (5), `Christmas` (7), and `New Yam` (9). `Ramadan` (5) is a proper religious-month name. These are not casual leakage: the canonical topic map requires the named festivals, and the lesson immediately explains each in Hausa. Proper language/community names (`Hausa`, `Fulfulde`, `Kanuri`, `Yoruba`, `Igbo`) are names, not English leakage. The adapted borrowed forms `rediyo`, `talabijin`, and `intanet` are written in Hausa orthography. `LGA`, `P3`, and `P4` occur zero times in learner-facing M2 fields.

Current-name verification for `p3-socs-14`: the Federal Ministry of Interior’s 2026 notices use **Eid-UL-Fitr/Eid-ul-Fitr** and **Eid ul Adha** and declare federal public holidays for them; its latest Christmas notice declares Christmas Day a public holiday. The Federal Ministry of Information and National Orientation lists New Yam as a cultural festival. The lesson follows the user’s prescribed spellings `Eid al-Fitr`, `Eid al-Adha`, `Christmas`, and `New Yam`, and carefully states that New Yam is not a nationwide federal public holiday. That last distinction is an inference from the current federal holiday notices/category plus the federal culture-page classification, not a claim of official curriculum wording.

- [Ministry of Interior — 2026 Eid-ul-Fitr public holidays](https://interior.gov.ng/federal-government-declares-thursday-19th-and-friday-20th-march-2026-as-public-holidays-to-mark-eid-ul-fitr/)
- [Ministry of Interior — 2026 Eid ul Adha public holidays](https://interior.gov.ng/federal-government-declares-wednesday-27th-may-and-thursday-28th-may-2026-as-public-holidays-to-mark-eid-ul-adha-celebration/)
- [Ministry of Interior — Christmas/Boxing Day/New Year public holidays](https://interior.gov.ng/fg-declares-december-25-26-2025-and-january-1-2026-public-holidays-to-mark-christmas-boxing-day-and-new-year-celebrations/)
- [Federal Ministry of Information and National Orientation — festivals, including New Yam](https://fmino.gov.ng/culture/festivals/)

## 10. Cross-module quiz-answer spelling consistency — full 15-module band

Automated normalization covered every `correctAnswer`, `options[]`, `answerFormula`, and `distractorFormulas[]` across M1+M2.

- Cross-module exact reused strings: **33**.
- Normalized spelling/case variant groups: **0**.
- The 33 exact reused strings checked were: `ajin makaranta`, `ɓoye kaya`, `ɓoye matsalar`, `ɗan kallo`, `ɗaukar ruwa`, `filin wasa`, `ganga`, `gidan iyali`, `gina hanya`, `isar da saƙo`, `iska`, `jirgin sama`, `kujera`, `kula da kayan jama’a`, `kwale-kwale`, `ƙaramar hukuma`, `ƙin sauraro`, `ƙungiyar wasa`, `lalata kaya`, `lalata kayan jama’a`, `launin riga`, `layin dogo`, `littafi`, `magudanar ruwa`, `mota`, `rediyo`, `rigar kariya ta ruwa`, `sautin rediyo`, `shuka itace`, `tabarma`, `takalmi`, `takalmin makaranta`, `talabijin`.
- M1 locked answer strings intentionally reused in M2 were byte-identical: `ƙaramar hukuma`, `rigar kariya ta ruwa`, and `isar da saƙo`.
- Manual hooked-letter review also checked `ɗan ƙasa`/`ƴan ƙasa`, `muhalli`, `ƙasa`, `ƙwai`, `ɓoye`, `ɗaukar`, `saƙo`, and `haƙƙoƙi`. No hooked/unhooked scoring variant was found.

## 11. Within-module redundancy check — M2 batch

Command:

    node tools/p1-batch/check-within-module-redundancy.mjs --file=tools/p3-batch/p3-socs-complete.json

Exit code: **0**.

    Within-module redundancy check passed for 9 module(s).

Findings: **0**.

## 12. Batch and full-band close-paraphrase review

- Manual review of the nine-module M2 batch found no duplicate or near-duplicate sentence pair.
- Automated token-Jaccard screening across all 15 P3 prose fields found **0 cross-module sentence pairs at or above 0.55**.
- M2 does not duplicate M1: M1 supplies orientation/local services/transport/traditional communication; M2 begins with modern communication and then adds environment, food systems, trade, citizenship, culture, festivals, and consolidation.
- `p3-socs-08` and `p3-socs-09` remain deliberately distinct. Module 08 identifies natural components, Northern seasonal features, ecological functions, and unequal water availability. Module 09 teaches concrete care actions and hazards: litter/drains, burning, tree loss/replanting, safe cleanup roles, and responsibility.
- Necessary continuity phrases such as `isar da saƙo`, `magudanar ruwa`, `ƙaramar hukuma`, and `rigar kariya ta ruwa` are locked concept carryovers, not duplicated lesson substance.

## 13. Neutrality attestation — all M2 modules

None of the nine IDs is on §5’s explicit sign-off list. A precautionary six-rule neutrality review was nevertheless completed for every module, with extra care for `p3-socs-14`.

- **p3-socs-07: PASS** — access differences are acknowledged; no brand, platform, political message, gender role, or group attribution appears.
- **p3-socs-08: PASS** — Northern landscape examples are descriptive and non-exhaustive; no region, people, or livelihood is ranked or caricatured.
- **p3-socs-09: PASS** — environmental harm is described by action, never blamed on an ethnic, religious, gender, political, or conflict group; child tasks remain safe.
- **p3-socs-10: PASS** — farming and livestock roles are not gendered; Northern examples are local context, not a hierarchy over other regions or livelihoods.
- **p3-socs-11: PASS** — buyers and sellers are treated fairly; no group is portrayed as dishonest, primitive, wealthy, or poor; barter is functional description, not cultural ranking.
- **p3-socs-12: PASS** — citizenship is civic/legal and inclusive across state, language, religion, and culture; no party, ideology, or appearance defines a citizen.
- **p3-socs-13: PASS** — Northern examples are foregrounded for learner context while other Nigerian languages/regions appear; the prose explicitly rejects ranking, sameness, and ridicule.
- **p3-socs-14: PASS — extra-care review** — the four named festivals receive factual, descriptive treatment; no prescriptive worship instruction, comparative superiority, “ours/theirs” framing, ethnic stereotype, or religious hierarchy appears. Federal public-holiday status is separated from local/cultural observance, and current official names/notices were checked as documented in §9.
- **p3-socs-15: PASS** — consolidation gives equal civic weight to governance, transport, communication, environment, economy, citizenship, and culture; no sensitive group framing is introduced.

## 14. Sensitive-topic flags and exclusions

The slice does not contain `p5-socs-07`, `p6-socs-03`, or `p6-socs-09`, so their mandatory sign-off flags are not applicable. No family-planning-adjacent objective or content appears. No political party, candidate, ideology, current conflict zone, militant group, sectarian dispute, historical grievance, or group-attributed national problem appears.

## 15. Terminology open questions

The mandatory 2026-07-16 terms were followed exactly wherever relevant: `ƙaramar hukuma`, `ɗan ƙasa`/`ƴan ƙasa`, `muhalli`, `rigar kariya ta ruwa`, `sufuri`, and `sadarwa`. M2 does not introduce `LGA`, a technical ward term, `kansila`, `wakilin yanki`, `hidimar jama’a`, `mai shela`, or `ganga ko kalangu` in a new context that would alter the M1 rulings.

Open items surfaced by these nine modules for human Hausa/content ruling:

1. **Modern communication devices:** The draft uses `rediyo`, `talabijin`, `waya`, `wayar hannu`, and `intanet`. Confirm these spellings/register as the locked P3 forms. No raw `radio`, `TV`, `telephone`, `mobile phone`, or `internet` was introduced.
2. **Environmental pollution:** Module 09 uses the ordinary descriptive verb `gurɓata` (“make dirty/contaminate”) for smoke affecting air, but does not coin a formal noun for “pollution.” The §9 formal pollution term remains open for P5.
3. **Farming/livestock:** The draft uses `noma` and descriptive `kiwo`/`kiwon shanu, awaki, da kaji`, plus `gero`, `dawa`, `wake`, `gyada`, `shanu`, `awaki`, and `kaji`. Confirm whether `kiwo` should be locked as the P3 learner-facing livestock category; no more technical category term was invented.
4. **Barter:** Module 11 deliberately defines the idea as `musayar kaya da kaya` rather than inventing a borrowed or technical noun. Confirm whether that descriptive phrase should be locked or replaced after user ruling.
5. **Cultural heritage:** Module 13 avoids inventing a formal Hausa equivalent for “cultural heritage.” Its title and prose use the descriptive `Abinci, Tufafi, da Harshe a Al’adunmu` and explain practices passed between generations. The formal category label remains open; `gadon al’adu` is not asserted or locked by this draft.
6. **Children’s-rights convention name:** Module 12 teaches simple children’s rights without introducing `UNCRC` or inventing a formal Hausa title for the convention. If the acronym/formal name is desired later, it needs a user ruling.
7. **Festival and public-holiday names:** The draft retains the brief-prescribed proper names `Eid al-Fitr`, `Eid al-Adha`, `Christmas`, and `New Yam`, while explaining them in Hausa and using descriptive `hutun jama’a`. Confirm whether future scoring fields should retain those proper names exactly or receive user-ruled Hausa display forms.

The other §9 open concepts—democracy, constitution, election/voting, migration, globalisation, drug/substance abuse, sustainability as a formal term, conflict resolution, and technical/electoral ward—did not arise as named concepts in this batch. No ruling is proposed here.

## 16. Checksums and live-content confirmation

`app/content.json` was not touched.

    Before: c0aaaeaf79c010d5921ddd02bc91ce944e104cfcb7a2a5d92d3c47d84f9088bb  app/content.json
    After:  c0aaaeaf79c010d5921ddd02bc91ce944e104cfcb7a2a5d92d3c47d84f9088bb  app/content.json

Result: **IDENTICAL**.

Scratch and deliverable checksums:

    077580a539189f19c02f14a70eb2e41df9182bb0bbcbe4fc82c1d743f188970c  /tmp/ajamix-p3-socs-complete/app/content.json
    5a3d9fd052e2a68596c769094aa1d907215360f39257485739f04560d262a780  tools/p3-batch/p3-socs-complete.json
    dc8b6b02bd6d889d5bce7d8cd3ccbd36d3fa727735c179af32830d7467b6f46c  tools/image-manifest/p3-socs-image-manifest-part2.json

## 17. Engine-file checksum and mtime confirmation

All six named runtime files were present. Their SHA-256 hashes and mtimes matched the captured before/after values. Runtime changes: **0**.

| File | mtime before/after | SHA-256 before/after |
|---|---:|---|
| app/app.js | 1783198948 | de8e10d60c1e10dbe318bb0e675a1934012758aabe56815741483c88797e37af |
| app/quiz-engine.js | 1776801044 | f6c33db5bf6c91e1edc2cf7ae2548221eed3f4e0c2a491afd61198333cc80001 |
| app/styles.css | 1783195979 | 2e90fb776b97be0187246b01ea6e39b30b91b26c2303904fb4f41a310e76a323 |
| app/index.html | 1776528520 | cae50dbe1b435a0bc2cf98ef035824866277b9fe3657cbdad00b0cee7f37dc43 |
| app/sw.js | 1783183460 | 1818967c86a62fbf802427ae2e535c939e502e99f09ae5d09e66c3f350519409 |
| app/bootstrap.js | 1776474739 | c2c64c6ac71d10e8ca5b3a87eb88229e196b7da6ab8b0892d2cc791b79cf0ce7 |

## 18. Alignment-matrix columns

Every row carries the M0 warning: **BEST-EFFORT — NOT VERIFIED AGAINST OFFICIAL NERDC GRADE DOCUMENT**. Nothing in this candidate is presented as verified official NERDC wording.

| Module | Curriculum version / actual source | Public-source strand/topic family (not official NERDC strand) | Source page/section | Classification |
|---|---|---|---|---|
| p3-socs-07 | S7 Lagos State MoE legacy P4/P5/P6 Social Studies; S1 context | Communication and responsible technology | S7 pp. 234–235, 248–249, 262–263; S1 pp. 2–3 | Enrichment |
| p3-socs-08 | S1 NERDC implementation context; S4 public unified SCS P4 | Environment and sustainability | S1 pp. 1 and 3; S4 P4 SCS second term, Civic Activities | Enrichment |
| p3-socs-09 | S4 public unified SCS P4; S1 context | Civic activity and environmental care | S4 P4 SCS second term, weeks 1–3; S1 p. 3 | Combined coverage |
| p3-socs-10 | S7 Lagos State MoE legacy P4 Social Studies; S1 context | Agriculture, work, and community economy | S7 pp. 230–232, Agriculture/Natural Resources | Enrichment |
| p3-socs-11 | S7 Lagos State MoE legacy P4/P6 Social Studies | Distribution and trade | S7 pp. 232–233 and 259–260 | Enrichment |
| p3-socs-12 | S3 public unified SCS P3; S7 Lagos State MoE legacy P4; S8 FME resources | Civic responsibilities, identity, and citizenship | S3 P3 SCS first term weeks 8–10 and second term weeks 1–2; S7 p. 229; S8 P3 Civic catalog | Combined coverage |
| p3-socs-13 | S3 public unified SCS P3; S7 Lagos State MoE legacy P4 | Culture and national diversity | S3 P3 SCS second term week 10; S7 pp. 227–228 | Direct coverage |
| p3-socs-14 | S3 public unified SCS P3; S7 Lagos State MoE legacy P4 | Culture, festivals, beliefs, and tolerance | S3 P3 SCS second term week 10; S7 pp. 227–228 | Combined coverage |
| p3-socs-15 | S3 public unified SCS P3 | Revision and assessment | S3 P3 SCS first/second term revision and assessment weeks | Direct coverage |

Changes from M0: **none**. The current public-holiday verification for module 14 is a factual authoring-time check, not a change to the provisional curriculum mapping.

## 19. Full M2 module JSON objects — verbatim

The following code block is the complete, verbatim content of `tools/p3-batch/p3-socs-complete.json`.

```json
[
  {
    "id": "p3-socs-07",
    "gradeband": "p3",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 7,
    "titleEn": "Communication — Modern Methods",
    "titleHa": "Sadarwa ta Hanyoyin Zamani",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Sadarwa tana nufin isar da saƙo, kuma hanyoyin zamani suna iya kai saƙo kusa ko nesa cikin sauri. Hanyoyin sun haɗa da rediyo, talabijin, da waya. Rediyo yana watsa labarai da sanarwa ga masu sauraro. Talabijin yana haɗa sauti da hoto. Waya tana ba mutane damar yin magana daga wurare daban-daban, yayin da wayar hannu za ta iya aika saƙon rubutu ko amfani da intanet. A Nijeriya, ba kowane gida ko yanki ne yake samun wutar lantarki, sigina, ko na’ura iri ɗaya ba. Saboda haka, mutane suna zaɓar hanyar da take samuwa. Ka yi amfani da na’ura cikin alhaki: ka nemi izinin babba, ka kiyaye bayanin sirri, kuma kada ka aika magana mai cutarwa. Ka tabbatar da saƙon kafin ka yaɗa shi, domin kuskure na iya isa ga mutane da yawa. Hanyoyin zamani suna haɗa iyali, makaranta, kasuwa, da duniya, amma sadarwa mai kyau tana bukatar gaskiya, ladabi, da kulawa.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi sadarwa ta hanyoyin zamani. [MAIN] Rediyo yana watsa labarai da sanarwa. Talabijin yana haɗa sauti da hoto. Waya tana ba mutane damar magana daga wurare daban-daban, wayar hannu kuma za ta iya aika saƙon rubutu ko amfani da intanet. Samun wuta, sigina, da na’ura yana bambanta tsakanin wurare, don haka mutane suna amfani da hanyar da take samuwa. [PAUSE 1] Wace na’ura ce take haɗa sauti da hoto? [MAIN] Ka nemi izinin babba kafin amfani da na’ura, ka kiyaye bayanin sirri, kuma kada ka aika magana mai cutarwa. Ka tabbatar da saƙon kafin ka yaɗa shi, domin kuskure na iya isa ga mutane da yawa. Sadarwa mai kyau tana bukatar gaskiya, ladabi, da kulawa. [PAUSE 2] Me ya kamata ka yi kafin ka yaɗa saƙo? [OUTRO] Idan za ka aika saƙo da wayar hannu, ka zaɓi kalmomi masu ladabi sannan ka tabbatar da cewa saƙon gaskiya ne.",
    "audioFile": "audio/p3-socs-07.mp3",
    "imageCard": "images/p3-socs-07.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Wace na’ura ce take haɗa sauti da hoto?", "correctAnswer": "talabijin", "options": ["rediyo", "talabijin", "ganga"]},
      {"pauseAtMs": 150000, "questionHa": "Me ya kamata ka yi kafin ka yaɗa saƙo?", "correctAnswer": "tabbatar da saƙon", "options": ["tabbatar da saƙon", "canza gaskiyar", "aika shi ba dubawa"]}
    ],
    "quizQuestions": [
      {"templateHa": "Wace hanya ce take watsa labarai ga masu sauraro?", "answerFormula": "rediyo", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["layin dogo", "kwale-kwale", "ganga"]},
      {"templateHa": "Wace na’ura ce take haɗa sauti da hoto?", "answerFormula": "talabijin", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["rediyo", "keke", "littafi"]},
      {"templateHa": "Me ya kamata ka kiyaye yayin amfani da na’ura?", "answerFormula": "bayanin sirri", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["hayaniyar kasuwa", "launin riga", "sunan hanya"]},
      {"templateHa": "Me ya kamata ka yi kafin ka yaɗa saƙo?", "answerFormula": "tabbatar da saƙon", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["canza gaskiyar", "aika shi ba dubawa", "ƙara magana mai cutarwa"]},
      {"templateHa": "Wane irin kalmomi ne ya dace a aika ta wayar hannu?", "answerFormula": "kalmomi masu ladabi", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["kalmomin zagi", "kalmomin yaudara", "kalmomin cutarwa"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p3-socs-08",
    "gradeband": "p3",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 8,
    "titleEn": "Our Natural Environment",
    "titleHa": "Muhallin Halitta Namu",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Muhalli shi ne wurin da halittu suke rayuwa da abubuwan da suke kewaye da su. Muhallin halitta ya haɗa da ƙasa, ruwa, iska, itatuwa, daji, duwatsu, tsirrai, da dabbobi. Waɗannan abubuwa ba ginin mutum ba ne. A Arewacin Nijeriya, za ka iya ganin fili mai faɗi, ciyayi, filayen ciyawa, ƙananan duwatsu, da koguna ko tafkuna a wasu wurare. Lokacin damina, ciyayi sukan yi kore; lokacin rani kuma ƙasa da iska sukan bushe. Ruwa yana taimaka wa mutane, dabbobi, da tsirrai, iska kuma tana da muhimmanci ga numfashi. Ƙasa tana ba tsirrai wurin girma. Daji da itatuwa suna zama mafaka ga halittu da dama. Muhallin duniya ya bambanta: wasu wurare suna da ruwa mai yawa, wasu kuma suna fama da ƙarancin ruwa mai tsabta. Idan ka lura da ƙasa, ruwa, iska, da halittun yankinku, za ka fahimci yadda ɓangarorin muhalli suke haɗuwa.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi muhallin halitta namu. [MAIN] Muhallin halitta ya haɗa da ƙasa, ruwa, iska, itatuwa, daji, duwatsu, tsirrai, da dabbobi. A Arewacin Nijeriya, ana iya ganin fili mai faɗi, ciyayi, filayen ciyawa, ƙananan duwatsu, da ruwa a wasu wurare. Lokacin damina ciyayi sukan yi kore, lokacin rani kuma ƙasa da iska sukan bushe. [PAUSE 1] Waɗanne abubuwa uku ne suke cikin muhallin halitta? [MAIN] Ruwa yana taimaka wa mutane, dabbobi, da tsirrai. Iska tana da muhimmanci ga numfashi, ƙasa kuma tana ba tsirrai wurin girma. Muhallin duniya ya bambanta; wasu wurare suna da ruwa mai yawa, wasu suna da ƙarancin ruwa mai tsabta. [PAUSE 2] Me ƙasa take ba tsirrai? [OUTRO] Ka kalli muhallin yankinku ka gano abu ɗaya na ƙasa, abu ɗaya na ruwa, da wata halitta da take amfani da su.",
    "audioFile": "audio/p3-socs-08.mp3",
    "imageCard": "images/p3-socs-08.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Waɗanne abubuwa uku ne suke cikin muhallin halitta?", "correctAnswer": "ƙasa, ruwa, da iska", "options": ["ƙasa, ruwa, da iska", "mota, waya, da littafi", "kujera, riga, da tukunya"]},
      {"pauseAtMs": 150000, "questionHa": "Me ƙasa take ba tsirrai?", "correctAnswer": "wurin girma", "options": ["wurin girma", "sautin rediyo", "hasken fitila"]}
    ],
    "quizQuestions": [
      {"templateHa": "Wane abu ne yake cikin muhallin halitta?", "answerFormula": "ruwa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["talabijin", "mota", "kujera"]},
      {"templateHa": "Me yake da muhimmanci ga numfashi?", "answerFormula": "iska", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["yashi", "takalmi", "ganga"]},
      {"templateHa": "Me ƙasa take ba tsirrai?", "answerFormula": "wurin girma", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["sautin rediyo", "launin riga", "kuɗin kasuwa"]},
      {"templateHa": "Yaya ciyayi sukan kasance a lokacin damina?", "answerFormula": "sukan yi kore", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["sukan zama ƙarfe", "sukan koma takarda", "sukan zama gilashi"]},
      {"templateHa": "Wane bayani ne yake nuna bambancin muhallin wurare?", "answerFormula": "wasu wurare suna da ruwa mai yawa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ko’ina ruwa ɗaya ne", "ko’ina ƙasa ɗaya ce", "babu halitta a duniya"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p3-socs-09",
    "gradeband": "p3",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 9,
    "titleEn": "Caring for Our Environment",
    "titleHa": "Kula da Muhallinmu",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Kula da muhalli yana nufin yin ayyukan da suke kiyaye wurin rayuwa da lafiyar halittu. Sharar da aka jefa a hanya tana iya toshe magudanar ruwa. Ƙona shara kusa da gidaje na iya gurɓata iska da damun numfashi. Sare itatuwa da yawa ba tare da dasa wasu ba yana rage inuwa, yana barin ƙasa a buɗe, kuma yana rage mafakar dabbobi. Bayan sarewa, a dasa wasu itatuwa. Za ka iya taimakawa ta hanyar zuba shara a kwandon shara, rage ɓarnar ruwa, kula da itace, da gaya wa babba idan ka ga matsala. A ranar tsaftar al’umma, yara su yi aikin da ya dace da shekarunsu kawai; kada su shiga magudana ko taɓa abu mai haɗari. Manya da hukuma za su iya shirya kwashe shara, gyaran magudana, da dasa itatuwa. Kowane mutum yana da alhaki, domin iska, ruwa, da ƙasa suna haɗa rayuwar mutane da sauran halittu. Ƙananan ayyuka masu kyau idan an yi su tare suna inganta muhalli.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi kula da muhallinmu. [MAIN] Shara a hanya tana iya toshe magudanar ruwa. Ƙona shara kusa da gida na iya gurɓata iska. Sare itatuwa da yawa ba tare da dasa wasu ba yana rage inuwa, yana barin ƙasa a buɗe, kuma yana rage mafakar dabbobi. [PAUSE 1] Me sharar da aka jefa a hanya za ta iya toshewa? [MAIN] Ka zuba shara a kwando, ka rage ɓarnar ruwa, ka kula da itace, kuma ka gaya wa babba idan ka ga matsala. Yara su yi aikin da ya dace da shekarunsu; kada su shiga magudana ko su taɓa abu mai haɗari. Manya da hukuma za su iya shirya kwashe shara da dasa itatuwa. [PAUSE 2] Me ya kamata a yi bayan sare itatuwa? [OUTRO] Yau ka zaɓi aikin kula da muhalli mai aminci: adana ruwa, amfani da kwandon shara, ko kula da itacen da ke kusa.",
    "audioFile": "audio/p3-socs-09.mp3",
    "imageCard": "images/p3-socs-09.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Me sharar da aka jefa a hanya za ta iya toshewa?", "correctAnswer": "magudanar ruwa", "options": ["magudanar ruwa", "hasken rana", "sautin rediyo"]},
      {"pauseAtMs": 150000, "questionHa": "Me ya kamata a yi bayan sare itatuwa?", "correctAnswer": "dasa wasu itatuwa", "options": ["barin ƙasa haka", "dasa wasu itatuwa", "ƙona sauran ciyayi"]}
    ],
    "quizQuestions": [
      {"templateHa": "Me sharar da aka jefa a hanya za ta iya toshewa?", "answerFormula": "magudanar ruwa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["hasken rana", "sautin rediyo", "launin ganye"]},
      {"templateHa": "Me ƙona shara kusa da gida zai iya gurɓatawa?", "answerFormula": "iska", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["littafi", "takalmi", "kujera"]},
      {"templateHa": "Me ya kamata a yi bayan sare itatuwa?", "answerFormula": "dasa wasu itatuwa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ƙona sauran ciyayi", "barin ƙasa haka", "jefa shara a wurin"]},
      {"templateHa": "Wane aiki ne yaro zai iya yi cikin aminci?", "answerFormula": "zuba shara a kwandon shara", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["shiga magudana", "ƙona shara", "taɓa abu mai haɗari"]},
      {"templateHa": "Me ƙananan ayyukan kula da muhalli suke yi idan an haɗa su?", "answerFormula": "suna inganta muhalli", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["suna ƙara shara", "suna toshe magudana", "suna rage tsafta"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p3-socs-10",
    "gradeband": "p3",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 10,
    "titleEn": "Food and Farming in Our Community",
    "titleHa": "Abinci da Noma a Al’ummarmu",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Noma yana taimaka wa al’umma ta sami abinci da aikin yi. A Arewacin Nijeriya, manoma suna shuka gero, dawa, wake, da gyada, gwargwadon ƙasa, ruwa, da lokacin damina. Wasu mutane kuma suna kiwon shanu, awaki, da kaji. Dabbobi na iya ba da madara, nama, ƙwai, ko taki, amma suna bukatar abinci, ruwa, mafaka, da kulawa. Aikin gona yana da matakai. Manomi yana shirya ƙasa, yana shuka iri, yana kula da amfanin gona, sannan yana girbi idan ya nuna. Bayan girbi, ana busarwa ko adanawa domin kada wasu amfanin gona su lalace. Daga gona, ana iya kai hatsi da wake kasuwa, inda masu saye suke samun abinci. Wasu kaya suna tafiya zuwa wasu garuruwa ko ƙasashe. Yaro zai iya lura da amfanin gona ko taimaka da aikin da babba ya tabbatar yana da aminci, amma kada ya yi amfani da kayan aiki masu haɗari shi kaɗai. Noma da kiwo suna haɗa manomi, mai ɗaukar kaya, da ɗan kasuwa, tare da iyalai.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi abinci da noma a al’ummarmu. [MAIN] Manoma a Arewacin Nijeriya suna shuka gero, dawa, wake, da gyada. Wasu mutane suna kiwon shanu, awaki, da kaji. Dabbobi na iya ba da madara, nama, ƙwai, ko taki, kuma suna bukatar abinci, ruwa, mafaka, da kulawa. [PAUSE 1] Waɗanne amfanin gona biyu ake shukawa a Arewacin Nijeriya? [MAIN] Manomi yana shirya ƙasa, yana shuka iri, yana kula da amfanin gona, sannan yana girbi. Bayan girbi, ana busarwa ko adanawa domin kada wasu amfanin gona su lalace. Daga gona, ana kai abinci kasuwa ko wasu wurare. Yara su yi aikin da babba ya tabbatar yana da aminci kawai. [PAUSE 2] Me ake yi wa wasu amfanin gona bayan girbi domin kada su lalace? [OUTRO] Idan ka ga hatsi ko wake a kasuwa, ka tuna da tafiyarsa daga shuka da girbi zuwa adanawa da sayarwa.",
    "audioFile": "audio/p3-socs-10.mp3",
    "imageCard": "images/p3-socs-10.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Waɗanne amfanin gona biyu ake shukawa a Arewacin Nijeriya?", "correctAnswer": "gero da dawa", "options": ["gero da dawa", "takalmi da riga", "littafi da biro"]},
      {"pauseAtMs": 150000, "questionHa": "Me ake yi wa wasu amfanin gona bayan girbi domin kada su lalace?", "correctAnswer": "ana busarwa ko adanawa", "options": ["ana jefawa a hanya", "ana busarwa ko adanawa", "ana barinsu cikin ruwa"]}
    ],
    "quizQuestions": [
      {"templateHa": "Wane amfanin gona ake shukawa a Arewacin Nijeriya?", "answerFormula": "gero", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["takalmi", "littafi", "gilashi"]},
      {"templateHa": "Waɗanne dabbobi ne ake kiwo a al’umma?", "answerFormula": "awaki", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["kujeru", "motoci", "tukwane"]},
      {"templateHa": "Me kaji za su iya bayarwa?", "answerFormula": "ƙwai", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["littafi", "takalmi", "rediyo"]},
      {"templateHa": "Me ake yi wa wasu amfanin gona bayan girbi?", "answerFormula": "ana busarwa ko adanawa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ana barinsu cikin ruwa", "ana jefawa a hanya", "ana ƙona su duka"]},
      {"templateHa": "Waɗanne mutane ne suke haɗuwa a tafiyar abinci daga gona?", "answerFormula": "manomi, mai ɗaukar kaya, da ɗan kasuwa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["direban jirgin sama kaɗai", "malami da ɗalibi kawai", "mai shela shi kaɗai"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p3-socs-11",
    "gradeband": "p3",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 11,
    "titleEn": "Market and Trade",
    "titleHa": "Kasuwa da Ciniki",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Kasuwa wuri ne da masu saye da masu sayarwa suke haɗuwa domin ciniki. A kasuwa, mai sayarwa yana kawo kaya kamar hatsi, kayan lambu, tufafi, ko kayan gida. Mai saya yana zaɓar abin da yake bukata, yana tambayar farashi, sannan su amince kafin biyan kuɗi. Farashi shi ne adadin kuɗin da ake nema a kan kaya. Zai iya bambanta saboda yawan kaya, ƙarancinsu, ingancinsu, ko kuɗin kawo su kasuwa. Kuɗi yana sauƙaƙa ciniki domin ana iya amfani da shi wajen sayen abubuwa daban-daban. Kafin kuɗi ya yawaita, mutane suna iya musayar kaya da kaya, kamar hatsi da dabba, idan duka ɓangarorin sun amince. Wannan hanya tana wahala idan mutum bai bukaci kayan ɗayan ba. Ciniki mai kyau yana bukatar gaskiya, aunawa daidai, kula da kuɗi, da magana cikin ladabi. Yaro ya je kasuwa tare da babba, ya tsaya kusa da shi, kuma kada ya karɓi ko bayar da kuɗi ba tare da izininsa ba. Kasuwa tana haɗa manoma, masu sana’a, masu sayarwa, da iyalai.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi kasuwa da ciniki. [MAIN] Mai sayarwa yana kawo kaya, mai saya kuma yana zaɓar abin da yake bukata. Suna tambayar farashi, su amince, sannan a biya kuɗi. Farashi shi ne adadin kuɗin da ake nema a kan kaya. Yana iya bambanta saboda yawan kaya, ƙarancinsu, ingancinsu, ko kuɗin kawo su kasuwa. [PAUSE 1] Me ake kira adadin kuɗin da ake nema a kan kaya? [MAIN] Mutane suna iya musayar kaya da kaya idan duka ɓangarorin sun amince, amma wannan yana wahala idan ɗaya bai bukaci kayan ɗayan ba. Ciniki mai kyau yana bukatar gaskiya, aunawa daidai, da ladabi. Yaro ya je kasuwa tare da babba ya kuma kula da kuɗi. [PAUSE 2] Wane hali ciniki mai kyau yake bukata? [OUTRO] Idan ka je kasuwa, ka lura da yadda ake tambayar farashi, aunawa daidai, da biyan kuɗi cikin ladabi.",
    "audioFile": "audio/p3-socs-11.mp3",
    "imageCard": "images/p3-socs-11.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Me ake kira adadin kuɗin da ake nema a kan kaya?", "correctAnswer": "farashi", "options": ["farashi", "girma", "launi"]},
      {"pauseAtMs": 150000, "questionHa": "Wane hali ciniki mai kyau yake bukata?", "correctAnswer": "gaskiya", "options": ["gaskiya", "yaudara", "rashin aunawa"]}
    ],
    "quizQuestions": [
      {"templateHa": "Wa yake kawo kaya domin sayarwa?", "answerFormula": "mai sayarwa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["mai tafiya kawai", "ɗan kallo", "mai barci"]},
      {"templateHa": "Me ake kira adadin kuɗin da ake nema a kan kaya?", "answerFormula": "farashi", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["launi", "girma", "nisa"]},
      {"templateHa": "Wace hanya ce ta ciniki ba tare da kuɗi ba?", "answerFormula": "musayar kaya da kaya", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ɓoye kaya", "jefa kaya", "ƙona kaya"]},
      {"templateHa": "Wane hali ciniki mai kyau yake bukata?", "answerFormula": "gaskiya", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["yaudara", "rashin aunawa", "zagi"]},
      {"templateHa": "Me ya sa musayar kaya da kaya za ta iya wahala?", "answerFormula": "ɗaya bai bukaci kayan ɗayan ba", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["kaya ba su da suna", "kasuwa ba ta da hanya", "kuɗi yana cikin ruwa"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p3-socs-12",
    "gradeband": "p3",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 12,
    "titleEn": "Nigerian Citizenship",
    "titleHa": "Zama Ɗan Ƙasar Nijeriya",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Ɗan ƙasa mutum ne da yake cikin wata ƙasa bisa dokarta. Kai ɗan ƙasar Nijeriya ne idan dokar ƙasa ta amince da hakan. Ƴan ƙasa suna da alaƙa da ƙasarsu ko da suna zaune a jihohi, garuruwa, ko al’adu daban-daban. Ɗan ƙasa yana da haƙƙoƙi da alhaki. Yara suna da haƙƙin suna, kulawa, koyo, kariya daga cutarwa, da faɗin ra’ayi cikin hanyar da ta dace da shekarunsu. Waɗannan haƙƙoƙi na yara ana girmama su a ƙasashe da yawa. Alhakin yaro ya haɗa da bin dokokin aminci, girmama haƙƙin wasu, kula da kayan jama’a, da faɗin gaskiya. Manya kuma suna da ƙarin alhaki bisa doka. Zama ɗan ƙasa ba yana nufin kowa yana da harshe ko al’ada ɗaya ba. Nijeriya tana da mutane masu bambancin harshe, addini, da al’ada, amma duk ƴan ƙasa suna iya taimakawa zaman lafiya da ci gaban ƙasa. Kyakkyawan ɗan ƙasa yana sanin haƙƙinsa, yana mutunta wasu, kuma yana yin alhakinsa.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi zama ɗan ƙasar Nijeriya. [MAIN] Ɗan ƙasa mutum ne da yake cikin wata ƙasa bisa dokarta. Ƴan ƙasa na iya zama a jihohi da garuruwa daban-daban. Ɗan ƙasa yana da haƙƙoƙi da alhaki. Yara suna da haƙƙin suna, kulawa, koyo, kariya daga cutarwa, da faɗin ra’ayi ta hanyar da ta dace. [PAUSE 1] Me ake kira mutumin da yake cikin wata ƙasa bisa dokarta? [MAIN] Alhakin yaro ya haɗa da bin dokokin aminci, girmama haƙƙin wasu, kula da kayan jama’a, da faɗin gaskiya. Wajen kayan jama’a, alhakin yaro shi ne kula da su. Zama ɗan ƙasa ba yana nufin kowa yana da harshe ko al’ada ɗaya ba. Ƴan ƙasa suna da al’adu daban-daban. Bambancin jama’a bai hana su taimaka wa zaman lafiya da ci gaban Nijeriya ba. [PAUSE 2] Wane alhaki ne yaro yake da shi ga kayan jama’a? [OUTRO] Ka nuna zama ɗan ƙasa nagari yau ta hanyar kula da kayan jama’a da mutunta haƙƙin wani.",
    "audioFile": "audio/p3-socs-12.mp3",
    "imageCard": "images/p3-socs-12.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Me ake kira mutumin da yake cikin wata ƙasa bisa dokarta?", "correctAnswer": "ɗan ƙasa", "options": ["ɗan ƙasa", "baƙo mai wucewa", "ɗan kallo"]},
      {"pauseAtMs": 150000, "questionHa": "Wane alhaki ne yaro yake da shi ga kayan jama’a?", "correctAnswer": "kula da su", "options": ["kula da su", "lalata su", "ɓoye su"]}
    ],
    "quizQuestions": [
      {"templateHa": "Me ake kira mutumin da yake cikin wata ƙasa bisa dokarta?", "answerFormula": "ɗan ƙasa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ɗan kallo", "baƙo mai wucewa", "mai tafiya"]},
      {"templateHa": "Wane haƙƙi ne yaro yake da shi?", "answerFormula": "koyo", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["cutar da wani", "lalata kaya", "karya doka"]},
      {"templateHa": "Wane alhaki ne yaro yake da shi ga kayan jama’a?", "answerFormula": "kula da su", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["lalata su", "ɓoye su", "wasa da su"]},
      {"templateHa": "Shin zama ɗan ƙasa yana nufin kowa yana da al’ada ɗaya?", "answerFormula": "Ƴan ƙasa suna da al’adu daban-daban", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["kowa dole ya zama iri ɗaya", "harshe ɗaya ake da shi", "babu al’ada a Nijeriya"]},
      {"templateHa": "Ta yaya yaro zai nuna zama ɗan ƙasa nagari?", "answerFormula": "girmama haƙƙin wasu", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["raina al’adun wasu", "lalata kayan jama’a", "ƙin bin dokar aminci"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p3-socs-13",
    "gradeband": "p3",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 13,
    "titleEn": "Our Cultural Heritage — Food, Dress, and Language",
    "titleHa": "Abinci, Tufafi, da Harshe a Al’adunmu",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "Al’ada ita ce hanyar rayuwar da al’umma take koya wa ’ya’yanta. Abinci, tufafi, da harshe suna nuna wasu ɓangarorin al’ada da ake gada daga waɗanda suka gabata. A Arewacin Nijeriya, wasu iyalai suna dafa tuwo da miya, suna sa babbar riga, zane, ko wasu tufafin yankinsu, kuma suna magana da Hausa, Fulfulde, Kanuri, ko wasu harsuna. A wasu sassan Nijeriya, ana samun abinci, tufafi, da harsunan Yoruba, Igbo, da al’ummomi da dama. Misalan suna bambanta tsakanin iyali da yanki; ba kowa ne yake ci, sawa, ko magana iri ɗaya ba. Ana kiyaye al’ada ta hanyar koya wa yara harshe, dabarun girki, sana’ar ɗinki, labarai, da ma’anar tufafi cikin girmamawa. Al’ada tana iya canzawa yayin da mutane suke koyon sabbin hanyoyi, amma ana iya adana abin da yake da amfani ga al’umma. Girmama al’adun wasu ba yana nufin barin naka ba. Yana nufin sauraro, tambaya cikin ladabi, da guje wa raini. Bambancin al’adu yana ƙara mana ilimi game da Nijeriya.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi abinci, tufafi, da harshe a al’adunmu. [MAIN] Al’ada ita ce hanyar rayuwar da al’umma take koya wa ’ya’yanta. Abinci, tufafi, da harshe suna daga abubuwan da ake gada. A Arewa, wasu iyalai suna dafa tuwo da miya, suna sa babbar riga ko zane, kuma suna magana da Hausa, Fulfulde, Kanuri, ko wasu harsuna. A sauran sassan Nijeriya ma akwai abinci, tufafi, da harsuna iri-iri. [PAUSE 1] Waɗanne abubuwa uku ne suke nuna ɓangarorin al’ada? [MAIN] Ana kiyaye al’ada ta koya wa yara harshe, girki, ɗinki, da labarai. Ba kowa ne yake ci, sawa, ko magana iri ɗaya ba. Girmama al’adun wasu yana nufin sauraro da guje wa raini, ba barin naka ba. [PAUSE 2] Ta yaya za ka nuna girmama al’adun wasu? [OUTRO] Ka tambayi babba labarin wani abinci, tufa, ko harshe na iyalinku, sannan ka saurara ba tare da raina na wasu ba.",
    "audioFile": "audio/p3-socs-13.mp3",
    "imageCard": "images/p3-socs-13.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Waɗanne abubuwa uku ne suke nuna ɓangarorin al’ada?", "correctAnswer": "abinci, tufafi, da harshe", "options": ["abinci, tufafi, da harshe", "mota, jirgi, da hanya", "kujera, allo, da biro"]},
      {"pauseAtMs": 150000, "questionHa": "Ta yaya za ka nuna girmama al’adun wasu?", "correctAnswer": "sauraro da guje wa raini", "options": ["sauraro da guje wa raini", "yin dariya gare su", "ƙin sauraron bayani"]}
    ],
    "quizQuestions": [
      {"templateHa": "Me al’ada take nufi?", "answerFormula": "hanyar rayuwar da al’umma take koya wa ’ya’yanta", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["launin mota", "girman gida", "nisa zuwa kasuwa"]},
      {"templateHa": "Wane abu ne yake nuna ɓangaren al’ada?", "answerFormula": "harshe", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["layin dogo", "magudanar ruwa", "fitilar hanya"]},
      {"templateHa": "Wane abinci aka ambata daga Arewacin Nijeriya?", "answerFormula": "tuwo da miya", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["takarda da biro", "yashi da dutse", "ganye da itace"]},
      {"templateHa": "Ta yaya ake iya kiyaye al’ada?", "answerFormula": "koya wa yara harshe", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["hana yara tambaya", "raina tsofaffi", "lalata kayan al’ada"]},
      {"templateHa": "Ta yaya za ka nuna girmama al’adun wasu?", "answerFormula": "sauraro da guje wa raini", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ƙin sauraron bayani", "ƙin jin harshensu", "yin dariya gare su"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p3-socs-14",
    "gradeband": "p3",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 14,
    "titleEn": "Festivals and Special Occasions in Nigeria",
    "titleHa": "Bukukuwa da Ranaku na Musamman a Nijeriya",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "A Nijeriya, al’ummomi suna da bukukuwa da ranaku na musamman na addini, girbi, iyali, ko ƙasa. Eid al-Fitr biki ne da Musulmi suke yi bayan an kammala azumin Ramadan. Eid al-Adha biki ne da Musulmi suke tunawa da biyayya da sadaukarwa. Christmas rana ce da Kiristoci suke tunawa da haihuwar Yesu Almasihu. New Yam kuwa bikin girbi ne da wasu al’ummomi suke yi lokacin fara cin sabuwar doya. Ba duk al’ummomi ne suke yin biki iri ɗaya ko ta hanya ɗaya ba. Gwamnatin Tarayya tana ayyana wasu ranaku a matsayin hutun jama’a, ciki har da ranakun Eid al-Fitr, Eid al-Adha, da Christmas; New Yam ba hutun jama’a na ƙasa baki ɗaya ba ne. A biki, mutane na iya yin addu’a, gaisuwa, ziyara, cin abinci, ko nuna al’adunsu bisa yadda al’ummarsu take yi. Ya kamata a bayyana kowanne biki cikin gaskiya, a girmama masu yin sa, kuma kada a ce wani ya fi wani. Tsaro, tsafta, da ladabi suna da muhimmanci a kowane taro.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa. Yau za mu koyi bukukuwa da ranaku na musamman a Nijeriya. [MAIN] Eid al-Fitr yana zuwa bayan an kammala azumin Ramadan. Eid al-Adha yana tuna biyayya da sadaukarwa. Christmas rana ce da Kiristoci suke tunawa da haihuwar Yesu Almasihu. New Yam bikin girbi ne da wasu al’ummomi suke yi lokacin fara cin sabuwar doya. Ba duk al’ummomi ne suke yin biki iri ɗaya ba. [PAUSE 1] Wane biki ne yake zuwa bayan an kammala azumin Ramadan? [MAIN] Gwamnatin Tarayya tana iya ayyana ranakun Eid al-Fitr, Eid al-Adha, da Christmas a matsayin hutun jama’a. New Yam kuwa ba hutun jama’a na ƙasa baki ɗaya ba ne. A girmama masu yin kowane biki, kada a ce wani ya fi wani. A kula da tsaro, tsafta, da ladabi a taro. [PAUSE 2] Shin New Yam hutun jama’a ne na ƙasa baki ɗaya? [OUTRO] Idan ka ji sunan wani biki a Nijeriya, ka tambayi abin da yake tunawa da kuma ko hutun ƙasa ne, ba tare da raina masu yin sa ba.",
    "audioFile": "audio/p3-socs-14.mp3",
    "imageCard": "images/p3-socs-14.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Wane biki ne yake zuwa bayan an kammala azumin Ramadan?", "correctAnswer": "Eid al-Fitr", "options": ["Eid al-Fitr", "New Yam", "Christmas"]},
      {"pauseAtMs": 150000, "questionHa": "Shin New Yam hutun jama’a ne na ƙasa baki ɗaya?", "correctAnswer": "a’a, bikin wasu al’ummomi ne", "options": ["eh, hutun ƙasa ne", "a’a, bikin wasu al’ummomi ne", "ba a yin sa a Nijeriya"]}
    ],
    "quizQuestions": [
      {"templateHa": "Wane biki ne yake zuwa bayan an kammala azumin Ramadan?", "answerFormula": "Eid al-Fitr", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["New Yam", "Christmas", "ranar kasuwa"]},
      {"templateHa": "Me Eid al-Adha yake tunawa?", "answerFormula": "biyayya da sadaukarwa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["fara sabuwar doya", "haihuwar Yesu Almasihu", "buɗe kasuwa"]},
      {"templateHa": "Me Kiristoci suke tunawa a Christmas?", "answerFormula": "haihuwar Yesu Almasihu", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["fara girbin gero", "gina sabuwar hanya", "buɗe makaranta"]},
      {"templateHa": "Wane irin biki ne New Yam?", "answerFormula": "bikin girbi", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["bikin sufuri", "bikin sadarwa", "bikin gina hanya"]},
      {"templateHa": "Wane hali ya dace idan ana magana game da bukukuwa daban-daban?", "answerFormula": "kada a ce wani ya fi wani", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["katse bayanin wani", "ƙin sauraro", "yin hayaniya"]}
    ],
    "track": "formal",
    "targetAudience": "youth",
    "gapTeaser": null,
    "chainNext": null,
    "isChainLeaf": true,
    "useTodayPrompt": null
  },
  {
    "id": "p3-socs-15",
    "gradeband": "p3",
    "subject": "Social Studies",
    "subjectHa": "Nazarin Zamantakewa",
    "moduleNumber": 15,
    "titleEn": "Revision and Assessment — P3 Social and Citizenship Studies",
    "titleHa": "Bita da Tantancewa — Nazarin Zamantakewa na Aji Uku",
    "titleAjami": null,
    "ajami_validated": false,
    "textExplanationHa": "A wannan bita, ka haɗa manyan darussan Nazarin Zamantakewa na aji uku. Ka tuna cewa darasin yana koya yadda mutane suke rayuwa tare da yin alhaki. Ƙaramar hukuma tana sauraron bukatun yankinta kuma tana taimakawa wajen wasu ayyukan jama’a. Sufuri yana ɗaukar mutane da kaya ta hanya, dogo, sama, ko ruwa; rigar kariya ta ruwa tana da muhimmanci a jirgin ruwa. Sadarwa tana isar da saƙo ta hanyoyin gargajiya da na zamani. Muhalli ya haɗa da ƙasa, ruwa, iska, da halittu, kuma kowa zai iya taimakawa wajen kula da shi. Noma da kiwo suna samar da abinci, kasuwa kuma tana haɗa masu saye da masu sayarwa. Ɗan ƙasa yana da haƙƙoƙi da alhaki, ciki har da mutunta wasu da kula da kayan jama’a. Akwai ruwa, gero, da harshe a darussan muhalli, abinci, da al’ada. Don tantance kanka, ka bayyana ma’anar abu, ka ba da misali, sannan ka faɗi aikin da ya dace. Idan ka haɗa sani da kyakkyawan aiki, ka shirya shiga darussan aji huɗu.",
    "textExplanationAjami": null,
    "audioScript": "[INTRO] Sannu da zuwa bitar Nazarin Zamantakewa na aji uku. [MAIN] Ka tuna da ƙaramar hukuma da ayyukan jama’a, sufuri da dokokin tsaro, da sadarwa ta gargajiya da zamani. Ka kuma tuna cewa muhalli ya haɗa da ƙasa, ruwa, iska, da halittu. Noma da kiwo suna samar da abinci, kasuwa kuma tana taimaka wa ciniki. [PAUSE 1] Me sadarwa take nufi? [MAIN] Ɗan ƙasa yana da haƙƙoƙi da alhaki. Al’adun Nijeriya suna bayyana ta abinci, tufafi, harshe, da bukukuwa. A bita, ka bayyana ma’ana, ka ba da misali, sannan ka faɗi aikin da ya dace. Misali, a jirgin ruwa a sa rigar kariya ta ruwa; a muhalli a zuba shara a kwando. [PAUSE 2] Me ya kamata matafiyi ya sa a jirgin ruwa domin tsaro? [OUTRO] Ka zaɓi jigogi uku daga aji uku—al’umma, sufuri, sadarwa, muhalli, abinci, ciniki, zama ɗan ƙasa, ko al’ada—ka bayyana gaskiya ɗaya da aikin kirki ɗaya daga kowanne.",
    "audioFile": "audio/p3-socs-15.mp3",
    "imageCard": "images/p3-socs-15.png",
    "microPauses": [
      {"pauseAtMs": 90000, "questionHa": "Me sadarwa take nufi?", "correctAnswer": "isar da saƙo", "options": ["isar da saƙo", "gina hanya", "shuka itace"]},
      {"pauseAtMs": 150000, "questionHa": "Me ya kamata matafiyi ya sa a jirgin ruwa domin tsaro?", "correctAnswer": "rigar kariya ta ruwa", "options": ["rigar kariya ta ruwa", "hular kasuwa", "takalmin makaranta"]}
    ],
    "quizQuestions": [
      {"templateHa": "Wace hukuma ce take kusa da jama’ar gari da ƙauye?", "answerFormula": "ƙaramar hukuma", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["ƙungiyar wasa", "ajin makaranta", "gidan iyali"]},
      {"templateHa": "Me ya kamata matafiyi ya sa a jirgin ruwa domin tsaro?", "answerFormula": "rigar kariya ta ruwa", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["hular kasuwa", "tabarma", "takalmin makaranta"]},
      {"templateHa": "Me sadarwa take nufi?", "answerFormula": "isar da saƙo", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["gina hanya", "ɗaukar ruwa", "ɓoye kaya"]},
      {"templateHa": "Wane alhaki ne ɗan ƙasa yake da shi ga kayan jama’a?", "answerFormula": "kula da kayan jama’a", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["lalata kayan jama’a", "ɓoye kayan jama’a", "wasa da kayan jama’a"]},
      {"templateHa": "Wane jerin ne ya haɗa abin muhalli, abinci, da al’ada?", "answerFormula": "ruwa, gero, da harshe", "variableRanges": {"a": {"min": 0, "max": 0}, "b": {"min": 0, "max": 0}}, "distractorFormulas": ["mota, takalmi, da kujera", "ganga, jirgi, da hanya", "rediyo, kuɗi, da magudana"]}
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

All applicable §12 source gates pass. This is a **source-only draft candidate** for Architect review and human Hausa/content validation. It has not been integrated into `app/content.json`; no rollback is required.
