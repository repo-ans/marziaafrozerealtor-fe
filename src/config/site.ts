export const siteConfig = {
  agentName: "Marzia Afroze",
  agentTitle: "Realtor®",
  brokerage: "Dream Valley Realty Inc.",
  brokerageShort: "DVR",
  phoneDisplay: "+1 (647) 385-5570",
  phoneDigits: "+16473855570",
  whatsapp: "+16473855570",
  email: "marzia.a.real@gmail.com",
  address: {
    line: "885 Progress Ave, Suite 109",
    city: "Toronto",
    province: "Ontario",
    postalCode: "M1H 3G3",
    country: "Canada",
    full: "885 Progress Ave, Suite 109, Toronto, Ontario M1H 3G3",
  },
  socials: {
    facebook: "",
    instagram: "",
    linkedin: "",
  },
  heroHeadline: "Buy or Sell Your Home with Confidence",
  heroSubtext:
    "Whether you are buying your next home or selling your current one, Marzia makes the process simple, clear, and stress-free.",
} as const;

export const featuredCities = [
  "Scarborough",
  "Toronto",
  "Markham",
  "Richmond Hill",
  "Oakville",
  "Burlington",
  "Ajax",
  "Vaughan",
] as const;

export const provenStats = [
  { value: "50+", label: "Successful Property Transactions for Buying, Selling, and Renting" },
  { value: "98%", label: "Client Satisfaction Rate Across Every Transaction" },
  { value: "8+", label: "Years of Combined Real Estate Market Experience" },
  { value: "TRREB", label: "Full Access to Toronto Regional Real Estate Board MLS®" },
] as const;

export const smarterWaySteps = [
  {
    number: "01",
    title: "For Home Buyers",
    description:
      "Get the right strategy from the beginning — Marzia helps you plan your search, understand pricing, negotiate confidently, and close on the home that fits your life.",
  },
  {
    number: "02",
    title: "For Home Sellers",
    description:
      "From pricing your home right to professional marketing and skilled negotiation, Marzia handles every detail to get you the strongest possible outcome.",
  },
  {
    number: "03",
    title: "Local Market Expertise",
    description:
      "Deep knowledge of the Greater Toronto Area — school zones, upcoming developments, and neighbourhood trends — so you always make an informed decision.",
  },
] as const;

export const faqItems = [
  {
    q: "Do you help both home buyers and sellers?",
    a: "Yes — Marzia works with both buyers and sellers across the Greater Toronto Area, offering guidance tailored to each side of the transaction.",
  },
  {
    q: "How do I schedule a home tour?",
    a: "Reach out through the contact form, call, or WhatsApp and Marzia will arrange a viewing at a time that works for you.",
  },
  {
    q: "Can you help me sell my current home?",
    a: "Absolutely — from pricing strategy to marketing and negotiation, Marzia manages the full selling process from listing to closing.",
  },
  {
    q: "Can first-time buyers work with Marzia?",
    a: "Yes, first-time buyers are very welcome. Marzia walks you through every step, from financing basics to closing day.",
  },
  {
    q: "Which areas do you serve?",
    a: "Marzia primarily serves Scarborough, Toronto, Markham, Richmond Hill, and the surrounding Greater Toronto Area.",
  },
  {
    q: "Do you provide home valuations?",
    a: "Yes — contact Marzia for a complimentary, no-obligation home valuation based on current market data.",
  },
] as const;
