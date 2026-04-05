"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    step: "01",
    title: "Install",
    description: "One command. No config files. Works with Express, Fastify, Next.js, Django, Rails.",
    code: `$ npx meridian init
  ✓ Detected: Next.js 15.2
  ✓ Installed: @meridian/sdk
  ✓ Instrumented: 12 routes`,
  },
  {
    step: "02",
    title: "Configure",
    description: "Set alert thresholds, team ownership, and notification channels in a single YAML.",
    code: `# meridian.config.yml
alerts:
  p99_latency: 200ms
  error_rate: 0.5%
notify: slack:#api-alerts`,
  },
  {
    step: "03",
    title: "Monitor",
    description: "Real-time dashboard with latency histograms, throughput graphs, and error breakdowns.",
    code: `Trace mrd_a1b2c3d4
  gateway     → 4ms
  auth        → 6ms
  db-query    → 12ms
  total         22ms ✓`,
  },
  {
    step: "04",
    title: "Alert",
    description: "Intelligent deduplication. Root-cause suggestions. Runbook links in every alert.",
    code: `⚠ p99 latency spike: 340ms
  endpoint: /api/v2/orders
  root cause: db-query +180ms
  suggested: check index on
    orders.created_at`,
  },
];

export function MeridianHowItWorks() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="px-6 py-20 lg:px-16"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div className="mx-auto max-w-6xl">
        <p
          className="mb-3 text-[11px] font-medium uppercase"
          style={{
            color: "#00d9a5",
            letterSpacing: "0.14em",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          How it works
        </p>
        <h2
          className="mb-10 text-3xl font-semibold tracking-tight lg:text-4xl"
          style={{ fontFamily: "var(--font-geist-mono)", color: "#f5f5f5" }}
        >
          From zero to observability in 90 seconds
        </h2>

        {/* Horizontal scroll */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {steps.map((s, i) => (
            <div
              key={s.step}
              className="w-[320px] flex-shrink-0 snap-start rounded-xl p-6 animate-[fadeRight_0.45s_cubic-bezier(0.22,1,0.36,1)_both]"
              style={{
                backgroundColor: "#0d0d0d",
                border: "1px solid rgba(255,255,255,0.06)",
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <span
                className="mb-4 inline-block text-[11px] font-medium"
                style={{
                  color: "#00d9a5",
                  fontFamily: "var(--font-geist-mono)",
                  letterSpacing: "0.1em",
                }}
              >
                STEP {s.step}
              </span>
              <h3
                className="mb-2 text-xl font-semibold"
                style={{
                  color: "#f5f5f5",
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                {s.title}
              </h3>
              <p
                className="mb-5 text-sm leading-relaxed"
                style={{ color: "#8a8a8a" }}
              >
                {s.description}
              </p>

              <pre
                className="overflow-x-auto rounded-lg px-4 py-3 text-[12px] leading-relaxed"
                style={{
                  backgroundColor: "#050505",
                  border: "1px solid rgba(255,255,255,0.04)",
                  fontFamily: "var(--font-geist-mono)",
                  color: "#8a8a8a",
                }}
              >
                {s.code}
              </pre>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(24px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
