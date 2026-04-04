import type { ContributorDetail, DashboardSummary } from '../types/contributionDashboard';
import { buildApiUrl } from './apiBase';

const DEPLOY_HINT = 'Set VITE_API_BASE_URL to your deployed backend when the frontend and API are hosted separately.';

async function readJson<T>(input: RequestInfo | URL) {
  const requestUrl = `${input}`;
  let response: Response;

  try {
    response = await fetch(input);
  } catch {
    throw new Error(`Contribution API is unreachable. ${DEPLOY_HINT}`);
  }

  if (!response.ok) {
    const payload = await response.json().catch(async () => {
      const text = await response.text().catch(() => '');
      return text ? { error: text } : null;
    });

    if (response.status === 404 && requestUrl.includes('/api/')) {
      throw new Error(`Contribution API endpoint not found at ${requestUrl}. ${DEPLOY_HINT}`);
    }

    throw new Error(payload?.error || `Request failed (${response.status}).`);
  }

  try {
    return await response.json() as T;
  } catch {
    throw new Error('Contribution API returned an invalid JSON response.');
  }
}

export function fetchContributionDashboardSummary(weeks = 8) {
  return readJson<DashboardSummary>(buildApiUrl(`/api/contribution-intelligence/summary?weeks=${weeks}`));
}

export function fetchContributorDetail(username: string, weeks = 8) {
  return readJson<ContributorDetail>(buildApiUrl(`/api/contribution-intelligence/users/${encodeURIComponent(username)}?weeks=${weeks}`));
}
