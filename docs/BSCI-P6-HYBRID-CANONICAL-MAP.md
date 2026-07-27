# AJAMIX Primary 6 Basic Science — Nigeria-first hybrid curriculum map

## Status

COMPLETE and merged. All three slices (`p6-bsci-01..15`) passed the human terminology, technical, safety, collision, and progression gates, then received explicit merge approval. The guarded append moved the live bundle from 294 to 309 modules while preserving every pre-existing module and all non-module top-level data. The general pulley label is the approved descriptive phrase `na'urar dabaran igiya`; it is not presented as a standardized dictionary headword.

Live baseline before P6: 294 modules and zero `p6-bsci-*` modules. A complete 15-module band will move the bundle to 309 modules, not the obsolete 298 target in the earlier P3-P6 brief.

Image generation is paused. This workstream is curriculum-only.

## Curriculum pattern

Each module is Nigeria-first and internally classified as one or more of:

- NERDC Basic Science core;
- NERDC Basic Technology core;
- cross-curricular Physical and Health Education integration;
- global primary-science enrichment;
- local Nigerian application.

These planning labels do not appear in learner-facing Hausa. Nigerian curriculum anchors control topic selection. Global enrichment strengthens scientific accuracy, enquiry, modelling, measurement, evidence use, sustainability, and progression toward JSS1. Local applications use credible Nigerian settings and examples without stereotypes.

Official Nigerian anchor: [NERDC, *Basic Science and Technology Curriculum*, Primary 4–6](https://nerdc.gov.ng/content_manager/primary/pri4-6_basic_science_technology.pdf). Global progression anchors: [Cambridge Primary Science](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/curriculum/science/) strands (Biology, Chemistry, Physics, Earth and Space, Thinking and Working Scientifically, Science in Context) and [England upper-KS2 working-scientifically expectations](https://www.gov.uk/government/publications/national-curriculum-in-england-science-programmes-of-study/national-curriculum-in-england-science-programmes-of-study). Scientific enquiry is embedded in substantive lessons rather than isolated as a detached strand.

## Fixed module map

### Slice 1 — Nigerian Basic Science core and global enquiry (`01..05`)

1. `p6-bsci-01` — Solar System and Gravity. NERDC: solar-system bodies, planets, Earth’s pull. Global enrichment: model scale/order, evidence versus appearance, safe model-building.
2. `p6-bsci-02` — Earth’s Rotation, Revolution, Day and Night. NERDC: Earth movements and effects. Global correction: the Moon is not a source of its own light; it reflects sunlight. Eclipse content distinguishes `kusufin Rana` (solar eclipse) from `husufin Wata` (lunar eclipse), uses models, and is eye-safety constrained.
3. `p6-bsci-03` — Weather Symbols, Climate Records, and Change. NERDC: symbols, observation over time, records, effects of climate change. Nigerian application: hunturu/harmattan, rainy season, heat, flooding, farming and water planning. Global enrichment: repeated observations, tables and evidence-based conclusions.
4. `p6-bsci-04` — Forces and Friction. NERDC: push/pull, gravity, magnetic force, friction, advantages/disadvantages. Global enrichment: fair comparison and controlled-variable reasoning; no unsafe blades or heavy-load activity.
5. `p6-bsci-05` — Heart, Blood Vessels, and Circulation. NERDC: heart, arteries, veins, capillaries and transport by blood. Global enrichment: system model, structure/function, pulse observation without diagnosis.

### Slice 2 — human development, air, resources, and light (`06..10`)

6. `p6-bsci-06` — Puberty, Normal Change, Hygiene, and Privacy. Cross-curricular PHE/global health bridge into NERDC human reproduction. Factual, non-graphic, age-variable, non-shaming; personal boundaries and trusted-adult questions.
7. `p6-bsci-07` — Human Reproduction, Growth, and Development. NERDC human reproductive system, simplified and age-appropriate. No sexual instruction, explicit imagery, diagnosis, moral judgement, or invented Hausa anatomy terminology. Exact terminology requires human Hausa review.
8. `p6-bsci-08` — Air Pressure and Its Uses. NERDC: air pressure, movement in air, sails, pumps and wind applications. Global enrichment: safe model comparison and causal explanation; no pressurised-container experiments.
9. `p6-bsci-09` — Mineral Resources of Nigeria and Responsible Use. NERDC: Nigerian minerals, observable grouping and economic importance. Global enrichment: finite resources, environmental responsibility, evidence from safe samples/pictures; no quarry or fuel handling.
10. `p6-bsci-10` — White Light, Primary Colours, and Pigments. NERDC Basic Technology: component colours and colour mixing. Global accuracy lock: distinguish additive colours of light from pigment mixing; prism demonstrations are teacher-led and direct Sun viewing is prohibited.

### Slice 3 — Basic Technology mastery and JSS1 bridge (`11..15`)

11. `p6-bsci-11` — Drawing Instruments and Accurate Technical Lines. NERDC Basic Technology: ruler, set square, compass, divider, T-square and drawing board. Safe handling; accuracy, measurement and tool choice.
12. `p6-bsci-12` — Hand Tools: Identification, Care, and Safety. NERDC Basic Technology: measuring, marking and cutting-tool categories. Recognition and safety only for sharp tools; child use is not instructed.
13. `p6-bsci-13` — Maintenance, Workshop Safety, and Road Safety. NERDC Basic Technology: preventive/corrective maintenance, safety precautions and devices. Nigerian application: reflective triangle, seat belt, pedestrian awareness; repair remains adult/trained-worker work.
14. `p6-bsci-14` — Levers and Pulleys. NERDC Basic Technology: lever parts and uses; fixed/movable pulleys. Global enrichment: compare effort and direction using teacher-supervised models; no heavy loads, climbing or sharp components.
15. `p6-bsci-15` — Inclined Planes and P6 Science Consolidation. NERDC Basic Technology: examples and advantages of inclined planes. JSS1 bridge: select evidence, compare models, identify variables, read a simple table, and explain limits of a conclusion.

## Global-enrichment rules

- Embed at least one meaningful observation, classification, model, measurement, comparison, or evidence task in every module.
- Prefer questions that require explanation from evidence over recall-only repetition.
- Use models honestly: state what the model shows and what it does not show.
- Use repeated observations where change over time matters.
- Separate observation from inference and fact from unsupported claim.
- Correct source-age scientific oversimplifications without discarding the Nigerian topic anchor.

## Hausa, safety, and sensitivity locks

- All uncertain technical terms must be descriptive or explicitly flagged; do not silently invent Hausa terms.
- Puberty/reproduction: factual, non-graphic, non-shaming, no sexual instructions, no diagnosis, no moral or religious claim, no unsafe disclosure instruction. Direct questions route to a parent/guardian, teacher, or qualified health worker the learner trusts.
- Circulation: no diagnosis, blood-pressure interpretation, or medical treatment advice.
- Eclipse/light: never look directly at the Sun; no learner-led prism exposure to direct sunlight.
- Tools/machines: sharp tools, heavy loads, workshops, vehicles, and repairs remain adult/teacher-supervised or observation-only.
- Minerals: no mine/quarry entry, crude-oil handling, unknown-sample handling, burning or tasting.

## Build and merge gates

- Source file: `tools/p6-batch/p6-bsci.json`, appended in contiguous five-module slices.
- Exactly 120–170 Hausa words in every `textExplanationHa`.
- Two audio-aligned micro-pauses and five static-answer quizzes per module.
- Correct answer appears exactly once in options; distractors are taught-fact-safe and unambiguously wrong.
- Unique topic-specific Q5 and OUTRO within the band.
- Hook-lint: zero errors; every warning reviewed.
- Within-module redundancy: zero findings.
- Human Hausa/content review after each slice.
- Merge completed 2026-07-13 through `tools/p6-batch/merge-p6-bsci.mjs`: 294 → 309, idempotent, with every pre-existing module and every non-module top-level field preserved.
