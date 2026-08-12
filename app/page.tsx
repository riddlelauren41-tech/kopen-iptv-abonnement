import type { Metadata } from "next";
import { Check, Tv, ShieldCheck, Zap, Headset, Trophy, Film, MonitorPlay, Star } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import PricingCard, { Plan } from "@/components/PricingCard";
import FaqAccordion from "@/components/FaqAccordion";
import { pageMeta, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "IPTV Kopen | Beste IPTV Abonnement Nederland & België",
  description:
    "Op zoek naar een betrouwbaar IPTV abonnement? IPTV Kopen is eenvoudig, snel en veilig. 35.000+ zenders, HD/4K, 24/7 WhatsApp support en 7 dagen geld-terug-garantie.",
  path: "/",
});

const PLANS: Plan[] = [
  {
    duration: "3 Maanden",
    price: "€X,XX",
    oldPrice: "€X,XX",
    perMonth: "Meest flexibel • €X,XX/maand",
    tagline: "Flexibele keuze — geen lange termijn",
    devices: "1 apparaat",
  },
  {
    duration: "12 Maanden",
    price: "€X,XX",
    oldPrice: "€X,XX",
    perMonth: "Meest gekozen • €X,XX/maand",
    badge: "Populair",
    tagline: "Maximaal voordeel — laagste prijs",
    devices: "1 apparaat",
    featured: true,
  },
  {
    duration: "12 Maanden Gezin",
    price: "€X,XX",
    oldPrice: "€X,XX",
    perMonth: "Gezinspakket • 2 apparaten tegelijk",
    badge: "Beste deal",
    tagline: "Perfect voor gezinnen",
    devices: "2 apparaten tegelijk",
  },
  {
    duration: "24 Maanden",
    price: "€X,XX",
    oldPrice: "€X,XX",
    perMonth: "Langste termijn • laagste prijs per maand",
    tagline: "Voor wie zeker is van zijn keuze",
    devices: "1 apparaat",
  },
];

const APPS = ["IPTV Smarters", "TiviMate", "GSE Smart IPTV", "Smart IPTV", "VLC Player", "Perfect Player"];

const BENEFITS = [
  { icon: Zap, title: "4K / Full HD — stabiele streams", desc: "Anti-buffer EU-servers voor een vloeiende weergave, zonder onderbrekingen." },
  { icon: Tv, title: "Compatibel met alle apparaten", desc: "Smart TV, Android, Fire Stick, Apple TV, PC/Mac, MAG en Formuler." },
  { icon: MonitorPlay, title: "IPTV onbeperkt & flexibel", desc: "Geen langlopend contract nodig — kies de looptijd die bij je past." },
  { icon: Headset, title: "WhatsApp Support 24/7", desc: "Direct persoonlijk contact voor installatie en vragen, elke dag." },
  { icon: ShieldCheck, title: "7 Dagen Geld-Terug Garantie", desc: "Niet tevreden binnen 7 dagen? Dan krijg je je geld terug." },
  { icon: Film, title: "Sport, films & series", desc: "Live sport, de nieuwste films en complete series in HD/4K." },
];

const STEPS = [
  { step: "1", title: "Kies je abonnement", desc: "Selecteer de looptijd die bij je past en bestel via WhatsApp." },
  { step: "2", title: "Installeer de app", desc: "Wij sturen een duidelijke installatiegids voor jouw apparaat." },
  { step: "3", title: "Geniet zonder limiet", desc: "Binnen enkele minuten kijk je live tv, films en series in HD/4K." },
];

const TESTIMONIALS = [
  { name: "Lucas M.", text: "Snelle activering, beeld super stabiel. De NL zenders zijn compleet en het buffert nooit." },
  { name: "Sophie B.", text: "WhatsApp support zeer reactief. Ik had toegang binnen enkele minuten. Top op Smart TV." },
  { name: "Thomas D.", text: "VOD + sport + internationale zenders. Ik wilde iets premiums en ik ben tevreden." },
];

const FAQS = [
  {
    question: "Hoe lang duurt het om mijn IPTV abonnement te activeren?",
    answer: "Na bestelling wordt de activering meestal binnen 5 tot 15 minuten uitgevoerd. Je ontvangt je inloggegevens en installatiegids via WhatsApp.",
  },
  {
    question: "Welke apparaten zijn compatibel?",
    answer: "Smart TV (Samsung/LG), Android TV/Google TV, Fire TV Stick, Apple TV, Android & iOS, PC/Mac, MAG en Formuler. We adviseren TiviMate of IPTV Smarters.",
  },
  {
    question: "Hoe installeer ik IPTV op mijn tv of mobiel?",
    answer: "We leveren een duidelijke stap-voor-stap handleiding. Onze WhatsApp support begeleidt je tot alles werkt.",
  },
  {
    question: "Kan ik snel beginnen als ik er niets van weet?",
    answer: "Ja. We sturen een eenvoudige gids en helpen je via WhatsApp stap voor stap met installatie en configuratie.",
  },
  {
    question: "Is er een geld-terug-garantie?",
    answer: "Ja, we bieden 7 dagen geld-terug-garantie als de dienst niet naar wens werkt.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="dark-block relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-indigo/30 via-transparent to-sky/10 pointer-events-none" />
        <div className="container-px relative pt-20 pb-24 md:pt-28 md:pb-32 text-center">
          <span className="eyebrow text-sky">IPTV Nederland & België</span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-4xl mx-auto">
            IPTV Abonnement Kopen — <span className="gradient-text">Beste IPTV Nederland</span>
          </h1>
          <p className="muted text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
            De beste IPTV in Nederland — stabiel in HD/4K, onbeperkt kijken, met
            directe activatie en 24/7 WhatsApp support.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Bestel via WhatsApp
            </a>
            <a href="#prijzen" className="btn-ghost">
              Bekijk prijzen
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm muted">
            <span className="flex items-center gap-2"><Check size={16} className="text-sky" /> Directe activatie (±5 min)</span>
            <span className="flex items-center gap-2"><Check size={16} className="text-sky" /> 7 dagen geld-terug</span>
            <span className="flex items-center gap-2"><Check size={16} className="text-sky" /> Werkt op alle apparaten</span>
          </div>
        </div>
      </section>

      {/* App compatibility */}
      <section className="section">
        <div className="container-px">
          <SectionHeader
            eyebrow="Compatibiliteit"
            title="IPTV Abonnement — compatibel met uw favoriete apps"
            description="Gebruik je eigen favoriete speler-app, wij leveren de installatiegids voor elk apparaat."
          />
          <div className="flex flex-wrap items-center justify-center gap-3">
            {APPS.map((app) => (
              <span key={app} className="card px-5 py-2.5 text-sm font-medium">{app}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section bg-white">
        <div className="container-px">
          <SectionHeader
            eyebrow="Voordelen"
            title="IPTV Abonnement — voordelen van de beste IPTV in Nederland"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.title} className="card p-6">
                <div className="h-11 w-11 rounded-xl bg-linear-to-br from-indigo to-violet flex items-center justify-center mb-4">
                  <b.icon size={20} className="text-white" />
                </div>
                <h3 className="font-semibold mb-1.5">{b.title}</h3>
                <p className="muted text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="prijzen" className="section">
        <div className="container-px">
          <SectionHeader
            eyebrow="Prijzen"
            title="Kies jouw IPTV Abonnement — IPTV Nederland"
            description="Kies de formule die bij je past en geniet van een stabiel IPTV abonnement in HD/4K, met WhatsApp support 7/7 en 7 dagen geld-terug-garantie."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLANS.map((plan) => (
              <PricingCard key={plan.duration} plan={plan} />
            ))}
          </div>
          <p className="text-center text-xs muted mt-8">
            * Prijzen zijn indicatief en worden binnenkort bijgewerkt.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="section bg-white">
        <div className="container-px">
          <SectionHeader
            eyebrow="Aan de slag"
            title="IPTV Abonnement — kopen, activeren en kijken in 3 stappen"
          />
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto h-14 w-14 rounded-full bg-linear-to-br from-indigo to-violet text-white font-display font-bold text-xl flex items-center justify-center mb-5">
                  {s.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="muted text-sm leading-relaxed max-w-xs mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sport & VOD highlight */}
      <section className="section">
        <div className="container-px grid md:grid-cols-2 gap-6">
          <div className="card p-8 dark-block rounded-3xl!">
            <Trophy size={28} className="text-sky mb-4" />
            <h2 className="text-2xl font-bold mb-3">Het beste van voetbal — IPTV Abonnement</h2>
            <p className="muted leading-relaxed">
              Volg alle grote competities en topwedstrijden live, in HD/4K en
              zonder buffering — waar je ook bent.
            </p>
          </div>
          <div className="card p-8 dark-block rounded-3xl!">
            <Film size={28} className="text-sky mb-4" />
            <h2 className="text-2xl font-bold mb-3">VOD in HD/4K — IPTV Abonnement</h2>
            <p className="muted leading-relaxed">
              Een uitgebreide bibliotheek met films en series, wekelijks
              aangevuld met de nieuwste releases.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-white">
        <div className="container-px">
          <SectionHeader eyebrow="Ervaringen" title="Zij vertrouwen ons — IPTV Kopen" />
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="card p-6">
                <div className="flex gap-0.5 text-amber-400 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <p className="text-sm font-semibold">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-px">
          <SectionHeader eyebrow="FAQ" title="Veelgestelde vragen — IPTV Abonnement" />
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="dark-block section">
        <div className="container-px text-center">
          <h2 className="text-3xl md:text-4xl font-bold max-w-2xl mx-auto">
            Krijg toegang tot IPTV Kopen in HD/4K kwaliteit vanaf vandaag
          </h2>
          <p className="muted mt-4 max-w-xl mx-auto">
            Directe activatie, 24/7 WhatsApp support en 7 dagen geld-terug-garantie.
          </p>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">
            Bestel via WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
