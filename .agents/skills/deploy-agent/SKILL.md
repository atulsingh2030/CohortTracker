# DEPLOY-AGENT SKILL

## When to use
Use this skill when an existing agent prompt needs to be scaffolded, tested, and prepared for live deployment as a BYOK SaaS service.
Keywords: deploy-agent, deploy agent, railway, launch agent, register live URL.

## Inputs required
- Path to the agent prompt markdown file
- Deployment target details
- Required secrets or confirmation that secrets are not yet available

## Steps
1. Read the provided agent prompt file.
2. Read `C:\Projects\Sunny\byok-productization-architect-agent-prompt.md`.
3. Create `C:\Projects\Sunny\<agent-name>-saas\`.
4. Generate the runtime scaffold, including `main.py`, `requirements.txt`, `railway.json`, and `.env.example` or `.env` when real credentials are supplied.
5. Generate and run a local trial script to score the agent behavior.
6. If the score is below the release threshold, revise once and re-test.
7. Sync metadata to Supabase only when configuration is available.
8. Escalate before any live `railway init`, `railway up`, or registration step.
9. After approval, register the live URL back into the command centre.

## Output format
- Scaffold path
- Trial score and reasoning
- Deployment readiness status
- Live URL and registration note when deployment completes

## Validation checklist
- [ ] The scaffold is agent-specific and saved in the Sunny repo
- [ ] A trial score was produced before deployment
- [ ] Secrets were not invented or hardcoded
- [ ] Live deployment was escalated before execution
