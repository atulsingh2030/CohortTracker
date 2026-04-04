# Starrable GitHub Repo Plan: CohortTracker

**Date:** 2026-04-04  
**Status:** Draft  
**Source of truth:** Current repo state in `C:\Projects\CohortTracker`

## 1. Goal

Turn CohortTracker from an internal-feeling dashboard repo into a GitHub repository that earns stars because people can:

- understand it in under 30 seconds
- see a clear problem it solves
- run it quickly
- imagine using it for their own team, cohort, hackathon, or OSS program

## 2. Current Reality

The repo has a working product core:

- React + Vite frontend
- Express backend
- GitHub contribution sync
- weighted scoring engine
- SQLite persistence
- weekly leaderboard and contributor detail views

But the repo is not yet packaged like a star-worthy open-source product because:

- the README still reads partly like a project transition note
- the repo narrative still carries legacy launch-builder baggage
- there is no public demo story or screenshot-first introduction in the README
- setup still feels like a developer handoff, not a 5-minute product onboarding flow
- the current UI is cohort-first, not repo-first, which weakens the strongest shareable use case

## 3. Product Narrative To Lead With

**Primary category:** GitHub contribution intelligence for small teams

**Primary promise:** See meaningful contribution across repos without rewarding commit theater

**Primary users:**
- startup founders with 5-20 engineers
- cohort and bootcamp operators
- hackathon organizers
- OSS program managers

**Primary job to be done:** "Show me who is actually shipping this week."

## 4. What The Repo Must Communicate Immediately

The first screen of the repo should answer:

1. What is this?
2. Who is it for?
3. Why not just use GitHub?
4. What does it look like?
5. How fast can I run it?

If the repo does not answer those in the first 20 seconds, it will feel like an internal project instead of a product.

## 5. README Information Architecture

Recommended README structure:

1. Hero
   - one-line description
   - short problem statement
   - "why this exists"

2. What it tracks
   - PRs merged
   - PRs opened
   - issues closed
   - reviews submitted
   - low-weight commits

3. Why it is different
   - does not optimize for raw commits
   - built for small-team accountability
   - cross-repo and weekly by default

4. Who it is for
   - founders
   - cohort operators
   - hackathon programs
   - OSS communities

5. Screenshots
   - leaderboard view
   - contributor detail view
   - activity trend view

6. Quickstart
   - clone
   - install
   - add repos
   - add GitHub token
   - run

7. Configuration
   - repositories
   - token
   - scoring weights
   - sync secret

8. Deployment
   - local
   - Vercel + Render style split

9. Honest limitations
   - repo-first ownership view is still a product gap
   - no hosted product yet
   - no packaged GitHub App onboarding yet

10. Roadmap
   - repo-first view
   - shareable weekly reports
   - Slack/Discord digests
   - public leaderboard mode

## 6. Repo Structure Improvements

To feel product-grade, the repo should be easier to scan:

- `README.md` should tell the product story
- `docs/` should hold strategy and architecture artifacts
- `artifacts/qa/` should hold product screenshots used in the README
- `.env.example` should be beginner-readable
- `render.yaml` should remain as the backend deploy starter

Recommended additions:

- `docs/positioning.md`
- `docs/pricing-and-gtm.md`
- `docs/roadmap.md`
- `docs/demo-data.md` or a seeded sample dataset guide

## 7. Product Improvements That Increase Starability

Highest-impact product improvements:

1. Add a repo-first view
   - answer: "5 people worked on this repo, who contributed what?"
   - this is the current biggest product gap

2. Add "why this score" transparency
   - score breakdown by PRs, reviews, issues, commits
   - makes the system feel fairer

3. Add shareable outputs
   - weekly winner card
   - shareable team report
   - public leaderboard mode

4. Add a demo experience
   - seeded sample data or sample JSON snapshot
   - lets visitors see value before setup

5. Reduce setup friction
   - guided config
   - simpler onboarding copy
   - later, GitHub App onboarding instead of raw token setup

## 8. The Fastest Path To A Starrable Repo

Phase 1, now:

- rewrite README around one clear product story
- add screenshots to the README
- publish product context and GTM docs
- clean up legacy messaging

Phase 2, next:

- add repo-first contribution view
- add transparent score breakdown
- add demo dataset or public demo

Phase 3, growth:

- add shareable weekly reports
- add integrations like Slack or Discord digest
- add hosted version positioning

## 9. Definition Of Done For "Starrable"

CohortTracker becomes star-worthy when:

- the README makes the product obvious in under 30 seconds
- the setup path feels achievable for a non-expert builder
- screenshots make the product visually legible
- the repo solves a pain people already recognize
- the product story is narrower and sharper than "developer analytics"

## 10. Recommendation

Do not market this repo as a broad engineering intelligence tool.

Make it the best open-source answer to:

**"How do I make meaningful GitHub contribution visible across a small team?"**

That is a sharper repo story, a better star story, and a better wedge into future monetization.
