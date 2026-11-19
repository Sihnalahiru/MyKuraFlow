# First 25 Study Pages — Update and Source Image Mapping Record
Date: 2026-11-19
Repository: Sihnalahiru/MyKuraFlow
Branch: feature/heavy-source-audit-cbt
Scope: Original printed pages 9–33 (25 numbered study pages)

## Deliverable
Working updated DOCX:
`SSW_Warehouse_English_Sinhala_FIRST25_UPDATED.docx`

The updated copy is built from the existing Master DOCX and preserves the existing material. It adds the previously absent page-specific study text for printed pages 19–20 in English and Sinhala, retaining the Japanese technical terms. It also adds a page-indexed visual appendix using images extracted directly from the original Japanese PDF, grouped by the exact physical/printed source page.

## Pagination verified against the original PDF
The original PDF's physical page 9 is printed page 9; the contents pages precede it on physical pages 2–8. Therefore the first 25 numbered study pages are printed/physical pages 9–33. The earlier note that printed page 9 corresponded to physical page 15 was incorrect and must not be reused.

## Page 19 content added
- Cargo elevator (貨物用エレベーター): cargo-only purpose; no special operator qualification stated by source; restricted persons permitted to ride; maximum loading weight (最大積載重量) must not be exceeded.
- Vertical automatic conveyor (垂直自動搬送機): automatic movement between floors; goods-only; people must never ride; no special qualification stated by source; forklift placement initiates automatic movement.
- English and Sinhala explanations included.

## Page 20 content added
- Forklift (フォークリフト) purpose: loading/unloading from trucks and storage racks.
- Counterbalance forklift (カウンター式): seated operation; suitable for heavier cargo.
- Reach forklift (リーチ式): standing operation; compact and suitable for narrow spaces.
- Required qualification and prescribed training warning.
- English and Sinhala explanations included.

## Original source visual map
The visual appendix contains source images extracted from the PDF with `pdfimages`, not AI-generated replacements. Exact source-page groupings:
- p11: temperature-zone charts — 2 images
- p19: cargo elevator and vertical automatic conveyor — 2 images
- p20: counterbalance forklift, reach forklift, fork/pallet detail — 3 images
- p21: picking forklift, hand lift, trolley-type comparison — 3 images
- p22: hanger trolley — 1 image
- p23: picking cart, AMR, AGF, automated transport and sorter — 5 images
- p24: conveyor system and crane — 2 images
- p26: pallet materials, palletizer, vanning/container loading — 3 images
- p27: packaging/strapping and stretch wrapping — 2 images
- p28: slinging shackles and handheld terminal — 2 images
- p29: needle detector, industrial vacuum, platform scale, dimensioning/weighing system — 4 images
- p30: dry container, height comparison, container dimensions — 3 images
- p31: chassis and tractor head — 1 image
- p32: truck body and trailer types — 3 images
- p33: wing-body truck, power gate/tail-lift and truck-mounted crane — 3 images

A source-image appendix is provided so each original visual is explicitly tied to its source page. Existing image blocks in the body have been relabelled with verified source-page references and repositioned to the corresponding page anchors where available. The image appendix is the canonical page-to-source-asset reference for this update.

## Source coverage facts checked in the existing DOCX
The existing tables/paragraphs contain:
- p21 picking-forklift thresholds: 1 tonne or more; less than 1 tonne; work below 10 metres, with the source's different training terms.
- p22 five trolley types and cage-trolley safety bar.
- p23 AGV/AMR/AGF distinctions.
- p24 four conveyor types and sorter/crane descriptions.
- p25 crane qualification categories and equipment qualification summary.
- p32 truck weight classes and truck body types.
These were present in the document's tables/paragraphs; prior text-only audit notes that called them absent did not fully account for the tables and should be treated as superseded by this check.

## Verification performed
- Confirmed the updated DOCX opens with python-docx.
- Confirmed it contains the p19 and p20 additions and source-image appendix.
- Confirmed 174 inline images in the updated DOCX.
- Rendered successfully through LibreOffice to PDF: 169 pages, US Letter page size.
- The source-image map has explicit page labels and page groupings.

## Remaining QA before marking this section final
1. Perform a page-by-page bilingual proofreading of the updated pages 9–33, including Sinhala terminology, numeric values and table alignment.
2. Inspect the rendered DOCX/PDF visually for every inserted image's placement, caption and page transition.
3. Reconcile any duplicated legacy text blocks between the earlier equipment batch and the later gap-repair section before final merge.
4. Once those checks pass, replace the working Master DOCX section with this verified first-25-page content and commit the final binary artifact through the repository's supported binary-upload route.

## Change safety
This is a separate working DOCX copy. The original Master DOCX is preserved. No application UI, app code, study JSON, question bank, authentication/login, users, progress, XP, history or existing source assets were changed or deleted. The original source PDF and original asset filenames remain untouched.

## Status
**FIRST-25 UPDATE — WORKING BUILD CREATED; FINAL QA NOT YET PASSED.**
Do not mark pages 9–33 as release-ready until bilingual proofread, rendered visual QA and duplicate-block reconciliation are complete.
