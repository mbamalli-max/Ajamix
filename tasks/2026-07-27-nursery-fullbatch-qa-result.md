# Nursery 1/2 Mathematics — QA Result

Date: 2026-07-27
Scope: 24 images (Nursery 1/2 Mathematics, `tools/image-pipeline/output/raw/style-b-<id>.png`)
Reviewer: Claude, direct visual review of every image (not sampled) against its manifest `depictEn` and each
module's actual `textExplanationHa`/`audioScript`.

**Verdict: 24/24 ACCEPT.**

## Verification performed before visual review

- Report claimed 24/24 generated — independently confirmed via three checks, not taken on the report's word:
  1. File existence + dimensions: all 24 present, all exactly 1536×1024, non-zero and varying file sizes
     (1.66–2.42 MB), ruling out a duplicated placeholder.
  2. mtime freshness: all 24 timestamps fall inside the dispatch's actual runtime window (19:46–19:59),
     climbing steadily — consistent with real sequential generation, not a stale/pre-existing file being
     misreported as new.
  3. Raw JSONL transcript: `turn.completed: 1`, `turn.failed: 0`.

## Summary table

| ID | Concept | Verdict | Note |
|---|---|---|---|
| n1-maths-01 | Counting 1-5 | ACCEPT | exactly 5 stones |
| n1-maths-02 | Writing 1-5 | ACCEPT | 5 stones + 5 tracing boxes |
| n1-maths-03 | Circle & Square | ACCEPT | exactly 2 shapes, no others |
| n1-maths-04 | Big & Small | ACCEPT | unmistakable size contrast |
| n1-maths-05 | Counting 6-10 | ACCEPT | 10 stones (two rows of 5) — matches lesson's "goma gabaɗaya" |
| n1-maths-06 | Writing 6-10 | ACCEPT | 10 stones + 5 tracing boxes |
| n1-maths-07 | Triangle & Rectangle | ACCEPT | exactly 2 shapes, no others |
| n1-maths-08 | Long & Short | ACCEPT | aligned-end stick comparison |
| n1-maths-09 | More & Less | ACCEPT | exactly 5 vs 2 kola nuts — exact match to narration |
| n1-maths-10 | Inside & Outside | ACCEPT | one block in box, one outside |
| n1-maths-11 | Patterns (ABAB) | ACCEPT | correct circle/square/circle/square sequence |
| n1-maths-12 | Review 1-10 | ACCEPT | light collage: counting, shape, comparison |
| n2-maths-01 | Counting 1-15 | ACCEPT | 15 stones (three rows of 5) |
| n2-maths-02 | Writing 1-15 | ACCEPT | 15 stones + 6 tracing boxes |
| n2-maths-03 | Heavy & Light | ACCEPT | stone vs feather, unmistakable |
| n2-maths-04 | Position: On/Under | ACCEPT | matching balls, one on table, one under |
| n2-maths-05 | Counting 1-20 | ACCEPT | 20 stones (four rows of 5) |
| n2-maths-06 | Addition 1-5 | ACCEPT | 2 + 3 = 5 grouping, exact match to lesson's worked example |
| n2-maths-07 | Subtraction 1-5 | ACCEPT | 5 in a row, 2 moved aside, 3 remain — exact match |
| n2-maths-08 | Sorting by colour | ACCEPT | 2 red / 2 blue, clearly separated |
| n2-maths-09 | Full & Empty | ACCEPT | full water bowl vs empty bowl |
| n2-maths-10 | Number patterns (1 more) | ACCEPT | 1,2,3,4,5 groups, correct sequence |
| n2-maths-11 | Simple word problems | ACCEPT | 2+1 chairs grouped |
| n2-maths-12 | Review & celebration | ACCEPT | light collage: counting, heavy/light, on/under |

## Cross-cutting checks (all 24)

- **No rendered text, numerals, letters, or symbols** in any image — confirmed by direct viewing, not just
  prompt compliance.
- **No mosque, minaret, dome, church spire, or other faith-specific architecture** in any background — the
  clause carried forward from the Basic Science batch's lesson-learned held across all 24; every background
  building uses plain flat/gabled rooflines only.
- **No people** in any of the 24 — correctly matches the manifest design (these are object/shape/quantity
  concepts, no depiction needed a child present), and none was added gratuitously.
- **Quantities verified exact** against each module's own `textExplanationHa`/`audioScript` wording, not
  just the manifest's restatement of it, for every counting/addition/subtraction image — several were
  spot-verified in Part 28's write-up (5/2 kola nuts, 2+3=5, 5-2=3, ten-total framing) and reconfirmed here
  by direct sight of the actual rendered image, not just the text-level check.
- All 24 `labelsHa` are empty in both manifests — **no overlay compositing is needed for this batch**;
  promotion is a direct file copy with the `style-b-` prefix dropped.

## Disposition

All 24 approved for guarded promotion into `app/images/` as `<id>.png`, matching each module's existing
`imageCard` path in `content.json` (already correct, unchanged — only the file itself was missing).
