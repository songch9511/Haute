"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stars = Array.from({ length: 5 });

export default function Quote() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-20 px-4 lg:px-6"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <div className="mx-auto max-w-[1252px]">
        <motion.blockquote
          className="max-w-[900px]"
          initial={{ opacity: 0, transform: "translateY(24px)" }}
          animate={inView ? { opacity: 1, transform: "translateY(0px)" } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p
            className="text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.3]"
            style={{
              color: "rgba(0,0,0,0.85)",
              letterSpacing: "-0.02em",
            }}
          >
            &ldquo;Gather has become the connective tissue for how our team
            operates&nbsp;&mdash; from planning to shipping, everything lives in
            one place.&rdquo;
          </p>

          <div
            className="mt-8 pt-6"
            style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}
          >
            <div className="flex items-center gap-4">
              <span
                className="text-sm font-semibold"
                style={{ color: "rgba(0,0,0,0.6)" }}
              >
                The Verge
              </span>

              <div className="flex items-center gap-0.5">
                {stars.map((_, i) => (
                  <svg
                    key={i}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 1.5l1.85 3.75L14 5.88l-3 2.92.71 4.13L8 10.88l-3.71 2.05.71-4.13-3-2.92 4.15-.63L8 1.5z"
                      fill="rgba(0,0,0,0.6)"
                    />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </motion.blockquote>
      </div>
    </section>
  );
}
