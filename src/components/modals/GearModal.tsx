'use client';

import { Backpack } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { PlaceCard } from '@/components/ui/Card';

const gear = [
  { eyebrow: 'PACK', name: 'Osprey Talon 33', note: '950g. The whole life on my back.' },
  { eyebrow: 'FOOTWEAR', name: 'Hoka Speedgoat 5', note: 'Trail runners, not boots. Controversial. Right call.' },
  { eyebrow: 'BASE LAYER', name: 'Smartwool merino long sleeve', note: 'Worn five days straight. Hand-washed twice. Didn\'t smell.' },
  { eyebrow: 'TREKKING', name: 'Black Diamond trekking poles', note: 'Saved my knees on the descent into Portomarín.' },
  { eyebrow: 'SHELL', name: 'Patagonia Houdini', note: '100g, packs to nothing. Used it once, glad I had it.' },
  { eyebrow: 'BASE', name: 'Saxx Kinetic boxers (×2)', note: 'Two pairs. Hand-wash rotation. No chafing, ever.' },
  { eyebrow: 'SLEEP', name: 'Sea to Summit silk liner', note: 'Lighter than a sleeping bag, warmer than nothing.' },
  { eyebrow: 'ELECTRONICS', name: 'Anker 10000mAh battery', note: 'Charged the phone every night. Never died.' },
];

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
            eyebrow={item.eyebrow}
            name={item.name}
            note={item.note}
          />
        ))}
      </div>
    </Modal>
  );
}
