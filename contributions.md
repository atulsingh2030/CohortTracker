# Template Contributions

Supratik Space treats templates as frontend-only renderers on top of a stable repo-generation contract.

If you want to add a new template, build it so future backend data additions do not break the existing template skeleton.

## What A Template Is

- A template controls the final front-end presentation only.
- The repo understanding, GitHub enrichment, AI interpretation, and page-generation pipeline stay shared.
- A template receives the stable template context and decides how to present it.
- A template is not bound to the current visual layout. It can be radically different from `template-1`.

## Current Contract

- Registry: `server/lib/templates/registry.mjs`
- Shared constants: `server/lib/templates/constants.mjs`
- Template definitions index: `server/lib/templates/definitions/index.mjs`
- Current shipped template definition: `server/lib/templates/definitions/template-1/template.mjs`
- Stable context builder: `server/lib/templates/context.mjs`
- Current shipped example: `template-1`
- Current renderer entry point: `server/lib/design-engine.mjs`

## Design Freedom

- There is no fixed section order.
- There is no fixed visual language.
- There is no fixed CTA pattern.
- There is no fixed card system, grid, motion style, or typography stack.
- You may bring in your own website design, your own reference landing page, or your own screenshot set.
- The stable context is semantic input, not a design limitation.

## Only Hard Product Constraint

Every contributed template must include visible acknowledgement links to:

- Supratik's LinkedIn profile
- GitMe on GitHub: `https://github.com/supratikpm/GitMe`

Use `server/lib/templates/constants.mjs` and the template definition's `requiredAttribution` block as the source of truth. If Supratik's exact LinkedIn URL changes or is being configured, update that constant before publishing a new template.

## Rules

1. Do not fetch your own data inside the template renderer.
2. Do not assume every optional field exists.
3. Do not hardcode repo-specific copy.
4. Do not break older generated pages when new fields are added.
5. Do not change the shared generation pipeline just to make one template work.
6. Do not remove the required attribution links.

## How To Add A Template

1. Add a new template definition file under `server/lib/templates/definitions/<template-id>/template.mjs`
2. Give it:
   - a unique `id`
   - `label`
   - `version`
   - `contextVersion`
   - `description`
   - `status`
   - `designFreedom`
   - `designGuidance`
   - `promptSuggestion`
   - `requiredAttribution`
3. Register it from `server/lib/templates/definitions/index.mjs`
4. Add a renderer branch in `server/lib/design-engine.mjs`
5. Render from the stable object returned by `buildTemplateContext(page)`
6. Keep fallbacks for missing optional sections like:
   - owner profile
   - related repos
   - quickstart
   - social links
   - README sections
7. Generate a real sample page and pin it as the featured sample for that template
8. Run:
   - `npm test`
   - `npm run build`

## Bring Your Own Design Prompt

Use this starter prompt when you want to convert an existing website design into a Supratik Space template:

```text
Use this design as inspiration for a new Supratik Space repo template.

Goal:
- turn the reference website into a reusable repo-launch-page template
- adapt it to Supratik Space's stable template context
- keep the result production-grade and distinct

Design source:
- reference URL: [paste your website or landing page]
- or attach screenshots of the website sections you want to adapt

Product rule:
- the design is not constrained to a fixed layout or visual system
- you can change section order, styling, interaction model, visual density, composition, and storytelling format
- the only hard product constraint is visible acknowledgement linking to Supratik's LinkedIn and the GitMe GitHub repository

Technical integration rules:
- this is frontend-only
- the shared data pipeline is fixed and comes from buildTemplateContext(page)
- support partial data safely
- unknown future fields should never break the template
- treat the context as semantic input, not as a required fixed layout

Use these context areas:
- hero
- source
- strategy
- owner
- narrative
- proof.metrics
- proof.languageBreakdown
- proof.readmeSections
- proof.quickstart
- proof.relatedRepos
- proof.visualParity
- slots.summary
- slots.audienceProfiles
- slots.impact

Output:
- section map
- layout idea
- visual system notes
- acknowledgement placement for the two required attribution links
- fallback behavior for missing sections
- how the reference design maps into the stable template context
```

## Design Expectations

- Templates should feel intentional and production-grade.
- Avoid AI-slop layouts, generic startup cards, and text walls.
- Favor hierarchy, restraint, and visual clarity.
- One strong CTA is better than five weak ones.

## Future-Proofing Requirement

New backend fields will keep arriving over time.

Your template must survive that by:
- reading from the stable context instead of raw backend internals
- ignoring unknown future fields safely
- using defaults when a slot is missing
- keeping section order and layout resilient to partial data

## How Universal Updates Work

When the platform adds something common to every repo page, such as:

- pull request count
- star-history links
- contributor counts
- release cadence

the default rollout path is:

1. Add it to the shared backend data and template context as an optional field.
2. Surface it in the platform-owned shell first.
3. Let template maintainers adopt it inside their own template body when they want.

This means community templates do not get silently rewritten just because the platform learned a new shared signal.

## Ethical Update Policy

- Additive product-wide enhancements should be shipped in the platform shell, not by editing contributor-authored layouts without consent.
- Contributor templates should only be changed directly by the maintainer, or through an explicit migration pull request they can review.
- Breaking template-contract changes require a context-version migration and a maintainer review path.
- Maintainers should get:
  - a changelog
  - a migration note
  - a preview diff or sample output

If a template does not adopt a new optional field, that is acceptable. The platform shell keeps the user experience current while the template body remains ethically intact.

## Submission Checklist

- [ ] template definition added under `server/lib/templates/definitions/<template-id>/template.mjs`
- [ ] registered in `server/lib/templates/definitions/index.mjs`
- [ ] renderer added
- [ ] sample page generated
- [ ] attribution links included
- [ ] mobile-safe
- [ ] no broken empty states
- [ ] tests and build pass
