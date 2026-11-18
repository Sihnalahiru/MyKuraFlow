# MyKuraFlow Full Application Audit — 2026-11-18

## Scope and safety
This is a read-only audit of the current `main` branch. No existing study JSON, source PDF-derived content, images, translations, lesson mappings, user records, D1 rows, or credentials were edited by this audit.

## Executive status
- App: installable PWA shell with authentication, lesson library, flashcards, a legacy vocabulary-style quiz, progress, and leaderboard.
- Backend: Cloudflare Worker + D1 endpoints exist for login, progress, quiz attempts, leaderboard and activity.
- Study source: the current app loads 15 JSON batches. The active data includes the front matter and page records through printed page 123, but this is not equivalent to a fully source-audited textbook.
- Exam CBT: NOT IMPLEMENTED to the exam standard supplied on 2026-11-18.
- Full study-content audit: NOT_YET_PROVEN (the repository's own audit records this status).

## Current application features
| Area | Current state | Audit finding |
|---|---|---|
| Login | Implemented | Three pre-created learner accounts; avatar selection; persistent bearer token |
| Multi-user separation | Implemented | Per-user progress keys and D1 user IDs |
| Lessons | Implemented | Reads 15 JSON source batches |
| Japanese / Romaji / English / Sinhala | Present in active batches | Field presence is not proofreading or translation approval |
| Images | Partially mapped | Mapping status file explicitly says full visual comparison is still required |
| Flashcards | Basic page-text cards | Not a curated vocabulary SRS system |
| Quick quiz | Existing | Japanese-English matching quiz, 10 questions, 10-minute timer; not SSW CBT |
| Exam papers | Missing | No 10-paper selector or 40-question CBT simulation |
| Written exam | Missing | No 30-question True/False ○ / × exam mode |
| Practical exam | Missing | No 10-question document/equipment/diagram-based mode |
| Sectional scoring | Missing | No separate Written and Practical pass calculation |
| XP | Partial | Backend awards 10 XP per completed study record and 5 XP per quiz point; no exam-grade XP rules |
| Leaderboard | Implemented | Uses D1 aggregate XP and quiz metrics |
| Full navigation | Partial | Sidebar navigation exists; no unified mobile bottom navigation for all app sections |
| Streak / daily goals | Missing | Dashboard still displays streak as not enabled |
| Offline sync | Partial | Study shell is cached; progress sync errors are only logged, not queued/reconciled |
| Accessibility / QA | Needs review | Full keyboard, screen-reader, small-screen and cross-browser QA not proven |

## Active study-data inventory
The current `SOURCES` list in `app.js` references 15 JSON batches:
- Front matter: 8 records.
- Part 1 active batches: 4 + 6 + 10 + 10 + 10 + 4 records.
- Part 2 active batches: 15 + 10 + 10 records.
- Part 3 active batches: 10 + 10 records.
- Part 4 active batches: 10 + 5 records.
- Total active page records: 122.

Important reconciliation:
- Printed page 49 is unresolved in the source sequence; do not invent it.
- A legacy Part 1 batch for pages 49–58 overlaps corrected data and is deliberately not in the active `SOURCES` list.
- A second Part 2 batch for pages 59–68 overlaps the active 54–68 batch and is deliberately not in the active `SOURCES` list.
- The 50–59 corrected Part 1 file currently contains only four page records (50–53), despite its filename.
- Keep these overlaps out of the app loader until the source-page ledger is reconciled.

## Source integrity and completeness blockers
The repository's `data/final-source-audit-123-pages.json`, `data/study-notes-completeness-audit.json`, `data/source-manifest.json` and `public/images/IMAGE_MAPPING_STATUS.md` document the following:
1. Source page accounting and printed-page mapping are not fully reconciled.
2. Printed page 49 remains unresolved.
3. Several page batches remain draft or pending proofing.
4. Japanese, furigana/Romaji, English and Sinhala fields being present does not prove linguistic accuracy.
5. Numeric tables, measurement conversions, formulas, safety thresholds, document labels and step-by-step procedures need item-level checks.
6. Binary image assets need visual comparison with the original PDF; filenames and mappings alone do not prove correctness.
7. Required release evidence (source-to-note traceability for every heading, paragraph, table row, warning and visual) is incomplete.

## Exam standard frozen from the user's supplied specification
- Delivery: CBT.
- One full paper: 40 questions.
- Written: 30 True/False items, with ○ = True and × = False.
- Practical: 10 items using slips/documents, equipment and workplace diagrams/images.
- Total time: 80 minutes, split into Written 40 minutes and Practical 40 minutes.
- Written pass threshold: 65% (at least 20/30 if whole-number scores).
- Practical pass threshold: 60% (at least 6/10).
- 10 selectable mock-paper tiles.
- On each MCQ selection, auto-advance after 0.8 seconds; show Correct, Wrong, Remaining and question navigation.
- Timer, per-section result, XP reward and learner-specific history.
- At least 500 distinct question-bank items across all active syllabus sections.
- Question bank must be a separate, versioned data module; it must not overwrite or transform study-source records.
- Practical items must point to an actual, reviewed image/document/equipment visual. No guessed image-to-question mappings.

## Required implementation before calling CBT complete
1. Create a separate exam question bank with stable IDs, section, exam type, question text, options/answer, explanation, source page(s), visual reference (where applicable), difficulty and review status.
2. Validate at least 500 distinct questions; no duplicate stems/answers disguised by trivial rewording.
3. Build 10 paper tiles; each paper selects exactly 30 Written + 10 Practical items.
4. Enforce section clocks and separate pass thresholds; report overall pass only if both sections pass.
5. Add 0.8-second auto-next, manual question grid/navigation, answer review and pause/resume behaviour.
6. Add exam XP without changing the existing study-completion XP formula or user progress records.
7. Add a unified responsive navigation system without removing existing navigation.
8. Add automated checks for question count, IDs, answer validity, paper composition, timer rules, source references and data immutability.
9. Run browser/mobile regression tests for login, logout, session restore, lessons, images, flashcards, progress sync, leaderboard and exams.

## Release gate
Do not label the application or the 500-item bank “fully audited” until the source completeness audit is closed and all CBT question items have passed source review. Existing source data remains the authoritative study corpus.
