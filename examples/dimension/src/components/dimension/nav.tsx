"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-border bg-bg-main">
      <nav className="mx-auto max-w-[1600px] h-full px-10 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="relative w-[140px] h-[40px]">
          <Image
            src="/logo.svg"
            alt="The Dimension Company"
            fill
            className="object-contain object-left"
            priority
          />
        </a>

        {/* Center links — zoo.dev style uppercase */}
        <div className="hidden lg:flex items-center gap-10">
          {["Product", "Docs", "Pricing", "Enterprise"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[11px] font-medium tracking-[0.15em] uppercase hover:opacity-40 transition-opacity duration-150"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#"
            className="text-[11px] font-medium tracking-[0.12em] uppercase border border-border px-4 py-2 rounded-[var(--radius)] hover:bg-accent hover:text-text-inverted transition-colors duration-150"
          >
            Sign In
          </a>
          <a
            href="#waitlist"
            className="text-[11px] font-medium tracking-[0.12em] uppercase bg-accent text-text-inverted px-4 py-2 rounded-[var(--radius)] hover:opacity-80 transition-opacity duration-150"
          >
            Join Waitlist
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden w-10 h-10 flex items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-b border-border bg-bg-main overflow-hidden"
          >
            <div className="px-10 py-8 flex flex-col gap-5">
              {["Product", "Docs", "Pricing", "Enterprise"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-[14px] font-medium tracking-[0.1em] uppercase border-b border-border-light pb-3"
                  onClick={() => setOpen(false)}
                >
                  {link}
                </a>
              ))}
              <a
                href="#waitlist"
                className="mt-2 text-center text-[13px] font-semibold bg-accent text-text-inverted px-5 py-3 rounded-[var(--radius)]"
                onClick={() => setOpen(false)}
              >
                Join Waitlist
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
