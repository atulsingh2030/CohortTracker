import { getContributionConfig, getContributionConfigStatus } from './config.mjs';
import {
  finishSyncRun,
  getContributionDatabasePath,
  loadContributionRows,
  loadKnownUsers,
  loadLatestSyncRun,
  replaceContributionWindow,
  startSyncRun,
} from './database.mjs';
import { fetchContributionRowsForRepository } from './github-sync.mjs';
import { getContributionSchedulerState, startContributionScheduler } from './scheduler.mjs';
import { getWeekEndDateKey, getWeekStartDateKey, subtractDays, toDateKey } from './dates.mjs';
import { createEmptyMetrics, mergeMetricTotals } from './scoring.mjs';

const DEFAULT_HISTORY_WEEKS = 8;
const DEFAULT_LEADERBOARD_DAYS = 7;

let syncPromise = null;
let schedulerStarted = false;

export function initializeContributionIntelligence() {
  const config = getContributionConfig();

  if (!schedulerStarted) {
    startContributionScheduler({
      cronExpression: config.sync.cron,
      timezone: config.sync.timezone,
      onTick: () => syncContributionData({ reason: 'scheduled' }).catch(() => {}),
    });

    schedulerStarted = true;

    if (config.sync.bootstrapOnStart && config.repositories.length > 0) {
      queueMicrotask(() => {
        syncContributionData({ reason: 'startup' }).catch(() => {});
      });
    }
  }
}

export async function syncContributionData({ reason = 'manual' } = {}) {
  if (syncPromise) {
    return syncPromise;
  }

  syncPromise = performSync({ reason }).finally(() => {
    syncPromise = null;
  });

  return syncPromise;
}

export async function getContributionDashboardSummary({ weeks = DEFAULT_HISTORY_WEEKS } = {}) {
  const config = getContributionConfig();
  const recentWeeks = clampWeeks(weeks);
  const startDate = toDateKey(subtractDays(new Date(), (recentWeeks * 7) - 1));
  const leaderboardStartDate = toDateKey(subtractDays(new Date(), DEFAULT_LEADERBOARD_DAYS - 1));
  const rows = loadContributionRows({ sinceDate: startDate });
  const lastSync = loadLatestSyncRun();
  const scheduler = getContributionSchedulerState();
  const leaderboard = buildLeaderboard(rows, leaderboardStartDate);
  const weeklyActivity = buildWeeklySeries(rows, recentWeeks, config.sync.weekStartsOn);
  const totals = sumRows(rows);
  const contributors = buildContributorSummaries(rows, recentWeeks, config.sync.weekStartsOn);

  return {
    status: {
      ...getContributionConfigStatus(),
      hasData: rows.length > 0,
      activeContributors: leaderboard.length,
      databasePath: getContributionDatabasePath(),
      lastSync: normalizeSyncRun(lastSync),
      syncInProgress: Boolean(syncPromise),
      scheduler,
    },
    repositories: config.repositories,
    weights: config.weights,
    window: {
      leaderboardDays: DEFAULT_LEADERBOARD_DAYS,
      historyWeeks: recentWeeks,
      startDate,
      endDate: toDateKey(new Date()),
    },
    totals,
    leaderboard,
    weeklyActivity,
    contributors,
  };
}

export async function getContributorDetail(username, { weeks = DEFAULT_HISTORY_WEEKS } = {}) {
  const config = getContributionConfig();
  const recentWeeks = clampWeeks(weeks);
  const startDate = toDateKey(subtractDays(new Date(), (recentWeeks * 7) - 1));
  const rows = loadContributionRows({ sinceDate: startDate, username });

  if (rows.length === 0) {
    const knownUser = loadKnownUsers().find((user) => user.username === username);

    if (!knownUser) {
      return null;
    }

    return {
      user: knownUser,
      totals: {
        ...createEmptyMetrics(),
        score: 0,
      },
      weeklySeries: buildEmptyWeeklySeries(recentWeeks, config.sync.weekStartsOn),
      repoBreakdown: [],
      dailyActivity: [],
      latestContributionDate: null,
    };
  }

  const profile = {
    username,
    displayName: rows[0].displayName,
    avatarUrl: rows[0].avatarUrl,
    profileUrl: rows[0].profileUrl,
  };

  return {
    user: profile,
    totals: sumRows(rows),
    weeklySeries: buildWeeklySeries(rows, recentWeeks, config.sync.weekStartsOn),
    repoBreakdown: buildRepoBreakdown(rows),
    dailyActivity: buildDailyActivity(rows, 14),
    latestContributionDate: rows[rows.length - 1]?.contributionDate || null,
  };
}

async function performSync({ reason }) {
  const config = getContributionConfig({ forceReload: true });

  if (config.repositories.length === 0) {
    return {
      status: 'skipped',
      message: 'No repositories are configured for contribution intelligence.',
    };
  }

  const sinceDate = toDateKey(subtractDays(new Date(), config.sync.lookbackDays - 1));
  const syncRun = startSyncRun({
    reason,
    sinceDate,
    repositories: config.repositories.map((repository) => repository.id),
  });

  try {
    const allUsers = new Map();
    const allRows = [];

    for (const repository of config.repositories) {
      const result = await fetchContributionRowsForRepository(repository, {
        sinceDate,
        weights: config.weights,
      });

      for (const user of result.users) {
        if (!allUsers.has(user.username)) {
          allUsers.set(user.username, user);
        }
      }

      allRows.push(...result.rows);
    }

    replaceContributionWindow({
      sinceDate,
      repositories: config.repositories,
      users: Array.from(allUsers.values()),
      rows: allRows,
    });

    finishSyncRun({
      id: syncRun.id,
      status: 'completed',
      message: `Synced ${config.repositories.length} repositories.`,
      usersSynced: allUsers.size,
      rowsUpserted: allRows.length,
    });

    return {
      status: 'completed',
      usersSynced: allUsers.size,
      rowsUpserted: allRows.length,
    };
  } catch (error) {
    finishSyncRun({
      id: syncRun.id,
      status: 'failed',
      message: error instanceof Error ? error.message : 'Contribution sync failed.',
    });

    throw error;
  }
}

function buildLeaderboard(rows, startDate) {
  const leaderboardMap = new Map();

  for (const row of rows) {
    if (row.contributionDate < startDate) {
      continue;
    }

    const existing = leaderboardMap.get(row.username) || {
      username: row.username,
      displayName: row.displayName,
      avatarUrl: row.avatarUrl,
      profileUrl: row.profileUrl,
      latestContributionDate: row.contributionDate,
      ...createEmptyMetrics(),
      score: 0,
    };

    mergeMetricTotals(existing, row);
    existing.latestContributionDate = row.contributionDate > existing.latestContributionDate
      ? row.contributionDate
      : existing.latestContributionDate;
    leaderboardMap.set(row.username, existing);
  }

  return Array.from(leaderboardMap.values())
    .sort(compareContributors)
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));
}

function buildContributorSummaries(rows, weeks, weekStartsOn) {
  const grouped = new Map();

  for (const row of rows) {
    if (!grouped.has(row.username)) {
      grouped.set(row.username, []);
    }

    grouped.get(row.username).push(row);
  }

  return Array.from(grouped.entries())
    .map(([username, userRows]) => ({
      username,
      displayName: userRows[0].displayName,
      avatarUrl: userRows[0].avatarUrl,
      profileUrl: userRows[0].profileUrl,
      latestContributionDate: userRows[userRows.length - 1]?.contributionDate || null,
      totals: sumRows(userRows),
      weeklySeries: buildWeeklySeries(userRows, weeks, weekStartsOn),
    }))
    .sort((left, right) => compareContributors(left.totals, right.totals));
}

function buildWeeklySeries(rows, weeks, weekStartsOn) {
  const seriesMap = new Map();

  for (const row of rows) {
    const weekStart = getWeekStartDateKey(row.contributionDate, weekStartsOn);

    if (!seriesMap.has(weekStart)) {
      seriesMap.set(weekStart, createWeeklyBucket(weekStart, weekStartsOn));
    }

    mergeMetricTotals(seriesMap.get(weekStart), row);
  }

  return fillWeeklySeries(seriesMap, weeks, weekStartsOn);
}

function buildEmptyWeeklySeries(weeks, weekStartsOn) {
  return fillWeeklySeries(new Map(), weeks, weekStartsOn);
}

function fillWeeklySeries(seriesMap, weeks, weekStartsOn) {
  const output = [];
  const currentWeekStart = getWeekStartDateKey(new Date(), weekStartsOn);

  for (let index = weeks - 1; index >= 0; index -= 1) {
    const normalizedWeekStart = toDateKey(subtractDays(currentWeekStart, index * 7));

    output.push(
      seriesMap.get(normalizedWeekStart) || createWeeklyBucket(normalizedWeekStart, weekStartsOn)
    );
  }

  return output;
}

function createWeeklyBucket(weekStart, weekStartsOn) {
  return {
    weekStart,
    weekEnd: getWeekEndDateKey(weekStart, weekStartsOn),
    ...createEmptyMetrics(),
    score: 0,
  };
}

function buildRepoBreakdown(rows) {
  const repoMap = new Map();

  for (const row of rows) {
    const repository = `${row.repoOwner}/${row.repoName}`;

    if (!repoMap.has(repository)) {
      repoMap.set(repository, {
        repository,
        repoOwner: row.repoOwner,
        repoName: row.repoName,
        ...createEmptyMetrics(),
        score: 0,
      });
    }

    mergeMetricTotals(repoMap.get(repository), row);
  }

  return Array.from(repoMap.values()).sort(compareContributors);
}

function buildDailyActivity(rows, days) {
  const startDate = toDateKey(subtractDays(new Date(), days - 1));
  const activityMap = new Map();

  for (const row of rows) {
    if (row.contributionDate < startDate) {
      continue;
    }

    if (!activityMap.has(row.contributionDate)) {
      activityMap.set(row.contributionDate, {
        date: row.contributionDate,
        ...createEmptyMetrics(),
        score: 0,
      });
    }

    mergeMetricTotals(activityMap.get(row.contributionDate), row);
  }

  const output = [];

  for (let index = days - 1; index >= 0; index -= 1) {
    const date = toDateKey(subtractDays(new Date(), index));
    output.push(activityMap.get(date) || {
      date,
      ...createEmptyMetrics(),
      score: 0,
    });
  }

  return output;
}

function sumRows(rows) {
  const totals = {
    ...createEmptyMetrics(),
    score: 0,
  };

  for (const row of rows) {
    mergeMetricTotals(totals, row);
  }

  return totals;
}

function normalizeSyncRun(syncRun) {
  if (!syncRun) {
    return null;
  }

  return {
    ...syncRun,
    repositories: safeParseJson(syncRun.repositoriesJson),
  };
}

function safeParseJson(value) {
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

function compareContributors(left, right) {
  return (right.score - left.score)
    || (right.prMerged - left.prMerged)
    || (right.issuesClosed - left.issuesClosed)
    || (right.reviews - left.reviews)
    || `${left.username || left.repository || ''}`.localeCompare(`${right.username || right.repository || ''}`);
}

function clampWeeks(value) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return DEFAULT_HISTORY_WEEKS;
  }

  return Math.min(Math.max(Math.round(parsed), 4), 16);
}
