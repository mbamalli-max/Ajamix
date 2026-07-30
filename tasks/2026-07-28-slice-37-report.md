# Slice 37 report — Harmattan 4.400 font qualification

Task: `2026-07-28-slice-37`

Status: **automated qualification complete — pending Claude's browser visual
pass; no production activation**

## Scope and safety baseline

- Normative source read: `HAUSA_AJAMI_ORTHOGRAPHY_STANDARD.md`.
- Prior Noto coverage failure read: `tasks/2026-07-28-slice-36-report.md`.
- Input package: the already-staged, official SIL Harmattan 4.400 webfonts under
  `tools/ajami-pipeline/fonts/harmattan-4.400/`.
- The staged font directory is treated as read-only. No font is renamed,
  modified, subset, stripped, TypeTuner-processed, or copied into `app/`.
- Production paths (`app/`, `docs/`, and `ajamix-polished/`) are read-only for
  this slice. Harmattan is not wired into the application and Ajami mode is not
  reactivated.
- No mapping or stored content is changed, no code-point substitution is used,
  and nothing is promoted to `approved`.
- The repository already contained untracked earlier-slice artifacts and the
  staged Harmattan package when work began. They are preserved.

## 1. Independent coverage, integrity, and metadata

Complete. The independent check agrees with Claude's pre-staging fontTools
result.

### Method

Coverage was re-derived with the dependency-free WOFF2 directory/Brotli/cmap
format 4/12/13 parser in `font-probe.mjs`, not with fontTools. This parses the
actual staged WOFF2 bytes and requires every target to map to a nonzero nominal
glyph ID. The inventory was:

- 15 qualification targets: `U+0751 U+0637 U+062B U+06A9 U+08BC U+08BB
  U+069F U+08BD U+06CC U+063F U+062D U+0647 U+0763 U+08C3 U+08C4`.
- 16 marks/carriers: the 15 §7 entries `U+064E U+0650 U+064F U+065C U+0652
  U+0651 U+0670 U+0654 U+0655 U+0627 U+0623 U+0625 U+0648 U+0649 U+06CC`
  plus the provisional initial-short-`e` carrier `U+0639`.

Result: **31/31 present in each weight; 124/124 across all four weights; zero
glyph-ID-0 cmap mappings.** This agrees with Claude. There is no contested
coverage premise.

`SHA256SUMS.txt` contains the four WOFF2 checksums. Every recomputed checksum
matched:

| Exact file tested | SHA-256 | Bytes | Internal family / style | name ID 5 |
|---|---|---:|---|---|
| `Harmattan-Regular.woff2` | `01ddeda058fb4b1466a8886bdd0517e5ba713e58bf3b9a1ed8253eb12dcde2bc` | 170,559 | Harmattan / Regular | Version 4.400 |
| `Harmattan-Medium.woff2` | `e85c980b964c521782a5a968cabd2f65a66fe11843c3541464b3255209f25d8a` | 179,435 | Harmattan Medium / Regular; typographic Harmattan / Medium | Version 4.400 |
| `Harmattan-SemiBold.woff2` | `4707732231f538ba2d69b9114f0c62c685f69fcc8a666109ff52ae9ec7e65a90` | 176,951 | Harmattan SemiBold / Regular; typographic Harmattan / SemiBold | Version 4.400 |
| `Harmattan-Bold.woff2` | `c5fd1614ed77b8fad042681ce36946490a1af907ff01bb3cf2b0c5f408e44cfc` | 167,019 | Harmattan / Bold | Version 4.400 |

Relevant direct `head`/`OS/2` metadata:

| Weight | `head.fontRevision` | UPEM | `head` bounds x/y | `macStyle` | OS/2 version / weight / width | `fsType` | `fsSelection` |
|---|---:|---:|---|---:|---|---:|---:|
| Regular | 4.3999939 (fixed-point representation of 4.400) | 2048 | -1097…15691 / -1308…2133 | 0 | 4 / 400 / 5 | 0 | 192 |
| Medium | 4.3999939 | 2048 | -1110…15879 / -1313…2136 | 0 | 4 / 500 / 5 | 0 | 192 |
| SemiBold | 4.3999939 | 2048 | -1124…16066 / -1318…2138 | 0 | 4 / 600 / 5 | 0 | 192 |
| Bold | 4.3999939 | 2048 | -1141…16254 / -1323…2141 | 1 | 4 / 700 / 5 | 0 | 160 |

All weights have SIL vendor ID, 1,789 glyphs, `lowestRecPPEM=6`,
`sTypoAscender=2166`, `sTypoDescender=-1323`, `sTypoLineGap=0`,
`usWinAscent=2300`, `usWinDescent=1750`, `sxHeight=778`, and
`sCapHeight=1111`. Each has 17 tables, including the shaping-critical `GDEF`,
`GPOS`, and `GSUB`. `fsType=0` is consistent with installable embedding; the
OFL remains the governing licence.

## 2. HarfBuzz shaping, joining, and mark positioning

Complete for automated HarfBuzz qualification.

### Engine and evidence

- Actual shaping engine: **HarfBuzz 8.2.2**, bundled in the installed JDK 23
  `java.desktop` module. The tooling forces `sun.font.layout.ffm=true`; Java's
  RTL `Font.layoutGlyphVector()` reaches the exported `jdk_hb_shape` entry
  point. The JDK's own `legal/java.desktop/harfbuzz.md` identifies version
  8.2.2.
- Because Java does not load WOFF2 directly, fontTools 4.60.2 was used only to
  reconstruct a temporary, unflavored, full SFNT from each WOFF2. This is
  container decompression, not subsetting or alteration: no table, glyph,
  feature, name, or code point was removed or changed, and the temporary files
  were deleted after the run.
- Every test records the literal input and full code-point sequence, output
  glyph IDs, nominal x/y advances supplied to HarfBuzz, shaped origins, deltas,
  x/y offsets, character clusters, glyph-ID-0 indices, and mark-anchor
  assertions in `data/font-qualification-report.json`.

### Matrix

Per weight:

- 15 targets × 27 realistic synthetic patterns = **405 tests**.
- All 25 non-empty provisional Ajami strings from
  `candidate-corpus.json` = **25 real-word tests**.
- Total = **430 tests per weight / 1,720 tests overall**.

The synthetic set includes the eight minimum required patterns plus kasra,
damma, standalone fatha, three shadda+vowel stacks, dagger alif, every long
vowel, `ai`, `au`, three word-initial carrier probes, fatha+dagger stacking,
and adjacent marked syllables.

Result:

| Weight | Shaping tests | `.notdef` / GID 0 | Mark-anchor failures | Four-form joining |
|---|---:|---:|---:|---:|
| Regular | 430/430 pass | 0 | 0 | 15/15 |
| Medium | 430/430 pass | 0 | 0 | 15/15 |
| SemiBold | 430/430 pass | 0 | 0 | 15/15 |
| Bold | 430/430 pass | 0 | 0 | 15/15 |
| **Total** | **1,720/1,720** | **0** | **0** | **60/60** |

Every target produced distinct isolated/final/initial/medial glyph IDs. The
highest-risk Regular glyph IDs demonstrate the result directly:

| Character | Isolated | Final after `ب` | Initial before `ب` | Medial between `ب…ب` |
|---|---:|---:|---:|---:|
| `ࢻ U+08BB` | 811 | 812 | 814 | 813 |
| `ࢼ U+08BC` | 835 | 836 | 838 | 837 |
| `ࢽ U+08BD` | 1145 | 1146 | 1148 | 1147 |
| `ؿ U+063F` | 1270 | 1271 | 1273 | 1272 |
| `ࣃ U+08C3` | 763 | 764 | 766 | 765 |
| `ࣄ U+08C4` | 839 | 840 | 842 | 841 |

These contextual IDs were identical across the four static weight fonts;
outlines/metrics differ by weight.

### Mark positioning

There were **533 combining-mark assertions per weight / 2,132 total**. Each
mark had to produce a nonzero glyph ID with zero advance and a nonzero shaped
x or y offset within ±2 UPEM. HarfBuzz legitimately assigns some mark glyphs
to the grapheme base cluster and substitutes some shadda+vowel stacks into one
positioned mark glyph; the verifier follows those cluster semantics rather
than falsely requiring one output glyph per input mark.

Observed positioned-offset ranges (font units):

| Weight | x offset range | y offset range |
|---|---:|---:|
| Regular | -1125…1100 | -892…1129 |
| Medium | -1144…1103 | -965…1109 |
| SemiBold | -1164…1106 | -1056…1089 |
| Bold | -1183…1110 | -1148…1069 |

All fatha, kasra, damma, U+065C short-`e`, sukūn, shadda, shadda+vowel,
dagger-alif, long-vowel, diphthong, carrier, and adjacent/stacked-mark probes
passed in all four weights. In particular, real Bold—not synthetic bold—has
zero `.notdef` and zero anchor failures for the extended letters.

Realistic corpus inputs included `amfani` (`مࢻࢽ`), `cikin` (`ثِکِࢽ`),
`ɗan'uwa` (`طَࢽُوَ`), `ƙasa` (`ࢼَسَ`), `Lissafi` (`لِسسَࢻِ`), `tsawo`
(`ڟَوُ`), `ƴan` (`ؿَࢽ`), `'ya'ya` (`ؿَؿَ`), and `zaɓi` (`زَݑِ`), among all
25 non-empty candidates. These are font-run tests only; their spellings remain
candidate/provisional and were not approved.

## 3. Isolated visual qualification page

Complete as an artifact; human browser review remains deliberately pending.

`tools/ajami-pipeline/font-qualification.html` is self-contained and uses only
relative, local URLs. It defines the CSS family alias `"AJAMIX Harmattan"` over
the unmodified staged files; no internal font name changed. Every specimen has
three side-by-side columns:

1. the currently shipped Noto Naskh WOFF2;
2. stock Harmattan 4.400;
3. browser/system fallback.

Every row displays the literal sequence (spaces made visible as `␠`) and every
Unicode scalar as `U+XXXX`. Each row has Pass / Fail / Needs review controls
and the page shows a reviewed/failed count. It waits for the local font files
before declaring the page ready.

Coverage on the page includes:

- every Table A character, both native and Arabic-lexical `h`, and all three
  provisional cluster characters;
- every one of the 15 qualification targets in isolated, initial, medial, and
  final contexts;
- every short/combining mark, hamza mark, shadda+vowel stack, dagger-alif
  stack, every approved long-vowel sequence, `ai`, `au`, and carrier probes;
- 14 realistic candidate-corpus words, explicitly labelled candidate;
- Western and Arabic-Indic digits; percentages; periods, commas, colons,
  parentheses, quotation marks; Latin acronyms; Hausa+English; mathematical
  expressions; mixed-script answer choices; apostrophe-`y` source variants;
  and glottal-apostrophe candidates;
- an explicitly tagged `lang="ar" dir="rtl"` quoted Arabic span routed
  Noto-first inside a `lang="ha-Arab" dir="rtl"` Hausa specimen;
- Regular, Medium, SemiBold, real Bold, 18/24/42/64 px, 320 px mobile frames,
  and a 200% zoom frame.

Hausa rows use `lang="ha-Arab"` and `dir="rtl"`. Arabic spans use `lang="ar"`
and `dir="rtl"`. Latin and mathematical fragments are isolated LTR rather than
being folded into the Arabic shaping run.

## 4. Weight policy

Recommendation: **Regular 400 + SemiBold 600 + Bold 700; do not ship Medium
500.**

Read-only inspection of `app/styles.css` and the actual rendering call sites
found:

- Regular 400: `.ajami` body/copy, path and lesson titles implemented as
  paragraphs, caregiver titles, ordinary answer choices, and ordinary buttons.
- SemiBold 600: learner-facing labels/captions and chips such as
  `.onboarding-label`, `.ob-label`, `.ob-choice strong`, and
  `.caregiver-age-chip`. These can receive `ha()` output in Ajami mode, so
  treating 600 as 400 or 700 would not reproduce the actual interface weight.
- Bold 700: `.ajami-title`, Ajami inside native `h2`/`h3` headings,
  `.quiz-question-text.ajami`, `.ad-slot-title.ajami`, emphasis/`strong`, quiz
  feedback, and several learner action/button labels.
- Medium 500: **no `font-weight: 500` declaration was found** and no
  learner-facing need was identified.
- Weight 800 exists for Latin-brand/marker/glossary UI, but no Harmattan 800
  file is staged. It is not a reason to invent or synthesize an Ajami ExtraBold
  face in this slice; those uses require explicit future UI routing review.

WOFF2 payload impact:

| Weight | Bytes | Policy |
|---|---:|---|
| Regular | 170,559 | required |
| Medium | 179,435 | omit |
| SemiBold | 176,951 | required |
| Bold | 167,019 | required |
| **recommended total** | **514,529** | 400 + 600 + 700 |
| all four | 693,964 | not justified |

Omitting unused Medium saves 179,435 bytes (25.9% of the four-weight WOFF2
total). Shipping only Regular+Bold would be 337,578 bytes but would make the
actual 600 UI resolve to another weight, so that smaller policy is not
recommended. All three recommended real files passed the same full shaping and
mark-position matrix; no synthetic bold is relied upon.

## 5. Offline/loading architecture recommendation

Design only; nothing is wired into `app/`.

The recommended architecture is documented with inert snippets in
`tools/ajami-pipeline/harmattan-loading-architecture.example.md`:

- self-host the selected byte-for-byte WOFF2 files on the application origin;
- serve them as `font/woff2`; do not use a CDN, CORS dependency, or any
  post-install network request;
- put every required font in the service worker's **install-time precache**,
  and derive/bump the cache version from the qualified content hashes;
- run a build-time SHA-256 check and fail packaging if copied output differs;
- preload only the first-screen required weight (normally Regular);
- use `font-synthesis: none`;
- keep the language routing exact: Hausa Harmattan-first, Arabic/Qur'anic
  Noto-first.

To prevent a flash of tofu, use an **Ajami-specific loading state**. Add an
`ajami-font-pending` class before content render, call
`document.fonts.load()` with a critical string containing the extended Hausa
letters and marks, wait for `document.fonts.ready`, and reveal Hausa Ajami only
after the face resolves. If it fails, retain an accessible "font unavailable"
state instead of exposing fallback glyphs/tofu. This is preferred to blocking
the entire app because Boko/Latin navigation can become usable immediately
while every Hausa Ajami word is still guaranteed to appear as one coherent
Harmattan run.

## 6. Stock-font decision

**Automated decision: stock Harmattan 4.400 is acceptable as-is for the tested
Hausa Ajami shaping requirements.** It covers every required code point,
produces four distinct contextual forms for all 15 targets, shapes 1,720/1,720
tests without `.notdef`, and passes 2,132/2,132 mark-anchor assertions across
all four weights.

**TypeTuner is not necessary on current evidence.** No character/feature pair
failed and no regional-form mismatch was identified by the shaping engine.
Nothing was customized. Final qualification remains conditional on Claude's
browser visual pass; if that pass finds a specific regional variant problem,
the governing rule applies: document the exact character, exact OpenType
feature, both forms, and rationale, then stop before any customization.

## 7. Licence and attribution

The staged `OFL.txt` is SIL Open Font License 1.1. It permits bundling,
embedding, and redistribution of unmodified font software with the application
provided the copyright notice and licence accompany each copy. Harmattan and
SIL are Reserved Font Names. Because the selected files remain the original,
unmodified font software, retain the upstream filenames/internal names and the
Harmattan name; include `OFL.txt` plus the copyright/attribution in the
application's redistributable legal-notices surface/package. The CSS alias
`"AJAMIX Harmattan"` is only an application family alias and does not rename
the font binary.

## 8. Files added

Added by this slice:

- `tasks/2026-07-28-slice-37-report.md`
- `tools/ajami-pipeline/HarfBuzzProbe.java`
- `tools/ajami-pipeline/font-qualification.mjs`
- `tools/ajami-pipeline/font-qualification.test.mjs`
- `tools/ajami-pipeline/data/font-qualification-report.json`
- `tools/ajami-pipeline/font-qualification.html`
- `tools/ajami-pipeline/harmattan-loading-architecture.example.md`

Existing prototype files extended:

- `tools/ajami-pipeline/font-probe.mjs` — exports reusable direct WOFF2 coverage
  and untransformed-table readers; its existing Noto behavior is preserved.
- `tools/ajami-pipeline/test-suite.mjs` — imports the four new qualification
  tests so the exact directory acceptance command runs them.

The 7,061,476-byte JSON evidence file intentionally retains every per-test
input code-point sequence, glyph ID, advance, offset, and assertion instead of
reducing the qualification to aggregate pass counts.

## 9. Acceptance gates and production-integrity proof

All required gates passed:

- `node --test tools/ajami-pipeline/`
  - **40 passed, 0 failed** (the prior 36 plus 4 Stage 4A tests).
- `node app/tools/validate-content.mjs`
  - **OK — 389 modules pass**.
- `git diff --quiet -- app/ docs/ ajamix-polished/ && echo PRODUCTION_UNCHANGED`
  - output: **`PRODUCTION_UNCHANGED`**.
- `git diff --stat -- app/ docs/ ajamix-polished/`
  - **empty**.
- `git diff --name-only -- app/ docs/ ajamix-polished/`
  - **empty**.
- `shasum -a 256 -c SHA256SUMS.txt`, run from the staged font directory
  - all four WOFF2 files: **OK**.
- Visual-page static validation
  - inline JavaScript parses successfully;
  - all three local comparison font paths exist;
  - no HTTP(S) asset URL is present.

The first manifest invocation was made from the repository root, where the
manifest's relative filenames cannot resolve; it was rerun from the manifest's
own directory and all four files passed. The independent hashes in the
qualification JSON and §1 also match exactly.

Ordinary `git diff --stat` does not enumerate this repository's untracked
prototype tree. `git status --short --untracked-files=all` identifies the
Stage 4A additions under `tools/ajami-pipeline/` and this report; no production
path is modified. No git state-changing command was used.

No staged font file was modified (the post-run manifest check passes), and no
production converter, content, stored Ajami, validation flag, setting, service
worker, manifest, app font, or UI was changed.

## 10. Explicitly not verified

- Real Android hardware rendering.
- Browser pixel appearance, outline aesthetics, clipping/collision at actual
  device rasterization, fallback selection/tofu visibility, bidi display
  order, high-zoom behavior, and Chromium's WOFF2 shaping path. The page was
  statically validated, but the in-app browser was unavailable. Claude is the
  designated human browser/visual reviewer for this slice.
- Safari, Firefox, WebView, and other browser/OS combinations.
- Actual service-worker installation, cache upgrade, MIME headers, preload
  timing, offline cold start, or the Ajami loading state. Those are design-only
  here and intentionally not implemented in `app/`.
- Production performance/memory impact on low-end devices.
- Linguistic correctness of candidate-corpus word spellings, vowel length,
  carrier selection, cluster spelling, apostrophe handling, or stored Ajami.
  The real strings were used only as shaping inputs.

## Human approval gate

Open `tools/ajami-pipeline/font-qualification.html` in Chromium, wait for the
green local-font-ready banner, and complete the row controls. A human must
confirm Kano/Maghribi appearance, mark clearance, joining aesthetics, fallback
visibility, bidi order, narrow widths, bold, and high zoom. Only after Claude's
visual pass and Muhammad's approval may a later slice consider production
wiring. This report does not authorize font activation, Ajami reactivation,
converter replacement, content regeneration, or stored-content migration.

---

# Claude's independent verification (appended)

## Font acquisition — performed by Claude, outside the dispatch
Codex's sandbox has restricted network and could not fetch the font. Claude downloaded it from the
**official SIL URL** (not a mirror), verified it, and staged it before dispatch. Full record in
`tools/ajami-pipeline/fonts/harmattan-4.400/PROVENANCE.md`:
Harmattan **4.400**, released **2025-08-11**, package SHA-256
`94295e761dffc61166f95540801add61ecff5e19b580a74b58d702066910d228` (3,780,688 bytes), SIL OFL,
four weights as TTF + WOFF/WOFF2. Files staged verbatim — not renamed, subset, or TypeTuner-processed.

## Coverage — verified by Claude BEFORE dispatch (fontTools)
All **15/15** canonical consonant/cluster code points and **16/16** required marks/carriers present in
`Harmattan-Regular` (both TTF and WOFF2), and the six critical ones (`U+08BB`, `U+08BC`, `U+08BD`,
`U+08C3`, `U+08C4`, `U+063F`) present in **all four weights**. This is what makes Harmattan the correct
architectural answer: it covers exactly the five code points the shipped Noto build lacks.

## Shaping — INDEPENDENTLY RE-VERIFIED with a different engine binding
Codex shaped via JDK 23's bundled HarfBuzz 8.2.2 (1,720 tests, 0 `.notdef`, 0 mark-anchor failures,
60/60 joining). Because this is the load-bearing claim, Claude re-ran it through **`uharfbuzz` 0.51.7** —
a different binding — on `Harmattan-Regular.ttf`:

- **165 shaping tests · 0 `.notdef` failures · 0 dropped marks.**
- **All 15 target characters produce 4 distinct contextual glyph runs** across
  isolated/initial/final/medial — i.e. genuine joining behaviour, not invariant glyphs.

Two independent engines agree. The shaping claim holds.

*Claude process note*: a first attempt loaded the `.woff2` directly into HarfBuzz and returned 165/165
`.notdef` — including plain `beh`. Claude did **not** report that as a font defect: an all-fail result on a
control character is a tooling signal, not a finding. Cause was HarfBuzz not decompressing WOFF2 natively;
re-run against the TTF gave the correct result. (Same class of self-check as the earlier 0/12 and 0/15
false alarms — extreme results were treated as suspect and re-tested rather than reported.)

## Production integrity — VERIFIED
`git diff --stat` empty across all tracked files. `app/fonts/` (the existing Noto) untouched.
Harmattan is staged only under `tools/ajami-pipeline/fonts/` and is **not** wired into the app.
Ajami mode remains disabled, kill switch intact, no content or `ajami_validated` value changed.

## STILL OUTSTANDING — the browser/visual pass Claude owns
`tools/ajami-pipeline/font-qualification.html` was built for Claude to review in a browser. **That pass
has NOT been completed**: the in-app browser tool's safety classifier has been unavailable for the entire
session (multiple attempts, this slice and earlier). Consequently these Stage 4A acceptance criteria are
**not yet satisfied**:

- #5 "no canonical letter displays as tofu" — verified *analytically* (0 `.notdef` in two engines) but
  **not visually**
- #10 Chromium desktop pass — **not done**
- #11 Android/mobile pass — **not done**
- #12 offline loading pass — design-only, **not exercised**

Everything verifiable headlessly passes. Stage 4A should not be recorded as fully accepted until the
visual/browser criteria are met, either by Claude when the tool recovers or by Muhammad opening the page.

---

# Stage 4A closeout (per Muhammad's instruction, 2026-07-28)

```text
STAGE 4A ANALYTICAL QUALIFICATION: PASS
VISUAL QUALIFICATION: PENDING
CHROMIUM RUNTIME QUALIFICATION: PENDING
ANDROID QUALIFICATION: PENDING
OFFLINE APPLICATION QUALIFICATION: PENDING
```

## Corrected wording — contextual forms

**Correct statement:** All 15 target characters were exercised in isolated, initial, medial and final
shaping contexts. Each is classified by Unicode as **Dual_Joining**, and Harmattan produced contextual
glyph runs without `.notdef` failures.

**Superseded (do not use):** "All 15 characters have four correct visual forms." Claude's earlier phrasing
("4 distinct contextual glyph runs … genuine joining") risked implying visual correctness. It did not
establish that.

The analytical test proves: the font contains the characters · HarfBuzz recognizes their joining behaviour ·
contextual substitutions occur · combining marks are retained · no `.notdef` glyphs were emitted.

It does **not** prove: that each glyph visually matches the Kano convention · that dot/wagaf placement is
readable · that marks do not collide at real interface sizes · that Chromium renders identically to the
test shaping engine · that mobile rasterization is acceptable · that line-height and clipping are correct.

## TTF ↔ WOFF2 shaping-table equivalence gate

Shaping was tested on the **TTF**; browsers will load the **WOFF2**. Claude compared the decompressed
WOFF2 against the TTF per weight (fontTools, byte-comparison of compiled table data):

| Weight | TTF | WOFF2 | cmap | GSUB | GPOS | GDEF | Verdict |
|---|---|---|---|---|---|---|---|
| Regular | Harmattan-Regular.ttf | Harmattan-Regular.woff2 | SAME | SAME | SAME | SAME | **EQUIVALENT** |
| SemiBold | Harmattan-SemiBold.ttf | Harmattan-SemiBold.woff2 | SAME | SAME | SAME | SAME | **EQUIVALENT** |
| Bold | Harmattan-Bold.ttf | Harmattan-Bold.woff2 | SAME | SAME | SAME | SAME | **EQUIVALENT** |

Supporting tables `hhea`, `hmtx`, `maxp`, `name`, `OS/2`: **SAME** in all three weights.
Glyph order **identical**; `numGlyphs` = **1789** in both formats, all three weights.

`head` differs in all three weights — investigated rather than assumed benign. Exactly three fields differ:
- `checkSumAdjustment` — recomputed on repackaging
- `modified` — timestamp
- `flags` — differs by exactly **bit 11 (0x0800)**, the documented "font data is lossless as a result of
  optimizing transformation/compression" flag that WOFF2 sets

`unitsPerEm` and `indexToLocFormat` identical. None of the three differences is shaping-relevant.

> **TTF HarfBuzz results are analytically transferable to the corresponding WOFF2 browser fonts.**

## False-alarm record (retained as audit evidence, not as font evidence)

Claude's first independent shaping attempt loaded the compressed `.woff2` directly into `uharfbuzz`:
- the binding did not decompress WOFF2, so the face loaded empty;
- **even the plain Arabic control letter `ب` returned `.notdef`**;
- the all-fail result on a negative control correctly indicated an invalid test setup, not a font defect;
- the run was **discarded**;
- the test was re-run against the TTF, which succeeded.

**This first run counts as font evidence in neither direction.** It is retained only as evidence that
negative controls were interpreted correctly.

## PASSED

Official-source acquisition · version and licence provenance · package and per-file hashing · 15/15 target
character coverage · 16/16 required mark coverage · all four supplied weights covered · two independent
HarfBuzz-based shaping checks (JDK HarfBuzz 8.2.2; uharfbuzz 0.51.7) · zero `.notdef` in valid TTF tests ·
zero dropped required marks · contextual joining exercised across all four contexts · **TTF↔WOFF2
shaping-table equivalence** · stock Harmattan acceptable analytically · TypeTuner not currently justified ·
production runtime untouched · Ajami mode still disabled.

## PENDING

Human visual inspection · Chromium desktop rendering · narrow mobile layout · Android rendering · real CSS
line-height and clipping · actual WOFF2 browser shaping · font-loading state · service-worker caching ·
fully offline operation · bold and semibold visual quality · mixed Hausa–Arabic font switching.

## Visual qualification artifacts

- Page: `tools/ajami-pipeline/font-qualification.html`
- Checklist: `tools/ajami-pipeline/VISUAL-REVIEW-CHECKLIST.md` (25 rows, PASS/FAIL/UNCERTAIN, screenshots
  required for any FAIL/UNCERTAIN; priority rows 4, 5, 20)

**The qualification page is complete, but no browser screenshot or human visual sign-off was obtained
during this run.** The in-app browser tool's safety classifier was unavailable throughout. No claim of
Chromium or visual pass is made. Android remains a separate gate and must not be inferred from desktop
Chromium.

## Production integrity

`git diff --stat` empty across all tracked files. `app/fonts/` (Noto) untouched; Harmattan staged only
under `tools/ajami-pipeline/fonts/`; not wired into the app; Ajami mode disabled; kill switch intact; no
content, `ajami_validated` value, or linguistic fixture changed or promoted.
