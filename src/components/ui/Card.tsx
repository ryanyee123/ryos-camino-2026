import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import PlaceholderImage from './PlaceholderImage';

// ---------------------------------------------------------------------------
// StatCard
// ---------------------------------------------------------------------------

type StatCardProps = {
  label: string;
  value: string;
  sublabel?: string;
  icon?: LucideIcon;
};

export function StatCard({ label, value, sublabel, icon: Icon }: StatCardProps) {
  return (
    <div className="relative bg-surface-raised shadow-card rounded-xl p-5">
      {Icon && (
        <Icon size={16} className="absolute top-5 right-5 text-ink-faint" />
      )}
      <p className="text-stat-label">{label}</p>
      <p className="text-stat-number mt-1">{value}</p>
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
        <p className="text-caption text-accent">{eyebrow}</p>
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
    return (
      <Link href={href} className={`block ${classes}`}>
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
