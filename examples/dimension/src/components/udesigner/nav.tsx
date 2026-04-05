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
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="flex items-center justify-between gap-6 px-6 md:px-10 lg:px-14 py-3.5 md:py-4 bg-[#faf6ea]/15 backdrop-blur-md">
        <a
          href="#top"
          className="font-[family-name:var(--font-cormorant)] font-semibold text-[20px] md:text-[22px] italic text-[#faf6ea] tracking-tight leading-none"
        >
          UDesigner
          <span className="not-italic text-[#ffd4a8]">.</span>
        </a>

        <div className="hidden md:flex items-center gap-14 lg:gap-[72px]">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-[family-name:var(--font-geist-sans)] text-[15px] md:text-[16px] text-[#faf6ea]/90 hover:text-[#faf6ea] transition-colors duration-200 tracking-[0.005em]"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#install"
          className="font-[family-name:var(--font-cormorant)] font-semibold italic text-[16px] md:text-[18px] text-[#120e08] bg-[#faf6ea] hover:bg-[#ffd4a8] transition-colors duration-300 px-5 md:px-6 py-2 rounded-full leading-none"
        >
          begin
        </a>
      </div>
    </motion.nav>
  );
}
