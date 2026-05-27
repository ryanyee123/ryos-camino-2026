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
      {/* Desktop: fixed left rail — bare icons, no container */}
      <nav className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-1">
        {items.map((item) => (
          <a
            key={item.label}
            href="#"
            onClick={(e) => { e.preventDefault(); item.action(); }}
            className="group relative flex items-center justify-center w-9 h-9 rounded-md text-ink-faint hover:text-ink hover:bg-black/[0.04] transition-colors"
          >
            <item.icon className="w-4 h-4" aria-hidden />
            <span className="sr-only">{item.label}</span>
          </a>
        ))}
      </nav>

      {/* Mobile: fixed bottom center bar */}
      <nav className="flex md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-surface-raised rounded-2xl p-2 gap-1 shadow-nav">
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
