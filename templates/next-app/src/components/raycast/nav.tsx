"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Store", href: "#store" },
  { label: "Pro", href: "#pro" },
  { label: "AI", href: "#ai" },
  { label: "Teams", href: "#teams" },
  { label: "Developers", href: "#developers" },
  { label: "Pricing", href: "#pricing" },
];

export function RaycastNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className="mx-auto flex h-[56px] md:h-[64px] max-w-[1440px] items-center justify-between px-5 md:px-8"
        style={{
          backgroundColor: "rgba(14, 16, 17, 0.8)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 shrink-0 min-h-[44px]">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#ff4c4c", backgroundImage: "linear-gradient(135deg, #ff6363 0%, #ff3563 100%)" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8L7 12L13 4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold text-[#f0f0f0] tracking-[-0.01em]">Raycast</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-2 text-[13.5px] text-[#8a8f93] hover:text-[#f0f0f0] transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="text-[13.5px] text-[#8a8f93] hover:text-[#f0f0f0] transition-colors duration-150">
            Log in
          </a>
          <a
            href="#download"
            className="inline-flex items-center h-[34px] px-4 rounded-lg text-[13px] font-medium text-[#0e1011] transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: "#ff4c4c", backgroundImage: "linear-gradient(135deg, #ff6363 0%, #ff3563 100%)" }}
          >
            Download
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col justify-center gap-[5px] w-11 h-11"
          aria-label="Toggle menu"
        >
          <span className={`block h-[1.5px] w-5 bg-[#8a8f93] transition-all duration-200 ${mobileOpen ? "translate-y-[6.5px] rotate-45" : ""}`} />
          <span className={`block h-[1.5px] w-5 bg-[#8a8f93] transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-[1.5px] w-5 bg-[#8a8f93] transition-all duration-200 ${mobileOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-[56px] left-0 right-0 border-b px-5 py-6 flex flex-col gap-1"
            style={{
              backgroundColor: "rgba(14, 16, 17, 0.95)",
              backdropFilter: "blur(20px)",
              borderColor: "#2a2d2f",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block py-2.5 text-[15px] text-[#8a8f93] hover:text-[#f0f0f0] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 pt-4 border-t border-[#2a2d2f] flex items-center gap-4">
              <a href="#" className="text-[14px] text-[#8a8f93]">Log in</a>
              <a
                href="#download"
                className="inline-flex items-center h-[38px] px-5 rounded-lg text-[13.5px] font-medium text-[#0e1011]"
                style={{ backgroundColor: "#ff4c4c", backgroundImage: "linear-gradient(135deg, #ff6363 0%, #ff3563 100%)" }}
              >
                Download
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
