# MyKuraFlow – SSW Logistics Warehouse PWA

This repository is initialized for the trilingual SSW Logistics Warehouse study PWA.

## Project archive
The initial PWA project and complete extracted source corpus are packaged as **MyKuraFlow-SSW-Warehouse-PWA-v0.1.zip** in the associated ChatGPT file library under `/MyKuraFlow/`. It contains the runnable project source and a `public/source/` preservation library.

## Verified uploaded sources
- PDF `SSW_Warehouse_English_Sinhala_CLEAN_INLINE_JAPANESE(2).pdf`: 161 pages. Page-by-page extracted text, JSONL records, complete text export, and source manifest are included.
- ZIP `specified_skilled_worker_textbook_202607(1).zip`: 121 image assets (110 JPG, 10 PNG, 1 TIFF), retained with original filenames under `public/source/textbook-assets/`.
- Source manifest records source file hashes, filenames, page count, extracted text size and image inventory.

## Content status and integrity
The supplied PDF explicitly describes portions as partial translation. The archive preserves all extracted PDF pages and ZIP assets, but the starter app currently contains six verified sample study cards only. It does **not** claim that every page is already translated, furigana annotated, or audited. Continue importing in original page order and mark each section verified only after review.

## Language implementation
- English, Sinhala and Japanese are shown together; no language-tag filtering hides content.
- Sinhala uses Unicode NFC and Noto Sans Sinhala.
- Legacy-font Sinhala is not auto-converted using guessed mappings; raw source is preserved until the exact font/encoding map is verified.
- Japanese readings use structured furigana and HTML `ruby/rt`.

## Run locally
```bash
npm install
npm run dev
npm run build
``

## PWA
Installable manifest, service worker, offline shell caching, and local-device progress tracking are included in the archive.

## GitHub publishing note
The repository was empty initially. Its README initialization commit is published on `main`. The complete ZIP is separately stored in the ChatGPT file library because the available GitHub connection exposes text-file creation but not binary file upload.
