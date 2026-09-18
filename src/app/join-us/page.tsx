import { CheckCircle2 } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import LeadForm from "@/components/contact/LeadForm";
import { siteConfig } from "@/config/site";

export const metadata = { title: "Join Dream Valley Realty | Marzia Afroze" };

const REASONS = [
  "Full access to the TRREB MLS® board through AMPRE's IDX/DLA/VOW data feeds",
  "Marketing support and a personal agent website, like this one",
  "Two Toronto-area office locations — Scarborough and Danforth",
  "Transparent commission structure with no hidden desk fees",
  "A collaborative team culture, not a numbers-only brokerage",
  "Ongoing training on market trends, negotiation, and lead generation",
];

const AGENT_TYPES = [
  {
    title: "New Agents",
    body: "Just licensed? Get hands-on mentorship, lead support, and the tools you need to close your first deals with confidence.",
  },
  {
    title: "Experienced Agents",
    body: "Bring your book of business to a brokerage that invests in your marketing and gets out of your way otherwise.",
  },
  {
    title: "Brokers & Teams",
    body: "Looking to bring a team over? Let's talk about how Dream Valley Realty can support your group's growth.",
  },
];

export default function JoinUsPage() {
  return (
    <div className="bg-cream pb-20 pt-32">
      <div className="bg-plum-950 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-white/60">
            Careers
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            Join {siteConfig.brokerage}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Marzia is proud to be part of Dream Valley Realty — if you&apos;re a
            licensed agent in Ontario considering a change, here&apos;s why it might
            be worth a conversation.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-14">
        <Reveal>
          <h2 className="text-xl font-bold text-ink">Why agents choose Dream Valley Realty</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {REASONS.map((reason) => (
              <li key={reason} className="flex items-start gap-2.5 text-sm text-ink-soft">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-plum-600" />
                {reason}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <h2 className="text-xl font-bold text-ink">Find your fit</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {AGENT_TYPES.map((type) => (
              <div
                key={type.title}
                className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm"
              >
                <h3 className="font-semibold text-plum-800">{type.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{type.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-14">
          <h2 className="text-xl font-bold text-ink">Start the conversation</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Reach out and Marzia or the Dream Valley Realty team will follow up.
          </p>
          <div className="mt-5">
            <LeadForm topic="Join Dream Valley Realty" buttonLabel="Send Inquiry" />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
