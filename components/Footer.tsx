import Link from "next/link";
import { MessageCircle, Mail } from "lucide-react";
import { SITE, whatsappUrl } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="dark-block pt-16 pb-8">
      <div className="container-px">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="font-display font-bold text-lg text-white mb-3">
              IPTV<span className="gradient-text">Kopen</span>
            </div>
            <p className="muted text-sm leading-relaxed">
              Betrouwbaar IPTV abonnement voor Nederland en België. Stabiel
              in HD/4K, met 24/7 WhatsApp support.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Navigatie</h4>
            <ul className="space-y-2.5 text-sm muted">
              <li><Link href="/iptv-abonnement" className="hover:text-white transition-colors">IPTV Abonnement</Link></li>
              <li><Link href="/installatiegids" className="hover:text-white transition-colors">Installatiegids</Link></li>
              <li><Link href="/iptv-belgie" className="hover:text-white transition-colors">IPTV België</Link></li>
              <li><Link href="/nieuws" className="hover:text-white transition-colors">Nieuws</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm muted">
              <li><Link href="/faq" className="hover:text-white transition-colors">Veelgestelde vragen</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Neem contact op</h4>
            <div className="flex flex-col gap-3 text-sm">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 muted hover:text-white transition-colors">
                <MessageCircle size={16} /> WhatsApp Support
              </a>
              <a href="mailto:info@kopen-iptv-abonnement.site" className="flex items-center gap-2 muted hover:text-white transition-colors">
                <Mail size={16} /> info@kopen-iptv-abonnement.site
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs muted">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. Alle rechten voorbehouden.</p>
          <p>IPTV abonnementen voor legaal gebruik met eigen streaming-apparatuur.</p>
        </div>
      </div>
    </footer>
  );
}
