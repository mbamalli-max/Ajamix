Slice 36 is complete and isolated.

Key results:

- Tokenizer coverage: **99.8678%** across 7,227 Hausa fields.
- Unicode scan: both known defects detected; source remained byte-identical.
- Font `cmap`: **10/15** targets present; missing `U+08BC`, `U+08BB`, `U+08BD`, `U+08C3`, `U+08C4`.
- Tests: **36 passed, 0 failed**.
- Content validation: **389 modules pass**.
- Production integrity: **`PRODUCTION_UNCHANGED`**.
- Zero generated or seed entries marked `approved`.

Full report: [slice-36-report.md](/Users/muhammadbamalli/code/ajamix/tasks/2026-07-28-slice-36-report.md)

Browser visual-verification page: [font-probe.html](/Users/muhammadbamalli/code/ajamix/tools/ajami-pipeline/font-probe.html)

Contextual shaping, mark placement, and actual fallback remain explicitly pending browser review.