# Ajami development fixtures (2026-07-28) — NOT gold-standard, reference only

Supplied by Muhammad directly in chat. Explicitly marked non-authoritative: "these should be treated as
development fixtures rather than final scholarly gold data." Do not treat any spelling below as approved
until independently reviewed against a formally declared `HAUSA_AJAMI_ORTHOGRAPHY_STANDARD.md`.

Convention claimed: fully vowelled Warsh/Kano-style Unicode Hausa Ajami.

| # | Latin (Boko) | Ajami |
|---|---|---|
| 1 | Yaro ya sha ruwa. | یَارُواْ یَا شَا رُوَا. |
| 2 | Mace ta ci abinci. | مَاثٜىٰ تَا ثِ أَبِࢽْثِ. |
| 3 | Zomo ya ga tsuntsu. | زُومُواْ یَا غَا ڟُࢽْڟُ. |
| 4 | Ɓera ya ci fure. | ݑٜىٰرَا یَا ثِ ࢻُرٜىٰ. |
| 5 | Ɗa ya ɗauki wuƙa. | طَا یَا طَوْکِ وُࢼَا. |
| 6 | Ƴar'uwa ta yi aiki. | ۑَرْعُوَا تَا یِ أَیْکِى. |
| 7 | Ɗan'uwa ya ɗauki ƙaramar wuƙa. | طَࢽْعُوَا یَا طَوْکِ ࢼَرَمَرْ وُࢼَا. |
| 8 | Ɓera ya ci fure, zomo kuma ya ga tsuntsu. | ݑٜىٰرَا یَا ثِ ࢻُرٜىٰ، زُومُواْ کُمَا یَا غَا ڟُࢽْڟُ. |
| 9 | Ɗa ya ɗauki wuƙa, ƴar'uwa ta yi aiki. | طَا یَا طَوْکِ وُࢼَا، ۑَرْعُوَا تَا یِ أَیْکِى. |

## Coverage claimed by the source

ɓ→ݑ, ɗ→ط, ƙ→ࢼ, ƴ→ۑ, c→ث, ts→ڟ, sh→ش, f→ࢻ, n→ࢽ (contextual), g→غ, ai→َیْ, au→َوْ, short/long
a/e/i/o/u, consonant-final sukūn, apostrophe/glottal break in ƴar'uwa and ɗan'uwa.

## Known disagreement with the live `romanToAjami()` engine (app/app.js)

Claude cross-checked these against the currently-shipped engine before this file was written:

| Letter | Live engine (app.js) | This fixture set | Agree? |
|---|---|---|---|
| ɓ | ٻ (U+067B) | ݑ (U+0751) | **NO** |
| ɗ | ڈ (U+0688) | ط (U+0637) | **NO** |
| ƙ | ڪ (U+06AA) | ࢼ (U+08BC) | **NO** |
| ƴ | *(no mapping — falls through as unknown char)* | ۑ (U+06D1) | **NO — engine has a gap** |
| f | ف (U+0641) | ࢻ (U+08BB) | **NO** |
| n (contextual) | ن (U+0646) always | ࢽ (U+08BD) in some contexts | **NO** |

*(Correction 2026-07-28: the live-engine glyph for ƙ was originally mistyped here as ک — U+06A9,
Keheh — instead of the app.js source's actual ڪ, U+06AA, Swash Kaf; and the fixture's contextual-n
glyph was mislabeled U+06BD instead of its actual U+08BD. Caught by Codex's slice-34 audit and verified
directly against app.js source and the raw bytes of this file before correcting. Neither error affected
app.js itself — both were transcription mistakes in this comparison table only.)*
| ts | ڟ (U+069F) | ڟ (U+069F) | yes |
| sh | ش | ش | yes |
| g | غ | غ | yes |
| apostrophe | ع (ain) | ع (ain) | yes |
| c | context-dependent چ/ك (see engine) | ث (thāʾ) in "Mace" example | **NO** |

`docs/ajami-alphabet-guide.md` is a third source and disagrees with both on some of these (see slice-34
audit report for the full three-way comparison).

**These conflicts are open questions for Muhammad, not resolved by this file.**
