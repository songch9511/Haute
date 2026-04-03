"use client";

import { AnimatedSection } from "@/components/motion";

export function RaycastCTA() {
  return (
    <section className="py-24 md:py-32 px-5">
      <div className="max-w-[1280px] mx-auto">
        <AnimatedSection>
          <div
            className="relative rounded-3xl border border-[#2a2d2f] overflow-hidden px-6 py-16 md:py-24 text-center"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(255, 53, 99, 0.1) 0%, #161819 60%)",
            }}
          >
            {/* Grid pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(#f0f0f0 1px, transparent 1px), linear-gradient(90deg, #f0f0f0 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="relative">
              <h2 className="text-[32px] sm:text-[44px] md:text-[56px] font-bold leading-[1.08] tracking-[-0.035em] text-[#f0f0f0] max-w-[600px] mx-auto">
                Your Mac, supercharged
              </h2>
              <p className="mt-5 text-[16px] sm:text-[18px] leading-[1.6] text-[#8a8f93] max-w-[440px] mx-auto">
                Download Raycast for free and discover how fast your
                Mac was always meant to be.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="#download"
                  className="inline-flex items-center gap-2 h-[48px] px-7 rounded-xl text-[15px] font-medium text-[#0e1011] transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: "#ff4c4c", backgroundImage: "linear-gradient(135deg, #ff6363 0%, #ff3563 100%)" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Download for Mac
                </a>
                <a
                  href="#download"
                  className="inline-flex items-center gap-2 h-[48px] px-7 rounded-xl text-[15px] font-medium text-[#e8e8e8] border border-[#2a2d2f] hover:bg-[#1e2022] transition-all duration-150 active:scale-[0.98]"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                  </svg>
                  Download for Windows
                </a>
              </div>
              <p className="mt-4 text-[12px] text-[#8a8f93]">
                Free for personal use &middot; Pro starts at $8/mo
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
