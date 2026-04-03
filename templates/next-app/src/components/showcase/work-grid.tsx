"use client";

import { motion } from "framer-motion";
import { StaggerGroup, StaggerItem, scaleInVariants } from "@/components/motion";

const projects = [
  { title: "Meridian Labs", category: "Product Design", year: "2025", color: "#22c55e", span: "md:col-span-2 md:row-span-2" },
  { title: "Openframe", category: "Brand Identity", year: "2025", color: "#f59e0b", span: "" },
  { title: "Dovetail", category: "Motion System", year: "2024", color: "#3b82f6", span: "" },
  { title: "Clearpath", category: "Design System", year: "2024", color: "#a78bfa", span: "md:col-span-2" },
  { title: "Halfmoon", category: "Web Experience", year: "2024", color: "#f0f0f0", span: "" },
];

export function WorkGrid() {
  return (
    <section className="py-32 px-8 max-w-[1280px] mx-auto" id="work">
      <div className="flex items-end justify-between mb-16">
        <div>
          <span className="text-xs font-medium tracking-widest uppercase text-[var(--text-tertiary)] block mb-3">
            Selected Work
          </span>
          <h2 className="text-[2.5rem] font-normal leading-[1.15] tracking-tight">
            Recent projects
          </h2>
        </div>
        <span className="text-sm text-[var(--text-tertiary)] hidden md:block">
          2024&ndash;2025
        </span>
      </div>

      <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[240px]">
        {projects.map((p) => (
          <StaggerItem key={p.title} className={p.span} variants={scaleInVariants}>
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
              className="group relative h-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-6 flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              {/* Accent gradient blob */}
              <div
                className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full blur-[80px] opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-300"
                style={{ backgroundColor: p.color }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-[var(--text-tertiary)]">{p.category}</span>
                  <span className="text-xs text-[var(--text-tertiary)] opacity-50">{p.year}</span>
                </div>
                <h3 className="text-xl font-normal tracking-tight">{p.title}</h3>
              </div>

              <motion.div
                className="relative z-10 flex items-center gap-2 text-sm text-[var(--text-tertiary)] group-hover:text-[var(--text-secondary)] transition-colors duration-150"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
              >
                View project
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                </svg>
              </motion.div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
