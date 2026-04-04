# DEPLOYMENT GUIDE
# Exactly what to do with every file, for every tool.

---

## FILES IN THIS PACKAGE

```
AGENTS.md                              <- shared rules (all tools read this)
GEMINI.md                              <- Antigravity-specific rules + overrides
GEMINI_CLI.md                          <- Gemini CLI rules (rename to GEMINI.md)
skill_template.md                      <- blank template for new skills

skills/                                <- Codex / Claude Code bootstrap skills
  planning/SKILL.md
  implementation/SKILL.md
  debugging/SKILL.md

antigravity-skills/                    <- Antigravity bootstrap skills (have skill.yaml)
  planning/SKILL.md + skill.yaml
  implementation/SKILL.md + skill.yaml
  debugging/SKILL.md + skill.yaml
```

Note: The files in antigravity-skills/ are the same content as skills/ but include
skill.yaml, which is required for Antigravity's agent-triggered loading (Progressive Disclosure).
The skills/ files work fine in Codex and Claude Code which don't need skill.yaml.

---

## TOOL SUMMARY

| Tool           | Rules file     | Skills location                         | Reads AGENTS.md? |
|----------------|----------------|-----------------------------------------|------------------|
| Antigravity    | GEMINI.md      | .agents/skills/ + ~/.gemini/antigravity/skills/ | Yes (v1.20.3+) |
| Gemini CLI     | GEMINI.md      | .agents/skills/ + ~/.gemini/skills/     | Yes              |
| Codex CLI      | AGENTS.md      | .agents/skills/ + ~/.codex/skills/      | Yes              |
| Claude Code    | AGENTS.md      | .agents/skills/ + ~/.claude/skills/     | Yes              |
| Cursor         | AGENTS.md      | .agents/skills/                         | Yes              |

---

## SETUP: USING ONLY ANTIGRAVITY

### One-time global setup

```bash
# Create global skills folder
mkdir -p ~/.gemini/antigravity/skills/planning
mkdir -p ~/.gemini/antigravity/skills/implementation
mkdir -p ~/.gemini/antigravity/skills/debugging

# Copy Antigravity skills globally (these have skill.yaml for auto-triggering)
cp antigravity-skills/planning/SKILL.md       ~/.gemini/antigravity/skills/planning/
cp antigravity-skills/planning/skill.yaml     ~/.gemini/antigravity/skills/planning/
cp antigravity-skills/implementation/SKILL.md ~/.gemini/antigravity/skills/implementation/
cp antigravity-skills/implementation/skill.yaml ~/.gemini/antigravity/skills/implementation/
cp antigravity-skills/debugging/SKILL.md      ~/.gemini/antigravity/skills/debugging/
cp antigravity-skills/debugging/skill.yaml    ~/.gemini/antigravity/skills/debugging/

# Global rules (Antigravity reads AGENTS.md at ~/.gemini/AGENTS.md in v1.20.3+)
cp AGENTS.md ~/.gemini/AGENTS.md
```

### Per-repo setup

```bash
# From your project root:
cp AGENTS.md ./AGENTS.md
cp GEMINI.md ./GEMINI.md
cp skill_template.md .agents/skill_template.md

mkdir -p .agents/skills/planning .agents/skills/implementation .agents/skills/debugging

cp antigravity-skills/planning/SKILL.md        .agents/skills/planning/SKILL.md
cp antigravity-skills/planning/skill.yaml      .agents/skills/planning/skill.yaml
cp antigravity-skills/implementation/SKILL.md  .agents/skills/implementation/SKILL.md
cp antigravity-skills/implementation/skill.yaml .agents/skills/implementation/skill.yaml
cp antigravity-skills/debugging/SKILL.md       .agents/skills/debugging/SKILL.md
cp antigravity-skills/debugging/skill.yaml     .agents/skills/debugging/skill.yaml

git add AGENTS.md GEMINI.md .agents/
git commit -m "chore: add agent skill system (Antigravity)"
```

---

## SETUP: USING ONLY GEMINI CLI

### One-time global setup

```bash
# Global rules (CLI-only, keeps separate from Antigravity's path)
cp GEMINI_CLI.md ~/.gemini/GEMINI.md

# Global skills
mkdir -p ~/.gemini/skills/planning
mkdir -p ~/.gemini/skills/implementation
mkdir -p ~/.gemini/skills/debugging

cp skills/planning/SKILL.md       ~/.gemini/skills/planning/SKILL.md
cp skills/implementation/SKILL.md ~/.gemini/skills/implementation/SKILL.md
cp skills/debugging/SKILL.md      ~/.gemini/skills/debugging/SKILL.md
```

### Per-repo setup

```bash
cp AGENTS.md ./AGENTS.md
cp GEMINI_CLI.md ./GEMINI.md    # rename on copy
cp skill_template.md .agents/skill_template.md

mkdir -p .agents/skills/planning .agents/skills/implementation .agents/skills/debugging
cp skills/planning/SKILL.md       .agents/skills/planning/SKILL.md
cp skills/implementation/SKILL.md .agents/skills/implementation/SKILL.md
cp skills/debugging/SKILL.md      .agents/skills/debugging/SKILL.md

git add AGENTS.md GEMINI.md .agents/
git commit -m "chore: add agent skill system (Gemini CLI)"
```

---

## SETUP: USING BOTH ANTIGRAVITY + GEMINI CLI (path conflict solution)

Both tools default to ~/.gemini/GEMINI.md. They will overwrite each other.
The solution uses AGENTS.md as the shared file and keeps GEMINI.md CLI-specific.

```bash
# Shared rules -> AGENTS.md (Antigravity reads it, CLI does NOT)
cp AGENTS.md ~/.gemini/AGENTS.md

# CLI-specific rules -> GEMINI.md (CLI reads it, Antigravity uses it as override only)
cp GEMINI_CLI.md ~/.gemini/GEMINI.md

# Antigravity global skills
mkdir -p ~/.gemini/antigravity/skills/planning
mkdir -p ~/.gemini/antigravity/skills/implementation
mkdir -p ~/.gemini/antigravity/skills/debugging
cp antigravity-skills/planning/SKILL.md        ~/.gemini/antigravity/skills/planning/
cp antigravity-skills/planning/skill.yaml      ~/.gemini/antigravity/skills/planning/
cp antigravity-skills/implementation/SKILL.md  ~/.gemini/antigravity/skills/implementation/
cp antigravity-skills/implementation/skill.yaml ~/.gemini/antigravity/skills/implementation/
cp antigravity-skills/debugging/SKILL.md       ~/.gemini/antigravity/skills/debugging/
cp antigravity-skills/debugging/skill.yaml     ~/.gemini/antigravity/skills/debugging/

# Gemini CLI global skills
mkdir -p ~/.gemini/skills/planning
mkdir -p ~/.gemini/skills/implementation
mkdir -p ~/.gemini/skills/debugging
cp skills/planning/SKILL.md       ~/.gemini/skills/planning/SKILL.md
cp skills/implementation/SKILL.md ~/.gemini/skills/implementation/SKILL.md
cp skills/debugging/SKILL.md      ~/.gemini/skills/debugging/SKILL.md
```

Per-repo setup: include BOTH GEMINI.md (Antigravity) and AGENTS.md (shared).
GEMINI.md takes precedence when both files exist in the same repo.

```bash
cp AGENTS.md ./AGENTS.md
cp GEMINI.md ./GEMINI.md       # Antigravity overrides live here
cp skill_template.md .agents/skill_template.md

mkdir -p .agents/skills/planning .agents/skills/implementation .agents/skills/debugging

# Use Antigravity versions (have skill.yaml, work in CLI too)
cp antigravity-skills/planning/SKILL.md        .agents/skills/planning/SKILL.md
cp antigravity-skills/planning/skill.yaml      .agents/skills/planning/skill.yaml
cp antigravity-skills/implementation/SKILL.md  .agents/skills/implementation/SKILL.md
cp antigravity-skills/implementation/skill.yaml .agents/skills/implementation/skill.yaml
cp antigravity-skills/debugging/SKILL.md       .agents/skills/debugging/SKILL.md
cp antigravity-skills/debugging/skill.yaml     .agents/skills/debugging/skill.yaml

git add AGENTS.md GEMINI.md .agents/
git commit -m "chore: add agent skill system (Antigravity + Gemini CLI)"
```

---

## SETUP: USING CODEX OR CLAUDE CODE (original system)

One-time global:
```bash
mkdir -p ~/.codex/skills/planning ~/.codex/skills/implementation ~/.codex/skills/debugging
cp skills/planning/SKILL.md       ~/.codex/skills/planning/SKILL.md
cp skills/implementation/SKILL.md ~/.codex/skills/implementation/SKILL.md
cp skills/debugging/SKILL.md      ~/.codex/skills/debugging/SKILL.md
cp skill_template.md ~/.codex/skill_template.md
```

Per-repo:
```bash
cp AGENTS.md ./AGENTS.md
cp skill_template.md .agents/skill_template.md
mkdir -p .agents/skills/planning .agents/skills/implementation .agents/skills/debugging
cp skills/planning/SKILL.md       .agents/skills/planning/SKILL.md
cp skills/implementation/SKILL.md .agents/skills/implementation/SKILL.md
cp skills/debugging/SKILL.md      .agents/skills/debugging/SKILL.md
git add AGENTS.md .agents/ && git commit -m "chore: add agent skill system"
```

---

## HOW ENFORCEMENT WORKS PER TOOL

Antigravity:
  - GEMINI.md is loaded automatically as a system-level rule
  - Skills are auto-triggered when your prompt matches their Description/triggers
  - Plan Artifact must name the selected skill before you approve execution
  - If no skill name appears in the Plan Artifact -> reject it and ask for restart

Gemini CLI:
  - GEMINI.md loaded automatically
  - Skills are NOT auto-triggered -- the routing table is your gate
  - Look for [SKILL SELECTED] in the first line of any response
  - If absent -> respond: "You did not follow GEMINI.md. Identify the skill first."

Codex / Claude Code:
  - AGENTS.md loaded automatically
  - Look for [SKILL SELECTED] trace header
  - If absent -> respond: "You did not follow AGENTS.md. Restart."

---

## HOW TO ADD A NEW SKILL

Let the tool acquire it (preferred):
  Give it a task it doesn't have a skill for.
  It will search GitHub -> create via authoring tool -> self-generate.
  Review the saved SKILL.md before committing.

Do it yourself:
  Copy skill_template.md to .agents/skills/<name>/SKILL.md
  Fill it in.
  For Antigravity: also create skill.yaml with name, description, and triggers.
  Commit it.
