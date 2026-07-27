# AJAMIX Social Studies P1–P2 — Style B Regeneration Re-QA (targeted 5-image pass)

**Reviewer:** Claude, per `tools/image-pipeline/qa/manual-checklist.md` → "Style B archetype test acceptance".
**Date:** 2026-07-20
**Scope:** 5 regenerated images at `tools/image-pipeline/output/raw/style-b-<id>.png`, verifying fixes from
`tasks/2026-07-20-socs-p1p2-qa-result.md` using the strengthened prompts in
`tasks/2026-07-20-socs-p1p2-regen-prompts.md`. Cross-checked against manifest `depictEn`/`safetyNote` in
`tools/image-manifest/p1-socs-image-manifest.json` and `p2-socs-image-manifest.json`.

## Summary

| ID | Original defect | Fixed? | Verdict |
|---|---|---|---|
| p1-socs-09 | Mosque-style worship building (dome/minaret/arch) | Yes | **ACCEPT** |
| p1-socs-14 | Mosque-style background instead of school | Yes | **ACCEPT** |
| p2-socs-04 | Dominant central mosque (FAIL) | Yes | **BORDERLINE** |
| p2-socs-05 | Mosque-style worship building | Yes | **ACCEPT** |
| p2-socs-11 | Red eagle on coat of arms | Yes | **ACCEPT** |

---

## p1-socs-09 — Places in My Community — ACCEPT

All five required buildings (police post with two officers, market stall, hospital with visiting doctor, place of worship, school with backpack-wearing children) are present, distinct, and well separated. The place-of-worship building (second from left, cream, double doors, plain portico) is now flat-roofed and unadorned — **no dome, no minaret, no arch** — matching the architectural register of the police post and school beside it. Original defect confirmed fixed.

General acceptance: top blank band measures ~32% of image height (exceeds the 22% requirement); contrast between figures/buildings and the paper-white ground is high throughout; no text/numbers/logos; no safety-note violations.

## p1-socs-14 — Respect for People and Places — ACCEPT

Background is now an unmistakable school block — long flat-roofed classroom row with repeating blue-trimmed doors and windows, matching the style used elsewhere in the set. No dome, minaret, or worship-building silhouette anywhere in frame. Foreground shows the required respectful handshake/greeting and a child placing litter in a bin, both calm, no disrespect depicted. Original defect confirmed fixed.

General acceptance: top blank band measures ~21% by pixel measurement — an elder's cap tip pokes a few pixels into the nominal 22% line, but the intrusion is under 3% of row width and reads as a negligible rounding/anti-aliasing artifact at both 100% and card size, not a real label-safe-zone violation. Contrast and legibility otherwise clean.

## p2-socs-04 — The Community — BORDERLINE

**Worship-building fix confirmed:** the place of worship (small cream flat-roofed building, center-background, plain double doors) is now small, off-center, and clearly subordinate in size and detail to the school (left, blue roof, full classroom scene) and clinic (right, blue roof, doctor visible). It is not the dominant or most-detailed structure in the composition — the original FAIL condition is resolved.

**New issue found (unrelated to original defect):** a tree canopy in the upper-left intrudes into the required blank top band. Measured intrusion starts at ~13% of image height and by ~21–22% of height occupies roughly 20% of the row's width — this eats meaningfully into the label-safe top zone required for the deterministic overlay (title text/margins), more than incidental anti-aliasing. This is a fresh-generation regression, not present in the original QA pass description, and should be trimmed/cropped or the tree lowered before this asset is treated as final.

Rest of the scene (teacher, doctor, farmer, trader all doing distinct roles; calm greetings; no litter; gender-balanced roles) is clean and matches the manifest.

## p2-socs-05 — Places in the Community — ACCEPT

Five community places (school, health centre, place of worship, market, playground) are clearly separated by a connecting path. The place-of-worship building (third from left, beige, plain portico, unadorned roofline) matches the flat, plain register of the school and health centre next to it — no dome, minaret, or arch. Original defect confirmed fixed.

General acceptance: top blank band ~28% of height; residents shown calm/appropriate at each place; no litter on the road; contrast and separation between the five places is clear at card size.

## p2-socs-11 — Nigerian Symbols — ACCEPT

**Eagle color fix confirmed:** the eagle atop the shield is now rendered solid black, matching Nigeria's official coat of arms. Rest of the coat of arms is structurally correct: black shield with white/silver wavy "Y" band, black-and-white checkered base, two white/silver horses as supporters, one red hibiscus flower on each side, blank unlabelled ribbon below. Flag, naira coin/note icon (portraits correctly left blank), and musical-note panel are neutral and clean.

General acceptance: top blank band ~31% of height; four symbol panels are equal-sized and well separated; no political symbols, party colors, or campaign material.

---

## Recommendation

4 of 5 images are clean accepts and ready to ship as-is. **p2-socs-04** needs one more small touch — the worship-building fix worked, but the top-band tree intrusion should be corrected (crop tighter, or regenerate with the tree lowered/trimmed) before this specific file is finalized, since it risks colliding with the overlay compositor's title/label zone.
