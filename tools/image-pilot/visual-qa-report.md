# AJAMIX Educational Image Pilot — Visual QA Report

Date: 2026-07-11 EDT

## Scope and method

- Pilot only: 12 named modules; no bulk rendering and no P6 curriculum authoring.
- Rendering architecture: all 12 use Method C, deterministic SVG rendered to PNG. This was selected because every pilot asset contains critical Hausa text, scientific relationships, or exact mathematical marks that are safer to draw programmatically.
- Output: PNG, 1536 × 1024, 3:2 landscape. SVG sources are retained under `tools/image-pilot/svg/`.
- Rebuild: `NODE_PATH='/Users/muhammadbamalli/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules' node tools/image-pilot/render-pilot.mjs`
- Validate: `NODE_PATH='/Users/muhammadbamalli/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules' node tools/image-pilot/validate-pilot.mjs`

## Per-asset acceptance

| Module | Visual type | Result | Notes |
|---|---|---|---|
| p1-bsci-01 | illustration | Regenerated, accepted | Simplified the eye glyph so the face and highlighted eyes remain clear at mobile size. |
| p2-bsci-16 | labelled diagram | First render accepted | Water, air, sunlight, and soil are distinct; no plant damage or overwatering. |
| p3-bsci-12 | comparison panel | First render accepted | Lamp-to-mirror reflection path is separate from safe sunlight/shadow comparison. |
| p4-bsci-18 | labelled diagram | Regenerated, accepted | Repositioned `Bututun abinci` to prevent crowding; non-graphic food path remains correct. |
| p5-bsci-03 | labelled diagram | First render accepted | Simple non-graphic skeleton; shoulder, elbow, and knee associations are correct. |
| p5-bsci-11 | comparison panel | Regenerated, accepted | Moved `Batiri` and `Fitila` labels away from wires; closed loop is lit and open loop is unlit. |
| p1-maths-01 | number visual | First render accepted | Exactly ten counters paired with 1–10 in order. |
| p2-maths-08 | process sequence | First render accepted | 30 counters, four crossed out, 26 remaining; vertical arithmetic aligned. |
| p3-maths-12 | measurement diagram | First render accepted | Clock hands independently checked for 3:00, 3:30, and 3:15. |
| p4-maths-16 | table diagram | First render accepted | Ali 24, Binta 31, and independently recomputed difference 7. |
| p5-maths-13 | place-value diagram | First render accepted | 3.45 decomposes as 3 + 4/10 + 5/100; hundred grid has 45 shaded cells. |
| p6-maths-11 | comparison panel | First render accepted | 1/2 = 0.5 = 50%; 1/4 = 0.25 = 25%; 3/4 = 0.75 = 75%; grids match. |

## Manifest rulings and corrections

- `p1-maths-01`: removed misleading place-value/comparison instructions; counting only.
- `p2-maths-08`: replaced ambiguous “combined or remaining” wording with the exact remaining-group example 30 − 4 = 26.
- `p3-bsci-12`: selected a safe classroom lamp for the reflection panel; the sun is used only for shadow comparison.
- `p4-bsci-18`: replaced `Ciki` with the lesson-supported `Bututun abinci`; no new internal-organ term was invented.
- `p4-maths-16`: replaced generic chart alternatives with one exact table and comparison.
- `p6-maths-11`: replaced a generic review board with three exact equivalence panels.
- No unresolved curriculum or safety ruling was encountered.

## Automated and visual checks

- `validate-pilot.mjs`: PASS for 12/12 paths, labels, exact PNG metadata, and displayed mathematics.
- `app/tools/validate-content.mjs`: PASS at 294 modules.
- Manual contact-sheet inspection: 12/12 accepted after three targeted regenerations.
- Individual follow-up inspection: all three regenerated assets accepted; no clipped text, English leakage, watermark, branding, unsafe scene, or malformed object remains.
- Exact URL check: all 12 `app/images/<module-id>.png` URLs returned HTTP 200, `image/png`.
- Responsive harness using the real `.lesson-image-card` CSS: no horizontal overflow at 390 px or 1280 px; each card preserves 3:2 ratio (390×260 mobile, 900×600 desktop).
- Fresh-profile direct lesson URLs redirect to the existing progression-gated learning path. The gate was not bypassed or changed.
- Service worker unchanged. Its existing image request branch uses runtime cache-first caching in `ASSET_CACHE`; the 12 images were not added to shell precache.

## Scaling recommendation

Pilot rejection rate was 3/12 (25%), all caused by label/glyph legibility rather than scientific or mathematical errors. Do not render the remaining 218 as one batch. Scale by visual type, starting with exact programmatic math visuals and schematics, then labelled science diagrams, then contextual illustrations. Use six-to-twelve-asset QA slices, and do not advance a visual type until its slice passes at an acceptably low rejection rate.
