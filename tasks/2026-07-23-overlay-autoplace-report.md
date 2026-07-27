# AJAMIX-OVERLAY-AUTOPLACE-1 implementation report

## Opacity fix

Updated `tools/image-pipeline/overlay/compositor.mjs` so the label background rectangle in `labelSvg()` uses `fill-opacity="1"` instead of `fill-opacity="0.96"`. No other part of `labelSvg()` was changed.

## Auto-placement implementation

Added `tools/image-pipeline/overlay/auto-place-labels.mjs`, exporting `autoPlaceLabels(input)`.

The implementation:

- Always reserves the rounded upper 22% canvas band from per-object placement.
- Always places an optional title at `{ x: 40, y: 20, width: canvas.width - 80, height: 170 }`, using Latin mode and `max(font.size * 1.5, 40)`.
- Estimates each object-label box with the compositor validator's width and height formulas, plus 12px of breathing room in each dimension.
- Searches radii `50, 90, 130, 170, 210, 250, 300` in order and checks eight compass angles at each radius.
- Clamps candidates to a 10px canvas edge margin; rejects top-band overlap, earlier-label overlap with an 8px buffer, and callout/box collisions.
- Uses `sharp` to extract each candidate region from a canvas-sized raw image and samples every fourth pixel in each dimension. A candidate requires at least 92% of sampled pixels to have R, G, and B values all greater than 245.
- Adds perimeter-to-target callouts with arrows for placed object labels and returns IDs that cannot be placed in `unplaceable`.
- Builds a version 1.0 overlay record and calls the existing `validateRecord()` before returning, throwing if validation reports any error.

One implementation detail differs by a visually negligible amount from the literal perimeter wording: each callout starts 0.01px outside the calculated nearest perimeter point. The existing validator uses an inclusive bounding-box intersection test, so a line whose endpoint is exactly on the perimeter is rejected as crossing its own box. The sub-pixel offset preserves the intended visual perimeter anchor without changing the existing validator.

Additional callout-versus-box checks are performed during candidate selection because `validateRecord()` rejects callouts that collide with any label box. This prevents a later greedy placement from producing an invalid final record.

## Real test run

Ran only the two specified cases through `autoPlaceLabels()` and `compose()`. Both compositions completed without validation or rendering errors and produced 1536×1024 PNG files.

- Case A unplaceable: `["kayan-jamaa"]`
- Case B unplaceable: `["wurin-ruwa","cibiyar-lafiya"]`

Case B correctly leaves the two failed labels out of the overlay record rather than force-placing them into busy artwork. The title remains placed.

## Visual-review outputs

- `tools/image-pipeline/output/overlay-test/auto-place-case-a.png`
- `tools/image-pipeline/output/overlay-test/auto-place-case-b.png`
