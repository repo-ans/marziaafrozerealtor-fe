"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { siteConfig } from "@/config/site";

const LISTING_LINKS = [
  { label: "All Listings", href: "/listings" },
  { label: "Residential", href: "/listings?type=residential" },
  { label: "Condo", href: "/listings?type=condo" },
  { label: "Commercial", href: "/listings?type=commercial" },
  { label: "Open Houses", href: "/listings?type=open-houses" },
  { label: "Pre-Construction", href: "/listings?type=pre-construction" },
  { label: "My Listings", href: "/my-listings" },
  { label: "Office Listings", href: "/office-listings" },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

const TRAILING_LINKS = [
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [listingsOpen, setListingsOpen] = useState(false);

  const isListingsActive = pathname.startsWith("/listings") || pathname === "/my-listings" || pathname === "/office-listings";

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 pt-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-full border border-white/10 bg-black/35 py-1.5 pl-1.5 pr-4 shadow-lg backdrop-blur-md"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-plum-700 text-xs font-semibold text-white">
            MA
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-semibold text-white">{siteConfig.agentName}</span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-white/60">
              {siteConfig.agentTitle}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/35 px-1.5 py-1.5 shadow-lg backdrop-blur-md lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active ? "bg-white text-ink" : "text-white/85 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div
            className="relative"
            onMouseEnter={() => setListingsOpen(true)}
            onMouseLeave={() => setListingsOpen(false)}
          >
            <button
              className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition ${
                isListingsActive ? "bg-white text-ink" : "text-white/85 hover:text-white"
              }`}
            >
              Listings <ChevronDown size={14} />
            </button>
            {listingsOpen && (
              <div className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-black/5 bg-white p-2 shadow-xl">
                {LISTING_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-lg px-3 py-2 text-sm text-ink/80 transition hover:bg-cream hover:text-plum-700"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {TRAILING_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active ? "bg-white text-ink" : "text-white/85 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-full bg-plum-800 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-plum-700 sm:block"
          >
            Free Consultation
          </Link>
          <button
            className="rounded-full bg-black/35 p-2.5 text-white backdrop-blur-md lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-4 mt-2 rounded-2xl border border-black/5 bg-white p-3 shadow-xl lg:hidden">
          {[...NAV_LINKS, ...LISTING_LINKS, ...TRAILING_LINKS].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm text-ink/80 hover:bg-cream"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-plum-800 px-4 py-2.5 text-center text-sm font-semibold text-white"
          >
            Free Consultation
          </Link>
        </div>
      )}
    </motion.header>
  );
}
