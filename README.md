# MyKuraFlow – SSW Logistics Warehouse PWA

This repository starts as a static, source-preserving trilingual PWA. The complete initial project archive is attached in this conversation as **MyKuraFlow-SSW-Warehouse-PWA-v0.1.zip**.

## Verified source inventory
- Uploaded study PDF: 161 pages; page-by-page extracted text, JSONL records, and full text export included in the archive.
- Uploaded textbook ZIP: 121 image assets (110 JPG, 10 PNG, 1 TIFF), extracted under `public/source/textbook-assets/` with filenames retained.
- Source manifest includes hashes and inventory information.

## Important status
The supplied study PDF itself states that portions are partial translation. The archive preserves the extracted source and image assets, but it does not claim that all textbook content has been translated, furigana-annotated, or audited. The app seed includes six verified study cards only.

## Languages
English + Sinhala + Japanese are shown together. Japanese readings use `ruby/rt` furigana. Sinhala uses Unicode NFC and Noto Sans Sinhala. Legacy Sinhala font conversion is intentionally not guessed; preserve raw text until the correct font mapping is verified.

## Run
```bash
npm install
npm run dev
npm run build
``
