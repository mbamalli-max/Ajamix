# Ticket — "kadan" missing hooked ɗ throughout app.js and content.json

**Filed:** 2026-07-04
**Filed by:** Architect (Claude), from Gate 6 release-gate walkthrough (`docs/VALIDATION-CHECKLIST.md`)
**Severity:** PATCH for app.js (copy-only); **PATCH-plus-caution** for content.json (touches quiz answer-matching, see below)
**Status:** Open, awaiting Foreman/Codex fix — user confirmed "always ka**ɗ**an" is correct, no legitimate unhooked variant

---

## Context

Found while testing the PIN-lockout error state during Gate 6. The lockout screen shows two adjacent messages that spell the same word two different ways:

```
An kulle app na ɗan lokaci. Jira kaɗan sannan ka sake gwadawa.   ← "kaɗan" (hooked)
An kulle app na sakan 30. Jira kadan kafin sake gwadawa.          ← "kadan" (unhooked)
```

Confirmed with the user this is not a legitimate spelling variant — "kaɗan" (little/a bit) should always carry the hooked ɗ. Searched the full codebase for every occurrence to scope the fix.

## The bug — full inventory

### app.js (2 instances, copy-only)

```js
// app.js:2056 — PIN lockout message
state.privacyGate.message = "An kulle app na sakan 30. Jira kadan kafin sake gwadawa.";
// → "Jira kaɗan kafin sake gwadawa."

// app.js:3489 — retention/streak nudge message
return ha("An yi kwanaki kadan ba tare da koyon lissafi ba. Ka dawo yau domin wutar ta sake karfi.");
// → "An yi kwanaki kaɗan ba tare da koyon lissafi ba."
```

### content.json (13 fields across 3 modules + 1 glossary entry)

**Module `n1-maths-09`** ("Yawa da Kadan (1–5)" — Yawa/Kadan = More/Less):
- `titleHa`: `"Yawa da Kadan (1–5)"` → title itself is misspelled
- `textExplanationHa`: contains **both** spellings in the same string — `"...Kadan yana nufin abubuwa kaɗan..."` and `"...wannan kadan ne..."` and `"...ɗayan kadan."` (hooked once, unhooked three times, same field)
- `audioScript`: same mixed pattern — `"...Kadan – abubuwa kaɗan..."`, `"...Kwano biyu – kadan..."`, `"...Wanne ne kadan?..."`, but also `"...Yanzu kaɗan."` (hooked)
- `microPauses[1].correctAnswer`: `"kadan"`
- `microPauses[1].options[1]`: `"kadan"`
- `quizQuestions[1].templateHa`: `"Rukuni mai yawa da kadan – wanne ne yawa?"`
- `quizQuestions[1].distractorFormulas[0]`: `"kadan"`
- `quizQuestions[2].answerFormula`: `"kadan"`

**Module `n1-maths-12`** ("Maimaitawa 1–10"):
- `textExplanationHa`: `"...yawa/kadan..."` (in a review-summary list of terms)

**Module `n2-maths-09`** ("Cikawa da Fanko"):
- `microPauses[1].options[2]`: `"kadan"`
- `quizQuestions[0].distractorFormulas[1]`: `"kadan"`
- `quizQuestions[1].distractorFormulas[2]`: `"kadan"`

**Glossary** (`glossary[13]`, the canonical "Kadan" = "Less" entry):
```json
{"termHa":"Kadan","termAjami":"ﻛَطَنْ","ajami_validated":false,"definitionHa":"Ƙarancin abubuwa idan aka kwatanta.","termEn":"Less","subject":"Mathematics","subjectHa":"Lissafi"}
```
`termHa` itself is unhooked. (Note: this glossary entry is separate from the 8-duplicate-term issue in `TICKET-glossary-duplicate-entries.md` — "Kadan" is not one of those 8 duplicated terms, it's a single entry with its own spelling bug.)

## ⚠️ Functional caution for `n1-maths-09` and `n2-maths-09`

Unlike the app.js copy fix, the content.json fields `correctAnswer`, `options`, `distractorFormulas`, and `answerFormula` are **matched programmatically** by the quiz engine (not just displayed). If Codex fixes `titleHa`/`textExplanationHa`/`audioScript` but misses updating `correctAnswer`/`options`/`distractorFormulas`/`answerFormula` to match (or vice versa), the quiz engine's string comparison between the correct answer and the option/distractor set will break, silently marking correct answers wrong (or wrong answers right) for these specific quiz questions. **All occurrences of `"kadan"` within a single module's quiz-answer fields must be changed together, consistently**, not just the display-text fields.

## Recommended fix

1. `app.js:2056` and `app.js:3489` — straightforward text replacement, no functional risk.
2. `n1-maths-09`, `n1-maths-12`, `n2-maths-09`, `glossary[13]` — replace every `"kadan"` → `"kaɗan"` and `"Kadan"` → `"Kaɗan"`, but treat `n1-maths-09` and `n2-maths-09` as requiring a full-module re-check afterward (reload the module, retake the quiz, confirm the correct answer still registers as correct) given the answer-matching risk above.

## Escalation-style summary

```
Ticket: "kadan" missing hooked ɗ — 2 app.js copy strings + 13 content.json fields + 1 glossary entry
Component: app.js:2056, app.js:3489 (copy only); content.json modules n1-maths-09, n1-maths-12, n2-maths-09, glossary[13] (data)
Trigger: PIN lockout screen (app.js), streak-nudge message (app.js), "Yawa da Kadan" module content/quiz (n1-maths-09), review module (n1-maths-12), "Cikawa da Fanko" module quiz (n2-maths-09), Glossary screen
Actual: "kadan" (unhooked) appears inconsistently alongside "kaɗan" (hooked) — sometimes in the same sentence
Expected: "kaɗan" everywhere, per user confirmation there is no legitimate unhooked variant
Fix location: app.js (copy-only, no risk) + content.json (data — CAUTION: n1-maths-09 and n2-maths-09 quiz correctAnswer/options/distractorFormulas/answerFormula must all be updated consistently together, or quiz scoring breaks for those questions)
```
