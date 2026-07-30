# Harmattan 4.400 — provenance record (Stage 4A)

- **Source (official SIL, not a mirror)**: https://software.sil.org/downloads/r/harmattan/Harmattan-4.400.zip
- **Version**: 4.400 · **Released**: 11 August 2025
- **Package SHA-256**: `94295e761dffc61166f95540801add61ecff5e19b580a74b58d702066910d228`
- **Package size**: 3,780,688 bytes
- **Licence**: SIL Open Font License (`OFL.txt`, `OFL-FAQ.txt` included upstream; `OFL.txt` copied here)
- **Font internal version metadata**: `Version 4.400` (name ID 5)
- **Weights shipped**: Regular, Medium, SemiBold, Bold — as TTF and as WOFF/WOFF2 webfonts
- **Downloaded and verified by**: Claude, 2026-07-28. Codex's sandbox has restricted network and cannot
  fetch this; acquisition was performed outside the dispatch and staged here for qualification.
- **Unmodified**: files copied verbatim from the official package. Not renamed, not subset, not
  TypeTuner-processed, no OpenType features altered.

## Coverage verified by Claude with fontTools before staging

- All **15/15** canonical consonant/cluster code points present in `Harmattan-Regular` (TTF and WOFF2).
- All **16/16** required combining marks and carriers present.
- The five code points **missing from the shipped Noto Naskh build** — `U+08BB` (f), `U+08BC` (ƙ),
  `U+08BD` (n), `U+08C3` (gw/gy), `U+08C4` (ƙw/ƙy) — plus `U+063F` (ƴ) are present in **all four weights**.

`cmap` presence is necessary but not sufficient — shaping, joining and mark positioning are Stage 4A.3.
