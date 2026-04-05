"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export function FixedBar() {
  const [visible, setVisible] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaSectionInView = useInView(ctaRef, { margin: "0px" });
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 600);
  });

  const show = visible && !ctaSectionInView;

  return (
    <>
      {/* Sentinel: placed near CTA section to detect when it's visible */}
      <div ref={ctaRef} className="absolute bottom-[400px] h-px w-px pointer-events-none" aria-hidden />

      <motion.div
        initial={{ y: 80 }}
        animate={{ y: show ? 0 : 80 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-bg-elevated/95 backdrop-blur-sm"
      >
        <div className="mx-auto max-w-[1180px] px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            <p className="text-[13px] text-text-secondary">
              Join <span className="text-text-primary font-medium">14,729</span> engineers already using Dimension
            </p>
          </div>
          <a
            href="#waitlist"
            className="hidden sm:inline-flex text-[13px] font-semibold bg-accent text-bg-primary px-5 py-2 rounded-[var(--radius)] hover:bg-accent-hover transition-colors duration-150"
          >
            Start Free
          </a>
        </div>
      </motion.div>
    </>
  );
}
