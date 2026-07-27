# Style B — 3-image pilot test — QA result

**Reviewer:** Claude, per `tools/image-pipeline/qa/manual-checklist.md` → "Style B archetype test acceptance"
**Date:** 2026-07-17
**Source:** 3 images generated manually via ChatGPT (not the API pipeline), using the prompts in `tasks/2026-07-17-styleB-chatgpt-prompts.md`, saved to `tools/image-pipeline/output/raw/`.
**Note:** the acceptance criteria below are style-bible criteria only. Cost/provenance/dry-run checks from the original API-pipeline plan don't apply since these were generated manually.

## Technical spec check (all 3)

| File | Dimensions | Alpha | Result |
|---|---|---|---|
| `style-b-p2-bsci-16.png` | 1536×1024 | none | PASS |
| `style-b-p4-bsci-18.png` | 1536×1024 | none | PASS |
| `style-b-p3-maths-02.png` | 1536×1024 | none | PASS |

## Deterministic-content-absence check (all 3)

No generated text, letters, numbers, watermark, branding, logo, URL, or signature found in any of the three images at full-size inspection. No labels, arrows, anatomy-relationship lines, or arithmetic baked into the art. **PASS on all 3** — exactly what the deterministic-overlay design requires.

## Per-image findings

### 1. `style-b-p2-bsci-16.png` (plant/water/air/sun/soil)

- **Contrast: PASS.** Girl, plant, watering can, and pot all clearly separate from background at both full size and estimated card size.
- **Consistency: PASS.** Bright paper-white negative space, clean high-contrast watercolor, selective indigo contours on clothing/pot, upper band unpainted.
- **Content accuracy:** the small round shapes on the root system read as root nodules — an accurate feature of bean/legume roots (nitrogen-fixing bacterial nodules), not a factual error. Confirmed via close crop.
- **Safety:** no leaf-pulling, no excessive water. Girl's posture is gentle/careful, matching the manifest's safety note.
- **Result: ACCEPT.**

### 2. `style-b-p4-bsci-18.png` (tooth diagram)

- **Contrast: PASS, but weaker than image 1.** The two tooth silhouettes are close in tone to the white background — legible with visible indigo outline contours at full size, but this is the thinnest safety margin of the three images against the QA checklist's own numeric threshold (30% luminance / 20% saturation difference). Worth a second human look before treating this as a fully solid pass.
- **Consistency: PASS**, with one prompt-adherence note: the prompt asked for a "non-graphic, simple clothed torso outline" — what was generated is a full character portrait (head, face, shoulders) rather than a torso-only outline. Not a safety or style problem (still fully non-graphic, no exposed anatomy), but a deviation from the literal brief worth flagging if exact torso-only framing matters for this archetype going forward.
- **Safety: PASS.** No exposed organs, no medical procedure, no illness content.
- **Result: ACCEPT, with the two notes above for future prompt refinement.**

### 3. `style-b-p3-maths-02.png` (arithmetic diagram background)

- **Central work area: PASS — the most important check for this image.** Fully blank white rectangle, ready for the deterministic `27 + 15 = 42` overlay. Zero baked-in numbers or marks.
- **Contrast: PASS.** Frame border and desk objects separate clearly from background.
- **Consistency: FAIL on one explicit spec point.** The prompt required the left/right margins to stay "completely unpainted: no wash, texture, line, icon, or incidental detail." Close inspection of both margin strips shows this was **not honored** — decorative desk objects (pencil cup, paint bowl, blue mat on the left; potted plant, stacked books on the right) extend well into what should be blank label-safe zones on both sides. The top 22% band, by contrast, is correctly blank.
- **Result: BORDERLINE — central work area (the part that matters most for the overlay) is clean, but the margin violation means this specific image doesn't fully match the Style B constraint as written. Usable as-is if margin encroachment isn't actually a problem for the app's card-rendering, or worth one regeneration attempt with a stronger explicit reminder about the margins if you want it corrected.**

## Overall Style B consistency across all 3

Bright paper-white space, high-contrast clean watercolor, selective indigo contours, and clean deterministic-overlay-ready central content are consistent across all three. No divergence that would itself trigger the documented B→C fallback rule. The one real defect (maths image margins) is a fixable prompt-adherence issue, not a style-direction failure.

## Recommendation

**Style B is working.** 2 of 3 images are clean accepts; the third has a real but narrow, easily-corrected margin issue rather than a style-quality problem. This does not meet the bar for triggering the "repeatedly fails contrast or consistency" fallback-to-C rule — recommend **accepting Style B as the production direction**, with an optional redo of the maths-image margins before or during the full 60-image Social Studies run.

**This decision is Muhammad's, not automatic**, per the documented fallback-decision-owner rule.
