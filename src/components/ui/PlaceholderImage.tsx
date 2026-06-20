import type { LucideIcon } from 'lucide-react';

export default function PlaceholderImage({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="flex items-center justify-center bg-surface-muted w-full h-full">
      <Icon size={32} className="text-ink-faint" />
    </div>
  );
}
