import Link from "next/link";
import { fetchProperties } from "@/lib/ampre";
import type { PropertySource } from "@/types/property";
import PropertyCard from "@/components/property/PropertyCard";
import Reveal from "@/components/motion/Reveal";

export default async function FeaturedRow({
  source,
  eyebrow,
  title,
  subtitle,
  viewAllHref,
  dark = false,
}: {
  source: PropertySource;
  eyebrow: string;
  title: string;
  subtitle?: string;
  viewAllHref: string;
  dark?: boolean;
}) {
  const { items } = await fetchProperties({ source, page: 1, pageSize: 6 });

  return (
    <section className={dark ? "bg-plum-950 py-20" : "bg-white py-20"}>
      <div className="mx-auto max-w-6xl px-6 text-center">
        <Reveal>
          <p className={`text-sm font-semibold uppercase tracking-[0.15em] ${dark ? "text-white/60" : "text-plum-600"}`}>
            {eyebrow}
          </p>
          <h2 className={`mx-auto mt-2 max-w-lg text-2xl font-bold sm:text-3xl ${dark ? "text-white" : "text-ink"}`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`mx-auto mt-3 max-w-xl text-sm ${dark ? "text-white/60" : "text-ink-soft"}`}>
              {subtitle}
            </p>
          )}
        </Reveal>

        {items.length === 0 ? (
          <p className={`mt-10 ${dark ? "text-white/50" : "text-ink-soft"}`}>
            No listings to show yet.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
            {items.map((property, i) => (
              <Reveal key={property.ListingKey} delay={0.08 * (i % 3)} y={20}>
                <PropertyCard property={property} />
              </Reveal>
            ))}
          </div>
        )}

        <Reveal delay={0.1}>
          <Link
            href={viewAllHref}
            className={`mt-10 inline-block rounded-full border-2 px-6 py-3 text-sm font-semibold transition ${
              dark
                ? "border-white text-white hover:bg-white hover:text-plum-900"
                : "border-plum-800 text-plum-800 hover:bg-plum-800 hover:text-white"
            }`}
          >
            See All Properties
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
