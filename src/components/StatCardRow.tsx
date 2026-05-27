import type { LucideIcon } from 'lucide-react';

type StatItem = {
  label: string;
  value: string;
  sublabel?: string;
  icon?: LucideIcon;
};

export default function StatCardRow({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6">
      {stats.map((s) => (
        <div key={s.label} className="border-t border-black/[0.06] pt-5">
          <div className="text-[13px] font-medium uppercase tracking-[0.06em] text-ink-muted">{s.label}</div>
          <div className="mt-2 text-4xl font-semibold tracking-[-0.02em] text-ink tabular-nums">{s.value}</div>
          {s.sublabel && <div className="mt-1 text-sm text-ink-faint">{s.sublabel}</div>}
        </div>
      ))}
    </div>
  );
}
