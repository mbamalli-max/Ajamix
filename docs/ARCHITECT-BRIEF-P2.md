# AJAMIX — Architect Brief: P2 Content Build

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

## 3. Brief — current content state

| Band | Basic Science | Mathematics | Social Studies | Vocational | Total |
|------|:---:|:---:|:---:|:---:|:---:|
| nursery1 | – | 12 | – | – | 12 |
| nursery2 | – | 12 | – | – | 12 |
| **p1** | **15** | **24** | **15** | – | **54** |
| p2 → ss3 | *empty* | *empty* | *empty* | – | 0 |
| adult (vocational) | – | – | – | 10 (V01–V10) | 10 |

**88 modules total.** P1 is the deepest formal band. **P2 is the next gap and this workstream's target.**

## 4. Next step — the goal

Author **Primary 2 (P2)** formal content, mirroring P1's three subjects, into `app/content.json`, passing the validator and rendering in the learning path — as **draft Hausa pending the user (fluent Hausa speaker) / TIMSAN validation.**

Target counts (mirror P1): **Basic Science ×15, Mathematics ×24, Social Studies ×15 = 54 modules.**

Phased so quality is proven before scale:
- **P2-A — Pilot (6):** `p2-bsci-01..06`. Prove schema + validator + in-app render + the Hausa review loop end to end.
- **P2-B — Basic Science complete:** to `p2-bsci-15`.
- **P2-C — Mathematics:** `p2-maths-01..24` (quiz-formula heavy — highest correctness risk).
- **P2-D — Social Studies:** `p2-socs-01..15`.

Indicative NERDC P2 topic anchors (Foreman/Builder refine against NERDC BEC P2):
- **Kimiyya (Basic Science):** living/non-living, parts of a plant, domestic animals, weather, water uses, personal hygiene, food groups, the five senses (extending P1), safety at home.
- **Lissafi (Mathematics):** numbers to 100, place value (tens/units), addition & subtraction with regrouping, intro multiplication (2s/5s/10s), money (naira/kobo), length/weight, shapes, telling time.
- **Nazarin Zamantakewa (Social Studies):** the family, the community, occupations, markets, Nigerian symbols, cooperation, festivals, rules & leaders, our environment.

---

## 5. Schema contract (the hard part — match exactly)

Every P2 module is an object in `content.json.modules[]` with **exactly these keys**, modeled on `p2-bsci-01` ≈ existing `p1-bsci-01`:

```json
{
  "id": "p2-bsci-01",
  "gradeband": "p2",
  "subject": "Basic Science",
  "subjectHa": "Kimiyya",
  "moduleNumber": 1,
  "titleEn": "Living and Non-living Things",
  "titleHa": "Abubuwa Masu Rai da Marasa Rai",
  "titleAjami": null,
  "ajami_validated": false,
  "textExplanationHa": "<120–170 words of natural Hausa. Correct hooked letters ɓ ɗ ƙ. Second person, warm, concrete examples from a Northern Nigerian child's world.>",
  "textExplanationAjami": null,
  "audioScript": "[INTRO] ... [MAIN] ... [PAUSE 1] <question> ... [MAIN] ... [PAUSE 2] <question> ... [OUTRO] ...",
  "audioFile": "audio/p2-bsci-01.mp3",
  "imageCard": "images/p2-bsci-01.png",
  "microPauses": [
    { "pauseAtMs": 90000, "questionHa": "…", "correctAnswer": "…", "options": ["…","…","…"] },
    { "pauseAtMs": 150000, "questionHa": "…", "correctAnswer": "…", "options": ["…","…","…"] }
  ],
  "quizQuestions": [
    {
      "templateHa": "…",
      "answerFormula": "…",
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
- `subject` / `subjectHa`: `Basic Science`/`Kimiyya`, `Mathematics`/`Lissafi`, `Social Studies`/`Nazarin Zamantakewa`. Note: as of 2026-07-03 this is the corrected canonical value for **all** Social Studies modules (P1 and P2) — the earlier P1 baseline used `Karatun Al'umma` and the initial P2-D batch used `Zamantakewa`; both were retroactively updated to `Nazarin Zamantakewa` per the user's (fluent Hausa speaker) ruling. Do not reintroduce either retired term.
- `id`: `p2-<bsci|maths|socs>-NN`, zero-padded, sequential per subject. `moduleNumber` sequential per subject (1..N).
- **All Ajami fields (`titleAjami`, `textExplanationAjami`) = `null`. `ajami_validated` = `false`.** Do not invent Arabic script.
- `audioFile` / `imageCard`: placeholder paths only (files recorded later). Path must match the module id.
- `track`: `"formal"`, `targetAudience`: `"youth"`.
- **Formal modules are flat leaves:** `chainNext: null`, `isChainLeaf: true`, `gapTeaser: null`, `useTodayPrompt: null`. (Chaining/teasers are vocational-only. The validator *requires* `gapTeaser.ha`+`.ajami` only when `chainNext` is set — so leaving both null is valid.)
- **Exactly 2** `microPauses`; **exactly 5** `quizQuestions`.

**Quiz templates**
- **Non-numeric subjects (Science, Social Studies):** static Q&A. `variableRanges` all `{min:0,max:0}`, `answerFormula` is the literal Hausa answer string, `distractorFormulas` are 3 plausible wrong Hausa strings. (See `p1-bsci-01`.)
- **Mathematics:** real parameterized templates — `{a}`/`{b}` in `templateHa`, arithmetic `answerFormula` (e.g. `{a} + {b}`), `variableRanges` with sensible P2 bounds, `distractorFormulas` that stay **≥ 0** and distinct from the answer across the full range. Model on existing `p1-maths-*`.
- `microPauses` questions are always plain multiple-choice (no templating), `options` includes the `correctAnswer`.

---

## 6. Definition of Done (per batch)

A batch is **build-complete** (ready for human validation — *not* shippable) when:
1. Every module matches the schema contract above, key-for-key.
2. `node app/tools/validate-content.mjs` exits **0** after the batch is merged into `content.json`.
3. Math batches additionally: a formula-safety check passes — every quiz template generates a valid, non-negative, non-duplicate option set across **100 random instances** (TAS §8, rule 8). Foreman/Builder writes a throwaway harness using `app/quiz-engine.js` to prove this.
4. `content.json` stays valid JSON and only the `modules[]` array grew (no reordering/edits to existing modules, gradeBands, glossary, activities).
5. **Zero changes** to `app/app.js`, `app/quiz-engine.js`, `app/styles.css`, `app/index.html`, `app/sw.js`, or any engine file. This is content-only.
6. IDs unique; `moduleNumber` sequential per subject; no gaps.
7. **Hooked-letter lint gate (all batches):** `node tools/p2-batch/hook-lint.mjs <batch-file.json>` exits **0** (zero ERRORS). The linter recursively scans every string (prose, `audioScript`, micro-pauses, quizzes) for unhooked spellings of hook-standard Hausa words. WARNINGS (context-dependent words) do not block, but each must be listed in the milestone report's open-questions for the user. Manual review alone is insufficient — the M1 pilot proved a manual pass missed a systematic `rika→riƙa` defect. This gate is mandatory for P2-C (Maths) and P2-D (Social Studies).

### Orthography house standard (rulings by the user, fluent Hausa speaker)
- `ƙwai` (not `kwai`) is the house standard for "egg" — ruled 2026-07-03.
- `ɓera` (not `bera`) is the house standard for "rat/mouse" — ruled 2026-07-03; promoted to linter ERROR list.
- `kara` (unhooked) is confirmed correct for plant "stem/stalk" — ruled 2026-07-03; stays a linter WARNING since `ƙara` ("to add/increase") is a genuine different-meaning homonym in other contexts.
- The linter's ERROR list is the canonical source of truth for unambiguous hooked-letter corrections. Add a word only when the hooked form is correct in *all* contexts, and only on the user's ruling (or TIMSAN's, if the user escalates).

Then it is handed to the user's Hausa validation gate (Gates 3–4). Only after that is it *shippable*.

### Integration mechanics (keep diffs reviewable)
- Author each batch as a standalone file first, e.g. `tools/p2-batch/p2-bsci.json` (array of module objects).
- Merge with a small idempotent Node script that appends new ids into `content.json.modules` (dedupe by `id`), preserves formatting, then runs the validator. Do **not** hand-edit the 580KB `content.json` blind.
- Never touch git (the repo's git is currently unstable / hangs — leave version control to the human).

---

## 7. Milestone reporting protocol (Foreman → Architect)

The Foreman reports back to the Architect at each gate below. Use this exact format so the Architect can review fast:

```
MILESTONE: <M1..M5>
Batch: <e.g. P2-A pilot p2-bsci-01..06>
Built by: <ChatGPT | Codex>
Validator: <paste `node app/tools/validate-content.mjs` output — pass/fail + counts>
Math formula check (if applicable): <100-instance harness result>
Files changed: <list — must be content only>
Samples for spot-check: <2 full module objects, incl. textExplanationHa + quiz>
Open questions / risks for the Architect: <curriculum gaps, ambiguous Hausa, schema doubts>
```

Milestones:
- **M1** — P2-A pilot (6 Science) build-complete + validator green.
- **M2** — Basic Science complete (15).
- **M3** — Mathematics complete (24) + formula-safety harness green.
- **M4** — Social Studies complete (15).
- **M5** — Full P2 band (54) merged, validator green, P2 renders in the learning path.

At each milestone the Architect reviews shape + Hausa spot-check, then either approves the next batch or sends corrections. **Do not scale past M1 until the Architect approves the pilot.**

---

## 8. Architect amendments — M1 pilot (approved to start)

The Foreman's pilot plan is approved. Codex may author `p2-bsci-01..06` now and stop. The following amendments are binding for the pilot merge:

1. **Merge target + write safety.** The only content bundle is `app/content.json` (the validator reads `../content.json` relative to `app/tools/` — do not create or write any other content.json). Before overwriting it the merge script must: (a) write a one-time backup `app/content.json.bak`; (b) parse the merged object and assert the module count goes **exactly 88 → 94** and JSON re-parses cleanly — otherwise abort **without writing**; (c) preserve 2-space indentation and the trailing newline to keep the diff minimal.
2. **Idempotency proof.** Running the merge script a second time must leave `app/content.json` byte-identical (dedupe by `id`). Demonstrate this in the M1 report (e.g. count stays 94, no diff on re-run).
3. **Audio ↔ micro-pause coherence.** Each module's two `microPauses[].questionHa` must be the same two questions embedded at `[PAUSE 1]` / `[PAUSE 2]` in that module's `audioScript`. `pauseAtMs` must fall within the plausible ~3-minute narration — mirror `p1-bsci`'s `90000` / `150000` unless script length clearly justifies otherwise. Each `correctAnswer` must be one of its `options`.
4. **Quiz shape — mirror `p1-bsci` exactly, do not improvise.** Static (Science) quizzes: `variableRanges` `{a,b}` both `{min:0,max:0}`, `answerFormula` = the literal Hausa answer string, three `distractorFormulas` = plausible wrong Hausa strings. Do **not** invent a new quiz schema and do **not** route string answers through numeric templating (the engine's math path whitelists digits/operators only).

Everything else in the Foreman's plan stands as written.
