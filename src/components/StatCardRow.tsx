import type { LucideIcon } from 'lucide-react';
import { StatCard } from '@/components/ui/Card';

type StatItem = {
  label: string;
  value: string;
  sublabel?: string;
  icon?: LucideIcon;
};

export default function StatCardRow({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((s) => (
        <StatCard key={s.label} {...s} compact />
      ))}
    </div>
  );
}
