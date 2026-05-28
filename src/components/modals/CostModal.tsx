'use client';

import { useState } from 'react';
import { PiggyBank, TrendingUp, BedDouble, Utensils } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { StatCard } from '@/components/ui/Card';

const EUR_TO_USD = 1.12;

const breakdown = [
  { category: 'Albergues', eur: 72, perDayEur: 14, notes: '5 nights, municipal + private mix' },
  { category: 'Meals', eur: 92, perDayEur: 18, notes: 'Pilgrim menus + cafés' },
  { category: 'Snacks & coffee', eur: 34, perDayEur: 7, notes: 'Coffee every morning, fruit, chocolate' },
  { category: 'Transportation', eur: 68, perDayEur: null, notes: 'Madrid→Sarria train (one-way)' },
  { category: 'Misc', eur: 46, perDayEur: 9, notes: 'Credencial, donations, blister care' },
];

const totalEur = 312;
const perDayEur = 62;
const bedEur = 14;
const foodEur = 18;

function fmt(value: number, currency: 'EUR' | 'USD') {
  if (currency === 'USD') return `$${Math.round(value * EUR_TO_USD)}`;
  return `€${value}`;
}

export default function CostModal() {
  const [currency, setCurrency] = useState<'EUR' | 'USD'>('EUR');

  return (
    <Modal hashName="cost" title="What it cost">
      <div className="flex items-center justify-between mb-6">
        <p className="text-body text-ink-muted">
          Five days, all in. A budget reference for anyone planning this route.
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
        <StatCard label="TOTAL" value={fmt(totalEur, currency)} sublabel="all five days" icon={PiggyBank} />
        <StatCard label="PER DAY" value={fmt(perDayEur, currency)} sublabel="average" icon={TrendingUp} />
        <StatCard label="BED" value={fmt(bedEur, currency)} sublabel="avg per night" icon={BedDouble} />
        <StatCard label="FOOD" value={fmt(foodEur, currency)} sublabel="avg per day" icon={Utensils} />
      </div>

      <table className="w-full text-body-sm">
        <thead>
          <tr className="border-b border-border-strong">
            <th className="text-left py-3 font-medium">Category</th>
            <th className="text-right py-3 font-medium">Total</th>
            <th className="text-right py-3 font-medium">Per day</th>
            <th className="text-left py-3 pl-4 font-medium">Notes</th>
          </tr>
        </thead>
        <tbody>
          {breakdown.map((row) => (
            <tr key={row.category} className="border-b border-border">
              <td className="py-3">{row.category}</td>
              <td className="text-right py-3 tabular-nums">{fmt(row.eur, currency)}</td>
              <td className="text-right py-3 tabular-nums">{row.perDayEur ? fmt(row.perDayEur, currency) : '—'}</td>
              <td className="text-left py-3 pl-4 text-ink-muted">{row.notes}</td>
            </tr>
          ))}
          <tr className="font-semibold">
            <td className="py-3">Total</td>
            <td className="text-right py-3 tabular-nums">{fmt(totalEur, currency)}</td>
            <td className="text-right py-3 tabular-nums">{fmt(perDayEur, currency)}</td>
            <td className="py-3 pl-4" />
          </tr>
        </tbody>
      </table>

      <div className="mt-8 max-w-2xl space-y-3">
        <p className="text-body text-ink-muted">
          If I were planning this again, I'd budget {fmt(65, currency)}/day as a comfortable baseline. Municipal albergues are cheaper ({fmt(8, currency)}–{fmt(10, currency)}) but fill up fast; private ones run {fmt(12, currency)}–{fmt(18, currency)} and usually have better showers. Pilgrim menus are the best value for dinner — expect three courses and wine for {fmt(10, currency)}–{fmt(14, currency)}.
        </p>
        <p className="text-body text-ink-muted">
          The train from Madrid to Sarria was the single biggest expense. If you're already in Galicia, the total drops significantly. Coffee is non-negotiable at {fmt(1.5, currency)}/cup, and you'll drink two or three a day.
        </p>
      </div>
    </Modal>
  );
}
