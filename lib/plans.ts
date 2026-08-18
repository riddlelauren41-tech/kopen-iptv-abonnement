// Pricing. The 3/6/12-month single-plan prices are real, ported directly
// from the owner's established IPTV sites (same business, same actual
// offer) -- not invented, not the competitor's numbers. The 24-month tier
// and the entire multi-screen block are NOT yet confirmed by the client --
// extrapolated from the real tiers' pricing pattern so the site ships with
// real-looking, usable numbers instead of "€X,XX" placeholders, but these
// specific figures still need the client's sign-off before launch. Flagged
// with `estimated: true` so they're easy to find and swap out later.
export type Plan = {
  id: string;
  duration: string;
  price: number;
  screens: string;
  tagline: string;
  features: string[];
  badge?: string;
  featured?: boolean;
  estimated?: boolean;
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
    tagline: "Flexibel voordeel voor een half jaar",
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
    tagline: "Het meest gekozen abonnement",
    badge: "Beste Deal",
    featured: true,
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
  {
    id: "24-maanden",
    duration: "24 Maanden",
    price: 129.99,
    screens: "3 schermen tegelijk",
    tagline: "Laagste prijs per maand op lange termijn",
    estimated: true,
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

export type MultiScreenPlan = {
  id: string;
  screens: string;
  price: number;
  tagline: string;
  features: string[];
  estimated?: boolean;
};

// Add-on style: extra simultaneous screens on top of a 12-maanden abonnement
// (the plan most subscribers pick). The 3-schermen row intentionally mirrors
// the real 12-maanden/3-schermen price above -- same offer, shown here for
// shoppers comparing by screen count instead of by duration.
export const MULTI_SCREEN_PLANS: MultiScreenPlan[] = [
  {
    id: "2-schermen",
    screens: "2 Schermen",
    price: 54.99,
    tagline: "Ideaal voor een koppel of klein gezin",
    estimated: true,
    features: ["12 maanden looptijd", "21.000+ zenders", "63.000+ films & series", "Anti-buffer servers"],
  },
  {
    id: "3-schermen",
    screens: "3 Schermen",
    price: 74.99,
    tagline: "Onze meest gekozen gezinsoptie",
    features: ["12 maanden looptijd", "21.000+ zenders", "63.000+ films & series", "Anti-buffer servers"],
  },
  {
    id: "4-schermen",
    screens: "4 Schermen",
    price: 94.99,
    tagline: "Voor grotere gezinnen, overal tegelijk kijken",
    estimated: true,
    features: ["12 maanden looptijd", "21.000+ zenders", "63.000+ films & series", "Anti-buffer servers"],
  },
];

export const priceNL = (p: number) => `€${p.toFixed(2).replace(".", ",")}`;
