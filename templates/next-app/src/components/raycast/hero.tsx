"use client";

import { motion } from "framer-motion";
import { ease } from "@/components/motion";

export function RaycastHero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-5 pt-[80px] pb-16 overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(255, 53, 99, 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Announcement pill */}
      <motion.a
        href="#ai"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: ease.out, delay: 0.1 }}
        className="inline-flex items-center gap-2 h-[44px] sm:h-[32px] px-4 rounded-full border text-[12.5px] text-[#8a8f93] hover:text-[#f0f0f0] transition-colors duration-150 mb-8"
        style={{ borderColor: "#2a2d2f", backgroundColor: "rgba(30, 32, 34, 0.5)" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#ff3563]" />
        Introducing Raycast AI — Join the waitlist
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </motion.a>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: ease.out, delay: 0.2 }}
        className="text-center text-[40px] sm:text-[56px] md:text-[72px] lg:text-[72px] font-bold leading-[1.05] tracking-[-0.035em] text-[#f0f0f0] max-w-[900px]"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
      >
        Your shortcut to everything
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: ease.out, delay: 0.35 }}
        className="mt-5 text-center text-[16px] sm:text-[18px] md:text-[20px] leading-[1.55] text-[#8a8f93] max-w-[560px]"
      >
        A collection of powerful productivity tools all within
        an extendable launcher application.
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: ease.out, delay: 0.5 }}
        className="mt-8 flex flex-col sm:flex-row items-center gap-3"
      >
        <a
          href="#download"
          className="inline-flex items-center gap-2 h-[44px] px-6 rounded-xl text-[14px] font-medium text-[#0e1011] transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
          style={{ backgroundColor: "#ff4c4c", backgroundImage: "linear-gradient(135deg, #ff6363 0%, #ff3563 100%)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          Download for Mac
        </a>
        <a
          href="#download"
          className="inline-flex items-center gap-2 h-[44px] px-6 rounded-xl text-[14px] font-medium text-[#e8e8e8] border transition-all duration-150 hover:bg-[#1e2022] active:scale-[0.98]"
          style={{ borderColor: "#2a2d2f" }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
          </svg>
          Download for Windows
        </a>
      </motion.div>

      {/* Version info */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        className="mt-3 text-[12px] text-[#8a8f93]"
      >
        v1.89.0 &middot; macOS 12+ &middot; Apple Silicon & Intel
      </motion.p>

      {/* Command palette mockup */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: ease.out, delay: 0.6 }}
        className="mt-12 w-full max-w-[680px] mx-auto"
      >
        <div
          className="rounded-2xl overflow-hidden border"
          style={{
            borderColor: "#2a2d2f",
            backgroundColor: "#161819",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.03), 0 20px 60px rgba(0,0,0,0.5), 0 0 100px rgba(255, 53, 99, 0.04)",
          }}
        >
          {/* Search input */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[#2a2d2f]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a8f93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <span className="text-[15px] text-[#8a8f93]">Search for apps and commands...</span>
            <div className="ml-auto flex items-center gap-1">
              <kbd className="inline-flex items-center justify-center h-[22px] px-1.5 rounded text-[11px] text-[#8a8f93] border border-[#2a2d2f] bg-[#1e2022]">
                &#8984;
              </kbd>
              <kbd className="inline-flex items-center justify-center h-[22px] px-1.5 rounded text-[11px] text-[#8a8f93] border border-[#2a2d2f] bg-[#1e2022]">
                K
              </kbd>
            </div>
          </div>

          {/* Results list */}
          <div className="py-2">
            {[
              { icon: "🔍", label: "Search Google", subtitle: "Web Search", kbd: "⌘ G" },
              { icon: "📋", label: "Clipboard History", subtitle: "Built-in", kbd: "⌘ ⇧ V", active: true },
              { icon: "📁", label: "File Search", subtitle: "Built-in", kbd: "⌘ ⇧ F" },
              { icon: "🔢", label: "Calculator", subtitle: "Built-in", kbd: "⌘ =" },
              { icon: "📝", label: "Floating Notes", subtitle: "Built-in", kbd: "⌘ ⇧ N" },
              { icon: "🪟", label: "Window Management", subtitle: "Built-in", kbd: "⌃ ⌥" },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg transition-colors duration-100 ${
                  item.active ? "bg-[#1e2022]" : "hover:bg-[#1e2022]/50"
                }`}
              >
                <span className="text-[18px] w-[28px] text-center">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] text-[#f0f0f0] leading-tight">{item.label}</div>
                  <div className="text-[12px] text-[#8a8f93] leading-tight mt-0.5">{item.subtitle}</div>
                </div>
                <span className="text-[11px] text-[#8a8f93] font-mono shrink-0">{item.kbd}</span>
              </div>
            ))}
          </div>

          {/* Footer bar */}
          <div className="flex items-center justify-between px-5 py-2.5 border-t border-[#2a2d2f]">
            <div className="flex items-center gap-4">
              <span className="text-[11px] text-[#8a8f93]">6 results</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#8a8f93]">Open</span>
              <kbd className="inline-flex items-center justify-center h-[20px] px-1.5 rounded text-[10px] text-[#8a8f93] border border-[#2a2d2f] bg-[#1e2022]">
                ↵
              </kbd>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
