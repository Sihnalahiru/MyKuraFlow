# First-25 QA — Source pages 9–14 content and layout review
Date: 2026-11-19
Repository: Sihnalahiru/MyKuraFlow
Branch: feature/heavy-source-audit-cbt
Working artifact: `SSW_Warehouse_English_Sinhala_FIRST25_QA_VISUALMAP_WORKING.docx` (separate QA copy; original Master DOCX untouched)

## Scope and method
Compared physical/printed source PDF pages 9–14 against the first Batch 01 section of the working DOCX. Inspected DOCX paragraphs and tables (not paragraphs alone), extracted source text with layout preserved, and rendered the working DOCX to PDF for visual inspection. Source printed page numbers 9–14 match physical PDF pages 9–14.

## Source coverage findings

| Source page | Coverage result | Findings |
|---|---|---|
| 9 | Substantially covered | Warehouse definition; both storage meanings; private vs commercial warehouse; registration requirement; commercial-warehouse operator rules (business scope, charges, building/equipment standards); application → registration → operation sequence are present in English and Sinhala. |
| 10 | Substantially covered | Class 1, 2 and 3 warehouses; dangerous-goods exclusion; fire, moisture and outside-air/temperature protection; open-yard, silo/tank and dangerous-goods storage are represented. |
| 11 | Substantially covered | Refrigerated warehouse, water-surface warehouse, trunk-room distinction (regulated trunk-room vs rental-storage-space), and specially designated warehouse/disaster supplies are represented. |
| 12 | Substantially covered; one source anomaly retained | Ambient, constant-temperature, C3/C2/C1, F1/F2/F3 and SF1/SF2/SF3/SF4 bands and the “above X to Y inclusive” reading rule are present in the temperature table. SF4 is explicitly −50°C or below. The source itself labels the F1 use as ordinary refrigerated goods despite the −24°C to −18°C band; the working notes avoid silently correcting the source and label it as “as listed in the source”. Keep this as a source anomaly for learner awareness. |
| 13–14 | Substantially covered | The section begins warehouse facilities/terminology. Floor load capacity (including 1 m² and approx. 3.3 m²/tsubo), dust-proof floor coating, platform/berth, dock leveller, wall protection boards, shutter/fire shutter, dock shelter, beam, suspended ceiling, mezzanine and fire equipment terms are represented in English and Sinhala. |

No additional missing subject matter was confirmed in pages 9–14 after checking the existing temperature table and the surrounding paragraphs. Do not duplicate these notes.

## Defects / corrective actions still required
1. **Per-page traceability:** Batch 01 groups pages 9–14 as a continuous section rather than giving each source page a clear page anchor. Add explicit SOURCE PAGE 9–14 markers or a concise page-range map without duplicating the content.
2. **Temperature table continuation:** The temperature table splits across rendered PDF pages. The continuation page does not repeat the table header, reducing standalone readability. Repeat the header row on continuation pages or split the table deliberately with a repeated header.
3. **Japanese glyph/font QA:** Rendered PDF shows inconsistent Japanese technical-term glyph rendering in places (some kanji appear incomplete/missing in the rendered text). Verify a Japanese-capable embedded font and re-render; do not treat the pdftotext ligature warnings for Sinhala as proof of visual Sinhala corruption. Sinhala text is visibly rendered in the inspected pages.
4. **Bilingual terminology proof:** Keep English/Sinhala meaning pairs intact and proofread Japanese technical terms after font correction. In particular, check full forms for 営業倉庫, 貯蔵槽倉庫, 危険品倉庫 and 冷蔵倉庫 in the rendered PDF.

## QA status
- Content comparison for printed pages 9–14: **SUBSTANTIALLY COVERED**.
- No new content insertion authorized by this review; avoid duplicate notes.
- Layout/language QA: **OPEN** pending page anchors, repeated temperature-table header and Japanese font verification.
- This report does not approve the whole first-25 range or Step 2. Pages 15–33 and all rendered bilingual layouts still require their remaining checks.
- The working DOCX/PDF are QA artifacts only. Do not replace the original Master DOCX or mark the material release-ready.
