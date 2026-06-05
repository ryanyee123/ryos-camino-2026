'use client';

import { useEffect, useRef, useState } from 'react';
import { days } from '@/data/days';

type ActiveDay = number | 'full';

type DayChipsProps = {
  activeDay: ActiveDay;
  onSelect: (val: ActiveDay) => void;
};

export default function DayChips({ activeDay, onSelect }: DayChipsProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Sentinel: sits right above the sticky element. When it scrolls out of view, chips are stuck. */}
      <div ref={sentinelRef} className="h-0 w-full" />

      <div className="sticky top-0 z-40 py-4 pt-[calc(1rem+env(safe-area-inset-top))]">
        <div
          className="absolute inset-0 transition-opacity duration-200 ease-out motion-reduce:transition-none bg-surface/80 backdrop-blur-md backdrop-saturate-150"
          style={{ opacity: isStuck ? 1 : 0 }}
        />
        <div
          className="absolute inset-x-0 -bottom-6 h-6 bg-gradient-to-b from-surface/60 to-transparent pointer-events-none transition-opacity duration-200 ease-out motion-reduce:transition-none"
          style={{ opacity: isStuck ? 1 : 0 }}
        />
        <div className="relative max-w-6xl mx-auto px-6 flex justify-center gap-2 flex-wrap">
          <button
            onClick={() => onSelect('full')}
            className={`shrink-0 rounded-full px-4 py-2 text-body-sm font-medium font-pixel border transition-colors ${
              activeDay === 'full'
                ? 'bg-accent text-white border-accent'
                : 'bg-surface border-border text-ink-muted hover:border-border-strong hover:text-ink'
            }`}
          >
            Overview
          </button>
          {days.map((d) => (
            <button
              key={d.day}
              onClick={() => onSelect(d.day)}
              className={`shrink-0 rounded-full px-4 py-2 text-body-sm font-medium font-pixel border transition-colors ${
                activeDay === d.day
                  ? 'bg-accent text-white border-accent'
                  : 'bg-surface border-border text-ink-muted hover:border-border-strong hover:text-ink'
              }`}
            >
              Day {d.day}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
