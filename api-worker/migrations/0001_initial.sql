PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE COLLATE NOCASE,
  display_name TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('female','male')),
  avatar TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  password_iterations INTEGER NOT NULL DEFAULT 310000,
  xp INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_active TEXT
);

CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expiry ON sessions(expires_at);

CREATE TABLE IF NOT EXISTS study_progress (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  completed_ids TEXT NOT NULL DEFAULT '[]',
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  time_used INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_quiz_user ON quiz_attempts(user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS auth_rate_limits (
  username TEXT NOT NULL,
  window_start INTEGER NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY(username, window_start)
);

-- Pre-created accounts. Passwords are PBKDF2-SHA256 hashes; plaintext passwords are not stored here.
INSERT OR IGNORE INTO users
(id,username,display_name,gender,avatar,password_salt,password_hash,password_iterations)
VALUES
('usr_sakura','sakura','Sakura','female','🌸','Q0bbxyEiVSOIWsKO3UEc+Q==','WMdgV6QrHX9fyQhxXus1QNzH/vJxwXRg/9SQpVW7th8=',310000),
('usr_hina','hina','Hina','female','🦋','IlJYKJeOg7Y+lKjkSHs0xA==','8zueeQiZnDApwQgosjvhV5v1X9KmtE2vy3DhIbY8vyk=',310000),
('usr_haruto','haruto','Haruto','male','🦊','vrSpzESip6xxPwiP1WI1oQ==','8UJ/sGwpfW1fQBvKB2d9IVEZw3WrlEmUJAO/nK9KyEA=',310000);

INSERT OR IGNORE INTO study_progress(user_id,completed_ids)
VALUES ('usr_sakura','[]'),('usr_hina','[]'),('usr_haruto','[]');
