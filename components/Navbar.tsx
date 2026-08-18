"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SITE, whatsappUrl } from "@/lib/site";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/iptv-abonnement", label: "IPTV Abonnement" },
  { href: "/installatiegids", label: "Installatiegids" },
  { href: "/nieuws", label: "Nieuws/Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink/80 backdrop-blur-xl border-b border-white/10">
      <div className="container-px flex items-center justify-between py-4">
        <Link href="/" className="font-display font-bold text-lg text-white">
          IPTV<span className="gradient-text">Kopen</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
            Bestellen
          </a>
        </div>

        <button
          className="lg:hidden text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-ink px-6 py-5 flex flex-col gap-4">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-white/85 font-medium"
            >
              {l.label}
            </Link>
          ))}
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm mt-2">
            Bestellen
          </a>
        </div>
      )}
    </header>
  );
}
