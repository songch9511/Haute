"use client";

import { motion } from "framer-motion";
import { AnimatedSection, StaggerGroup, StaggerItem, scaleInVariants } from "@/components/motion";

const categories = [
  { title: "Templates", desc: "Production-ready starting points", items: [{ name: "SaaS Landing", tag: "Free" }, { name: "Portfolio Minimal", tag: "Free" }, { name: "Agency Pro", tag: "$29" }] },
  { title: "Plugins", desc: "Extend Prism with integrations", items: [{ name: "Figma Sync", tag: "Official" }, { name: "Analytics Hub", tag: "Official" }, { name: "Form Builder", tag: "Community" }] },
  { title: "Components", desc: "Drop-in UI building blocks", items: [{ name: "Navigation Kit", tag: "12 variants" }, { name: "Hero Sections", tag: "8 variants" }, { name: "Pricing Tables", tag: "6 variants" }] },
];

export function FramerCommunity() {
  return (
    <section className="py-32 px-8 bg-[#0f0f12]">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection className="text-center max-w-[480px] mx-auto mb-16">
          <span className="text-xs font-medium tracking-widest uppercase text-[#555] block mb-3">Ecosystem</span>
          <h2 className="text-[2rem] md:text-[2.5rem] font-bold leading-[1.08] tracking-tight mb-4">Community resources</h2>
          <p className="text-base text-[#888] leading-relaxed">Templates, plugins, and components built by the Prism community.</p>
        </AnimatedSection>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <StaggerItem key={cat.title} variants={scaleInVariants}>
              <div className="bg-[#111115] border border-white/[0.06] rounded-xl p-6">
                <h3 className="text-lg font-semibold tracking-tight mb-1">{cat.title}</h3>
                <p className="text-sm text-[#666] mb-6">{cat.desc}</p>
                <div className="flex flex-col gap-3">
                  {cat.items.map((item) => (
                    <motion.div key={item.name} whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.02)" }} transition={{ duration: 0.15, ease: "easeOut" }} className="flex items-center justify-between py-3 px-3 -mx-3 rounded-lg cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0"><div className="w-4 h-4 rounded bg-white/[0.06]" /></div>
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <span className="text-[11px] font-medium text-[#888] bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded">{item.tag}</span>
                    </motion.div>
                  ))}
                </div>
                <a href="#" className="block mt-4 text-sm text-[#888] hover:text-white transition-colors duration-150">Browse all {cat.title.toLowerCase()} &rarr;</a>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
