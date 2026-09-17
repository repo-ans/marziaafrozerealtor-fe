import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import { siteConfig } from "@/config/site";
import Reveal from "@/components/motion/Reveal";

export const metadata = { title: "Contact | Marzia Afroze" };

export default function ContactPage() {
  return (
    <div className="bg-plum-950 pb-20 pt-32">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-white/60">
            Get In Touch
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">Contact Me</h1>
          <p className="mt-3 text-white/60">
            Have a question about buying, selling, or a specific listing?
            Send a message and I&apos;ll respond as soon as possible.
          </p>

          <ul className="mt-8 space-y-4 text-sm text-white/80">
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-white" /> {siteConfig.phoneDisplay}
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-white" /> {siteConfig.email}
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={16} className="text-white" /> {siteConfig.address.full}
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
