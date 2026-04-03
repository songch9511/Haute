"use client";

import { motion } from "framer-motion";
import { AnimatedSection, StaggerGroup, StaggerItem, fadeUpVariants } from "@/components/motion";

const items = [
  { label: "Art Direction", count: "24 projects" },
  { label: "Visual Design", count: "47 projects" },
  { label: "Work", count: "63 projects" },
  { label: "Archive", count: "128 entries" },
];

export function FramerPortfolio() {
  return (
    <section className="py-32 px-8 border-y border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-16 items-start">
        <AnimatedSection>
          <span className="text-xs font-medium tracking-widest uppercase text-[#555] block mb-3">
            Portfolio
          </span>
          <h2 className="text-[2rem] md:text-[2.5rem] font-bold leading-[1.08] tracking-tight mb-4">
            Built for creative
            <br />
            portfolios
          </h2>
          <p className="text-base text-[#888] leading-relaxed max-w-[360px]">
            Case studies, galleries, and project archives. Prism handles complex
            layouts that other builders can&apos;t.
          </p>
        </AnimatedSection>

        <div>
          <StaggerGroup className="flex flex-col">
            {items.map((item) => (
              <StaggerItem key={item.label} variants={fadeUpVariants}>
                <motion.div
                  whileHover={{ x: 12, backgroundColor: "rgba(255,255,255,0.02)" }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex items-center justify-between py-6 border-b border-white/[0.06] cursor-pointer group"
                >
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-[#888] transition-colors duration-200">
                    {item.label}
                  </h3>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-[#555] tabular-nums hidden sm:block" style={{ fontVariantNumeric: "tabular-nums" }}>
                      {item.count}
                    </span>
                    <motion.div
                      className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center group-hover:border-[#555] transition-colors duration-150"
                      whileHover={{ scale: 1.02 }}
                    >
                      <svg className="w-4 h-4 text-[#555]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <AnimatedSection delay={0.2} className="mt-8">
            <div className="grid grid-cols-3 gap-3">
              {[1,2,3].map((i) => (
                <div key={i} className="aspect-[3/4] bg-[#111115] rounded-lg border border-white/[0.06] flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/[0.04]" />
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
