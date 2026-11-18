# MyKuraFlow multi-user API

## Architecture
- Cloudflare Worker + D1
- Three pre-created accounts; only PBKDF2-SHA256 password hashes are stored.
- Bearer sessions expire after 30 days.
- Each user's completed page IDs, quiz attempts and XP are keyed by their own user ID.
- Leaderboard contains only aggregate learning metrics.
- CORS is restricted to the GitHub Pages origin.

## First-time Cloudflare setup
1. Create a D1 database named `mykuraflow-db` in Cloudflare.
2. Copy its database ID into `api-worker/wrangler.toml` replacing `REPLACE_WITH_D1_DATABASE_ID`.
3. From this directory run:
   `npx wrangler d1 migrations apply mykuraflow-db --remote`
4. Set the Worker secret/config values and deploy:
   `npx wrangler secret put SESSION_DAYS` is not required; it is already a variable.
   `npx wrangler deploy`
5. Copy the deployed Worker URL into the root `api-config.js` file and push the change.
6. Check `GET /api/health` before enabling accounts.

## Security
- Passwords are never included in browser source or repository plaintext.
- Passwords are stored as PBKDF2-SHA256 hashes (310,000 iterations, unique 128-bit salts).
- Login attempts are rate-limited per username per 15-minute window.
- The API uses parameterized SQL, strict CORS, input validation and user-scoped queries.
- Do not enable public account registration. Accounts are pre-provisioned only.

## Pre-created logins
The migration seeds Sakura, Hina and Haruto. Give each user their initial password out-of-band and change it before long-term use. Password-change flow is not yet exposed in this initial release.
