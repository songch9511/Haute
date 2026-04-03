"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatedSection, ease } from "@/components/motion";

const features = [
  {
    id: "infinite",
    label: "Infinite Context",
    title: "Infinite context window",
    desc: "CoMeT externalizes memory into a structured tree. The agent's context window holds only what's needed for the current task — summaries, triggers, and active rules. Everything else is one tool call away.",
  },
  {
    id: "lossless",
    label: "Lossless Recall",
    title: "Lossless compact & recall",
    desc: "No more lossy LLM-based text compression. CoMeT stores raw data at leaf nodes, summaries at branch nodes, and indexes at the root. Recall is a precise tree traversal — Index → Trigger → Raw → Detail → Summary.",
  },
  {
    id: "policy",
    label: "Memory Policy",
    title: "Sophisticated memory policy",
    desc: "Not all memories are equal. CoMeT classifies by type — tool outputs, session context, MCP results, skill executions — and applies different retention, compression, and recall policies to each.",
  },
  {
    id: "heartbeat",
    label: "24/7 Heartbeat",
    title: "Cron jobs & agent heartbeat",
    desc: "CoMeT agents don't sleep when you close the terminal. Background cron jobs monitor repos, run tests, scan for regressions, and accumulate findings into memory nodes — ready when you return.",
  },
  {
    id: "sharing",
    label: "Memory Sharing",
    title: "Cross-session memory nodes",
    desc: "Session A discovers a bug pattern. Session B gets that knowledge automatically through shared memory nodes. Agents talk to each other's sessions and build collective intelligence.",
  },
  {
    id: "compound",
    label: "Compounding",
    title: "Memory compounding",
    desc: "Test failure cases don't just get logged — they accumulate. Each failure refines the agent's understanding. Over time, the memory tree grows richer and the agent's decisions improve. Self-evolving memory.",
  },
];

function DemoPanel({ id }: { id: string }) {
  if (id === "infinite") {
    return (
      <div className="bg-[#111115] rounded-l-xl md:rounded-r-none border border-white/[0.06] md:border-r-0 p-6 lg:p-8 h-[75vh] min-h-[500px] flex flex-col">
        <div className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider mb-4">System Prompt (optimized)</div>
        <div className="flex gap-2 mb-6">
          {["Summary", "Triggers", "Skills & Rules"].map((t) => (
            <span key={t} className="text-[10px] font-medium text-[#10b981] bg-[#10b981]/[0.08] border border-[#10b981]/[0.15] px-2.5 py-1 rounded-md">{t}</span>
          ))}
        </div>
        <div className="flex-1 bg-white/[0.02] rounded-lg border border-white/[0.04] p-5 flex flex-col gap-4">
          <div className="text-[11px] text-[#9ca3af] font-medium">2-3 turn context window</div>
          <div className="grid grid-cols-2 gap-3 flex-1">
            {["Tool Memory", "Session Memory", "MCP Memory", "Skill Memory"].map((label) => (
              <div key={label} className="bg-white/[0.03] rounded-lg border border-white/[0.04] p-4 flex flex-col items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#10b981]/[0.08] border border-[#10b981]/[0.15]" />
                <span className="text-[10px] text-[#9ca3af] font-medium text-center">{label}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-[10px] text-[#9ca3af]">
            <div className="w-3 h-3 rounded-full bg-[#10b981]/30" />
            Sensor: routes queries to the right memory branch
          </div>
        </div>
      </div>
    );
  }

  if (id === "lossless") {
    return (
      <div className="bg-[#111115] rounded-l-xl md:rounded-r-none border border-white/[0.06] md:border-r-0 p-6 lg:p-8 h-[75vh] min-h-[500px] flex flex-col">
        <div className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider mb-6">Recall Pipeline</div>
        <div className="flex-1 flex flex-col gap-3 justify-center">
          {["Index", "Trigger", "Raw", "Detail", "Summary"].map((step, i) => (
            <motion.div
              key={step}
              className="flex items-center gap-4 px-5 py-4 bg-white/[0.02] rounded-lg border border-white/[0.04]"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.3, ease: ease.out }}
            >
              <div className="w-8 h-8 rounded-full bg-[#10b981]/[0.08] border border-[#10b981]/[0.15] flex items-center justify-center text-[11px] font-bold text-[#10b981] shrink-0" style={{ fontVariantNumeric: "tabular-nums" }}>
                {i + 1}
              </div>
              <div>
                <div className="text-sm font-semibold">{step}</div>
                <div className="text-[11px] text-[#9ca3af]">
                  {step === "Index" && "Find which memory branch to search"}
                  {step === "Trigger" && "Match activation conditions"}
                  {step === "Raw" && "Retrieve original uncompressed data"}
                  {step === "Detail" && "Extract relevant sub-information"}
                  {step === "Summary" && "Return compressed answer to context"}
                </div>
              </div>
              {i < 4 && <div className="ml-auto text-[#333] text-lg">&darr;</div>}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (id === "policy") {
    return (
      <div className="bg-[#111115] rounded-l-xl md:rounded-r-none border border-white/[0.06] md:border-r-0 p-6 lg:p-8 h-[75vh] min-h-[500px] flex flex-col">
        <div className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider mb-6">Memory Classification</div>
        <div className="flex-1 grid grid-cols-2 gap-4 content-center">
          {[
            { type: "Tool", retention: "Per-task", color: "#3b82f6", desc: "CLI outputs, file reads, API responses" },
            { type: "Session", retention: "Per-session", color: "#f59e0b", desc: "Conversation context, decisions, user preferences" },
            { type: "MCP", retention: "Persistent", color: "#8b5cf6", desc: "Server state, connection history, capabilities" },
            { type: "Skill", retention: "Permanent", color: "#10b981", desc: "Learned patterns, verified solutions, harness rules" },
          ].map((m) => (
            <div key={m.type} className="bg-white/[0.02] rounded-lg border border-white/[0.04] p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: m.color }} />
                <span className="text-sm font-semibold">{m.type}</span>
              </div>
              <div className="text-[10px] font-medium px-2 py-0.5 rounded w-fit mb-3" style={{ backgroundColor: `${m.color}15`, color: m.color }}>
                {m.retention}
              </div>
              <p className="text-[11px] text-[#9ca3af] leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (id === "heartbeat") {
    return (
      <div className="bg-[#111115] rounded-l-xl md:rounded-r-none border border-white/[0.06] md:border-r-0 p-6 lg:p-8 h-[75vh] min-h-[500px] flex flex-col">
        <div className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider mb-6">Agent Heartbeat</div>
        <div className="flex-1 flex flex-col justify-center gap-4">
          {[
            { time: "03:14 AM", event: "Cron: test suite scan", status: "2 new failures detected", statusColor: "#ef4444" },
            { time: "03:15 AM", event: "Memory: failure pattern stored", status: "Node added to tree", statusColor: "#10b981" },
            { time: "06:00 AM", event: "Cron: dependency audit", status: "All packages current", statusColor: "#10b981" },
            { time: "09:22 AM", event: "Session start: Daniel", status: "3 memory nodes preloaded", statusColor: "#3b82f6" },
            { time: "09:22 AM", event: "Agent: surfacing overnight findings", status: "2 test failures ready for review", statusColor: "#f59e0b" },
          ].map((log, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-4 px-4 py-3 bg-white/[0.02] rounded-lg border border-white/[0.04]"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.3, ease: ease.out }}
            >
              <span className="text-[11px] text-[#9ca3af] font-mono tabular-nums shrink-0 w-16" style={{ fontVariantNumeric: "tabular-nums" }}>{log.time}</span>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-medium truncate">{log.event}</div>
              </div>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded shrink-0" style={{ backgroundColor: `${log.statusColor}15`, color: log.statusColor }}>
                {log.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (id === "sharing") {
    return (
      <div className="bg-[#111115] rounded-l-xl md:rounded-r-none border border-white/[0.06] md:border-r-0 p-6 lg:p-8 h-[75vh] min-h-[500px] flex flex-col items-center justify-center relative">
        <div className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider mb-8 self-start">Cross-Session Sharing</div>
        {/* Multi-session diagram */}
        <div className="flex gap-8 items-start">
          {["Session A", "Session B", "Session C"].map((name, i) => (
            <div key={name} className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-white/10" />
              </div>
              <span className="text-[11px] text-[#9ca3af] font-medium">{name}</span>
              <svg className="w-4 h-8 text-[#10b981]/30" viewBox="0 0 16 32"><path d="M8 0v32" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3"/></svg>
            </div>
          ))}
        </div>
        {/* Shared memory node */}
        <div className="mt-4 px-6 py-4 bg-[#10b981]/[0.06] border border-[#10b981]/[0.15] rounded-xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#10b981]/20 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#10b981]" />
          </div>
          <div>
            <div className="text-sm font-semibold text-[#10b981]">Shared Memory Node</div>
            <div className="text-[11px] text-[#9ca3af]">Bug pattern discovered in Session A, available to all</div>
          </div>
        </div>
      </div>
    );
  }

  // compound
  return (
    <div className="bg-[#111115] rounded-l-xl md:rounded-r-none border border-white/[0.06] md:border-r-0 p-6 lg:p-8 h-[75vh] min-h-[500px] flex flex-col">
      <div className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider mb-6">Memory Compounding</div>
      <div className="flex-1 flex flex-col justify-center gap-3">
        {[
          { run: "Run #1", result: "Test failed: auth timeout", knowledge: "1 pattern", depth: "15%" },
          { run: "Run #7", result: "Same root cause found in 3 files", knowledge: "4 patterns", depth: "35%" },
          { run: "Run #23", result: "Auto-fix applied, test passed", knowledge: "12 patterns", depth: "68%" },
          { run: "Run #51", result: "Prevented regression before commit", knowledge: "27 patterns", depth: "91%" },
        ].map((row, i) => (
          <motion.div
            key={row.run}
            className="flex items-center gap-4 px-4 py-4 bg-white/[0.02] rounded-lg border border-white/[0.04]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.3, ease: ease.out }}
          >
            <span className="text-[12px] font-mono text-[#9ca3af] shrink-0 w-14 tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>{row.run}</span>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-medium truncate">{row.result}</div>
              <div className="text-[10px] text-[#9ca3af]">{row.knowledge}</div>
            </div>
            <div className="w-24 shrink-0">
              <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#10b981] rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: row.depth }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: ease.out }}
                />
              </div>
            </div>
          </motion.div>
        ))}
        <div className="text-[11px] text-[#10b981] mt-2 px-4">
          Knowledge compounds. Each failure makes the agent smarter.
        </div>
      </div>
    </div>
  );
}

export function CometSolution() {
  const [active, setActive] = useState("infinite");
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    features.forEach((f) => {
      const el = panelRefs.current[f.id];
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(f.id); },
        { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (id: string) => {
    const el = panelRefs.current[id];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section className="py-32 bg-[#0a0a0a] text-white overflow-x-clip" id="solution">
      {/* Heading */}
      <div className="max-w-[1200px] mx-auto px-8">
        <AnimatedSection className="mb-16">
          <span className="text-xs font-medium tracking-widest uppercase text-[#10b981] block mb-3">
            The Solution
          </span>
          <h2 className="text-[2rem] md:text-[2.5rem] font-bold leading-[1.08] tracking-tight max-w-[500px]">
            CoMeT &amp; CoBrA
          </h2>
          <p className="text-base text-[#9ca3af] leading-relaxed mt-4 max-w-[480px]">
            Cognitive Memory Tree + CoMeT Browsing Agent. Six capabilities that
            transform how agents remember, recall, and evolve.
          </p>
        </AnimatedSection>
      </div>

      {/* Scroll-linked sticky tabs */}
      <div className="flex items-start gap-12">
        <div className="hidden md:block shrink-0" style={{ width: "max(calc((100vw - 1200px) / 2 + 32px), 32px)" }} />

        {/* Left: sticky */}
        <div className="hidden md:block sticky top-24 self-start shrink-0 w-[280px]">
          {features.map((f) => (
            <button
              key={f.id}
              onClick={() => handleClick(f.id)}
              className="flex items-start gap-4 py-4 border-b border-white/[0.06] bg-transparent border-x-0 border-t-0 cursor-pointer text-left min-h-[44px] w-full"
              style={{ fontFamily: "inherit" }}
            >
              <div className={`w-[2px] self-stretch shrink-0 rounded-full transition-all duration-300 ${active === f.id ? "bg-[#10b981]" : "bg-transparent"}`} />
              <div>
                <h3 className={`text-lg font-semibold tracking-tight transition-colors duration-200 ${active === f.id ? "text-white" : "text-[#9ca3af]"}`} style={{ lineHeight: 1.2 }}>
                  {f.label}
                </h3>
                <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: active === f.id ? 200 : 0, opacity: active === f.id ? 1 : 0 }}>
                  <p className="text-[12px] text-[#9ca3af] leading-relaxed mt-1.5 max-w-[240px]">{f.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Right: scrolling demos */}
        <div className="flex-1 min-w-0 flex flex-col gap-0 pr-0">
          {features.map((f) => (
            <div
              key={f.id}
              ref={(el) => { panelRefs.current[f.id] = el; }}
              className="min-h-[90vh] flex flex-col justify-center py-8"
            >
              <h3 className="text-xl font-semibold tracking-tight mb-2 md:hidden px-8" style={{ lineHeight: 1.2 }}>{f.label}</h3>
              <p className="text-sm text-[#9ca3af] leading-relaxed mb-6 md:hidden px-8">{f.desc}</p>
              <DemoPanel id={f.id} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
