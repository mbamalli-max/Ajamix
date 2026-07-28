Stopped safely at the activity-image guard.

- Converted and verified all 359 images: 812.36 MiB → 36.20 MiB (95.54% reduction).
- Added the guarded conversion and repoint scripts.
- Did not alter `content.json` or `.gitignore`.
- Blocker: six `activities[]` paths (`pn-maths-01`…`pn-maths-06`) reference PNGs with no corresponding masters or WebPs, so repointing correctly aborted before any write.

No PNG was deleted. No git state-changing command was run.

Full details: [slice-32-report.md](/Users/muhammadbamalli/Documents/ajamix/tasks/2026-07-28-slice-32-report.md)