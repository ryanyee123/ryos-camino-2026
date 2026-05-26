import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Footprints, Clock, Activity, Mountain, ChevronLeft, ChevronRight, Bed, Utensils, ImageIcon } from 'lucide-react';
import RouteMap from '@/components/RouteMap';
import { StatCard, PlaceCard, MediaCard } from '@/components/ui/Card';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import { days } from '@/data/days';
import { dayDetails } from '@/data/day-details';

function formatDate(iso: string) {
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export default async function DayPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const { day: dayParam } = await params;
  const dayNum = parseInt(dayParam, 10);
  const day = days.find((d) => d.day === dayNum);
  const detail = dayDetails[dayNum];

  if (!day || !detail) notFound();

  const hours = (day.miles / 2.5).toFixed(1);
  const steps = Math.round(day.miles * 2200).toLocaleString();
  const prevDay = days.find((d) => d.day === dayNum - 1);
  const nextDay = days.find((d) => d.day === dayNum + 1);

  return (
    <div className="bg-surface text-ink">
      <div className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-body-sm text-ink-muted hover:text-ink transition-colors">
          <ArrowLeft size={14} />
          Back to overview
        </Link>

        {/* Header */}
        <div className="mt-8">
          <p className="text-caption">DAY {day.day} · {formatDate(day.date)}</p>
          <h1 className="text-h1 mt-2">{day.title}</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
          <StatCard label="MILES" value={String(day.miles)} icon={Footprints} />
          <StatCard label="HOURS" value={hours} icon={Clock} />
          <StatCard label="STEPS" value={steps} icon={Activity} />
          <StatCard label="ELEVATION" value={detail.elevation} icon={Mountain} />
        </div>

        {/* Map */}
        <div className="mt-8">
          <RouteMap scopedToDay={dayNum} />
        </div>

        {/* Journal */}
        <section className="mt-16">
          <h2 className="text-h2">Notes from the trail</h2>
          <div className="mt-6 max-w-2xl space-y-4">
            {detail.journal.map((p, i) => (
              <p key={i} className="text-body text-ink-muted">{p}</p>
            ))}
          </div>
        </section>

        {/* Where I slept */}
        <section className="mt-16">
          <h2 className="text-h2">Where I slept</h2>
          <div className="mt-6 max-w-sm">
            <PlaceCard
              placeholderIcon={Bed}
              eyebrow="ALBERGUE"
              name={detail.albergue.name}
              meta={detail.albergue.location}
              note={detail.albergue.note}
            />
          </div>
        </section>

        {/* Where I ate */}
        <section className="mt-16">
          <h2 className="text-h2">Where I ate</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            {detail.meals.map((meal) => (
              <PlaceCard
                key={meal.name}
                placeholderIcon={Utensils}
                eyebrow={meal.eyebrow}
                name={meal.name}
                meta={meal.location}
                note={meal.note}
              />
            ))}
          </div>
        </section>

        {/* Photos */}
        <section className="mt-16">
          <h2 className="text-h2">Photos</h2>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <MediaCard key={i}>
                <div className="aspect-[4/3]">
                  <PlaceholderImage icon={ImageIcon} />
                </div>
              </MediaCard>
            ))}
          </div>
        </section>

        {/* Day navigation */}
        <nav className="mt-16 pt-6 border-t border-border flex items-center justify-between">
          {prevDay ? (
            <Link href={`/days/${prevDay.day}`} className="inline-flex items-center gap-2 text-body text-ink-muted hover:text-ink transition-colors">
              <ChevronLeft size={16} />
              Day {prevDay.day}
            </Link>
          ) : (
            <div />
          )}
          {nextDay ? (
            <Link href={`/days/${nextDay.day}`} className="inline-flex items-center gap-2 text-body text-ink-muted hover:text-ink transition-colors">
              Day {nextDay.day}
              <ChevronRight size={16} />
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </div>
    </div>
  );
}
