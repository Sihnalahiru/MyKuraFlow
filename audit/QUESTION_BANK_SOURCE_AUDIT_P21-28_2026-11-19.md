# Question Bank Source Audit — Printed Pages 21–28
Date: 2026-11-19
Branch: feature/heavy-source-audit-cbt
Primary source: specified_skilled_worker_textbook_202607(2).pdf (123 physical pages)
Scope: Printed pages 21–28; existing question IDs MKF-WR-0050–0069 and MKF-WR-0528–0534.

## Audit result
Source pages were extracted directly from the supplied Japanese PDF and compared with the existing bank. This is a coverage/quality audit only. Existing questions remain DRAFT. No question-bank record, study JSON, application code, UI, user data, image asset, authentication, progress, XP, or history was changed.

## Existing question review
The reviewed items generally point to the correct printed pages and have English/Sinhala explanations. Their presence does not prove complete page coverage. The following refinements are needed before language approval:

| ID | Page | Finding | Required action |
|---|---:|---|---|
| MKF-WR-0052 | 21 | English wording says "completion of the operator skills course", which is supported for loads of 1 tonne or more. | Preserve the exact threshold: 1 tonne or more. Distinguish 修了 (course completion) from merely attending. |
| MKF-WR-0528 | 21 | Under-1-tonne requirement is 特別教育の受講 (receive/attend special education); current English says "completion". | Correct English/Sinhala to match the source's distinction: under 1 tonne requires attendance/receipt of special education; 1 tonne or more requires completion of the operator skills course. |
| MKF-WR-0529 | 21 | The source row says work at a place below 10 metres requires 特別教育の修了. | Keep the exact "below 10 metres" condition and "completion" wording; ensure it is not confused with the cargo-weight threshold. |
| MKF-WR-0054 | 22 | Correct false statement about dolly having a handle. | Ensure the explanation also distinguishes a dolly (platform only) from the simplest trolley (platform plus handle). |
| MKF-WR-0053 | 22 | Safety-bar rule is correctly represented. | Expand explanation to state the cage trolley has three framed sides and one open loading face; secure the safety bar across the open face during movement. |
| MKF-WR-0055–0056 | 23 | AGV fixed-guide movement and AMR autonomous route selection are represented. | Add AMR sensing details: front/back/left/right and floor level differences/steps. |
| MKF-WR-0058 | 24 | English describes the screw conveyor's rotating helical blade; Japanese stem only says it conveys powder/fine particles in a tube. | Align Japanese stem to include the rotating screw-shaped blade mechanism. |
| MKF-WR-0060–0061, 0533 | 25 | Crane qualification rule is represented more than once. | Deduplicate concept coverage; include the three source credential categories (licence, skills-course completion, special-education completion) and the instruction not to operate without qualification. Do not add a superficial rewording of the same weight-dependent rule. |
| MKF-WR-0063, 0065 | 26 | False statements correctly reverse depalletizing/devanning. | Confirm explanations explicitly state depalletizer unloads goods and devanning unloads cargo from a truck/container. |
| MKF-WR-0067 | 27 | Load preparation sequence is represented. | Explanation should preserve the source distinction between 包装 (wrapping/packaging), 梱包 (packing into boxes/units), and ラッピング (unitizing/stretch wrapping to prevent load collapse). |
| MKF-WR-0068 | 28 | General slinging definition is represented. | Add the source's explicit safety restriction: some cargo weights require training; workers must confirm with a supervisor/person in charge and must not perform slinging without permission. |
| MKF-WR-0069 | 28 | Handy terminal barcode and screen functions are represented. | Add source examples: inspection (検品), picking (ピッキング), and stocktaking (棚卸し); some newer models support voice operation/dialogue. |

## Source-grounded coverage gaps to add (after whole-bank duplicate check)

### Printed page 21 — picking forklift and hand lift
- Picking forklift is also called picking lift / order picker.
- It is used to put away and retrieve cargo on high racks; the operator platform moves vertically and the worker manually handles cargo from the raised platform.
- Qualification table has three distinct conditions: 1 tonne or more → completion of operator skills course; less than 1 tonne → attendance/receipt of special education; work at a place below 10 metres → completion of special education.
- Hand lift is also called hand pallet lift / hand pallet truck; its forks lift cargo on a pallet and the operator moves it by human power; no operating qualification is required.

### Printed page 22 — trolley types
- Simplest trolley consists of a cargo platform and a handle; many handles fold for compact storage.
- Dolly has no handle and consists only of the cargo platform.
- Six-wheel trolley has six wheels, a large platform for heavy goods, and high guards at front and rear; the guards help move it and prevent cargo falling.
- Cage trolley is a metal mesh/grid cage with three framed sides and one open side for loading/unloading; use its safety bar across the open side while moving; it is used for sorting and truck loading and requires careful safe handling.
- Hanger trolley transports garments while still hanging and may be called a Z-rack.
- Picking cart is used to collect products; some have an instruction display and barcode reader.

### Printed page 23 — automated transport equipment and conveyor introduction
- AGV follows a predetermined route along a guide installed on the floor or ceiling.
- AMR senses its surroundings, reasons about its own route, and can detect front/back/left/right and floor level differences.
- AGF is an automated forklift-shaped robot that transports pallets/containers without a human operator.
- Conveyors continuously move cargo in one direction at a steady speed, increasing work speed; conveyor and conveyor belt terminology should not be confused.

### Printed page 24 — conveyor types and sorter
- Belt conveyor carries cargo on a belt.
- Roller conveyor moves cargo over rotating rollers.
- Chain conveyor uses a metal chain and can carry heavy cargo or operate in high-temperature locations.
- Screw conveyor rotates a helical blade inside a tube to move powder and fine particles.
- Sorter automatically separates cargo by destination or type; some systems read barcode labels and rapidly sort successive items.

### Printed page 25 — crane safety and credentials
- Crane/mobile crane lifts and moves very heavy goods.
- Crane operation always requires an appropriate qualification; the required credential varies with the weight being lifted.
- Source credential categories: licence (免許), completion of skills training (技能講習の修了), and completion of special education (特別教育の修了).
- Unqualified people must not operate cranes; ask a supervisor or person in charge if unsure.
- Avoid duplicating the already represented general rule in IDs 0060/0061/0533; target distinct details only.

### Printed page 26 — pallet and palletizing systems
- A pallet is a flat board/platform on which cargo is placed.
- Palletizer automatically stacks cargo; depalletizer automatically unloads cargo.
- Material-handling equipment (マテハン機器) means machinery used to move or handle cargo.
- Vanning loads cargo into a truck/container; devanning unloads cargo from a truck/container; work may be done by forklift or manually.

### Printed page 27 — packing, strapping and wrapping
- Packing machine bundles/ packs cargo in boxes or bags using bands.
- Strapping/banding machine bundles cargo with tape or cord.
- Stretch machine wraps cargo with plastic film.
- No special qualification is required to use these three machines, according to the source.
- Packaging wraps a product in paper/bag; packing groups goods into a box/cargo unit; wrapping uses stretch film to unitize palletized boxes and prevent load collapse.
- 荷づくり means the complete sequence of packaging, packing and wrapping.

### Printed page 28 — slinging and handy terminal
- Slinging (玉掛け) is suspending heavy cargo using a crane or similar equipment.
- Source examples of slinging gear: wire rope (metal rope), lifting chain (metal chain), and fibre rope (soft rope).
- Depending on cargo weight, training may be required; confirm with a supervisor/person in charge. Never perform the work without permission.
- Handy terminal is a small handheld computer; reads barcodes and displays information.
- Use examples: inspection/checking cargo (検品), picking/collecting required cargo (ピッキング), and stocktaking/counting inventory (棚卸し).
- Some newer models have voice operation and dialogue functions.

## Coverage decision
- Existing questions cover some central concepts but not the full source details on pages 21–28.
- Add only non-duplicative, source-grounded questions for the gaps above after checking the complete bank.
- Correct the 特別教育 attendance/completion distinction and other language details before language approval.
- Keep every reviewed item DRAFT until source and language checks are completed.
- Do not claim these pages are fully audited simply because a question exists for each page.

## Protected project invariants
- Keep legacy Quick Quiz separate and unchanged.
- Keep all study JSON and source assets unchanged.
- Do not change UI, login/authentication, user records, progress, study XP, or history.
- Keep SSW CBT bank separate and versioned.
