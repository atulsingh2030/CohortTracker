import BarChart from './BarChart';
import { formatMetric, formatScore, formatShortDate, formatWeekLabel } from './formatters';
import type { ContributorDetail } from '../../types/contributionDashboard';

interface ContributorDetailPanelProps {
  detail: ContributorDetail | null;
  loading: boolean;
}

const ContributorDetailPanel = ({ detail, loading }: ContributorDetailPanelProps) => {
  if (loading) {
    return (
      <div className="rounded-[30px] border border-white/8 bg-[#0b1727]/78 p-6 text-sm text-slate-400">
        Loading contributor breakdown...
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="rounded-[30px] border border-dashed border-white/10 bg-[#0b1727]/50 p-6 text-sm text-slate-500">
        Select a contributor to inspect ownership signals and trend lines.
      </div>
    );
  }

  const topRepository = detail.repoBreakdown[0] || null;
  const repoPeakScore = Math.max(...detail.repoBreakdown.map((repository) => repository.score), 0);

  return (
    <div className="rounded-[30px] border border-white/8 bg-[#0b1727]/78 p-6">
      <div className="flex flex-col gap-5 border-b border-white/8 pb-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.05] text-base font-semibold uppercase text-slate-300">
            {detail.user.avatarUrl ? (
              <img src={detail.user.avatarUrl} alt={detail.user.displayName} className="h-full w-full object-cover" />
            ) : (
              detail.user.displayName.slice(0, 2)
            )}
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Selected contributor</p>
            <h3 className="text-xl font-semibold text-white">{detail.user.displayName}</h3>
            <p className="text-sm text-slate-500">@{detail.user.username}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {detail.user.profileUrl ? (
                <a
                  href={detail.user.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-100 transition hover:bg-cyan-300/15"
                >
                  Open GitHub profile
                </a>
              ) : null}
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-400">
                Top repo: {topRepository?.repoName || 'No repo signal yet'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <DetailStat label="Latest contribution" value={formatShortDate(detail.latestContributionDate)} />
          <DetailStat label="Repos touched" value={formatMetric(detail.repoBreakdown.length)} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DetailStat label="8 week score" value={formatScore(detail.totals.score)} emphasis />
        <DetailStat label="Merged PRs" value={formatMetric(detail.totals.prMerged)} />
        <DetailStat label="Reviews + Issues" value={formatMetric(detail.totals.reviews + detail.totals.issuesClosed)} />
        <DetailStat label="Commits tracked" value={formatMetric(detail.totals.commits)} />
      </div>

      <div className="mt-6">
        <BarChart
          title="Weekly contribution shape"
          subtitle="Weighted impact by week over the active dashboard window."
          items={detail.weeklySeries.map((week) => ({
            label: formatShortDate(week.weekStart),
            value: week.score,
            footnote: formatWeekLabel(week.weekStart, week.weekEnd),
          }))}
          accent="from-orange-400 to-rose-300"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <BarChart
          title="Daily momentum"
          subtitle="Last 14 days of visible contribution score."
          items={detail.dailyActivity.map((day) => ({
            label: formatShortDate(day.date),
            value: day.score,
          }))}
          accent="from-cyan-400 to-emerald-300"
        />

        <div className="rounded-[28px] border border-white/8 bg-[#07111d]/90 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="text-lg font-semibold text-white">Repo ownership</h4>
              <p className="mt-1 text-sm leading-6 text-slate-400">
                Where this contributor is carrying the most visible load across tracked repositories.
              </p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-500">
              {detail.repoBreakdown.length} repos
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {detail.repoBreakdown.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-sm text-slate-500">
                No repo breakdown yet.
              </div>
            ) : (
              detail.repoBreakdown.map((repository) => (
                <div key={repository.repository} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-white">{repository.repository}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {formatMetric(repository.prMerged)} merged PRs | {formatMetric(repository.issuesClosed)} issues | {formatMetric(repository.reviews)} reviews
                      </p>
                    </div>
                    <p className="text-lg font-semibold text-cyan-100">{formatScore(repository.score)}</p>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white/[0.05]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-300"
                      style={{ width: `${Math.max((repository.score / (repoPeakScore || 1)) * 100, 8)}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailStat = ({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) => (
  <div className={`rounded-[24px] border px-4 py-4 ${emphasis ? 'border-cyan-300/20 bg-cyan-400/[0.07]' : 'border-white/8 bg-[#07111d]/90'}`}>
    <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">{label}</p>
    <p className={`mt-3 text-2xl font-semibold ${emphasis ? 'text-cyan-100' : 'text-white'}`}>{value}</p>
  </div>
);

export default ContributorDetailPanel;
