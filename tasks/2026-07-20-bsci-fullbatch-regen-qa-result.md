# Basic Science P1–P6 Regeneration Re-QA Result
Date: 2026-07-21
Scope: 18 regenerated images (`tools/image-pipeline/output/raw/style-b-<id>.png`) that FAILed or were BORDERLINE in the 2026-07-20 full-batch QA, regenerated after the shared Style B prompt was permanently strengthened with an explicit no-religious-architecture constraint.

**Verdict counts: 18 ACCEPT / 0 BORDERLINE / 0 FAIL**

**The recurring mosque-architecture defect is now FULLY CLEARED across all 18 images.** Every previously-flagged dome, minaret, toron-spiked tower, crescent finial, and arched mosque window is gone; all background townscapes now show only plain flat-roofed / pitched-roof houses, compound walls, and trees. All three secondary defects (graphic digestive organs, missing "using body parts" framing, flood-like rain panel) and the stray-artifact case are also confirmed fixed.

## Summary Table

| ID | Module | Original defect | Verdict |
|---|---|---|---|
| p1-bsci-09 | Water – Sources and Uses | Rain panel looked like a flood | ACCEPT |
| p1-bsci-10 | Air – What is Air? | Djenné-style mud mosque in background | ACCEPT |
| p2-bsci-04 | Weather | Green-domed mosque in two panels | ACCEPT |
| p2-bsci-12 | Sources of Light | Large Djenné-style mosque behind child | ACCEPT |
| p3-bsci-02 | Parts of the Body | Lacked "child using body parts" framing | ACCEPT |
| p3-bsci-05 | The Water Cycle | Minaret w/ finial in townscape | ACCEPT |
| p3-bsci-12 | Light and Mirrors | Stray blue gibberish artifact in sky | ACCEPT |
| p4-bsci-05 | Everyday Sources of Energy | Mosque minaret in left background | ACCEPT |
| p4-bsci-07 | Push and Pull | Mosque dome behind the well | ACCEPT |
| p4-bsci-08 | Movement and Friction | Green-domed minaret in background | ACCEPT |
| p4-bsci-11 | Malaria Prevention | Dome-and-finial silhouette in night skyline | ACCEPT |
| p4-bsci-18 | Digestive System and Teeth | Vivid graphic organs (+ mosque) | ACCEPT |
| p5-bsci-03 | Human Skeleton, Joints | Great Mosque of Djenné in left background | ACCEPT |
| p5-bsci-10 | Heat and Temperature | Mosque minaret as the "hot day" subject | ACCEPT |
| p6-bsci-03 | Weather Symbols, Climate | Mosque as dominant landmark in all panels | ACCEPT |
| p6-bsci-04 | Forces and Friction | Domed turret + mud minaret in panel | ACCEPT |
| p6-bsci-10 | White Light, Primary Colours | Large mosque in left background | ACCEPT |
| p6-bsci-13 | Maintenance, Road Safety | Mosque skyline in road-safety panel | ACCEPT |

## Verification detail — secondary/special defects

- **p1-bsci-09 (rain/flood):** FIXED. Rain source now a light shower from a single cloud; no standing water, no puddle accumulation against the house. Covered blue storage tank present; only clean/clear water shown. SafetyNote satisfied.
- **p3-bsci-02 (diagram vs. active use):** FIXED. Now a naturalistic clothed child actively using each part — nose smelling a hibiscus flower, hand cupped to ear, eyes looking, mouth smiling, hands holding a book, legs standing/stepping. No pointer lines, callouts, or labels anywhere.
- **p3-bsci-12 (stray artifact):** FIXED. No blue glyph/gibberish mark in the sky. Lamp→mirror→eye ray path and long/short shadow poles render cleanly; no person looking toward the sun.
- **p4-bsci-18 (graphic organs):** FIXED. Digestive tract now rendered in muted, subdued tones — green large intestine, pale-blue small intestine, soft tan stomach, lavender esophagus — as a diagram overlay on a clothed child, with four tooth shapes beside. No vivid pink/red, no exposed-organ/cross-section framing.

## Notes
- **p4-bsci-18 minor observations (not defects, within ACCEPT):** (1) the organ overlay trends slightly more anatomically detailed than the manifest's "simple pastel outline shapes," though it fully complies with the muted-tone requirement that was the flagged defect; (2) the child reads lighter-skinned / non-local compared to the rest of the Northern-Nigerian set — a representation-consistency point worth watching, but outside the child-safety/defect scope of this pass.
- **p4-bsci-11:** the night-window shows a crescent MOON (a natural celestial object in a night sky), not a crescent finial on a building — this is appropriate scene content and not a religious-architecture instance. The prior dome-and-finial building silhouette is gone.
- **Top band / margins:** all 18 have a clear blank top band and side margins with no baked-in numerals, text, or icons. The weather-symbol key across the top of p6-bsci-03 is explicitly called for by its manifest (illustration content), not an overlay-conflicting artifact.
- **SafetyNotes:** all satisfied — fire adult-tended with child at distance (p4-bsci-05), no child pulling a heavy load / well bucket per depictEn (p4-bsci-07), no child on wet/slippery surface (p4-bsci-08), teacher (not child) holding thermometer (p5-bsci-10), pupil observing weather from indoors (p6-bsci-03), supervised/stationary pupil at crossing and away from workshop equipment (p6-bsci-13), no child looking at the sun (p2-bsci-12, p3-bsci-12).
- Contrast, anatomy, and style are consistent with the accepted batch; no caricature, watermark, or distorted-anatomy issues observed.
