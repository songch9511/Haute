"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

const steps = [
  {
    step: 1,
    title: "Upload Drawing",
    desc: "Upload your 2D CAD drawing in DWG, DXF, or PDF format.",
    side: "left" as const,
  },
  {
    step: 2,
    title: "AI Processing",
    desc: "AI analyzes geometry, dimensions, and annotations to build a 3D model.",
    side: "right" as const,
  },
  {
    step: 3,
    title: "Export Model",
    desc: "Export as STEP, GLB, or STL. Share with your team instantly.",
    side: "left" as const,
  },
];

export function Publish() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-bg-primary py-16">
      <div className="mx-auto" style={{ maxWidth: 1280, padding: "0 24px" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="text-center mb-16"
        >
          <p className="text-[12px] font-medium tracking-[0.1em] uppercase text-text-muted mb-3">
            Pipeline
          </p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] font-bold tracking-[-0.03em] leading-[1.1]">
            Three steps to a production model.
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative timeline-spine max-w-3xl mx-auto">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease }}
              className={`relative flex items-start gap-6 md:gap-0 ${
                i < steps.length - 1 ? "pb-14 md:pb-16" : ""
              }`}
            >
              {/* Mobile: spine left, content right */}
              {/* Desktop: alternating left/right */}

              {/* Left content (desktop) */}
              <div className="hidden md:flex md:w-[calc(50%-28px)] md:justify-end">
                {s.side === "left" && <StepCard step={s} />}
              </div>

              {/* Center node */}
              <div className="relative z-10 flex flex-col items-center shrink-0 md:mx-4">
                <div className="w-10 h-10 rounded-full bg-bg-elevated border-2 border-border flex items-center justify-center text-[13px] font-mono font-semibold text-accent">
                  {s.step}
                </div>
              </div>

              {/* Right content (desktop) */}
              <div className="hidden md:flex md:w-[calc(50%-28px)]">
                {s.side === "right" && <StepCard step={s} />}
              </div>

              {/* Mobile content */}
              <div className="md:hidden flex-1">
                <StepCard step={s} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step }: { step: (typeof steps)[number] }) {
  return (
    <div className="bg-bg-elevated rounded-xl p-6 border border-border max-w-sm w-full">
      <span className="text-[11px] font-mono text-accent-text tracking-wider uppercase mb-2 block">
        Step {step.step}
      </span>
      <h3 className="text-[1.1rem] font-semibold mb-2 tracking-[-0.01em]">
        {step.title}
      </h3>
      <p className="text-[14px] leading-[1.6] text-text-secondary">
        {step.desc}
      </p>
    </div>
  );
}
