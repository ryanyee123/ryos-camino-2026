'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { X } from 'lucide-react';

type ModalProps = {
  hashName: string;
  title: string;
  children: React.ReactNode;
};

export default function Modal({ hashName, title, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setVisible(false);
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }, []);

  // Listen for hash changes to open
  useEffect(() => {
    const check = () => {
      const shouldOpen = window.location.hash === `#${hashName}`;
      if (shouldOpen) {
        setMounted(true);
      } else {
        setVisible(false);
      }
    };
    check();
    window.addEventListener('hashchange', check);
    return () => window.removeEventListener('hashchange', check);
  }, [hashName]);

  // When mounted, trigger visible on next frame
  useEffect(() => {
    if (!mounted) return;
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [mounted]);

  // When invisible after being mounted, unmount after transition
  useEffect(() => {
    if (visible || !mounted) return;
    const el = backdropRef.current;
    if (!el) { setMounted(false); return; }
    const onEnd = () => setMounted(false);
    el.addEventListener('transitionend', onEnd, { once: true });
    // Fallback in case transitionend doesn't fire
    const timeout = setTimeout(onEnd, 250);
    return () => { el.removeEventListener('transitionend', onEnd); clearTimeout(timeout); };
  }, [visible, mounted]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [mounted]);

  // ESC to close
  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mounted, close]);

  if (!mounted) return null;

  return (
    <div
      ref={backdropRef}
      className={`fixed inset-0 z-50 flex items-end md:items-start justify-center bg-black/30 backdrop-blur-md backdrop-saturate-150 transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`}
      onClick={close}
    >
      {/* Desktop: centered modal */}
      <div
        role="dialog"
        aria-modal="true"
        className={`hidden md:block bg-white rounded-xl border border-black/[0.05] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] w-full max-w-[740px] mt-12 mb-12 p-8 max-h-[85vh] overflow-y-auto overscroll-none relative transition-[opacity,transform] duration-200 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
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

      {/* Mobile: bottom sheet */}
      <div
        role="dialog"
        aria-modal="true"
        className={`md:hidden bg-white rounded-t-2xl w-full max-h-[calc(100vh-env(safe-area-inset-top)-1rem)] overflow-y-auto overscroll-none relative transition-[opacity,transform] duration-200 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-surface-raised pt-3 pb-4 px-6">
          <div className="w-10 h-1 rounded-full bg-stone-300 mx-auto mb-4" />
          <div className="flex items-start justify-between">
            <h2 className="text-h2">{title}</h2>
            <button
              onClick={close}
              className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <X size={18} className="text-ink-muted" />
            </button>
          </div>
        </div>
        <div className="px-6 pb-10">
          {children}
        </div>
      </div>
    </div>
  );
}
