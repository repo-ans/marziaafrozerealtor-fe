import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Star } from "lucide-react";
import { siteConfig } from "@/config/site";
import RevealText from "@/components/motion/RevealText";
import Reveal from "@/components/motion/Reveal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-plum-950">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1920&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-linear-to-r from-plum-950/95 via-plum-950/75 to-plum-950/40" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
            <RevealText text={siteConfig.heroHeadline} />
          </h1>
          <Reveal delay={0.5}>
            <p className="mt-5 max-w-md text-white/75">{siteConfig.heroSubtext}</p>
          </Reveal>

          <Reveal delay={0.65}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full border-2 border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-plum-800"
              >
                Free Consultation
              </Link>
              <a
                href={`https://wa.me/${siteConfig.whatsapp.replace("+", "")}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-plum-800 transition hover:bg-white/90"
              >
                Book a Meeting
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.8}>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-white">
                <Star size={18} className="fill-current text-white" />
                <span className="text-sm">5-Star Rated Service</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <ShieldCheck size={18} />
                <span className="text-sm">TRREB Trusted Realtor®</span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3} y={40} className="relative mx-auto w-full max-w-sm">
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl border-4 border-white/20 shadow-2xl">
            <Image
              src="/marzia.jpg"
              alt={siteConfig.agentName}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-5 left-1/2 w-11/12 -translate-x-1/2 rounded-xl bg-white px-5 py-3 text-center shadow-xl">
            <p className="text-sm font-semibold text-ink">{siteConfig.agentName}</p>
            <p className="text-xs text-plum-600">
              {siteConfig.agentTitle} · {siteConfig.brokerage}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
