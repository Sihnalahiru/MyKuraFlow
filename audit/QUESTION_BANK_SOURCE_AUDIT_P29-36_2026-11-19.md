# Question Bank Source Audit — Printed Pages 29–36
Date: 2026-11-19
Branch: feature/heavy-source-audit-cbt
Primary source: specified_skilled_worker_textbook_202607(2).pdf (123 physical pages)
Scope: Printed pages 29–36; existing question IDs MKF-WR-0070–0087 and MKF-WR-0509–0522.

## Audit result
The Japanese source pages were read from the original PDF and the available page renders were visually inspected. The image service did not return page images for printed pages 34–35 in this read, so those two pages were checked using extracted source text only; their visual/layout verification remains pending. All existing questions remain DRAFT. No bank, study data, application code, UI, user data, image asset, authentication, progress, XP, or history was changed.

## Important data-quality defect
The questions MKF-WR-0070 through MKF-WR-0087 have no `questionText.en` field. This means the English question stem is absent for 18 existing questions in this page range. Their explanations may contain English, but an explanation is not a substitute for an English question stem. Add accurate English stems after source/language review; do not infer them automatically from the Japanese text without checking.

## Existing question review and duplication risks

| IDs | Page(s) | Finding | Required action |
|---|---:|---|---|
| 0070–0073 | 29 | Four core equipment questions cover needle detector, vacuum cleaner, platform scale, and dimension/weight machine. | Add the English stems. Expand needle-detector explanation to the source's consumer-injury reason; dimension/weight explanation should retain the distinction between 採寸 and 計量. |
| 0074–0075, 0510–0511 | 30 | Reefer concept appears twice; 0510 adds external power, and 0511 adds high-cube height. | Keep only non-duplicative concepts. Add English stems for 0074–0075. Preserve source dimensions and distinguish standard, high-cube, and reefer containers. |
| 0076–0077, 0512–0513, 0518 | 31, 34 | Chassis, head, devanning, and pallet/container terms are partly repeated. | Avoid duplicate chassis/pallet definitions. Add English stems for 0076–0077. Include the source sequence for chassis delivery and warehouse devanning. |
| 0078–0082, 0514–0516 | 32–33 | Truck payload/type and wing-body concepts overlap. | Avoid superficial rewording. Add English stems for 0078–0082. Preserve exact payload bands and vehicle distinctions. |
| 0083, 0517 | 33 | Power-gate special-education requirement is repeated in positive/negative form. | Keep distinct safety knowledge only if the full bank does not already test it; explain that a driver being present does not replace required training. Add English stem for 0083. |
| 0084–0085, 0520 | 35 | Warehouse deposit terms and depositor are covered, with the notification obligation separately represented. | Add English stems for 0084–0085. Check legal wording and distinguish depositor (寄託者) from warehouse operator (倉庫業者). |
| 0086, 0521 | 36 | Receiving external inspection is repeated in positive/negative forms. | Keep one core test and use remaining coverage for the original cargo condition and storage method. Add English stem for 0086. |
| 0087, 0522 | 36 | Storage period from inbound date is repeated. | Keep one clear question; add missing storage, outbound-document, and refusal conditions instead. Add English stem for 0087. |

## Source-grounded coverage gaps to address

### Printed page 29 — inspection and measuring equipment
- Needle detector checks products for metal such as needles that may accidentally remain inside; the reason is to prevent serious injury to customers.
- Industrial vacuum cleaner is used to clean the warehouse.
- Platform scale weighs cargo placed on the platform.
- Dimensioning/weighing system automatically measures cargo dimensions and weight; 採寸 means measuring size, 計量 means measuring weight.

### Printed page 30 — maritime containers
- Maritime containers are used for international cargo transport by container ship; the source notes that a large share of world trade uses this method.
- Standard external dimensions shown in the source table: 20 ft length about 6.1 m; 40 ft length about 12.2 m; standard height about 2.6 m; high-cube height about 2.9 m; width about 2.4 m. Confirm units and table mapping before question approval.
- Reefer containers have an internal refrigeration unit for chilled/frozen cargo and require an external power supply to operate the refrigeration unit.
- Existing 0511 covers high-cube height; do not create another reworded question for the same fact.

### Printed page 31 — land transport and devanning
- For inland transport, the container is placed on the chassis and the head/tractor tows the chassis.
- The source sequence for warehouse devanning: bring the container on its chassis to the warehouse platform; open the container rear doors; unload cargo. The process is called devanning.
- The railway container described is a domestic Japanese container; the source gives a 12-foot, 5-ton type and compares dimensions with a 20-foot container. Verify exact figures from the rendered page before adding numeric questions.
- Avoid re-asking the basic definition of devanning already present in 0077/0512; focus on the sequence and equipment relationship.

### Printed page 32 — truck load capacity and body types
- Truck classes by maximum load are shown: large 10-ton class, medium 4-ton class, and small 2-ton class. Verify exact Japanese labels and approximate payload wording before approval.
- Flatbed truck (平ボディ車): cargo bed has no roof; side boards (あおり) are fitted along the sides; suitable for bulky cargo.
- Full trailer and semi-trailer differ in how the trailer load is supported/connected; the head and cargo body are separate. Use the source diagram for visual verification.
- Van-body truck has a box-shaped cargo area and rear doors; some have side doors. Existing questions do not yet cover the side-door detail.

### Printed page 33 — wing-body truck and tailgate lifter
- Wing-body truck opens its sides and roof like wings; it enables side loading/unloading and makes forklift pallet handling easier.
- Unic/crane truck (ユニック車) is a truck fitted with a crane; it can lift and load heavy cargo. Add this if not already tested elsewhere.
- Power gate / tailgate lifter is mounted at the rear and raises/lowers cargo between ground and truck bed.
- The source explicitly warns that special education is required for tailgate-lifter work and untrained people must not operate it. Driver presence does not substitute for training.
- Retain exact terminology: パワーゲート / テールゲートリフター / テールリフト are names used for this equipment.

### Printed page 34 — terminology and vehicle/equipment vocabulary
- Page image was unavailable in this extraction; use extracted text and obtain a fresh rendered page before visually approving any diagram/table-based question.
- Cross-check glossary terms against the actual page before adding them; do not create questions from assumed or inferred vocabulary.
- Existing 0518/0519 cover chassis and pallet definitions, but their source anchor points to p34-terms. Verify that these definitions are actually on this page and avoid duplicates with p31.

### Printed page 35 — warehouse deposit terms and contract formation
- Warehouse operator must notify the Minister of Land, Infrastructure, Transport and Tourism of its warehouse deposit terms (倉庫寄託約款).
- The terms explain conditions and responsibilities when the warehouse accepts entrusted cargo.
- The source distinguishes cargo that cannot be accepted (受け入れできない貨物) from cargo whose acceptance may be refused under the described terms; preserve the source's exact distinction.
- Contract formation is described through the warehouse receiving cargo and issuing a receipt (寄託契約の成立); distinguish the depositor (寄託者) from the warehouse company/operator.
- Page image was unavailable in this extraction; re-render page 35 before visually approving questions based on the table or form.

### Printed page 36 — warehouse standard terms and receiving/outbound procedure
- At receiving, the warehouse checks only the external appearance of cargo; it does not inspect the contents.
- Goods are stored in the same original cargo condition/packaging in which they entered, using the method decided by the warehouse company.
- Storage period is counted from the date the goods enter the warehouse.
- When taking cargo out, the depositor/customer must submit the written document specified by the warehouse company.
- The warehouse company may refuse release only when there is an unavoidable reason or it judges refusal necessary; preserve this qualification rather than making it sound like an unrestricted right.
- Existing questions cover only the external inspection and storage-period start; add the original cargo condition, outbound document, and qualified refusal rules.

## Coverage decision
- Existing question count on these pages is not evidence of complete coverage.
- Eighteen questions (0070–0087) lack English question stems.
- There are repeated concepts on reefer containers, chassis/pallet, wing-body trucks, power-gate training, receiving inspection, and storage-period calculation; resolve duplication before adding more.
- Page 34–35 visual confirmation remains pending because page images were unavailable in this read.
- Add only distinct, source-grounded items for the enumerated gaps; do not mark questions approved until source, English, Sinhala, and Japanese checks pass.

## Protected project invariants
- Keep legacy Quick Quiz separate and unchanged.
- Keep all study JSON and source assets unchanged.
- Do not change UI, login/authentication, user records, progress, study XP, or history.
- Keep SSW CBT bank separate and versioned.
