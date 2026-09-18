export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  coverImage: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "gta-market-outlook",
    title: "GTA Real Estate Market Outlook",
    excerpt:
      "A look at where prices, inventory, and buyer demand are trending across the Greater Toronto Area this season.",
    date: "2026-08-15",
    coverImage:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1200&auto=format&fit=crop",
    content: [
      "The Greater Toronto Area continues to see steady demand across both freehold and condo segments, with inventory levels gradually normalizing after the sharp swings of recent years.",
      "Buyers are taking a more measured approach, favouring well-priced, move-in-ready homes over properties that need significant work. Sellers who invest in staging and pricing strategy upfront are seeing faster, cleaner sales.",
      "For buyers, this means more room to negotiate conditions like financing and inspection. For sellers, it means pricing accurately from day one matters more than ever — an overpriced listing can sit and eventually sell for less than if it had been priced right from the start.",
    ],
  },
  {
    slug: "first-time-buyer-mistakes",
    title: "5 Mistakes First-Time Buyers Make (and How to Avoid Them)",
    excerpt:
      "The most common — and most avoidable — missteps Marzia sees first-time buyers make in the GTA market.",
    date: "2026-07-02",
    coverImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
    content: [
      "1. Skipping pre-approval. Touring homes before knowing your real budget almost always leads to disappointment — get pre-approved first.",
      "2. Underestimating closing costs. Land transfer tax, legal fees, and inspection costs can add up to several thousand dollars beyond your down payment.",
      "3. Waiving conditions to compete. In a hot market it's tempting, but a financing or inspection condition protects you from very real risk.",
      "4. Focusing only on the list price. Property taxes, condo fees, and utility costs all affect what you can actually afford monthly.",
      "5. Going it alone. A buyer's agent costs you nothing directly (the fee is typically paid by the seller) and gives you an advocate through the entire process.",
    ],
  },
  {
    slug: "staging-tips-that-sell",
    title: "Staging Tips That Actually Help Homes Sell",
    excerpt:
      "Simple, high-impact staging changes that make a real difference in showings and offers — without a full renovation budget.",
    date: "2026-05-20",
    coverImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    content: [
      "Declutter first, decorate second. Buyers need to be able to picture their own life in the space — that's hard to do around someone else's belongings.",
      "Fix the small stuff. A dripping tap or a scuffed wall costs little to fix but can plant doubt about how well the whole home has been maintained.",
      "Let in light. Open curtains, clean windows, and add a few well-placed lamps for evening showings — bright spaces consistently photograph and show better.",
      "Neutralize bold colours. A fresh coat of neutral paint is one of the best-value updates before listing, especially in main living areas.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug) ?? null;
}
