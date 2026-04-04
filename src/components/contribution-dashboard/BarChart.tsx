interface BarChartItem {
  label: string;
  value: number;
  footnote?: string;
}

interface BarChartProps {
  title: string;
  subtitle: string;
  items: BarChartItem[];
  accent?: string;
  emptyLabel?: string;
}

const BarChart = ({
  title,
  subtitle,
  items,
  accent = 'from-orange-400 to-amber-300',
  emptyLabel = 'No contribution history yet.',
}: BarChartProps) => {
  const maxValue = Math.max(...items.map((item) => item.value), 0);
  const totalValue = items.reduce((sum, item) => sum + item.value, 0);
  const peakItem = items.reduce<BarChartItem | null>((best, item) => {
    if (!best || item.value > best.value) {
      return item;
    }

    return best;
  }, null);

  return (
    <div className="rounded-[30px] border border-white/8 bg-[#0b1727]/78 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="mt-1 max-w-xl text-sm leading-6 text-slate-400">{subtitle}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-right text-xs uppercase tracking-[0.18em] text-slate-500">
          <div className="rounded-2xl border border-white/8 bg-[#07111d]/90 px-3 py-2">
            <p>Peak</p>
            <p className="mt-2 text-sm font-semibold tracking-normal text-white">
              {peakItem ? peakItem.value.toFixed(peakItem.value % 1 === 0 ? 0 : 1) : '0'}
            </p>
            <p className="mt-1 truncate text-[11px] tracking-normal text-slate-500">{peakItem?.label || 'No peak'}</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-[#07111d]/90 px-3 py-2">
            <p>Total</p>
            <p className="mt-2 text-sm font-semibold tracking-normal text-white">
              {totalValue.toFixed(totalValue % 1 === 0 ? 0 : 1)}
            </p>
            <p className="mt-1 text-[11px] tracking-normal text-slate-500">{items.length} buckets</p>
          </div>
        </div>
      </div>

      {items.length === 0 || maxValue === 0 ? (
        <div className="mt-6 rounded-[24px] border border-dashed border-white/10 bg-[#07111d]/90 px-4 py-8 text-center text-sm text-slate-500">
          {emptyLabel}
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-[24px] border border-white/8 bg-[#07111d]/90 px-3 py-5 sm:px-4">
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 grid grid-rows-4">
              {[0, 1, 2, 3].map((row) => (
                <div key={row} className="border-b border-dashed border-white/[0.05]" />
              ))}
            </div>
            <div className="relative flex items-end gap-2 sm:gap-3">
              {items.map((item, index) => {
                const height = Math.max((item.value / maxValue) * 100, item.value > 0 ? 10 : 0);

                return (
                  <div key={`${item.label}-${item.footnote || ''}-${index}`} className="flex min-w-0 flex-1 flex-col justify-end gap-3">
                    <div className="relative flex h-40 items-end rounded-[18px] border border-white/6 bg-white/[0.03] p-1.5 sm:h-44 sm:p-2">
                      <div className="absolute inset-x-2 top-2 h-2 rounded-full bg-white/[0.04]" />
                      <div
                        className={`w-full rounded-[12px] bg-gradient-to-t ${accent} shadow-[0_18px_34px_-18px_rgba(56,189,248,0.45)] transition duration-300`}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-center text-xs font-medium text-white sm:text-sm">
                        {item.value.toFixed(item.value % 1 === 0 ? 0 : 1)}
                      </p>
                      <p className="truncate text-center text-[10px] text-slate-400 sm:text-xs">{item.label}</p>
                      {item.footnote ? (
                        <p className="hidden truncate text-center text-[11px] leading-4 text-slate-500 sm:block">{item.footnote}</p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarChart;
