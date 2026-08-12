import type { Metadata } from "next";
import { Tv, Smartphone, Apple, MonitorSmartphone, Laptop } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { pageMeta, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Installatiegids | IPTV Kopen — IPTV Installeren Stap voor Stap",
  description:
    "IPTV installeren op Smart TV, Fire Stick, Android, iPhone of PC? Volg onze stap-voor-stap handleiding. Binnen 5 minuten klaar ✓ Met WhatsApp begeleiding.",
  path: "/installatiegids",
});

const DEVICES = [
  {
    icon: Tv,
    name: "Smart TV (Samsung / LG)",
    steps: [
      "Open de app store van je Smart TV en installeer IPTV Smarters of Smart IPTV.",
      "Open de app en voer de inloggegevens in die je van ons ontvangt.",
      "Wacht tot de zenderlijst is geladen — klaar om te kijken.",
    ],
  },
  {
    icon: MonitorSmartphone,
    name: "Fire TV Stick / Android TV",
    steps: [
      "Installeer TiviMate of IPTV Smarters via de Amazon/Google Play store.",
      "Voer je M3U-link of Xtream-gegevens in bij het instellen van de app.",
      "Blader door categorieën of zoek direct naar je favoriete zender.",
    ],
  },
  {
    icon: Smartphone,
    name: "Android telefoon / tablet",
    steps: [
      "Download IPTV Smarters Pro via de Google Play Store.",
      "Log in met de gegevens die je via WhatsApp ontvangt.",
      "Stream direct op je telefoon of cast naar je tv via Chromecast.",
    ],
  },
  {
    icon: Apple,
    name: "iPhone / iPad / Apple TV",
    steps: [
      "Download GSE Smart IPTV of IPTV Smarters via de App Store.",
      "Voer je inloggegevens of M3U-link in.",
      "Geniet van live tv en VOD, ook via AirPlay op je tv.",
    ],
  },
  {
    icon: Laptop,
    name: "PC / Mac",
    steps: [
      "Installeer VLC Media Player of IPTV Smarters Pro (Windows/macOS).",
      "Open de playlist met de M3U-link die je van ons ontvangt.",
      "Start met kijken — geen extra hardware nodig.",
    ],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "IPTV installeren op elk apparaat",
  step: DEVICES.flatMap((d) =>
    d.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: `${d.name} — stap ${i + 1}`, text: s }))
  ),
};

export default function InstallatiegidsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="dark-block section pb-16">
        <div className="container-px text-center">
          <span className="eyebrow text-sky">Installatiegids</span>
          <h1 className="text-4xl md:text-5xl font-extrabold max-w-3xl mx-auto">
            IPTV installeren — <span className="gradient-text">stap voor stap</span>
          </h1>
          <p className="muted text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Binnen 5 minuten klaar op je Smart TV, Fire Stick, telefoon of PC.
            Kom je er niet uit? We helpen je live via WhatsApp.
          </p>
          <a href={whatsappUrl("Hoi, ik heb hulp nodig bij het installeren van IPTV.")} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8 inline-flex">
            Hulp nodig? Chat via WhatsApp
          </a>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-px">
          <SectionHeader eyebrow="Per apparaat" title="Kies je apparaat en installeer IPTV" />
          <div className="grid md:grid-cols-2 gap-6">
            {DEVICES.map((d) => (
              <div key={d.name} className="card p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-11 w-11 rounded-xl bg-linear-to-br from-indigo to-violet flex items-center justify-center shrink-0">
                    <d.icon size={20} className="text-white" />
                  </div>
                  <h2 className="font-semibold text-lg">{d.name}</h2>
                </div>
                <ol className="space-y-3">
                  {d.steps.map((s, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed">
                      <span className="shrink-0 h-6 w-6 rounded-full bg-body flex items-center justify-center text-xs font-semibold text-violet border border-border">
                        {i + 1}
                      </span>
                      <span className="muted">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
