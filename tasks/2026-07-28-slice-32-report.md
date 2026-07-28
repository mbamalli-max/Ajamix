# Slice 32 report — STOPPED at guarded activity-image check

## Status

**STOPPED before any `app/content.json` or `.gitignore` change.** The required
activity-image guard found six top-level `activities[]` PNG paths whose WebP
counterparts do not exist, so the repoint script aborted with no write. This is
the requested safe behavior; proceeding would create a partial migration.

## Completed safely

- Preflight confirmed `app/images/` initially held exactly **359 PNGs**, no
  other files, and **zero** `* 2.png` iCloud duplicates.
- The 359 PNG masters mapped one-to-one to the 359 module `imageCard` values;
  no module PNG reference was missing and no PNG master was unreferenced.
- Added `tools/image-pipeline/png-to-webp.mjs`, an idempotent guarded converter
  that uses the specified Sharp resize/WebP settings and never deletes PNG
  masters.
- Converted all **359/359** PNGs. The tool then independently read every WebP
  through Sharp and verified non-zero size, WebP format, and expected decoded
  dimensions (1024px wide unless the original was narrower, with preserved
  aspect ratio): **PASS**.
- Measured size: **851,822,864 bytes (812.36 MiB) -> 37,961,028 bytes
  (36.20 MiB), a 95.54% reduction.**
- Added `tools/image-pipeline/repoint-imagecards.mjs`. It verifies every target
  WebP before it creates a backup or writes content, preserves raw JSON
  formatting through exact string replacements, and verifies object equality
  except for intended `imageCard` replacements.

## Blocking finding

The top-level activity array has six PNG image cards, none with a matching
master PNG or generated WebP in `app/images/`:

- `pn-maths-01` through `pn-maths-06`
- Paths: `images/pn-maths-01.png` through `images/pn-maths-06.png`

The repoint script therefore failed before backup/write with:

> `activity pn-maths-01: required WebP does not exist: images/pn-maths-01.webp.`

Current post-stop state:

- `app/content.json`: unchanged; still 389 modules and 359 module PNG image
  cards.
- No pre-WebP content backup was created, because the safety guard fires before
  backup/write.
- `.gitignore`: unchanged (`app/images/` remains the directory-wide rule).
- Image directory: 359 PNG masters retained and 359 generated WebPs present.

## Not run because the guard required a stop

- Content repoint completion/idempotency verification.
- `.gitignore` update and `git status` addability verification.
- Application validators and acceptance gate.
- `app/app.js` / `app/sw.js` PNG-assumption grep.

## Git and deletion confirmation

No git state-changing command was run: no add, commit, push, checkout, reset,
or stash. One permitted read-only `git status --short` preflight was run. No
PNG was deleted or modified.

## Required direction

Provide or explicitly exclude/migrate the six `pn-maths-01..06` activity image
assets. Once their intended treatment is decided, rerun the guarded repoint
script and the remaining Slice 32 checks.
