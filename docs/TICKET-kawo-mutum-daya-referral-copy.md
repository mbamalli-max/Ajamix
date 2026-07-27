# Ticket — Referral modal eyebrow/title copy fix: "Kawowa Daya" → "Kawo mutum Ɗaya"

**Filed:** 2026-07-04
**Filed by:** Architect (Claude), from Gate 5 release-gate walkthrough (`docs/VALIDATION-CHECKLIST.md`)
**Severity:** PATCH — copy-only, no functional impact
**Status:** Open, awaiting Foreman/Codex fix

---

## Context

Found while testing the referral modal during Gate 5 (flipped `referral` feature flag on to reach the sheet). Every other instance of "ɗaya" (one) in the app correctly uses the hooked ɗ; this string is the sole exception.

`grep -n "Kawowa" app/app.js` confirms exactly two occurrences, both at the same site, both missing the hook:

```js
// app.js:4482
'<p class="eyebrow">' + ha("Kawowa Daya") + "</p>",
// app.js:4483
'<h2 id="referral-modal-title">' + ha("Kawowa Daya — Mai Yada Ilimi") + "</h2>",
```

## The fix

Reviewed with the user (Hausa-orthography authority for this project) against the modal's own body copy (`app.js:4486`):

```
Ka kammala modules biyar. Ka taimaka wani ya shiga AJAMIX domin ilimi ya kara yaduwa.
```
("You've finished five modules. Help someone [else] join AJAMIX so education can spread further.")

Since the feature is explicitly about bringing in a *person* (wani), not an abstract "one," the user decided the eyebrow/title should say so directly rather than use the shorter verbal-noun label. Confirmed replacement text: **"Kawo mutum Ɗaya"** ("Bring one person").

```js
// app.js:4482
'<p class="eyebrow">' + ha("Kawo mutum Ɗaya") + "</p>",
// app.js:4483
'<h2 id="referral-modal-title">' + ha("Kawo mutum Ɗaya — Mai Yada Ilimi") + "</h2>",
```

Copy-only change, contained to `app.js`; no content/schema changes needed.

## Escalation-style summary

```
Ticket: Referral modal eyebrow/title copy fix
Component: app.js:4482-4483 — referral modal eyebrow (<p class="eyebrow">) and <h2 id="referral-modal-title">
Trigger: referral modal opens (feature flag `referral: true`, badge state unlocked/shared)
Actual: "Kawowa Daya" / "Kawowa Daya — Mai Yada Ilimi" (missing hooked ɗ)
Expected: "Kawo mutum Ɗaya" / "Kawo mutum Ɗaya — Mai Yada Ilimi" (confirmed by user, matches body copy's person-centered meaning)
Fix location: app.js only, no content/schema changes
```
