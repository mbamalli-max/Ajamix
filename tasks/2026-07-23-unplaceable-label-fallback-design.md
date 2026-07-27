# AJAMIX unplaceable-label fallback — design

## The real numbers this needs to solve

385/692 labels (55.6%) auto-place today. Of the 134 affected images, the shortfall is small for most:

| Unplaced labels in image | # of images |
|---|---|
| 1 | 59 |
| 2 | 32 |
| 3 | 15 |
| 4 | 9 |
| 5 | 12 |
| 6 | 6 |
| 7 (worst case, `p4-socs-02`) | 1 |

44% of affected images need just **one** more slot. The tail is short — only 7 images need room for 5+.

## Confirmed: variable output height is safe

Checked `app/styles.css` (`.lesson-image-card img { max-width: 100%; height: auto; }`) and the render
path in `app/app.js` (`renderLessonImageCard`) — no fixed aspect ratio, no fixed container height beyond
a `min-height: 10rem` fallback. A composited image can be taller than 1536×1024 without breaking layout.
This rules out the "uniform fixed footer on all 335 images" approach as unnecessary — a **variable-height
footer, sized to actual need per image**, is strictly better (no wasted chrome on the 201 images that
don't need one at all, and no cramped footer on the rare 7-label case).

## Design: two-tier fallback

**Tier 1 — retry as a small numbered pin, not a full text box.** The reason a label fails today is
almost always box *size* — a legible text box needs ~150–300px width; there's often no pocket that big
near the target point even when there's room for something much smaller. Before giving up, retry
placement with the same blank-space-detection logic (`nearWhiteFraction` ≥ 92%, same expanding-radius
search) but for a compact circular marker (~32px diameter, a number 1/2/3... inside it) instead of a text
box. A 32px pocket is far more findable than a 250px one — expect most of the current shortfall to
resolve at this tier.

**Tier 2 — bottom legend strip, appended only if any labels remain unresolved after Tier 1.** Extend the
canvas height below the existing 1024px by exactly enough rows to fit the remaining labels as
`"N. label text"` entries, wrapped into as many columns as fit (matching the top-band title's typography
so it reads as part of the same design system, not a bolted-on afterthought). Every Tier-1-placed pin
gets its number-to-text mapping listed here. Any label that fails even Tier 1 (expected to be rare — only
the most extreme dense-wheel images) is listed in the same legend *without* a pin/callout — an honest,
visible "here's what this refers to, we just couldn't point at it precisely" rather than being silently
dropped. This guarantees **zero labels are ever silently lost** — every one of the 693 ends up either
fully placed (today's 385), pin-placed (new), or legend-listed (new, worst case).

## Why not other approaches

- **Caption strip directly under each panel** (the original deferred idea): requires knowing panel
  boundaries per image, which nothing in the current pipeline detects — would need a whole separate
  panel-segmentation pass. The pin+legend approach needs no panel detection at all, just the same blank-
  space search already built and proven.
- **Semi-transparent chip allowed to overlap artwork**: rejected — breaks the standing design principle
  (confirmed across every QA pass this project) that overlay content never obscures the illustration.
  Pins still only place in genuinely blank pixels, same rule as today's text boxes, just a smaller target.
- **Fixed uniform footer on all 335 images**: rejected now that variable height is confirmed safe —
  strictly worse (wasted space or cramped space) than sizing to actual need.

## Open implementation questions (for whoever builds this)

1. Exact pin visual spec (fill color, number typography, contrast against varied backgrounds) — should
   match the existing callout-line/label-card visual language in `compositor.mjs`'s `labelSvg()`.
2. Legend layout: how many columns, row height, font size — needs to stay legible even at 7 entries
   (the `p4-socs-02` worst case) while not looking sparse at 1 entry (the 59-image common case).
3. Whether Tier 1 should be tried for *every* label first (simpler, one code path) or only as a fallback
   after Tier 2's normal text-box attempt fails (current behavior) — simpler is probably fine given pins
   are strictly easier to place than boxes, so trying pins first would never make placement worse.

## Status

Design only — not built. Consistent with today's other deferred item (title-overflow bug), this becomes
implementation work for a future session: extend `auto-place-labels.mjs` with the Tier 1 pin search and
Tier 2 legend-strip logic, then re-run `full-yield-check.mjs` to confirm 693/693 (or document the true
final residual after Tier 1) before the real compositing pass runs across all 335 images.
