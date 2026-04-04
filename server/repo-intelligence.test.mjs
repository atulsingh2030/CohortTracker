import test from 'node:test';
import assert from 'node:assert/strict';
import { renderLaunchPageDesign } from './lib/design-engine.mjs';
import { buildLaunchPage } from './lib/generator.mjs';
import { buildFallbackRepoIntelligence } from './lib/intelligence.mjs';
import { normalizeGitHubInput } from './lib/github.mjs';
import { isLegacyGeneratedPage } from './lib/storage.mjs';
import { buildTemplateContext } from './lib/templates/context.mjs';
import { buildPlatformShell } from './lib/templates/platform-shell.mjs';

function createSnapshot(input = 'https://github.com/acme/rocket') {
  return {
    normalized: normalizeGitHubInput(input),
    repo: {
      name: 'rocket-launch',
      description: 'Launch code faster for busy builders.',
      homepage: 'https://rocket.dev',
      topics: ['automation', 'react', 'launch'],
      stargazers_count: 42,
      forks_count: 9,
      subscribers_count: 4,
      open_issues_count: 2,
    },
    languages: {
      TypeScript: 300,
      CSS: 100,
    },
    ownerProfile: {
      handle: 'acme',
      displayName: 'Acme Labs',
      avatarUrl: 'https://avatars.example.com/acme.png',
      profileUrl: 'https://github.com/acme',
      bio: 'Tools for busy builders.',
      company: 'Acme',
      location: 'Kolkata',
      website: 'https://acme.dev',
      followers: 420,
      following: 12,
      publicRepos: 24,
      socialLinks: [
        {
          label: 'GitHub Profile',
          url: 'https://github.com/acme',
        },
        {
          label: 'Website',
          url: 'https://acme.dev',
        },
      ],
    },
    ownerRepositories: [
      {
        name: 'orbit-console',
        description: 'A second repo for testing credibility sections.',
        url: 'https://github.com/acme/orbit-console',
        stars: 91,
        forks: 12,
      },
    ],
    readme: {
      content: `# Rocket Launch

Launch code faster for busy builders.

- Automates release notes
- Publishes cleaner previews

## Quickstart

\`\`\`bash
npm install
npm run dev
\`\`\`

## Why it matters

The project helps teams ship with less setup friction.
`,
    },
  };
}

test('fallback intelligence explains meaning, audience, and Stitch prompt', () => {
  const intelligence = buildFallbackRepoIntelligence(createSnapshot());

  assert.equal(Boolean(intelligence.story.repositoryMeaning), true);
  assert.equal(intelligence.audienceProfiles.length > 0, true);
  assert.equal(/(launch|landing) page/.test(intelligence.design.stitchPrompt.toLowerCase()), true);
});

test('buildLaunchPage carries AI narrative fields when intelligence is provided', () => {
  const snapshot = createSnapshot();
  const intelligence = buildFallbackRepoIntelligence(snapshot);
  const page = buildLaunchPage(snapshot, intelligence);

  assert.equal(page.hero.title, intelligence.story.heroTitle);
  assert.equal(page.narrative?.audienceProfiles.length > 0, true);
  assert.equal(page.design?.themeKey, intelligence.design.themeKey);
  assert.equal(page.owner?.displayName, snapshot.ownerProfile.displayName);
  assert.equal(page.relatedRepos?.length, 1);
  assert.equal(page.visualParity?.status === 'balanced' || page.visualParity?.status === 'text-heavy', true);
  assert.equal(page.template?.id, 'template-1');
});

test('local design renderer returns html for AI-shaped page output', async () => {
  const snapshot = createSnapshot();
  const intelligence = buildFallbackRepoIntelligence(snapshot);
  const page = buildLaunchPage(snapshot, intelligence);
  const rendered = await renderLaunchPageDesign(page);

  assert.equal(rendered.provider, 'local-html');
  assert.equal(rendered.html.includes(page.hero.title), true);
  assert.equal(rendered.html.includes('Who it helps'), true);
  assert.equal(rendered.html.includes(snapshot.ownerProfile.displayName), true);
  assert.equal(rendered.html.includes(snapshot.ownerRepositories[0].name), true);
});

test('legacy page detection distinguishes old previews from new rendered pages', async () => {
  const snapshot = createSnapshot();
  const intelligence = buildFallbackRepoIntelligence(snapshot);
  const page = buildLaunchPage(snapshot, intelligence);
  const rendered = await renderLaunchPageDesign(page);

  assert.equal(
    isLegacyGeneratedPage({
      ...page,
      generationMode: 'ai-local-rendered',
      design: {
        ...page.design,
        provider: rendered.provider,
        status: rendered.status,
      },
      renderedHtml: rendered.html,
    }),
    false
  );

  assert.equal(isLegacyGeneratedPage(page), true);
});

test('template context stays stable for template renderers', () => {
  const snapshot = createSnapshot();
  const intelligence = buildFallbackRepoIntelligence(snapshot);
  const page = buildLaunchPage(snapshot, intelligence);
  const context = buildTemplateContext(page);

  assert.equal(context.template.id, 'template-1');
  assert.equal(context.version, 1);
  assert.equal(context.slots.summary.length, 3);
  assert.equal(context.proof.relatedRepos.length, 1);
});

test('platform shell carries universal additions without mutating template body', () => {
  const snapshot = createSnapshot();
  const intelligence = buildFallbackRepoIntelligence(snapshot);
  const page = buildLaunchPage(snapshot, intelligence);
  const shell = buildPlatformShell(page);

  assert.equal(shell.compatibility.status, 'supported');
  assert.equal(shell.universalModules[0].id, 'repository-signals');
  assert.equal(shell.universalModules[0].items.some((item) => item.label === 'Stars'), true);
  assert.equal(shell.attribution.links.some((link) => link.label === 'GitMe on GitHub'), true);
  assert.equal(shell.updatePolicy.templateBodyUpgrades, 'maintainer-opt-in');
});
