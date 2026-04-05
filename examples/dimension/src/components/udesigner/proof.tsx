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
];

function classFor(kind: string) {
  if (kind === "cmd") return "text-[#f5ede0]";
  if (kind === "err") return "text-[#d97757]";
  if (kind === "warn") return "text-[#c9a980]";
  return "text-[#a0917f]";
}

export function UdProof() {
  return (
    <section className="relative px-6 md:px-12 py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto">
        {/* Editorial header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-12 gap-6 mb-10 items-baseline"
        >
          <span className="col-span-12 md:col-span-2 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#8a3a1e]">
            N° I · Exhibit
          </span>
          <h2 className="col-span-12 md:col-span-8 font-[family-name:var(--font-cormorant)] font-semibold text-[32px] md:text-[44px] leading-[1.05] tracking-[-0.015em] text-[#120e08]">
            The <em className="italic text-[#8a3a1e]">oracle</em> sees everything
            <br className="hidden md:block" />
            the model wanted to hide.
          </h2>
          <span className="col-span-12 md:col-span-2 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#a0917f] md:text-right">
            Red-team run · 2026
          </span>
        </motion.div>

        {/* Terminal exhibit — dark plate on cream ground */}
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="rounded-[6px] border border-[#120e08]/15 bg-[#120e08] overflow-hidden">
            {/* window chrome */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-[#2a1d10]/80">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6b5a4a]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#6b5a4a]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#6b5a4a]" />
              <span className="ml-3 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.14em] text-[#a0917f]">
                ~/udesigner — verification
              </span>
              <span className="ml-auto font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.14em] text-[#6b5a4a]">
                live output
              </span>
            </div>
            {/* terminal body */}
            <pre className="px-7 md:px-10 py-7 md:py-9 font-[family-name:var(--font-geist-mono)] text-[12.5px] leading-[1.75] overflow-x-auto">
              {LINES.map((line, i) => (
                <div key={i} className={classFor(line.kind)}>
                  {line.text || "\u00a0"}
                </div>
              ))}
            </pre>
          </div>
          <figcaption className="mt-4 flex items-baseline justify-between gap-6">
            <span className="font-[family-name:var(--font-cormorant)] font-semibold italic text-[15px] text-[#2a1d10]">
              Twelve planted violations. Twelve caught. Zero escapes.
            </span>
            <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.2em] text-[#a0917f]">
              code-oracle · v1
            </span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
