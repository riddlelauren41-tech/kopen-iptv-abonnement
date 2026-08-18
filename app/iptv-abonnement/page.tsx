import type { Metadata } from "next";
import { Tv, Smartphone, Server, ShieldCheck } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import PricingCard from "@/components/PricingCard";
import PaymentIcons from "@/components/PaymentIcons";
import { pageMeta, whatsappUrl } from "@/lib/site";
import { PLANS, priceNL } from "@/lib/plans";

export const metadata: Metadata = pageMeta({
  title: `IPTV Abonnement | IPTV Kopen — Vanaf ${priceNL(PLANS[0].price)}`,
  description:
    "Ontdek het ultieme IPTV abonnement bij IPTV Kopen: 21.000+ zenders, films, series en live sport in HD/4K. Direct actief ✓ 7 dagen geld-terug.",
  path: "/iptv-abonnement",
});

const SPECS = [
  { icon: Tv, label: "21.000+ tv-zenders", desc: "Nederlandse, Belgische en internationale zenders in één pakket." },
  { icon: Smartphone, label: "63.000+ films & series", desc: "Een uitgebreide VOD-bibliotheek, wekelijks aangevuld." },
  { icon: Server, label: "Anti-buffer EU-servers", desc: "99,99% stabiliteit dankzij servers dicht bij huis." },
  { icon: ShieldCheck, label: "7 dagen geld-terug", desc: "Niet tevreden? Dan krijg je je geld terug, zonder gedoe." },
];

export default function IptvAbonnementPage() {
  return (
    <>
      <section className="dark-block section pb-16">
        <div className="container-px text-center">
          <span className="eyebrow text-sky">IPTV Abonnement</span>
          <h1 className="text-4xl md:text-5xl font-extrabold max-w-3xl mx-auto">
            Het complete <span className="gradient-text">IPTV abonnement</span> voor Nederland
          </h1>
          <p className="muted text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Live tv, films, series en sport in HD/4K — stabiel, snel en met
            directe activatie via WhatsApp.
          </p>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8 inline-flex">
            Bestel via WhatsApp
          </a>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-px">
          <SectionHeader eyebrow="Wat krijg je" title="Alles in één IPTV abonnement" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPECS.map((s) => (
              <div key={s.label} className="card p-6">
                <div className="h-11 w-11 rounded-xl bg-linear-to-br from-indigo to-violet flex items-center justify-center mb-4">
                  <s.icon size={20} className="text-white" />
                </div>
                <h3 className="font-semibold mb-1.5">{s.label}</h3>
                <p className="muted text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-px">
          <SectionHeader
            eyebrow="Prijzen"
            title="Kies jouw IPTV abonnement"
            description="Alle pakketten bevatten dezelfde volledige zenderlijst en VOD-bibliotheek — het verschil zit in looptijd en aantal schermen."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLANS.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
          <div className="flex flex-col items-center gap-3 mt-10">
            <p className="text-xs muted">Veilig betalen met</p>
            <PaymentIcons />
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-px max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            Waarom kiezen voor een IPTV abonnement bij IPTV Kopen?
          </h2>
          <div className="heading-divider" />
          <div className="space-y-4 text-sm leading-relaxed muted mt-8">
            <p>
              Een IPTV abonnement bij IPTV Kopen combineert een volledige
              zenderlijst met een uitgebreide films- en seriesbibliotheek,
              allemaal in HD/4K kwaliteit. Onze anti-buffer EU-servers zorgen
              voor een stabiele weergave, ook tijdens drukke uren zoals
              voetbalwedstrijden in het weekend.
            </p>
            <p>
              Elk abonnement werkt op de apparaten die je al in huis hebt:
              Smart TV, Fire TV Stick, Android Box, telefoon, tablet of PC.
              Na bestelling ontvang je een duidelijke installatiegids en
              begeleiden we je via WhatsApp tot alles werkt.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
