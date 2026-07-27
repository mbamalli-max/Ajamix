# Ticket — First-launch-offline error screen shows raw English text

**Filed:** 2026-07-04
**Filed by:** Architect (Claude), from Gate 6 release-gate walkthrough (`docs/VALIDATION-CHECKLIST.md`)
**Severity:** PATCH — narrow trigger window (first-ever launch, no cache, no network), but a hard English-leak when it hits
**Status:** Open, awaiting Foreman/Codex fix — confirmed via code reading; live reproduction not performed (see note below)

---

## Context

Checklist (`docs/VALIDATION-CHECKLIST.md:172`, adjacent item) covers offline/error-state copy. Traced the boot-failure path (`init()`, `app.js:1597-1628`) to see what happens if a brand-new install (no cached content yet) tries to load with no network available.

## The bug

`app.js:2389-2401` — the fatal boot-error screen:
```js
if (state.bootError) {
  root.innerHTML = renderScreenLayout(
    "settings",
    [
      '<section class="screen-panel">',
      '<p class="eyebrow">' + ha("An samu matsala") + "</p>",
      "<h2>" + ha("AJAMIX bai iya budewa ba.") + "</h2>",
      "<p>" + escapeHtml(state.bootError) + "</p>",
      '<button class="btn" data-route="#/onboarding" type="button">' + ha("Sake gwadawa") + "</button>",
      "</section>",
    ].join("")
  );
  return;
}
```

`state.bootError` is set at `app.js:1623`:
```js
state.bootError = error instanceof Error ? error.message : "Failed to boot application.";
```

Tracing where that error can come from for a fresh install with no cache and no network — `loadContentBundle()` (`app.js:6080-6128`) only re-throws to the caller (reaching `bootError`) when there's no cached content to fall back on (`if (!cachedModules.length) { throw error; }`, `app.js:6120-6122`). The underlying fetch failure comes from `fetchAndParseContentBundle()` (`app.js:6156-6187`), which throws hardcoded **English** errors with no Hausa equivalent:

```js
if (!response.ok) {
  throw new Error("Could not load content.json");   // app.js:6165 — English, no ha() wrapper
}
// ...
parseError = new Error(
  "Could not parse content.json (" + contentText.length + " characters received): " + ...
);  // app.js:6178-6183 — also English
```

Both of `ha("An samu matsala")` / `ha("AJAMIX bai iya budewa ba.")` are correctly localized, but the actual error detail sandwiched between them is not — a first-time user with no signal (the exact audience AJAMIX is built for, per the project's offline-first pitch) would see raw text like **"Could not load content.json"** mixed into an otherwise all-Hausa screen.

Also worth noting: `error.message` is passed through `escapeHtml()` but not through `ha()`/`romanToAjami()` — even if the message were translated, this code path bypasses the bilingual-rendering helper used everywhere else in the app (e.g. `renderBilingualMessage()`), so it wouldn't get the Ajami rendering that other error states use.

## Why it matters

This is the fallback for the worst-case scenario the app is explicitly designed around (rural/no-connectivity Hausa learners on first use) — precisely the moment English text is least likely to be understood by the target user, and precisely the moment there's no cached fallback to paper over it.

## Note on verification

Confirmed via code reading only — the `throw new Error(...)` calls are unconditional and hardcoded, so there's no ambiguity about what string would render. Did not reproduce live in this session: doing so requires a first-ever page load (no IndexedDB cache) with the content.json fetch specifically failing while the rest of the shell (HTML/CSS/JS) loads fine — not achievable with this test setup without modifying the test server or blocking a single URL at the network layer, which felt like more infrastructure disruption than the already-unambiguous code justified. Recommend Foreman/Codex do a quick manual repro (e.g. temporarially 404 `content.json` with a fresh IndexedDB) before/after the fix to confirm the corrected copy renders as expected.

## Recommended fix

Wrap the boot-error strings in Hausa, e.g. replace the hardcoded English `Error` messages with `ha(...)`-wrapped equivalents (or keep the technical message internal to `console.error` only, and show a fixed, translated, user-facing string like `ha("An kasa loda darussa. Duba haɗin intanet ɗinka sannan ka sake gwadawa.")` instead of the raw `error.message`). If the raw technical detail is useful for debugging, keep it out of the rendered `<p>` and log it to console only (it already is logged at `app.js:1622`, `console.error("AJAMIX boot failed:", error)`).

Contained to `app.js`; no content/schema changes needed.

## Escalation-style summary

```
Ticket: First-launch-offline boot error screen shows raw English text
Component: app.js:2389-2401 (render), app.js:1623 (bootError assignment), app.js:6165/6178-6183 (English Error messages)
Trigger: brand-new install (no cached content.json in IndexedDB) attempting to boot with no network reachable
Actual: "An samu matsala" / "AJAMIX bai iya budewa ba." (correct Hausa) followed by raw English error text e.g. "Could not load content.json"
Expected: fully Hausa error copy, technical detail kept in console.error only (already logged) rather than shown to the user
Fix location: app.js only, no content/schema changes
Verification: code-confirmed only; live repro needs a controlled network failure on a fresh IndexedDB state, not performed this session
```
