# B — Clean watercolor editorial

**Shared comparison subject:** manifest `p2-bsci-16`, *What Plants Need to Grow*: a potted bean plant, four visually distinct cues for water, air, sunlight, and soil, and one child gently checking soil without pulling any leaf or stem. Required Latin Hausa overlay strings are `Ruwa`, `Iska`, `Hasken Rana`, `Ƙasa`. Use the recurring cast in [characters.md](characters.md): Amina observes; no other cast member is needed.

| Direction | Definition |
|---|---|
| Palette | airy rice-paper white, cool blue-grey, fresh leaf green, sienna soil, restrained mango yellow, one brick-red accent |
| Texture | transparent watercolor washes and gentle pigment blooms, with clean white-paper breathing room |
| Lighting | diffuse daylight with almost no cast shadow; values separate forms rather than theatrical lighting |
| Line treatment | fine pencil/ink-edged contour selectively applied, lighter and cleaner than A |
| Background detail | editorially reduced classroom/courtyard context, 10–15% detail density and generous unpainted paper |
| Characters | poised, friendly children with accurate proportions; soft wash faces and small, specific facial marks |
| Objects | crisp silhouettes filled by translucent washes; icons read instantly at card size |
| Science diagram | clean editorial object grouping; evidence cues sit around the plant with ample connector space |
| Label-safe area | retain a high-key white band across top 22% and left/right margins; no wash behind label boxes |
| Cultural setting | practical Northern Nigerian classroom materials, cotton uniform, earthenware/plastic planting context only as scene-relevant |
| Prohibited | generated text, watermark, branding, photorealism, flat-vector finish, exaggerated ethnic features, pseudo-African decorative clichés, murky washes |

## Locked Phase 2 constraints — working direction only

1. Keep focal objects high-contrast against their immediate background; pale or muddy washes are prohibited.
2. Use selective indigo/pencil contours around important silhouettes so focal objects remain crisp at card size.
3. Label-safe zones must be **completely unpainted** paper: retain the high-key white band across the top 22% and the left/right margins, with no wash, texture, line, icon, or incidental detail behind later label boxes.
4. Numbers, equations, arrows, labels, anatomy relationships, and circuit connections are deterministic overlay content. The artwork prompt and negative prompt must explicitly instruct the model to leave them out of generated art; `tools/image-pipeline/overlay/compositor.mjs` adds them afterward.
5. **Fallback rule (documented decision, not executable logic): if Style B repeatedly fails contrast or consistency on this 3-item test, the next candidate is C. Never A.** Muhammad makes any fallback decision after real-art review.
6. This is a working-direction lock for Style B, **not final rendered-art approval**. Approval happens only after real generated art is reviewed.

## Prompt template

`Clean watercolor editorial illustration for a premium children’s curriculum, landscape 3:2. [SCENE]. Translucent controlled watercolor with high-contrast focal objects and no pale or muddy washes, bright paper-white negative space, selective indigo/pencil contours around important silhouettes, clear educational visual hierarchy, culturally grounded Northern Nigerian details, AJAMIX recurring character [CHARACTER]. Keep the upper 22% band and left/right label-safe margins completely unpainted: no wash, texture, line, icon, or incidental detail. Do not include any writing, symbols, numbers, equations, arrows, labels, anatomy-relationship lines, or circuit/wire connections in the illustration; these are added only by the separate overlay compositing step.`

## Negative-prompt template

`No text, letters, numbers, equations, arrows, labels, rendered anatomy-relationship lines, rendered circuit/wire connections, watermark, logo, brand, photorealism, generic flat icon set, pale or muddy wash, dark muddy wash, low-contrast focal objects, over-rendered texture, pseudo-African patterning, caricature, unsafe child behavior, plant damage, distorted anatomy, or rendered callout labels. Numbers, equations, arrows, labels, anatomy relationships, and circuit connections are added by a separate compositing step.`
