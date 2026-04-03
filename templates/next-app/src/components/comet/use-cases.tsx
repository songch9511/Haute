"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { AnimatedSection, StaggerGroup, StaggerItem, scaleInVariants } from "@/components/motion";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 40, damping: 18 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString() + suffix);
  useEffect(() => { if (isInView) spring.set(target); }, [isInView, spring, target]);
  return <motion.span ref={ref} className="tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>{display}</motion.span>;
}

const cases = [
  {
    title: "SOTA CAD Foundation Model",
    desc: "Built a state-of-the-art CAD foundation model in 6 hours for $20. Dimension Research took 6 months for comparable results. CoMeT agents accumulated domain knowledge across 47 sessions.",
    metric: "6",
    metricSuffix: " hrs",
    metricLabel: "vs 6 months traditional",
    color: "#10b981",
  },
  {
    title: "Protein 3D Structure",
    desc: "Achieved SOTA on protein structure prediction by compounding failed experiment data. Each run refined the agent's understanding of molecular folding patterns.",
    metric: "27",
    metricSuffix: "",
    metricLabel: "failure patterns compounded",
    color: "#3b82f6",
  },
  {
    title: "Frontend & Backend Dev",
    desc: "Full-stack development with shared memory across frontend and backend agents. Design tokens, API contracts, and test results flow between sessions automatically.",
    metric: "3",
    metricSuffix: "x",
    metricLabel: "faster iteration cycles",
    color: "#f59e0b",
  },
  {
    title: "Domain-Adapting Harness",
    desc: "Self-evolving test harnesses that adapt to new domains. The agent learns project-specific patterns, builds verification rules, and compounds test failure knowledge over time.",
    metric: "91",
    metricSuffix: "%",
    metricLabel: "regression prevention rate",
    color: "#a78bfa",
  },
];

const orchestration = {
  title: "24/7 Self-Evolving Agents",
  desc: "CoMeT orchestrator manages worker agents around the clock. Each worker accumulates test failures, shares memory nodes, and the collective intelligence grows — even while you sleep.",
};

export function CometUseCases() {
  return (
    <section className="py-32 px-8" id="use-cases">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection className="max-w-[520px] mb-16">
          <span className="text-xs font-medium tracking-widest uppercase text-[#9ca3af] block mb-3">Use Cases</span>
          <h2 className="text-[2rem] md:text-[2.5rem] font-bold leading-[1.08] tracking-tight mb-4">
            What teams build
            <br />with CoMeT
          </h2>
          <p className="text-base text-[#9ca3af] leading-relaxed">
            From research breakthroughs to production codebases — agents that remember outperform agents that don&apos;t.
          </p>
        </AnimatedSection>

        {/* Orchestration banner */}
        <AnimatedSection className="mb-8">
          <div className="bg-[#10b981]/[0.04] border border-[#10b981]/[0.12] rounded-xl p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="flex items-center gap-4 shrink-0">
              {/* Orch diagram */}
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-[#10b981]/20 border border-[#10b981]/30 flex items-center justify-center">
                  <span className="text-[11px] font-bold text-[#10b981]">Orch</span>
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                  {[0,1,2].map((i) => (
                    <div key={i} className="w-4 h-4 rounded-full bg-white/[0.06] border border-white/[0.08]" />
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold tracking-tight leading-tight mb-1">{orchestration.title}</h3>
              <p className="text-sm text-[#9ca3af] leading-relaxed max-w-[500px]">{orchestration.desc}</p>
            </div>
          </div>
        </AnimatedSection>

        {/* Use case cards */}
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cases.map((c) => (
            <StaggerItem key={c.title} variants={scaleInVariants}>
              <motion.div
                whileHover={{ y: -3, borderColor: `${c.color}25` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-[#111115] border border-white/[0.06] rounded-xl p-7 h-full flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold tracking-tight leading-tight">{c.title}</h3>
                  <div className="text-right shrink-0 ml-4">
                    <div className="text-2xl font-bold tracking-tight" style={{ color: c.color }}>
                      <Counter target={parseInt(c.metric)} suffix={c.metricSuffix} />
                    </div>
                    <div className="text-[10px] text-[#9ca3af]">{c.metricLabel}</div>
                  </div>
                </div>
                <p className="text-sm text-[#9ca3af] leading-relaxed flex-1">{c.desc}</p>
                <div className="mt-4 h-1 bg-white/[0.04] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: c.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
