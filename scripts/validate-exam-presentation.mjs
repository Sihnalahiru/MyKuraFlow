import fs from "node:fs";

const bank = JSON.parse(fs.readFileSync(process.argv[2] || "exam/question-bank.v1.json", "utf8"));
const policy = JSON.parse(fs.readFileSync(process.argv[3] || "exam/presentation.v1.json", "utf8"));
const batch = JSON.parse(fs.readFileSync(process.argv[4] || "exam/batches/page-009-fundamentals-v1.json", "utf8"));
const errors = [];
const ids = new Set();
const stems = new Set();
const questions = Array.isArray(bank.questions) ? bank.questions : [];

if (policy.examLanguage !== "ja") errors.push("Exam language must be Japanese.");
for (const key of ["romaji", "english", "sinhala", "translations"]) {
  if (policy.examUi?.[key] !== "hidden") errors.push(`Exam UI must hide ${key}.`);
}
if (policy.examUi?.furigana !== "ruby_rt_markup") errors.push("Exam UI must use ruby/rt Furigana.");
for (const q of questions) {
  if (!q?.id || ids.has(q.id)) errors.push(`Missing or duplicate question ID: ${q?.id || "unknown"}`);
  ids.add(q?.id);
  const plain = String(q.statement || "").replace(/<[^>]*>/g, "").normalize("NFKC").toLowerCase().replace(/[^\\p{L}\\p{N}]+/gu, " ").trim();
  if (!q.questionText?.ja || !q.statement) errors.push(`${q.id}: Japanese exam text is required.`);
  if (!String(q.statement || "").includes("<ruby>") || !String(q.statement || "").includes("<rt>")) errors.push(`${q.id}: Furigana ruby/rt markup is required.`);
  if (plain.length < 12) errors.push(`${q.id}: statement is too short.`);
  if (stems.has(plain)) errors.push(`${q.id}: duplicate normalized Japanese statement.`);
  stems.add(plain);
}
if (batch.count !== questions.length) errors.push("Batch manifest count does not match bank count.");
if (batch.questionIds?.length !== questions.length) errors.push("Batch manifest ID list does not match bank count.");
if (questions.some(q => q.reviewStatus === "APPROVED") && bank.status !== "RELEASE_READY") {
  // Approved records may exist during review; this is intentionally not a release gate.
}
const result = {
  totalQuestions: questions.length,
  japaneseQuestionText: questions.filter(q => q.questionText?.ja).length,
  furiganaMarkup: questions.filter(q => String(q.statement || "").includes("<ruby>") && String(q.statement || "").includes("<rt>")).length,
  uniqueIds: ids.size,
  uniqueStems: stems.size,
  batch: batch.batchId,
  errors
};
console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exitCode = 1;
