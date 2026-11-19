# First 25 Study Pages — Source Coverage and Visual Map QA Checkpoint
Date: 2026-11-19
Branch: feature/heavy-source-audit-cbt

## Scope
QA review of the first 25 numbered study pages: original printed pages 9–33, using the original Japanese PDF and the latest deduplicated working DOCX.

## Important correction to page mapping
Printed page number equals PDF physical page number in this source range. A stale note in the page 19–26 section incorrectly said “printed 19–26 (PDF 21–26)”; it has been corrected in the new QA working copy to PDF physical pages 19–26. Do not apply any page offset.

## Content coverage findings — pages 19–26
A complete inspection of DOCX tables as well as paragraphs confirms that several items previously labelled missing by paragraph-only audits were already present:
- p21: picking forklift qualification table includes 1 tonne or more (skills training completion), under 1 tonne (attendance at 特別教育), and work under 10 metres (completion of 特別教育).
- p22: all five trolley types are in a bilingual comparison table, including cage trolley safety bar.
- p23: AGV, AMR and AGF are separately defined in a bilingual table.
- p24: belt, roller, chain and screw conveyors are in a bilingual table; sorter and crane explanations are present.
- p25: licence, skills-training completion and special-education completion categories are present, along with equipment qualification summary.
- p26: palletizer and depalletizer functions are in a bilingual table; pallet, vanning and devanning notes are present.
Therefore do not add these a second time. The earlier audit claims based on paragraph-only inspection must be considered superseded by this paragraph+table check.

## Text corrections in QA copy
- Corrected stale page note claiming printed p19–26 corresponded to PDF physical p21–26.
- Rewrote the gap-repair introduction so it no longer says the six pages were absent or that the section fills a gap between pages 19–26 and 27–51.
- Kept the page-mapped p21–26 sequence and qualification table.
- The duplicate unanchored p21–26 block remains removed in this separate working copy.

## Visual reference map
The DOCX's existing indexed image appendix includes extracted source visuals for printed pages 11, 19–24 and 26–33. Separate full-page source facsimile references exist for pages 15–18. To make every page in the first 25-page range traceable to its original visual layout, full-page facsimile references for pages 9, 10, 12, 13, 14 and 25 have now been added.
Together, these references cover printed pages 9–33 without a missing page number:
- Full-page facsimiles: 9, 10, 12–18, 25.
- Page-indexed extracted original source visuals: 11, 19–24, 26–33.

Important: a full-page facsimile is a traceability reference, not proof that every individual figure has been separately embedded inline next to its explanation. Inline placement and figure-to-note matching still require a final visual check.

## Latest working artifacts
- DOCX: `SSW_Warehouse_English_Sinhala_FIRST25_QA_VISUALMAP_WORKING.docx`
- PDF: `SSW_Warehouse_English_Sinhala_FIRST25_QA_VISUALMAP_WORKING.pdf`
- DOCX: 17,834,242 bytes; 1,576 paragraphs; 144 tables; 184 inline images.
- PDF: 183 pages.
- DOCX opens and PDF conversion completed successfully using LibreOffice.

## Still not final-approved
1. Review rendered pages for all first-25 notes and tables, especially table splits and image positions.
2. Proofread all Sinhala wording and Japanese technical terms against the source.
3. Compare each source page 9–33 line/table/figure to the notes and confirm no omitted content.
4. Only after those checks may pages 9–33 be marked final-approved.

## Preservation
Original Master DOCX and earlier working copies remain unchanged. No app UI, app code, study data, question bank, authentication, accounts, progress, XP, history or original asset filenames were changed. Latest DOCX/PDF are working files in the conversation runtime; they are not committed as GitHub binary assets.
