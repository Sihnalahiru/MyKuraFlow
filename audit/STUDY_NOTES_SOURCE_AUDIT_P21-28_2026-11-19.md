# Step 2 – Study Notes Source Coverage Audit: Printed Pages 21–28
Date: 2026-11-19
Repository: Sihnalahiru/MyKuraFlow
Branch: feature/heavy-source-audit-cbt

## Scope and method
Compared original Japanese source printed pages 21–28 (PDF physical pages 22–29) against the Master DOCX source-page sections 21–28, checking paragraphs and tables for the actual source concepts. A heading or a general topic mention was not counted as full coverage.

## Page-by-page findings

### Printed page 21 – picking forklift and hand lift
**Partial.**
- Picking forklift purpose, order-picker synonyms and moving operator platform are explained in English and Sinhala.
- Hand lift operation and the source statement that no special operator qualification is required are explained.
- Missing from the relevant notes: the source's exact qualification thresholds for picking forklifts. The source distinguishes a forklift with a load capacity of 1 tonne or more (completion of the applicable operator skills course), under 1 tonne (attendance at special education), and work at a height below 10 metres (completion of special education). Preserve the source's distinction between 受講 (attend/receive training) and 修了 (complete training).
- The general qualification note in the DOCX does not replace these exact source thresholds.

### Printed page 22 – trolley types
**Material omissions.**
The DOCX gives a general trolley definition and the cage-trolley safety warning, but does not explain all source types and their construction/features:
- Simple platform trolley (台車): cargo platform and handle; handle often folds for compact storage.
- Dolly (ドーリー): platform only, no handle.
- Six-wheel trolley (6輪台車): six wheels, large platform, suitable for heavy cargo; high guards at front and rear used to move it; guards prevent cargo falling.
- Cage trolley (カゴ台車): metal mesh/grid cage; used for sorting and loading trucks; three sides framed and one side open for loading/unloading; safety bar fitted across open side while moving; caution because it can carry much cargo.
- Hanger trolley / Z-rack (ハンガー台車): carries clothes while still hanging on hangers.
The existing cage warning and sorting definition are useful but insufficient without the missing construction and operating details.

### Printed page 23 – picking cart, AGV, AMR, AGF and conveyor
**Partial.**
- Picking cart: purpose, screen for work instructions and barcode reader are covered.
- Conveyor general purpose and steady-speed benefit are covered.
- AGV, AMR and AGF are named under a heading, but their defining distinctions are not explained in the audited page-23 notes:
  - AGV follows a predetermined route using guides installed on the floor or ceiling.
  - AMR senses its surroundings (including front/back/left/right and floor level differences) and independently determines its route to the destination.
  - AGF is a forklift-shaped robot that automatically transports pallets or containers without a person operating it.
- These are not interchangeable; notes need separate definitions in English and Sinhala.

### Printed page 24 – conveyor types, sorter and crane
**Partial.**
- Sorter purpose and its destination/type sorting, high-speed sorting and barcode-label reading are covered.
- Crane purpose and the general requirement for a qualification based on lifting capacity are covered.
- Missing: complete four-type conveyor explanation:
  1. Belt conveyor – cargo is placed on a belt and carried.
  2. Roller conveyor – cargo rolls forward over multiple rollers.
  3. Chain conveyor – uses a metal chain; suitable for heavy cargo and high-temperature locations.
  4. Screw conveyor – rotating spiral blade moves powder or small granular materials through a tube.
- The four-type table is not present in the page-24 notes as a complete English/Sinhala table.

### Printed page 25 – crane qualification categories and equipment summary
**Partial / key detail omitted.**
- General safety warning and consult-supervisor instruction are present.
- Missing: the source table's distinctions:
  - Licence (免許): required for handling particularly heavy loads.
  - Completion of skills training (技能講習の修了): prescribed course completed.
  - Completion of special education (特別教育の修了): prescribed education completed.
- Missing as a source-matched bilingual summary: qualification required/not required for elevator, vertical automatic conveyor, forklift, picking forklift, hand lift, trolley types and crane.
- The table must be reproduced with the same equipment categories and yes/no requirements, with no unsupported legal expansion.

### Printed page 26 – pallet, palletizer/de-palletizer and vanning/devanning
**Partial.**
- Pallet definition and palletizer/de-palletizer purpose are covered.
- Material-handling equipment and the “De-” memory aid are covered.
- The source table explicitly defines Vanning as loading cargo into a truck or container, and Devanning as unloading cargo from a truck or container. The audited notes only state that these tasks may be done by forklift or manually; the two definitions are missing from the page-26 section.
- Add both definitions in English and Sinhala and retain the forklift/manual method note.

### Printed page 27 – packaging, strapping and stretch machines
**Covered in substance.**
- Machine functions, no-special-qualification rule, and distinctions between 包装, 梱包, ラッピング and 荷づくり are present in English and Sinhala.
- Minor terminology review: use consistent English labels (“packaging”, “packing”, “stretch wrapping”) and do not collapse the three Japanese terms into one Sinhala meaning.

### Printed page 28 – slinging gear and handheld terminal
**Mostly covered.**
- Slinging definition, wire rope, chain and fibre rope examples, training caution and prohibition on unauthorized work are covered.
- Handheld terminal functions (barcode reading, screen display, voice features in some newer models) and use cases (inspection, picking, stocktaking) are covered.
- Ensure the source qualification wording remains conditional on cargo weight; do not invent a universal threshold absent from this page.

## Required corrections for this batch
1. Add exact picking-forklift qualification thresholds to page 21 and preserve 受講 vs 修了.
2. Complete the five trolley-type descriptions on page 22, especially the cage trolley safety bar and six-wheel trolley guards.
3. Add separate English/Sinhala definitions for AGV, AMR and AGF on page 23.
4. Add the four conveyor-type explanations as a bilingual table on page 24.
5. Restore the three crane qualification categories and the seven-equipment qualification summary on page 25.
6. Add explicit Vanning and Devanning definitions on page 26.
7. Retain the already-covered material on pages 27–28; only apply terminology consistency edits if needed.
8. Correct the separate Master DOCX revision only after the full batch review; preserve all existing images, tables, styles and source filenames. Do not overwrite the original.

## Status
- Printed pages 21–28: several significant omissions remain; pages 27–28 are substantially covered.
- Step 2 overall: **IN PROGRESS**.
- Step 3 visual/diagram verification has not started.
- No app code, UI, study JSON, question bank, authentication, user data, XP, progress or history changed.
