"use client";

import { motion } from "@/components/motion";

const LINKS = [
  { href: "#pillars", label: "Architecture" },
  { href: "#benchmark", label: "Benchmark" },
  { href: "#install", label: "Session" },
];

export function UdNav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[min(94vw,1280px)]"
    >
      <div className="flex items-baseline justify-between gap-6 px-6 md:px-8 py-3.5 rounded-full bg-[#faf7f0]/90 backdrop-blur-xl border border-[#c4ae82]/50">
        <a
          href="#top"
          className="font-[family-name:var(--font-cormorant)] font-semibold text-[20px] italic text-[#120e08] tracking-tight leading-none"
        >
          UDesigner
          <span className="not-italic text-[#8a3a1e]">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-[family-name:var(--font-geist-sans)] text-[13px] text-[#2a1d10] hover:text-[#8a3a1e] transition-colors duration-200 tracking-[0.01em]"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#install"
          className="font-[family-name:var(--font-cormorant)] font-semibold italic text-[16px] text-[#faf7f0] bg-[#120e08] hover:bg-[#8a3a1e] transition-colors duration-300 px-5 py-1.5 rounded-full leading-none"
        >
          begin
        </a>
      </div>
    </motion.nav>
  );
}
