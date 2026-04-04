# COMMAND-AGENT SKILL

## When to use
Use this skill when the task is to take a raw agent idea all the way through prompt generation and Sunny-specific BYOK SaaS productization.
Keywords: command-agent, productize agent, saas blueprint, command centre injection, full pipeline.

## Inputs required
- Raw agent idea
- Product or audience context
- Optional technical or commercial constraints

## Steps
1. Execute the `generate-agent` flow to produce a validated final agent prompt.
2. Read `C:\Projects\Sunny\byok-productization-architect-agent-prompt.md`.
3. Use the validated prompt to create a BYOK SaaS blueprint tailored to the agent.
4. Include schema bootstrapping, tenancy and metering, execution telemetry, command centre injection, and onboarding guidance.
5. Save the final prompt to `C:\Projects\PromptGenerator\agent-prompts\<role-kebab-case>-agent-prompt.md` if it is not already saved.
6. Save the SaaS blueprint to `C:\Projects\PromptGenerator\agent-blueprints\<role-kebab-case>-saas-blueprint.md`.
7. Report both artifact paths and the prompt quality score.

## Output format
- Stage 1 enriched brief
- Final agent prompt
- Quality scorecard
- SaaS blueprint
- Saved artifact paths

## Validation checklist
- [ ] The prompt passed through the prompt-factory scoring gate
- [ ] The SaaS blueprint includes the required platform sections
- [ ] Both artifacts were saved to their target locations
- [ ] Any assumption made for missing inputs was stated explicitly
