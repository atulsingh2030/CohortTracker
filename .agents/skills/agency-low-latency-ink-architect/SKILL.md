# AGENCY LOW LATENCY INK ARCHITECT SKILL

## When to use
Use this skill when a task includes high-frequency interactive surfaces such as drawing, drag-heavy motion, cursor-led effects, or animation-sensitive UI that must remain smooth under load. Trigger on pointer performance, animation jank, repaint-heavy surfaces, or high-frequency rendering concerns.

## Inputs required
- Interactive surface or animation target
- Known performance risks
- Current rendering approach

## Steps
1. Identify where frequent state updates or repaint-heavy effects could hurt responsiveness.
2. Prefer transform-based animation, composited layers, and lightweight state paths over layout thrashing.
3. Avoid blur/filter-heavy effects on dense or frequently updating surfaces.
4. Limit expensive shadows, gradients, and repaints to static areas.
5. Validate that the final interaction path stays simple and hardware-friendly.

## Output format
- Risk areas
- Performance-safe interaction strategy
- Effects reduced or isolated
- Validation result

## Validation checklist
- [ ] High-frequency interactions avoid layout thrash
- [ ] Expensive visual effects are minimized on active surfaces
- [ ] Motion is transform-driven where possible
- [ ] No obvious performance traps were introduced
