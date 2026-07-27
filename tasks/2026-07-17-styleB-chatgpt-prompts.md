# Style B — 3-image pilot test — ChatGPT-pasteable prompts

Manual-generation alternative to the API pipeline. Same Style B constraints, same 3-image test as the original 2026-07-12 pending test — just pasted into ChatGPT's image tool by hand instead of run through `generate/client.mjs`.

**After generating each image:** download it and save with the exact filename below (don't rename) — that's what the later compositor/QA/promotion steps will expect.

---

## Image 1 of 3 — `style-b-p2-bsci-16.png` (contextual illustration, plant needs)

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A potted bean plant with four visually distinct, high-contrast cues for water, air, sunlight, and suitable soil: a small watering can beside the pot, gentle air movement suggested only by the placement of a light breeze cue (no lines or arrows), warm sunlight as a simple sun shape without rays or symbols, and healthy sienna soil visibly around the roots. A 6–7-year-old Nigerian girl character (Amina) gently checks the soil with careful hands without pulling any leaf or stem; accurate child proportions, deep-brown skin, cream-and-indigo school clothing. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian classroom/courtyard details. Keep the upper 22% band and left/right margins completely unpainted: no wash, texture, line, icon, or incidental detail there. Do not include any writing, symbols, numbers, equations, arrows, or labels anywhere in the illustration.

**Negative prompt (paste as a follow-up instruction, or append to the prompt as "Avoid:"):**

> No text, letters, numbers, equations, arrows, labels, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, caricature, unsafe child behavior, plant damage, distorted anatomy. No leaf-pulling and no excessive water.

**Save as:** `style-b-p2-bsci-16.png`

---

## Image 2 of 3 — `style-b-p4-bsci-18.png` (labelled science diagram, digestion — non-graphic)

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A non-graphic, simple clothed torso outline in a calm front-facing pose, plus four separate high-contrast tooth-shape reference silhouettes beside the head. Leave generous completely unpainted space in the interior and surrounding the torso — no organs, lines, arrows, or connectors drawn inside it. No exposed organs, medical procedure, illness, or anatomy-relationship lines. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally neutral premium primary-school diagram context. Keep the upper 22% band and left/right margins completely unpainted. Do not include any writing, symbols, numbers, arrows, or labels anywhere in the illustration.

**Negative prompt:**

> No text, letters, numbers, arrows, labels, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, caricature, exposed organs, graphic medical content, procedure, illness, blood, or any line connecting body parts.

**Save as:** `style-b-p4-bsci-18.png`

---

## Image 3 of 3 — `style-b-p3-maths-02.png` (arithmetic diagram background only)

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Produce only a clean high-contrast background, border/frame, and visual context for a worked-arithmetic diagram: a restrained Northern Nigerian classroom desk or pale notebook-paper setting around a large central completely unpainted rectangular work area in the middle of the image. The central rectangle must stay entirely blank — no numbers, symbols, characters, grid lines, or objects inside it. Translucent controlled watercolor with high-contrast frame details and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around the frame, clear educational visual hierarchy. Keep the upper 22% band and left/right margins completely unpainted. Do not include any writing, numbers, symbols, or arithmetic anywhere in the illustration.

**Negative prompt:**

> No text, letters, numbers, equations, arithmetic, plus sign, equals sign, arrows, labels, watermark, logo, brand, photorealism, pale or muddy wash, dark muddy wash, caricature, notebook ruling, grid, or any marks inside the central rectangle.

**Save as:** `style-b-p3-maths-02.png`

---

## After you have all 3 images

Save all three into `tools/image-pipeline/output/raw/` with the exact filenames above (matching what the guarded pipeline scripts already expect), then tell me — I'll:
1. Run the existing QA checklist against them (contrast/consistency thresholds, confirm no stray AI-rendered text/numbers snuck in).
2. Report findings so you can make the Style B accept / fall back to Style C call.
3. If accepted, move to building the full Social Studies prompt set the same way.
