"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
  { label: "Changelog", href: "#changelog" },
];

export function MeridianNav() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ fontFamily: "var(--font-geist-mono)" }}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
        style={{
          backgroundColor: "rgba(10, 10, 10, 0.8)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        {/* Monogram */}
        <a href="/meridian" className="flex items-center gap-2">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium"
            style={{ backgroundColor: "#00d9a5", color: "#0a0a0a" }}
          >
            M
          </span>
          <span className="text-sm font-medium" style={{ color: "#f5f5f5" }}>
            meridian
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-xs transition-colors duration-150"
              style={{ color: "#8a8a8a" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f5f5f5")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#8a8a8a")}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <motion.button
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-md px-4 py-2 text-xs font-medium transition-colors duration-150"
            style={{ backgroundColor: "#00d9a5", color: "#0a0a0a" }}
          >
            Start Free
          </motion.button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {open ? (
              <>
                <line x1="4" y1="4" x2="16" y2="16" stroke="#f5f5f5" strokeWidth="1.5" />
                <line x1="16" y1="4" x2="4" y2="16" stroke="#f5f5f5" strokeWidth="1.5" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="17" y2="6" stroke="#f5f5f5" strokeWidth="1.5" />
                <line x1="3" y1="10" x2="17" y2="10" stroke="#f5f5f5" strokeWidth="1.5" />
                <line x1="3" y1="14" x2="17" y2="14" stroke="#f5f5f5" strokeWidth="1.5" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="flex flex-col gap-4 px-6 pb-6 pt-2 md:hidden"
          style={{
            backgroundColor: "rgba(10, 10, 10, 0.95)",
            backdropFilter: "blur(16px)",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="py-2 text-sm"
              style={{ color: "#8a8a8a" }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            className="mt-2 rounded-md px-4 py-3 text-sm font-medium"
            style={{ backgroundColor: "#00d9a5", color: "#0a0a0a" }}
          >
            Start Free
          </button>
        </div>
      )}
    </header>
  );
}
