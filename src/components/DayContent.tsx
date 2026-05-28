import { Bed, Utensils, Camera, ExternalLink } from 'lucide-react';
import { MediaCard } from '@/components/ui/Card';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import type { Day } from '@/data/days';

function formatDate(iso: string) {
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase();
}

function CompactPlace({ icon: Icon, label, name, meta, href }: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  name: string;
  meta?: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-4 px-4 py-3.5">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center">
        <Icon size={18} className="text-ink-muted" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-body-sm font-medium truncate">{name}</p>
        <p className="text-caption text-ink-muted">{[label, meta].filter(Boolean).join(' · ')}</p>
      </div>
      {href && <ExternalLink size={18} className="flex-shrink-0 text-ink-faint" />}
    </div>
  );

  const classes = `block bg-surface-raised shadow-card rounded-xl overflow-hidden${
    href ? ' transition-[box-shadow,transform] duration-200 ease-out hover:shadow-card-hover hover:-translate-y-px' : ''
  }`;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }
  return <div className={classes}>{content}</div>;
}

export default function DayContent({ day }: { day: Day }) {
  return (
    <div>
      <p className="text-caption text-accent-text mb-2">
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
        <CompactPlace
          icon={Bed}
          label="LODGING"
          name={day.lodging.name}
          meta={day.lodging.town}
          href={day.lodging.googleMapsUrl || undefined}
        />
      </div>

      <div className="mt-10">
        <p className="text-caption mb-3">WHERE I ATE</p>
        <div className="space-y-2">
          {day.meals.map((meal) => (
            <CompactPlace
              key={meal.name}
              icon={Utensils}
              label={meal.label}
              name={meal.name}
              meta={meal.location}
              href={meal.googleMapsUrl || undefined}
            />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <p className="text-caption mb-3">PHOTOS</p>
        {day.photos.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {day.photos.map((photo, i) => (
              <MediaCard key={photo}>
                <div className={i === 0 ? 'aspect-[3/4]' : 'aspect-[3/2]'}>
                  <img src={`/photos/day-${day.day}/${photo}`} alt="" className="w-full h-full object-cover" />
                </div>
              </MediaCard>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <MediaCard key={i}>
                <div className={i === 0 ? 'aspect-[3/4]' : 'aspect-[3/2]'}>
                  <PlaceholderImage icon={Camera} />
                </div>
              </MediaCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
