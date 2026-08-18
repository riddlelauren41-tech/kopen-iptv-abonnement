// Generic text-badge representations of the accepted payment methods --
// deliberately not real brand logo artwork (avoids using trademarked
// graphics), just the plain method names in a neutral pill, which is
// standard/legal informational usage.
const METHODS = ["iDEAL", "Bancontact", "Visa", "Mastercard"];

export default function PaymentIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {METHODS.map((m) => (
        <span
          key={m}
          className="rounded-md border border-border bg-white px-2.5 py-1 text-xs font-semibold text-ink"
        >
          {m}
        </span>
      ))}
    </div>
  );
}
