"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const galleryItems = [
  { title: "Brand Systems", count: "47 projects", accent: "#22c55e" },
  { title: "Motion Design", count: "31 projects", accent: "#f59e0b" },
  { title: "Product Interfaces", count: "63 projects", accent: "#3b82f6" },
  { title: "Design Systems", count: "28 projects", accent: "#a78bfa" },
  { title: "Creative Direction", count: "19 projects", accent: "#f0f0f0" },
];

export function HorizontalGallery() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-35%"]);

  return (
    <section ref={containerRef} className="py-24 overflow-hidden">
      <div className="px-8 max-w-[1280px] mx-auto mb-12">
        <span className="text-xs font-medium tracking-widest uppercase text-[var(--text-tertiary)] block mb-3">
          Capabilities
        </span>
        <h2 className="text-[2.5rem] font-normal leading-[1.15] tracking-tight">
          What we do
        </h2>
      </div>

      <motion.div style={{ x }} className="flex gap-6 pl-8">
        {galleryItems.map((item) => (
          <motion.div
            key={item.title}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex-shrink-0 w-[340px] h-[420px] bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-8 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Large background number */}
            <div
              className="absolute -right-4 -top-8 text-[8rem] font-bold leading-none opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 select-none"
              style={{ color: item.accent }}
            >
              {item.count.split(" ")[0]}
            </div>

            <div className="relative z-10">
              <div
                className="w-3 h-3 rounded-full mb-6"
                style={{ backgroundColor: item.accent }}
              />
              <h3 className="text-2xl font-normal tracking-tight leading-[1.15]">
                {item.title}
              </h3>
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-sm text-[var(--text-tertiary)]" style={{ fontVariantNumeric: "tabular-nums" }}>
                {item.count}
              </span>
              <motion.div
                className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--text-tertiary)] transition-colors duration-150"
                whileHover={{ scale: 1.05 }}
              >
                <svg className="w-4 h-4 text-[var(--text-tertiary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
