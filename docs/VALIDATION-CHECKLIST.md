# Ajamix v3.0 — Staged Validation Checklist

Latin-first validation. Walk gates **in order**. A gate must fully pass before you advance to the next one. If any item fails, stop, fill the **Escalation** block at the bottom of that gate, and send it back — I will refine and you re-run that gate only.

**Ground rules**

- Latin-first build: the app must render Hausa in Latin (boko) everywhere. Any Arabic/Ajami glyph is a bug.
- Companion artifact: [`docs/HAUSA-TERMS.md`](HAUSA-TERMS.md). Re-generate with `node scripts/extract-hausa-terms.mjs` after any content edit.
- "Correct Hausa" = authored Latin spelling (including hooked letters `ɓ ɗ ƙ`) renders exactly. If a word looks wrong, the source text is wrong, not the renderer.

---

## Gate 0 — Build sanity

**Goal:** The Latin-only build boots on a fresh device and on an upgraded device.

**Pre-reqs:**
- `git status` shows the latest commit includes `scriptMode: "latin"` default + SW cache bump to `ajamix-v23`.
- Dev server running: `node serve.mjs` → `http://localhost:3002/app/`.

**Fresh-install check**
- [ ] Open DevTools → Application → Storage → **Clear site data**. Reload.
- [ ] App loads without white screen or crash.
- [ ] DevTools Console: zero red errors.
- [ ] DevTools → Application → Service Workers: active worker version includes `ajamix-v23`.
- [ ] DevTools → Application → IndexedDB → `ajamix-db` → `settings` → `scriptMode` key reads `"latin"` (after completing onboarding).

**Upgrade check (existing user)**
- [ ] In DevTools → Application → IndexedDB, manually set `settings.scriptMode = "ajami"` and reload.
- [ ] After reload, the `scriptMode` row flips back to `"latin"` (migration coerces it).
- [ ] UI renders Latin — no Arabic glyphs visible.

**Visual scan**
- [ ] Take one full-page screenshot on the home screen. Search it for any `ء ا ب ت ث ج ح خ` — expected: none.

### Escalation for Gate 0
If anything fails, copy this block back with details filled in:

```
Gate: 0 Build sanity
Step that failed: …
Expected: …
Actual: …
Screenshot / console paste: …
```

---

## Gate 1 — Onboarding copy (7 steps)

**Goal:** Every visible string across the 7-step onboarding flow reads as correct Hausa (Latin).

Clear storage, reload, and walk the full flow without skipping.

- [ ] **Step 1 — Welcome.** Title, subtitle, proverb (from `AJAMI_PROVERBS`) are correct Hausa.
- [ ] **Step 2 — Name.** Prompt label, placeholder, error copy when empty.
- [ ] **Step 3 — Learner type.** Child vs Adult labels + descriptions.
- [ ] **Step 4 — Script notice.** Confirms the screen says karatu is in Hausa Latin for now (no Ajami/Latin toggle buttons). Back/Next navigate correctly.
- [ ] **Step 5 — Grade band.** All 14 band labels render; chosen band echoed in muted line.
- [ ] **Step 6 — Track select.** `Hanyar Kasuwanci` and `Hanyar Makaranta` titles + descriptions.
- [ ] **Step 7 — PIN (optional).** Headline, helper text, Skip button label.
- [ ] Cross-check the 7 screens against the **UI strings** table in `docs/HAUSA-TERMS.md` — flag any string that is there but did not appear, or any string on screen that is missing from the table.

### Escalation for Gate 1
```
Gate: 1 Onboarding copy
Step number: …
Exact string on screen: …
What's wrong: spelling | grammar | wrong word | awkward phrasing | missing diacritic
Suggested correction: …
```

---

## Gate 2 — Track select + dashboard chrome

**Goal:** The persistent navigation + landing view reads cleanly in both tracks.

- [ ] Navigate to **Hanyar Makaranta** (formal). Tab labels, streak pill, "Kawowa Ɗaya" badge copy (locked state) are correct.
- [ ] Switch to **Hanyar Kasuwanci** (vocational). Same elements re-check; also confirm vocational modules V01–V10 list titles render in Latin.
- [ ] Progress tab: streak numbers, day labels, referral-locked CTA text.
- [ ] Glossary tab: first page of glossary entries renders (no Ajami column visible since Latin mode).
- [ ] Download tab: audio-status pills, storage pills, button labels.

### Escalation for Gate 2
```
Gate: 2 Track / dashboard chrome
Screen: home | progress | glossary | download
Exact string: …
What's wrong: …
Suggested correction: …
```

---

## Gate 3 — Module content (sample 5 modules)

**Goal:** Authored content renders as-written.

Pick 5 modules spanning at least 3 subjects and both tracks (e.g. `n1-maths-01`, `p2-science-03`, `jss1-english-02`, `V01`, `V07`). For each:

- [ ] Title (`titleHa`) matches `content.json` exactly.
- [ ] Body (`textExplanationHa`) renders with correct line breaks and hooked letters (`ɓ ɗ ƙ` display, not `?` or boxes).
- [ ] Audio script caption (if shown) is readable Hausa.
- [ ] Gap-teaser card copy (`gapTeaser`) is in Hausa, not English placeholder.
- [ ] `chainNext` call-to-action label reads correctly.
- [ ] Open `docs/HAUSA-TERMS.md` recurring-words table. Spot-check 10 top recurring words (`da`, `ka`, `a`, `ko`, `yi`, `za`, `idan`, `mu`, `ba`, `na`) inside the module body — they should all be real Hausa particles, not typos.

### Escalation for Gate 3
```
Gate: 3 Module content
Module ID: …
Field: titleHa | textExplanationHa | audioScript | gapTeaser | chainNext
Exact text: …
What's wrong: …
Suggested correction: …
```

---

## Gate 4 — Quiz templates + micro-pauses

**Goal:** Template substitution produces grammatical Hausa, micro-pause questions read naturally.

Run the full quiz + audio-with-pauses for at least 3 modules.

- [ ] `templateHa` with `{a}` / `{b}` placeholders → the rendered question has numbers in the correct positions and no stray braces.
- [ ] Each quiz option (if stored as Hausa text) renders correctly.
- [ ] Micro-pause `questionHa` prompts mid-audio read as natural Hausa.
- [ ] Correct-answer feedback copy (`correctAnswer`, "Daidai!", etc.) is Hausa, not English fallback.
- [ ] Auto-advance + Next button labels OK.

### Escalation for Gate 4
```
Gate: 4 Quiz / micro-pauses
Module ID: …
Field: templateHa | questionHa | option | feedback
Rendered text: …
Expected: …
```

---

## Gate 5 — Retention + referral copy

**Goal:** The loops that drive Day-2 / Day-7 / Share KPIs read cleanly.

- [ ] Finish a module → **Use-Today sheet** appears. Headline, Yes/No buttons, explanatory copy in Hausa.
- [ ] Simulate 12h later: DevTools → IndexedDB → `ajamix-db` → `progress` → edit `lastAccessedAt` back 13 hours, reload. **Tomorrow-Check sheet** appears with correct Hausa copy.
- [ ] Complete 5 modules (or set `referralBadgeState = "unlocked"` in IndexedDB) → **Kawowa Ɗaya** referral modal copy is correct Hausa; Share / Copy link / Export buttons labelled in Hausa.
- [ ] Export `.ajamix` package from settings → success toast copy in Hausa.

### Escalation for Gate 5
```
Gate: 5 Retention / referral
Surface: use-today | tomorrow-check | referral | export
Exact string: …
What's wrong: …
```

---

## Gate 6 — Glossary + settings + error states

**Goal:** The "long tail" surfaces — glossary entries, settings copy, error dialogs — are all correct.

- [ ] Glossary: scroll all 70 entries. Each `termHa` + `definitionHa` reads as valid Hausa. Cross-check against the **Glossary** table in `docs/HAUSA-TERMS.md`.
- [ ] Settings screen: every label, pill, and button label in Hausa. Confirm **no** Ajami/Latin script selector is visible.
- [ ] Error states: force each one and verify copy:
  - Offline content-fetch fail — "An samu matsala" banner.
  - PIN wrong 3 times — lockout copy.
  - Import `.ajamix` with bad schema — rejection copy.
- [ ] Audio download flow: progress copy, "completed" copy, "delete audio" confirmation.

### Escalation for Gate 6
```
Gate: 6 Glossary / settings / errors
Surface: glossary | settings | error
Exact string: …
What's wrong: …
```

---

## Gate 7 — Ajami re-enable smoke (deferred)

**Not run during Latin-first validation.** Triggered later, once all six preceding gates have passed AND a term-by-term validated Ajami spelling list exists for the recurring words in [`docs/HAUSA-TERMS.md`](HAUSA-TERMS.md).

When that time comes, the plan is:
1. Attach validated Ajami to each `termHa` / `titleHa` in `content.json` via the existing `titleAjami` / `termAjami` fields.
2. Re-enable the script toggle (revert the UI removals in `renderOnboardingStep4` and the settings panel).
3. Flip `DEFAULT_SETTINGS.scriptMode` back to `"ajami"` (or keep Latin as default and let users opt in).
4. Re-walk Gates 1–6 with `scriptMode === "ajami"` and compare every screen side-by-side against its Latin counterpart.

Detailed steps will be added here when we reach that gate.

---

## Summary-of-run (fill after all gates pass)

```
Validation run date: …
Build commit: …
Tester: …
Gates passed: 0 / 1 / 2 / 3 / 4 / 5 / 6
Gates blocked: …
Notes: …
```
