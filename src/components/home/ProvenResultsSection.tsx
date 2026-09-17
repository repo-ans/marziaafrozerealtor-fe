import Image from "next/image";
import { provenStats } from "@/config/site";
import Reveal from "@/components/motion/Reveal";

export default function ProvenResultsSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <Reveal>
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
              alt="Beautiful home"
              fill
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-plum-600">
            Proven Results
          </p>
          <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
            Whether you are buying your next home or selling your{" "}
            <span className="text-plum-700">current one</span>, Marzia makes
            the process simple, clear, and stress-free.
          </h2>

          <div className="mt-8 space-y-6">
            {provenStats.map((stat, i) => (
              <Reveal key={stat.label} delay={0.1 * i} y={12}>
                <div className="flex items-baseline gap-5 border-b border-black/5 pb-5">
                  <span className="w-20 shrink-0 text-3xl font-bold text-plum-800">
                    {stat.value}
                  </span>
                  <span className="text-sm text-ink-soft">{stat.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
