"use client";

import { motion } from "@/components/motion";

const STEPS = [
  {
    n: "I",
    title: "Pull",
    body:
      "The agent reads sum.md and a matched cluster. Past taste becomes the first anchor — visual, structural, semantic.",
  },
  {
    n: "II",
    title: "Plan",
    body: "Measurable acceptance criteria per section. No code until the spec is approved.",
  },
  {
    n: "III",
    title: "Generate",
    body:
      "Section by section with active memory context. Per-section verification as the work unfolds.",
  },
  {
    n: "IV",
    title: "Oracle",
    body: "Visual, Code, and Mechanical lanes pass judgment. Composite renormalizes when a lane is absent.",
  },
  {
    n: "V",
    title: "Push",
    body:
      "The shipped entry enters memory. The cluster grows. The next session retrieves stronger anchors.",
  },
];

export function UdHowItWorks() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-12 gap-6 items-baseline"
        >
          <span className="col-span-12 md:col-span-2 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#8a3a1e]">
            N° III · Method
          </span>
          <h2 className="col-span-12 md:col-span-9 font-[family-name:var(--font-cormorant)] font-semibold text-[44px] md:text-[68px] leading-[0.96] tracking-[-0.02em] text-[#120e08]">
            Five <em className="italic text-[#8a3a1e]">movements,</em>
            <br />
            none of them optional.
          </h2>
        </motion.div>
      </div>

      {/* Horizontal scroll strip — centered editorial columns, scroll only when overflowed */}
      <div className="max-w-[1360px] mx-auto overflow-x-auto snap-x snap-mandatory scroll-pl-6 md:scroll-pl-12 pb-6 px-6 md:px-12">
        <div className="flex gap-0 items-start justify-start md:justify-center">
          {STEPS.map((step, i) => (
            <motion.figure
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="snap-start w-[240px] md:w-[248px] shrink-0 flex flex-col pr-6 md:pr-7 pl-6 md:pl-7 border-l border-[#c4ae82]"
            >
              <div className="mb-6 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.24em] text-[#8a3a1e]">
                Movement · <span className="text-[#6b5a4a]">{step.n}</span>
              </div>
              <h3 className="font-[family-name:var(--font-cormorant)] font-semibold text-[38px] md:text-[44px] leading-[0.96] tracking-[-0.02em] text-[#120e08]">
                {step.title}
              </h3>
              <p className="mt-5 text-[14px] md:text-[15px] leading-[1.65] text-[#2a1d10] font-[family-name:var(--font-geist-sans)] max-w-[32ch]">
                {step.body}
              </p>
            </motion.figure>
          ))}
          <div className="shrink-0 w-6 md:w-12" aria-hidden />
        </div>
      </div>
    </section>
  );
}
