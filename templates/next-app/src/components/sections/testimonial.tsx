"use client";

import { AnimatedSection, slideLeftVariants, slideRightVariants } from "@/components/motion";

export function Testimonial() {
  return (
    <section className="py-32 px-8 max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-16 items-start" id="customers">
      <AnimatedSection variants={slideLeftVariants} className="pt-4">
        <div className="text-xs font-medium tracking-widest uppercase text-[var(--text-tertiary)] mb-8">
          What teams say
        </div>
        <div className="w-12 h-12 rounded-full bg-[var(--bg-surface)] flex items-center justify-center font-medium text-sm text-[var(--text-secondary)] mb-3">
          EK
        </div>
        <div className="text-sm font-medium text-[var(--text-primary)]">Elena Kowalski</div>
        <div className="text-[0.8125rem] text-[var(--text-tertiary)]">Head of Design, Openframe</div>
      </AnimatedSection>

      <AnimatedSection variants={slideRightVariants} delay={0.1}>
        <blockquote>
          <span className="block text-5xl leading-none text-[var(--text-tertiary)] mb-4">
            &ldquo;
          </span>
          <p className="text-2xl font-normal leading-[1.5] tracking-tight text-[var(--text-primary)] max-w-[640px]">
            We went from a 12-day average review cycle to under 3 days. The biggest
            change wasn&apos;t the tooling &mdash; it was that designers and engineers
            finally had a shared view of what was in progress and what was blocked.
          </p>
        </blockquote>
      </AnimatedSection>
    </section>
  );
}
