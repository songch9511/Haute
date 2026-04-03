"use client";

import { useState } from "react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Plugins", href: "#plugins" },
  { label: "Sync", href: "#sync" },
  { label: "Publish", href: "#publish" },
  { label: "Pricing", href: "#pricing" },
];

export function ObsidianNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-[66px] flex items-center justify-between px-6 md:px-12 lg:px-[100px] border-b"
      style={{
        backgroundColor: "rgba(22, 22, 22, 0.7)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        borderColor: "rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Logo */}
      <a
        href="/obsidian"
        className="flex items-center gap-2.5 min-h-[44px]"
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M14 2L4 8v12l10 6 10-6V8L14 2z"
            fill="hsl(254, 80%, 72%)"
            fillOpacity="0.9"
          />
          <path
            d="M14 2L4 8l10 6 10-6L14 2z"
            fill="hsl(254, 80%, 78%)"
            fillOpacity="0.6"
          />
        </svg>
        <span
          className="text-[15px] font-semibold tracking-[2px] uppercase text-[#dadada]"
          style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        >
          Prism
        </span>
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-0">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-[#bababa] hover:text-[#dadada] text-[15px] px-4 leading-[66px] transition-colors duration-150"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Desktop CTA */}
      <div className="hidden md:flex items-center gap-3">
        <a
          href="#download"
          className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-md text-[15px] font-semibold text-white transition-colors duration-150"
          style={{ backgroundColor: "hsl(254, 80%, 60%)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "hsl(254, 80%, 77%)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "hsl(254, 80%, 65%)")
          }
        >
          Download
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-[#bababa]"
        aria-label="Toggle menu"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
          {menuOpen ? (
            <>
              <line x1="5" y1="5" x2="17" y2="17" />
              <line x1="17" y1="5" x2="5" y2="17" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="19" y2="6" />
              <line x1="3" y1="11" x2="19" y2="11" />
              <line x1="3" y1="16" x2="19" y2="16" />
            </>
          )}
        </svg>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="absolute top-[66px] left-4 right-4 rounded-md p-4 flex flex-col gap-1 md:hidden"
          style={{
            backgroundColor: "#242424",
            boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#bababa] hover:text-[#dadada] text-[15px] py-3 px-3 rounded transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#download"
            className="mt-2 text-center py-3 px-3 rounded-md text-[15px] font-semibold text-white"
            style={{ backgroundColor: "hsl(254, 80%, 60%)" }}
          >
            Download
          </a>
        </div>
      )}
    </nav>
  );
}
