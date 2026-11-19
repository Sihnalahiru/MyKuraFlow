# First 25 Study Pages — Pages 21–26 Duplicate Reconciliation
Date: 2026-11-19
Branch: feature/heavy-source-audit-cbt

## What was checked
Inspected the corrected working DOCX in document order, including paragraphs and tables, and compared the relevant content with original Japanese PDF printed pages 19–26.

## Findings
1. The DOCX had a detailed unanchored continuation beginning “Picking forklift / order picker” immediately after SOURCE PAGE 20. It contained content for printed pages 21–26.
2. A second, explicitly page-mapped “GAP REPAIR” block then repeated the same source range as SOURCE PAGE 21 through SOURCE PAGE 26.
3. This created duplicated content and conflicting page anchors. The gap-repair block has the explicit page headings and source illustration captions, so it was retained as the canonical p21–26 sequence.
4. The earlier unanchored duplicate continuation was removed from the separate QA working copy. The original Master DOCX and previous working builds were preserved.
5. The p21 qualification table was corrected to preserve the Japanese source distinction:
   - Under 1 tonne: 特別教育の受講 — attendance at special education/training is required.
   - Work at a location under 10 metres: 特別教育の修了 — completion of special education is required.
   These must not be translated as the same requirement.
6. The p20 section remains limited to cargo elevator, vertical automatic conveyor, and counterbalance/reach forklift content. The picking forklift and later equipment topics remain under their correct page-specific headings p21 onward.

## QA working artifact
- DOCX: `SSW_Warehouse_English_Sinhala_FIRST25_QA_DEDUPED_WORKING.docx`
- PDF: `SSW_Warehouse_English_Sinhala_FIRST25_QA_DEDUPED_WORKING.pdf`
- DOCX size: 16,581,856 bytes
- Structure after removal: 1,543 paragraphs; 144 tables.
- LibreOffice successfully rendered the DOCX to a 171-page PDF.
- Source page headings 20 through 29 remain sequential in the DOCX.

## Remaining first-25 QA
This correction resolves the identified duplicate block and the p21 attendance/completion translation distinction. It does not certify the whole first-25 range as final:
- Verify every page's text against the Japanese source, including all tables.
- Check p21–26 embedded images against the actual source figures, not captions alone.
- Review Sinhala grammar/technical terminology and English accuracy.
- Check layout, table splits, image placement and captions in rendered pages 9–33.
- Reconcile all remaining first-25 findings before final approval.

## Preservation
Only a separate working copy was modified. Original Master DOCX, original PDF and existing app/UI, question bank, study data, authentication, accounts, progress, XP, history and original asset filenames were not changed.
