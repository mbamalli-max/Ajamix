import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const SW_PATH = new URL("./sw.js", import.meta.url);
const APP_PATH = new URL("./app.js", import.meta.url);

test("app.js's directly-opened content cache name matches sw.js's CACHE_VERSION", () => {
  const swSource = fs.readFileSync(SW_PATH, "utf8");
  const appSource = fs.readFileSync(APP_PATH, "utf8");

  const versionMatch = swSource.match(/const CACHE_VERSION = "([^"]+)";/);
  assert.ok(versionMatch, "sw.js must define CACHE_VERSION as a plain string literal");
  const cacheVersion = versionMatch[1];

  const contentCacheMatch = swSource.match(/const CONTENT_CACHE = `ajamix-content-\$\{CACHE_VERSION\}`;/);
  assert.ok(
    contentCacheMatch,
    "sw.js's CONTENT_CACHE must stay derived from CACHE_VERSION as `ajamix-content-${CACHE_VERSION}`"
  );
  const expectedContentCacheName = `ajamix-content-${cacheVersion}`;

  // app.js writes verified content.json directly into CacheStorage (bypassing
  // the service worker) so the SW's offline fallback can find it under the
  // same cache name. That name is hand-typed, not derived, so it silently
  // drifts from sw.js's CACHE_VERSION on every version bump unless both are
  // updated together -- this happened once already (v23/v23 shipped in sync
  // by luck, not by construction). This test makes the drift fail loudly.
  const appCacheOpenMatch = appSource.match(/caches\.open\("([^"]+)"\)\.then/);
  assert.ok(appCacheOpenMatch, "app.js must directly open a named content cache via caches.open(\"...\").then(...)");
  const appCacheName = appCacheOpenMatch[1];

  assert.equal(
    appCacheName,
    expectedContentCacheName,
    `app.js's hardcoded cache name ("${appCacheName}") must match sw.js's derived CONTENT_CACHE name ("${expectedContentCacheName}"). ` +
      "Update the hardcoded string in app.js's cacheVerifiedContentResponse() whenever CACHE_VERSION changes in sw.js."
  );
});
