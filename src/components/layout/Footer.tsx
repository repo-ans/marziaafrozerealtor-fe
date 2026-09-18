import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

const EXPLORE_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Marzia", href: "/about" },
  { label: "All Listings", href: "/listings" },
  { label: "My Listings", href: "/listings?source=mine" },
  { label: "Office Listings", href: "/listings?source=office" },
  { label: "Blog", href: "/blogs" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const SERVICE_LINKS = [
  { label: "Buyer's Guide", href: "/buying/buyers-guide" },
  { label: "First-Time Buyers", href: "/buying/first-time-buyers" },
  { label: "Seller's Guide", href: "/selling/sellers-guide" },
  { label: "Home Worth", href: "/selling/home-worth" },
  { label: "New Listing Alerts", href: "/buying/new-listing-alerts" },
  { label: "Join Dream Valley Realty", href: "/join-us" },
];

export default function Footer() {
  return (
    <footer className="bg-plum-950 text-white/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
              MA
            </span>
            <span className="text-base font-semibold text-white">
              {siteConfig.agentName}
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed">
            Real estate advice you can trust — helping buyers and sellers
            across the Greater Toronto Area with clear guidance and honest
            communication, every step of the way.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Explore
          </h3>
          <ul className="space-y-2 text-sm">
            {EXPLORE_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Guides
          </h3>
          <ul className="space-y-2 text-sm">
            {SERVICE_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5 shrink-0 text-white" />
              <a href={`tel:${siteConfig.phoneDigits}`}>{siteConfig.phoneDisplay}</a>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5 shrink-0 text-white" />
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-white" />
              <span>{siteConfig.address.full}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        <p>
          © {new Date().getFullYear()} {siteConfig.agentName}. All rights reserved. ·
          MLS® listings courtesy of the Toronto Regional Real Estate Board.
        </p>
        <p className="mt-1">
          Designed &amp; developed by © {new Date().getFullYear()}{" "}
          <a
            href="https://aniyanetworks.net/"
            target="_blank"
            rel="noreferrer"
            className="text-white/60 transition hover:text-white"
          >
            Aniya Network Solutions Inc.
          </a>
        </p>
      </div>
    </footer>
  );
}
