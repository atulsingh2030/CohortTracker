import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';
import { toIsoTimestamp } from './dates.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '..', '..', 'data');
const DEFAULT_DATABASE_PATH = path.join(DATA_DIR, 'contribution-intelligence.sqlite');

let database = null;

export function getContributionDatabase() {
  if (database) {
    return database;
  }

  fs.mkdirSync(path.dirname(resolveDatabasePath()), { recursive: true });

  database = new DatabaseSync(resolveDatabasePath());
  database.exec('PRAGMA foreign_keys = ON;');
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      github_username TEXT NOT NULL UNIQUE,
      display_name TEXT,
      avatar_url TEXT,
      profile_url TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS contribution_snapshots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      repo_owner TEXT NOT NULL,
      repo_name TEXT NOT NULL,
      contribution_date TEXT NOT NULL,
      pr_opened INTEGER NOT NULL DEFAULT 0,
      pr_merged INTEGER NOT NULL DEFAULT 0,
      issues_closed INTEGER NOT NULL DEFAULT 0,
      reviews INTEGER NOT NULL DEFAULT 0,
      commits INTEGER NOT NULL DEFAULT 0,
      score REAL NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      UNIQUE(user_id, repo_owner, repo_name, contribution_date),
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS sync_runs (
      id TEXT PRIMARY KEY,
      status TEXT NOT NULL,
      reason TEXT NOT NULL,
      since_date TEXT NOT NULL,
      started_at TEXT NOT NULL,
      completed_at TEXT,
      message TEXT,
      repositories_json TEXT NOT NULL,
      users_synced INTEGER NOT NULL DEFAULT 0,
      rows_upserted INTEGER NOT NULL DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_contribution_snapshots_date
      ON contribution_snapshots (contribution_date);

    CREATE INDEX IF NOT EXISTS idx_contribution_snapshots_user_date
      ON contribution_snapshots (user_id, contribution_date);

    CREATE INDEX IF NOT EXISTS idx_sync_runs_started_at
      ON sync_runs (started_at DESC);
  `);

  return database;
}

export function startSyncRun({ reason, sinceDate, repositories }) {
  const db = getContributionDatabase();
  const id = crypto.randomUUID();
  const startedAt = toIsoTimestamp();

  db.prepare(`
    INSERT INTO sync_runs (
      id, status, reason, since_date, started_at, repositories_json
    ) VALUES (?, ?, ?, ?, ?, ?)
  `).run(id, 'running', reason, sinceDate, startedAt, JSON.stringify(repositories));

  return {
    id,
    status: 'running',
    reason,
    sinceDate,
    startedAt,
  };
}

export function finishSyncRun({ id, status, message = null, usersSynced = 0, rowsUpserted = 0 }) {
  const db = getContributionDatabase();

  db.prepare(`
    UPDATE sync_runs
    SET status = ?, message = ?, users_synced = ?, rows_upserted = ?, completed_at = ?
    WHERE id = ?
  `).run(status, message, usersSynced, rowsUpserted, toIsoTimestamp(), id);
}

export function replaceContributionWindow({ sinceDate, repositories, users, rows }) {
  const db = getContributionDatabase();

  runTransaction(() => {
    const upsertUser = db.prepare(`
      INSERT INTO users (
        id, github_username, display_name, avatar_url, profile_url, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(github_username) DO UPDATE SET
        display_name = excluded.display_name,
        avatar_url = excluded.avatar_url,
        profile_url = excluded.profile_url,
        updated_at = excluded.updated_at
    `);

    const now = toIsoTimestamp();

    for (const user of users) {
      upsertUser.run(
        user.username,
        user.username,
        user.displayName || user.username,
        user.avatarUrl || null,
        user.profileUrl || null,
        now,
        now
      );
    }

    if (repositories.length > 0) {
      const repoConditions = repositories
        .map(() => '(repo_owner = ? AND repo_name = ?)')
        .join(' OR ');
      const parameters = [sinceDate];

      for (const repository of repositories) {
        parameters.push(repository.owner, repository.repo);
      }

      db.prepare(`
        DELETE FROM contribution_snapshots
        WHERE contribution_date >= ?
          AND (${repoConditions})
      `).run(...parameters);
    }

    const insertSnapshot = db.prepare(`
      INSERT INTO contribution_snapshots (
        user_id,
        repo_owner,
        repo_name,
        contribution_date,
        pr_opened,
        pr_merged,
        issues_closed,
        reviews,
        commits,
        score,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const row of rows) {
      insertSnapshot.run(
        row.username,
        row.repoOwner,
        row.repoName,
        row.contributionDate,
        row.prOpened,
        row.prMerged,
        row.issuesClosed,
        row.reviews,
        row.commits,
        row.score,
        now,
        now
      );
    }
  });
}

export function loadContributionRows({ sinceDate, username = null } = {}) {
  const db = getContributionDatabase();
  let query = `
    SELECT
      u.github_username AS username,
      u.display_name AS displayName,
      u.avatar_url AS avatarUrl,
      u.profile_url AS profileUrl,
      c.repo_owner AS repoOwner,
      c.repo_name AS repoName,
      c.contribution_date AS contributionDate,
      c.pr_opened AS prOpened,
      c.pr_merged AS prMerged,
      c.issues_closed AS issuesClosed,
      c.reviews AS reviews,
      c.commits AS commits,
      c.score AS score
    FROM contribution_snapshots c
    INNER JOIN users u
      ON u.id = c.user_id
  `;
  const parameters = [];
  const conditions = [];

  if (sinceDate) {
    conditions.push('c.contribution_date >= ?');
    parameters.push(sinceDate);
  }

  if (username) {
    conditions.push('u.github_username = ?');
    parameters.push(username);
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(' AND ')}`;
  }

  query += ' ORDER BY c.contribution_date ASC, u.github_username ASC';

  return db.prepare(query).all(...parameters);
}

export function loadKnownUsers() {
  return getContributionDatabase().prepare(`
    SELECT
      github_username AS username,
      display_name AS displayName,
      avatar_url AS avatarUrl,
      profile_url AS profileUrl
    FROM users
    ORDER BY github_username ASC
  `).all();
}

export function loadLatestSyncRun() {
  return getContributionDatabase().prepare(`
    SELECT
      id,
      status,
      reason,
      since_date AS sinceDate,
      started_at AS startedAt,
      completed_at AS completedAt,
      message,
      repositories_json AS repositoriesJson,
      users_synced AS usersSynced,
      rows_upserted AS rowsUpserted
    FROM sync_runs
    ORDER BY started_at DESC
    LIMIT 1
  `).get() || null;
}

export function getContributionDatabasePath() {
  return resolveDatabasePath();
}

function runTransaction(work) {
  const db = getContributionDatabase();

  db.exec('BEGIN');

  try {
    const result = work();
    db.exec('COMMIT');
    return result;
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}

function resolveDatabasePath() {
  return process.env.CONTRIBUTION_DATABASE_PATH || DEFAULT_DATABASE_PATH;
}
