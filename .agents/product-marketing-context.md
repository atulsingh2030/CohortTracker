# Product Marketing Context

*Last updated: 2026-04-04*

## Product Overview
**One-liner:** CohortTracker is a self-hosted GitHub contribution intelligence dashboard for small engineering teams, cohorts, hackathons, and OSS programs that need visibility into meaningful work across multiple repositories.

**What it does:** CohortTracker pulls contribution activity from configured GitHub repositories, stores daily snapshots, applies configurable weighted scoring, and shows a weekly leaderboard, team activity trends, and contributor breakdowns. It intentionally de-emphasizes raw commits and treats merged pull requests, issue closures, and reviews as the primary accountability signals.

**Product category:** GitHub contribution intelligence, cohort accountability dashboard, engineering contribution visibility

**Product type:** Self-hosted web application

**Business model:** Current repo ships as an open-source self-hosted product. Best-fit monetization hypothesis is open-source core plus a hosted plan for private repos, easier setup, alerts, reports, and longer retention. This is a positioning hypothesis, not a live commercial model yet.

## Target Audience
**Target companies:** Founder-led startups, bootcamps, engineering cohorts, hackathon operators, student engineering communities, and OSS programs with roughly 5-20 active contributors

**Decision-makers:** Founders, cohort operators, engineering managers, community leads, technical program owners

**Primary use case:** See who is driving meaningful GitHub progress each week across several repositories without manually checking each repo one by one

**Jobs to be done:**
- When I run a small engineering team or cohort, I want one view of meaningful contribution across repos so I can see who is actually shipping.
- When I review weekly team progress, I want merges, reviews, and issue closures weighted more than commits so vanity activity does not distort the picture.
- When I need accountability in a small team, I want visible contribution history so ownership problems show up early.

**Use cases:**
- Weekly cohort rankings
- Founder visibility across multiple product repos
- Hackathon or fellowship scoring
- OSS program contribution tracking
- Contributor review conversations and intervention for inactivity

## Personas
| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| Founder / cohort lead | Who is actually moving work forward | GitHub activity is noisy and spread across repos | One scoreboard for meaningful delivery |
| Engineering manager | Clear contribution trends and weak spots | Manual repo-by-repo checking wastes time | Weighted weekly visibility with historical snapshots |
| Program operator | Fairness and accountability | Commit counts reward noise | Configurable scoring that favors real outcomes |
| Contributor | Knowing how work is judged | Unclear expectations create frustration | Transparent scoring and visible contribution history |

## Problems & Pain Points
**Core problem:** Small teams often need accountability but GitHub's default contribution surfaces emphasize activity volume more than impact.

**Why alternatives fall short:**
- Native GitHub contribution graphs are repo-scattered and commit-heavy.
- Manual reviews across multiple repos are slow and inconsistent.
- Generic engineering analytics tools are often overbuilt for teams this small.

**What it costs them:** Lost visibility, hidden inactivity, noisy recognition, avoidable management overhead, and weaker ownership culture.

**Emotional tension:** Uncertainty, fairness anxiety, frustration with performative activity, and lack of trust in who is actually carrying work.

## Competitive Landscape
**Direct:** Small-team GitHub contribution dashboards and leaderboard-style tooling. In this repo, the clearest substitute is any tool that aggregates GitHub contribution stats, but most do not center accountability for small cohorts.

**Secondary:** GitHub native insights, spreadsheets, and manual weekly reviews. These are simple but poor at cross-repo accountability and weighted scoring.

**Indirect:** Broader engineering intelligence tools and developer productivity platforms. These may be heavier, more enterprise-oriented, and often too much for a 5-20 person team.

## Differentiation
**Key differentiators:**
- Weighted contribution model that favors merged PRs, issues closed, and reviews over raw commits
- Built for small teams and cohorts, not enterprise process reporting
- Cross-repo weekly leaderboard plus contributor breakdowns
- Self-hosted and configurable without a large data platform

**How we do it differently:** We frame the product around accountability and contribution quality, not vanity graphs or broad SDLC analytics.

**Why that's better:** Small teams get a usable answer to "who is actually shipping" without buying or implementing a heavy engineering intelligence suite.

**Why customers choose us:** Faster setup, more relevant metrics for small teams, and a clearer accountability story than commit-count dashboards.

## Objections
| Objection | Response |
|-----------|----------|
| "This feels like surveillance." | The product is designed to reward meaningful visible work, not monitor screen time or micromanage behavior. |
| "We can just look at commits." | Commit count is easy to game. Weighted PRs, reviews, and closures better reflect shipped work and team support. |
| "Setup looks technical." | The product uses a simple repo list, a GitHub token, and quick deploy options. Hosted packaging would reduce this further. |

**Anti-persona:** Large enterprises seeking deep SDLC analytics, complex workflow telemetry, or company-wide performance management.

## Switching Dynamics
**Push:** Teams are frustrated by weak visibility and low-signal activity metrics.

**Pull:** The product offers one cross-repo surface, weighted scoring, and weekly clarity.

**Habit:** Teams are used to living inside GitHub's default graphs or informal judgment.

**Anxiety:** Managers may worry about fairness and contributors may worry about being judged by a simplistic score.

## Customer Language
**How they describe the problem:**
- "Who is actually shipping this week?"
- "I do not want people gaming commits."
- "I need one place to see contribution across all repos."
- "GitHub graphs are not enough."

**How they describe us:**
- "A contribution accountability dashboard"
- "A GitHub leaderboard for meaningful work"
- "A scoreboard for PRs, reviews, and closures"

**Words to use:** accountability, contribution visibility, meaningful work, ownership, weekly leaderboard, review activity, merged PRs, cross-repo clarity

**Words to avoid:** surveillance, productivity scoring, employee monitoring, lines of code, hustle

**Glossary:**
| Term | Meaning |
|------|---------|
| Meaningful contribution | Work signals such as merged PRs, reviews, and issue closures that better reflect impact |
| Accountability dashboard | A manager-facing view that makes ownership visible |
| Weighted score | Configurable points assigned to different contribution types |
| Ranking window | The recent period used to calculate leaderboard position |

## Brand Voice
**Tone:** Direct, operational, pragmatic

**Style:** Clear, anti-buzzword, manager-readable, product-led

**Personality:** Sharp, useful, fair, no-nonsense

## Proof Points
**Metrics:** No public customer outcome metrics are captured in the repo yet.

**Customers:** No named customer logos are present in the repo yet.

**Testimonials:** None captured in the repo yet.

**Value themes:**
| Theme | Proof |
|-------|-------|
| Meaningful contribution scoring | Configurable weights for merged PRs, opened PRs, issue closures, reviews, and commits |
| Cross-repo visibility | Configurable multi-repo sync through GitHub API and summary API endpoints |
| Historical accountability | Daily snapshots stored in SQLite with weekly rollups and contributor detail views |
| Operability | Manual sync route, scheduled sync support, and deploy scaffolding for Vercel/Render style setups |

## Goals
**Business goal:** Turn CohortTracker into a starrable open-source wedge and future hosted product for contribution visibility in small teams.

**Conversion action:** Get a user to understand the product quickly, run it against real repos, and see a populated leaderboard with minimal setup friction.

**Current metrics:** Not captured in the repo yet. No live acquisition, activation, or monetization metrics are available from local context.
