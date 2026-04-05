"use client";

import { motion } from "@/components/motion";

const MEMORY_TREE = [
  ".udesigner/memory/",
  "├── sum.md                  # Tier I — always loaded",
  "├── clusters/",
  "│   ├── warm-editorial.md   # Tier II — trigger-matched",
  "│   ├── knowledge-tool-dark.md",
  "│   └── mono-dark-tech.md",
  "└── shipped/",
  "    ├── catalis/            # Tier III — tool-call only",
  "    ├── obsidian/",
  "    └── udesigner/",
];

const LANES = [
  { name: "Visual", weight: 45, color: "#8a3a1e", sees: "Rendered pixels", tool: "Vision sub-agent" },
  { name: "Code", weight: 40, color: "#2a1d10", sees: "Source AST", tool: "20 AST rules" },
  { name: "Mechanical", weight: 15, color: "#c9a980", sees: "Runtime DOM", tool: "Playwright specs" },
];

export function UdPillars() {
  return (
    <section id="pillars" className="relative px-6 md:px-12 py-24 md:py-32 bg-[#ede2cd]">
      <div className="max-w-[1280px] mx-auto">
        {/* Editorial header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-12 gap-6 mb-14 md:mb-20 items-baseline"
        >
          <span className="col-span-12 md:col-span-2 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#8a3a1e]">
            N° II · Architecture
          </span>
          <h2 className="col-span-12 md:col-span-8 font-[family-name:var(--font-cormorant)] font-semibold text-[36px] md:text-[56px] leading-[0.98] tracking-[-0.02em] text-[#120e08]">
            Two <em className="italic text-[#8a3a1e]">pillars</em> hold the weight.
            <br />
            <span className="text-[#6b5a4a]">Everything else is scaffolding.</span>
          </h2>
          <span className="col-span-12 md:col-span-2 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#a0917f] md:text-right">
            Memory · Oracle
          </span>
        </motion.div>

        {/* Pillar A — 1fr / 1.4fr */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 mb-14 items-start"
        >
          <div className="lg:pt-3 lg:pr-4 pl-0">
            <div className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#8a3a1e] mb-4">
              Pillar A — Design Memory
            </div>
            <h3 className="font-[family-name:var(--font-cormorant)] font-semibold text-[32px] md:text-[42px] leading-[0.98] tracking-[-0.015em] text-[#120e08] mb-5">
              An <em className="italic">archive</em> you can query.
            </h3>
            <p className="text-[15px] md:text-[17px] leading-[1.6] text-[#2a1d10] font-[family-name:var(--font-geist-sans)] max-w-[38ch]">
              Not an anti-pattern log. A three-tier tree that stores taste as
              visual and structural intent. CoMeT-inspired. The agent reads
              Tier I always, Tier II on trigger match, Tier III only through
              tool calls.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {["sum.md", "clusters/", "shipped/", "tool-call recall"].map((t) => (
                <span
                  key={t}
                  className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.12em] text-[#2a1d10] px-2.5 py-1 rounded-sm border border-[#c4b08c] bg-[#f5ede0]/60"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Memory tree exhibit */}
          <figure>
            <pre className="rounded-[4px] border border-[#120e08]/20 bg-[#f5ede0] px-6 md:px-8 py-6 md:py-7 font-[family-name:var(--font-geist-mono)] text-[12px] leading-[1.85] text-[#2a1d10] overflow-x-auto">
              {MEMORY_TREE.map((line, i) => (
                <div key={i} className={i === 0 ? "text-[#8a3a1e] font-semibold" : ""}>
                  {line}
                </div>
              ))}
            </pre>
            <figcaption className="mt-3 font-[family-name:var(--font-cormorant)] font-semibold italic text-[13px] text-[#6b5a4a]">
              Exhibit II.a — memory tree, three-tier
            </figcaption>
          </figure>
        </motion.div>

        {/* Pillar B — 1.4fr / 1fr inverted */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-start"
        >
          {/* Weight bars exhibit */}
          <figure className="order-2 lg:order-1">
            <div className="rounded-[4px] border border-[#120e08]/20 bg-[#f5ede0] px-6 md:px-8 py-7 flex flex-col gap-5">
              {LANES.map((lane) => (
                <div key={lane.name}>
                  <div className="flex items-baseline justify-between mb-2">
                    <div className="flex items-baseline gap-3">
                      <span className="font-[family-name:var(--font-cormorant)] font-semibold text-[22px] text-[#120e08]">
                        {lane.name}
                      </span>
                      <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.16em] text-[#6b5a4a]">
                        sees {lane.sees}
                      </span>
                    </div>
                    <span
                      className="font-[family-name:var(--font-cormorant)] font-semibold italic text-[26px] tabular-nums"
                      style={{ color: lane.color }}
                    >
                      {lane.weight}%
                    </span>
                  </div>
                  <div className="h-[3px] rounded-full bg-[#c4b08c]/50 overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full origin-left"
                      style={{ backgroundColor: lane.color, width: `${lane.weight}%` }}
                    />
                  </div>
                  <div className="mt-2 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.12em] text-[#a0917f]">
                    {lane.tool}
                  </div>
                </div>
              ))}
            </div>
            <figcaption className="mt-3 font-[family-name:var(--font-cormorant)] font-semibold italic text-[13px] text-[#6b5a4a]">
              Exhibit II.b — oracle lane weights, renormalized on skip
            </figcaption>
          </figure>

          <div className="order-1 lg:order-2 lg:pt-3 lg:pr-0 lg:pl-4 pl-0">
            <div className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#8a3a1e] mb-4">
              Pillar B — Design Oracle
            </div>
            <h3 className="font-[family-name:var(--font-cormorant)] font-semibold text-[32px] md:text-[42px] leading-[0.98] tracking-[-0.015em] text-[#120e08] mb-5">
              Three <em className="italic">lenses</em>, one verdict.
            </h3>
            <p className="text-[15px] md:text-[17px] leading-[1.6] text-[#2a1d10] font-[family-name:var(--font-geist-sans)] max-w-[38ch]">
              An independent read-only agent. Three lanes score from their own
              evidence and never cross-contaminate. The implementing agent
              cannot self-verify. The composite renormalizes when a lane is
              absent.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
