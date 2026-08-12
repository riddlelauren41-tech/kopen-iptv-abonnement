import type { Metadata } from "next";
import { MessageCircle, Mail, Clock } from "lucide-react";
import { pageMeta, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Contact | IPTV Kopen — WhatsApp Support 7/7",
  description:
    "Neem contact op met IPTV Kopen via WhatsApp of e-mail. Snelle reactie, 7 dagen per week bereikbaar voor vragen en support.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="dark-block section pb-16">
        <div className="container-px text-center">
          <span className="eyebrow text-sky">Contact</span>
          <h1 className="text-4xl md:text-5xl font-extrabold max-w-2xl mx-auto">
            Neem <span className="gradient-text">contact</span> op
          </h1>
          <p className="muted text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Vragen over je abonnement, installatie of bestelling? We helpen
            je graag verder, 7 dagen per week.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-px grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="card p-7 text-center">
            <div className="mx-auto h-12 w-12 rounded-xl bg-linear-to-br from-indigo to-violet flex items-center justify-center mb-4">
              <MessageCircle size={22} className="text-white" />
            </div>
            <h2 className="font-semibold mb-2">WhatsApp</h2>
            <p className="muted text-sm mb-4">Snelste manier om ons te bereiken.</p>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm w-full">
              Start chat
            </a>
          </div>

          <div className="card p-7 text-center">
            <div className="mx-auto h-12 w-12 rounded-xl bg-linear-to-br from-indigo to-violet flex items-center justify-center mb-4">
              <Mail size={22} className="text-white" />
            </div>
            <h2 className="font-semibold mb-2">E-mail</h2>
            <p className="muted text-sm mb-4">Voor uitgebreidere vragen.</p>
            <a href="mailto:info@kopen-iptv-abonnement.site" className="btn-ghost text-sm w-full">
              Mail ons
            </a>
          </div>

          <div className="card p-7 text-center">
            <div className="mx-auto h-12 w-12 rounded-xl bg-linear-to-br from-indigo to-violet flex items-center justify-center mb-4">
              <Clock size={22} className="text-white" />
            </div>
            <h2 className="font-semibold mb-2">Bereikbaarheid</h2>
            <p className="muted text-sm">7 dagen per week, snelle reactietijd.</p>
          </div>
        </div>
      </section>
    </>
  );
}
