"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { springs } from "@/components/motion";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About us", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export function CatalisNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl">
      {/* Floating pill nav with dark background */}
      <div className="bg-[#1a1a1a] rounded-full px-3 py-2 flex items-center justify-between shadow-[0_4px_24px_rgba(0,0,0,0.15)]">
        {/* Logo */}
        <a
          href="#"
          className="w-10 h-10 rounded-full bg-[#2a2a2a] border border-[#3a3a3a] flex items-center justify-center shrink-0"
        >
          <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
            <path
              d="M14 0L16.8 11.2L28 14L16.8 16.8L14 28L11.2 16.8L0 14L11.2 11.2L14 0Z"
              fill="white"
            />
          </svg>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-[#e8e8e8]/70 hover:text-[#e8e8e8] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="#pricing"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={springs.snappy}
          className="hidden md:inline-flex items-center px-5 py-2.5 bg-[#f0f0f0] text-[#131313] text-sm font-medium rounded-full hover:bg-white transition-colors duration-200"
        >
          Get Started
        </motion.a>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-full"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-px bg-[#e8e8e8]"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-5 h-px bg-[#e8e8e8]"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-px bg-[#e8e8e8]"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden mt-2 bg-[#1a1a1a] rounded-2xl p-5 flex flex-col gap-4 shadow-[0_4px_24px_rgba(0,0,0,0.15)]"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base text-[#e8e8e8]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pricing"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center px-6 py-3 bg-[#f0f0f0] text-[#131313] text-sm font-medium rounded-full mt-2"
            >
              Get Started
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
