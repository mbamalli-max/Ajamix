# AJAMIX Social Studies P1–P2 — Style B Image QA Result

**Reviewer:** Claude, per `tools/image-pipeline/qa/manual-checklist.md` → "Style B archetype test acceptance", calibrated against `tasks/2026-07-17-styleB-3image-qa-result.md` and `tasks/2026-07-17-SOCS-P3-P6-consolidated-review.md`.
**Date:** 2026-07-20
**Scope:** 30 newly generated Style B images, `p1-socs-01..15` and `p2-socs-01..15`, at `tools/image-pipeline/output/raw/style-b-<id>.png`. Reviewed against `tools/image-manifest/p1-socs-image-manifest.json` and `p2-socs-image-manifest.json`.
**Note:** Deliberate absence of baked-in numbers/labels/text is correct per the deterministic-overlay design and is not treated as a defect anywhere below.

## Summary

| Verdict | Count |
|---|---:|
| ACCEPT | 25 |
| BORDERLINE | 4 |
| FAIL | 1 |
| **Total** | **30** |

**Headline finding:** a recurring, systemic issue across this batch (not seen in the earlier P3–P6 review, which had no "place of worship" assets) — every image whose manifest calls for a generic/neutral "place of worship" was rendered by the model as a specific, recognizable **mosque** (green dome, minaret with finial, horseshoe/arched windows), even though four of these five manifests explicitly require a "plain, neutral structure representing worship in general" with "no religious iconography specific to one faith over another." This affects `p1-socs-09`, `p1-socs-14` (background only), `p2-socs-04`, and `p2-socs-05`. One of these (`p2-socs-04`) is severe enough to be a FAIL because the mosque is the largest, most detailed, most central building in the composition — it reads as the focal point of the whole community scene, not an incidental building. Recommend a targeted regeneration pass on these four with an explicit negative prompt against domes/minarets/arched worship-building silhouettes, before this asset set is treated as final.

Separately, `p2-socs-11` (Nigerian Symbols) renders the national coat of arms' eagle in red — the real Nigerian coat of arms uses a black eagle. The manifest explicitly calls for "verify current official symbol designs before rendering," so this is a factual-accuracy miss worth a targeted fix, not a full regeneration of the panel.

No other content-safety violations were found: no hazards, no unsupervised children in danger, no caricature, no political symbols, no gibberish/baked-in text, no distorted anatomy, no currency-detail issues (naira note portraits are correctly left blank), no gender stereotyping, and every occupation/role scene shows equal dignity as required. Contrast and card-legibility all read cleanly against the bright paper-white background; blank label-safe top bands and diagram-panel gutters look intact everywhere checked.

---

## P1 Social Studies (`p1-socs-01` .. `p1-socs-15`)

| ID | Title | Verdict |
|---|---|---|
| p1-socs-01 | Meaning of Social Studies | ACCEPT |
| p1-socs-02 | How Man Solved His Problems | ACCEPT |
| p1-socs-03 | The Family – Members and Roles | ACCEPT |
| p1-socs-04 | Qualities of a Good Family | ACCEPT |
| p1-socs-05 | Good Moral Values in the Family | ACCEPT |
| p1-socs-06 | My School – Environment and Facilities | ACCEPT |
| p1-socs-07 | People in My School – Roles | ACCEPT |
| p1-socs-08 | My Community – Meaning and People | ACCEPT |
| **p1-socs-09** | **Places in My Community** | **BORDERLINE** |
| p1-socs-10 | Community Helpers | ACCEPT |
| p1-socs-11 | Meaning of Culture | ACCEPT |
| p1-socs-12 | Types of Culture | ACCEPT |
| p1-socs-13 | Festivals and Celebrations | ACCEPT |
| **p1-socs-14** | **Respect for People and Places** | **BORDERLINE** |
| p1-socs-15 | Revision and Assessment | ACCEPT |

### Notable findings

**p1-socs-09 — BORDERLINE.** Manifest requires five distinct buildings (police post, market, hospital, place of worship, school), and all five are present, well separated, calm. The "place of worship" building, however, has a green dome topped with a pointed finial and arched windows/doorway — unambiguously a mosque, not the "plain, neutral structure representing worship in general" the safety note explicitly requires ("no real signage, seal, religious iconography specific to one faith over another"). Everything else in the image (contrast, top-band blankness, calm crowd, no political/ethnic symbol) is clean. Fix: regenerate with a flat-roofed, unadorned civic-style building for the worship structure — no dome, no minaret, no arch motif.

**p1-socs-14 — BORDERLINE.** The two foreground actions (child bowing/greeting an elder respectfully, second child placing litter in a bin) match the manifest and violate nothing in the safety note. But the background architecture — a domed roofline with a tall minaret bearing a crescent-style finial, arched inner courtyard doorways — reads as a mosque compound, not the "school courtyard" the manifest specifies (a backpack on one child is the only school cue). This is a content-accuracy mismatch (wrong building type for the stated setting) and, incidentally, embeds single-faith iconography into a module whose safety note never asked for it. Fix: swap the background for a generic school-block roofline (flat/gabled roof, no minaret) consistent with the school buildings used in `p1-socs-06`/`p1-socs-07`.

---

## P2 Social Studies (`p2-socs-01` .. `p2-socs-15`)

| ID | Title | Verdict |
|---|---|---|
| p2-socs-01 | The Family | ACCEPT |
| p2-socs-02 | Members of the Family | ACCEPT |
| p2-socs-03 | Duties at Home | ACCEPT |
| **p2-socs-04** | **The Community** | **FAIL** |
| **p2-socs-05** | **Places in the Community** | **BORDERLINE** |
| p2-socs-06 | Occupations | ACCEPT |
| p2-socs-07 | The Market | ACCEPT |
| p2-socs-08 | Rules at Home and School | ACCEPT |
| p2-socs-09 | Leaders in the Community | ACCEPT |
| p2-socs-10 | Cooperation | ACCEPT |
| **p2-socs-11** | **Nigerian Symbols** | **BORDERLINE** |
| p2-socs-12 | Respect and Good Behaviour | ACCEPT |
| p2-socs-13 | Festivals and Celebrations | ACCEPT |
| p2-socs-14 | Our Environment | ACCEPT |
| p2-socs-15 | Keeping the Community Clean | ACCEPT |

### Notable findings

**p2-socs-04 — FAIL.** Manifest calls for "houses, a school, a market stall, a neutral place of worship, and a clinic visible together" with a teacher/doctor/farmer/trader each doing their role. All of that content is present and well executed (market trade, handshake greeting, doctor's clinic consultation, farmer hoeing a garden, school class visible through a doorway — good gender-role variety, no litter). The problem is compositional and specific: the "place of worship" is not a small background element here — it is rendered as a large, ornate, domed mosque with a prominent minaret, placed dead-center and given more architectural detail and visual weight than any other building in the scene, making it the de facto focal point of "The Community." This directly contradicts the safety note's "no political, religious-hierarchy... symbol" intent and the depict text's explicit word "neutral." Given its size and centrality, this is not a minor background slip — it needs a straightforward regeneration with a smaller, plain, unadorned worship building relocated off-center, or removed as a distinct architectural focal point altogether (a low neutral hall would satisfy the manifest just as well).

**p2-socs-05 — BORDERLINE.** Same underlying issue as p1-socs-09: a diagram of five community places (school, health centre, market, place of worship, playground) where the worship building is rendered with a green dome, tall minaret, and arched colonnade — again reading as a specific mosque rather than the "plain, neutral structure... representing worship in general" the safety note requires. The rest of the diagram (five clearly separated places, calm residents, blank top band, no litter on the road) is clean. Fix: same as p1-socs-09 — flatten the roofline, remove the minaret and arch motifs.

**p2-socs-11 — BORDERLINE.** The flag, banknote/coin icon (portraits correctly left blank — no political-figure risk), and musical-note panel are all fine and neutrally rendered. The coat-of-arms panel is structurally correct (black shield with white "Y," two white/silver horse supporters, red flowers, blank motto ribbon) but the eagle atop the shield is painted **red**; Nigeria's official coat of arms uses a **black** eagle. The manifest explicitly instructs "verify current official symbol designs before rendering," so this is a direct miss against an explicit instruction, not a subjective style call. Fix: recolor the eagle to black (or regenerate just that one panel) before this asset ships.

### Minor note (not scored as a defect)

`p2-socs-08` has a tiny, distant green dome with a finial visible through a classroom window in the second panel's background townscape. It is small, incidental, and not the "place of worship" subject of this module (which is "Rules at Home and School," with no worship-building requirement at all) — so it doesn't move the verdict off ACCEPT, but it's the same underlying model tendency (defaulting distant-background architecture to mosque silhouettes) that drives the four flagged items above. Worth keeping in mind if a broader prompt fix is made for the "place of worship" issue — the fix should also nudge generic background townscapes away from the same default.

---

## Recommendation

Do not treat this batch as fully production-ready as-is. Of 30 images, 25 are clean accepts. Five need attention before integration:

1. **`p2-socs-04` (FAIL)** — regenerate; the oversized central mosque is the dominant visual element of a module that must stay religiously neutral.
2. **`p1-socs-09`, `p1-socs-14`, `p2-socs-05` (BORDERLINE)** — same root cause (mosque-style worship/background architecture); regenerate with an explicit negative prompt against domes/minarets, or manually swap in a flat neutral building if the pipeline supports a targeted redo.
3. **`p2-socs-11` (BORDERLINE)** — recolor the coat-of-arms eagle to black; this one is a simple targeted fix, not a full regeneration.

This does not meet the bar for triggering the documented Style B → C fallback (25/30 clean, and the failure mode is a specific, describable prompt-adherence gap rather than a style-direction failure) — but the "neutral place of worship" instruction should get a stronger, more explicit negative-prompt treatment in the next generation batch, since it failed 4 out of 5 times it appeared in this 30-image set.

**This decision is Muhammad's, not automatic**, per the documented fallback-decision-owner rule.
