import type { Metadata } from "next";
import { Tv, ShieldCheck, Zap, Headset, Trophy, Film, Star, BadgeCheck } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import PricingCard from "@/components/PricingCard";
import MultiScreenCard from "@/components/MultiScreenCard";
import FaqAccordion from "@/components/FaqAccordion";
import ComparisonTable from "@/components/ComparisonTable";
import PaymentIcons from "@/components/PaymentIcons";
import { pageMeta, whatsappUrl } from "@/lib/site";
import { PLANS, MULTI_SCREEN_PLANS } from "@/lib/plans";

export const metadata: Metadata = pageMeta({
  title: "IPTV Kopen | Beste IPTV Nederland – HD/4K stabiel en onbeperkt",
  description:
    "Op zoek naar een betrouwbaar IPTV abonnement? IPTV Kopen is eenvoudig, snel en veilig. 21.000+ zenders, HD/4K, 24/7 WhatsApp support en 7 dagen geld-terug-garantie.",
  path: "/",
});

const APPS = ["IPTV Smarters Pro", "TiviMate", "XCIPTV", "IBO Player", "IWA Player"];

const TRUST_STATS = [
  { value: "30.500+", label: "Tevreden klanten" },
  { value: "179.000+", label: "Zenders" },
  { value: "100.000+", label: "Films & series" },
];

const BENEFITS = [
  { icon: Zap, title: "Anti-freeze 4K / Full HD", desc: "Stabiele streams zonder vastlopen, ook tijdens piekuren." },
  { icon: Tv, title: "Multi-device ondersteuning", desc: "Smart TV, Android, iOS, Fire Stick — één abonnement, elk scherm." },
  { icon: Headset, title: "24/7 WhatsApp hulp", desc: "Direct persoonlijk contact voor installatie en vragen, elke dag." },
  { icon: ShieldCheck, title: "7 Dagen Geld-Terug Garantie", desc: "Niet tevreden binnen 7 dagen? Dan krijg je je geld terug." },
  { icon: Trophy, title: "Live sport", desc: "Voetbal, Formule 1 en meer, live en in HD/4K." },
  { icon: Film, title: "Wekelijkse VOD-updates", desc: "Nieuwe films en series worden voortdurend toegevoegd." },
];

const STEPS = [
  { step: "1", title: "Kies je abonnement", desc: "Selecteer de looptijd of het aantal schermen dat bij je past." },
  { step: "2", title: "Veilige betaling & activatie", desc: "Betaal veilig via iDEAL, Bancontact of kaart — activatie binnen enkele minuten." },
  { step: "3", title: "Geniet zonder limiet", desc: "Live tv, films en series in HD/4K, direct op al je apparaten." },
];

const TESTIMONIALS = [
  { name: "Lucas M.", city: "Amsterdam", text: "Snelle activering, beeld super stabiel. De NL zenders zijn compleet en het buffert nooit." },
  { name: "Sophie B.", city: "Rotterdam", text: "WhatsApp support zeer reactief. Ik had toegang binnen enkele minuten. Top op Smart TV." },
  { name: "Thomas D.", city: "Antwerpen", text: "VOD + sport + internationale zenders. Ik wilde iets premiums en ik ben tevreden." },
  { name: "Emma L.", city: "Utrecht", text: "Werkt perfect op mijn Fire Stick en telefoon tegelijk. Geen enkele storing tot nu toe." },
];

const FAQS = [
  {
    question: "Hoe lang duurt het om mijn IPTV abonnement te activeren?",
    answer: "Na bestelling wordt de activering meestal binnen 5 tot 15 minuten uitgevoerd. Je ontvangt je inloggegevens en installatiegids via WhatsApp.",
  },
  {
    question: "Hoe installeer ik de app op mijn Smart TV of Fire Stick?",
    answer: "We sturen een duidelijke installatiegids per apparaat. Onze WhatsApp support begeleidt je live tot alles werkt, ook op Smart TV en Fire Stick.",
  },
  {
    question: "Welke apparaten zijn compatibel?",
    answer: "Smart TV (Samsung/LG), Android TV, Fire TV Stick, Android & iOS, PC/Mac, MAG en Formuler. We adviseren TiviMate, IPTV Smarters Pro of XCIPTV.",
  },
  {
    question: "Welke betaalmethodes accepteren jullie?",
    answer: "iDEAL, Bancontact, Visa en Mastercard. Bestellen en betalen gaat veilig en snel, met bevestiging via WhatsApp.",
  },
  {
    question: "Is er een geld-terug-garantie?",
    answer: "Ja. Werkt de dienst niet naar wens, dan bieden we 7 dagen geld-terug-garantie.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="dark-block relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-indigo/30 via-transparent to-sky/10 pointer-events-none" />
        <div className="container-px relative pt-16 pb-24 md:pt-20 md:pb-32 text-center">
          <span className="inline-block rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-xs font-semibold text-sky mb-6">
            Exclusieve aanbieding vandaag – directe activering
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-4xl mx-auto">
            Beste <span className="gradient-text">IPTV Nederland</span> — HD/4K stabiel en onbeperkt
          </h1>
          <p className="muted text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
            IPTV Kopen levert stabiele Nederlandse IPTV in HD/4K, met directe
            activatie en 24/7 WhatsApp support.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Bestel via WhatsApp
            </a>
            <a href="#prijzen" className="btn-ghost">
              Bekijk prijzen
            </a>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {TRUST_STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display font-extrabold text-2xl md:text-3xl gradient-text">{s.value}</p>
                <p className="muted text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apps & Support */}
      <section className="section">
        <div className="container-px">
          <SectionHeader
            eyebrow="Compatibiliteit"
            title="IPTV Abonnement — compatibel met uw favoriete apps"
            description="Werkt op Smart TV, Android, iOS en Fire Stick — gebruik de app die jij al kent."
          />
          <div className="flex flex-wrap items-center justify-center gap-3">
            {APPS.map((app) => (
              <span key={app} className="card px-5 py-2.5 text-sm font-medium">{app}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="section bg-white">
        <div className="container-px">
          <SectionHeader
            eyebrow="Voordelen"
            title="Voordelen van de beste IPTV in Nederland"
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

      {/* Single Pricing */}
      <section id="prijzen" className="section">
        <div className="container-px">
          <SectionHeader
            eyebrow="Prijzen"
            title="Kies jouw IPTV Abonnement — IPTV Nederland"
            description="Kies de formule die bij je past en geniet van een stabiel IPTV abonnement in HD/4K, met WhatsApp support 7/7 en 7 dagen geld-terug-garantie."
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

      {/* Multi Pricing */}
      <section className="section bg-white">
        <div className="container-px">
          <SectionHeader
            eyebrow="Meerdere schermen"
            title="IPTV Multischerm Abonnementen"
            description="Kijk met het hele gezin tegelijk, elk op een ander apparaat — voordelige tarieven per extra scherm."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {MULTI_SCREEN_PLANS.map((plan) => (
              <MultiScreenCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="dark-block section">
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

      {/* Comparison */}
      <section className="section bg-white">
        <div className="container-px">
          <SectionHeader eyebrow="Vergelijking" title="Waarom ons kiezen?" />
          <ComparisonTable />
        </div>
      </section>

      {/* SEO Content blocks */}
      <section className="section">
        <div className="container-px grid md:grid-cols-2 gap-6">
          <div className="card p-8">
            <Trophy size={28} className="text-violet mb-4" />
            <h2 className="text-2xl font-bold mb-3">Live sport bekijken met IPTV Kopen</h2>
            <p className="muted leading-relaxed">
              Volg voetbal, Formule 1 en de grote Europese competities live en
              in HD/4K, zonder onderbrekingen. Onze anti-buffer EU-servers
              houden de stream stabiel, ook wanneer duizenden kijkers
              tegelijk inloggen tijdens een topwedstrijd — zo mis je nooit
              een moment van je favoriete sport.
            </p>
          </div>
          <div className="card p-8">
            <Film size={28} className="text-violet mb-4" />
            <h2 className="text-2xl font-bold mb-3">Films, series en EPG in 4K</h2>
            <p className="muted leading-relaxed">
              Een uitgebreide VOD-bibliotheek met films en series in Full HD
              en 4K, wekelijks aangevuld met nieuwe releases. Dankzij de
              ingebouwde EPG (TV-gids) zie je precies wat er nu en straks te
              zien is op elke zender, zodat je nooit iets mist.
            </p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section bg-white">
        <div className="container-px">
          <SectionHeader eyebrow="Ervaringen" title="Zij vertrouwen ons" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="card p-6">
                <div className="flex gap-0.5 text-amber-400 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <BadgeCheck size={15} className="text-violet" />
                </div>
                <p className="text-xs muted">{t.city} &middot; Geverifieerde koper</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-px">
          <SectionHeader eyebrow="FAQ" title="Veelgestelde Vragen (FAQ)" />
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      {/* Pre-Footer CTA */}
      <section className="dark-block section">
        <div className="container-px text-center">
          <h2 className="text-3xl md:text-4xl font-bold max-w-2xl mx-auto">
            Krijg toegang tot HD / 4K kwaliteit vandaag
          </h2>
          <p className="muted mt-4 max-w-xl mx-auto">
            Directe activatie, 24/7 WhatsApp support en 7 dagen geld-terug-garantie.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#prijzen" className="btn-ghost">
              Bekijk prijzen
            </a>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary">
              WhatsApp contact
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
