"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

const testimonials = [
  {
    quote:
      "Dimension cut our CAD-to-3D pipeline from 3 days to 15 minutes.",
    name: "Sarah Chen",
    role: "Lead Engineer",
    company: "Meridian Labs",
    initials: "SC",
    color: "#22c55e",
  },
  {
    quote:
      "The AI understands engineering intent, not just geometry. It knows a hole is a hole.",
    name: "Marcus Rivera",
    role: "CTO",
    company: "Clearpath Robotics",
    initials: "MR",
    color: "#6366f1",
  },
  {
    quote:
      "We export directly to our rendering pipeline. No more manual conversion.",
    name: "Aisha Patel",
    role: "3D Artist",
    company: "Openframe Studio",
    initials: "AP",
    color: "#f59e0b",
  },
  {
    quote: "Finally, a tool that speaks both 2D and 3D fluently.",
    name: "James Okonkwo",
    role: "Product Director",
    company: "Dovetail Manufacturing",
    initials: "JO",
    color: "#ec4899",
  },
  {
    quote:
      "The chat-based editing is a game changer for quick iterations. Our review cycles dropped from days to hours because engineers can describe changes in plain language instead of navigating complex menus.",
    name: "Elena Volkov",
    role: "Mechanical Engineer",
    company: "NovaTech",
    initials: "EV",
    color: "#8b5cf6",
  },
  {
    quote:
      "Dimension handles complex assemblies that other tools choke on. We threw a 200-part gearbox at it and the model came back clean.",
    name: "Raj Krishnamurthy",
    role: "Principal Architect",
    company: "Steelframe Design",
    initials: "RK",
    color: "#14b8a6",
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-bg-light text-text-dark py-12">
      <div className="mx-auto" style={{ maxWidth: 1280, padding: "0 24px" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="text-center mb-12"
        >
          <p className="text-[12px] font-medium tracking-[0.1em] uppercase text-text-dark-secondary mb-3">
            Testimonials
          </p>
          <h2 className="text-[1.75rem] md:text-[2.25rem] font-bold tracking-[-0.03em] leading-[1.1] text-text-dark">
            Trusted by engineering teams worldwide.
          </h2>
        </motion.div>

        {/* Masonry grid */}
        <div className="masonry-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.08, ease }}
              className="bg-bg-light-elevated rounded-xl p-6 border border-border-light"
            >
              <blockquote className="text-[15px] leading-[1.7] text-text-dark mb-5">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-semibold text-white shrink-0"
                  style={{ backgroundColor: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-[14px] font-medium text-text-dark">
                    {t.name}
                  </div>
                  <div className="text-[12px] text-text-dark-secondary">
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
