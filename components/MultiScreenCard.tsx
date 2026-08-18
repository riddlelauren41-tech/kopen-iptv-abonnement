import { Check } from "lucide-react";
import { whatsappUrl } from "@/lib/site";
import { MultiScreenPlan, priceNL } from "@/lib/plans";

export default function MultiScreenCard({ plan }: { plan: MultiScreenPlan }) {
  return (
    <div className="card flex flex-col p-7">
      <p className="text-sm font-semibold muted">{plan.screens}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-4xl font-bold font-display">{priceNL(plan.price)}</span>
        <span className="text-sm muted">/ 12 maanden</span>
      </div>
      <p className="text-sm font-medium text-violet mt-3">{plan.tagline}</p>

      <ul className="mt-6 space-y-3 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <Check size={18} className="text-violet shrink-0 mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href={whatsappUrl(`Hoi, ik wil het pakket met ${plan.screens.toLowerCase()} bestellen (${priceNL(plan.price)}).`)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-ghost mt-7 text-center"
      >
        Bestel Nu &mdash; {priceNL(plan.price)}
      </a>
    </div>
  );
}
