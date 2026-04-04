function round(value) {
  return Math.round(value * 100) / 100;
}

export function buildVisualParityReport(page) {
  const visualMoments = [];
  const textBlocks = [];

  if (page.hero?.title || page.hero?.tagline || page.hero?.description) {
    textBlocks.push('hero copy');
  }

  if (page.narrative?.repositoryMeaning || page.narrative?.importantBecause) {
    textBlocks.push('product framing');
  }

  if ((page.narrative?.audienceProfiles || []).length > 0) {
    textBlocks.push('audience explanation');
  }

  if (page.narrative?.problem || page.narrative?.solution) {
    textBlocks.push('impact narrative');
  }

  if ((page.readmeSections || []).length > 0) {
    textBlocks.push('source grounding');
  }

  if ((page.relatedRepos || []).length > 0) {
    textBlocks.push('credibility section');
  }

  if ((page.metrics || []).length > 0) {
    visualMoments.push('icon-led metric rail');
  }

  if ((page.hero?.topics || []).length > 0) {
    visualMoments.push('topic chip row');
  }

  if (page.owner?.avatarUrl) {
    visualMoments.push('maintainer avatar and profile card');
  }

  if ((page.languageBreakdown || []).length > 0) {
    visualMoments.push('stack graph');
  }

  if ((page.relatedRepos || []).length > 0) {
    visualMoments.push('other repository cards');
  }

  if ((page.narrative?.audienceProfiles || []).length > 0) {
    visualMoments.push('audience tiles');
  }

  if ((page.quickstart || []).length > 0) {
    visualMoments.push('quickstart command console');
  }

  if ((page.readmeSections || []).length > 0) {
    visualMoments.push('source grounding cards');
  }

  if (page.narrative?.problem || page.narrative?.solution) {
    visualMoments.push('impact cards');
  }

  if ((page.narrative?.lifeImprovements || []).length > 0 || (page.narrative?.futureImplications || []).length > 0) {
    visualMoments.push('benefit lists');
  }

  visualMoments.push('hero illustration');

  const visualBlocks = visualMoments.length;
  const targetRatio = 0.55;
  const ratio = textBlocks.length > 0 ? visualBlocks / textBlocks.length : 1;

  return {
    visualBlocks,
    textBlocks: textBlocks.length,
    ratio: round(ratio),
    targetRatio,
    status: ratio >= targetRatio ? 'balanced' : 'text-heavy',
    visualMoments,
  };
}
