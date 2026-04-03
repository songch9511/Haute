"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Solutions", href: "#solutions" },
  { label: "Resources", href: "#resources" },
  { label: "Pricing", href: "#pricing" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        fontFamily: "var(--font-inter)",
      }}
    >
      <div className="mx-auto flex items-center justify-between px-4 lg:px-6" style={{ maxWidth: 1252, height: 64 }}>
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="26" height="26" rx="6" stroke="rgba(0,0,0,0.9)" strokeWidth="2" fill="none" />
            <rect x="6" y="8" width="10" height="2" rx="1" fill="rgba(0,0,0,0.9)" />
            <rect x="6" y="13" width="16" height="2" rx="1" fill="rgba(0,0,0,0.9)" />
            <rect x="6" y="18" width="12" height="2" rx="1" fill="rgba(0,0,0,0.9)" />
          </svg>
          <span
            className="font-semibold"
            style={{ fontSize: 16, color: "rgba(0,0,0,0.95)" }}
          >
            Gather
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded transition-colors duration-150"
              style={{
                fontSize: 15,
                color: "rgba(0,0,0,0.54)",
                padding: "6px 12px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.95)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.54)")}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#login"
            className="font-medium transition-colors duration-150"
            style={{
              fontSize: 15,
              color: "rgba(0,0,0,0.54)",
              padding: "6px 12px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.95)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.54)")}
          >
            Log in
          </a>
          <a
            href="#signup"
            className="font-medium rounded-lg transition-colors duration-150 inline-flex items-center justify-center"
            style={{
              height: 36,
              paddingLeft: 14,
              paddingRight: 14,
              backgroundColor: "#0075de",
              color: "#f0f0f0",
              fontSize: 14,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#097fe8")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0075de")}
          >
            Get Gather free
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center"
          style={{ width: 44, height: 44 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {mobileOpen ? (
              <>
                <line x1="4" y1="4" x2="18" y2="18" stroke="rgba(0,0,0,0.9)" strokeWidth="2" strokeLinecap="round" />
                <line x1="18" y1="4" x2="4" y2="18" stroke="rgba(0,0,0,0.9)" strokeWidth="2" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="19" y2="6" stroke="rgba(0,0,0,0.9)" strokeWidth="2" strokeLinecap="round" />
                <line x1="3" y1="11" x2="19" y2="11" stroke="rgba(0,0,0,0.9)" strokeWidth="2" strokeLinecap="round" />
                <line x1="3" y1="16" x2="19" y2="16" stroke="rgba(0,0,0,0.9)" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden mx-4 mb-3"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 16,
              border: "1px solid rgba(0,0,0,0.1)",
              boxShadow:
                "0px 4px 18px rgba(0,0,0,0.04), 0px 2px 7.8px rgba(0,0,0,0.027), 0px 0.8px 2.9px rgba(0,0,0,0.02), 0px 0.2px 1px rgba(0,0,0,0.013)",
              padding: "8px 0",
              fontFamily: "var(--font-inter)",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block transition-colors duration-150"
                style={{
                  fontSize: 15,
                  color: "rgba(0,0,0,0.54)",
                  padding: "12px 20px",
                  minHeight: 44,
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", margin: "4px 0" }} />
            <a
              href="#login"
              className="block transition-colors duration-150"
              style={{
                fontSize: 15,
                color: "rgba(0,0,0,0.54)",
                padding: "12px 20px",
                minHeight: 44,
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => setMobileOpen(false)}
            >
              Log in
            </a>
            <div style={{ padding: "8px 16px 12px" }}>
              <a
                href="#signup"
                className="font-medium rounded-lg transition-colors duration-150 flex items-center justify-center w-full"
                style={{
                  height: 44,
                  backgroundColor: "#0075de",
                  color: "#f0f0f0",
                  fontSize: 15,
                }}
              >
                Get Gather free
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
