// Real pricing, ported directly from the owner's established IPTV sites
// (same business, same actual offer) -- not invented, not the competitor's
// numbers. Channel/VOD counts (21.000+ / 63.000+) are the real catalog size
// used across those sites too.
export type Plan = {
  id: string;
  duration: string;
  price: number;
  screens: string;
  tagline: string;
  features: string[];
  badge?: string;
  featured?: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "3-maanden",
    duration: "3 Maanden",
    price: 11.99,
    screens: "1 scherm",
    tagline: "De officiële toegang, zonder risico",
    features: [
      "21.000+ zenders",
      "63.000+ films & series",
      "HD · Full HD · 4K",
      "Compatibel met alle IPTV-apps",
      "Support 7/7",
    ],
  },
  {
    id: "6-maanden",
    duration: "6 Maanden",
    price: 27.99,
    screens: "2 schermen tegelijk",
    tagline: "Het meest gekozen abonnement",
    badge: "Populair",
    featured: true,
    features: [
      "21.000+ zenders",
      "63.000+ films & series",
      "HD · Full HD · 4K",
      "Anti-buffer servers",
      "Compatibel met alle IPTV-apps",
      "Prioriteit support 7/7",
    ],
  },
  {
    id: "12-maanden",
    duration: "12 Maanden",
    price: 74.99,
    screens: "3 schermen tegelijk",
    tagline: "12 maanden IPTV voor de beste prijs",
    features: [
      "21.000+ zenders",
      "63.000+ films & series",
      "HD · Full HD · 4K",
      "Anti-buffer servers",
      "Compatibel met alle IPTV-apps",
      "Gratis installatiehulp",
      "VIP support 7/7",
    ],
  },
];

export const priceNL = (p: number) => `€${p.toFixed(2).replace(".", ",")}`;
