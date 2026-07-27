# Ticket — 8 duplicate glossary terms in content.json (old-schema + new-schema copies)

**Filed:** 2026-07-04
**Filed by:** Architect (Claude), from Gate 6 release-gate walkthrough (`docs/VALIDATION-CHECKLIST.md`)
**Severity:** PATCH — data hygiene, not a crash or blocker, but visibly wrong on the Glossary screen
**Status:** Open, awaiting Foreman decision + Codex fix

---

## Context

Scrolling the full Glossary screen (`#/glossary`) during Gate 6 showed several terms appearing twice back-to-back. Confirmed via direct inspection of `app/content.json`'s `glossary` array (70 entries total) — this is a real data duplication, not a rendering bug. `renderGlossaryScreen()` has no dedup logic; it renders whatever is in the array, so all 70 raw entries show, including the 16 that are duplicates of 8 terms.

## The bug

8 terms each appear exactly twice, always as one "old-schema" entry and one "new-schema" entry:

| Term (Ha) | English | Indices |
|---|---|---|
| Kirgawa | Counting | 0, 15 |
| Lamba | Number | 1, 16 |
| Ƙari | Addition | 2, 17 |
| Ragewa | Subtraction | 3, 18 |
| Zobe | Circle | 4, 21 |
| Murabba'i | Square | 5, 22 |
| Alwatika | Triangle | 6, 23 |
| Madaidaici | Rectangle | 7, 24 |

All 8 are Primary-1 Mathematics vocabulary. Full raw data for both copies of each pair:

```json
// Kirgawa (old, idx 0)
{"termHa":"Kirgawa","termAjami":"ﻛِرﻏَوَ","ajami_validated":false,"definitionHa":"Faɗin lambobi a jere.","termEn":"Counting","subject":"Mathematics","subjectHa":"Lissafi"}
// Kirgawa (new, idx 15)
{"termHa":"Kirgawa","termAjami":"كِرغَوَ","termEn":"Counting","ajami_validated":false,"definitionHa":"Faɗin lambobi a jere.","category":"Lissafi","relatedModules":["p1-maths-01","p1-maths-02","p1-maths-03","p1-maths-04","p1-maths-05"]}

// Lamba (old, idx 1)
{"termHa":"Lamba","termAjami":"ﻟَﻣْﺑَﺎ","ajami_validated":false,"definitionHa":"Alamar da ake amfani da ita don kirgawa.","termEn":"Number","subject":"Mathematics","subjectHa":"Lissafi"}
// Lamba (new, idx 16)
{"termHa":"Lamba","termAjami":"لَمْبَا","termEn":"Number","ajami_validated":false,"definitionHa":"Alamar da ake amfani da ita don kirgawa.","category":"Lissafi","relatedModules":["p1-maths-01","p1-maths-02","p1-maths-03","p1-maths-04","p1-maths-05","p1-maths-06","p1-maths-07","p1-maths-08","p1-maths-09","p1-maths-10","p1-maths-11","p1-maths-12","p1-maths-13","p1-maths-14","p1-maths-15","p1-maths-16","p1-maths-17","p1-maths-18","p1-maths-19","p1-maths-20","p1-maths-21","p1-maths-22","p1-maths-23","p1-maths-24"]}

// Ƙari (old, idx 2)
{"termHa":"Ƙari","termAjami":"ﻗَرِى","ajami_validated":false,"definitionHa":"Haɗa lambobi wuri ɗaya.","termEn":"Addition","subject":"Mathematics","subjectHa":"Lissafi"}
// Ƙari (new, idx 17)
{"termHa":"Ƙari","termAjami":"قَرِى","termEn":"Addition","ajami_validated":false,"definitionHa":"Haɗa lambobi wuri ɗaya.","category":"Lissafi","relatedModules":["p1-maths-09","p1-maths-10"]}

// Ragewa (old, idx 3)
{"termHa":"Ragewa","termAjami":"رَﻏَﮯوَ","ajami_validated":false,"definitionHa":"Cire lambobi daga juna.","termEn":"Subtraction","subject":"Mathematics","subjectHa":"Lissafi"}
// Ragewa (new, idx 18)
{"termHa":"Ragewa","termAjami":"رَغَےوَ","termEn":"Subtraction","ajami_validated":false,"definitionHa":"Cire lambobi daga juna.","category":"Lissafi","relatedModules":["p1-maths-11"]}

// Zobe (old, idx 4)
{"termHa":"Zobe","termAjami":"زُاﺑٜﻰ","ajami_validated":false,"definitionHa":"Siffa mai zagaye.","termEn":"Circle","subject":"Mathematics","subjectHa":"Lissafi"}
// Zobe (new, idx 21)
{"termHa":"Zobe","termAjami":"زُابٜى","termEn":"Circle","ajami_validated":false,"definitionHa":"Siffa mai zagaye.","category":"Lissafi","relatedModules":["p1-maths-23"]}

// Murabba'i (old, idx 5)
{"termHa":"Murabba'i","termAjami":"ﻣُرَﺑﱠﻌِﻰ","ajami_validated":false,"definitionHa":"Siffa mai gefe huɗu daidai.","termEn":"Square","subject":"Mathematics","subjectHa":"Lissafi"}
// Murabba'i (new, idx 22)
{"termHa":"Murabba'i","termAjami":"مُرَبَّعِى","termEn":"Square","ajami_validated":false,"definitionHa":"Siffa mai gefe huɗu daidai.","category":"Lissafi","relatedModules":["p1-maths-23"]}

// Alwatika (old, idx 6)
{"termHa":"Alwatika","termAjami":"اَﻟوَاﺗِﻛَﺎ","ajami_validated":false,"definitionHa":"Siffa mai gefe uku.","termEn":"Triangle","subject":"Mathematics","subjectHa":"Lissafi"}
// Alwatika (new, idx 23)
{"termHa":"Alwatika","termAjami":"اَلوَاتِكَا","termEn":"Triangle","ajami_validated":false,"definitionHa":"Siffa mai gefe uku.","category":"Lissafi","relatedModules":["p1-maths-23"]}

// Madaidaici (old, idx 7)
{"termHa":"Madaidaici","termAjami":"ﻣَدَﯾْدَﯾْﺗِﻰ","ajami_validated":false,"definitionHa":"Siffa mai gefe huɗu biyu dogaye biyu gajere.","termEn":"Rectangle","subject":"Mathematics","subjectHa":"Lissafi"}
// Madaidaici (new, idx 24)
{"termHa":"Madaidaici","termAjami":"مَدَيْدَيْتِى","termEn":"Rectangle","ajami_validated":false,"definitionHa":"Siffa mai gefe huɗu, biyu dogaye biyu gajere.","category":"Lissafi","relatedModules":["p1-maths-23"]}
```

Observations, not conclusions (left for Foreman/content review, not decided here):
- Every "old" copy uses `subject`/`subjectHa` fields and has no `relatedModules`.
- Every "new" copy uses `category` instead, and carries a populated `relatedModules` array linking to specific lesson IDs.
- `definitionHa` text is byte-identical between old/new in 7 of 8 pairs. "Madaidaici" differs by one inserted comma ("gefe huɗu biyu dogaye..." vs "gefe huɗu, biyu dogaye...").
- `termAjami` differs in encoding between old/new in all 8 pairs: the "old" copies use isolated Arabic **presentation-form** glyphs (e.g. `ﻛِرﻏَوَ`), the "new" copies use standard **joining** Arabic Unicode (e.g. `كِرغَوَ`). Visually these can look similar depending on the rendering font, but they are different code points.

## Why it matters

Users scrolling the Glossary screen (`#/glossary`) see each of these 8 terms rendered twice in a row, back-to-back, with near-identical (in most cases identical) content — reads as a broken/unfinished list, not intentional.

## Recommended fix

Not prescribed here — left for Foreman to decide which of each pair's two copies to keep (or whether to merge fields, e.g. keep `relatedModules` from the new entry but re-check the Ajami encoding choice), given the Ajami-script/data-schema tradeoffs noted above. Once a resolution is chosen, the fix is a `content.json` data edit only (remove 8 duplicate array entries) — no `app.js` changes needed, since `renderGlossaryScreen()` correctly just renders whatever the glossary array contains.

## Escalation-style summary

```
Ticket: 8 duplicate glossary terms in content.json (old-schema + new-schema copies)
Component: app/content.json — glossary array (70 entries, indices 0-7 duplicated at 15-24)
Trigger: any user scrolling the Glossary screen (#/glossary)
Actual: Kirgawa, Lamba, Ƙari, Ragewa, Zobe, Murabba'i, Alwatika, Madaidaici each render twice
Expected: each term appears once
Fix location: app/content.json data only, no app.js changes needed
Open question for Foreman: which copy to keep per pair — old copies use subject/subjectHa + presentation-form Ajami glyphs, new copies use category + relatedModules + joining-form Ajami glyphs; definitionHa is identical except a one-comma difference on Madaidaici
```
