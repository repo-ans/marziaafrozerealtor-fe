"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { NAV_STRUCTURE, isFlyout } from "@/config/nav";

export default function MobileNavAccordion({ onNavigate }: { onNavigate: () => void }) {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [openChild, setOpenChild] = useState<string | null>(null);

  return (
    <div className="divide-y divide-black/5 px-2">
      {NAV_STRUCTURE.map((item) => {
        if (!item.children) {
          return (
            <Link
              key={item.label}
              href={item.href!}
              onClick={onNavigate}
              className="block rounded-lg px-3 py-3 text-sm font-semibold text-ink transition hover:bg-cream"
            >
              {item.label}
            </Link>
          );
        }

        const isOpen = openItem === item.label;
        return (
          <div key={item.label}>
            <button
              onClick={() => setOpenItem(isOpen ? null : item.label)}
              className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold transition ${
                isOpen ? "text-plum-800" : "text-ink hover:bg-cream"
              }`}
            >
              {item.label}
              <ChevronDown
                size={16}
                className={`text-plum-600 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="ml-3 border-l-2 border-plum-800/15 py-1 pl-3">
                  {item.children.map((child) => {
                    if (isFlyout(child)) {
                      const childOpen = openChild === child.label;
                      return (
                        <div key={child.label}>
                          <button
                            onClick={() => setOpenChild(childOpen ? null : child.label)}
                            className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-2 py-2.5 text-sm font-medium transition ${
                              childOpen ? "text-plum-700" : "text-ink/75 hover:bg-cream"
                            }`}
                          >
                            {child.label}
                            <ChevronDown
                              size={14}
                              className={`transition-transform duration-300 ${
                                childOpen ? "rotate-180 text-plum-600" : "text-ink-soft/40"
                              }`}
                            />
                          </button>
                          <div
                            className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                              childOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                            }`}
                          >
                            <div className="min-h-0 overflow-hidden">
                              <div className="ml-3 flex flex-col border-l border-plum-800/10 pb-1 pl-3">
                                {child.flyout.map((leaf) => (
                                  <Link
                                    key={leaf.href}
                                    href={leaf.href}
                                    target={leaf.external ? "_blank" : undefined}
                                    rel={leaf.external ? "noreferrer" : undefined}
                                    onClick={onNavigate}
                                    className="rounded-lg px-2 py-2 text-sm text-ink-soft transition hover:bg-cream hover:text-ink"
                                  >
                                    {leaf.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        target={child.external ? "_blank" : undefined}
                        rel={child.external ? "noreferrer" : undefined}
                        onClick={onNavigate}
                        className="block rounded-lg px-2 py-2.5 text-sm text-ink/75 transition hover:bg-cream hover:text-ink"
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
