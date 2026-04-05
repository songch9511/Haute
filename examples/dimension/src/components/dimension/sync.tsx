"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 2v16M2 10h16" />
        <circle cx="10" cy="10" r="3" />
      </svg>
    ),
    title: "Real-Time Sync",
    desc: "Changes propagate instantly across all connected tools. Edit in one place, see updates everywhere.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 10l4 4 8-8" />
        <path d="M2 4h5M13 16h5" strokeDasharray="2 2" />
      </svg>
    ),
    title: "Conflict Resolution",
    desc: "AI merges simultaneous edits without data loss. No more overwrite anxiety across distributed teams.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="5" width="14" height="10" rx="2" />
        <path d="M7 2v3M13 2v3" />
        <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.3" />
      </svg>
    ),
    title: "Offline Mode",
    desc: "Keep working without internet. Changes sync when reconnected — nothing is ever lost.",
  },
];

export function Sync() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-bg-light text-text-dark py-24" style={{ overflowX: "clip" }}>
      <div className="mx-auto" style={{ maxWidth: 1280, padding: "0 24px" }}>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 md:gap-16">
          {/* Left — Sticky mockup */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            className="md:sticky md:top-24 md:self-start"
          >
            <div
              className="bg-bg-light-elevated rounded-xl border border-border-light overflow-hidden"
              style={{ aspectRatio: "3/4" }}
            >
              <div className="w-full h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    className="mx-auto mb-6"
                  >
                    {/* Sync arrows */}
                    <circle cx="40" cy="40" r="28" stroke="#e2e4e6" strokeWidth="1.5" />
                    <path
                      d="M40 16a24 24 0 0 1 20.8 12"
                      stroke="#22c55e"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M40 64a24 24 0 0 1-20.8-12"
                      stroke="#22c55e"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <polygon points="62,28 56,26 58,32" fill="#22c55e" />
                    <polygon points="18,52 24,54 22,48" fill="#22c55e" />
                    {/* Center dot */}
                    <circle cx="40" cy="40" r="4" fill="#22c55e" opacity="0.3" />
                    <circle cx="40" cy="40" r="2" fill="#22c55e" />
                  </svg>
                  <div className="text-[13px] text-text-dark-secondary font-medium">
                    Live sync preview
                  </div>
                  <div className="text-[11px] text-text-dark-secondary/60 mt-1 font-mono">
                    3 devices connected
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Scrolling feature blocks */}
          <div className="space-y-16 md:space-y-20">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease }}
              >
                <div className="w-10 h-10 rounded-lg bg-bg-light-surface border border-border-light flex items-center justify-center text-text-dark-secondary mb-4">
                  {f.icon}
                </div>
                <h3 className="text-[1.25rem] font-semibold text-text-dark tracking-[-0.01em] mb-2">
                  {f.title}
                </h3>
                <p className="text-[15px] leading-[1.7] text-text-dark-secondary max-w-[440px]">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
