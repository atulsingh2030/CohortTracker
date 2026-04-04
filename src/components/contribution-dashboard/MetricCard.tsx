import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
  tone?: 'ember' | 'teal' | 'amber' | 'slate';
}

const toneMap = {
  ember: {
    accent: 'from-orange-400 via-rose-400 to-transparent',
    icon: 'border-orange-300/20 bg-orange-400/10 text-orange-100',
    value: 'text-orange-50',
  },
  teal: {
    accent: 'from-cyan-400 via-emerald-300 to-transparent',
    icon: 'border-cyan-300/20 bg-cyan-400/10 text-cyan-100',
    value: 'text-cyan-50',
  },
  amber: {
    accent: 'from-amber-300 via-orange-300 to-transparent',
    icon: 'border-amber-300/20 bg-amber-400/10 text-amber-100',
    value: 'text-amber-50',
  },
  slate: {
    accent: 'from-slate-300 via-slate-400 to-transparent',
    icon: 'border-slate-300/20 bg-slate-400/10 text-slate-100',
    value: 'text-slate-50',
  },
};

const MetricCard = ({ icon: Icon, label, value, detail, tone = 'ember' }: MetricCardProps) => {
  const palette = toneMap[tone];

  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-white/8 bg-[#0b1727]/78 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-white/14">
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${palette.accent}`} />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white/[0.03] to-transparent opacity-0 transition duration-200 group-hover:opacity-100" />
      <div>
        <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">{label}</p>
        <div className="mt-4 flex items-start justify-between gap-4">
          <p className={`text-3xl font-semibold tracking-tight ${palette.value}`}>{value}</p>
          <div className={`rounded-2xl border p-3 ${palette.icon}`}>
            <Icon size={20} strokeWidth={1.8} />
          </div>
        </div>
      </div>
      <p className="mt-4 max-w-[18rem] text-sm leading-6 text-slate-400">{detail}</p>
    </div>
  );
};

export default MetricCard;
