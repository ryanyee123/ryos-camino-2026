'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { gear } from '@/data/days';
import { cost } from '@/data/cost';

const gearCosts = cost.categories.find((c) => c.name === 'Gear')!.items;

function fmt(eur: number, currency: 'EUR' | 'USD') {
  const n = currency === 'USD' ? Math.round(eur * cost.conversionRate) : Math.round(eur);
  return `${currency === 'USD' ? '$' : '€'}${n}`;
}

function formatWeight(grams: number) {
  const oz = grams / 28.3495;
  if (oz >= 16) {
    const lbs = Math.floor(oz / 16);
    const remainOz = Math.round(oz % 16);
    return `${lbs} lb ${remainOz} oz / ${grams}g`;
  }
  return `${oz.toFixed(1)} oz / ${grams}g`;
}

const totalGrams = gear.reduce((sum, item) => sum + (item.weight ?? 0), 0);
const totalLbs = (totalGrams / 453.592).toFixed(1);
const totalKg = (totalGrams / 1000).toFixed(1);

// Group gear by category, preserving order of first appearance
const grouped = gear.reduce<{ category: string; items: typeof gear }[]>((acc, item) => {
  const existing = acc.find((g) => g.category === item.category);
  if (existing) {
    existing.items.push(item);
  } else {
    acc.push({ category: item.category, items: [item] });
  }
  return acc;
}, []);

export default function GearModal() {
  const [currency, setCurrency] = useState<'EUR' | 'USD'>('USD');

  const currencyButton = (
    <button
      onClick={() => setCurrency(currency === 'EUR' ? 'USD' : 'EUR')}
      className="flex-shrink-0 flex items-center gap-1 rounded-full border border-border-strong px-3 py-1.5 text-body-sm font-medium transition-colors hover:bg-stone-100"
    >
      <span className={currency === 'EUR' ? 'text-ink' : 'text-ink-muted'}>€</span>
      <span className="text-ink-muted">/</span>
      <span className={currency === 'USD' ? 'text-ink' : 'text-ink-muted'}>$</span>
    </button>
  );

  return (
    <Modal hashName="gear" title="What's in my bag" headerRight={currencyButton}>
      <p className="text-body text-ink-muted mb-6">
        Everything I carried for 5 days on foot. {totalLbs} lbs / {totalKg} kg base weight.
      </p>
      <div className="space-y-6">
        {grouped.map((group) => (
          <div key={group.category}>
            <p className="text-caption text-ink-muted mb-2">{group.category}</p>
            <div className="bg-surface-raised shadow-card rounded-xl overflow-hidden divide-y divide-border">
              {group.items.map((item) => {
                const eur = gearCosts.find((c) => c.name === item.name)?.amountEur ?? 0;
                return (
                  <div key={item.name} className="px-4 py-3.5 flex items-center justify-between gap-4">
                    <p className="text-body font-medium font-pixel">{item.name}</p>
                    <div className="flex items-center gap-3 shrink-0">
                      {item.weight && (
                        <p className="text-body-sm text-ink-faint tabular-nums">
                          {formatWeight(item.weight)}
                        </p>
                      )}
                      <p className="text-body text-ink-muted tabular-nums">
                        {fmt(eur, currency)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
