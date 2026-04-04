# SUNNY AGENT OPERATING RULES

This repository is wired for Codex and other agentic coding tools.
Read this file before doing any work in `C:\Projects\Sunny`.

## Sunny Notes

- Repo root: `C:\Projects\Sunny`
- Live repo skill system: `.agents/skills/<skill-name>/SKILL.md`
- Bootstrap bundle: `codex_initiate/` is reference material, not the live source of truth
- Legacy workflow docs: `.agent/workflows/` are historical inputs that have been mirrored into `.agents/skills/`
- Agent factory dependencies currently live in `C:\Projects\PromptGenerator`

Required external context for the Sunny flows:
- `C:\Projects\PromptGenerator\research\agentic-skills-research.md`
- `C:\Projects\PromptGenerator\prompts\meta-agent-input-enricher-agent-prompt.md`
- `C:\Projects\PromptGenerator\prompts\meta-agent-architect-prompt.md`
- `C:\Projects\Sunny\byok-productization-architect-agent-prompt.md`

## Skill Gate

Before planning, coding, debugging, researching, or deploying:

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
| Agent Generation | generate-agent, prompt factory, enrich brief, create agent prompt | generate-agent |
| BYOK Productization | command-agent, productize agent, saas blueprint, command centre injection | command-agent |
| Agent Deployment | deploy-agent, railway, live URL, register deployment | deploy-agent |
| Documentation | docs, README, explain, write down | documentation |
| Research | research, compare, inspect, investigate | research |

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
C:\Projects\Sunny\
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
      generate-agent\
        SKILL.md
      command-agent\
        SKILL.md
      deploy-agent\
        SKILL.md
```

## Operating Rule

In Sunny, `.agents/skills/` is the contract and `.agent/workflows/` is reference only.
If both exist, prefer `.agents/skills/`.
