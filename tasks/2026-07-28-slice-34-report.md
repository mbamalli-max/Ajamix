# Slice 34 — Stage 1 audit report (Hausa Boko→Ajami conversion initiative)

Written by Claude after independently verifying Codex's slice-34 findings against the actual source
(Codex's own detailed report could not be persisted — `--sandbox read-only` blocked the file write; only
a terse last-message summary survived, at `tasks/2026-07-28-slice-34-lastmsg.md`). Every claim below marked
**[VERIFIED]** was independently re-derived by Claude directly against source, not taken on Codex's word.

## 1. Content-field inventory

- `app/content.json`: **389 modules, 6 activities, 62 glossary entries.** [VERIFIED]
- `ajami_validated` field: present on **457 objects**; **10 `true`**, **447 `false`**. [VERIFIED — matches
  Claude's own pre-dispatch spot check exactly]
- Ajami text coverage, corrected from Claude's earlier imprecise spot-check:
  - **88 modules** have a populated `titleAjami`.
  - **305 objects** (recursively, anywhere in the content tree) contain at least one non-empty Ajami
    field.
  - **315 non-empty Ajami string fields** exist in total across the corpus.
  - These three numbers are compatible (some objects have more than one Ajami field, e.g. both
    `titleAjami` and `textExplanationAjami`) but are not the same measurement, and Claude's original
    "88 objects with Ajami" framing conflated them. Not independently re-run by Claude field-by-field;
    reported as Codex's finding, plausible given the schema shape, not re-verified line by line.

## 2. Interface/UI Hausa text

Not exhaustively re-audited by Claude. Known from this session's own work: the `ha()` helper wraps
UI-facing Hausa strings throughout `app/app.js`; whether every such string has an Ajami counterpart beyond
the live `romanToAjami()` fallback was not independently confirmed. **Not fully verified — flagged as an
open item for a future slice**, not a finding to act on yet.

## 3. `romanToAjami()` — the live engine, exact and verified

**Four copies exist**, not the single implementation Claude initially assumed: [VERIFIED — Claude found a
4th copy Codex's summary alone didn't spell out clearly]
1. `app/app.js` (~423-608) — **production**, live in the shipped app.
2. `app/tools/check-ajami-output.mjs` — a **checker/QA copy**, behaviorally diverged from production (see
   below).
3. `app/tools/author-vocational-modules.mjs` — the **authoring tool** used to generate the Vocational
   Skills (V01-V10) Ajami text. [VERIFIED by direct test: running this file's engine against V01's real
   `titleHa` reproduces V01's shipped `titleAjami` byte-for-byte]
4. `ajamix-polished/app.js` — a copy inside the legacy, gitignored `ajamix-polished/` snapshot directory.
   [VERIFIED to exist via grep; not further inspected — that directory is already known-legacy/dead]

**Confirmed behavioral drift between production and the checker** [VERIFIED by direct execution]: given
the loanword-passthrough input `"settings."`, production returns `"settings."` (punctuation preserved);
the checker returns `"settings"` (punctuation dropped). Same divergence on `"app,"` → production emits the
Arabic comma `،` after the loanword, the checker drops the comma entirely. **These two copies do not
implement the same rules and will disagree on real content.**

**`ƴ` (U+01B4) has no mapping anywhere in the engine** [VERIFIED by reading the `SINGLE`/`MULTI` tables
directly] — it falls through the final "unknown character: pass through unchanged" branch and is emitted
as a raw Latin `ƴ` inside otherwise-Ajami text. This is a real, live gap: any Boko string containing `ƴ`
(e.g. `ƴan'uwa`, `ƴaƴa`) currently renders with a stray Latin letter embedded in Ajami output.

**Full mapping table** (from `app/app.js`, the production copy — verified against source directly, not
relayed):

| Boko | Ajami | Codepoint | Note |
|---|---|---|---|
| b/t/j/h/d/r/z/s/f/k/l/m/n/w/y | ب ت ج ه د ر ز س ف ك ل م ن و ي | standard | |
| p | پ | U+067E | |
| g | غ | U+063A | ghain, explicitly **not** گ gaf |
| ɓ | ٻ | U+067B | |
| ɗ | ڈ | U+0688 | |
| ƙ | ڪ | U+06AA | swash kaf |
| ƴ | — | — | **no mapping, falls through unconverted** |
| sh | ش | U+0634 | |
| ts | ڟ | U+069F | tah with three dots below |
| ng | ڭ | U+06AD | |
| kh | خ | U+062E | |
| c (before i/e/y) | چ | U+0686 | ejective palatal |
| c (elsewhere) | ك | U+0643 | loanword-style /k/ |
| x | كس | — | /ks/ digraph |
| apostrophe (straight/curly) | ع | U+0639 | ain, glottal marker |
| a/i/u/e/o (short) | fatha/kasra/damma/kasra/damma | — | e treated as i, o treated as u |
| word-initial vowel | + alef carrier ا | U+0627 | |
| ai/ae | fatha + ya ي | | diphthong |
| au/ao | fatha + waw و | | diphthong |
| aa / ii / uu | + alef / ya / waw | | long vowel |
| doubled consonant | + shadda ّ | U+0651 | gemination, guarded against uppercase morpheme boundaries |
| ? / , / . | ؟ / ، / . | | Arabic question mark and comma; period unchanged |
| digits, `{placeholder}` | pass through | | |
| loanwords (settings, browser, progress, offline, online, audio, download, app, wifi, cache, reset, quiz) | pass through unchanged | | wifi → "WiFi" |

**The `c` disambiguation rule is a linguistic red flag, not yet resolved**: it treats bare Hausa `c` as
phonemically variable — چ (ejective palatal, the standard Hausa /tʃ/) before i/e/y, but ك (plain /k/,
framed in the code comment as "English loanword heuristic") elsewhere. **Standard Hausa orthography treats
`c` as consistently representing /tʃ/ regardless of the following vowel** (e.g. `ciki`, `kace`, `cikin`) —
this rule may be a genuine bug baked into the live engine, not a deliberate loanword accommodation. This is
listed as a question for Muhammad in §9, not resolved here.

## 4. Script-mode UI/UX — **live production bug found**

`state.settings.scriptMode` supports exactly two values, `"latin"` and `"ajami"` — no combined/both-scripts
mode exists anywhere in the code. [VERIFIED]

**Critical finding, independently confirmed by reading `loadSettings()` directly** (`app/app.js` ~7074-7107):

```js
async function loadSettings() {
  var records = await getAllRecords("settings");
  var nextSettings = Object.assign({}, DEFAULT_SETTINGS);
  records.forEach(function (record) { nextSettings[record.key] = record.value; });

  nextSettings.scriptMode = "latin";   // <-- unconditional override, ignores any saved value
  ...
  var storedScriptMode = records.find(function (r) { return r.key === "scriptMode"; });
  if (storedScriptMode && storedScriptMode.value !== "latin") {
    await putRecord("settings", { key: "scriptMode", value: "latin" });  // <-- writes "latin" BACK into IndexedDB
  }
}
```

**Every time the app loads settings — on every app start — `scriptMode` is force-reset to `"latin"`,
regardless of what the user actually saved, and if the stored value wasn't already `"latin"`, the function
actively overwrites it in the database.** The rest of the codebase is fully wired for a working toggle: the
onboarding flow can set `scriptMode: "ajami"` (line ~1761), the settings screen can save
`scriptMode: "ajami"` (line ~1862), and ~25 separate render call sites correctly branch on
`state.settings.scriptMode === "ajami"`. None of that matters, because `loadSettings()` clobbers the value
on every load.

**This means: as currently deployed, no user can actually reach or keep Ajami mode.** A user could select
it in settings, see it apply for the remainder of that session, and then have it silently reset to Latin
the next time they open the app — with their choice erased from storage, not just from the in-memory
session.

Given the branch name `feat/ajami-cache-fix` (tip commit: "fix(sw): bump cache version to v2 to force
fresh app.js; fix script toggle labels") is already merged into `main`'s ancestry, this override is very
plausibly a **deliberate kill-switch** added by an earlier session — most likely because the Ajami output
was known to be unreviewed/unreliable and someone chose to force everyone back to Latin without ripping out
the underlying feature. Claude cannot confirm intent from the code alone; this is a fact pattern, not a
verified motive. **This is now the single most important open question for Muhammad** (see §9) — the
answer changes whether this initiative is "finish and re-enable an existing feature" or "the kill-switch
must stay in place until the new pipeline is ready, and removing it is the literal go-live gate."

Downstream effects: search, downloads, offline caching, and the `.ajamix` export/share feature were not
independently re-audited by Claude for Ajami-awareness this pass — treat as unknown, not as confirmed
either way.

## 5. Fonts, RTL, rendering

- `app/fonts/NotoNaskhArabic-Regular.woff2` is the only Ajami-capable font shipped. [VERIFIED — file
  exists, referenced via `@font-face` in `app/styles.css`]
- Glyph coverage for the Hausa-specific extended-Arabic letters (ٻ, ڈ, ڪ, ڭ, ڟ, and whatever `ƴ`/`f`/`n`
  variants end up chosen) was **not verified** — no font-inspection tool was available in this pass. This
  matters concretely: if the shipped font lacks glyphs for any chosen letter, that letter will render as a
  ".notdef" box or fall back to a system font with a different visual style, regardless of how correct the
  underlying Unicode is.
- `direction: rtl` appears at 5 locations in `app/styles.css` (not enumerated line-by-line here — a
  follow-up slice should list them precisely if RTL layout work becomes necessary). Whether mixed
  Boko+Ajami+numeral strings get any bidi-specific handling (`dir="auto"`, bidi control characters) was
  not confirmed either way.

## 6. Existing tests and tooling

- `app/tools/check-ajami-output.mjs` exists as a standalone script; whether it runs in any CI/test harness
  or is invoked manually only was not confirmed.
- No dedicated automated test suite for `romanToAjami()` itself was found (no `*.test.mjs` referencing it).
- `tools/image-pipeline/ajami-spike/` and `tools/image-pipeline/poc/ajami-unvalidated-proof.png` exist —
  their exact purpose/date was not traced via git log in this pass. Filenames strongly suggest an even
  earlier, separate, explicitly-labeled-unvalidated experiment with Ajami typography in the image pipeline,
  which would make this a **fifth** loosely-related prior attempt at Ajami work in this repo's history, not
  yet reconciled with any of the other four. Flagged for a follow-up slice, not resolved here.
- `docs/PRD.md`, `docs/TAS.md`, `docs/ARCHITECT-BRIEF-P2.md`, `docs/ARCHITECT-BRIEF-MATH-P3-P6.md`,
  `docs/ARCHITECT-BRIEF-BSCI-P3-P6.md`, and `docs/TICKET-boot-error-english-leak.md` all reference
  `romanToAjami` in prose — these are historical planning documents, not additional code copies. Not
  read in full this pass.

## 7. Branch archaeology

All of the following are confirmed **ancestors of current `main`** — no unmerged Ajami-related work exists
on any branch [VERIFIED directly via `git merge-base --is-ancestor`, re-run by Claude independently of
Codex's claim, extended to two branches Codex's summary didn't explicitly list]:

`feat/ajami-cache-fix`, `feat/ajami-full-ui`, `feat/ajami-render-fixes`, `feat/ux-lockdown`,
`feat/settings-preview`, `feat/caregiver-mode`, `feat/p1-content`, `feat/grade-band-selector`.

Individual commit-by-commit summaries of what each branch contributed were not produced this pass (the
detailed report could not be persisted from the read-only dispatch; Claude prioritized verifying the
highest-stakes claims directly over re-deriving lower-stakes narrative detail). Known from branch tip
commit messages alone: `ajami-cache-fix` → "bump cache version to v2... fix script toggle labels";
`ajami-full-ui` → "full Hausa→Ajami UI transliteration across all screens"; `ux-lockdown` → "add
romanToAjami transliteration engine and brand home link"; `settings-preview` → "add live script preview
below Ajami/Hausa toggle".

## 8. What could not be determined

- Font glyph coverage for the Hausa-extended letters (no inspection tool available).
- Whether search/downloads/offline caching/`.ajamix` export are Ajami-aware.
- Full commit-by-commit content of each Ajami-related branch.
- Provenance of Ajami text in Nursery/P1/glossary entries predating the vocational authoring tool — cannot
  determine by inspection alone whether it was hand-reviewed, engine-generated, or something else.
- Whether `app/tools/check-ajami-output.mjs` runs anywhere automated or is purely manual.
- The purpose and currency of `tools/image-pipeline/ajami-spike/` and its "unvalidated proof" artifact.

## 9. Questions requiring Muhammad's linguistic and product judgment — not answered here

1. **The `scriptMode` force-to-latin override (§4) — is this a known, deliberate kill-switch, or an
   accidental regression?** This determines whether re-enabling Ajami mode is a near-term reversible step
   or must wait for the full reviewed pipeline.
2. **Three-way orthography conflict** on ɓ, ɗ, ƙ, ƴ, f, and contextual n between the live engine,
   `docs/ajami-alphabet-guide.md`, and the development fixtures Muhammad supplied (full comparison in
   `tasks/2026-07-28-ajami-dev-fixtures.md`, now corrected for two of Claude's own transcription errors).
   No form is currently authoritative for any of these six letters.
3. **The `c` disambiguation rule** (§3) — is treating bare Hausa `c` as phonemically variable
   (ejective palatal vs. plain /k/ depending on the following vowel) linguistically correct, or is standard
   Hausa `c` always /tʃ/ regardless of context, making the current rule a bug?
4. **`ƙ`'s Unicode home**: the live engine and `docs/ajami-alphabet-guide.md`'s own two internal tables
   disagree even amongst themselves (ق qaf vs ڪ swash kaf vs the fixtures' ࢼ) — three candidates for one
   letter.
5. **Should `ajamix-polished/app.js` and `tools/image-pipeline/ajami-spike/` be treated as dead history**
   (both live in already-legacy/unvalidated locations) or checked for anything worth recovering before this
   initiative proceeds?

## Acceptance gate

```
node app/tools/validate-content.mjs
validate-content: OK — 389 module(s) pass.
  track=vocational: 30
  track=formal:     359
  isChainLeaf:      362
  chainNext set:    27
```

## Scope confirmation

`git status --short` after this slice: only new files under `tasks/` (this report, the brief, the fixtures
file, and dispatch logs). No source file was modified. No git state-changing command was run.
