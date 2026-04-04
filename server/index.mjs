import 'dotenv/config';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildLaunchPage } from './lib/generator.mjs';
import { fetchRepoSnapshot, normalizeGitHubInput } from './lib/github.mjs';
import { startGenerationJob } from './lib/orchestrator.mjs';
import { readGeneratedPage, readGeneratedPageIfExists, readGenerationJob, saveGeneratedPage } from './lib/storage.mjs';
import { listTemplateDefinitions } from './lib/templates/registry.mjs';
import {
  getContributionDashboardSummary,
  getContributorDetail,
  initializeContributionIntelligence,
  syncContributionData,
} from './lib/contribution-intelligence/service.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT || 3001);
const ROOT_HOSTS = new Set(['localhost', '127.0.0.1', 'supratik.space', 'www.supratik.space']);
const ALLOWED_ORIGINS = parseAllowedOrigins(process.env.ALLOWED_ORIGINS || process.env.CORS_ORIGIN || '');

app.use(express.json({ limit: '1mb' }));
initializeContributionIntelligence();
app.use((request, response, next) => {
  applyCorsHeaders(request, response);

  if (request.method === 'OPTIONS') {
    response.status(204).end();
    return;
  }

  next();
});

function getBaseUrl(request) {
  const proto = request.headers['x-forwarded-proto'] || request.protocol || 'http';
  return `${proto}://${request.get('host')}`;
}

function buildLaunchUrls(request, slug) {
  const baseUrl = getBaseUrl(request);
  const host = request.get('host') || '';
  const hostName = host.split(':')[0];
  const launchPath = `/launch/${slug}`;

  return {
    previewUrl: `${baseUrl}${launchPath}`,
    subdomainUrl: ROOT_HOSTS.has(hostName) ? `https://${slug}.supratik.space` : `${baseUrl}${launchPath}`,
  };
}

app.get('/api/health', (_request, response) => {
  response.json({ ok: true });
});

app.get('/api/contribution-intelligence/summary', async (request, response) => {
  try {
    const weeks = Number(request.query?.weeks || '');
    const summary = await getContributionDashboardSummary({ weeks });
    response.json(summary);
  } catch (error) {
    response.status(500).json({
      error: error instanceof Error ? error.message : 'Contribution summary could not be loaded.',
    });
  }
});

app.get('/api/contribution-intelligence/config', async (_request, response) => {
  try {
    const summary = await getContributionDashboardSummary();
    response.json({
      status: summary.status,
      repositories: summary.repositories,
      weights: summary.weights,
      window: summary.window,
    });
  } catch (error) {
    response.status(500).json({
      error: error instanceof Error ? error.message : 'Contribution configuration could not be loaded.',
    });
  }
});

app.get('/api/contribution-intelligence/users/:username', async (request, response) => {
  try {
    const weeks = Number(request.query?.weeks || '');
    const detail = await getContributorDetail(request.params.username, { weeks });

    if (!detail) {
      response.status(404).json({
        error: 'Contributor not found.',
      });
      return;
    }

    response.json(detail);
  } catch (error) {
    response.status(500).json({
      error: error instanceof Error ? error.message : 'Contributor detail could not be loaded.',
    });
  }
});

app.post('/api/contribution-intelligence/sync', async (request, response) => {
  if (!canTriggerContributionSync(request)) {
    response.status(403).json({
      error: 'Contribution sync is locked down. Configure CONTRIBUTION_SYNC_SECRET or use development mode.',
    });
    return;
  }

  try {
    const result = await syncContributionData({ reason: 'manual' });
    response.status(202).json(result);
  } catch (error) {
    response.status(500).json({
      error: error instanceof Error ? error.message : 'Contribution sync failed.',
    });
  }
});

app.get('/api/templates', async (request, response) => {
  const templates = await Promise.all(
    listTemplateDefinitions().map(async (template) => {
      const featuredPage = template.featuredSampleSlug
        ? await readGeneratedPageIfExists(template.featuredSampleSlug)
        : null;

      return {
        id: template.id,
        label: template.label,
        version: template.version,
        contextVersion: template.contextVersion,
        description: template.description,
        status: template.status,
        default: template.default,
        repositoryUrl: template.repositoryUrl,
        contributionsUrl: template.contributionsUrl,
        designFreedom: template.designFreedom,
        designGuidance: template.designGuidance,
        supportedContextRange: template.supportedContextRange,
        updatePolicy: template.updatePolicy,
        promptSuggestion: template.promptSuggestion,
        requiredAttribution: template.requiredAttribution,
        featuredSample: featuredPage
          ? {
              slug: featuredPage.slug,
              previewUrl: buildLaunchUrls(request, featuredPage.slug).previewUrl,
              repoUrl: featuredPage.source.repoUrl,
              repoName: `${featuredPage.source.owner}/${featuredPage.source.repo}`,
              title: featuredPage.hero.title,
            }
          : null,
      };
    })
  );

  response.json({
    templates,
  });
});

app.post('/api/pages/generate', async (request, response) => {
  const repoUrl = `${request.body?.repoUrl || ''}`;
  const templateId = `${request.body?.templateId || ''}` || undefined;

  try {
    const job = await startGenerationJob(repoUrl, {
      proto: request.headers['x-forwarded-proto'] || request.protocol || 'http',
      host: request.get('host') || '',
    }, { templateId });

    response.status(202).json(job);
  } catch (error) {
    response.status(400).json({
      error: error instanceof Error ? error.message : 'Generation could not be started.',
    });
  }
});

app.get('/api/jobs/:jobId', async (request, response) => {
  try {
    const job = await readGenerationJob(request.params.jobId);
    response.json(job);
  } catch {
    response.status(404).json({
      error: 'Generation job not found.',
    });
  }
});

app.post('/api/pages/preview', async (request, response) => {
  const repoUrl = `${request.body?.repoUrl || ''}`;
  const templateId = `${request.body?.templateId || ''}` || undefined;

  try {
    const normalized = normalizeGitHubInput(repoUrl);
    const snapshot = await fetchRepoSnapshot(normalized);
    const page = buildLaunchPage(snapshot, null, { templateId });
    const urls = buildLaunchUrls(request, page.slug);
    const storedPage = {
      ...page,
      urls,
    };

    await saveGeneratedPage(storedPage);

    response.status(201).json({
      slug: storedPage.slug,
      previewUrl: storedPage.urls.previewUrl,
      subdomainUrl: storedPage.urls.subdomainUrl,
      page: storedPage,
    });
  } catch (error) {
    response.status(400).json({
      error: error instanceof Error ? error.message : 'Preview generation failed.',
    });
  }
});

app.get('/api/pages/:slug', async (request, response) => {
  try {
    const page = await readGeneratedPage(request.params.slug);
    response.json(page);
  } catch {
    response.status(404).json({
      error: 'Generated page not found.',
    });
  }
});

const distPath = path.resolve(__dirname, '..', 'dist');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (_request, response) => {
    response.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Repo launch API running on http://localhost:${port}`);
});

function canTriggerContributionSync(request) {
  const configuredSecret = process.env.CONTRIBUTION_SYNC_SECRET;

  if (configuredSecret) {
    return request.get('x-sync-secret') === configuredSecret;
  }

  return process.env.NODE_ENV !== 'production';
}

function applyCorsHeaders(request, response) {
  const origin = request.get('origin');
  const allowOrigin = resolveAllowedOrigin(origin);

  if (allowOrigin) {
    response.setHeader('Access-Control-Allow-Origin', allowOrigin);
    response.setHeader('Vary', 'Origin');
  }

  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Sync-Secret');
}

function resolveAllowedOrigin(origin) {
  if (!origin) {
    return '*';
  }

  if (ALLOWED_ORIGINS.size === 0) {
    return origin;
  }

  return ALLOWED_ORIGINS.has(origin) ? origin : null;
}

function parseAllowedOrigins(value) {
  return new Set(
    value
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean)
  );
}
