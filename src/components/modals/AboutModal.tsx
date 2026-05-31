'use client';

import Modal from '@/components/ui/Modal';

function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-ink-faint/40 underline-offset-[3px] decoration-[0.75px] hover:decoration-ink-muted transition-colors"
    >
      {children}
    </a>
  );
}

export default function AboutModal() {
  return (
    <Modal hashName="about" title="About this site">
      <div className="space-y-4">
        <p className="text-body text-ink-muted">
          I walked the last 115km of the Camino Francés in May 2026.
          Built as a reference for anyone planning the same walk, and a memory for me.
        </p>
        <p className="text-body text-ink-muted italic">— Ryan</p>
        <div className="flex items-center gap-4 pt-1 text-body text-ink-muted">
          <InlineLink href="https://www.linkedin.com/in/ryanyee00">LinkedIn</InlineLink>
          <InlineLink href="https://x.com/ryanyee123">X</InlineLink>
          <InlineLink href="https://www.ryanyee.xyz/">Portfolio</InlineLink>
        </div>
        <p className="text-caption text-ink-faint pt-4 border-t border-border">
          © 2026 Ryan Yee · Built in NYC
        </p>
      </div>
    </Modal>
  );
}
