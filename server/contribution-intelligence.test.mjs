import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import test from 'node:test';

const TEST_DATABASE_PATH = path.join(process.cwd(), 'server', 'data', `contribution-intelligence-test-${process.pid}.sqlite`);

process.env.CONTRIBUTION_DATABASE_PATH = TEST_DATABASE_PATH;
process.env.GITHUB_REPOSITORIES = 'acme/rocket,acme/orbit';

const [
  { replaceContributionWindow },
  { computeContributionScore },
  { getContributionDashboardSummary, getContributorDetail },
  { getContributionConfigStatus },
  { subtractDays, toDateKey },
  { shouldTreatAsEmptyResult },
] = await Promise.all([
  import('./lib/contribution-intelligence/database.mjs'),
  import('./lib/contribution-intelligence/scoring.mjs'),
  import('./lib/contribution-intelligence/service.mjs'),
  import('./lib/contribution-intelligence/config.mjs'),
  import('./lib/contribution-intelligence/dates.mjs'),
  import('./lib/contribution-intelligence/github-sync.mjs'),
]);

test.after(() => {
  delete process.env.CONTRIBUTION_DATABASE_PATH;
  delete process.env.GITHUB_REPOSITORIES;
  safeRemove(TEST_DATABASE_PATH);
});

test('dashboard summary ranks merged PR ownership above commit volume', async () => {
  safeRemove(TEST_DATABASE_PATH);

  const repositories = [
    { id: 'acme/rocket', owner: 'acme', repo: 'rocket' },
    { id: 'acme/orbit', owner: 'acme', repo: 'orbit' },
  ];
  const users = [
    { username: 'alice', displayName: 'Alice', avatarUrl: null, profileUrl: null },
    { username: 'bob', displayName: 'Bob', avatarUrl: null, profileUrl: null },
    { username: 'carol', displayName: 'Carol', avatarUrl: null, profileUrl: null },
  ];

  const currentWeekDate = toDateKey(subtractDays(new Date(), 2));
  const priorWeekDate = toDateKey(subtractDays(new Date(), 9));
  const rows = [
    {
      username: 'alice',
      displayName: 'Alice',
      avatarUrl: null,
      profileUrl: null,
      repoOwner: 'acme',
      repoName: 'rocket',
      contributionDate: currentWeekDate,
      prOpened: 1,
      prMerged: 2,
      issuesClosed: 0,
      reviews: 1,
      commits: 1,
      score: computeContributionScore({ prOpened: 1, prMerged: 2, issuesClosed: 0, reviews: 1, commits: 1 }),
    },
    {
      username: 'bob',
      displayName: 'Bob',
      avatarUrl: null,
      profileUrl: null,
      repoOwner: 'acme',
      repoName: 'orbit',
      contributionDate: currentWeekDate,
      prOpened: 0,
      prMerged: 1,
      issuesClosed: 2,
      reviews: 0,
      commits: 2,
      score: computeContributionScore({ prOpened: 0, prMerged: 1, issuesClosed: 2, reviews: 0, commits: 2 }),
    },
    {
      username: 'carol',
      displayName: 'Carol',
      avatarUrl: null,
      profileUrl: null,
      repoOwner: 'acme',
      repoName: 'orbit',
      contributionDate: currentWeekDate,
      prOpened: 0,
      prMerged: 0,
      issuesClosed: 0,
      reviews: 0,
      commits: 8,
      score: computeContributionScore({ prOpened: 0, prMerged: 0, issuesClosed: 0, reviews: 0, commits: 8 }),
    },
    {
      username: 'alice',
      displayName: 'Alice',
      avatarUrl: null,
      profileUrl: null,
      repoOwner: 'acme',
      repoName: 'orbit',
      contributionDate: priorWeekDate,
      prOpened: 0,
      prMerged: 1,
      issuesClosed: 0,
      reviews: 0,
      commits: 0,
      score: computeContributionScore({ prOpened: 0, prMerged: 1, issuesClosed: 0, reviews: 0, commits: 0 }),
    },
  ];

  replaceContributionWindow({
    sinceDate: priorWeekDate,
    repositories,
    users,
    rows,
  });

  const summary = await getContributionDashboardSummary({ weeks: 8 });
  const aliceDetail = await getContributorDetail('alice', { weeks: 8 });

  assert.equal(summary.status.configured, true);
  assert.equal(summary.leaderboard[0].username, 'alice');
  assert.equal(summary.leaderboard[1].username, 'bob');
  assert.equal(summary.leaderboard[2].username, 'carol');
  assert.equal(summary.leaderboard[0].score > summary.leaderboard[2].score, true);
  assert.equal(summary.weeklyActivity.some((week) => week.score > 0), true);
  assert.equal(aliceDetail?.repoBreakdown[0].repository, 'acme/rocket');
  assert.equal(aliceDetail?.totals.prMerged, 3);
});

test('empty repositories are skipped instead of failing sync', () => {
  assert.equal(shouldTreatAsEmptyResult(409, 'Git Repository is empty'), true);
  assert.equal(shouldTreatAsEmptyResult(409, 'Something else'), false);
  assert.equal(shouldTreatAsEmptyResult(404, 'Git Repository is empty'), false);
});

test('manual sync status depends on sync secret configuration, not production mode alone', () => {
  const originalSecret = process.env.CONTRIBUTION_SYNC_SECRET;

  delete process.env.CONTRIBUTION_SYNC_SECRET;
  let status = getContributionConfigStatus();
  assert.equal(status.manualSyncRequiresSecret, false);
  assert.equal(status.manualSyncSecretConfigured, false);

  process.env.CONTRIBUTION_SYNC_SECRET = 'top-secret';
  status = getContributionConfigStatus();
  assert.equal(status.manualSyncRequiresSecret, true);
  assert.equal(status.manualSyncSecretConfigured, true);

  if (originalSecret === undefined) {
    delete process.env.CONTRIBUTION_SYNC_SECRET;
  } else {
    process.env.CONTRIBUTION_SYNC_SECRET = originalSecret;
  }
});

function safeRemove(filePath) {
  try {
    fs.rmSync(filePath, { force: true });
  } catch {
    // Windows can keep the sqlite handle open until process exit.
  }
}
