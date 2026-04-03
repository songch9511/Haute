"use client";

import { motion } from "framer-motion";

const companies = [
  "Mitsubishi Heavy Industries",
  "Hyundai Engineering",
  "Samsung E&A",
  "Doosan Enerbility",
  "SK Hynix",
  "Hanwha Aerospace",
  "LG Energy Solution",
  "POSCO Holdings",
];

export function SocialProof() {
  return (
    <section className="border-b border-border py-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-[1200px] px-6"
      >
        <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-muted text-center mb-6">
          Trusted by engineering teams at
        </p>
      </motion.div>

      {/* Marquee */}
      <div className="relative">
        <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
          {[...companies, ...companies].map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-6 mx-8"
            >
              <span className="text-[13px] font-medium tracking-wide text-text-muted whitespace-nowrap">
                {name}
              </span>
              <span className="text-border-light text-[10px]">◆</span>
            </div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg-main to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg-main to-transparent pointer-events-none" />
      </div>

    </section>
  );
}
