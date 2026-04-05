"use client";

import { motion } from "@/components/motion";

const MEMORY_TREE = [
  ".udesigner/memory/",
  "├── sum.md                  # Tier 1 — always loaded",
  "├── clusters/",
  "│   ├── warm-editorial.md   # Tier 2 — trigger-matched",
  "│   └── index.json",
  "└── shipped/",
  "    └── 2026-04-05-catalis/ # Tier 3 — tool-call only",
  "        ├── node.json",
  "        ├── tokens.json",
  "        ├── source-fingerprint.json",
  "        └── prompt.md",
];

const LANES = [
  { name: "Visual", weight: 45, color: "#00d9a5", sees: "rendered pixels", tool: "vision sub-agent" },
  { name: "Code", weight: 40, color: "#ffd166", sees: "source AST", tool: "@babel/parser + 20 rules" },
  { name: "Mechanical", weight: 15, color: "#4a9eff", sees: "runtime DOM", tool: "Playwright specs" },
];

export function UdPillars() {
  return (
    <section id="pillars" className="px-6 md:px-12 py-24 md:py-32 bg-[#0d0d0d]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.14em] text-[#4a4a4a]">
            // architecture
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-geist-mono)] text-3xl md:text-5xl tracking-[-0.02em] text-[#f5f5f5] max-w-3xl">
            Two load-bearing pillars.
            <br />
            <span className="text-[#4a4a4a]">Everything else is scaffolding.</span>
          </h2>
        </motion.div>

        {/* Pillar A — 60/40 split */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-14 mb-10 items-start"
        >
          <div className="pt-2">
            <div className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.14em] text-[#00d9a5] mb-4">
              pillar a
            </div>
            <h3 className="font-[family-name:var(--font-geist-mono)] text-2xl md:text-3xl tracking-[-0.02em] text-[#f5f5f5] mb-4">
              Design Memory
            </h3>
            <p className="text-[#8a8a8a] text-[15px] leading-relaxed mb-5">
              Not an anti-pattern log. A 3-tier tree that stores taste as
              visual + structural intent. CoMeT-inspired. Agent reads Tier 1
              always, Tier 2 on trigger match, Tier 3 only via tool calls.
            </p>
            <div className="flex flex-wrap gap-2">
              {["sum.md", "clusters/", "shipped/", "tool-call recall"].map((t) => (
                <span
                  key={t}
                  className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[#8a8a8a] px-2.5 py-1 rounded-md border border-white/[0.08] bg-white/[0.02]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <pre className="rounded-[12px] border border-white/[0.08] bg-[#050505] px-6 py-5 font-[family-name:var(--font-geist-mono)] text-[12px] leading-[1.75] text-[#8a8a8a] overflow-x-auto">
            {MEMORY_TREE.map((line, i) => (
              <div key={i} className={i === 0 ? "text-[#f5f5f5]" : ""}>
                {line}
              </div>
            ))}
          </pre>
        </motion.div>

        {/* Pillar B — 40/60 split (inverted) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-14 items-start"
        >
          <div className="order-2 lg:order-1">
            <div className="flex flex-col gap-3">
              {LANES.map((lane) => (
                <div
                  key={lane.name}
                  className="rounded-[12px] border border-white/[0.08] bg-white/[0.02] px-5 py-4"
                >
                  <div className="flex items-baseline justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="font-[family-name:var(--font-geist-mono)] text-[18px] text-[#f5f5f5]"
                      >
                        {lane.name}
                      </span>
                      <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[#4a4a4a] uppercase tracking-wider">
                        sees {lane.sees}
                      </span>
                    </div>
                    <span
                      className="font-[family-name:var(--font-geist-mono)] text-xl tabular-nums"
                      style={{ color: lane.color }}
                    >
                      {lane.weight}%
                    </span>
                  </div>
                  <div className="h-1 rounded-full bg-white/[0.04] overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full origin-left"
                      style={{ backgroundColor: lane.color, width: `${lane.weight}%` }}
                    />
                  </div>
                  <div className="mt-3 font-[family-name:var(--font-geist-mono)] text-[11px] text-[#8a8a8a]">
                    {lane.tool}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 pt-2">
            <div className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.14em] text-[#ffd166] mb-4">
              pillar b
            </div>
            <h3 className="font-[family-name:var(--font-geist-mono)] text-2xl md:text-3xl tracking-[-0.02em] text-[#f5f5f5] mb-4">
              Design Oracle
            </h3>
            <p className="text-[#8a8a8a] text-[15px] leading-relaxed">
              Independent read-only agent. Three lanes score from their own
              evidence, never cross-contaminate. Composite renormalizes when
              lanes are skipped. Implementing agent cannot self-verify.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
