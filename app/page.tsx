import type { Metadata } from "next";
import Image from "next/image";
import { Tv, ShieldCheck, Zap, Headset, Trophy, Film, Star, BadgeCheck, Ban, Award, Rocket, Layers, PlayCircle, Smartphone, HelpCircle, CheckCircle2, Lock, Sparkles } from "lucide-react";
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

const TRUST_BADGES = [
  { icon: Ban, label: "Geen verborgen kosten" },
  { icon: Award, label: "100% Geld-Terug Garantie" },
  { icon: Rocket, label: "Direct actief binnen 5 minuten" },
];

const BENEFITS = [
  {
    icon: Zap,
    title: "4K / Full HD — stabiele streams",
    desc: "Geoptimaliseerde anti-buffer EU-servers: wedstrijden, films en series zonder onderbrekingen, minimale vertraging, betrouwbaar bij elk IPTV Abonnement — ook tijdens topwedstrijden met duizenden kijkers gelijktijdig.",
  },
  {
    icon: Tv,
    title: "Compatibel met alle apparaten",
    desc: "Samsung/LG Smart TV, Android/Google TV, Fire TV, Apple TV, iOS/Android telefoon of tablet, en PC/Mac (M3U & Xtream Codes). Eén abonnement, elk scherm dat je al in huis hebt.",
  },
  {
    icon: Headset,
    title: "WhatsApp Support NL 24/7",
    desc: "Eenvoudige installatiehandleidingen plus directe persoonlijke hulp, van je eerste vraag tot volledige activering van je premium IPTV. Geen wachttijden, geen ticketsystemen.",
  },
  {
    icon: ShieldCheck,
    title: "7 Dagen Geld-Terug Garantie",
    desc: "Beveiligde betaling, je privacy volledig gerespecteerd, en de mogelijkheid om eerst te proberen voordat je definitief beslist over je IPTV abonnement. Niet tevreden? Geld terug, zonder gedoe.",
  },
  {
    icon: Trophy,
    title: "IPTV onbeperkt & flexibel",
    desc: "Duidelijke aanbiedingen zonder verborgen kosten, volledige VOD & replay-toegang, en automatische zenderupdates voor IPTV Nederland. Geen lange contracten, geen kleine lettertjes.",
  },
  {
    icon: Film,
    title: "Sport, films & series",
    desc: "Nederlandse en internationale zenders, een uitgebreide VOD-bibliotheek in 4K/HD, en de grote sportevenementen live — Eredivisie, Champions League en Formule 1, wekelijks aangevuld.",
  },
];

const TRUST_PILLS = [
  { icon: Lock, label: "Veilige betaling" },
  { icon: Zap, label: "Activering 5-15 min" },
  { icon: Star, label: "HD/4K Kwaliteit" },
  { icon: Headset, label: "WhatsApp 24/7" },
  { icon: Sparkles, label: "Focus op Nederland" },
];

const STEPS = [
  {
    step: "1",
    title: "Kies je aanbieding",
    desc: "Selecteer de looptijd of het aantal schermen dat bij je past.",
    bullets: ["Zonder verplichtingen", "Directe activering", "Nederlandse support"],
  },
  {
    step: "2",
    title: "Installeer de IPTV app",
    desc: "Ontvang je toegangsgegevens en configureer je applicatie.",
    bullets: ["Smart TV, Android, iOS, PC", "Handleidingen inbegrepen", "Stabiele HD/4K streaming"],
  },
  {
    step: "3",
    title: "Geniet zonder limiet",
    desc: "Toegang tot al je favoriete zenders, films en sport.",
    bullets: ["Zenders & VOD onbeperkt", "Live sport", "Premium kwaliteit"],
  },
];

const VOD_FEATURES = [
  { icon: Layers, title: "Duidelijke categorieën", desc: "Vind snel wat je wilt kijken dankzij een eenvoudige en georganiseerde navigatie." },
  { icon: PlayCircle, title: "Vloeiend afspelen", desc: "Een stabiele ervaring, met HD/4K kwaliteit onafhankelijk van je apparaat en verbinding." },
  { icon: Smartphone, title: "Multi-apparaten", desc: "Compatibel met Smart TV, Android, iOS, PC — en hulp indien nodig." },
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
    answer:
      "Na bestelling wordt de activering meestal binnen 5 tot 15 minuten uitgevoerd, zodat je vrijwel direct kunt beginnen met kijken. Je ontvangt je persoonlijke inloggegevens en een duidelijke installatiegids via WhatsApp, afgestemd op het apparaat dat je gebruikt. Mocht er iets misgaan tijdens de installatie, dan staat ons supportteam meteen klaar om je stap voor stap te helpen. Zo hoef je nooit lang te wachten voordat je toegang hebt tot alle zenders en de volledige VOD-bibliotheek.",
  },
  {
    question: "Hoe installeer ik de app op mijn Smart TV of Fire Stick?",
    answer:
      "We sturen je een duidelijke, stapsgewijze installatiegids die specifiek is afgestemd op jouw apparaat. Voor Smart TV's (Samsung, LG) en Fire Stick raden we de app IPTV Smarters Pro of TiviMate aan, beide eenvoudig te downloaden via de eigen appstore. Onze WhatsApp support begeleidt je live, van het downloaden van de app tot het invoeren van je inloggegevens, totdat alles perfect werkt. De hele installatie duurt doorgaans niet langer dan enkele minuten, ook als je nog nooit met IPTV hebt gewerkt.",
  },
  {
    question: "Welke apparaten zijn compatibel?",
    answer:
      "IPTV Kopen werkt op nagenoeg elk apparaat met een internetverbinding: Smart TV's van Samsung en LG, Android TV en Google TV, Fire TV Stick, Android- en iOS-telefoons of tablets, PC en Mac, en ook MAG- en Formuler-boxen. Voor de beste ervaring adviseren wij apps als TiviMate, IPTV Smarters Pro of XCIPTV, afhankelijk van je apparaat en persoonlijke voorkeur. Heb je meerdere apparaten in huis, dan kun je met een multischerm-abonnement op verschillende schermen tegelijk kijken. Twijfel je welke combinatie het beste bij jouw situatie past, dan adviseren we je graag persoonlijk via WhatsApp.",
  },
  {
    question: "Welke betaalmethodes accepteren jullie?",
    answer:
      "We accepteren de meest gangbare en veilige betaalmethodes in Nederland en België: iDEAL, Bancontact, Visa en Mastercard. Elke betaling verloopt via een beveiligde verbinding, zodat jouw gegevens altijd goed beschermd zijn. Zodra je betaling is bevestigd, ontvang je automatisch een bevestiging via WhatsApp met de vervolgstappen voor activering. Heb je een voorkeur voor een andere betaalmethode, neem dan gerust contact op — we bespreken graag de mogelijkheden.",
  },
  {
    question: "Is er een geld-terug-garantie?",
    answer:
      "Ja, we bieden een 7 dagen geld-terug-garantie op elk abonnement dat je bij ons afsluit. Ben je binnen die periode niet volledig tevreden over de stabiliteit, kwaliteit of het aanbod, dan krijg je je geld terug zonder ingewikkelde voorwaarden. We vragen alleen dat je eventuele problemen eerst met ons supportteam deelt via WhatsApp, zodat we kunnen proberen deze direct te verhelpen. Zo kun je IPTV Kopen volledig risicovrij uitproberen, met de zekerheid dat je nergens aan vast zit.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="dark-block relative overflow-hidden">
        <Image src="/img/hero-bg.jpg" alt="" fill priority className="object-cover object-center opacity-90" />
        <div className="absolute inset-0 bg-linear-to-r from-navy via-navy/85 to-navy/40" />
        <div className="container-px relative pt-16 pb-24 md:pt-20 md:pb-32 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-xs font-semibold text-orange mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
            Exclusieve aanbieding vandaag – directe activering
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-4xl mx-auto">
            Beste <span className="gradient-text">IPTV Nederland</span> — HD/4K stabiel en onbeperkt
          </h1>
          <p className="text-white/85 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
            IPTV Kopen levert stabiele Nederlandse IPTV in 4K-kwaliteit, zonder
            bufferen en zonder onderbrekingen — ook tijdens drukke sportavonden.
            Na bestelling wordt je abonnement binnen enkele minuten geactiveerd,
            met duidelijke installatie-instructies en persoonlijke begeleiding
            via WhatsApp. Zo kijk je nog vanavond naar je favoriete zenders,
            films en series, op elk apparaat dat je al in huis hebt.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Bestel via WhatsApp
            </a>
            <a href="#prijzen" className="btn-ghost">
              Bekijk prijzen
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {TRUST_BADGES.map((b) => (
              <span key={b.label} className="inline-flex items-center gap-2 text-sm text-white/80">
                <b.icon size={16} className="text-orange" />
                {b.label}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {TRUST_STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display font-extrabold text-2xl md:text-3xl gradient-text">{s.value}</p>
                <p className="text-white/70 text-xs mt-1">{s.label}</p>
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
          <div className="text-center max-w-2xl mx-auto mb-4">
            <span className="eyebrow">Voordelen</span>
            <h2 className="text-3xl md:text-4xl font-bold">
              IPTV Abonnement —{" "}
              <span className="bg-orange/90 text-white px-2 py-0.5 rounded-md box-decoration-clone">
                voordelen van de beste IPTV
              </span>{" "}
              in Nederland
            </h2>
            <div className="heading-divider" />
            <p className="muted mt-5 text-lg leading-relaxed">
              Met ons <span className="text-blue underline">IPTV Abonnement</span> speciaal voor IPTV
              Nederland, geniet je van premium IPTV dat stabiel en onbeperkt is: kwaliteit in HD/4K, een
              enorme VOD-collectie, live sport en 24/7 ondersteuning. Compatibel met Smart TV, Android,
              iOS, Box &amp; PC — zonder verplichtingen.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
            {TRUST_PILLS.map((p) => (
              <span key={p.label} className="inline-flex items-center gap-1.5 rounded-full bg-navy text-white px-3.5 py-1.5 text-xs font-medium">
                <p.icon size={13} className="text-orange" /> {p.label}
              </span>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b) => (
              <div key={b.title} className="rounded-2xl bg-navy p-6">
                <div className="flex items-start gap-2.5 mb-2">
                  <CheckCircle2 size={20} className="text-emerald-400 shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-white">{b.title}</h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed pl-7">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="#prijzen" className="btn-primary inline-flex items-center gap-2">
              <Rocket size={16} /> Vandaag beginnen — bekijk tarieven →
            </a>
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
            title="Hoe werkt IPTV Abonnement — eenvoudig, snel en onbeperkt"
          />
          <p className="text-white/80 text-center max-w-2xl mx-auto -mt-6 mb-12 leading-relaxed">
            Met <strong className="text-white">IPTV Abonnement</strong>, geniet je van de{" "}
            <strong className="text-white">beste IPTV in Nederland</strong>: snelle installatie, HD/4K
            kwaliteit, onbeperkte VOD en 24/7 support.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((s) => (
              <div key={s.step} className="card p-7">
                <div className="h-14 w-14 rounded-full bg-linear-to-br from-orange-2 to-orange text-white font-display font-bold text-xl flex items-center justify-center mb-5">
                  {s.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-white/75 text-sm leading-relaxed mb-4">{s.desc}</p>
                <ul className="space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-white/85">
                      <span className="text-orange">✔</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <a href="#prijzen" className="btn-ghost">
              ⚡ Bekijk prijzen
            </a>
            <a href="/faq" className="btn-ghost inline-flex items-center gap-2">
              <HelpCircle size={16} className="text-orange" /> FAQ
            </a>
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

      {/* SEO Content: Sport (full-width dark band) */}
      <section className="dark-block section">
        <div className="container-px text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Het beste van voetbal — IPTV Abonnement</h2>
          <div className="heading-divider" />
          <p className="text-white/85 leading-relaxed mt-6 text-left md:text-center">
            Bij IPTV Kopen hoef je nooit een moment van je favoriete sport te
            missen. Volg elke speelronde van de Eredivisie, de spanning van de
            Champions League en de snelheid van Formule 1, allemaal live en in
            messcherpe HD/4K-kwaliteit. Onze anti-buffer EU-servers zijn
            specifiek geoptimaliseerd voor piekmomenten: ook wanneer duizenden
            kijkers tegelijk inloggen tijdens een beslissende wedstrijd, blijft
            de stream vloeiend en zonder vertraging ten opzichte van de live
            uitzending. Geen bevroren beelden op het beslissende moment, geen
            hinderlijke buffering vlak voor een doelpunt — precies wanneer het
            er het meest toe doet. Naast de grote Nederlandse en Europese
            competities heb je ook toegang tot internationale sportzenders,
            van tennis en rugby tot boksen en motorsport. Alles is beschikbaar
            op elk apparaat dat je al in huis hebt, van Smart TV tot
            smartphone, zodat je nooit gebonden bent aan één scherm. Met IPTV
            Kopen combineer je de betrouwbaarheid van een premium abonnement
            met de flexibiliteit om overal te kijken waar en wanneer jij wilt.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-sm text-white/75">
            <span>Stabiele streaming</span>
            <span className="text-orange">•</span>
            <span>HD/4K Kwaliteit</span>
            <span className="text-orange">•</span>
            <span>WhatsApp Support 24/7</span>
          </div>
        </div>
      </section>

      {/* SEO Content: VOD (full-width light band) */}
      <section className="section bg-white">
        <div className="container-px text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">VOD in HD/4K — IPTV Abonnement (IPTV Nederland)</h2>
          <div className="heading-divider" />
          <p className="muted leading-relaxed mt-6 text-left md:text-center">
            Naast live tv biedt IPTV Kopen een uitgebreide VOD-bibliotheek met
            duizenden films en series in Full HD en 4K-kwaliteit. Onze
            catalogus wordt dagelijks aangevuld met de nieuwste releases, van
            grote blockbusters tot populaire series en documentaires, zodat er
            altijd iets nieuws te ontdekken is. Dankzij de ingebouwde EPG
            (elektronische TV-gids) zie je in één overzicht precies wat er nu
            en de komende dagen te zien is op elke zender — handig om nooit
            meer een favoriete uitzending te missen. Alles is opgedeeld in
            duidelijke, overzichtelijke categorieën, zodat je binnen enkele
            seconden vindt waar je naar op zoek bent, zonder eindeloos te
            scrollen. De afspeelervaring is geoptimaliseerd voor een vloeiende
            weergave, onafhankelijk van het apparaat of de verbinding die je
            gebruikt. Of je nu kijkt op een Smart TV, tablet, telefoon of pc:
            de kwaliteit blijft consistent hoog.
          </p>
          <div className="grid sm:grid-cols-3 gap-5 mt-10">
            {VOD_FEATURES.map((f) => (
              <div key={f.title} className="card p-6 text-left">
                <div className="h-10 w-10 rounded-lg bg-linear-to-br from-navy to-blue flex items-center justify-center mb-3">
                  <f.icon size={18} className="text-white" />
                </div>
                <h3 className="font-semibold text-sm mb-1.5">{f.title}</h3>
                <p className="muted text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange/10 text-orange px-3.5 py-1.5 text-xs font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" /> Eenvoudige toegang
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange/10 text-orange px-3.5 py-1.5 text-xs font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" /> Nederlandse support
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange/10 text-orange px-3.5 py-1.5 text-xs font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" /> Begeleide start
            </span>
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
                  <BadgeCheck size={15} className="text-blue" />
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
          <p className="text-white/80 mt-4 max-w-xl mx-auto">
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
