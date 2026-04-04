import { Buffer } from 'node:buffer';

const GITHUB_API_ROOT = 'https://api.github.com';

function buildHeaders() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'supratik-space-repo-launch-pages',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function fetchGitHubJson(pathname) {
  const response = await fetch(`${GITHUB_API_ROOT}${pathname}`, {
    headers: buildHeaders(),
  });

  if (!response.ok) {
    let message = `GitHub request failed with ${response.status}`;

    try {
      const payload = await response.json();
      if (payload?.message) {
        message = payload.message;
      }
    } catch {
      // Fall through to the default message.
    }

    throw new Error(message);
  }

  return response.json();
}

async function fetchOptionalGitHubJson(pathname) {
  try {
    return await fetchGitHubJson(pathname);
  } catch {
    return null;
  }
}

function normalizeExternalUrl(value) {
  const raw = `${value || ''}`.trim();

  if (!raw) {
    return '';
  }

  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    const url = new URL(candidate);

    if (!['http:', 'https:'].includes(url.protocol)) {
      return '';
    }

    return url.toString();
  } catch {
    return '';
  }
}

function mapOwnerProfile(profile, owner) {
  if (!profile) {
    return null;
  }

  const socialLinks = [];
  const website = normalizeExternalUrl(profile.blog);

  socialLinks.push({
    label: 'GitHub Profile',
    url: profile.html_url || `https://github.com/${owner}`,
  });

  if (website) {
    socialLinks.push({
      label: 'Website',
      url: website,
    });
  }

  if (profile.twitter_username) {
    socialLinks.push({
      label: 'Twitter',
      url: `https://x.com/${profile.twitter_username}`,
    });
  }

  return {
    handle: owner,
    displayName: profile.name || owner,
    avatarUrl: profile.avatar_url || '',
    profileUrl: profile.html_url || `https://github.com/${owner}`,
    bio: profile.bio || '',
    company: profile.company || '',
    location: profile.location || '',
    website,
    followers: Number(profile.followers || 0),
    following: Number(profile.following || 0),
    publicRepos: Number(profile.public_repos || 0),
    socialLinks,
  };
}

function mapRelatedRepositories(repositories, currentRepo) {
  if (!Array.isArray(repositories)) {
    return [];
  }

  return repositories
    .filter((repository) => !repository.fork)
    .filter((repository) => repository.name?.toLowerCase() !== currentRepo.toLowerCase())
    .sort((left, right) => {
      const starDelta = (right.stargazers_count || 0) - (left.stargazers_count || 0);

      if (starDelta !== 0) {
        return starDelta;
      }

      return (right.forks_count || 0) - (left.forks_count || 0);
    })
    .slice(0, 4)
    .map((repository) => ({
      name: repository.name,
      description: repository.description || '',
      url: repository.html_url,
      stars: Number(repository.stargazers_count || 0),
      forks: Number(repository.forks_count || 0),
    }));
}

export function normalizeGitHubInput(rawInput) {
  const input = rawInput.trim();

  if (!input) {
    throw new Error('Enter a public GitHub repository URL.');
  }

  if (/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(input)) {
    return normalizeGitHubInput(`https://github.com/${input}`);
  }

  let url;

  try {
    url = new URL(input);
  } catch {
    throw new Error('Use a valid GitHub repository URL.');
  }

  if (!['github.com', 'www.github.com'].includes(url.hostname)) {
    throw new Error('Only public GitHub repositories are supported right now.');
  }

  const segments = url.pathname.split('/').filter(Boolean);

  if (segments.length < 2) {
    throw new Error('GitHub repository URLs must include both owner and repo.');
  }

  const owner = segments[0];
  const repo = segments[1].replace(/\.git$/i, '');
  let branch = '';
  let subPath = '';

  if (segments[2] === 'tree' && segments[3]) {
    branch = segments[3];
    subPath = decodeURIComponent(segments.slice(4).join('/'));
  }

  const canonicalRepoUrl = `https://github.com/${owner}/${repo}`;

  return {
    input,
    owner,
    repo,
    branch,
    subPath,
    canonicalRepoUrl,
  };
}

export async function fetchRepoSnapshot(normalized) {
  const repo = await fetchGitHubJson(`/repos/${normalized.owner}/${normalized.repo}`);
  const defaultBranch = normalized.branch || repo.default_branch;
  const [languages, readmeResponse, ownerProfileResponse, ownerRepositoriesResponse] = await Promise.all([
    fetchGitHubJson(`/repos/${normalized.owner}/${normalized.repo}/languages`),
    fetchOptionalGitHubJson(`/repos/${normalized.owner}/${normalized.repo}/readme?ref=${encodeURIComponent(defaultBranch)}`),
    fetchOptionalGitHubJson(`/users/${normalized.owner}`),
    fetchOptionalGitHubJson(`/users/${normalized.owner}/repos?per_page=100&type=owner&sort=updated`),
  ]);

  const readme = readmeResponse
    ? {
        name: readmeResponse.name,
        path: readmeResponse.path,
        downloadUrl: readmeResponse.download_url,
        content: Buffer.from(readmeResponse.content || '', 'base64').toString('utf-8'),
      }
    : null;

  return {
    repo,
    readme,
    languages,
    ownerProfile: mapOwnerProfile(ownerProfileResponse, normalized.owner),
    ownerRepositories: mapRelatedRepositories(ownerRepositoriesResponse, normalized.repo),
    normalized: {
      ...normalized,
      branch: defaultBranch,
    },
  };
}
