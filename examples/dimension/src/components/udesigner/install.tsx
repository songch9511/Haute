"use client";

import { motion } from "@/components/motion";

const CONSTABLE_URL = "/art/constable-haywain.jpg";

export function UdInstall() {
  return (
    <section id="install" className="relative overflow-hidden">
      {/* Painting band — extends full section height, meets footer at the bottom with no seam */}
      <div className="relative min-h-[780px] md:min-h-[880px]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("${CONSTABLE_URL}")`,
            backgroundSize: "cover",
            backgroundPosition: "center 38%",
            backgroundColor: "#c9a980",
          }}
        />
        {/* Top fade — softens the transition from benchmark cream */}
        <div
          className="absolute inset-x-0 top-0 h-[280px] md:h-[340px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(250,246,234,0.92) 0%, rgba(250,246,234,0.5) 40%, rgba(250,246,234,0) 100%)",
          }}
        />
        {/* Bottom fade — gradient to footer black, natural transition */}
        <div
          className="absolute inset-x-0 bottom-0 h-[180px] md:h-[200px] pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(18,14,8,0) 0%, rgba(18,14,8,0.35) 40%, rgba(18,14,8,0.85) 80%, rgba(18,14,8,1) 100%)",
          }}
        />

        {/* Attribution top-left inside painting band */}
        <div className="absolute top-5 md:top-6 left-6 md:left-12 font-[family-name:var(--font-cormorant)] font-semibold italic text-[13px] text-[#2a1d10]">
          The Hay Wain,
          <span className="not-italic text-[#6b5a4a]"> John Constable, 1821 · Exhibit N° III</span>
        </div>

        {/* CTA card — positioned inside the painting band with padding above and meaningful gap before the footer */}
        <div className="relative px-6 md:px-12 pt-[260px] md:pt-[320px] pb-[220px] md:pb-[240px]">
          <div className="max-w-[1040px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#faf6ea] border border-[#120e08]/12 rounded-[6px] px-8 md:px-14 py-12 md:py-16"
            >
              <div className="grid grid-cols-12 gap-6 items-baseline mb-8">
                <span className="col-span-6 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#8a3a1e]">
                  N° V · Invitation
                </span>
                <span className="col-span-6 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#a0917f] text-right">
                  Local-first · Zero config
                </span>
              </div>

              <h2 className="font-[family-name:var(--font-cormorant)] font-semibold text-[44px] md:text-[72px] leading-[0.98] tracking-[-0.025em] text-[#120e08] mb-8">
                Begin <em className="italic text-[#8a3a1e]">the session.</em>
              </h2>

              <p className="max-w-[52ch] text-[16px] md:text-[18px] leading-[1.6] text-[#2a1d10] font-[family-name:var(--font-geist-sans)] mb-10">
                One command opens the archive, wakes the oracle, and prepares the
                page for a first verdict. No account. No dashboard. Nothing to
                configure.
              </p>

              {/* Terminal exhibit */}
              <div className="rounded-[4px] border border-[#120e08]/30 bg-[#120e08] overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-2.5 border-b border-[#2a1d10]">
                  <span className="w-2 h-2 rounded-full bg-[#6b5a4a]" />
                  <span className="w-2 h-2 rounded-full bg-[#6b5a4a]" />
                  <span className="w-2 h-2 rounded-full bg-[#6b5a4a]" />
                  <span className="ml-3 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.14em] text-[#a0917f]">
                    ~/your-project
                  </span>
                </div>
                <div className="px-6 md:px-8 py-7 md:py-9 flex items-center gap-4 font-[family-name:var(--font-geist-mono)] text-[15px] md:text-[18px]">
                  <span className="text-[#c9a980] shrink-0">$</span>
                  <span className="text-[#faf6ea] flex-1 min-w-0 break-all md:break-normal">
                    npx @udesigner/verifier examples/my-page
                  </span>
                  <button
                    type="button"
                    className="shrink-0 font-[family-name:var(--font-cormorant)] font-semibold italic text-[14px] text-[#a0917f] hover:text-[#faf6ea] transition-colors duration-200 px-3 py-1.5 rounded-sm border border-[#2a1d10] hover:border-[#a0917f]"
                    aria-label="Copy install command"
                  >
                    copy
                  </button>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-baseline gap-x-8 gap-y-3">
                {["◇ Zero config", "◇ AST + Vision", "◇ PR GH Action", "◇ Local-first"].map((l) => (
                  <span
                    key={l}
                    className="font-[family-name:var(--font-cormorant)] font-semibold italic text-[15px] text-[#6b5a4a]"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
