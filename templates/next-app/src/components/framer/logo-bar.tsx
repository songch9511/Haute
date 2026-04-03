import { AnimatedSection } from "@/components/motion";

const logos = ["Dribbble", "ElevenLabs", "Zapier", "Perplexity", "Cal.com", "Mixpanel", "Miro", "DoorDash"];

export function FramerLogoBar() {
  return (
    <section className="py-12 px-8 bg-[#0a0a0a] border-b border-white/[0.06]">
      <AnimatedSection className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
        {logos.map((name) => (
          <span
            key={name}
            className="text-sm font-semibold text-[#555] tracking-wide uppercase select-none"
          >
            {name}
          </span>
        ))}
      </AnimatedSection>
    </section>
  );
}
