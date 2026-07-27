# AJAMIX — Architect Brief: Social and Citizenship Studies Content Build, P3 → P6

> **Status: M2 BUILD-COMPLETE SOURCE-ONLY — M0 provisional matrix approved as working basis; M1 `p3-socs-01..06` approved/patched; M2 `p3-socs-07..15` built and verified. Awaiting human review before M3.**

---

## 1. Role split for this workstream

| Role | Who | Responsibility |
|------|-----|----------------|
| **Architect / Dispatcher / Reviewer** | Claude | Owns this brief, schema contract, acceptance criteria, slice review. Dispatches each bounded build slice to Codex through the `dispatch-codex` skill. Independently validates every gate before approving. Does NOT author module content. |
| **Builder** | Codex | Authors module JSON to spec. Invoked through `dispatch-codex`; receives one bounded slice at a time. Separate `--output-last-message` and detailed-report paths mandatory on every dispatch. |
| **Hausa & sensitive-topic authority** | User (Muhammad) | The only authority that turns drafted Hausa into shippable Hausa (Gates 3–4 of `docs/VALIDATION-CHECKLIST.md`). Reviews all sensitive-topic modules explicitly before slice approval. Escalates to TIMSAN only when unsure — Claude and Codex do not route to TIMSAN directly. |
| **Orthography escalation** | TIMSAN | Consulted only when the user is uncertain and chooses to escalate. |

ChatGPT is not a role in this workstream. Do not route module authoring through ChatGPT.

---

## 2. Curriculum declaration

**Declared target: NERDC 2025 revised curriculum — *Social and Citizenship Studies*, Primary 1–6.**

The official grade-level document was not publicly accessible during M0: the NERDC LMIS delivery was login-gated, while the public NERDC implementation strategy and subject notice confirmed the subject and grade bands but did not expose grade-level strands or objectives. With the user's explicit approval, M0 therefore used the best available public sources and marked every mapping `BEST-EFFORT — NOT VERIFIED AGAINST OFFICIAL NERDC GRADE DOCUMENT`. The matrix is provisional and must be reconciled if the official grade document becomes available.

The 2025 NERDC revision split the legacy National Values Curriculum into separate subjects. For Primary 3–6, the relevant separate subjects are:

- **Social and Citizenship Studies** — civic life, community, governance, rights, environment, identity, global awareness.
- **Nigerian History** — pre-colonial kingdoms, colonial period, independence, post-independence narrative.

AJAMIX's existing subject slot (`subject: "Social Studies"`, `subjectHa: "Nazarin Zamantakewa"`) maps to the **Social and Citizenship Studies** strand. Nigerian History content is **excluded from this workstream** — it belongs to a separate future curriculum build.

**What this means for the topic map:**

- Modules previously proposed as `p4-socs-03` (Pre-colonial kingdoms) and `p4-socs-04` (Colonial period and independence) are removed and replaced (see §5).
- `p6-socs-11` (Heroes and Heroines) is reframed as *Civic Role Models* — focused on the civic contribution of notable Nigerians, not on historical narrative. Historical context is kept to one-sentence biography maximum; civic contribution is the lesson substance.
- Any remaining topic that is primarily historical rather than civic must be flagged by Codex in the milestone report for Architect ruling before inclusion.

**M0 cross-check (completed 2026-07-14):** Codex produced a **source-grounded, explicitly provisional alignment matrix** for all 60 proposed modules before authoring any. For each module, the matrix specifies:

| Column | Content |
|--------|---------|
| Module ID | e.g. `p3-socs-01` |
| Curriculum version | NERDC 2025 target plus the actual public source used |
| Grade | P3 / P4 / P5 / P6 |
| Strand / theme | public-source topic family; never misrepresented as an official NERDC strand |
| Topic or objective | paraphrased public-source basis |
| Source page / section | public document reference |
| Classification | Direct coverage / Combined coverage / Enrichment |

Matrix path: `tasks/2026-07-14-M0-alignment-matrix.md`. It contains exactly 60 unique rows (15 per grade), with no gaps or duplicate IDs. Architect and user approval of this provisional-source basis was granted before M1 source authoring; the matrix remains provisional until the official grade-level NERDC document becomes available.

**Secondary enrichment:** Cambridge and international civic/global-awareness practices that deepen the Nigerian content without replacing it. Global enrichment stays subordinate — it fills gaps and adds transferable skills, never displaces a NERDC topic or introduces content that conflicts with the official curriculum.

---

## 3. What AJAMIX is and how it's built

Offline-first PWA (vanilla JS) delivering the Nigerian curriculum in Hausa for Northern Nigeria — primarily tsangaya students literate in Ajami but with limited formal schooling, plus adult learners. Content is audio-primary Hausa, with interactive micro-pause questions, randomized quizzes, and a flame-streak engagement loop, running fully offline on low-end Android (1GB RAM, 16GB storage).

- **Content = one bundle:** `app/content.json` (modules + gradeBands + glossary + activities).
- **Quiz engine** (`app/quiz-engine.js`): parameterized templates → random instances. **Social and Citizenship Studies quizzes are non-numeric** — literal Hausa answer strings (see §7).
- **Current build is Latin-first.** Builder authors Latin Hausa only; all Ajami fields stay `null`.
- **`gradeBands` already lists `p3`–`p6`** (populated by the Mathematics arc). Pure content workstream — no engine or schema change required.

---

## 4. Current Social Studies state

### Live P1/P2 modules (30 total — frozen; must never be modified by this workstream)

| Band | Count | IDs | Key topics |
|------|:---:|-----|-----|
| p1 | 15 | `p1-socs-01..15` | Meaning of social studies, family, school, community, culture, respect |
| p2 | 15 | `p2-socs-01..15` | Family duties, community, occupations, market, rules, leaders, Nigerian symbols, environment |

**`subjectHa` for all Social Studies / Social and Citizenship Studies modules: `Nazarin Zamantakewa`** — exactly this string, all bands. Never `Zamantakewa` alone, never `Karatun Al'umma`.

### P3–P6 target

- **15 modules × 4 bands = 60 new modules.**
- M0 preflight must read and record the **verified live `app/content.json` module count** before any slice is authored. Do not hardcode a pre-M0 estimate. Post-build expected count = live count + 60. The guarded merge script validates the exact expected increase per slice and fails on partial ID presence.

---

## 5. Sensitivity and neutrality rules (non-negotiable)

These apply to every module. Codex attestation and Architect independent check required at every milestone.

1. **Religion:** present Islamic practice (prayer, fasting, zakat, community) and other traditions factually and descriptively as part of Nigerian civic/cultural life. No prescriptive religious instruction, no comparative ranking, no framing of any tradition as superior.
2. **Politics and governance:** describe roles and structures. Never endorse a party, candidate, or political ideology.
3. **Gender:** reflect contemporary Nigerian civic norms without stereotyping domestic or leadership roles by gender.
4. **Ethnicity:** represent Nigeria's diversity (Hausa/Fulani, Yoruba, Igbo, and others) honestly, without ranking or caricature. Northern Nigerian examples are privileged in the audio script (the learner's lived world), but other regions appear throughout, especially in citizenship/national-identity modules.
5. **History (in civic context only):** civic context for pre-independence events is acceptable (e.g. date of independence, the concept of sovereignty) but historical narrative belongs to the Nigerian History subject. Do not attribute national problems to a single ethnic group or external actor in a way that promotes grievance.
6. **Conflict:** present conflict resolution as a civic/social skill. Do not depict any existing conflict zone, militant group, or sectarian dispute specifically.

**Modules requiring explicit neutrality review** (Codex must include a neutrality attestation in the milestone report for each):

- `p4-socs-03`, `p5-socs-05`, `p5-socs-06`, `p5-socs-14`
- `p6-socs-02`, `p6-socs-03`, `p6-socs-05`, `p6-socs-07`, `p6-socs-09`, `p6-socs-11`

---

## 6. Canonical topic map (60 modules)

### P3 Social and Citizenship Studies (15 modules)

| ID | English title | Core SCS strand | Global enrichment |
|----|--------------|-----------------|-------------------|
| p3-socs-01 | The Meaning and Importance of Social and Citizenship Studies | Civic literacy; why we study how people live together | — |
| p3-socs-02 | Our Local Government Area | LGA structure, ward offices, councillors; LGA services | Concept of local government globally |
| p3-socs-03 | Community Needs and Services | Water, health, roads, schools in an LGA | Community-needs mapping |
| p3-socs-04 | Transportation — Road and Rail | Road/rail in Nigeria; road safety rules | — |
| p3-socs-05 | Transportation — Air and Water | Air/sea transport in Nigeria; safety | International travel/trade (brief) |
| p3-socs-06 | Communication — Traditional Methods | Town crier, drum, talking drum, market announcements | — |
| p3-socs-07 | Communication — Modern Methods | Radio, TV, telephone, mobile phone (access in Nigeria); responsible use | Digital communication globally |
| p3-socs-08 | Our Natural Environment | Land, water, air, forests; Northern Nigerian landscape | Biomes; global water scarcity |
| p3-socs-09 | Caring for Our Environment | Litter, burning, deforestation; community clean-up; individual responsibility | SDGs (age-appropriate) |
| p3-socs-10 | Food and Farming in Our Community | Crops (millet, guinea corn, beans, groundnuts), livestock (cattle, goats, poultry) | Global food systems (brief) |
| p3-socs-11 | Market and Trade | Local market, buying/selling, barter vs money, prices | — |
| p3-socs-12 | Nigerian Citizenship | Being a Nigerian, rights and responsibilities, civic identity | Universal children's rights (UNCRC, simple) |
| p3-socs-13 | Our Cultural Heritage — Food, Dress, and Language | Northern Nigerian examples; national diversity including other regions | UNESCO cultural heritage |
| p3-socs-14 | Festivals and Special Occasions in Nigeria | Eid al-Fitr, Eid al-Adha, New Yam, Christmas (described factually and neutrally); national public holidays | — |
| p3-socs-15 | Revision and Assessment — P3 Social and Citizenship Studies | Consolidation of P3 topics; bridge to P4 | — |

### P4 Social and Citizenship Studies (15 modules)

> Note: `p4-socs-03` and `p4-socs-04` were previously Pre-colonial Kingdoms and Colonial Period/Independence. Those topics belong to the Nigerian History subject and are removed. Replacements are below.

| ID | English title | Core SCS strand | Global enrichment |
|----|--------------|-----------------|-------------------|
| p4-socs-01 | Nigeria — Our Country | Size, location, 36 states + FCT, geopolitical zones, capital cities | — |
| p4-socs-02 | The Nigerian People — Ethnic Groups and Languages | Major and minor groups; Hausa, Yoruba, Igbo and others; unity in diversity | — |
| p4-socs-03 | Nigeria's Geography — Landscape and Regions | Vegetation zones (Sahel, Sudan savanna, forest, mangrove); major rivers (Niger, Benue); resource distribution | Geographic diversity globally |
| p4-socs-04 | National Identity — Our Flag, Anthem, Pledge, and Symbols | Coat of arms, flag colours and meaning, national anthem, pledge; why symbols unite citizens | — |
| p4-socs-05 | Nigerian Government — The Three Tiers | Federal, state, local government; functions and examples of each | Federal systems worldwide (brief) |
| p4-socs-06 | The Three Arms of Government | Executive, legislative, judiciary; separation of powers; why checks and balances matter | — |
| p4-socs-07 | Democracy and Elections | What democracy means; role of citizens; voting; INEC; why one person, one vote matters | Democracies globally |
| p4-socs-08 | Nigerian Economy — Agriculture | Farming, food crops, cash crops (cocoa, groundnuts, palm oil), livestock; FADAMA | — |
| p4-socs-09 | Nigerian Economy — Industry and Trade | Oil and gas (descriptive), manufacturing, trade; ports and markets | Global supply chains (brief) |
| p4-socs-10 | Population and Settlement | Urban vs rural; Northern Nigerian cities (Kano, Kaduna, Maiduguri, Sokoto); what census is | — |
| p4-socs-11 | Migration and Urbanisation | Why people move between regions; rural–urban migration; city challenges and opportunities | Global urbanisation (brief) |
| p4-socs-12 | Social Problems — Poverty and Community Responses | Causes; government and community responses; self-help groups | SDG 1: No Poverty |
| p4-socs-13 | Social Problems — Child Labour and Child Rights | What child labour is; why it happens; children's right to education and play | UNCRC Article 32 |
| p4-socs-14 | Cooperation — Family, Community, Nation | Teamwork; communal work (gayya); national unity; how cooperation solves shared problems | International cooperation (UN, AU — brief) |
| p4-socs-15 | Revision and Assessment — P4 Social and Citizenship Studies | Consolidation of P4 topics; bridge to P5 | — |

### P5 Social and Citizenship Studies (15 modules)

| ID | English title | Core SCS strand | Sensitive gate |
|----|--------------|-----------------|----------------|
| p5-socs-01 | Natural Resources of Nigeria | Land, water, minerals, forests; oil and gas (descriptive) | — |
| p5-socs-02 | Conservation of Natural Resources | Sustainable use; deforestation, erosion, overgrazing; individual and community action | Renewable energy (brief) |
| p5-socs-03 | Environmental Pollution | Air, water, land pollution; causes in Nigeria; health effects; what citizens can do | Global climate change (age-appropriate) |
| p5-socs-04 | Disaster Preparedness and Safety | Floods, fires, road accidents; community warning systems; what to do and not do | Global disaster response |
| p5-socs-05 | The Nigerian Constitution and Rule of Law | What a constitution is; rule of law; rights and duties under the constitution — taught thematically, not by section number | Constitutions worldwide |
| p5-socs-06 | Civic Education — Rights and Responsibilities | Categories of fundamental human rights; responsibilities that balance rights — thematic, not section-memorisation | Universal Declaration of Human Rights |
| p5-socs-07 | Social Issues — Drug Abuse | *(Sensitive — user sign-off on full Hausa draft required before slice approval — see §8)* | — |
| p5-socs-08 | Social Issues — Conflict and Conflict Resolution | Types of conflict (family, school, community); peaceful resolution skills; mediation; why dialogue works | — |
| p5-socs-09 | The Nigerian Family — Change and Continuity | Extended vs nuclear family; changing roles; responsibilities; family values and relationships | — |
| p5-socs-10 | Education and Its Importance | Formal, non-formal, informal education; Universal Basic Education (UBE); girl-child education | Global literacy; SDG 4 |
| p5-socs-11 | Nigeria and Africa — ECOWAS and the African Union | ECOWAS founding, purpose, and member states *(verified at build time — no fixed count in brief)*; AU; regional cooperation | — |
| p5-socs-12 | Nigeria and the World — United Nations | UN founding and purpose; key bodies (General Assembly, Security Council, UNICEF); Nigeria's participation | — |
| p5-socs-13 | Cultural Diversity and National Unity | Ethnic/religious diversity as strength; NYSC; national integration | Multicultural societies globally |
| p5-socs-14 | Leadership and Good Governance | Qualities of a good leader; corruption named and defined (age-appropriate); role of citizens in accountability | Anti-corruption bodies (ICPC/EFCC, simply described) |
| p5-socs-15 | Revision and Assessment — P5 Social and Citizenship Studies | Consolidation of P5 topics; bridge to P6 | — |

### P6 Social and Citizenship Studies (15 modules)

| ID | English title | Core SCS strand | Sensitive gate |
|----|--------------|-----------------|----------------|
| p6-socs-01 | Globalisation and Its Effects | What globalisation is; technology, trade, culture mixing; effects on Nigeria — opportunities and challenges | — |
| p6-socs-02 | Human Rights — Deeper Study | Categories of rights (civil, political, economic, social, cultural); what a rights violation looks like; how citizens seek redress | International human-rights bodies |
| p6-socs-03 | Gender Equality and Women's Empowerment | *(Sensitive — user sign-off on tone before drafting — see §8)* | — |
| p6-socs-04 | Sustainable Development | Meaning; three pillars (economic, social, environmental); examples from Nigeria | SDGs overview |
| p6-socs-05 | Electoral Process — Deeper Study | Voter registration, campaigns, voting day, counting, results announcement, petition process; INEC roles | — |
| p6-socs-06 | The Nigerian Judiciary — Protecting Rights | Courts and their roles: Magistrate Courts handle many first cases; High Courts hear important matters and some appeals; Court of Appeal reviews specified decisions; Supreme Court of Nigeria is the highest court. Nigeria also has parallel state, Sharia and customary court structures — present this honestly rather than as one simple ladder | — |
| p6-socs-07 | Social Cohesion — Inter-ethnic and Inter-religious Tolerance | Historical coexistence; shared civic identity; dialogue and mediation bodies | — |
| p6-socs-08 | Migration — Internal and International | Economic migration; IDPs and refugees in Nigeria and globally; UNHCR (simple); rights of displaced persons | — |
| p6-socs-09 | Safety and Security — Staying Safe as a Citizen | *(Sensitive — user sign-off on full Hausa draft required before slice approval — see §8)* | — |
| p6-socs-10 | Technology and Society | Mobile phones, internet, social media; benefits and risks; cyberbullying; staying safe online | — |
| p6-socs-11 | Civic Role Models in Nigeria | Civic contributions of notable Nigerians — Nana Asma'u, Aminu Kano, Funmilayo Ransome-Kuti, Herbert Macaulay, Wole Soyinka — framed around their civic/community impact, not historical narrative; diverse across gender, region, and era; one-sentence biography maximum, rest is civic contribution | — |
| p6-socs-12 | Population Growth and Civic Responsibility | Nigeria's population scale and trajectory; effects on healthcare, food, schools; civic and community responsibility — no undated figures; any statistic must include its reference year and authoritative source | — |
| p6-socs-13 | Entrepreneurship and Self-Reliance | Small business; practical skills (tailoring, farming, crafts, trade); role of Bank of Agriculture and BOI *(not NACRDB — institution no longer current)*; why self-reliance strengthens communities | — |
| p6-socs-14 | Peace Education and Conflict Prevention | Defining peace; community peace-building; dialogue; role of youth in peacebuilding | UNICEF peace-education framework (simple) |
| p6-socs-15 | Revision and Consolidation — Bridge to JSS1 | Full P3–P6 Social and Citizenship Studies summary; civic identity; readiness for Junior Secondary | — |

---

## 7. Sensitive-topic controls (per module)

### `p5-socs-07` — Drug Abuse (user sign-off required before slice approval)

- Harmonise with the existing AJAMIX safety treatment standard (non-stigmatising, age-appropriate, NAFDAC framing).
- Named substances limited to: `taba` (tobacco/cigarettes), `giya` (alcohol), and medicines not approved or provided by a parent, doctor, or health worker.
- **Prohibited:** illicit-drug catalogue, street names, methods of use, procurement, concealment, or intoxication descriptions.
- Frame around: what drug misuse is, why it is harmful to health and family, and how to refuse peer pressure and seek help from a trusted adult.
- Codex drafts full Hausa text; Architect flags it explicitly in the M4 milestone report; user reviews it before M4 is approved.

### `p6-socs-09` — Safety and Security (user sign-off required before slice approval)

- **Title changed** from "Terrorism and Security" to "Safety and Security — Staying Safe as a Citizen." Content teaches personal and community safety, not counterterrorism awareness.
- **Prohibited:** extremist group names, tactics, recruitment narratives, attack methods, current conflict-zone examples, community-level warning signs, profiling by religion, clothing, ethnicity or behaviour.
- Focus exclusively on: moving away from immediate danger, not touching suspicious or unknown objects, following official instructions, telling a trusted adult or calling emergency services.
- Codex drafts full Hausa text; Architect flags explicitly in M5 milestone report; user reviews before M5 is approved.

### `p6-socs-03` — Gender Equality and Women's Empowerment (user sign-off on tone before drafting)

- At the start of the P6 slice, Architect surfaces the proposed framing to the user before dispatching Codex.
- Content should reflect girls' rights to education and to pursue any lawful occupation; women in Nigerian public, professional, and community life; civic equality.
- Do not include prescriptive statements about domestic roles, marriage, or reproduction.
- Do not introduce content that conflicts with the learner's religious or cultural context without framing it as civic rights, not cultural critique.

Family planning is excluded from `p5-socs-09`. M0 found no supporting public P5 objective, and the official grade document was unavailable. Reconsider only if that official document later confirms the objective and the user explicitly approves reopening the scope.

---

## 8. Schema contract

Every new module is an object in `content.json.modules[]` with **exactly these keys**, modeled on existing `p2-socs-01`:

```json
{
  "id": "p3-socs-01",
  "gradeband": "p3",
  "subject": "Social Studies",
  "subjectHa": "Nazarin Zamantakewa",
  "moduleNumber": 1,
  "titleEn": "<English title>",
  "titleHa": "<Hausa title>",
  "titleAjami": null,
  "ajami_validated": false,
  "textExplanationHa": "<120–170 words of natural Hausa. Correct hooked letters ɓ ɗ ƙ. Second person, warm, concrete examples from a Northern Nigerian child's world.>",
  "textExplanationAjami": null,
  "audioScript": "[INTRO] ... [MAIN] ... [PAUSE 1] <question — must exactly match microPauses[0].questionHa> ... [MAIN] ... [PAUSE 2] <question — must exactly match microPauses[1].questionHa> ... [OUTRO] ...",
  "audioFile": "audio/p3-socs-01.mp3",
  "imageCard": "images/p3-socs-01.png",
  "microPauses": [
    { "pauseAtMs": 90000, "questionHa": "…", "correctAnswer": "…", "options": ["…","…","…"] },
    { "pauseAtMs": 150000, "questionHa": "…", "correctAnswer": "…", "options": ["…","…","…"] }
  ],
  "quizQuestions": [
    {
      "templateHa": "…",
      "answerFormula": "<literal correct Hausa answer string>",
      "variableRanges": { "a": { "min": 0, "max": 0 }, "b": { "min": 0, "max": 0 } },
      "distractorFormulas": ["<wrong>","<wrong>","<wrong>"]
    }
  ],
  "track": "formal",
  "targetAudience": "youth",
  "gapTeaser": null,
  "chainNext": null,
  "isChainLeaf": true,
  "useTodayPrompt": null
}
```

**Field rules**
- `gradeband`: `"p3"` / `"p4"` / `"p5"` / `"p6"` — lowercase.
- `subject`: `"Social Studies"` (unchanged from P1/P2 to preserve app.js rendering).
- `subjectHa`: `"Nazarin Zamantakewa"` — exactly this casing, this term, every module.
- `id`: `p<band>-socs-NN`, zero-padded, sequential within each band. `moduleNumber` 1..15 per band.
- All Ajami fields = `null`. `ajami_validated` = `false`.
- `audioFile` / `imageCard`: placeholder paths; path must match module id.
- `track`: `"formal"`, `targetAudience`: `"youth"`.
- **Flat leaves:** `chainNext: null`, `isChainLeaf: true`, `gapTeaser: null`, `useTodayPrompt: null`.
- **Exactly 2** `microPauses`; **exactly 5** `quizQuestions`.

**Quiz contract — Social and Citizenship Studies is static Q&A, not parameterized formulas**
- `variableRanges`: `{a:{min:0,max:0}, b:{min:0,max:0}}` (unused placeholder — match P1/P2 pattern exactly).
- `answerFormula`: the **literal correct Hausa answer string**.
- `distractorFormulas`: **three plausible wrong Hausa answer strings**.
- **The correct answer must not appear among the three distractors.**
- `microPauses[].options[]` includes the `correctAnswer`; the `correctAnswer` appears **exactly once** in `options`.
- Cross-module consistency: any Hausa word/phrase reused as `correctAnswer`, `options`, or `distractorFormulas` must use one single, correct hooked spelling across every module and every field. Inconsistent spelling silently breaks scoring.

---

## 9. Hausa terminology gates

### Locked terms (all prior arcs — apply here)

- `kaɗan` — "little/a bit" (never `kadan`).
- `riƙa` — habitual marker.
- `ɓoye` — "to hide."
- `ɓera` — "rat/mouse."
- `ƙwai` — "egg."
- `tambarin Nijeriya` — coat of arms (ruled P2-socs-11).
- `Nazarin Zamantakewa` — subject label.

### Social and Citizenship Studies terms locked 2026-07-16 (M1 pilot review)

- `ƙaramar hukuma` — Local Government Area / LGA. This is the main learner-facing term; `LGA` may appear once as a parenthetical acronym on first mention in a module, never as the primary term thereafter.
- `ɗan ƙasa` (singular) / `ƴan ƙasa` (plural) — citizen / citizens.
- `muhalli` — environment.
- `ƙananan yankuna` — ward / sub-area, P3-appropriate descriptive phrase. Do not introduce a more technical "ward" term until election/governance modules (P4+) require it — raise that as a fresh open question when reached.
- `kansila` — councillor, when naming the office directly; `wakilin yanki` — councillor, descriptive/informal register. Both correct, context-dependent.
- `hidimar jama'a` — a public service (singular instance); `ayyukan jama'a` — public works/services (plural, general sense). Keep the distinction; do not use interchangeably.
- `rigar kariya ta ruwa` — life jacket. The plain `rigar kariya` ("protective garment") is too generic and must not be used for this meaning.
- `mai shela` — town crier.
- `ganga ko kalangu` — drum, broad/general reference; `kalangu` alone — specifically the talking drum. Use the narrower term only when the talking drum specifically is meant.
- `sufuri` — transportation; `sadarwa` — communication. Locked as section-heading terms for the whole P3–P6 arc.

### Social and Citizenship Studies terms locked 2026-07-16 (M2 P3-complete review)

- `rediyo`, `talabijin`, `waya`, `wayar hannu`, `intanet` — approved as the locked modern-communication device terms.
- `gurɓata` — approved descriptive wording for pollution/contamination at P3 level. A formal "pollution" noun remains open and deferred until P5 (`p5-socs-03`) if needed there.
- `kiwo` — approved as the P3 learner-facing livestock/rearing category term.
- `musayar kaya da kaya` — approved descriptive phrase for barter at P3 level; not replaced with a technical/borrowed noun.
- Cultural heritage stays descriptive for now (e.g. `al'adunmu`, explained through food/dress/language) — `gadon al'adu` is NOT locked or forced; do not introduce it unless separately ruled.
- UNCRC — do not introduce the acronym or a formal Hausa title for the convention unless a later module specifically requires it.
- `Eid al-Fitr`, `Eid al-Adha`, `Christmas`, `New Yam` — approved to remain as proper names (not translated or replaced with generic Hausa terms).

### Social and Citizenship Studies terms locked 2026-07-16 (M3 P4-complete review)

- `dimokuradiyya` — locked as the formal term for democracy, for use where a fixed noun is genuinely needed. P4's own `p4-socs-07` deliberately stays descriptive (`Yadda Jama'a Ke Nuna Wanda Suke So Ya Jagorance Su`) and is NOT retrofitted with this noun — the lock governs future modules that need the formal term.
- `kundin tsarin mulki` — locked as the formal term for constitution. P4's `babbar dokar ƙasa` (child-friendly explanatory phrase in `p4-socs-06`) remains acceptable as-is and is not required to change.
- `zaɓe` and `jefa ƙuri'a` — locked as the formal terms for election / casting a vote. P4 stays descriptive by design; future modules needing the formal noun use these.
- `sauya wurin zama` — locked for migration.
- `ƙaruwar birane` / `girman birane` — locked descriptively for urbanisation (no borrowed/technical noun).
- `fadama` — locked, with a first-use explanatory clause (e.g. "A fadama, wato wuraren da suke riƙe ruwa a lokacin rani...") required on first mention in any module.
- `iskar gas` — approved and locked for natural gas.
- `reshen zartarwa` (executive), `reshen kafa doka` (legislative), `reshen shari'a` (judiciary) — locked as the three-arms-of-government learner-facing terms.
- `alkawarin ƙasa` — locked for National Pledge. `alkawarin ɗan ƙasa` is retired; do not reintroduce it.
- `haƙƙin samun suna` — locked phrasing for "the right to a name" (not bare `haƙƙin suna`).
- `Yankin Babban Birnin Tarayya` — locked phrasing when referring to the FCT as a territory (distinct from `Abuja`, which remains the capital city name).

### Social and Citizenship Studies terms locked 2026-07-17 (M4 P5-complete review, `p5-socs-07` signed off by user)

- `dimokuradiyya`, `kundin tsarin mulki`, `zaɓe`, `jefa ƙuri'a` — first put into live use in `p5-socs-05` (constitution/rule-of-law module) and `p5-socs-15` (consolidation), confirming the M3 lock. Continue using these forms.
- Formal pollution noun — **deferred again.** `p5-socs-03` continues the descriptive `gurɓata`/`Gurɓata Muhalli` pattern. No fixed noun proposed; still open.
- Drug/substance-abuse formal noun — **not coined.** `p5-socs-07` uses the narrow descriptive title `Matsalar Amfani da Taba, Giya, ko Magani Ba Bisa Ƙa'ida Ba` and `amfani ba bisa ƙa'ida ba` in prose. This phrasing is now the accepted in-content pattern for this concept (user-signed-off content); a separate formal glossary noun remains open if ever needed.
- Sustainability — **not coined.** `p5-socs-02` explains the idea descriptively (`amfani da su ba tare da lalata damar masu zuwa ba`); `masu ɗorewa` used only as an ordinary adjective. Still open.
- Conflict resolution — **not coined.** `p5-socs-08` uses `warware saɓani cikin lumana` plus concrete steps. Still open.
- `Babban Taro` (General Assembly) / `Kwamitin Tsaro` (Security Council) — used as transparent descriptive labels in `p5-socs-12`, not asserted as newly locked formal terms. Confirm or replace before reuse.
- `Majalisar Ɗinkin Duniya` (UN) / `Tarayyar Afirka` (AU) — used alongside official acronyms; not added to the locked glossary by this draft.
- `kyakkyawan mulki` (good governance) / `cin hanci da rashawa` (corruption) — used as standard descriptive Hausa in `p5-socs-14`, not newly locked terms requiring separate confirmation.
- Ward (technical/electoral sense) — still not required through P5.

### Terms requiring user ruling in later dispatches

These must be raised as open questions in milestone reports, resolved by the user, and locked before the next dispatch. Codex does not interpolate a term — it flags and waits.

| Concept | Candidate / note |
|---------|-----------------|
| Formal pollution noun | deferred through P5; still using descriptive `gurɓata` |
| Globalisation | Hausa descriptive phrase or borrowed — user to rule |
| Formal drug/substance-abuse noun | descriptive phrasing accepted in `p5-socs-07`; separate formal glossary term still open if needed |
| Sustainability | Hausa descriptive phrase — user to rule |
| Conflict resolution | phrase to lock — user to rule |
| UN body labels (`Babban Taro`, `Kwamitin Tsaro`) | used descriptively in `p5-socs-12`; confirm or replace before P6 reuse |
| Ward (technical/electoral sense) | not needed through P5; raise again if a P6 module requires a more precise term than `ƙananan yankuna` |

This list is not exhaustive. Codex raises every uncertain term immediately; it does not interpolate.

---

## 10. Build sequence and milestones

| Milestone | Scope | Pre-condition |
|-----------|-------|---------------|
| **M0 — Preflight** | Alignment matrix for all 60 modules; M0 script; live count read | Architect approves alignment matrix before M1 dispatch |
| **M1 — P3 pilot** | `p3-socs-01..06`, source-only candidate | Architect approval of M1 report |
| **M2 — P3 complete** | `p3-socs-07..15`, source-only candidate | Architect approval of M2 report; terminology from M1 locked |
| **M3 — P4 complete** | `p4-socs-01..15`, source-only candidate | Architect approval of M3 report |
| **M4 — P5 complete** | `p5-socs-01..15`, source-only candidate; `p5-socs-07` sign-off | Architect approval + user sign-off on `p5-socs-07` |
| **M5 — P6 complete** | `p6-socs-01..15`, source-only candidate; `p6-socs-03` + `p6-socs-09` sign-off | Architect approval + user sign-off on both sensitive modules |
| **Integration** | Guarded merge of each approved band into `content.json` | Only after user Hausa validation of that band's source candidate |

M1 dispatch is **source-only**: Codex creates `tools/p3-batch/p3-socs-pilot.json` (6 modules); does not touch `app/content.json`. Architect validates using a **temporary merged copy**, not the live file.

---

## 11. Integration sequence (per milestone)

1. Codex creates a **source-only candidate** batch file (e.g. `tools/p3-batch/p3-socs.json`). Does not touch `app/content.json`.
2. Architect runs all gates against the candidate on a **temporary merged copy** (`node -e "const d=JSON.parse(fs.readFileSync('app/content.json')); d.modules.push(...batch); fs.writeFileSync('/tmp/content-candidate.json', JSON.stringify(d,null,2))"` → validate against temp file). `app/content.json` remains unchanged.
3. Architect approves milestone; user reviews Hausa terminology and all sensitive-topic modules.
4. Codex patches corrections on approved user feedback.
5. Architect revalidates the patched candidate.
6. Only then: a **guarded, idempotent Node script** appends the approved batch into live `app/content.json` (dedup by `id`, preserve formatting, run validator immediately after). No hand-editing of `content.json`.
7. Architect confirms: validator exit 0, correct total count, byte-equivalence of all pre-existing modules.

**Unvalidated Hausa is never written into the production `app/content.json`.**

---

## 12. Definition of Done (per milestone)

A milestone candidate is **build-complete** (ready for human validation — NOT shippable) when all of the following hold:

**Structure gates**
1. Every module matches the §8 schema contract, key-for-key.
2. `node app/tools/validate-content.mjs` on the temporary merged copy exits **0**.
3. Only `modules[]` grew in the temporary merge — no reordering, edits, or deletions to existing modules, gradeBands, glossary, or activities.
4. **Zero changes** to any runtime file: `app/app.js`, `app/quiz-engine.js`, `app/styles.css`, `app/index.html`, `app/sw.js`, `app/bootstrap.js` (if present). Confirmed by mtime + `shasum -a 256` on each before/after (content checksums, not git — git hangs).
5. IDs unique; `moduleNumber` sequential per subject per band; no gaps.

**Content gates**
6. **Word-count:** `textExplanationHa` is 120–170 words per module, every module. Build the word-count assertion into the per-band structure-check script from the start (lesson from the Math arc Slice 3 retro).
7. **Audio-explanation alignment:** audio script content aligns materially with `textExplanationHa` — not a copy, but teaching the same facts.
8. **Micro-pause text match:** `[PAUSE 1]` wording in `audioScript` must exactly match `microPauses[0].questionHa`; `[PAUSE 2]` must exactly match `microPauses[1].questionHa`. These are not summaries — they must be identical.
9. **Micro-pause answer integrity:** `correctAnswer` appears exactly once in `options[]` for each micro-pause.
10. **Quiz answer integrity:** `answerFormula` does not appear in `distractorFormulas[]`.
11. **Quiz fact grounding:** every quiz question's correct answer must be taught in `textExplanationHa` or the audio script of the same module.
12. **Unique Q5:** the fifth quiz question is topic-specific to this module — not a generic "What is [subject]?" filler.
13. **Unique OUTRO:** `[OUTRO]` is topic-specific to this module — not a generic boilerplate close.
14. **No generic revision-module filler:** revision modules (`*-socs-15`) must provide a genuine consolidation question set, not placeholder text.
15. **Raw-English leakage:** no English words appear in `textExplanationHa`, `audioScript` (outside bracketed script markers `[INTRO]` etc.), or quiz fields, unless the word is an official borrowed term (e.g. `LGA`, `internet`) that the user has confirmed as standard in Hausa use for this concept.

**Hausa gates**
16. **Hooked-letter lint:** `node tools/p2-batch/hook-lint.mjs <batch-file.json>` exits **0** (zero ERRORS). WARNINGS listed explicitly in milestone report as open questions for the user.
17. **Cross-module quiz-answer consistency:** for every Hausa string reused across quiz-answer-matching fields within the batch, grep for every instance and confirm identical spelling. Words checked and results reported in milestone report — not just "lint passed."
18. **Within-module redundancy check:** run the decimal-aware redundancy checker (`tools/p1-batch/check-within-module-redundancy.mjs`) against all modules in the batch. Zero findings, or findings listed for user adjudication.
19. **Manual close-paraphrase review:** Codex reports any sentence pairs across modules in the batch that are near-duplicate paraphrases but not caught by the automated checker.

**Sensitive-topic gates**
20. **Neutrality attestation:** for every module in §5's neutrality-review list, a one-line Codex attestation in the milestone report confirming no prescriptive, hierarchical, or group-attributing framing was used.
21. **Sensitive-topic flags:** `p5-socs-07`, `p6-socs-03`, `p6-socs-09` include an explicit open-question in their milestone report directing the user to review full Hausa draft before slice approval. Family-planning content is prohibited unless the official grade document later confirms it and the user explicitly reopens that scope.

**Scope gates**
22. **P1/P2 Social Studies frozen:** `p1-socs-01..15` and `p2-socs-01..15` byte-equivalent before and after the temporary merge. Confirmed by `shasum -a 256` on every pre-existing Social Studies module object.
23. **All pre-existing module objects frozen:** not only P1/P2 Social Studies — all previously live modules must remain byte-equivalent.

Only after all 23 gates pass is the candidate handed to the user's Hausa validation gate (Gates 3–4 of `docs/VALIDATION-CHECKLIST.md`). The candidate is not shippable until the user clears that gate.

---

## 13. Milestone reporting protocol (Codex → Architect)

Each dispatch must produce two output paths:
- `--output-last-message`: brief summary (module list, exit codes, counts).
- Detailed report file at `tasks/<date>-<milestone>-report.md`: full gate results.

Architect independently verifies all 23 gates before approving any milestone. Never rubber-stamps Codex self-report.

Required report sections:

1. Module list (ID + titleEn + titleHa).
2. Validator output (exit code, temporary-merge count before/after).
3. Hook-lint output (exit code, ERRORS count, WARNINGS list with context).
4. Word-count summary (min/max; any out-of-range flagged).
5. Audio-explanation alignment attestation.
6. Micro-pause text match confirmation (exact string comparison for both pauses).
7. Quiz answer integrity check (Q5 uniqueness, OUTRO uniqueness, no answer-in-distractor violations).
8. Quiz fact-grounding check.
9. English-leakage scan result.
10. Cross-module quiz-answer consistency check (words checked + result).
11. Within-module redundancy check result.
12. Close-paraphrase manual review notes.
13. Neutrality attestation for each module in the review list.
14. Sensitive-topic flags (if applicable).
15. Terminology open questions (any new Hausa term uncertain; awaiting user ruling).
16. `shasum -a 256 app/content.json` before and after (temporary merge; live file unchanged).
17. Engine-file checksum confirmation (all six runtime files unchanged).
18. Alignment matrix column for each module (curriculum version, strand, source page, classification) — M0 and M1 report; subsequent reports may reference M0 matrix and note any changes.

---

## 14. Image-manifest deliverable

Each milestone must also produce an image/diagram-needs manifest to the same schema used under `tools/image-manifest/`. These are produced alongside the source candidate, before guarded integration:

- `tools/image-manifest/p3-socs-image-manifest.json` (M1+M2)
- `tools/image-manifest/p4-socs-image-manifest.json` (M3)
- `tools/image-manifest/p5-socs-image-manifest.json` (M4)
- `tools/image-manifest/p6-socs-image-manifest.json` (M5)

For every module, the manifest entry specifies:

| Field | Content |
|-------|---------|
| `moduleId` | e.g. `p3-socs-01` |
| `titleEn` | English module title |
| `visualType` | map / diagram / illustration / portrait / comparison / symbol |
| `depictEn` | What the image should show (English, specific) |
| `hausaLabels` | Hausa text labels drawn verbatim from the lesson — not invented |
| `culturalContext` | Northern Nigerian setting requirements |
| `neutralityConstraints` | What must not be depicted (specific to this module) |
| `prohibitedImagery` | Any imagery that would violate the §5 sensitivity rules |
| `safetyNote` | If applicable (e.g. no real court logos, no political party imagery) |
| `notes` | Map requirements, symbol requirements, portrait/diversity requirements |

No images are rendered in this content-build workstream. The manifests are design-intent records for the future image-generation workstream.

---

## 15. Integration mechanics

- Author each band as a standalone batch file first; merge via idempotent Node script.
- **Never git** — repo git hangs unpredictably; use `shasum -a 256` for scope verification.
- Run each `node tools/…/check-*.mjs` gate **standalone, one at a time** — chaining multiple node commands in one shell call produces spurious, non-reproducible errors in this environment.
- Batch subdirectories: use existing `tools/p3-batch/`, `tools/p4-batch/`, etc. alongside the Math source files — do not overwrite Math source files.

---

## 16. Orthography house standard

Rulings by the user (fluent Hausa speaker) and TIMSAN; carried from all prior arcs. The linter ERROR list is canonical; add a word only on the user's explicit ruling.

- `ƙwai` — "egg."
- `ɓera` — "rat/mouse."
- `kaɗan` — "little/a bit."
- `riƙa` — habitual marker.
- `ɓoye` — "to hide."
- `kara` (unhooked) = plant "stem/stalk" only; `ƙara` = "to add/increase" — context-dependent WARNING.
- `guga` (not `goga`) — friction.

P3–P6 Social and Citizenship Studies terminology has begun. The M1 pilot locked the first term set in §9. Continue adding only user-ruled terms here as later slices surface them.

---

*Brief version: 2026-07-16 M2 build-complete source-only. Status: awaiting M2 review before M3.*
