var authToken = localStorage.getItem("mk-auth-token") || "";
var currentUser = null;
const SOURCES = [
  "data/front-matter-pages-001-008.json",
  "data/part-01/lesson-01-pages-009-012.json",
  "data/part-01/lesson-02-pages-013-018.json",
  "data/part-01/lesson-03-pages-019-028.json",
  "data/part-01/lesson-04-pages-029-038.json",
  "data/part-01/lesson-05-corrected-printed-pages-039-048.json",
  "data/part-01/lesson-05-printed-page-049.json",
  "data/part-01/lesson-05-corrected-printed-pages-050-059.json",
  "data/part-02/lesson-01-pages-054-068.json",
  "data/part-02/lesson-02-pages-069-078.json",
  "data/part-02/lesson-03-pages-079-088.json",
  "data/part-03/lesson-01-pages-089-098.json",
  "data/part-03/lesson-02-pages-099-108.json",
  "data/part-04/lesson-01-pages-109-118.json",
  "data/part-04/lesson-02-pages-119-123.json"
];

let lessons = [];
let flashcardBank = null;
let pdfImageMap = null;
let examBank = null;
let view = "home";
let active = null;
let lessonSearch = "";
let lessonPartFilter = "all";
let theme = localStorage.getItem("mk-theme") || "light";
let quizSession = null;
let quizTimer = null;
let examReviewFilter = "all";
let examShowSi = false;
let islandExpanded = false;

// Exam Flashcards state
let fcTopicFilter = "all";
let fcFocusFilter = "all";
let fcSearch = "";
let fcSession = null; // { title, subtopicId, topicId, queue, index, revealed, onlyUnmastered, reviewedInSession, newlyMastered, xpGained, lastXpDelta, finished }

document.body.classList.toggle("dark", theme === "dark");
const $ = (s) => document.querySelector(s);
const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Convert inline Japanese Furigana e.g. 倉庫(そうこ) or 倉庫（そうこ） into semantic <ruby> HTML
function toRubyHtml(text) {
  const safe = esc(text);
  return safe
    .replace(/([\u4E00-\u9FFF々ヶ〆〇0-9A-Za-z]+)[\(（]([ぁ-んァ-ヶー・]+)[\)）]/g, "<ruby>$1<rt>$2</rt></ruby>")
    .replace(/\n/g, "<br>");
}

function examHistKey() {
  return "mk-exam-history-" + (currentUser?.id || "guest");
}
function getExamHistory() {
  try {
    const raw = JSON.parse(localStorage.getItem(examHistKey()) || "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}
function saveExamHistory(list) {
  localStorage.setItem(examHistKey(), JSON.stringify((list || []).slice(0, 100)));
}

function normalize(d, path) {
  let pages = Array.isArray(d.pages)
    ? d.pages
    : Array.isArray(d.lesson?.pages)
    ? d.lesson.pages.map((p) => {
        let sections = p.sections || [];
        return {
          ...p,
          source_ja: sections.map((x) => [x.heading_ja, x.source_ja].filter(Boolean).join("\n")).join("\n\n"),
          source_furigana: sections.map((x) => x.heading_furigana || "").filter(Boolean).join(" / "),
          romaji: sections.map((x) => [x.heading_romaji, x.romaji].filter(Boolean).join("\n")).join("\n\n"),
          en: sections.map((x) => [x.heading_en, x.english].filter(Boolean).join("\n")).join("\n\n"),
          si: sections.map((x) => [x.heading_si, x.sinhala].filter(Boolean).join("\n")).join("\n\n"),
          visuals: []
        };
      })
    : [];
  let resolvedTitle =
    (typeof d.lesson_title === "string" ? d.lesson_title : d.lesson_title?.en) ||
    d.lesson?.title_en ||
    d.part?.title_en ||
    path.split("/").pop();
  return {
    id: d.lesson_id || d.lesson?.id || path,
    title: resolvedTitle,
    part: d.part_id || d.part?.id || path.split("/")[1],
    pages,
    path,
    raw: d
  };
}

function matchesPartFilter(part, filter) {
  if (filter === "all") return true;
  if (filter === "part-transition") return part === "part-transition" || part === "part-01-and-part-02-transition" || part === "front-matter";
  if (filter === "part-03") return part === "part-03" || part === "part-03-and-04";
  if (filter === "part-04") return part === "part-04" || part === "part-03-and-04";
  return part === filter;
}

async function load() {
  if (!(await restoreAuth())) {
    showAuth();
    return;
  }
  const [lessonResults, bankResult, imgMapResult, examBankResult] = await Promise.all([
    Promise.all(
      SOURCES.map(async (p) => {
        try {
          let r = await fetch(p);
          if (!r.ok) return null;
          return normalize(await r.json(), p);
        } catch {
          return null;
        }
      })
    ),
    fetch("data/flashcards-exam-bank.json").then((r) => (r.ok ? r.json() : null)).catch(() => null),
    fetch("data/pdf-image-map.json").then((r) => (r.ok ? r.json() : null)).catch(() => null),
    fetch("data/ssw-exam-papers-600.json").then((r) => (r.ok ? r.json() : null)).catch(() => null)
  ]);
  lessons = lessonResults.filter(Boolean);
  flashcardBank = bankResult;
  pdfImageMap = imgMapResult?.pages || {};
  examBank = examBankResult;
  render();
}

function pageText(p, k) {
  return p[k] || p["source_" + k] || p.content?.[k] || p.translation?.[k] || "";
}
function allPages() {
  return lessons.flatMap((l) => l.pages.map((p, i) => ({ ...p, _lesson: l, _i: i })));
}
function nav(v) {
  view = v;
  active = null;
  document.querySelectorAll(".nav-item").forEach((b) => b.classList.toggle("active", b.dataset.view === v));
  render();
}
document.querySelectorAll(".nav-item").forEach((b) => b.addEventListener("click", () => nav(b.dataset.view)));
$("#themeToggle").onclick = () => {
  theme = theme === "dark" ? "light" : "dark";
  localStorage.setItem("mk-theme", theme);
  document.body.classList.toggle("dark", theme === "dark");
};
$("#searchBtn").onclick = () => {
  nav("lessons");
  setTimeout(() => {
    const input = $("#lessonSearch");
    if (input) input.focus();
  }, 0);
};

// Flashcard progress & XP helpers
function fcKey() {
  return "mk-fc-" + (currentUser?.id || "guest");
}
function getFcStates() {
  try {
    const raw = JSON.parse(localStorage.getItem(fcKey()) || "{}");
    return raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  } catch {
    return {};
  }
}
function cardXpValue(status) {
  if (status === "mastered") return 5;
  if (status === "review") return 2;
  if (status === "again") return 1;
  return 0;
}
function summarizeFcStates(states = getFcStates(), cards = flashcardBank?.cards || []) {
  let mastered = 0;
  let review = 0;
  let again = 0;
  let xp = 0;
  for (const c of cards) {
    const st = states[c.id];
    if (st === "mastered") {
      mastered++;
      xp += 5;
    } else if (st === "review") {
      review++;
      xp += 2;
    } else if (st === "again") {
      again++;
      xp += 1;
    }
  }
  const total = cards.length;
  const untouched = Math.max(0, total - mastered - review - again);
  const pct = total ? Math.round((mastered / total) * 100) : 0;
  return { total, mastered, review, again, untouched, xp, pct };
}
function saveFcStates(states) {
  localStorage.setItem(fcKey(), JSON.stringify(states));
  const summary = summarizeFcStates(states);
  if (currentUser) {
    const studyXp = getDone().length * 10;
    const quizXp = Number(currentUser.quizXp || 0);
    currentUser.flashcardXp = summary.xp;
    currentUser.flashcardsMastered = summary.mastered;
    currentUser.xp = studyXp + quizXp + summary.xp;
    if (!currentUser.streakDays) currentUser.streakDays = 1;
    updateUserBadge();
  }
  apiRequest("/flashcards/progress", {
    method: "PUT",
    body: JSON.stringify({ states })
  })
    .then((res) => {
      if (currentUser && res) {
        currentUser.xp = Number(res.totalXp ?? currentUser.xp);
        currentUser.flashcardXp = Number(res.flashcardXp ?? currentUser.flashcardXp);
        currentUser.flashcardsMastered = Number(res.masteredCount ?? currentUser.flashcardsMastered);
        currentUser.streakDays = Number(res.streakDays ?? currentUser.streakDays);
        updateUserBadge();
      }
    })
    .catch((err) => console.warn("Flashcard sync pending:", err.message));
}

function stats() {
  const done = getDone();
  const fc = summarizeFcStates();
  const studyXp = done.length * 10;
  const quizXp = Number(currentUser?.quizXp || 0);
  const flashcardXp = fc.xp;
  const totalXp = Math.max(Number(currentUser?.xp || 0), studyXp + quizXp + flashcardXp);
  const streakDays = Number(currentUser?.streakDays || 0);
  return {
    pages: allPages().length,
    done: done.length,
    lessons: lessons.length,
    fc,
    studyXp,
    quizXp,
    flashcardXp,
    totalXp,
    streakDays
  };
}

function openTopicFlashcards(topicId) {
  fcTopicFilter = topicId || "all";
  fcSession = null;
  nav("flashcards");
}
window.openTopicFlashcards = openTopicFlashcards;

function renderTopicReadinessRows() {
  if (!flashcardBank?.topics?.length) return "";
  const states = getFcStates();
  return flashcardBank.topics
    .map((t) => {
      const topicCards = flashcardBank.cards.filter((c) => c.topicId === t.id);
      const sum = summarizeFcStates(states, topicCards);
      return `<button class="dash-readiness-row" onclick="openTopicFlashcards('${esc(t.id)}')">
        <div class="dash-readiness-top">
          <b>${esc(t.title)}</b>
          <span>${sum.mastered}/${sum.total} mastered · ${sum.pct}% · +${sum.xp} XP</span>
        </div>
        <div class="fc-meta-line"><span>${esc(t.pageRange)}</span><span>·</span><span>${esc(t.titleSi)}</span></div>
        <div class="fc-deck-bar"><span style="width:${sum.pct}%"></span></div>
      </button>`;
    })
    .join("");
}

function render() {
  const s = stats();
  const title = {
    home: "Good to see you, " + (currentUser?.displayName || "learner") + " 👋",
    lessons: "Your study library",
    flashcards: "Exam flashcards",
    quiz: "SSW Mock Exams (12 × 50)",
    progress: "Your learning progress",
    leaderboard: "Team leaderboard"
  };
  $("#pageTitle").textContent = title[view] || "MyKuraFlow";
  const v = $("#view");

  if (view === "home") {
    const streakLabel = s.streakDays > 0 ? `${s.streakDays} day${s.streakDays === 1 ? "" : "s"}` : "0 days";
    const streakSub = s.streakDays > 0 ? "Active study streak" : "Complete a card or page today";
    v.innerHTML = `<div class="hero">
        <div>
          <span class="eyebrow">YOUR NEXT SHIFT STARTS HERE</span>
          <h2>Build skills. Stay safe.<br>Get SSW-ready.</h2>
          <p>Study all 123 textbook pages with Japanese, Romaji, English, Sinhala, and topic-by-topic exam flashcards that earn live XP.</p>
          <div class="hero-actions">
            <button class="primary" onclick="nav('lessons')">Continue learning →</button>
            <button class="hero-secondary" onclick="nav('flashcards')">Exam flashcards (${s.fc.total})</button>
          </div>
        </div>
        <div class="hero-art">倉庫 📦</div>
      </div>
      <div class="stats">
        <div class="stat"><span class="stat-label">Total XP</span><strong class="tabular">${s.totalXp} XP</strong><small>Lessons + Flashcards + Quiz</small></div>
        <div class="stat"><span class="stat-label">Flashcards mastered</span><strong class="tabular">${s.fc.mastered} / ${s.fc.total}</strong><small>${s.fc.pct}% of full 123-page PDF · +${s.fc.xp} XP</small></div>
        <div class="stat"><span class="stat-label">Completed pages</span><strong class="tabular">${s.done} / ${s.pages}</strong><small>${lessons.length} textbook modules</small></div>
        <div class="stat"><span class="stat-label">Daily streak</span><strong class="tabular">${streakLabel}</strong><small>${streakSub}</small></div>
      </div>
      <div class="section-head">
        <h2>Exam flashcard readiness (123 pages)</h2>
        <button onclick="nav('flashcards')">Open flashcards →</button>
      </div>
      <div class="dash-readiness-list">${renderTopicReadinessRows()}</div>
      <div class="section-head">
        <h2>Explore your syllabus</h2>
        <button onclick="nav('lessons')">All lessons →</button>
      </div>
      <div class="part-grid">${partCards()}</div>`;
    updateIsland();
    return;
  }

  if (view === "lessons") {
    let list = lessons.filter(
      (l) => (l.title + " " + l.part + " " + l.path).toLowerCase().includes(lessonSearch.toLowerCase()) && matchesPartFilter(l.part, lessonPartFilter)
    );
    let labels = {
      "front-matter": "FRONT MATTER · GUIDE",
      "part-01": "PART 01 · FUNDAMENTALS",
      "part-01-and-part-02-transition": "TRANSITION & APPENDIX",
      "part-02": "PART 02 · WORK MANUAL",
      "part-03": "PART 03 · SAFETY & HEALTH",
      "part-03-and-04": "PART 03–04 · GHS & FORKLIFT",
      "part-04": "PART 04 · FORKLIFT STANDARDS",
      "part-transition": "TRANSITION PAGES"
    };
    let icons = {
      "front-matter": "📖",
      "part-01": "📦",
      "part-01-and-part-02-transition": "📚",
      "part-02": "📋",
      "part-03": "🦺",
      "part-03-and-04": "🚜",
      "part-04": "🚜",
      "part-transition": "📚"
    };
    v.innerHTML =
      '<section class="study-intro"><div><span class="eyebrow">YOUR LEARNING LIBRARY</span><h2>Study, one clear step at a time.</h2><p>Japanese source · Romaji · English · Sinhala — organised by textbook sections.</p></div><div class="study-total"><b>' +
      allPages().length +
      '</b><span>study pages</span></div></section><div class="study-search"><span>⌕</span><input id="lessonSearch" type="search" placeholder="Search topics, Japanese terms…" value="' +
      esc(lessonSearch) +
      '" oninput="setLessonSearch(this.value)"></div><div class="study-filters">' +
      [
        ["all", "All", "✦"],
        ["part-01", "Fundamentals", "📦"],
        ["part-02", "Work manual", "📋"],
        ["part-03", "Safety", "🦺"],
        ["part-04", "Forklift", "🚜"],
        ["part-transition", "Appendix", "📚"]
      ]
        .map((x) => '<button class="filter-chip ' + (lessonPartFilter === x[0] ? "selected" : "") + '" onclick="setLessonPart(\'' + x[0] + "')\">" + x[2] + " " + x[1] + "</button>")
        .join("") +
      '</div><div class="study-section-heading"><div><span class="eyebrow">TEXTBOOK CONTENT</span><h3>' +
      (lessonPartFilter === "all" ? "All study modules" : esc(lessonPartFilter)) +
      '</h3></div><span class="study-count">' +
      list.length +
      ' modules</span></div><div class="study-module-list">' +
      (list
        .map((l) => {
          let done = getDone().filter((x) => x.startsWith(l.id + "-")).length;
          let pct = l.pages.length ? Math.round((done / l.pages.length) * 100) : 0;
          return (
            '<button class="study-module" onclick="openLesson(\'' +
            esc(l.id) +
            '\')"><span class="module-art">' +
            (icons[l.part] || "📘") +
            '</span><span class="module-copy"><small>' +
            (labels[l.part] || "TEXTBOOK MODULE") +
            "</small><b>" +
            esc(l.title) +
            "</b><span>" +
            l.pages.length +
            ' pages · Japanese / English / Sinhala</span><i class="module-progress"><em style="width:' +
            pct +
            '%"></em></i></span><span class="module-arrow">›</span></button>'
          );
        })
        .join("") || '<div class="empty">No matching study modules. Try another search.</div>') +
      "</div>";
    updateIsland();
    return;
  }

  if (view === "leaderboard") {
    renderLeaderboard();
    updateIsland();
    return;
  }

  if (view === "progress") {
    const done = getDone();
    const pct = s.pages ? Math.round((done.length / s.pages) * 100) : 0;
    v.innerHTML = `<div class="panel">
        <h3>Total XP & Study Streak</h3>
        <strong class="tabular" style="font-size:34px">${s.totalXp} XP</strong>
        <p class="stat-label">Active streak: ${s.streakDays} day${s.streakDays === 1 ? "" : "s"} · Study notes, exam flashcards, and quizzes all count toward your rank.</p>
        <div class="xp-breakdown-grid">
          <div class="xp-breakdown-item"><small>Study Notes (+10 / page)</small><strong>${s.studyXp} XP</strong></div>
          <div class="xp-breakdown-item"><small>Exam Flashcards (+5 mastered)</small><strong>${s.flashcardXp} XP</strong></div>
          <div class="xp-breakdown-item"><small>SSW Mock Exams (+5 / correct)</small><strong>${s.quizXp} XP</strong></div>
        </div>
      </div>
      <div class="panel">
        <h3>Overall textbook completion</h3>
        <strong class="tabular" style="font-size:28px">${pct}%</strong>
        <div class="progress-track"><span style="width:${pct}%"></span></div>
        <p class="stat-label">${done.length} of ${s.pages} study pages marked complete.</p>
      </div>
      <div class="panel">
        <h3>Exam Flashcard Mastery by Topic (${s.fc.mastered}/${s.fc.total})</h3>
        <div class="dash-readiness-list" style="margin-top:12px">${renderTopicReadinessRows()}</div>
      </div>
      <div class="panel">
        <h3>Imported module coverage</h3>
        ${lessons.map((l) => `<p>${esc(l.title)} <span style="float:right;color:var(--muted)">${l.pages.length} pages</span></p>`).join("")}
      </div>`;
    updateIsland();
    return;
  }

  if (view === "flashcards") {
    renderFlashcards();
    return;
  }

  if (view === "quiz") {
    renderExamView();
    return;
  }
}

// ---------- EXAM FLASHCARDS STUDIO (123-PAGE TOPIC -> SUB-TOPIC ENGINE) ----------
function getFilteredCardsForScope({ topicId = "all", subtopicId = null, focus = "all", onlyUnmastered = false, search = "" } = {}) {
  if (!flashcardBank?.cards) return [];
  const states = getFcStates();
  const q = search.trim().toLowerCase();
  return flashcardBank.cards.filter((c) => {
    if (subtopicId && c.subtopicId !== subtopicId) return false;
    if (!subtopicId && topicId !== "all" && c.topicId !== topicId) return false;
    if (focus !== "all" && c.examFocus !== focus) return false;
    if (onlyUnmastered && states[c.id] === "mastered") return false;
    if (q) {
      const hay = `${c.subtopicTitle} ${c.front.promptEn} ${c.front.promptJa} ${c.front.promptSi} ${c.back.answerEn} ${c.back.answerJa} ${c.back.romaji} p.${c.printedPage}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

function startFlashcardDeck({ subtopicId = null, topicId = "all", onlyUnmastered = false, shuffled = false, title = null } = {}) {
  const focus = subtopicId ? "all" : fcFocusFilter;
  let cards = getFilteredCardsForScope({ topicId, subtopicId, focus, onlyUnmastered, search: subtopicId ? "" : fcSearch });
  if (!cards.length && onlyUnmastered) {
    cards = getFilteredCardsForScope({ topicId, subtopicId, focus, onlyUnmastered: false });
    onlyUnmastered = false;
  }
  if (!cards.length) return;
  const queue = shuffled ? shuffle(cards) : [...cards];
  let deckTitle = title;
  if (!deckTitle) {
    if (subtopicId) {
      deckTitle = flashcardBank.subtopics.find((s) => s.id === subtopicId)?.title || "Sub-topic deck";
    } else if (topicId !== "all") {
      deckTitle = flashcardBank.topics.find((t) => t.id === topicId)?.title || "Topic deck";
    } else {
      deckTitle = onlyUnmastered ? "Unmastered Exam Cards" : "Full 123-Page SSW Exam Deck";
    }
  }
  fcSession = {
    title: deckTitle,
    subtopicId,
    topicId,
    queue,
    index: 0,
    revealed: false,
    onlyUnmastered,
    shuffled,
    reviewedInSession: 0,
    newlyMastered: 0,
    xpGained: 0,
    lastXpDelta: 0,
    finished: false
  };
  view = "flashcards";
  render();
}

function exitFlashcardSession() {
  fcSession = null;
  render();
}

function revealFlashcard() {
  if (!fcSession || fcSession.finished) return;
  fcSession.revealed = true;
  render();
}

function flipFlashcard() {
  if (!fcSession || fcSession.finished) return;
  fcSession.revealed = !fcSession.revealed;
  const cardEl = document.getElementById("fcFlipCard");
  const rateWrap = document.getElementById("fcRateWrap");
  const flipActionWrap = document.getElementById("fcFlipActionWrap");
  if (cardEl) {
    cardEl.classList.toggle("is-flipped", fcSession.revealed);
    cardEl.setAttribute("aria-pressed", String(fcSession.revealed));
    if (rateWrap) rateWrap.hidden = !fcSession.revealed;
    if (flipActionWrap) flipActionWrap.hidden = fcSession.revealed;
    return;
  }
  render();
}

function rateFlashcard(rating) {
  if (!fcSession || fcSession.finished) return;
  const card = fcSession.queue[fcSession.index];
  if (!card) return;
  const states = getFcStates();
  const prevStatus = states[card.id] || null;
  const prevXp = cardXpValue(prevStatus);
  const nextXp = cardXpValue(rating);
  const delta = Math.max(0, nextXp - prevXp);

  states[card.id] = rating;
  saveFcStates(states);

  fcSession.reviewedInSession++;
  if (rating === "mastered" && prevStatus !== "mastered") fcSession.newlyMastered++;
  fcSession.xpGained += delta;
  fcSession.lastXpDelta = delta;

  // If marked Again, push one extra copy near the end of the session for spaced repetition
  if (rating === "again" && fcSession.queue.length < 250) {
    const insertAt = Math.min(fcSession.queue.length, fcSession.index + 3);
    fcSession.queue.splice(insertAt, 0, card);
  }

  if (fcSession.index >= fcSession.queue.length - 1) {
    fcSession.finished = true;
    fcSession.revealed = false;
  } else {
    fcSession.index++;
    fcSession.revealed = false;
  }
  render();
}

function stepFlashcard(dir) {
  if (!fcSession || fcSession.finished) return;
  const next = fcSession.index + dir;
  if (next < 0 || next >= fcSession.queue.length) return;
  fcSession.index = next;
  fcSession.revealed = false;
  fcSession.lastXpDelta = 0;
  render();
}

function toggleSessionShuffle() {
  if (!fcSession) return;
  startFlashcardDeck({
    subtopicId: fcSession.subtopicId,
    topicId: fcSession.topicId,
    onlyUnmastered: fcSession.onlyUnmastered,
    shuffled: !fcSession.shuffled,
    title: fcSession.title
  });
}

function toggleSessionUnmastered() {
  if (!fcSession) return;
  startFlashcardDeck({
    subtopicId: fcSession.subtopicId,
    topicId: fcSession.topicId,
    onlyUnmastered: !fcSession.onlyUnmastered,
    shuffled: fcSession.shuffled,
    title: fcSession.title
  });
}

function openNextSubtopic() {
  if (!fcSession?.subtopicId || !flashcardBank?.subtopics) {
    exitFlashcardSession();
    return;
  }
  const idx = flashcardBank.subtopics.findIndex((s) => s.id === fcSession.subtopicId);
  const next = flashcardBank.subtopics[idx + 1];
  if (next) {
    startFlashcardDeck({ subtopicId: next.id, topicId: next.topicId, title: next.title });
  } else {
    exitFlashcardSession();
  }
}

function renderFlashcards() {
  const v = $("#view");
  if (!flashcardBank?.cards?.length) {
    v.innerHTML = '<div class="empty">Loading exam flashcard bank covering all 123 textbook pages…</div>';
    updateIsland();
    return;
  }

  const states = getFcStates();

  // Active flashcard study stage
  if (fcSession) {
    if (fcSession.finished) {
      const overall = summarizeFcStates(states);
      const hasNextSub =
        fcSession.subtopicId &&
        flashcardBank.subtopics.findIndex((s) => s.id === fcSession.subtopicId) < flashcardBank.subtopics.length - 1;
      v.innerHTML = `<div class="panel">
          <div class="fc-meta-line"><span>Deck completed</span><span>·</span><strong>+${fcSession.xpGained} XP earned this session</strong></div>
          <h2 style="margin:8px 0 6px">${esc(fcSession.title)}</h2>
          <p class="stat-label">Your mastery progress, Total XP, Dashboard, and Leaderboard have been updated.</p>
          <div class="quiz-result-row"><span>Cards reviewed</span><b class="tabular">${fcSession.reviewedInSession}</b></div>
          <div class="quiz-result-row"><span>Newly mastered</span><b class="tabular">${fcSession.newlyMastered}</b></div>
          <div class="quiz-result-row"><span>Total flashcard XP</span><b class="tabular">${overall.xp} XP</b></div>
          <div class="quiz-result-row"><span>Full PDF mastery</span><b class="tabular">${overall.mastered} / ${overall.total} (${overall.pct}%)</b></div>
          <div class="toolbar">
            ${hasNextSub ? '<button class="primary" onclick="openNextSubtopic()">Next sub-topic →</button>' : ""}
            <button class="${hasNextSub ? "secondary" : "primary"}" onclick="startFlashcardDeck({subtopicId:${fcSession.subtopicId ? "'" + esc(fcSession.subtopicId) + "'" : "null"},topicId:'${esc(fcSession.topicId)}',title:'${esc(fcSession.title)}'})">Study again</button>
            <button class="secondary" onclick="exitFlashcardSession()">Back to all decks</button>
          </div>
        </div>`;
      updateIsland();
      return;
    }

    const card = fcSession.queue[fcSession.index];
    const topic = flashcardBank.topics.find((t) => t.id === card.topicId);
    const curStatus = states[card.id] || "new";
    const statusLabel = { new: "New", again: "Needs repeat", review: "In review", mastered: "Mastered" }[curStatus];
    const progressPct = Math.round(((fcSession.index + (fcSession.revealed ? 0.5 : 0)) / fcSession.queue.length) * 100);
    // Authentic PDF images only (zero generated SVGs)
    const realImgs = (pdfImageMap && pdfImageMap[String(card.pdfPage)]) || (card.images || []).filter((s) => !s.includes("generated/")).map((src) => ({ src }));
    const visualsHtml = realImgs.length
      ? `<div class="fc-visual-box">${realImgs
          .slice(0, 3)
          .map(
            (img, idx) =>
              `<img src="${esc(img.src)}" loading="lazy" decoding="async" alt="Textbook visual ${idx + 1} for page ${esc(card.printedPage)}" onerror="this.remove()">`
          )
          .join("")}</div>`
      : "";
    const frontJaSource = card.front.jaFurigana || card.back.furigana || card.front.promptJa || card.back.answerJa;

    v.innerHTML = `<div class="fc-session-top">
        <button class="back-library" onclick="exitFlashcardSession()">‹ Back to decks</button>
        <div class="fc-session-controls">
          <button class="${fcSession.onlyUnmastered ? "active" : ""}" onclick="toggleSessionUnmastered()">Unmastered only</button>
          <button class="${fcSession.shuffled ? "active" : ""}" onclick="toggleSessionShuffle()">Shuffle</button>
        </div>
      </div>
      <div class="fc-meta-line" style="margin-bottom:8px">
        <strong>${esc(fcSession.title)}</strong>
        <span>·</span>
        <span>Card ${fcSession.index + 1} of ${fcSession.queue.length}</span>
        <span>·</span>
        <span>Session +${fcSession.xpGained} XP</span>
        ${fcSession.lastXpDelta > 0 ? `<span class="fc-xp-toast">+${fcSession.lastXpDelta} XP saved</span>` : ""}
      </div>
      <div class="progress-track"><span style="width:${progressPct}%"></span></div>

      <div class="fc-flip-stage">
        <div id="fcFlipCard" class="fc-flip-card ${fcSession.revealed ? "is-flipped" : ""}" role="button" tabindex="0" aria-pressed="${fcSession.revealed}" onclick="flipFlashcard()">
          <div class="fc-face fc-face-front">
            <div class="fc-card-header">
              <span>${esc(topic?.title || card.topicId)} · PDF P.${String(card.pdfPage).padStart(2, "0")} · ${esc(card.examFocus)}</span>
              <span class="fc-status-text is-${esc(curStatus)}">${esc(statusLabel)}</span>
            </div>
            ${visualsHtml}
            <div class="fc-front-ruby-wrap">
              <div class="fc-front-ruby">${toRubyHtml(frontJaSource)}</div>
            </div>
            <div class="fc-tap-cue">↻ ${toRubyHtml("タップしてシンハラ語(ご)の意味(いみ)を見(み)る")} · Tap card to flip</div>
          </div>

          <div class="fc-face fc-face-back">
            <div class="fc-card-header">
              <span>සිංහල අර්ථය (Sinhala Meaning) · PDF P.${String(card.pdfPage).padStart(2, "0")}</span>
              <span class="fc-status-text is-${esc(curStatus)}">${esc(statusLabel)}</span>
            </div>
            <div class="fc-answer-section sinhala-box fc-back-si-hero">
              <span class="fc-answer-label">සිංහල අර්ථය · SINHALA MEANING</span>
              <p>${esc(card.back.answerSi)}</p>
            </div>
            <div class="fc-answer-section ja-box">
              <span class="fc-answer-label">${toRubyHtml("日本語(にほんご)・ふりがな")}</span>
              <p class="fc-back-ruby">${toRubyHtml(card.back.furigana || frontJaSource)}</p>
            </div>
            <div class="fc-answer-section">
              <span class="fc-answer-label">English &amp; Romaji</span>
              <p>${esc(card.back.answerEn)}</p>
              ${card.back.romaji ? `<small class="fc-back-romaji">${esc(card.back.romaji)}</small>` : ""}
            </div>
            <div class="fc-tip"><strong>SSW Exam Note:</strong> ${esc(card.back.examTip)}</div>
            <div class="fc-tap-cue">↻ Tap card to flip back to Japanese</div>
          </div>
        </div>
      </div>

      <div id="fcRateWrap" class="fc-rating-row" ${fcSession.revealed ? "" : "hidden"}>
        <button class="fc-rate-btn rate-again ${curStatus === "again" ? "current" : ""}" onclick="rateFlashcard('again')">
          <span>Again</span>
          <small>Repeat soon · +1 XP</small>
        </button>
        <button class="fc-rate-btn rate-review ${curStatus === "review" ? "current" : ""}" onclick="rateFlashcard('review')">
          <span>Review</span>
          <small>Still learning · +2 XP</small>
        </button>
        <button class="fc-rate-btn rate-mastered ${curStatus === "mastered" ? "current" : ""}" onclick="rateFlashcard('mastered')">
          <span>Mastered ✓</span>
          <small>Exam ready · +5 XP</small>
        </button>
      </div>
      <div id="fcFlipActionWrap" class="fc-flip-action-row" ${fcSession.revealed ? "hidden" : ""}>
        <button class="fc-reveal-btn" onclick="flipFlashcard()">Flip card · සිංහල අර්ථය බලන්න ↻</button>
      </div>

      <div class="fc-nav-row">
        <button onclick="stepFlashcard(-1)" ${fcSession.index === 0 ? "disabled" : ""}>← Previous</button>
        <span class="fc-meta-line">Page ${card.pdfPage} / 123</span>
        <button onclick="stepFlashcard(1)" ${fcSession.index >= fcSession.queue.length - 1 ? "disabled" : ""}>Next →</button>
      </div>
      <p class="fc-kb-hint">Tap card or press Space to flip · 1 Again · 2 Review · 3 Mastered · ← / → navigate</p>`;
    updateIsland();
    return;
  }

  // Stage 1: Topic -> Sub-topic Deck Explorer
  const overall = summarizeFcStates(states);
  const dueCount = overall.total - overall.mastered;
  const topicsToShow = flashcardBank.topics.filter((t) => fcTopicFilter === "all" || t.id === fcTopicFilter);
  const focusOptions = ["all", "Written ○/×", "Numeric / Limit", "Practical Visual", "Key Term"];

  const topicGroupsHtml = topicsToShow
    .map((topic) => {
      const subtopics = flashcardBank.subtopics.filter((st) => st.topicId === topic.id);
      const deckCardsHtml = subtopics
        .map((st) => {
          const cards = getFilteredCardsForScope({
            topicId: topic.id,
            subtopicId: st.id,
            focus: fcFocusFilter,
            search: fcSearch
          });
          if (!cards.length) return "";
          const sum = summarizeFcStates(states, cards);
          const visualCount = cards.filter((c) => c.images?.length).length;
          return `<button class="fc-deck-card" onclick="startFlashcardDeck({subtopicId:'${esc(st.id)}',topicId:'${esc(topic.id)}',title:'${esc(st.title)}'})">
            <div class="fc-meta-line">
              <span>Pages ${String(st.minPage).padStart(2, "0")}–${String(st.maxPage).padStart(2, "0")}</span>
              <span>·</span>
              <span>${cards.length} exam cards</span>
              ${visualCount ? `<span>·</span><span>${visualCount} visuals</span>` : ""}
              <span>·</span>
              <strong>+${sum.xp} XP</strong>
            </div>
            <h4 class="fc-deck-title">${esc(st.title)}</h4>
            <p class="fc-deck-si">${esc(st.titleSi)}</p>
            <div class="fc-deck-foot">
              <div class="fc-deck-bar"><span style="width:${sum.pct}%"></span></div>
              <span class="fc-deck-cta">${sum.mastered}/${sum.total} mastered · Study ›</span>
            </div>
          </button>`;
        })
        .filter(Boolean)
        .join("");

      if (!deckCardsHtml) return "";
      const topicCards = getFilteredCardsForScope({ topicId: topic.id, focus: fcFocusFilter, search: fcSearch });
      const topicSum = summarizeFcStates(states, topicCards);
      return `<section class="fc-topic-group">
        <div class="fc-topic-header">
          <h3>${esc(topic.title)}</h3>
          <span class="fc-topic-meta">${esc(topic.pageRange)} · ${topicSum.mastered}/${topicSum.total} mastered</span>
        </div>
        <div class="fc-deck-grid">${deckCardsHtml}</div>
      </section>`;
    })
    .filter(Boolean)
    .join("");

  v.innerHTML = `<section class="study-intro">
      <div>
        <span class="eyebrow">SSW EXAM FLASHCARD BANK</span>
        <h2>All 123 pages, organized by topic & sub-topic.</h2>
        <p>Written ○/× rules, numeric limits, practical visuals, and key Japanese terms — earn up to +5 XP per mastered card.</p>
      </div>
      <div class="study-total"><b class="tabular">${overall.total}</b><span>exam cards</span></div>
    </section>

    <div class="fc-summary-bar">
      <div class="stat"><span class="stat-label">PDF coverage</span><strong>${flashcardBank.totalSourcePagesCovered}/123</strong><small>Full textbook</small></div>
      <div class="stat"><span class="stat-label">Mastered</span><strong>${overall.mastered}</strong><small>${overall.pct}% ready</small></div>
      <div class="stat"><span class="stat-label">Needs review</span><strong>${dueCount}</strong><small>${overall.review + overall.again} active · ${overall.untouched} new</small></div>
      <div class="stat"><span class="stat-label">Flashcard XP</span><strong>+${overall.xp}</strong><small>Synced to dashboard</small></div>
    </div>

    <div class="fc-launch-row">
      <button class="primary" onclick="startFlashcardDeck({topicId:'${esc(fcTopicFilter)}',onlyUnmastered:true,shuffled:false})">Practice unmastered (${dueCount}) →</button>
      <button class="secondary" onclick="startFlashcardDeck({topicId:'${esc(fcTopicFilter)}',onlyUnmastered:false,shuffled:true})">Shuffle full deck</button>
    </div>

    <div class="study-search">
      <span>⌕</span>
      <input id="fcSearchInput" type="search" placeholder="Search exam cards, numbers, Japanese terms, page number…" value="${esc(fcSearch)}" oninput="setFcSearch(this.value)">
    </div>

    <div class="fc-filter-group">
      <div class="fc-segmented" role="tablist" aria-label="Filter flashcards by topic">
        <button class="fc-seg-btn ${fcTopicFilter === "all" ? "active" : ""}" onclick="setFcTopic('all')">All Topics</button>
        ${flashcardBank.topics
          .map(
            (t) =>
              `<button class="fc-seg-btn ${fcTopicFilter === t.id ? "active" : ""}" onclick="setFcTopic('${esc(t.id)}')">${esc(t.title.replace(/^Part \d+ · /, "P" + (t.id.slice(-1)) + " · "))}</button>`
          )
          .join("")}
      </div>
      <div class="fc-segmented" role="tablist" aria-label="Filter flashcards by exam focus">
        ${focusOptions
          .map(
            (f) =>
              `<button class="fc-seg-btn ${fcFocusFilter === f ? "active" : ""}" onclick="setFcFocus('${esc(f)}')">${f === "all" ? "All Exam Types" : esc(f)}</button>`
          )
          .join("")}
      </div>
    </div>

    ${topicGroupsHtml || '<div class="empty">No exam flashcards match this filter. Try clearing search or choosing All Topics.</div>'}`;

  updateIsland();
}

window.setFcTopic = (t) => {
  fcTopicFilter = t;
  render();
};
window.setFcFocus = (f) => {
  fcFocusFilter = f;
  render();
};
window.setFcSearch = (q) => {
  fcSearch = q;
  render();
};
window.startFlashcardDeck = startFlashcardDeck;
window.exitFlashcardSession = exitFlashcardSession;
window.revealFlashcard = revealFlashcard;
window.flipFlashcard = flipFlashcard;
window.rateFlashcard = rateFlashcard;
window.stepFlashcard = stepFlashcard;
window.toggleSessionShuffle = toggleSessionShuffle;
window.toggleSessionUnmastered = toggleSessionUnmastered;
window.openNextSubtopic = openNextSubtopic;

// Keyboard shortcuts during active flashcard sessions
document.addEventListener("keydown", (e) => {
  if (view !== "flashcards" || !fcSession || fcSession.finished) return;
  const tag = e.target?.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA") return;
  if (e.code === "Space") {
    e.preventDefault();
    flipFlashcard();
  } else if (e.key === "ArrowRight") {
    stepFlashcard(1);
  } else if (e.key === "ArrowLeft") {
    stepFlashcard(-1);
  } else if (fcSession.revealed && e.key === "1") {
    rateFlashcard("again");
  } else if (fcSession.revealed && e.key === "2") {
    rateFlashcard("review");
  } else if (fcSession.revealed && e.key === "3") {
    rateFlashcard("mastered");
  }
});

// ---------- OFFICIAL SSW (i) LOGISTICS WAREHOUSING CBT EXAM ENGINE (12 x 50 = 600 Qs) ----------
function formatTime(sec) {
  sec = Math.max(0, sec | 0);
  return String(Math.floor(sec / 60)).padStart(2, "0") + ":" + String(sec % 60).padStart(2, "0");
}
function shuffle(a) {
  let x = [...a];
  for (let i = x.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

const CHOICE_KANA = ["ア", "イ", "ウ", "エ"];

function activeExamQuestions() {
  if (!quizSession) return [];
  return quizSession.section === "written" ? quizSession.paper.written : quizSession.paper.practical;
}

function examSectionCounts(section = quizSession?.section) {
  if (!quizSession) return { total: 0, answered: 0, remaining: 0, flagged: 0 };
  const qs = section === "written" ? quizSession.paper.written : quizSession.paper.practical;
  let answered = 0;
  let flagged = 0;
  for (const q of qs) {
    if (quizSession.answers[q.id] !== undefined) answered++;
    if (quizSession.flagged[q.id]) flagged++;
  }
  return { total: qs.length, answered, remaining: qs.length - answered, flagged };
}

function startExamClock() {
  if (quizTimer) clearInterval(quizTimer);
  quizTimer = setInterval(() => {
    if (!quizSession || quizSession.finished || quizSession.phase !== "section" || quizSession.paused) return;
    quizSession.remainingSeconds = Math.max(0, quizSession.remainingSeconds - 1);
    const clockEl = document.getElementById("quizClock");
    if (clockEl) {
      clockEl.textContent = formatTime(quizSession.remainingSeconds);
      clockEl.parentElement?.classList.toggle("is-low", quizSession.remainingSeconds <= 300);
      clockEl.parentElement?.classList.toggle("is-critical", quizSession.remainingSeconds <= 60);
    }
    updateIsland();
    if (quizSession.remainingSeconds === 0) {
      if (quizSession.section === "written") {
        submitWrittenSection(true);
      } else {
        submitFullExam(true);
      }
    }
  }, 1000);
}

function startExamPaper(paperId) {
  if (!examBank?.papers?.length) return;
  const paper = examBank.papers.find((p) => p.id === paperId) || examBank.papers[0];
  examReviewFilter = "all";
  examShowSi = false;
  quizSession = {
    paper,
    section: "written", // "written" (30 Qs, 40 min) -> "practical" (20 Qs, 40 min)
    phase: "section",   // "section" | "transition" | "result"
    index: 0,
    answers: {},
    flagged: {},
    remainingSeconds: 40 * 60,
    writtenTimeUsed: 0,
    practicalTimeUsed: 0,
    paused: false,
    finished: false,
    result: null
  };
  startExamClock();
  view = "quiz";
  render();
}

function selectExamAnswer(qId, choiceIdx) {
  if (!quizSession || quizSession.finished || quizSession.phase !== "section") return;
  quizSession.answers[qId] = choiceIdx;
  render();
}

function toggleExamFlag(qId) {
  if (!quizSession || quizSession.finished || quizSession.phase !== "section") return;
  quizSession.flagged[qId] = !quizSession.flagged[qId];
  render();
}

function jumpExamQuestion(idx) {
  if (!quizSession || quizSession.finished || quizSession.phase !== "section") return;
  const qs = activeExamQuestions();
  if (idx < 0 || idx >= qs.length) return;
  quizSession.index = idx;
  render();
}

function stepExamQuestion(dir) {
  if (!quizSession || quizSession.finished || quizSession.phase !== "section") return;
  jumpExamQuestion(quizSession.index + dir);
}

function submitWrittenSection(autoTimeout = false) {
  if (!quizSession || quizSession.section !== "written") return;
  quizSession.writtenTimeUsed = 40 * 60 - quizSession.remainingSeconds;
  quizSession.phase = "transition";
  quizSession.autoTimedOutWritten = autoTimeout;
  if (quizTimer) {
    clearInterval(quizTimer);
    quizTimer = null;
  }
  render();
}

function startPracticalSection() {
  if (!quizSession) return;
  quizSession.section = "practical";
  quizSession.phase = "section";
  quizSession.index = 0;
  quizSession.remainingSeconds = 40 * 60;
  quizSession.paused = false;
  startExamClock();
  render();
}

function submitFullExam(autoTimeout = false) {
  if (!quizSession || quizSession.finished) return;
  if (quizSession.section === "practical") {
    quizSession.practicalTimeUsed = 40 * 60 - quizSession.remainingSeconds;
  }
  if (quizTimer) {
    clearInterval(quizTimer);
    quizTimer = null;
  }
  let writtenScore = 0;
  for (const q of quizSession.paper.written) {
    if (quizSession.answers[q.id] === q.answerIndex) writtenScore++;
  }
  let practicalScore = 0;
  for (const q of quizSession.paper.practical) {
    if (quizSession.answers[q.id] === q.answerIndex) practicalScore++;
  }
  const writtenPassed = writtenScore >= 18;
  const practicalPassed = practicalScore >= 12;
  const passed = writtenPassed && practicalPassed;
  const totalScore = writtenScore + practicalScore;
  const totalQuestions = quizSession.paper.written.length + quizSession.paper.practical.length;
  const timeUsed = quizSession.writtenTimeUsed + quizSession.practicalTimeUsed;
  const xpEarned = totalScore * 5;

  quizSession.finished = true;
  quizSession.phase = "result";
  quizSession.result = {
    paperId: quizSession.paper.id,
    writtenScore,
    writtenTotal: 30,
    writtenPassed,
    practicalScore,
    practicalTotal: 20,
    practicalPassed,
    passed,
    totalScore,
    totalQuestions,
    timeUsed,
    xpEarned,
    autoTimeout,
    completedAt: new Date().toISOString()
  };

  // Persist locally & sync with backend API
  const hist = getExamHistory();
  hist.unshift({
    id: "local-" + Date.now(),
    paperId: quizSession.paper.id,
    score: totalScore,
    total: totalQuestions,
    writtenScore,
    writtenTotal: 30,
    practicalScore,
    practicalTotal: 20,
    passed,
    timeUsed,
    createdAt: quizSession.result.completedAt
  });
  saveExamHistory(hist);
  localStorage.setItem(
    "mk-last-quiz-" + (currentUser?.id || "guest"),
    JSON.stringify({ score: totalScore, total: totalQuestions, completedAt: quizSession.result.completedAt, timeUsed })
  );

  apiRequest("/quiz-attempts", {
    method: "POST",
    body: JSON.stringify({
      score: totalScore,
      total: totalQuestions,
      timeUsed,
      paperId: quizSession.paper.id,
      writtenScore,
      writtenTotal: 30,
      practicalScore,
      practicalTotal: 20,
      passed
    })
  })
    .then((res) => {
      if (currentUser && res) {
        currentUser.quizXp = Number(currentUser.quizXp || 0) + xpEarned;
        currentUser.xp = Number(res.xp ?? currentUser.xp);
        currentUser.streakDays = Number(res.streakDays ?? currentUser.streakDays);
        updateUserBadge();
      }
    })
    .catch(() => {});

  render();
}

function endQuiz() {
  if (quizTimer) {
    clearInterval(quizTimer);
    quizTimer = null;
  }
  quizSession = null;
  view = "quiz";
  render();
}

function renderExamView() {
  const v = $("#view");
  if (!examBank?.papers?.length) {
    v.innerHTML = '<div class="empty">Loading 12 Official SSW Logistics Warehousing CBT Mock Papers (600 questions)…</div>';
    updateIsland();
    return;
  }

  // 1. Exam Papers Hub (12 Full Papers x 50 Questions)
  if (!quizSession) {
    const history = getExamHistory();
    const bestByPaper = {};
    for (const h of history) {
      if (!h.paperId) continue;
      const prev = bestByPaper[h.paperId];
      if (!prev || h.score > prev.score || (h.passed && !prev.passed)) {
        bestByPaper[h.paperId] = h;
      }
    }
    const passedCount = Object.values(bestByPaper).filter((x) => x.passed).length;

    v.innerHTML = `<section class="study-intro">
        <div>
          <span class="eyebrow">CLASSNK &amp; MLIT · OFFICIAL CBT STRUCTURE</span>
          <h2>SSW (i) Logistics Warehousing Mock Exams</h2>
          <p>Specified Skilled Worker (i) Evaluation Exam (ගබඩා සහ ප්‍රවාහන අංශය) · 12 Full Papers × 50 Questions = 600 Questions · Live Exam Mode in Japanese with Furigana ONLY.</p>
        </div>
        <div class="study-total"><b class="tabular">12</b><span>full papers</span></div>
      </section>

      <div class="fc-summary-bar">
        <div class="stat"><span class="stat-label">Written (学科)</span><strong>30 Qs · 40m</strong><small>Pass ≥ 18/30 (60%)</small></div>
        <div class="stat"><span class="stat-label">Practical (実技)</span><strong>20 Qs · 40m</strong><small>Pass ≥ 12/20 (60%)</small></div>
        <div class="stat"><span class="stat-label">Exam Language</span><strong>日本語のみ</strong><small>Furigana enabled</small></div>
        <div class="stat"><span class="stat-label">Papers Passed</span><strong>${passedCount}/12</strong><small>+5 XP per correct answer</small></div>
      </div>

      <div class="exam-rule-note">
        <strong>Passing Rule:</strong> You must pass <b>both sections individually</b> (Written ≥ 18/30 AND Practical ≥ 12/20) to achieve overall 合格 (PASS). Practical tests diagrams, safety/5S, workplace math, forklift safety concepts, and safe lifting.
      </div>

      <div class="exam-paper-grid">
        ${examBank.papers
          .map((paper) => {
            const best = bestByPaper[paper.id];
            const statusClass = best ? (best.passed ? "is-pass" : "is-retry") : "is-new";
            const statusText = best ? (best.passed ? "合格 · PASSED" : "不合格 · RETRY") : "未受験 · READY";
            return `<article class="exam-paper-card ${statusClass}">
              <div class="exam-paper-head">
                <span class="exam-paper-num">PAPER ${String(paper.number).padStart(2, "0")}</span>
                <span class="exam-paper-status ${statusClass}">${statusText}</span>
              </div>
              <h3 class="exam-paper-ja">${toRubyHtml(paper.titleJa)}</h3>
              <p class="exam-paper-si">${esc(paper.titleSi)} · 50 Qs (30 Written + 20 Practical)</p>
              ${
                best
                  ? `<div class="exam-paper-best">
                      <span>学科: <b>${best.writtenScore ?? "-"}/30</b></span>
                      <span>実技: <b>${best.practicalScore ?? "-"}/20</b></span>
                      <span>計: <b>${best.score}/50</b></span>
                    </div>`
                  : `<div class="exam-paper-best"><span>学科 30問 (40分)</span><span>実技 20問 (40分)</span></div>`
              }
              <button class="primary exam-start-btn" onclick="startExamPaper('${esc(paper.id)}')">${best ? "再挑戦する (Retake) →" : "試験を開始する (Start) →"}</button>
            </article>`;
          })
          .join("")}
      </div>`;
    updateIsland();
    return;
  }

  // 2. Section Transition Screen (Written -> Practical) — Japanese with Furigana ONLY
  if (quizSession.phase === "transition") {
    const wCounts = examSectionCounts("written");
    v.innerHTML = `<div class="panel exam-cbt-panel">
        <div class="exam-cbt-badge">${toRubyHtml("第1部(だいいちぶ)：学科試験(がっかしけん) 終了(しゅうりょう)")}</div>
        <h2 class="exam-cbt-heading">${toRubyHtml(quizSession.autoTimedOutWritten ? "学科試験(がっかしけん)の制限時間(せいげんじかん)が終了(しゅうりょう)しました" : "学科試験(がっかしけん)を提出(ていしゅつ)しました")}</h2>
        <p class="exam-cbt-lead">${toRubyHtml("次(つぎ)は第2部(だいにぶ)「実技試験(じつぎしけん)（20問(もん)・40分(ぷん)）」に進(すす)みます。準備(じゅんび)ができたら開始(かいし)ボタンを押(お)してください。")}</p>
        <div class="quiz-result-row"><span>${toRubyHtml("学科試験(がっかしけん) 回答済(かいとうず)み")}</span><b class="tabular">${wCounts.answered} / ${wCounts.total}</b></div>
        <div class="quiz-result-row"><span>${toRubyHtml("学科試験(がっかしけん) 所要(しょよう)時間(じかん)")}</span><b class="tabular">${formatTime(quizSession.writtenTimeUsed)}</b></div>
        <div class="quiz-result-row"><span>${toRubyHtml("次(つぎ)の試験(しけん)内容(ないよう)")}</span><b>${toRubyHtml("実技試験(じつぎしけん) 20問(もん)（制限時間(せいげんじかん) 40:00）")}</b></div>
        <div class="toolbar">
          <button class="primary" onclick="startPracticalSection()">${toRubyHtml("第2部(だいにぶ) 実技試験(じつぎしけん)を開始(かいし)する →")}</button>
        </div>
      </div>`;
    updateIsland();
    return;
  }

  // 3. Official Result & Detailed Answer Review Screen
  if (quizSession.finished && quizSession.result) {
    const r = quizSession.result;
    const allQs = [...quizSession.paper.written, ...quizSession.paper.practical];
    const filteredQs = allQs.filter((q) => {
      const correct = quizSession.answers[q.id] === q.answerIndex;
      if (examReviewFilter === "wrong") return !correct;
      if (examReviewFilter === "written") return q.section === "written";
      if (examReviewFilter === "practical") return q.section === "practical";
      return true;
    });

    v.innerHTML = `<div class="panel exam-result-card ${r.passed ? "is-pass" : "is-fail"}">
        <div class="exam-verdict-row">
          <div>
            <span class="eyebrow">${esc(quizSession.paper.titleEn)} · CLASSNK &amp; MLIT FORMAT</span>
            <h2 class="exam-verdict-title">${r.passed ? "合格 · EXAM PASSED 🎉" : "不合格 · NOT PASSED"}</h2>
            <p class="stat-label">${r.passed ? "Both Written (≥18/30) and Practical (≥12/20) passing marks achieved." : "Both sections must individually reach 60% or above (Written ≥18/30 & Practical ≥12/20)."}</p>
          </div>
          <div class="exam-verdict-score tabular">${r.totalScore}<small>/50</small></div>
        </div>

        <div class="exam-section-scores">
          <div class="exam-sec-box ${r.writtenPassed ? "pass" : "fail"}">
            <span>Written Section · 学科試験</span>
            <strong class="tabular">${r.writtenScore} / ${r.writtenTotal} (${Math.round((r.writtenScore / 30) * 100)}%)</strong>
            <small>${r.writtenPassed ? "✓ 合格 PASS (≥18)" : "✕ 不合格 FAIL (Need 18+)"} · ${formatTime(quizSession.writtenTimeUsed)}</small>
          </div>
          <div class="exam-sec-box ${r.practicalPassed ? "pass" : "fail"}">
            <span>Practical Section · 実技試験</span>
            <strong class="tabular">${r.practicalScore} / ${r.practicalTotal} (${Math.round((r.practicalScore / 20) * 100)}%)</strong>
            <small>${r.practicalPassed ? "✓ 合格 PASS (≥12)" : "✕ 不合格 FAIL (Need 12+)"} · ${formatTime(quizSession.practicalTimeUsed)}</small>
          </div>
        </div>

        <div class="quiz-result-row"><span>XP Earned (synced to Dashboard &amp; Leaderboard)</span><b class="tabular">+${r.xpEarned} XP</b></div>
        <div class="quiz-result-row"><span>Total Time Used</span><b class="tabular">${formatTime(r.timeUsed)}</b></div>

        <div class="toolbar">
          <button class="primary" onclick="startExamPaper('${esc(quizSession.paper.id)}')">Retake Paper</button>
          <button class="secondary" onclick="endQuiz()">All 12 Exam Papers</button>
        </div>
      </div>

      <section class="panel exam-review-panel">
        <div class="exam-review-top">
          <h3>Answer Review (${filteredQs.length} questions)</h3>
          <div class="exam-review-controls">
            <button class="fc-seg-btn ${examReviewFilter === "all" ? "active" : ""}" onclick="setExamReviewFilter('all')">All (50)</button>
            <button class="fc-seg-btn ${examReviewFilter === "wrong" ? "active" : ""}" onclick="setExamReviewFilter('wrong')">Wrong (${50 - r.totalScore})</button>
            <button class="fc-seg-btn ${examReviewFilter === "written" ? "active" : ""}" onclick="setExamReviewFilter('written')">Written (30)</button>
            <button class="fc-seg-btn ${examReviewFilter === "practical" ? "active" : ""}" onclick="setExamReviewFilter('practical')">Practical (20)</button>
            <button class="fc-seg-btn ${examShowSi ? "active" : ""}" onclick="toggleExamShowSi()">${examShowSi ? "Hide Sinhala" : "Show Sinhala"}</button>
          </div>
        </div>
        <div class="exam-review-list">
          ${
            filteredQs
              .map((q) => {
                const userAns = quizSession.answers[q.id];
                const isOk = userAns === q.answerIndex;
                const qNum =
                  q.section === "written"
                    ? "学科 Q" + (quizSession.paper.written.indexOf(q) + 1)
                    : "実技 Q" + (quizSession.paper.practical.indexOf(q) + 1);
                return `<article class="exam-review-item ${isOk ? "is-ok" : "is-wrong"}">
                  <div class="exam-review-meta">
                    <strong>${qNum} · ${toRubyHtml(q.domainJa)}</strong>
                    <span>${isOk ? "✓ 正解" : "✕ 不正解"} · PDF P.${q.pdfPage}</span>
                  </div>
                  ${q.image ? `<img class="exam-review-img" src="${esc(q.image)}" loading="lazy" alt="Exam figure" onerror="this.remove()">` : ""}
                  <p class="exam-review-stem">${toRubyHtml(q.stemJa)}</p>
                  <p class="exam-review-ans">あなたの回答: <b>${userAns !== undefined ? CHOICE_KANA[userAns] + ". " + toRubyHtml(q.choices[userAns]) : "未回答"}</b></p>
                  ${!isOk ? `<p class="exam-review-correct">正解: <b>${CHOICE_KANA[q.answerIndex]}. ${toRubyHtml(q.choices[q.answerIndex])}</b></p>` : ""}
                  <p class="exam-review-exp">${toRubyHtml(q.explanationJa)}</p>
                  ${examShowSi && q.explanationSi ? `<p class="exam-review-si">${esc(q.explanationSi)}</p>` : ""}
                </article>`;
              })
              .join("") || '<div class="empty">No questions in this filter.</div>'
          }
        </div>
      </section>`;
    updateIsland();
    return;
  }

  // 4. ACTIVE CBT EXAM SCREEN — STRICTLY JAPANESE WITH FURIGANA ONLY!
  const qs = activeExamQuestions();
  const q = qs[quizSession.index];
  const counts = examSectionCounts();
  const chosen = quizSession.answers[q.id];
  const isFlagged = !!quizSession.flagged[q.id];
  const isWritten = quizSession.section === "written";
  const secHeaderJa = isWritten
    ? "第1部(だいいちぶ)：学科試験(がっかしけん)（30問(もん)・40分(ぷん)・合格(ごうかく)18問以上(もんいじょう)）"
    : "第2部(だいにぶ)：実技試験(じつぎしけん)（20問(もん)・40分(ぷん)・合格(ごうかく)12問以上(もんいじょう)）";
  const timeLow = quizSession.remainingSeconds <= 300;
  const timeCrit = quizSession.remainingSeconds <= 60;

  v.innerHTML = `<div class="exam-cbt-shell">
      <div class="exam-cbt-topbar">
        <div class="exam-cbt-title-block">
          <div class="exam-cbt-paper-label">${toRubyHtml(quizSession.paper.titleJa)}</div>
          <div class="exam-cbt-section-label">${toRubyHtml(secHeaderJa)}</div>
        </div>
        <div class="exam-cbt-hud">
          <div class="exam-hud-stat"><small>${toRubyHtml("回答済(かいとうず)")}</small><b class="tabular">${counts.answered}/${counts.total}</b></div>
          <div class="exam-hud-stat"><small>${toRubyHtml("残(のこ)り")}</small><b class="tabular">${counts.remaining}</b></div>
          <div class="exam-hud-stat"><small>${toRubyHtml("見直(みなお)し")}</small><b class="tabular">${counts.flagged}</b></div>
          <div class="exam-hud-clock ${timeLow ? "is-low" : ""} ${timeCrit ? "is-critical" : ""}">
            <small>${toRubyHtml("残(のこ)り時間(じかん)")}</small>
            <b id="quizClock" class="tabular">${formatTime(quizSession.remainingSeconds)}</b>
          </div>
        </div>
      </div>

      <div class="progress-track"><span style="width:${Math.round((counts.answered / counts.total) * 100)}%"></span></div>

      <div class="exam-cbt-layout">
        <div class="panel exam-cbt-question-panel">
          <div class="exam-q-head">
            <span class="exam-q-num">${toRubyHtml(`問(とい) ${quizSession.index + 1} / ${counts.total}`)}</span>
            <span class="exam-q-domain">${toRubyHtml(q.domainJa)}</span>
            <button class="exam-flag-btn ${isFlagged ? "is-flagged" : ""}" onclick="toggleExamFlag('${esc(q.id)}')">
              ${isFlagged ? "★ " : "☆ "}${toRubyHtml("見直(みなお)し")}
            </button>
          </div>

          ${
            q.image
              ? `<figure class="exam-q-figure"><img src="${esc(q.image)}" decoding="async" alt="試験図版" onerror="this.remove()"></figure>`
              : ""
          }

          <h3 class="exam-q-stem">${toRubyHtml(q.stemJa)}</h3>

          <div class="exam-choices">
            ${q.choices
              .map(
                (ch, ci) => `<button class="exam-choice-btn ${chosen === ci ? "selected" : ""}" onclick="selectExamAnswer('${esc(q.id)}', ${ci})">
                  <span class="exam-choice-key">${CHOICE_KANA[ci]}</span>
                  <span class="exam-choice-text">${toRubyHtml(ch)}</span>
                </button>`
              )
              .join("")}
          </div>

          <div class="exam-q-actions">
            <button class="secondary" onclick="stepExamQuestion(-1)" ${quizSession.index === 0 ? "disabled" : ""}>← ${toRubyHtml("前(まえ)の問題(もんだい)")}</button>
            ${
              quizSession.index < counts.total - 1
                ? `<button class="primary" onclick="stepExamQuestion(1)">${toRubyHtml("次(つぎ)の問題(もんだい)")} →</button>`
                : isWritten
                ? `<button class="primary" onclick="submitWrittenSection(false)">${toRubyHtml("学科(がっか)を終了(しゅうりょう)して実技(じつぎ)へ")} →</button>`
                : `<button class="primary" onclick="submitFullExam(false)">${toRubyHtml("試験(しけん)を提出(ていしゅつ)する")}</button>`
            }
          </div>
        </div>

        <aside class="panel exam-nav-panel" aria-label="問題ナビゲーション">
          <div class="exam-nav-head">
            <strong>${toRubyHtml("問題(もんだい)一覧(いちらん)")}</strong>
            <span>${toRubyHtml(`回答(かいとう) ${counts.answered}・残(のこ)り ${counts.remaining}`)}</span>
          </div>
          <div class="exam-nav-grid">
            ${qs
              .map((item, idx) => {
                const isCur = idx === quizSession.index;
                const isAns = quizSession.answers[item.id] !== undefined;
                const isFlg = !!quizSession.flagged[item.id];
                return `<button class="exam-nav-cell ${isCur ? "is-current" : ""} ${isAns ? "is-answered" : ""} ${isFlg ? "is-flagged" : ""}" onclick="jumpExamQuestion(${idx})">${idx + 1}</button>`;
              })
              .join("")}
          </div>
          <div class="exam-nav-legend">
            <span><i class="dot cur"></i>${toRubyHtml("現在(げんざい)")}</span>
            <span><i class="dot ans"></i>${toRubyHtml("回答済(かいとうず)")}</span>
            <span><i class="dot flg"></i>${toRubyHtml("見直(みなお)し")}</span>
          </div>
          <div class="exam-nav-submit">
            ${
              isWritten
                ? `<button class="primary" style="width:100%" onclick="submitWrittenSection(false)">${toRubyHtml("学科(がっか)を提出(ていしゅつ) → 実技(じつぎ)へ")}</button>`
                : `<button class="primary" style="width:100%" onclick="submitFullExam(false)">${toRubyHtml("全(すべ)て終了(しゅうりょう)して採点(さいてん)")}</button>`
            }
            <button class="secondary" style="width:100%;margin-top:8px" onclick="endQuiz()">${toRubyHtml("試験(しけん)を中断(ちゅうだん)する")}</button>
          </div>
        </aside>
      </div>
    </div>`;
  updateIsland();
}

window.startExamPaper = startExamPaper;
window.selectExamAnswer = selectExamAnswer;
window.toggleExamFlag = toggleExamFlag;
window.jumpExamQuestion = jumpExamQuestion;
window.stepExamQuestion = stepExamQuestion;
window.submitWrittenSection = submitWrittenSection;
window.startPracticalSection = startPracticalSection;
window.submitFullExam = submitFullExam;
window.setExamReviewFilter = (f) => {
  examReviewFilter = f;
  render();
};
window.toggleExamShowSi = () => {
  examShowSi = !examShowSi;
  render();
};

// ---------- DYNAMIC ISLAND ----------
function updateIsland() {
  let el = document.getElementById("dynamicIsland");
  if (!el) return;
  let activeQuiz = !!(quizSession && !quizSession.finished && quizSession.phase === "section");
  let activeFc = !!(view === "flashcards" && fcSession && !fcSession.finished);
  let set = (id, val) => {
    let n = document.getElementById(id);
    if (n) n.textContent = val;
  };
  el.classList.toggle("island-expanded-mode", islandExpanded);
  el.classList.toggle("island-compact", (activeQuiz || activeFc) && !islandExpanded);
  el.classList.toggle("island-done", !!(quizSession && quizSession.finished) || !!(fcSession && fcSession.finished));
  el.classList.toggle("island-paused", !!(activeQuiz && quizSession.paused));

  if (activeFc) {
    const rem = Math.max(0, fcSession.queue.length - fcSession.index);
    const done = fcSession.reviewedInSession;
    const pct = Math.round(((fcSession.index + 1) / fcSession.queue.length) * 100);
    set("islandTitle", "Exam flashcards");
    set("islandMode", "+" + fcSession.xpGained + " XP");
    set("islandTime", "+" + fcSession.xpGained + " XP");
    set("islandMiniTime", `${fcSession.index + 1}/${fcSession.queue.length} · +${fcSession.xpGained} XP`);
    set("islandRemaining", rem);
    set("islandDone", done);
    let bar = document.getElementById("islandProgress");
    if (bar) bar.style.width = pct + "%";
    let pause = document.getElementById("islandPause");
    if (pause) pause.textContent = "Decks";
    return;
  }

  if (activeQuiz) {
    const counts = examSectionCounts();
    const time = formatTime(quizSession.remainingSeconds);
    const secLabel = quizSession.section === "written" ? "学科試験" : "実技試験";
    set("islandTitle", secLabel);
    set("islandMode", quizSession.paused ? "一時停止" : "受験中");
    set("islandTime", time);
    set("islandMiniTime", `${secLabel} ${time}`);
    set("islandRemaining", counts.remaining);
    set("islandDone", counts.answered);
    let bar = document.getElementById("islandProgress");
    if (bar) bar.style.width = Math.round((counts.answered / counts.total) * 100) + "%";
    let pause = document.getElementById("islandPause");
    if (pause) pause.textContent = quizSession.paused ? "再開" : "一時停止";
    return;
  }

  set("islandTitle", quizSession?.finished ? "試験終了" : "Study session");
  set("islandMode", quizSession?.finished ? "DONE" : "READY");
  set("islandTime", `${stats().totalXp} XP`);
  set("islandMiniTime", `${stats().totalXp} XP`);
  set("islandRemaining", 0);
  set("islandDone", getDone().length);
  let bar = document.getElementById("islandProgress");
  if (bar) bar.style.width = stats().pages ? Math.round((getDone().length / stats().pages) * 100) + "%" : "0%";
  let pause = document.getElementById("islandPause");
  if (pause) pause.textContent = "Expand";
}
function toggleQuizPause() {
  if (view === "flashcards" && fcSession && !fcSession.finished) {
    exitFlashcardSession();
    return;
  }
  if (!quizSession || quizSession.finished || quizSession.phase !== "section") {
    islandExpanded = !islandExpanded;
    updateIsland();
    return;
  }
  quizSession.paused = !quizSession.paused;
  updateIsland();
}
(function bindIsland() {
  const core = document.querySelector(".island-core");
  const exp = document.getElementById("islandExpand");
  const pause = document.getElementById("islandPause");
  if (core)
    core.addEventListener("click", () => {
      islandExpanded = !islandExpanded;
      updateIsland();
    });
  if (exp)
    exp.addEventListener("click", () => {
      islandExpanded = false;
      updateIsland();
    });
  if (pause) pause.addEventListener("click", toggleQuizPause);
})();
window.toggleQuizPause = toggleQuizPause;
window.startQuiz = () => startExamPaper("paper-01");
window.endQuiz = endQuiz;

// ---------- LESSON DETAIL ----------
function partCards() {
  let names = {
    "part-01": ["Warehouse Fundamentals", "📦"],
    "part-02": ["Work Manual", "📋"],
    "part-03": ["Occupational Safety & Health", "🦺"],
    "part-04": ["Forklift Work Standards", "🚜"]
  };
  return Object.entries(names)
    .map(
      ([id, x]) =>
        `<button class="part-card" onclick="lessonPartFilter='${id}';nav('lessons')"><span class="part-icon">${x[1]}</span><span><b>${x[0]}</b><small>${
          lessons.filter((l) => matchesPartFilter(l.part, id)).length
        } imported modules</small></span></button>`
    )
    .join("");
}
function openLesson(id) {
  active = lessons.find((l) => l.id === id);
  if (!active) return;
  view = "detail";
  render();
}
window.setLessonSearch = (q) => {
  lessonSearch = q;
  render();
};
window.setLessonPart = (p) => {
  lessonPartFilter = p;
  render();
};
window.nav = nav;
window.openLesson = openLesson;

function detail() {
  let l = active;
  if (!l) return;
  $("#pageTitle").textContent = l.title;
  let v = $("#view");
  let done = getDone();
  function imgsFor(p) {
    // Authentic PDF images ONLY from data/pdf-image-map.json — zero generated SVGs or external URLs!
    const key = String(p.pdf_page ?? p.printed_page ?? "");
    const mapped = (pdfImageMap && pdfImageMap[key]) || [];
    if (mapped.length) return mapped;
    // Fallback to verified local numbered repo images only (never generated/*.svg or http links)
    let m = p.image_mapping || {};
    let values = Array.isArray(m.repo_images) ? m.repo_images : [];
    return [
      ...new Set(
        values
          .map((r) => String(r))
          .filter((r) => !r.includes("generated/") && !r.startsWith("http") && /\/\d+\.(jpg|png)$/i.test(r))
          .map((r) => {
            if (r.startsWith("./")) r = r.slice(2);
            if (r.startsWith("/")) r = r.slice(1);
            if (r.startsWith("images/")) r = "public/" + r;
            return "./" + r;
          })
      )
    ].map((src) => ({ src, labelJa: "", labelSi: "" }));
  }
  function topic(sec) {
    return (
      '<section class="study-topic"><h4>' +
      esc(sec.heading_en || sec.heading_ja || "Study topic") +
      (sec.heading_ja && sec.heading_en ? " <small>" + esc(sec.heading_ja) + "</small>" : "") +
      "</h4>" +
      (sec.heading_si ? '<p class="stat-label">' + esc(sec.heading_si) + "</p>" : "") +
      '<div class="topic-ja"><p>' +
      toRubyHtml(sec.source_ja || "") +
      "</p></div>" +
      '<div class="topic-reading"><p>' +
      esc(sec.romaji || sec.heading_romaji || "") +
      '</p></div><div class="topic-translation"><div><p>' +
      esc(sec.english || "") +
      '</p></div><div class="sinhala-copy"><p>' +
      esc(sec.sinhala || "") +
      "</p></div></div></section>"
    );
  }
  v.innerHTML =
    '<div class="study-detail-top"><button class="back-library" onclick="nav(\'lessons\')">‹ Study library</button><span class="study-count">' +
    l.pages.length +
    ' pages</span></div><section class="detail-hero"><span class="eyebrow">' +
    esc(l.part.toUpperCase()) +
    "</span><h2>" +
    esc(l.title) +
    '</h2><p>Original Japanese with Furigana, Romaji, English translation, Sinhala explanation, and authentic PDF textbook images only.</p><div class="detail-stats"><span>🇯🇵 Japanese + Furigana</span><span>🔤 Romaji</span><span>🇬🇧 English</span><span>🇱🇰 Sinhala</span></div></section><div class="page-stack">' +
    l.pages
      .map((p, i) => {
        let ja = pageText(p, "ja") || p.source_ja || "";
        let en = pageText(p, "en");
        let si = pageText(p, "si");
        let ro = pageText(p, "romaji");
        let fu = p.furigana || p.source_furigana || "";
        let imgs = imgsFor(p);
        let id = l.id + "-" + i;
        let isDone = done.includes(id);
        let sections = p.sections || [];
        return (
          '<article class="study-page ' +
          (isDone ? "is-done" : "") +
          '"><div class="page-heading"><div><small>TEXTBOOK PAGE ' +
          String(p.printed_page ?? p.pdf_page ?? i + 1).padStart(2, "0") +
          "</small><h3>" +
          (sections.length ? sections.length + " learning topics" : "Study notes") +
          '</h3></div><button class="page-done" onclick="markDone(\'' +
          esc(id) +
          "')\">" +
          (isDone ? "✓ Done" : "+ Mark done") +
          "</button></div>" +
          (imgs.length
            ? '<figure class="topic-visual topic-gallery">' +
              imgs
                .map(
                  (img, k) =>
                    '<div class="topic-img-card"><img src="' +
                    esc(img.src) +
                    '" loading="lazy" decoding="async" alt="Original textbook image ' +
                    (k + 1) +
                    " for page " +
                    esc(p.printed_page ?? p.pdf_page) +
                    '" onerror="this.parentElement.remove()">' +
                    (img.labelJa || img.labelSi
                      ? '<div class="topic-img-cap">' +
                        (img.labelJa ? '<b>' + toRubyHtml(img.labelJa) + "</b>" : "") +
                        (img.labelSi ? '<small>' + esc(img.labelSi) + "</small>" : "") +
                        "</div>"
                      : "") +
                    "</div>"
                )
                .join("") +
              "<figcaption>Authentic textbook figures (" + imgs.length + " PDF image" + (imgs.length === 1 ? "" : "s") + ")</figcaption></figure>"
            : "") +
          (sections.length
            ? sections.map(topic).join("")
            : '<div class="topic-ja"><p>' +
              toRubyHtml(fu || ja) +
              "</p></div>" +
              '<div class="topic-reading"><p>' +
              esc(ro) +
              '</p></div><div class="topic-translation"><div><p>' +
              esc(en) +
              '</p></div><div class="sinhala-copy"><p>' +
              esc(si) +
              "</p></div></div>") +
          (p.visuals?.length
            ? '<div class="visual-caption"><b>Key visual / source reference</b>' + p.visuals.map((x) => "<p>" + esc(x.description) + "</p>").join("") + "</div>"
            : "") +
          "</article>"
        );
      })
      .join("") +
    '</div><button class="back-library bottom-back" onclick="nav(\'lessons\')">‹ Back to all study modules</button>';
}
window.markDone = (id) => {
  let a = getDone();
  if (!a.includes(id)) a.push(id);
  saveDone(a);
  render();
};
const oldRender = render;
render = function () {
  if (view === "detail") {
    detail();
    return;
  }
  oldRender();
};

// ---------- API & AUTH ----------
function apiUrl(path) {
  return (window.MK_API_BASE || "").replace(/\/$/, "") + "/api" + path;
}
async function apiRequest(path, options = {}) {
  if (!window.MK_API_BASE || window.MK_API_BASE.includes("REPLACE_WITH")) throw new Error("Cloudflare API URL is not configured yet.");
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (authToken) headers.Authorization = "Bearer " + authToken;
  const response = await fetch(apiUrl(path), { ...options, headers });
  let data = {};
  try {
    data = await response.json();
  } catch {}
  if (!response.ok) throw new Error(data.error || "Request failed");
  return data;
}
function doneKey() {
  return "mk-done-" + (currentUser?.id || "guest");
}
function getDone() {
  try {
    return JSON.parse(localStorage.getItem(doneKey()) || "[]");
  } catch {
    return [];
  }
}
function saveDone(ids) {
  localStorage.setItem(doneKey(), JSON.stringify(ids));
  apiRequest("/progress", { method: "PUT", body: JSON.stringify({ completedIds: ids }) })
    .then((res) => {
      if (currentUser && res) {
        currentUser.xp = Number(res.xp ?? currentUser.xp);
        currentUser.streakDays = Number(res.streakDays ?? currentUser.streakDays);
        updateUserBadge();
      }
    })
    .catch((err) => console.warn("Progress sync pending:", err.message));
}
function showAuth(message = "") {
  document.getElementById("authGate").hidden = false;
  document.querySelector(".app-shell").hidden = true;
  const e = document.getElementById("authError");
  if (e) e.textContent = message;
  const cfg = document.getElementById("apiSetupHint");
  if (cfg) cfg.hidden = !!(window.MK_API_BASE && !window.MK_API_BASE.includes("REPLACE_WITH"));
}
async function restoreAuth() {
  if (!authToken) return false;
  try {
    const me = await apiRequest("/me");
    currentUser = me.user;
    const [p, fc, qa] = await Promise.all([
      apiRequest("/progress"),
      apiRequest("/flashcards/progress").catch(() => null),
      apiRequest("/quiz-attempts").catch(() => null)
    ]);
    localStorage.setItem(doneKey(), JSON.stringify(p.completedIds || []));
    if (qa && Array.isArray(qa.attempts) && qa.attempts.length) {
      const localHist = getExamHistory();
      const byKey = new Map();
      for (const item of [...qa.attempts, ...localHist]) {
        const k = item.id || `${item.paperId}-${item.createdAt}`;
        if (!byKey.has(k)) byKey.set(k, item);
      }
      saveExamHistory([...byKey.values()]);
    }
    if (fc && fc.states) {
      const localStates = getFcStates();
      const merged = { ...localStates, ...fc.states };
      localStorage.setItem(fcKey(), JSON.stringify(merged));
      if (Object.keys(merged).length > Object.keys(fc.states).length) {
        apiRequest("/flashcards/progress", { method: "PUT", body: JSON.stringify({ states: merged }) }).catch(() => {});
      }
      currentUser.xp = Number(fc.totalXp ?? currentUser.xp);
      currentUser.flashcardXp = Number(fc.flashcardXp ?? currentUser.flashcardXp);
      currentUser.flashcardsMastered = Number(fc.masteredCount ?? currentUser.flashcardsMastered);
      currentUser.streakDays = Number(fc.streakDays ?? currentUser.streakDays);
    }
    document.getElementById("authGate").hidden = true;
    document.querySelector(".app-shell").hidden = false;
    updateUserBadge();
    return true;
  } catch {
    authToken = "";
    localStorage.removeItem("mk-auth-token");
    currentUser = null;
    return false;
  }
}
function updateUserBadge() {
  const n = document.getElementById("userBadge");
  if (n && currentUser) {
    const xpText = Number(currentUser.xp || 0) + " XP";
    n.innerHTML =
      '<span class="user-avatar">' +
      esc(currentUser.avatar) +
      "</span><span><b>" +
      esc(currentUser.displayName) +
      "</b><small class=\"tabular\">" +
      esc(xpText) +
      '</small></span><button class="logout-btn" onclick="changePassword()">Password</button><button class="logout-btn" onclick="logout()">Sign out</button>';
  }
}
async function changePassword() {
  const currentPassword = prompt("Enter your current password");
  if (!currentPassword) return;
  const newPassword = prompt("Enter a new password (at least 12 characters)");
  if (!newPassword) return;
  try {
    await apiRequest("/change-password", { method: "POST", body: JSON.stringify({ currentPassword, newPassword }) });
    alert("Password updated successfully.");
  } catch (e) {
    alert(e.message);
  }
}

// Learner profile selector: choosing an avatar reveals that learner's password field.
const learnerProfiles = {
  haruto: { name: "Haruto", avatar: "./data/haruto.png" },
  hina: { name: "Hina", avatar: "./data/hina.png" },
  sakura: { name: "Sakura", avatar: "./data/sakura.png" }
};
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const passwordPanel = document.getElementById("passwordPanel");
const loginButton = loginForm.querySelector('button[type="submit"]');
function selectLearner(username) {
  const profile = learnerProfiles[username];
  if (!profile) return;
  usernameInput.value = username;
  document.querySelectorAll(".learner-option").forEach((button) => {
    const selected = button.dataset.learner === username;
    button.setAttribute("aria-pressed", String(selected));
  });
  document.getElementById("selectedLearnerAvatar").src = profile.avatar;
  document.getElementById("selectedLearnerAvatar").alt = profile.name + " avatar";
  document.getElementById("selectedLearnerName").textContent = profile.name;
  passwordPanel.hidden = false;
  loginButton.disabled = false;
  document.getElementById("authError").textContent = "";
  passwordInput.value = "";
  passwordInput.focus({ preventScroll: true });
}
document.querySelectorAll(".learner-option").forEach((button) => {
  button.addEventListener("click", () => selectLearner(button.dataset.learner));
});
document.getElementById("changeLearner").addEventListener("click", () => {
  usernameInput.value = "";
  passwordInput.value = "";
  passwordPanel.hidden = true;
  loginButton.disabled = true;
  document.querySelectorAll(".learner-option").forEach((button) => button.setAttribute("aria-pressed", "false"));
  document.querySelector(".learner-option").focus();
});
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const error = document.getElementById("authError");
  const username = String(usernameInput.value || "").trim().toLowerCase();
  const password = String(passwordInput.value || "");
  if (!learnerProfiles[username]) {
    error.textContent = "Please choose your learner avatar first.";
    return;
  }
  error.textContent = "";
  loginButton.disabled = true;
  loginButton.textContent = "Signing in…";
  try {
    const result = await apiRequest("/login", {
      method: "POST",
      body: JSON.stringify({ username, password })
    });
    authToken = result.token;
    localStorage.setItem("mk-auth-token", authToken);
    currentUser = result.user;
    await load();
    loginForm.reset();
    passwordPanel.hidden = true;
    loginButton.disabled = true;
    document.querySelectorAll(".learner-option").forEach((button) => button.setAttribute("aria-pressed", "false"));
  } catch (err) {
    error.textContent = err.message || "Unable to sign in.";
    loginButton.disabled = false;
  } finally {
    loginButton.textContent = "Continue to study space";
  }
});

async function logout() {
  try {
    await apiRequest("/logout", { method: "POST" });
  } catch (err) {}
  authToken = "";
  currentUser = null;
  fcSession = null;
  localStorage.removeItem("mk-auth-token");
  showAuth("You have signed out.");
}
window.logout = logout;
window.changePassword = changePassword;

async function renderLeaderboard() {
  const v = document.getElementById("view");
  v.innerHTML = '<div class="panel"><span class="eyebrow">TEAM PROGRESS</span><h2>Leaderboard</h2><p>Loading learner rankings…</p></div>';
  try {
    const result = await apiRequest("/leaderboard");
    const rows = result.leaderboard || [];
    v.innerHTML =
      '<div class="study-intro"><div><span class="eyebrow">THREE INVITED LEARNERS</span><h2>Learning together 🏆</h2><p>Rankings update live as learners complete study pages, master exam flashcards, and finish quizzes.</p></div></div><div class="leaderboard-list">' +
      rows
        .map(
          (u, i) =>
            '<article class="leader-row ' +
            (u.id === currentUser?.id ? "is-me" : "") +
            '"><span class="leader-rank">' +
            (["🥇", "🥈", "🥉"][i] || i + 1) +
            '</span><span class="leader-avatar">' +
            esc(u.avatar || "📘") +
            '</span><span class="leader-person"><b>' +
            esc(u.displayName) +
            (u.id === currentUser?.id ? " · You" : "") +
            "</b><small>" +
            Number(u.completed || 0) +
            " pages · " +
            Number(u.flashcardsMastered || 0) +
            " cards mastered · " +
            Number(u.quizzes || 0) +
            " quizzes · " +
            Number(u.accuracy || 0) +
            '% accuracy</small></span><strong class="tabular">' +
            Number(u.xp || 0) +
            " XP</strong></article>"
        )
        .join("") +
      "</div>";
  } catch (err) {
    v.innerHTML =
      '<div class="panel"><h2>Leaderboard unavailable</h2><p>' +
      esc(err.message) +
      '</p><button class="primary" onclick="nav(\'leaderboard\')">Retry</button></div>';
  }
}
window.renderLeaderboard = renderLeaderboard;

// Restore the same learner after refresh; only an explicit sign-out ends the session.
load();
