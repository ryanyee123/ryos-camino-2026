type SectionProps = {
  caption?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export default function Section({ caption, title, description, children, className }: SectionProps) {
  return (
    <section className={`py-14 md:py-20 border-t border-border ${className ?? ''}`}>
      <div>
        {caption && <p className="text-caption">{caption}</p>}
        <h2 className="text-h2 mt-2">{title}</h2>
        {description && <p className="text-body text-ink-muted mt-4">{description}</p>}
      </div>
      <div className="mt-10">{children}</div>
    </section>
  );
}
