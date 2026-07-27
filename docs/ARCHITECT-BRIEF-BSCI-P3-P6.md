# AJAMIX — Architect Brief: Basic Science Content Build, P3 → P6

> **P6 amendment — 2026-07-13:** The current P6 baseline, count target, curriculum selection, slice sequence, and safety locks are governed by [`BSCI-P6-HYBRID-CANONICAL-MAP.md`](./BSCI-P6-HYBRID-CANONICAL-MAP.md). The P6 anchors and 298-module target below were explicitly indicative and are now obsolete: the verified live baseline is 294 modules, and the approved 15-module Nigeria-first/global-enriched P6 band targets 309 after review and guarded merge.

**Role split for this workstream**
- **Architect (Claude):** owns this brief, the schema contract, acceptance criteria, and milestone review. Does not write module content.
- **Foreman (ChatGPT):** ingests this brief, decides task allocation between itself and Codex, sequences the work, runs the validator, and reports milestones back to the Architect.
- **Builder (ChatGPT / Codex):** authors module JSON to spec, in-repo.
- **Human validators (the user, fluent Hausa speaker, first — escalates to TIMSAN only when unsure):** the only authority that turns *drafted Hausa* into *shippable Hausa* (Gates 3–4 of `docs/VALIDATION-CHECKLIST.md`). No AI output is "done" until it clears this gate. All Hausa orthography/content questions route to the user first; the user escalates to TIMSAN, not the Architect or Foreman.

Repo: `/Users/muhammadbamalli/Documents/ajamix`

---

## 1. Brief — what AJAMIX is (from PRD)

Offline-first PWA delivering the full Nigerian curriculum (Nursery→SS3) in Hausa for Northern Nigeria — primarily tsangaya students literate in Ajami but with limited formal schooling, plus adult learners. Content is **audio-primary Hausa**, with interactive micro-pause questions, randomized quizzes, and a flame-streak engagement loop, all running fully offline on low-end Android (1GB RAM, 16GB storage). Curriculum aligns to NERDC BEC (Primary), NERDC JSS, and WAEC/NECO (Senior).

## 2. Brief — how it's built (from TAS)

- **Static PWA, vanilla JS, no backend (Phase 1).** All logic client-side.
- **Content = one bundle:** `app/content.json` (modules + gradeBands + glossary + activities). Loaded on first launch into IndexedDB (`ajamix-db`: settings / modules / audioCache / progress / glossary).
- **Quiz engine** (`app/quiz-engine.js`): parameterized templates → random instances. Safe eval whitelists `^[\d\s+\-*/().]+$`; distractors filtered for negatives + duplicates; must generate cleanly across 100 random instances. **Basic Science quizzes are non-numeric** — literal Hausa answer strings, not formulas (see §5).
- **Audio + micro-pauses (TMSE):** `<audio>` fires questions at `pauseAtMs`; response times recorded.
- **Ajami rendering:** Noto Naskh Arabic; a deterministic `romanToAjami()` engine in `app.js` auto-transliterates Latin Hausa → Ajami as a fallback. Pre-validated `titleAjami`/`templateAjami`/`questionAjami` take precedence **when present**.
- **Current build is Latin-first** (`scriptMode: "latin"` default; Ajami re-enable is deferred Gate 7). → **The builder authors Latin Hausa only and leaves all Ajami fields `null`.** The engine handles script.
- **`gradeBands` schema already lists `p3`, `p4`, `p5`, `p6`** (confirmed in `content.json.gradeBands`, already populated by the Mathematics arc) — this is a pure content-authoring workstream, **no engine/schema change required** to unlock these bands for a new subject.

## 3. Brief — current content state

| Band | Basic Science | Mathematics | Social Studies | Vocational | Total |
|------|:---:|:---:|:---:|:---:|:---:|
| nursery1 | – | 12 | – | – | 12 |
| nursery2 | – | 12 | – | – | 12 |
| p1 | 15 | 24 | 15 | – | 54 |
| p2 | 15 | 24 | 15 | – | 54 |
| **p3 → p6** | *empty* | **24 × 4 (96, complete)** | *empty* | – | 96 |
| adult (vocational) | – | – | – | 10 (V01–V10) | 10 |

**238 modules total** (verified 2026-07-07). The P3–P6 Mathematics arc (`docs/ARCHITECT-BRIEF-MATH-P3-P6.md`) is fully built, reviewed, and merged. Basic Science and Social Studies were **deliberately frozen at P2** for the duration of that arc — an explicit, accepted sequencing choice, not an oversight — and are now unblocked. **Basic Science, P3–P6, is this workstream's target.**

## 4. Next step — the goal, and why this shape

Same subject-first logic as the Math arc, confirmed by the user for this workstream: **one subject, four grade bands** — author **Basic Science for P3, P4, P5, and P6** into `app/content.json`, in that order, before starting Social Studies for any of those bands. Social Studies P3–P6 stays frozen until this Basic Science arc is done, mirroring exactly how Mathematics froze Basic Science/Social Studies before it.

**Why subject-first, not band-first:** unchanged rationale from the Math brief — cross-module terminology drift within a subject (a spelling, a quiz-answer string) is the proven real failure mode (see the P2 defect batch: `docs/TICKET-kadan-missing-hook.md`, `docs/TICKET-glossary-duplicate-entries.md`). That risk is easier to control when Codex/Foreman hold one subject's vocabulary and one hooked-letter lint pass in their head across a continuous run. The trade-off is explicit: Social Studies stays frozen at P2 until this whole Basic Science arc (P3–P6) is done.

Target counts (mirror P1/P2's Basic Science count): **15 modules per band × 4 bands = 60 new modules.** Total content after this workstream: **298 modules.**

Phased so quality is proven before scale, and so each band is validated before the next starts:
- **BSCI-P3-Pilot (6):** `p3-bsci-01..06`. Prove schema + validator + in-app render + the Hausa review loop end to end for this subject in the new bands.
- **BSCI-P3 complete:** to `p3-bsci-15`.
- **BSCI-P4 complete:** `p4-bsci-01..15`.
- **BSCI-P5 complete:** `p5-bsci-01..15`.
- **BSCI-P6 complete:** `p6-bsci-01..15`.

Indicative NERDC BEC Basic Science topic anchors (Foreman/Builder refine against the actual NERDC BEC P3–P6 syllabus — these are starting points, not a locked scope; continuity with P1/P2's covered ground — senses, living/non-living, water, air, weather, simple machines, light/heat, hygiene, food groups, safety, environment — should inform depth, not repetition):
- **P3:** classification of living things (plants vs. animals, more detail than P1/P2); parts of the body and their functions; growth and life cycles (simple, e.g. seed→plant, egg→chick); the environment (home, school, community); water cycle (simple, evaporation/rain); states of matter (solid/liquid/gas, everyday examples); basic first aid/safety; farm animals and their products; healthy eating (food groups, extending P2).
- **P4:** classification of plants (trees, shrubs, herbs); classification of animals (vertebrates/invertebrates, simple); soil types and uses; energy sources (sun, fire, wind — everyday, non-technical); simple electricity (batteries, torches, safety — no circuits diagrams required at this level unless NERDC syllabus specifies); force and movement (push/pull, simple); personal and environmental hygiene (extending P2); common diseases and prevention (malaria, diarrhoea — age-appropriate); weather instruments (simple, e.g. rain gauge concept).
- **P5:** the human body systems (digestive, respiratory — simple, age-appropriate); reproduction in plants (pollination, simple); adaptation of animals to environment; conservation of natural resources; magnetism (simple, everyday); sound and how it travels (extending P2's "Sound Around Us"); nutrition and balanced diet (deeper than P2/P4); common tools and their uses; drug abuse awareness (age-appropriate, NERDC-standard framing).
- **P6:** ecosystems and food chains (simple); human reproduction and puberty (age-appropriate, NERDC-standard framing, sensitive handling); simple machines mastery (extending P1/P2's lever/wheel-and-axle); heat and temperature; the solar system (sun, moon, earth, day/night — simple); pollution and environmental protection; first aid (extending P3); revision/consolidation module bridging to JSS1 Basic Science.

**Flag for the Architect at slice review, not resolved here:** P5 (drug abuse awareness) and P6 (puberty/human reproduction) touch sensitive topics. NERDC BEC includes them at these levels, but the Hausa framing needs explicit user sign-off before drafting — raise this as an open question at the start of the P5 and P6 slices respectively rather than letting Codex improvise tone on first draft.

---

## 5. Schema contract (the hard part — match exactly)

Every new module is an object in `content.json.modules[]` with **exactly these keys**, modeled on the existing `p2-bsci-01`:

```json
{
  "id": "p3-bsci-01",
  "gradeband": "p3",
  "subject": "Basic Science",
  "subjectHa": "Kimiyya",
  "moduleNumber": 1,
  "titleEn": "<English title>",
  "titleHa": "<Hausa title>",
  "titleAjami": null,
  "ajami_validated": false,
  "textExplanationHa": "<120–170 words of natural Hausa. Correct hooked letters ɓ ɗ ƙ. Second person, warm, concrete examples from a Northern Nigerian child's world.>",
  "textExplanationAjami": null,
  "audioScript": "[INTRO] ... [MAIN] ... [PAUSE 1] <question> ... [MAIN] ... [PAUSE 2] <question> ... [OUTRO] ...",
  "audioFile": "audio/p3-bsci-01.mp3",
  "imageCard": "images/p3-bsci-01.png",
  "microPauses": [
    { "pauseAtMs": 90000, "questionHa": "…", "correctAnswer": "…", "options": ["…","…","…"] },
    { "pauseAtMs": 150000, "questionHa": "…", "correctAnswer": "…", "options": ["…","…","…"] }
  ],
  "quizQuestions": [
    {
      "templateHa": "…",
      "answerFormula": "<literal Hausa answer string>",
      "variableRanges": { "a": { "min": 0, "max": 0 }, "b": { "min": 0, "max": 0 } },
      "distractorFormulas": ["…","…","…"]
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
- `gradeband`: `"p3"` / `"p4"` / `"p5"` / `"p6"` depending on the batch — lowercase, matching the values already present in `content.json.gradeBands` (already populated by the Math arc; no schema change needed).
- `subject` / `subjectHa`: always `Basic Science` / `Kimiyya` for this workstream.
- `id`: `p<band>-bsci-NN`, zero-padded, sequential **within each band** (`p3-bsci-01..15`, then `p4-bsci-01..15`, etc. — numbering restarts per band, exactly like P1/P2). `moduleNumber` sequential 1..15 per band.
- **All Ajami fields (`titleAjami`, `textExplanationAjami`) = `null`. `ajami_validated` = `false`.** Do not invent Arabic script.
- `audioFile` / `imageCard`: placeholder paths only (files recorded later). Path must match the module id.
- `track`: `"formal"`, `targetAudience`: `"youth"`.
- **Formal modules are flat leaves:** `chainNext: null`, `isChainLeaf: true`, `gapTeaser: null`, `useTodayPrompt: null`.
- **Exactly 2** `microPauses`; **exactly 5** `quizQuestions`.

**Quiz templates — this is a Basic Science build, quizzes are static Q&A, NOT parameterized formulas**
- Unlike the Mathematics arc, Basic Science quizzes carry **no numeric/algebraic risk** — `variableRanges` stays `{a:{min:0,max:0}, b:{min:0,max:0}}` (unused placeholders, matching the P1/P2 Basic Science pattern), `answerFormula` is the **literal correct Hausa answer string**, and `distractorFormulas` are **three plausible wrong Hausa answer strings**. Model exactly on the existing `p1-bsci-*` / `p2-bsci-*` modules — do not invent a new quiz shape, and do not route string answers through numeric templating (the engine's math path whitelists digits/operators only).
- `microPauses` questions are always plain multiple-choice (no templating), `options` includes the `correctAnswer`.
- **This means the Math arc's "brute-force-verify every formula" gate is N/A here** — there is no formula-safety harness to write for this subject. The correctness risk moves entirely to Hausa accuracy and terminology consistency (see next bullet), not arithmetic.
- **Cross-module terminology lock (carried forward from the Math arc, applies equally here):** any Hausa word/phrase that is also used as a `correctAnswer`, an `options` entry, or a `distractorFormula` string must use **one single, correct hooked spelling**, consistently, in **every** module and **every** field where it appears — prose, audio script, micro-pause, and quiz fields alike. An inconsistent spelling in a quiz-answer-matching field silently breaks scoring (see `docs/TICKET-kadan-missing-hook.md` for the exact failure mode found in P2 Maths — the same class of bug applies to any string-matched answer field, not just Maths). If unsure whether a word has a hooked form, ask — do not guess.

---

## 6. Definition of Done (per batch)

A batch is **build-complete** (ready for human validation — *not* shippable) when:
1. Every module matches the schema contract above, key-for-key.
2. `node app/tools/validate-content.mjs` exits **0** after the batch is merged into `content.json`.
3. `content.json` stays valid JSON and only the `modules[]` array grew (no reordering/edits to existing modules, gradeBands, glossary, activities).
4. **Zero changes** to `app/app.js`, `app/quiz-engine.js`, `app/styles.css`, `app/index.html`, `app/sw.js`, or any engine file. This is content-only.
5. IDs unique; `moduleNumber` sequential per subject **per band**; no gaps.
6. **Hooked-letter lint gate (all batches):** `node tools/p2-batch/hook-lint.mjs <batch-file.json>` exits **0** (zero ERRORS). WARNINGS (context-dependent words) do not block, but each must be listed in the milestone report's open-questions for the user.
7. **Cross-module quiz-answer consistency check:** for every Hausa word/phrase reused across quiz-answer-matching fields within the batch, grep the batch file for every instance and confirm identical spelling everywhere it appears. Report the words checked in the milestone report, not just "lint passed."
8. **Word-count check on `textExplanationHa`:** 120–170 words per module, every module in the batch (the Math arc's Slice 3 lesson — this gate was originally missing from the structure checker and had to be retrofitted; build it into this workstream's structure check from the start rather than discovering the gap mid-arc).
9. **Sensitive-topic modules (P5 drug-abuse awareness, P6 puberty/reproduction) get an explicit open-question flag in the milestone report even after drafting**, not just at the brief stage — the user reviews tone/framing on these specifically before they're folded into a routine slice approval.

### Orthography house standard (rulings by the user, fluent Hausa speaker — carried forward from P1/P2/Math arcs)
- `ƙwai` (not `kwai`) — "egg."
- `ɓera` (not `bera`) — "rat/mouse."
- `kara` (unhooked) is correct for plant "stem/stalk"; `ƙara` ("to add/increase") is a genuine different-meaning homonym — context-dependent, stays a linter WARNING.
- `kaɗan` (hooked, always) — "little/a bit." Never `kadan`.
- `riƙa` (not `rika`) — habitual marker.
- `ɓoye` (not `boye`) — "to hide."
- The linter's ERROR list is the canonical source of truth for unambiguous hooked-letter corrections. Add a word only when the hooked form is correct in *all* contexts, and only on the user's ruling (or TIMSAN's, if the user escalates).
- **No P3–P6 Basic Science-specific terminology is locked yet** — expect new house-standard rulings during slice review (e.g. body-system names, ecosystem/food-chain vocabulary, "puberty" framing) same as every prior arc.

Then it is handed to the user's Hausa validation gate (Gates 3–4). Only after that is it *shippable*.

### Integration mechanics (keep diffs reviewable)
- Author each batch as a standalone file first, e.g. `tools/p3-batch/p3-bsci.json` (array of module objects), `tools/p4-batch/p4-bsci.json`, etc. — new per-band subdirectories alongside the existing `p3-batch/`…`p6-batch/` Math tooling (do not overwrite the Math source files sitting in those directories).
- Merge with a small idempotent Node script that appends new ids into `content.json.modules` (dedupe by `id`), preserves formatting, then runs the validator. Do **not** hand-edit the 700KB+ `content.json` blind.
- **Never touch git** (the repo's git is currently unstable / hangs unpredictably — leave version control to the human; confirm scope via direct file inspection / content checksums, not `git status`/`git diff`).

---

## 7. Milestone reporting protocol (Foreman → Architect)

The Foreman reports back to the Architect at each gate below. Use this exact format so the Architect can review fast:

```
MILESTONE: <M1..M6>
Batch: <e.g. BSCI-P3-Pilot p3-bsci-01..06>
Built by: <ChatGPT | Codex>
Validator: <paste `node app/tools/validate-content.mjs` output — pass/fail + counts>
Word-count check: <pass/fail per module, 120-170 words>
Hook-lint result: <ERRORS/WARNINGS, and the open-question list for WARNINGS>
Cross-module terminology check: <which reused words were checked, and confirmation of consistent spelling>
Files changed: <list — must be content only>
Samples for spot-check: <2 full module objects, incl. textExplanationHa + quiz>
Open questions / risks for the Architect: <curriculum gaps, ambiguous Hausa, schema doubts, sensitive-topic framing flags>
```

Milestones:
- **M1** — BSCI-P3-Pilot (6) build-complete + validator green.
- **M2** — P3 Basic Science complete (15).
- **M3** — P4 Basic Science complete (15).
- **M4** — P5 Basic Science complete (15).
- **M5** — P6 Basic Science complete (15).
- **M6** — Full P3–P6 Basic Science band (60 modules, 298 total) merged, validator green, all four bands render in the learning path.

At each milestone the Architect reviews shape + Hausa spot-check, then either approves the next batch or sends corrections. **Do not scale past M1 until the Architect approves the pilot**, and **do not start P4 until P3 is fully merged and validator-green** (same discipline, applied per band, mirroring the Math arc exactly).

---

## 8. Architect amendments — M1 pilot (not yet authorized to start)

Unlike the Math arc's brief, **this brief does not pre-authorize the M1 pilot.** Per the Architect's standing constraints, no build work (including the pilot) starts until the user explicitly approves this brief.

Once approved, the following amendments will be binding for the pilot merge (mirroring the Math arc's M1 amendments):

1. **Merge target + write safety.** The only content bundle is `app/content.json` (the validator reads `../content.json` relative to `app/tools/` — do not create or write any other content.json). Before overwriting it the merge script must: (a) write a one-time backup `app/content.json.bak`; (b) parse the merged object and assert the module count goes **exactly 238 → 244** and JSON re-parses cleanly — otherwise abort **without writing**; (c) preserve 2-space indentation and the trailing newline to keep the diff minimal.
2. **Idempotency proof.** Running the merge script a second time must leave `app/content.json` byte-identical (dedupe by `id`). Demonstrate this in the M1 report.
3. **Audio ↔ micro-pause coherence.** Each module's two `microPauses[].questionHa` must be the same two questions embedded at `[PAUSE 1]` / `[PAUSE 2]` in that module's `audioScript`. `pauseAtMs` must fall within the plausible ~3-minute narration — mirror `p2-bsci`'s `90000` / `150000` unless script length clearly justifies otherwise. Each `correctAnswer` must be one of its `options`.
4. **Quiz shape — mirror `p1-bsci`/`p2-bsci` exactly, do not improvise.** Static string-answer quizzes only, as specified in §5. Do not route string answers through numeric templating.
5. **Same merge-count discipline applies at every subsequent milestone** (P3 complete: 238 → 247; P4: 247 → 262; P5: 262 → 277; P6: 277 → 298) — Foreman recomputes and asserts the exact expected count before each merge, not just "count increased."

Everything else in the proven process from `docs/ARCHITECT-BRIEF-P2.md` and `docs/ARCHITECT-BRIEF-MATH-P3-P6.md` stands as the working template for this one.
