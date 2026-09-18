"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { featuredCities } from "@/config/cities";
import Reveal from "@/components/motion/Reveal";

export default function SearchByCitySection() {
  return (
    <section className="overflow-hidden bg-white py-20">
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
            <Reveal key={city.name} delay={0.06 * i} y={24}>
              <motion.div whileHover="hover" initial="rest" animate="rest" className="group">
                <Link
                  href={`/listings?city=${encodeURIComponent(city.name)}`}
                  className="relative flex h-36 items-end overflow-hidden rounded-2xl shadow-sm sm:h-44"
                >
                  <motion.div
                    variants={{ rest: { scale: 1 }, hover: { scale: 1.12 } }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={city.image}
                      alt={city.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>

                  <motion.div
                    variants={{
                      rest: { opacity: 0.55 },
                      hover: { opacity: 0.75 },
                    }}
                    className="absolute inset-0 bg-gradient-to-t from-plum-950 via-plum-950/20 to-transparent"
                  />

                  <div className="relative flex w-full items-center justify-between p-4">
                    <span className="text-base font-semibold text-white drop-shadow-sm">
                      {city.name}
                    </span>
                    <motion.span
                      variants={{
                        rest: { opacity: 0, x: -4, scale: 0.8 },
                        hover: { opacity: 1, x: 0, scale: 1 },
                      }}
                      transition={{ duration: 0.25 }}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-plum-800"
                    >
                      <ArrowUpRight size={15} />
                    </motion.span>
                  </div>
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
