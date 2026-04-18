# Performance Baseline

Date: 2026-04-17

## Gzip Sizes

| Asset | Gzipped bytes | Target | Result |
|---|---:|---:|---|
| `app/app.js` | 51,586 | 150,000 | Pass |
| `app/styles.css` | 8,421 | 20,000 | Pass |
| `app/content.json` | 59,806 | n/a | Reference only |
| `app/vendor/jszip.min.js` | 28,535 | n/a | Reference only |

## Split Decision

- `app/app.js` is well below the 150 KB gzip threshold, so no native ES-module split was required in Sprint 10.
- `app/index.html` stayed on the existing single `app.js` load path, and no new shell files were added for code splitting.

## Shell And Cache Audit

- `content.json` is not in `SHELL_FILES`; it still loads through the service worker `CONTENT_CACHE` path.
- `cacheFirst()` already checks `response.ok` before caching, so missing audio `404` responses are not cached.
- Sprint 10 bumps the app shell cache to `ajamix-v20`.

## Ajami QA Summary

- `app/tools/check-ajami-output.mjs` checked `titleHa`, `summary.ha`, `gapTeaser.ha`, and `useTodayPrompt.ha` for `V01`–`V10`.
- Automated QA found `0` literal `?` / empty-output flags.
- The computed `titleAjami` output matched the existing vocational title spellings, so no title text changes were needed.
- `ajami_validated` is now `true` on all ten vocational modules.

## Validator / Module Format Note

- The repo root `package.json` stays CommonJS-friendly for the Vercel `api/*.js` functions.
- To avoid the Node typeless-module warning on the content validator, the validator moved from `app/tools/validate-content.js` to `app/tools/validate-content.mjs`.
