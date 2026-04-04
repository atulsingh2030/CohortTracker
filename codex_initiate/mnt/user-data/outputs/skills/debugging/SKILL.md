# DEBUGGING SKILL

## When to use
When something is broken, failing, or producing unexpected output.
Keywords: error, bug, traceback, exception, failing, broken, not working, crash.

## Inputs required
- Error message or symptom description
- Relevant code (file path + line range if known)
- Steps to reproduce (if available)

## Steps
1. Read the full error message — do not skim
2. Identify the exact file and line where the failure originates
3. Trace backward: what state led to this line?
4. Form a hypothesis for root cause (one specific statement, not a list)
5. Verify the hypothesis by checking surrounding code / logs
6. If hypothesis is wrong, form a new one — do not patch blindly
7. Apply the minimal fix that addresses the root cause
8. Confirm the fix resolves the error and does not introduce a new one

## Output format
- Root cause (one sentence)
- Fix applied (code diff or description)
- Verification method (how you confirmed it works)

## Validation checklist
- [ ] Root cause identified (not just symptom patched)
- [ ] Fix is minimal — not a workaround
- [ ] No new errors introduced
- [ ] If fix is a workaround: it is explicitly labeled as temporary
