import { tripOverview } from '@/data/days';

export default function TripOverviewContent() {
  return (
    <div>
      <div className="space-y-4">
        {tripOverview.paragraphs.map((p, i) => (
          <p key={i} className="text-body leading-relaxed">{p}</p>
        ))}
      </div>
    </div>
  );
}
