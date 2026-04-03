"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  delay = 0,
  className,
  style,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: "tabular-nums", ...style }}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {prefix}
      {inView ? value.toLocaleString() : 0}
      {suffix}
    </motion.span>
  );
}

export default function StatsRow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="py-24"
      style={{
        backgroundColor: "#f9f9f8",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div className="mx-auto max-w-[1252px] px-4 lg:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Metric 1 — Large number only */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.55, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span
              className="block font-bold leading-none"
              style={{
                fontSize: "3rem",
                color: "rgba(0,0,0,0.95)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              100M+
            </span>
            <span
              className="block mt-2 text-sm"
              style={{ color: "rgba(0,0,0,0.54)" }}
            >
              users worldwide
            </span>
          </motion.div>

          {/* Metric 2 — Number with icon */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="inline-flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: "#ffb110" }}
              >
                <path
                  d="M8 1L10.2 5.5L15 6.2L11.5 9.6L12.4 14.4L8 12.1L3.6 14.4L4.5 9.6L1 6.2L5.8 5.5L8 1Z"
                  fill="currentColor"
                />
              </svg>
              <span
                className="font-bold leading-none"
                style={{
                  fontSize: "2.5rem",
                  color: "rgba(0,0,0,0.95)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                #1
              </span>
            </span>
            <span
              className="block mt-2 text-sm"
              style={{ color: "rgba(0,0,0,0.54)" }}
            >
              on G2 for Connected Workspace
            </span>
          </motion.div>

          {/* Metric 3 — Fraction-style */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.55, delay: 0.16, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="inline-flex items-baseline">
              <span
                className="font-bold leading-none"
                style={{
                  fontSize: "3rem",
                  color: "rgba(0,0,0,0.95)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                87
              </span>
              <span
                className="text-xl leading-none"
                style={{ color: "rgba(0,0,0,0.54)" }}
              >
                /100
              </span>
            </span>
            <span
              className="block mt-2 text-sm"
              style={{ color: "rgba(0,0,0,0.54)" }}
            >
              Fortune 100 companies
            </span>
          </motion.div>

          {/* Metric 4 — Percentage, monospace */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.55, delay: 0.24, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span
              className="block font-bold leading-none"
              style={{
                fontSize: "2.5rem",
                color: "rgba(0,0,0,0.95)",
                fontFamily: "var(--font-geist-mono)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              99.97%
            </span>
            <span
              className="block mt-2 text-sm"
              style={{ color: "rgba(0,0,0,0.54)" }}
            >
              uptime SLA
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
