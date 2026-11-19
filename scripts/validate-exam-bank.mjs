import fs from "node:fs";
import path from "node:path";

const bankPath = process.argv[2] || "exam/question-bank.v1.json";
const rulesPath = process.argv[3] || "data/exam-rules.json";
const bank = JSON.parse(fs.readFileSync(bankPath, "utf8"));
const rules = JSON.parse(fs.readFileSync(rulesPath, "utf8"));
const errors = [];
const seenIds = new Set();
const seenStems = new Set();
const allowedSections = new Set(rules.bank.sourceSections);
const questions = Array.isArray(bank.questions) ? bank.questions : [];
const normalize = value => String(value || "").normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();

if (bank.schemaVersion !== "mykuraflow.question-bank.v1") errors.push("Unsupported question-bank schemaVersion.");
if (bank.minimumDistinctQuestions !== 500) errors.push("minimumDistinctQuestions must remain 500.");
if (questions.length < 500) errors.push(`Question bank has ${questions.length}; minimum is 500.`);

const counts = { written_true_false: 0, practical_mcq: 0 };
const bySection = Object.fromEntries([...allowedSections].map(s => [s, 0]));
for (const [index, q] of questions.entries()) {
  const label = q?.id || `questions[${index}]`;
  if (!q || typeof q !== "object") { errors.push(`${label}: not an object.`); continue; }
  if (!/^MKF-[A-Z]{2}-\d{4}$/.test(q.id || "")) errors.push(`${label}: invalid stable ID.`);
  if (seenIds.has(q.id)) errors.push(`${label}: duplicate ID.`);
  seenIds.add(q.id);
  if (!allowedSections.has(q.section)) errors.push(`${label}: invalid section.`);
  else bySection[q.section]++;
  if (!["written_true_false", "practical_mcq"].includes(q.examType)) errors.push(`${label}: invalid examType.`);
  else counts[q.examType]++;
  if (!Number.isInteger(q.sourcePage) || q.sourcePage < 1 || q.sourcePage > 123) errors.push(`${label}: sourcePage must be 1–123.`);
  if (!q.sourceAnchor || q.sourceAnchor.trim().length < 8) errors.push(`${label}: sourceAnchor is required.`);
  if (!q.explanation?.en || !q.explanation?.si) errors.push(`${label}: English and Sinhala explanations are required.`);
  if (!["DRAFT","SOURCE_CHECKED","LANGUAGE_CHECKED","VISUAL_CHECKED","APPROVED"].includes(q.reviewStatus)) errors.push(`${label}: invalid reviewStatus.`);
  const stem = normalize(q.statement || q.questionText?.en);
  if (stem.length < 12) errors.push(`${label}: question stem is too short.`);
  if (stem && seenStems.has(stem)) errors.push(`${label}: duplicate normalized question stem.`);
  if (stem) seenStems.add(stem);
  if (q.examType === "written_true_false" && typeof q.correctAnswer !== "boolean") errors.push(`${label}: written answer must be boolean.`);
  if (q.examType === "practical_mcq") {
    const options = q.options || [];
    if (options.length !== 4 || new Set(options.map(o => o.id)).size !== 4 || !["A","B","C","D"].every(id => options.some(o => o.id === id && o.text))) errors.push(`${label}: practical MCQ must have four distinct A–D options.`);
    if (!["A","B","C","D"].includes(q.correctAnswer)) errors.push(`${label}: practical answer must be A–D.`);
    if (!q.visualRef?.assetPath || q.visualRef.reviewStatus !== "VISUALLY_VERIFIED") errors.push(`${label}: practical item requires a visually verified asset reference.`);
  }
}
if (rules.paper.totalQuestions !== 40 || rules.paper.written.count !== 30 || rules.paper.practical.count !== 10) errors.push("Frozen paper composition mismatch.");
if (rules.paper.written.durationMinutes + rules.paper.practical.durationMinutes !== rules.paper.totalDurationMinutes) errors.push("Section clocks do not add to total exam duration.");
if (rules.scoring.writtenPassMinimum !== 20 || rules.scoring.practicalPassMinimum !== 6 || rules.scoring.overallPassRequiresBoth !== true) errors.push("Separate pass thresholds / overall pass gate changed.");
if (rules.dataProtection.neverModifyExistingStudyJson !== true || rules.dataProtection.separateVersionedQuestionBank !== true) errors.push("Study-source immutability contract changed.");
if (bank.status === "RELEASE_READY" && questions.some(q => q.reviewStatus !== "APPROVED")) errors.push("Release-ready bank contains unapproved questions.");
console.log(JSON.stringify({bankPath, total:questions.length, counts, bySection, uniqueIds:seenIds.size, uniqueStems:seenStems.size, errors}, null, 2));
if (errors.length) process.exitCode = 1;
