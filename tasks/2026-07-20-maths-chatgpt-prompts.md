# Style B — Mathematics P1–P6 — ChatGPT-pasteable prompt set

Generated directly from the approved image-needs manifests (`tools/image-manifest/`) using the Style B
prompt template locked 2026-07-12 and confirmed working across the Social Studies P3–P6 production run
and the P3 maths pilot.

**Workflow per image:**
1. Copy the "Prompt" text into ChatGPT.
2. Copy the "Avoid" text as a follow-up instruction (or append it to the prompt as "Avoid: ...").
3. Download the result and save it under `tools/image-pipeline/output/raw/` with the **exact filename** given (do not rename).
4. Once a band (or the whole subject) is done, tell Claude — QA review, overlay compositing, and guarded promotion into `app/images/` happen after.

**Recommended order:** one band at a time, reviewing each band's results before starting the next.


## Band P1 (24 images)

### 1. `p1-maths-01` — Counting 1–10

**Save as:** `style-b-p1-maths-01.png` → `tools/image-pipeline/output/raw/style-b-p1-maths-01.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Ten familiar counters (e.g. small stones or seeds) arranged in one clear row in counting order, with a small blank space left beside each counter for its numeral to be added later; no place-value or comparison symbols, and no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Use uncluttered, age-appropriate classroom objects; avoid branded products and unnecessary text.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 2. `p1-maths-02` — Counting 11–20

**Save as:** `style-b-p1-maths-02.png` → `tools/image-pipeline/output/raw/style-b-p1-maths-02.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A number path of ten evenly spaced blank stepping-stones, with a small object (book or chair) beside several of them, and one stepping-stone near the middle marked with a plain circle outline as the module's callout position — no numerals written on the path. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 3. `p1-maths-03` — Counting 21–30

**Save as:** `style-b-p1-maths-03.png` → `tools/image-pipeline/output/raw/style-b-p1-maths-03.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A single continuous winding dirt pathway crossing a small stream — a smooth, unbroken path rather than discrete countable stepping-stones — with light texture marks like pebbles or grass tufts along its edges purely as decoration, not meant to be individually counted. Mark roughly the last fifth of the path with a small connecting arrow to indicate the module's own callout transition near the end of the path. No numerals written anywhere on the path. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 4. `p1-maths-04` — Counting 31–40

**Save as:** `style-b-p1-maths-04.png` → `tools/image-pipeline/output/raw/style-b-p1-maths-04.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A number path of ten evenly spaced blank number-tiles laid along a garden path, with the last two tiles visually joined by a small connecting arrow to mark the module's own callout transition; no numerals written on the path. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 5. `p1-maths-05` — Counting 41–50

**Save as:** `style-b-p1-maths-05.png` → `tools/image-pipeline/output/raw/style-b-p1-maths-05.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A number path of ten evenly spaced blank wooden number-blocks arranged along a low classroom shelf, with the last two blocks visually joined by a small connecting arrow to mark the module's own callout transition; no numerals written on the path. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 6. `p1-maths-06` — Place Value (Tens & Units)

**Save as:** `style-b-p1-maths-06.png` → `tools/image-pipeline/output/raw/style-b-p1-maths-06.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two labelled-but-blank boxes, tens and units, each holding a distinct bundled-stick group — a bundle of ten sticks in the tens box, a few loose single sticks in the units box — beside a second identical pair of boxes with the stick bundles swapped between them, showing that swapping the groups changes the total; no numerals rendered anywhere. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Goma, Guda

---

### 7. `p1-maths-07` — Greater Than & Less Than

**Save as:** `style-b-p1-maths-07.png` → `tools/image-pipeline/output/raw/style-b-p1-maths-07.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two side-by-side object-count comparisons using matching small counted objects (e.g. seed pods): one pair shows a visibly larger group beside a visibly smaller group, the second pair shows a different size difference, with a blank gap left between each pair for the comparison symbol to be added later; no numerals or comparison symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 8. `p1-maths-08` — Odd & Even Numbers

**Save as:** `style-b-p1-maths-08.png` → `tools/image-pipeline/output/raw/style-b-p1-maths-08.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two object-grouping panels using the same kind of small object (pencils): one panel shows a group splitting into two rows with a single item left over and circled (odd), the other shows a different-sized group splitting evenly into two equal rows with nothing left over (even); no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 9. `p1-maths-09` — Addition Without Carrying

**Save as:** `style-b-p1-maths-09.png` → `tools/image-pipeline/output/raw/style-b-p1-maths-09.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple combining scene: one small cluster of dots being pushed together with a second smaller cluster of dots into one larger cluster, shown beside a matching version using pencils being gathered together the same way; no numerals or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 10. `p1-maths-10` — Addition With Carrying

**Save as:** `style-b-p1-maths-10.png` → `tools/image-pipeline/output/raw/style-b-p1-maths-10.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A combining-and-regrouping scene: a cluster of loose dots being combined with a second cluster, with ten of the combined dots visibly circled into one bundled group and a few loose dots left beside it, showing the physical regrouping-into-a-bundle action; no numerals or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 11. `p1-maths-11` — Subtraction Without Carrying

**Save as:** `style-b-p1-maths-11.png` → `tools/image-pipeline/output/raw/style-b-p1-maths-11.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A take-away scene: a row of pencils with several of them crossed out or covered by a small cloth, leaving the remaining pencils clearly visible and uncovered; no numerals or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 12. `p1-maths-12` — Revision and Assessment

**Save as:** `style-b-p1-maths-12.png` → `tools/image-pipeline/output/raw/style-b-p1-maths-12.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A calm, confident child working through a worksheet that mixes counting, addition, and subtraction questions, with a teacher nearby offering quiet encouragement. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Depict the child calm and confident, not anxious or stressed — the module frames this as ordinary review, not a frightening test.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 13. `p1-maths-13` — Counting 51–70

**Save as:** `style-b-p1-maths-13.png` → `tools/image-pipeline/output/raw/style-b-p1-maths-13.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A number path of blank stepping-stones, with three consecutive stepping-stones visually joined by a connecting arrow to mark the module's own callout transition; no numerals written on the path. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 14. `p1-maths-14` — Introduction to Multiplication

**Save as:** `style-b-p1-maths-14.png` → `tools/image-pipeline/output/raw/style-b-p1-maths-14.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Three identical small groups of balls arranged side by side, each group holding the same number of balls, with a small blank equation-shaped placeholder box beside them where the matching multiplication sentence will be added later; no numerals or operator symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 15. `p1-maths-15` — Introduction to Division

**Save as:** `style-b-p1-maths-15.png` → `tools/image-pipeline/output/raw/style-b-p1-maths-15.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A fair-sharing scene: a small pile of items being distributed one at a time into bowls held by several children, ending with every child holding the same visible amount; no numerals rendered, only the physical fair-sharing action and equal outcome. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 16. `p1-maths-16` — Fractions (½ and ¼)

**Save as:** `style-b-p1-maths-16.png` → `tools/image-pipeline/output/raw/style-b-p1-maths-16.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A round plate coloured half one colour and half another to show rabi (half), beside a second identical plate divided into four equal coloured wedges to show rubu'i (quarter); no numerals or fraction symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Rabi, Rubu'i

---

### 17. `p1-maths-17` — Money – Identifying Naira and Kobo

**Save as:** `style-b-p1-maths-17.png` → `tools/image-pipeline/output/raw/style-b-p1-maths-17.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Five schematic Nigerian naira notes of visibly different sizes and colours arranged in ascending size order on a flat surface, each note's face left blank for its value to be added later, plus a small separate stack of coins beside them; no printed numerals or currency symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Use generic educational currency representations, not photorealistic banknote reproductions.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 18. `p1-maths-18` — Money – Addition and Change

**Save as:** `style-b-p1-maths-18.png` → `tools/image-pipeline/output/raw/style-b-p1-maths-18.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A market scene: a seller placing two schematic naira notes of different colours together, beside a second panel showing a customer's larger note being exchanged for a small item with a few coins returned as change; notes and coins shown as blank coloured shapes distinguished only by size, no printed value or symbol rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Use generic educational currency representations, not photorealistic banknote reproductions.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 19. `p1-maths-19` — Length (Metres and Centimetres)

**Save as:** `style-b-p1-maths-19.png` → `tools/image-pipeline/output/raw/style-b-p1-maths-19.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A metre tape measuring a table's length, beside a small comparison panel showing two lengths of rope laid side by side, one visibly longer than the other; no numerals or unit labels rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Mita, Santimita

---

### 20. `p1-maths-20` — Capacity (Litres)

**Save as:** `style-b-p1-maths-20.png` → `tools/image-pipeline/output/raw/style-b-p1-maths-20.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A bottle shown half full beside the same bottle shown completely full, with a small side comparison of two differently sized containers, one visibly larger than the other; no numerals or unit labels rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Lita

---

### 21. `p1-maths-21` — Weight (Kilograms)

**Save as:** `style-b-p1-maths-21.png` → `tools/image-pipeline/output/raw/style-b-p1-maths-21.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple balance scale comparing two sacks of rice of visibly different sizes, tipping toward the heavier, larger sack; no numerals or unit labels rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Kilogiram

---

### 22. `p1-maths-22` — Time – Days, Weeks, and Hours

**Save as:** `style-b-p1-maths-22.png` → `tools/image-pipeline/output/raw/style-b-p1-maths-22.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A seven-day week strip shown as seven blank equal segments in a row, beside an analog clock face with blank hour markers (no numerals) and its hour and minute hands positioned to show the module's example time. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 23. `p1-maths-23` — 2D and 3D Shapes

**Save as:** `style-b-p1-maths-23.png` → `tools/image-pipeline/output/raw/style-b-p1-maths-23.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Flat shapes — a triangle, a square, and a circle — shown beside solid shapes — a cube like a box and a sphere like a ball — to compare two-face and three-face shapes directly. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Alwatika, Murabba'i

---

### 24. `p1-maths-24` — Data Collection and Pictographs

**Save as:** `style-b-p1-maths-24.png` → `tools/image-pipeline/output/raw/style-b-p1-maths-24.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple pictograph with two rows — fish and meat — each showing a count of small icon symbols representing classmates' food preferences collected and tallied. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---


## Band P2 (24 images)

### 25. `p2-maths-01` — Numbers 1 to 100

**Save as:** `style-b-p2-maths-01.png` → `tools/image-pipeline/output/raw/style-b-p2-maths-01.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A number-chart grid of blank equal cells with one cell marked by a plain circle outline as the module's callout position, plus a small side panel showing two simple handwritten-style digit-shape outlines placed side by side to illustrate how alike two digit shapes can look if not written carefully; no legible numerals actually rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 26. `p2-maths-02` — Counting Forward and Backward

**Save as:** `style-b-p2-maths-02.png` → `tools/image-pipeline/output/raw/style-b-p2-maths-02.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two number paths of blank stepping-stones: one with a forward-pointing arrow running left to right, one with a backward-pointing arrow running right to left; no numerals written on either path. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 27. `p2-maths-03` — Place Value: Tens and Units

**Save as:** `style-b-p2-maths-03.png` → `tools/image-pipeline/output/raw/style-b-p2-maths-03.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two labelled-but-blank boxes, tens and units, each holding a distinct bundled-stick group, beside a second identical pair of boxes with the stick bundles swapped between them, showing that swapping the groups changes the total; no numerals rendered anywhere. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Goma, Ɗaya-Ɗaya

---

### 28. `p2-maths-04` — Comparing Numbers

**Save as:** `style-b-p2-maths-04.png` → `tools/image-pipeline/output/raw/style-b-p2-maths-04.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A basket of eggs compared to a smaller basket of eggs with a blank comparison-symbol gap between them, beside a second panel comparing two bundled-stick tens-groups of different sizes with the larger one visually emphasised; no numerals or comparison symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 29. `p2-maths-05` — Ordering Numbers

**Save as:** `style-b-p2-maths-05.png` → `tools/image-pipeline/output/raw/style-b-p2-maths-05.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Three blank number cards arranged with an upward arrow showing ascending order, beside three blank number cards arranged with a downward arrow showing descending order; no numerals written on any card. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 30. `p2-maths-06` — Addition Without Regrouping

**Save as:** `style-b-p2-maths-06.png` → `tools/image-pipeline/output/raw/style-b-p2-maths-06.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple addition board with tens and units columns, each column holding bundled-stick groups being combined, the columns left blank for their totals to be added later; no numerals or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 31. `p2-maths-07` — Addition With Regrouping

**Save as:** `style-b-p2-maths-07.png` → `tools/image-pipeline/output/raw/style-b-p2-maths-07.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A number-line addition shown as a blank stepping-stone path with two connected forward jumps marked by curved arrows, illustrating the make-a-ten strategy step by step; no numerals rendered on the line. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 32. `p2-maths-08` — Subtraction Without Borrowing

**Save as:** `style-b-p2-maths-08.png` → `tools/image-pipeline/output/raw/style-b-p2-maths-08.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A subtraction comparison using bundled-stick tens groups and loose unit counters, with several unit counters crossed out and the remaining counters clearly visible, shown beside a second matching vertical column-board with ones aligned; no numerals or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Use uncluttered, age-appropriate classroom objects; avoid branded products and unnecessary text.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 33. `p2-maths-09` — Subtraction With Borrowing

**Save as:** `style-b-p2-maths-09.png` → `tools/image-pipeline/output/raw/style-b-p2-maths-09.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A worked subtraction scene: one ten-bundle of sticks being broken apart into loose single sticks and combined with existing loose sticks, then several of the combined loose sticks crossed out, leaving the remaining sticks clearly visible alongside the untouched ten-bundle; no numerals or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 34. `p2-maths-10` — Word Problems: Addition

**Save as:** `style-b-p2-maths-10.png` → `tools/image-pipeline/output/raw/style-b-p2-maths-10.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A word-problem scene: a basket of mangoes with a mother adding a few more mangoes to it, the combined total left visually countable but without any written total; no numerals or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 35. `p2-maths-11` — Word Problems: Subtraction

**Save as:** `style-b-p2-maths-11.png` → `tools/image-pipeline/output/raw/style-b-p2-maths-11.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A word-problem scene: a child with a pile of balls giving some to a friend, with the remaining balls clearly visible and countable; no numerals or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 36. `p2-maths-12` — Skip Counting by 2

**Save as:** `style-b-p2-maths-12.png` → `tools/image-pipeline/output/raw/style-b-p2-maths-12.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A number path of blank stepping-stones with a pair of shoes shown beside each one, representing counting things that naturally come in twos; no numerals written on the path. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 37. `p2-maths-13` — Skip Counting by 5

**Save as:** `style-b-p2-maths-13.png` → `tools/image-pipeline/output/raw/style-b-p2-maths-13.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A number path of blank stepping-stones with a small group of five schematic coins shown beside each one; no numerals or currency symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Use generic educational currency representations, not photorealistic banknote reproductions.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 38. `p2-maths-14` — Skip Counting by 10

**Save as:** `style-b-p2-maths-14.png` → `tools/image-pipeline/output/raw/style-b-p2-maths-14.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Bundles of ten pencils being counted out in a row, beside a small separate side panel showing exactly three identical plain blank round stepping-stone shapes in a row (not pencils, not erasers, not any other object — plain round stones only), with the rightmost stone's position visually emphasised by a soft highlight glow to show the tens-place changing while the others stay visually plain; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 39. `p2-maths-15` — Introduction to Multiplication

**Save as:** `style-b-p2-maths-15.png` → `tools/image-pipeline/output/raw/style-b-p2-maths-15.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Three groups of two balls each, arranged side by side, with a small blank equation-shaped placeholder box beside them where the matching multiplication sentence will be added later; no numerals or operator symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 40. `p2-maths-16` — Multiplication by 2

**Save as:** `style-b-p2-maths-16.png` → `tools/image-pipeline/output/raw/style-b-p2-maths-16.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Four children, each with their two eyes lightly marked, shown together in one row; no numerals or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 41. `p2-maths-17` — Multiplication by 5

**Save as:** `style-b-p2-maths-17.png` → `tools/image-pipeline/output/raw/style-b-p2-maths-17.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Four raised hands each showing five fingers, shown together in one row, beside a small group of three schematic coins; no numerals, equation symbols, or currency symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Use generic educational currency representations, not photorealistic banknote reproductions.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 42. `p2-maths-18` — Multiplication by 10

**Save as:** `style-b-p2-maths-18.png` → `tools/image-pipeline/output/raw/style-b-p2-maths-18.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Four bundles of ten pencils each, shown together in one row, with a small blank note-card beside them where the multiplication sentence will be added later; no numerals or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 43. `p2-maths-19` — Nigerian Money: Naira and Kobo

**Save as:** `style-b-p2-maths-19.png` → `tools/image-pipeline/output/raw/style-b-p2-maths-19.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Four schematic Nigerian naira notes of visibly different sizes and colours arranged in order, with a small schematic coin shown separately beside them; no printed numerals or currency symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Use generic educational currency representations, not photorealistic banknote reproductions; depict money as something to be cared for, not wasted or taken from someone else, per the module's own framing.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 44. `p2-maths-20` — Adding Small Amounts of Money

**Save as:** `style-b-p2-maths-20.png` → `tools/image-pipeline/output/raw/style-b-p2-maths-20.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A market scene showing a schematic sweet and a schematic biscuit being combined into one small pile, with a blank addition-sentence placeholder shown beside them; no numerals, currency symbols, or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Use generic educational currency representations, not photorealistic banknote reproductions.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 45. `p2-maths-21` — Length: Long and Short

**Save as:** `style-b-p2-maths-21.png` → `tools/image-pipeline/output/raw/style-b-p2-maths-21.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A long stick compared to a short spoon, both starting from the same baseline, beside two lines of different lengths also starting from the same point for direct comparison. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 46. `p2-maths-22` — Weight: Heavy and Light

**Save as:** `style-b-p2-maths-22.png` → `tools/image-pipeline/output/raw/style-b-p2-maths-22.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A stone weighed against a sheet of paper (the stone heavier), and an empty bucket compared with a full water bucket (the full one heavier), with a small note showing a child asking an adult for help lifting something very heavy. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No child depicted lifting a heavy object alone — the module explicitly says to ask an adult for help with anything very heavy.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 47. `p2-maths-23` — Shapes Around Us

**Save as:** `style-b-p2-maths-23.png` → `tools/image-pipeline/output/raw/style-b-p2-maths-23.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Four everyday objects matched to their shapes: a plate (circle), floor tiles (square), a door (rectangle), and a roof (triangle). Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Da’ira, Murabba’i, Alwatika

---

### 48. `p2-maths-24` — Telling Time: Hour and Half Hour

**Save as:** `style-b-p2-maths-24.png` → `tools/image-pipeline/output/raw/style-b-p2-maths-24.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two analog clock faces side by side, both with blank hour markers (no numerals). Both clocks' hour hands must point in exactly the same direction and rest at exactly the same angle on the clock face — verify the two hour hands match before finishing. The only difference between the two clocks is the minute hand: the left clock's minute hand points straight up, the right clock's minute hand points straight down — this is the only visual difference between the two clocks, used to distinguish a whole hour from a half hour. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---


## Band P3 (24 images)

### 49. `p3-maths-01` — Numbers to 1,000 and Place Value

**Save as:** `style-b-p3-maths-01.png` → `tools/image-pipeline/output/raw/style-b-p3-maths-01.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A place-value chart with three labelled-but-blank columns — hundreds, tens, ones — each column left empty for its digit to be added later, beside a small sack-of-millet icon being counted out in three groups of decreasing size to match the module's own market analogy; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** daruruwa, gommai, ɗaya-ɗaya

---

### 50. `p3-maths-02` — Addition with Regrouping

**Save as:** `style-b-p3-maths-02.png` → `tools/image-pipeline/output/raw/style-b-p3-maths-02.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A vertical addition board with blank ones and tens columns for two numbers being combined, with a small curved arrow showing a carried group moving from the ones column to the tens column; no numerals or equation symbols rendered — this matches the already-accepted style of the P3 maths pilot image. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 51. `p3-maths-03` — Subtraction with Regrouping

**Save as:** `style-b-p3-maths-03.png` → `tools/image-pipeline/output/raw/style-b-p3-maths-03.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A vertical subtraction board with blank ones and tens columns, showing one ten-bundle being broken apart and moved into the ones column to allow the subtraction, beside the module's own money-framing shown as two schematic naira notes; no numerals, equation symbols, or currency symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 52. `p3-maths-04` — Multiplication Tables 2, 3, 4, 5, and 10

**Save as:** `style-b-p3-maths-04.png` → `tools/image-pipeline/output/raw/style-b-p3-maths-04.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Three equal groups of four water bottles arranged side by side, each bottle a plain schematic shape, beside a small blank price-tag placeholder on one bottle; no numerals, equation symbols, or currency symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 53. `p3-maths-05` — Introduction to Division

**Save as:** `style-b-p3-maths-05.png` → `tools/image-pipeline/output/raw/style-b-p3-maths-05.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A fair-sharing scene: a pile of sweets being distributed equally among ten children, each ending with the same small visible amount, with a small curved arrow connecting this scene to a blank multiplication-sentence placeholder beside it; no numerals or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 54. `p3-maths-06` — Simple Fractions: Half and Quarter

**Save as:** `style-b-p3-maths-06.png` → `tools/image-pipeline/output/raw/style-b-p3-maths-06.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A round loaf of bread split into two equal halves (labelled rabi) beside a second identical loaf split into four equal quarters (labelled kwata), plus a small panel showing a pile of oranges being shared equally between two children; no numerals or fraction symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Rabi, Kwata

---

### 55. `p3-maths-07` — Comparing and Ordering Numbers to 1,000

**Save as:** `style-b-p3-maths-07.png` → `tools/image-pipeline/output/raw/style-b-p3-maths-07.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two stacked place-value charts, each with blank hundreds/tens/ones columns, with the hundreds column of each chart visually emphasised (e.g. a soft highlight box) and a blank comparison-symbol gap between them; no numerals or comparison symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 56. `p3-maths-08` — Even and Odd Numbers

**Save as:** `style-b-p3-maths-08.png` → `tools/image-pipeline/output/raw/style-b-p3-maths-08.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two labelled columns of small object-groups: one column shows several groups splitting evenly into pairs with no remainder (even), the other shows several groups each leaving one unpaired item (odd) — a small circle marks the odd one out in each group; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 57. `p3-maths-09` — Counting in 2s, 5s, 10s, and 100s

**Save as:** `style-b-p3-maths-09.png` → `tools/image-pipeline/output/raw/style-b-p3-maths-09.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Four short stepping-stone number paths shown stacked, each path's constant jump size marked with a small arrow between consecutive stones, the paths' jump sizes visually distinguished by spacing rather than any written numeral; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 58. `p3-maths-10` — Money: Naira, Kobo, and Simple Totals

**Save as:** `style-b-p3-maths-10.png` → `tools/image-pipeline/output/raw/style-b-p3-maths-10.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A market scene with naira notes and coins being counted and combined into small piles by a seller and buyer, shown as schematic coloured shapes; no numerals or currency symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Use generic educational currency representations, not photorealistic banknote reproductions, and no branded goods.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 59. `p3-maths-11` — Giving Change

**Save as:** `style-b-p3-maths-11.png` → `tools/image-pipeline/output/raw/style-b-p3-maths-11.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A market stall scene: an item with a small blank price tag, a schematic naira note handed over by a customer, and a few schematic coins being returned as change by the seller; no numerals, equation symbols, or currency symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Use generic educational currency representations, not photorealistic banknote reproductions, and no branded goods.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 60. `p3-maths-12` — Time to the Hour, Half-Hour, and Quarter-Hour

**Save as:** `style-b-p3-maths-12.png` → `tools/image-pipeline/output/raw/style-b-p3-maths-12.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two large analog clock faces and a simple daily schedule illustrating “Time to the Hour, Half-Hour, and Quarter-Hour”; hour and minute hands are visually distinct and point exactly to the stated times. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Use uncluttered, age-appropriate classroom objects; avoid branded products and unnecessary text.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 61. `p3-maths-13` — Length: Metre and Centimetre

**Save as:** `style-b-p3-maths-13.png` → `tools/image-pipeline/output/raw/style-b-p3-maths-13.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A metre-length rope or table edge measured with a metre stick, beside a pencil measured with a small ruler; no numerals or unit labels rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Mita, Santimita

---

### 62. `p3-maths-14` — Weight: Kilogram and Gram

**Save as:** `style-b-p3-maths-14.png` → `tools/image-pipeline/output/raw/style-b-p3-maths-14.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A balance/weighing scale comparing a sack of rice with a small packet of spice or medicine on the opposite side, the scale tipping toward the heavier sack; no numerals or unit labels rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Kilogiram, Giram

---

### 63. `p3-maths-15` — Capacity: Litre and Millilitre

**Save as:** `style-b-p3-maths-15.png` → `tools/image-pipeline/output/raw/style-b-p3-maths-15.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two transparent bottles side by side, one visibly holding more liquid than the other, beside a small medicine cup shown separately; no numerals or unit labels rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Lita, Mililita

---

### 64. `p3-maths-16` — Simple Shapes and Their Properties

**Save as:** `style-b-p3-maths-16.png` → `tools/image-pipeline/output/raw/style-b-p3-maths-16.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Four shapes shown side by side with their sides and corners visually countable but unlabelled — a square, a rectangle with two visibly longer sides, a triangle, and a circle; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Murabba’i, Alwatika

---

### 65. `p3-maths-17` — Lines and Corners

**Save as:** `style-b-p3-maths-17.png` → `tools/image-pipeline/output/raw/style-b-p3-maths-17.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A small gallery of line types — straight, curved, horizontal, vertical, and diagonal — beside a square, a triangle, and a circle, each shape's corners left visually countable but unlabelled; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 66. `p3-maths-18` — Simple Perimeter by Counting Sides

**Save as:** `style-b-p3-maths-18.png` → `tools/image-pipeline/output/raw/style-b-p3-maths-18.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A square with each side marked by a small tick mark of equal length around its border to show the sides are equal, beside a triangle with its own three equal tick-marked sides; no numerals or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Kewaye

---

### 67. `p3-maths-19` — Reading Simple Tables

**Save as:** `style-b-p3-maths-19.png` → `tools/image-pipeline/output/raw/style-b-p3-maths-19.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple two-row table with a name column and a book-count column, showing Musa's row and Aisha's row, with an arrow tracing from the row label and column header to the cell where they meet. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Tebur

---

### 68. `p3-maths-20` — Simple Bar Charts

**Save as:** `style-b-p3-maths-20.png` → `tools/image-pipeline/output/raw/style-b-p3-maths-20.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple bar chart with two labelled bars of different heights — a taller bar showing a larger quantity and a shorter bar showing a smaller quantity — with gridline numbers along the side for reading the exact values. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Jadawalin Sanduna

---

### 69. `p3-maths-21` — Word Problems with Addition and Subtraction

**Save as:** `style-b-p3-maths-21.png` → `tools/image-pipeline/output/raw/style-b-p3-maths-21.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A word-problem scene showing a stack of books with more books being added to it by a pupil, beside a second panel showing a small pile of naira notes with some being spent at a stall and the remainder visible; no numerals, equation symbols, or currency symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Use generic educational currency representations, not photorealistic banknote reproductions.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 70. `p3-maths-22` — Word Problems with Multiplication and Division

**Save as:** `style-b-p3-maths-22.png` → `tools/image-pipeline/output/raw/style-b-p3-maths-22.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Four bags each holding the same number of oranges, shown beside a second panel where the same total oranges are shared equally among several children; no numerals or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 71. `p3-maths-23` — Mixed Review: Numbers, Money, and Measurement

**Save as:** `style-b-p3-maths-23.png` → `tools/image-pipeline/output/raw/style-b-p3-maths-23.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A four-panel review board combining a number comparison, a naira addition and change example, a metre/centimetre ruler, and a kilogram/gram weighing scale — one small worked example in each panel. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Use generic educational currency representations, not photorealistic banknote reproductions.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 72. `p3-maths-24` — P3 Mathematics Revision and Bridge to P4

**Save as:** `style-b-p3-maths-24.png` → `tools/image-pipeline/output/raw/style-b-p3-maths-24.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A tidy revision poster with small labelled-but-unlabelled icons for each P3 topic covered — numbers, addition/subtraction, multiplication/division, fractions, money, measurement, shapes, and tables/bar charts — arranged as a bridge pointing toward P4; icons are generic pictograms, no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---


## Band P4 (24 images)

### 73. `p4-maths-01` — Numbers up to 10,000

**Save as:** `style-b-p4-maths-01.png` → `tools/image-pipeline/output/raw/style-b-p4-maths-01.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A place-value chart with four labelled-but-blank columns — thousands, hundreds, tens, ones — beside a second identical blank chart with one column's placeholder marked by a small dot to represent a placeholder position holding an empty value; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 74. `p4-maths-02` — Place Value to Thousands

**Save as:** `style-b-p4-maths-02.png` → `tools/image-pipeline/output/raw/style-b-p4-maths-02.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A place-value chart with four labelled-but-blank columns — thousands, hundreds, tens, ones — with bundled counters or place-value cards shown beneath each column to represent its group size; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 75. `p4-maths-03` — Comparing and Ordering Numbers

**Save as:** `style-b-p4-maths-03.png` → `tools/image-pipeline/output/raw/style-b-p4-maths-03.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two stacked place-value charts, each with blank thousands/hundreds/tens/ones columns, with one chart's extra thousands-column visually emphasised (e.g. a soft highlight box) and a blank comparison-symbol gap between them; no numerals or comparison symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 76. `p4-maths-04` — Addition of Larger Numbers

**Save as:** `style-b-p4-maths-04.png` → `tools/image-pipeline/output/raw/style-b-p4-maths-04.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A vertical addition board with blank ones/tens/hundreds/thousands columns for two numbers being combined, each column shown with its own small bundled-counter groups; no numerals or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 77. `p4-maths-05` — Subtraction of Larger Numbers

**Save as:** `style-b-p4-maths-05.png` → `tools/image-pipeline/output/raw/style-b-p4-maths-05.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A vertical subtraction board with blank ones/tens/hundreds/thousands columns, showing bundled-counter groups being taken away column by column; no numerals or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 78. `p4-maths-06` — Multiplication Tables Review up to 10

**Save as:** `style-b-p4-maths-06.png` → `tools/image-pipeline/output/raw/style-b-p4-maths-06.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Seven plates, each holding the same small number of oranges, arranged in a row, with a small blank equation-shaped placeholder box beside them showing the same total two ways; no numerals or operator symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 79. `p4-maths-07` — Division as Sharing and Grouping

**Save as:** `style-b-p4-maths-07.png` → `tools/image-pipeline/output/raw/style-b-p4-maths-07.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A pile of oranges shown two ways in two panels: shared equally among several children in the left panel, and arranged into equal small groups on plates in the right panel — the same oranges illustrating sharing versus grouping; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 80. `p4-maths-08` — Intro to Long Division

**Save as:** `style-b-p4-maths-08.png` → `tools/image-pipeline/output/raw/style-b-p4-maths-08.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A long-division working frame shown as a blank stepped diagram with bracket lines, beside a small check panel showing a blank multiplication placeholder confirming the answer; no numerals or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 81. `p4-maths-09` — Equivalent Fractions

**Save as:** `style-b-p4-maths-09.png` → `tools/image-pipeline/output/raw/style-b-p4-maths-09.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Three identical round loaves of bread divided into two, four, and six equal parts respectively, with a matching proportion of parts shaded in each — the same covered amount shown three ways; no numerals or fraction symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** rabi

---

### 82. `p4-maths-10` — Comparing Fractions

**Save as:** `style-b-p4-maths-10.png` → `tools/image-pipeline/output/raw/style-b-p4-maths-10.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two identical round loaves of bread, each cut into eight equal slices: one showing more slices shaded than the other, placed side by side to compare the two proportions; no numerals or fraction symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 83. `p4-maths-11` — Intro Decimals: Tenths and Hundredths

**Save as:** `style-b-p4-maths-11.png` → `tools/image-pipeline/output/raw/style-b-p4-maths-11.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A ten-part strip with a few parts shaded (labelled goma-goma), beside a hundred-square grid with a matching proportion of cells shaded (labelled ɗari-ɗari); no numerals or fraction symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Goma-Goma, Ɗari-Ɗari

---

### 84. `p4-maths-12` — Perimeter of Simple Shapes

**Save as:** `style-b-p4-maths-12.png` → `tools/image-pipeline/output/raw/style-b-p4-maths-12.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A square with each side marked by a small equal tick-mark around its border to show the perimeter concept, beside a rectangle with its two visibly different side-lengths similarly tick-marked; no numerals or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** perimita

---

### 85. `p4-maths-13` — Area of Squares and Rectangles

**Save as:** `style-b-p4-maths-13.png` → `tools/image-pipeline/output/raw/style-b-p4-maths-13.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A square shown as a grid of unit squares, beside a rectangle shown as a grid of unit squares with visibly different row and column counts — grids used to make the area visibly countable without any written total; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Yanki

---

### 86. `p4-maths-14` — Angles Intro

**Save as:** `style-b-p4-maths-14.png` → `tools/image-pipeline/output/raw/style-b-p4-maths-14.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Three door-opening angle examples in one row: a door opened only partway (an angle less than a right angle), a book corner shown as the right-angle reference, and a door opened wide (an angle greater than a right angle). Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** kusurwa madaidaiciya

---

### 87. `p4-maths-15` — Measuring Angles with Simple Degrees

**Save as:** `style-b-p4-maths-15.png` → `tools/image-pipeline/output/raw/style-b-p4-maths-15.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A protractor measuring three angles side by side of visibly different sizes — one small acute angle, one right angle, and one wider obtuse angle — with a blank marker at each vertex where the degree value will be added later; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Digiri

---

### 88. `p4-maths-16` — Reading Simple Tables

**Save as:** `style-b-p4-maths-16.png` → `tools/image-pipeline/output/raw/style-b-p4-maths-16.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. One exact two-column table titled Littattafai with two blank rows left for pupil names and values, and a small blank comparison placeholder beside it; no numerals, digits, chart, pictograph, average, or probability display rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Use uncluttered, age-appropriate classroom objects; avoid branded products and unnecessary text.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 89. `p4-maths-17` — Reading Simple Bar Charts

**Save as:** `style-b-p4-maths-17.png` → `tools/image-pipeline/output/raw/style-b-p4-maths-17.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A bar chart with two labelled-but-unlabelled bars of visibly different heights, with a small bracket marking the height difference between them, and blank gridlines along the side; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 90. `p4-maths-18` — 24-Hour Clock Intro

**Save as:** `style-b-p4-maths-18.png` → `tools/image-pipeline/output/raw/style-b-p4-maths-18.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Three paired clock displays, each showing an analog clock face with blank hour markers (no numerals) beside a blank digital-display placeholder shape, hands positioned to show three distinct times of day (morning, early afternoon, evening); no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Agogon Awa 24

---

### 91. `p4-maths-19` — Mixed Addition and Subtraction Word Problems

**Save as:** `style-b-p4-maths-19.png` → `tools/image-pipeline/output/raw/style-b-p4-maths-19.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A three-panel school-shop story: books on a shelf, then more books arriving and being added to the shelf, then some books being given out and removed — each panel showing a visually countable but unlabelled running pile; no numerals or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 92. `p4-maths-20` — Mixed Multiplication and Division Word Problems

**Save as:** `style-b-p4-maths-20.png` → `tools/image-pipeline/output/raw/style-b-p4-maths-20.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Eight plates each holding the same small number of oranges, shown beside a second panel where the same total oranges are shared equally among several children; no numerals or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 93. `p4-maths-21` — Money, Measures, and Time Word Problems

**Save as:** `style-b-p4-maths-21.png` → `tools/image-pipeline/output/raw/style-b-p4-maths-21.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Three small linked scenes: a market price-and-change calculation in naira, a rope measured in metres beside its centimetre equivalent, and two clock times with the hours-between calculation shown beneath them. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Use generic educational currency representations, not photorealistic banknote reproductions.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 94. `p4-maths-22` — Shapes Review: Perimeter, Area, and Angles

**Save as:** `style-b-p4-maths-22.png` → `tools/image-pipeline/output/raw/style-b-p4-maths-22.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A rectangle with its two visibly different side-lengths tick-marked around the border for perimeter, its area shown as a shaded grid inside, and a small right-angle marker at one corner; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 95. `p4-maths-23` — Data Review with Tables and Bar Charts

**Save as:** `style-b-p4-maths-23.png` → `tools/image-pipeline/output/raw/style-b-p4-maths-23.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple table and matching bar chart with three labelled-but-unlabelled bars of visibly different heights, with two of the bars visually grouped together and a small bracket showing their combined height; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 96. `p4-maths-24` — P4 Mathematics Revision and Bridge to P5

**Save as:** `style-b-p4-maths-24.png` → `tools/image-pipeline/output/raw/style-b-p4-maths-24.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A tidy revision poster with small labelled-but-unlabelled icons for each P4 topic covered — numbers, place value, the four operations, fractions and decimals, perimeter/area, angles, tables/bar charts, money, and the clock — arranged as a bridge pointing toward P5; icons are generic pictograms, no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---


## Band P5 (24 images)

### 97. `p5-maths-01` — Numbers up to 100,000

**Save as:** `style-b-p5-maths-01.png` → `tools/image-pipeline/output/raw/style-b-p5-maths-01.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A place-value chart with five labelled-but-blank columns — ten-thousands, thousands, hundreds, tens, ones — each left empty for its digit to be added later; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 98. `p5-maths-02` — Place Value to Hundred Thousands

**Save as:** `style-b-p5-maths-02.png` → `tools/image-pipeline/output/raw/style-b-p5-maths-02.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A place-value chart for a five-digit number with each column left blank beneath it for its actual worth to be added later, showing the chart structure that makes clear the value is not just the digit itself; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 99. `p5-maths-03` — Comparing and Ordering Large Numbers

**Save as:** `style-b-p5-maths-03.png` → `tools/image-pipeline/output/raw/style-b-p5-maths-03.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two stacked place-value charts, each with blank ten-thousands/thousands/hundreds/tens/ones columns, with one chart's ten-thousands column visually emphasised and a blank comparison-symbol gap between them; no numerals or comparison symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 100. `p5-maths-04` — Intro to Lowest Common Multiple

**Save as:** `style-b-p5-maths-04.png` → `tools/image-pipeline/output/raw/style-b-p5-maths-04.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two number lines stacked, each with evenly spaced blank tick marks, with matching tick positions on both lines visually joined by a dotted connector line to show their first shared meeting point; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 101. `p5-maths-05` — Intro to Highest Common Factor

**Save as:** `style-b-p5-maths-05.png` → `tools/image-pipeline/output/raw/style-b-p5-maths-05.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two factor lists shown as two columns of small blank cards side by side, with a matching subset of cards on each list visually circled and connected by a line to the largest shared card; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 102. `p5-maths-06` — LCM and HCF Practice

**Save as:** `style-b-p5-maths-06.png` → `tools/image-pipeline/output/raw/style-b-p5-maths-06.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two contrasting scenes side by side: two bells with sound-wave marks ringing together at a shared meeting point on a blank timeline (an LCM scenario), and a pile of sweets with a pile of biscuits being sorted into equal small groups without leftovers (an HCF scenario); no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 103. `p5-maths-07` — Fractions Review

**Save as:** `style-b-p5-maths-07.png` → `tools/image-pipeline/output/raw/style-b-p5-maths-07.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. An orange divided into four equal parts with one part shaded, beside a bar divided into five equal parts with three parts shaded; no numerals or fraction symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** lambar sama, lambar ƙasa

---

### 104. `p5-maths-08` — Equivalent Fractions

**Save as:** `style-b-p5-maths-08.png` → `tools/image-pipeline/output/raw/style-b-p5-maths-08.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two identical round bread loaves: one cut in half with one part shaded, the other cut into quarters with a matching proportion shaded — the same covered amount shown two ways; no numerals or fraction symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 105. `p5-maths-09` — Comparing Fractions

**Save as:** `style-b-p5-maths-09.png` → `tools/image-pipeline/output/raw/style-b-p5-maths-09.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A round item cut into eight equal parts with several parts shaded beside an identical one with fewer parts shaded, comparing the two directly; a smaller side panel compares two differently-sized pieces to show that a larger denominator gives smaller pieces; no numerals or fraction symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 106. `p5-maths-10` — Common Denominators

**Save as:** `style-b-p5-maths-10.png` → `tools/image-pipeline/output/raw/style-b-p5-maths-10.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two fraction strips both divided into six equal parts, with matching proportions shaded on each, shown stacked directly beneath each other for comparison once they share the same number of parts; no numerals or fraction symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** lambar ƙasa ta gari, lambobin sama

---

### 107. `p5-maths-11` — Adding Fractions with Unlike Denominators

**Save as:** `style-b-p5-maths-11.png` → `tools/image-pipeline/output/raw/style-b-p5-maths-11.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A worked fraction-addition board with two shaded fraction strips both divided into the same number of equal parts, shown combining into one fuller strip; no numerals, fraction symbols, or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 108. `p5-maths-12` — Subtracting Fractions with Unlike Denominators

**Save as:** `style-b-p5-maths-12.png` → `tools/image-pipeline/output/raw/style-b-p5-maths-12.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A worked fraction-subtraction board with a shaded fraction strip having a portion visibly removed, leaving a smaller shaded portion; no numerals, fraction symbols, or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 109. `p5-maths-13` — Decimal Place Value

**Save as:** `style-b-p5-maths-13.png` → `tools/image-pipeline/output/raw/style-b-p5-maths-13.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A place-value chart and hundred-grid for “Decimal Place Value”, with the decimal point clearly aligned and tenths/hundredths shown by shaded cells. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Use uncluttered, age-appropriate classroom objects; avoid branded products and unnecessary text.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 110. `p5-maths-14` — Comparing Decimals

**Save as:** `style-b-p5-maths-14.png` → `tools/image-pipeline/output/raw/style-b-p5-maths-14.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two blank decimal-place boards stacked, each with a whole-number column and a smaller tenths column, with one board's whole-number column visually emphasised; a small side note shows two identically-shaped blank cards to represent equal values despite an extra placeholder; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 111. `p5-maths-15` — Adding Decimals

**Save as:** `style-b-p5-maths-15.png` → `tools/image-pipeline/output/raw/style-b-p5-maths-15.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A vertical addition board with a decimal-point column aligned between a whole-number column and a tenths column, both columns holding small bundled-counter groups being combined; no numerals or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 112. `p5-maths-16` — Subtracting Decimals

**Save as:** `style-b-p5-maths-16.png` → `tools/image-pipeline/output/raw/style-b-p5-maths-16.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A vertical subtraction board with a decimal-point column aligned between a whole-number column and a tenths column, showing counters being taken away; a small side note shows two identically-aligned blank decimal boards to represent matching decimal places; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 113. `p5-maths-17` — Meaning of Percentages

**Save as:** `style-b-p5-maths-17.png` → `tools/image-pipeline/output/raw/style-b-p5-maths-17.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A hundred-square grid with a portion of cells shaded, labelled rabi (half) in one version, beside a second hundred-square grid with a different portion shaded; no numerals or percentage symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 114. `p5-maths-18` — Percentage Word Problems

**Save as:** `style-b-p5-maths-18.png` → `tools/image-pipeline/output/raw/style-b-p5-maths-18.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A row of identical objects with three marked portions shown in separate panels, each panel's shaded portion visually distinct in size from the others; no numerals or percentage symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 115. `p5-maths-19` — Introduction to Ratio and Proportion

**Save as:** `style-b-p5-maths-19.png` → `tools/image-pipeline/output/raw/style-b-p5-maths-19.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A small group of red balls and a small group of blue balls shown as a ratio pair, beside a scaled-up version with proportionally more of each colour but the same balance between them, plus a small panel showing one rice bag feeding a few children scaled to more bags feeding proportionally more children; no numerals or ratio-notation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Rasiyo

---

### 116. `p5-maths-20` — Area and Perimeter of Composite Shapes

**Save as:** `style-b-p5-maths-20.png` → `tools/image-pipeline/output/raw/style-b-p5-maths-20.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. An L-shaped composite figure made of two joined rectangles, each sub-rectangle shown as a grid of unit squares, with the outer perimeter traced in a different colour along only the outside edge; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 117. `p5-maths-21` — Types and Measuring of Angles

**Save as:** `style-b-p5-maths-21.png` → `tools/image-pipeline/output/raw/style-b-p5-maths-21.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A protractor measuring three angle types side by side — a small acute angle, a right angle, and a wider obtuse angle — with a blank marker at each vertex where the degree value will be added later; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Kusurwa madaidaiciya, ma'aunin kusurwa

---

### 118. `p5-maths-22` — Introduction to Average or Mean

**Save as:** `style-b-p5-maths-22.png` → `tools/image-pipeline/output/raw/style-b-p5-maths-22.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Three children each holding a blank score card, with arrows combining the cards into one pile, then a division arrow leading to a single balanced bar representing the average; no numerals or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Matsakaici

---

### 119. `p5-maths-23` — Word Problems with Combined Operations

**Save as:** `style-b-p5-maths-23.png` → `tools/image-pipeline/output/raw/style-b-p5-maths-23.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A market scene: a few identical books with blank price tags, a schematic naira note handed over — the note rendered as a single flat, solid-coloured shape with NO decorative engraving, guilloche pattern, corner flourish, or ornamental border of any kind that could resemble a numeral or digit, just a plain blank coloured rectangle — with a small two-step calculation shown as blank placeholder boxes beside it; no numerals, equation symbols, or currency symbols rendered anywhere, including in any decorative pattern. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Use generic educational currency representations, not photorealistic banknote reproductions.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 120. `p5-maths-24` — P5 Mathematics Revision and Bridge to P6

**Save as:** `style-b-p5-maths-24.png` → `tools/image-pipeline/output/raw/style-b-p5-maths-24.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A tidy revision poster with small labelled-but-unlabelled icons for each P5 topic covered — large numbers, LCM/HCF, fractions, decimals, percentages, ratio, composite-shape area/perimeter, angles, and average — arranged as a bridge pointing toward P6; icons are generic pictograms, no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---


## Band P6 (24 images)

### 121. `p6-maths-01` — Numbers up to 1,000,000

**Save as:** `style-b-p6-maths-01.png` → `tools/image-pipeline/output/raw/style-b-p6-maths-01.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A place-value chart with exactly six labelled-but-blank columns in this exact order left to right: hundred-thousands, ten-thousands, thousands, hundreds, tens, ones — six columns total, not more, not fewer — with small comma-shaped divider marks placed after the thousands column and after the hundred-thousands column to show the grouping structure; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 122. `p6-maths-02` — Place Value to Millions

**Save as:** `style-b-p6-maths-02.png` → `tools/image-pipeline/output/raw/style-b-p6-maths-02.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A place-value chart for a six-digit number with each column left blank beneath it for its actual worth to be added later, beside a small note-card placeholder representing the millions column; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 123. `p6-maths-03` — Addition and Subtraction Mastery

**Save as:** `style-b-p6-maths-03.png` → `tools/image-pipeline/output/raw/style-b-p6-maths-03.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A worked subtraction board with blank columns by place value, with a small check-addition board shown beside it using the same blank-column structure to verify the answer; no numerals or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 124. `p6-maths-04` — Multiplication Mastery

**Save as:** `style-b-p6-maths-04.png` → `tools/image-pipeline/output/raw/style-b-p6-maths-04.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A worked multiplication shown as a labelled split-diagram with exactly two separate rectangular partial-product boxes side by side, each completely blank inside, connected by two arrows that both point down into one single final blank result box below them — this must read clearly as two-boxes-merging-into-one via arrows, not as a continuous multi-column chart or grid; no numerals or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 125. `p6-maths-05` — Division Mastery

**Save as:** `style-b-p6-maths-05.png` → `tools/image-pipeline/output/raw/style-b-p6-maths-05.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A pile of books shared equally among several classrooms shown as separate small stacks of matching height, with a small check-multiplication placeholder shown beside it to verify the division; no numerals or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 126. `p6-maths-06` — Rounding and Estimating Large Numbers

**Save as:** `style-b-p6-maths-06.png` → `tools/image-pipeline/output/raw/style-b-p6-maths-06.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two number lines: one with a blank tick mark rounding up toward the nearest thousand-mark, the other with a blank tick mark rounding down toward the nearest ten-thousand-mark, each with the original position and rounded target marked by small arrows; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 127. `p6-maths-07` — Fraction Operations Mastery

**Save as:** `style-b-p6-maths-07.png` → `tools/image-pipeline/output/raw/style-b-p6-maths-07.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A four-panel rule chart, one panel per operation: finding a common denominator before adding or subtracting fractions, multiplying numerators together and denominators together for multiplication, and flipping the second fraction before multiplying for division. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 128. `p6-maths-08` — Fractions to Decimals

**Save as:** `style-b-p6-maths-08.png` → `tools/image-pipeline/output/raw/style-b-p6-maths-08.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Four fraction-to-decimal conversions shown side by side, each with a shaded strip or grid and a small blank arrow pointing toward a blank decimal-placeholder card; no numerals, fraction symbols, or decimal points rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 129. `p6-maths-09` — Decimals to Percentages

**Save as:** `style-b-p6-maths-09.png` → `tools/image-pipeline/output/raw/style-b-p6-maths-09.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A row of decimal-to-percent conversions with matching hundred-grids, each grid's shaded proportion visually distinct, plus one fully shaded grid at the end; no numerals, decimal points, or percentage symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 130. `p6-maths-10` — Fractions to Percentages

**Save as:** `style-b-p6-maths-10.png` → `tools/image-pipeline/output/raw/style-b-p6-maths-10.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Four fraction-to-percentage conversions shown side by side, each with a scaling arrow used to reach a grid of one hundred cells; no numerals, fraction symbols, or percentage symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 131. `p6-maths-11` — Mixed Fractions, Decimals, and Percentages

**Save as:** `style-b-p6-maths-11.png` → `tools/image-pipeline/output/raw/style-b-p6-maths-11.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Three aligned equivalence panels, each showing a fraction strip, a matching hundred-cell grid shaded to the same proportion, and a blank connecting arrow between them; no numerals, fraction symbols, decimal points, or percentage symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Use uncluttered, age-appropriate classroom objects; avoid branded products and unnecessary text.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 132. `p6-maths-12` — Word Problems with Fractions and Percentages

**Save as:** `style-b-p6-maths-12.png` → `tools/image-pipeline/output/raw/style-b-p6-maths-12.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Three small worked panels: a shaded half of a group of objects, a shaded quarter of a different group of objects, and a shaded portion of a sack of grain being weighed on a scale; no numerals, fraction symbols, decimal points, or percentage symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 133. `p6-maths-13` — Ratio Scaling Practice

**Save as:** `style-b-p6-maths-13.png` → `tools/image-pipeline/output/raw/style-b-p6-maths-13.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A small group of Hausa books and a small group of English books shown as a ratio pair, scaled up with a multiplication-shaped arrow to proportionally more of each — the same balance preserved when both groups grow together; no numerals or ratio-notation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Rasiyo

---

### 134. `p6-maths-14` — Proportion Word Problems

**Save as:** `style-b-p6-maths-14.png` → `tools/image-pipeline/output/raw/style-b-p6-maths-14.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A scaling table shown as blank rows connecting sacks to mudu measures, with a clearly visible curved arrow drawn between each consecutive pair of rows, pointing downward from one row to the next, to show the proportional doubling relationship — the arrows must be clearly rendered and visible, not omitted; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 135. `p6-maths-15` — Introduction to Algebra

**Save as:** `style-b-p6-maths-15.png` → `tools/image-pipeline/output/raw/style-b-p6-maths-15.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A balance-scale model with a small blank box labelled x plus a modestly sized bundled-counter group on one side, and a noticeably larger bundled-counter group on the other side — the two pans must NOT hold equal or matching quantities; the side without the box must clearly outweigh and out-count the side with the box, so the scale is shown perfectly level only because the covered unknown box adds the missing weight, not because the two visible counter groups are equal. The solved value is shown as a small blank placeholder card beneath it; no numerals or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Algebra, canji, ma'aunin lissafi

---

### 136. `p6-maths-16` — Multiplication and Division Equations

**Save as:** `style-b-p6-maths-16.png` → `tools/image-pipeline/output/raw/style-b-p6-maths-16.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two balance-scale models side by side, each with an unknown shown as a covered box on one side and a bundled-counter group on the other, perfectly level; no numerals or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 137. `p6-maths-17` — Area and Perimeter Review

**Save as:** `style-b-p6-maths-17.png` → `tools/image-pipeline/output/raw/style-b-p6-maths-17.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A school field rectangle with its two visibly different side-lengths tick-marked around the border, its area shown filled inside with a light shaded tone, and its perimeter traced in a different colour along the outer edge only; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Yanki, Perimita

---

### 138. `p6-maths-18` — Volume of a Cuboid

**Save as:** `style-b-p6-maths-18.png` → `tools/image-pipeline/output/raw/style-b-p6-maths-18.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A cuboid box drawn with visible unit cubes inside filling its volume, its three dimensions visually distinguishable by their different tick-marked lengths; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Kuboid, Girma

---

### 139. `p6-maths-19` — Angle Sum in a Triangle

**Save as:** `style-b-p6-maths-19.png` → `tools/image-pipeline/output/raw/style-b-p6-maths-19.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A triangle with two of its angles marked by small arc symbols of visibly different sizes, and the third angle left as a blank arc for its solved value to be added later; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Alwatika

---

### 140. `p6-maths-20` — Angles in Triangles and Quadrilaterals

**Save as:** `style-b-p6-maths-20.png` → `tools/image-pipeline/output/raw/style-b-p6-maths-20.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A rectangle with all four corners marked by small right-angle arc symbols, beside a small triangle reminder shown with its own three angle-arcs marked for comparison; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 141. `p6-maths-21` — Reading Tables and Bar Charts

**Save as:** `style-b-p6-maths-21.png` → `tools/image-pipeline/output/raw/style-b-p6-maths-21.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A bar chart with two labelled-but-unlabelled bars of visibly different heights, with a small bracket marking the height difference between them, and blank gridlines along the side; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 142. `p6-maths-22` — Simple Probability with Counts

**Save as:** `style-b-p6-maths-22.png` → `tools/image-pipeline/output/raw/style-b-p6-maths-22.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A cloth bag containing a small group of red balls and a smaller group of blue balls, with a blank label placeholder beside it where the chance statement will be added later; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 143. `p6-maths-23` — Data and Probability Practice

**Save as:** `style-b-p6-maths-23.png` → `tools/image-pipeline/output/raw/style-b-p6-maths-23.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple table showing two rows of schematic drink-cup icons (zobo and kunu) of visibly different pile sizes, with an arrow connecting the table to a blank probability-statement placeholder; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 144. `p6-maths-24` — P6 Mathematics Revision and Bridge to JSS1

**Save as:** `style-b-p6-maths-24.png` → `tools/image-pipeline/output/raw/style-b-p6-maths-24.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A tidy revision poster with small labelled-but-unlabelled icons for each P6 topic covered — large numbers, the four operations, fractions/decimals/percentages, ratio and proportion, algebra, area/perimeter/volume, triangle angles, and data/probability — arranged as a bridge pointing toward JSS1; icons are generic pictograms, no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---
