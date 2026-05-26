import { Bed, Utensils, Camera } from 'lucide-react';
import { PlaceCard, MediaCard } from '@/components/ui/Card';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import type { Day } from '@/data/days';

function formatDate(iso: string) {
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase();
}

export default function DayContent({ day }: { day: Day }) {
  return (
    <div>
      <p className="text-caption text-accent mb-2">
        DAY {day.day} · {formatDate(day.date)}
      </p>
      <h2 className="text-h1">{day.title}</h2>

      <div className="mt-8 space-y-4">
        {day.narrative.map((p, i) => (
          <p key={i} className="text-body leading-relaxed">{p}</p>
        ))}
      </div>

      <div className="mt-10">
        <p className="text-caption mb-3">WHERE I SLEPT</p>
        <PlaceCard
          placeholderIcon={Bed}
          eyebrow="ALBERGUE"
          name={day.albergue.name}
          meta={day.albergue.town}
          note={day.albergue.note}
        />
      </div>

      <div className="mt-10">
        <p className="text-caption mb-3">WHERE I ATE</p>
        <div className="space-y-3">
          {day.meals.map((meal) => (
            <PlaceCard
              key={meal.name}
              placeholderIcon={Utensils}
              eyebrow={meal.label}
              name={meal.name}
              meta={meal.location}
              note={meal.note}
            />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <p className="text-caption mb-3">PHOTOS</p>
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <MediaCard key={i}>
              <div className="aspect-square">
                <PlaceholderImage icon={Camera} />
              </div>
            </MediaCard>
          ))}
        </div>
      </div>
    </div>
  );
}
