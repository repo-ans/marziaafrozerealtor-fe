import Image from "next/image";
import { Star } from "lucide-react";
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
];

export default function TestimonialsSection() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-plum-600">
            Client Stories
          </p>
          <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
            What Buyers and Sellers Say About Marzia
          </h2>

          <div className="mt-10 flex justify-center gap-3">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-white shadow-md"
              >
                <Image src={t.photo} alt={t.name} fill unoptimized className="object-cover" />
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 space-y-10">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={0.1 * i}>
              <div className="mb-2 flex justify-center gap-0.5 text-plum-600">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={14} className="fill-current" />
                ))}
              </div>
              <p className="italic leading-relaxed text-ink-soft">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-3 text-sm font-semibold text-ink">{t.name}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
