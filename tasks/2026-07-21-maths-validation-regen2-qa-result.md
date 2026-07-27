# AJAMIX Mathematics — targeted re-QA on 3 regenerated images

**Reviewer:** Claude (independent QA), 2026-07-21
**Scope:** `style-b-p1-maths-03.png`, `style-b-p2-maths-24.png`, `style-b-p6-maths-15.png` at
`tools/image-pipeline/output/raw/`, re-checked against the current manifest entries in
`tools/image-manifest/p{1,2,6}-maths-image-manifest.json` and the original defects logged in
`tasks/2026-07-21-maths-validation-batch-qa-result.md`.

## p1-maths-03 — Counting 21–30 — **BORDERLINE**

**Primary defect (exact-count requirement): RESOLVED.** The manifest was rewritten to describe "a
single continuous winding dirt pathway... a smooth, unbroken path rather than discrete countable
stepping-stones." The render matches this exactly — one continuous winding path crossing a stream,
no discrete stones, no exact-count question exists anymore. Confirmed at full-image and zoomed
inspection.

**Secondary defect (top 22% band): NOT resolved, still violated.** Measured programmatically: the
top-22%-height band is 6.5% painted, with first paint at 14.6% of image height. Zoomed crop of the
top band shows a full tree canopy intruding from the right edge and a smaller canopy tip left-of-
center — both clearly inside the nominal blank zone. This is smaller than the original defect (was
~8% painted, first paint at 11.9%) but is the same defect class, not fixed.

Additional note (not scored, informational): the manifest's "small connecting arrow" near the last
fifth of the path is not visible in the render — the path simply ends at a house. Not part of the
requested defects but worth flagging if the arrow is pedagogically load-bearing.

No numerals/digits/letters/text anywhere. No religious-architecture elements (roofs are flat or
gabled corrugated tin, no dome/minaret/spire). Contrast is good.

## p2-maths-24 — Telling Time: Hour and Half Hour — **ACCEPT**

**Primary defect (mismatched hour hands): RESOLVED.** Measured hour-hand angle by locating each
clock's true center from the outer ring bounding box and computing the angle of dark-navy hand
pixels in the 90°–160° arc: left clock hour hand ≈ 127.3°, right clock hour hand ≈ 126.5° — a
sub-1° difference, within rendering/antialiasing noise. Visually and quantitatively the two hour
hands are at the same position.

**Minute hands, as specified:** left clock's long hand clusters tightly at ~0° (straight up);
right clock's long hand clusters tightly at ~180° (straight down). This is the only difference
between the two clocks, matching the manifest exactly.

Bonus: neither hour hand sits exactly on a tick mark (both land near, but not on, the "4" position,
consistent with a half-hour reading) — the original secondary fault (hour hand sitting exactly on a
marker) is also gone.

No numerals anywhere on either face. No religious architecture in the village background (flat tin
roofs only). Good contrast, clean top band.

## p6-maths-15 — Introduction to Algebra — **ACCEPT**

**Primary defect (equal-looking pans implying box=0): RESOLVED.** The manifest now requires the
non-box side to hold a noticeably larger counter group, and the render delivers this unambiguously:
the left pan holds the blank box plus one small stick bundle; the right pan holds roughly five to six
stacked stick bundles — visibly larger and more numerous. The beam is shown level, which now reads
correctly as "the covered box's weight makes up the difference" rather than implying equality of the
visible counters.

Box remains blank (no "x" letter rendered) — correct per manifest, no text leakage. The blank
placeholder card is genuinely blank on close inspection.

No numerals/letters/text anywhere. No religious architecture. Top 22% band is fully clean (0%
painted). Good contrast between scale, plate, and background.

## Summary

| ID | Original defect | Resolved? | Verdict |
|---|---|---|---|
| p1-maths-03 | 12 stones vs required 10 (exact-count) | **Yes** — no longer a countable/discrete structure at all | Secondary (top band) still fails | **BORDERLINE** |
| p2-maths-24 | Hour hands mismatched (~7:00 vs ~10:30) | **Yes** — hands match within <1° | **ACCEPT** |
| p6-maths-15 | Equal-looking pans implying box=0 | **Yes** — right pan clearly larger | **ACCEPT** |

**Recommendation:** p2-maths-24 and p6-maths-15 are ready to ship as-is. p1-maths-03's core defect
(the one QA was specifically re-checking) is fixed, but the image still violates the top-margin
blank-zone rule via tree canopy bleed and should either be regenerated once more with the tree
pushed lower/removed, or explicitly accepted as a known-tolerated variance if the overlay compositor
can tolerate it (same open question flagged for other batches in this project).
