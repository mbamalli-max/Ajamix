# AJAMIX Builder Brief — Regenerate 18 flagged Basic Science images

**Task ID:** AJAMIX-BSCI-FULLBATCH-REGEN-1
**Role:** You are the Builder. Generate images using your own image-generation capability (the same one used in all prior successful runs). Asset production only — no Hausa text, no module JSON, no content decisions.

## Context

QA on the 91-image Basic Science batch (`tasks/2026-07-20-bsci-fullbatch-qa-result.md`) found 14 FAIL and 4 BORDERLINE. 13 of the 14 FAILs shared one root cause: unrequested mosque-specific architecture (dome, minaret, arched windows) appearing in background townscapes — this is the third batch where this pattern has appeared, so the shared Style B prompt template has now been permanently strengthened with an explicit no-religious-architecture constraint (Muhammad's decision, 2026-07-20). `tasks/2026-07-20-bsci-chatgpt-prompts.md` has been regenerated from that corrected template — every entry in it now includes the fix, not just these 18.

Three of the 18 flagged images also had a second, unrelated issue, and their manifest `depictEn` was corrected accordingly (also reflected in the regenerated prompt doc):
- `p4-bsci-18` — digestive-tract organs rendered too anatomically graphic (vivid pink/red) instead of the required non-graphic outline register.
- `p3-bsci-02` — manifest previously asked for "labeled pointer lines," which directly contradicted the template's own ban on anatomy-relationship lines (pointer lines are overlay-only). Manifest now asks for a child actively using each body part instead.
- `p1-bsci-09` — the rain-source panel read as a flood scene rather than mild weather; manifest now explicitly specifies gentle rain with no standing water.

The remaining flagged images (`p3-bsci-12`, gibberish sky artifact) should self-correct from a fresh generation against the corrected template; no additional manifest change was needed there.

## Scope — exactly 18 images

Read `tasks/2026-07-20-bsci-chatgpt-prompts.md` and generate one image per entry (using the current, corrected version of each entry) for exactly these 18 ids — do not regenerate any other image:

```
p1-bsci-09, p1-bsci-10, p2-bsci-04, p2-bsci-12, p3-bsci-02, p3-bsci-05,
p3-bsci-12, p4-bsci-05, p4-bsci-07, p4-bsci-08, p4-bsci-11, p4-bsci-18,
p5-bsci-03, p5-bsci-10, p6-bsci-03, p6-bsci-04, p6-bsci-10, p6-bsci-13
```

## MANDATORY — output naming

Save each generated image directly as (overwriting the existing file):

```
tools/image-pipeline/output/raw/style-b-<id>.png
```

If your image tool saves to its own managed directory first, copy/rename into the path above as the immediate next step for each image, and verify each file exists with non-zero size before moving to the next.

## Out of scope

- Do NOT regenerate any image outside these 18.
- Do NOT touch `app/content.json`, any runtime file, or any module JSON.
- Do NOT run the overlay compositor.
- Do NOT run any `git` command. No commit, no push, no merge.

## Report to

Write a report to `tasks/2026-07-20-bsci-fullbatch-regen-report.md`: a per-image status table (id, generated/failed, output path) plus any error detail for failures.

## Human approval gates

Draft image assets for QA review only — no promotion into `app/images/` as part of this dispatch. Independent re-QA (specifically re-checking for religious architecture, plus each image's specific original defect) happens after, before any acceptance.
