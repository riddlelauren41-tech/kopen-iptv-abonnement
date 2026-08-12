// Central site config. WhatsApp number and real pricing are placeholders --
// see TODO markers -- swap in Ben's real numbers before this goes live.
export const SITE = {
  name: "IPTV Abonnement Kopen",
  shortName: "IPTV Kopen",
  domain: "kopen-iptv-abonnement.site",
  url: "https://kopen-iptv-abonnement.site",
  // TODO: replace with the real WhatsApp business number (with country code, no + or spaces)
  whatsappNumber: "31600000000",
  whatsappMessage: "Hoi, ik wil graag meer weten over een IPTV abonnement.",
  locale: "nl_NL",
  themeColor: "#0a1628",
};

export function whatsappUrl(message?: string) {
  const text = encodeURIComponent(message || SITE.whatsappMessage);
  return `https://wa.me/${SITE.whatsappNumber}?text=${text}`;
}

export function pageMeta({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  const url = `${SITE.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: "website",
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
