"use client";

import { motion } from "framer-motion";
import { springs } from "@/components/motion";

export function Nav() {
  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between h-16 px-8 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border)]"
      role="navigation"
      aria-label="Main navigation"
    >
      <a
        href="#"
        className="font-semibold text-[var(--text-primary)] text-lg tracking-tight min-h-[44px] inline-flex items-center"
      >
        Clearpath
      </a>

      <ul className="hidden md:flex gap-8 list-none">
        {["Features", "Results", "Customers", "Pricing", "Docs"].map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={springs.snappy}
        className="px-6 py-3 min-h-[44px] bg-[var(--accent)] text-[var(--bg-primary)] text-sm font-medium rounded-lg cursor-pointer border-none focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2"
      >
        Start free trial
      </motion.button>
    </nav>
  );
}
