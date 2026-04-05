"use client";

import { motion } from "@/components/motion";

type Row = {
  target: string;
  files: number;
  errors: number;
  warnings: number;
  score: number;
  verdict: "PASS" | "WARN" | "REJECT";
};

const BEFORE: Row[] = [
  { target: "examples/dimension/components/catalis", files: 12, errors: 4, warnings: 1, score: 79, verdict: "WARN" },
  { target: "verifier/red-team", files: 1, errors: 6, warnings: 9, score: 61, verdict: "REJECT" },
];

const AFTER: Row[] = [
  { target: "examples/dimension/components/catalis", files: 12, errors: 0, warnings: 1, score: 99, verdict: "PASS" },
  { target: "verifier/red-team", files: 1, errors: 6, warnings: 9, score: 61, verdict: "REJECT" },
];

function verdictClass(v: Row["verdict"]) {
  if (v === "PASS") return "text-[#00d9a5]";
  if (v === "WARN") return "text-[#ffd166]";
  return "text-[#ff6b6b]";
}

function Table({ rows, label }: { rows: Row[]; label: string }) {
  return (
    <div className="rounded-[12px] border border-white/[0.08] bg-[#050505] overflow-hidden">
      <div className="px-5 py-3 border-b border-white/[0.05] flex items-baseline justify-between">
        <span className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.14em] text-[#8a8a8a]">
          {label}
        </span>
        <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[#4a4a4a]">
          code-oracle v1
        </span>
      </div>
      <div className="px-5 py-4 font-[family-name:var(--font-geist-mono)] text-[12.5px] leading-[1.9] overflow-x-auto">
        <div className="grid grid-cols-[2fr_0.5fr_0.6fr_0.7fr_0.6fr_0.7fr] gap-4 pb-2 mb-2 border-b border-white/[0.05] text-[#4a4a4a] text-[11px] uppercase tracking-[0.1em]">
          <span>target</span>
          <span className="text-right">files</span>
          <span className="text-right">err</span>
          <span className="text-right">warn</span>
          <span className="text-right">score</span>
          <span className="text-right">verdict</span>
        </div>
        {rows.map((r, i) => (
          <div
            key={i}
            className="grid grid-cols-[2fr_0.5fr_0.6fr_0.7fr_0.6fr_0.7fr] gap-4 py-1 text-[#8a8a8a]"
          >
            <span className="text-[#f5f5f5] truncate">{r.target}</span>
            <span className="text-right tabular-nums">{r.files}</span>
            <span className={`text-right tabular-nums ${r.errors > 0 ? "text-[#ff6b6b]" : ""}`}>
              {r.errors}
            </span>
            <span className={`text-right tabular-nums ${r.warnings > 0 ? "text-[#ffd166]" : ""}`}>
              {r.warnings}
            </span>
            <span
              className={`text-right tabular-nums ${
                r.score >= 90 ? "text-[#00d9a5]" : r.score >= 70 ? "text-[#ffd166]" : "text-[#ff6b6b]"
              }`}
            >
              {r.score}
            </span>
            <span className={`text-right ${verdictClass(r.verdict)}`}>{r.verdict}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function UdBenchmark() {
  return (
    <section id="benchmark" className="px-6 md:px-12 py-16 md:py-24 bg-[#0d0d0d]">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 max-w-3xl"
        >
          <span className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.14em] text-[#4a4a4a]">
            // benchmark
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-geist-mono)] text-3xl md:text-5xl tracking-[-0.02em] text-[#f5f5f5]">
            Fix loop, proven live.
          </h2>
          <p className="mt-4 text-[#8a8a8a] text-[15px] leading-relaxed">
            Real numbers from the session that shipped this page. Code Oracle
            flagged 4 motion-prop errors in Catalis, pointed at them, we fixed,
            rescored. +20 in one pass. No manual review.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5"
        >
          <Table rows={BEFORE} label="before — commit 72682e0" />
          <Table rows={AFTER} label="after — commit e6eccce" />
        </motion.div>
      </div>
    </section>
  );
}
