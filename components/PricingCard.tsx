import { Check } from "lucide-react";
import { whatsappUrl } from "@/lib/site";

export type Plan = {
  duration: string;
  price: string;
  oldPrice?: string;
  perMonth: string;
  badge?: string;
  tagline: string;
  devices: string;
  featured?: boolean;
};

const FEATURES = [
  "35.000+ internationale tv-zenders",
  "Films & series on-demand in HD/4K",
  "Anti-buffer EU-servers (stabiel)",
  "TV terugkijken (Replay) + EPG",
  "7 dagen geld-terug-garantie",
];

export default function PricingCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`card relative flex flex-col p-7 ${
        plan.featured ? "border-2 border-violet shadow-xl shadow-violet/10 md:-translate-y-3" : ""
      }`}
    >
      {plan.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-linear-to-r from-indigo to-violet px-4 py-1 text-xs font-semibold text-white">
          {plan.badge}
        </span>
      )}

      <p className="text-sm font-semibold muted">{plan.duration}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-4xl font-bold font-display">{plan.price}</span>
        {plan.oldPrice && <span className="text-base muted line-through">{plan.oldPrice}</span>}
      </div>
      <p className="text-sm muted mt-1">{plan.perMonth}</p>
      <p className="text-sm font-medium text-violet mt-3">{plan.tagline}</p>

      <ul className="mt-6 space-y-3 flex-1">
        {FEATURES.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <Check size={18} className="text-violet shrink-0 mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
        <li className="flex items-start gap-2.5 text-sm font-medium">
          <Check size={18} className="text-violet shrink-0 mt-0.5" />
          <span>{plan.devices}</span>
        </li>
      </ul>

      <a
        href={whatsappUrl(`Hoi, ik wil het ${plan.duration} pakket bestellen (${plan.price}).`)}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-7 text-center ${plan.featured ? "btn-primary" : "btn-ghost"}`}
      >
        Bestel Nu &mdash; {plan.price}
      </a>
    </div>
  );
}
