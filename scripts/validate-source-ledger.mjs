import fs from "node:fs";

const file = process.argv[2] || "audit/source-page-ledger.v1.json";
const ledger = JSON.parse(fs.readFileSync(file, "utf8"));
const errors = [];
const pages = Array.isArray(ledger.records) ? ledger.records : [];
const ids = pages.map(p => p.pdfPage);
const unique = new Set(ids);
const expected = Array.from({length:123}, (_,i)=>i+1);
const missing = expected.filter(n => !unique.has(n));
const duplicates = [...unique].filter(n => ids.filter(x=>x===n).length > 1);
if (ledger.schemaVersion !== "mykuraflow.source-page-ledger.v1") errors.push("Unsupported source-page-ledger schema.");
if (ledger.source?.physicalPages !== 123) errors.push("Expected 123 physical source pages.");
if (pages.length !== 123) errors.push(`Expected 123 page records; found ${pages.length}.`);
if (missing.length) errors.push("Missing PDF pages: " + missing.join(", "));
if (duplicates.length) errors.push("Duplicate PDF pages: " + duplicates.join(", "));
for (const p of pages) {
  if (!Number.isInteger(p.pdfPage) || p.pdfPage < 1 || p.pdfPage > 123) errors.push(`Invalid pdfPage: ${p.pdfPage}`);
  for (const lang of ["japanese","romaji","english","sinhala"]) {
    if (p.fields?.[lang] !== true) errors.push(`Page ${p.pdfPage}: missing ${lang} field.`);
  }
  if (!p.activeDataFile) errors.push(`Page ${p.pdfPage}: missing activeDataFile.`);
  if (!p.review || p.review.sourceToNote !== "PENDING_ITEM_LEVEL") errors.push(`Page ${p.pdfPage}: do not silently mark unreviewed source mapping as approved.`);
}
const summary = {
  physicalPages: pages.length,
  uniquePages: unique.size,
  missing,
  duplicates,
  languageFieldCoverage: Object.fromEntries(["japanese","furigana","romaji","english","sinhala"].map(k=>[k,pages.filter(p=>p.fields?.[k]).length])),
  itemLevelProofread: pages.filter(p=>p.review?.sourceToNote === "VERIFIED").length,
  errors
};
console.log(JSON.stringify(summary,null,2));
if (errors.length) process.exitCode = 1;
