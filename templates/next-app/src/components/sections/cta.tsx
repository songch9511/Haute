"use client";

import { AnimatedSection, motion, springs } from "@/components/motion";

export function CTA() {
  return (
    <section className="py-32 px-8 max-w-[1280px] mx-auto border-t border-[var(--border)]">
      <AnimatedSection className="max-w-[560px]">
        <h2 className="text-[2.5rem] font-normal leading-[1.15] tracking-tight mb-4">
          Start building your pipeline
        </h2>
        <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-8">
          Free for teams up to 8 people. No credit card required for the first 14 days.
        </p>
        <div className="flex gap-3 flex-col sm:flex-row">
          <input
            type="email"
            placeholder="you@company.com"
            aria-label="Email address"
            className="flex-1 px-4 py-3 min-h-[44px] bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg text-base text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none transition-colors duration-150 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
          />
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={springs.snappy}
            className="px-6 py-3 min-h-[44px] bg-[var(--accent)] text-[var(--bg-primary)] text-base font-medium rounded-lg cursor-pointer border-none focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2"
          >
            Get started
          </motion.button>
        </div>
        <div className="text-xs text-[var(--text-tertiary)] mt-3">
          Setup takes about 4 minutes. Connects to Figma, GitHub, and Linear.
        </div>
      </AnimatedSection>
    </section>
  );
}
