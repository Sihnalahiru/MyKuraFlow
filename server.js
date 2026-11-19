const crypto = require("crypto");
const path = require("path");
const express = require("express");

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = "0.0.0.0";
const SESSION_DAYS = Math.min(3650, Math.max(1, Number(process.env.SESSION_DAYS) || 3650));

app.use(express.json({ limit: "1mb" }));

// In-memory store replicating the Cloudflare D1 schema from api-worker/migrations/
const usersByUsername = new Map();
const usersById = new Map();
const sessions = new Map(); // tokenHash -> { userId, expiresAt }
const studyProgress = new Map(); // userId -> { completedIds: string[], updatedAt: string | null }
const quizAttempts = new Map(); // userId -> Array<{ id, score, total, timeUsed, createdAt }>
const authRateLimits = new Map(); // `${username}:${windowStart}` -> attempts

const SEEDED_USERS = [
  {
    id: "usr_sakura",
    username: "sakura",
    displayName: "Sakura",
    gender: "female",
    avatar: "🌸",
    passwordSalt: "qhV6DLb7QwrnEKteV5KpZA==",
    passwordHash: "OX6ESsXIvE+gS0y1p+TmdXkd6Tl4rxAo99U5CGHe/64=",
    passwordIterations: 100000,
    xp: 0,
    lastActive: null
  },
  {
    id: "usr_hina",
    username: "hina",
    displayName: "Hina",
    gender: "female",
    avatar: "🦋",
    passwordSalt: "vSi5tmNIWpHz9EKgkChVDA==",
    passwordHash: "u731K4j4RZ5rPaMr9EGNCI32SS72S5W22Yg9NMpfEy8=",
    passwordIterations: 100000,
    xp: 0,
    lastActive: null
  },
  {
    id: "usr_haruto",
    username: "haruto",
    displayName: "Haruto",
    gender: "male",
    avatar: "🦊",
    passwordSalt: "3pHlJ/k7QazDnlFeTaWg0w==",
    passwordHash: "89cxSRCl4GmholNqozF0B35uujcpCdtg4WY1CYDRydA=",
    passwordIterations: 100000,
    xp: 0,
    lastActive: null
  }
];

for (const u of SEEDED_USERS) {
  usersByUsername.set(u.username.toLowerCase(), u);
  usersById.set(u.id, u);
  studyProgress.set(u.id, { completedIds: [], updatedAt: null });
  quizAttempts.set(u.id, []);
}

function sha256Base64(value) {
  return crypto.createHash("sha256").update(value, "utf8").digest("base64");
}

function randomId(bytes = 32) {
  return crypto.randomBytes(bytes).toString("base64url");
}

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16);
    const iterations = 100000;
    crypto.pbkdf2(password, salt, iterations, 32, "sha256", (err, derived) => {
      if (err) return reject(err);
      resolve({
        salt: salt.toString("base64"),
        hash: derived.toString("base64"),
        iterations
      });
    });
  });
}

function verifyPassword(password, saltBase64, expectedBase64, iterations) {
  return new Promise((resolve, reject) => {
    const salt = Buffer.from(saltBase64, "base64");
    const expected = Buffer.from(expectedBase64, "base64");
    crypto.pbkdf2(password, salt, iterations, 32, "sha256", (err, derived) => {
      if (err) return reject(err);
      if (derived.length !== expected.length) return resolve(false);
      resolve(crypto.timingSafeEqual(derived, expected));
    });
  });
}

function publicUser(u) {
  return {
    id: u.id,
    username: u.username,
    displayName: u.displayName,
    gender: u.gender,
    avatar: u.avatar,
    xp: u.xp
  };
}

function recomputeXp(userId) {
  const user = usersById.get(userId);
  if (!user) return 0;
  const progress = studyProgress.get(userId);
  const attempts = quizAttempts.get(userId) || [];
  const completedCount = progress ? progress.completedIds.length : 0;
  const quizScoreSum = attempts.reduce((acc, a) => acc + a.score, 0);
  user.xp = completedCount * 10 + quizScoreSum * 5;
  user.lastActive = new Date().toISOString();
  return user.xp;
}

function getAuthenticatedUser(req) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return null;
  const tokenHash = sha256Base64(token);
  const session = sessions.get(tokenHash);
  const now = Math.floor(Date.now() / 1000);
  if (!session || session.expiresAt <= now) {
    if (session) sessions.delete(tokenHash);
    return null;
  }
  return usersById.get(session.userId) || null;
}

// API routes matching api-worker/src/index.js
app.use("/api", (_req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "MyKuraFlow API", version: 1 });
});

app.post("/api/login", async (req, res) => {
  try {
    const body = req.body || {};
    const username = String(body.username || "").trim().toLowerCase();
    const password = String(body.password || "");
    if (!/^[a-z0-9_]{3,24}$/.test(username) || password.length < 8 || password.length > 128) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const now = Math.floor(Date.now() / 1000);
    const windowStart = Math.floor(now / 900) * 900;
    const rateKey = `${username}:${windowStart}`;
    const attempts = (authRateLimits.get(rateKey) || 0) + 1;
    authRateLimits.set(rateKey, attempts);
    if (attempts > 10) {
      return res.status(429).json({ error: "Too many attempts. Try again in 15 minutes." });
    }

    const user = usersByUsername.get(username);
    if (!user || !(await verifyPassword(password, user.passwordSalt, user.passwordHash, user.passwordIterations))) {
      return res.status(401).json({ error: "Incorrect username or password" });
    }

    const token = randomId(32);
    const tokenHash = sha256Base64(token);
    const expiresAt = now + SESSION_DAYS * 86400;
    sessions.set(tokenHash, { userId: user.id, expiresAt });
    user.lastActive = new Date().toISOString();

    for (const [k, s] of sessions.entries()) {
      if (s.expiresAt < now) sessions.delete(k);
    }

    return res.json({ token, expiresAt, user: publicUser(user) });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Service temporarily unavailable" });
  }
});

app.post("/api/logout", (req, res) => {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (token) sessions.delete(sha256Base64(token));
  return res.json({ ok: true });
});

function requireAuth(req, res, next) {
  const user = getAuthenticatedUser(req);
  if (!user) return res.status(401).json({ error: "Please sign in again" });
  req.user = user;
  next();
}

app.get("/api/me", requireAuth, (req, res) => {
  return res.json({ user: publicUser(req.user) });
});

app.post("/api/change-password", requireAuth, async (req, res) => {
  try {
    const body = req.body || {};
    const oldPassword = String(body.currentPassword || "");
    const newPassword = String(body.newPassword || "");
    if (newPassword.length < 12 || newPassword.length > 128) {
      return res.status(400).json({ error: "New password must be at least 12 characters." });
    }
    const ok = await verifyPassword(
      oldPassword,
      req.user.passwordSalt,
      req.user.passwordHash,
      req.user.passwordIterations
    );
    if (!ok) {
      return res.status(401).json({ error: "Current password is incorrect." });
    }
    const nextHash = await hashPassword(newPassword);
    req.user.passwordSalt = nextHash.salt;
    req.user.passwordHash = nextHash.hash;
    req.user.passwordIterations = nextHash.iterations;
    return res.json({ ok: true });
  } catch (err) {
    console.error("Change password error:", err);
    return res.status(500).json({ error: "Service temporarily unavailable" });
  }
});

app.get("/api/progress", requireAuth, (req, res) => {
  const row = studyProgress.get(req.user.id) || { completedIds: [], updatedAt: null };
  return res.json({ completedIds: row.completedIds, updatedAt: row.updatedAt });
});

app.put("/api/progress", requireAuth, (req, res) => {
  const body = req.body || {};
  if (
    !Array.isArray(body.completedIds) ||
    body.completedIds.length > 5000 ||
    body.completedIds.some((x) => typeof x !== "string" || x.length > 180)
  ) {
    return res.status(400).json({ error: "Invalid progress payload" });
  }
  const ids = [...new Set(body.completedIds)].slice(0, 5000);
  studyProgress.set(req.user.id, { completedIds: ids, updatedAt: new Date().toISOString() });
  const xp = recomputeXp(req.user.id);
  return res.json({ ok: true, completed: ids.length, xp });
});

app.post("/api/quiz-attempts", requireAuth, (req, res) => {
  const body = req.body || {};
  const score = Number(body.score);
  const total = Number(body.total);
  const timeUsed = Number(body.timeUsed);
  if (
    !Number.isInteger(score) ||
    !Number.isInteger(total) ||
    total < 1 ||
    total > 50 ||
    score < 0 ||
    score > total ||
    !Number.isInteger(timeUsed) ||
    timeUsed < 0 ||
    timeUsed > 7200
  ) {
    return res.status(400).json({ error: "Invalid quiz result" });
  }
  const list = quizAttempts.get(req.user.id) || [];
  list.unshift({
    id: randomId(16),
    score,
    total,
    timeUsed,
    createdAt: new Date().toISOString()
  });
  quizAttempts.set(req.user.id, list);
  recomputeXp(req.user.id);
  return res.json({ ok: true });
});

app.get("/api/leaderboard", requireAuth, (_req, res) => {
  const rows = [...usersById.values()].map((u) => {
    const progress = studyProgress.get(u.id);
    const attempts = quizAttempts.get(u.id) || [];
    const accuracy = attempts.length
      ? Math.round((attempts.reduce((acc, a) => acc + a.score / a.total, 0) / attempts.length) * 100)
      : 0;
    return {
      id: u.id,
      displayName: u.displayName,
      username: u.username,
      gender: u.gender,
      avatar: u.avatar,
      xp: u.xp,
      completed: progress ? progress.completedIds.length : 0,
      quizzes: attempts.length,
      accuracy,
      lastActive: u.lastActive
    };
  });

  rows.sort((a, b) => {
    if (b.xp !== a.xp) return b.xp - a.xp;
    return String(a.lastActive || "").localeCompare(String(b.lastActive || ""));
  });

  return res.json({ leaderboard: rows.slice(0, 3) });
});

app.get("/api/activity", requireAuth, (req, res) => {
  const list = (quizAttempts.get(req.user.id) || []).slice(0, 10).map((a) => ({
    score: a.score,
    total: a.total,
    timeUsed: a.timeUsed,
    createdAt: a.createdAt
  }));
  return res.json({ quizAttempts: list });
});

app.use("/api", (_req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Static frontend files
const ROOT = __dirname;
const ROOT_FILES = new Set([
  "/index.html",
  "/styles.css",
  "/app.js",
  "/api-config.js",
  "/sw.js",
  "/manifest.webmanifest"
]);

app.use("/data", express.static(path.join(ROOT, "data")));
app.use("/public", express.static(path.join(ROOT, "public")));
app.use("/images", express.static(path.join(ROOT, "public", "images")));

app.get("/", (_req, res) => {
  res.sendFile(path.join(ROOT, "index.html"));
});

app.get(Array.from(ROOT_FILES), (req, res) => {
  res.sendFile(path.join(ROOT, req.path.slice(1)));
});

app.listen(PORT, HOST, () => {
  console.log(`MyKuraFlow server running at http://${HOST}:${PORT}`);
});
