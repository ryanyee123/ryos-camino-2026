'use client';

import { useEffect, useState, useCallback } from 'react';
import { X } from 'lucide-react';

type ModalProps = {
  hashName: string;
  title: string;
  children: React.ReactNode;
};

export default function Modal({ hashName, title, children }: ModalProps) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    const check = () => setOpen(window.location.hash === `#${hashName}`);
    check();
    window.addEventListener('hashchange', check);
    return () => window.removeEventListener('hashchange', check);
  }, [hashName]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-200"
      onClick={close}
    >
      <div
        className="bg-surface-raised rounded-2xl max-w-3xl mx-auto my-12 p-8 shadow-2xl max-h-[85vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-h2">{title}</h2>
          <button
            onClick={close}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X size={18} className="text-ink-muted" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
