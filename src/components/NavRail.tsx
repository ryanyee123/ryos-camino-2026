'use client';

import { Home, Backpack, Euro, Stamp } from 'lucide-react';

const items = [
  { icon: Home, label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
  { icon: Backpack, label: 'Gear', action: () => { window.location.hash = 'gear'; } },
  { icon: Euro, label: 'Cost', action: () => { window.location.hash = 'cost'; } },
  { icon: Stamp, label: 'Credencial', action: () => { window.location.hash = 'credencial'; } },
];

export default function NavRail() {
  return (
    <>
      {/* Desktop: fixed left rail */}
      <nav className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 bg-surface-raised border border-border rounded-2xl p-2 flex-col gap-1 shadow-sm">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={item.action}
            className="group relative flex items-center justify-center w-10 h-10 rounded-xl hover:bg-stone-100 transition-all duration-150"
          >
            <item.icon size={20} className="text-ink-muted group-hover:text-ink transition-colors" />
            <span className="absolute left-full ml-3 px-3 py-1.5 rounded-md bg-ink text-white text-body-sm whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 delay-300">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Mobile: fixed top-right cluster */}
      <nav className="flex md:hidden fixed top-4 right-4 z-40 bg-surface-raised border border-border rounded-xl p-1.5 gap-1 shadow-sm">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={item.action}
            className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-stone-100 transition-all duration-150"
          >
            <item.icon size={18} className="text-ink-muted" />
          </button>
        ))}
      </nav>
    </>
  );
}
