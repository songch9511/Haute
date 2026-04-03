"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { springs } from "@/components/motion";

export function CometNav() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.95]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-8"
      style={{
        backgroundColor: useTransform(bgOpacity, (v) => `rgba(10, 10, 10, ${v})`),
        borderBottom: useTransform(bgOpacity, (v) => `1px solid rgba(255,255,255,${v * 0.06})`),
        backdropFilter: useTransform(bgOpacity, (v) => `blur(${v * 16}px)`),
        WebkitBackdropFilter: useTransform(bgOpacity, (v) => `blur(${v * 16}px)`),
      }}
    >
      <a href="/comet" className="font-bold text-white text-base tracking-tight min-h-[44px] inline-flex items-center gap-2">
        <span className="w-6 h-6 rounded-md bg-[#10b981] flex items-center justify-center text-[10px] font-bold text-[#0a0a0a]">C</span>
        CoMeT
      </a>

      <div className="hidden md:flex items-center gap-6">
        {["Problem", "Solution", "Architecture", "Use Cases"].map((link) => (
          <a key={link} href={`#${link.toLowerCase().replace(" ", "-")}`} className="text-[13px] text-[#9ca3af] hover:text-white transition-colors duration-150 min-h-[44px] inline-flex items-center">
            {link}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <a href="#" className="text-[13px] text-[#9ca3af] hover:text-white transition-colors duration-150 min-h-[44px] min-w-[44px] inline-flex items-center justify-center">
          Docs
        </a>
        <motion.a
          href="#cta"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          transition={springs.snappy}
          className="px-4 py-2 min-h-[44px] bg-[#10b981] text-[#0a0a0a] text-[13px] font-semibold rounded-lg no-underline inline-flex items-center"
        >
          Get Started
        </motion.a>
      </div>
    </motion.nav>
  );
}
