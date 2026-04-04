import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { DEFAULT_TEMPLATE_ID, buildStoredTemplateSummary } from './templates/registry.mjs';
import { buildPlatformShell } from './templates/platform-shell.mjs';

const DATA_DIR = path.resolve(process.cwd(), 'server', 'data');
const PAGE_DIR = path.join(DATA_DIR, 'pages');
const JOB_DIR = path.join(DATA_DIR, 'jobs');

async function ensureDir(directoryPath) {
  await fs.mkdir(directoryPath, { recursive: true });
}

async function writeJson(directoryPath, fileName, payload) {
  await ensureDir(directoryPath);
  const filePath = path.join(directoryPath, fileName);
  await fs.writeFile(filePath, JSON.stringify(payload, null, 2), 'utf-8');
}

async function readJson(directoryPath, fileName) {
  await ensureDir(directoryPath);
  const filePath = path.join(directoryPath, fileName);
  const content = await fs.readFile(filePath, 'utf-8');

  return JSON.parse(content);
}

export function createGenerationPhases() {
  return [
    {
      key: 'fetch_repo',
      label: 'Reading the repository',
      status: 'pending',
      message: 'Checking the URL, repo metadata, languages, and README.',
    },
    {
      key: 'understand_repo',
      label: 'Understanding who this helps',
      status: 'pending',
      message: 'Interpreting the repo in plain language and identifying the people it serves.',
    },
    {
      key: 'write_story',
      label: 'Writing the page story',
      status: 'pending',
      message: 'Shaping the title, subtitle, benefits, and importance of the project.',
    },
    {
      key: 'craft_design_prompt',
      label: 'Crafting the design brief',
      status: 'pending',
      message: 'Turning the repo meaning into a visual direction and Stitch-ready prompt.',
    },
    {
      key: 'render_page',
      label: 'Rendering the launch page',
      status: 'pending',
      message: 'Generating the final page design and HTML output.',
    },
    {
      key: 'publish_preview',
      label: 'Publishing the preview',
      status: 'pending',
      message: 'Saving the generated page and preparing the preview URL.',
    },
  ];
}

export function createGenerationJob(repoUrl, templateId) {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    repoUrl,
    templateId,
    status: 'queued',
    createdAt: now,
    updatedAt: now,
    currentPhaseKey: 'fetch_repo',
    phases: createGenerationPhases(),
  };
}

export async function saveGeneratedPage(page) {
  await writeJson(PAGE_DIR, `${page.slug}.json`, page);
}

export function isLegacyGeneratedPage(page) {
  return !page?.renderedHtml || !page?.generationMode || !page?.design?.provider;
}

export async function readGeneratedPage(slug) {
  const page = await readJson(PAGE_DIR, `${slug}.json`);
  const templateId = page?.template?.id || DEFAULT_TEMPLATE_ID;
  const template = {
    ...buildStoredTemplateSummary(templateId),
    ...(page.template || {}),
  };
  const enrichedPage = {
    ...page,
    template,
  };

  return {
    ...enrichedPage,
    legacy: isLegacyGeneratedPage(enrichedPage),
    platformShell: buildPlatformShell(enrichedPage),
  };
}

export async function readGeneratedPageIfExists(slug) {
  try {
    return await readGeneratedPage(slug);
  } catch {
    return null;
  }
}

export async function saveGenerationJob(job) {
  await writeJson(JOB_DIR, `${job.id}.json`, job);
}

export async function readGenerationJob(jobId) {
  return readJson(JOB_DIR, `${jobId}.json`);
}

export async function updateGenerationJob(jobId, transform) {
  const current = await readGenerationJob(jobId);
  const next = transform({
    ...current,
    updatedAt: new Date().toISOString(),
  });

  await saveGenerationJob(next);

  return next;
}

export async function markPhaseStatus(jobId, phaseKey, status, message) {
  return updateGenerationJob(jobId, (job) => {
    const phases = job.phases.map((phase) => {
      if (phase.key !== phaseKey) {
        return phase;
      }

      const now = new Date().toISOString();

      return {
        ...phase,
        status,
        message,
        startedAt: phase.startedAt || (status === 'running' ? now : phase.startedAt),
        completedAt: status === 'completed' || status === 'failed' ? now : phase.completedAt,
      };
    });

    const statusMap = {
      pending: 'queued',
      running: 'processing',
      completed: job.status,
      failed: 'failed',
    };

    return {
      ...job,
      phases,
      currentPhaseKey: phaseKey,
      status: statusMap[status] || job.status,
    };
  });
}
