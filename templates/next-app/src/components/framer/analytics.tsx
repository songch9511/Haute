"use client";

import { useEffect, useRef } from "react";
import { useInView, useSpring, useTransform, motion } from "framer-motion";
import { AnimatedSection, StaggerGroup, StaggerItem, ease } from "@/components/motion";

function Counter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 40, damping: 18 });
  const display = useTransform(spring, (v) => prefix + Math.round(v).toLocaleString() + suffix);

  useEffect(() => {
    if (isInView) spring.set(target);
  }, [isInView, spring, target]);

  return <motion.span ref={ref} className="tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>{display}</motion.span>;
}

const metrics = [
  { label: "Pageviews", value: 258156, suffix: "", change: "+18.3%", chart: [30, 42, 38, 55, 48, 62, 58, 72, 68, 80, 75, 88] },
  { label: "Unique visitors", value: 84729, suffix: "", change: "+12.7%", chart: [25, 35, 40, 38, 52, 48, 55, 60, 58, 65, 72, 78] },
  { label: "Avg. session", value: 247, suffix: "s", change: "+5.1%", chart: [60, 55, 65, 58, 70, 72, 68, 75, 78, 80, 82, 85] },
];

export function FramerAnalytics() {
  return (
    <section className="py-32 px-8 border-y border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection className="max-w-[480px] mb-16">
          <span className="text-xs font-medium tracking-widest uppercase text-[#555] block mb-3">Analytics</span>
          <h2 className="text-[2rem] md:text-[2.5rem] font-bold leading-[1.08] tracking-tight mb-4">
            Understand what performs
          </h2>
          <p className="text-base text-[#888] leading-relaxed">
            Built-in analytics that actually tell you what to improve. No third-party scripts, no cookie banners.
          </p>
        </AnimatedSection>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metrics.map((m) => (
            <StaggerItem key={m.label}>
              <motion.div
                whileHover={{ y: -3, borderColor: "rgba(255,255,255,0.1)" }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="bg-[#111115] border border-white/[0.06] rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-[#888]">{m.label}</span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-[#22c55e]/10 text-[#22c55e]">{m.change}</span>
                </div>
                <div className="text-[2rem] font-bold tracking-tight leading-[1.1] mb-6">
                  <Counter target={m.value} suffix={m.suffix} />
                </div>
                <div className="h-12 flex items-end gap-[3px]">
                  {m.chart.map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-white rounded-t-sm"
                      initial={{ height: 0, opacity: 0 }}
                      whileInView={{ height: `${h}%`, opacity: 0.12 }}
                      viewport={{ once: true }}
                      whileHover={{ opacity: 0.35 }}
                      transition={{ duration: 0.5, delay: i * 0.03, ease: ease.out }}
                    />
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
