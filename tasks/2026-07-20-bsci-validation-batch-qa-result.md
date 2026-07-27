# AJAMIX Basic Science Validation Batch — Style B Image QA Result

**Reviewer:** Claude, per `tools/image-pipeline/qa/manual-checklist.md` → "Style B archetype test acceptance", calibrated against `tasks/2026-07-20-socs-p1p2-qa-result.md`.
**Date:** 2026-07-20
**Scope:** 10-image validation batch preceding the full 101-image Basic Science run. Files at `tools/image-pipeline/output/raw/style-b-<id>.png`, reviewed against the matching P1/P2/P3/P5/P6 `*-bsci-image-manifest.json` entries (`depictEn` + `safetyNote`).
**Note:** Deliberate absence of baked-in Latin/Ajami text and diagram labels is correct per the deterministic-overlay design and is not treated as a defect anywhere below (except where *numerals* appear directly on a rendered object, which is a distinct rule — see `p6-bsci-12`).

## Summary

| ID | Title | Verdict | Safety bar (if applicable) |
|---|---|---|---|
| p1-bsci-01 | The Senses – Sight | ACCEPT | — |
| p1-bsci-14 | Energy – Light and Heat | ACCEPT | — |
| p2-bsci-01 | Living and Non-living Things | ACCEPT | — |
| p3-bsci-06 | States of Matter | ACCEPT | — |
| p3-bsci-13 | First Aid and Safety | ACCEPT | — |
| p5-bsci-15 | Harmful Substances and Drug-Awareness Safety | ACCEPT | — |
| **p6-bsci-06** | **Puberty, Hygiene, and Body Privacy** | **BORDERLINE** | **met: yes** |
| **p6-bsci-07** | **Human Reproduction, Growth, and Development** | **FAIL** | **met: NO** |
| p6-bsci-09 | Nigeria's Mineral Resources and Responsible Use | ACCEPT | — |
| p6-bsci-12 | Hand Tools: Identification, Care, and Safety | BORDERLINE | — |

**Verdict counts:** 7 ACCEPT, 2 BORDERLINE, 1 FAIL (of 10).

---

## Headline finding — `p6-bsci-07` (Human Reproduction) — safety bar NOT met

This is the most important finding in the batch and must not be softened. The manifest requires "a clinical, textbook-style **abstract schematic** diagram... flat, symbolic, diagrammatic linework only," with an explicit zero-tolerance safety note: "no realistic human bodies, no nudity, **no facial detail on any figure**, no sexual or intimate content of any kind... flat labeled-diagram shapes."

The generated image opens correctly (reproductive-organ outline, cell-division sequence, implantation diagram all read as acceptably flat/schematic). But the final two fetal-development panels break from that register entirely: they render **fully modeled, naturalistic, skin-toned nude fetus figures with clear facial detail** — closed eyes with visible lash lines, a modeled nose bridge, an ear, soft shading and highlights giving three-dimensional form rather than flat line-shapes. This is not a symbolic outline; it is a realistic illustrated baby, the exact thing the safety note names as zero-tolerance ("no facial detail on any figure," "flat labeled-diagram shapes" only). See crop evidence reviewed at 2x zoom on the two rightmost womb panels.

To be precise about what this is *not*: there is no sexual or intimate content, no adult human body, and no content that reads as pornographic. The failure is specifically against the "abstract/flat/no facial detail" register the manifest locks in for this exact reason — to keep a sensitive topic clinical and impersonal for a children's curriculum. A illustrator rendering a recognizable, individually-featured "baby's face" inside this diagram crosses a line the manifest drew intentionally and explicitly.

**Verdict: FAIL. Safety bar met: NO.** This image must be regenerated before the full 101-image run proceeds on this prompt template — and the fetal-development sub-panels specifically need a much stronger negative-prompt/style constraint (e.g. explicit instruction to render the fetus stages as flat, faceless, outline-only forms matching the cell-division panels' register, not modeled/shaded figures) before this pattern is trusted at scale. Given this is one of the two highest-scrutiny images in the entire Basic Science set, recommend a manual regeneration + re-review of this single image before touching the other 100, rather than waiting for a batch-wide postmortem.

---

## `p6-bsci-06` (Puberty, Hygiene, Body Privacy) — safety bar MET, but BORDERLINE on an unrelated issue

Checked specifically against zero tolerance for undressed/partially dressed figures or any normally-covered body part: **the safety bar is met.** Both the child and teen silhouette figures are fully and identically clothed with no body detail shown (solid-color silhouette treatment, no anatomical lines); the hygiene row (soap, folded clothes, wash basin) and the trusted-adult figure are all appropriate and fully clothed. No skin exposure, no undressing, no anatomical content anywhere in the frame.

**Safety bar met: yes.**

The BORDERLINE verdict is for a separate, lower-severity issue: the background of the right-hand vignette (child walking toward a trusted adult at a doorway) includes an unmistakable mosque silhouette — a blue dome and a minaret with finial — visible over the compound wall, and the doorway itself is a pointed horseshoe arch consistent with mosque architecture. Nothing in this manifest calls for any religious-building backdrop at all; it is a gratuitous architectural choice by the model. This is the same systemic tendency flagged repeatedly in `tasks/2026-07-20-socs-p1p2-qa-result.md` (P1/P2 Social Studies batch, 4 of 5 "place of worship" renders defaulted to mosque iconography, one rising to a full FAIL). Here it isn't even a "place of worship" prompt requirement — it's incidental background — but it confirms the same generation-model default is still active and worth a negative-prompt fix (no domes/minarets in incidental background architecture) before the full run, even though it doesn't affect this image's core safety requirement.

---

## `p6-bsci-07` — see Headline finding above.

---

## Other images (P1–P5, and `p6-bsci-09`)

**p1-bsci-01 — ACCEPT.** Matches manifest: child pointing at teacher/objects with eyes marked by a soft dashed circle (not touching), classroom setting, no direct-sun viewing. Contrast and top-band blank space both clean.

**p1-bsci-14 — ACCEPT.** Three-panel layout matches manifest: sun+solar panel/house panel, glowing lamp in dark room panel, and cooking-fire panel. The fire is tended only by a seated adult woman (no child present in that panel), contained in stones with visible heat waves — reads as competent adult cooking, not a hazard depiction, and no child is shown in harsh direct sun in the first panel. Safety note satisfied.

**p2-bsci-01 — ACCEPT.** Two clearly separated groups (living: goat, chicken, tree, potted plant; non-living: chair, board, bowl, gown, book, stone) with children observing from a clear distance, no hand on either animal. Contrast and separation clean.

**p3-bsci-06 — ACCEPT.** Three panels (solid stone, water poured into a glass, small steam wisp rising from a covered cup) with no open flame and no hand near the warm water/steam. Matches manifest and safety note precisely.

**p3-bsci-13 — ACCEPT.** Three-panel sequence: child raising a hand/waving to summon a distant adult, an adult (mother) pressing a clean white cloth to a child's arm with no wound visible, and an adult (father) holding a child's hand under running tap water beside a blank-face clock icon (no numerals). No blood, no visible injury detail anywhere — matches the safety note's "calm, competent care actions only" requirement exactly.

**p5-bsci-15 — ACCEPT.** Three-panel safety sequence: a firm "no" hand gesture, a child walking away down a path toward houses, and a child talking to a seated trusted adult. No substance, bottle, cigarette, or medicine appears anywhere in the frame.

**p6-bsci-09 — ACCEPT.** Sample tray shows all six required specimens (gold nugget, coal, iron ore, limestone, salt crystals, sealed oil jar) as static classroom display items, plus a separate recycling/land-restoration panel. No pupil touching, entering, tasting, or burning any sample — matches the manifest and safety note.

---

## `p6-bsci-12` (Hand Tools) — BORDERLINE

The core safety requirement is fully met: the pupil is shown only pointing at picture cards laid out below the workbench, not touching or holding any tool, and the saw and hand-plane rest untouched on the bench exactly as the manifest specifies ("recognition-only lesson").

The BORDERLINE call is a separate, narrower issue: the tape measure and wooden ruler on the bench carry clearly rendered numeral-like markings baked directly into the model's generated art (legible digits on the tape measure's extended blade; tick-mark numerals along the ruler). The Style B archetype checklist ("Style B archetype test acceptance," item: "Confirm generated art contains no numbers, equations, arrows, labels... those deterministic elements belong only to the compositor") explicitly reserves numeric content for the deterministic overlay layer, not the base generated image. Verified at 2x zoom crop — the numerals are unambiguous, not a rendering artifact. This is a template-adherence issue rather than a content-safety issue (a ruler/tape measure is not readable as instructional content the way a diagram label would be, and no child-safety concern attaches to it), but it is a real inconsistency worth fixing via prompt guidance (e.g., "render tool markings as plain unmarked ticks, no numerals") before scaling this prompt to the full run, since rulers/tape measures will likely recur in other Basic Science and Maths modules.

---

## Recommendation

Do not treat this validation batch as a clean green light for the full 101-image run as-is:

1. **`p6-bsci-07` (FAIL, safety bar not met)** — the single highest-priority item. Regenerate with a stronger flat/faceless/no-shading constraint specifically on the fetal-development sub-panels before proceeding to full-scale generation. This is exactly the kind of problem the validation batch exists to catch, and it did its job.
2. **`p6-bsci-06` (BORDERLINE, safety bar met)** — no urgent fix required for safety, but add a negative-prompt against incidental mosque/dome/minaret architecture in backgrounds, consistent with the same fix already recommended for the P1/P2 Social Studies batch.
3. **`p6-bsci-12` (BORDERLINE)** — add prompt guidance to keep measuring-tool markings unnumbered/plain, since numerals belong only to the deterministic overlay layer per the Style B rules.

Everything else (7 of 10) is a clean ACCEPT with no safety, contrast, or manifest-fidelity issues found.

**This is a finding, not a go/no-go decision** — per the documented fallback/decision-owner convention, whether to regenerate `p6-bsci-07` before proceeding to the full 101-image run is Muhammad's call, not automatic. Given the FAIL is on the single most sensitive image in the entire Basic Science set, strongly recommend not proceeding to full-scale generation on this prompt template until `p6-bsci-07` is fixed and re-reviewed.
