import { blogPosts } from "@/config/blogPosts";

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavFlyout {
  label: string;
  flyout: NavLink[];
}

export type NavChild = NavLink | NavFlyout;

export interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
}

export function isFlyout(item: NavChild): item is NavFlyout {
  return "flyout" in item;
}

// Structure and links copied verbatim from Dream Valley Realty's own site
// (dvr-frontend/src/components/navbar/Navbar.tsx) so external URLs match
// exactly — only relabelled where the destination is Marzia's own page
// instead of DVR's multi-agent equivalent.
export const NAV_STRUCTURE: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Our Team",
    children: [
      { label: "Find Agent", href: "/about" },
      { label: "Join Us", href: "/join-us" },
    ],
  },
  {
    label: "Listings",
    children: [
      { label: "All Listings", href: "/listings" },
      { label: "Residential", href: "/listings?type=residential" },
      { label: "Condo", href: "/listings?type=condo" },
      { label: "Commercial", href: "/listings?type=commercial" },
      { label: "Open Houses", href: "/listings?type=open-houses" },
      { label: "Pre-Construction", href: "/listings?type=pre-construction" },
      { label: "My Listings", href: "/listings?source=mine" },
      { label: "Office Listings", href: "/listings?source=office" },
    ],
  },
  {
    label: "Buying",
    children: [
      {
        label: "Buyer's Guide",
        flyout: [
          { label: "Buyer's Guide", href: "/buying/buyers-guide" },
          { label: "First Time Buyers", href: "/buying/first-time-buyers" },
          { label: "RRSP Home Buyer's Plan", href: "/buying/rrsp-home-buyers-plan" },
          { label: "Mortgage For Your Home", href: "/buying/mortgage-for-your-home" },
          { label: "GST/HST New Housing Rebate", href: "/buying/gst-hst-new-housing-rebate" },
        ],
      },
      { label: "New Listing Alerts", href: "/buying/new-listing-alerts" },
      { label: "Price Drop Alerts", href: "/buying/price-drop-alerts" },
      { label: "Open House Alerts", href: "/buying/open-house-alerts" },
      { label: "Just Listed", href: "/buying/just-listed" },
      { label: "Exclusive Listing", href: "/buying/exclusive-listing" },
      { label: "Real Estate Guides", href: "/buying/real-estate-guides" },
    ],
  },
  {
    label: "Selling",
    children: [
      { label: "Seller's Guide", href: "/selling/sellers-guide" },
      { label: "Home Worth", href: "/selling/home-worth" },
    ],
  },
  {
    label: "Contact",
    children: [
      { label: "Contact Us", href: "/contact" },
      { label: "About Us", href: "/about" },
    ],
  },
  {
    label: "Visitor's Tools",
    children: [
      { label: "School Rankings", href: "https://www.compareschoolrankings.org/", external: true },
      {
        label: "Useful Links",
        flyout: [
          { label: "Market Watch Report", href: "https://trreb.ca/market-data/market-watch/", external: true },
          { label: "Land Registry", href: "https://www.onland.ca/ui/", external: true },
          { label: "Bank Of Canada", href: "https://www.bank-banque-canada.ca/", external: true },
          { label: "Government of Canada", href: "https://www.canada.ca/", external: true },
          { label: "Government of Ontario", href: "https://www.ontario.ca/", external: true },
        ],
      },
      {
        label: "Blogs",
        flyout: [
          ...blogPosts.map((post) => ({ label: post.title, href: `/blogs/${post.slug}` })),
          { label: "View all blogs →", href: "/blogs" },
        ],
      },
    ],
  },
];
