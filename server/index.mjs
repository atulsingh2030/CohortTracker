import 'dotenv/config';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
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
const ALLOWED_ORIGINS = parseAllowedOrigins(process.env.ALLOWED_ORIGINS || process.env.CORS_ORIGIN || '');
const distPath = path.resolve(__dirname, '..', 'dist');

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

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (_request, response) => {
    response.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`CohortTracker API running on http://localhost:${port}`);
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
