Revised [font-qualification.html](/Users/muhammadbamalli/code/ajamix/tools/ajami-pipeline/font-qualification.html) and wrote the requested [slice report](/Users/muhammadbamalli/code/ajamix/tasks/2026-07-28-slice-38-report.md).

Included:
- Mandatory 12/16/20/28/40px ladder, dark/light comparison, priority row sections.
- `lang`/`dir` language-driven Hausa/Arabic routing.
- Local WOFF2 status panel, Network instructions, and Harmattan-disable toggle.
- Preserved three-way comparisons, code-point labels, marks, clusters, weights, mobile, bidi, and zoom coverage.

Verification passed:
- `node --test tools/ajami-pipeline/` — 40 passed
- `node app/tools/validate-content.mjs` — OK
- Production diff gate — `PRODUCTION_UNCHANGED`

No human visual verdict was entered; that remains the final Stage 4A gate.