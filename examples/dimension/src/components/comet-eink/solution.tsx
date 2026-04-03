"use client";

import { useRef, useState, useEffect } from "react";

const features = [
  { id: "infinite", label: "Infinite Context", title: "Infinite context window", desc: "CoMeT externalizes memory into a structured tree. The agent's context holds only what's needed — summaries, triggers, and active rules." },
  { id: "lossless", label: "Lossless Recall", title: "Lossless compact & recall", desc: "Raw data at leaf nodes, summaries at branches, indexes at the root. Recall is a precise tree traversal: Index → Trigger → Raw → Detail → Summary." },
  { id: "policy", label: "Memory Policy", title: "Sophisticated memory policy", desc: "Tool outputs, session context, MCP results, skill executions — each type gets different retention, compression, and recall policies." },
  { id: "heartbeat", label: "24/7 Heartbeat", title: "Cron jobs & agent heartbeat", desc: "Background cron jobs monitor repos, run tests, scan for regressions, and accumulate findings into memory nodes." },
  { id: "sharing", label: "Memory Sharing", title: "Cross-session memory nodes", desc: "Session A discovers a bug pattern. Session B gets that knowledge automatically through shared memory nodes." },
  { id: "compound", label: "Compounding", title: "Memory compounding", desc: "Test failures accumulate and refine the agent's understanding. Over time, the memory tree grows richer. Self-evolving memory." },
];

function DemoContent({ id }: { id: string }) {
  if (id === "infinite") {
    const branches = [
      { label: "Tool", nodes: 847, size: "12.3 MB", retention: "Per-task", desc: "CLI outputs, file reads, API responses" },
      { label: "Session", nodes: 234, size: "4.1 MB", retention: "Per-session", desc: "Decisions, preferences, corrections" },
      { label: "MCP", nodes: 156, size: "2.8 MB", retention: "Persistent", desc: "Server state, capabilities, history" },
      { label: "Skill", nodes: 93, size: "1.7 MB", retention: "Permanent", desc: "Learned patterns, verified solutions" },
    ];

    return (
      <div className="space-y-5">
        {/* Context window section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-[#625d57]">Context Window</div>
            <div className="font-mono text-xs text-[#1a1815]" style={{ fontVariantNumeric: "tabular-nums" }}>~4 KB active</div>
          </div>
          <div className="border border-[#1a1815] p-3 flex items-center gap-3">
            <div className="flex gap-1.5 flex-wrap flex-1">
              {["Summary", "Triggers", "Active Rules"].map((t) => (
                <span key={t} className="font-mono text-[10px] border border-[#1a1815] px-2 py-0.5">{t}</span>
              ))}
            </div>
            <span className="font-mono text-[10px] text-[#625d57]">2-3 turns</span>
          </div>
        </div>

        {/* Sensor routing */}
        <div className="flex items-center justify-center gap-3 py-1">
          <div className="flex-1 border-t border-dashed border-[#d6d0c8]" />
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="#1a1815" strokeWidth="1" />
              <circle cx="8" cy="8" r="2.5" fill="#1a1815" />
            </svg>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#625d57]">Sensor</span>
          </div>
          <div className="flex-1 border-t border-dashed border-[#d6d0c8]" />
        </div>

        {/* External memory tree */}
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.15em] text-[#625d57] mb-3">External Memory Tree</div>
          <div className="space-y-2">
            {branches.map((b, i) => (
              <div key={b.label} className="border border-[#d6d0c8] p-3 flex items-center gap-4">
                {/* Branch indicator */}
                <div className="flex items-center gap-2 w-16 shrink-0">
                  <div className="w-2 h-2 border border-[#1a1815] rounded-full" style={{ backgroundColor: i === 0 ? "#1a1815" : "transparent" }} />
                  <span className="font-mono text-sm font-bold">{b.label}</span>
                </div>

                {/* Retention badge */}
                <span className="font-mono text-[10px] border border-[#d6d0c8] px-1.5 py-0.5 shrink-0 hidden sm:inline">{b.retention}</span>

                {/* Description */}
                <span className="text-sm text-[#625d57] flex-1 min-w-0 truncate">{b.desc}</span>

                {/* Stats */}
                <div className="shrink-0 text-right hidden md:block">
                  <span className="font-mono text-sm font-bold" style={{ fontVariantNumeric: "tabular-nums" }}>{b.nodes.toLocaleString()}</span>
                  <span className="font-mono text-[10px] text-[#625d57] ml-1">nodes</span>
                </div>

                {/* Bar */}
                <div className="w-16 shrink-0 hidden md:block">
                  <div className="h-1 bg-[#d6d0c8]">
                    <div className="h-full bg-[#1a1815] transition-all" style={{ width: `${(b.nodes / 847) * 100}%` }} />
                  </div>
                </div>

                {/* Size */}
                <span className="font-mono text-[10px] text-[#625d57] shrink-0 w-14 text-right hidden lg:block" style={{ fontVariantNumeric: "tabular-nums" }}>{b.size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer summary */}
        <div className="flex items-center justify-between pt-3 border-t border-[#d6d0c8]">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1a1815]" />
            <span className="font-mono text-[10px] text-[#625d57]" style={{ fontVariantNumeric: "tabular-nums" }}>1,330 total nodes &middot; 4 branches</span>
          </div>
          <span className="font-mono text-[10px] text-[#625d57]" style={{ fontVariantNumeric: "tabular-nums" }}>20.9 MB</span>
        </div>
      </div>
    );
  }

  if (id === "lossless") {
    return (
      <div className="space-y-3">
        <div className="font-mono text-xs uppercase tracking-[0.15em] text-[#625d57]">Recall Pipeline</div>
        {["1 — Index", "2 — Trigger", "3 — Raw", "4 — Detail", "5 — Summary"].map((step, i) => (
          <div key={step} className="flex items-center gap-4 p-4 border border-[#d6d0c8]">
            <span className="font-mono text-xs font-bold text-[#1a1815] w-6">{i + 1}</span>
            <div>
              <div className="font-mono text-base font-bold">{step.split(" — ")[1]}</div>
              <div className="text-base text-[#625d57]">
                {["Find memory branch", "Match conditions", "Retrieve raw data", "Extract sub-info", "Return compressed"][i]}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (id === "policy") {
    return (
      <div className="space-y-3">
        <div className="font-mono text-xs uppercase tracking-[0.15em] text-[#625d57]">Memory Classification</div>
        {[
          { type: "Tool", retention: "Per-task", desc: "CLI outputs, file reads, API responses" },
          { type: "Session", retention: "Per-session", desc: "Conversation context, decisions" },
          { type: "MCP", retention: "Persistent", desc: "Server state, capabilities" },
          { type: "Skill", retention: "Permanent", desc: "Learned patterns, verified solutions" },
        ].map((m) => (
          <div key={m.type} className="flex items-start gap-4 p-4 border border-[#d6d0c8]">
            <span className="font-mono text-base font-bold w-16 shrink-0">{m.type}</span>
            <div className="flex-1">
              <span className="font-mono text-xs border border-[#d6d0c8] px-1.5 py-0.5 mb-1 inline-block">{m.retention}</span>
              <div className="text-base text-[#625d57] mt-1">{m.desc}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (id === "heartbeat") {
    return (
      <div className="space-y-3">
        <div className="font-mono text-xs uppercase tracking-[0.15em] text-[#625d57]">Agent Heartbeat</div>
        {[
          { time: "03:14", event: "Cron: test suite scan", note: "2 failures" },
          { time: "03:15", event: "Memory: pattern stored", note: "node added" },
          { time: "06:00", event: "Cron: dependency audit", note: "all current" },
          { time: "09:22", event: "Session start: Daniel", note: "3 nodes loaded" },
        ].map((log) => (
          <div key={log.time} className="flex items-center gap-4 p-3 border-b border-[#d6d0c8] last:border-0">
            <span className="font-mono text-base text-[#625d57] w-10 shrink-0 tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>{log.time}</span>
            <span className="text-base flex-1">{log.event}</span>
            <span className="font-mono text-xs text-[#625d57]">{log.note}</span>
          </div>
        ))}
      </div>
    );
  }

  if (id === "sharing") {
    return (
      <div>
        <div className="font-mono text-xs uppercase tracking-[0.15em] text-[#625d57] mb-6">Cross-Session</div>
        <div className="flex gap-6 justify-center mb-6">
          {["A", "B", "C"].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 border border-[#d6d0c8] flex items-center justify-center font-mono text-base">{s}</div>
              <span className="font-mono text-xs text-[#625d57]">Session {s}</span>
              <div className="h-8 border-l border-dashed border-[#d6d0c8]" />
            </div>
          ))}
        </div>
        <div className="border border-[#1a1815] p-4 text-center mx-auto max-w-[280px]">
          <div className="font-mono text-xs font-bold mb-1">Shared Node</div>
          <div className="text-base text-[#625d57]">Bug pattern from A, available to all</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="font-mono text-xs uppercase tracking-[0.15em] text-[#625d57]">Compounding</div>
      {[
        { run: "#1", result: "Test failed: auth timeout", pct: "15%" },
        { run: "#7", result: "Same root cause in 3 files", pct: "35%" },
        { run: "#23", result: "Auto-fix applied, passed", pct: "68%" },
        { run: "#51", result: "Prevented regression", pct: "91%" },
      ].map((row) => (
        <div key={row.run} className="flex items-center gap-4 p-3 border-b border-[#d6d0c8] last:border-0">
          <span className="font-mono text-base text-[#625d57] w-8 shrink-0 tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>{row.run}</span>
          <span className="text-base flex-1">{row.result}</span>
          <div className="w-20 shrink-0">
            <div className="h-1 bg-[#d6d0c8]">
              <div className="h-full bg-[#1a1815]" style={{ width: row.pct }} />
            </div>
          </div>
        </div>
      ))}
      <div className="font-mono text-xs text-[#625d57] mt-2">Each failure makes the agent smarter.</div>
    </div>
  );
}

export function EinkSolution() {
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
    <section className="py-24 px-8 border-t border-[#d6d0c8]" id="solution">
      <div className="max-w-[1000px] mx-auto">
        <div className="mb-12">
          <div className="font-mono text-xs uppercase tracking-[0.15em] text-[#1a1815] mb-3 underline underline-offset-4 decoration-[#d6d0c8]">
            The Solution
          </div>
          <h2 className="text-[2.5rem] md:text-[3rem] font-mono font-bold leading-[1.1] tracking-tight" style={{ lineHeight: 1.1 }}>
            CoMeT &amp; CoBrA
          </h2>
          <p className="text-base text-[#625d57] leading-relaxed mt-3 max-w-[440px]">
            Six capabilities that transform how agents remember, recall, and evolve.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 items-start">
          {/* Left: sticky tabs */}
          <div className="hidden md:block sticky top-20 self-start">
            {features.map((f) => (
              <button
                key={f.id}
                onClick={() => handleClick(f.id)}
                className="flex items-start gap-3 py-3 border-b border-[#d6d0c8] bg-transparent border-x-0 border-t-0 cursor-pointer text-left min-h-[44px] w-full"
                style={{ fontFamily: "inherit" }}
              >
                <div className={`w-[2px] self-stretch shrink-0 transition-colors duration-200 ${active === f.id ? "bg-[#1a1815]" : "bg-transparent"}`} />
                <div>
                  <div className={`font-mono text-base font-bold tracking-tight transition-colors duration-200 ${active === f.id ? "text-[#1a1815]" : "text-[#625d57]"}`}>
                    {f.label}
                  </div>
                  {active === f.id && (
                    <p className="text-base text-[#625d57] leading-relaxed mt-1 max-w-[190px]">
                      {f.desc}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Right: scrollable panels */}
          <div className="flex flex-col gap-0">
            {features.map((f) => (
              <div
                key={f.id}
                ref={(el) => { panelRefs.current[f.id] = el; }}
                className="min-h-[80vh] flex flex-col justify-center py-8"
              >
                <h3 className="font-mono text-xl font-bold tracking-tight mb-2 md:hidden" style={{ lineHeight: 1.2 }}>{f.label}</h3>
                <p className="text-base text-[#625d57] mb-6 md:hidden">{f.desc}</p>
                <div className="border border-[#d6d0c8] p-6 bg-[#ede8e1]">
                  <DemoContent id={f.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
