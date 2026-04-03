"use client";

import { useEffect, useRef } from "react";
import { useInView, useSpring, useTransform, motion } from "framer-motion";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/motion";

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
    <motion.span ref={ref} className="tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>
      {display}
    </motion.span>
  );
}

const stats = [
  { value: 127, suffix: "", label: "Projects delivered", sub: "Since 2019" },
  { value: 98, suffix: "%", label: "Client retention", sub: "Year over year" },
  { value: 14, suffix: "", label: "Design awards", sub: "Awwwards, FWA, CSS" },
  { value: 6, suffix: "", label: "Studio members", sub: "San Francisco" },
];

export function ShowcaseStats() {
  return (
    <section className="py-32 px-8 border-y border-[var(--border)]" id="about">
      <div className="max-w-[1280px] mx-auto">
        <AnimatedSection className="mb-16 max-w-[480px]">
          <span className="text-xs font-medium tracking-widest uppercase text-[var(--text-tertiary)] block mb-3">
            By the numbers
          </span>
          <h2 className="text-[2.5rem] font-normal leading-[1.15] tracking-tight">
            Small team,
            <br />
            outsized results
          </h2>
        </AnimatedSection>

        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-[var(--border)] rounded-xl overflow-hidden">
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="bg-[var(--bg-primary)] p-8 flex flex-col gap-2">
                <div className="text-[2.5rem] font-normal tracking-tight leading-[1.1]">
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <div className="text-sm text-[var(--text-primary)] font-medium">
                  {s.label}
                </div>
                <div className="text-xs text-[var(--text-tertiary)]">
                  {s.sub}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
