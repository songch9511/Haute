"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { springs, ease, AnimatedSection } from "@/components/motion";

const services = [
  {
    id: "strategy",
    label: "Strategy",
    title: "Research-driven design decisions",
    description: "We start with your users, not your assumptions. Through competitive analysis, user interviews, and data synthesis, we build a design strategy that addresses real problems.",
    details: ["User Research", "Competitive Audit", "Information Architecture", "Design Sprint Facilitation"],
  },
  {
    id: "design",
    label: "Design",
    title: "Interfaces with character",
    description: "Every pixel is placed with intention. We design systems that scale — from a single component to a full product suite — with consistency and craft at every level.",
    details: ["UI/UX Design", "Design Systems", "Responsive Layouts", "Accessibility Auditing"],
  },
  {
    id: "motion",
    label: "Motion",
    title: "Choreographed interactions",
    description: "Static screens become living experiences. We design every hover, transition, and scroll animation to feel physical and purposeful — never decorative.",
    details: ["Interaction Design", "Micro-animations", "Scroll Choreography", "Spring Physics"],
  },
  {
    id: "development",
    label: "Development",
    title: "Production-grade frontends",
    description: "We don\u2019t hand off Figma files and walk away. Our team builds the frontend in React and Next.js, ensuring the finished product matches the design 1:1.",
    details: ["React / Next.js", "Framer Motion", "Performance Optimization", "Design-to-Code"],
  },
];

export function ServiceTabs() {
  const [active, setActive] = useState("strategy");
  const current = services.find((s) => s.id === active)!;

  return (
    <section className="py-32 px-8 max-w-[1280px] mx-auto" id="services">
      <AnimatedSection className="mb-16">
        <span className="text-xs font-medium tracking-widest uppercase text-[var(--text-tertiary)] block mb-3">
          Services
        </span>
        <h2 className="text-[2.5rem] font-normal leading-[1.15] tracking-tight">
          How we work
        </h2>
      </AnimatedSection>

      {/* Tab bar with shared layout indicator */}
      <div className="flex gap-2 mb-12 overflow-x-auto">
        {services.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className="relative px-5 py-2.5 min-h-[44px] text-sm font-medium rounded-lg cursor-pointer border-none bg-transparent transition-colors duration-150"
            style={{ color: active === s.id ? "var(--text-primary)" : "var(--text-tertiary)" }}
          >
            {s.label}
            {active === s.id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute inset-0 bg-[var(--bg-surface)] rounded-lg -z-10"
                transition={springs.standard}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content with AnimatePresence */}
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-16 items-start min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: ease.out }}
          >
            <h3 className="text-2xl font-normal tracking-tight leading-[1.15] mb-4">
              {current.title}
            </h3>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-[480px]">
              {current.description}
            </p>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.ul
            key={current.id + "-list"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="list-none flex flex-col gap-4"
          >
            {current.details.map((detail, i) => (
              <motion.li
                key={detail}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06, ease: ease.out }}
                className="flex items-center gap-3 py-3 border-b border-[var(--border)] text-sm"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                <span className="text-[var(--text-primary)]">{detail}</span>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </section>
  );
}
