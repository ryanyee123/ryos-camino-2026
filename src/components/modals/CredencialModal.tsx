'use client';

import { Stamp } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { MediaCard } from '@/components/ui/Card';
import PlaceholderImage from '@/components/ui/PlaceholderImage';

const stamps = [
  { location: 'Sarria', day: 'Day 0', source: 'Albergue O Durmiñento' },
  { location: 'Portomarín', day: 'Day 1', source: 'Iglesia de San Nicolás' },
  { location: 'Portomarín', day: 'Day 1', source: 'Albergue Ferramenteiro' },
  { location: 'Palas de Rei', day: 'Day 2', source: 'Albergue de Peregrinos' },
  { location: 'Palas de Rei', day: 'Day 2', source: 'Pulpería Loly' },
  { location: 'Melide', day: 'Day 3', source: 'Pulpería Ezequiel' },
  { location: 'Melide', day: 'Day 3', source: 'Iglesia de Santa María' },
  { location: 'Arzúa', day: 'Day 3', source: 'Albergue Don Quijote' },
  { location: 'Arzúa', day: 'Day 4', source: 'Café Centro' },
  { location: 'O Pedrouzo', day: 'Day 4', source: 'Albergue O Pino' },
  { location: 'Santiago', day: 'Day 5', source: 'Catedral de Santiago' },
  { location: 'Santiago', day: 'Day 5', source: 'Oficina del Peregrino' },
];

export default function CredencialModal() {
  return (
    <Modal hashName="credencial" title="Credencial">
      <p className="text-body text-ink-muted mb-6">
        Two stamps a day, from churches, albergues, and cafés. Proof you walked it.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {stamps.map((stamp, i) => (
          <div key={i}>
            <MediaCard>
              <div className="aspect-square">
                <PlaceholderImage icon={Stamp} />
              </div>
            </MediaCard>
            <div className="mt-2">
              <p className="text-body-sm font-medium">{stamp.source}</p>
              <p className="text-body-sm text-ink-muted">{stamp.location} · {stamp.day}</p>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
