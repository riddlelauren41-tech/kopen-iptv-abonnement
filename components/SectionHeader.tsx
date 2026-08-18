export default function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
      <div className="heading-divider" />
      {description && <p className="muted mt-5 text-lg leading-relaxed">{description}</p>}
    </div>
  );
}
