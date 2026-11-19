# Study Notes Source Audit — Printed Pages 9–20
Date: 2026-11-19
Repository: Sihnalahiru/MyKuraFlow
Branch: feature/heavy-source-audit-cbt
Phase: Step 2 — Study Notes source coverage audit

## Scope and pagination
Compared printed source pages 9–20 of the original Japanese PDF with the opening Batch 01, Batch 02 and gap-repair content in the Master DOCX. The PDF includes front matter, so printed pages 9–14 correspond to PDF physical pages 15–20, while printed pages 15–20 correspond to PDF physical pages 21–26. This distinction matters when extracting and mapping the source.

This report records text coverage findings only. It does not establish visual/image mapping or certify the English/Sinhala translation. No DOCX, app code, question bank, UI, assets, filenames, login/authentication, user data, progress, XP or history were changed.

## Page-by-page findings

### Printed p9 — Warehouse definition and warehouse categories
**Status: SUBSTANTIALLY COVERED.**
The DOCX explains storage as both keeping goods in a place and managing them so they are not damaged or lost; it also emphasizes protecting goods' value. It covers private-use and commercial warehouses, the registration requirement under the Japanese Minister of Land, Infrastructure, Transport and Tourism, the rules for business scope/charges/buildings and equipment, and the three-step application-registration-start process.

**Review note:** The Sinhala rendering of the ministerial title is explanatory rather than a strict official title. Retain the Japanese technical term for exam recognition and ensure the responsible minister/authority is not simplified into a generic local ministry.

### Printed p10 — Commercial warehouse classes and special warehouse types
**Status: SUBSTANTIALLY COVERED.**
The DOCX includes Class 1, Class 2 and Class 3 warehouses and the relevant fire, moisture and outside-air/temperature protection distinctions. It also covers open-yard storage, silo/tank storage, dangerous-goods warehouses, refrigerated warehouses, water-surface warehouses, trunk rooms (including the two legal service forms), and specially designated warehouses for disaster supplies.

**Review note:** The source's wording for refrigerated warehouse is +10°C or below. The DOCX preserves this threshold. Ensure the distinction between the two trunk-room service types remains clear in the final layout.

### Printed p11 — Temperature classification table
**Status: COVERED IN A TABLE; BILINGUAL REVIEW REQUIRED.**
The DOCX contains a structured temperature table with ambient/dr y, constant-temperature, C3/C2/C1, F1/F2/F3 and SF1/SF2/SF3/SF4 bands and example uses. It also explains the boundary convention that “above X°C and up to Y°C” excludes X and includes Y.

**Review note:** Verify the table's English and Sinhala row alignment and numeric values in the rendered DOCX. The source has several close negative-temperature boundaries, so a shifted row or sign error would materially change the study meaning.

### Printed p12 — Floor, wall and building-related facilities
**Status: PARTIALLY COVERED / STRUCTURAL DETAIL CHECK REQUIRED.**
The DOCX covers floor load capacity, dust-proof coating, platform/berth, dock leveller, wall-protection boards, shutters and dock shelter in its opening facilities section. However, the source page sequence continues with building/structural topics and a mezzanine (中二階) explanation. The source also includes a fire-equipment section marked as especially important, with four distinct items:
- fire extinguisher — first response for a small fire;
- fire hydrant — hose and water supply for extinguishing;
- sprinkler — ceiling-mounted automatic water discharge activated by heat/smoke sensing; source notes legal installation for large/automated warehouses;
- fire alarm equipment — detects heat/smoke and sounds an emergency bell; evacuate immediately when it rings.

The Master DOCX opening content should be checked for all four fire-equipment items and the mezzanine definition; the extracted opening section and visible paragraphs do not establish complete bilingual coverage of those details.

**Required action:** Confirm that mezzanine, fire extinguisher, hydrant, sprinkler activation/legal-installation note, and fire-alarm evacuation response each have paired English and Sinhala explanations. Add any missing details.

### Printed p13 — Storage equipment and related terminology
**Status: PARTIALLY COVERED / DETAIL CHECK REQUIRED.**
The source covers fixed racks and mobile racks; nestainers (正ネス and 逆ネス) and pallet supporters; automatic warehouse systems and stacker cranes; surveillance cameras; emergency exit/guide lights; rodent barriers; insect traps; and seismic-isolation equipment. The source gives operational distinctions and benefits, not merely names.

The DOCX has related equipment terminology and a summary, but a final check is needed to confirm that it preserves the important distinctions:
- fixed rack vs mobile rack;
- positive nestainer vs reverse nestainer, including whether a unit can be moved and how pallets are handled;
- pallet supporter purpose (supporting pallets, preventing falls, distributing load);
- automated warehouse role of computer/mechanical control and stacker crane;
- security camera uses beyond theft prevention (checking work and waste);
- green EXIT guide light and evacuation purpose;
- rodent barrier vs insect trap;
- seismic isolation reducing building vibration and preventing stored goods falling.

**Required action:** Confirm each distinction and its Sinhala explanation in the opening facilities section; do not treat a glossary-only label as full coverage.

### Printed p14 — Cargo transport equipment and qualification basics
**Status: SUBSTANTIALLY COVERED, WITH A SPECIFIC QUALIFICATION DETAIL TO VERIFY.**
The DOCX covers cargo elevators and maximum load weight, vertical automatic conveyors and the prohibition on riding them, counterbalance and reach forklifts, forklift qualification in general, hand lifts, and trolley/cart types. It also contains conveyor, sorter, crane, palletizer/de-palletizer and vanning/devanning explanations in the following printed p15–20 batch.

**Specific source detail to verify:** The source's picking-forklift qualification table distinguishes:
- cargo weight of 1 tonne or more: completion of forklift operator skills training;
- cargo weight under 1 tonne: special education;
- work at a height under 10 metres: special education completion.
The DOCX's general equipment qualification summary (“picking forklift — Yes”) is not a substitute for this three-row threshold table. Confirm that the exact weight and height conditions are present in the detailed p15 picking-forklift section and are translated accurately.

### Printed p15–20 — Equipment and transport terminology
**Status: SUBSTANTIALLY COVERED; DETAIL AND VISUAL CHECKS REMAIN.**
The gap-repair and Batch 02 sections cover picking forklifts, hand lifts, simple trolleys, dollies, six-wheel trolleys, cage trolleys, hanger trolleys, picking carts, AGV, AMR, AGF, conveyor types, sorters, cranes and crane qualification categories, pallets, palletizers/de-palletizers, and vanning/devanning.

**Required detail checks:**
- retain the distinction between AGV (follows a predetermined guide route), AMR (senses surroundings and determines its own route), and AGF (automated forklift-shaped transporter);
- include the cage trolley safety bar requirement before movement;
- preserve the four conveyor types and their mechanisms;
- retain the crane rule that only appropriately qualified people may operate it;
- verify the complete picking-forklift weight/height qualification table described above;
- check the source illustrations and equipment photos against the correct page/subject in Step 3.

## Consolidated correction / verification list for pages 9–20
1. Verify and, if missing, add the complete four-item fire-equipment explanations and emergency evacuation instruction on printed p12.
2. Verify mezzanine definition and the complete storage-equipment distinctions on printed p12–13.
3. Confirm the detailed picking-forklift 1-tonne and 10-metre qualification thresholds on printed p15; the generic “qualification required” summary alone is insufficient.
4. Render-check the printed p11 temperature table, especially negative signs, range boundaries, row alignment and paired Sinhala meanings.
5. Verify all image/diagram mappings later in Step 3; this text audit does not certify them.

## Batch conclusion
Printed pages 9–20 have now received an item-level text comparison. Pages 9–11 are substantially covered; pages 12–13 need explicit detail verification; page 14 and pages 15–20 are substantially covered subject to the picking-forklift threshold check. **Step 2 remains IN PROGRESS overall** because the full 9–122 audit findings still need consolidation and corrections, bilingual proofreading, and confirmation against the final rendered DOCX. No corrections were applied to the Master DOCX in this batch.

## Change safety
Audit report only. Existing UI, app code, study data, question bank, assets and original filenames, login/authentication, user accounts, progress, XP and history were not modified.
