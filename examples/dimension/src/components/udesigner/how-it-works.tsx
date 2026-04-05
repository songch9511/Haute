"use client";

import { motion } from "@/components/motion";

const STEPS = [
  {
    n: "01",
    title: "Pull",
    body: "Agent reads sum.md + matched cluster. Past taste becomes the first anchor.",
  },
  {
    n: "02",
    title: "Plan",
    body: "Measurable acceptance criteria per section. No code until approved.",
  },
  {
    n: "03",
    title: "Generate",
    body: "Section by section with Active Memory Context. Per-section quick verify.",
  },
  {
    n: "04",
    title: "Oracle",
    body: "Visual + Code + Mechanical lanes run independent. Composite with renormalization.",
  },
  {
    n: "05",
    title: "Push",
    body: "Shipped entry → Memory. Cluster grows. Next session retrieves stronger anchors.",
  },
];

export function UdHowItWorks() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.14em] text-[#4a4a4a]">
            // flow
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-geist-mono)] text-3xl md:text-5xl tracking-[-0.02em] text-[#f5f5f5] max-w-2xl">
            Five phases.
            <br />
            <span className="text-[#4a4a4a]">No step is optional above trivial.</span>
          </h2>
        </motion.div>
      </div>

      {/* Horizontal scroll strip */}
      <div className="overflow-x-auto snap-x snap-mandatory scroll-pl-6 md:scroll-pl-12 pb-6 px-6 md:px-12">
        <div className="flex gap-5 w-max">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="snap-start w-[300px] md:w-[340px] shrink-0 rounded-[12px] border border-white/[0.08] bg-white/[0.02] p-7 hover:border-white/[0.18] transition-colors duration-200"
            >
              <div className="flex items-baseline justify-between mb-6">
                <span className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.14em] text-[#4a4a4a]">
                  phase
                </span>
                <span className="font-[family-name:var(--font-geist-mono)] text-4xl tabular-nums text-[#4a4a4a]">
                  {step.n}
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-geist-mono)] text-2xl text-[#f5f5f5] mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-[#8a8a8a] text-[14px] leading-relaxed">
                {step.body}
              </p>
            </motion.div>
          ))}
          {/* trailing spacer so last card can snap flush */}
          <div className="shrink-0 w-6 md:w-12" aria-hidden />
        </div>
      </div>
    </section>
  );
}
