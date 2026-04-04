import type { ContributorDetail, DashboardSummary } from '../types/contributionDashboard';
import { buildApiUrl } from './apiBase';

type ContributionDataMode = 'api' | 'static';

const DEPLOY_HINT = 'Set VITE_API_BASE_URL to your deployed backend when the frontend and API are hosted separately.';
const STATIC_HINT = 'Run the Contribution Snapshot workflow in GitHub Actions so the frontend has fresh static data to read.';
const DEFAULT_SNAPSHOT_BASE_URL = '/contribution-data/latest';

function normalizeMode(value: string | undefined): ContributionDataMode | null {
  const normalized = `${value || ''}`.trim().toLowerCase();

  if (normalized === 'api' || normalized === 'static') {
    return normalized;
  }

  return null;
}

function normalizeBaseUrl(value: string | undefined) {
  const trimmed = `${value || ''}`.trim();

  if (!trimmed) {
    return '';
  }

  return trimmed.endsWith('/') ? trimmed.slice(0, -1) : trimmed;
}

export function getContributionDataMode(): ContributionDataMode {
  const explicitMode = normalizeMode(import.meta.env.VITE_CONTRIBUTION_DATA_MODE);

  if (explicitMode) {
    return explicitMode;
  }

  if (normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL)) {
    return 'api';
  }

  if (typeof window !== 'undefined') {
    const host = window.location.hostname.toLowerCase();

    if (host === 'localhost' || host === '127.0.0.1') {
      return 'api';
    }
  }

  return 'static';
}

function buildSnapshotUrl(path: string) {
  const baseUrl = normalizeBaseUrl(import.meta.env.VITE_CONTRIBUTION_SNAPSHOT_BASE_URL) || DEFAULT_SNAPSHOT_BASE_URL;
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

  return `${baseUrl}/${normalizedPath}`;
}

async function readJson<T>(input: RequestInfo | URL, { mode }: { mode: ContributionDataMode }) {
  const requestUrl = `${input}`;
  let response: Response;

  try {
    response = await fetch(input);
  } catch {
    throw new Error(
      mode === 'api'
        ? `Contribution API is unreachable. ${DEPLOY_HINT}`
        : `Contribution snapshot is unreachable. ${STATIC_HINT}`
    );
  }

  if (!response.ok) {
    const payload = await response.json().catch(async () => {
      const text = await response.text().catch(() => '');
      return text ? { error: text } : null;
    });

    if (response.status === 404 && mode === 'api' && requestUrl.includes('/api/')) {
      throw new Error(`Contribution API endpoint not found at ${requestUrl}. ${DEPLOY_HINT}`);
    }

    if (response.status === 404 && mode === 'static') {
      throw new Error(`Contribution snapshot files were not found at ${requestUrl}. ${STATIC_HINT}`);
    }

    throw new Error(payload?.error || `Request failed (${response.status}).`);
  }

  try {
    return await response.json() as T;
  } catch {
    throw new Error('Contribution data returned an invalid JSON response.');
  }
}

export function fetchContributionDashboardSummary(weeks = 8) {
  const mode = getContributionDataMode();

  if (mode === 'static') {
    return readJson<DashboardSummary>(buildSnapshotUrl('summary.json'), { mode });
  }

  return readJson<DashboardSummary>(buildApiUrl(`/api/contribution-intelligence/summary?weeks=${weeks}`), { mode });
}

export function fetchContributorDetail(username: string, weeks = 8) {
  const mode = getContributionDataMode();

  if (mode === 'static') {
    return readJson<ContributorDetail>(buildSnapshotUrl(`users/${encodeURIComponent(username)}.json`), { mode });
  }

  return readJson<ContributorDetail>(
    buildApiUrl(`/api/contribution-intelligence/users/${encodeURIComponent(username)}?weeks=${weeks}`),
    { mode }
  );
}
