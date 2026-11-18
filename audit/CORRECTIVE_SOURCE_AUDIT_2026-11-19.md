# MyKuraFlow — Corrective Source Audit Baseline
Date: 2026-11-19
Branch: feature/heavy-source-audit-cbt
Base commit: dd18485158c5c63784e4e5cdbe094a19266d5eb2

## Purpose
This report supersedes stale page-accounting statements in AUDIT_REPORT_2026-11-18.md where they conflict with the exact currently supplied source PDF and the active loader. It is an evidence baseline, not a final content or language approval.

## Source file inspected
- `specified_skilled_worker_textbook_202607(2).pdf`
- PDF physical pages: 123
- PDF page labels: physical page 1 is the cover; physical pages 2–122 carry printed labels 2–122; physical page 123 is the publication/copyright colophon and has no `n / 122` footer.
- Text extraction: 123 pages parsed. Per-page extracted text lengths were checked; pages with short text still require rendered-page inspection because diagrams and scanned text may not be represented by extraction.

## Corrected page reconciliation
The current PDF does **not** support the previous claim that printed page 49 is missing or that physical page 50 is blank. Direct extraction from the exact current PDF finds:
- physical page 49 carries printed label 49;
- physical page 50 carries printed label 50;
- physical page 51 carries printed label 51;
- page labels 2–122 proceed sequentially with no missing printed label.
Therefore, printed page 49 is present in the source and the active repository also contains a page-49 record. The old unresolved-page-49 note must be treated as stale for this PDF revision.

## Active application loader audit
The 15 JSON files referenced by `SOURCES` in `app.js` were fetched and parsed from `main`:
- Active JSON files: 15
- Total page records: 123
- Unique PDF-page keys: 123
- Missing PDF-page keys in 1–123: 0
- Duplicate PDF-page keys: 0
- Japanese field populated: 123/123
- Romaji field populated: 123/123
- English field populated: 123/123
- Sinhala field populated: 123/123
- Furigana field populated: 75/123

Important: field presence is not proof of correctness, completeness, or natural translation. Furigana is not necessarily required for every front-matter/colophon/text page; every Japanese passage that needs a reading must be reviewed individually. The first batch uses a nested `lesson.pages` schema and the frontend normalizer adapts it; later batches use different page schemas. A schema-normalization test is still required.

## Current image mapping status (123 page records)
- COMMITTED_AND_LINKED: 32
- SOURCE_PDF_VISUAL_LINKED: 23
- REPO_ORIGINAL_IMAGES_VISUALLY_VERIFIED: 10
- VISUAL_ASSET_COMMITTED_AND_LINKED: 9
- PDF_PAGE_VISUAL_IDENTIFIED: 6
- PENDING_VISUAL_MATCH: 4
- PDF_PAGE_VISUAL_UNAVAILABLE_REQUIRES_RERENDER: 3
- DIAGRAM_ONLY_MAPPING_REQUIRED: 10
- INDIVIDUAL_VISUAL_ASSET_REQUIRED: 9
- NO_STATUS: 13
- Other explicit statuses: 4 records

These are repository-declared statuses, not independent proof that each binary image was visually compared. A complete image audit must open every asset and compare it with the corresponding rendered source page; never infer matches from filenames.

## Content completeness status
The 123 page records are present, but this audit did not certify every paragraph, bullet, heading, table cell, warning, numeric value, procedure, example, or caption against the PDF. The study-notes completeness audit remains NOT_YET_PROVEN. This includes high-risk numeric details, warehouse counters, conversions, dock/vehicle procedures, forklift safety, PPE, GHS labels, and emergency instructions.

## Required next actions
1. Build a page-level source-to-note evidence ledger with a row for every source item (not merely one row per page).
2. Compare every source page render to its app record, preserving Japanese source text and source order.
3. Review Japanese text, furigana, Romaji, English, and Sinhala separately; only mark a language VERIFIED after line-level proof.
4. Inspect all image assets and resolve every page's visual status with evidence.
5. Build a separate, versioned exam question bank with at least 500 distinct source-grounded items.
6. Implement ten 40-question CBT papers: 30 written True/False and 10 practical visual/document/equipment MCQs, 80 minutes total, separate section clocks and pass thresholds.
7. Store exam attempts separately and add exam XP without changing the existing study XP calculation or historical user data.
8. Run mobile, offline, browser, Worker, D1 migration, auth, progress-sync, and exam regression tests.

## Safety invariants
- Do not edit or replace existing study JSON in this audit phase.
- Do not rename, delete, or overwrite existing source images.
- Do not rewrite user records, progress records, sessions, credentials, or existing quiz attempts.
- Exam bank, exam attempts, exam scoring, and exam XP must be separate and versioned.
- Do not call the project fully audited or CBT complete until all release gates have passing evidence.
