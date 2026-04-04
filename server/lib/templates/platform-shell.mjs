import { PLATFORM_SHELL_VERSION } from './constants.mjs';
import { getTemplateDefinition, resolveTemplateCompatibility } from './registry.mjs';

function buildPrimaryLinks(page) {
  const links = [];

  if (page?.source?.repoUrl) {
    links.push({
      label: 'GitHub Repository',
      value: `${page.source.owner}/${page.source.repo}`,
      url: page.source.repoUrl,
    });
  }

  if (page?.owner?.profileUrl) {
    links.push({
      label: 'Maintainer Profile',
      value: `@${page.owner.handle || page.source.owner}`,
      url: page.owner.profileUrl,
    });
  }

  if (page?.source?.homepage) {
    links.push({
      label: 'Project Website',
      value: page.source.homepage,
      url: page.source.homepage,
    });
  }

  return links;
}

export function buildPlatformShell(page) {
  const template = getTemplateDefinition(page?.template?.id);
  const compatibility = resolveTemplateCompatibility(template.id, page?.template?.contextVersion || template.contextVersion);
  const universalModules = [];

  if (page?.metrics?.length) {
    universalModules.push({
      id: 'repository-signals',
      kind: 'stats',
      title: 'Repository signals',
      description:
        'Universal repo proof that can grow over time without forcing contributor-authored template bodies to change.',
      items: page.metrics.map((metric) => ({
        label: metric.label,
        value: metric.value,
      })),
    });
  }

  const primaryLinks = buildPrimaryLinks(page);
  if (primaryLinks.length > 0) {
    universalModules.push({
      id: 'primary-links',
      kind: 'links',
      title: 'Primary links',
      description: 'Platform-owned navigation and credibility links that stay consistent across every template.',
      items: primaryLinks,
    });
  }

  return {
    version: PLATFORM_SHELL_VERSION,
    compatibility,
    updatePolicy: template.updatePolicy,
    universalModules,
    attribution: {
      title: 'Required acknowledgement',
      description:
        'These attribution links are platform policy and remain outside the contributor-authored template body.',
      links: [
        {
          label: template.requiredAttribution.linkedIn.label,
          url: template.requiredAttribution.linkedIn.url,
          notes: template.requiredAttribution.linkedIn.notes || '',
        },
        {
          label: template.requiredAttribution.gitme.label,
          url: template.requiredAttribution.gitme.url,
          notes: template.requiredAttribution.gitme.notes || '',
        },
      ],
    },
  };
}
