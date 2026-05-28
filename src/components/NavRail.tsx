'use client';

import { useState } from 'react';
import { Backpack, Euro, Stamp } from 'lucide-react';

const ITEM_SIZE = 40;
const GAP = 4;
const PADDING = 8;

const items = [
  { icon: Backpack, label: 'Gear', action: () => { window.location.hash = 'gear'; } },
  { icon: Euro, label: 'Cost', action: () => { window.location.hash = 'cost'; } },
  { icon: Stamp, label: 'Credencial', action: () => { window.location.hash = 'credencial'; } },
];

export default function NavRail() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      {/* Desktop: fixed left rail */}
      <nav
        className="hidden md:flex fixed left-12 top-1/2 -translate-y-1/2 z-50 flex-col items-start"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div className="relative bg-surface-raised rounded-2xl p-2 flex flex-col gap-1 shadow-nav">
          {/* Sliding hover indicator */}
          <div
            className="absolute left-2 right-2 h-10 rounded-xl bg-stone-100 transition-[transform,opacity] duration-200 ease-out"
            style={{
              opacity: hoveredIndex !== null ? 1 : 0,
              transform: `translateY(${hoveredIndex !== null ? PADDING + hoveredIndex * (ITEM_SIZE + GAP) - PADDING : 0}px)`,
              willChange: 'transform',
            }}
          />

          {items.map((item, index) => (
            <button
              key={item.label}
              onClick={item.action}
              onMouseEnter={() => setHoveredIndex(index)}
              className="relative flex items-center justify-center w-10 h-10 rounded-xl"
            >
              <item.icon
                size={20}
                className="text-ink-muted transition-[color] duration-200 ease-out"
                style={{ color: hoveredIndex === index ? 'var(--color-ink)' : undefined }}
              />
              {/* Tooltip */}
              <span
                className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-ink text-white text-body-sm whitespace-nowrap pointer-events-none transition-[opacity] duration-150 ease-out"
                style={{ opacity: hoveredIndex === index ? 1 : 0 }}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile: fixed bottom center bar */}
      <nav className="flex md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-surface-raised rounded-2xl p-2 gap-1 shadow-nav">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={item.action}
            className="flex items-center justify-center w-10 h-10 rounded-xl transition-[background-color] duration-150 hover:bg-stone-100"
          >
            <item.icon size={20} className="text-ink-muted" />
          </button>
        ))}
      </nav>
    </>
  );
}
