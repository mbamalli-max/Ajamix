# Slice 38 report — Stage 4A desktop visual qualification artifact

## Result

Revised `tools/ajami-pipeline/font-qualification.html` only as a review artifact. No production wiring,
Ajami reactivation, font staging, converter, content, or service-worker change was made. Human desktop
visual review remains required to close the gate.

## Required review conditions

- [x] Explicit 12px, 16px, 20px, 28px, and 40px Regular specimen rows are present.
- [x] A dedicated light-background key-specimen section and a dark-background section are present.
- [x] Every rendered Hausa Ajami specimen cell receives `lang="ha-Arab"` and `dir="rtl"`.
- [x] Every rendered Arabic/Qur'anic specimen carries `lang="ar"` and `dir="rtl"` (including the
  standalone Qur'anic specimen and nested quoted-Arabic span).
- [x] Language-attribute-driven routing is defined for `[lang="ha-Arab"]` (Harmattan-first) and
  `[lang="ar"]` (shipped-Noto-first); comparison-column classes intentionally override that routing only
  to preserve the three-way control.
- [x] The visible DevTools panel waits for `document.fonts.ready`, calls `document.fonts.check()` for all
  five faces, and lists the five declared local WOFF2 sources with their load result.
- [x] A labelled Harmattan-disable toggle forces the Harmattan comparison column to shipped Noto so the
  reviewer can confirm visible change.
- [x] Inline instructions direct the reviewer to DevTools Network and the `.woff2` requests.
- [x] All seven required extended/cluster characters remain represented: `ݑ`, `ࢻ`, `ࢼ`, `ࢽ`, `ؿ`, `ࣃ`,
  and `ࣄ`.
- [x] All seven required mark specimens remain represented: fatha, kasra, damma, short-e U+065C, sukūn,
  shadda, and dagger alif.
- [x] Literal Unicode code-point labels remain generated for every specimen row.
- [x] The shipped Noto / stock Harmattan / system fallback three-way comparison remains intact.
- [x] Regular, Medium, SemiBold, and Bold specimens are present.
- [x] Narrow mobile-width, Western numerals/punctuation, 200% zoom, and stacked-mark specimens are
  present.
- [x] Checklist-priority rows 4, 5, and 20 each have prominent, dedicated sections; section headings map
  the page top-to-bottom to checklist rows 1–25.

## Verification

Passed:

```text
node --check <(sed -n '/<script>/,/<\/script>/p' tools/ajami-pipeline/font-qualification.html | sed '1d;$d')
git diff --check
node --test tools/ajami-pipeline/     # 40 passed, 0 failed
node app/tools/validate-content.mjs   # OK — 389 modules pass
git diff --quiet -- app/ docs/ ajamix-polished/ && echo PRODUCTION_UNCHANGED
# PRODUCTION_UNCHANGED
```

`git diff --stat -- app/ docs/ ajamix-polished/` produced no output and exited successfully; production
paths are unchanged.

## Files changed

- `tools/ajami-pipeline/font-qualification.html`
- `tasks/2026-07-28-slice-38-report.md`

Note: `tools/ajami-pipeline/` is presently untracked in this workspace, so Git cannot present a tracked
diff for the revised qualification page. No Git state-changing command was run.

## Not performed

No human browser visual verdict was entered, and no additional font analysis, font selection, TypeTuner
work, subsetting, staged-font modification, or production application change was performed.
