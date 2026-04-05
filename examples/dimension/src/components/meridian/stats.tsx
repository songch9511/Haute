"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

function AnimatedNumber({
  target,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = target;
    const duration = 1600;
    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end * Math.pow(10, decimals)) / Math.pow(10, decimals));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [isInView, target, decimals]);

  const formatted = decimals > 0
    ? value.toFixed(decimals)
    : value.toLocaleString();

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 14729, label: "Endpoints monitored", suffix: "", size: "text-5xl lg:text-6xl" },
  { value: 99.97, label: "Uptime SLA", suffix: "%", decimals: 2, size: "text-4xl lg:text-5xl" },
  { value: 23, label: "Avg latency", suffix: "ms", size: "text-4xl lg:text-5xl" },
  { value: 847, label: "Engineering teams", suffix: "", size: "text-3xl lg:text-4xl" },
];

export function MeridianStats() {
  return (
    <section
      className="px-6 py-24 lg:px-16"
      style={{ backgroundColor: "#0d0d0d" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col animate-[fadeUp_0.45s_cubic-bezier(0.22,1,0.36,1)_both]"
              style={{
                marginTop: i % 2 === 1 ? "2rem" : "0",
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <span
                className={`${s.size} font-semibold`}
                style={{
                  color: "#00d9a5",
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                <AnimatedNumber
                  target={s.value}
                  suffix={s.suffix}
                  decimals={s.decimals || 0}
                />
              </span>
              <span
                className="mt-2 text-sm"
                style={{
                  color: "#8a8a8a",
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
