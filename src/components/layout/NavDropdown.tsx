"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { isFlyout, type NavChild } from "@/config/nav";
import { useDelayedHover } from "@/hooks/useDelayedHover";

const panelMotion = {
  initial: { opacity: 0, y: -6, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -6, scale: 0.98 },
  transition: { duration: 0.16, ease: [0.22, 1, 0.36, 1] as const },
};

const linkClass =
  "group/link flex items-center gap-2.5 rounded-lg border border-transparent px-3 py-2.5 text-sm text-ink/75 transition-all duration-150 hover:translate-x-0.5 hover:border-plum-800/15 hover:bg-plum-800/[0.06] hover:text-plum-800";

function LinkDot() {
  return (
    <span className="h-1 w-1 shrink-0 rounded-full bg-plum-600 opacity-0 transition-opacity duration-150 group-hover/link:opacity-100" />
  );
}

// Note: the panel below deliberately does NOT use `overflow-hidden` — the
// nested flyout submenu is absolutely positioned outside this panel's own
// box (left-full), and overflow-hidden on an ancestor would clip it. The
// rounded gradient top-bar is done as an absolute overlay instead, so it
// doesn't need clipping to respect the corner radius.
function PanelCard({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-64 rounded-xl border border-plum-800/15 bg-white shadow-xl shadow-plum-950/10">
      <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-xl bg-gradient-to-r from-plum-800 via-plum-500 to-transparent" />
      <div className="p-2 pt-2.5">{children}</div>
    </div>
  );
}

export default function NavDropdown({ children }: { children: NavChild[] }) {
  const { active: flyoutOpen, open: openFlyout, scheduleClose } = useDelayedHover();

  return (
    <motion.div {...panelMotion} className="absolute left-0 top-full pt-2">
      <PanelCard>
        {children.map((child) =>
          isFlyout(child) ? (
            <div
              key={child.label}
              className="relative"
              onMouseEnter={() => openFlyout(child.label)}
              onMouseLeave={scheduleClose}
            >
              <button
                className={`w-full cursor-pointer justify-between ${linkClass} ${
                  flyoutOpen === child.label ? "border-plum-800/15 bg-plum-800/[0.06] text-plum-800" : ""
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <LinkDot />
                  {child.label}
                </span>
                <ChevronRight
                  size={14}
                  className={`transition-transform duration-150 ${
                    flyoutOpen === child.label ? "translate-x-0.5 text-plum-700" : "text-ink-soft/50"
                  }`}
                />
              </button>
              <AnimatePresence>
                {flyoutOpen === child.label && (
                  <motion.div {...panelMotion} className="absolute left-full top-0 pl-1">
                    <PanelCard>
                      {child.flyout.map((leaf) => (
                        <Link
                          key={leaf.href}
                          href={leaf.href}
                          target={leaf.external ? "_blank" : undefined}
                          rel={leaf.external ? "noreferrer" : undefined}
                          className={linkClass}
                        >
                          <LinkDot />
                          {leaf.label}
                        </Link>
                      ))}
                    </PanelCard>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              key={child.href}
              href={child.href}
              target={child.external ? "_blank" : undefined}
              rel={child.external ? "noreferrer" : undefined}
              className={linkClass}
            >
              <LinkDot />
              {child.label}
            </Link>
          )
        )}
      </PanelCard>
    </motion.div>
  );
}
