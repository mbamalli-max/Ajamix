# Style B — Basic Science validation batch (10 images)

Before running the full 101-image Basic Science set, a small validation batch is being generated first,
per the plan agreed 2026-07-20: Basic Science is content-safety-sensitive (includes puberty and human-
reproduction modules), so the prompt template gets tightened against real output before committing to
full-scale generation. These 10 entries are pulled verbatim from
`tasks/2026-07-20-bsci-chatgpt-prompts.md` — no prompt changes, just a smaller batch selected to span:

- A range of grade bands (P1, P2, P3, P5, P6)
- A range of safety-sensitivity levels, including the two most sensitive modules in the whole Basic
  Science set (`p6-bsci-06` puberty, `p6-bsci-07` human reproduction)
- A range of content types: plain illustration, multi-panel comparison, recognition-only diagram,
  hazard/safety-procedure sequence

**Workflow per image:** same as prior batches — paste Prompt + Avoid into ChatGPT, save with the exact
filename given under `tools/image-pipeline/output/raw/`.

---

### 1. `p1-bsci-01` — The Senses – Sight

**Save as:** `style-b-p1-bsci-01.png` → `tools/image-pipeline/output/raw/style-b-p1-bsci-01.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A child in a bright classroom looking at and pointing toward a few named objects — a book, a pencil, and their teacher — with the child's eyes gently highlighted/circled to show which body part is being used to see. Soft daylight from a window lights the scene. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. Do not show the child's hand touching or near the eye, and do not depict anyone looking directly at the sun.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Idanu

---

### 2. `p1-bsci-14` — Energy – Light and Heat

**Save as:** `style-b-p1-bsci-14.png` → `tools/image-pipeline/output/raw/style-b-p1-bsci-14.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Three small linked panels: the sun shining with both light rays and wavy heat lines over a house with a solar panel on its roof; a lamp/fitila glowing in a dark room, giving light only; and a cooking fire at a safe distance from a seated adult, giving off visible heat waves, to contrast sources of light versus heat. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. The fire must be shown tended by an adult at a safe distance, never touched or approached by a child, and no child shown standing in direct harsh sun without shade — matching the lesson's own caution about fire and prolonged sun exposure.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Haske, Zafi

---

### 3. `p2-bsci-01` — Living and Non-living Things

**Save as:** `style-b-p2-bsci-01.png` → `tools/image-pipeline/output/raw/style-b-p2-bsci-01.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Two-group comparison scene: left side shows living things (a goat, a chicken, a tree, a potted bean plant, a person) that grow and need water/food; right side shows non-living things (a stone, a chair, a writing board, a bowl, a gown, a book). Children observe both groups from a distance, not touching the animal. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. Do not depict a child touching, picking up, or handling the goat or chicken — the module explicitly says to sort things without harming or picking up an animal.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Masu Rai, Marasa Rai

---

### 4. `p3-bsci-06` — States of Matter

**Save as:** `style-b-p3-bsci-06.png` → `tools/image-pipeline/output/raw/style-b-p3-bsci-06.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A three-panel comparison: a solid object (a stone or a book) holding its shape; water being poured from a jug into a cup, taking the cup's shape; and a light wisp of steam rising from a covered cup of warm water, showing the gas state, with a soft warning glow/steam-only depiction (no visible flame). Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No open flame or fire; do not show a child's hand near the warm water or steam — the steam panel should be a small, distant wisp only, consistent with the module using hot water only as an adult-supervised example.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Abu Mai Tauri, Ruwa, Iska

---

### 5. `p3-bsci-13` — First Aid and Safety

**Save as:** `style-b-p3-bsci-13.png` → `tools/image-pipeline/output/raw/style-b-p3-bsci-13.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A calm three-panel sequence: a child checking the area is safe and calling an adult (raised hand gesture, speech bubble toward an adult figure); an adult gently pressing a clean cloth on a child's arm (no wound visible, just the cloth and a caring expression); and an adult holding a child's hand under a running tap of cool water, with a small clock-face icon (blank hour markers, no numerals) showing time passing, for a burn. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No visible blood, open wound, burn mark, or injury detail of any kind — depict only the calm, competent care actions (checking safety, calling an adult, clean cloth, cool running water); do not show oil, toothpaste, or ice being applied; do not depict broken glass, a fallen wire, floodwater, or smoke up close — those hazards should only be implied by the child pointing/stepping away.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** (none)

---

### 6. `p5-bsci-15` — Harmful Substances and Drug-Awareness Safety

**Save as:** `style-b-p5-bsci-15.png` → `tools/image-pipeline/output/raw/style-b-p5-bsci-15.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple three-step safety sequence for a child: a raised hand gesture meaning 'no'; a child walking away toward safety; and a child talking to a trusted adult. No substances, packaging, or people depicted using anything. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. Do not depict any substance, bottle, cigarette, or medicine — the image must show only the child's three safety actions, per the module's non-stigmatizing, substance-free framing.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Ka Ce A'a, Ka Matsa, Ka Sanar da Babba

---

### 7. `p6-bsci-06` — Puberty, Hygiene, and Body Privacy

**Save as:** `style-b-p6-bsci-06.png` → `tools/image-pipeline/output/raw/style-b-p6-bsci-06.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A fully clothed, non-anatomical diagram: a simple child-to-teen silhouette growth arrow (both figures modestly and identically dressed, no body detail shown), paired with a hygiene-items row (soap, clean folded clothes, a wash basin of water) and a small trusted-adult figure a child can walk toward — representing the module's guidance to go to a safe place and tell a trusted adult. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No depiction of any body part normally covered by clothing, no undressed or partially dressed figure, no anatomical or medical illustration. Every figure stays fully and modestly clothed throughout; the growth arrow shows only outline silhouettes, not physical development detail.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Balaga, Tsafta, Amintaccen babba

---

### 8. `p6-bsci-07` — Human Reproduction, Growth, and Development

**Save as:** `style-b-p6-bsci-07.png` → `tools/image-pipeline/output/raw/style-b-p6-bsci-07.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A clinical, textbook-style abstract schematic diagram (in the same restrained line-diagram register as a standard biology textbook figure, not a realistic or characterful illustration): simple labeled outline shapes showing the reproductive-system layout and the stages of prenatal development from a single fertilized cell dividing, to implantation, to a growing fetus outline inside a simple womb outline — flat, symbolic, diagrammatic linework only, matching the module's own instruction that only a single teacher-approved diagram should be used. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. Abstract schematic/diagrammatic register only — no realistic human bodies, no nudity, no facial detail on any figure, no sexual or intimate content of any kind. Confine the entire image to flat labeled-diagram shapes, consistent with the module's explicit instruction that this is scientific information delivered via one teacher-approved diagram, not a depiction of any real people or act.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Haihuwa, Girma

---

### 9. `p6-bsci-09` — Nigeria's Mineral Resources and Responsible Use

**Save as:** `style-b-p6-bsci-09.png` → `tools/image-pipeline/output/raw/style-b-p6-bsci-09.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A simple sample-tray diagram showing a few labeled, teacher-approved mineral samples (a gold-colored nugget shape, a dark coal lump, an iron-ore rock, limestone, salt crystals, and a small sealed jar representing crude oil) beside a small responsible-use panel showing recycling and land-restoration icons. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No pupil entering a mine, touching crude oil, tasting a rock, or burning a sample — samples are shown only as classroom display items or images, matching the module's explicit restriction.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Zinariya, Kwal, Dutsen ƙarfe, Gishiri, Ɗanyen mai

---

### 10. `p6-bsci-12` — Hand Tools: Identification, Care, and Safety

**Save as:** `style-b-p6-bsci-12.png` → `tools/image-pipeline/output/raw/style-b-p6-bsci-12.png`

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A labeled identification chart of hand tools grouped by function: a tape measure and ruler (measuring), a pencil and marking gauge (marking), and a saw and hand-plane (cutting/shaping), each shown resting on a workbench, not in use — a pupil in the corner is shown only pointing at and sorting picture cards of the tools, not holding any of them. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. This is a recognition-only lesson: no pupil touching, holding, or using the saw or any sharp/pointed tool — tools are shown resting on the bench or as picture cards only, matching the module's explicit restriction.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Awo, Alama, Yanka
