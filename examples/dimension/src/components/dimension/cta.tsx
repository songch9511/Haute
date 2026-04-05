"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

export function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="cta" className="relative py-32 overflow-hidden">
      {/* Split background */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-bg-light" />
        <div className="w-1/2 bg-bg-primary" />
      </div>
      {/* Mobile: single dark bg */}
      <div className="absolute inset-0 bg-bg-primary md:hidden" />

      <div className="relative z-10 mx-auto max-w-[1180px] px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
        >
          {/* Left: headline */}
          <div>
            <h2 className="font-heading text-[1.75rem] md:text-[2.75rem] font-bold tracking-[-0.03em] leading-[1.08] mb-5 text-text-primary md:text-text-dark">
              Start converting<br />drawings today.
            </h2>
            <p className="text-[16px] md:text-[18px] leading-[1.6] text-text-secondary md:text-text-dark-secondary max-w-[360px]">
              Free tier. No credit card required. Upload your first drawing in under 60 seconds.
            </p>
          </div>

          {/* Right: form */}
          <div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-[440px]"
            >
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 border border-border bg-bg-elevated px-4 rounded-[var(--radius)] text-[15px] h-[52px] text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <button
                type="submit"
                className="bg-accent text-bg-primary text-[14px] font-semibold px-7 rounded-[var(--radius)] h-[52px] hover:bg-accent-hover transition-colors duration-150 whitespace-nowrap"
              >
                Get Started
              </button>
            </form>
            <p className="text-[13px] text-text-muted mt-4">
              Join 14,729 engineers already on the platform.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
