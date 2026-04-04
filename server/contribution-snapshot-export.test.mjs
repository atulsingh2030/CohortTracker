import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import test from 'node:test';

const TEST_DATABASE_PATH = path.join(process.cwd(), 'server', 'data', `contribution-intelligence-export-test-${process.pid}.sqlite`);
const TEST_OUTPUT_DIR = path.join(os.tmpdir(), `cohorttracker-export-${process.pid}`);

process.env.CONTRIBUTION_DATABASE_PATH = TEST_DATABASE_PATH;
process.env.GITHUB_REPOSITORIES = 'acme/rocket,acme/orbit';

const [
  { replaceContributionWindow },
  { computeContributionScore },
  { exportContributionSnapshot },
  { subtractDays, toDateKey },
] = await Promise.all([
  import('./lib/contribution-intelligence/database.mjs'),
  import('./lib/contribution-intelligence/scoring.mjs'),
  import('./lib/contribution-intelligence/export-snapshot.mjs'),
  import('./lib/contribution-intelligence/dates.mjs'),
]);

test.after(() => {
  delete process.env.CONTRIBUTION_DATABASE_PATH;
  delete process.env.GITHUB_REPOSITORIES;
  safeRemove(TEST_DATABASE_PATH);
  safeRemove(TEST_OUTPUT_DIR);
});

test('exportContributionSnapshot writes summary and per-user detail files', async () => {
  safeRemove(TEST_DATABASE_PATH);
  safeRemove(TEST_OUTPUT_DIR);

  const contributionDate = toDateKey(subtractDays(new Date(), 1));

  replaceContributionWindow({
    sinceDate: contributionDate,
    repositories: [
      { id: 'acme/rocket', owner: 'acme', repo: 'rocket' },
      { id: 'acme/orbit', owner: 'acme', repo: 'orbit' },
    ],
    users: [
      { username: 'alice', displayName: 'Alice', avatarUrl: null, profileUrl: null },
      { username: 'bob', displayName: 'Bob', avatarUrl: null, profileUrl: null },
    ],
    rows: [
      {
        username: 'alice',
        displayName: 'Alice',
        avatarUrl: null,
        profileUrl: null,
        repoOwner: 'acme',
        repoName: 'rocket',
        contributionDate,
        prOpened: 1,
        prMerged: 1,
        issuesClosed: 0,
        reviews: 2,
        commits: 1,
        score: computeContributionScore({ prOpened: 1, prMerged: 1, issuesClosed: 0, reviews: 2, commits: 1 }),
      },
      {
        username: 'bob',
        displayName: 'Bob',
        avatarUrl: null,
        profileUrl: null,
        repoOwner: 'acme',
        repoName: 'orbit',
        contributionDate,
        prOpened: 0,
        prMerged: 1,
        issuesClosed: 1,
        reviews: 0,
        commits: 1,
        score: computeContributionScore({ prOpened: 0, prMerged: 1, issuesClosed: 1, reviews: 0, commits: 1 }),
      },
    ],
  });

  const result = await exportContributionSnapshot({
    outputDir: TEST_OUTPUT_DIR,
    weeks: 8,
    sync: false,
  });

  const summary = JSON.parse(fs.readFileSync(path.join(TEST_OUTPUT_DIR, 'summary.json'), 'utf8'));
  const aliceDetail = JSON.parse(fs.readFileSync(path.join(TEST_OUTPUT_DIR, 'users', 'alice.json'), 'utf8'));
  const meta = JSON.parse(fs.readFileSync(path.join(TEST_OUTPUT_DIR, 'meta.json'), 'utf8'));

  assert.equal(result.usernames.includes('alice'), true);
  assert.equal(result.usernames.includes('bob'), true);
  assert.equal(summary.status.configured, true);
  assert.equal(summary.contributors.some((contributor) => contributor.username === 'alice'), true);
  assert.equal(aliceDetail.user.username, 'alice');
  assert.equal(meta.contributorCount >= 2, true);
});

function safeRemove(targetPath) {
  try {
    fs.rmSync(targetPath, { recursive: true, force: true });
  } catch {
    // best-effort cleanup for temp test output
  }
}
