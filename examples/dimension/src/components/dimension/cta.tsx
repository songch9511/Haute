"use client";

import { motion } from "framer-motion";

export function CTA() {
  return (
    <section id="waitlist" className="border-b border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[600px] mx-auto"
        >
          {/* GD&T decorative frame */}
          <div className="border border-border rounded-[var(--radius)] p-8 md:p-12 relative">
            {/* Corner datum markers */}
            <div className="absolute -top-2 -left-2 w-4 h-4">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M0 16V0H16" stroke="#000" strokeWidth="1" />
              </svg>
            </div>
            <div className="absolute -top-2 -right-2 w-4 h-4">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M16 16V0H0" stroke="#000" strokeWidth="1" />
              </svg>
            </div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M0 0V16H16" stroke="#000" strokeWidth="1" />
              </svg>
            </div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M16 0V16H0" stroke="#000" strokeWidth="1" />
              </svg>
            </div>

            <div className="text-center">
              <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-muted mb-4">
                Early Access
              </p>
              <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.02em] leading-[1.2] mb-3">
                Transform your CAD workflow.
              </h2>
              <p className="text-[14px] leading-[1.7] text-text-muted mb-8 max-w-[400px] mx-auto">
                Join 847 engineers on the waitlist. Get early access when we
                launch publicly this quarter.
              </p>

              {/* Email form */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row gap-2 max-w-[420px] mx-auto"
              >
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="flex-1 border border-border bg-bg-input px-4 py-3 rounded-[var(--radius)] text-[14px] placeholder:text-text-muted/50 focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <button
                  type="submit"
                  className="bg-accent text-text-inverted text-[14px] font-semibold px-6 py-3 rounded-[var(--radius)] hover:opacity-80 transition-opacity duration-150 whitespace-nowrap"
                >
                  Join Waitlist
                </button>
              </form>

              <p className="text-[11px] text-text-muted mt-4">
                No credit card required. We&apos;ll notify you when your spot opens.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
