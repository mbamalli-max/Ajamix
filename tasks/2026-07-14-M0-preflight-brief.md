# Builder Brief: M0 Preflight — Alignment Matrix and Live Count

**Task ID:** AJAMIX-M0-PREFLIGHT  
**Date:** 2026-07-14  
**Slice:** M0 — Preflight (alignment matrix + live count verification)

---

## Objective

Produce a source-grounded alignment matrix for all 60 proposed Social and Citizenship Studies modules (P3–P6, 15/band), and verify the current live `app/content.json` module count, before M1 module authoring begins.

---

## In Scope

1. **Live count verification:** Read `app/content.json` and report the total module count. This count becomes the baseline for post-slice validation; each subsequent milestone will add exactly its expected module IDs and must close with the baseline + expected increase.

2. **Alignment matrix:** For all 60 proposed modules in the brief (`docs/ARCHITECT-BRIEF-SOCS-P3-P6.md` §6), produce a CSV or markdown table with these columns:
   - Module ID (e.g. `p3-socs-01`)
   - English title (from brief)
   - **Curriculum version** (NERDC 2025 Social and Citizenship Studies)
   - **Grade** (P3, P4, P5, P6)
   - **Official strand / theme** (from NERDC 2025 SCS curriculum document)
   - **Official topic or objective** (quoted from NERDC 2025 SCS document where possible; if the document uses a different wording, include both the official phrasing and the brief's phrasing in a note)
   - **Source page / section** (document reference, e.g. "SCS Curriculum P3–6, page 42")
   - **Classification** (Direct coverage / Combined coverage / Enrichment)
   - **Notes** (any material deviation from NERDC or curriculum link comments)

3. **Matrix validation checks:**
   - Every row has a module ID and title from the brief.
   - No module is listed twice.
   - Every row's actual source is explicitly cited (see Constraints §1 — best-available public sources, not fabricated NERDC citations).
   - Every module is classified as one of the three types (not left blank).
   - Every row has a `verificationStatus` value (see Constraints §1).
   - Any module that could not be mapped to any public source is flagged "mapping uncertain — no public source found" for Architect review.

4. **Report:** save the alignment matrix to `tasks/2026-07-14-M0-alignment-matrix.md` (markdown table format) or `.csv` (if tabular). Include:
   - Source document: title, publication date, version, URL or file path used
   - Total row count (should be 60)
   - Rows with "mapping uncertain" flags (if any) — list the module IDs and reason
   - Live `app/content.json` module count
   - Date/time of report

---

## Out of Scope

- No module authoring
- No changes to `app/content.json`
- No engine-file edits
- No git operations
- No image-manifest production (that comes with M1+)
- No commit or push

---

## Acceptance Gates

1. Alignment matrix produced with all 60 module rows.
2. Every row has curriculum version, grade, strand/theme, official objective, source page, and classification.
3. NERDC 2025 Social and Citizenship Studies is the declared primary curriculum source (not legacy National Values Curriculum or other baseline).
4. Live `app/content.json` module count read and reported.
5. No module entries flagged as "mapping uncertain" — if any exist, they must be listed and a note must explain why the Architect should review before M1.
6. Report saved to `tasks/2026-07-14-M0-alignment-matrix.md` and `tasks/2026-07-14-M0-preflight-report.md`.

---

## Context to Read

1. **Project brief:** `/Users/muhammadbamalli/Documents/ajamix/docs/ARCHITECT-BRIEF-SOCS-P3-P6.md` — especially §2 (curriculum declaration), §5 (sensitivity rules), §6 (full topic map).
2. **NERDC 2025 Social and Citizenship Studies curriculum document** — the source of official strands, themes, and objectives. If the document is not readily available, flag it in the report and consult with Architect before proceeding.
3. **Live content:** `/Users/muhammadbamalli/Documents/ajamix/app/content.json` — read the module count.
4. **Project state:** `ai-system/projects/ajamix/ACTIVE_TASK.md`, `CURRENT_STATE.md`, `SESSION_NOTES.md` (latest 2026-07-14 entry).

---

## Report to

**Output paths (both mandatory):**
- `tasks/2026-07-14-M0-alignment-matrix.md` — the matrix itself (markdown table)
- `tasks/2026-07-14-M0-preflight-report.md` — summary report with live count, source document citation, any uncertain mappings, and sign-off

**Message format:** Use `--output-last-message` for the brief summary only; the detailed matrix and report are files on disk.

---

## Constraints

1. **NERDC 2025 as declared target, best-available sources for now:** the primary source is the 2025 revision of the NERDC Social and Citizenship Studies curriculum (separate from Nigerian History). **CONFIRMED BLOCKED (2026-07-14):** the official grade-level NERDC document (strands/objectives/page numbers) sits behind a login-gated LMIS portal (`lmis.nerdcportals.com.ng`) with no available credentials. Only the NERDC implementation-strategy PDF and a press release are publicly reachable, and neither contains grade-level strand/objective detail.
   - **User-approved fallback (2026-07-14):** use best-available public sources instead — state ministry of education syllabi, WAEC/NECO-aligned schemes of work, and other reputable published Nigerian primary-curriculum references for Social Studies / Civic Education — as the cited basis for the alignment matrix.
   - **Every row's "Curriculum version" column must state which actual source was used** (not just "NERDC 2025") — e.g. "Lagos State Ministry of Education Scheme of Work, Primary 4, Social Studies" or "NERDC 9-Year BEC Implementation Strategy (context only, no grade detail)".
   - **Every row must be marked** with a `verificationStatus` value: `BEST-EFFORT — NOT VERIFIED AGAINST OFFICIAL NERDC GRADE DOCUMENT` (this will apply to all or nearly all rows given current access). Do not claim official NERDC page-level sourcing unless the LMIS portal was actually accessed.
2. **No interpretation dressed as citation:** do not invent a strand/objective and attribute it to NERDC. If a public secondary source is used, cite that source specifically. If no public source supports a proposed module's framing at all, flag it "mapping uncertain — no public source found" rather than inventing one.
3. **No module authoring:** this is alignment and verification only. Do not draft any module JSON, audio, or explanations.
4. **No file edits outside tasks/:** do not edit `docs/ARCHITECT-BRIEF-SOCS-P3-P6.md`, `app/content.json`, or any runtime file.
5. **Sandbox:** workspace-write, restricted in practice to files under `tasks/` (the brief's own scope limits — do not touch anything else even though the sandbox permits it).

---

## Rollback Notes

This is a read-only slice. If the Architect rejects the alignment matrix:
- No files were changed (tasks/ reports only).
- Delete the matrix and report files if a revised alignment matrix is requested.
- No state needs to be rolled back.

---

## Human Approval Gates

1. Architect reviews the alignment matrix and NERDC source citation.
2. Architect approves before M1 dispatch: "the alignment matrix is complete and all 60 modules map clearly to NERDC 2025 SCS curriculum."
3. If any module is flagged "mapping uncertain," Architect resolves it or routes back for revision.

---

**Task version:** 2026-07-14  
**Prepared by:** Claude (Architect) for Codex (Builder)  
**Next action:** on report receipt, Architect reviews + approves before M1 dispatch.
