# Regeneration prompts — 4 flagged images from P5/P6 QA pass

Source QA: see conversation 2026-07-18. Each prompt below is the original Style B prompt from
`tasks/2026-07-17-socs-60image-chatgpt-prompts.md`, with added sentences that directly target the
specific defect found. Negative prompt (Avoid) is likewise strengthened. Save-as paths are
unchanged — a regeneration should overwrite the existing file.

---

## 1. `p5-socs-04` — Disaster Preparedness and Safety

**Defect found:** the flood/fire/road-accident icon triptych was too graphic — a house fully
engulfed in flame, and a crash-scene icon (car + knocked-over motorbike). Manifest requires
"no injury, panic, bodies, active rescue instruction."

**Save as:** `style-b-p5-socs-04.png` → `tools/image-pipeline/output/raw/style-b-p5-socs-04.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A calm school safety-plan diagram showing a marked exit route, a safe assembly point, a teacher leading pupils away from simplified flood, fire, and road-accident warning icons, plus radio and town-crier alert symbols; trained adult responders appear only as distant neutral icons. The three hazard icons must be simple, muted, non-graphic pictograms only — a few grey rain lines over a small blue roofline for flood, a small stylised orange flame outline (no engulfed structure, no thick black smoke) for fire, and a simple stationary car silhouette with a small warning triangle for road hazard (no second vehicle, no motorbike, no wreckage, no scattered debris). Treat each hazard icon like a road-sign pictogram, not a scene — flat, contained, and clearly bounded within its own small circle or badge shape, never filling the frame. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No injury, panic, bodies, active rescue instruction, dangerous proximity to water, fire, vehicles, fuel, or glass; no emergency-service logo or unsupported phone number; children follow adults and never perform rescue. Specifically: no house or building shown on fire or engulfed in flame, no thick dark smoke plume, no crashed or overturned vehicle, no motorbike involved in any icon, no visible wreckage or debris, no scene that reads as "an accident/disaster is actively happening" — icons must read as calm hazard-awareness symbols, like a safety poster, not a depiction of a real event in progress.

**Deterministic overlay labels (unchanged):** Hanyar fita, Wurin taruwa, Wuri mai aminci, Gargadi, Masu horo

---

## 2. `p6-socs-01` — Globalisation and Its Effects

**Defect found:** included recognizable real landmarks (Big Ben/London Eye silhouette, and a
building read as the Burj Al Arab) — brand/likeness-adjacent given the "no corporate brand"
constraint.

**Save as:** `style-b-p6-socs-01.png` → `tools/image-pipeline/output/raw/style-b-p6-socs-01.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A balanced network map connecting Northern Nigerian farming, crafts, music, learning, mobile communication, transport, and lawful trade with several neutral world regions; two equal paths mark opportunities such as learning and markets and challenges such as false information and pressure on small businesses. Represent the "other world regions" side with entirely generic, invented cityscape silhouettes only — plain rectangular and stepped building blocks, a generic bridge or skyline shape — deliberately not matching the outline of any specific, identifiable real building or monument anywhere in the world. Do not draw any world-famous or trademarked landmark shape, however loosely. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No national or cultural ranking, corporate brand, platform logo, inaccurate border emphasis, luxury-consumption message, or claim that foreign culture replaces Nigerian culture; show exchange flowing both toward and from Nigeria. Specifically: no Big Ben, no clock tower resembling Big Ben, no observation wheel/Ferris wheel resembling the London Eye, no sail-shaped or distinctively curved luxury hotel tower resembling the Burj Al Arab, no Eiffel Tower, no Statue of Liberty, no pyramids, no other real-world identifiable monument or skyline — generic invented buildings only.

**Deterministic overlay labels (unchanged):** Ciniki, Sufuri, Sadarwa, Fasaha, Damar koyo, Bincika sahihancinsa

---

## 3. `p6-socs-04` — Sustainable Development

**Defect found:** the surrounding ring of segments closely mimicked the official UN SDG wheel's
rainbow color palette and layout, even without printed logos/numbers — the manifest explicitly
requires avoiding official SDG logos "unless licensing is cleared."

**Save as:** `style-b-p6-socs-04.png` → `tools/image-pipeline/output/raw/style-b-p6-socs-04.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Three interlocking circles for economic, social, and environmental development around a Northern Nigerian community water point: local repair work and livelihoods, equitable school and clinic access, and protected soil, water, trees, and animals; a small ring of seventeen unlabeled goal segments indicates the global goals without reproducing official icons. The seventeen-segment ring must use a restrained watercolor palette drawn only from this illustration's own established colours (indigo, ochre, soft green, warm brown, pale blue) — vary segments by subtle tone and value only, not by a full rainbow spectrum, and do not arrange them in the same colour sequence or wedge proportions as the official UN Sustainable Development Goals wheel. The ring should read as a generic decorative border motif, clearly distinct in both palette and rhythm from any known institutional logo. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No official SDG logos unless licensing is cleared, no greenwashing brand, no claim that one pillar can replace another, no unsafe tools in children's hands, no distressed environmental scene. Specifically: no full-saturation rainbow colour wheel, no segment ring that could be mistaken for the official UN SDG wheel's colour sequence (red, orange, yellow, dark yellow, dark red, green, dark green, blue, dark orange, dark red, orange, olive, dark green, blue, dark blue, light blue, dark blue in that order) — use a narrow, muted, hand-picked watercolor palette instead.

**Deterministic overlay labels (unchanged):** Tattalin arziki, Zamantakewa, Muhalli, Damar masu zuwa, Rage ɓarnar ruwa

---

## 4. `p6-socs-15` — Revision and Consolidation — Bridge to JSS1

**Defect found:** close-up inspection revealed illegible letter-like texture baked into a small
red-and-white building's signage, and that building's red/white color scheme reads as resembling
a real Nigerian bank's branding. Manifest explicitly bars "real institutional logo."

**Save as:** `style-b-p6-socs-15.png` → `tools/image-pipeline/output/raw/style-b-p6-socs-15.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A four-ring P3–P6 consolidation map: local government, services, transport, communication, farming, markets, environment, citizenship, national geography and symbols, government and democracy, resources and rights, global links, courts, migration, safety, technology, population, enterprise, and peace all feed into a central secondary-school inquiry cycle. Any small building shown to represent a bank, business, or service office must have completely bare, unmarked walls and a plain painted signboard left entirely blank — no lettering, no lettering-like texture or scribble marks, no logo, no emblem, and no color combination (such as red-and-white or any other two-tone livery) that could be read as matching a real, existing Nigerian company or bank's branding. Use varied, neutral building colors (ochre, pale blue, sand, muted green) instead of any high-contrast two-tone corporate-style scheme. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. Keep all four bands and topic families visually balanced; no party, candidate, religious or ethnic hierarchy, graphic disaster or danger, weapon, live conflict, substance depiction, family-size message, stale statistic, false court ladder, or real institutional logo. Specifically: no illegible lettering, scribbled text-like marks, or pseudo-writing of any kind on any building, sign, or surface anywhere in the image — signage must be entirely blank; no red-and-white two-tone building livery or any other color scheme resembling a real bank or company brand.

**Deterministic overlay labels (unchanged):** Tambayar tushe, Kwatanta hujja, Sauraro, Tsara aiki, Haƙƙoƙi da nauyi, Aikin ɗan ƙasa

---

## Workflow

Paste each prompt (Prompt + Avoid together, as with the earlier 60-image set) into ChatGPT, save
the output as the exact filename listed, and drop it into
`tools/image-pipeline/output/raw/`, overwriting the existing flagged file. Flag back here for a
second QA pass once regenerated — do not treat these as auto-accepted.
