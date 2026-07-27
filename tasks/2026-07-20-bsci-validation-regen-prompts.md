# Style B — Basic Science validation batch regeneration — 3-image targeted fix set

QA (`tasks/2026-07-20-bsci-validation-batch-qa-result.md`) found one FAIL and two BORDERLINE among the
10-image Basic Science validation batch:

- **`p6-bsci-07` (FAIL, safety bar not met):** fetal-development panels rendered with realistic facial
  detail (eyelashes, modeled nose/ear) instead of the required flat/faceless diagram register. Muhammad's
  decision (2026-07-20): regenerate with a stronger no-facial-features constraint.
- **`p6-bsci-06` (BORDERLINE, safety bar met, unrelated issue):** background gratuitously includes a
  mosque dome/minaret not called for by the manifest — same recurring model default already flagged in
  the P1/P2 Social Studies batch.
- **`p6-bsci-12` (BORDERLINE):** the ruler/tape measure carry legible baked-in numerals, which belong
  only to the deterministic overlay layer.

**Workflow per image:** paste Prompt + Avoid into ChatGPT, save with the exact filename given,
**overwrite the existing file**.

---

### 1. `p6-bsci-07` — Human Reproduction, Growth, and Development

**Save as:** `style-b-p6-bsci-07.png` → `tools/image-pipeline/output/raw/style-b-p6-bsci-07.png` (overwrite)

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A clinical, textbook-style abstract schematic diagram (in the same restrained line-diagram register as a standard biology textbook figure — think a printed anatomy-textbook page, not an illustration of a person): simple labeled outline shapes showing the reproductive-system layout and the stages of prenatal development from a single fertilized cell dividing, to implantation, to a growing embryo/fetus shown ONLY as a plain, flat, faceless curled outline silhouette — a simple closed contour line with no internal modeling, no shading, no skin tone, no eyes, no nose, no ears, no mouth, no fingers, no visible limbs in detail, and no dimensional or sculptural rendering of any kind. Every stage in the diagram, including the embryo/fetus stage, must look exactly as flat and schematic as the reproductive-system outline shapes beside it — like a printed diagram, not a painted figure. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. Abstract schematic/diagrammatic register only — no realistic human bodies, no nudity, no sexual or intimate content of any kind. Specifically and critically: the embryo/fetus shape must have absolutely NO facial features (no eyes, no eyelashes, no nose, no ears, no mouth), no skin-tone shading, no dimensional/sculptural modeling, no fine anatomical detail of any kind — it must be a single flat, faceless, closed-contour outline shape only, styled identically to the other flat diagram shapes in the image, not a naturalistic or characterful rendering of a baby or person. If in doubt, make the shape more abstract and less detailed, not more.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Haihuwa, Girma

---

### 2. `p6-bsci-06` — Puberty, Hygiene, and Body Privacy

**Save as:** `style-b-p6-bsci-06.png` → `tools/image-pipeline/output/raw/style-b-p6-bsci-06.png` (overwrite)

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A fully clothed, non-anatomical diagram: a simple child-to-teen silhouette growth arrow (both figures modestly and identically dressed, no body detail shown), paired with a hygiene-items row (soap, clean folded clothes, a wash basin of water) and a small trusted-adult figure a child can walk toward — representing the module's guidance to go to a safe place and tell a trusted adult. The background must be plain and architecturally neutral — a simple wall, room, or open plain background only, with no building, dome, minaret, or worship-related structure of any kind anywhere in the frame; keep the entire background free of any religious or civic-building silhouette. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No depiction of any body part normally covered by clothing, no undressed or partially dressed figure, no anatomical or medical illustration. Every figure stays fully and modestly clothed throughout; the growth arrow shows only outline silhouettes, not physical development detail. Specifically: no dome, no minaret, no crescent finial, no arched mosque-style window, no church spire, no cross, no religious building or silhouette of any kind anywhere in the image, foreground or background.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Balaga, Tsafta, Amintaccen babba

---

### 3. `p6-bsci-12` — Hand Tools: Identification, Care, and Safety

**Save as:** `style-b-p6-bsci-12.png` → `tools/image-pipeline/output/raw/style-b-p6-bsci-12.png` (overwrite)

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A labeled identification chart of hand tools grouped by function: a tape measure and ruler (measuring), a pencil and marking gauge (marking), and a saw and hand-plane (cutting/shaping), each shown resting on a workbench, not in use — a pupil in the corner is shown only pointing at and sorting picture cards of the tools, not holding any of them. The tape measure and ruler must show only plain, blank tick marks (small evenly spaced dashes) with no numerals, digits, or printed measurement text of any kind along their length — the marking surface must be legible as "a ruler" by its plain dash pattern alone, not by any number printed on it. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. This is a recognition-only lesson: no pupil touching, holding, or using the saw or any sharp/pointed tool — tools are shown resting on the bench or as picture cards only, matching the module's explicit restriction. Specifically: no numerals, digits, or measurement text of any kind rendered on the tape measure or ruler — plain blank tick marks only.

**Deterministic overlay labels (NOT part of the prompt — added later by the compositor):** Awo, Alama, Yanka
