'use client';

import { useState } from 'react';
import { PiggyBank, TrendingUp, BedDouble, Utensils } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { StatCard } from '@/components/ui/Card';
import { cost } from '@/data/cost';

function fmt(value: number, currency: 'EUR' | 'USD') {
  if (currency === 'USD') return `$${Math.round(value * cost.conversionRate)}`;
  return `€${value}`;
}

const lodgingCategory = cost.categories.find((c) => c.name === 'Lodging')!;
const foodCategory = cost.categories.find((c) => c.name === 'Food')!;

const perDayEur = Math.round(cost.totalEur / 6);
const bedPerNightEur = Math.round(lodgingCategory.totalEur / lodgingCategory.items.length);
const foodPerDayEur = Math.round(foodCategory.totalEur / foodCategory.items.length);

export default function CostModal() {
  const [currency, setCurrency] = useState<'EUR' | 'USD'>('EUR');

  return (
    <Modal hashName="cost" title="What it cost">
      <div className="flex items-center justify-between mb-6">
        <p className="text-body text-ink-muted">
          Six days, all in. A budget reference for anyone planning this route.
        </p>
        <button
          onClick={() => setCurrency(currency === 'EUR' ? 'USD' : 'EUR')}
          className="flex-shrink-0 ml-4 flex items-center gap-1 rounded-full border border-border-strong px-3 py-1.5 text-body-sm font-medium transition-colors hover:bg-stone-100"
        >
          <span className={currency === 'EUR' ? 'text-ink' : 'text-ink-muted'}>€</span>
          <span className="text-ink-muted">/</span>
          <span className={currency === 'USD' ? 'text-ink' : 'text-ink-muted'}>$</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <StatCard label="TOTAL" value={fmt(cost.totalEur, currency)} sublabel="on-trip" icon={PiggyBank} />
        <StatCard label="PER DAY" value={fmt(perDayEur, currency)} sublabel="average" icon={TrendingUp} />
        <StatCard label="BED" value={fmt(bedPerNightEur, currency)} sublabel="avg per night" icon={BedDouble} />
        <StatCard label="FOOD" value={fmt(foodPerDayEur, currency)} sublabel="avg per day" icon={Utensils} />
      </div>

      {cost.categories.map((cat) => (
        <div key={cat.name} className="mb-6">
          <div className="flex items-baseline justify-between border-b border-border-strong pb-2 mb-2">
            <h3 className="text-body-sm font-semibold">{cat.name}</h3>
            <span className="text-body-sm font-semibold tabular-nums">{fmt(cat.totalEur, currency)}</span>
          </div>
          <div className="space-y-1">
            {cat.items.map((item) => (
              <div key={item.name} className="flex items-baseline justify-between text-body-sm">
                <span className="text-ink-muted">{item.name}</span>
                <span className="tabular-nums ml-4 flex-shrink-0">{fmt(item.amountEur, currency)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="border-t border-border-strong pt-4 mb-6 flex items-baseline justify-between">
        <span className="text-body font-semibold">Total</span>
        <span className="text-body font-semibold tabular-nums">{fmt(cost.totalEur, currency)}</span>
      </div>

      <p className="text-body-sm text-ink-muted">
        Gear tracked separately.{' '}
        <a href="#gear" className="text-accent-text underline underline-offset-2 hover:text-accent">
          See what I carried →
        </a>
      </p>
    </Modal>
  );
}
