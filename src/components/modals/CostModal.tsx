'use client';

import { PiggyBank, TrendingUp, BedDouble, Utensils } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { StatCard } from '@/components/ui/Card';

const breakdown = [
  { category: 'Albergues', total: '€72', perDay: '€14', notes: '5 nights, municipal + private mix' },
  { category: 'Meals', total: '€92', perDay: '€18', notes: 'Pilgrim menus + cafés' },
  { category: 'Snacks & coffee', total: '€34', perDay: '€7', notes: 'Coffee every morning, fruit, chocolate' },
  { category: 'Transportation', total: '€68', perDay: '—', notes: 'Madrid→Sarria train (one-way)' },
  { category: 'Misc', total: '€46', perDay: '€9', notes: 'Credencial, donations, blister care' },
];

export default function CostModal() {
  return (
    <Modal hashName="cost" title="What it cost">
      <p className="text-body text-ink-muted mb-6">
        Five days, all in. A budget reference for anyone planning this route.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <StatCard label="TOTAL" value="€312" sublabel="all five days" icon={PiggyBank} />
        <StatCard label="PER DAY" value="€62" sublabel="average" icon={TrendingUp} />
        <StatCard label="BED" value="€14" sublabel="avg per night" icon={BedDouble} />
        <StatCard label="FOOD" value="€18" sublabel="avg per day" icon={Utensils} />
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
              <td className="text-right py-3">{row.total}</td>
              <td className="text-right py-3">{row.perDay}</td>
              <td className="text-left py-3 pl-4 text-ink-muted">{row.notes}</td>
            </tr>
          ))}
          <tr className="font-semibold">
            <td className="py-3">Total</td>
            <td className="text-right py-3">€312</td>
            <td className="text-right py-3">€62</td>
            <td className="py-3 pl-4" />
          </tr>
        </tbody>
      </table>

      <div className="mt-8 max-w-2xl space-y-3">
        <p className="text-body text-ink-muted">
          If I were planning this again, I'd budget €65/day as a comfortable baseline. Municipal albergues are cheaper (€8–10) but fill up fast; private ones run €12–18 and usually have better showers. Pilgrim menus are the best value for dinner — expect three courses and wine for €10–14.
        </p>
        <p className="text-body text-ink-muted">
          The train from Madrid to Sarria was the single biggest expense. If you're already in Galicia, the total drops significantly. Coffee is non-negotiable at €1.50/cup, and you'll drink two or three a day.
        </p>
      </div>
    </Modal>
  );
}
