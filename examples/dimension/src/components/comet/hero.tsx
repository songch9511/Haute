"use client";

import { motion } from "framer-motion";
import { AnimatedSection, springs, ease } from "@/components/motion";

export function CometHero() {
  return (
    <section className="min-h-dvh flex flex-col items-center justify-center px-8 pt-24 pb-16 relative overflow-x-clip">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#10b981]/[0.04] blur-[120px] pointer-events-none" />

      <div className="max-w-[800px] mx-auto text-center relative z-10">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#10b981]/[0.08] border border-[#10b981]/[0.15] rounded-full text-xs font-medium text-[#10b981] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            Cognitive Memory Tree
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <h1 className="text-[2.75rem] md:text-[4rem] font-bold leading-[1.04] tracking-tight mb-6">
            Memory that
            <br />
            <span className="text-[#10b981]">evolves</span> with
            <br />
            your agents
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="text-base md:text-lg text-[#9ca3af] leading-relaxed max-w-[520px] mx-auto mb-10">
            Current agent memory is broken — simple markdown files, session silos,
            and O(n²) context costs. CoMeT replaces it with a structured memory tree
            that compresses losslessly, recalls instantly, and compounds knowledge over time.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="flex gap-3 items-center justify-center flex-wrap">
            <motion.a
              href="#cta"
              whileHover={{ y: -1, boxShadow: "0 4px 20px rgba(16, 185, 129, 0.15)" }}
              whileTap={{ scale: 0.98 }}
              transition={springs.snappy}
              className="inline-flex items-center justify-center px-7 py-3.5 min-h-[48px] bg-[#10b981] text-[#0a0a0a] text-base font-semibold rounded-xl no-underline"
            >
              Start building
            </motion.a>
            <motion.a
              href="#problem"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={springs.snappy}
              className="inline-flex items-center justify-center px-7 py-3.5 min-h-[48px] border border-white/[0.08] text-white text-base font-medium rounded-xl no-underline"
            >
              See the problem &darr;
            </motion.a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="mt-5 text-xs text-[#9ca3af]">
            Open source &middot; Works with Claude, OpenClaw, and any LLM agent
          </p>
        </AnimatedSection>
      </div>

      {/* Animated tree visualization */}
      <AnimatedSection delay={0.3} className="mt-16 w-full max-w-[700px] mx-auto">
        <div className="relative h-[200px] flex items-center justify-center">
          {/* Root node */}
          <motion.div
            className="absolute w-12 h-12 rounded-full bg-[#10b981]/20 border border-[#10b981]/30 flex items-center justify-center z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, ...springs.standard }}
          >
            <div className="w-4 h-4 rounded-full bg-[#10b981]" />
          </motion.div>

          {/* Branch nodes */}
          {[
            { x: -180, y: -60, delay: 0.75, label: "Tool" },
            { x: -80, y: -75, delay: 0.8, label: "Session" },
            { x: 80, y: -75, delay: 0.85, label: "MCP" },
            { x: 180, y: -60, delay: 0.9, label: "Skill" },
            { x: -130, y: 60, delay: 0.95, label: "Index" },
            { x: 0, y: 80, delay: 1.0, label: "Raw" },
            { x: 130, y: 60, delay: 1.05, label: "Detail" },
          ].map((node, i) => (
            <motion.div
              key={i}
              className="absolute flex flex-col items-center gap-1"
              style={{ left: `calc(50% + ${node.x}px)`, top: `calc(50% + ${node.y}px)`, transform: "translate(-50%, -50%)" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: node.delay, duration: 0.3, ease: ease.out }}
            >
              <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              </div>
              <span className="text-[9px] text-[#9ca3af] font-medium">{node.label}</span>
            </motion.div>
          ))}

          {/* Connection lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
            {[
              { x2: -180, y2: -60 }, { x2: -80, y2: -75 }, { x2: 80, y2: -75 }, { x2: 180, y2: -60 },
              { x2: -130, y2: 60 }, { x2: 0, y2: 80 }, { x2: 130, y2: 60 },
            ].map((line, i) => (
              <motion.line
                key={i}
                x1="50%" y1="50%"
                x2={`calc(50% + ${line.x2}px)`} y2={`calc(50% + ${line.y2}px)`}
                stroke="rgba(16, 185, 129, 0.12)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.7 + i * 0.05, duration: 0.4 }}
              />
            ))}
          </svg>
        </div>
      </AnimatedSection>
    </section>
  );
}
