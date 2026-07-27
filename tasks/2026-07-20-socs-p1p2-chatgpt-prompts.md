# Style B — Social Studies P1–P2 — ChatGPT-pasteable prompt set

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

### 1. `p1-socs-01` — Meaning of Social Studies

**Save as:** `style-b-p1-socs-01.png` → `tools/image-pipeline/output/raw/style-b-p1-socs-01.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A child standing in a simple Northern Nigerian village scene pointing calmly at different parts of their environment — people, a house, a school, a tree, a river — with a small three-step inset showing a hungry child receiving food, a cold child receiving a wrapper, and an unwell child being taken to a health worker by an adult. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No depiction of a child alone at the health worker without an adult, no illness symptoms shown, and no real hazard (fire, deep water, busy road) in the environment scene.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Muhalli, Al'umma

---

### 2. `p1-socs-02` — How Man Solved His Problems

**Save as:** `style-b-p1-socs-02.png` → `tools/image-pipeline/output/raw/style-b-p1-socs-02.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Four small paired panels showing a need and its calm solution: an empty water jug beside a child and adult fetching clean water together; a hungry child beside a bowl of food being shared; a cold child beside someone being given a wrapper/cloth; a child pointing out that they feel unwell beside an adult walking them toward a health worker. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Every solution panel shows a child accompanied by a trusted adult, not solving the problem alone; no depiction of illness symptoms, injury, or a child fetching water from an unsafe or deep water source.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Ruwa, Abinci, Sutura, Asibiti

---

### 3. `p1-socs-03` — The Family – Members and Roles

**Save as:** `style-b-p1-socs-03.png` → `tools/image-pipeline/output/raw/style-b-p1-socs-03.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A warm Northern Nigerian family scene at home: a father, mother, a few children, and a grandparent, each shown doing a distinct calm household activity together — the father speaking gently with the children, the mother preparing a simple meal, the children tidying a small shared space. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Show a harmonious, cooperative scene only — no depiction of conflict, punishment, or one family member appearing dominant over another; children shown doing only light, age-appropriate tasks.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Uba, Uwa, Yara

---

### 4. `p1-socs-04` — Qualities of a Good Family

**Save as:** `style-b-p1-socs-04.png` → `tools/image-pipeline/output/raw/style-b-p1-socs-04.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A calm household scene showing children sharing chores together — one tidying a room, one gathering items — while a parent looks on warmly, with the whole family seated together afterward sharing a simple meal, conveying love, cooperation, and mutual care. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Show only the positive, cooperative scene — do not depict conflict, jealousy, or neglect, which the module explicitly frames as things to avoid rather than illustrate.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Soyayya, Taimakon juna

---

### 5. `p1-socs-05` — Good Moral Values in the Family

**Save as:** `style-b-p1-socs-05.png` → `tools/image-pipeline/output/raw/style-b-p1-socs-05.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A child calmly telling a parent about a small mistake, with the parent listening gently; beside this, a second small scene shows an older child helping a younger sibling with a task, illustrating honesty, obedience, and mutual help within the family. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Depict the parent as warm and listening, not scolding or punishing; no depiction of lying, disobedience, or conflict, which the module frames only as things to avoid.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Gaskiya, Biyayya, Taimako

---

### 6. `p1-socs-06` — My School – Environment and Facilities

**Save as:** `style-b-p1-socs-06.png` → `tools/image-pipeline/output/raw/style-b-p1-socs-06.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A clean, orderly Northern Nigerian primary-school compound showing a classroom with a chalkboard and desks, a small library corner with books, an open playground, and a school office, with a couple of pupils calmly moving between the areas. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Show only generic, non-graphic school facilities; no depiction of toilet interiors, no unsupervised pupils on the playground, and no litter or damaged property.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Aji, Ɗakin karatu, Filin wasa

---

### 7. `p1-socs-07` — People in My School – Roles

**Save as:** `style-b-p1-socs-07.png` → `tools/image-pipeline/output/raw/style-b-p1-socs-07.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Four school staff shown doing their distinct roles in one school-compound scene: a teacher instructing pupils at a chalkboard, a headmaster addressing a small assembly, a cleaner sweeping a walkway, and a gateman standing calmly at the school entrance. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Show every school worker with equal dignity and calm, ordinary posture; no depiction of a weapon, confrontation, or any worker treated as less important than another.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Malami, Shugaban makaranta, Mai tsabta, Mai tsaro

---

### 8. `p1-socs-08` — My Community – Meaning and People

**Save as:** `style-b-p1-socs-08.png` → `tools/image-pipeline/output/raw/style-b-p1-socs-08.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A lively but orderly Northern Nigerian community scene where a farmer brings produce, a trader sells goods at a small stall, a teacher walks toward a school, and a doctor stands near a clinic — each person doing a distinct, recognisable occupation within the same shared community setting. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Show men and women in varied occupational roles without gender stereotyping; no political, religious, or ethnic symbols, and no crowding or unsafe market conditions.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Manomi, Ɗan kasuwa, Malami, Likita

---

### 9. `p1-socs-09` — Places in My Community

**Save as:** `style-b-p1-socs-09.png` → `tools/image-pipeline/output/raw/style-b-p1-socs-09.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple, non-geographic community layout showing a police post, a market, a hospital, a neutral place of worship, and a school as distinct, clearly separated buildings within one community scene, with a few residents calmly moving between them. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Use no real signage, seal, religious iconography specific to one faith over another, or political symbol; depict the place of worship as a plain, neutral structure representing worship in general.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Ofishin 'yan sanda, Kasuwa, Asibiti, Makaranta

---

### 10. `p1-socs-10` — Community Helpers

**Save as:** `style-b-p1-socs-10.png` → `tools/image-pipeline/output/raw/style-b-p1-socs-10.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A group of community helpers shown each doing their distinct job with calm dignity in one scene: a doctor attending to a seated patient, a police officer assisting a resident, a farmer with a basket of produce, and a tailor sewing at a simple table. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No depiction of illness symptoms, injury, weapon, or arrest; every helper is shown performing an ordinary, calm task with equal visual dignity.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Likita, Ɗan sanda, Manomi, Mai dinki

---

### 11. `p1-socs-11` — Meaning of Culture

**Save as:** `style-b-p1-socs-11.png` → `tools/image-pipeline/output/raw/style-b-p1-socs-11.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A respectful family scene showing everyday culture: an elder and a child greeting each other warmly, a simple shared meal of tuwo and soup on a mat, and modest everyday Northern Nigerian clothing — presented as ordinary daily life, not costume display. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No caricature, exoticising pose, sacred object, or masquerade imagery; depict culture as ordinary daily life shown with dignity, not performance.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Al'ada, Tufafi, Abinci

---

### 12. `p1-socs-12` — Types of Culture

**Save as:** `style-b-p1-socs-12.png` → `tools/image-pipeline/output/raw/style-b-p1-socs-12.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two clearly separated panels: one labeled side shows visible material culture — a house, everyday tools, clothing, and a food bowl; the other side represents non-material culture symbolically through two people listening respectfully to an elder, with no religious symbol or text, showing values and manners rather than physical objects. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Represent non-material culture only through a neutral listening/respect scene — no religious symbol, sacred object, or belief-specific iconography of any single faith.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Al'ada ta zahiri, Al'ada ta ruhaniya

---

### 13. `p1-socs-13` — Festivals and Celebrations

**Save as:** `style-b-p1-socs-13.png` → `tools/image-pipeline/output/raw/style-b-p1-socs-13.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Three equal, clearly separated, neutral panels labeled Sallah, Kirsimati, and Durbar: families greeting each other after a communal gathering, a modest family meal shared together, and a community procession scene shown from a respectful distance — each panel receiving equal size and visual warmth. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Keep the panels factual and equal in visual weight; no worship reenactment, sacred figure, denominational symbol hierarchy, ranking, 'our versus their' framing, or open flame/fireworks.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Sallah, Kirsimati, Durbar

---

### 14. `p1-socs-14` — Respect for People and Places

**Save as:** `style-b-p1-socs-14.png` → `tools/image-pipeline/output/raw/style-b-p1-socs-14.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A child greeting an elder with a respectful gesture in a school courtyard, while nearby another child calmly places litter into a bin — showing respect for people and for shared public places in one scene. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Show only calm, respectful behaviour — no depiction of disrespect, damage to property, or a child being scolded, which the module frames only as things to avoid, not illustrate.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Girmamawa, Kula da wurin jama'a

---

### 15. `p1-socs-15` — Revision and Assessment

**Save as:** `style-b-p1-socs-15.png` → `tools/image-pipeline/output/raw/style-b-p1-socs-15.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A child-friendly revision wheel with five balanced spokes leading from a central learner to family, school, community, culture, and respect for people and places. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Keep every topic equally weighted with neutral generic imagery; no religious, political, or ethnic symbol, and no exam score or ranking of pupils.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Iyali, Makaranta, Al'umma, Al'ada, Girmamawa

---


## Band P2 (15 images)

### 16. `p2-socs-01` — The Family

**Save as:** `style-b-p2-socs-01.png` → `tools/image-pipeline/output/raw/style-b-p2-socs-01.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A warm multi-generation Northern Nigerian family scene at home — mother, father, children, and a grandparent gathered together — conveying love, care, feeding, upbringing, and protection through calm, ordinary body language rather than any single dramatic action. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Show a calm, cooperative family scene only; no depiction of conflict, and no single family member shown as dominant over the others.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Iyali, Ƙauna

---

### 17. `p2-socs-02` — Members of the Family

**Save as:** `style-b-p2-socs-02.png` → `tools/image-pipeline/output/raw/style-b-p2-socs-02.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A family group portrait-style scene showing a mother caring for a young child, a father nearby, grandparents seated and sharing a story, an older sibling helping a younger one, and an aunt or uncle visiting — each member doing something distinct within one warm household scene. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Depict every family member with equal warmth and dignity; no depiction of favouritism, conflict, or a child being reprimanded.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Uwa, Uba, Kakanni, Yayye

---

### 18. `p2-socs-03` — Duties at Home

**Save as:** `style-b-p2-socs-03.png` → `tools/image-pipeline/output/raw/style-b-p2-socs-03.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A child doing only light, age-appropriate household tasks in one calm scene: gathering a few books together, placing a drinking cup away after use, and arranging shoes neatly by the door. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No child shown near fire, a knife, or any hazardous item — the module explicitly restricts a P2 child's duties to light, safe tasks only, never anything dangerous.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Aiki, Alhaki

---

### 19. `p2-socs-04` — The Community

**Save as:** `style-b-p2-socs-04.png` → `tools/image-pipeline/output/raw/style-b-p2-socs-04.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A cooperative Northern Nigerian community scene with houses, a school, a market stall, a neutral place of worship, and a clinic visible together, with a teacher, doctor, farmer, and trader each shown doing their distinct role and residents greeting one another calmly. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No political, religious-hierarchy, or ethnic symbol; show men and women in varied community roles without gender stereotyping, and no litter or damaged public property.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Al'umma, Haɗin kai

---

### 20. `p2-socs-05` — Places in the Community

**Save as:** `style-b-p2-socs-05.png` → `tools/image-pipeline/output/raw/style-b-p2-socs-05.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple, non-geographic layout of five community places clearly separated — a school, a health centre, a market, a neutral place of worship, and a playground — with a small road connecting them and a couple of residents calmly using each place appropriately. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Show the place of worship as a plain, neutral structure representing worship in general, with people calm and quiet there; no litter shown on the road.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Makaranta, Asibiti, Kasuwa, Filin wasa

---

### 21. `p2-socs-06` — Occupations

**Save as:** `style-b-p2-socs-06.png` → `tools/image-pipeline/output/raw/style-b-p2-socs-06.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A row of local workers each shown doing their occupation with calm dignity: a teacher at a chalkboard, a doctor with a patient, a farmer with produce, a fisherman with a net, a tailor sewing, a driver at a vehicle, a shoe-repairer at a stall, and a trader arranging goods. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Give every occupation equal visual dignity — no worker shown as more or less important than another, and no depiction of a vehicle in motion, sharp tools in use, or any hazardous action.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Malami, Likita, Manomi, Tela

---

### 22. `p2-socs-07` — The Market

**Save as:** `style-b-p2-socs-07.png` → `tools/image-pipeline/output/raw/style-b-p2-socs-07.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A calm, orderly market scene with a seller arranging grains, tomatoes, onions, and spices, an adult buyer asking the price, and a child standing close beside the accompanying adult rather than moving through the market alone. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. The child must stay beside the adult at all times, not handling money or moving through the crowd alone; no real currency detail, brand, or aggressive bargaining, and no crowding or danger.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Kasuwa, Mai sayarwa, Mai saya, Farashi

---

### 23. `p2-socs-08` — Rules at Home and School

**Save as:** `style-b-p2-socs-08.png` → `tools/image-pipeline/output/raw/style-b-p2-socs-08.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two equal, clearly separated panels: a home-rules panel showing a child washing hands before eating and speaking politely to a parent, and a school-rules panel showing a pupil raising a hand before speaking and returning a book to its place. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Keep the tone calm and instructive, not punitive — no depiction of punishment, scolding, or a child breaking a rule; show only the correct, positive behaviour.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Doka, Gida, Makaranta

---

### 24. `p2-socs-09` — Leaders in the Community

**Save as:** `style-b-p2-socs-09.png` → `tools/image-pipeline/output/raw/style-b-p2-socs-09.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Three neutral leadership settings in one scene: a parent gently guiding children at home, a headteacher addressing pupils at school, and a respected community elder listening calmly to residents in a courtyard. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No real political party, politician, campaign symbol, party colour, or seal of office; this module explicitly frames leadership in general terms, not partisan politics.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Shugaba, Girmamawa

---

### 25. `p2-socs-10` — Cooperation

**Save as:** `style-b-p2-socs-10.png` → `tools/image-pipeline/output/raw/style-b-p2-socs-10.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Children working together calmly to tidy a shared classroom — one arranging books, one sweeping, one helping a classmate who does not understand a task — showing patience, listening, and shared effort rather than one child giving orders. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No child shown commanding or excluding another; every child contributes calmly and is shown as an equal participant.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Haɗin kai

---

### 26. `p2-socs-11` — Nigerian Symbols

**Save as:** `style-b-p2-socs-11.png` → `tools/image-pipeline/output/raw/style-b-p2-socs-11.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple, accurate study panel showing the Nigerian green-white-green flag, a verified coat of arms, a small naira/kobo coin-and-note icon, and a generic musical-note panel representing the national anthem, presented neutrally with equal size for each symbol. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Verify current official symbol designs before rendering; no party colour, party logo, politician, campaign material, or alteration of the coat of arms — this module is explicitly non-political.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Tutar Nijeriya, Tambarin Nijeriya, Naira

---

### 27. `p2-socs-12` — Respect and Good Behaviour

**Save as:** `style-b-p2-socs-12.png` → `tools/image-pipeline/output/raw/style-b-p2-socs-12.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A child greeting parents respectfully at home, then a second small scene of the same child listening attentively to a teacher in class with a raised hand — showing honesty, politeness, patience, and cleanliness through calm, ordinary behaviour. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. Show only positive, exemplary behaviour — no depiction of rudeness, pushing, or a child being corrected harshly.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Ladabi, Godiya

---

### 28. `p2-socs-13` — Festivals and Celebrations

**Save as:** `style-b-p2-socs-13.png` → `tools/image-pipeline/output/raw/style-b-p2-socs-13.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A family and community gathering scene for a special occasion — clean, modest clothing, people greeting each other warmly, sharing a simple meal, and visiting relatives — conveying joy, unity, and orderly celebration without naming a specific festival. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No open flame, fireworks, or loud/dangerous celebration element; no litter shown, and no depiction of a specific religious ritual — keep the scene generic and warm.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Biki, Murna

---

### 29. `p2-socs-14` — Our Environment

**Save as:** `style-b-p2-socs-14.png` → `tools/image-pipeline/output/raw/style-b-p2-socs-14.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A broad, everyday environment scene showing a home, a school, a road, trees, a small water source, and people and animals coexisting calmly, with one child shown placing litter into a bin as an example of caring for the environment. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No depiction of pollution, waste burning, or a hazardous water source; the child's only environmental action shown is placing litter in a bin, matching the module's own examples.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Muhalli, Tsabta

---

### 30. `p2-socs-15` — Keeping the Community Clean

**Save as:** `style-b-p2-socs-15.png` → `tools/image-pipeline/output/raw/style-b-p2-socs-15.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A community clean-up scene: a child calmly placing litter into a bin, while adults nearby sweep a road and clear a drain safely, showing that a clean community requires cooperation from everyone, not one person alone. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Any background buildings, townscape, or skyline elements must stay strictly generic and secular — plain flat or simply gabled rooflines only, matching ordinary Northern Nigerian homes, schools, and shops. Never include a dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image, foreground or background, unless a place of worship is the explicit, deliberate subject of this specific image — and even then it must be rendered as a plain, flat-roofed, unadorned civic-style structure with no faith-specific silhouette. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No dome, minaret, crescent finial, arched mosque-style window or doorway, church spire, cross, or bell tower anywhere in the image — this applies to every background building or skyline element, not only a building explicitly identified as a place of worship. No child near an open drain, burning waste, or a well; only adults are shown doing the heavier cleanup tasks, matching the module's explicit restriction on children handling hazardous cleanup.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Tsaftace muhalli, Kwandon shara

---
