# Style B — Social Studies P1–P2 regeneration — 5-image targeted fix set

QA result (`tasks/2026-07-20-socs-p1p2-qa-result.md`) found a systemic issue: 4 of 5 "neutral place of
worship" instances in the P1–P2 batch defaulted to mosque-specific architecture (dome, minaret, arched
windows) despite manifests explicitly requiring "no religious iconography specific to one faith over
another." One instance (`p2-socs-04`) is severe enough to FAIL — the mosque is the dominant, central
building in the scene. A 5th image (`p2-socs-11`) has an unrelated factual error: the coat-of-arms eagle
was rendered red instead of the correct black. Muhammad's decision (2026-07-20): regenerate all 5 now
with strengthened prompts.

**Workflow per image:** same as the main batch — paste Prompt + Avoid into ChatGPT, save with the exact
filename given, **overwrite the existing file**.

---

### 1. `p1-socs-09` — Places in My Community

**Save as:** `style-b-p1-socs-09.png` → `tools/image-pipeline/output/raw/style-b-p1-socs-09.png` (overwrite)

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple, non-geographic community layout showing a police post, a market, a hospital, a neutral place of worship, and a school as distinct, clearly separated buildings within one community scene, with a few residents calmly moving between them. The place of worship must be a plain, flat-roofed, unadorned civic-style building — the same general architectural register as the police post and school beside it, with no dome, no minaret, no arch, and no faith-specific silhouette of any kind; it should be recognisable as a shared communal building only, not as a mosque, church, or any specific denomination's structure. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No real signage, seal, religious iconography specific to one faith over another, or political symbol. Specifically: no dome, no minaret, no crescent finial, no arched mosque-style windows or doorway, no church spire, no cross, no bell tower, no religious-specific roofline of any kind on the place-of-worship building — it must read as a plain flat-roofed civic hall, not as any recognisable faith's building.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Ofishin 'yan sanda, Kasuwa, Asibiti, Makaranta

---

### 2. `p1-socs-14` — Respect for People and Places

**Save as:** `style-b-p1-socs-14.png` → `tools/image-pipeline/output/raw/style-b-p1-socs-14.png` (overwrite)

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A child greeting an elder with a respectful gesture in a school courtyard, while nearby another child calmly places litter into a bin — showing respect for people and for shared public places in one scene. The setting must clearly read as a primary school: flat or simply gabled classroom-block roofline, a school signboard-shaped (but blank) panel, a backpack or school bag visible on one child, matching the plain school-building style already used for other school-themed images in this set — no dome, no minaret, no arch, and no worship-building silhouette of any kind anywhere in the background. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. Show only calm, respectful behaviour — no depiction of disrespect, damage to property, or a child being scolded. Specifically: no dome, no minaret, no crescent finial, no arched mosque-style windows or courtyard, no church spire, no cross, no religious building of any kind in the background — the setting must be unmistakably a school, not a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Girmamawa, Kula da wurin jama'a

---

### 3. `p2-socs-04` — The Community

**Save as:** `style-b-p2-socs-04.png` → `tools/image-pipeline/output/raw/style-b-p2-socs-04.png` (overwrite)

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A cooperative Northern Nigerian community scene with houses, a school, a market stall, a neutral place of worship, and a clinic visible together, with a teacher, doctor, farmer, and trader each shown doing their distinct role and residents greeting one another calmly. The place of worship must be a small, plain, flat-roofed, unadorned civic-style building placed off-center and given no more visual weight or detail than the houses or clinic around it — it must not be the largest, most detailed, or most central structure in the scene. It has no dome, no minaret, no arch, and no faith-specific silhouette of any kind; it reads as a shared communal building only, not as a mosque, church, or any specific denomination's structure. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No political, religious-hierarchy, or ethnic symbol; show men and women in varied community roles without gender stereotyping, and no litter or damaged public property. Specifically: no dome, no minaret, no crescent finial, no arched mosque-style windows, no church spire, no cross, no religious-specific roofline of any kind; the place of worship must not be the dominant, largest, or most central building in the composition — houses, school, market, and clinic should all read as equally or more prominent.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Al'umma, Haɗin kai

---

### 4. `p2-socs-05` — Places in the Community

**Save as:** `style-b-p2-socs-05.png` → `tools/image-pipeline/output/raw/style-b-p2-socs-05.png` (overwrite)

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple, non-geographic layout of five community places clearly separated — a school, a health centre, a market, a neutral place of worship, and a playground — with a small road connecting them and a couple of residents calmly using each place appropriately. The place of worship must be a plain, flat-roofed, unadorned civic-style building — the same general architectural register as the school and health centre beside it, with no dome, no minaret, no arch, and no faith-specific silhouette of any kind; it should be recognisable as a shared communal building only, not as a mosque, church, or any specific denomination's structure. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. Show the place of worship as a plain, neutral structure representing worship in general, with people calm and quiet there; no litter shown on the road. Specifically: no dome, no minaret, no crescent finial, no arched mosque-style windows or doorway, no church spire, no cross, no bell tower, no religious-specific roofline of any kind — it must read as a plain flat-roofed civic hall, not as any recognisable faith's building.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Makaranta, Asibiti, Kasuwa, Filin wasa

---

### 5. `p2-socs-11` — Nigerian Symbols

**Save as:** `style-b-p2-socs-11.png` → `tools/image-pipeline/output/raw/style-b-p2-socs-11.png` (overwrite)

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple, accurate study panel showing the Nigerian green-white-green flag, a verified coat of arms, a small naira/kobo coin-and-note icon, and a generic musical-note panel representing the national anthem, presented neutrally with equal size for each symbol. The coat of arms must be rendered with full accuracy to the official design: a black shield bearing a white/silver wavy "Y" band, the shield resting on a black-and-white checked base, two white/silver horses (or horse-like heraldic supporters) as side supporters, a red hibiscus flower on each side above the supporters, and — critically — a single black eagle standing on top of the shield (the eagle must be black, not red, gold, or any other colour), with a blank ribbon beneath the shield left unlabelled for the motto text to be added later. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. Verify current official symbol designs before rendering; no party colour, party logo, politician, campaign material, or alteration of the coat of arms — this module is explicitly non-political. Specifically: the eagle atop the shield must not be rendered in red, gold, brown, or any colour other than black — a red or non-black eagle is an incorrect rendering of Nigeria's official coat of arms and must be avoided.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Tutar Nijeriya, Tambarin Nijeriya, Naira
