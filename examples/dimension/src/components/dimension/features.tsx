"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

const features = [
  {
    title: "AI Model Generation",
    desc: "Upload multi-view 2D drawings. Our geometry engine reads dimensions, GD&T callouts, and section views to produce parametric BREP models — not mesh approximations.",
    span: "md:col-span-4",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="4" y="4" width="20" height="20" rx="3" />
        <path d="M10 18L14 10L18 18" />
        <circle cx="14" cy="10" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Chat-Based Editing",
    desc: "Type natural language commands to modify geometry. Every edit creates a versioned snapshot you can compare or revert.",
    span: "md:col-span-2",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M6 8h16M6 14h10M6 20h13" />
        <circle cx="22" cy="20" r="3" />
      </svg>
    ),
  },
  {
    title: "Multi-Format Export",
    desc: "Download production-ready STEP for CNC toolpaths, GLB for web viewers and AR, STL for additive manufacturing. Zero conversion loss.",
    span: "md:col-span-2",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M14 4v14M8 14l6 6 6-6" />
        <path d="M4 22h20" />
      </svg>
    ),
  },
  {
    title: "Real-Time Preview",
    desc: "See your 3D model update live as you edit. Orbit, zoom, and inspect from any angle with sub-second feedback on every change.",
    span: "md:col-span-4",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="14" cy="14" r="9" />
        <path d="M14 5v9l6 4" />
      </svg>
    ),
  },
];

export function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="features" className="bg-bg-light text-text-dark py-16 md:py-20">
      <div className="mx-auto" style={{ maxWidth: 1280, padding: "0 24px" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="mb-12"
        >
          <p className="text-[12px] font-medium tracking-[0.1em] uppercase text-text-dark-secondary mb-3">
            Features
          </p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] font-bold tracking-tight leading-[1.1] font-heading text-text-dark">
            Everything you need to go from sketch to production.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.08, ease }}
              className={`${f.span} bg-bg-light-elevated rounded-xl p-8 border border-border-light group hover:shadow-sm transition-shadow duration-200`}
            >
              <div className="w-10 h-10 rounded-lg bg-bg-light-surface flex items-center justify-center text-text-dark mb-5">
                {f.icon}
              </div>
              <h3 className="text-[17px] font-semibold text-text-dark mb-2 font-heading">
                {f.title}
              </h3>
              <p className="text-[14px] leading-[1.7] text-text-dark-secondary">
                {f.desc}
              </p>

              {/* Visual placeholder */}
              <div className="mt-6 rounded-lg bg-bg-light-surface h-24 flex items-center justify-center">
                <div className="text-[10px] font-mono text-text-dark-secondary/40 tracking-wider uppercase">
                  Preview
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
