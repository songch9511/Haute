"use client";

import { motion } from "@/components/motion";

const LINKS = [
  { href: "#pillars", label: "pillars" },
  { href: "#benchmark", label: "benchmark" },
  { href: "#install", label: "install" },
];

export function UdNav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(92vw,1040px)]"
    >
      <div className="flex items-center justify-between gap-6 px-5 py-3 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/[0.08]">
        <a
          href="#top"
          className="font-[family-name:var(--font-geist-mono)] text-[13px] text-[#f5f5f5] tracking-tight"
        >
          udesigner<span className="text-[#00d9a5]">/</span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-[family-name:var(--font-geist-mono)] text-[12px] text-[#8a8a8a] hover:text-[#f5f5f5] transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#install"
          className="font-[family-name:var(--font-geist-mono)] text-[12px] text-[#0a0a0a] bg-[#00d9a5] hover:bg-[#00f0b5] transition-colors duration-200 px-3.5 py-1.5 rounded-full"
        >
          $ npx udesigner
        </a>
      </div>
    </motion.nav>
  );
}
