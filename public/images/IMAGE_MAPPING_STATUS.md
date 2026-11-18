# MyKuraFlow — Source Image Mapping Audit

## Repository asset inventory

Image assets are already present in `public/images/` on the `main` branch. Preserve every original filename. Do not relocate or rename files as part of visual mapping.

## Primary source

- Japanese source: `特定技能１号 評価試験 物流倉庫分野（学科・実技）`
- PDF: 123 physical PDF pages including cover; printed pagination runs through 122.
- Parts:
  - Part 1 — Logistics Warehouse Fundamentals: printed pp. 9–51; PDF pp. 10–52
  - Part 2 — Work Manual: printed pp. 54–87; PDF pp. 55–88
  - Part 3 — Warehouse Occupational Safety & Health: printed pp. 90–109; PDF pp. 91–110
  - Part 4 — Forklift Work Standards: printed pp. 114–122; PDF pp. 115–123

## Matching policy

An image is mapped only when its visual contents are compared with the relevant rendered source PDF page and the match is supported by the page's text, diagram, labels, or sequence. Filename similarity or numeric order alone is not proof.

For each verified mapping, record:
- unchanged source asset path under `/images/`
- PDF physical page and printed page (when present)
- part / lesson / subsection
- visual subject and matching evidence
- status: `VERIFIED`, `PENDING`, or `UNMATCHED`

Do not invent placements. Keep unresolved assets visible in the audit as `PENDING` or `UNMATCHED`.

## Known earlier audit findings

An earlier inventory audit reported 84 numbered JPGs in the supplied archive and a non-final mapping status. It found verified source-figure and page-level matches, but also unresolved fragment ordering, duplicates, and page-level matches. These historical counts are not a claim that every current repository asset has been fully visually re-audited.

## Current status

- Repository image directory exists and contains image files.
- Filenames are preserved.
- Full page-by-page visual comparison against the primary Japanese PDF is still required before the image map can be marked final.
- This file is an audit protocol and status record, not a completed mapping manifest.
