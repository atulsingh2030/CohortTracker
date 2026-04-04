# MartianCrown Contribution Intelligence Dashboard

This repo now ships a contribution visibility dashboard for small engineering cohorts working across multiple GitHub repositories.

The primary experience at `/` is the MartianCrown dashboard:

1. Pull daily contribution data from the GitHub REST API
2. Score merged PRs, opened PRs, issues closed, reviews, and low-weight commits
3. Persist daily snapshots in SQLite
4. Render a weekly leaderboard plus contributor-level breakdowns

The previous repo-to-launch-page product is still available at `/launch-builder` and the generated launch pages still render at `/launch/:slug`.

## Current Product Shape

- React + Vite dashboard UI under `src/pages/ContributionDashboard.tsx`
- Express API under `server/`
- SQLite-backed contribution storage in `server/data/contribution-intelligence.sqlite`
- Configurable repo list + scoring weights in `server/config/contribution-intelligence.json`
- Daily scheduled sync via `node-cron`
- Legacy launch-page generator routes preserved for compatibility

## Local Development

```bash
npm install
npm run dev
```

Frontend runs through Vite and the preview API runs through `server/index.mjs`.

Copy `.env.example` to `.env` and fill in at least:

- `GITHUB_REPOSITORIES`
- `GITHUB_TOKEN` for better rate limits and private repos
- `VITE_API_BASE_URL` if the frontend is not served from the same origin as the Express API

## Configuration

Tracked settings live in:

- `server/config/contribution-intelligence.json`
- `server/config/contribution-intelligence.local.json` for local-only overrides

You can also configure repositories from environment variables:

```bash
GITHUB_REPOSITORIES=owner-one/repo-one,owner-two/repo-two
GITHUB_TOKEN=github_pat_xxx
```

Useful sync-related environment variables:

- `CONTRIBUTION_SYNC_CRON`
- `CONTRIBUTION_SYNC_TIMEZONE`
- `CONTRIBUTION_LOOKBACK_DAYS`
- `CONTRIBUTION_SYNC_SECRET`
- `ALLOWED_ORIGINS`

Manual sync endpoint:

```bash
POST /api/contribution-intelligence/sync
```

In production, protect that route with `CONTRIBUTION_SYNC_SECRET` and trigger it from a platform cron or another server-side job.

## Quick Deploy

Frontend:

- Deploy the Vite app to Vercel
- Set `VITE_API_BASE_URL` to your Render or Railway backend URL

Backend:

- Deploy the repo to Render using `render.yaml` or the same commands manually
- Set `GITHUB_REPOSITORIES`, `GITHUB_TOKEN`, and `ALLOWED_ORIGINS`
- Point `ALLOWED_ORIGINS` at your Vercel domain so browser requests are accepted

Recommended split:

- Vercel: static frontend
- Render or Railway: Express API + scheduled sync

## Validation

```bash
npm test
npm run build
```

## Notes

- `docs/` contains the strategy and architecture artifacts created during the repo-launch-pages pivot.
- `contributions.md` explains how to add future templates without breaking the shared generation contract.
- `CohortTracker` is now the standalone repo for the contribution dashboard.
- Any older `Sunny` or `supratikspace` references should be treated as legacy copy, not current repo structure.
