"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import type { IProperty } from "@/types/property";
import PropertyCard from "@/components/property/PropertyCard";
import Reveal from "@/components/motion/Reveal";

export default function FeaturedListingsSection({
  items,
  eyebrow,
  title,
  subtitle,
  viewAllHref,
  dark = false,
}: {
  items: IProperty[];
  eyebrow: string;
  title: string;
  subtitle?: string;
  viewAllHref: string;
  dark?: boolean;
}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter((p) =>
      [p.UnparsedAddress, p.City, p.PropertyType, p.PropertySubType, p.MlsStatus]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(q))
    );
  }, [items, search]);

  return (
    <section className={dark ? "bg-plum-950 py-20" : "bg-white py-20"}>
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p
                className={`text-sm font-semibold uppercase tracking-[0.15em] ${
                  dark ? "text-white/60" : "text-plum-600"
                }`}
              >
                {eyebrow}
              </p>
              <h2 className={`mt-2 max-w-lg text-2xl font-bold sm:text-3xl ${dark ? "text-white" : "text-ink"}`}>
                {title}
              </h2>
              {subtitle && (
                <p className={`mt-3 max-w-xl text-sm ${dark ? "text-white/60" : "text-ink-soft"}`}>
                  {subtitle}
                </p>
              )}
            </div>

            <div className="relative w-full shrink-0 sm:w-64">
              <Search
                size={16}
                className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 ${
                  dark ? "text-white/30" : "text-ink-soft/40"
                }`}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search listings..."
                className={`w-full rounded-xl border py-2.5 pl-10 pr-10 text-sm transition-colors focus:outline-none ${
                  dark
                    ? "border-white/10 bg-white/5 text-white placeholder-white/30 focus:border-plum-400/60"
                    : "border-black/10 bg-cream text-ink placeholder-ink-soft/50 focus:border-plum-600/60"
                }`}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className={`absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer ${
                    dark ? "text-white/30 hover:text-white" : "text-ink-soft/40 hover:text-ink"
                  }`}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </Reveal>

        {filtered.length === 0 ? (
          <p className={`mt-10 text-center ${dark ? "text-white/50" : "text-ink-soft"}`}>
            {search ? `No listings match "${search}"` : "No listings to show yet."}
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((property, i) => (
              <Reveal key={property.ListingKey} delay={0.08 * (i % 3)} y={20}>
                <PropertyCard property={property} dark={dark} />
              </Reveal>
            ))}
          </div>
        )}

        <Reveal delay={0.1} className="mt-10 text-center">
          <Link
            href={viewAllHref}
            className={`inline-flex items-center gap-2 rounded-full border-2 px-6 py-3 text-sm font-semibold transition ${
              dark
                ? "border-white text-white hover:bg-white hover:text-plum-900"
                : "border-plum-800 text-plum-800 hover:bg-plum-800 hover:text-white"
            }`}
          >
            See All Properties <ArrowRight size={15} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
