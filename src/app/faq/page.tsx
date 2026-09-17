import { faqItems } from "@/config/site";
import FaqAccordion from "@/components/faq/FaqAccordion";
import Reveal from "@/components/motion/Reveal";

export const metadata = { title: "FAQ | Marzia Afroze" };

export default function FaqPage() {
  return (
    <div className="bg-cream pb-20 pt-32">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-[0.15em] text-plum-600">
            Frequently Asked Questions
          </p>
          <h1 className="mt-2 text-center text-3xl font-bold text-ink">
            Answers Before You Ask
          </h1>
        </Reveal>

        <Reveal delay={0.15} className="mt-10">
          <FaqAccordion items={faqItems} />
        </Reveal>
      </div>
    </div>
  );
}
