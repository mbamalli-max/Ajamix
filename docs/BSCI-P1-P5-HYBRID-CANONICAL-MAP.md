# AJAMIX Basic Science — P1-P5 Canonical Hybrid Curriculum Map (Revision 3)

**Status: PLANNING / REPORT ONLY. No `app/content.json` edits. No batch JSON created. No Codex dispatch (curriculum authoring). No merge. No commit. No backups inside the repo.**

Revision 3 replaces the provisional "user-attested" verification labels with genuine independent verification. The local PDF-extraction failure in Revisions 1-2 was resolved by downloading the exact source documents to disk and extracting them with `pypdf` (the fetch tool's HTML-to-markdown converter could not handle these specific PDFs' non-standard flate-compressed streams; `pypdf`'s more tolerant parser succeeded despite the same underlying corruption warnings). No Codex dispatch was needed for this — direct local extraction resolved it faster. Full extracted text is retained at `/private/tmp/claude-501/-Users-muhammadbamalli/42814c86-755b-488b-b4fd-e02252c18923/scratchpad/nerdc/` for this session (a scratchpad location, not part of the repo).

---

## 1. Source-verification table (independently verified, with page-level evidence)

| Claim | Status | Evidence |
|---|---|---|
| The NERDC document is titled "Basic Science and Technology Curriculum" and integrates four component curricula: Basic Science, Basic Technology, Physical and Health Education, and Computer Studies/ICT | **Independently verified** | Document: *Basic Science and Technology Curriculum* (revised 2012). Publisher: Nigerian Educational Research and Development Council (NERDC). URL: `https://nerdc.gov.ng/content_manager/primary/pri4-6_basic_science_intro.pdf`. PDF page 4 (Introduction): *"The Basic Science and Technology Curriculum (revised, 2012) is a product of the restructuring and integration of four Primary and Junior Secondary School (JSS) science curricula namely Basic Science, Basic Technology, Physical and Health Education, and Computer Studies/Information Communication Technology (ICT)."* Extraction method: `pypdf.PdfReader.extract_text()` (download + local extraction; `pdftotext` failed on this file with "Unknown compression method in flate stream" errors — a genuine source-side non-standard encoding, not a fetch-tool limitation specifically). Confidence: high. |
| The document is explicitly organized into 4 curriculum-theme sections per grade, each with its own sub-themes and topic lists | **Independently verified** | Same document, PDF page 7-11 (Table of Contents). Page 7 header: *"CURRICULUM THEME / CLASS / PAGE"* followed by `BASIC SCIENCE`, `BASIC TECHNOLOGY`, `PHYSICAL AND HEALTH EDUCATION`, `INFORMATION TECHNOLOGY` as the four theme labels, each with page ranges. Confidence: high. |
| Primary 5 **Basic Science** includes: Environmental Changes, Waste and Waste Disposal, Environmental Quality, The Human Body (The Skeleton), Reproduction in Plants, Rocks, Acids and Bases | **Independently verified** | PDF page 9 (Table of Contents), verbatim: *"BASIC SCIENCE / Sub-Theme: LEARNING ABOUT OUR ENVIRONMENT Primary 5 17-23 / Topic(s): Environmental Changes / Waste and Waste Disposal / Environmental Quality / Sub-Theme: LIVING AND NON LIVING THINGS / Topic(s): The Human Body (The Skeleton) / Reproduction in Plants / Rocks / Acids and Bases."* Confidence: high for the topic titles and their Basic Science strand assignment. |
| Primary 5 **Basic Technology** includes: Materials and Maintenance, Basic Motor Vehicle Parts (Internal), Drawing Instruments, Energy Conversion, Heat and Temperature, Basic Electricity, Magnetism | **Independently verified** | PDF page 10, verbatim: *"BASIC TECHNOLOGY / Sub-Theme: UNDERSTANDING BASIC TECHNOLOGY Primary 5 24-28 / Topic(s): Materials and Maintenance / Basic Motor Vehicle Parts (Internal) / Drawing Instruments / Sub-Theme: YOU AND ENERGY / Topic(s): Energy Conversion / Heat and Temperature / Basic Electricity / Magnetism."* Confidence: high. |
| Primary 5 **Physical and Health Education** includes Nutrition, Diseases, Drug Education (under a "Health Education" sub-theme), plus Basic Movements/Sports and Games content | **Independently verified** | PDF pages 10-11, verbatim: *"PHYSICAL AND HEALTH EDUCATION / Sub-Theme: BASIC MOVEMENTS 29-34 / Topic(s): Creative Rhythmic Activities / ATHLETICS / Field Events / Sub-Theme: SPORTS AND GAMES / Topic(s): Ball Games"* (page 10) and *"PHYSICAL AND HEALTH EDUCATION / Sub-Theme: HEALTH EDUCATION Primary 5 / Topic(s): Nutrition / Diseases / Drug Education"* (page 11). Confidence: high. |
| "Pollination and fertilisation" are named as sub-topics within "Reproduction in Plants"; "joints" are named as a sub-topic alongside "the skeleton" | **Unresolved after documented verification attempts** | The word "pollinat-" does not appear anywhere in the extracted text of this 13-page document; neither does "fertilis-"/"fertiliz-" or "joint." This specific PDF (`..._intro.pdf`) is a front-matter-plus-table-of-contents document — it lists topic *titles* ("Reproduction in Plants," "The Human Body (The Skeleton)") but not the sub-topic-level detail that the actual content pages (cited as pages 17-23 for Primary 5's "Learning About Our Environment" theme) would contain. **This document does not confirm or contradict the pollination/fertilisation/joints sub-claims — it simply doesn't go to that level of detail.** Resolving this would require locating and extracting the actual Primary 5 detailed-content PDF (a different, more granular document than the one verified here), which was not attempted in this pass. |
| Scientific enquiry ("working scientifically") is embedded within substantive science content, not taught as a separate strand | **Independently verified** | Document: *Science — key stages 1 and 2* (National Curriculum in England). Publisher: UK Department for Education (gov.uk). URL: `https://assets.publishing.service.gov.uk/media/5a806ebd40f0b62305b8b1fa/PRIMARY_national_curriculum_-_Science.pdf`. PDF page 4, verbatim: *"'Working scientifically' specifies the understanding of the nature, processes and methods of science for each year group. It should not be taught as a separate strand."* And: *"'Working scientifically' is described separately in the programme of study, but must always be taught through and clearly related to the teaching of substantive science content."* Extraction method: download + `pypdf` (this PDF also extracted cleanly with `pdftotext -layout`, unlike the NERDC document — no source-side corruption here). Confidence: high. |
| Expected progression: increasingly independent/precise observation, testing, measurement, recording, and conclusions from Key Stage 1 (years 1-2) to upper Key Stage 2 (years 5-6) | **Independently verified** | Same document. PDF page 6 (Years 1-2, statutory requirements): *"observing closely, using simple equipment... performing simple tests... gathering and recording data to help in answering questions."* PDF page 25 (Years 5-6, statutory requirements): *"planning different types of scientific enquiries to answer questions, including recognising and controlling variables where necessary... taking measurements, using a range of scientific equipment, with increasing accuracy and precision, taking repeat readings when appropriate... recording data and results of increasing complexity using scientific diagrams and labels, classification keys, tables, scatter graphs, bar and line graphs... reporting and presenting findings from enquiries, including conclusions, causal relationships."* The explicit progression (simple tests/simple recording → controlled-variable enquiries/increasing-precision measurement/complex data recording/causal conclusions) is directly evidenced across these two statutory-requirements sections. Confidence: high. |
| Cambridge Primary Science: 6 strands, explicit context-adaptability | **Independently verified** (carried forward from Revision 1 — this fetch succeeded via WebFetch directly, no local-extraction step needed) | `https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/curriculum/science` — confirmed 6 strands (Biology, Chemistry, Physics, Earth and Space, Thinking and Working Scientifically, Science in Context) and adaptability language. |
| NERDC Revised 9-Year BEC Implementation Strategy: competency/outcome-based framing | **Unresolved after documented verification attempts** | Not fetched or extracted in this pass (only the two documents specifically named in this verification task were pursued). Would need the same download-and-extract treatment before being cited as confirmed. |

**Correction to the standing procedure, per your instruction:** going forward, when a fetch/extraction attempt on an official document fails, the response is (1) download the file directly and retry with local tools (`pdftotext`, `pypdf`, `pdfplumber`, and — if those fail — `mutool`/`qpdf` or page-image rendering), not stop at "unreadable"; (2) if local extraction still fails after those attempts, dispatch a narrowly-scoped Codex verification task rather than record the resulting claim as merely user-attested; (3) label every claim as **independently verified**, **independently contradicted**, or **unresolved after documented verification attempts** — never "user-attested" as a substitute for actual verification. This pass resolved via direct local extraction (step 1) and did not require a Codex dispatch, since `pypdf` succeeded once the file was downloaded rather than fetched-and-converted.

---

## 2. Strand classification for every P1-P5 target module

Per the user's ruling: nutrition, disease, and drug-education content is **cross-curricular PHE integration**, not NERDC Basic Science core, even where AJAMIX chooses to keep it under the "Basic Science" subject label in the app's schema (the app has one `subject` field; this strand tag is a planning/documentation label, not a schema change).

### P1 (strand tags on current, unmoved content)

| ID | Current topic | Strand |
|---|---|---|
| p1-bsci-01..05 | Senses (sight/hearing/touch/smell-taste/review) | NERDC Basic Science core |
| p1-bsci-06,07 | Animals, Plants (living things) | NERDC Basic Science core |
| p1-bsci-08 | Non-Living Things | NERDC Basic Science core |
| p1-bsci-09 | Water Sources and Uses | NERDC Basic Science core |
| p1-bsci-10 | Air | NERDC Basic Science core |
| p1-bsci-11 | Weather | NERDC Basic Science core |
| p1-bsci-12,13 | Lever, Wheel and Axle | NERDC Basic Technology core (per the user's confirmed strand split — simple machines/tools sit under Basic Technology, not Basic Science) |
| p1-bsci-14 | Energy — Light and Heat | NERDC Basic Science core (physics) |
| p1-bsci-15 | Revision and Assessment | N/A — cross-cutting review, not a strand-specific topic |

### P2 (strand tags on current, unmoved content)

| ID | Current topic | Strand |
|---|---|---|
| p2-bsci-01,02,03,14 | Living/non-living, plant parts, domestic animals, care of plants/animals | NERDC Basic Science core |
| p2-bsci-04 | Weather | NERDC Basic Science core |
| p2-bsci-05,15 | Uses of Water, Keeping Water Safe | NERDC Basic Science core (with a hygiene/safety edge that borders PHE — flagged, not reclassified, since water potability is standardly Basic Science in most curricula, unlike nutrition/disease) |
| p2-bsci-06 | Personal Hygiene | **Cross-curricular PHE integration** |
| p2-bsci-07 | Food Groups | **Cross-curricular PHE integration** |
| p2-bsci-08 | The Five Senses (repeat of P1) | NERDC Basic Science core (low-value repetition, not a strand problem) |
| p2-bsci-09 | Safety at Home | **Cross-curricular PHE integration** (general safety/injury-prevention content typically sits under PHE) |
| p2-bsci-10 | Clean Environment | NERDC Basic Science core (environmental science) |
| p2-bsci-11 | Simple Machines at Home | NERDC Basic Technology core |
| p2-bsci-12,13 | Sources of Light, Sound Around Us | NERDC Basic Science core |

### P3 (strand tags on current, unmoved content)

| ID | Current topic | Strand |
|---|---|---|
| p3-bsci-01,03 | Classifying Living Things, Growth/Life Cycles | NERDC Basic Science core |
| p3-bsci-02 | Parts of the Body and Functions | NERDC Basic Science core (anatomy) — bordering PHE for the "healthy growth" angle, kept core since it's structural/functional, not disease/nutrition |
| p3-bsci-04 | Our Environment | NERDC Basic Science core |
| p3-bsci-05 | The Water Cycle | NERDC Basic Science core |
| p3-bsci-06 | States of Matter | NERDC Basic Science core (physics/chemistry) |
| p3-bsci-07,08 | Measuring Length/Mass, Measuring Time | NERDC Basic Science core (measurement/scientific-enquiry skill) |
| p3-bsci-09 | Soil and Its Uses | NERDC Basic Science core |
| p3-bsci-10 | Air in Motion | NERDC Basic Science core |
| p3-bsci-11 | Traditional and Modern Technology | **NERDC Basic Technology core** |
| p3-bsci-12 | Light and Mirrors | NERDC Basic Science core |
| p3-bsci-13 | First Aid and Safety | **Cross-curricular PHE integration** |
| p3-bsci-14 | Animal Habitats and Shelters | NERDC Basic Science core |
| p3-bsci-15 | Balanced Meals | **Cross-curricular PHE integration** |

### P4 (strand tags on current, unmoved content)

| ID | Current topic | Strand |
|---|---|---|
| p4-bsci-01,02 | Plant Groups, Animal Groups | NERDC Basic Science core |
| p4-bsci-03,04 | Types of Soil, Soil and Farming | NERDC Basic Science core |
| p4-bsci-05 | Everyday Sources of Energy | **NERDC Basic Technology core** (per the user's confirmed split: energy/heat/electricity/magnetism sit under Basic Technology) |
| p4-bsci-06 | Simple Electricity Safety | **NERDC Basic Technology core** |
| p4-bsci-07,08 | Push and Pull, Movement and Friction | NERDC Basic Science core (physics — force/motion is typically Basic Science even where energy/electricity applications sit under Basic Technology; flagged as a judgment call, not user-confirmed) |
| p4-bsci-09 | Personal Hygiene and Health | **Cross-curricular PHE integration** |
| p4-bsci-10 | Clean Surroundings | NERDC Basic Science core |
| p4-bsci-11,12 | Malaria Prevention, Preventing Diarrhoea | **Cross-curricular PHE integration** |
| p4-bsci-13,14 | Weather Instruments, Keeping Weather Records | NERDC Basic Science core |
| p4-bsci-15 | Fire, Heat, and Safety | Mixed — fire safety is PHE-adjacent (injury prevention), heat is Basic-Technology-adjacent per the confirmed split; flagged as genuinely cross-cutting, not cleanly one strand |

### P5 (strand tags — independently verified against the extracted NERDC table of contents, PDF pages 9-11, except where noted)

| ID | Proposed topic | Strand |
|---|---|---|
| p5-bsci-01,02,03 | Environmental change, waste/recycling, environmental quality/conservation | **NERDC Basic Science core — independently verified** (PDF p.9: "Environmental Changes / Waste and Waste Disposal / Environmental Quality" under Basic Science, Primary 5) |
| p5-bsci-04 | Human skeleton, movement | **NERDC Basic Science core — independently verified** (PDF p.9: "The Human Body (The Skeleton)"). Note: "joints" specifically as a named sub-topic is **unresolved** — not found in this document (see §1); recommend treating "joints" as a reasonable anatomical elaboration of "the skeleton" rather than a separately sourced claim until the detailed content pages are checked. |
| p5-bsci-05 | Plant reproduction | **NERDC Basic Science core — independently verified** (PDF p.9: "Reproduction in Plants"). Note: "pollination" and "fertilisation" as named sub-topics are **unresolved** — not found in this document (see §1); the topic-level title "Reproduction in Plants" is confirmed, the specific sub-topic vocabulary is not. |
| p5-bsci-06 | Rocks | **NERDC Basic Science core — independently verified** (PDF p.9: "Rocks") |
| p5-bsci-07 | Acids, bases, household substances | **NERDC Basic Science core — independently verified** (PDF p.9: "Acids and Bases") |
| p5-bsci-08 | Materials, maintenance, tools | **NERDC Basic Technology core — independently verified** (PDF p.10: "Materials and Maintenance") |
| p5-bsci-09,10 | Energy conversion, heat/temperature | **NERDC Basic Technology core — independently verified** (PDF p.10: "Energy Conversion / Heat and Temperature") |
| p5-bsci-11 | Simple electrical circuits | **NERDC Basic Technology core — independently verified** (PDF p.10: "Basic Electricity") |
| p5-bsci-12 | Magnets | **NERDC Basic Technology core — independently verified** (PDF p.10: "Magnetism") |
| p5-bsci-13 | Nutrients, growth, nutritional-deficiency prevention | **Cross-curricular PHE integration — independently verified** (PDF p.11: "Nutrition" under Physical and Health Education, Health Education sub-theme, Primary 5) — must NOT be labeled Basic Science core |
| p5-bsci-14 | Communicable/non-communicable disease prevention | **Cross-curricular PHE integration — independently verified** (PDF p.11: "Diseases" under Physical and Health Education) |
| p5-bsci-15 | Harmful substances / drug-awareness | **Cross-curricular PHE integration — independently verified** (PDF p.11: "Drug Education" under Physical and Health Education) |

**A topic present in the source but not yet reflected in any proposed AJAMIX P5 module:** the NERDC document also lists "Basic Motor Vehicle Parts (Internal)" and "Drawing Instruments" under Basic Technology (PDF p.10), and a full slate of Physical and Health Education sports/movement content (Creative Rhythmic Activities, Athletics, Field Events, Ball Games — PDF p.10) that AJAMIX Basic Science does not and should not attempt to cover (that's the standalone PHE curriculum's territory, consistent with the standing design rule in §0 of Revision 1 not to claim PHE coverage).

**Global-enrichment / local-application tags:** none of the above needed a "global science enrichment" tag once the NERDC source mapping was applied directly — the user's verification shows NERDC's own document already covers this ground more completely than assumed in Revision 1. "Global enrichment" would apply only where AJAMIX adds something with no NERDC-cited anchor at all (none currently proposed for P1-P5 under this revision). "Local Nigerian application" tags apply informally throughout (Northern Nigerian examples: gero/masara/wake for crops, harmattan/damina for seasons, etc.) but every module gets this by default per the standing design rule — not tracked as a separate per-module flag here.

---

## 3. Fixed-ID current-to-target matrix (P1-P4), with editorial/enrichment/semantic-replacement classification

**Rule applied throughout: no module's id is moved, merged away, or repurposed to a different topic without an explicit `SEMANTIC_REPLACEMENT` flag stating exactly which learner progress becomes misleading.** This rule is applied to all four bands uniformly, not just P3/P4 — the underlying technical justification (progress keyed by id in IndexedDB) doesn't distinguish "reviewed this session" from "shipped earlier"; any live learner could have real progress on any of the 60 modules.

### P1

| ID | Current topic | Classification | Resolution |
|---|---|---|---|
| p1-bsci-01..04 | Senses (sight/hearing/touch/smell-taste) | OBJECTIVE_PRESERVING_ENRICHMENT | add eye/ear-care behaviors, texture/temperature vocabulary, in place |
| p1-bsci-05 | Five Senses Review | OBJECTIVE_PRESERVING_ENRICHMENT | reframe from passive recap to active "use your senses to observe and describe" — same underlying senses objective, deepened |
| p1-bsci-06,07 | Animals, Plants | OBJECTIVE_PRESERVING_ENRICHMENT | shift from naming to needs-based framing, in place |
| p1-bsci-08 | Non-Living Things | OBJECTIVE_PRESERVING_ENRICHMENT | fold in explicit living/non-living comparison, in place |
| p1-bsci-09 | Water Sources and Uses | **KEEP, no change needed** | Revision 1 proposed replacing this with "Soil around us" — **rejected**. Soil is a genuine gap, but the fix is a new appended id (see §3a), not repurposing this one. Water content stays here unchanged in topic. |
| p1-bsci-10 | Air | EDITORIAL | minor wording only |
| p1-bsci-11 | Weather | **KEEP, no change needed** | Revision 1 proposed replacing this with water content moved from p1-bsci-09 — **rejected**, since p1-bsci-09 isn't moving either. Weather stays. |
| p1-bsci-12,13 | Lever, Wheel and Axle | **KEEP both, no merge** | Revision 1 proposed merging these into one "simple machines" module — **rejected**: merging two existing modules is explicitly disallowed without migration. Both stay distinct; each can be lightly enriched in place if wanted. |
| p1-bsci-14 | Energy — Light and Heat | **KEEP, no change needed** | Revision 1 proposed replacing this with the lever+wheel/axle merge content — **rejected**, moot now that no merge is happening. |
| p1-bsci-15 | Revision and Assessment | **KEEP as a genuine revision module** | Revision 1 characterized this as "filler" to be replaced with energy content — **reconsidered**: a well-built revision/capstone module is a legitimate, already-validated pattern in this app (see the Math arc's `p3/p4/p5/p6-maths-24` revision-bridge modules). Recommend enriching this into a proper P1 capstone review, not replacing its objective. (Separately, its `textExplanationHa` currently has the filler-sentence defect — see §8, an independent hotfix.) |

**§3a — genuinely new P1 topics, proposed as new appended ids (zero migration cost):**
- `p1-bsci-16` — Soil around us (**NEW**, appended, not a repurposing)
- `p1-bsci-17` — Colours, traffic signs, road safety (**NEW**, appended)

**Net result for P1 under fixed-id discipline: zero SEMANTIC_REPLACEMENT needed.** Every one of the 15 existing modules keeps its objective; two genuinely new topics are added as new ids instead of displacing anything.

### P2

| ID | Current topic | Classification | Resolution |
|---|---|---|---|
| p2-bsci-01,02 | Living/non-living, Parts of a Plant | OBJECTIVE_PRESERVING_ENRICHMENT | deepen in place |
| p2-bsci-03 | Domestic Animals | **KEEP, no change needed** | Revision 1's "what plants need to grow" idea for this slot — **rejected**; becomes a new appended id instead (§3b) |
| p2-bsci-04 | Weather | OBJECTIVE_PRESERVING_ENRICHMENT | add Sun/simple-records framing in place (Revision 1's target description for this topic is achievable without displacing anything, once animal content isn't also being crammed in) |
| p2-bsci-05 | Uses of Water | OBJECTIVE_PRESERVING_ENRICHMENT | add a conservation angle in place; **no merge** with p2-bsci-15 |
| p2-bsci-06 | Personal Hygiene | OBJECTIVE_PRESERVING_ENRICHMENT | add disease-prevention framing in place (strand: PHE, per §2) |
| p2-bsci-07 | Food Groups | OBJECTIVE_PRESERVING_ENRICHMENT | add healthy-choices framing in place (strand: PHE, per §2) |
| p2-bsci-08 | The Five Senses (repeat) | **Open decision, not resolved here** | Two zero/low-cost paths: (a) keep as a legitimate P2-level senses recap (parallels P1's revision-module precedent), add the genuinely new P2 topics as new ids instead; (b) if the redundancy is judged bad enough to accept a one-time reset, mark `SEMANTIC_REPLACEMENT` and swap in materials/properties content here specifically. **Recommend (a)** — no learner-facing cost, and the "genuinely new" topics get their own ids either way (§3b). |
| p2-bsci-09 | Safety at Home | **KEEP, no change needed** | strand: PHE (per §2); no content-identity change needed |
| p2-bsci-10 | Clean Environment | **KEEP, no change needed** | Revision 1's materials/properties idea for this slot — **rejected**; new appended id instead |
| p2-bsci-11 | Simple Machines at Home | **KEEP, no change needed** | Revision 1's clay/moulding idea for this slot — **rejected**; new appended id instead |
| p2-bsci-12,13 | Sources of Light, Sound | OBJECTIVE_PRESERVING_ENRICHMENT | add shadows / sound-production depth in place |
| p2-bsci-14 | Care of Plants and Animals | **KEEP, no change needed** | |
| p2-bsci-15 | Keeping Water Safe | **KEEP, no change needed** | no merge with p2-bsci-05 |

**§3b — genuinely new P2 topics, proposed as new appended ids:**
- `p2-bsci-16` — What plants need to grow (**NEW**)
- `p2-bsci-17` — Habitats and local biodiversity, as a distinct emphasis (**NEW** — arguably light overlap with p3-bsci-14/p4-bsci-02's existing habitat content; worth your judgment call on whether this is worth adding at P2 at all, or deferred)
- `p2-bsci-18` — Materials, properties, and uses (**NEW**)
- `p2-bsci-19` — Clay and moulding (**NEW**, Basic Technology strand)

**Net result for P2 under fixed-id discipline: zero mandatory SEMANTIC_REPLACEMENT.** One optional, explicitly-flagged replacement candidate (the Five Senses repeat) is presented as a choice, not a default.

### P3

| ID | Current topic | Classification | Resolution |
|---|---|---|---|
| p3-bsci-01,03,07,08,09,10 | Classifying Living Things, Growth/Life Cycles, Measuring Length/Mass, Measuring Time, Soil, Air in Motion | OBJECTIVE_PRESERVING_ENRICHMENT | minor depth additions in place, no topic change |
| p3-bsci-02 | Parts of the Body and Functions | **KEEP, no change needed** | Revision 1 proposed replacing this with "plant parts and functions" (moved from a different slot) — **rejected**; body-parts content stays here |
| p3-bsci-04 | Our Environment | **KEEP, no change needed** | Revision 1 proposed absorbing habitat/adaptation content here — **rejected**; that content already has its own home at p3-bsci-14 |
| p3-bsci-05 | The Water Cycle | OBJECTIVE_PRESERVING_ENRICHMENT | broaden to include water quality/uses in place — this achieves Revision 1's intent for "water uses, quality, and the water cycle" **without** moving anything |
| p3-bsci-06 | States of Matter | **KEEP, no change, and no renumbering** | Revision 1 proposed relocating this (the corrected `abu mai tauri` module) to a different id slot for "cleaner sequencing" — **firmly rejected**: this module stays at `p3-bsci-06` exactly as merged and approved this session |
| p3-bsci-11 | Traditional and Modern Technology | OBJECTIVE_PRESERVING_ENRICHMENT | add "safe use" framing in place — achieves Revision 1's intent without moving water-cycle content here |
| p3-bsci-12 | Light and Mirrors | OBJECTIVE_PRESERVING_ENRICHMENT | add shadows in place — this achieves Revision 1's intent for "light, shadows, mirrors" **at its current id**, not a relocated one |
| p3-bsci-13 | First Aid and Safety | OBJECTIVE_PRESERVING_ENRICHMENT | broaden to include environmental-safety angle in place (this module has the recently user-approved adult-supervision tone fix — preserve it exactly) |
| p3-bsci-14 | Animal Habitats and Shelters | OBJECTIVE_PRESERVING_ENRICHMENT | add an adaptation angle in place — achieves Revision 1's "habitats, shelters, simple adaptation" target without moving anything |
| p3-bsci-15 | Balanced Meals | OBJECTIVE_PRESERVING_ENRICHMENT | add "food functions" framing in place |

**Significant finding:** once fixed-id discipline is applied, **P3 needs zero SEMANTIC_REPLACEMENT entries at all.** Every one of Revision 1's target descriptions for P3 turns out to be achievable as an in-place enrichment of that id's *existing* topic — Revision 1's apparent need for wholesale repurposing was an artifact of trying to force a "cleaner" sequence, not a real content gap. The only genuinely new idea (a distinct, deeper "plant parts and functions" module beyond P2's simpler treatment) would need a new appended id (`p3-bsci-16`) if still wanted — optional, not required.

### P4

| ID | Current topic | Classification | Resolution |
|---|---|---|---|
| p4-bsci-01 through 15 (all) | Plant Groups, Animal Groups, Types of Soil, Soil and Farming, Energy Sources, Electricity Safety, Push/Pull, Friction, Hygiene, Clean Surroundings, Malaria, Diarrhoea, Weather Instruments, Weather Records, Fire/Heat/Safety | **KEEP ALL FIFTEEN, no change needed** | Revision 1 proposed a near-total rotation of topics across all 15 ids (roughly shifting each topic ~4 slots) to interleave life-science and physical-science content, plus multiple merges (Plant+Animal Groups; Soil Types+Farming; Push/Pull+Friction; Hygiene+Clean Surroundings; Malaria+Diarrhoea; Weather Instruments+Records). **Every one of these is disallowed** under the user's explicit "do not renumber P3 or P4" and "do not merge two completed modules into one" rules — and P4 was reviewed and approved by the user in **two separate rounds** in this same session, with specific fixes (Q5/OUTRO repetition, plural agreement, distractor quality) that a repurposing would discard entirely. |

**Net result for P4: zero changes to any existing module.** Revision 1's desired new topics (temporary/permanent changes, life cycles, digestion/teeth/nutrition, a deeper water cycle, sound, vehicles/technology) can only be added as brand-new appended ids, not by touching any of the current 15:

**§3c — genuinely new P4 topics, proposed as new appended ids:**
- `p4-bsci-16` — Temporary and permanent changes; heating and cooling (**NEW**, Basic Science)
- `p4-bsci-17` — Changes in plants and animals; life cycles (**NEW**, Basic Science)
- `p4-bsci-18` — Digestive system, teeth, and nutrition (**NEW** — mixed strand: digestion/teeth likely Basic Science, nutrition is PHE per §2; needs careful internal separation if built, or split into two modules)
- `p4-bsci-19` — Sound: how it is made and travels (**NEW**, Basic Science)
- `p4-bsci-20` — Vehicles, external parts, safe technology use (**NEW**, Basic Technology)
- (A deeper water-cycle module was Revision 1's `p4-bsci-07` target — since P3 already has a water-cycle module that can absorb this depth in place (§3, P3 table), a separate P4 water module may be redundant; recommend deferring unless a genuinely P4-specific angle is identified.)

---

## 4. List of editorial changes

Minor wording-only changes (P1 `p1-bsci-10`; scattered small terminology consistency touches) — see the OBJECTIVE_PRESERVING_ENRICHMENT rows above for the larger set; true EDITORIAL-only entries are rare in this pass because almost every "PATCH" the Foreman proposed actually adds scope (which makes it ENRICHMENT, not pure EDITORIAL, by the definitions given).

## 5. List of objective-preserving enrichments

All rows marked OBJECTIVE_PRESERVING_ENRICHMENT in §3 above (the large majority of proposed P1-P4 changes, once fixed-id discipline is applied). Progress should remain valid for all of these, subject to your review of the specific wording changes when built.

## 6. List of semantic replacements requiring migration

**None are required.** The only candidate is the optional P2 Five Senses repeat (`p2-bsci-08`), presented in §3 as a choice, not a default recommendation. If you want it, it would be the sole `SEMANTIC_REPLACEMENT` in this entire plan, affecting any learner who previously completed that specific module (they would appear to have completed different content).

---

## 7. Content-versioning decision note

| | **Option 1: Never repurpose; add new ids for missing coverage** | **Option 2: Per-module `contentRevision` field + selective progress invalidation** | **Option 3: One-time curriculum-version migration with explicit id/revision mapping** |
|---|---|---|---|
| IndexedDB impact | None — existing `modules`/`progress` stores unchanged in structure | Requires adding a `contentRevision` field to the module schema and a migration to stamp existing records; progress-comparison logic must check revision match | Requires a full migration pass rewriting/remapping progress records against an explicit old-id→new-id (or old-id→old-id+revision) table |
| Learner completion integrity | Perfect — no existing completion record ever becomes misleading | Good, if implemented correctly — a learner's old completion is either preserved (revision-compatible) or explicitly flagged stale, never silently wrong | Good, but only as strong as the migration mapping's accuracy — a mapping bug could silently corrupt completion data at scale |
| Offline compatibility | No special handling needed (matches the app's existing offline-first IndexedDB model exactly) | Needs a version-check on next sync/load while offline — moderate complexity given the PWA's offline-first design | Migration needs to run correctly even for a device that's been offline for a long time and syncs later — higher complexity |
| Migration complexity | None | Moderate — new schema field, new comparison logic in `app.js`/progress-tracking code (this touches engine files, which is explicitly out of scope for the content-only workstream) | High — one-time but high-stakes; requires careful testing against real device state, is exactly the kind of engine-touching change this workstream has been deliberately scoped away from |
| Rollback | Trivial (nothing to roll back — new ids can simply be left unused/hidden if abandoned) | Moderate — reverting a schema field addition affects any records already stamped | Hard — a bad migration is difficult to reverse once learner devices have applied it |
| Testing burden | Low — same testing discipline already used for every prior milestone (gates + Hausa review) | Moderate — needs new automated tests for revision-mismatch handling | High — needs device-state simulation across the offline/online sync matrix |

**Recommendation: Option 1**, for now. It requires zero engine-file changes (staying inside this workstream's established content-only scope), has zero learner-progress risk, and — per §3 above — turns out to be sufficient to implement essentially everything Revision 1 wanted, once "new topic" is separated from "repurposed slot." Option 2 is worth revisiting later if the team decides some existing modules are weak enough to warrant real replacement (not just the P2 Five Senses case) — that's an engine-level feature decision for you and whoever owns `app.js`/the progress-tracking logic, not something to fold into a content-authoring brief. Option 3 should only be considered for a deliberate, rare, large-scale overhaul, not as a routine tool.

**Not implementing any of these three options now** — this section is decision-support only, per your instruction.

---

## 8. Isolated P1 filler-hotfix brief (for your approval — Codex NOT dispatched)

**Task ID (proposed):** `2026-07-XX-bsci-p1-filler-hotfix`
**Objective:** Replace the verbatim-identical filler sentence found in 13 of P1's 15 modules with unique, topic-specific wording. This is a content-quality fix only — no restructuring, no id changes, no objective changes.

**In scope:** `app/content.json` — the specific `textExplanationHa` sentence in each of exactly 13 affected modules: `p1-bsci-02` through `p1-bsci-15` (all except `p1-bsci-01`, which does not contain the filler sentence). **Confirmed by direct field-by-field check against the full text of every P1 module** (not just an excerpt): the filler sentence appears in `textExplanationHa` in all 13 and does **not** appear in `audioScript` in any module — so `audioScript` is out of scope for this hotfix entirely.

**Out of scope:** titles, ids, moduleNumbers, microPauses, quizQuestions, the surrounding non-filler prose, any other module, any engine file, git.

**Required fix:** for each of the 13 modules, replace the sentence *"A wannan darasi, za mu kalli batun a hankali domin ka gane shi cikin sauki kuma ka iya amfani da shi a rayuwarka ta yau da kullum."* with a new sentence that reinforces that specific module's actual topic (mirroring exactly how the P4 M3 Q5/OUTRO hotfix was done this session) — not a second generic sentence.

**Preserves:** module ids, titles, learning objectives — this is an `EDITORIAL` classification per §3's own taxonomy, since it only touches wording, not topic identity. No progress reset needed.

**Acceptance gates (mirroring the P4 hotfix pattern exactly):**
1. Schema/id/count unchanged (still 15 P1 modules, same ids).
2. Word count still 120-170 for all 15 (the replacement sentence should be roughly the same length as what it replaces).
3. Hook-lint: 0 errors.
4. Cross-module answer-string consistency: unaffected (this fix doesn't touch quiz fields), but rerun anyway to confirm no accidental collateral change.
5. Audio/micro-pause coherence: unaffected (fix doesn't touch microPauses or PAUSE markers), but rerun anyway.
6. Repetition check: confirm the filler sentence no longer appears verbatim in more than one module (or at all, if fully replaced).

**This brief is presented for your approval only. Codex has not been dispatched. No file has been edited.**

---

## 9. Revised recommended execution order

1. You review and rule on: (a) the P2 Five Senses open decision (§3, `p2-bsci-08`), (b) whether to build any of the "genuinely new" appended-id modules identified in §3a/§3b/§3c, and on what timeline, (c) approval of the P1 filler hotfix brief (§8).
2. **P1 filler hotfix** (§8) — isolated, low-risk, dispatched on your go-ahead, following the exact gate discipline used for every prior milestone.
3. **P1-P4 enrichment pass** (§3-5) — if wanted at all: each band's OBJECTIVE_PRESERVING_ENRICHMENT rows would need their own bounded builder briefs, reviewed the same way M1-M3 were (source draft → gates → Hausa review → merge), band by band, with your explicit go-ahead before each one starts. This is optional and separate from continuing the P5-P6 build — your call on priority.
4. **P5 authoring** — remains frozen per your instruction, resumes once you confirm the revised P5 canonical map (§2's P5 table) supersedes both my original draft and Revision 1's version.
5. **Content-versioning decision** (§7) — Option 1 is recommended and requires no separate engineering work to adopt (it's the default/do-nothing option); Options 2-3 would need a separate scoping conversation with whoever owns the app's engine code, not this content workstream.

---

## Summary of what this document does NOT do

Only this file was created/edited (a revision of the same planning document from the prior round). `app/content.json`, all engine files, and every existing module remain untouched. No new batch JSON file was created. No Codex dispatch occurred. No merge or commit occurred. No backup files were created inside the repo.
