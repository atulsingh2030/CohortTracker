import type { LeaderboardEntry } from '../../types/contributionDashboard';
import { formatMetric, formatScore, formatShortDate } from './formatters';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  selectedUsername: string | null;
  onSelect: (username: string) => void;
  title?: string;
  subtitle?: string;
  statusLabel?: string;
}

function getRankBadgeClasses(rank: number) {
  if (rank === 1) {
    return 'border-amber-300/25 bg-amber-300/12 text-amber-100';
  }

  if (rank <= 3) {
    return 'border-cyan-300/20 bg-cyan-300/10 text-cyan-100';
  }

  return 'border-white/10 bg-white/[0.04] text-slate-300';
}

const LeaderboardTable = ({
  entries,
  selectedUsername,
  onSelect,
  title = 'Weekly leaderboard',
  subtitle = 'Ranked by weighted score, not raw commit volume.',
  statusLabel = 'Live rank',
}: LeaderboardTableProps) => (
  <div className="rounded-[30px] border border-white/8 bg-[#0b1727]/78 p-5">
    <div className="flex flex-col gap-3 border-b border-white/8 pb-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-400">{subtitle}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-cyan-100/85">
          {entries.length} visible
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-400">
          {statusLabel}
        </span>
      </div>
    </div>

    {entries.length === 0 ? (
      <div className="mt-5 rounded-[24px] border border-dashed border-white/10 bg-[#07111d]/90 px-4 py-8 text-center text-sm text-slate-500">
        No contributors are visible yet. Run the first sync after configuring repositories.
      </div>
    ) : (
      <>
        <div className="mt-4 space-y-3 md:hidden">
          {entries.map((entry) => {
            const isSelected = entry.username === selectedUsername;

            return (
              <button
                key={entry.username}
                type="button"
                onClick={() => onSelect(entry.username)}
                className={`w-full rounded-[24px] border px-4 py-4 text-left transition ${isSelected ? 'border-cyan-300/20 bg-cyan-400/[0.08]' : 'border-white/8 bg-[#07111d]/90 hover:bg-white/[0.03]'}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] text-xs font-semibold uppercase text-slate-300">
                      {entry.avatarUrl ? (
                        <img src={entry.avatarUrl} alt={entry.displayName} className="h-full w-full object-cover" />
                      ) : (
                        entry.displayName.slice(0, 2)
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-white">{entry.displayName}</p>
                      <p className="truncate text-xs text-slate-500">@{entry.username}</p>
                    </div>
                  </div>
                  <span className={`inline-flex shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${getRankBadgeClasses(entry.rank)}`}>
                    #{entry.rank}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <MobileStat label="Score" value={formatScore(entry.score)} emphasis />
                  <MobileStat label="Merged PRs" value={formatMetric(entry.prMerged)} />
                  <MobileStat label="Issues" value={formatMetric(entry.issuesClosed)} />
                  <MobileStat label="Reviews" value={formatMetric(entry.reviews)} />
                </div>

                <p className="mt-3 text-xs text-slate-500">Last seen {formatShortDate(entry.latestContributionDate)}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-4 hidden overflow-hidden rounded-[24px] border border-white/8 md:block">
          <table className="w-full divide-y divide-white/8 text-left">
            <thead className="bg-white/[0.02] text-[11px] uppercase tracking-[0.22em] text-slate-500">
              <tr>
                <th className="px-4 py-3">Rank</th>
                <th className="px-4 py-3">Contributor</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Merged PRs</th>
                <th className="hidden px-4 py-3 xl:table-cell">Issues Closed</th>
                <th className="hidden px-4 py-3 xl:table-cell">Reviews</th>
                <th className="px-4 py-3">Last Seen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/6 text-sm text-slate-200">
              {entries.map((entry) => {
                const isSelected = entry.username === selectedUsername;

                return (
                  <tr
                    key={entry.username}
                    className={`cursor-pointer transition ${isSelected ? 'bg-cyan-400/[0.08]' : 'hover:bg-white/[0.03]'}`}
                    onClick={() => onSelect(entry.username)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        onSelect(entry.username);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-pressed={isSelected}
                    aria-label={`Select ${entry.displayName}`}
                  >
                    <td className="px-4 py-4">
                      <span className={`inline-flex min-w-[3.25rem] items-center justify-center rounded-full border px-3 py-1 text-xs font-semibold ${getRankBadgeClasses(entry.rank)}`}>
                        #{entry.rank}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] text-xs font-semibold uppercase text-slate-300">
                          {entry.avatarUrl ? (
                            <img src={entry.avatarUrl} alt={entry.displayName} className="h-full w-full object-cover" />
                          ) : (
                            entry.displayName.slice(0, 2)
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-white">{entry.displayName}</p>
                          <p className="truncate text-xs text-slate-500">@{entry.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 font-semibold text-cyan-100">
                        {formatScore(entry.score)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-white">{formatMetric(entry.prMerged)}</td>
                    <td className="hidden px-4 py-4 xl:table-cell">{formatMetric(entry.issuesClosed)}</td>
                    <td className="hidden px-4 py-4 xl:table-cell">{formatMetric(entry.reviews)}</td>
                    <td className="px-4 py-4 text-slate-500">{formatShortDate(entry.latestContributionDate)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    )}
  </div>
);

const MobileStat = ({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) => (
  <div className={`rounded-2xl border px-3 py-3 ${emphasis ? 'border-cyan-300/20 bg-cyan-300/[0.08]' : 'border-white/8 bg-white/[0.03]'}`}>
    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{label}</p>
    <p className={`mt-2 text-sm font-semibold ${emphasis ? 'text-cyan-100' : 'text-white'}`}>{value}</p>
  </div>
);

export default LeaderboardTable;
