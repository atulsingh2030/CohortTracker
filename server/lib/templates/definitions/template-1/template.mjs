import {
  GITME_REPOSITORY_URL,
  SUPRATIK_LINKEDIN_URL,
  TEMPLATE_CONTEXT_VERSION,
  TEMPLATE_CONTRIBUTIONS_URL,
  TEMPLATE_REPOSITORY_URL,
} from '../../constants.mjs';

export const templateDefinition = {
  id: 'template-1',
  label: 'Template 1',
  version: 1,
  contextVersion: TEMPLATE_CONTEXT_VERSION,
  description: 'The current calm product-brief template for repo launch pages.',
  status: 'live',
  default: true,
  repositoryUrl: TEMPLATE_REPOSITORY_URL,
  contributionsUrl: TEMPLATE_CONTRIBUTIONS_URL,
  featuredSampleSlug: 'vercel-swr-ad92aa',
  featuredSampleRepoUrl: 'https://github.com/vercel/swr',
  designFreedom: 'unbounded',
  designGuidance:
    'Templates can fully redefine layout, section order, visual language, motion, typography, and component choices. The shared context is semantic input, not a fixed page skeleton.',
  supportedContextRange: {
    min: 1,
    max: 1,
  },
  updatePolicy: {
    additiveData: 'platform-shell-by-default',
    templateBodyUpgrades: 'maintainer-opt-in',
    breakingChanges: 'manual-migration',
    notification: 'changelog-preview-diff',
    ethics:
      'Do not silently rewrite contributor-authored layouts. Add universal product updates in the platform shell first, then invite maintainers to adopt them inside the template body on their own timeline.',
  },
  requiredAttribution: {
    linkedIn: {
      label: 'Supratik LinkedIn',
      url: SUPRATIK_LINKEDIN_URL,
      required: true,
      configurable: true,
      notes:
        'Replace the placeholder with Supratik\'s exact LinkedIn profile before publishing or showcasing a contributed template.',
    },
    gitme: {
      label: 'GitMe on GitHub',
      url: GITME_REPOSITORY_URL,
      required: true,
      configurable: false,
      notes:
        'Keep this acknowledgement visible because GitMe is the repo-to-page engine being brought in-house.',
    },
  },
  promptSuggestion: `Use this design as inspiration for a new Supratik Space repo template.

Goal:
- turn the reference website into a reusable repo-launch-page template
- preserve the visual language, restraint, hierarchy, or energy only when it serves the final experience
- adapt it to Supratik Space's stable template context

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

Reminder:
- bring your own design, not your own data pipeline
- do not let the existing template bias the new one
- if your reference design is radically different, that is acceptable`,
};
