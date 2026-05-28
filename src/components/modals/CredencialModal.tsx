'use client';

import { useState } from 'react';
import { Stamp } from 'lucide-react';
import Modal from '@/components/ui/Modal';
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

/** Stable rotation from stamp index: -3deg to +3deg */
function stampRotation(index: number): number {
  const hash = ((index * 2654435761) >>> 0) % 7;
  return hash - 3;
}

export default function CredencialModal() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <Modal hashName="credencial" title="Credencial">
      <p className="text-body text-ink-muted mb-6">
        Two stamps a day, from churches, albergues, and cafés. Proof you walked it.
      </p>
      <div className="rounded-xl bg-[#F5F0E6] p-6 md:p-8 border border-black/[0.06]">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
          {stamps.map((stamp, i) => (
            <button
              key={i}
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="group flex flex-col items-center text-center"
            >
              <div
                className="w-full aspect-square rounded-lg border border-black/[0.08] bg-white/60 shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden motion-safe:transition-transform motion-safe:duration-200"
                style={{ transform: `rotate(${stampRotation(i)}deg)` }}
              >
                <PlaceholderImage icon={Stamp} />
              </div>
              <div
                className="mt-2 overflow-hidden motion-safe:transition-[max-height,opacity] motion-safe:duration-200"
                style={{
                  maxHeight: expanded === i ? '80px' : '0px',
                  opacity: expanded === i ? 1 : 0,
                }}
              >
                <p className="text-[12px] font-medium text-ink">{stamp.source}</p>
                <p className="text-[11px] text-ink-muted">{stamp.location} · {stamp.day}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
