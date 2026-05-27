import { Camera, Mountain, Coffee, Church } from 'lucide-react';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
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
        <p className="text-caption mb-6">MOMENTS TO REMEMBER</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {tripHighlights.map((h, i) => (
            <div key={h.title} className="group">
              <p className="text-[13px] uppercase tracking-[0.06em] text-ink-muted mb-3">{h.eyebrow}</p>
              <div className="rounded-md overflow-hidden aspect-[4/5]">
                <div className="w-full h-full motion-safe:transition-transform motion-safe:duration-[400ms] motion-safe:ease-out group-hover:scale-[1.03]">
                  <PlaceholderImage icon={highlightIcons[i]} />
                </div>
              </div>
              <h3 className="text-lg font-medium mt-3 tracking-[-0.01em]">{h.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
