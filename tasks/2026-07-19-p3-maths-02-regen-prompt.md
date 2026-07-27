# Regeneration prompt — p3-maths-02 pilot image margin fix

**Defect found (QA, 2026-07-17):** central work area and top band were correctly blank, but
decorative desk objects (pencil cup, paint bowl, blue mat on the left; potted plant, stacked
books on the right) extended into the left/right margins, which the prompt required to stay
"completely unpainted." BORDERLINE verdict — Muhammad's decision (2026-07-19): retry with
stronger margin language rather than accept as-is or swap in the alternate.

**Save as:** `style-b-p3-maths-02.png` → `tools/image-pipeline/output/raw/style-b-p3-maths-02.png`
(overwrite the existing file)

**Prompt:**

> Clean watercolor editorial illustration for a premium children's curriculum, landscape 3:2. Produce only a clean high-contrast background, border/frame, and visual context for a worked-arithmetic diagram: a restrained Northern Nigerian classroom desk or pale notebook-paper setting around a large central completely unpainted rectangular work area in the middle of the image. The central rectangle must stay entirely blank — no numbers, symbols, characters, grid lines, or objects inside it. Place every desk object (pencil cup, paint bowl, mat, plant, books, or any other prop) strictly within the middle horizontal band of the image, fully clear of the outer edges — leave a wide, genuinely empty buffer strip along the entire left edge and the entire right edge, at least as wide as the largest desk object, with absolutely nothing drawn into it: no props, no wash, no texture, no line, no shadow, no incidental detail. Translucent controlled watercolor with high-contrast frame details and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around the frame, clear educational visual hierarchy. Keep the upper 22% band and the full-height left/right margins completely unpainted — treat these margins the same way you already treat the top band. Do not include any writing, numbers, symbols, or arithmetic anywhere in the illustration.

**Negative prompt:**

> No text, letters, numbers, equations, arithmetic, plus sign, equals sign, arrows, labels, watermark, logo, brand, photorealism, pale or muddy wash, dark muddy wash, caricature, notebook ruling, grid, or any marks inside the central rectangle. Specifically: no pencil cup, paint bowl, mat, potted plant, books, or any other prop touching or extending into the left or right edge margins — every prop must sit clear of both side margins with visible blank paper-white space between the prop and the image edge.

## Workflow

Paste Prompt + Negative prompt into ChatGPT, save as `style-b-p3-maths-02.png`, overwrite the
existing file at `tools/image-pipeline/output/raw/style-b-p3-maths-02.png`. Re-QA specifically for
the left/right margin fix before accepting.
