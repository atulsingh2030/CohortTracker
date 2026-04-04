import { renderLaunchPageDesign } from './design-engine.mjs';
import { buildLaunchPage } from './generator.mjs';
import { fetchRepoSnapshot, normalizeGitHubInput } from './github.mjs';
import { generateRepoIntelligence } from './intelligence.mjs';
import {
  createGenerationJob,
  markPhaseStatus,
  readGenerationJob,
  saveGeneratedPage,
  saveGenerationJob,
  updateGenerationJob,
} from './storage.mjs';
import { getTemplateDefinition } from './templates/registry.mjs';

function getBaseUrlFromRequestMeta(requestMeta) {
  const proto = requestMeta?.proto || 'http';
  const host = requestMeta?.host || 'localhost:3001';

  return `${proto}://${host}`;
}

function buildLaunchUrls(requestMeta, slug) {
  const host = requestMeta?.host || '';
  const hostName = host.split(':')[0];
  const baseUrl = getBaseUrlFromRequestMeta(requestMeta);
  const rootHosts = new Set(['localhost', '127.0.0.1', 'supratik.space', 'www.supratik.space']);
  const previewUrl = `${baseUrl}/launch/${slug}`;

  return {
    previewUrl,
    subdomainUrl: rootHosts.has(hostName) ? `https://${slug}.supratik.space` : previewUrl,
  };
}

export async function startGenerationJob(repoUrl, requestMeta, options = {}) {
  const normalized = normalizeGitHubInput(repoUrl);
  const template = getTemplateDefinition(options.templateId);
  const job = createGenerationJob(normalized.input, template.id);

  await saveGenerationJob(job);

  queueMicrotask(() => {
    runGenerationJob(job.id, normalized, requestMeta, { templateId: template.id }).catch(async (error) => {
      const message = error instanceof Error ? error.message : 'Generation failed.';
      const currentJob = await readGenerationJob(job.id).catch(() => null);
      const currentPhase = currentJob?.currentPhaseKey || 'publish_preview';

      await markPhaseStatus(job.id, currentPhase, 'failed', message).catch(() => null);
      await updateGenerationJob(job.id, (nextJob) => ({
        ...nextJob,
        status: 'failed',
        error: message,
      })).catch(() => null);
    });
  });

  return job;
}

async function runGenerationJob(jobId, normalized, requestMeta, options = {}) {
  await markPhaseStatus(jobId, 'fetch_repo', 'running', 'Reading repository metadata, languages, and README.');
  const snapshot = await fetchRepoSnapshot(normalized);
  await markPhaseStatus(jobId, 'fetch_repo', 'completed', 'Repository signals loaded successfully.');

  await markPhaseStatus(jobId, 'understand_repo', 'running', 'Understanding what the repo means and who benefits.');
  const intelligence = await generateRepoIntelligence(snapshot);
  await markPhaseStatus(jobId, 'understand_repo', 'completed', 'Repo meaning and impacted audiences identified.');

  await markPhaseStatus(jobId, 'write_story', 'running', 'Writing hero copy, importance, and impact narrative.');
  const basePage = buildLaunchPage(snapshot, intelligence, { templateId: options.templateId });
  await markPhaseStatus(jobId, 'write_story', 'completed', 'Launch-page story and copy are ready.');

  await markPhaseStatus(jobId, 'craft_design_prompt', 'running', 'Turning the repo meaning into a design-system brief.');
  await markPhaseStatus(
    jobId,
    'craft_design_prompt',
    'completed',
    intelligence.design?.stitchPrompt
      ? 'Design prompt prepared for a Stitch-style rendering flow.'
      : 'Design prompt prepared from fallback repo understanding.'
  );

  await markPhaseStatus(jobId, 'render_page', 'running', 'Rendering the final launch page design.');
  const designResult = await renderLaunchPageDesign(basePage);
  await markPhaseStatus(
    jobId,
    'render_page',
    'completed',
    designResult.provider === 'stitch-http'
      ? 'Page rendered through the Stitch-compatible provider.'
      : 'Page rendered with the built-in design engine.'
  );

  await markPhaseStatus(jobId, 'publish_preview', 'running', 'Saving the page and preparing preview URLs.');
  const urls = buildLaunchUrls(requestMeta, basePage.slug);
  const storedPage = {
    ...basePage,
    generatedAt: new Date().toISOString(),
    generationMode: designResult.provider === 'stitch-http' ? 'ai-stitch-http' : 'ai-local-rendered',
    renderedHtml: designResult.html,
    design: {
      ...(basePage.design || {}),
      provider: designResult.provider,
      status: designResult.status,
      note: designResult.note || '',
    },
    urls,
  };

  await saveGeneratedPage(storedPage);

  await markPhaseStatus(jobId, 'publish_preview', 'completed', 'Preview is ready to open.');
  await updateGenerationJob(jobId, (job) => ({
    ...job,
    status: 'completed',
    slug: storedPage.slug,
    previewUrl: urls.previewUrl,
    subdomainUrl: urls.subdomainUrl,
    generationMode: storedPage.generationMode,
    error: '',
  }));
}
