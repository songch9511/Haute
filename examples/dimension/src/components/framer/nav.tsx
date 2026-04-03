"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { springs } from "@/components/motion";

const links = ["Product", "Teams", "Resources", "Community", "Support", "Enterprise", "Pricing"];

export function FramerNav() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.95]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.08]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-8"
      style={{
        backgroundColor: useTransform(bgOpacity, (v) => `rgba(10, 10, 10, ${v})`),
        borderBottom: useTransform(borderOpacity, (v) => `1px solid rgba(255,255,255,${v})`),
        backdropFilter: useTransform(bgOpacity, (v) => `blur(${v * 16}px)`),
        WebkitBackdropFilter: useTransform(bgOpacity, (v) => `blur(${v * 16}px)`),
      }}
    >
      <a href="/showcase-framer" className="font-bold text-white text-base tracking-tight min-h-[44px] inline-flex items-center">
        <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="white"><path d="M4 4h16v8H4zM4 12h8v8H4z"/></svg>
      </a>

      <div className="hidden md:flex items-center gap-6">
        {links.map((link) => (
          <a
            key={link}
            href="#"
            className="text-[13px] text-[#999] hover:text-white transition-colors duration-150 min-h-[44px] inline-flex items-center"
          >
            {link}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <a href="#" className="text-[13px] text-[#999] hover:text-white transition-colors duration-150 min-h-[44px] inline-flex items-center">
          Log in
        </a>
        <motion.a
          href="#"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          transition={springs.snappy}
          className="px-4 py-2 min-h-[44px] bg-white text-[#0a0a0a] text-[13px] font-semibold rounded-lg no-underline inline-flex items-center"
        >
          Sign up
        </motion.a>
      </div>
    </motion.nav>
  );
}
