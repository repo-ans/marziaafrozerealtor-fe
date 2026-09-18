import type { GuidePageContent } from "@/components/guides/GuidePageTemplate";

export const guidePages: Record<string, GuidePageContent> = {
  "buyers-guide": {
    eyebrow: "Buying",
    title: "Buyer's Guide",
    intro:
      "A clear, step-by-step overview of what to expect when buying a home in the Greater Toronto Area — from your first search to closing day.",
    sections: [
      {
        heading: "1. Get pre-approved before you search",
        body: [
          "A mortgage pre-approval tells you exactly what you can afford and shows sellers you're a serious buyer. Most lenders can turn one around within a few days — Marzia can connect you with trusted mortgage brokers if you don't already have one.",
        ],
      },
      {
        heading: "2. Define your must-haves",
        body: [
          "Neighbourhood, commute, school zones, condo fees, parking — narrowing these down early keeps your search focused and saves you from touring homes that were never a fit.",
        ],
      },
      {
        heading: "3. Make a competitive offer",
        body: [
          "In the GTA market, timing and terms matter as much as price. Marzia will walk you through comparable sales, financing conditions, and negotiation strategy before you submit an offer.",
        ],
      },
      {
        heading: "4. Home inspection & closing",
        body: [
          "Once your offer is accepted, a home inspection, lawyer review, and final mortgage approval follow before keys are handed over — typically 30-90 days after acceptance.",
        ],
      },
    ],
    formTopic: "Buyer's Guide",
    formTitle: "Have questions about buying?",
    formNote: "Share a few details and Marzia will reach out to walk you through your options.",
  },

  "first-time-buyers": {
    eyebrow: "Buying",
    title: "First-Time Buyers",
    intro:
      "Buying your very first home comes with its own set of programs, rebates, and questions. Here's what first-time buyers in Ontario should know.",
    sections: [
      {
        heading: "You may qualify for extra rebates",
        body: [
          "First-time buyers in Ontario can receive a Land Transfer Tax rebate of up to $4,000, and Toronto adds its own municipal rebate on top for properties within the city.",
        ],
      },
      {
        heading: "Down payment minimums",
        body: [
          "As little as 5% down is required on homes under $500,000, with a sliding scale up to 20% for homes over $1,000,000. A mortgage broker can map out exactly what applies to your budget.",
        ],
      },
      {
        heading: "Don't skip the pre-approval step",
        body: [
          "A pre-approval locks in an interest rate for 90-120 days and gives you a realistic budget before you start touring homes — it's the single most useful first step.",
        ],
      },
    ],
    formTopic: "First-Time Buyers",
    formTitle: "New to home buying?",
    formNote: "Tell Marzia a bit about what you're looking for and she'll guide you through every step.",
  },

  "rrsp-home-buyers-plan": {
    eyebrow: "Buying",
    title: "RRSP Home Buyers' Plan",
    intro:
      "The Home Buyers' Plan (HBP) lets eligible first-time buyers withdraw from their RRSP, tax-free, to put toward a down payment.",
    sections: [
      {
        heading: "How much can you withdraw",
        body: [
          "Under the HBP, you can withdraw up to $60,000 from your RRSP (as of the current federal limit) without paying tax on the withdrawal, provided the funds go toward a qualifying home purchase.",
        ],
      },
      {
        heading: "Repayment terms",
        body: [
          "Withdrawn amounts must be repaid to your RRSP over 15 years, starting the second year after the withdrawal. Missed repayments are added to your taxable income for that year.",
        ],
      },
      {
        heading: "Who qualifies",
        body: [
          "You (and your spouse, if applicable) generally must not have owned a home in the four years before the withdrawal. A mortgage broker or accountant can confirm your exact eligibility.",
        ],
      },
    ],
    formTopic: "RRSP Home Buyers' Plan",
    formTitle: "Want to know if the HBP works for you?",
    formNote: "Marzia can point you to trusted mortgage professionals to confirm the details.",
  },

  "mortgage-for-your-home": {
    eyebrow: "Buying",
    title: "Mortgage For Your Home",
    intro:
      "A quick primer on mortgage basics so you can walk into lender conversations with confidence.",
    sections: [
      {
        heading: "Fixed vs. variable rates",
        body: [
          "Fixed rates stay the same for your whole term, offering predictable payments. Variable rates move with the lender's prime rate — often lower to start, but with more uncertainty over time.",
        ],
      },
      {
        heading: "Term vs. amortization",
        body: [
          "Your term (often 1-5 years) is how long your current rate and lender agreement lasts. Your amortization (often 25-30 years) is the total time to pay off the mortgage.",
        ],
      },
      {
        heading: "The mortgage stress test",
        body: [
          "Canadian lenders must qualify you at a higher \"stress test\" rate than your actual contract rate, to confirm you could handle payments if rates rise.",
        ],
      },
    ],
    formTopic: "Mortgage For Your Home",
    formTitle: "Need a mortgage broker referral?",
    formNote: "Marzia works with several trusted GTA mortgage professionals and can make an introduction.",
  },

  "gst-hst-new-housing-rebate": {
    eyebrow: "Buying",
    title: "GST/HST New Housing Rebate",
    intro:
      "Buying a brand-new or substantially renovated home? You may be able to recover part of the GST/HST paid.",
    sections: [
      {
        heading: "What qualifies",
        body: [
          "New construction homes, substantially renovated homes, and some owner-built homes can qualify — provided the home will be your primary residence or that of a close relation.",
        ],
      },
      {
        heading: "How much you can get back",
        body: [
          "The federal rebate can return up to 36% of the GST paid (to a maximum) on homes up to $450,000, with Ontario adding its own provincial new-housing rebate on top.",
        ],
      },
      {
        heading: "Filing deadlines matter",
        body: [
          "Applications generally must be filed within two years of the closing date — Marzia can point you to a builder's rebate paperwork or an accountant who handles these regularly.",
        ],
      },
    ],
    formTopic: "GST/HST New Housing Rebate",
    formTitle: "Buying new construction or pre-construction?",
    formNote: "Ask Marzia about rebate-eligible builds currently available in the GTA.",
  },

  "new-listing-alerts": {
    eyebrow: "Buying",
    title: "New Listing Alerts",
    intro:
      "Be the first to know when a home matching your criteria hits the market — before it's gone.",
    sections: [
      {
        heading: "Why speed matters in the GTA",
        body: [
          "Well-priced homes in popular neighbourhoods can attract offers within days. A same-day alert means you can book a showing before the crowd.",
        ],
      },
      {
        heading: "How it works",
        body: [
          "Tell Marzia your target cities, price range, and property type below, and she'll set up a custom search that notifies you the moment a matching listing goes live.",
        ],
      },
    ],
    formTopic: "New Listing Alerts",
    formTitle: "Set up your alert",
    formNote: "Include your target city, budget, and bed/bath needs in the message.",
    formButtonLabel: "Start My Alert",
  },

  "price-drop-alerts": {
    eyebrow: "Buying",
    title: "Price Drop Alerts",
    intro:
      "Get notified the moment a home you're watching reduces its asking price — a great signal that a seller may be more open to negotiation.",
    sections: [
      {
        heading: "Why price changes matter",
        body: [
          "A price reduction often means a listing has been on the market longer than the seller expected — which can translate into more room to negotiate on price or conditions.",
        ],
      },
      {
        heading: "How it works",
        body: [
          "Share the listings or areas you're tracking below, and Marzia will let you know as soon as she spots a price change worth acting on.",
        ],
      },
    ],
    formTopic: "Price Drop Alerts",
    formTitle: "Track a property or area",
    formNote: "Mention the address or neighbourhood you'd like Marzia to watch.",
    formButtonLabel: "Start Tracking",
  },

  "open-house-alerts": {
    eyebrow: "Buying",
    title: "Open House Alerts",
    intro:
      "Get a heads-up whenever a new open house is scheduled in your target neighbourhoods.",
    sections: [
      {
        heading: "See it in person, faster",
        body: [
          "Photos only tell part of the story. Open houses let you get a feel for the layout, light, and street before committing to a private showing.",
        ],
      },
      {
        heading: "How it works",
        body: [
          "Tell Marzia which areas and price range you're interested in, and she'll flag upcoming open houses that match — including ones from other brokerages across TRREB.",
        ],
      },
    ],
    formTopic: "Open House Alerts",
    formTitle: "Never miss an open house",
    formNote: "Let Marzia know your target neighbourhoods below.",
    formButtonLabel: "Sign Me Up",
  },

  "just-listed": {
    eyebrow: "Buying",
    title: "Just Listed",
    intro:
      "A running feed of the newest homes to hit the market across the Greater Toronto Area, sourced directly from the TRREB MLS® system.",
    sections: [
      {
        heading: "Fresh inventory, every day",
        body: [
          "New listings are added to the board throughout the day. Browsing the full, unfiltered feed is the fastest way to see what's genuinely new — not just what's been re-promoted.",
        ],
      },
    ],
    formTopic: "Just Listed",
    formTitle: "Want a curated just-listed feed instead?",
    formNote: "Tell Marzia your criteria and she'll send you a shortlist directly.",
  },

  "exclusive-listing": {
    eyebrow: "Buying",
    title: "Exclusive Listings",
    intro:
      "Some of the best opportunities never make it to the public MLS® search — ask about Dream Valley Realty's exclusive and pocket listings.",
    sections: [
      {
        heading: "What is an exclusive listing?",
        body: [
          "An exclusive listing is a property being marketed by a brokerage before (or instead of) a full public MLS® listing — often at the seller's request for privacy or a quieter sale process.",
        ],
      },
      {
        heading: "How to get access",
        body: [
          "Dream Valley Realty agents, including Marzia, sometimes have early access to these opportunities. Share your criteria below and she'll flag anything relevant as it comes up.",
        ],
      },
    ],
    formTopic: "Exclusive Listing",
    formTitle: "Ask about current exclusive listings",
    formNote: "Share your budget and target area — exclusives move quickly.",
  },

  "real-estate-guides": {
    eyebrow: "Buying",
    title: "Real Estate Guides",
    intro:
      "A library of practical guides covering every stage of buying, selling, and owning property in Ontario.",
    sections: [
      {
        heading: "Buying",
        body: ["See the Buyer's Guide, First-Time Buyers, and Mortgage pages under the Buying menu."],
      },
      {
        heading: "Selling",
        body: ["See the Seller's Guide and Home Worth pages under the Selling menu."],
      },
      {
        heading: "Have a specific question?",
        body: [
          "Not every scenario fits neatly into a guide. Send Marzia a message below and she'll answer directly or point you to the right resource.",
        ],
      },
    ],
    formTopic: "Real Estate Guides",
    formTitle: "Ask Marzia a question",
    formNote: "No question is too small.",
  },

  "sellers-guide": {
    eyebrow: "Selling",
    title: "Seller's Guide",
    intro:
      "Selling a home well takes more than a sign on the lawn. Here's what a well-run sale looks like in today's GTA market.",
    sections: [
      {
        heading: "1. Price it right from day one",
        body: [
          "Overpricing is the most common (and costly) mistake sellers make — a listing that sits too long often ends up selling for less than if it were priced accurately from the start. Marzia will prepare a comparable market analysis before you list.",
        ],
      },
      {
        heading: "2. Prepare and stage",
        body: [
          "Small fixes, decluttering, and professional photography consistently make a measurable difference in both showing traffic and final sale price.",
        ],
      },
      {
        heading: "3. Marketing that reaches real buyers",
        body: [
          "Your listing should appear on MLS®, top real estate portals, and be promoted directly to Marzia's buyer network and Dream Valley Realty's office — not just posted and left to sit.",
        ],
      },
      {
        heading: "4. Negotiate and close",
        body: [
          "From reviewing offers to coordinating inspections, lawyers, and the closing date, Marzia manages the details so you can focus on your next move.",
        ],
      },
    ],
    formTopic: "Seller's Guide",
    formTitle: "Thinking about selling?",
    formNote: "Tell Marzia a bit about your property and timeline.",
  },

  "home-worth": {
    eyebrow: "Selling",
    title: "What's My Home Worth?",
    intro:
      "Get a complimentary, no-obligation home valuation based on current TRREB market data and recent comparable sales in your neighbourhood.",
    sections: [
      {
        heading: "What goes into a valuation",
        body: [
          "Marzia looks at recent comparable sales, current active competition, your home's condition and upgrades, and broader market trends in your specific neighbourhood — not just an automated estimate.",
        ],
      },
      {
        heading: "No pressure, no obligation",
        body: [
          "Whether you're planning to sell next month or just curious about today's value, this is a free conversation with no commitment attached.",
        ],
      },
    ],
    formTopic: "Home Worth",
    formTitle: "Request your free home valuation",
    formNote: "Include your address and Marzia will follow up with a detailed estimate.",
    formButtonLabel: "Get My Home Value",
  },
};

export type GuideSlug = keyof typeof guidePages;
