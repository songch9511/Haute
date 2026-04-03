"use client";

import { AnimatedSection, motion, springs, slideRightVariants } from "@/components/motion";

const chartData = [35, 50, 42, 65, 55, 72, 68, 80, 75, 90, 85, 100];

export function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-8 min-h-dvh px-8 pt-32 pb-24 items-center max-w-[1280px] mx-auto">
      {/* Left: Content */}
      <AnimatedSection className="md:pr-16">
        <span className="inline-block text-xs font-medium tracking-widest uppercase text-[var(--accent)] mb-6">
          Design Operations
        </span>
        <h1 className="text-[2.75rem] md:text-[3.5rem] font-normal leading-[1.15] tracking-tight mb-6" style={{ fontFamily: "var(--font-sans)" }}>
          Ship design work
          <br />
          without the <em className="italic text-[var(--accent)]">bottleneck</em>
        </h1>
        <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-[560px]">
          Clearpath connects your design tools, review workflows, and handoff process
          into a single pipeline. Teams using Clearpath reduce their design-to-deploy
          cycle by 47%.
        </p>
        <div className="flex gap-4 items-center flex-wrap">
          <motion.a
            href="#"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={springs.snappy}
            className="inline-flex items-center px-6 py-3 min-h-[44px] bg-[var(--accent)] text-[var(--bg-primary)] text-base font-medium rounded-lg no-underline focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2"
          >
            Start free trial
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={springs.snappy}
            className="inline-flex items-center px-6 py-3 min-h-[44px] border border-[var(--border)] text-[var(--text-primary)] text-base font-medium rounded-lg no-underline focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2"
          >
            Watch a 3-min demo
          </motion.a>
        </div>
      </AnimatedSection>

      {/* Right: Visual card */}
      <AnimatedSection variants={slideRightVariants} delay={0.15}>
        <div className="w-full aspect-[4/3] bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[2.5rem] font-normal tracking-tight leading-[1.1]" style={{ fontVariantNumeric: "tabular-nums" }}>
                14,729
              </div>
              <div className="text-[0.8125rem] text-[var(--text-tertiary)] mt-1">
                Components shipped this month
              </div>
            </div>
            <span className="text-xs font-medium text-[var(--accent)] bg-[rgba(34,197,94,0.1)] px-2.5 py-0.5 rounded">
              +23.4%
            </span>
          </div>
          <div className="h-16 flex items-end gap-[3px]">
            {chartData.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-[var(--accent)] rounded-t-sm"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: `${h}%`, opacity: 0.6 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
