"use client";

import { motion } from "framer-motion";
import { AnimatedSection, springs, ease } from "@/components/motion";

// Colored placeholder "site screenshots" for the mosaic gallery
const sites = [
  { bg: "#1a1a2e", accent: "#e94560", w: "w-[240px]", h: "h-[320px]" },
  { bg: "#0f3460", accent: "#16c79a", w: "w-[280px]", h: "h-[200px]" },
  { bg: "#e8e8e8", accent: "#1a1a1a", w: "w-[220px]", h: "h-[280px]" },
  { bg: "#162447", accent: "#e43f5a", w: "w-[260px]", h: "h-[240px]" },
  { bg: "#f7f7f7", accent: "#ff6b6b", w: "w-[200px]", h: "h-[300px]" },
  { bg: "#1b1b2f", accent: "#00b4d8", w: "w-[280px]", h: "h-[220px]" },
  { bg: "#2d3436", accent: "#74b9ff", w: "w-[240px]", h: "h-[260px]" },
  { bg: "#ffeaa7", accent: "#2d3436", w: "w-[220px]", h: "h-[200px]" },
];

function SitePlaceholder({ bg, accent, delay }: { bg: string; accent: string; delay: number }) {
  return (
    <motion.div
      className="rounded-xl overflow-hidden flex-shrink-0 p-4 flex flex-col justify-between"
      style={{ backgroundColor: bg, width: 220, height: 280 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: ease.out }}
    >
      {/* Mini nav */}
      <div className="flex items-center justify-between">
        <div className="w-8 h-3 rounded" style={{ backgroundColor: accent, opacity: 0.7 }} />
        <div className="flex gap-1.5">
          <div className="w-6 h-2 rounded" style={{ backgroundColor: accent, opacity: 0.3 }} />
          <div className="w-6 h-2 rounded" style={{ backgroundColor: accent, opacity: 0.3 }} />
        </div>
      </div>
      {/* Content blocks */}
      <div className="space-y-2 mt-auto">
        <div className="h-4 w-4/5 rounded" style={{ backgroundColor: accent, opacity: 0.8 }} />
        <div className="h-4 w-3/5 rounded" style={{ backgroundColor: accent, opacity: 0.6 }} />
        <div className="h-2 w-full rounded mt-3" style={{ backgroundColor: accent, opacity: 0.15 }} />
        <div className="h-2 w-4/5 rounded" style={{ backgroundColor: accent, opacity: 0.15 }} />
      </div>
      {/* CTA */}
      <div className="mt-4 flex gap-2">
        <div className="h-6 w-16 rounded-md" style={{ backgroundColor: accent, opacity: 0.7 }} />
        <div className="h-6 w-16 rounded-md" style={{ backgroundColor: accent, opacity: 0.2 }} />
      </div>
    </motion.div>
  );
}

export function FramerHero() {
  return (
    <section className="relative bg-[#0a0a0a] text-white overflow-hidden">
      {/* Hero content */}
      <div className="relative z-10 min-h-dvh flex flex-col items-center justify-center px-8 pt-24 pb-8">
        <div className="max-w-[900px] mx-auto text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/[0.06] border border-white/[0.08] rounded-full text-xs font-medium text-[#999] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
              State of Sites &apos;26 &middot; Unlock the report now
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.05}>
            <h1 className="text-[3rem] md:text-[5rem] font-bold leading-[1.02] tracking-tight mb-6">
              Build better
              <br />
              sites, faster
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="text-base md:text-lg text-[#999] leading-relaxed max-w-[540px] mx-auto mb-10">
              Prism is the site builder trusted by leading startups and Fortune 500
              companies. Build fast and scale more easily with an integrated CMS,
              analytics, localization, and SEO.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="flex gap-3 items-center justify-center flex-wrap">
              <motion.a
                href="#"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={springs.snappy}
                className="inline-flex items-center justify-center px-6 py-3 min-h-[48px] bg-white text-[#0a0a0a] text-sm font-medium rounded-xl no-underline border border-white/20"
              >
                Start for free
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={springs.snappy}
                className="inline-flex items-center justify-center px-6 py-3 min-h-[48px] bg-white/[0.06] text-white text-sm font-medium rounded-xl no-underline border border-white/[0.08]"
              >
                Start with AI
              </motion.a>
            </div>
          </AnimatedSection>
        </div>

        {/* Site screenshot mosaic */}
        <div className="mt-16 w-full max-w-[1400px] mx-auto overflow-hidden">
          <div className="flex gap-4 justify-center flex-wrap px-4">
            {sites.map((site, i) => (
              <SitePlaceholder key={i} bg={site.bg} accent={site.accent} delay={0.3 + i * 0.06} />
            ))}
          </div>
          {/* Bottom fade to dark */}
          <div className="h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent -mt-32 relative z-10" />
        </div>
      </div>
    </section>
  );
}
