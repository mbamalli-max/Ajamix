# AJAMIX

AJAMIX — Offline full-curriculum education in Ajami for students across Northern Nigeria.

## Overview

AJAMIX is a vanilla JavaScript, offline-first Progressive Web App delivering the full Nigerian western education curriculum — Nursery through SS3, across all subjects — in Ajami (Arabic script for Hausa). It is designed to run device-locally, cache the app shell for low-connectivity use, and deliver learning content from a JSON bundle rather than a backend service.

Content is audio-primary, in Hausa, with key terms rendered in Ajami script. The platform serves tsangaya students, adult learners, and anyone who is literate in Ajami but has had limited access to western schooling.

## Tech stack

- Vanilla HTML, CSS, and JavaScript
- Progressive Web App manifest + service worker
- IndexedDB for local settings, modules, glossary, audio cache metadata, and progress
- Node.js CLI for CSV-to-JSON content bundling

## Local run

Serve the project so the app is available at `/app/`.

```bash
cd ajamix
python3 -m http.server 4173
```

Then open `http://localhost:4173/app/`.

## Content pipeline

The content pipeline turns a CSV file into the JSON bundle consumed by the app shell.

From the `ajamix/tools/` directory:

```bash
node content-pipeline.js --input ../modules.csv --output ../app/content.json
```

From the `ajamix/` project root:

```bash
node tools/content-pipeline.js --input modules.csv --output app/content.json
```

Expected CSV columns include:

- `module_number`, `grade_band`, `subject`, `subject_ha`
- `title_en`, `title_ha`, `title_ajami`
- `text_explanation_ha`, `audio_filename`
- `micro_pause_1_ms` through `micro_pause_2_options`
- `quiz_1_template` through `quiz_5_distractor_3`

Grade bands: `nursery`, `p1`–`p6`, `jss1`–`jss3`, `ss1`–`ss3`

`micro_pause_*_options` should be pipe-delimited, for example `3|5|7`.

## Notes

- The `app/fonts/` directory is ready for bundled `woff2` font files.
- Audio and image files are referenced as placeholder paths for now.
- `docs/PRD.md` and `docs/TAS.md` were intentionally left untouched outside this subproject scaffold.
