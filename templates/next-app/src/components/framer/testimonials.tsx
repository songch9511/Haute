"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection, ease } from "@/components/motion";

const testimonials = [
  { quote: "We migrated from Webflow to Prism in a weekend. The component system and CMS are leagues ahead of anything we\u2019ve used before.", name: "Tara Nakamura", role: "Head of Design", company: "Meridian Labs", initials: "TN" },
  { quote: "Our marketing team can now ship landing pages without filing a single engineering ticket. That\u2019s a fundamental shift in how we operate.", name: "Marcus Engstr\u00f6m", role: "VP Engineering", company: "Clearpath", initials: "ME" },
  { quote: "The built-in analytics replaced three separate tools for us. Seeing performance data right next to the page editor changes how you think about design.", name: "Priya Deshmukh", role: "Growth Lead", company: "Canopy Health", initials: "PD" },
  { quote: "We\u2019ve tried every visual builder on the market. Prism is the first one where the output actually looks like a designer built it, not a tool.", name: "Jonas Lindqvist", role: "Creative Director", company: "Halfmoon Studio", initials: "JL" },
];

export function FramerTestimonials() {
  const [current, setCurrent] = useState(0);
  const next = useCallback(() => setCurrent((p) => (p + 1) % testimonials.length), []);
  useEffect(() => { const id = setInterval(next, 5000); return () => clearInterval(id); }, [next]);
  const t = testimonials[current];

  return (
    <section className="py-32 px-8">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection className="mb-16">
          <span className="text-xs font-medium tracking-widest uppercase text-[#555] block mb-3">Customers</span>
          <h2 className="text-[2rem] md:text-[2.5rem] font-bold leading-[1.08] tracking-tight">Hear from teams using Prism</h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div className="flex flex-col">
            {testimonials.map((item, i) => (
              <button key={item.name} onClick={() => setCurrent(i)} className="flex items-center gap-4 py-4 border-b border-white/[0.06] text-left cursor-pointer bg-transparent border-x-0 border-t-0 min-h-[44px]" style={{ fontFamily: "inherit" }}>
                <div className={`w-[2px] self-stretch shrink-0 rounded-full transition-colors duration-300 ${current === i ? "bg-white" : "bg-transparent"}`} />
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium shrink-0 transition-colors duration-200 ${current === i ? "bg-white text-[#0a0a0a]" : "bg-white/[0.06] text-[#555]"}`}>{item.initials}</div>
                <div>
                  <div className={`text-sm font-medium transition-colors duration-200 ${current === i ? "text-white" : "text-[#555]"}`}>{item.name}</div>
                  <div className="text-xs text-[#444]">{item.company}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="min-h-[200px] flex items-start pt-4">
            <AnimatePresence mode="wait">
              <motion.blockquote key={current} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35, ease: ease.out }}>
                <p className="text-xl md:text-2xl font-normal leading-[1.45] tracking-tight mb-6">&ldquo;{t.quote}&rdquo;</p>
                <footer className="text-sm text-[#888]">{t.name}, {t.role} at {t.company}</footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex gap-2 mt-12 justify-center md:justify-start">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} aria-label={`Testimonial ${i + 1}`} className="p-1 bg-transparent border-none cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center">
              <motion.div className="h-1 rounded-full" animate={{ width: current === i ? 24 : 8, backgroundColor: current === i ? "#fff" : "#333" }} transition={{ duration: 0.3, ease: "easeOut" }} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
