# Style B — Nursery 1/2 Mathematics — ChatGPT-pasteable prompt set

Generated directly from the approved image-needs manifests (`tools/image-manifest/n1-maths-image-manifest.json`, `n2-maths-image-manifest.json`) using the Style B prompt template locked 2026-07-12, including the mosque-architecture exclusion clause added after the Basic Science P1-P6 batch found the model inserting unrequested mosque details into backgrounds.

**Workflow per image:**
1. Copy the "Prompt" text into ChatGPT.
2. Copy the "Avoid" text as a follow-up instruction (or append it to the prompt as "Avoid: ...").
3. Download the result and save it under `tools/image-pipeline/output/raw/` with the **exact filename** given (do not rename).
4. Once a band (or the whole set) is done, tell Claude — QA review, overlay compositing, and guarded promotion into `app/images/` happen after.

---

## Band Nursery 1 (12 images)

### 1. `n1-maths-01` — Counting 1–5

**Save as:** `style-b-n1-maths-01.png` → `tools/image-pipeline/output/raw/style-b-n1-maths-01.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Exactly five identical smooth counting stones in one spacious left-to-right row, each clearly separated for touching and counting, with ample blank space around the row for the overlay layer; no printed numerals, letters, or symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** none

---

### 2. `n1-maths-02` — Writing 1–5

**Save as:** `style-b-n1-maths-02.png` → `tools/image-pipeline/output/raw/style-b-n1-maths-02.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Exactly five identical smooth counting stones in one clear row above five wide, empty tracing spaces, cueing a one-to-one writing activity while leaving room for the overlay layer; no printed numerals, letters, or symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** none

---

### 3. `n1-maths-03` — Circle & Square

**Save as:** `style-b-n1-maths-03.png` → `tools/image-pipeline/output/raw/style-b-n1-maths-03.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. One large solid-colour circle beside one large solid-colour square, each with a thick high-contrast outline and generous blank space between them; show no other shapes and render no printed numerals, letters, or symbols. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** none

---

### 4. `n1-maths-04` — Big & Small

**Save as:** `style-b-n1-maths-04.png` → `tools/image-pipeline/output/raw/style-b-n1-maths-04.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A very large plain table and a very small plain spoon side by side on a simple background, with the size difference unmistakable and blank space for the overlay layer; no printed numerals, letters, or symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** none

---

### 5. `n1-maths-05` — Counting 6–10

**Save as:** `style-b-n1-maths-05.png` → `tools/image-pipeline/output/raw/style-b-n1-maths-05.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Exactly ten identical smooth counting stones arranged as two widely spaced rows of five, with a clear counting direction and ample blank space for the overlay layer; no printed numerals, letters, or symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** none

---

### 6. `n1-maths-06` — Writing 6–10

**Save as:** `style-b-n1-maths-06.png` → `tools/image-pipeline/output/raw/style-b-n1-maths-06.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Exactly ten identical smooth counting stones arranged as two clear rows of five above five wide, empty tracing spaces, cueing the 6–10 writing activity while leaving room for the overlay layer; no printed numerals, letters, or symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** none

---

### 7. `n1-maths-07` — Triangle & Rectangle

**Save as:** `style-b-n1-maths-07.png` → `tools/image-pipeline/output/raw/style-b-n1-maths-07.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. One large solid-colour triangle beside one large solid-colour rectangle, each with a thick high-contrast outline and generous blank space between them; show no other shapes and render no printed numerals, letters, or symbols. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** none

---

### 8. `n1-maths-08` — Long & Short

**Save as:** `style-b-n1-maths-08.png` → `tools/image-pipeline/output/raw/style-b-n1-maths-08.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. One long straight wooden stick and one much shorter straight wooden stick laid parallel side by side, with their ends aligned so the length contrast is immediate and ample blank space for the overlay layer; no printed numerals, letters, or symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** none

---

### 9. `n1-maths-09` — More & Less (1–5)

**Save as:** `style-b-n1-maths-09.png` → `tools/image-pipeline/output/raw/style-b-n1-maths-09.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two matching plain bowls side by side: the first holds exactly five kola nuts and the second holds exactly two kola nuts, with clear separation and blank space for the overlay layer; no printed numerals, letters, or symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** none

---

### 10. `n1-maths-10` — Inside & Outside

**Save as:** `style-b-n1-maths-10.png` → `tools/image-pipeline/output/raw/style-b-n1-maths-10.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A wide open plain box containing one simple toy block, with an identical toy block placed clearly outside beside it, so both positions are visible in one frame; no printed numerals, letters, or symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** none

---

### 11. `n1-maths-11` — Patterns (ABAB)

**Save as:** `style-b-n1-maths-11.png` → `tools/image-pipeline/output/raw/style-b-n1-maths-11.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A single left-to-right repeating sequence of four large objects: a red circle, a blue square, a red circle, and a blue square, with generous blank space after the sequence for the overlay layer; no printed numerals, letters, or symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** none

---

### 12. `n1-maths-12` — Review 1–10

**Save as:** `style-b-n1-maths-12.png` → `tools/image-pipeline/output/raw/style-b-n1-maths-12.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A light, spacious review collage with exactly five identical counting stones in a row, one large circle, and one long stick beside one short stick, keeping each concept separate and easy to scan; no printed numerals, letters, or symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** none

---

## Band Nursery 2 (12 images)

### 13. `n2-maths-01` — Counting 1–15

**Save as:** `style-b-n2-maths-01.png` → `tools/image-pipeline/output/raw/style-b-n2-maths-01.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Exactly fifteen identical smooth counting stones arranged as three widely spaced rows of five, with a clear left-to-right counting direction and ample blank space for the overlay layer; no printed numerals, letters, or symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** none

---

### 14. `n2-maths-02` — Writing 1–15

**Save as:** `style-b-n2-maths-02.png` → `tools/image-pipeline/output/raw/style-b-n2-maths-02.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Exactly fifteen identical smooth counting stones arranged as three clear rows of five above five wide, empty tracing spaces, cueing the 1–15 writing activity while leaving room for the overlay layer; no printed numerals, letters, or symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** none

---

### 15. `n2-maths-03` — Heavy & Light

**Save as:** `style-b-n2-maths-03.png` → `tools/image-pipeline/output/raw/style-b-n2-maths-03.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. One large plain stone beside one small feather, both isolated on the same simple background with a visibly strong weight contrast and blank space for the overlay layer; no printed numerals, letters, or symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** none

---

### 16. `n2-maths-04` — Position: On/Under

**Save as:** `style-b-n2-maths-04.png` → `tools/image-pipeline/output/raw/style-b-n2-maths-04.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A plain low table with one simple ball clearly on its tabletop and an identical ball clearly under it, both fully visible in the same frame with blank space for the overlay layer; no printed numerals, letters, or symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** none

---

### 17. `n2-maths-05` — Counting 1–20

**Save as:** `style-b-n2-maths-05.png` → `tools/image-pipeline/output/raw/style-b-n2-maths-05.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Exactly twenty identical smooth counting stones arranged as four widely spaced rows of five, with a clear left-to-right counting direction and ample blank space for the overlay layer; no printed numerals, letters, or symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** none

---

### 18. `n2-maths-06` — Addition 1–5 (objects)

**Save as:** `style-b-n2-maths-06.png` → `tools/image-pipeline/output/raw/style-b-n2-maths-06.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Exactly two kola nuts in one small group and exactly three matching kola nuts in a second small group, visually gathered into one final group of exactly five, with blank space for the overlay layer; no printed numerals, letters, equation signs, or symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** none

---

### 19. `n2-maths-07` — Subtraction 1–5 (take away)

**Save as:** `style-b-n2-maths-07.png` → `tools/image-pipeline/output/raw/style-b-n2-maths-07.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Exactly five kola nuts in one clear starting row, with exactly two gently moved aside and exactly three left together as the remainder, making the take-away action visible without a person; no printed numerals, letters, equation signs, or symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** none

---

### 20. `n2-maths-08` — Sorting by colour

**Save as:** `style-b-n2-maths-08.png` → `tools/image-pipeline/output/raw/style-b-n2-maths-08.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Four identical round counters sorted into two clearly separated colour groups: exactly two red counters together and exactly two blue counters together, with blank space for the overlay layer; no printed numerals, letters, or symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** none

---

### 21. `n2-maths-09` — Full & Empty

**Save as:** `style-b-n2-maths-09.png` → `tools/image-pipeline/output/raw/style-b-n2-maths-09.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two matching transparent plain bowls side by side: one visibly full of water and the other completely empty, with the contrast immediate and blank space for the overlay layer; no printed numerals, letters, or symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** none

---

### 22. `n2-maths-10` — Number patterns (1 more)

**Save as:** `style-b-n2-maths-10.png` → `tools/image-pipeline/output/raw/style-b-n2-maths-10.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Five clearly separated left-to-right groups of identical small stones containing exactly one, then two, then three, then four, then five stones, showing the module's one-more sequence with blank space for the overlay layer; no printed numerals, letters, or symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** none

---

### 23. `n2-maths-11` — Simple word problems

**Save as:** `style-b-n2-maths-11.png` → `tools/image-pipeline/output/raw/style-b-n2-maths-11.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple two-part object scene: exactly two plain chairs together with one matching chair added to make three, beside exactly four kola nuts with one moved aside and three remaining, all with ample blank space for the overlay layer; no printed numerals, letters, equation signs, or symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** none

---

### 24. `n2-maths-12` — Review & celebration

**Save as:** `style-b-n2-maths-12.png` → `tools/image-pipeline/output/raw/style-b-n2-maths-12.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A light, spacious review collage with exactly five counting stones in a row, one large stone beside one feather, and a plain table with one ball on top, keeping the three concepts separate and easy to scan; no printed numerals, letters, equation signs, or symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** none

---
