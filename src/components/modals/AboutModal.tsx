'use client';

import Modal from '@/components/ui/Modal';

export default function AboutModal() {
  return (
    <Modal hashName="about" title="About this site">
      <div className="space-y-4">
        <p className="text-body text-ink-muted">
          I walked the last 115km of the Camino Francés in May 2026.
          Built as a reference for anyone planning the same walk, and a memory for me.
        </p>
        <p className="text-body-sm text-ink-muted italic">— Ryan</p>
        <p className="text-caption text-ink-faint pt-4 border-t border-border">
          © 2026 Ryan Yee · Built in NYC after walking to Santiago
        </p>
      </div>
    </Modal>
  );
}
