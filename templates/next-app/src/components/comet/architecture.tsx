"use client";

import { motion } from "framer-motion";
import { AnimatedSection, ease } from "@/components/motion";

export function CometArchitecture() {
  return (
    <section className="py-32 px-8 border-y border-white/[0.06]" id="architecture">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection className="text-center max-w-[600px] mx-auto mb-16">
          <span className="text-xs font-medium tracking-widest uppercase text-[#9ca3af] block mb-3">Architecture</span>
          <h2 className="text-[2rem] md:text-[2.5rem] font-bold leading-[1.08] tracking-tight mb-4">Before &amp; After</h2>
          <p className="text-base text-[#9ca3af] leading-relaxed">From flat files to a living memory tree.</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Before */}
          <AnimatedSection>
            <div className="bg-[#111115] border border-white/[0.06] rounded-xl p-8 h-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                <span className="text-sm font-semibold text-[#ef4444]">Now</span>
              </div>
              <div className="space-y-4">
                <div className="bg-white/[0.03] rounded-lg border border-white/[0.04] p-4">
                  <div className="text-[11px] text-[#9ca3af] font-medium mb-2">System Prompt (base)</div>
                  <div className="flex flex-wrap gap-1.5">
                    {["MCP", "SKILL.md", "Memory", "SOULS.md"].map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 bg-white/[0.04] rounded text-[#9ca3af]">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2 pl-4 border-l-2 border-[#ef4444]/20">
                  {[
                    "Tool Culling — all tools loaded every turn",
                    "Siloed Sessions — no cross-session knowledge",
                    "LLM-based Text Compaction — lossy compression",
                    "O(n²) Cost — quadratic attention scaling",
                  ].map((item) => (
                    <div key={item} className="text-[12px] text-[#9ca3af] flex items-start gap-2">
                      <span className="text-[#ef4444] shrink-0 mt-0.5">&times;</span>
                      {item}
                    </div>
                  ))}
                </div>
                <div className="text-center text-sm font-bold text-[#ef4444]/60 pt-2">NOT ENOUGH</div>
              </div>
            </div>
          </AnimatedSection>

          {/* After */}
          <AnimatedSection delay={0.1}>
            <div className="bg-[#111115] border border-[#10b981]/[0.15] rounded-xl p-8 h-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-[#10b981]" />
                <span className="text-sm font-semibold text-[#10b981]">CoMeT</span>
              </div>
              <div className="space-y-4">
                <div className="bg-[#10b981]/[0.04] rounded-lg border border-[#10b981]/[0.1] p-4">
                  <div className="text-[11px] text-[#10b981]/70 font-medium mb-2">System Prompt (optimized)</div>
                  <div className="flex flex-wrap gap-1.5">
                    {["Summary", "Triggers", "Skills & Rules"].map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 bg-[#10b981]/[0.08] rounded text-[#10b981]">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {["Tool", "Session", "MCP", "Skill"].map((node) => (
                    <div key={node} className="bg-white/[0.02] rounded-lg border border-white/[0.04] p-3 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#10b981]/[0.08] border border-[#10b981]/[0.15] shrink-0" />
                      <span className="text-[11px] font-medium text-[#ccc]">{node}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] rounded-lg border border-white/[0.04]">
                  <div className="w-4 h-4 rounded-full bg-[#10b981]/30" />
                  <span className="text-[11px] text-[#9ca3af]">Sensor: 2-3 turn context window</span>
                </div>

                <div className="text-[11px] text-[#9ca3af] font-medium mt-2">Lossless Recall via Tool:</div>
                <div className="flex flex-wrap gap-1.5">
                  {["Index", "Trigger", "Raw", "Detail", "Summary"].map((step) => (
                    <span key={step} className="text-[10px] px-2.5 py-1 bg-[#10b981]/[0.06] border border-[#10b981]/[0.12] rounded-full text-[#10b981] font-medium">{step}</span>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
