# AGENCY PERFORMANCE BENCHMARKER SKILL

## When to use
Use this skill when frontend changes need a performance sanity check alongside visual polish. Trigger on large UI revamps, animation-heavy surfaces, dense dashboards, or any change where smoothness and render cost matter.

## Inputs required
- Changed UI files
- Expected hotspots
- Available verification method

## Steps
1. Identify likely hotspots: large lists, charts, motion-heavy components, blur/filter effects, and responsive overflow.
2. Review whether the implementation increases DOM weight, layout churn, or unnecessary repaints.
3. Prefer simple render paths and clear loading boundaries over ornamental complexity.
4. Validate the result using the available signals: build size, browser QA, or targeted runtime checks.
5. Record any residual performance risks plainly.

## Output format
- Hotspots reviewed
- Risks found or avoided
- Runtime verification method
- Residual concerns

## Validation checklist
- [ ] Likely hotspots were reviewed
- [ ] No obvious performance regressions were introduced
- [ ] Verification method is stated explicitly
- [ ] Remaining risks are called out plainly
