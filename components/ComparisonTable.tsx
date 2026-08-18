import { Check, X } from "lucide-react";

const ROWS = [
  { feature: "Directe activatie (±5 minuten)", us: true, others: false },
  { feature: "Anti-buffer EU-servers", us: true, others: false },
  { feature: "Stabiele 4K/Full HD-weergave", us: true, others: false },
  { feature: "24/7 WhatsApp support", us: true, others: false },
  { feature: "7 dagen geld-terug-garantie", us: true, others: false },
  { feature: "Compatibel met alle IPTV-apps", us: true, others: true },
  { feature: "Verborgen kosten", us: false, others: true },
];

export default function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full max-w-3xl mx-auto border-separate border-spacing-0 text-sm">
        <thead>
          <tr>
            <th className="text-left font-medium muted pb-4 pr-4">Kenmerk</th>
            <th className="pb-4 px-4">
              <span className="inline-flex items-center gap-1.5 font-display font-bold text-violet">
                IPTV<span className="gradient-text">Kopen</span>
              </span>
            </th>
            <th className="pb-4 pl-4 font-medium muted">Andere aanbieders</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, i) => (
            <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : ""}>
              <td className="py-3.5 pr-4 rounded-l-xl pl-4">{row.feature}</td>
              <td className="py-3.5 px-4 text-center">
                {row.us ? (
                  <Check size={20} className="mx-auto text-emerald-500" />
                ) : (
                  <X size={20} className="mx-auto text-rose-500" />
                )}
              </td>
              <td className="py-3.5 pl-4 pr-4 text-center rounded-r-xl">
                {row.others ? (
                  <Check size={20} className="mx-auto text-emerald-500" />
                ) : (
                  <X size={20} className="mx-auto text-rose-500" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
