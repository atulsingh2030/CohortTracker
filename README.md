# CohortTracker

CohortTracker is a self-hosted GitHub contribution intelligence dashboard for small engineering teams, cohorts, hackathons, and OSS programs.

It exists for one reason:

**make meaningful contribution visible across multiple repositories without rewarding commit theater**

## Why This Exists

GitHub makes activity visible.

It does not make accountability clear.

Small teams still end up asking the same weekly questions:

- Who is actually shipping?
- Who is reviewing and unblocking others?
- Who closed real work?
- Who looks active only because they made noise?

CohortTracker answers those questions with a weighted weekly scoreboard built around meaningful signals instead of raw commit volume.

## What It Tracks

- pull requests opened
- pull requests merged
- issues closed
- reviews submitted
- commits, with intentionally low weight

The scoring model is configurable through JSON so teams can tune the weights without changing code.

## What Ships Today

- weekly leaderboard ranked by weighted contribution score
- contributor detail view with historical activity
- cross-repo contribution sync through the GitHub API
- daily snapshot storage in SQLite
- scheduled sync with `node-cron`
- manual sync endpoint for local and server-side triggering
- React dashboard UI plus Express backend

## Who It Is For

- founders managing a small engineering team
- cohort or bootcamp operators
- hackathon and fellowship organizers
- OSS program leads who want a simple accountability layer

## What It Is Not

- not a commit-count vanity board
- not employee monitoring software
- not a giant engineering intelligence platform

This repo is strongest when used for small teams that want a fair, visible view of shipped work.

## Quickstart

```bash
npm install
npm run dev
```

Frontend runs through Vite. The API runs through `server/index.mjs`.

Copy `.env.example` to `.env` and set at least:

```bash
GITHUB_REPOSITORIES=owner-one/repo-one,owner-two/repo-two
GITHUB_TOKEN=github_pat_xxx
```

If the frontend is served from a different origin than the API, also set:

```bash
VITE_API_BASE_URL=https://your-api-host.example.com
```

## Configuration

Main config files:

- `server/config/contribution-intelligence.json`
- `server/config/contribution-intelligence.local.json`

Useful environment variables:

- `GITHUB_REPOSITORIES`
- `GITHUB_TOKEN`
- `CONTRIBUTION_SYNC_CRON`
- `CONTRIBUTION_SYNC_TIMEZONE`
- `CONTRIBUTION_LOOKBACK_DAYS`
- `CONTRIBUTION_SYNC_SECRET`
- `ALLOWED_ORIGINS`

## API Surface

Current contribution endpoints:

- `GET /api/health`
- `GET /api/contribution-intelligence/summary`
- `GET /api/contribution-intelligence/config`
- `GET /api/contribution-intelligence/users/:username`
- `POST /api/contribution-intelligence/sync`

In production, protect the manual sync route with `CONTRIBUTION_SYNC_SECRET`.

## Deploy

Recommended split:

- Vercel for the frontend
- Render or Railway for the Express API and scheduled sync

The repo includes `render.yaml` for backend deployment scaffolding.

## Validation

```bash
npm test
npm run build
```

## Honest Product Gaps

Current known gap:

- the dashboard is strongest as a cohort-wide leaderboard, but it does not yet provide a full repo-first ownership view

That means it can answer:

- "who is leading this week?"

Better than:

- "show me everyone contributing inside this single repo first"

## Repo Notes

- The primary product is the contribution dashboard at `/`
- Legacy launch-builder routes still exist in the codebase at `/launch-builder` and `/launch/:slug`
- Older `Sunny` and `supratikspace` references should be treated as legacy copy, not the active product story
