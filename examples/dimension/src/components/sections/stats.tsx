"use client";

import { useEffect, useRef } from "react";
import { useInView, useSpring, useTransform, motion } from "framer-motion";
import { AnimatedSection } from "@/components/motion";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v) =>
    Math.round(v).toLocaleString() + suffix
  );

  useEffect(() => {
    if (isInView) spring.set(target);
  }, [isInView, spring, target]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      {display}
    </motion.span>
  );
}

const stats = [
  { value: 47, suffix: "%", label: "Faster design-to-deploy" },
  { value: 3.2, suffix: "x", label: "Faster design reviews", isDecimal: true },
  { value: 891, suffix: "", label: "Teams on Clearpath" },
];

export function Stats() {
  return (
    <section className="py-24 px-8 max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 items-center" id="results">
      <AnimatedSection className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="py-6 border-l border-[var(--border)] pl-6">
            <div className="text-[2rem] font-normal tracking-tight leading-[1.15]" style={{ fontVariantNumeric: "tabular-nums" }}>
              {s.isDecimal ? (
                <>{s.value}{s.suffix}</>
              ) : (
                <Counter target={s.value} suffix={s.suffix} />
              )}
            </div>
            <div className="text-[0.8125rem] text-[var(--text-tertiary)] mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
          Measured across 891 teams over 6 months. Results vary by team size and
          existing workflow maturity.
        </p>
        <div className="mt-4 text-[0.8125rem] text-[var(--text-tertiary)]">
          <strong className="text-[var(--text-secondary)] font-medium">Methodology:</strong>{" "}
          Comparison of median cycle times 30 days before and 90 days after
          Clearpath adoption.
        </div>
      </AnimatedSection>
    </section>
  );
}
