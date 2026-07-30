# Slice 35 report — Stage 3A/3B/3C core pipeline (written by Claude)

**Codex did not write this report.** Its run hit the 900s dispatch timeout mid-flight: the transcript
shows `turn.started` with **no `turn.completed`**, and neither `-report.md` nor `-lastmsg.md` was
produced — which is why postflight returned FAIL (missing report file). The only `error` event in the
transcript is benign (a skills-context-budget notice, not a failure).

**The work itself completed before the cutoff** and has been independently verified by Claude below. No
claim here rests on a Codex self-report, because none exists.

## Production integrity — VERIFIED CLEAN

- `git diff --stat -- app/ docs/ ajamix-polished/` → **empty**
- `git diff --stat` (all tracked files) → **empty**
- All four legacy `romanToAjami()` copies untouched; `scriptMode`, `loadSettings()`, `content.json`,
  `ajami_validated` values, service worker, onboarding, settings UI all unmodified.
- **Isolation confirmed**: `grep -rn "ajami-pipeline" app/ docs/ *.json *.mjs` → no hits. Nothing in
  production imports the prototype.
- Work is purely additive under `tools/ajami-pipeline/` (12 files).

## Stage 3A — canonical mapping — VERIFIED

- **53 glyph/code-point pairs checked mechanically by Claude: zero mismatches.** (This is the error class
  that has already bitten this project twice; the file declares code points as `\uXXXX` escapes, not
  pasted glyphs, as the brief required.)
- **12/12 conformance to the approved standard**: `B_GLOTTALIZED`→U+0751, `D_GLOTTALIZED`→U+0637,
  `C_HAUSA`→U+062B, `K_PLAIN`→U+06A9, `K_GLOTTALIZED`→U+08BC, `F_HAUSA`→U+08BB, `TS_HAUSA`→U+069F,
  `N_HAUSA`→U+08BD, `Y_PLAIN`→U+06CC, `HAUSA_GLOTTALIZED_Y`→**U+063F**.
- **`h` correctly split** into `H_NATIVE_HAUSA`→U+062D and `H_ARABIC_LEXICAL`→U+0647 — not one
  unconditional replacement.
- **`U+06D1` correctly absent** from the canonical set (present only as `noncanonicalVariants`).
- 42 tokens defined total; schema carries `orthography: warsh_kano_ajamix_v1`, per-entry `category`
  (A/B/C) and `sourceRefs` (`[R12A]`/`[N4959]`).

*Claude's own process note*: an initial conformance script reported 0/12 — that was **Claude's scripting
bug** (omitted the `codePoint` field name), not a defect in the data. Caught and corrected before being
reported as a finding.

## Stage 3C — apostrophe audit — the substantive result

Claude's preliminary counts were **independently reproduced exactly**: 3,082 total · 254 apostrophe-`y` ·
2,828 other. All four summary breakdowns sum to 3,082.

| Category | Occurrences |
|---|---:|
| `GLOTTAL_BOUNDARY` | 1,801 |
| `AMBIGUOUS` | 837 |
| `GLOTTALIZED_Y` | 254 |
| `PAIRED_QUOTATION` | 150 |
| `TYPOGRAPHIC_PUNCTUATION` | 37 |
| `MORPHEME_BOUNDARY` | 3 |

### CORRECTION to Claude's earlier finding

Claude previously reported that **paired typographic quotation dominates** the non-`y` apostrophes. **That
was wrong.** It was an artifact of sampling 232 *distinct word forms* (where quoted numerals like `'ɗaya'`
stood out) rather than counting *occurrences*. By occurrence, genuine glottal boundaries dominate
(1,801 vs 150).

Claude verified this independently rather than accepting the classifier's output: a direct regex scan of
live `content.json` found **1,709** vowel-apostrophe-vowel sequences (`sa'a`, `ma'ana` type) and **786**
`l`-apostrophe-vowel sequences (`al'umma`, `al'amari` — Arabic `al-` loans), i.e. ~2,495 glottal-type
patterns. This corroborates the classifier's 1,801 and refutes Claude's earlier characterization.

### Converter reachability — answers the question the precision correction demanded

This is what determines whether 2,828 is a *confirmed* or *potential* error count:

| Reachability | Occurrences |
|---|---:|
| `NO_CALL_PATH` | 2,021 |
| `AJAMI_BRANCH` (only if Ajami mode enabled) | 1,011 |
| `EAGER_LOCALIZED_PAIR` (runs regardless of scriptMode) | 41 |
| `STORED_AJAMI_BYPASS` | 9 |

- **Would the current engine alter it?** true: **1,052** · false: 2,030
- **Reachable in today's forced-Latin production?** true: **41** · false: 3,041
- **Reachable in a hypothetical Ajami session?** true: **1,052**

Claude independently confirmed the eager path is real: `app/app.js` lines **255**, **652**, and **775**
call `romanToAjami()` with **no `scriptMode` guard**, computing an Ajami value into a data structure
regardless of mode. Note the important nuance the audit models correctly: *reaching the converter* is not
the same as *being displayed* — `pickScript()` returns `pair.ha` in Latin mode, so those eager values are
computed then discarded for display.

**Corrected precision, replacing the earlier "up to 2,828" framing:**
- **2,828** = non-`y` apostrophes — the *potential* class (upper bound).
- **1,052** = would actually be altered by the engine *if Ajami mode were enabled*.
- **41** = pass through the converter in today's shipped forced-Latin state (computed, not displayed).

## Safety properties — VERIFIED

- **254 auto-resolved, and every one is `GLOTTALIZED_Y`** — the single settled rule. No other category
  auto-resolves.
- **Zero unresolved cases were assigned any Ajami character.**
- **Zero occurrences were assigned ain (U+0639)** anywhere — the classifier never silently applies the
  legacy blanket rule.
- **All 2,828 unresolved cases are present in the review queue** (`reviewQueue` length = 2,828).

## Tests

`node --test tools/ajami-pipeline/` re-run independently by Claude: **20 passed, 0 failed.**

## Files added (12, all under tools/ajami-pipeline/)

`mapping.mjs` · `mapping.test.mjs` · `tokenizer.mjs` · `tokenizer.test.mjs` ·
`apostrophe-classifier.mjs` · `apostrophe-classifier.test.mjs` · `audit-corpus.mjs` ·
`audit-corpus.test.mjs` · `test-suite.mjs` · `package.json` · `data/canonical-mapping.json` ·
`data/apostrophe-audit.json`

## Not delivered by this slice (deferred to 3D–3G, as scoped)

Lexicon schema/seed (3D) · candidate-corpus extractor (3E) · Unicode hygiene validator (3F) ·
font/rendering probe (3G). Tokenizer coverage statistics against the full corpus were also not produced —
the timeout cut the run before that step.

## Status

Prototype only. Nothing marked `approved`. Ajami mode still disabled, Latin kill switch intact, no
production change. Awaiting Muhammad's review before 3D–3G or Stage 4.
