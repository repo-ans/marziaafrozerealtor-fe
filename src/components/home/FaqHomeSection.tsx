import Image from "next/image";
import Link from "next/link";
import { faqItems } from "@/config/site";
import FaqAccordion from "@/components/faq/FaqAccordion";
import Reveal from "@/components/motion/Reveal";

export default function FaqHomeSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <Reveal>
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1560518883-620f2a55c644?q=80&w=1200&auto=format&fit=crop"
              alt="Happy new homeowners"
              fill
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-plum-600">
            Frequently Asked Questions
          </p>
          <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
            Answers Before You Ask
          </h2>

          <div className="mt-6">
            <FaqAccordion items={faqItems.slice(0, 4)} />
          </div>

          <Link
            href="/faq"
            className="mt-6 inline-block rounded-full border-2 border-plum-800 px-6 py-2.5 text-sm font-semibold text-plum-800 transition hover:bg-plum-800 hover:text-white"
          >
            View All Questions
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
