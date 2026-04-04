import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_WEIGHTS, normalizeWeights } from './scoring.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONFIG_DIR = path.resolve(__dirname, '..', '..', 'config');
const BASE_CONFIG_PATH = path.join(CONFIG_DIR, 'contribution-intelligence.json');
const LOCAL_CONFIG_PATH = path.join(CONFIG_DIR, 'contribution-intelligence.local.json');

const DEFAULT_SYNC = Object.freeze({
  cron: '0 6 * * *',
  timezone: 'UTC',
  lookbackDays: 56,
  bootstrapOnStart: true,
  staleAfterHours: 30,
  weekStartsOn: 'monday',
});

let cachedConfig = null;
let cachedStatKey = null;

export function getContributionConfig({ forceReload = false } = {}) {
  const statKey = readStatKey();

  if (!forceReload && cachedConfig && cachedStatKey === statKey) {
    return cachedConfig;
  }

  const baseConfig = readJsonIfExists(BASE_CONFIG_PATH);
  const localConfig = readJsonIfExists(LOCAL_CONFIG_PATH);
  const envRepositories = parseRepositoriesFromEnv(process.env.GITHUB_REPOSITORIES || process.env.CONTRIBUTION_REPOSITORIES || '');
  const envCron = process.env.CONTRIBUTION_SYNC_CRON || '';
  const envTimezone = process.env.CONTRIBUTION_SYNC_TIMEZONE || '';
  const envLookbackDays = Number(process.env.CONTRIBUTION_LOOKBACK_DAYS || '');

  const merged = deepMerge(
    {
      repositories: [],
      weights: DEFAULT_WEIGHTS,
      sync: DEFAULT_SYNC,
    },
    baseConfig || {},
    localConfig || {}
  );

  const repositories = normalizeRepositories(envRepositories.length ? envRepositories : merged.repositories);
  const config = {
    repositories,
    weights: normalizeWeights(merged.weights),
    sync: {
      ...DEFAULT_SYNC,
      ...merged.sync,
      ...(envCron ? { cron: envCron } : {}),
      ...(envTimezone ? { timezone: envTimezone } : {}),
      ...(Number.isFinite(envLookbackDays) && envLookbackDays > 0 ? { lookbackDays: envLookbackDays } : {}),
    },
    meta: {
      configPath: BASE_CONFIG_PATH,
      localOverridePath: LOCAL_CONFIG_PATH,
      usingLocalOverride: fs.existsSync(LOCAL_CONFIG_PATH),
      usingEnvRepositories: Boolean(envRepositories.length),
      hasGitHubToken: Boolean(process.env.GITHUB_TOKEN),
      syncSecretConfigured: Boolean(process.env.CONTRIBUTION_SYNC_SECRET),
    },
  };

  cachedConfig = config;
  cachedStatKey = statKey;

  return config;
}

export function getContributionConfigStatus() {
  const config = getContributionConfig();

  return {
    configured: config.repositories.length > 0,
    repositoryCount: config.repositories.length,
    repositories: config.repositories.map((repository) => repository.id),
    hasGitHubToken: config.meta.hasGitHubToken,
    configPath: config.meta.configPath,
    localOverridePath: config.meta.localOverridePath,
    usingLocalOverride: config.meta.usingLocalOverride,
    usingEnvRepositories: config.meta.usingEnvRepositories,
    manualSyncRequiresSecret: process.env.NODE_ENV === 'production',
    manualSyncSecretConfigured: config.meta.syncSecretConfigured,
    sync: config.sync,
  };
}

function readStatKey() {
  const baseMtime = safeMtime(BASE_CONFIG_PATH);
  const localMtime = safeMtime(LOCAL_CONFIG_PATH);
  const envKey = [
    process.env.GITHUB_REPOSITORIES || '',
    process.env.CONTRIBUTION_REPOSITORIES || '',
    process.env.CONTRIBUTION_SYNC_CRON || '',
    process.env.CONTRIBUTION_SYNC_TIMEZONE || '',
    process.env.CONTRIBUTION_LOOKBACK_DAYS || '',
  ].join('|');

  return `${baseMtime}|${localMtime}|${envKey}`;
}

function safeMtime(filePath) {
  try {
    return fs.statSync(filePath).mtimeMs;
  } catch {
    return 0;
  }
}

function readJsonIfExists(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function parseRepositoriesFromEnv(value) {
  if (!value.trim()) {
    return [];
  }

  return value
    .split(',')
    .map((repository) => repository.trim())
    .filter(Boolean)
    .map((repository) => {
      const [owner, repo] = repository.split('/');

      return {
        owner,
        repo,
      };
    });
}

function normalizeRepositories(repositories) {
  const seen = new Set();
  const normalized = [];

  for (const repository of Array.isArray(repositories) ? repositories : []) {
    const owner = `${repository?.owner || ''}`.trim();
    const repo = `${repository?.repo || ''}`.trim();

    if (!owner || !repo) {
      continue;
    }

    const id = `${owner}/${repo}`;

    if (seen.has(id.toLowerCase())) {
      continue;
    }

    seen.add(id.toLowerCase());
    normalized.push({
      id,
      owner,
      repo,
    });
  }

  return normalized;
}

function deepMerge(...values) {
  const output = {};

  for (const value of values) {
    if (!isPlainObject(value)) {
      continue;
    }

    for (const [key, candidate] of Object.entries(value)) {
      if (Array.isArray(candidate)) {
        output[key] = candidate.slice();
        continue;
      }

      if (isPlainObject(candidate)) {
        output[key] = deepMerge(output[key], candidate);
        continue;
      }

      output[key] = candidate;
    }
  }

  return output;
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}
