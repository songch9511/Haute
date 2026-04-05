"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = ["Features", "Plugins", "Pricing"];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06]" style={{ height: 64 }}>
      <div className="absolute inset-0 bg-bg-primary/80 backdrop-blur-xl" />
      <nav
        className="relative z-10 mx-auto h-full flex items-center justify-between"
        style={{ maxWidth: 1280, padding: "0 24px" }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 min-h-[44px]">
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
            <path d="M16 2L28 16L16 30L4 16Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M16 8L22 16L16 24L10 16Z" stroke="currentColor" strokeWidth="1" />
            <circle cx="16" cy="16" r="2" fill="currentColor" />
          </svg>
          <span className="text-[16px] font-semibold font-heading text-text-primary">
            Dimension
          </span>
        </a>

        {/* Desktop links — center */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="px-4 py-2 text-[14px] text-text-secondary hover:text-text-primary transition-colors duration-150"
            >
              {l}
            </a>
          ))}
        </div>

        {/* Desktop CTA — right */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#"
            className="text-[14px] text-text-secondary hover:text-text-primary transition-colors duration-150"
          >
            Log in
          </a>
          <a
            href="#start"
            className="inline-flex items-center justify-center text-[13px] font-medium bg-accent text-bg-primary px-5 h-9 rounded-lg hover:bg-accent-hover transition-colors"
          >
            Start Free
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-11 h-11 flex items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <div className="relative w-5 h-3">
            <span
              className={`absolute left-0 right-0 h-px bg-text-primary transition-all duration-200 ${
                open ? "top-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 right-0 h-px bg-text-primary transition-all duration-200 ${
                open ? "top-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden relative z-10 bg-bg-primary/95 backdrop-blur-xl border-b border-white/[0.06]"
          >
            <div className="py-3">
              {links.map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  className="block px-6 py-3 text-[15px] text-text-secondary hover:text-text-primary"
                  onClick={() => setOpen(false)}
                >
                  {l}
                </a>
              ))}
              <div className="px-5 pt-2 pb-3">
                <a
                  href="#start"
                  className="block text-center text-[14px] font-medium bg-accent text-bg-primary py-3 rounded-lg"
                  onClick={() => setOpen(false)}
                >
                  Start Free
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
