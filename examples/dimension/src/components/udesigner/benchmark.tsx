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
  { target: "components/catalis", files: 12, errors: 4, warnings: 1, score: 79, verdict: "WARN" },
  { target: "verifier/red-team", files: 1, errors: 6, warnings: 9, score: 61, verdict: "REJECT" },
];

const AFTER: Row[] = [
  { target: "components/catalis", files: 12, errors: 0, warnings: 1, score: 99, verdict: "PASS" },
  { target: "verifier/red-team", files: 1, errors: 6, warnings: 9, score: 61, verdict: "REJECT" },
];

function verdictColor(v: Row["verdict"]) {
  if (v === "PASS") return "#4a6a45";
  if (v === "WARN") return "#a88520";
  return "#a84420";
}

function scoreColor(s: number) {
  if (s >= 90) return "#4a6a45";
  if (s >= 70) return "#a88520";
  return "#a84420";
}

function Ledger({ rows, label, epoch }: { rows: Row[]; label: string; epoch: string }) {
  return (
    <figure>
      <div className="flex items-baseline justify-between pb-3 border-b border-[#120e08]">
        <span className="font-[family-name:var(--font-cormorant)] font-semibold italic text-[20px] text-[#120e08]">
          {label}
        </span>
        <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.18em] text-[#6b5a4a]">
          {epoch}
        </span>
      </div>
      <div className="pt-4 font-[family-name:var(--font-geist-mono)] text-[12.5px] leading-[2]">
        <div className="grid grid-cols-[2fr_0.5fr_0.5fr_0.6fr_0.6fr_0.7fr] gap-4 pb-2 border-b border-[#d4c4a8] text-[#a0917f] text-[9px] uppercase tracking-[0.18em]">
          <span>Target</span>
          <span className="text-right">Files</span>
          <span className="text-right">Err</span>
          <span className="text-right">Warn</span>
          <span className="text-right">Score</span>
          <span className="text-right">Verdict</span>
        </div>
        {rows.map((r, i) => (
          <div
            key={i}
            className="grid grid-cols-[2fr_0.5fr_0.5fr_0.6fr_0.6fr_0.7fr] gap-4 py-1 text-[#2a1d10]"
          >
            <span className="truncate italic font-[family-name:var(--font-cormorant)] font-semibold text-[15px] text-[#120e08]">
              {r.target}
            </span>
            <span className="text-right tabular-nums">{r.files}</span>
            <span className="text-right tabular-nums" style={{ color: r.errors > 0 ? "#a84420" : "#a0917f" }}>
              {r.errors}
            </span>
            <span className="text-right tabular-nums" style={{ color: r.warnings > 0 ? "#a88520" : "#a0917f" }}>
              {r.warnings}
            </span>
            <span className="text-right tabular-nums" style={{ color: scoreColor(r.score) }}>
              {r.score}
            </span>
            <span className="text-right" style={{ color: verdictColor(r.verdict) }}>
              {r.verdict}
            </span>
          </div>
        ))}
      </div>
    </figure>
  );
}

export function UdBenchmark() {
  return (
    <section id="benchmark" className="relative px-6 md:px-12 py-24 md:py-32 bg-[#ede2cd]">
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-12 gap-6 mb-14 items-baseline"
        >
          <span className="col-span-12 md:col-span-2 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#8a3a1e]">
            N° IV · Ledger
          </span>
          <h2 className="col-span-12 md:col-span-8 font-[family-name:var(--font-cormorant)] font-semibold text-[36px] md:text-[52px] leading-[1.0] tracking-[-0.02em] text-[#120e08]">
            A fix loop, <em className="italic text-[#8a3a1e]">proven live.</em>
          </h2>
          <span className="col-span-12 md:col-span-2 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#a0917f] md:text-right">
            Catalis · +20
          </span>
        </motion.div>

        <p className="max-w-[62ch] text-[15px] md:text-[17px] leading-[1.65] text-[#2a1d10] font-[family-name:var(--font-geist-sans)] mb-12">
          Actual numbers from the session that shipped this page. Code Oracle flagged four motion-prop errors in
          the Catalis components. The suggestions pointed at the exact lines. We fixed, re-scored. Twenty points
          in a single pass, no manual review.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14"
        >
          <Ledger rows={BEFORE} label="Before the intervention" epoch="commit 72682e0" />
          <Ledger rows={AFTER} label="After the intervention" epoch="commit e6eccce" />
        </motion.div>
      </div>
    </section>
  );
}
