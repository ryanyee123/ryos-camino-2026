import Modal from '@/components/ui/Modal';
import { gear } from '@/data/days';

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
const totalLbs = Math.round(totalGrams / 453.592);
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
  return (
    <Modal hashName="gear" title="What's in my bag">
      <p className="text-body text-ink-muted mb-1">
        Everything I carried for 5 days on foot.
      </p>
      <p className="text-body font-semibold text-ink mb-6">
        {totalLbs} lbs / {totalKg} kg base weight
      </p>
      <div className="space-y-6">
        {grouped.map((group) => (
          <div key={group.category}>
            <p className="text-caption text-ink-muted mb-2">{group.category}</p>
            <div className="bg-surface-raised shadow-card rounded-xl overflow-hidden divide-y divide-border">
              {group.items.map((item) => (
                <div key={item.name} className="px-4 py-3.5 flex items-center justify-between gap-4">
                  <p className="text-body font-semibold font-pixel">{item.name}</p>
                  {item.weight && (
                    <p className="text-body-sm text-ink-muted tabular-nums shrink-0">
                      {formatWeight(item.weight)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
