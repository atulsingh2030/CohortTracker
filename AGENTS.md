# COHORTTRACKER AGENT OPERATING RULES

This repository is wired for Codex and other agentic coding tools.
Read this file before doing any work in `C:\Projects\CohortTracker`.

## CohortTracker Notes

- Repo root: `C:\Projects\CohortTracker`
- Product: contribution intelligence dashboard for a small engineering cohort
- Live repo skill system: `.agents/skills/<skill-name>/SKILL.md`
- Bootstrap bundle: `codex_initiate/` is reference material, not the live source of truth
- Legacy workflow docs under `.agent/` are reference only if present

## User Operating Rules

These rules are mandatory for work in this repository.

1. Use repo skills explicitly for every task.
2. State the exact skill and the exact next step before running commands, edits, browser actions, or tests.
3. Do not perform silent background actions, exploratory launches, or "quick test" behavior without first stating the action.
4. Make verified claims only. Product, UI, and runtime statements must be backed by direct evidence such as code inspection, command output, screenshots, or browser verification.
5. Prefer practical fixes over research or process theater. Do not default to research unless the user explicitly asks for it.
6. When something is not verified, say so plainly instead of implying completion.
7. Do not modify or rely on `C:\Projects\Sunny` for this project unless the user explicitly asks. Work from `C:\Projects\CohortTracker`.

## Skill Gate

Before planning, coding, debugging, researching, testing, or deploying:

1. Read this file.
2. Route the task to a skill name using the routing table below.
3. Look for the skill in `.agents/skills/<skill-name>/SKILL.md`.
4. If the skill does not exist, create it from `.agents/skill_template.md`.
5. Print the execution trace header.
6. Execute the task through that skill.

Do not skip the skill gate for "small" tasks.

## Skill Priority

Search in this order and use the first match found:

1. Project skills: `.agents/skills/<skill-name>/SKILL.md`
2. Global Codex skills: `~/.codex/skills/<skill-name>/SKILL.md`
3. Global Claude skills: `~/.claude/skills/<skill-name>/SKILL.md`
4. System skills: `~/.codex/skills/.system/`

Always prefer a project skill over a global skill when both exist.

## Routing Table

| Task Type | Trigger Keywords | Skill Name |
| --- | --- | --- |
| Planning | plan, roadmap, strategy, architect, approach | planning |
| Implementation | build, write, create, implement, code | implementation |
| Debugging | bug, failing, broken, error, crash | debugging |
| Research | research, compare, inspect, investigate, verify | research |
| Documentation | docs, README, explain, write down | documentation |
| Code Review | review, audit, quality | code-reviewer |
| Visual QA | qa, screenshot, responsive, layout, browser | browser-qa |
| Local Web Testing | local app, localhost, interaction test, playwright | webapp-testing |
| Agent Generation | generate-agent, prompt factory, enrich brief, create agent prompt | generate-agent |
| BYOK Productization | command-agent, productize agent, saas blueprint, command centre injection | command-agent |
| Agent Deployment | deploy-agent, railway, render, vercel, live URL, register deployment | deploy-agent |

If multiple skills match, use the primary skill first and validate its output before chaining.

## Execution Trace

Print this header before doing any real work:

```text
[SKILL SELECTED]: <skill-name>
[REASON]: <one-line reason>
[SOURCE]: <full path to SKILL.md>
[ACQUIRED FROM]: project | global | self-generated

[EXECUTING STEP 1]: ...
[EXECUTING STEP 2]: ...
[EXECUTING STEP N]: ...

[VALIDATION]: <how output was checked>
[STATUS]: COMPLETE | ESCALATED | FAILED
```

## Escalation Rules

Stop and escalate when:

- the task would deploy, publish, delete, or overwrite production data
- the task needs credentials, API keys, or external installs that are not already available
- two skills imply conflicting approaches
- a deployment score gate or validation gate fails after one retry

Escalation format:

```text
[ESCALATION REQUIRED]
Reason: <what blocked progress>
Options: <option A> | <option B>
Awaiting input before proceeding.
```

## Repo Structure

```text
C:\Projects\CohortTracker\
  AGENTS.md
  README.md
  .agents\
    skill_template.md
    skills\
      planning\
        SKILL.md
      implementation\
        SKILL.md
      debugging\
        SKILL.md
      research\
        SKILL.md
      documentation\
        SKILL.md
```

## Operating Rule

In CohortTracker, `.agents/skills/` is the contract.
If a copied rule or note still references `Sunny`, treat it as stale and update or ignore it before proceeding.
