# P2 Content — Human/TIMSAN Validation Bundle

Companion to [`docs/VALIDATION-CHECKLIST.md`](VALIDATION-CHECKLIST.md). That checklist spot-checks 5 modules app-wide (Gate 3) and 3 modules for quizzes/micro-pauses (Gate 4) as a general smoke pass. This bundle applies the **same Gate 3 + Gate 4 criteria to all 54 new P2 modules**, one row per module, because a 5-module sample isn't enough coverage for a full new content band before it ships.

**Status entering this gate:** build-complete (M1–M5 approved 2026-07-03/04). All P2 Hausa is `ajami_validated: false` / DRAFT. Nothing here is shippable until every module below is marked PASS.

**Reviewer order:** the user (fluent Hausa speaker) reviews first. Only escalate a specific item to TIMSAN if the user can't rule on it themselves — see the escalation block at the end of each entry.

---

## How to use this bundle

For each module: open it in the app (or read the fields directly in `app/content.json`), and score the 4 categories below. A module is **PASS** only if all 4 categories pass.

1. **Hausa accuracy** — spelling (hooked letters `ɓ ɗ ƙ` used correctly), grammar (gender/number agreement, verb forms), no typos. `hook-lint.mjs` already cleared mechanical spelling; this category is for everything the linter *can't* catch (grammar, word choice, sense-correct usage).
2. **Age-level fit** — vocabulary and sentence complexity appropriate for a P2 learner (~age 7–8). Flag anything that reads like P1 (too simple) or P3+/adult vocational register (too advanced).
3. **Local register** — natural spoken/written Hausa as used in Northern Nigerian classrooms, not overly literary/formal, no unnecessary loanwords where a common Hausa term exists.
4. **Curriculum drift** — content matches the NERDC BEC P2 topic scope for this subject/lesson (not a P1/P3 topic misfiled as P2, no duplicate coverage of another module in the same list).

Log any failing item using the escalation block, then it goes back to Codex/Foreman as a targeted content fix (not a re-author), same pattern as the M1–M4 fixes.

```
Module ID: …
Category failing: accuracy | age-fit | register | drift
Field: titleHa | textExplanationHa | audioScript | microPauses[n].questionHa | quizQuestions[n]
Exact text: …
What's wrong: …
Suggested correction (if known): …
Escalated to TIMSAN? yes/no — reason: …
```

---

## Module list — Basic Science (15) — `subjectHa: Kimiyya`

| # | ID | Title (En) | Title (Ha) | Accuracy | Age-fit | Register | Drift | Overall |
|---|----|------------|------------|:--------:|:-------:|:--------:|:-----:|:-------:|
| 1 | p2-bsci-01 | Living and Non-living Things | Abubuwa Masu Rai da Marasa Rai | ☑ | ☑ | ☑ | ☑ | ☑ |
| 2 | p2-bsci-02 | Parts of a Plant | Sassan Tsiro | ☑ | ☑ | ☑ | ☑ | ☑ |
| 3 | p2-bsci-03 | Domestic Animals | Dabbobin Gida | ☑ | ☑ | ☑ | ☑ | ☑ |
| 4 | p2-bsci-04 | Weather | Yanayi | ☑ | ☑ | ☑ | ☑ | ☑ |
| 5 | p2-bsci-05 | Uses of Water | Amfanin Ruwa | ☑ | ☑ | ☑ | ☑ | ☑ |
| 6 | p2-bsci-06 | Personal Hygiene | Tsaftar Jiki | ☑ | ☑ | ☑ | ☑ | ☑ |
| 7 | p2-bsci-07 | Food Groups | Rukunan Abinci | ☑ | ☑ | ☑ | ☑ | ☑ |
| 8 | p2-bsci-08 | The Five Senses | Gabobin Ji Biyar | ☑ | ☑ | ☑ | ☑ | ☑ |
| 9 | p2-bsci-09 | Safety at Home | Tsaro a Gida | ☑ | ☑ | ☑ | ☑ | ☑ |
| 10 | p2-bsci-10 | Clean Environment | Muhalli Mai Tsafta | ☑ | ☑ | ☑ | ☑ | ☑ |
| 11 | p2-bsci-11 | Simple Machines at Home | Sauƙaƙan Kayan Aiki a Gida | ☑ | ☑ | ☑ | ☑ | ☑ |
| 12 | p2-bsci-12 | Sources of Light | Tushen Haske | ☑ | ☑ | ☑ | ☑ | ☑ |
| 13 | p2-bsci-13 | Sound Around Us | Sauti a Kewaye da Mu | ☑ | ☑ | ☑ | ☑ | ☑ |
| 14 | p2-bsci-14 | Care of Plants and Animals | Kula da Tsirrai da Dabbobi | ☑ | ☑ | ☑ | ☑ | ☑ |
| 15 | p2-bsci-15 | Keeping Water Safe | Kiyaye Ruwa Mai Tsabta | ☑ | ☑ | ☑ | ☑ | ☑ |

**Note on p2-bsci-02:** contains the confirmed-correct unhooked `kara` (plant stem/stalk sense) — this is intentional, already ruled by the user 2026-07-03, not a fresh accuracy issue. Do not re-flag unless the *sense* used looks wrong in context.

**Round 1 findings (2026-07-04):**
- `p2-bsci-05`, `p2-bsci-06`, `p2-bsci-08`, `p2-bsci-12`, `p2-bsci-13` — accuracy/register issues found and fixed directly (orthography/agreement and `ƙwan fitila` term ruling applied, exact instances confirmed against live `content.json`). Validator/hook-lint/closure re-verified green. Marked PASS by first-pass user ruling.

---

## Module list — Mathematics (24) — `subjectHa: Lissafi`

| # | ID | Title (En) | Title (Ha) | Accuracy | Age-fit | Register | Drift | Overall |
|---|----|------------|------------|:--------:|:-------:|:--------:|:-----:|:-------:|
| 1 | p2-maths-01 | Numbers 1 to 100 | Lambobi 1 zuwa 100 | ☑ | ☑ | ☑ | ☑ | ☑ |
| 2 | p2-maths-02 | Counting Forward and Backward | Ƙirga Gaba da Baya | ☑ | ☑ | ☑ | ☑ | ☑ |
| 3 | p2-maths-03 | Place Value: Tens and Units | Matsayin Lamba: Goma da Ɗaya-Ɗaya | ☑ | ☑ | ☑ | ☑ | ☑ |
| 4 | p2-maths-04 | Comparing Numbers | Kwatanta Lambobi | ☑ | ☑ | ☑ | ☑ | ☑ |
| 5 | p2-maths-05 | Ordering Numbers | Jera Lambobi | ☑ | ☑ | ☑ | ☑ | ☑ |
| 6 | p2-maths-06 | Addition Without Regrouping | Tarawa Ba Tare da Canjin Goma ba | ☑ | ☑ | ☑ | ☑ | ☑ |
| 7 | p2-maths-07 | Addition With Regrouping | Tarawa Tare da Canjin Goma | ☑ | ☑ | ☑ | ☑ | ☑ |
| 8 | p2-maths-08 | Subtraction Without Borrowing | Ragi Ba Tare da Aro ba | ☑ | ☑ | ☑ | ☑ | ☑ |
| 9 | p2-maths-09 | Subtraction With Borrowing | Ragi Tare da Aro | ☑ | ☑ | ☑ | ☑ | ☑ |
| 10 | p2-maths-10 | Word Problems: Addition | Matsalolin Labari na Tarawa | ☑ | ☑ | ☑ | ☑ | ☑ |
| 11 | p2-maths-11 | Word Problems: Subtraction | Matsalolin Labari na Ragi | ☑ | ☑ | ☑ | ☑ | ☑ |
| 12 | p2-maths-12 | Skip Counting by 2 | Tsallake Ƙirga Biyu-Biyu | ☑ | ☑ | ☑ | ☑ | ☑ |
| 13 | p2-maths-13 | Skip Counting by 5 | Tsallake Ƙirga Biyar-Biyar | ☑ | ☑ | ☑ | ☑ | ☑ |
| 14 | p2-maths-14 | Skip Counting by 10 | Tsallake Ƙirga Goma-Goma | ☑ | ☑ | ☑ | ☑ | ☑ |
| 15 | p2-maths-15 | Introduction to Multiplication | Gabatarwa ga Ninkawa | ☑ | ☑ | ☑ | ☑ | ☑ |
| 16 | p2-maths-16 | Multiplication by 2 | Ninkawa da 2 | ☑ | ☑ | ☑ | ☑ | ☑ |
| 17 | p2-maths-17 | Multiplication by 5 | Ninkawa da 5 | ☑ | ☑ | ☑ | ☑ | ☑ |
| 18 | p2-maths-18 | Multiplication by 10 | Ninkawa da 10 | ☑ | ☑ | ☑ | ☑ | ☑ |
| 19 | p2-maths-19 | Nigerian Money: Naira and Kobo | Kuɗin Nijeriya: Naira da Kobo | ☑ | ☑ | ☑ | ☑ | ☑ |
| 20 | p2-maths-20 | Adding Small Amounts of Money | Tara Ƙananan Kuɗi | ☑ | ☑ | ☑ | ☑ | ☑ |
| 21 | p2-maths-21 | Length: Long and Short | Tsawo: Dogaye da Gajeru | ☑ | ☑ | ☑ | ☑ | ☑ |
| 22 | p2-maths-22 | Weight: Heavy and Light | Nauyi: Masu Nauyi da Masu Sauƙi | ☑ | ☑ | ☑ | ☑ | ☑ |
| 23 | p2-maths-23 | Shapes Around Us | Siffofi a Kewaye da Mu | ☑ | ☑ | ☑ | ☑ | ☑ |
| 24 | p2-maths-24 | Telling Time: Hour and Half Hour | Faɗin Lokaci: Awa da Rabin Awa | ☑ | ☑ | ☑ | ☑ | ☑ |

**Note on p2-maths-23:** contains the M3-patched gender-agreement fix `Alwatika tana da gefe uku` — already re-verified this session. Re-check only if something else in the module looks off.

**Quiz-formula spot-check (Gate 4, parameterized modules only):** for any module here where `quizQuestions[].variableRanges` are non-zero (not the static `{min:0,max:0}` shape), also run the rendered `{a}`/`{b}` substitution in the live app for at least 2–3 random values per question and confirm the sentence reads as grammatical Hausa, not just numerically correct. `check-p2-maths-formulas.mjs` already proved the numeric substitution is safe/correct — this step is for phrasing, which the checker doesn't evaluate.

**Round 1 findings (2026-07-04):**
- `p2-maths-03`, `p2-maths-09` — accepted as-is by explicit user ruling (earlier flags overruled). Marked PASS.
- `p2-maths-01`, `p2-maths-04`, `p2-maths-21`, `p2-maths-22`, `p2-maths-24` — accuracy/register/drift issues fixed directly (hooked letter, comparison phrasing/place-value wording, and authored second `[MAIN]` replacements for length, weight, and time). Exact instances confirmed. Validator/hook-lint/math-formula/closure re-verified green. Marked PASS by first-pass user ruling.

---

## Module list — Social Studies (15) — `subjectHa: Nazarin Zamantakewa`

| # | ID | Title (En) | Title (Ha) | Accuracy | Age-fit | Register | Drift | Overall |
|---|----|------------|------------|:--------:|:-------:|:--------:|:-----:|:-------:|
| 1 | p2-socs-01 | The Family | Iyali | ☑ | ☑ | ☑ | ☑ | ☑ |
| 2 | p2-socs-02 | Members of the Family | Membobin Iyali | ☑ | ☑ | ☑ | ☑ | ☑ |
| 3 | p2-socs-03 | Duties at Home | Ayyuka a Gida | ☑ | ☑ | ☑ | ☑ | ☑ |
| 4 | p2-socs-04 | The Community | Al'umma | ☑ | ☑ | ☑ | ☑ | ☑ |
| 5 | p2-socs-05 | Places in the Community | Wurare a Cikin Al'umma | ☑ | ☑ | ☑ | ☑ | ☑ |
| 6 | p2-socs-06 | Occupations | Sana'o'i | ☑ | ☑ | ☑ | ☑ | ☑ |
| 7 | p2-socs-07 | The Market | Kasuwa | ☑ | ☑ | ☑ | ☑ | ☑ |
| 8 | p2-socs-08 | Rules at Home and School | Dokoki a Gida da Makaranta | ☑ | ☑ | ☑ | ☑ | ☑ |
| 9 | p2-socs-09 | Leaders in the Community | Shugabanni a Cikin Al'umma | ☑ | ☑ | ☑ | ☑ | ☑ |
| 10 | p2-socs-10 | Cooperation | Haɗin Kai | ☑ | ☑ | ☑ | ☑ | ☑ |
| 11 | p2-socs-11 | Nigerian Symbols | Alamomin Nijeriya | ☑ | ☑ | ☑ | ☑ | ☑ |
| 12 | p2-socs-12 | Respect and Good Behaviour | Girmamawa da Kyawawan Halaye | ☑ | ☑ | ☑ | ☑ | ☑ |
| 13 | p2-socs-13 | Festivals and Celebrations | Bukukuwa da Murna | ☑ | ☑ | ☑ | ☑ | ☑ |
| 14 | p2-socs-14 | Our Environment | Muhallinmu | ☑ | ☑ | ☑ | ☑ | ☑ |
| 15 | p2-socs-15 | Keeping the Community Clean | Tsaftace Al'umma | ☑ | ☑ | ☑ | ☑ | ☑ |

**Note on subjectHa:** all 15 P1 + all 15 P2 Social Studies modules now use `Nazarin Zamantakewa` (ruled 2026-07-03, retiring both `Karatun Al'umma` and `Zamantakewa`). Confirm this reads correctly as a subject-band label in context — it hasn't had a dedicated register check yet since it's a new term.

**Round 1 findings (2026-07-04):** `p2-socs-11` — the English term `coat of arms` was replaced with the user-ruled `tambarin Nijeriya` in `textExplanationHa`, `audioScript`, and quiz answer. Exact instances confirmed. Validator/hook-lint/closure re-verified green. Marked PASS by first-pass user ruling.

---

## Issue log

Copy the escalation block (above) here per finding. Group by module ID as they come in.

### Round 1 (2026-07-04) — fixed directly, mechanical

```
Module ID: p2-bsci-05
Category failing: accuracy
Field: audioScript, microPauses[0].questionHa
Exact text: "Me yasa muke shan ruwa?"
What's wrong: standard written form should be separated
Suggested correction: "Me ya sa muke shan ruwa?"
Status: FIXED — applied to content.json + p2-bsci-pilot.json. Revalidated.
Escalated to TIMSAN? no
```

```
Module ID: p2-bsci-06
Category failing: accuracy
Field: quizQuestions[4].distractorFormulas
Exact text: "taba abinci"
What's wrong: missing hooked letter
Suggested correction: "taɓa abinci"
Status: FIXED — applied to content.json + p2-bsci-pilot.json. Revalidated.
Escalated to TIMSAN? no
```

```
Module ID: p2-bsci-08
Category failing: accuracy
Field: textExplanationHa, audioScript
Exact text: "karar mota" / "Su na taimaka..."
What's wrong: missing hooked letter / spacing (habitual marker split incorrectly)
Suggested correction: "ƙarar mota" / "Suna taimaka..."
Status: FIXED — applied to content.json + p2-bsci-complete.json. Revalidated.
Escalated to TIMSAN? no
```

```
Module ID: p2-bsci-13
Category failing: accuracy
Field: textExplanationHa, audioScript
Exact text: "karar mota"
What's wrong: missing hooked letter
Suggested correction: "ƙarar mota"
Status: FIXED — applied to content.json + p2-bsci-complete.json. Revalidated.
Escalated to TIMSAN? no
```

```
Module ID: p2-maths-01
Category failing: accuracy
Field: textExplanationHa, audioScript
Exact text: "dalibai"
What's wrong: missing hooked letter
Suggested correction: "ɗalibai"
Status: FIXED — applied to content.json + p2-maths.json. Revalidated.
Escalated to TIMSAN? no
```

```
Module ID: p2-maths-04
Category failing: accuracy / register
Field: textExplanationHa
Exact text: "4 goma sun fi 3 goma" / "ya fi, ya ƙasa, ko daidai"
What's wrong: place-value shorthand not natural; awkward comparison phrasing
Suggested correction: "gomomi huɗu sun fi gomomi uku" / "ya fi, ya fi ƙanƙanta, ko daidai"
Status: FIXED — applied to content.json + p2-maths.json. Revalidated. Distractor text ("... ya ƙasa") in microPauses/quiz options left as-is (plausible-wrong distractor label, not prose).
Escalated to TIMSAN? no
```

```
Module ID: p2-maths-24
Category failing: accuracy
Field: quizQuestions[3].templateHa
Exact text: "Karfe 7 da rabi yana nufin me?"
What's wrong: missing hooked letter
Suggested correction: "Ƙarfe 7 da rabi yana nufin me?"
Status: FIXED — applied to content.json + p2-maths.json. Revalidated.
Escalated to TIMSAN? no
```

### Round 1 (2026-07-04) — fixed after Foreman rulings

```
Module ID: p2-bsci-12
Category failing: register
Field: textExplanationHa, audioScript
Exact text: "kwan lantarki"
What's wrong: term for "electric bulb" may not be the preferred classroom term
Suggested correction: possibly "ƙwan fitila" — unconfirmed
Status: FIXED — user ruled `ƙwan fitila`; applied to content.json + p2-bsci-complete.json. Revalidated.
Escalated to TIMSAN? no
```

```
Module ID: p2-socs-11
Category failing: register
Field: textExplanationHa, audioScript, quizQuestions[4]
Exact text: "coat of arms"
What's wrong: untranslated English term in a Hausa Social Studies module
Suggested correction: "tambarin ƙasa" or "tambarin Nijeriya" — needs a pick, no corpus precedent for either
Status: FIXED — user ruled `tambarin Nijeriya`; applied to content.json + p2-socs.json. Revalidated.
Escalated to TIMSAN? no, unless user wants confirmation
```

```
Module ID: p2-maths-21
Category failing: drift / register
Field: audioScript (second [MAIN] segment)
What's wrong: generic number/place-value filler copied across modules instead of length-specific content
Suggested correction: needs authored replacement (rope/stick/pencil/table/path/cloth comparison) — judgment-requiring drafting, not a mechanical fix
Status: FIXED — Foreman-authored length-specific second [MAIN] segment applied to content.json + p2-maths.json. Revalidated.
Escalated to TIMSAN? no
```

```
Module ID: p2-maths-22
Category failing: drift / register
Field: audioScript (second [MAIN] segment)
What's wrong: same generic filler issue, weight-specific content needed
Suggested correction: needs authored replacement (stone/book/bag/calabash/bucket/cotton comparison) — judgment-requiring drafting
Status: FIXED — Foreman-authored weight-specific second [MAIN] segment applied to content.json + p2-maths.json. Revalidated.
Escalated to TIMSAN? no
```

```
Module ID: p2-maths-24
Category failing: drift / register
Field: audioScript (second [MAIN] segment)
What's wrong: same generic filler issue, time-specific content needed (orthography half of this module's issue is already fixed above)
Suggested correction: needs authored replacement (big hand at 12 = full hour, big hand at 6 = half past) — judgment-requiring drafting
Status: FIXED — Foreman-authored time-specific second [MAIN] segment applied to content.json + p2-maths.json. Revalidated.
Escalated to TIMSAN? no
```

---

## Summary-of-run

```
Validation run date: 2026-07-04 (Round 1)
Reviewer: user (first pass) / TIMSAN (escalations only)
Modules reviewed: 54 / 54
Modules PASS: 54 / 54
Modules with open issues: 0 / 54
Basic Science: 15/15 PASS
Mathematics: 24/24 PASS
Social Studies: 15/15 PASS
Blocking issues: none
Non-blocking issues: none
```

Once all 54 rows are PASS, this gate is closed and P2 moves from "build-complete" to "shippable" only after the user/TIMSAN validation gate is closed. Ajami re-enablement (Gate 7 of the main checklist) remains a separate, later, deferred phase — not in scope here.
