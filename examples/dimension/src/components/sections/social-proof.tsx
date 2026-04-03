import { AnimatedSection } from "@/components/motion";

const logos = ["Vercel", "Linear", "Pitch", "Raycast", "Resend"];

export function SocialProof() {
  return (
    <section className="py-16 px-8 border-y border-[var(--border)]">
      <AnimatedSection className="max-w-[1280px] mx-auto flex items-center gap-16 flex-col md:flex-row">
        <span className="text-[0.8125rem] text-[var(--text-tertiary)] whitespace-nowrap shrink-0">
          Trusted by product teams at
        </span>
        <div className="flex gap-12 items-center flex-wrap">
          {logos.map((name) => (
            <span
              key={name}
              className="font-bold text-sm text-[var(--text-tertiary)] tracking-wider uppercase opacity-50"
            >
              {name}
            </span>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
