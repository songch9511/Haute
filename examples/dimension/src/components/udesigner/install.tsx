"use client";

import { motion } from "@/components/motion";

export function UdInstall() {
  return (
    <section id="install" className="px-6 md:px-12 py-24 md:py-28">
      <div className="max-w-[1040px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.14em] text-[#4a4a4a]">
            // install
          </span>
          <h2 className="mt-3 mb-10 font-[family-name:var(--font-geist-mono)] text-3xl md:text-5xl tracking-[-0.02em] text-[#f5f5f5]">
            One command.
            <br />
            <span className="text-[#4a4a4a]">Then start designing.</span>
          </h2>

          <div className="rounded-[14px] border border-white/[0.08] bg-[#050505] overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.05]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]" />
              <span className="ml-3 font-[family-name:var(--font-geist-mono)] text-[11px] text-[#4a4a4a]">
                ~/your-project
              </span>
            </div>
            <div className="px-6 md:px-8 py-7 md:py-8 flex items-center gap-4 md:gap-5 font-[family-name:var(--font-geist-mono)] text-[15px] md:text-[18px]">
              <span className="text-[#00d9a5] shrink-0">$</span>
              <span className="text-[#f5f5f5] flex-1 min-w-0 break-all md:break-normal">
                npx @udesigner/verifier examples/my-page
              </span>
              <button
                type="button"
                className="shrink-0 text-[11px] uppercase tracking-[0.14em] text-[#8a8a8a] hover:text-[#f5f5f5] transition-colors duration-200 px-3 py-1.5 rounded-md border border-white/[0.08] bg-white/[0.02]"
                aria-label="Copy install command"
              >
                copy
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.12em] text-[#4a4a4a]">
            <span>◇ zero config</span>
            <span>◇ ast + vision</span>
            <span>◇ pr gh-action ready</span>
            <span>◇ local-first</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
