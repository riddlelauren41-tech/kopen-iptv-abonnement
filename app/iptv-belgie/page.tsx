import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import PricingCard from "@/components/PricingCard";
import { pageMeta, whatsappUrl } from "@/lib/site";
import { PLANS } from "@/lib/plans";

export const metadata: Metadata = pageMeta({
  title: "IPTV België | IPTV Kopen — Belgische Zenders in HD/4K",
  description:
    "IPTV België bij IPTV Kopen: alle Belgische zenders (VTM, VRT, Eén, Canvas, Sporza) + 21.000+ internationale kanalen in HD/4K. Direct actief.",
  path: "/iptv-belgie",
});

const BE_CHANNELS = ["VTM", "VRT 1", "Eén", "Canvas", "Sporza", "VTM 2", "Play4", "Play5", "Q2", "Ketnet"];

export default function IptvBelgiePage() {
  return (
    <>
      <section className="dark-block section pb-16">
        <div className="container-px text-center">
          <span className="eyebrow text-sky">IPTV België</span>
          <h1 className="text-4xl md:text-5xl font-extrabold max-w-3xl mx-auto">
            IPTV België — <span className="gradient-text">alle Belgische zenders</span> in HD/4K
          </h1>
          <p className="muted text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            VTM, VRT, Eén, Canvas, Sporza en meer — samen met 21.000+
            internationale zenders in één stabiel IPTV abonnement.
          </p>
          <a href={whatsappUrl("Hoi, ik wil graag meer weten over IPTV in België.")} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8 inline-flex">
            Bestel via WhatsApp
          </a>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-px">
          <SectionHeader eyebrow="Belgische zenders" title="Alle grote Belgische zenders inbegrepen" />
          <div className="flex flex-wrap items-center justify-center gap-3">
            {BE_CHANNELS.map((ch) => (
              <span key={ch} className="card px-5 py-2.5 text-sm font-medium">{ch}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-px">
          <SectionHeader
            eyebrow="Prijzen"
            title="IPTV abonnement voor België"
            description="Dezelfde stabiele HD/4K-kwaliteit, aangevuld met de volledige Belgische zenderlijst."
          />
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {PLANS.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-px max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Waarom kiezen Belgische kijkers voor IPTV Kopen?
          </h2>
          <div className="space-y-4 text-sm leading-relaxed muted">
            <p>
              Naast alle Nederlandse en internationale zenders bevat ons
              IPTV-abonnement ook de volledige Belgische zenderlijst: VTM,
              VRT 1, Eén, Canvas, Sporza en meer. Zo mis je geen enkele
              wedstrijd van de Jupiler Pro League of je favoriete
              Vlaamse programma&apos;s.
            </p>
            <p>
              Onze anti-buffer EU-servers staan dicht bij België, wat zorgt
              voor een stabiele, snelle verbinding. Bestellen en activeren
              gaat via WhatsApp, met begeleiding in het Nederlands.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
