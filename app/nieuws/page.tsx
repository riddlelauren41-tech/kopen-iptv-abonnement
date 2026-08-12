import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { pageMeta, whatsappUrl } from "@/lib/site";
import { POSTS } from "@/lib/posts";

export const metadata: Metadata = pageMeta({
  title: "IPTV Nieuws — Laatste Updates & Tips | IPTV Kopen",
  description:
    "Blijf op de hoogte van het laatste IPTV nieuws, tips, updates en handleidingen. Ontdek alles over IPTV Nederland en België bij IPTV Kopen.",
  path: "/nieuws",
});

const fmt = (d: string) => new Date(d).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });

export default function NieuwsPage() {
  return (
    <section className="section">
      <div className="container-px">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="eyebrow">Nieuws</span>
          <h1 className="text-4xl font-bold">IPTV Nieuws &amp; Tips</h1>
          <p className="muted mt-4 text-lg leading-relaxed">
            Praktische gidsen om het meeste uit je IPTV abonnement te halen.
          </p>
        </div>

        {POSTS.length === 0 ? (
          <div className="card max-w-xl mx-auto text-center p-12">
            <p className="muted">
              Binnenkort verschijnen hier onze eerste artikelen. Heb je nu al
              een vraag?
            </p>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 inline-flex">
              Vraag het via WhatsApp
            </a>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {POSTS.map((p) => (
              <article key={p.slug} className="card overflow-hidden">
                <Link href={`/nieuws/${p.slug}`}>
                  <div className="relative w-full aspect-[1.9/1]">
                    <Image src={p.cover} alt={p.coverAlt} fill className="object-cover" />
                  </div>
                </Link>
                <div className="p-5">
                  <p className="text-xs muted mb-2">{fmt(p.date)} &middot; {p.readTime} min leestijd</p>
                  <h2 className="font-semibold text-lg leading-snug mb-2">
                    <Link href={`/nieuws/${p.slug}`}>{p.title}</Link>
                  </h2>
                  <p className="text-sm muted line-clamp-3">{p.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
