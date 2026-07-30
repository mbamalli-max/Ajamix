# Hausa Ajami Orthography Standard — AJAMIX

**STATUS: DRAFT — Stage 2, pending Muhammad's acceptance.** This revision applies Muhammad's
classification corrections (2026-07-28): canonical does not mean universally exclusive; alternative does
not mean invalid; context-sensitive does not mean unresolved. Nothing here authorizes any change to
`app/app.js`, `app/content.json`, `docs/ajami-alphabet-guide.md`, the script-mode toggle, IndexedDB
settings behavior, or any `ajami_validated` value. The legacy converter and Ajami mode remain disabled.
Stage 3 has not begun.

## 0. Evidence base and provenance

**Normative project decision** — Muhammad's ruling: Hausa Ajami, **Warsh orthography, Kano writing style,
fully vowelled, standard Unicode**. Warsh and Hafs characters must not be mixed within ordinary Hausa
content. Kano appearance comes from font and shaping engine, never from substituting a visually-similar
character.

**External descriptive evidence** — two independent sources, both fetched and quoted directly by Claude,
never relayed from memory:

- **[R12A]** r12a.github.io/scripts/arab/ha.html — Richard Ishida, W3C script notes, "Hausa (ajami)
  orthography notes v32".
- **[N4959]** unicode.org/wg2/docs/n4959-18094-arabic-hausa.pdf — Lorna Evans, *"Proposal to encode
  additional Arabic script characters for Hausa to the UCS"*, 26 April 2018 (ISO/IEC JTC1/SC2/WG2 N4959,
  L2/18-094). **Newly obtained and text-extracted for this revision** — the earlier drafts had not
  consulted it. It contains two full orthography tables: **Table 1a** *"using a standard naskh style"* and
  **Table 1b** *"using Kano/Maghribi style"* — the latter being precisely the style AJAMIX has adopted.

### Font shaping vs. code-point variation — CORRECTED

An earlier revision of this document claimed, on the basis of [N4959]'s Table 2, that naskh-vs-Kano
differences are *always* font-only. **That claim was too broad and is withdrawn.** The accurate statement:

> Many Hausa Ajami characters retain the same Unicode code point while their visible form changes through
> Kano/Maghribi font shaping. However, the sources also document some orthographic or regional
> alternatives represented by **different Unicode code points**. Each mapping must therefore be assessed
> individually.

Cases where the code point is stable and the font supplies the Kano appearance — [N4959] Table 2
("Contrast between the basic character and the characters with wagaf") demonstrates this for the
wagaf-bearing letters, e.g. U+0751 renders as `ݑ` in naskh and `ٻ` in Kano/Maghribi:

```text
ɓ     → U+0751
ts    → U+069F
kw/ky → U+0763
gy/gw → U+08C3
ƙy/ƙw → U+08C4
```

**The `ƴ`/`'y` case is the documented counterexample** and must not be cited as evidence that every
stylistic distinction is font-only: [N4959]'s naskh table (1a) and Kano/Maghribi table (1b) assign
*different code points* for this phoneme (§5.2).

*Claude's note on its own error*: the previous revision asserted the font-only generalization in this
section while simultaneously documenting the `ƴ` code-point conflict in §16.5 as a counterexample. Those
two statements contradicted each other within one document and Claude did not catch it. Corrected here.

**Candidate development material** — `tasks/2026-07-28-ajami-dev-fixtures.md`. Supplies coverage cases and
test-vocabulary candidates only. Never authoritative for any spelling. All sentence-level fixtures are
`provisional` (§13).

**Untrusted legacy material** — all four `romanToAjami()` copies; generated V01–V10 text; existing stored
Ajami; `ajami_validated: true` flags; `docs/ajami-alphabet-guide.md`'s internally self-contradictory
tables. Not authoritative merely by existing.

---

## 1. Table A — Canonical AJAMIX consonant inventory

Every glyph below was mechanically verified against its stated code point (§16.1, zero mismatches).
Category letters per §4: **A** = externally well-supported and project-fixed; **B** = project-fixed despite
documented variation; **C** = context-sensitive.

| Boko | Ajami | Unicode | Cat | External support |
|---|---:|---:|:---:|---|
| `b` | `ب` | `U+0628` | A | [N4959] 1b |
| `ɓ` | `ݑ` | `U+0751` | A | [N4959] 1b (`0751, 0628`); [R12A] Warsh |
| `t` | `ت` | `U+062A` | A | [N4959] 1b |
| `ts` | `ڟ` | `U+069F` | A | [N4959] 1b; [R12A] |
| `d` | `د` | `U+062F` | A | [N4959] 1b |
| `ɗ` | `ط` | `U+0637` | A | [N4959] 1b (`0637, 062F`); [R12A] |
| `c` | `ث` | `U+062B` | A | [N4959] 1b; [R12A] — single form, no context rule |
| `j` | `ج` | `U+062C` | A | [N4959] 1b |
| `k` | `ک` | `U+06A9` | A | [N4959] 1b; [R12A] labels U+06A9 "Warsh orthography" vs U+0643 "Hafs/alternative" |
| `ƙ` | `ࢼ` | `U+08BC` | A | [N4959] 1b (`08BC, 0643`); [R12A] Warsh |
| `g` | `غ` | `U+063A` | A | [N4959] 1b |
| `f` | `ࢻ` | `U+08BB` | A | [N4959] 1b (`08BB, 067E`); [R12A] Warsh |
| `s` | `س` | `U+0633` | A | [N4959] 1b |
| `z` | `ز` | `U+0632` | A | [N4959] 1b |
| `sh` | `ش` | `U+0634` | A | [N4959] 1b |
| `h` | `ح` | `U+062D` | **C** | **Default only — see Table C, §3** |
| `m` | `م` | `U+0645` | A | [N4959] 1b |
| `n` | `ࢽ` | `U+08BD` | A | [N4959] 1b; [R12A] Warsh |
| `w` | `و` | `U+0648` | A | [N4959] 1b |
| `r` | `ر` | `U+0631` | A | [N4959] 1b |
| `l` | `ل` | `U+0644` | A | [N4959] 1b |
| `y` | `ی` | `U+06CC` | **B** | [N4959] **both** 1a and 1b; [R12A] — see decision record §5.1 |
| `ƴ` / `'y` | `ؿ` | `U+063F` | **B** | [N4959] **Table 1b (Kano/Maghribi)** — the directly applicable table; see decision record §5.2 |

### The `n` decision (retraction of an earlier Claude error)

`ࢽ U+08BD` is the canonical **stored** Warsh code point for Hausa `n` — not a "contextual variant." Its
dots may appear or vanish in particular joining positions through font shaping; that is a rendering
concern. **The application stores `U+08BD` unconditionally and must never switch to `U+0646` by word
position.** Claude's Stage 1 audit had mischaracterized this; retracted.

### Digraph and cluster processing order

Longest-match required. Process before single letters: `ƙw`, `ƙy`, `gw`, `gy`, `kw`, `ky`, `sh`, `ts`.
Never process the `s` in `sh`, the `t`/`s` in `ts`, or the `k` in `ƙw` independently first.

### Labialized and palatalized velars — `provisional`

| Boko cluster | Ajami | Unicode | Status |
|---|---:|---:|---|
| `kw`, `ky` | `ݣ` | `U+0763` | provisional |
| `gw`, `gy` | `ࣃ` | `U+08C3` | provisional |
| `ƙw`, `ƙy` | `ࣄ` | `U+08C4` | provisional |

Both sources confirm the code points — [N4959] Table 1b lists them and its collation section proposes
`08B3 < 08C3 < 0641` and `08BC < 08C4 < 06A8`; [R12A]: *"One base character was encoded in Unicode 4.1:
ݣ, and is used for kʷ, kʲ. Unicode code points for the other two were encoded in Unicode v13. They are ࣃ
for ɡʷ, ɡʲ and ࣄ for ƙʷ, ƙʲ."* **The code points are settled; the per-cluster spelling rules in every vowel
environment are not.** Do not freeze into the production converter until the pilot corpus confirms them.

---

## 2. Table B — Documented variants (`noncanonical_variant`)

Legitimate attested Hausa orthography that **AJAMIX will not generate**. These are *not* Unicode defects
and must never be described as such.

| Boko | Variant | Unicode | Attested in | AJAMIX treatment |
|---|---:|---:|---|---|
| `ɓ` | `ٻ` | `U+067B` | [R12A] Hafs | Not generated |
| `ɓ` | `ب` | `U+0628` | [N4959] 1b alternative | Not generated |
| `ɗ` | `د` | `U+062F` | [N4959] 1b alternative; [R12A] "occasional" | Not generated |
| `ƙ` | `ق` | `U+0642` | [R12A] Hafs | Not generated |
| `ƙ` | `ك` | `U+0643` | [N4959] 1b alternative | Not generated |
| `f` | `ف` | `U+0641` | [R12A] Hafs | Not generated |
| `f` | `پ` | `U+067E` | [N4959] 1b alternative | Not generated |
| `n` | `ن` | `U+0646` | [R12A] Hafs | Not generated |
| `y` | `ي` | `U+064A` | Attested in other sources and legacy material | Not generated — **noncanonical for newly generated native-Hausa AJAMIX text; not universally linguistically invalid** |
| `ƴ` / `'y` | `ۑ` | `U+06D1` | [N4959] Table 1a (naskh, for Nigerian `ˈy`); [R12A] Warsh model | Attested naskh/Warsh alternative; **not generated** by AJAMIX. May be *recognized* during imported-text analysis or migration. Not malformed, not universally incorrect — see §5.2 |
| `k`/`ƙ` | `ڪ` | `U+06AA` | Swash kaf; in `docs/ajami-alphabet-guide.md` | Not generated |

---

## 3. Table C — Context-sensitive characters (`contextually_permitted`)

Resolved by classification/lexicon lookup, **never by global substitution**.

| Context | Ajami | Unicode | Status |
|---|---:|---:|---|
| Ordinary native Hausa `h` | `ح` | `U+062D` | Default AJAMIX form |
| Established Qur'anic, Arabic, or proper-name spelling | `ه` | `U+0647` | **Contextually permitted** |

**Rule:** the native-Hausa generator defaults to `ح U+062D`. `ه U+0647` is preserved or selected where an
established Arabic, Qur'anic, proper-name, or reviewed lexical spelling requires it.

**A blind global replacement of `ه` with `ح` would corrupt legitimate Arabic and religious material.**
This is precisely why the text-classification layer (§10) and lexicon layer are prerequisites, not
optional extras.

Both sources support the dual treatment: [N4959] Table 1b lists `h` as **`062D, 0647`** — both, in the
Kano/Maghribi table itself. [R12A]: *"The usual form is 062D. For Quranic names, 0647 is generally used,
but both can sometimes also be used interchangeably, eg. حَوْسَا or هَوْسَا."*

**Legacy audit finding, correctly classified:** the live engine's unconditional `"h": "ه"` (U+0647) for
every Hausa `h` is **`overgeneralized and context-insensitive`** — *not* defective per occurrence. Any
individual `ه` in stored content may well be correct; each requires lexical-context inspection before
being called an error.

---

## 4. Table D — Forbidden Unicode output (`forbidden_output`)

Genuine defects. Never valid in any context.

| Class | Detection | Evidence this is not theoretical |
|---|---|---|
| Arabic Presentation Forms `U+FB50`–`U+FEFF` | Codepoint range check | **Already present**: `pn-maths-01.topicAjami` contains U+FEDB, U+FECF, U+FED3, U+FBAD, U+FEE3 — and is flagged `ajami_validated: true` |
| Latin letter carrying an Arabic combining mark | Script-mixing check | **Already present**: `V08` stores `Vَت` — Latin "V" + fatha U+064E, from transliterating the acronym "VAT" letter-by-letter. Also `ajami_validated: true` |
| Private Use Area characters | Range check | — |
| Triple-dot Hausa consonants built from a base letter + `U+06DB` | Sequence check — use the precomposed characters in Table A | [N4959] specifies Hausa's three-dot characters have *smaller* dots than normal nukat: `063F`, `069F`, `0751`, `0763`, `08C3`, `08C4` — a constructed substitute renders wrong |
| Mixed Warsh and Hafs code points within one native-Hausa word | Cross-reference Table A vs Table B | — |
| Combining mark stored before its base character | Order check | — |
| Non-NFC normalization | Normalization check | — |
| Zero-width controls without documented bidi/joining justification | Presence check | — |

**Font support must be verified** for `U+0751`, `U+08BB`, `U+08BC`, `U+08BD`, `U+08C3`, `U+08C4`.
**Still unverified.** `app/fonts/NotoNaskhArabic-Regular.woff2` is the only Ajami font shipped; its
coverage of these extended code points is unknown. This is a real risk: U+08C3/U+08C4 entered Unicode only
in v13 (2020), and a font predating that will not have them.

---

## 5. Decision records

### 5.1 `y` → `ی U+06CC` — RESOLVED as normative

- **Competing forms**: `ی U+06CC` vs `ي U+064A`.
- **Evidence**: [N4959] gives `06CC` for `y` in **both** Table 1a (naskh) **and** Table 1b
  (Kano/Maghribi). [R12A]'s working inventory also selects it, while noting *"There is some variation in
  sources about the use of ی versus ي."*
- **Selected**: `ی U+06CC`, for consonantal `y` and the `y` element in approved diphthong sequences.
- **Why one form was required**: deterministic generation and stable search/comparison demand a single
  storage form.
- **`ي U+064A` classification**: `noncanonical_variant` — attested elsewhere and in legacy material, not
  universally invalid, simply not generated by AJAMIX.
- **Date / authority**: 2026-07-28, Muhammad.
- **Migration consequence if reversed**: every generated `y` and every diphthong sequence would need
  rewriting; regression corpus and lexicon rebuilt.
- **Claude's assessment**: this is well-supported. Claude's prior draft flagged `y` as weakly-evidenced
  based on [R12A] alone; **[N4959] resolves that** — both its tables agree. The earlier hedge is withdrawn.

### 5.2 `ƴ` / `'y` → `ؿ U+063F` — FINAL RULING (supersedes the earlier `U+06D1` selection)

**Selected form: `ؿ U+063F`.** Ruled by Muhammad 2026-07-28 after Claude's primary-source verification
surfaced the conflict. This reverses the previous revision's selection of `U+06D1`.

**Input aliases — all normalize to one abstract phoneme, then emit `ؿ U+063F`:**

**Aliases are specified by code-point sequence, never by visible glyph** — the three apostrophes are
visually near-identical and must not be distinguished by appearance in code, tests, or review:

| Form | Code-point sequence | Normalized phoneme | Ajami | Unicode |
|---|---|---|---:|---:|
| `ƴ` | `U+01B4` | `HAUSA_GLOTTALIZED_Y` | `ؿ` | `U+063F` |
| `Ƴ` | `U+01B3` | `HAUSA_GLOTTALIZED_Y` | `ؿ` | `U+063F` |
| ASCII apostrophe + y | `U+0027 U+0079` | `HAUSA_GLOTTALIZED_Y` | `ؿ` | `U+063F` |
| right single quotation mark + y | `U+2019 U+0079` | `HAUSA_GLOTTALIZED_Y` | `ؿ` | `U+063F` |
| modifier letter apostrophe + y | `U+02BC U+0079` | `HAUSA_GLOTTALIZED_Y` | `ؿ` | `U+063F` |
| capital variants | same apostrophe + `U+0059` | `HAUSA_GLOTTALIZED_Y` | `ؿ` | `U+063F` |

**Implementation requirement:** normalize all equivalent Boko spellings to the single abstract phoneme
`HAUSA_GLOTTALIZED_Y` *before* Ajami generation, then emit once. **Do not implement several independent
replacement rules** — they will drift apart, exactly as the four `romanToAjami()` copies already have.

- **Primary rationale**: direct alignment with [N4959]'s **Table 1b (Kano/Maghribi)**, which assigns
  `063F` to the `ˈy`/`ƴ` phoneme. Its Table 1a (naskh) distinguishes Nigerian `ˈy` = `06D1` from Nigerien
  `ƴ` = `063F`; the Kano/Maghribi table — the one AJAMIX's declared style makes directly applicable —
  gives `063F`.
- **Product rationale**: AJAMIX is Nigeria-first, built on Nigerian curriculum, explicitly Kano/Maghribi,
  and must accept both the `ƴ` already in its Boko content and the apostrophe-`y` spelling common in
  Nigerian materials.
- **Why [R12A] does not override this**: [R12A] selects `U+06D1` for its Warsh model but openly records
  that this differs from the Evans–Warren-Rothlin proposal and SIL evidence. Where a general descriptive
  survey and the directly-applicable primary-source Kano/Maghribi table conflict, the latter governs for
  this project.
- **Alternative `ۑ U+06D1`**: `noncanonical_variant` — recognized during imported-text analysis or
  migration, never generated. **Not malformed, not universally incorrect.**
- **Migration impact — scoped precisely**: *Existing stored-content* migration impact for `ۑ U+06D1` is
  **zero**: neither `U+06D1` nor the newly selected `ؿ U+063F` currently appears in live
  `app/content.json` (Claude scan, read-only). **Engineering, validation, parser, lexicon and
  future-content migration work remains.** The scan establishes only that no stored-`U+06D1` replacement
  pass is currently required — not that the decision is free of implementation cost. Any *future*
  provisional content containing `U+06D1` must be **flagged for regeneration, not silently accepted**.
- **Reversibility**: retain the abstract phoneme (`HAUSA_GLOTTALIZED_Y`) in the lexicon and source data so
  the emitted code point can be migrated centrally from one place if the standard ever changes.
- **Corpus evidence supporting the alias requirement — measured by Claude across 7,227 Hausa fields**:
  apostrophe-`y` is **~3.5× more common than `ƴ`** in the existing Boko content — `'y` 203, `'y` 51,
  `ʼy` 0 (254 total) versus `ƴ` 47 + `Ƴ` 25 (72 total). Treating apostrophe-`y` as a first-class input
  alias is therefore essential, not a courtesy.

### 5.2-historical `ƴ` → `ۑ U+06D1` — SUPERSEDED (retained for audit trail)

- **Competing forms**: `ۑ U+06D1` vs `ؿ U+063F`. Both have Hausa-specific documentary support.
- **Evidence for `U+06D1`**: [R12A]'s selected Warsh model: *"06D1... creaky approximant ۑ Warsh
  orthography"*.
- **Evidence for `U+063F`**: [N4959] **Table 1b — the Kano/Maghribi table — gives `063F` only**. Its Table
  1a (naskh) lists both as `06D1, 063F`. [N4959] also names `063F` in its core-specification list of
  Hausa's six small-three-dot characters, as `ARABIC LETTER FARSI YEH WITH THREE DOTS ABOVE`.
- **Claude must state this plainly**: the divergence is sharper than "some sources differ." **The
  Kano/Maghribi table in [N4959] — the very style AJAMIX has adopted — uses `ؿ U+063F`, not `ۑ U+06D1`.**
  AJAMIX is following [R12A]'s Warsh inventory on this letter and departing from [N4959]'s Kano/Maghribi
  column. That is a legitimate project choice, but it is a choice against one of its two primary sources,
  and it should be recorded as such rather than smoothed over.
- **Selected**: `ۑ U+06D1`, for consistency with the [R12A] Warsh inventory that governs the rest of the
  standard.
- **Why one form was required**: deterministic generation; mixing both would defeat the single-convention
  rule in §1.
- **`ؿ U+063F` classification**: `noncanonical_variant` — documented alternative, not generated by AJAMIX.
- **Date / authority**: 2026-07-28, Muhammad.
- **Migration consequence if reversed**: `ƴ` is comparatively rare in the corpus, so a later switch to
  `063F` would be among the cheapest of these decisions to reverse — but it would still invalidate every
  lexicon entry and fixture containing `ƴ`, and would need a content migration pass.
- **Related [N4959] observation**: its Latin column distinguishes `ˈy` *"Used in Nigeria"* from `ƴ` *"Used
  in Niger"* — a regional split on the **Boko** side. Since Ajamix targets Nigerian learners and its Boko
  content already uses both `ƴ` and apostrophe-`'y` spellings for this sound, the apostrophe policy (§9)
  must handle both, and this is an additional reason that policy cannot be deferred.

### 5.3 `h` — context-sensitive, NOT prohibited

- **Forms**: `ح U+062D` (default native Hausa) and `ه U+0647` (contextually permitted).
- **Evidence**: [N4959] Table 1b lists `h` as `062D, 0647`. [R12A] as quoted in §3.
- **Correction applied**: Claude's prior revision listed `ه U+0647` in a table titled "prohibited
  characters." **That was wrong and has been removed.** `ه` is legitimate in Qur'anic names, Arabic
  material, and established spellings.
- **Legacy classification**: the live engine's unconditional `ه` is `legacy_inconsistent` and
  `overgeneralized and context-insensitive` — not per-occurrence defective.
- **Date / authority**: 2026-07-28, Muhammad.

---

## 6. Classification vocabulary (replaces the single "prohibited" bucket)

| Category | Meaning | Examples |
|---|---|---|
| `forbidden_output` | Malformed Unicode; never valid | Presentation forms; Latin+Arabic-diacritic; PUA; constructed triple-dots |
| `noncanonical_variant` | Legitimate alternative orthography AJAMIX will not generate | `ي U+064A` for `y`; `ؿ U+063F` for `ƴ`; all Hafs forms |
| `contextually_permitted` | Allowed only for defined lexical/language classes | `ه U+0647` for `h` in Arabic/Qur'anic/name contexts |
| `legacy_inconsistent` | Old-engine output conflicting with the new convention | `ڈ` for `ɗ`; `ف` for `f`; unconditional `ه`; `ن` for `n` |
| `unresolved` | Mapping or word spelling lacking sufficient evidence | Velar cluster rules; apostrophe policy; all word-level vowel lengths |

---

## 7. Vowel model — approved vs provisional

### Approved (deterministic code-point inventory)

| Function | Char | Unicode |
|---|---:|---:|
| short `a` | `َ` | `U+064E` |
| short `i` | `ِ` | `U+0650` |
| short `u` / short `o` | `ُ` | `U+064F` |
| short `e` | `ٜ` | `U+065C` |
| no following vowel (sukūn) | `ْ` | `U+0652` |
| gemination (shadda) | `ّ` | `U+0651` |
| dagger alif | `ٰ` | `U+0670` |
| hamza above / below | `ٔ` / `ٕ` | `U+0654` / `U+0655` |
| alif | `ا` | `U+0627` |
| alif + hamza above / below | `أ` / `إ` | `U+0623` / `U+0625` |
| waw | `و` | `U+0648` |
| alif maqsura | `ى` | `U+0649` |
| Farsi yeh | `ی` | `U+06CC` |

### Approved (deterministic sequences)

```text
short a: U+064E        short i: U+0650        short u/o: U+064F      short e: U+065C
long a:  U+064E U+0627
long i:  U+0650 U+0649
long u:  U+064F U+0648
long e:  U+065C U+0649 U+0670
long o:  U+064F U+0648 U+0627 U+0652
ai:      U+064E U+06CC U+0652
au:      U+064E U+0648 U+0652
gemination: base + U+0651
closed syllable / no following vowel: base + U+0652
```

Long `o` confirmed by both sources — [R12A]: *"oː... final 064F 0648 0627 652 **Different from uː!**"*;
[N4959] Table 1b: `064F 0648, 064F 0648 0627 0652` for `ō`. Long `e` confirmed by [N4959] Table 1b:
`0649 065C 0670` for `ē`.

### Provisional

- **Word-initial short `e` requires an `ع` (U+0639) carrier**, not the bare mark. [R12A]: *"initial 0639
  065C... medial 065C... final 065C"*. Found by Claude while verifying; the flat table above does not
  express it.
- Velar cluster spellings in every vowel environment (§1).
- Word-initial vowel carrier rules generally.

### Not derivable at all from Boko — the central lexical problem

**Boko does not mark vowel length.** No code-point table changes this. Every long-vs-short decision for
every specific word must come from, in order: (1) approved pronunciation-aware lexicon; (2) reviewed
source; (3) deterministic morphological rule with evidence; (4) human review; (5) clearly-labelled
provisional fallback. The vowel tables above do **not** make blind transliteration reliable.

---

## 8. Corpus-readiness — what is approvable now

**Approved now:**
- Individual consonant mappings (Table A).
- Unicode storage, normalization (NFC), and hygiene rules (Table D).
- The deterministic code-point sequences listed as Approved in §7.
- The classification vocabulary (§6) and the three decision records (§5).

**Provisional until verified:**
- **Complete word spellings** — pending vowel length, word-initial carriers, final-vowel forms, apostrophe
  treatment, lexical exceptions.
- **Complete sentence fixtures** — pending review of every word *and every boundary*. Matching correct
  consonant code points validates none of: vowel length, short-vowel selection, long-vowel sequences,
  word-final vowels, sukūn placement, shadda placement, diphthongs, apostrophe handling, grammatical
  boundaries.
- Velar cluster rules; word-initial short-`e` carrier rule.

This distinction matters because the standard must have approved components before a lexicon or pilot can
be built on it.

---

## 9. Apostrophes — parser must distinguish four functions

Apostrophes must **never** be blanket-converted to `ع U+0639`. **Normalize the three apostrophe code
points first** — `U+0027` APOSTROPHE, `U+2019` RIGHT SINGLE QUOTATION MARK, `U+02BC` MODIFIER LETTER
APOSTROPHE — **but preserve linguistic context before deciding any Ajami output.**

The parser must distinguish at least these four functions:

| # | Function | Example | Treatment |
|---|---|---|---|
| 1 | **Apostrophe immediately before `y`** — Nigerian Boko spelling of the special consonant | `'yan`, `'ya'ya`, `'Yancin` | → `HAUSA_GLOTTALIZED_Y` → `ؿ U+063F` (§5.2). **Not** a glottal stop. |
| 2 | Apostrophe between other vowels/consonants — possible glottal stop | `murabba'i`, `jami'a`, `sa'a`, `ma'ana` | Glottal-stop handling; lexicon-first. `unresolved` |
| 3 | Compound / morpheme boundary | `ɗan'uwa`, `ƴar'uwa` | Morphological handling; lexicon-first. `unresolved` |
| 4 | **Typographic punctuation only** | `'ɗaya'`, `'biyu'`, `'babba'` | **Not a letter at all.** Must not produce any Ajami consonant. |

**Rule 1 is now settled** (§5.2). Rules 2–4 remain `unresolved`.

### Corpus measurement — why this cannot be deferred or approximated

Claude scanned all 7,227 Hausa-bearing fields in live `app/content.json`:

- **3,082 apostrophes total.**
- **254** are apostrophe-`y` (category 1) — the settled case.
- **2,828 are NOT followed by `y`** (categories 2–4).
- **The dominant non-`y` use is category 4, paired typographic quotation** — sampling the 232 distinct
  apostrophe-bearing word forms shows overwhelmingly `'ɗaya'`, `'biyu'`, `'uku'`, `'huɗu'`, `'biyar'`,
  `'babba'`, `'ƙarami'` — Hausa words wrapped in quote marks inside `audioScript` narration, where the
  narrator is told to say a word aloud. Genuine glottal stops (category 2, e.g. `murabba'i`) exist but are
  comparatively rare.

**Consequence — stated at the precision the evidence supports**: the blanket apostrophe-to-`ع` rule
creates a **potential corruption class covering up to 2,828 current non-`y` apostrophe occurrences**.
Sampling indicates that many are punctuation rather than Hausa phonological boundaries. **Exact affected
rendered-output counts require call-path and field-level analysis** — the scan counts occurrences in
`content.json`, and does *not* by itself establish that every one is passed through the live converter and
emitted as `ع`. That analysis is a Stage 3C deliverable.

This remains the largest latent-error class identified so far, and it is invisible at the letter-mapping
level — it can only be resolved by the classification layer (§10).

**Until categories 2–4 are ruled on, apostrophe-bearing words are lexicon-first and may not rely on
character substitution.**

---

## 10. Text classification — prerequisite, not optional

Required categories before any converter runs: (1) native Hausa; (2) fully assimilated Hausa loanwords;
(3) established Arabic-script forms; (4) quoted Arabic; (5) proper nouns; (6) mixed Hausa–Arabic.

Native Hausa uses Table A. **Arabic quotations, duʿāʾ, Qur'anic text, and Arabic names must not pass
through the Hausa converter at all.** The `h` rule (§3) cannot be implemented without this layer.

Also unresolved and carried forward: **numeral policy** (ASCII vs Arabic-Indic — `pn-maths-01` currently
stores Arabic-Indic `١–٣`), and the **loanword/acronym exception mechanism** (the live engine's hardcoded
12-word list produced the `V08` "VAT" defect).

---

## 11. Required status of existing fixtures

Every sentence-level fixture — including all of `tasks/2026-07-28-ajami-dev-fixtures.md` — is
`provisional`. A fixture becomes `approved` only when its **full Unicode sequence** has been reviewed, not
merely its visible special consonants.

---

## 12. What this document does NOT do

Does not modify: any `romanToAjami()` implementation; `app/app.js`; production content; the script-mode
kill switch; IndexedDB settings behavior; Ajami activation state; `ajami_validated` values; learner-facing
content. Confirmed §16.3.

Does not resolve: apostrophe/glottal policy; numeral policy; loanword/acronym mechanism; font glyph
coverage; velar cluster rules; any word-level vowel length.

---

## 16. Claude's verification record

### 16.1 Mechanical glyph verification
All 54 glyph/code-point pairs across every table checked programmatically — actual code point extracted
and compared against stated label. **Zero mismatches.**

### 16.2 Source verification
[R12A] fetched twice (Stage 2 draft, then six additional targeted claims). **[N4959] newly obtained for
this revision** — the PDF's text was not machine-readable on fetch, so Claude extracted it locally with
`pdftotext -layout` and read Tables 1a, 1b, 2, the core-specification character list, the collation
proposals, and the footnotes directly. All [N4959] citations above are from that extraction, not from the
instruction that prompted this revision.

### 16.3 Repository integrity
`git status --short`: only this document and `tasks/` tracking files are new. `git diff --stat --
app/app.js app/content.json app/tools/ docs/ajami-alphabet-guide.md`: **empty**. No converter, content
field, setting, toggle, or `ajami_validated` value was touched.

### 16.4 Corrections Claude applied to its own prior work
- Removed `ه U+0647` from any prohibited table; reclassified `contextually_permitted` (§3, §5.3).
- Withdrew the "weak evidence" hedge on `y`; [N4959] resolves it (§5.1).
- Retracted the "contextual variant" description of `n` → `U+08BD` (§1).
- Retracted the earlier treatment of the dev-fixtures file as an authoritative guide (§0).

### 16.5 Outcome of the `ƴ` conflict Claude surfaced
Claude's [N4959] extraction found that the **Kano/Maghribi** table gives `ƴ` as `ؿ U+063F`, not
`ۑ U+06D1`, and flagged this rather than smoothing it over. **Muhammad ruled on 2026-07-28 that AJAMIX
adopts `ؿ U+063F`**, reversing the previous revision. The standard now aligns with the directly-applicable
Kano/Maghribi primary source. Migration cost measured as zero (no `U+06D1` stored anywhere in
`content.json`). Full record in §5.2.

### 16.6 Two errors of Claude's own, corrected in this revision
1. **Overbroad font-shaping claim** (§0): asserted that naskh-vs-Kano differences are always font-only,
   generalizing from [N4959]'s Table 2 (which demonstrates it for wagaf letters). The same document
   simultaneously documented the `ƴ` code-point conflict as a counterexample — a self-contradiction within
   one document that Claude did not catch. Withdrawn and replaced with the per-mapping assessment rule.
2. **Under-specified apostrophe policy** (§9): the previous revision listed apostrophe handling as
   "unresolved" without measuring it. Actually scanning the corpus revealed 2,828 non-`y` apostrophes
   dominated by ordinary quotation marks — meaning the live engine's blanket apostrophe→ain rule is wrong
   at a scale not previously quantified.

### 16.7 Verification for this revision
All 16 final glyph/code-point pairs re-checked mechanically — **zero mismatches**. Three apostrophe code
points confirmed (`U+0027`, `U+2019`, `U+02BC`). Corpus scans run directly against live
`app/content.json` (read-only).
