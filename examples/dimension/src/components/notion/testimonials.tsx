"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Testimonial {
  company: string;
  quote: string;
  name: string;
  role: string;
  initials: string;
  avatarBg: string;
  avatarColor: string;
}

const testimonials: Testimonial[] = [
  {
    company: "Clearpath Robotics",
    quote:
      "Gather replaced our Confluence, Asana, and half our Slack channels. Our team spends 40% less time searching for answers.",
    name: "Tomas Herrera",
    role: "Head of Product",
    initials: "TH",
    avatarBg: "rgba(39, 145, 141, 0.15)",
    avatarColor: "#27918d",
  },
  {
    company: "Vercel",
    quote:
      "The AI agent feature is unlike anything else out there. It drafts our weekly updates and surfaces blockers before standup.",
    name: "Amara Osei",
    role: "Engineering Manager",
    initials: "AO",
    avatarBg: "rgba(246, 73, 50, 0.15)",
    avatarColor: "#f64932",
  },
  {
    company: "Ramp",
    quote:
      "We moved 12,847 pages from our old wiki in under a day. The import tool is seriously impressive.",
    name: "David Liu",
    role: "IT Director",
    initials: "DL",
    avatarBg: "rgba(9, 127, 232, 0.15)",
    avatarColor: "#097fe8",
  },
  {
    company: "Figma",
    quote:
      "Every designer on our team uses Gather daily. The real-time collaboration is on par with our own tools.",
    name: "Ingrid Solberg",
    role: "Design Lead",
    initials: "IS",
    avatarBg: "rgba(255, 177, 16, 0.15)",
    avatarColor: "#ffb110",
  },
  {
    company: "Mercury",
    quote:
      "We chose Gather because the API is first-class. Our custom integrations took hours, not weeks.",
    name: "Rahul Mehta",
    role: "CTO",
    initials: "RM",
    avatarBg: "rgba(152, 73, 232, 0.15)",
    avatarColor: "#9849e8",
  },
  {
    company: "Cursor",
    quote:
      "Gather\u2019s meeting notes feature saved our team from hiring a dedicated note-taker. The AI captures everything.",
    name: "Elena Vasquez",
    role: "VP Operations",
    initials: "EV",
    avatarBg: "rgba(255, 109, 0, 0.15)",
    avatarColor: "#ff6d00",
  },
];

function StarIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      viewBox="0 0 14 14"
      fill="#ffb110"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 1.2l1.56 3.16 3.49.51-2.52 2.46.6 3.47L7 9.07 3.87 10.8l.6-3.47L1.95 4.87l3.49-.51L7 1.2z" />
    </svg>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-32 lg:py-40">
      <motion.h2
        className="text-3xl md:text-[2.625rem] font-bold tracking-[-0.03em] text-center px-4"
        style={{ color: "rgba(0,0,0,0.95)" }}
        initial={{ opacity: 0, transform: "translateY(20px)" }}
        animate={isInView ? { opacity: 1, transform: "translateY(0px)" } : {}}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Loved by teams everywhere
      </motion.h2>

      <style>{`.testimonials-scroll::-webkit-scrollbar { display: none; }`}</style>
      <div className="max-w-[1252px] mx-auto px-4 lg:px-6 w-full">
        <motion.div
          className="testimonials-scroll mt-12 flex gap-4 overflow-x-auto snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          initial={{ opacity: 0, transform: "translateY(28px)" }}
          animate={isInView ? { opacity: 1, transform: "translateY(0px)" } : {}}
          transition={{
            duration: 0.6,
            delay: 0.12,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="testimonials-scroll min-w-[320px] md:min-w-[380px] snap-start rounded-xl p-6 flex flex-col transition-shadow duration-200 hover:shadow-lg shrink-0"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            {/* Company + Stars */}
            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: "rgba(0,0,0,0.7)" }}
              >
                {t.company}
              </p>
              <div className="flex gap-0.5 mt-2">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
            </div>

            {/* Quote */}
            <p
              className="mt-4 text-[15px] leading-relaxed flex-1"
              style={{ color: "rgba(0,0,0,0.75)" }}
            >
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Attribution */}
            <div className="mt-6 flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                style={{
                  backgroundColor: t.avatarBg,
                  color: t.avatarColor,
                }}
              >
                {t.initials}
              </div>
              <div>
                <p
                  className="text-sm font-medium"
                  style={{ color: "rgba(0,0,0,0.9)" }}
                >
                  {t.name}
                </p>
                <p className="text-xs" style={{ color: "rgba(0,0,0,0.54)" }}>
                  {t.role}
                </p>
              </div>
            </div>
          </div>
        ))}
        </motion.div>
      </div>
    </section>
  );
}
