import Link from "next/link";
import { featuredCities } from "@/config/site";
import Reveal from "@/components/motion/Reveal";

export default function SearchByCitySection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-[0.15em] text-plum-600">
            Explore Neighbourhoods
          </p>
          <h2 className="mb-10 mt-2 text-center text-2xl font-bold text-ink sm:text-3xl">
            Search By City
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featuredCities.map((city, i) => (
            <Reveal key={city} delay={0.05 * (i % 4)} y={16}>
              <Link
                href={`/listings?city=${encodeURIComponent(city)}`}
                className="group relative flex h-32 items-end overflow-hidden rounded-xl bg-plum-900 p-4"
              >
                <div className="absolute inset-0 bg-linear-to-t from-plum-950/90 to-plum-900/20 transition group-hover:from-plum-950" />
                <span className="relative text-base font-semibold text-white">{city}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
