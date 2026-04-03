"use client";

import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="min-h-[100dvh] flex items-center border-b border-border pt-16">
      <div className="mx-auto max-w-[1200px] w-full px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
          {/* Left — Copy (7 cols) */}
          <div className="md:col-span-7 flex flex-col gap-8">
            {/* Badge */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.1em] uppercase border border-border px-3 py-1.5 rounded-[var(--radius-sm)]">
                <span className="w-1.5 h-1.5 bg-text-primary rounded-full" />
                Now in Beta
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp}
              transition={{
                duration: 0.4,
                delay: 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.03em]"
            >
              Turn 2D Drawings
              <br />
              into 3D Models —
              <br />
              <span className="font-normal italic">in Seconds.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              {...fadeUp}
              transition={{
                duration: 0.4,
                delay: 0.16,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[15px] leading-[1.7] text-text-muted max-w-[420px]"
            >
              Upload engineering drawings. Our AI interprets geometry,
              dimensions, and tolerances to generate production-ready 3D
              CAD models. Refine with natural language.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fadeUp}
              transition={{
                duration: 0.4,
                delay: 0.24,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#waitlist"
                className="inline-flex items-center gap-2 bg-accent text-text-inverted text-[14px] font-semibold px-6 py-3 rounded-[var(--radius)] hover:opacity-80 transition-opacity duration-150"
              >
                Join the Waitlist
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 border border-border text-[14px] font-medium px-6 py-3 rounded-[var(--radius)] hover:bg-accent hover:text-text-inverted transition-colors duration-150"
              >
                See How It Works
              </a>
            </motion.div>

            {/* Micro stats */}
            <motion.div
              {...fadeUp}
              transition={{
                duration: 0.4,
                delay: 0.32,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex gap-8 pt-4 border-t border-border-light"
            >
              <div>
                <div className="text-[22px] font-bold tracking-tight tabular-nums">
                  847
                </div>
                <div className="text-[12px] text-text-muted tracking-wide uppercase">
                  Waitlist
                </div>
              </div>
              <div>
                <div className="text-[22px] font-bold tracking-tight tabular-nums">
                  12.4s
                </div>
                <div className="text-[12px] text-text-muted tracking-wide uppercase">
                  Avg. Generation
                </div>
              </div>
              <div>
                <div className="text-[22px] font-bold tracking-tight tabular-nums">
                  3
                </div>
                <div className="text-[12px] text-text-muted tracking-wide uppercase">
                  Export Formats
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — Product Mockup (5 cols) */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <ProductMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* Simplified product UI mockup with GD&T decorative elements */
function ProductMockup() {
  return (
    <div className="relative">
      {/* GD&T decoration — dimension line top */}
      <svg
        className="absolute -top-6 left-4 right-4 h-6 text-border-light"
        viewBox="0 0 400 24"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="20"
          x2="400"
          y2="20"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <line
          x1="0"
          y1="14"
          x2="0"
          y2="24"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <line
          x1="400"
          y1="14"
          x2="400"
          y2="24"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <text
          x="200"
          y="14"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          fontFamily="var(--font-family)"
        >
          382.5 mm
        </text>
      </svg>

      {/* Main card — product editor mockup */}
      <div className="border border-border rounded-[var(--radius)] overflow-hidden">
        {/* Title bar */}
        <div className="h-8 border-b border-border flex items-center px-3 gap-2">
          <div className="w-2 h-2 rounded-full border border-border" />
          <div className="w-2 h-2 rounded-full border border-border" />
          <div className="w-2 h-2 rounded-full border border-border" />
          <span className="ml-3 text-[11px] text-text-muted tracking-wide">
            tapered-flange-stud — Dimension Cloud
          </span>
        </div>

        {/* Content area — 3 panels */}
        <div className="grid grid-cols-12 h-[340px]">
          {/* Layer panel */}
          <div className="col-span-3 border-r border-border p-3 flex flex-col gap-1.5">
            <div className="text-[10px] font-semibold tracking-[0.08em] uppercase text-text-muted mb-1">
              Layers
            </div>
            {[
              "Group_0",
              "├ Cylinder",
              "│ ├ Cylinder_part_1",
              "│ ├ Cylinder_part_2",
              "│ └ Cylinder_part_3",
              "├ Flange",
              "└ Base_Ring",
            ].map((layer, i) => (
              <div
                key={i}
                className={`text-[10px] font-mono leading-relaxed px-1 py-0.5 rounded-[var(--radius-sm)] ${
                  i === 1 ? "bg-accent text-text-inverted" : ""
                }`}
              >
                {layer}
              </div>
            ))}
          </div>

          {/* 3D Viewport */}
          <div className="col-span-6 border-r border-border relative bg-bg-main flex items-center justify-center">
            {/* Grid pattern */}
            <svg
              className="absolute inset-0 w-full h-full opacity-[0.08]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="grid"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="#000"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Isometric 3D object */}
            <svg
              width="140"
              height="160"
              viewBox="0 0 140 160"
              fill="none"
              className="relative z-10"
            >
              {/* Simplified flange stud shape */}
              <ellipse
                cx="70"
                cy="40"
                rx="50"
                ry="16"
                stroke="#000"
                strokeWidth="1"
              />
              <line
                x1="20"
                y1="40"
                x2="20"
                y2="70"
                stroke="#000"
                strokeWidth="1"
              />
              <line
                x1="120"
                y1="40"
                x2="120"
                y2="70"
                stroke="#000"
                strokeWidth="1"
              />
              <ellipse
                cx="70"
                cy="70"
                rx="50"
                ry="16"
                stroke="#000"
                strokeWidth="1"
              />

              {/* Column */}
              <ellipse
                cx="70"
                cy="70"
                rx="24"
                ry="8"
                stroke="#000"
                strokeWidth="1"
              />
              <line
                x1="46"
                y1="70"
                x2="46"
                y2="130"
                stroke="#000"
                strokeWidth="1"
              />
              <line
                x1="94"
                y1="70"
                x2="94"
                y2="130"
                stroke="#000"
                strokeWidth="1"
              />
              <ellipse
                cx="70"
                cy="130"
                rx="24"
                ry="8"
                stroke="#000"
                strokeWidth="1"
              />

              {/* GD&T dimension arrow */}
              <line
                x1="130"
                y1="40"
                x2="130"
                y2="130"
                stroke="#000"
                strokeWidth="0.5"
                strokeDasharray="2 2"
              />
              <text
                x="134"
                y="88"
                fontSize="8"
                fontFamily="monospace"
                fill="#555"
              >
                ⌀24
              </text>
            </svg>

            {/* View cube */}
            <div className="absolute top-2 right-2 border border-border-light rounded-[var(--radius-sm)] p-1">
              <div className="text-[8px] font-mono text-text-muted text-center leading-tight">
                FRONT
              </div>
            </div>
          </div>

          {/* Chat panel */}
          <div className="col-span-3 p-3 flex flex-col">
            <div className="text-[10px] font-semibold tracking-[0.08em] uppercase text-text-muted mb-2">
              Activity
            </div>

            {/* Version cards */}
            <div className="flex flex-col gap-2 flex-1">
              <div className="border border-border rounded-[var(--radius-sm)] p-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-semibold">v1</span>
                  <span className="text-[9px] flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-accent inline-block" />
                    Generated
                  </span>
                </div>
                <div className="flex gap-1">
                  <button className="text-[9px] border border-border-light px-2 py-0.5 rounded-[var(--radius-sm)]">
                    View
                  </button>
                  <button className="text-[9px] border border-border-light px-2 py-0.5 rounded-[var(--radius-sm)]">
                    Revert
                  </button>
                </div>
              </div>

              <div className="bg-accent text-text-inverted rounded-[var(--radius-sm)] px-2 py-1.5 text-[10px] self-end max-w-[90%]">
                Make the column longer
              </div>

              <div className="border border-border rounded-[var(--radius-sm)] p-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-semibold">v2</span>
                  <span className="text-[9px] flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-accent inline-block" />
                    Generated
                  </span>
                </div>
                <div className="flex gap-1">
                  <button className="text-[9px] border border-border-light px-2 py-0.5 rounded-[var(--radius-sm)]">
                    View
                  </button>
                  <button className="text-[9px] border border-border-light px-2 py-0.5 rounded-[var(--radius-sm)]">
                    Revert
                  </button>
                </div>
              </div>
            </div>

            {/* Chat input */}
            <div className="mt-2 border border-border rounded-[var(--radius-sm)] px-2 py-1.5 flex items-center gap-1">
              <span className="text-[10px] text-text-muted flex-1">
                Describe your changes...
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-text-muted"
              >
                <path d="M2 14L14 2M14 2H6M14 2v8" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* GD&T decoration — tolerance callout */}
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col items-start gap-0.5">
        <svg width="24" height="60" viewBox="0 0 24 60" className="text-border-light">
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="60"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <line
            x1="0"
            y1="0"
            x2="8"
            y2="0"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <line
            x1="0"
            y1="60"
            x2="8"
            y2="60"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* GD&T symbol row */}
      <div className="mt-4 flex items-center gap-3 text-[10px] font-mono text-text-muted">
        <span className="border border-border-light px-1.5 py-0.5">⌖ A</span>
        <span className="border border-border-light px-1.5 py-0.5">⊥ 0.05 A</span>
        <span className="border border-border-light px-1.5 py-0.5">◎ ⌀0.02 M</span>
        <span className="border border-border-light px-1.5 py-0.5">∥ 0.1 B</span>
      </div>
    </div>
  );
}
