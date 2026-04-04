import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  Clock3,
  FolderGit2,
  GitCommitHorizontal,
  GitPullRequest,
  MessageSquareText,
  RefreshCw,
  ShieldCheck,
  Trophy,
  Users,
} from 'lucide-react';
import MetricCard from '../components/contribution-dashboard/MetricCard';
import LeaderboardTable from '../components/contribution-dashboard/LeaderboardTable';
import ContributorDetailPanel from '../components/contribution-dashboard/ContributorDetailPanel';
import BarChart from '../components/contribution-dashboard/BarChart';
import SetupState from '../components/contribution-dashboard/SetupState';
import {
  formatLongDateTime,
  formatMetric,
  formatScore,
  formatShortDate,
  formatWeekLabel,
} from '../components/contribution-dashboard/formatters';
import { buildApiUrl } from '../lib/apiBase';
import { fetchContributionDashboardSummary, fetchContributorDetail } from '../lib/contributionDashboard';
import type {
  ContributorDetail,
  ContributorSummary,
  DashboardSummary,
  LeaderboardEntry,
  RepositoryReference,
} from '../types/contributionDashboard';

const HISTORY_WEEKS = 8;
const REFRESH_INTERVAL_MS = 60_000;

const ContributionDashboard: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [detail, setDetail] = useState<ContributorDetail | null>(null);
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const nextSummary = await fetchContributionDashboardSummary(HISTORY_WEEKS);

        if (!active) {
          return;
        }

        setSummary(nextSummary);
        setError('');
        setSelectedUsername((current) => current || nextSummary.leaderboard[0]?.username || nextSummary.contributors[0]?.username || null);
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : 'Dashboard data could not be loaded.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void load();
    const timer = window.setInterval(load, REFRESH_INTERVAL_MS);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!summary) {
      return;
    }

    const usernames = new Set(summary.contributors.map((contributor) => contributor.username));

    if (selectedUsername && usernames.has(selectedUsername)) {
      return;
    }

    setSelectedUsername(summary.leaderboard[0]?.username || summary.contributors[0]?.username || null);
  }, [selectedUsername, summary]);

  useEffect(() => {
    if (!selectedUsername) {
      setDetail(null);
      return;
    }

    let active = true;

    const load = async () => {
      setDetailLoading(true);

      try {
        const nextDetail = await fetchContributorDetail(selectedUsername, HISTORY_WEEKS);

        if (active) {
          setDetail(nextDetail);
        }
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : 'Contributor detail could not be loaded.');
        }
      } finally {
        if (active) {
          setDetailLoading(false);
        }
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, [selectedUsername]);

  const leaderboardView = useMemo(() => buildLeaderboardView(summary), [summary]);
  const leaderboardWinner = leaderboardView.entries[0] || null;
  const chartItems = useMemo(
    () => summary?.weeklyActivity.map((week) => ({
      label: formatShortDate(week.weekStart),
      value: week.score,
      footnote: formatWeekLabel(week.weekStart, week.weekEnd),
    })) || [],
    [summary]
  );

  const canTriggerSync = Boolean(summary && !summary.status.manualSyncRequiresSecret);
  const nextRunLabel = summary?.status.scheduler.nextRunAt
    ? formatLongDateTime(summary.status.scheduler.nextRunAt)
    : summary?.status.scheduler.started
      ? 'Waiting for next slot'
      : 'Scheduler idle';
  const windowLabel = summary
    ? `${summary.window.leaderboardDays}-day ranking | ${summary.window.historyWeeks}-week history`
    : 'Awaiting data window';

  const handleManualSync = async () => {
    if (!canTriggerSync) {
      return;
    }

    setSyncLoading(true);

    try {
      const response = await fetch(buildApiUrl('/api/contribution-intelligence/sync'), { method: 'POST' });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.error || 'Sync failed.');
      }

      const nextSummary = await fetchContributionDashboardSummary(HISTORY_WEEKS);
      setSummary(nextSummary);
      setSelectedUsername((current) => current || nextSummary.leaderboard[0]?.username || nextSummary.contributors[0]?.username || null);
      setError('');
    } catch (syncError) {
      setError(syncError instanceof Error ? syncError.message : 'Sync failed.');
    } finally {
      setSyncLoading(false);
    }
  };

  if (loading && !summary) {
    return (
      <DashboardShell>
        <div className="rounded-[30px] border border-white/8 bg-[#0b1727]/78 p-10 text-center text-sm text-slate-400">
          Loading contribution intelligence dashboard...
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      {error ? (
        <Reveal delay={0}>
          <div className="rounded-[26px] border border-rose-300/20 bg-rose-500/10 px-5 py-4 text-sm text-rose-100/90">
            {error}
          </div>
        </Reveal>
      ) : null}

      {summary && !summary.status.configured ? (
        <Reveal delay={0.03}>
          <SetupState
            configPath={summary.status.configPath}
            localOverridePath={summary.status.localOverridePath}
            hasGitHubToken={summary.status.hasGitHubToken}
          />
        </Reveal>
      ) : null}

      <div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <Reveal delay={0.05}>
            <section className="overflow-hidden rounded-[34px] border border-white/8 bg-[#091423]/88 p-6 shadow-[0_28px_80px_-60px_rgba(34,211,238,0.38)]">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-cyan-100/85">
                      CohortTracker
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-slate-500">
                      Accountability dashboard
                    </span>
                  </div>
                  <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
                    Real contribution visibility across the cohort
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300/80">
                    Track merges, issues, reviews, and weighted impact across all repos that matter. This surface is built for monitoring ownership, not celebrating commit theater.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-300">
                      {windowLabel}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-400">
                      Sync cadence: {summary?.status.sync.cron || 'n/a'} {summary?.status.sync.timezone || ''}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-3 lg:items-end">
                  <button
                    type="button"
                    onClick={handleManualSync}
                    disabled={!canTriggerSync || syncLoading}
                    className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2.5 text-sm font-medium text-cyan-50 transition hover:bg-cyan-300/15 disabled:cursor-not-allowed disabled:opacity-55"
                  >
                    <RefreshCw size={16} className={syncLoading ? 'animate-spin' : ''} />
                    {syncLoading
                      ? 'Syncing...'
                      : canTriggerSync
                        ? 'Run sync now'
                        : summary?.status.manualSyncSecretConfigured
                          ? 'Sync locked by secret'
                          : 'Sync unavailable'}
                  </button>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-400">
                    {summary?.status.hasGitHubToken ? 'Authenticated API access' : 'Public API mode'}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <StatusTile icon={Clock3} label="Last sync" value={formatLongDateTime(summary?.status.lastSync?.completedAt || null)} />
                <StatusTile icon={Activity} label="Next run" value={nextRunLabel} />
                <StatusTile icon={Users} label="Active contributors" value={`${summary?.status.activeContributors || 0} in ranking window`} />
                <StatusTile icon={ShieldCheck} label="Rows imported" value={formatMetric(summary?.status.lastSync?.rowsUpserted || 0)} />
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.08}>
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                icon={Trophy}
                label="Weighted Score"
                value={formatScore(summary?.totals.score || 0)}
                detail="Total weighted signal across the full reporting window."
                tone="ember"
              />
              <MetricCard
                icon={GitPullRequest}
                label="Merged PRs"
                value={formatMetric(summary?.totals.prMerged || 0)}
                detail="The strongest direct ownership signal in the model."
                tone="amber"
              />
              <MetricCard
                icon={MessageSquareText}
                label="Reviews + Issues"
                value={formatMetric((summary?.totals.reviews || 0) + (summary?.totals.issuesClosed || 0))}
                detail="Cross-team support actions that keep the system moving."
                tone="teal"
              />
              <MetricCard
                icon={GitCommitHorizontal}
                label="Commits Tracked"
                value={formatMetric(summary?.totals.commits || 0)}
                detail="Still counted, but intentionally underweighted to reduce spam."
                tone="slate"
              />
            </section>
          </Reveal>

          <Reveal delay={0.11}>
            <section className="grid gap-6 xl:grid-cols-[minmax(0,1.28fr)_minmax(320px,0.72fr)]">
              <LeaderboardTable
                entries={leaderboardView.entries}
                selectedUsername={selectedUsername}
                onSelect={setSelectedUsername}
                title={leaderboardView.mode === 'weekly' ? 'Weekly leaderboard' : 'Recent contributors'}
                subtitle={
                  leaderboardView.mode === 'weekly'
                    ? 'Weighted over the last 7 days, with merges breaking ties before reviews and issue closure.'
                    : 'No one contributed inside the 7-day ranking window, so this view falls back to the broader 8-week history.'
                }
                statusLabel={leaderboardView.mode === 'weekly' ? 'Live 7-day rank' : 'Fallback 8-week rank'}
              />

              <BarChart
                title="Cohort trend"
                subtitle="Weekly weighted score across the tracked cohort."
                items={chartItems}
                accent="from-cyan-400 to-blue-300"
                emptyLabel="No weekly trend yet. Configure repos and sync the data source."
              />
            </section>
          </Reveal>

          <Reveal delay={0.14}>
            <ContributorDetailPanel detail={detail} loading={detailLoading} />
          </Reveal>
        </div>

        <aside className="space-y-6 2xl:sticky 2xl:top-6 2xl:self-start">
          <Reveal delay={0.06}>
            <LeaderSpotlight winner={leaderboardWinner} mode={leaderboardView.mode} />
          </Reveal>

          <Reveal delay={0.1}>
            <SyncMonitor summary={summary} mode={leaderboardView.mode} />
          </Reveal>

          <Reveal delay={0.13}>
            <div className="rounded-[30px] border border-white/8 bg-[#0b1727]/78 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">Scoring model</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    The weighting is explicit, visible, and adjustable. Contributors should know exactly what moves rank.
                  </p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                  JSON-configured
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <WeightRow label="PR merged" value={summary?.weights.prMerged || 0} />
                <WeightRow label="PR opened" value={summary?.weights.prOpened || 0} />
                <WeightRow label="Issue closed" value={summary?.weights.issuesClosed || 0} />
                <WeightRow label="Code review" value={summary?.weights.reviews || 0} />
                <WeightRow label="Commit" value={summary?.weights.commits || 0} subdued />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <RepositoryPanel repositories={summary?.repositories || []} lookbackDays={summary?.status.sync.lookbackDays || 0} />
          </Reveal>
        </aside>
      </div>
    </DashboardShell>
  );
};

const DashboardShell = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-[#07111d] text-white">
    <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.1),transparent_28%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.08),transparent_26%)]" />
    <div className="pointer-events-none fixed inset-0 opacity-20 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
    <main className="relative mx-auto flex w-full max-w-[1560px] flex-col gap-6 px-4 py-5 sm:px-5 lg:px-8 lg:py-8">
      {children}
    </main>
  </div>
);

const Reveal = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const StatusTile = ({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) => (
  <div className="rounded-[24px] border border-white/8 bg-[#07111d]/90 px-4 py-4">
    <div className="flex items-center gap-3">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-cyan-100">
        <Icon size={18} />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">{label}</p>
        <p className="mt-1 truncate text-sm font-medium text-white">{value}</p>
      </div>
    </div>
  </div>
);

const LeaderSpotlight = ({
  winner,
  mode,
}: {
  winner: LeaderboardEntry | null;
  mode: 'weekly' | 'recent';
}) => (
  <aside className="rounded-[32px] border border-white/8 bg-[#0b1727]/82 p-6">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
          {mode === 'weekly' ? 'Current leader' : 'Most visible contributor'}
        </p>
        <p className="mt-2 text-sm text-slate-400">
          {mode === 'weekly' ? 'Live winner inside the 7-day ranking window.' : 'Fallback leader from the wider reporting window.'}
        </p>
      </div>
      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-500">
        {mode}
      </span>
    </div>

    {winner ? (
      <>
        <div className="mt-5 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.05] text-base font-semibold uppercase text-slate-300">
            {winner.avatarUrl ? (
              <img src={winner.avatarUrl} alt={winner.displayName} className="h-full w-full object-cover" />
            ) : (
              winner.displayName.slice(0, 2)
            )}
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-2xl font-semibold text-white">{winner.displayName}</h2>
            <p className="truncate text-sm text-slate-500">@{winner.username}</p>
          </div>
        </div>

        <div className="mt-6 rounded-[24px] border border-cyan-300/20 bg-cyan-300/10 px-4 py-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-100/70">Visible score</p>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-cyan-50">{formatScore(winner.score)}</p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <MiniMetric label="Merged PRs" value={formatMetric(winner.prMerged)} />
          <MiniMetric label="Issues closed" value={formatMetric(winner.issuesClosed)} />
          <MiniMetric label="Reviews" value={formatMetric(winner.reviews)} />
          <MiniMetric label="Last seen" value={formatShortDate(winner.latestContributionDate)} />
        </div>
      </>
    ) : (
      <div className="mt-5 rounded-[24px] border border-dashed border-white/10 bg-[#07111d]/90 px-4 py-10 text-sm text-slate-500">
        No contributor data available yet.
      </div>
    )}
  </aside>
);

const SyncMonitor = ({
  summary,
  mode,
}: {
  summary: DashboardSummary | null;
  mode: 'weekly' | 'recent';
}) => (
  <div className="rounded-[30px] border border-white/8 bg-[#0b1727]/78 p-5">
    <div className="flex items-start justify-between gap-3">
      <div>
        <h3 className="text-lg font-semibold text-white">System monitor</h3>
        <p className="mt-1 text-sm leading-6 text-slate-400">
          Quick operational context for sync health, freshness, and the current ranking mode.
        </p>
      </div>
      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-500">
        Live config
      </span>
    </div>

    <div className="mt-5 space-y-3">
      <MonitorRow label="Ranking mode" value={mode === 'weekly' ? '7-day live rank' : '8-week fallback'} />
      <MonitorRow label="Tracked repositories" value={`${summary?.repositories.length || 0}`} />
      <MonitorRow label="Lookback window" value={`${summary?.status.sync.lookbackDays || 0} days`} />
      <MonitorRow label="Last sync status" value={summary?.status.lastSync?.status || 'not run yet'} />
      <MonitorRow label="Rows written" value={formatMetric(summary?.status.lastSync?.rowsUpserted || 0)} />
      <MonitorRow label="Users synced" value={formatMetric(summary?.status.lastSync?.usersSynced || 0)} />
    </div>
  </div>
);

const RepositoryPanel = ({
  repositories,
  lookbackDays,
}: {
  repositories: RepositoryReference[];
  lookbackDays: number;
}) => (
  <div className="rounded-[30px] border border-white/8 bg-[#0b1727]/78 p-5">
    <div className="flex items-start justify-between gap-3">
      <div>
        <h3 className="text-lg font-semibold text-white">Tracked repositories</h3>
        <p className="mt-1 text-sm leading-6 text-slate-400">
          Every repo listed here contributes to the same accountability model.
        </p>
      </div>
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-500">
        <FolderGit2 size={14} />
        {repositories.length} repos
      </span>
    </div>

    <div className="mt-5 space-y-3">
      {repositories.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-sm text-slate-500">
          No repositories configured yet.
        </div>
      ) : (
        repositories.map((repository, index) => (
          <div key={repository.id} className="rounded-2xl border border-white/8 bg-[#07111d]/90 px-4 py-4">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xs font-semibold text-slate-300">
                {index + 1}
              </span>
              <div className="min-w-0">
                <p className="truncate font-medium text-white">{repository.id}</p>
                <p className="mt-1 text-xs text-slate-500">Sync window: last {lookbackDays} days</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

const WeightRow = ({
  label,
  value,
  subdued = false,
}: {
  label: string;
  value: number;
  subdued?: boolean;
}) => (
  <div className={`flex items-center justify-between rounded-2xl border px-4 py-4 ${subdued ? 'border-white/8 bg-[#07111d]/90 text-slate-400' : 'border-cyan-300/10 bg-cyan-300/[0.05] text-white'}`}>
    <span>{label}</span>
    <span className={`text-lg font-semibold ${subdued ? 'text-slate-300' : 'text-cyan-100'}`}>{formatScore(value)}</span>
  </div>
);

const MiniMetric = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-[22px] border border-white/8 bg-[#07111d]/90 px-4 py-4">
    <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">{label}</p>
    <p className="mt-3 text-lg font-semibold text-white">{value}</p>
  </div>
);

const MonitorRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-[#07111d]/90 px-4 py-4">
    <span className="text-sm text-slate-400">{label}</span>
    <span className="text-sm font-medium text-white">{value}</span>
  </div>
);

function buildLeaderboardView(summary: DashboardSummary | null): {
  entries: LeaderboardEntry[];
  mode: 'weekly' | 'recent';
} {
  if (!summary) {
    return {
      entries: [],
      mode: 'weekly',
    };
  }

  if (summary.leaderboard.length > 0) {
    return {
      entries: summary.leaderboard,
      mode: 'weekly',
    };
  }

  const recentEntries = [...summary.contributors]
    .sort(compareContributorSummaries)
    .map((contributor, index) => ({
      ...contributor.totals,
      username: contributor.username,
      displayName: contributor.displayName,
      avatarUrl: contributor.avatarUrl,
      profileUrl: contributor.profileUrl,
      latestContributionDate: contributor.latestContributionDate,
      rank: index + 1,
    }));

  return {
    entries: recentEntries,
    mode: 'recent',
  };
}

function compareContributorSummaries(left: ContributorSummary, right: ContributorSummary) {
  return (right.totals.score - left.totals.score)
    || (right.totals.prMerged - left.totals.prMerged)
    || (right.totals.issuesClosed - left.totals.issuesClosed)
    || (right.totals.reviews - left.totals.reviews)
    || left.username.localeCompare(right.username);
}

export default ContributionDashboard;
