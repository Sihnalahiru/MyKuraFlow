# Step 2 – Study Notes Source Coverage Audit: Printed Pages 21–28
Date: 2026-11-19
Repository: Sihnalahiru/MyKuraFlow
Branch: feature/heavy-source-audit-cbt

## Scope and method
Compared original Japanese source printed pages 21–28 with corresponding SOURCE PAGE sections in the consolidated Master DOCX. Checked extracted source text against DOCX paragraphs and table cells. A page marker or heading alone is not counted as coverage.

## Findings

### Page 21 – Picking forklift, hand lift and trolley introduction
**PARTIAL – important qualification table missing.**
Present: picking forklift purpose and moving operator platform; hand lift operation and no-qualification statement; basic trolley definition.
Missing:
- Cargo weight 1 tonne or more: completion (修了) of forklift operator skills training (運転技能講習の修了).
- Cargo weight under 1 tonne: attendance/receipt (受講) of special education (特別教育の受講).
- Work at a height under 10 metres: completion (修了) of special education (特別教育の修了).
- Definition of 修了 as completing the prescribed course/education.
Do not collapse 受講 and 修了 into one meaning.

### Page 22 – Trolley types
**MAJOR GAP – page-level content missing.**
Only the cage-trolley safety warning and sorting definition are present. Missing:
- Standard trolley: platform plus handle; handle often folds for compact storage.
- Dolly: platform only, no handle.
- Six-wheel trolley: six wheels, large platform for heavy cargo, high front/rear guards used to move it; guard prevents cargo falling.
- Cage trolley: metal mesh/grid cage, used for sorting and truck loading; three framed sides and one open side; safety bar fitted across open side during movement.
- Hanger trolley / Z-rack: transports clothes while hanging on hangers.

### Page 23 – Picking cart, AGV, AMR, AGF and conveyor introduction
**PARTIAL – automated transport definitions absent.**
Present: picking cart with optional work-instruction screen and barcode reader; conveyor's continuous one-direction movement and “conveyor/conveyer” naming.
Missing:
- AGV (無人搬送車): follows a predetermined route along guides installed on floor or ceiling.
- AMR (自律走行搬送ロボット): senses surroundings and independently determines its route; detects front/back/left/right and floor level differences.
- AGF (自動フォークリフト): forklift-shaped robot that automatically transports pallets or containers without a human operator.

### Page 24 – Conveyor types, sorter and crane introduction
**PARTIAL – conveyor type table absent.**
Present: sorter function, sorting by destination/type, high-throughput sorting and barcode-based sorting; crane general function and qualification dependency on lifting weight.
Missing four source-defined conveyor types:
- Belt conveyor: cargo is placed on a belt and carried.
- Roller conveyor: cargo rolls along multiple rollers.
- Chain conveyor: metal chain transports cargo; suitable for heavy loads and high-temperature locations.
- Screw conveyor: rotating spiral blade moves powder or small granular material through a tube.
Add a bilingual table.

### Page 25 – Crane qualifications and equipment summary
**MAJOR GAP – qualification categories and equipment summary absent.**
Present: general warning not to operate without required qualification; consult supervisor; complete prescribed training.
Missing:
- Licence (免許): required for handling particularly heavy loads.
- Completion of skills training (技能講習の修了).
- Completion of special education (特別教育の修了).
- Source equipment summary: elevator – no qualification; vertical automatic conveyor – no qualification; forklift – required; picking forklift – required; hand lift – not required; trolley types – not required; crane – required.
Restore as a bilingual table, preserving the distinctions between licence, skills-training completion and special-education completion.

### Page 26 – Pallet, palletizer/de-palletizer, vanning/devanning
**PARTIAL – paired definitions missing.**
Present: pallet definition; material-handling equipment meaning; “De-” memory aid; statement that vanning/devanning may be done by forklift or manually.
Missing:
- Palletizer: machine that automatically stacks cargo.
- Depalletizer: machine that automatically unloads/removes cargo from a pallet.
- Vanning: loading cargo into a truck or container.
- Devanning: unloading cargo from a truck or container.

### Page 27 – Packaging, strapping and stretch machines
**PARTIAL – machine-specific functions missing.**
Present: no-special-qualification statement; definitions of 包装, 梱包, ラッピング and 荷づくり.
Missing:
- Packaging/packing machine (梱包機): packs goods in boxes/bags using various bands; source caption identifies an automatic packing/banding machine.
- Strapping/bundling machine (結束機): bundles cargo using tape or cord.
- Stretch machine: wraps cargo in plastic film.
Add these English and Sinhala explanations without duplicating the terminology distinctions already present.

### Page 28 – Slinging tools and handheld terminal
**SUBSTANTIALLY COVERED; minor precision check.**
Present: slinging definition, wire rope, lifting chain, fibre rope, weight-dependent training caution, supervisor/permission warning; handheld terminal definition, barcode reading, information display, voice functions on some newer models, and inspection/picking/stocktaking uses.
Retain the source wording that depending on cargo weight, prescribed training may be required; do not imply every slinging task has the same qualification threshold.

## Consolidated correction list
1. Restore the complete three-row picking-forklift qualification table on page 21, distinguishing 受講 from 修了.
2. Add all trolley descriptions and cage-trolley safety-bar details on page 22.
3. Add AGV/AMR/AGF distinguishing definitions on page 23.
4. Add the four conveyor-type bilingual table on page 24.
5. Restore crane qualification categories and seven-item equipment qualification summary on page 25.
6. Add palletizer/de-palletizer and vanning/devanning definitions on page 26.
7. Add three machine-specific functions on page 27, retaining existing terminology explanations.
8. Retain page 28 content; refine only if direct source comparison requires it.

## Status
- Pages 21, 22, 23, 24, 25, 26 and 27: **NOT COMPLETE** at item level.
- Page 28: **SUBSTANTIALLY COVERED**, minor precision check remains.
- Step 2 overall: **IN PROGRESS**.
- This report records gaps; it does not claim the corrected DOCX has been updated.
- No app code, UI, study JSON, question bank, authentication, user data, XP, progress, history or image assets were changed.
- Step 3 visual/diagram audit has not started.
