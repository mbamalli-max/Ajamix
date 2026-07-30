# Harmattan loading architecture — inert design example

This file is documentation only. It is intentionally not imported by `app/`,
not present in the service worker, and not production activation.

## Recommended production shape

Self-host only the qualified WOFF2 files under an application-owned path. The
Hausa family is Harmattan-first; the Arabic/Qur'anic family is Noto-first.
Keep `font-synthesis: none` so a missing real weight cannot be silently faked.

```css
@font-face {
  font-family: "AJAMIX Harmattan";
  src: url("./fonts/Harmattan-Regular.woff2") format("woff2");
  font-style: normal;
  font-weight: 400;
  font-display: block;
}

@font-face {
  font-family: "AJAMIX Harmattan";
  src: url("./fonts/Harmattan-Bold.woff2") format("woff2");
  font-style: normal;
  font-weight: 700;
  font-display: block;
}

[lang="ha-Arab"] {
  font-family: "AJAMIX Harmattan", "Noto Naskh Arabic", serif;
  font-synthesis: none;
}

[lang="ar"] {
  font-family: "Noto Naskh Arabic", "AJAMIX Harmattan", serif;
  font-synthesis: none;
}

html.ajami-font-pending [lang="ha-Arab"] {
  visibility: hidden;
}
```

Preload only weights required on the first screen:

```html
<link
  rel="preload"
  href="./fonts/Harmattan-Regular.woff2"
  as="font"
  type="font/woff2"
>
```

Do not reveal Hausa Ajami merely because the page is interactive. Hold only
Ajami rendering until the exact local face resolves:

```js
document.documentElement.classList.add("ajami-font-pending");

async function releaseAjamiAfterFontLoad() {
  const criticalHausa = "ࢼࢻࢽؿݣࣃࣄَُِّْٰٜ";
  const loaded = await document.fonts.load(
    '400 1em "AJAMIX Harmattan"',
    criticalHausa
  );
  if (loaded.length === 0) {
    throw new Error("Required offline Hausa Ajami font did not load");
  }
  await document.fonts.ready;
  document.documentElement.classList.remove("ajami-font-pending");
}

releaseAjamiAfterFontLoad().catch(() => {
  // Keep the Ajami run hidden and replace its region with an accessible,
  // localized "font unavailable" state. Do not reveal fallback tofu.
  document.documentElement.classList.add("ajami-font-error");
});
```

This Ajami-specific gate is preferred over blocking the entire application:
Latin/Boko navigation can render immediately, while no Hausa Ajami word is
ever assembled from fallback fonts or flashed as tofu.

## Service-worker and integrity example

The selected font URLs must be in the install-time precache, not a runtime-only
cache. Derive the cache-version suffix from the content manifest so a changed
font cannot reuse an old cache.

```js
const STATIC_CACHE = "ajamix-static-harmattan-4.400-01ddeda0-c5fd1614";
const REQUIRED_OFFLINE_ASSETS = [
  "./fonts/Harmattan-Regular.woff2",
  "./fonts/Harmattan-Bold.woff2",
  "./fonts/NotoNaskhArabic-Regular.woff2"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(REQUIRED_OFFLINE_ASSETS))
  );
});
```

The real build should fail closed before packaging:

```sh
shasum -a 256 -c tools/ajami-pipeline/fonts/harmattan-4.400/SHA256SUMS.txt
```

The production manifest should retain only the hashes of selected, byte-for-byte
qualified files and compare them against copied output. Serve `.woff2` as
`font/woff2`, from the same origin, with no CDN or CORS dependency. A clean
offline install must complete with all required fonts already cached; there
must be no post-install network request needed to show Ajami.

