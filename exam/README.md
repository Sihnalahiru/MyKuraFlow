# Separate CBT Question Bank

This folder is intentionally independent from `data/*.json`. Never write exam questions into source-study batches.

## Contract
- Schema: `mykuraflow.question-bank.v1`
- Minimum: 500 distinct, source-grounded questions across the six sections in `data/exam-rules.json`.
- Written items: True/False; `true` maps to ○ and `false` maps to ×.
- Practical items: four-option MCQs with an actual visually verified document/equipment/diagram asset.
- Every item requires a source page, source anchor, English and Sinhala explanation, stable ID, and review status.
- Question text may include Japanese technical terms; translations must be proofread independently.

## Review gates
DRAFT → SOURCE_CHECKED → LANGUAGE_CHECKED → VISUAL_CHECKED (practical only) → APPROVED.

Do not set `status` to `RELEASE_READY` until there are 500+ distinct questions, every required item passes validation, and each practical visual is verified. No placeholder questions and no question stems duplicated by superficial rewording.

## Paper assembly
Each paper contains exactly 30 written + 10 practical questions. Each section has its own 40-minute clock. Written pass is 20/30; practical pass is 6/10. Overall pass requires both. Exam attempts and exam XP are stored separately from the existing study-completion and legacy quick-quiz records.
