import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import PlaceholderImage from './PlaceholderImage';
import AnimatedValue from '@/components/AnimatedValue';

// ---------------------------------------------------------------------------
// StatCard
// ---------------------------------------------------------------------------

type StatCardProps = {
  label: string;
  value: string;
  sublabel?: string;
  icon?: LucideIcon;
  compact?: boolean;
};

export function StatCard({ label, value, sublabel, icon: Icon, compact }: StatCardProps) {
  return (
    <div className={`relative bg-surface-raised shadow-card rounded-xl ${compact ? 'p-4' : 'p-5'}`}>
      {Icon && (
        <Icon size={16} className={`absolute ${compact ? 'top-4 right-4' : 'top-5 right-5'} text-ink-faint`} />
      )}
      <p className="text-stat-label">{label}</p>
      <p className={`text-stat-number mt-1`}>
        <AnimatedValue value={value} />
      </p>
      {sublabel && (
        <p className="text-body-sm text-ink-muted mt-1">{sublabel}</p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// PlaceCard
// ---------------------------------------------------------------------------

type PlaceCardProps = {
  image?: string;
  imageAlt?: string;
  eyebrow: string;
  name: string;
  meta?: string;
  note?: string;
  href?: string;
  placeholderIcon?: LucideIcon;
};

export function PlaceCard({
  image,
  imageAlt,
  eyebrow,
  name,
  meta,
  note,
  href,
  placeholderIcon,
}: PlaceCardProps) {
  const interactive = !!href;

  const content = (
    <>
      <div className="aspect-[16/10] w-full overflow-hidden">
        {image ? (
          <img src={image} alt={imageAlt ?? name} className="w-full h-full object-cover" />
        ) : placeholderIcon ? (
          <PlaceholderImage icon={placeholderIcon} />
        ) : (
          <div className="w-full h-full bg-stone-200" />
        )}
      </div>
      <div className="p-5">
        <p className="text-caption text-accent-text">{eyebrow}</p>
        <h3 className="text-h3 mt-1">{name}</h3>
        {meta && <p className="text-body-sm text-ink-muted mt-1">{meta}</p>}
        {note && <p className="text-body-sm mt-3">{note}</p>}
      </div>
    </>
  );

  const classes = `bg-surface-raised shadow-card rounded-xl overflow-hidden${
    interactive
      ? ' transition-[box-shadow,transform] duration-200 ease-out hover:shadow-card-hover hover:-translate-y-px'
      : ''
  }`;

  if (href) {
    const isExternal = href.startsWith('http');
    return (
      <Link
        href={href}
        className={`block ${classes}`}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </Link>
    );
  }

  return <div className={classes}>{content}</div>;
}

// ---------------------------------------------------------------------------
// MediaCard
// ---------------------------------------------------------------------------

type MediaCardProps = {
  children: React.ReactNode;
  href?: string;
};

export function MediaCard({ children, href }: MediaCardProps) {
  const interactive = !!href;

  const classes = `bg-surface-raised shadow-card rounded-xl overflow-hidden${
    interactive
      ? ' transition-[box-shadow,transform] duration-200 ease-out hover:shadow-card-hover hover:-translate-y-px'
      : ''
  }`;

  if (href) {
    return (
      <Link href={href} className={`block ${classes}`}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}
