import Image from "next/image";
import { siteConfig } from "@/config/site";
import Reveal from "@/components/motion/Reveal";

export const metadata = { title: "About Me | Marzia Afroze" };

export default function AboutPage() {
  return (
    <div className="bg-cream pb-20 pt-32">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 lg:grid-cols-2">
        <Reveal className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-full border-4 border-plum-800/20">
          <Image
            src="/marzia.jpg"
            alt={siteConfig.agentName}
            fill
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-plum-600">
            About Me
          </p>
          <h1 className="mt-2 text-3xl font-bold text-ink">{siteConfig.agentName}</h1>
          <p className="mt-1 text-sm font-medium text-plum-700">
            {siteConfig.agentTitle} — {siteConfig.brokerage}
          </p>

          <p className="mt-6 leading-relaxed text-ink-soft">
            Buying or selling a property is one of the biggest decisions
            you&apos;ll make, and having the right real estate professional by
            your side makes all the difference. I&apos;m committed to
            providing personalized guidance tailored to your goals,
            preferences, and the local Greater Toronto Area market — whether
            you&apos;re searching for your first home, upgrading to a larger
            property, or exploring investment opportunities.
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            As part of {siteConfig.brokerage}, I have access to the full
            Toronto Regional Real Estate Board (TRREB) MLS® system, meaning
            you get complete, up-to-date market information every step of the
            way.
          </p>

          <a
            href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}`}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block rounded-full bg-plum-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-plum-700"
          >
            Start a Conversation
          </a>
        </Reveal>
      </div>
    </div>
  );
}
