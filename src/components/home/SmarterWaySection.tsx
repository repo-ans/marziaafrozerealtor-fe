"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { smarterWaySteps } from "@/config/site";
import Reveal from "@/components/motion/Reveal";

export default function SmarterWaySection() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-cream py-20">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-plum-600">
            Smart Guidance
          </p>
          <h2 className="mt-2 max-w-md text-2xl font-bold text-ink sm:text-3xl">
            A Smarter Way to Buy and Sell Real Estate
          </h2>

          <div className="mt-8 divide-y divide-black/10 border-y border-black/10">
            {smarterWaySteps.map((step, i) => {
              const isOpen = active === i;
              return (
                <div key={step.number}>
                  <button
                    onClick={() => setActive(isOpen ? -1 : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="flex items-center gap-4">
                      <span className="text-sm font-semibold text-plum-600">
                        {step.number}
                      </span>
                      <span className="text-base font-semibold text-ink">{step.title}</span>
                    </span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-plum-600 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <p className="min-h-0 pb-5 text-sm leading-relaxed text-ink-soft">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop"
                alt="Handing over keys"
                fill
                className="object-cover"
              />
            </div>
            <Link
              href="/contact"
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-plum-800 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-plum-700"
            >
              Get Confidence
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
