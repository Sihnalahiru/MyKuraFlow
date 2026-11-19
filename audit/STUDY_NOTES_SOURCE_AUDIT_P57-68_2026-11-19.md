# Study Notes Source Audit — Printed Pages 57–68
Date: 2026-11-19
Repository: Sihnalahiru/MyKuraFlow
Branch: feature/heavy-source-audit-cbt
Phase: Step 2 — Study Notes source coverage audit

## Scope
Re-opened and compared printed source pages 57–68 against the matching SOURCE PAGE sections in `SSW_Warehouse_English_Sinhala_MASTER_INLINE_IMAGES_BULK13.docx`. This is a combined audit/re-audit to consolidate the earlier p53–60 and p61–68 findings and identify duplicate material and page-marker mismatches. It is a text audit only; no image/diagram match or final bilingual rendering is certified.

No Master DOCX, app code, question bank, UI, assets, filenames, login/authentication, user data, progress, XP or history were changed.

## Page-by-page findings

### Printed p57 — Labels, JAN barcode, QR code, RFID and beginning of units
**Status: SUBSTANTIALLY COVERED; PAGE MARKER CONTENT NEEDS ORGANISING.**
The p57 material is present in the DOCX after the SOURCE PAGE 57 marker:
- shipping and receiving labels and the information they carry;
- JAN product identifier (source describes 12 digits) and GTIN relationship;
- QR as a two-dimensional barcode, with Quick Response expansion;
- RFID using radio waves and electronic tags/IC chips, non-contact reading, multiple-tag scanning and reading tags at a distance;
- care-mark vs GHS-label distinction and cross-reference to the appendices;
- metric length units and the m/cm/mm conversion table.
The page-scope note says p57 ends with the length conversion table, consistent with the source page sequence.

**Action:** Keep these items mapped to p57. In the final correction pass, check the JAN 12-digit wording against the exact source statement and keep the source wording distinguishable from any current international barcode standards.

### Printed p58 — Additional length, area, volume and capacity
**Status: PARTIAL — VOLUME/CAPACITY CONVERSION TABLE NEEDS FULL VERIFICATION.**
The DOCX p58 section contains inches/feet, Japanese sun/shaku/ken, area and tsubo, volume/capacity definitions and a volume conversion table. It also contains a care-mark/GHS table, which duplicates the material already present under p57 and is incorrectly placed under the p58 heading.

The source p58 includes the volume/capacity conversion table across m³, dm³, kL, L, dL, cL and mL. The earlier p53–60 audit already flagged that the full numerical conversion table was not proven complete. The current p58 section must be checked cell-by-cell against the source; a general explanation is not enough.

**Action:** Preserve the length/area/volume material under p58, verify every conversion value and unit symbol, and remove/reconcile the duplicated care-mark/GHS table during the correction phase without losing the correct p57 copy.

### Printed p59 — Metric prefixes, capacity units, weight, density and measurement ton
**Status: SUBSTANTIALLY COVERED; SECTION HEADING/PAGE MAPPING NEEDS CORRECTION.**
The DOCX contains metric prefixes (k, d, c, m), cc, Japanese capacity units (go/shō/to), kg/g/tonne, water-density reference, specific-gravity calculation and example, Japanese kan, pounds/ounces, and measurement ton (40 ft³ = 1.133 m³ = 1 ton). These correspond to source p59 material.
The DOCX p59 heading says “Units – length and area”, which does not describe the main content of the section.

**Action:** Correct the heading and retain the numerical examples, formulas and Japanese-only units. Verify the 0.5 m³ × 0.9 = 0.45 t example and all unit conversions.

### Printed p60 — Equipment ton, temperature, humidity, time/calendar and illuminance
**Status: PARTIAL — CONTENT PRESENT BUT SPREAD/MIS-MAPPED.**
The DOCX contains equipment-ton formula and usable-height definition/example, temperature and humidity, time units, 12-hour vs 24-hour notation, date notation, Japanese era year example and illuminance (lux). These are the source p60 topics.
However, some of the temperature/humidity/time material appears in the DOCX under SOURCE PAGE 63, and the p60 heading itself is “Units – volume and capacity”. This breaks the page-to-content mapping.

The source also states that suitable humidity for cargo storage is 40–50% and that ordinary work lighting should be at least 150 lx. Ensure these exact source values remain present and correctly paired in English/Sinhala.

**Action:** Reassociate the complete p60 material to p60. Do not delete repeated explanations until the final consolidation has identified which copy is canonical.

### Printed p61–63 — Japanese counters (助数詞)
**Status: SUBSTANTIALLY COVERED; PAGE HEADINGS AND SOME DUPLICATE RECAP CONTENT NEED RECONCILIATION.**
The DOCX includes the definition of counters, the source's “more than 500” statement, examples and the broad warehouse counter list across the p61, p62 and p63 sections:
- long items, small countable items, boxes/cases, bags, flat items, machines, furniture, robot bodies and bundles;
- pieces, sets, books/manuals, clothing, footwear, round items, grains/particles, tablets, people, cases/jobs, buildings, floors, stacked levels, companies, printed copies, documents, text lines and rows;
- circuits, flat areas, heaps, locations, times/occasions, rolls and periods.
The source list is therefore broadly represented, but the DOCX headings are inaccurate: p61 says “Units – weight, density and special tonnage”; p62 says “Equipment ton and usable height”; p63 says “Temperature, humidity, time and calendar”. Those headings do not match the counter material. Some counter recap material also appears under p64/p65, so duplicates must be reconciled rather than blindly appended.

**Action:** Keep the counter definitions and full list grouped under source p61–63 with accurate headings. Compare every source counter row and Japanese character against the English/Sinhala table; preserve readings and distinguish similar counters (e.g., 袋 reading tai vs the object name fukuro).

### Printed p64 — Beginning of basic work: inbound/receiving
**Status: SUBSTANTIALLY COVERED; DUPLICATE COUNTER RECAP UNDER THIS PAGE.**
The DOCX covers receiving/inbound work definition, preparation schedule, equipment preparation, moving existing goods to make space (はい替え), vehicle guidance, vehicle/berth heights, truck reservation/berth management system, wing truck positioning, and safe sea-container devanning (open slowly; do not force a jammed door; contact the shipping cargo handler/乙仲).
These correspond to source p64.
A separate Japanese-counter summary appears later within the p64 DOCX section even though the source p64 begins inbound work. This is misplaced and overlaps the p61–63 counter sections.

**Action:** Keep inbound preparation/vehicle guidance/container-door precautions under p64. Reconcile the counter recap to avoid duplicate content and misleading source-page attribution.

### Printed p65 — Unloading and receiving inspection
**Status: SUBSTANTIALLY COVERED; PAGE HEADING INCORRECT AND DETAILS REQUIRE FINAL CHECK.**
The DOCX contains unloading definition and process, driver's role in truck-bed unloading, equipment use, receiving inspection with the driver present, care-mark attention, comparison against delivery/receiving documents and the eight source check fields (product name, size, symbols, manufacturing LOT, colour, quantity, unit form and cargo form), barcode scanning procedure, and split-arrival (口割れ) warning.
The DOCX heading says “Common Japanese counters used in warehouses”, which is incorrect for the p65 content.

**Action:** Correct the heading to receiving inspection. Verify all eight check fields, barcode workflow and the instruction to check for split arrivals when quantities are short.

### Printed p66 — LOT, management units, variable-weight cargo and cargo-form appendix
**Status: SUBSTANTIALLY COVERED; PAGE HEADING INCORRECT.**
The DOCX contains manufacturing LOT definition and management by LOT/date, piece/ball/case/combined-case/pallet management units, fractional quantities, the not-inspecting-contents principle, and all four variable-weight recording methods:
1. actual weighing and recording (検貫);
2. recording the displayed/marked weight (切付け);
3. average weight = total lot weight ÷ number of items;
4. deemed fixed weight using a pre-agreed value.
It also indicates which methods require a weighing record.
The p66 DOCX heading says “Counters for clothing, footwear and small items”, which does not describe this content.

**Action:** Correct the p66 heading and retain all four methods and weighing-record requirements. Confirm that English/Sinhala terminology does not confuse variable-weight cargo with arbitrary/estimated weights.

### Printed p67 — Cargo forms: wooden cases, cartons, paper bags and flexible container bags
**Status: SUBSTANTIALLY COVERED; PAGE HEADING MISLEADING.**
The DOCX contains paper bags, flexible container bags (500–1,000 kg approximate capacity and lifting loops), wooden cases and corrugated cardboard cartons, including the flute structure and moisture/humidity damage warning. These correspond to the source cargo-form material.
The p67 heading says “Common cargo forms and packaging – wooden cases and cartons”, but the section also includes bag types. It is a broad but incomplete title. Some wooden-case/carton illustration descriptions are duplicated in repeated table rows; check the rendered document for accidental repeated image captions.

**Action:** Use a heading that reflects all cargo forms on p67, retain the cardboard wet/humidity warning and bag handling precautions, and reconcile duplicated image/caption rows.

### Printed p68 — Cargo forms: bales, rolls, cans and reusable containers
**Status: SUBSTANTIALLY COVERED; VISUAL MAPPING STILL REQUIRED.**
The DOCX contains bale cargo and bale-clamp requirement, bundles, rolls and roll-clamp requirement, metal/plastic cans, drum can, 18-litre/itto-can and pail can. It also includes descriptions of a foldable returnable container and reusable transport item (RTI).
The source page includes corresponding cargo-form illustrations. The text audit does not verify that the actual source illustrations are correctly mapped. Several image-caption rows in the DOCX appear repeated, so they must be checked visually in Step 3.

**Action:** Preserve the cargo-form distinctions and forklift attachment requirements; verify the source images/captions in Step 3 and remove accidental duplicate presentation only after visual comparison.

## Consolidated correction / verification list — pages 57–68
1. p57: Keep labels, JAN, QR, RFID, care-mark/GHS distinction and m/cm/mm table mapped to p57.
2. p58: Verify the full m³/dm³/kL/L/dL/cL/mL numerical conversion table; reconcile the duplicated care-mark/GHS table currently under p58.
3. p59: Correct the section heading; verify all Japanese capacity units, weight conversions, specific-gravity formula/example and measurement ton.
4. p60: Reassemble equipment ton, temperature, humidity, time/calendar and illuminance under p60; preserve 40–50% humidity and 150 lx.
5. p61–63: Correct the three counter-section headings; verify every source counter and reading; remove duplicate counter recaps from p64/p65 without losing source rows.
6. p64: Keep inbound preparation, vehicle guidance and safe container-door procedure under p64.
7. p65: Correct heading; retain the eight receiving-inspection fields, barcode procedure and split-arrival warning.
8. p66: Correct heading; retain LOT, management-unit, variable-weight methods and weighing-record table.
9. p67–68: Reconcile cargo-form headings, repeated image-caption/table rows and source illustration mapping.
10. Step 3 visual audit is still required for all source illustrations; no visual match is certified here.

## Batch conclusion
Pages 57–68 have been rechecked as a combined range. The core text topics are mostly present, but the Master DOCX has multiple inaccurate page headings, content spread across incorrect page sections, duplicated recap material and image-caption repetition. The major numerical table risk remains the p58 volume/capacity conversion matrix, already flagged in the earlier p53–60 report. **Step 2 remains IN PROGRESS.** This report is an audit/re-audit only; it does not apply corrections or certify the complete 9–122 study companion.

## Change safety
Audit report only. Existing UI, app code, study data, question bank, assets and original filenames, login/authentication, user accounts, progress, XP and history were not modified.
