import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { pageMeta, whatsappUrl, SITE } from "@/lib/site";
import { POSTS } from "@/lib/posts";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return pageMeta({ title: post.title, description: post.excerpt, path: `/nieuws/${post.slug}`, image: post.cover });
}

const fmt = (d: string) => new Date(d).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: SITE.url + post.cover,
    datePublished: post.date,
    inLanguage: "nl-NL",
    author: { "@type": "Organization", name: SITE.name },
  };

  return (
    <article className="section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-px max-w-3xl mx-auto">
        <p className="text-sm muted mb-3">{fmt(post.date)} &middot; {post.readTime} min leestijd &middot; {post.categoryLabel}</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
        <div className="relative w-full aspect-[1.9/1] rounded-2xl overflow-hidden border border-border mb-10">
          <Image src={post.cover} alt={post.coverAlt} fill className="object-cover" priority />
        </div>

        <div className="prose-content space-y-8">
          {post.sections.map((s, i) => (
            <div key={i}>
              {s.heading && <h2 className="text-xl font-bold mb-3">{s.heading}</h2>}
              {s.body.map((p, j) => (
                <p key={j} className="text-base leading-relaxed muted mb-3">{p}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="card p-8 mt-12 text-center dark-block">
          <h2 className="text-xl font-bold mb-2">Klaar om te starten?</h2>
          <p className="muted mb-5">Bestel je IPTV abonnement en ontvang directe activatie via WhatsApp.</p>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex">
            Bestel via WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
