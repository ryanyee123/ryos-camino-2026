import { tripOverview } from '@/data/days';

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
    </div>
  );
}
