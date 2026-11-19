# Step 2 – Study Notes Source Coverage Audit: Printed Pages 9–14
Date: 2026-11-19
Repository: Sihnalahiru/MyKuraFlow
Branch: feature/heavy-source-audit-cbt

## Scope and method
Compared the Japanese source textbook `specified_skilled_worker_textbook_202607(2).pdf` (123 physical PDF pages; printed pages 9–122 are instructional content) against the consolidated English/Sinhala master DOCX `SSW_Warehouse_English_Sinhala_MASTER_INLINE_IMAGES_BULK13.docx` and the corrected working copy used in this audit.

This is an item-level content comparison for printed pages 9–14, not a page-title or page-marker check. The source PDF text extraction was checked page by page. The Master DOCX paragraphs and tables were searched for matching concepts and explanations.

## Findings

### Printed page 9 – rack systems
Source concepts on this page include:
- Mobile racks: shelves move along the floor and can be brought together to use horizontal space efficiently.
- Nestainers / nesting racks / tenors: stackable when not in use, assembled when needed, and adaptable to cargo volume.
- Positive nest (正ネス): load-supporting grid is at the lower level; can be moved with cargo by forklift and stacked; suited to frequently changing warehouse layouts; pallet-top accessory permits further stacking.
- Reverse nest (逆ネス): load-supporting grid is at the upper level; one unit allows two-level stacking; good storage efficiency without a pallet top; bottom pallet sits directly on the floor; pallets can be inserted/removed with a hand lift; the nestainer itself cannot be moved as a unit.
- Pallet supporter: auxiliary rack component supporting pallets, preventing falls, allowing different pallet sizes, distributing load evenly and reducing rack stress; compatible with wooden and plastic pallets.

**Coverage result: NOT FOUND as a complete source-matched explanation in the audited Master DOCX.** A later note mentions using a nestainer or pallet supports when cartons cannot withstand stacking, but does not explain the source's positive/reverse nest distinction or the above operating features.

### Printed page 10 – continuation of pallet supporters and warehouse systems
Source concepts include:
- Pallet supporter benefits continued: prevent cargo falling between pallets; safely store different pallet sizes; distribute load evenly; reduce rack loading; support wooden and plastic pallets.
- Automated warehouse system: computer- and machine-controlled automatic receiving, dispatch and storage; a stacker crane moves cargo automatically; benefits include faster work and reduced manual labour.
- Security/monitoring camera: originally used to prevent theft; also checks correct work execution and identifies waste.
- Exit guidance light: helps people locate exits during disasters or power failure; follow the illuminated green EXIT sign to evacuate.
- Mouse guard: board-shaped facility preventing mice from entering.
- Insect trap / insect-killing light: installed at insect entry points to catch insects.

**Coverage result: NOT FOUND as a complete source-matched explanation in the audited Master DOCX.** These concepts are not established by the generic warehouse facilities section or by image-only placeholders.

### Printed page 11 – seismic isolation and summary table
Source concepts include:
- Seismic isolation device installed beneath the building; strong rubber supports the building, reduces shaking during earthquakes and helps prevent stored cargo falling from racks.
- Source summary table pairs named facilities with their function: floor load capacity, dust-proof coating, dock leveller, fire shutter, sprinkler, fixed rack, mobile rack and seismic isolation device.

**Coverage result: PARTIAL / NOT PROVEN.** Some terms in the summary table appear elsewhere in the notes, but the seismic isolation explanation and the complete source-specific summary pairing were not found as a coherent page-level treatment.

### Printed pages 12–14 – cargo-handling equipment
The source pages describe a freight elevator and its access/load restrictions; a vertical automatic conveyor and its prohibition on carrying people; forklift types and their differences; forklift qualification requirement; standard fork use and replaceable attachments; picking forklift and its qualification thresholds; hand lift; and the introduction to trolleys.

**Coverage result: REQUIRES FURTHER ITEM-LEVEL RECONCILIATION.** Some related terms appear in later DOCX sections/tables, but the audited master notes do not yet demonstrate all source-specific rules and distinctions together. In particular, the following source details were not found in the relevant note text during this pass:
- Freight elevator: only cargo-handling workers and the operator may ride; other people may not; never exceed maximum loading weight.
- Vertical automatic conveyor: cargo only; people must never ride; no special operator qualification; loading cargo with a forklift triggers automatic movement.
- Counterbalance forklift is operated seated and suits heavy cargo; reach forklift is operated standing and is manoeuvrable in narrow spaces.
- Counterbalance forklift normally uses two forks; fork attachments can be exchanged according to cargo shape.
- Picking forklift: source distinction between 1 tonne or more (completion of operator skills training), under 1 tonne (attendance at special education), and work at a location under 10 metres (completion of special education). The source's difference between 受講 (attend/receive) and 修了 (complete) must be retained accurately.
- Hand lift terminology and no-qualification statement appear in the DOCX, but need source-page placement and surrounding completeness verified.

## Corrective action required
1. Add the missing rack-system and warehouse-equipment explanations to the correct source-page positions in a separate corrected DOCX revision.
2. Preserve Japanese technical terms, source thresholds, and distinctions such as 受講 versus 修了.
3. Add matching Sinhala explanations for every English correction.
4. Do not treat source illustration placeholders as proof that the visual information has been translated or mapped.
5. Continue Step 2 page-by-page until all printed pages 9–122 have been reconciled at concept/table/bullet level.

## Status
- Structural page presence alone: insufficient.
- Printed pages 9–11: material omissions identified.
- Printed pages 12–14: detailed rule coverage not yet proven; targeted gaps identified.
- Step 2 overall: **IN PROGRESS**.
- Step 3 visual/diagram verification has not started.
- No app code, UI, study JSON, question bank, authentication, user data, XP, progress or history was changed by this audit.
