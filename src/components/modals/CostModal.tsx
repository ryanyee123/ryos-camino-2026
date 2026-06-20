'use client';

import { useState } from 'react';
import { PiggyBank, TrendingUp, BedDouble, Utensils, Backpack } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { StatCard } from '@/components/ui/Card';
import { cost } from '@/data/cost';

function fmt(value: number, currency: 'EUR' | 'USD') {
  const n = currency === 'USD' ? Math.round(value * cost.conversionRate) : Math.round(value);
  return `${currency === 'USD' ? '$' : '€'}${n.toLocaleString()}`;
}

const tripCategories = cost.categories.filter((c) => c.name !== 'Gear');
const gearCategory = cost.categories.find((c) => c.name === 'Gear')!;
const tripTotalEur = tripCategories.reduce((sum, c) => sum + c.totalEur, 0);

const lodgingCategory = cost.categories.find((c) => c.name === 'Lodging')!;
const foodCategory = cost.categories.find((c) => c.name === 'Food')!;

const perDayEur = Math.round(tripTotalEur / 7);
const bedPerNightEur = Math.round(lodgingCategory.totalEur / lodgingCategory.items.length);
const foodPerDayEur = Math.round(foodCategory.totalEur / foodCategory.items.length);

export default function CostModal() {
  const [currency, setCurrency] = useState<'EUR' | 'USD'>('EUR');

  const currencyButton = (
    <button
      onClick={() => setCurrency(currency === 'EUR' ? 'USD' : 'EUR')}
      className="flex-shrink-0 flex items-center gap-1 rounded-full border border-border-strong px-3 py-1.5 text-body-sm font-medium transition-colors hover:bg-surface-hover"
    >
      <span className={currency === 'EUR' ? 'text-ink' : 'text-ink-muted'}>€</span>
      <span className="text-ink-muted">/</span>
      <span className={currency === 'USD' ? 'text-ink' : 'text-ink-muted'}>$</span>
    </button>
  );

  return (
    <Modal hashName="cost" title="What it cost" headerRight={currencyButton}>
      <div className="mb-6">
        <p className="text-body text-ink-muted">
          Seven days, all in. A budget reference for anyone planning this route.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <StatCard label="TOTAL" value={fmt(cost.totalEur, currency)} sublabel="trip + gear" icon={PiggyBank} compact />
        <StatCard label="ON-TRIP" value={fmt(tripTotalEur, currency)} sublabel="7 days" icon={TrendingUp} compact />
        <StatCard label="BED" value={fmt(bedPerNightEur, currency)} sublabel="avg per night" icon={BedDouble} compact />
        <StatCard label="GEAR" value={fmt(gearCategory.totalEur, currency)} sublabel="one-time" icon={Backpack} compact />
      </div>

      {/* On-trip categories */}
      {tripCategories.map((cat) => (
        <div key={cat.name} className="mb-6">
          <div className="flex items-baseline justify-between border-b border-border-strong pb-2 mb-2">
            <h3 className="text-body-sm font-semibold font-pixel">{cat.name}</h3>
            <span className="text-body-sm font-semibold tabular-nums">{fmt(cat.totalEur, currency)}</span>
          </div>
          <div className="space-y-1">
            {cat.items.map((item) => (
              <div key={item.name} className="flex items-baseline justify-between text-body-sm gap-4">
                <span className="text-ink-muted min-w-0">{item.name}</span>
                <span className="tabular-nums flex-shrink-0 text-right min-w-[3.5rem]">{fmt(item.amountEur, currency)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="border-t border-border-strong pt-4 mb-8 flex items-baseline justify-between">
        <span className="text-body font-semibold font-pixel">On-trip subtotal</span>
        <span className="text-body font-semibold tabular-nums">{fmt(tripTotalEur, currency)}</span>
      </div>

      {/* Gear category */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between border-b border-border-strong pb-2 mb-2">
          <h3 className="text-body-sm font-semibold font-pixel">{gearCategory.name}</h3>
          <span className="text-body-sm font-semibold tabular-nums">{fmt(gearCategory.totalEur, currency)}</span>
        </div>
        <div className="space-y-1">
          {gearCategory.items.map((item) => (
            <div key={item.name} className="flex items-baseline justify-between text-body-sm gap-4">
              <span className="text-ink-muted min-w-0">{item.name}</span>
              <span className="tabular-nums flex-shrink-0 text-right min-w-[3.5rem]">{fmt(item.amountEur, currency)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border-strong pt-4 flex items-baseline justify-between">
        <span className="text-body font-semibold font-pixel">Grand total</span>
        <span className="text-body font-semibold tabular-nums">{fmt(cost.totalEur, currency)}</span>
      </div>
    </Modal>
  );
}
