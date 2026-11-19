# Study Notes source audit — printed pages 34–43
Date: 2026-11-19 (reconciled after table-level inspection)
Repository: Sihnalahiru/MyKuraFlow
Branch: feature/heavy-source-audit-cbt
Source: `specified_skilled_worker_textbook_202607(2).pdf`
Compared artifact: `SSW_Warehouse_English_Sinhala_P34-43_FINAL_QA_WORKING.docx` (paragraphs and tables inspected; original Master DOCX untouched)

## Method and pagination
Audited exactly ten consecutive printed pages, 34–43. Extracted source PDF pages 34–43 with layout preserved and compared them to page-anchored English/Sinhala study notes. Inspected DOCX paragraphs and tables, then rendered the corrected working DOCX to PDF and checked the affected table pages. Printed page numbers equal physical PDF page numbers.

## Final page-by-page results

| Source page | Final status | Verification |
|---|---|---|
| 34 | Covered | All eight terminology entries checked: container, chassis, head/tractor unit, devanning, forklift, power gate, wing truck and pallet/platform terminology. |
| 35 | Covered | Warehouse and refrigerated-warehouse deposit terms, application, collective term, statutory notification to the Minister, standard terms and operator/depositor/Minister glossary are represented. |
| 36 | Covered | All ten standard-term rules are present: business hours/holidays, additional-work charges, refused cargo, storage application, contract formation and receipt documents, external-only inspection, storage method, storage-period start, release documents and refusal of release. |
| 37 | Covered — prior audit finding corrected | The 3-column DOCX table already contained both source conversion rules: 1,000 kg = 1 tonne and 1.133 m³ = 1 tonne, plus the larger-of-weight-or-volume rule. This was missed by the earlier inspection and is now explicitly verified. No new p37 table was added. |
| 38 | Covered | Per-item/per-pallet rate, floor-area (坪建て) rate and common monthly billing, refrigerated temperature-dependent rates, two-period cycle, handling fee formula, receiving/release and distribution-processing examples are present. |
| 39 | Covered | Duty of care, receipt-to-release sequence, hai-tsuke, five-point storage checklist, building patrol, temperature/humidity, equipment inspection and 3S after operations are present. |
| 40 | Covered | All eight incident/loss categories are present in a DOCX table; confidentiality, no third-party instructions, depositor identity verification and no photography/video in warehouse are present. |
| 41 | Covered | Cargo-characteristic checks, immediate reporting, temperature/humidity records and hot-humid warning signs are present. |
| 42 | Covered | Both odour categories and examples, compound odour risk, comparative care, protect original odour and odour absorption by cardboard/plastic/PET are present. |
| 43 | Covered after correction | The existing source-aligned table already contained three situations/actions: depositor declaration before intake, advance discussion where warehouse odour may transfer, and packaging improvement/double packaging where aroma is a product feature. Added only the missing fourth row: long-term aroma preservation is difficult and packaging should be improved before intake. |

## Correction applied
- Added one row only to the existing p43 odour-control table, in English and Sinhala, for the source's long-term aroma preservation advice.
- Did not add a duplicate p37 conversion table: it was already present and verified in the original working copy.
- Preserved the existing 3-column p43 table and added the missing row, without duplicating the three existing scenarios.
- No quiz questions, app/UI, source assets, login/authentication, user data or progress were changed.

## Render verification
- Corrected DOCX saved as a separate QA working copy: `SSW_Warehouse_English_Sinhala_P34-43_FINAL_QA_WORKING.docx`.
- LibreOffice rendered successfully to a 183-page PDF.
- Extracted PDF text confirms the existing p37 conversion table and the added p43 long-term-aroma row.
- The p43 table flows across a page break; its final row appears on the continuation page. A full visual typography/layout pass of all ten pages is still required before final publication.

## QA status
- Source content p34–43: **COVERED after correction**.
- p37: no correction required; prior Partial finding was a false positive caused by overlooking an existing DOCX table.
- p43: missing source advice row added and verified in rendered PDF.
- Batch content status: **COMPLETE for source coverage**, with full typography/layout sign-off still separate.
- Original Master DOCX remains untouched. The corrected file is a separate working copy, not a final replacement or release-ready publication.
