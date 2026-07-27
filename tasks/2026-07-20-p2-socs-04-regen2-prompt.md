# Regeneration prompt — p2-socs-04 second-pass fix (top-band tree intrusion)

**Defect found (re-QA, 2026-07-20):** the first regeneration fixed the original mosque-architecture
FAIL cleanly (worship building now small, off-center, subordinate to school/clinic) but introduced a
new issue — a tree canopy in the upper-left intrudes into the required blank top 22% band (starting
around 13% of image height), which risks colliding with the overlay compositor's title/label zone.
Muhammad's decision (2026-07-20): one more regeneration pass with explicit tree-height language, rather
than accept as-is.

**Save as:** `style-b-p2-socs-04.png` → `tools/image-pipeline/output/raw/style-b-p2-socs-04.png`
(overwrite the existing file)

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. A cooperative Northern Nigerian community scene with houses, a school, a market stall, a neutral place of worship, and a clinic visible together, with a teacher, doctor, farmer, and trader each shown doing their distinct role and residents greeting one another calmly. The place of worship must be a small, plain, flat-roofed, unadorned civic-style building placed off-center and given no more visual weight or detail than the houses or clinic around it — it must not be the largest, most detailed, or most central structure in the scene. It has no dome, no minaret, no arch, and no faith-specific silhouette of any kind; it reads as a shared communal building only, not as a mosque, church, or any specific denomination's structure. Any trees, shrubs, or foliage in the scene must stay well below the upper 22% of the frame — keep every tree canopy, branch, and leaf cluster confined to the lower 78% of the image, with a wide, genuinely empty buffer of plain paper-white space above every tree, the same way the top band is already kept empty of buildings and people. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail — this includes foliage and tree canopies, not only buildings and people. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.

**Avoid:**

> No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. No political, religious-hierarchy, or ethnic symbol; show men and women in varied community roles without gender stereotyping, and no litter or damaged public property. No dome, no minaret, no crescent finial, no arched mosque-style windows, no church spire, no cross, no religious-specific roofline of any kind; the place of worship must not be the dominant, largest, or most central building in the composition. Specifically: no tree, shrub, branch, or leaf cluster reaching into the upper 22% of the frame — every tree must be short enough, or positioned low enough, that its highest point stays clearly below that band, with visible blank paper-white space between the tallest foliage and the top edge of the image.

## Workflow

Paste Prompt + Avoid into ChatGPT, save as `style-b-p2-socs-04.png`, overwrite the existing file at
`tools/image-pipeline/output/raw/style-b-p2-socs-04.png`. Re-QA specifically for the top-band/foliage
fix (and re-confirm the worship-building fix still holds) before accepting.
