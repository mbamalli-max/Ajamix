# AJAMIX — Architect Brief: Mathematics Content Build, P3 → P6

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
- **Quiz engine** (`app/quiz-engine.js`): parameterized templates → random instances. Safe eval whitelists `^[\d\s+\-*/().]+$`; distractors filtered for negatives + duplicates; must generate cleanly across 100 random instances.
- **Audio + micro-pauses (TMSE):** `<audio>` fires questions at `pauseAtMs`; response times recorded.
- **Ajami rendering:** Noto Naskh Arabic; a deterministic `romanToAjami()` engine in `app.js` auto-transliterates Latin Hausa → Ajami as a fallback. Pre-validated `titleAjami`/`templateAjami`/`questionAjami` take precedence **when present**.
- **Current build is Latin-first** (`scriptMode: "latin"` default; Ajami re-enable is deferred Gate 7). → **The builder authors Latin Hausa only and leaves all Ajami fields `null`.** The engine handles script.
- **`gradeBands` schema already lists `p3`, `p4`, `p5`, `p6`** (confirmed in `content.json.gradeBands`) — this is a pure content-authoring workstream, **no engine/schema change required** to unlock these bands.

## 3. Brief — current content state

| Band | Basic Science | Mathematics | Social Studies | Vocational | Total |
|------|:---:|:---:|:---:|:---:|:---:|
| nursery1 | – | 12 | – | – | 12 |
| nursery2 | – | 12 | – | – | 12 |
| p1 | 15 | 24 | 15 | – | 54 |
| **p2** | **15** | **24** | **15** | – | **54** |
| p3 → p6 | *empty* | *empty* | *empty* | – | 0 |
| adult (vocational) | – | – | – | 10 (V01–V10) | 10 |

**142 modules total.** P1 and P2 are both formally complete across all three subjects (Gates 2–6 defect batch on P2 closed 2026-07-04). **Every grade band from P3 onward is empty.**

## 4. Next step — the goal, and why this shape

Instead of the P1/P2 pattern (one grade band, all three subjects), this workstream goes **one subject, four grade bands**: author **Mathematics for P3, P4, P5, and P6** into `app/content.json`, in that order, before starting Basic Science or Social Studies for any of those bands.

**Why subject-first, not band-first:** the P2 defect batch (`docs/TICKET-kadan-missing-hook.md`, `docs/TICKET-glossary-duplicate-entries.md`) showed our real failure mode is *cross-module terminology drift within a subject* — a spelling or a quiz-answer string getting inconsistent as new modules pile in. That risk is easier to control when Codex/Foreman hold one subject's vocabulary and one hooked-letter lint pass in their head across a continuous run, instead of re-loading three subjects' terminology every batch. The trade-off, stated plainly: Science and Social Studies stay frozen at P2 until this whole Math arc (P3–P6) is done. That is an accepted, deliberate sequencing choice for this workstream, not an oversight.

Target counts (mirror P1/P2's Mathematics count): **24 modules per band × 4 bands = 96 new modules.** Total content after this workstream: **238 modules.**

Phased so quality is proven before scale, and so each band is validated before the next starts:
- **MATH-P3-Pilot (6):** `p3-maths-01..06`. Prove schema + validator + in-app render + the Hausa review loop end to end for the new bands.
- **MATH-P3 complete:** to `p3-maths-24`.
- **MATH-P4 complete:** `p4-maths-01..24`.
- **MATH-P5 complete:** `p5-maths-01..24`.
- **MATH-P6 complete:** `p6-maths-01..24`.

Indicative NERDC BEC Mathematics topic anchors (Foreman/Builder refine against the actual NERDC BEC P3–P6 syllabus — these are starting points, not a locked scope):
- **P3:** numbers to 1,000; place value (hundreds/tens/units); addition & subtraction with regrouping; multiplication tables (2–5, 10); intro division (sharing/grouping); simple fractions (half, quarter); money (naira/kobo, giving change); measurement (length, weight, capacity); telling time to the quarter-hour.
- **P4:** numbers to 10,000; the four operations with larger numbers; multiplication tables to 10; long division intro; fractions (equivalent fractions, comparing); intro decimals; area & perimeter of simple shapes; angles (right angle, intro); data handling (simple tables/bar charts); time (24-hour clock intro).
- **P5:** numbers to 100,000; LCM & HCF; fraction operations (add/subtract with unlike denominators); decimal operations; intro percentages; ratio & proportion (intro); area & perimeter (composite shapes); angles (types, measuring); average/mean (intro); word problems combining operations.
- **P6:** numbers to 1,000,000; all four operations at speed/mastery level; fractions/decimals/percentages conversions and operations; ratio & proportion; simple algebra (intro, letter for unknown); area/perimeter/volume; angles in shapes (sum of angles in a triangle); data & simple probability (intro); revision/consolidation modules bridging to JSS1.

---

## 5. Schema contract (the hard part — match exactly)

Every new module is an object in `content.json.modules[]` with **exactly these keys**, modeled on the existing `p2-maths-01`:

```json
{
  "id": "p3-maths-01",
  "gradeband": "p3",
  "subject": "Mathematics",
  "subjectHa": "Lissafi",
  "moduleNumber": 1,
  "titleEn": "<English title>",
  "titleHa": "<Hausa title>",
  "titleAjami": null,
  "ajami_validated": false,
  "textExplanationHa": "<120–170 words of natural Hausa. Correct hooked letters ɓ ɗ ƙ. Second person, warm, concrete examples from a Northern Nigerian child's world.>",
  "textExplanationAjami": null,
  "audioScript": "[INTRO] ... [MAIN] ... [PAUSE 1] <question> ... [MAIN] ... [PAUSE 2] <question> ... [OUTRO] ...",
  "audioFile": "audio/p3-maths-01.mp3",
  "imageCard": "images/p3-maths-01.png",
  "microPauses": [
    { "pauseAtMs": 90000, "questionHa": "…", "correctAnswer": "…", "options": ["…","…","…"] },
    { "pauseAtMs": 150000, "questionHa": "…", "correctAnswer": "…", "options": ["…","…","…"] }
  ],
  "quizQuestions": [
    {
      "templateHa": "…{a}…{b}…",
      "answerFormula": "a + b",
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
- `gradeband`: `"p3"` / `"p4"` / `"p5"` / `"p6"` depending on the batch — lowercase, matching the values already present in `content.json.gradeBands`.
- `subject` / `subjectHa`: always `Mathematics` / `Lissafi` for this workstream.
- `id`: `p<band>-maths-NN`, zero-padded, sequential **within each band** (`p3-maths-01..24`, then `p4-maths-01..24`, etc. — numbering restarts per band, exactly like P1/P2). `moduleNumber` sequential 1..24 per band.
- **All Ajami fields (`titleAjami`, `textExplanationAjami`) = `null`. `ajami_validated` = `false`.** Do not invent Arabic script.
- `audioFile` / `imageCard`: placeholder paths only (files recorded later). Path must match the module id.
- `track`: `"formal"`, `targetAudience`: `"youth"`.
- **Formal modules are flat leaves:** `chainNext: null`, `isChainLeaf: true`, `gapTeaser: null`, `useTodayPrompt: null`.
- **Exactly 2** `microPauses`; **exactly 5** `quizQuestions`.

**Quiz templates — this is a Mathematics-only build, every quiz is parameterized**
- Real parameterized templates — `{a}`/`{b}` in `templateHa`, arithmetic `answerFormula` (e.g. `{a} + {b}`, `a - 1`, or a literal like `100` for a fixed-answer question), `variableRanges` with bounds appropriate to the band (P3 stays within ~0–1000, P6 can range to ~1,000,000 per topic). `distractorFormulas` must stay **non-negative** and **distinct from the answer and from each other** across the full variable range. Model exactly on the existing `p1-maths-*` / `p2-maths-*` modules — do not invent a new quiz shape.
- `microPauses` questions are always plain multiple-choice (no templating), `options` includes the `correctAnswer`.
- **Cross-module terminology lock (new rule, learned from P2):** any Hausa word/phrase that is also used as a `correctAnswer`, an `options` entry, a `distractorFormula`, or an `answerFormula` string (e.g. comparative words like "yawa"/"kaɗan", fraction words like "rabi"/"kwata") must use **one single, correct hooked spelling**, consistently, in **every** module and **every** field where it appears — prose, audio script, micro-pause, and quiz fields alike. This is not optional: an inconsistent spelling in a quiz-answer-matching field silently breaks scoring (see `docs/TICKET-kadan-missing-hook.md` for the exact failure mode found in P2 Maths). If unsure whether a word has a hooked form, ask — do not guess.

---

## 6. Definition of Done (per batch)

A batch is **build-complete** (ready for human validation — *not* shippable) when:
1. Every module matches the schema contract above, key-for-key.
2. `node app/tools/validate-content.mjs` exits **0** after the batch is merged into `content.json`.
3. **Formula-safety check** — every quiz template generates a valid, non-negative, non-duplicate option set across **100 random instances** (TAS §8, rule 8). Foreman/Builder writes a throwaway harness using `app/quiz-engine.js` to prove this. Mandatory for every batch in this workstream (Mathematics is 100% templated).
4. `content.json` stays valid JSON and only the `modules[]` array grew (no reordering/edits to existing modules, gradeBands, glossary, activities).
5. **Zero changes** to `app/app.js`, `app/quiz-engine.js`, `app/styles.css`, `app/index.html`, `app/sw.js`, or any engine file. This is content-only.
6. IDs unique; `moduleNumber` sequential per subject **per band**; no gaps.
7. **Hooked-letter lint gate (all batches):** `node tools/p2-batch/hook-lint.mjs <batch-file.json>` exits **0** (zero ERRORS). WARNINGS (context-dependent words) do not block, but each must be listed in the milestone report's open-questions for the user.
8. **Cross-module quiz-answer consistency check (new, see §5):** for every Hausa word/phrase reused across quiz-answer-matching fields within the batch, grep the batch file for every instance and confirm identical spelling everywhere it appears. Report the words checked in the milestone report, not just "lint passed."

### Orthography house standard (rulings by the user, fluent Hausa speaker — carried forward from the P2 workstream)
- `ƙwai` (not `kwai`) — "egg."
- `ɓera` (not `bera`) — "rat/mouse."
- `kara` (unhooked) is correct for plant "stem/stalk"; `ƙara` ("to add/increase") is a genuine different-meaning homonym — context-dependent, stays a linter WARNING.
- `kaɗan` (hooked, always) — "little/a bit." Never `kadan`. (Ruled 2026-07-04 after the P2 Maths defect; especially relevant here since P3–P6 Maths will use comparative-quantity vocabulary heavily.)
- The linter's ERROR list is the canonical source of truth for unambiguous hooked-letter corrections. Add a word only when the hooked form is correct in *all* contexts, and only on the user's ruling (or TIMSAN's, if the user escalates).

Then it is handed to the user's Hausa validation gate (Gates 3–4). Only after that is it *shippable*.

### Integration mechanics (keep diffs reviewable)
- Author each batch as a standalone file first, e.g. `tools/p3-batch/p3-maths.json` (array of module objects), `tools/p4-batch/p4-maths.json`, etc.
- Merge with a small idempotent Node script that appends new ids into `content.json.modules` (dedupe by `id`), preserves formatting, then runs the validator. Do **not** hand-edit the 600KB+ `content.json` blind.
- Never touch git (the repo's git is currently unstable / hangs — leave version control to the human).

---

## 7. Milestone reporting protocol (Foreman → Architect)

The Foreman reports back to the Architect at each gate below. Use this exact format so the Architect can review fast:

```
MILESTONE: <M1..M6>
Batch: <e.g. MATH-P3-Pilot p3-maths-01..06>
Built by: <ChatGPT | Codex>
Validator: <paste `node app/tools/validate-content.mjs` output — pass/fail + counts>
Math formula check: <100-instance harness result>
Hook-lint result: <ERRORS/WARNINGS, and the open-question list for WARNINGS>
Cross-module terminology check: <which reused words were checked, and confirmation of consistent spelling>
Files changed: <list — must be content only>
Samples for spot-check: <2 full module objects, incl. textExplanationHa + quiz>
Open questions / risks for the Architect: <curriculum gaps, ambiguous Hausa, schema doubts>
```

Milestones:
- **M1** — MATH-P3-Pilot (6) build-complete + validator green + formula-safety harness green.
- **M2** — P3 Mathematics complete (24).
- **M3** — P4 Mathematics complete (24).
- **M4** — P5 Mathematics complete (24).
- **M5** — P6 Mathematics complete (24).
- **M6** — Full P3–P6 Mathematics band (96 modules, 238 total) merged, validator green, all four bands render in the learning path.

At each milestone the Architect reviews shape + Hausa spot-check, then either approves the next batch or sends corrections. **Do not scale past M1 until the Architect approves the pilot**, and **do not start P4 until P3 is fully merged and validator-green** (same discipline, applied per band instead of per subject).

---

## 8. Architect amendments — M1 pilot (approved to start)

Codex may author `p3-maths-01..06` now and stop. The following amendments are binding for the pilot merge:

1. **Merge target + write safety.** The only content bundle is `app/content.json` (the validator reads `../content.json` relative to `app/tools/` — do not create or write any other content.json). Before overwriting it the merge script must: (a) write a one-time backup `app/content.json.bak`; (b) parse the merged object and assert the module count goes **exactly 142 → 148** and JSON re-parses cleanly — otherwise abort **without writing**; (c) preserve 2-space indentation and the trailing newline to keep the diff minimal.
2. **Idempotency proof.** Running the merge script a second time must leave `app/content.json` byte-identical (dedupe by `id`). Demonstrate this in the M1 report (e.g. count stays 148, no diff on re-run).
3. **Audio ↔ micro-pause coherence.** Each module's two `microPauses[].questionHa` must be the same two questions embedded at `[PAUSE 1]` / `[PAUSE 2]` in that module's `audioScript`. `pauseAtMs` must fall within the plausible ~3-minute narration — mirror `p2-maths`'s `90000` / `150000` unless script length clearly justifies otherwise. Each `correctAnswer` must be one of its `options`.
4. **Quiz shape — mirror `p1-maths`/`p2-maths` exactly, do not improvise.** Fully parameterized, non-negative distractors, distinct from the answer across the full variable range.
5. **Same merge-count discipline applies at every subsequent milestone** (P3 complete: 148 → 166; P4: 166 → 190; P5: 190 → 214; P6: 214 → 238) — Foreman recomputes and asserts the exact expected count before each merge, not just "count increased."

Everything else in the P2 workstream's proven process (`docs/ARCHITECT-BRIEF-P2.md`) stands as the working template for this one.
