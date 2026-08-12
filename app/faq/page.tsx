import type { Metadata } from "next";
import FaqAccordion from "@/components/FaqAccordion";
import { pageMeta, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "FAQ | IPTV Kopen — Veelgestelde Vragen over IPTV",
  description:
    "Veelgestelde vragen over IPTV bij IPTV Kopen. Hoe werkt IPTV? Welke apparaten? Betaalmethodes? Vind hier alle antwoorden of neem contact op via WhatsApp.",
  path: "/faq",
});

const FAQS = [
  {
    question: "Wat is IPTV precies?",
    answer:
      "IPTV (Internet Protocol Television) is televisie via internet in plaats van via kabel, satelliet of antenne. Je bekijkt live tv, films en series via een app op je Smart TV, telefoon, tablet of PC.",
  },
  {
    question: "Hoe lang duurt het om mijn IPTV abonnement te activeren?",
    answer:
      "Na bestelling wordt de activering meestal binnen 5 tot 15 minuten uitgevoerd. Je ontvangt je inloggegevens en een installatiegids via WhatsApp.",
  },
  {
    question: "Welke apparaten zijn compatibel met IPTV Kopen?",
    answer:
      "Smart TV (Samsung/LG), Android TV/Google TV, Fire TV Stick, Apple TV, Android & iOS, PC/Mac, MAG en Formuler. We adviseren TiviMate of IPTV Smarters als speler-app.",
  },
  {
    question: "Hoe installeer ik IPTV op mijn tv of mobiel?",
    answer:
      "Bekijk onze installatiegids voor een stap-voor-stap handleiding per apparaat. Kom je er niet uit, dan begeleidt onze WhatsApp support je live.",
  },
  {
    question: "Is er een geld-terug-garantie?",
    answer:
      "Ja. Werkt de dienst niet naar wens, dan bieden we 7 dagen geld-terug-garantie.",
  },
  {
    question: "Kan ik IPTV Kopen op meerdere apparaten tegelijk gebruiken?",
    answer:
      "Ja, met het gezinspakket kun je op 2 apparaten tegelijk streamen. Voor meer gelijktijdige apparaten kun je contact opnemen via WhatsApp.",
  },
  {
    question: "Werkt IPTV Kopen ook in België?",
    answer:
      "Ja. Naast de internationale zenderlijst bevat ons abonnement ook alle grote Belgische zenders zoals VTM, VRT, Eén, Canvas en Sporza. Zie onze IPTV België pagina voor meer info.",
  },
  {
    question: "Welke betaalmethodes accepteren jullie?",
    answer:
      "We bespreken de beschikbare betaalmethodes graag persoonlijk via WhatsApp bij het bestellen.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="dark-block section pb-16">
        <div className="container-px text-center">
          <span className="eyebrow text-sky">FAQ</span>
          <h1 className="text-4xl md:text-5xl font-extrabold max-w-2xl mx-auto">
            Veelgestelde <span className="gradient-text">vragen</span>
          </h1>
          <p className="muted text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Staat je vraag er niet bij? Stuur ons een bericht via WhatsApp,
            we reageren snel.
          </p>
          <a href={whatsappUrl("Hoi, ik heb een vraag over IPTV.")} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8 inline-flex">
            Stel je vraag via WhatsApp
          </a>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-px">
          <FaqAccordion items={FAQS} />
        </div>
      </section>
    </>
  );
}
