"use client";

import { motion } from "framer-motion";
import { AnimatedSection, StaggerGroup, StaggerItem, fadeUpVariants } from "@/components/motion";

const problems = [
  {
    label: "Simple .md",
    title: "Flat file memory",
    desc: "CLAUDE.md and MEMORY.md are just text files. No structure, no hierarchy, no relations between memories. Knowledge is a pile, not a tree.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    label: "Tool Bloat",
    title: "Tool culling overhead",
    desc: "Agents load all tools into context every turn. As MCP servers and skills grow, the base prompt balloons — eating into your actual working memory.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    label: "Session Silo",
    title: "Isolated sessions",
    desc: "Each conversation is a walled garden. Agent A learns something useful but Agent B starts from zero. No knowledge sharing across sessions.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    label: "Small Context",
    title: "Context window limits",
    desc: "Even 200K tokens fill up fast with tools, skills, and conversation history. The LLM compresses by dropping information — lossy and uncontrolled.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2" /><path d="M7 2v20" /><path d="M17 2v20" /><path d="M2 12h20" />
      </svg>
    ),
  },
  {
    label: "O(n²) Cost",
    title: "Quadratic scaling",
    desc: "Every token in context attends to every other token. Double the memory, quadruple the cost. Current systems have no way to manage this growth.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

export function CometProblem() {
  return (
    <section className="py-32 px-8 border-t border-white/[0.06]" id="problem">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection className="max-w-[520px] mb-16">
          <span className="text-xs font-medium tracking-widest uppercase text-[#ef4444] block mb-3">
            The Problem
          </span>
          <h2 className="text-[2rem] md:text-[2.5rem] font-bold leading-[1.08] tracking-tight mb-4">
            Current memory is
            <br />
            broken for agents
          </h2>
          <p className="text-base text-[#9ca3af] leading-relaxed">
            Claude, OpenClaw, and every other agent framework shares the same
            fundamental limitations. Five problems that compound into one reality:
            agents forget.
          </p>
        </AnimatedSection>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {problems.map((p, i) => (
            <StaggerItem
              key={p.label}
              variants={fadeUpVariants}
              className={
                i < 2 ? "md:col-span-3" :  /* row 1: 2 cards, each half */
                "md:col-span-2"             /* row 2: 3 cards, each third */
              }
            >
              <motion.div
                whileHover={{ y: -3, borderColor: "rgba(239, 68, 68, 0.15)" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="h-full bg-[#111115] border border-white/[0.06] rounded-xl p-6"
              >
                <div className="w-10 h-10 rounded-lg bg-[#ef4444]/[0.08] border border-[#ef4444]/[0.12] flex items-center justify-center text-[#ef4444] mb-5">
                  {p.icon}
                </div>
                <div className="text-[11px] font-semibold text-[#ef4444]/70 uppercase tracking-wider mb-2">
                  {p.label}
                </div>
                <h3 className="text-lg font-semibold tracking-tight mb-2" style={{ lineHeight: 1.2 }}>
                  {p.title}
                </h3>
                <p className="text-sm text-[#9ca3af] leading-relaxed">
                  {p.desc}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Bottom row for last 2 cards */}
      </div>
    </section>
  );
}
