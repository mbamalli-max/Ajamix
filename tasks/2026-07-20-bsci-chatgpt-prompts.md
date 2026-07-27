# Style B — Basic Science P1–P6 — ChatGPT-pasteable prompt set

Generated directly from the approved image-needs manifests (`tools/image-manifest/`) using the Style B
prompt template locked 2026-07-12 and confirmed working across the Social Studies P3–P6 production run
and the P3 maths pilot.

**Workflow per image:**
1. Copy the "Prompt" text into ChatGPT.
2. Copy the "Avoid" text as a follow-up instruction (or append it to the prompt as "Avoid: ...").
3. Download the result and save it under `tools/image-pipeline/output/raw/` with the **exact filename** given (do not rename).
4. Once a band (or the whole subject) is done, tell Claude — QA review, overlay compositing, and guarded promotion into `app/images/` happen after.

**Recommended order:** one band at a time, reviewing each band's results before starting the next.


## Band P1 (15 images)

### 1. `p1-bsci-01` — The Senses – Sight

**Save as:** `style-b-p1-bsci-01.png` → `tools/image-pipeline/output/raw/style-b-p1-bsci-01.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A child in a bright classroom looking at and pointing toward a few named objects — a book, a pencil, and their teacher — with the child's eyes gently highlighted/circled to show which body part is being used to see. Soft daylight from a window lights the scene. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not show the child's hand touching or near the eye, and do not depict anyone looking directly at the sun.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Idanu

---

### 2. `p1-bsci-02` — The Senses – Hearing

**Save as:** `style-b-p1-bsci-02.png` → `tools/image-pipeline/output/raw/style-b-p1-bsci-02.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A child listening with a hand cupped near an ear (ears gently highlighted), surrounded by small linked icons of sound sources named in the lesson: a teacher speaking, a car, a crying baby, and a singing bird. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not depict any object, finger, or sharp item near or inside the ear, and do not show a loud sound source (e.g. siren, horn) directly beside the child's ear.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Kunnuwa

---

### 3. `p1-bsci-03` — The Senses – Touch

**Save as:** `style-b-p1-bsci-03.png` → `tools/image-pipeline/output/raw/style-b-p1-bsci-03.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A child's hand touching two contrasting textures placed side by side — a soft cotton tuft (auduga) and a hard stone (dutse) — with a small fire shown at a clear distance in the same scene, marked as something the child is NOT reaching toward, to illustrate that touch also warns us away from heat. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. The child must never be shown touching, reaching for, or standing close to the fire — it appears only as a distant, clearly-avoided hazard, consistent with the lesson's own caution against touching fire or hot things unsupervised.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 4. `p1-bsci-04` — The Senses – Smell and Taste

**Save as:** `style-b-p1-bsci-04.png` → `tools/image-pipeline/output/raw/style-b-p1-bsci-04.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two small linked panels: one shows a child sniffing a familiar, named item (a bar of soap or a flower) with the nose highlighted; the other shows a child tasting a named food (a sugar cube or a slice of lemon) with the tongue/mouth highlighted, to contrast sweet and sour. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Only show the specific, everyday items named in the lesson (soap, sugar, lemon) being smelled or tasted with visible care — never depict a child eating or drinking an unlabeled or unknown substance, matching the lesson's own caution against consuming unknown things without permission.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Hanci, Baki

---

### 5. `p1-bsci-05` — The Five Senses Review

**Save as:** `style-b-p1-bsci-05.png` → `tools/image-pipeline/output/raw/style-b-p1-bsci-05.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A single child illustration with five small labeled call-outs pointing to the five sense organs in use: eyes looking at a book, ears listening to a bell, a hand touching a leaf, a nose smelling a flower, and a mouth/tongue tasting fruit — arranged as a simple five-panel summary around the child. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Keep all five example objects ordinary and harmless (book, bell, leaf, flower, fruit) — no hot, sharp, or unknown items in any panel.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Idanu, Kunnuwa, Hannu, Hanci, Baki

---

### 6. `p1-bsci-06` — Living Things – Animals

**Save as:** `style-b-p1-bsci-06.png` → `tools/image-pipeline/output/raw/style-b-p1-bsci-06.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A friendly village/farm scene showing several named animals demonstrating different kinds of movement: a dog (kare) walking on four legs, a bird (tsuntsu) flying, and a fish (kifi) swimming in a small pond — grouped together to show that living things move, eat, and grow in different ways. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Show all animals calm, healthy, and unharmed — no depiction of a child mistreating, chasing, or hurting an animal, consistent with the lesson's instruction to treat animals with kindness.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 7. `p1-bsci-07` — Living Things – Plants

**Save as:** `style-b-p1-bsci-07.png` → `tools/image-pipeline/output/raw/style-b-p1-bsci-07.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A labeled plant (e.g. a young tree or maize/gero stalk) showing its leaf, stem, and fruit, growing in soil with visible sunlight rays above and a small watering can or rain shown beside it, to depict what a plant needs (soil, water, air, sunlight) to grow. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No child depicted uprooting, cutting, or damaging the plant — the scene should show only healthy, cared-for growth.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Ganye, Tushe, 'Ya'ya

---

### 8. `p1-bsci-08` — Non-Living Things

**Save as:** `style-b-p1-bsci-08.png` → `tools/image-pipeline/output/raw/style-b-p1-bsci-08.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A side-by-side comparison scene: on one side a living thing (a dog or a tree) shown moving/growing; on the other side several non-living objects named in the lesson (a stone, a table, a shoe, a book, a bottle) sitting still, to visually contrast things that breathe/grow/move on their own with things that do not. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Depict the non-living objects only in their ordinary, undamaged form (no broken glass from the bottle, no sharp edges) — nothing hazardous to a child.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Mai Rai, Marasa Rai

---

### 9. `p1-bsci-09` — Water – Sources and Uses

**Save as:** `style-b-p1-bsci-09.png` → `tools/image-pipeline/output/raw/style-b-p1-bsci-09.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A two-part scene: one half shows named water sources (a tap/famfo, a well/rijya, gentle rain falling from a cloud, a river/rafi) — the rain shown as a light, calm shower with no standing water, flooding, or puddle accumulation; the other half shows named everyday uses (a person drinking, bathing, cooking, and watering plants), with a covered water pot or tank visible to show safe storage. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Show only clean, clear water and a covered storage container — no depiction of dirty/stagnant water being used for drinking, matching the lesson's emphasis on using clean, covered water for health.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 10. `p1-bsci-10` — Air – What is Air?

**Save as:** `style-b-p1-bsci-10.png` → `tools/image-pipeline/output/raw/style-b-p1-bsci-10.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. An outdoor scene where air's invisible presence is shown through its effects: a tree's leaves and a flag both blown sideways by wind, and a child blowing gently onto the palm of their own hand to feel air moving — air itself is not drawn, only its visible effects. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Depict only a gentle, ordinary breeze — no storm, dust cloud, or debris flying, keeping the scene calm and non-threatening.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 11. `p1-bsci-11` — The Weather

**Save as:** `style-b-p1-bsci-11.png` → `tools/image-pipeline/output/raw/style-b-p1-bsci-11.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A four-panel weather diagram showing the same simple outdoor scene (a house and a tree) under four different named conditions: sunny (rana) with bright sun, rainy (ruwan sama) with falling rain and a child under an umbrella, windy (iska) with the tree bending, and cloudy (gizagizai) with the sun covered by clouds. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No lightning, flooding, or storm damage depicted — each panel should show mild, everyday weather only.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Rana, Ruwan Sama, Iska, Gizagizai

---

### 12. `p1-bsci-12` — Simple Machines – Lever

**Save as:** `style-b-p1-bsci-12.png` → `tools/image-pipeline/output/raw/style-b-p1-bsci-12.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple lever diagram: a long stick resting on a small block (fulcrum), with a heavy stone on one end and a hand pressing down gently on the other end to show the stone lifting — plus a small side illustration of a rocking chair (kujera mai jujjuyawa) as a second example of a lever. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Show the hand pressing the lever at a safe distance from the pivot point — no fingers shown near the fulcrum where they could be pinched.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Lefe

---

### 13. `p1-bsci-13` — Simple Machines – Wheel and Axle

**Save as:** `style-b-p1-bsci-13.png` → `tools/image-pipeline/output/raw/style-b-p1-bsci-13.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A labeled diagram of a wheelbarrow (keken hannu) at rest, with its wheel and the central axle rod clearly labeled, plus a small side view showing how the round wheel turns on the straight axle rod to make moving a load easier. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. The wheelbarrow/cart must be shown stationary and empty of any child — no child riding on or being pulled by the vehicle.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Daba, Sandar da ke Tsakiya

---

### 14. `p1-bsci-14` — Energy – Light and Heat

**Save as:** `style-b-p1-bsci-14.png` → `tools/image-pipeline/output/raw/style-b-p1-bsci-14.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Three small linked panels: the sun shining with both light rays and wavy heat lines over a house with a solar panel on its roof; a lamp/fitila glowing in a dark room, giving light only; and a cooking fire at a safe distance from a seated adult, giving off visible heat waves, to contrast sources of light versus heat. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. The fire must be shown tended by an adult at a safe distance, never touched or approached by a child, and no child shown standing in direct harsh sun without shade — matching the lesson's own caution about fire and prolonged sun exposure.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Haske, Zafi

---

### 15. `p1-bsci-15` — Revision and Assessment

**Save as:** `style-b-p1-bsci-15.png` → `tools/image-pipeline/output/raw/style-b-p1-bsci-15.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple review grid of small icons summarizing the term's topics — an eye/ear/hand/nose/mouth for the senses, a dog and a tree for living things, a stone for non-living things, a water drop, a wind swirl, a sun-and-cloud pair for weather, and a wheel — with a calm, smiling child in the center looking over the icons, as if recalling what was learned. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. The child must be shown calm, confident, and smiling, never anxious, stressed, or fearful — matching the lesson's own encouragement to answer 'ba tare da firgita ba' (without panic).

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---


## Band P2 (19 images)

### 16. `p2-bsci-01` — Living and Non-living Things

**Save as:** `style-b-p2-bsci-01.png` → `tools/image-pipeline/output/raw/style-b-p2-bsci-01.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two-group comparison scene: left side shows living things (a goat, a chicken, a tree, a potted bean plant, a person) that grow and need water/food; right side shows non-living things (a stone, a chair, a writing board, a bowl, a gown, a book). Children observe both groups from a distance, not touching the animal. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not depict a child touching, picking up, or handling the goat or chicken — the module explicitly says to sort things without harming or picking up an animal.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Masu Rai, Marasa Rai

---

### 17. `p2-bsci-02` — Parts of a Plant

**Save as:** `style-b-p2-bsci-02.png` → `tools/image-pipeline/output/raw/style-b-p2-bsci-02.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A labeled mango-tree-style plant illustration showing five parts: the root system in the soil, the stem rising up, leaves, a flower, and a fruit (mango), each with a small label line pointing to it. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not depict a child pulling off a leaf or breaking the stem — the module tells children to only look and point, not remove leaves or break the stem.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Tushe, Kara, Ganye, Fure, 'Ya'ya

---

### 18. `p2-bsci-03` — Domestic Animals

**Save as:** `style-b-p2-bsci-03.png` → `tools/image-pipeline/output/raw/style-b-p2-bsci-03.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A small compound scene with labeled domestic animals standing calmly: a goat, a sheep, a chicken, a cow, a donkey, a dog, and a cat, each near simple items showing their use (an egg near the chicken, a milk pail near the cow, a small load near the donkey). A child watches from a comfortable distance, not touching any animal. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not depict a child throwing a stone at, scaring, or closely handling an animal — the module warns against throwing stones or frightening animals and says to ask an adult before touching an unfamiliar one.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Akuya, Tunkiya, Kaza, Saniya, Jaki, Kare, Kyanwa

---

### 19. `p2-bsci-04` — Weather

**Save as:** `style-b-p2-bsci-04.png` → `tools/image-pipeline/output/raw/style-b-p2-bsci-04.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Four small linked weather panels: a bright sun, a gray cloud, wind shown moving leaves and dust, and gentle rain falling. A child with an umbrella (held with an adult nearby) represents the rain-safety tip. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not depict a storm, lightning, flooding, or a child alone outdoors in heavy rain — keep the weather depiction mild and the umbrella scene shows adult presence, matching the module's 'with adult permission' framing.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Rana, Gajimare, Iska, Ruwan Sama

---

### 20. `p2-bsci-05` — Uses of Water

**Save as:** `style-b-p2-bsci-05.png` → `tools/image-pipeline/output/raw/style-b-p2-bsci-05.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A grid of small scenes showing water's everyday uses: a child drinking from a cup, a child washing hands at a tap, cooking pots on a fire (adult tending), a watering can for a plant, and an animal drinking from a bowl. One panel shows a hand turning off a tap. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not depict a running/wasted tap left open or a child drinking from a dirty source — the module stresses turning off the tap and drinking only clean water.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Famfo

---

### 21. `p2-bsci-06` — Personal Hygiene

**Save as:** `style-b-p2-bsci-06.png` → `tools/image-pipeline/output/raw/style-b-p2-bsci-06.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A sequence of small hygiene-habit panels: a child washing hands with soap and water, a child brushing teeth, a child combing hair, a child wearing clean clothes, and a child covering a cough/sneeze with their elbow. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not depict a sick or symptomatic child, an explicit toilet/bathroom scene, a child cutting their own nails (an adult should be shown trimming them), or two children sharing a toothbrush — the module says not to share a toothbrush and has an adult trim nails.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 22. `p2-bsci-07` — Food Groups

**Save as:** `style-b-p2-bsci-07.png` → `tools/image-pipeline/output/raw/style-b-p2-bsci-07.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A three-section plate illustration grouping foods by role: energy foods (tuwo, rice, cassava, potato, bread), body-building foods (beans, egg, fish, meat, milk), and protective foods (spinach-type leaves, moringa leaves, mango, orange). A cup of water and a child washing hands shown beside the plate. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not depict food being picked up off the ground or eaten unwashed — the module tells children to wash hands before eating and never eat food that has fallen.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 23. `p2-bsci-08` — The Five Senses

**Save as:** `style-b-p2-bsci-08.png` → `tools/image-pipeline/output/raw/style-b-p2-bsci-08.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A friendly child figure with five simple callouts pointing to each sense organ: eyes (seeing a picture), ears (hearing a bell), nose (smelling food), tongue (tasting a fruit), and skin/hand (feeling a soft cloth). Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not depict a child looking directly at the sun, inserting an object into an ear or nose, or eating an unidentified item — these are explicit cautions in the module text.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Idanu, Kunnuwa, Hanci, Harshe, Fata

---

### 24. `p2-bsci-09` — Safety at Home

**Save as:** `style-b-p2-bsci-09.png` → `tools/image-pipeline/output/raw/style-b-p2-bsci-09.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A home safety scene shown from a distance with hazards circled or crossed with a small 'no' icon rather than approached: a stove/fire, an electric socket and wire, a knife/razor/nail and a broken bottle, and a medicine bottle and fuel container on a high shelf. A separate panel shows a child calmly telling an adult about spilled water or smoke. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not depict a child touching, holding, or standing close to fire, a socket, sharp objects, or a chemical/medicine container — every hazard must be shown as something to avoid, never something the child is interacting with, per the module's own list of things not to touch.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 25. `p2-bsci-10` — Clean Environment

**Save as:** `style-b-p2-bsci-10.png` → `tools/image-pipeline/output/raw/style-b-p2-bsci-10.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A tidy compound scene: a child dropping a banana peel/wrapper into a covered waste bin, a swept path, and a small separate panel showing a puddle of standing dirty water near a house being pointed out to an adult (not touched). Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not depict a child directly handling loose trash or standing water with bare hands — the module says to wash hands after touching waste and flags standing dirty water as a mosquito-breeding risk to report, not touch.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 26. `p2-bsci-11` — Simple Machines at Home

**Save as:** `style-b-p2-bsci-11.png` → `tools/image-pipeline/output/raw/style-b-p2-bsci-11.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A flat-lay of everyday, non-electric household tools labeled with their names: a spoon, a broom, a bucket, and a key. A knife is shown set apart in an adult's hand, not a child's, to reflect the supervised-use caution. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not depict a child holding the knife or any sharp/heavy tool unsupervised, and do not depict a powered/electric machine — the module explicitly says these simple tools need no electric machine and that a knife is for adult-supervised use only.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Cokali, Tsintsiya, Guga, Mabuɗi

---

### 27. `p2-bsci-12` — Sources of Light

**Save as:** `style-b-p2-bsci-12.png` → `tools/image-pipeline/output/raw/style-b-p2-bsci-12.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. The sun shown as the main light source in a daytime sky, with small inset icons of a lamp, a torch, and an electric bulb as other light sources. A separate small panel shows a child's own shadow cast on the ground while the child looks down, not at the sun. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not depict a child looking directly at the sun or standing close to an open flame — the module explicitly warns against looking straight at the sun.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Rana, Fitila, Inuwa

---

### 28. `p2-bsci-13` — Sound Around Us

**Save as:** `style-b-p2-bsci-13.png` → `tools/image-pipeline/output/raw/style-b-p2-bsci-13.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A child gently tapping a small drum, shown with faint motion/vibration lines around the drumhead to indicate it shaking as it makes sound. Small side icons show a bell, a radio at low volume, and a car, as other everyday sound sources. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not depict loud banging, a child striking an ear, or a radio/device shown at high volume — the module warns against noise that disturbs people or hurts ears and says to keep device volume low.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Ganga

---

### 29. `p2-bsci-14` — Care of Plants and Animals

**Save as:** `style-b-p2-bsci-14.png` → `tools/image-pipeline/output/raw/style-b-p2-bsci-14.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Split scene: on one side a child gently watering a potted plant with a small watering can; on the other side a child placing a bowl of food and water near a goat and a chicken in a clean, shaded spot, without touching the animals. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not depict a child throwing anything at an animal, pulling its tail, or breaking the plant's branches — the module explicitly forbids both.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 30. `p2-bsci-15` — Keeping Water Safe

**Save as:** `style-b-p2-bsci-15.png` → `tools/image-pipeline/output/raw/style-b-p2-bsci-15.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A covered water storage container with a lid, a clean cup and ladle resting beside it (not inside the water), and a separate small panel showing an adult boiling or filtering water at a source that looks uncertain, plus a covered well. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not depict a hand placed directly into the drinking water, a child alone at an open well, or muddy/dirty water being consumed — the module warns against dirty hands in the water and unclean sources.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Mazubi Mai Murfi

---

### 31. `p2-bsci-16` — What Plants Need to Grow

**Save as:** `style-b-p2-bsci-16.png` → `tools/image-pipeline/output/raw/style-b-p2-bsci-16.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A potted bean plant illustration with four small arrows/icons pointing to it: a watering can (water), gentle wind lines (air), sun rays (sunlight), and the soil around its roots (suitable soil). A child observes and gently checks the soil without pulling the plant. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not depict a child pulling a leaf or breaking the stem, and do not show excessive water being poured — the module warns that too much water can harm the plant and tells children not to pull leaves or break the stem.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Ruwa, Iska, Hasken Rana, Ƙasa

---

### 32. `p2-bsci-17` — Habitats and Their Differences

**Save as:** `style-b-p2-bsci-17.png` → `tools/image-pipeline/output/raw/style-b-p2-bsci-17.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Three small matched scenes, each creature shown in its own local habitat: a fish in a pond/stream, a plant growing in soil, and a bird perched in a tree beside its nest. A fourth small panel shows a farm with crops and small animals near a house with a chicken and goat. Children observe each scene from a distance. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not depict a child touching a nest, a burrow/hole, or any wild animal — the module explicitly says not to touch a nest, hole, or wild animal and to observe from a distance.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 33. `p2-bsci-18` — Materials, Their Properties and Uses

**Save as:** `style-b-p2-bsci-18.png` → `tools/image-pipeline/output/raw/style-b-p2-bsci-18.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A labeled flat-lay of everyday objects grouped by material: a wooden table/door for wood, a metal spoon and nail for metal, a rubber shoe for rubber, a cloth gown for cloth, and a plastic bucket for plastic. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not depict broken glass, a sharp/pointed metal edge, or a hot object — the module explicitly warns children not to touch broken glass, sharp metal, or anything hot.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Itace, Ƙarfe, Roba, Zane, Filastik

---

### 34. `p2-bsci-19` — Clay and Moulding Shapes

**Save as:** `style-b-p2-bsci-19.png` → `tools/image-pipeline/output/raw/style-b-p2-bsci-19.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A pair of hands gently moulding a small lump of moist clay into a simple ball and a small bowl shape on a clean surface, with a hardened, dried clay shape (e.g. a small toy animal) shown finished beside it for comparison. An adult figure present nearby. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not depict a child putting clay in their mouth or throwing clay at someone, and do not depict unclean/muddy ground clay — the module explicitly forbids putting clay in the mouth or throwing it, and specifies clean clay from an approved source.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Laka

---


## Band P3 (16 images)

### 35. `p3-bsci-01` — Classifying Living Things

**Save as:** `style-b-p3-bsci-01.png` → `tools/image-pipeline/output/raw/style-b-p3-bsci-01.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A split scene: left side shows two or three plants (e.g. maize, beans, grass) with visible roots, stem, leaves; right side shows two or three animals of different kinds (a hen, a fish in water, a goat on land) to show classification into plants vs animals, with a small habitat cue for each animal (water, land). Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No people depicted touching or handling the animals; keep the scene a calm outdoor/farm setting, not a market or slaughter context.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Tsirrai, Dabbobi

---

### 36. `p3-bsci-02` — Parts of the Body and Their Functions

**Save as:** `style-b-p3-bsci-02.png` → `tools/image-pipeline/output/raw/style-b-p3-bsci-02.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A friendly, fully-clothed child illustration (front view) actively using each named body part so its function is visually implied without any drawn line or label — eyes looking at something, ears turned toward a sound, nose near a flower, mouth smiling, hands holding a book, legs/feet standing or stepping. No pointer lines, callouts, or labels of any kind; those are added later by the overlay step. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Non-graphic, fully clothed child, no internal body parts (heart/skin layers) shown beyond a simple external labeled figure.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Idanu, Kunnuwa, Hanci, Baki, Hannu, Ƙafafu

---

### 37. `p3-bsci-03` — Growth and Life Cycles

**Save as:** `style-b-p3-bsci-03.png` → `tools/image-pipeline/output/raw/style-b-p3-bsci-03.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A three-row life-cycle diagram with looping arrows: the top row shows seed to sprout to young plant to flower/seed; the middle row shows egg to chick to hen/rooster; the bottom row shows baby to child to teenager to adult, shown as simple growth-stage silhouettes. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Human growth row must show only clothed, generic silhouettes at each age stage — no depiction of birth or medical process.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Ƙwai, Kaza

---

### 38. `p3-bsci-04` — Our Environment

**Save as:** `style-b-p3-bsci-04.png` → `tools/image-pipeline/output/raw/style-b-p3-bsci-04.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A labeled overview scene of a tidy compound/neighborhood showing a home, a school building, a well with a cover, trees, a path, and a covered waste bin — everything clean and in good repair, illustrating what makes up one's environment. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Keep the whole scene clean and undamaged (this module is about naming environment components and tidiness habits, not pollution) — no litter, no open well, no smoke.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Kwandon Shara

---

### 39. `p3-bsci-05` — The Water Cycle

**Save as:** `style-b-p3-bsci-05.png` → `tools/image-pipeline/output/raw/style-b-p3-bsci-05.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A circular water-cycle diagram: sun over a stream/pond with wavy lines rising (evaporation), rising into a cloud, cloud releasing rain onto ground/well/river, arrow looping back to the stream — plus a small inset of a covered water container for clean drinking water. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not depict anyone drinking directly from an open stream or dirty water source; show a covered container for the clean-water example.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Ƙafewa, Gajimare, Ruwan Sama

---

### 40. `p3-bsci-06` — States of Matter

**Save as:** `style-b-p3-bsci-06.png` → `tools/image-pipeline/output/raw/style-b-p3-bsci-06.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A three-panel comparison: a solid object (a stone or a book) holding its shape; water being poured from a jug into a cup, taking the cup's shape; and a light wisp of steam rising from a covered cup of warm water, showing the gas state, with a soft warning glow/steam-only depiction (no visible flame). Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No open flame or fire; do not show a child's hand near the warm water or steam — the steam panel should be a small, distant wisp only, consistent with the module using hot water only as an adult-supervised example.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Abu Mai Tauri, Ruwa, Iska

---

### 41. `p3-bsci-07` — Measuring Length and Mass

**Save as:** `style-b-p3-bsci-07.png` → `tools/image-pipeline/output/raw/style-b-p3-bsci-07.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two side-by-side panels: a ruler laid against a pencil showing a centimeter scale, and a simple balance/weighing scale with a small sack of grain on one side, both starting from a visible zero mark. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Show a child using only lightweight, simple tools (ruler, small scale) — no heavy or industrial weighing equipment, consistent with the module's advice to ask an adult for heavy tools.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Santimita, Mita, Giram, Kilogiram

---

### 42. `p3-bsci-08` — Measuring Time

**Save as:** `style-b-p3-bsci-08.png` → `tools/image-pipeline/output/raw/style-b-p3-bsci-08.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A large analog clock face with the small hour hand and large minute hand clearly distinguished by size/color, plus a small side panel showing a child watering a plant with a start-clock and end-clock pair to illustrate elapsed time. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No safety hazard content needed; keep the scene calm and ordinary (a clock and a watering task).

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Agogo

---

### 43. `p3-bsci-09` — Soil and Its Uses

**Save as:** `style-b-p3-bsci-09.png` → `tools/image-pipeline/output/raw/style-b-p3-bsci-09.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A cross-section of ground showing plant roots reaching into soil layered with tiny rock bits and decomposed leaves, beside two small soil-sample panels labeled sandy soil and clay soil, and a small inset showing soil used to make bricks and a clay pot. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Show the child observing soil only, not tasting it; include a small hand-washing cue since the module tells children to wash hands after touching soil.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Ƙasa Mai Yashi, Ƙasa Mai Laka

---

### 44. `p3-bsci-10` — Air in Motion

**Save as:** `style-b-p3-bsci-10.png` → `tools/image-pipeline/output/raw/style-b-p3-bsci-10.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two panels: a calm scene showing wind's effect — clothes flapping on a line and a toy pinwheel spinning, with a light cloth/leaf shown tilting to indicate wind direction; and a safety panel showing a child and an adult walking together toward a sturdy shelter away from a tree and a weak wall during a dust storm, covering nose and mouth. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No open flame anywhere in the image (the module warns against using fire to check wind direction); the storm panel must show the child accompanied by an adult, at a safe distance from trees and weak walls, not alone.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 45. `p3-bsci-11` — Traditional and Modern Technology

**Save as:** `style-b-p3-bsci-11.png` → `tools/image-pipeline/output/raw/style-b-p3-bsci-11.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A side-by-side comparison: left side shows traditional tools at rest (a hand hoe, a mortar and pestle, a donkey cart), right side shows modern tools at rest (a tractor, a grinding mill, a car), all shown stationary and unattended by children. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No child touching, operating, or standing close to any tool or machine; no running engine, no exposed wire or socket, no child near the grinding mill — tools shown idle only, per the module's caution.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Fartanya, Turmi da Taɓarya, Keken Jaki, Babbar Na'urar Noma, Injin Niƙa, Mota

---

### 46. `p3-bsci-12` — Light and Mirrors

**Save as:** `style-b-p3-bsci-12.png` → `tools/image-pipeline/output/raw/style-b-p3-bsci-12.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two panels: a ray from a safe classroom lamp bouncing from a fixed mirror toward an eye icon, with arrows showing the correct path; and the same upright object casting a long morning shadow and a short midday shadow, with the sun positions shown but no person looking toward the sun. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not depict anyone looking directly at the sun or angling a mirror's reflection toward another person's or animal's eyes; show the mirror handled gently, not near a fall risk of breaking.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Madubi, Inuwa

---

### 47. `p3-bsci-13` — First Aid and Safety

**Save as:** `style-b-p3-bsci-13.png` → `tools/image-pipeline/output/raw/style-b-p3-bsci-13.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A calm three-panel sequence: a child checking the area is safe and calling an adult (raised hand gesture, speech bubble toward an adult figure); an adult gently pressing a clean cloth on a child's arm (no wound visible, just the cloth and a caring expression); and an adult holding a child's hand under a running tap of cool water, with a small clock-face icon (blank hour markers, no numerals) showing time passing, for a burn. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No visible blood, open wound, burn mark, or injury detail of any kind — depict only the calm, competent care actions (checking safety, calling an adult, clean cloth, cool running water); do not show oil, toothpaste, or ice being applied; do not depict broken glass, a fallen wire, floodwater, or smoke up close — those hazards should only be implied by the child pointing/stepping away.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 48. `p3-bsci-14` — Animal Habitats and Shelters

**Save as:** `style-b-p3-bsci-14.png` → `tools/image-pipeline/output/raw/style-b-p3-bsci-14.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A set of small labeled panels: a fish with visible fins swimming in water, a duck with webbed feet on a pond, a bird's nest built in a tree holding eggs, a rabbit at the entrance of a burrow, and a farm scene with a ventilated chicken coop and a shaded goat/sheep shelter with clean water nearby. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not depict a child reaching into, disturbing, or breaking a wild animal's nest or burrow — observation only, from a distance, per the module's instruction.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Sheƙa, Rami

---

### 49. `p3-bsci-15` — Balanced Meals

**Save as:** `style-b-p3-bsci-15.png` → `tools/image-pipeline/output/raw/style-b-p3-bsci-15.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A plate divided into three labeled sections with everyday Nigerian foods: energy foods (tuwo, shinkafa, gero, dankali), body-building foods (wake, kifi, ƙwai, nama), and protective foods (alayyahu, zogale, and a fruit like lemu or ayaba), with a cup of clean water beside the plate. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Depict only ordinary, affordable, locally available foods already named in the module text — no sugary sweets/alewa shown as part of the balanced plate, and no depiction of a child's body size.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 50. `p3-bsci-16` — Plant Parts and Functions (Deeper Study)

**Save as:** `style-b-p3-bsci-16.png` → `tools/image-pipeline/output/raw/style-b-p3-bsci-16.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A labeled cross-section of a whole plant showing the root system with fine rootlets in soil, small internal transport lines running up through the stem to the leaves (with arrows showing water/nutrients moving up), a leaf catching sunlight, and a flower transitioning into a fruit (e.g. tumatir or kabewa) containing visible seeds. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No depiction of a farmer or child breaking the stem or tearing leaves — the diagram should show only the intact healthy plant and its internal pathways, not the damage scenario described in the text.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Tushe, Kara, Ganye, Fure

---


## Band P4 (21 images)

### 51. `p4-bsci-01` — Plant Groups: Trees, Shrubs, and Herbs

**Save as:** `style-b-p4-bsci-01.png` → `tools/image-pipeline/output/raw/style-b-p4-bsci-01.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Three plants at the same scale for direct comparison: a tall tree with one thick stem (mangwaro or kuka), a shrub with several woody stems branching low near the ground (lalle), and a soft-stemmed herb with a thin stem (albasa onion or alayyahu spinach). No plant is uprooted, cut, or removed. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not depict a child cutting, uprooting, or damaging any plant — the module explicitly says to observe without removing it.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Bishiya, Ƙaramar bishiya, Ganyayyaki

---

### 52. `p4-bsci-02` — Animal Groups: Vertebrates and Invertebrates

**Save as:** `style-b-p4-bsci-02.png` → `tools/image-pipeline/output/raw/style-b-p4-bsci-02.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two animal groups compared: a hen, a goat, and a fish shown with a simple backbone/spine line highlighted along the body; an earthworm, a bee, and a butterfly shown with no such spine line. The bee and worm are shown at a safe illustrative distance, not touched or held. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not depict a child touching, catching, or throwing objects at any animal, and keep the bee at a safe distance — the module explicitly warns it may sting.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Masu Ƙashin Baya, Marasa Ƙashin Baya

---

### 53. `p4-bsci-03` — Types of Soil

**Save as:** `style-b-p4-bsci-03.png` → `tools/image-pipeline/output/raw/style-b-p4-bsci-03.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Three soil samples in shallow clear trays for comparison: sandy soil with large loose grains, clay soil that clumps and sticks together, and dark loamy farming soil mixed with decayed leaf matter. A small pair of hands shown feeling one sample's texture with permission, followed by a handwashing cue. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Show only supervised soil-touching with adult permission, plus a handwashing follow-up, as the module specifies; no tasting or ingesting soil.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Ƙasa mai yashi, Ƙasa mai laka

---

### 54. `p4-bsci-04` — Soil and Farming

**Save as:** `style-b-p4-bsci-04.png` → `tools/image-pipeline/output/raw/style-b-p4-bsci-04.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A small farm scene showing an adult/farmer inspecting soil before planting, with two soil types shown side by side: sandy soil letting water drain through quickly, and clay soil holding standing water. A child clears litter from the field and carefully avoids stepping on a young seedling. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Depict only adult-led farm decisions; the child's role is limited to clearing litter and avoiding new seedlings, not operating farm tools or deciding irrigation, per the module's own framing.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 55. `p4-bsci-05` — Everyday Sources of Energy

**Save as:** `style-b-p4-bsci-05.png` → `tools/image-pipeline/output/raw/style-b-p4-bsci-05.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Four everyday energy sources shown with their effect: the sun giving light and warmth, a cooking fire tended only by an adult with a child standing back, strong wind turning a grinding mill or boat sail, and a battery powering a torch or radio. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Fire must be adult-tended only with the child at a visible safe distance; no child touching electrical items or approaching smoke, matching the module's explicit cautions.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Rana, Wuta, Iska, Baturi

---

### 56. `p4-bsci-06` — Simple Electricity Safety

**Save as:** `style-b-p4-bsci-06.png` → `tools/image-pipeline/output/raw/style-b-p4-bsci-06.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A safe battery-powered torch glowing beside a clearly marked warning icon over a wall socket and a frayed wire, contrasting what to use (torch) with what must never be touched (socket, bare wire, wet electrical item). Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No child depicted touching a socket, wire, or wet electrical item — the image must show only the safe alternative and the prohibited items marked off-limits, per the module's explicit warning.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** soket, waya, fitilar hannu

---

### 57. `p4-bsci-07` — Push and Pull

**Save as:** `style-b-p4-bsci-07.png` → `tools/image-pipeline/output/raw/style-b-p4-bsci-07.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two side-by-side panels: a child pushing a door open with an arrow showing push direction, and a child pulling a bucket of water up from a well by rope with an arrow showing pull direction. A small third panel shows a ball mid-roll to illustrate force causing motion. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No child pushing another person or animal, and no child shown pulling a heavy load alone — the module says to ask an adult for help with anything heavy.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Tura, Ja

---

### 58. `p4-bsci-08` — Movement and Friction

**Save as:** `style-b-p4-bsci-08.png` → `tools/image-pipeline/output/raw/style-b-p4-bsci-08.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A ball shown rolling a long distance on a smooth floor versus stopping quickly after a short distance on sand, with motion arrows of different lengths illustrating friction. A separate small panel shows a child's shoe with a good grippy sole beside a wet path. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No child depicted running on a wet or slippery surface — the module explicitly warns against this.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Guga

---

### 59. `p4-bsci-09` — Personal Hygiene and Health

**Save as:** `style-b-p4-bsci-09.png` → `tools/image-pipeline/output/raw/style-b-p4-bsci-09.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A four-step hygiene sequence: washing hands with soap and clean water, bathing, wearing clean clothes, and coughing into the elbow rather than the open hand, followed by handwashing. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No depiction of a sick or symptomatic child and no medical treatment shown — the module is explicit that a child's role is hygiene and telling an adult, not diagnosing or self-treating.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 60. `p4-bsci-10` — Clean Surroundings

**Save as:** `style-b-p4-bsci-10.png` → `tools/image-pipeline/output/raw/style-b-p4-bsci-10.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A clean-surroundings scene: a child placing rubbish in a covered bin rather than the road or a drain, a swept compound, and an adult clearing standing water near the house. A small inset shows broken glass being pointed out, not picked up by hand. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No child depicted picking up broken glass, sharp debris, or handling waste with bare hands — the module explicitly reserves that for an adult; the child wears shoes and reports hazards.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 61. `p4-bsci-11` — Malaria Prevention

**Save as:** `style-b-p4-bsci-11.png` → `tools/image-pipeline/output/raw/style-b-p4-bsci-11.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A child safely tucked under a properly closed mosquito net at night, with a second panel showing an adult clearing standing water near the compound to prevent mosquito breeding. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No depiction of illness symptoms, medication, or a child buying/taking medicine — the module explicitly says a child never buys or takes medicine alone.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** gidan sauro

---

### 62. `p4-bsci-12` — Preventing Diarrhoea

**Save as:** `style-b-p4-bsci-12.png` → `tools/image-pipeline/output/raw/style-b-p4-bsci-12.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A prevention sequence: handwashing with soap before eating, a covered plate of food protected from flies, and a cup of clean drinking water — three linked panels emphasizing hygiene before illness occurs. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No depiction of diarrhoea symptoms or a sick child, and no self-medication shown — the module explicitly reserves treatment decisions for an adult and health worker.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 63. `p4-bsci-13` — Weather Instruments

**Save as:** `style-b-p4-bsci-13.png` → `tools/image-pipeline/output/raw/style-b-p4-bsci-13.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple weather-station display showing a thermometer, a rain gauge collecting rainfall, and a wind vane pointing to show wind direction, each clearly separated, being observed by children from a safe distance rather than handled directly. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No child touching the instruments without permission, and no depiction of a child standing in an open field during a thunderstorm — the module explicitly warns against both.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Ma'aunin zafi, Ma'aunin ruwan sama, Alamar iska

---

### 64. `p4-bsci-14` — Keeping Weather Records

**Save as:** `style-b-p4-bsci-14.png` → `tools/image-pipeline/output/raw/style-b-p4-bsci-14.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple weather-record table with a day column and an icon column (sun, cloud, or rain) filled in for several days, shown being completed by a child looking out through a window at the sky rather than standing outside. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. The child observes from indoors or a window during any depicted rain, never standing outside during heavy rain or a thunderstorm, per the module's explicit caution.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 65. `p4-bsci-15` — Fire, Heat, and Safety

**Save as:** `style-b-p4-bsci-15.png` → `tools/image-pipeline/output/raw/style-b-p4-bsci-15.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A safe-distance cooking scene: an adult tends a small cooking fire or stove while a child stands well back at a marked safe distance. A second panel shows a child immediately walking away from a smoky doorway rather than entering, with an alert cue toward an adult. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No child near an open flame, striking a match, pouring anything on fire, or carrying hot water — all explicitly prohibited by the module; fire is adult-controlled only, symbolic and non-graphic.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Wuta

---

### 66. `p4-bsci-16` — Temporary and Permanent Changes; Heating and Cooling

**Save as:** `style-b-p4-bsci-16.png` → `tools/image-pipeline/output/raw/style-b-p4-bsci-16.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two paired comparison panels: ice melting into water and then refreezing back into ice, labelled as a change that can be reversed; beside a broken clay cup and a cooked egg, labelled as changes that are not easily reversed. Any hot material is shown only as adult-handled and distant from the child. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No child touching fire, boiling water, or hot material — an adult or teacher alone handles anything hot, per the module's explicit rule; the child only observes from a distance and records what is seen.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Ƙanƙara

---

### 67. `p4-bsci-17` — Plant and Animal Life-Cycle Changes

**Save as:** `style-b-p4-bsci-17.png` → `tools/image-pipeline/output/raw/style-b-p4-bsci-17.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two paired, arrowed life-cycle diagrams shown side by side for direct comparison: bean seed to sprout to young plant to mature plant producing new seeds; and egg to chick to hen/rooster producing new eggs. A small recording panel shows a bean seedling being measured with a ruler every two days over a week, plotted on a simple growth chart. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Non-graphic, simple stage silhouettes only — no depiction of the hatching process or animal distress; the child observes and measures, not digging up the seedling repeatedly, per the module's own caution.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Wake, Kaza

---

### 68. `p4-bsci-18` — Digestive System and Teeth

**Save as:** `style-b-p4-bsci-18.png` → `tools/image-pipeline/output/raw/style-b-p4-bsci-18.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple clothed torso outline with the food path shown from mouth through stomach and intestines in muted, subdued, non-vivid tones (soft pastel outline shapes, not saturated pink or red), plus four tooth shapes beside the mouth for cutting and grinding. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Non-graphic educational outline only; no exposed organs, procedure, or illness.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Baki, Bututun abinci, Haƙora

---

### 69. `p4-bsci-19` — How Sound Is Produced and Travels

**Save as:** `style-b-p4-bsci-19.png` → `tools/image-pipeline/output/raw/style-b-p4-bsci-19.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A vibrating drum or a stretched rubber band, held and released by a teacher (never flicked at anyone), sending visible sound-wave ripples through the air toward a listener at a measured distance. A second small panel shows a hand gently feeling the throat while speaking to sense the vibration. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No loud noise-source close to an ear, no child flicking the rubber band at anyone, and no child placing an object in the ear — matching the module's explicit cautions.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Sauti

---

### 70. `p4-bsci-20` — Vehicles, External Parts and Safe Technology Use

**Save as:** `style-b-p4-bsci-20.png` → `tools/image-pipeline/output/raw/style-b-p4-bsci-20.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A parked, stationary vehicle with five external parts visible and pointed to: wheels/tyres, headlights, mirrors, doors, and windscreen; a small cutaway shows the central connecting rod linking the wheels. A child stands at a safe distance with an adult, drawing the parts on paper rather than touching the vehicle. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Vehicle must be parked with no one inside or driving; no child touching a moving part, hot engine, battery, or wire; never label the axle as 'gatari' — use 'sandar da ke tsakiya' only, per the standing terminology ruling.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Fitilu, Madubai, gilashin gaba, sandar da ke tsakiya

---

### 71. `p4-bsci-21` — Nutrition and Healthy Growth

**Save as:** `style-b-p4-bsci-21.png` → `tools/image-pipeline/output/raw/style-b-p4-bsci-21.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A three-section plate illustration with grouped Nigerian foods: energy foods (tuwo, shinkafa, gero, doya, rogo), body-building foods (wake, ƙwai, kifi, gyada, nama), and protective foods (kabewa, alayyahu, tumatir, mangwaro, gwanda, lemu), with a cup of clean water beside the plate. A second smaller panel compares this balanced meal against a plate of biscuit and sugary drink. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Depict only ordinary, affordable local foods already named in the module; no body-size depiction of children, no shaming of either meal choice.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---


## Band P5 (15 images)

### 72. `p5-bsci-01` — Environmental Changes, Pollution, and Environmental Quality

**Save as:** `style-b-p5-bsci-01.png` → `tools/image-pipeline/output/raw/style-b-p5-bsci-01.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Side-by-side comparison scene: left half shows a clean environment (clear stream, trees, a covered waste bin, tidy path); right half shows a damaged environment (smoke, litter, a discolored stream, a dead fish). No people touching hazards. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not depict a child inside the polluted scene or touching waste/smoke/water.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Muhalli Mai Kyau, Muhalli da Ya Lalace

---

### 73. `p5-bsci-02` — Waste Disposal, Reuse, and Recycling

**Save as:** `style-b-p5-bsci-02.png` → `tools/image-pipeline/output/raw/style-b-p5-bsci-02.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Three labeled bins or piles side by side showing simple waste separation: rotting food/leaves, paper/plastic bottles, metal. A clean reused container (e.g. a jar for storage) shown separately. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Show only clean paper/plastic/metal items, no broken glass, sharp metal, or medical waste.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Abin da ke Ruɓewa, Takarda da Roba, Ƙarfe

---

### 74. `p5-bsci-03` — Human Skeleton, Joints, and Movement

**Save as:** `style-b-p5-bsci-03.png` → `tools/image-pipeline/output/raw/style-b-p5-bsci-03.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple, non-graphic outline of a human skeleton (front view) with three joints circled or highlighted: elbow, knee, shoulder. Friendly cartoon style, not anatomically explicit. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Non-graphic, no injury, no exposed internal detail beyond a simple bone outline.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Gwiwar Hannu, Gwiwa, Kafada

---

### 75. `p5-bsci-04` — Flower Parts, Pollination, and Seed and Fruit Formation

**Save as:** `style-b-p5-bsci-04.png` → `tools/image-pipeline/output/raw/style-b-p5-bsci-04.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A labeled flower illustration showing colorful petals and the central part, with a small arrow/insect (bee or butterfly) shown moving between two flowers to depict pollen transfer. A small side panel shows the flower's fruit result (e.g. tomato or mango). Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Depict the bee at a safe illustrative distance, not close to a child's hand or face.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Ganyen Fure, Sashin Tsakiya, Ƙurar Fure

---

### 76. `p5-bsci-05` — Rocks: Properties, Groups, and Uses

**Save as:** `style-b-p5-bsci-05.png` → `tools/image-pipeline/output/raw/style-b-p5-bsci-05.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A row of several different rocks of varying colour, size, and texture (smooth vs rough) laid out for comparison, plus a small inset showing rocks used in a building wall or road. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Show only smooth, blunt rocks — no sharp fragments, no quarry scene.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 77. `p5-bsci-06` — Acids, Bases, and Household Substances

**Save as:** `style-b-p5-bsci-06.png` → `tools/image-pipeline/output/raw/style-b-p5-bsci-06.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A teacher (adult) at a table demonstrating with two clearly-labeled, capped household items (e.g. a lemon and a bar of soap) at a safe distance, with children seated/watching from a distance, not touching anything. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No open containers, no child hands near the items, no chemical names beyond the two adult-known examples already in the text.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 78. `p5-bsci-07` — Materials, Maintenance, and Drawing Instruments

**Save as:** `style-b-p5-bsci-07.png` → `tools/image-pipeline/output/raw/style-b-p5-bsci-07.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A flat-lay of drawing instruments (pencil, eraser, ruler, set square) labeled with their names, plus a small side panel showing three material samples (wood, clay pot, rubber bowl). Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No sharp or powered tools depicted.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Fensir, Magogi, Ma'auni, Kusurwar Awo

---

### 79. `p5-bsci-08` — Vehicle Parts, Functions, and Safety

**Save as:** `style-b-p5-bsci-08.png` → `tools/image-pipeline/output/raw/style-b-p5-bsci-08.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A parked car or bus illustration with labeled external parts: wheel/tyre, headlight, mirror, windscreen, door, seat belt (visible through a window). A separate small icon showing 'brakes' conceptually (e.g. a stop symbol near the wheel). Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Vehicle must be parked/stationary, no people near moving parts, no engine/underside view.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Taya, Fitila, Madubi, Gilashin Gaba, Bel ɗin Zama

---

### 80. `p5-bsci-09` — Energy Conversion

**Save as:** `style-b-p5-bsci-09.png` → `tools/image-pipeline/output/raw/style-b-p5-bsci-09.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple three-panel arrow diagram: a battery connected to a torch giving off light; sunlight warming a covered water container with steam/heat wave lines rising; and a child eating from a food plate then running — arrows connecting each pair to show the energy passing from one form to the next. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No open flame, no engine, no mains socket depicted.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Batiri, Haske, Rana, Zafi, Abinci, Motsi

---

### 81. `p5-bsci-10` — Heat and Temperature

**Save as:** `style-b-p5-bsci-10.png` → `tools/image-pipeline/output/raw/style-b-p5-bsci-10.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A classroom-style thermometer illustration with a simple scale, next to two small weather-icon panels (a sunny hot day vs a cooler day) for comparison, teacher's hand holding the thermometer (not a child's). Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No fire, no boiling water, no medical thermometer used on a child unsupervised.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Na'urar Auna Zafi

---

### 82. `p5-bsci-11` — Battery, Insulated Wire, and Bulb: Simple Circuits

**Save as:** `style-b-p5-bsci-11.png` → `tools/image-pipeline/output/raw/style-b-p5-bsci-11.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple classroom circuit diagram: battery connected by insulated wire to a small bulb, forming a closed loop, bulb shown lit. A second small panel shows the same loop with a gap, bulb shown unlit, to contrast complete vs incomplete. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No wall socket, no household wiring, no exposed/damaged battery depicted.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Batiri, Waya, Fitila

---

### 83. `p5-bsci-12` — Magnets and Magnetic Materials

**Save as:** `style-b-p5-bsci-12.png` → `tools/image-pipeline/output/raw/style-b-p5-bsci-12.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A horseshoe or bar magnet shown attracting a small iron nail, with a wooden block, rubber, and paper shown nearby unaffected (small 'not attracted' indicator, e.g. a faint X or gap). Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not depict the magnet near a phone/computer/storage card, consistent with the module's own caution.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Maganadisu, Ƙusa ta Baƙin Ƙarfe

---

### 84. `p5-bsci-13` — Nutrients, Healthy Growth, and Deficiency Prevention

**Save as:** `style-b-p5-bsci-13.png` → `tools/image-pipeline/output/raw/style-b-p5-bsci-13.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A three-section plate illustration with affordable Nigerian foods grouped: grains/tubers (gero, dawa, shinkafa, rogo), protein (wake, gyada, ƙwai, kifi), and vegetables/fruit (ganye, tumatir, mangwaro). A cup of clean water beside the plate. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Depict only ordinary, affordable food items already named in the module text — no body-size depiction of children.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 85. `p5-bsci-14` — Diseases and Prevention

**Save as:** `style-b-p5-bsci-14.png` → `tools/image-pipeline/output/raw/style-b-p5-bsci-14.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple hygiene-and-prevention scene: a child washing hands with soap, a covered food plate, a mosquito net over a bed, a glass of clean water — four small linked panels. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No depiction of a sick or symptomatic child, no medical/clinical imagery, non-alarming tone throughout.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 86. `p5-bsci-15` — Harmful Substances and Drug-Awareness Safety

**Save as:** `style-b-p5-bsci-15.png` → `tools/image-pipeline/output/raw/style-b-p5-bsci-15.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple three-step safety sequence for a child: a raised hand gesture meaning 'no'; a child walking away toward safety; and a child talking to a trusted adult. No substances, packaging, or people depicted using anything. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Do not depict any substance, bottle, cigarette, or medicine — the image must show only the child's three safety actions, per the module's non-stigmatizing, substance-free framing.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Ka Ce A'a, Ka Matsa, Ka Sanar da Babba

---


## Band P6 (15 images)

### 87. `p6-bsci-01` — The Solar System and Gravity

**Save as:** `style-b-p6-bsci-01.png` → `tools/image-pipeline/output/raw/style-b-p6-bsci-01.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A schematic solar-system diagram: the Sun at the centre with the eight planets arranged in order around it (not to true scale), plus a small classroom inset showing a soft ball being dropped and falling straight down, illustrating gravity pulling objects toward Earth. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Schematic/non-realistic scale only, per the module's own caution that a classroom model cannot show true distances. No child throwing heavy objects or stones in the gravity demonstration — only a soft ball.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Rana, Duniyoyi, Ƙarfin jan Ƙasa

---

### 88. `p6-bsci-02` — Earth's Movements, Day and Night

**Save as:** `style-b-p6-bsci-02.png` → `tools/image-pipeline/output/raw/style-b-p6-bsci-02.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A ball-and-lamp classroom model showing one side of the ball lit (day) and the other in shadow (night), with a small orbit arrow showing the ball's path around the lamp; two small labeled insets show a solar eclipse (Moon between Sun and Earth) and a lunar eclipse (Earth's shadow on the Moon), depicted as simple non-realistic diagram shapes. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Depict only the classroom ball-and-lamp model, not a photorealistic Sun; no child looking directly at any bright light source, consistent with the module's explicit warning never to look directly at the Sun.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Rana, Dare, Kusufin Rana, Husufin Wata

---

### 89. `p6-bsci-03` — Weather Symbols, Climate Records, and Change

**Save as:** `style-b-p6-bsci-03.png` → `tools/image-pipeline/output/raw/style-b-p6-bsci-03.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple weather-symbol key (sun, cloud, wind, rain) beside a small weekly observation chart being filled in by a pupil from a classroom window, plus a two-panel seasonal contrast showing a greener rainy-season scene beside a drier harmattan-season scene of the same Northern Nigerian setting. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Pupil observes calmly from indoors/a window; no depiction of a child outside during storm, flood, or extreme heat, matching the module's explicit warning against going out to gather data in severe weather.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Rana, Gajimare, Iska, Ruwan sama, Damina, Rani

---

### 90. `p6-bsci-04` — Forces and Friction

**Save as:** `style-b-p6-bsci-04.png` → `tools/image-pipeline/output/raw/style-b-p6-bsci-04.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A fair-test diagram: the same small lightweight toy or blunt bottle being gently pushed across two different surfaces (e.g. smooth tile and rough mat) side by side, with a push-arrow and a distance line for each; a small separate inset shows a magnet attracting a metal paperclip without touching it. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Only a small lightweight toy or blunt bottle is pushed by hand — no vehicle, blade, heavy object, or steep/dangerous slope, matching the module's explicit restriction.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Ƙarfi, Guga

---

### 91. `p6-bsci-05` — The Heart, Blood Vessels, and Circulation

**Save as:** `style-b-p6-bsci-05.png` → `tools/image-pipeline/output/raw/style-b-p6-bsci-05.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple non-graphic schematic showing a heart shape with two labeled vessel loops (one carrying blood out, one bringing it back) in a plain body outline — not a realistic anatomical rendering; a separate small inset shows a pupil calmly resting two fingers on their own wrist beside a supervising adult, both seated, to feel a pulse. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Non-graphic, simple schematic heart/vessel outline only — no exposed internal organ realism, no blood shown flowing outside vessels. The pulse-check must show calm, seated pupils under adult supervision, not framed as a medical diagnosis, matching the module's explicit caution.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Zuciya, Jijiyoyin jini

---

### 92. `p6-bsci-06` — Puberty, Hygiene, and Body Privacy

**Save as:** `style-b-p6-bsci-06.png` → `tools/image-pipeline/output/raw/style-b-p6-bsci-06.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A fully clothed, non-anatomical diagram: a simple child-to-teen silhouette growth arrow (both figures modestly and identically dressed, no body detail shown), paired with a hygiene-items row (soap, clean folded clothes, a wash basin of water) and a small trusted-adult figure a child can walk toward — representing the module's guidance to go to a safe place and tell a trusted adult. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No depiction of any body part normally covered by clothing, no undressed or partially dressed figure, no anatomical or medical illustration. Every figure stays fully and modestly clothed throughout; the growth arrow shows only outline silhouettes, not physical development detail.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Balaga, Tsafta, Amintaccen babba

---

### 93. `p6-bsci-07` — Human Reproduction, Growth, and Development

**Save as:** `style-b-p6-bsci-07.png` → `tools/image-pipeline/output/raw/style-b-p6-bsci-07.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A purely symbolic, non-figurative diagram (in the same restrained register as a printed textbook infographic, with no body silhouette or body-like shape anywhere): a simple labeled outline for the reproductive-system layout, followed by a row of plain geometric placeholders — a small dot, then a slightly larger circle, then a larger oval, then a larger oval still — representing the stages of prenatal development purely through size progression inside a simple oval womb outline, with no curled, fetal, or body-shaped contour used at any stage. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Purely symbolic/geometric register only — no body silhouette, no fetal or figure-shaped outline of any kind at any development stage, no realistic human bodies, no nudity, no facial detail anywhere in the image, no sexual or intimate content of any kind. Every development stage must be a plain geometric shape (dot/circle/oval) distinguished only by size, never by a body-like contour. Confine the entire image to flat labeled-diagram shapes, consistent with the module's explicit instruction that this is scientific information delivered via one teacher-approved diagram, not a depiction of any real people or act.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Haihuwa, Girma

---

### 94. `p6-bsci-08` — Air Pressure and Its Uses

**Save as:** `style-b-p6-bsci-08.png` → `tools/image-pipeline/output/raw/style-b-p6-bsci-08.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Three small labeled panels: an empty capped plastic bottle resisting a gentle squeeze, a bicycle pump inflating a tyre, and a child sipping a drink through a straw — each panel shows the everyday object clearly with a simple arrow indicating air movement or pressure. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No blowing up a bottle forcefully, no heating a sealed container, and no depiction of fire or flame, matching the module's explicit prohibitions.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Matsin iska

---

### 95. `p6-bsci-09` — Nigeria's Mineral Resources and Responsible Use

**Save as:** `style-b-p6-bsci-09.png` → `tools/image-pipeline/output/raw/style-b-p6-bsci-09.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple sample-tray diagram showing a few labeled, teacher-approved mineral samples (a gold-colored nugget shape, a dark coal lump, an iron-ore rock, limestone, salt crystals, and a small sealed jar representing crude oil) beside a small responsible-use panel showing recycling and land-restoration icons. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No pupil entering a mine, touching crude oil, tasting a rock, or burning a sample — samples are shown only as classroom display items or images, matching the module's explicit restriction.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Zinariya, Kwal, Dutsen ƙarfe, Gishiri, Ɗanyen mai

---

### 96. `p6-bsci-10` — White Light, Primary Colours, and Pigments

**Save as:** `style-b-p6-bsci-10.png` → `tools/image-pipeline/output/raw/style-b-p6-bsci-10.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple prism diagram showing a beam of white light entering a triangular prism and separating into a small rainbow band on the other side, beside a separate small paint-mixing panel showing three paint blobs (red, yellow, blue) with two of them overlapping into a mixed colour — kept visually distinct from the light diagram to avoid implying the two follow the same rule. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No broken glass, no direct depiction of the Sun as a light source, and no child tasting paint or ink, matching the module's explicit prohibitions.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Farin haske, Launuka

---

### 97. `p6-bsci-11` — Drawing Instruments and Accurate Technical Lines

**Save as:** `style-b-p6-bsci-11.png` → `tools/image-pipeline/output/raw/style-b-p6-bsci-11.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A labeled flat-lay of technical drawing instruments on a desk: a ruler, a T-square, a triangular set-square, a protractor, a compass, and a divider, each clearly separated and identifiable, beside a small paper showing two measured straight lines being compared for equal length. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No child pointing a compass point at another person, no unsupervised handling of the compass tip, and instruments shown resting flat on the desk, matching the module's explicit safety note.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Rula, Ma'aunin T, Ma'aunin kusurwa, Komfas

---

### 98. `p6-bsci-12` — Hand Tools: Identification, Care, and Safety

**Save as:** `style-b-p6-bsci-12.png` → `tools/image-pipeline/output/raw/style-b-p6-bsci-12.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A labeled identification chart of hand tools grouped by function: a tape measure and ruler (measuring), a pencil and marking gauge (marking), and a saw and hand-plane (cutting/shaping), each shown resting on a workbench, not in use — a pupil in the corner is shown only pointing at and sorting picture cards of the tools, not holding any of them. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. This is a recognition-only lesson: no pupil touching, holding, or using the saw or any sharp/pointed tool — tools are shown resting on the bench or as picture cards only, matching the module's explicit restriction.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Awo, Alama, Yanka

---

### 99. `p6-bsci-13` — Maintenance, Workshop Safety, and Road Safety

**Save as:** `style-b-p6-bsci-13.png` → `tools/image-pipeline/output/raw/style-b-p6-bsci-13.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two side-by-side safety panels: a tidy workshop corner with tools stored on a rack, a warning sign, and a pupil wearing a helmet and gloves at a safe distance from any equipment; and a road-safety panel showing a pupil standing with an adult at a marked pedestrian crossing, looking both ways before crossing, with a traffic light and reflective triangle visible. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No pupil shown inside the road or operating workshop equipment; the pupil in both panels is stationary and supervised, matching the module's explicit rule against entering the road or workshop area to test anything.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Kariya, Tsallaka hanya

---

### 100. `p6-bsci-14` — Levers and Pulleys

**Save as:** `style-b-p6-bsci-14.png` → `tools/image-pipeline/output/raw/style-b-p6-bsci-14.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple labeled lever diagram (a seesaw shape marking the fulcrum, load, and effort points) beside a simple pulley diagram showing a wheel-and-rope system with a small lightweight paper-cup load, plus a small classroom inset of a pupil pointing at a paper diagram rather than lifting anything. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No pupil lifting a heavy object, standing under a suspended load, or using rope on a person — only a lightweight paper-cup load and a paper diagram are shown, matching the module's explicit restriction.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Madogara, Kaya, Turawa

---

### 101. `p6-bsci-15` — Inclined Planes and P6 Science Consolidation

**Save as:** `style-b-p6-bsci-15.png` → `tools/image-pipeline/output/raw/style-b-p6-bsci-15.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple fair-test diagram of two ramps at different slopes (a gentle ramp and a steeper ramp) made from classroom boxes, with the same lightweight, blunt toy being pushed up each and a small results table icon beside it; a small summary wheel in the corner connects icons back to a few of the term's topics (a ball for gravity, a heart for circulation, a prism for light) as a gentle recap motif. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No pupil climbing or standing on the test ramp, no heavy load, and no real road or construction site depicted — only classroom boxes and a lightweight toy, matching the module's explicit restriction.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Gangara, Ƙarfi

---
