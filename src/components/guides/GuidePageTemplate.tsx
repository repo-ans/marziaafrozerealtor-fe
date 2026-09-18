import Reveal from "@/components/motion/Reveal";
import LeadForm from "@/components/contact/LeadForm";

export interface GuideSection {
  heading: string;
  body: string[];
}

export interface GuidePageContent {
  eyebrow: string;
  title: string;
  intro: string;
  sections: GuideSection[];
  formTopic: string;
  formTitle: string;
  formNote?: string;
  formButtonLabel?: string;
}

export default function GuidePageTemplate({ content }: { content: GuidePageContent }) {
  return (
    <div className="bg-cream pb-20 pt-32">
      <div className="bg-plum-950 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-white/60">
            {content.eyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{content.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">{content.intro}</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-14">
        <div className="space-y-10">
          {content.sections.map((section, i) => (
            <Reveal key={section.heading} delay={0.05 * i}>
              <h2 className="text-xl font-bold text-ink">{section.heading}</h2>
              <div className="mt-3 space-y-3">
                {section.body.map((p, j) => (
                  <p key={j} className="leading-relaxed text-ink-soft">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-14">
          <h2 className="text-xl font-bold text-ink">{content.formTitle}</h2>
          {content.formNote && (
            <p className="mt-2 text-sm text-ink-soft">{content.formNote}</p>
          )}
          <div className="mt-5">
            <LeadForm
              topic={content.formTopic}
              buttonLabel={content.formButtonLabel}
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
