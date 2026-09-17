import Image from "next/image";
import ContactForm from "@/components/contact/ContactForm";
import { siteConfig } from "@/config/site";
import Reveal from "@/components/motion/Reveal";

export default function FinalCtaSection() {
  return (
    <section className="bg-plum-900">
      <div className="mx-auto grid max-w-6xl items-stretch gap-0 lg:grid-cols-2">
        <Reveal className="relative min-h-[320px] w-full">
          <Image
            src="/marzia.jpg"
            alt={siteConfig.agentName}
            fill
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={0.15} className="p-10 sm:p-14">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Let&apos;s Talk About Your Next Move
          </h2>
          <p className="mt-3 max-w-sm text-sm text-white/70">
            Whether you&apos;re just starting to think about buying or ready
            to list your home, Marzia is here to help.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
