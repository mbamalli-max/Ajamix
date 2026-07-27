# Style B — Mathematics validation batch (10 images)

Before running the full 144-image Mathematics set, a small validation batch runs first — same
discipline used for Basic Science (which caught a systemic defect at 10 images instead of 101).

**What this batch is specifically validating.** 130 of the 144 Mathematics manifest entries were
rewritten (2026-07-20) to strip literal digits/equations out of `depictEn`, because the locked Style B
template forbids rendering numerals in the artwork — all numbers arrive later via the deterministic
overlay compositor. Those rewrites describe *blank* structures ("a place-value chart with three
labelled-but-blank columns", "stepping-stones with no numerals written on the path"). The open question
is whether the image model actually honours that, or fills the numerals in regardless. These 10 entries
cover the distinct blank-structure archetypes that recur across the whole 144-image set:

| # | id | Archetype being validated |
|---|---|---|
| 1 | `p1-maths-01` | Counted objects with blank space reserved for numerals |
| 2 | `p1-maths-03` | Blank stepping-stone number path (motif-differentiated from 04/05) |
| 3 | `p1-maths-17` | Schematic currency with blank note faces |
| 4 | `p2-maths-24` | Clock face with blank hour markers |
| 5 | `p3-maths-01` | Place-value chart with blank columns (most common archetype in the set) |
| 6 | `p4-maths-09` | Fraction shading / equal-part division |
| 7 | `p4-maths-17` | Bar chart with unlabelled bars and blank gridlines |
| 8 | `p5-maths-22` | Blank score cards feeding an averaging diagram |
| 9 | `p6-maths-15` | Algebra balance-scale with covered unknown |
| 10 | `p6-maths-24` | Revision poster built from generic pictograms |

All prompts below are verbatim from `tasks/2026-07-20-maths-chatgpt-prompts.md` — no alterations. They
also carry the globally-strengthened no-religious-architecture template language added after the Basic
Science batch.

**Workflow per image:** paste Prompt + Avoid into ChatGPT, save with the exact filename given under
`tools/image-pipeline/output/raw/`.

---

### 1. `p1-maths-01` — Counting 1–10

**Save as:** `style-b-p1-maths-01.png` → `tools/image-pipeline/output/raw/style-b-p1-maths-01.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Ten familiar counters (e.g. small stones or seeds) arranged in one clear row in counting order, with a small blank space left beside each counter for its numeral to be added later; no place-value or comparison symbols, and no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Use uncluttered, age-appropriate classroom objects; avoid branded products and unnecessary text.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 3. `p1-maths-03` — Counting 21–30

**Save as:** `style-b-p1-maths-03.png` → `tools/image-pipeline/output/raw/style-b-p1-maths-03.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A number path of ten evenly spaced blank stepping-stones drawn as flat stones crossing a small stream, with the last two stones visually joined by a small connecting arrow to mark the module's own callout transition; no numerals written on the path. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 17. `p1-maths-17` — Money – Identifying Naira and Kobo

**Save as:** `style-b-p1-maths-17.png` → `tools/image-pipeline/output/raw/style-b-p1-maths-17.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Five schematic Nigerian naira notes of visibly different sizes and colours arranged in ascending size order on a flat surface, each note's face left blank for its value to be added later, plus a small separate stack of coins beside them; no printed numerals or currency symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Use generic educational currency representations, not photorealistic banknote reproductions.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 48. `p2-maths-24` — Telling Time: Hour and Half Hour

**Save as:** `style-b-p2-maths-24.png` → `tools/image-pipeline/output/raw/style-b-p2-maths-24.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two analog clock faces side by side, both with blank hour markers (no numerals) and their hour hands in the same position: one clock's minute hand pointing straight up, the other's minute hand pointing straight down, to distinguish the hour from the half-hour. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 49. `p3-maths-01` — Numbers to 1,000 and Place Value

**Save as:** `style-b-p3-maths-01.png` → `tools/image-pipeline/output/raw/style-b-p3-maths-01.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A place-value chart with three labelled-but-blank columns — hundreds, tens, ones — each column left empty for its digit to be added later, beside a small sack-of-millet icon being counted out in three groups of decreasing size to match the module's own market analogy; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** daruruwa, gommai, ɗaya-ɗaya

---

### 81. `p4-maths-09` — Equivalent Fractions

**Save as:** `style-b-p4-maths-09.png` → `tools/image-pipeline/output/raw/style-b-p4-maths-09.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Three identical round loaves of bread divided into two, four, and six equal parts respectively, with a matching proportion of parts shaded in each — the same covered amount shown three ways; no numerals or fraction symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** rabi

---

### 89. `p4-maths-17` — Reading Simple Bar Charts

**Save as:** `style-b-p4-maths-17.png` → `tools/image-pipeline/output/raw/style-b-p4-maths-17.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A bar chart with two labelled-but-unlabelled bars of visibly different heights, with a small bracket marking the height difference between them, and blank gridlines along the side; no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 118. `p5-maths-22` — Introduction to Average or Mean

**Save as:** `style-b-p5-maths-22.png` → `tools/image-pipeline/output/raw/style-b-p5-maths-22.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Three children each holding a blank score card, with arrows combining the cards into one pile, then a division arrow leading to a single balanced bar representing the average; no numerals or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Matsakaici

---

### 135. `p6-maths-15` — Introduction to Algebra

**Save as:** `style-b-p6-maths-15.png` → `tools/image-pipeline/output/raw/style-b-p6-maths-15.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A balance-scale model with a small blank box labelled x plus a bundled-counter group on one side, and a matching bundled-counter group on the other side, perfectly level, with the solved value shown as a small blank placeholder card beneath it; no numerals or equation symbols rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Algebra, canji, ma'aunin lissafi

---

### 144. `p6-maths-24` — P6 Mathematics Revision and Bridge to JSS1

**Save as:** `style-b-p6-maths-24.png` → `tools/image-pipeline/output/raw/style-b-p6-maths-24.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A tidy revision poster with small labelled-but-unlabelled icons for each P6 topic covered — large numbers, the four operations, fractions/decimals/percentages, ratio and proportion, algebra, area/perimeter/volume, triangle angles, and data/probability — arranged as a bridge pointing toward JSS1; icons are generic pictograms, no numerals rendered. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)