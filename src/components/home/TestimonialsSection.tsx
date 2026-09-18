"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import Reveal from "@/components/motion/Reveal";

const TESTIMONIALS = [
  {
    quote:
      "Marzia was incredibly knowledgeable about the local market. She understood exactly what we were looking for and pointed out important details we would have missed.",
    name: "Shyla",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    quote:
      "From our first meeting to closing day, Marzia made the whole process feel simple and stress-free. Highly recommend her to any first-time buyer.",
    name: "Imran",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote:
      "She negotiated a great price for our home and kept us informed at every step. A true professional.",
    name: "Priya",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote:
      "Marzia's market insight helped us avoid overpaying in a competitive bidding situation. We couldn't be happier with our new home.",
    name: "David",
    photo: "https://randomuser.me/api/portraits/men/54.jpg",
  },
  {
    quote:
      "Responsive, patient, and always honest — exactly what you want in a realtor when buying your first place.",
    name: "Fatima",
    photo: "https://randomuser.me/api/portraits/women/21.jpg",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="overflow-hidden bg-cream py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-plum-600">
            Client Stories
          </p>
          <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
            What Buyers and Sellers Say About Marzia
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <Swiper
            modules={[Autoplay, Pagination, EffectCreative]}
            effect="creative"
            creativeEffect={{
              prev: { translate: ["-20%", 0, -200], opacity: 0 },
              next: { translate: ["20%", 0, -200], opacity: 0 },
            }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true, el: ".testimonial-pagination" }}
            loop
            className="!pb-14"
          >
            {TESTIMONIALS.map((t) => (
              <SwiperSlide key={t.name}>
                <div className="mx-auto max-w-xl px-4">
                  <Quote size={32} className="mx-auto text-plum-500/40" />
                  <div className="mt-4 flex justify-center gap-0.5 text-plum-600">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={14} className="fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-lg italic leading-relaxed text-ink-soft">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-md">
                      <Image
                        src={t.photo}
                        alt={t.name}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <p className="text-sm font-semibold text-ink">{t.name}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="testimonial-pagination mt-2 flex justify-center gap-2 [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:cursor-pointer [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-plum-800/20 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet-active]:w-6 [&_.swiper-pagination-bullet-active]:bg-plum-800" />
        </Reveal>
      </div>
    </section>
  );
}
