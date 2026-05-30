'use client';

import { Home } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { PlaceCard } from '@/components/ui/Card';
import { days } from '@/data/days';

export default function LodgingModal() {
  return (
    <Modal hashName="lodging" title="Where I stayed">
      <p className="text-body text-ink-muted mb-6">
        Every albergue, pensión, and apartment across 6 nights on the Camino.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {days.map((day) => (
          <PlaceCard
            key={day.day}
            image={day.lodging.photo ? `/photos/lodging/${day.lodging.photo}` : undefined}
            placeholderIcon={Home}
            eyebrow={`DAY ${day.day} · ${day.lodging.town}`}
            name={day.lodging.name}

            href={day.lodging.googleMapsUrl || undefined}
          />
        ))}
      </div>
    </Modal>
  );
}
