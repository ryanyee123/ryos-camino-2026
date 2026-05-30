'use client';

import { Backpack } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { PlaceCard } from '@/components/ui/Card';
import { gear } from '@/data/days';

export default function GearModal() {
  return (
    <Modal hashName="gear" title="What's in my bag">
      <p className="text-body text-ink-muted mb-6">
        Everything I carried for 5 days on foot. 7.8 kg base weight.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {gear.map((item) => (
          <PlaceCard
            key={item.name}
            placeholderIcon={Backpack}
            eyebrow={item.category}
            name={item.name}
            note={item.weight}
          />
        ))}
      </div>
    </Modal>
  );
}
