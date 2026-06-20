import { tripOverview } from '@/data/days';

export default function TripOverviewContent() {
  return (
    <div>
      <p className="text-caption text-accent-text mb-2">OVERVIEW</p>
      <h2 className="text-h1">The Last 115 km</h2>

      <div className="mt-8 space-y-4">
        <p className="text-body leading-relaxed">{tripOverview.paragraphs[0]}</p>
        <div className="my-4">
          <div className="bg-surface-raised shadow-card rounded-xl overflow-hidden">
            <img src="/photos/camino-map.webp" alt="Main routes of the Camino de Santiago" className="w-full h-auto" />
          </div>
        </div>
        {tripOverview.paragraphs.slice(1).map((p, i) => (
          <p key={i} className="text-body leading-relaxed">{p}</p>
        ))}
      </div>
    </div>
  );
}
