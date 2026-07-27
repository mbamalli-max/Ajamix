# Image QA manual checklist

Use this after automated checks and before accepting any API-generated image. A pass requires a reviewer name/date and an explicit accepted/rejected status in that job’s provenance record.

- [ ] Artwork contains no generated text, letter-like texture, numbers, watermark, branding, logo, URL, or signature. Inspect at 100% and mobile-card size.
- [ ] PNG is 1536 × 1024 (or an explicitly approved successor spec), correct type, intended alpha/background policy, and no accidental transparency/fringing.
- [ ] Every Latin label matches the source manifest verbatim; record manifest path, module ID, and exact strings used.
- [ ] Every Ajami line has a validation source. Reject any unvalidated Ajami from learner production. In the Phase 1 spike, confirm the visible `GWAJI — BA A TANTANCE BA / UNVALIDATED TEST` marker.
- [ ] Label boxes, arrows, and callouts are not clipped, overlap no important evidence, have sufficient contrast, and remain legible at a 390 px wide card.
- [ ] RTL lines start/end correctly, join and place diacritics correctly, align to the intended edge, and bilingual hierarchy is Ajami primary then Latin secondary.
- [ ] Science illustration/diagram reflects the manifest and safety note; math values, notation, columns, scales, and relationships are independently recomputed.
- [ ] Cultural setting, clothing, tools, homes, foods, landscapes, and people are accurate, specific where relevant, and free of stereotypes or decorative pseudo-African motifs.
- [ ] Record `accepted` or `rejected`, reviewer/date, any correction needed, and a specific rejection reason. Retain SHA-256 checksum and response/request provenance.

## Style B archetype test acceptance

Apply this section only after real generated art exists for the three-item Style B test; it does not establish a result for the current dry-run queue.

- [ ] **Contrast:** Each focal object (the plant and its evidence cues; the torso/tooth reference forms; the mathematics frame/work area) visibly separates from its immediate background at both 100% and 390 px card size. Treat it as a contrast failure when the focal object’s measured or sampled luminance difference is below 30% **and** its saturation difference is below 20 percentage points against the adjacent background, or when a reviewer cannot immediately identify the intended focal object at card size. An automated contrast-delta check may be added later to `qa/check-poc.mjs`-style tooling; human review remains required.
- [ ] **Consistency:** Across all three images, Style B retains its bright paper-white negative space, high-contrast clean watercolor treatment, selective indigo/pencil contours, completely unpainted label-safe zones, and the applicable `characters.md` rendering rules. Treat a divergence in those traits, or a character/object rendering that conflicts with `characters.md` or this Style B bible, as a consistency failure.
- [ ] Confirm generated art contains no numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections; those deterministic elements belong only to `tools/image-pipeline/overlay/compositor.mjs`.
- [ ] If Style B repeatedly fails contrast or consistency on this 3-item test, record Muhammad’s review decision before considering the documented next candidate: C, never A. This is not automatic fallback logic.
