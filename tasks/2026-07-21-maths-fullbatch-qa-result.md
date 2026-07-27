# Mathematics P1–P6 Full-Batch Image QA Result

Scope: all 133 Mathematics images at `tools/image-pipeline/output/raw/style-b-<id>.png` excluding the 11 already-accepted images (p1-maths-01, p1-maths-03, p1-maths-17, p2-maths-24, p3-maths-01, p3-maths-02, p4-maths-09, p4-maths-17, p5-maths-22, p6-maths-15, p6-maths-24).

Date: 2026-07-21/22

## Summary counts

- ACCEPT: 128
- BORDERLINE: 4
- FAIL: 1
- Numerals leaked: 1 image (p5-maths-23)
- Religious architecture defect: none found (global fix from validation batch holds at scale)

## Summary table (all 133 images)

| ID | Verdict | Numerals leaked? | Note |
|---|---|---|---|
| p1-maths-02 | ACCEPT | No | Stepping stones, matches |
| p1-maths-04 | ACCEPT | No | |
| p1-maths-05 | ACCEPT | No | |
| p1-maths-06 | ACCEPT | No | |
| p1-maths-07 | ACCEPT | No | |
| p1-maths-08 | ACCEPT | No | |
| p1-maths-09 | ACCEPT | No | |
| p1-maths-10 | ACCEPT | No | Bundle count ~11-12 not exactly 10, acceptable per known-imprecision rule |
| p1-maths-11 | ACCEPT | No | |
| p1-maths-12 | ACCEPT | No | Calm child, no numerals on worksheet |
| p1-maths-13 | ACCEPT | No | |
| p1-maths-14 | ACCEPT | No | |
| p1-maths-15 | ACCEPT | No | |
| p1-maths-16 | ACCEPT | No | |
| p1-maths-18 | ACCEPT | No | Generic blank notes/coins |
| p1-maths-19 | ACCEPT | No | Tape marks are abstract, not legible digits |
| p1-maths-20 | ACCEPT | No | |
| p1-maths-21 | ACCEPT | No | |
| p1-maths-22 | ACCEPT | No | |
| p1-maths-23 | ACCEPT | No | |
| p1-maths-24 | ACCEPT | No | |
| p2-maths-01 | ACCEPT | No | Digit-shape outlines are abstract/dashed, not legible |
| p2-maths-02 | ACCEPT | No | Direction shown by character position rather than explicit arrow glyph — acceptable variance |
| p2-maths-03 | ACCEPT | No | |
| p2-maths-04 | ACCEPT | No | |
| p2-maths-05 | ACCEPT | No | |
| p2-maths-06 | ACCEPT | No | |
| p2-maths-07 | ACCEPT | No | |
| p2-maths-08 | ACCEPT | No | |
| p2-maths-09 | ACCEPT | No | |
| p2-maths-10 | ACCEPT | No | |
| p2-maths-11 | ACCEPT | No | |
| p2-maths-12 | ACCEPT | No | |
| p2-maths-13 | ACCEPT | No | |
| p2-maths-14 | BORDERLINE | No | See detail below |
| p2-maths-15 | ACCEPT | No | |
| p2-maths-16 | ACCEPT | No | |
| p2-maths-17 | ACCEPT | No | |
| p2-maths-18 | ACCEPT | No | |
| p2-maths-19 | ACCEPT | No | Notes more detailed/portrait-like than "schematic" implies but no numerals, not photorealistic |
| p2-maths-20 | ACCEPT | No | |
| p2-maths-21 | ACCEPT | No | |
| p2-maths-22 | ACCEPT | No | Child asking adult for help, safety note honored |
| p2-maths-23 | ACCEPT | No | |
| p3-maths-03 | ACCEPT | No | Note corners checked, clean |
| p3-maths-04 | ACCEPT | No | |
| p3-maths-05 | ACCEPT | No | |
| p3-maths-06 | ACCEPT | No | |
| p3-maths-07 | ACCEPT | No | |
| p3-maths-08 | ACCEPT | No | |
| p3-maths-09 | ACCEPT | No | |
| p3-maths-10 | ACCEPT | No | Note/coin corners checked, clean |
| p3-maths-11 | ACCEPT | No | Price tag checked, blank |
| p3-maths-12 | ACCEPT | No | |
| p3-maths-13 | ACCEPT | No | Ruler tick marks checked, no digits |
| p3-maths-14 | ACCEPT | No | |
| p3-maths-15 | ACCEPT | No | |
| p3-maths-16 | ACCEPT | No | |
| p3-maths-17 | ACCEPT | No | |
| p3-maths-18 | ACCEPT | No | |
| p3-maths-19 | ACCEPT | No | 2x2 grid reads reasonably as a two-row table despite no explicit tracing arrow |
| p3-maths-20 | ACCEPT | No | Gridlines rendered blank despite depict text mentioning "gridline numbers" — correct blank-structure behavior |
| p3-maths-21 | ACCEPT | No | Note corners checked, clean |
| p3-maths-22 | ACCEPT | No | |
| p3-maths-23 | ACCEPT | No | Note and ruler corners checked, clean |
| p3-maths-24 | ACCEPT | No | Operator glyphs present as artwork (acceptable) |
| p4-maths-01 | ACCEPT | No | |
| p4-maths-02 | ACCEPT | No | |
| p4-maths-03 | ACCEPT | No | |
| p4-maths-04 | ACCEPT | No | |
| p4-maths-05 | ACCEPT | No | |
| p4-maths-06 | ACCEPT | No | |
| p4-maths-07 | ACCEPT | No | |
| p4-maths-08 | ACCEPT | No | |
| p4-maths-10 | ACCEPT | No | |
| p4-maths-11 | ACCEPT | No | |
| p4-maths-12 | ACCEPT | No | |
| p4-maths-13 | ACCEPT | No | |
| p4-maths-14 | ACCEPT | No | |
| p4-maths-15 | ACCEPT | No | Protractor tick marks checked, no digits |
| p4-maths-16 | ACCEPT | No | Title "Littattafai" not actually rendered (blank), no issue either way |
| p4-maths-18 | ACCEPT | No | Digital-display placeholders blank |
| p4-maths-19 | ACCEPT | No | |
| p4-maths-20 | ACCEPT | No | |
| p4-maths-21 | ACCEPT | No | Ruler and clocks checked, no digits |
| p4-maths-22 | ACCEPT | No | |
| p4-maths-23 | ACCEPT | No | Uses block-stack panel instead of literal data table — reasonable variance |
| p4-maths-24 | ACCEPT | No | Operator glyphs acceptable |
| p5-maths-01 | ACCEPT | No | |
| p5-maths-02 | ACCEPT | No | |
| p5-maths-03 | ACCEPT | No | |
| p5-maths-04 | ACCEPT | No | |
| p5-maths-05 | ACCEPT | No | |
| p5-maths-06 | ACCEPT | No | |
| p5-maths-07 | ACCEPT | No | |
| p5-maths-08 | ACCEPT | No | |
| p5-maths-09 | ACCEPT | No | |
| p5-maths-10 | ACCEPT | No | |
| p5-maths-11 | ACCEPT | No | |
| p5-maths-12 | ACCEPT | No | |
| p5-maths-13 | ACCEPT | No | |
| p5-maths-14 | ACCEPT | No | |
| p5-maths-15 | ACCEPT | No | |
| p5-maths-16 | ACCEPT | No | |
| p5-maths-17 | ACCEPT | No | |
| p5-maths-18 | ACCEPT | No | Three panels' marked portions confirmed visually distinct on zoom |
| p5-maths-19 | ACCEPT | No | |
| p5-maths-20 | ACCEPT | No | |
| p5-maths-21 | ACCEPT | No | Protractor ticks checked, no digits |
| p5-maths-23 | **FAIL** | **Yes** | See detail below — legible "20" on currency note |
| p5-maths-24 | ACCEPT | No | Percent-sign symbol present as artwork (analogous to operator-glyph exception) |
| p6-maths-01 | BORDERLINE | No | See detail below |
| p6-maths-02 | ACCEPT | No | |
| p6-maths-03 | ACCEPT | No | |
| p6-maths-04 | BORDERLINE | No | See detail below |
| p6-maths-05 | ACCEPT | No | |
| p6-maths-06 | ACCEPT | No | |
| p6-maths-07 | ACCEPT | No | |
| p6-maths-08 | ACCEPT | No | |
| p6-maths-09 | ACCEPT | No | |
| p6-maths-10 | ACCEPT | No | |
| p6-maths-11 | ACCEPT | No | |
| p6-maths-12 | ACCEPT | No | Scale dial checked, no digits |
| p6-maths-13 | ACCEPT | No | |
| p6-maths-14 | BORDERLINE | No | See detail below |
| p6-maths-16 | ACCEPT | No | |
| p6-maths-17 | ACCEPT | No | |
| p6-maths-18 | ACCEPT | No | |
| p6-maths-19 | ACCEPT | No | |
| p6-maths-20 | ACCEPT | No | |
| p6-maths-21 | ACCEPT | No | |
| p6-maths-22 | ACCEPT | No | |
| p6-maths-23 | ACCEPT | No | |

## Detail sections (BORDERLINE / FAIL only)

### p5-maths-23 — FAIL (numeral leakage)
Module: Word Problems with Combined Operations (P5).
Manifest `depictEn`: market scene with books, blank price tags, a schematic naira note handed over, and blank two-step calculation placeholder boxes; explicitly "no numerals, equation symbols, or currency symbols rendered."
Defect: the side-panel naira note art has a legible **"20"** printed in the top-right and bottom-left corners (mirrored/rotated), rendered as part of the note's decorative engraving. Confirmed by 4-6x crop zoom — this is unambiguously a two-digit numeral, not an abstract pattern. This directly violates the "no numerals" instruction and the module's explicit currency-symbol restriction.
Recommendation: regenerate this image, or at minimum re-render/mask the side-panel note art. Also worth spot-checking the same note-template lineage used elsewhere in P5/P6 currency images for the same corner-glyph defect (none found in this pass, but only a sample of currency images were zoomed at this resolution).

### p2-maths-14 — BORDERLINE
Module: Skip Counting by 10 (P2).
Manifest `depictEn`: bundles of ten pencils being counted out, beside "a small panel showing blank stepping-stones with only the tens-place position visually emphasised across three consecutive stones."
Observed: the main scene (girl arranging ~10 bundles of pencils) matches well. The side panel, however, shows three identical eraser icons — not stepping-stones — with no visible tens-place emphasis device. This substitution doesn't clearly convey the "which place-value position changes" concept the module is teaching. No numeral leak, no safety issue; it's a pedagogical-clarity gap from manifest mismatch rather than a defect that would alarm a reviewer, so BORDERLINE rather than FAIL.

### p6-maths-01 — BORDERLINE
Module: Numbers up to 1,000,000 (P6).
Manifest `depictEn`: place-value chart "spanning from ones up to hundred-thousands" (6 columns), with comma dividers every three columns.
Observed: the chart has **10** columns (with 3 comma marks positioned to group them in clusters of 3), not 6. This is a significant scale mismatch versus the manifest's explicit column count, which could affect how a downstream digit-overlay is meant to fit the art. No numerals rendered, no safety concern — flagged for production/overlay-fit awareness rather than content harm.

### p6-maths-04 — BORDERLINE
Module: Multiplication Mastery (P6).
Manifest `depictEn`: a worked multiplication "split into two labelled-but-blank partial-product boxes that combine into one final blank result box, shown as a labelled split-diagram."
Observed: the image instead shows a single continuous 6-column place-value-style chart (with shrinking cube icons) plus one blank sticky note — it does not depict two separate partial-product boxes combining into a result. This doesn't teach the specific area-model/partial-products method the module describes. No numerals, no safety issue — flagged as a concept-mismatch worth a targeted regeneration if this specific method needs to be visually anchored.

### p6-maths-14 — BORDERLINE
Module: Proportion Word Problems (P6).
Manifest `depictEn`: a scaling table connecting sacks to mudu measures "with arrows showing the proportional doubling relationship between rows."
Observed: the sack-and-bucket rows with blank connecting boxes are present and match reasonably, but there are no arrows drawn between rows — the explicit "arrows showing the doubling relationship" element is missing entirely. No numerals, no safety issue — minor completeness gap versus manifest.

## Methodology notes
- All currency/money images were re-checked with 2-4x crop zooms at note corners and center after the p5-maths-23 numeral-leak finding, since that finding suggested a possible shared note-template risk. No further leaks were found in this pass (p1-maths-18, p2-maths-19, p3-maths-03/10/11/21/23 all checked clean).
- Ruler, tape-measure, protractor, and clock-face art was zoom-checked on every image where these appear as identified high-risk leak points (p1-maths-19, p3-maths-13/23, p4-maths-15/21, p5-maths-21, p6-maths-12) — all clean.
- No dome, minaret, crescent finial, arched mosque-style window, church spire, cross, or bell tower was observed in any of the 133 images. Village/market backdrops throughout use plain flat-roofed or gable-roofed houses and shops, consistent with the validation batch.
- Operator glyphs (+ − × ÷) and one percent-sign (%) appearing as static artwork were treated as acceptable per the established exception and not flagged as numeral-adjacent leaks.
- Discrete-object count imprecision (e.g., p1-maths-10's ~11-12-count "bundle of ten") was treated as acceptable per the known miscount failure mode, since it didn't misrepresent the underlying quantity relationship.
