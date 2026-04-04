import 'dotenv/config';
import os from 'node:os';
import path from 'node:path';

if (!process.env.CONTRIBUTION_DATABASE_PATH) {
  process.env.CONTRIBUTION_DATABASE_PATH = path.join(os.tmpdir(), `cohorttracker-snapshot-${process.pid}.sqlite`);
}

const outputArg = process.argv[2];
const outputDir = outputArg
  ? path.resolve(process.cwd(), outputArg)
  : path.resolve(process.cwd(), 'public', 'contribution-data', 'latest');

const { exportContributionSnapshot } = await import('../server/lib/contribution-intelligence/export-snapshot.mjs');

const result = await exportContributionSnapshot({ outputDir });

console.log(`Exported contribution snapshot to ${result.outputDir}`);
console.log(`Contributors exported: ${result.usernames.length}`);
