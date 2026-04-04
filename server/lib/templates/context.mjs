import { buildStoredTemplateSummary } from './registry.mjs';

export function buildTemplateContext(page) {
  const template = page.template || buildStoredTemplateSummary('template-1');

  return {
    version: template.contextVersion,
    template,
    meta: {
      slug: page.slug,
      generatedAt: page.generatedAt,
      generationMode: page.generationMode || '',
    },
    source: page.source,
    hero: page.hero,
    strategy: page.strategy || null,
    owner: page.owner || null,
    narrative: page.narrative || null,
    proof: {
      metrics: page.metrics || [],
      languageBreakdown: page.languageBreakdown || [],
      readmeSections: page.readmeSections || [],
      quickstart: page.quickstart || [],
      relatedRepos: page.relatedRepos || [],
      visualParity: page.visualParity || null,
    },
    slots: {
      summary: [
        {
          id: 'what-this-is',
          title: 'What this really is',
          body: page.narrative?.repositoryMeaning || page.hero?.description || '',
        },
        {
          id: 'why-it-matters',
          title: 'Why it matters',
          body: page.narrative?.importantBecause || page.strategy?.userProblem || '',
        },
        {
          id: 'who-it-helps',
          title: 'Who it helps',
          body: page.strategy?.idealCustomerProfile || page.narrative?.audienceProfiles?.[0]?.beneficiaries || '',
        },
      ],
      audienceProfiles: page.narrative?.audienceProfiles || [],
      impact: {
        problem: page.narrative?.problem || page.strategy?.userProblem || '',
        solution: page.narrative?.solution || page.strategy?.desiredOutcome || '',
        lifeImprovements: page.narrative?.lifeImprovements || [],
        futureImplications: page.narrative?.futureImplications || [],
      },
    },
  };
}
