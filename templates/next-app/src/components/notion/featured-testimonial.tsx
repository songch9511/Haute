"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function FeaturedTestimonial() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-32 lg:py-40">
      <div
        ref={ref}
        className="mx-auto max-w-[1252px] px-4 lg:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        {/* Left: Content */}
        <motion.div
          initial={{ opacity: 0, transform: "translateY(28px)" }}
          animate={isInView ? { opacity: 1, transform: "translateY(0px)" } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p
            className="text-xs font-medium uppercase tracking-[0.1em]"
            style={{
              color: "rgba(0,0,0,0.4)",
              fontFamily: "var(--font-outfit)",
            }}
          >
            Case Study
          </p>
          <h2
            className="mt-3 text-2xl md:text-3xl font-bold tracking-[-0.02em]"
            style={{ color: "rgba(0,0,0,0.95)" }}
          >
            How Meridian Labs cut onboarding time by 64%
          </h2>
          <blockquote
            className="mt-6 text-base leading-relaxed pl-5"
            style={{
              color: "#615d59",
              borderLeft: "3px solid #0075de",
            }}
          >
            We evaluated six tools before choosing Gather. Within two weeks, our
            entire 340-person engineering org had migrated their docs, wikis, and
            project boards. The AI search alone saves each engineer about 4.7
            hours a week.
          </blockquote>
          <p className="mt-4 text-sm" style={{ color: "rgba(0,0,0,0.54)" }}>
            — Priya Venkatesh, VP Engineering at Meridian Labs
          </p>
          <a
            href="#"
            className="mt-6 inline-flex items-center min-h-[44px] text-sm font-medium transition-colors duration-150 hover:underline"
            style={{ color: "#0075de" }}
          >
            Read case study
            <svg
              className="ml-1 w-4 h-4"
              fill="none"
              viewBox="0 0 16 16"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3.5 8h9M8.5 4l4 4-4 4" />
            </svg>
          </a>
        </motion.div>

        {/* Right: Visual card */}
        <motion.div
          initial={{ opacity: 0, transform: "translateY(28px)" }}
          animate={isInView ? { opacity: 1, transform: "translateY(0px)" } : {}}
          transition={{
            duration: 0.6,
            delay: 0.12,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <div
            className="relative rounded-xl overflow-hidden"
            style={{
              backgroundColor: "#f9f9f8",
              border: "1px solid rgba(0,0,0,0.1)",
              aspectRatio: "4 / 3",
            }}
          >
            {/* Mock dashboard UI */}
            <div className="absolute inset-0 p-6 flex flex-col gap-4">
              {/* Top bar */}
              <div className="flex items-center gap-3">
                <div
                  className="h-3 rounded-full"
                  style={{
                    width: "80px",
                    backgroundColor: "rgba(0,0,0,0.08)",
                  }}
                />
                <div className="flex-1" />
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
                />
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
                />
              </div>

              {/* Metric cards row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Active users", value: "2,847", color: "#0075de" },
                  { label: "Completion", value: "94.2%", color: "#27918d" },
                  { label: "Avg. time", value: "3.1d", color: "#9849e8" },
                ].map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-lg p-3"
                    style={{ backgroundColor: "#ffffff" }}
                  >
                    <div
                      className="text-[10px]"
                      style={{ color: "rgba(0,0,0,0.4)" }}
                    >
                      {metric.label}
                    </div>
                    <div
                      className="text-sm font-bold mt-0.5"
                      style={{ color: "rgba(0,0,0,0.85)" }}
                    >
                      {metric.value}
                    </div>
                    <div
                      className="mt-2 h-1 rounded-full overflow-hidden"
                      style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: "72%",
                          backgroundColor: metric.color,
                          opacity: 0.7,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart area */}
              <div
                className="flex-1 rounded-lg p-4"
                style={{ backgroundColor: "#ffffff" }}
              >
                <div
                  className="text-[10px] mb-3"
                  style={{ color: "rgba(0,0,0,0.4)" }}
                >
                  Onboarding completion rate
                </div>
                {/* Simple bar chart mockup */}
                <div className="flex items-end gap-[6px] h-[calc(100%-24px)]">
                  {[38, 45, 52, 61, 58, 72, 78, 85, 82, 91, 94, 96].map(
                    (h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{
                          height: `${h}%`,
                          backgroundColor:
                            i >= 8
                              ? "#0075de"
                              : "rgba(0, 117, 222, 0.2)",
                        }}
                      />
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer"
                style={{
                  backgroundColor: "#ffffff",
                  boxShadow:
                    "0px 4px 18px rgba(0,0,0,0.08), 0px 2px 7.8px rgba(0,0,0,0.04)",
                }}
                aria-label="Play case study video"
              >
                <svg
                  className="w-5 h-5 ml-0.5"
                  viewBox="0 0 20 20"
                  fill="#0075de"
                >
                  <path d="M6.5 4.2a1 1 0 0 1 1.52-.86l8.5 5.3a1 1 0 0 1 0 1.72l-8.5 5.3A1 1 0 0 1 6.5 14.8V4.2Z" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
