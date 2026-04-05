"use client";

import { motion } from "@/components/motion";

const STATS = [
  { label: "red-team caught", value: "12/12", state: "pass" },
  { label: "catalis code score", value: "99/100", state: "pass" },
  { label: "last composite", value: "61 → 99", state: "delta" },
];

function StatCard({ label, value, state, delay }: { label: string; value: string; state: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="border border-white/[0.08] rounded-[12px] px-5 py-4 bg-white/[0.02] backdrop-blur-sm"
    >
      <div className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.12em] text-[#8a8a8a] mb-2">
        {label}
      </div>
      <div
        className={`font-[family-name:var(--font-geist-mono)] text-2xl tracking-tight tabular-nums ${
          state === "pass" ? "text-[#00d9a5]" : "text-[#f5f5f5]"
        }`}
      >
        {value}
      </div>
    </motion.div>
  );
}

export function UdHero() {
  return (
    <section id="top" className="relative pt-32 md:pt-40 pb-20 md:pb-28 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-16 items-end">
          {/* LEFT — title */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="inline-flex items-center gap-2 mb-8 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d9a5]" />
              <span className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.14em] text-[#8a8a8a]">
                v4 pillar · shipping
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-geist-mono)] text-[clamp(3rem,9vw,8rem)] leading-[0.9] tracking-[-0.04em] text-[#f5f5f5]"
            >
              Stop shipping
              <br />
              <span className="text-[#4a4a4a]">AI </span>
              <span className="text-[#00d9a5]">slop.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 max-w-xl text-[#8a8a8a] text-base md:text-lg leading-relaxed"
            >
              A design harness that writes taste into the model, then catches
              what the model still gets wrong. Memory you can query, verify you
              can trust, zero generic AI output.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-10 inline-flex items-center gap-3 px-5 py-3 rounded-[10px] bg-white/[0.03] border border-white/[0.08] font-[family-name:var(--font-geist-mono)] text-[13px]"
            >
              <span className="text-[#00d9a5]">$</span>
              <span className="text-[#f5f5f5]">npx udesigner init</span>
              <span className="text-[#4a4a4a] ml-2">↵</span>
            </motion.div>
          </div>

          {/* RIGHT — stat cards */}
          <div className="flex flex-col gap-3 lg:pb-2">
            {STATS.map((s, i) => (
              <StatCard key={s.label} {...s} delay={0.15 + i * 0.08} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
