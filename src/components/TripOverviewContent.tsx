import { Camera, Mountain, Coffee, Church } from 'lucide-react';
import { PlaceCard } from '@/components/ui/Card';
import { tripOverview, tripHighlights } from '@/data/days';

const highlightIcons = [Coffee, Mountain, Camera, Church];

export default function TripOverviewContent() {
  return (
    <div>
      <p className="text-h3 font-normal leading-relaxed text-ink-muted">
        {tripOverview.lead}
      </p>
      <div className="mt-6 space-y-4">
        {tripOverview.paragraphs.map((p, i) => (
          <p key={i} className="text-body leading-relaxed">{p}</p>
        ))}
      </div>

      <div className="mt-12">
        <p className="text-caption mb-4">MOMENTS TO REMEMBER</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tripHighlights.map((h, i) => (
            <PlaceCard
              key={h.title}
              placeholderIcon={highlightIcons[i]}
              eyebrow={h.eyebrow}
              name={h.title}
              meta={h.location}
              note={h.note}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
