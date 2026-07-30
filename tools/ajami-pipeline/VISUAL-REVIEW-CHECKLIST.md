# Stage 4A — visual review checklist (Harmattan 4.400)

**Artifact to review:** `tools/ajami-pipeline/font-qualification.html`
Open locally in a browser. Nothing is wired into the app; this page is isolated.

**Why this exists:** analytical qualification (coverage + HarfBuzz shaping) passed, but it proves only
that shaping *executes* — not that the result is *legible or stylistically right*. Only a human looking
at rendered text can close the items below.

Record `PASS` / `FAIL` / `UNCERTAIN` for every row. **Attach a screenshot for every FAIL or UNCERTAIN.**

| # | Category | Verdict | Notes / screenshot |
|---|---|---|---|
| 1 | No tofu, blank, or `.notdef` boxes anywhere | | |
| 2 | Correct joining (letters connect; no broken runs) | | |
| 3 | Three-dot and wagaf marks legible at reading size | | |
| 4 | `ݑ` `ࢻ` `ࢼ` `ࢽ` `ࣃ` `ࣄ` are **visually distinguishable from each other** | | |
| 5 | `ؿ` (ƴ) is readable and not confusable with plain `ی` | | |
| 6 | fatha / kasra / damma / short-`e` (U+065C) placement correct | | |
| 7 | sukūn and shadda placement correct | | |
| 8 | Stacked marks (e.g. shadda + vowel) do not collide | | |
| 9 | Baseline consistent across a whole word | | |
| 10 | No clipping above or below the line box | | |
| 11 | Regular weight acceptable | | |
| 12 | SemiBold weight acceptable | | |
| 13 | Bold weight acceptable | | |
| 14 | 12px legible | | |
| 15 | 16px legible | | |
| 16 | 20px legible | | |
| 17 | 28px legible | | |
| 18 | 40px legible | | |
| 19 | Narrow mobile width — wrapping correct, no overflow | | |
| 20 | Mixed Hausa Ajami + quoted Arabic — **correct font switch per span** | | |
| 21 | Western numerals render correctly in RTL context | | |
| 22 | Punctuation and parentheses positioned correctly (bidi) | | |
| 23 | High zoom acceptable | | |
| 24 | Light background acceptable | | |
| 25 | Dark background acceptable | | |

## Priority rows

Rows **4**, **5**, **20** carry the most risk:

- **Row 4** — `U+08BB` `U+08BC` `U+08BD` `U+08C3` `U+08C4` are the recently-added characters and the whole
  reason Noto was rejected. If learners cannot tell them apart at reading size, that is a pedagogical
  failure even though shaping "passed."
- **Row 5** — `ؿ` (U+063F) was chosen over `ۑ` (U+06D1) on Kano/Maghribi grounds; this is the first
  chance to see whether the chosen form actually reads well.
- **Row 20** — validates the two-font architecture (Harmattan for `lang="ha-Arab"`, Noto Naskh for
  `lang="ar"`). A wrong font on a span, or a word assembled from two fonts, fails this row.

## Scope limits

- Desktop Chromium review closes the **desktop visual** gate only.
- **Android is a separate gate** and must not be inferred from desktop Chromium.
- Offline / service-worker / font-loading behaviour is **not** covered here — that is integration-stage
  work and is currently design-only.

## Sign-off

```
Reviewer:
Date:
Browser + version:
OS:
Desktop visual gate:   PASS / FAIL
```
