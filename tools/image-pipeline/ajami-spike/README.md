# Ajami typography spike

The staged SIL Alkalami 3.000 font is referenced in place through local Fontconfig configuration; it is not copied into any output. `run-spike.mjs` exercises right-to-left direction, joining/diacritics, line height, centering, right alignment, arrow labels, two-line bilingual layout, mixed Latin/Ajami content, and mobile-size text in SVG and raster PNG through sharp/libvips.

Every string and output is **UNVALIDATED** and visibly marked `GWAJI — BA A TANTANCE BA / UNVALIDATED TEST`. The resulting glyph report separates technically rendered, visually legible, and linguistically validated; this phase can assess only the first two. It never writes an Ajami string to `app/content.json`.
