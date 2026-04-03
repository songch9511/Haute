"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { springs } from "@/components/motion";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About us", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

/* Concave corner SVGs — from reference site */
function CornerLeft() {
  return (
    <svg
      className="absolute top-0 -left-6 w-6 h-6"
      width="24" height="24" viewBox="0 0 24 24" fill="none"
    >
      <path d="M24 24C24 10.7452 13.2548 0 0 0H24V24Z" fill="white" />
    </svg>
  );
}

function CornerRight() {
  return (
    <svg
      className="absolute top-0 -right-6 w-6 h-6"
      width="24" height="24" viewBox="0 0 24 24" fill="none"
    >
      <path d="M0 24C0 10.7452 10.7452 0 24 0H0V24Z" fill="white" />
    </svg>
  );
}

export function CatalisNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  // White strip height: 12px → 0px over 200px scroll
  const stripHeight = useTransform(scrollY, [0, 200], [12, 0]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center">
      {/* Full-width white strip at top — covers hero's rounded corners */}
      <motion.div style={{ height: stripHeight }} className="bg-white w-full shrink-0" />

      {/* Nav content row */}
      <div className="flex justify-center w-full px-[52px]">
        <div className="relative bg-white rounded-b-[24px] p-2 flex items-center gap-8 w-full max-w-[723px]">
          <CornerLeft />
          <CornerRight />

          {/* Logo */}
          <a href="#" className="w-[46px] h-[46px] rounded-full bg-[#131313] flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 28 28" fill="none">
              <path d="M14 0L16.8 11.2L28 14L16.8 16.8L14 28L11.2 16.8L0 14L11.2 11.2L14 0Z" fill="white" />
            </svg>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-8">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-sm text-[#4c4c4c] hover:text-[#131313] transition-colors duration-200">
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
            className="hidden md:inline-flex items-center px-6 py-2.5 bg-[#131313] text-white text-sm font-medium rounded-full hover:bg-[#2a2a2a] transition-colors duration-200"
          >
            Get Started
          </motion.a>

          {/* Mobile Hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden ml-auto w-11 h-11 flex flex-col items-center justify-center gap-1.5" aria-label="Toggle menu">
            <motion.span animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="block w-5 h-px bg-[#131313]" />
            <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-5 h-px bg-[#131313]" />
            <motion.span animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="block w-5 h-px bg-[#131313]" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="md:hidden mt-2 bg-white rounded-2xl p-5 flex flex-col gap-4 shadow-lg">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="text-base text-[#131313]">{link.label}</a>
            ))}
            <a href="#pricing" onClick={() => setMobileOpen(false)} className="inline-flex items-center justify-center px-6 py-3 bg-[#131313] text-white text-sm font-medium rounded-full mt-2">Get Started</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
