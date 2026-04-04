# GTM And Pricing Memo: CohortTracker

**Date:** 2026-04-04  
**Status:** Draft  
**Evidence standard:** Repo-grounded only, no external research used in this memo

## 1. Executive Summary

CohortTracker should not go to market as a generic productivity dashboard.

Its best wedge is:

**GitHub contribution intelligence for small engineering teams, cohorts, hackathons, and OSS programs.**

The reason is simple. The current product is strongest when it answers:

- who is shipping
- who is reviewing
- who is closing work
- who is fading out

That is a narrow, legible problem. Narrow wins here.

## 2. ICP And Buyer Map

### Primary ICP

Small technical groups with 5-20 contributors spread across multiple GitHub repositories.

### Best initial buyer profiles

- founder managing a small product team
- cohort or bootcamp operator
- hackathon or fellowship organizer
- OSS program lead

### Buyer pains

- too much repo hopping to understand contribution
- commit counts reward noise
- unclear ownership during weekly reviews
- weak visibility into review and closure work

### Why they would buy or adopt now

- they need fairness and accountability
- they do not want enterprise bloat
- they want something light enough to self-host or trial quickly

## 3. Positioning Statement

For small engineering teams and programs that need accountability across multiple GitHub repositories, CohortTracker is a contribution intelligence dashboard that ranks meaningful work, not vanity activity. Unlike commit-count graphs or enterprise engineering intelligence suites, it gives a lightweight weekly view of who is actually moving work forward.

## 4. Core Messages

### Message 1
**Stop counting commits. Start measuring shipped work.**

Proof in product:
- weighted scoring favors merged PRs, issues closed, and reviews
- commits are intentionally low-weight

### Message 2
**One weekly scoreboard across every repo that matters.**

Proof in product:
- configurable multi-repo sync
- weekly leaderboard
- contributor detail views

### Message 3
**Built for small teams, not enterprise process theater.**

Proof in product:
- simple stack
- self-hosted
- SQLite-backed starter setup

## 5. Product Packaging Direction

### Open-source core

Free, self-hosted:
- public or private repo tracking with GitHub token
- configurable weights
- weekly leaderboard
- contributor detail views
- daily sync

### Hosted paid plan

Best future paid offer:
- easier onboarding
- managed private repo sync
- no local deployment work
- shareable reports
- alerts and digests
- longer history retention
- role-based access

### Why this split makes sense

The open-source version builds trust and GitHub-native distribution. The hosted plan removes setup pain and sells convenience, privacy, automation, and polish.

## 6. Pricing Hypothesis

This is a product hypothesis, not validated pricing.

### Recommended starting model

Price by organization or program, not by seat.

Why:
- the value is team visibility, not individual seat usage
- cohorts and hackathons are often budgeted by program
- founders think in team cost, not seat math, for a tool like this

### Candidate packaging

**Free**
- self-hosted
- limited retention
- community support

**Team**
- hosted
- private repos
- 30-90 day history
- manual exports

**Program**
- multi-repo, multi-cohort, or event-level reporting
- longer retention
- branded reports
- higher support level

### Value metric candidates

Best candidates:
- per org
- per program or event
- per tracked repo bundle

Weak candidate:
- per seat

## 7. Go-To-Market Sequence

### Phase 1: Open-source wedge

Goal:
- make the repo understandable
- get stars
- get a few real teams running it

Needed assets:
- sharp README
- screenshots
- easy local setup
- clear product positioning

### Phase 2: Community adoption

Target channels:
- startup founder circles
- bootcamp and cohort operators
- hackathon communities
- OSS maintainers

Main promise:
- "See meaningful GitHub contribution across repos in minutes."

### Phase 3: Hosted conversion

Once real users show repeated setup pain or request private hosted access:
- launch managed hosted plan
- sell ease of use and reporting
- keep core self-hosted version free

## 8. Sales Enablement Assets Needed

When the product matures toward paid distribution, the first useful assets are:

- one-page founder pitch
- one-page cohort operator pitch
- simple pricing explainer
- objection handling doc for "this is surveillance" and "we can use GitHub for free"
- sample weekly report PDF or email

## 9. Launch Risks

- the current setup still feels technical for non-developers
- the repo story is stronger than the current onboarding experience
- repo-first view is still missing, which limits one of the most obvious managerial workflows
- no customer proof or case studies are captured in the repo yet

## 10. Recommendation

Go to market with the narrowest honest claim:

**CohortTracker helps small teams see meaningful GitHub contribution across multiple repositories.**

Then win one audience first:

**cohorts and small founder-led engineering teams**

That is the cleanest path to stars, usage, and later monetization.
