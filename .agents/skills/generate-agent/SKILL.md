# GENERATE-AGENT SKILL

## When to use
Use this skill when the task is to turn a raw agent idea into a high-quality agent prompt using the Sunny prompt factory flow.
Keywords: generate-agent, create agent prompt, prompt factory, enrich brief, agent prompt.

## Inputs required
- Raw agent idea
- Target audience or domain
- Optional constraints or success criteria

## Steps
1. Read `C:\Projects\PromptGenerator\research\agentic-skills-research.md`.
2. Read `C:\Projects\PromptGenerator\prompts\meta-agent-input-enricher-agent-prompt.md`.
3. Read `C:\Projects\PromptGenerator\prompts\meta-agent-architect-prompt.md`.
4. Produce the Stage 1 enriched brief with Outcome, Framework, Anti-patterns, and Hidden context.
5. If the interaction is staged, pause for approval after Stage 1. If the caller requested end-to-end execution, continue and note that assumption.
6. Generate the full Stage 2 agent prompt with YAML frontmatter, Cognitive Architecture, quality gates, and failure modes.
7. Score the prompt across signal density, role specificity, cognitive architecture, anti-pattern depth, and slop-free quality.
8. If the weighted score is below 75, revise once, then re-score.
9. Save the final prompt to `C:\Projects\PromptGenerator\agent-prompts\<role-kebab-case>-agent-prompt.md`.

## Output format
- Stage 1 enriched brief
- Stage 2 agent prompt
- Quality scorecard
- Saved artifact path

## Validation checklist
- [ ] All three upstream source files were read first
- [ ] Stage 1 includes all four required dimensions
- [ ] Stage 2 includes cognitive architecture and failure modes
- [ ] Final score is reported with the saved path
