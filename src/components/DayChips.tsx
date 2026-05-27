'use client';

import { days } from '@/data/days';

type ActiveDay = number | 'full';

type DayChipsProps = {
  activeDay: ActiveDay;
  onSelect: (val: ActiveDay) => void;
};

export default function DayChips({ activeDay, onSelect }: DayChipsProps) {
  return (
    <div className="sticky top-0 z-40 -mx-4 px-4 bg-surface/72 backdrop-blur-md backdrop-saturate-150 border-b border-black/[0.04] py-4">
      <div className="max-w-6xl mx-auto px-6 flex gap-2 flex-wrap">
        <button
          onClick={() => onSelect('full')}
          className={`shrink-0 rounded-full px-4 py-2 text-body-sm font-medium border transition-colors ${
            activeDay === 'full'
              ? 'bg-ink text-white border-ink'
              : 'bg-transparent border-border text-ink-muted hover:border-border-strong hover:text-ink'
          }`}
        >
          Full route
        </button>
        {days.map((d) => (
          <button
            key={d.day}
            onClick={() => onSelect(d.day)}
            className={`shrink-0 rounded-full px-4 py-2 text-body-sm font-medium border transition-colors ${
              activeDay === d.day
                ? 'bg-ink text-white border-ink'
                : 'bg-transparent border-border text-ink-muted hover:border-border-strong hover:text-ink'
            }`}
          >
            Day {d.day}
          </button>
        ))}
      </div>
    </div>
  );
}
