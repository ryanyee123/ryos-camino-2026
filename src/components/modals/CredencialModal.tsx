'use client';

import { useState } from 'react';
import { Stamp } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import { stamps } from '@/data/days';

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
      <div className="rounded-xl bg-surface-parchment p-6 md:p-8 border border-border">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
          {stamps.map((stamp, i) => (
            <button
              key={i}
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="group flex flex-col items-center text-center"
            >
              <div
                className="w-full aspect-square rounded-lg border border-border-strong bg-white/60 shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden motion-safe:transition-transform motion-safe:duration-200"
                style={{ transform: `rotate(${stampRotation(i)}deg)` }}
              >
                {stamp.photo ? (
                  <img src={`/photos/credencial/${stamp.photo}`} alt={stamp.source} className="w-full h-full object-cover" />
                ) : (
                  <PlaceholderImage icon={Stamp} />
                )}
              </div>
              <div
                className="mt-2 overflow-hidden motion-safe:transition-[max-height,opacity] motion-safe:duration-200"
                style={{
                  maxHeight: expanded === i ? '80px' : '0px',
                  opacity: expanded === i ? 1 : 0,
                }}
              >
                <p className="text-body-sm font-medium font-pixel text-ink">{stamp.source}</p>
                <p className="text-caption text-ink-muted">{stamp.location} · {stamp.date}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
