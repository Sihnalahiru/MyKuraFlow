# Study Notes Source Audit — Printed Pages 21–32
Date: 2026-11-19
Repository: Sihnalahiru/MyKuraFlow
Branch: feature/heavy-source-audit-cbt
Phase: Step 2 — Study Notes source coverage audit

## Scope and method
Compared printed source pages 21–32 in the original Japanese PDF with the corresponding SOURCE PAGE 21–32 sections in the Master DOCX. Source PDF physical pages 21–32 contain the printed pages 21–32. Checked source paragraphs/tables and the DOCX page-marker sections. This is a text-content audit; it does not certify visual/image matches or final bilingual rendering.

No DOCX, app code, question bank, UI, assets, filenames, login/authentication, user data, progress, XP or history were changed.

## Page-by-page findings

### Printed p21 — Picking forklift and hand lift
**Status: PARTIAL — critical qualification thresholds missing.**
The DOCX describes the picking forklift/order picker and moving operator platform, and defines 修了 (completion). It describes hand lift operation and correctly states that no special operator qualification is required.

The source's three-row picking-forklift qualification table is not reproduced:
- Cargo weight 1 tonne or more: completion of the forklift operator skills training course (運転技能講習の修了).
- Cargo weight under 1 tonne: attendance at special education (特別教育の受講).
- Work at a height under 10 metres: completion of special education (特別教育の修了).

The DOCX's general statement that a picking forklift requires qualification is insufficient because it omits the weight/height conditions and the distinction between course completion and attendance.

**Required correction:** Add the full three-row table, retaining the exact thresholds and the different Japanese qualification terms. Verify the Sinhala rendering distinguishes “attend” from “complete”.

### Printed p22 — Trolley types and cage-trolley safety
**Status: PARTIAL — most type-specific details missing.**
The DOCX's p22 section contains only a short caution that cage trolleys can carry a large amount of cargo and a definition of sorting. It does not establish coverage of the source's detailed types:
- Basic trolley: platform plus handle; many models have a foldable handle for compact storage.
- Dolly: platform only, without a handle.
- Six-wheel trolley: six wheels, large platform, can carry heavy items, front/rear high guard rails used to move it; rails help prevent cargo falling.
- Cage trolley: metal mesh/grid cage, three framed sides and one open loading side; fit the safety bar across the open side during movement; used for sorting and truck loading; special care due to large capacity.
- Hanger trolley / Z-rack: carries clothes while they remain hanging on hangers.

The DOCX has no dedicated SOURCE PAGE 22 description for these individual types beyond the general cage-trolley warning.

**Required correction:** Add the complete five-type comparison and the safety-bar instruction. Preserve the source distinction between trolley, dolly and six-wheel trolley.

### Printed p23 — Picking cart, AGV, AMR, AGF and conveyor
**Status: PARTIAL — automated transport distinctions missing.**
Picking cart is covered, including order picking, display screen and barcode reader. Conveyor's basic definition and steady continuous movement are covered.

The DOCX has a heading for automated guided/autonomous transport equipment but does not give the source-specific descriptions of:
- AGV: follows a fixed route guided by floor/ceiling guides.
- AMR: senses its surroundings, independently chooses its route and can detect front/back/left/right and floor level differences.
- AGF: automated forklift-shaped robot that transports pallets/containers without a human operator.

**Required correction:** Add the three distinct operating principles and avoid treating AGV, AMR and AGF as interchangeable synonyms.

### Printed p24 — Conveyor types, sorter and crane
**Status: PARTIAL — conveyor type table missing from the page section.**
The DOCX covers sorter functions, including destination/type sorting, rapid cargo processing and barcode-based sorting. It explains that cranes lift and move heavy cargo and that operator qualifications are mandatory.

The source's four conveyor mechanisms are not present in the corresponding p24 section:
- Belt conveyor: cargo travels on a belt.
- Roller conveyor: cargo rolls over multiple rollers.
- Chain conveyor: uses a metal chain; suitable for heavy cargo and high-temperature environments.
- Screw conveyor: rotating spiral blade moves powder or small granular materials through a tube.

**Required correction:** Add the complete four-row table with the mechanism and the source's specific chain/screw conveyor use cases.

### Printed p25 — Crane qualifications and equipment qualification summary
**Status: SUBSTANTIALLY COVERED; qualification categories need precise explanation.**
The DOCX states that cranes require qualification, that the required qualification depends on lifting capacity, and that unqualified workers must not operate cranes. It contains the three categories: licence (免許), skills-training completion (技能講習の修了) and special-education completion (特別教育の修了), but the final descriptions should be checked against the source wording and must not imply the categories are interchangeable.

The equipment summary is present, including whether an operator qualification is required for elevators, vertical automatic conveyors, forklifts, picking forklifts, hand lifts, trolleys and cranes.

**Required correction/check:** Preserve the distinction between licence, completion of skills training and completion of special education; retain the instruction to consult a supervisor/person in charge if unsure. Do not invent lifting-weight thresholds that are not printed in this source table.

### Printed p26 — Pallets, palletizer/de-palletizer and vanning/devanning
**Status: COVERED / SUBSTANTIALLY COVERED.**
The DOCX defines a pallet as a flat platform, distinguishes palletizer (automatic stacking) from depalletizer (automatic unloading), defines material-handling equipment, and explains vanning (loading into a truck/container) and devanning (unloading from it). It also states that the work may be done with a forklift or manually.

**Review note:** Confirm the final layout preserves the two opposite palletizer/de-palletizer functions and the loading/unloading direction.

### Printed p27 — Packaging, strapping and stretch machines
**Status: COVERED.**
The DOCX covers the three machines and states that special qualification is not required. It distinguishes 包装 (wrapping an item in paper/bag), 梱包 (making a consolidated box/cargo unit), and ラッピング (securing palletized boxes with stretch film to prevent load collapse), and defines 荷づくり as the sequence of these operations.

### Printed p28 — Slinging tools and handheld terminal
**Status: COVERED / SUBSTANTIALLY COVERED.**
The DOCX defines slinging, includes wire rope, lifting chain and fibre rope, states that training may be required depending on cargo weight, directs workers to confirm with a supervisor and prohibits unauthorized work. It covers handheld terminal barcode reading, screen display, voice functions in some newer models, inspection, picking and stocktaking.

### Printed p29 — Needle detector, industrial vacuum cleaner and weighing equipment
**Status: COVERED / SUBSTANTIALLY COVERED.**
The DOCX covers the needle detector's purpose and serious injury risk, warehouse cleaning and safety, platform scale and cargo weighing terminology, and automatic measurement of both dimensions and weight.

### Printed p30 — Sea and reefer containers
**Status: COVERED.**
The DOCX includes the source's more-than-90% dry-container statement, steel construction, width/height/length dimensions and metric conversions, and reefer container refrigeration unit powered by external electricity.

### Printed p31 — Road transport of sea containers and railway containers
**Status: COVERED.**
The DOCX explains chassis and truck head, bringing the container to the warehouse platform while on the chassis, opening rear doors and devanning. It includes railway container purpose and the 12-foot/5-ton, 20-foot and 31-foot container sizes.

### Printed p32 — Truck classification and body types
**Status: PARTIAL — weight class table and wing-body details need confirmation.**
The DOCX contains descriptions of flatbed, trailer/semi-trailer and van-body trucks, including the rear power gate note. The source also gives the cargo-weight classification:
- Large truck: about 10 tonnes.
- Ordinary/medium truck: about 4 tonnes.
- Small truck: about 2 tonnes.

The source continues with the wing-body truck, whose side panels and roof open like wings. The corresponding DOCX page section does not establish that the full weight table and wing-body description are present.

**Required correction:** Add the three weight classes with approximate capacities and the wing-body truck description. Preserve the distinction between a flatbed's open top, a van body's enclosed cargo compartment, a trailer's separate tractor/platform and a wing body's side/roof opening.

## Consolidated correction list — pages 21–32
1. p21: Add the exact three-row picking-forklift qualification threshold table (1 tonne or more; under 1 tonne; under 10 metres) and preserve the Japanese course/education terms.
2. p22: Add all five trolley types and their defining features; include cage trolley safety bar before movement.
3. p23: Add separate AGV, AMR and AGF definitions and operating principles.
4. p24: Add all four conveyor types and their mechanisms/use cases.
5. p25: Verify accurate distinctions between licence, skills-training completion and special-education completion.
6. p32: Add the 10-tonne/4-tonne/2-tonne truck classification and wing-body truck description.
7. Re-render the temperature/qualification tables and verify English/Sinhala row alignment and numbers where they occur in adjacent pages.
8. Complete Step 3 visual verification for equipment diagrams and photographs; this audit does not certify image mapping.

## Batch conclusion
Printed pages 21–32 have been compared. The most material omissions are the p21 picking-forklift qualification thresholds, p22 trolley type details, p23 AGV/AMR/AGF distinctions, p24 conveyor types, and p32 truck weight classes/wing-body truck. Pages 26–31 are substantially covered. **Step 2 remains IN PROGRESS**: this report records findings only; corrections, full bilingual proofreading, earlier-page consolidation and final rendered-document verification remain outstanding.

## Change safety
Audit report only. Existing UI, app code, study data, question bank, assets and original filenames, login/authentication, user accounts, progress, XP and history were not modified.
