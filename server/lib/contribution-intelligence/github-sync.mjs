import { createEmptyMetrics, computeContributionScore } from './scoring.mjs';
import { toDateKey } from './dates.mjs';

const BASE_URL = 'https://api.github.com';
const API_VERSION = '2022-11-28';
const USER_AGENT = 'MartianCrown-Contribution-Intelligence';

export async function fetchContributionRowsForRepository(repository, { sinceDate, weights }) {
  const sinceIso = `${sinceDate}T00:00:00.000Z`;
  const rows = new Map();
  const users = new Map();

  await Promise.all([
    hydratePullRequestMetrics(repository, sinceIso, rows, users),
    hydrateIssueMetrics(repository, sinceIso, rows, users),
    hydrateCommitMetrics(repository, sinceIso, rows, users),
  ]);

  return {
    users: Array.from(users.values()),
    rows: Array.from(rows.values()).map((row) => ({
      ...row,
      score: computeContributionScore(row, weights),
    })),
  };
}

async function hydratePullRequestMetrics(repository, sinceIso, rows, users) {
  const pulls = await listRelevantPullRequests(repository, sinceIso);
  const reviewPromises = [];

  for (const pullRequest of pulls) {
    const author = toUserProfile(pullRequest.user);

    if (author && isOnOrAfterIso(pullRequest.created_at, sinceIso)) {
      registerUser(users, author);
      incrementMetric(rows, repository, author.username, toDateKey(pullRequest.created_at), 'prOpened', 1, author);
    }

    if (author && pullRequest.merged_at && isOnOrAfterIso(pullRequest.merged_at, sinceIso)) {
      registerUser(users, author);
      incrementMetric(rows, repository, author.username, toDateKey(pullRequest.merged_at), 'prMerged', 1, author);
    }

    if (isRelevantPullRequestForReviews(pullRequest, sinceIso)) {
      reviewPromises.push(hydrateReviewMetrics(repository, pullRequest.number, sinceIso, rows, users));
    }
  }

  await Promise.all(reviewPromises);
}

async function hydrateReviewMetrics(repository, pullNumber, sinceIso, rows, users) {
  const reviews = await paginateGitHub(`/repos/${repository.owner}/${repository.repo}/pulls/${pullNumber}/reviews`);

  for (const review of reviews) {
    if (!review.submitted_at || !isOnOrAfterIso(review.submitted_at, sinceIso)) {
      continue;
    }

    const reviewer = toUserProfile(review.user);

    if (!reviewer) {
      continue;
    }

    registerUser(users, reviewer);
    incrementMetric(rows, repository, reviewer.username, toDateKey(review.submitted_at), 'reviews', 1, reviewer);
  }
}

async function hydrateIssueMetrics(repository, sinceIso, rows, users) {
  const items = await paginateGitHub(
    `/repos/${repository.owner}/${repository.repo}/issues?state=all&since=${encodeURIComponent(sinceIso)}`
  );

  for (const item of items) {
    if (item.pull_request) {
      continue;
    }

    if (!item.closed_at || !isOnOrAfterIso(item.closed_at, sinceIso)) {
      continue;
    }

    const closer = toUserProfile(item.closed_by);

    if (!closer) {
      continue;
    }

    registerUser(users, closer);
    incrementMetric(rows, repository, closer.username, toDateKey(item.closed_at), 'issuesClosed', 1, closer);
  }
}

async function hydrateCommitMetrics(repository, sinceIso, rows, users) {
  const commits = await paginateGitHub(
    `/repos/${repository.owner}/${repository.repo}/commits?since=${encodeURIComponent(sinceIso)}`
  );

  for (const commit of commits) {
    const authoredAt = commit?.commit?.author?.date || commit?.commit?.committer?.date;

    if (!authoredAt || !isOnOrAfterIso(authoredAt, sinceIso) || isMergeCommit(commit)) {
      continue;
    }

    const user = toUserProfile(commit.author, commit?.commit?.author?.name);

    if (!user) {
      continue;
    }

    registerUser(users, user);
    incrementMetric(rows, repository, user.username, toDateKey(authoredAt), 'commits', 1, user);
  }
}

async function listRelevantPullRequests(repository, sinceIso) {
  const pulls = [];
  let page = 1;

  while (true) {
    const pageItems = await fetchGitHubJson(
      `/repos/${repository.owner}/${repository.repo}/pulls?state=all&sort=updated&direction=desc&per_page=100&page=${page}`
    );

    if (!Array.isArray(pageItems) || pageItems.length === 0) {
      break;
    }

    for (const pullRequest of pageItems) {
      if (hasRelevantPullRequestActivity(pullRequest, sinceIso)) {
        pulls.push(pullRequest);
      }
    }

    const shouldContinue = pageItems.some((pullRequest) => isRelevantPullRequestForReviews(pullRequest, sinceIso));

    if (!shouldContinue) {
      break;
    }

    page += 1;
  }

  return pulls;
}

async function paginateGitHub(endpoint) {
  const collected = [];
  let page = 1;

  while (true) {
    const separator = endpoint.includes('?') ? '&' : '?';
    const pageItems = await fetchGitHubJson(`${endpoint}${separator}per_page=100&page=${page}`);

    if (!Array.isArray(pageItems) || pageItems.length === 0) {
      break;
    }

    collected.push(...pageItems);

    if (pageItems.length < 100) {
      break;
    }

    page += 1;
  }

  return collected;
}

async function fetchGitHubJson(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: buildHeaders(),
  });

  if (!response.ok) {
    const body = await safeReadBody(response);

    if (shouldTreatAsEmptyResult(response.status, body)) {
      return [];
    }

    const rateLimitReset = response.headers.get('x-ratelimit-reset');
    const rateLimitMessage = rateLimitReset
      ? ` Rate limit resets at ${new Date(Number(rateLimitReset) * 1000).toISOString()}.`
      : '';

    throw new Error(
      `GitHub API request failed (${response.status}) for ${endpoint}. ${body || 'No additional details.'}${rateLimitMessage}`
    );
  }

  return response.json();
}

export function shouldTreatAsEmptyResult(status, body) {
  return status === 409 && `${body || ''}`.toLowerCase().includes('git repository is empty');
}

function buildHeaders() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': USER_AGENT,
    'X-GitHub-Api-Version': API_VERSION,
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function safeReadBody(response) {
  try {
    const payload = await response.json();
    return payload?.message || JSON.stringify(payload);
  } catch {
    try {
      return await response.text();
    } catch {
      return '';
    }
  }
}

function hasRelevantPullRequestActivity(pullRequest, sinceIso) {
  return [
    pullRequest.created_at,
    pullRequest.updated_at,
    pullRequest.merged_at,
  ].some((value) => isOnOrAfterIso(value, sinceIso));
}

function isRelevantPullRequestForReviews(pullRequest, sinceIso) {
  return isOnOrAfterIso(pullRequest.updated_at, sinceIso)
    || isOnOrAfterIso(pullRequest.created_at, sinceIso)
    || isOnOrAfterIso(pullRequest.merged_at, sinceIso);
}

function incrementMetric(rows, repository, username, contributionDate, field, value, profile) {
  const key = `${username}::${repository.id}::${contributionDate}`;

  if (!rows.has(key)) {
    rows.set(key, {
      username,
      displayName: profile.displayName,
      avatarUrl: profile.avatarUrl,
      profileUrl: profile.profileUrl,
      repoOwner: repository.owner,
      repoName: repository.repo,
      contributionDate,
      ...createEmptyMetrics(),
      score: 0,
    });
  }

  const row = rows.get(key);
  row[field] += value;
}

function registerUser(users, profile) {
  const existing = users.get(profile.username);

  if (!existing) {
    users.set(profile.username, profile);
    return;
  }

  users.set(profile.username, {
    ...existing,
    displayName: pickDisplayName(existing.displayName, profile.displayName, profile.username),
    avatarUrl: profile.avatarUrl || existing.avatarUrl,
    profileUrl: profile.profileUrl || existing.profileUrl,
  });
}

function pickDisplayName(existing, candidate, username) {
  const normalizedExisting = `${existing || ''}`.trim();
  const normalizedCandidate = `${candidate || ''}`.trim();

  if (normalizedCandidate && normalizedCandidate !== username) {
    return normalizedCandidate;
  }

  if (normalizedExisting) {
    return normalizedExisting;
  }

  return normalizedCandidate || username;
}

function toUserProfile(user, fallbackName = '') {
  const username = `${user?.login || ''}`.trim();

  if (!username || isBotUser(user)) {
    return null;
  }

  return {
    username,
    displayName: `${fallbackName || user?.login || ''}`.trim() || username,
    avatarUrl: user?.avatar_url || null,
    profileUrl: user?.html_url || null,
  };
}

function isBotUser(user) {
  const username = `${user?.login || ''}`.toLowerCase();
  return user?.type === 'Bot' || username.endsWith('[bot]') || username.endsWith('-bot');
}

function isMergeCommit(commit) {
  return (Array.isArray(commit.parents) && commit.parents.length > 1)
    || `${commit?.commit?.message || ''}`.startsWith('Merge ');
}

function isOnOrAfterIso(candidate, threshold) {
  if (!candidate) {
    return false;
  }

  return new Date(candidate).getTime() >= new Date(threshold).getTime();
}
