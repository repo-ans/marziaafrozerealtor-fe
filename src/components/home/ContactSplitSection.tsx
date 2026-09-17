import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import Reveal from "@/components/motion/Reveal";

export default function ContactSplitSection() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    siteConfig.address.full
  )}&output=embed`;

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="grid overflow-hidden rounded-2xl shadow-xl lg:grid-cols-2">
            <div className="relative flex flex-col justify-end bg-plum-800 p-10">
              <div className="absolute inset-0">
                <Image
                  src="/marzia.jpg"
                  alt={siteConfig.agentName}
                  fill
                  className="object-cover opacity-30"
                />
              </div>
              <div className="relative">
                <p className="font-script text-4xl text-white">
                  Contact {siteConfig.agentName.split(" ")[0]}
                </p>
                <p className="mt-3 max-w-xs text-sm text-white/70">
                  Reach out any time — by phone, email, or WhatsApp — and
                  let&apos;s talk about your next move.
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="relative h-56 w-full">
                <iframe
                  src={mapSrc}
                  className="h-full w-full border-0"
                  loading="lazy"
                  title="Office location"
                />
              </div>

              <div className="flex flex-1 flex-col justify-center gap-4 bg-plum-900 p-8 text-white">
                <div className="flex items-start gap-3 text-sm">
                  <MapPin size={16} className="mt-0.5 shrink-0" />
                  <span>{siteConfig.address.full}</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Phone size={16} className="mt-0.5 shrink-0" />
                  <a href={`tel:${siteConfig.phoneDigits}`}>{siteConfig.phoneDisplay}</a>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Mail size={16} className="mt-0.5 shrink-0" />
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                </div>

                <div className="mt-2 flex flex-wrap gap-3">
                  <a
                    href={`https://www.google.com/maps?q=${encodeURIComponent(
                      siteConfig.address.full
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold transition hover:bg-white/20"
                  >
                    Get Directions
                  </a>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold transition hover:bg-white/20"
                  >
                    Send an Email
                  </a>
                  <a
                    href={`tel:${siteConfig.phoneDigits}`}
                    className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-plum-800 transition hover:bg-white/90"
                  >
                    Call Me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
