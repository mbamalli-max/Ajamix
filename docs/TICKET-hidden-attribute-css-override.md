# Ticket — CSS `display` rules silently defeat the native `hidden` attribute on lesson audio UI

**Filed:** 2026-07-04
**Filed by:** Architect (Claude), from Gate 3 release-gate walkthrough (`docs/VALIDATION-CHECKLIST.md`)
**Severity:** BLOCKER-in-waiting — invisible today on almost all modules, but will visibly break on every module the moment real audio is produced
**Status:** Open, awaiting Foreman/Codex fix

---

## Context

Found while smoke-testing `n1-maths-01` (one of the only 4 modules with a real, non-placeholder audio file on disk) during Gate 3. The lesson screen showed the **working audio player** (play button, progress bar, resume button) **and** the "Sauti yana zuwa" (audio coming soon) banner **at the same time** — even though the audio was confirmed fully loaded and playable (`audio.readyState === 4`, `audio.error === null`, `audio.getAttribute('src') === 'audio/n1-maths-01.mp3'`).

Ruled out as a testing/timing artifact first: reproduced on a genuinely clean `window.location.reload()`, then re-checked after an explicit 2-second settle delay. Same result both times — this is stable and reproducible, not a race condition.

## The bug

Live DOM inspection (`app.js` runtime, not the HTML string) shows the JS logic itself is correct:

```js
comingSoonHidden: true   // <div data-audio-coming-soon hidden> — JS correctly marks it hidden
playerUiHidden: false    // player controls correctly marked visible
```

So `isLessonAudioMissing()` / `syncLessonUi()` (`app.js:5680-5709`) compute the right answer and set the native `hidden` attribute correctly. The bug is in CSS, not JS.

`app/styles.css:1478`:
```css
.lesson-audio-coming-soon {
  display: grid;
  ...
}
```

This class rule has the same specificity (0,0,1,0) as the browser's built-in UA-stylesheet rule `[hidden] { display: none }`. Because this author rule appears later in cascade order, it wins — so setting `element.hidden = true` (or the `hidden` HTML attribute) has **no visual effect** on any element carrying this class. The element keeps rendering as `display: grid` regardless.

Confirmed via `grep` that **no `[hidden]` override exists anywhere in `styles.css`** — this isn't specific to one selector, it's a missing safety-net rule for the whole stylesheet. The same unconditional-`display` pattern also exists on `.lesson-player-stack` (`app/styles.css:1442`, `display: grid`), which is the counterpart element that's supposed to hide when audio *is* missing — so the reverse case (a non-functional "Fara sauraro" play button staying visible on the ~138/142 modules that currently have no audio) is very likely also affected, though it wasn't independently screenshotted since those modules are gated behind quiz progression in the current test session — it follows from the identical code pattern (JS toggles `.hidden`, CSS never respects it).

## Why it matters

Right now this is nearly invisible: only 4/142 modules have real audio, and the "coming soon" banner is *supposed* to show for the other 138 anyway, so the CSS bug happens to look harmless by coincidence. But:

- For the 4 modules that do have real audio (`n1-maths-01`, `n2-maths-01`, `p1-maths-01`, `p1-maths-17`), users see a working player **and** a "your audio isn't ready yet" message simultaneously — confusing, and directly contradicts what's actually true.
- The moment real Hausa audio recording ships for the other 138+ modules (the actual goal of this whole project), **every single lesson** will show this same stuck "coming soon" banner permanently, because `hidden` will never take visual effect. This bug is currently masked by low audio-production progress, not by working code — it will become universally visible at exactly the moment audio production succeeds.

## Recommended fix

Add the missing safety-net rule to `app/styles.css` — either scoped:

```css
.lesson-audio-coming-soon[hidden],
.lesson-player-stack[hidden] {
  display: none;
}
```

or, since this is a systemic gap (no `[hidden]` rule exists at all in the stylesheet), consider a single global rule near the top of `styles.css`:

```css
[hidden] {
  display: none !important;
}
```

Recommend the global rule — it closes the gap for this case and preempts the same class of bug for any other element in the codebase that sets `display` via a class and is also toggled via the `hidden` attribute/property. Contained to `styles.css`; no JS, content, or schema changes needed.

## Escalation-style summary

```
Ticket: hidden attribute silently overridden by CSS on lesson audio UI
Component: app/styles.css — .lesson-audio-coming-soon (~line 1478), .lesson-player-stack (~line 1442)
Trigger: any module where audio status differs from the initial "unknown" default (i.e., any module with real audio, or explicit missing-audio state)
Actual: JS correctly sets element.hidden = true/false, but no [hidden] CSS rule exists anywhere in styles.css, so class-level `display: grid` (same specificity, later in cascade) always wins — hidden elements stay visually rendered
Expected: hidden elements actually disappear; only one of {player UI, coming-soon banner} visible at a time
Fix location: app/styles.css only, no JS/content/schema changes
Severity note: low visible impact today (0/142... 4/142 modules have real audio) but will affect 100% of modules once real audio production ships
```
