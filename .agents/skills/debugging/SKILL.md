# DEBUGGING SKILL

## When to use
Use this skill when something is broken, failing, or producing unexpected output.
Keywords: error, bug, traceback, exception, failing, broken, crash, not working.

## Inputs required
- Error message or symptom
- Relevant files or stack trace
- Reproduction steps when available

## Steps
1. Read the full error or symptom carefully.
2. Identify the failing file, component, or runtime boundary.
3. Trace backward to the state that produced the failure.
4. Form one concrete root-cause hypothesis.
5. Verify the hypothesis with code or logs.
6. Apply the smallest fix that resolves the root cause.
7. Re-run the failing path or a close verification check.

## Output format
- Root cause
- Fix applied
- Verification method

## Validation checklist
- [ ] Root cause was identified, not just the symptom
- [ ] The fix is minimal and relevant
- [ ] Verification confirmed the bug is resolved
- [ ] Any temporary workaround is clearly labeled
