# AJAMIX Mathematics — Style B validation batch (10 images) QA result

**Reviewer:** Claude (independent QA), 2026-07-21
**Scope:** 10 files at `tools/image-pipeline/output/raw/style-b-<id>.png`, checked against
`tools/image-manifest/p{1..6}-maths-image-manifest.json` (`depictEn`, `labelsHa`, `safetyNote`) and the
locked prompts in `tasks/2026-07-21-maths-validation-batch-prompts.md`.
**Primary question:** does the blank-structure prompt strategy hold — i.e. does any artwork render a
numeral, digit, letter, word, equation, or legible text?

## Headline

**0 of 10 images leaked any numeral, digit, letter, word, or legible text.** The blank-structure strategy
works, including on the highest-risk archetypes (currency note faces, clock faces, place-value column
headers, bar-chart axes/gridlines, score cards). No gibberish/pseudo-text either — two decorative
embroidery/emboss motifs are noted below but are not glyph-like at card size.

One image renders **mathematical operator symbols** (`+ − × ÷`) — not numerals, but symbol-class
leakage that the Avoid list forbids and that the overlay contract should be re-checked against.

**Religious-architecture fix held: 0 of 10 images contain a dome, minaret, crescent finial,
mosque-style arched window/doorway, spire, cross, or bell tower.** The one arch in the batch
(`p6-maths-24`) is a stone road bridge, which is the explicitly requested subject.

## Summary table

| ID | Numerals leaked? | Reads as intended object? | Matches depictEn | safetyNote | Religious arch. | Top 22% band | Verdict |
|---|---|---|---|---|---|---|---|
| p1-maths-01 | **N** | Yes | Yes (10 counters, blank slots) | n/a clean | None | Clear (0% painted) | **ACCEPT** |
| p1-maths-03 | **N** | Yes | **No — 12 stones, spec says 10** | — | None | **Violated (paint from 11.9%)** | **FAIL** |
| p1-maths-17 | **N** | Yes | Yes (5 notes, blank faces, coins) | Met (schematic, not photoreal) | None | Clear (first paint 21.0%) | **ACCEPT** |
| p2-maths-24 | **N** | Yes | **No — hour hands differ (~7:00 vs ~10:30)** | — | None | Clear | **BORDERLINE** |
| p3-maths-01 | **N** | Yes | Yes (3 blank columns + millet groups) | — | None | Clear (first paint 20.3%) | **ACCEPT** |
| p4-maths-09 | **N** | Yes | Yes (1/2, 2/4, 3/6 shaded) | — | None | Clear (first paint 21.2%) | **ACCEPT** |
| p4-maths-17 | **N** | Yes | Yes (2 bars, bracket, blank gridlines) | — | None | Clear | **ACCEPT** |
| p5-maths-22 | **N** | Yes | Yes (3 blank cards → pile → bar) | — | None | Clear | **ACCEPT** |
| p6-maths-15 | **N** | Yes | Yes to the letter — **but the depicted equation is impossible** | — | None | Clear | **BORDERLINE** |
| p6-maths-24 | **N** (digits/letters) — **operator symbols `+ − × ÷` rendered** | Yes | Yes | — | None (arch = bridge) | Clear | **BORDERLINE** |

**Counts:** 6 ACCEPT · 3 BORDERLINE · 1 FAIL. **Numeral leakage: 0 / 10.**

Batch-wide observation (not scored per image, consistent with prior accepted batches): every image paints
into the left/right 6% label-safe margins (29–73% coverage). Prior Social Studies/Basic Science accepts
had the same property, so this is treated as an established house convention rather than a new defect —
but if the overlay compositor really needs clean side margins, that is a template-level issue affecting
the whole library, not just Mathematics.

---

## p1-maths-03 — Counting 21–30 — **FAIL**

Two independent defects.

1. **Object count wrong.** The manifest specifies "a number path of **ten** evenly spaced blank
   stepping-stones". The image renders **twelve** stones across the stream (counted at 2× zoom:
   stones at approx x = 240, 410, 520, 615, 700, 790, 880, 960, 1060, 1155, 1265, 1440). For a
   counting module this is the one property that must be exact — the whole point of the image is that a
   child counts the steps. The connecting arrow is correctly placed between the last two stones, so the
   model understood the structure and simply overshot the count.
2. **Top label-safe band violated.** The right-hand tree canopy begins at 11.9% of image height and the
   upper 22% band is ~8% painted overall, with the canopy occupying roughly the right third of those
   rows. This is the same defect class flagged on `p2-socs-04`, but larger.

Numeral leakage: none — the path is genuinely blank, which is the good news here.
Recommendation: regenerate with an explicit count constraint ("exactly ten stones, count them") and the
tree removed or lowered. **Systemic risk for the full 144:** exact-count fidelity is untested by the rest
of this batch and recurs across the P1/P2 counting entries. Worth adding a count-check step to QA.

## p2-maths-24 — Telling Time: Hour and Half Hour — **BORDERLINE**

Numeral-free and structurally excellent: both faces carry 12 plain blank tick markers, no numerals, no
pseudo-glyphs, and both read unmistakably as clocks.

The teaching content is wrong, though. The manifest requires "their hour hands **in the same position**"
so the pair isolates the minute hand as the only difference (hour vs half-hour of the same hour). The
image shows:

- Left clock: minute hand straight up, hour hand at ~7 → reads 7:00. Correct.
- Right clock: minute hand straight down, hour hand at ~10 → reads 10:30, not 7:30.

Two separate faults follow: the hour hands do not match, and the right clock's hour hand sits exactly on
a marker instead of midway between markers, which is itself a half-hour reading error children are
explicitly taught to avoid. Usable only if the module text never asks the child to compare the two hours;
otherwise regenerate with "both hour hands pointing between the same two markers".

## p6-maths-15 — Introduction to Algebra — **BORDERLINE (manifest defect, not model defect)**

The image is a faithful render of `depictEn`: blank white box + bundled counters on the left pan, a
matching bundled counter group on the right pan, beam perfectly level, blank placeholder card beneath.
No numerals, no letter `x` (the manifest says "a small blank box labelled x"; the model wisely left it
blank rather than rendering the letter — that is the desired behaviour).

The problem is the specification. Both bundles were measured at 2× zoom and are visually identical
(~15 sticks each, same width and height). With the beam level, the depicted equation is
`box + n = n`, i.e. the unknown equals zero — an arithmetically impossible or degenerate model for an
introduction to algebra. Also, the "solved value" placeholder card sits on the ground in front of the
stand rather than reading as an answer belonging to the model.

**This is a manifest wording bug, and the algebra archetype recurs in the full 144-image set.** Fix
`depictEn` before the big run: the right pan needs a *visibly larger* counter group than the left pan's
group (so box + small group = larger group), not a "matching" one.

## p6-maths-24 — P6 Revision / Bridge to JSS1 — **BORDERLINE (symbol leakage)**

Nine topic cards, all generic pictograms; verified at 2× zoom that **no digit, letter, or word appears
anywhere** — base-ten blocks, pie/bar fraction diagrams, balance scale, shapes, solids, an angle-marked
triangle, a bar chart, a pie chart, a dice (pips only), a money bag. Composition is clean, top band
clear, contrast strong.

The one issue: the "four operations" card renders four literal operator symbols — `+`, `−`, `×`, `÷`.
These are not numerals, letters or words, so the central numeral-leakage test is not failed. But the
locked Avoid text bans "symbols … equations", and the overlay compositor's contract assumes all symbolic
content is added downstream. Decide explicitly which way this goes before the 144 run, since a
"four operations" pictogram cannot really be drawn without them: either (a) accept operator glyphs as
legal pictogram content and say so in the template, or (b) rewrite `depictEn` to use non-symbolic
operation imagery (combining/removing groups of objects).

Also noted and cleared: the masonry **arch** is the stone road bridge that the entry asks for ("arranged
as a bridge pointing toward JSS1"). It is not a mosque-style arched doorway/window and carries no dome,
finial, or spire. Background buildings are flat-roofed and secular. Not a religious-architecture
violation.

---

## Minor notes on ACCEPTed images

- **p1-maths-01** — 10 counters, 10 blank placeholder ovals; placeholders sit *below* each counter rather
  than beside it (harmless variance). Cleanest top band in the batch (fully unpainted).
- **p1-maths-17** — highest-risk archetype for leakage and it is completely clean: note faces carry only
  guilloche border ornament and rosettes, zero digits, zero pseudo-text. Two cosmetic remarks: the notes
  stand upright in portrait orientation rather than lying flat (real naira notes are landscape), and the
  top coin has a faint illegible embossed swirl — decorative, not a glyph. `safetyNote` satisfied: clearly
  schematic, not a photoreal banknote reproduction.
- **p3-maths-01** — three blank columns with solid colour header bands, correctly empty for the
  `daruruwa / gommai / ɗaya-ɗaya` overlay labels; the three millet bowls of decreasing size carry the
  hundreds/tens/ones analogy without numerals. Reads unambiguously as a chart.
- **p4-maths-09** — shading is arithmetically correct across all three loaves (1/2, 2/4, 3/6), which is
  the property most likely to go wrong in this archetype.
- **p4-maths-17** — bars, bracket and dashed gridlines all blank; the chart still reads as a bar chart
  without any axis values.
- **p5-maths-22** — cards fully blank; arrows and the division arrow are rendered, which `depictEn`
  explicitly requests even though the shared Avoid list bans arrows (pre-existing template/manifest
  conflict, same as `p1-maths-03`). Two boys' kaftan pocket flaps carry a boxed strip of repeating
  embroidery marks that at extreme zoom could be mistaken for glyphs; at card size they read as trim.

## Recommendation

The blank-structure rewrite is **validated** — proceed to the 144-image run on that basis. Before it
starts, three fixes are worth making because each recurs across the set:

1. Fix the algebra archetype `depictEn` (matching-bundle bug, `p6-maths-15`) — affects every algebra entry.
2. Rule explicitly on operator glyphs (`p6-maths-24`) and align template Avoid text with it.
3. Add an exact-object-count check to QA and, where a count is pedagogically load-bearing, restate it
   emphatically in the prompt (`p1-maths-03` delivered 12 of 10).

Regenerate `p1-maths-03` (count + top band). Regenerate `p2-maths-24` if the module compares the two
hours. Resolve the template/manifest conflict where `depictEn` asks for arrows the Avoid list forbids.
