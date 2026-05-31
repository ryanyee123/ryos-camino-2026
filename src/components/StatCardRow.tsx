import { forwardRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import { StatCard } from '@/components/ui/Card';

type StatItem = {
  label: string;
  value: string;
  sublabel?: string;
  icon?: LucideIcon;
};

const StatCardRow = forwardRef<HTMLDivElement, { stats: StatItem[] }>(function StatCardRow({ stats }, ref) {
  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((s) => (
        <StatCard key={s.label} {...s} compact />
      ))}
    </div>
  );
});

export default StatCardRow;
