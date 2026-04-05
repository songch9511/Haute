"use client";

import { motion } from "@/components/motion";

const LINES = [
  { kind: "cmd", text: "$ node verifier/code-oracle.js verifier/red-team" },
  { kind: "out", text: "" },
  { kind: "out", text: "Code Oracle — verifier/red-team" },
  { kind: "out", text: "  Files:    1" },
  { kind: "out", text: "  Rules:    20" },
  { kind: "err", text: "  Errors:   6  (×5 penalty)" },
  { kind: "warn", text: "  Warnings: 9  (×1, capped at 30)" },
  { kind: "out", text: "  Score:    61/100" },
  { kind: "out", text: "" },
  { kind: "err", text: "  ✗ [no-useInView-on-hero] × 2" },
  { kind: "err", text: "  ✗ [motion-transform-opacity-only] × 2" },
  { kind: "err", text: "  ✗ [no-purple-blue-gradient] × 1" },
  { kind: "err", text: "  ✗ [no-placeholder-content] × 1" },
  { kind: "warn", text: "  ⚠ [no-bento-pretender] × 1" },
  { kind: "warn", text: "  ⚠ [no-div-onclick] × 1" },
  { kind: "warn", text: "  ⚠ [img-missing-alt] × 1" },
  { kind: "warn", text: "  ⚠ [no-ai-smell-comments] × 1" },
  { kind: "out", text: "" },
  { kind: "caret", text: "12 planted violations. 12 caught. Zero escapes." },
];

function classFor(kind: string) {
  if (kind === "cmd") return "text-[#f5f5f5]";
  if (kind === "err") return "text-[#ff6b6b]";
  if (kind === "warn") return "text-[#ffd166]";
  if (kind === "caret") return "text-[#00d9a5]";
  return "text-[#8a8a8a]";
}

export function UdProof() {
  return (
    <section className="px-6 md:px-12 py-24 md:py-28">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-baseline justify-between mb-5">
            <span className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.14em] text-[#4a4a4a]">
              // proof — red team run
            </span>
            <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[#4a4a4a] tabular-nums">
              2026-04-05 · e6eccce
            </span>
          </div>

          <div className="rounded-[12px] border border-white/[0.08] bg-[#050505] overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.05]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]" />
              <span className="ml-3 font-[family-name:var(--font-geist-mono)] text-[11px] text-[#4a4a4a]">
                ~/udesigner — zsh
              </span>
            </div>
            <pre className="px-6 py-6 font-[family-name:var(--font-geist-mono)] text-[12.5px] leading-[1.65] overflow-x-auto">
              {LINES.map((line, i) => (
                <div key={i} className={classFor(line.kind)}>
                  {line.text || "\u00a0"}
                </div>
              ))}
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
