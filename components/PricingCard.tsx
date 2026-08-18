import { Check } from "lucide-react";
import { whatsappUrl } from "@/lib/site";
import { Plan, priceNL } from "@/lib/plans";

export default function PricingCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`card relative flex flex-col p-7 ${
        plan.featured ? "border-2 border-orange shadow-xl shadow-orange/10 md:-translate-y-3" : ""
      }`}
    >
      {plan.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-linear-to-r from-orange-2 to-orange px-4 py-1 text-xs font-semibold text-white">
          {plan.badge}
        </span>
      )}

      <p className="text-sm font-semibold muted">{plan.duration}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-4xl font-bold font-display">{priceNL(plan.price)}</span>
      </div>
      <p className="text-sm muted mt-1">{plan.screens}</p>
      <p className="text-sm font-medium text-blue mt-3">{plan.tagline}</p>

      <ul className="mt-6 space-y-3 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <Check size={18} className="text-orange shrink-0 mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href={whatsappUrl(`Hoi, ik wil het ${plan.duration} pakket bestellen (${priceNL(plan.price)}).`)}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-7 text-center ${plan.featured ? "btn-primary" : "btn-ghost"}`}
      >
        Bestel Nu &mdash; {priceNL(plan.price)}
      </a>
    </div>
  );
}
