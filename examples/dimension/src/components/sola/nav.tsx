"use client";

import { useState } from "react";

const links = [
  { label: "Shop", href: "#products" },
  { label: "About", href: "#philosophy" },
  { label: "Ingredients", href: "#ingredients" },
];

export function SolaNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: "rgba(250, 246, 240, 0.85)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="/sola" className="text-lg font-medium tracking-wide" style={{ fontFamily: "Outfit, var(--font-geist-sans)", color: "#2c2420" }}>
          sola
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-sm transition-colors duration-150" style={{ color: "#8a7a6e" }}>
              {l.label}
            </a>
          ))}
        </div>

        <a href="#products" className="hidden rounded-full px-5 py-2 text-sm font-medium transition-colors duration-150 md:block" style={{ backgroundColor: "#2c2420", color: "#faf6f0" }}>
          Shop Now
        </a>

        <button type="button" className="flex h-10 w-10 items-center justify-center md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {open ? (
              <><line x1="4" y1="4" x2="16" y2="16" stroke="#2c2420" strokeWidth="1.5" /><line x1="16" y1="4" x2="4" y2="16" stroke="#2c2420" strokeWidth="1.5" /></>
            ) : (
              <><line x1="3" y1="6" x2="17" y2="6" stroke="#2c2420" strokeWidth="1.5" /><line x1="3" y1="10" x2="17" y2="10" stroke="#2c2420" strokeWidth="1.5" /><line x1="3" y1="14" x2="17" y2="14" stroke="#2c2420" strokeWidth="1.5" /></>
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="flex flex-col gap-4 px-6 pb-6 pt-2 md:hidden" style={{ backgroundColor: "rgba(250, 246, 240, 0.95)" }}>
          {links.map((l) => (
            <a key={l.label} href={l.href} className="py-2 text-base" style={{ color: "#8a7a6e" }} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#products" className="mt-2 rounded-full px-5 py-3 text-center text-sm font-medium" style={{ backgroundColor: "#2c2420", color: "#faf6f0" }}>
            Shop Now
          </a>
        </div>
      )}
    </header>
  );
}
