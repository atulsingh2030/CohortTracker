import fs from 'node:fs';
import path from 'node:path';
import {
  getContributionDashboardSummary,
  getContributorDetail,
  syncContributionData,
} from './service.mjs';

const DEFAULT_OUTPUT_DIR = path.resolve(process.cwd(), 'public', 'contribution-data', 'latest');

export async function exportContributionSnapshot({
  outputDir = DEFAULT_OUTPUT_DIR,
  weeks = 8,
  sync = true,
} = {}) {
  const resolvedOutputDir = path.resolve(outputDir);
  const usersDir = path.join(resolvedOutputDir, 'users');

  fs.rmSync(resolvedOutputDir, { recursive: true, force: true });
  fs.mkdirSync(usersDir, { recursive: true });

  if (sync) {
    await syncContributionData({ reason: 'snapshot-export' });
  }

  const summary = await getContributionDashboardSummary({ weeks });
  const usernames = [];

  writeJson(path.join(resolvedOutputDir, 'summary.json'), summary);

  for (const contributor of summary.contributors) {
    const detail = await getContributorDetail(contributor.username, { weeks });

    if (!detail) {
      continue;
    }

    usernames.push(contributor.username);
    writeJson(path.join(usersDir, `${encodeURIComponent(contributor.username)}.json`), detail);
  }

  writeJson(path.join(resolvedOutputDir, 'meta.json'), {
    exportedAt: new Date().toISOString(),
    weeks,
    contributorCount: usernames.length,
    repositoryCount: summary.repositories.length,
    repositories: summary.repositories.map((repository) => repository.id),
    lastSyncCompletedAt: summary.status.lastSync?.completedAt || null,
    manualSyncRequiresSecret: summary.status.manualSyncRequiresSecret,
  });

  return {
    outputDir: resolvedOutputDir,
    usernames,
    summary,
  };
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}
