"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Upload Drawings",
    description:
      "Drag and drop 2D engineering drawings — front, side, top views as separate images. The more views, the higher the accuracy.",
    visual: UploadVisual,
  },
  {
    number: "02",
    title: "AI Generates 3D",
    description:
      "Our geometry engine interprets dimensions, tolerances, and cross-sections to construct a precise parametric 3D model.",
    visual: GenerateVisual,
  },
  {
    number: "03",
    title: "Edit via Chat",
    description:
      "Request modifications in natural language. Each change creates a versioned snapshot you can view, compare, or revert.",
    visual: ChatVisual,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-muted mb-3">
            Workflow
          </p>
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] leading-[1.15]">
            Three steps. One model.
          </h2>
        </motion.div>

        {/* Steps — horizontal timeline on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.4,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-[14px] left-[calc(50%+24px)] right-0 h-px bg-border" />
              )}

              <div
                className={`p-6 md:p-8 ${
                  i < steps.length - 1
                    ? "border-b md:border-b-0 md:border-r border-border"
                    : ""
                }`}
              >
                {/* Step number with dot */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-7 h-7 border border-border rounded-full flex items-center justify-center">
                    <span className="text-[11px] font-bold">{step.number}</span>
                  </div>
                  <div className="h-px flex-1 bg-border-light" />
                </div>

                {/* Visual */}
                <div className="mb-6 border border-border rounded-[var(--radius)] overflow-hidden aspect-[4/3] flex items-center justify-center bg-bg-main">
                  <step.visual />
                </div>

                {/* Text */}
                <h3 className="text-[17px] font-semibold mb-2 tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="text-[13px] leading-[1.7] text-text-muted">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UploadVisual() {
  return (
    <svg
      width="160"
      height="120"
      viewBox="0 0 160 120"
      fill="none"
      className="text-text-primary"
    >
      {/* Drawing sheets */}
      <rect
        x="20"
        y="20"
        width="50"
        height="40"
        stroke="currentColor"
        strokeWidth="0.75"
        fill="none"
      />
      <text x="30" y="35" fontSize="7" fontFamily="monospace" fill="#555">
        FRONT
      </text>
      {/* Circle in front view */}
      <circle cx="45" cy="48" r="8" stroke="currentColor" strokeWidth="0.5" fill="none" />
      <circle cx="45" cy="48" r="3" stroke="currentColor" strokeWidth="0.5" fill="none" />

      <rect
        x="80"
        y="20"
        width="50"
        height="40"
        stroke="currentColor"
        strokeWidth="0.75"
        fill="none"
      />
      <text x="90" y="35" fontSize="7" fontFamily="monospace" fill="#555">
        SIDE
      </text>
      {/* Side profile */}
      <path
        d="M95 55 L95 42 L115 42 L115 45 L105 45 L105 55 Z"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
      />

      {/* Upload arrow */}
      <path
        d="M80 85 L80 72 M74 78 L80 72 L86 78"
        stroke="currentColor"
        strokeWidth="1"
      />
      <text
        x="80"
        y="98"
        textAnchor="middle"
        fontSize="8"
        fontFamily="var(--font-family)"
        fill="#555"
      >
        Drop files here
      </text>

      {/* Dashed border */}
      <rect
        x="55"
        y="68"
        width="50"
        height="38"
        stroke="#c8c8c8"
        strokeWidth="0.75"
        strokeDasharray="3 2"
        fill="none"
        rx="2"
      />
    </svg>
  );
}

function GenerateVisual() {
  return (
    <svg
      width="160"
      height="120"
      viewBox="0 0 160 120"
      fill="none"
      className="text-text-primary"
    >
      {/* 2D → Arrow → 3D */}
      {/* 2D drawing */}
      <rect
        x="10"
        y="30"
        width="40"
        height="60"
        stroke="currentColor"
        strokeWidth="0.75"
        fill="none"
      />
      <circle cx="30" cy="55" r="10" stroke="currentColor" strokeWidth="0.5" fill="none" />
      <line
        x1="14"
        y1="55"
        x2="46"
        y2="55"
        stroke="#c8c8c8"
        strokeWidth="0.5"
        strokeDasharray="1 2"
      />
      <line
        x1="30"
        y1="34"
        x2="30"
        y2="86"
        stroke="#c8c8c8"
        strokeWidth="0.5"
        strokeDasharray="1 2"
      />

      {/* Arrow with processing indicator */}
      <path d="M58 60 L78 60" stroke="currentColor" strokeWidth="0.75" />
      <path d="M74 56 L78 60 L74 64" stroke="currentColor" strokeWidth="0.75" />
      <text x="68" y="54" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="#555">
        AI
      </text>

      {/* 3D isometric object */}
      {/* Cylinder top */}
      <ellipse cx="115" cy="40" rx="25" ry="8" stroke="currentColor" strokeWidth="0.75" fill="none" />
      {/* Cylinder body */}
      <line x1="90" y1="40" x2="90" y2="80" stroke="currentColor" strokeWidth="0.75" />
      <line x1="140" y1="40" x2="140" y2="80" stroke="currentColor" strokeWidth="0.75" />
      {/* Cylinder bottom */}
      <ellipse cx="115" cy="80" rx="25" ry="8" stroke="currentColor" strokeWidth="0.75" fill="none" />

      {/* Dimension line */}
      <line x1="145" y1="40" x2="145" y2="80" stroke="#555" strokeWidth="0.5" strokeDasharray="2 1" />
      <text x="148" y="63" fontSize="7" fontFamily="monospace" fill="#555">
        H
      </text>

      {/* Progress bar */}
      <rect x="85" y="95" width="60" height="4" stroke="#c8c8c8" strokeWidth="0.5" fill="none" rx="1" />
      <rect x="85" y="95" width="45" height="4" fill="currentColor" rx="1" />
      <text x="115" y="108" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="#555">
        Generating… (4/10)
      </text>
    </svg>
  );
}

function ChatVisual() {
  return (
    <svg
      width="160"
      height="120"
      viewBox="0 0 160 120"
      fill="none"
      className="text-text-primary"
    >
      {/* Chat bubbles */}
      <rect x="10" y="12" width="100" height="22" rx="2" stroke="currentColor" strokeWidth="0.75" fill="none" />
      <text x="16" y="27" fontSize="8" fontFamily="var(--font-family)" fill="currentColor">
        Make the column longer
      </text>

      {/* AI response */}
      <rect x="30" y="42" width="120" height="22" rx="2" stroke="currentColor" strokeWidth="0.75" fill="currentColor" />
      <text x="36" y="57" fontSize="8" fontFamily="var(--font-family)" fill="white">
        ✓ Column extended by 15mm
      </text>

      {/* Version snapshots */}
      <rect x="10" y="76" width="42" height="32" rx="2" stroke="currentColor" strokeWidth="0.75" fill="none" />
      <text x="20" y="88" fontSize="7" fontFamily="monospace" fill="currentColor">v1</text>
      <text x="16" y="100" fontSize="6" fontFamily="var(--font-family)" fill="#555">View · Revert</text>

      <rect x="58" y="76" width="42" height="32" rx="2" stroke="currentColor" strokeWidth="0.75" fill="none" />
      <text x="68" y="88" fontSize="7" fontFamily="monospace" fill="currentColor">v2</text>
      <text x="64" y="100" fontSize="6" fontFamily="var(--font-family)" fill="#555">View · Revert</text>

      <rect x="106" y="76" width="42" height="32" rx="2" stroke="#c8c8c8" strokeWidth="0.75" strokeDasharray="2 2" fill="none" />
      <text x="116" y="88" fontSize="7" fontFamily="monospace" fill="#c8c8c8">v3</text>
      <text x="114" y="100" fontSize="6" fontFamily="var(--font-family)" fill="#c8c8c8">pending</text>
    </svg>
  );
}
