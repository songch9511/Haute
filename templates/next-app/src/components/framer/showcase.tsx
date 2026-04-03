"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedSection, StaggerGroup, StaggerItem, scaleInVariants } from "@/components/motion";

const showcaseSites = [
  { name: "Meridian Labs", tag: "SaaS Platform", bg: "#0f172a", accent: "#38bdf8", textColor: "#e2e8f0" },
  { name: "Haptic Studio", tag: "Agency Portfolio", bg: "#fef3c7", accent: "#92400e", textColor: "#78350f" },
  { name: "Clearpath", tag: "Developer Tools", bg: "#111827", accent: "#34d399", textColor: "#d1fae5" },
  { name: "Openframe", tag: "AI Platform", bg: "#1e1b4b", accent: "#a78bfa", textColor: "#c4b5fd" },
  { name: "Dovetail", tag: "E-commerce", bg: "#f8fafc", accent: "#0f172a", textColor: "#334155" },
  { name: "Canopy Health", tag: "Healthcare", bg: "#022c22", accent: "#6ee7b7", textColor: "#a7f3d0" },
];

export function FramerShowcase() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={ref} className="relative py-32 px-8 bg-[#0a0a0a] text-white overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute top-[-5%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#1a1a2e] blur-[100px] pointer-events-none"
      />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <AnimatedSection className="text-center max-w-[600px] mx-auto mb-16">
          <span className="text-xs font-medium tracking-widest uppercase text-[#555] block mb-3">
            Showcase
          </span>
          <h2 className="text-[2rem] md:text-[2.5rem] font-bold leading-[1.08] tracking-tight mb-4">
            Sites built with Prism
          </h2>
          <p className="text-base text-[#888] leading-relaxed">
            From personal portfolios to enterprise marketing — see what teams are shipping.
          </p>
        </AnimatedSection>

        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {showcaseSites.map((site) => (
            <StaggerItem key={site.name} variants={scaleInVariants}>
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                className="rounded-xl overflow-hidden cursor-pointer group border border-white/[0.06]"
              >
                {/* Site preview placeholder */}
                <div
                  className="aspect-[16/10] p-5 flex flex-col justify-between relative overflow-hidden"
                  style={{ backgroundColor: site.bg }}
                >
                  {/* Mini nav */}
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-12 rounded" style={{ backgroundColor: site.accent, opacity: 0.6 }} />
                    <div className="flex gap-2">
                      <div className="h-2 w-8 rounded" style={{ backgroundColor: site.accent, opacity: 0.25 }} />
                      <div className="h-2 w-8 rounded" style={{ backgroundColor: site.accent, opacity: 0.25 }} />
                    </div>
                  </div>
                  {/* Headline block */}
                  <div className="space-y-1.5">
                    <div className="h-4 w-3/5 rounded" style={{ backgroundColor: site.accent, opacity: 0.7 }} />
                    <div className="h-4 w-2/5 rounded" style={{ backgroundColor: site.accent, opacity: 0.5 }} />
                    <div className="h-2 w-4/5 rounded mt-2" style={{ backgroundColor: site.accent, opacity: 0.15 }} />
                  </div>
                </div>

                {/* Meta */}
                <div className="px-4 py-3 bg-[#111115] flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-[#e8e8e6]">{site.name}</span>
                    <span className="text-xs text-[#555] ml-2">{site.tag}</span>
                  </div>
                  <svg className="w-4 h-4 text-[#444] group-hover:text-[#888] transition-colors duration-150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                  </svg>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
