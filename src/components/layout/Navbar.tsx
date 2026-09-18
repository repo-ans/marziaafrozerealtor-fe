/* eslint-disable react/no-children-prop */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { siteConfig } from "@/config/site";
import { NAV_STRUCTURE } from "@/config/nav";
import { useDelayedHover } from "@/hooks/useDelayedHover";
import NavDropdown from "@/components/layout/NavDropdown";
import MobileNavAccordion from "@/components/layout/MobileNavAccordion";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { active: hovered, open: openMenu, scheduleClose } = useDelayedHover();

  function isActive(href?: string) {
    if (!href) return false;
    const [path] = href.split("?");
    return pathname === path;
  }

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 pt-4 sm:px-6">
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

        <nav className="hidden items-center gap-0.5 rounded-full border border-white/10 bg-black/35 px-1.5 py-1.5 shadow-lg backdrop-blur-md xl:flex">
          {NAV_STRUCTURE.map((item) => {
            if (!item.children) {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                    active ? "bg-white text-ink" : "text-white/85 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            }

            const active = item.children.some(
              (c) => !("flyout" in c) && isActive(c.href)
            );
            const isOpen = hovered === item.label;

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => openMenu(item.label)}
                onMouseLeave={scheduleClose}
              >
                <button
                  className={`flex cursor-pointer items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition ${
                    active || isOpen ? "bg-white text-ink" : "text-white/85 hover:text-white"
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && <NavDropdown children={item.children} />}
                </AnimatePresence>
              </div>
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
            className="cursor-pointer rounded-full bg-black/35 p-2.5 text-white backdrop-blur-md xl:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm xl:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-50 flex w-[85%] max-w-sm flex-col bg-white shadow-2xl xl:hidden"
            >
              <div className="h-1 w-full bg-gradient-to-r from-plum-800 via-plum-500 to-plum-800" />

              <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-plum-800 text-sm font-semibold text-white">
                    MA
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold text-ink">
                      {siteConfig.agentName}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-plum-600">
                      {siteConfig.agentTitle}
                    </span>
                  </span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-ink-soft transition hover:bg-cream hover:text-ink"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-2">
                <MobileNavAccordion onNavigate={() => setOpen(false)} />
              </div>

              <div className="space-y-2 border-t border-black/5 p-4">
                <a
                  href={`tel:${siteConfig.phoneDigits}`}
                  className="block rounded-full border-2 border-plum-800 py-2.5 text-center text-sm font-semibold text-plum-800 transition hover:bg-plum-800 hover:text-white"
                >
                  {siteConfig.phoneDisplay}
                </a>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-plum-800 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-plum-700"
                >
                  Free Consultation
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
