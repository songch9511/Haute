"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedSection, springs } from "@/components/motion";

export function FramerCTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={ref} className="py-32 px-8 bg-[#111113] text-[#e8e8e6]">
      <motion.div
        style={{ scale, opacity }}
        className="max-w-[720px] mx-auto text-center"
      >
        <AnimatedSection>
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-semibold leading-[1.08] tracking-tight mb-6">
            Start building
            <br />
            something real
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="text-lg text-[#888] leading-relaxed max-w-[480px] mx-auto mb-10">
            Join 14,000+ teams who design and ship production sites with Prism.
            Free to start, scales as you grow.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="flex gap-3 items-center justify-center flex-wrap">
            <motion.a
              href="#"
              whileHover={{ y: -1, boxShadow: "0 4px 20px rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.98 }}
              transition={springs.snappy}
              className="inline-flex items-center px-8 py-3.5 min-h-[44px] bg-[#fafaf9] text-[#111113] text-base font-medium rounded-lg no-underline"
            >
              Start for free
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ y: -1, borderColor: "#555" }}
              whileTap={{ scale: 0.98 }}
              transition={springs.snappy}
              className="inline-flex items-center px-8 py-3.5 min-h-[44px] border border-[#333] text-[#e8e8e6] text-base font-medium rounded-lg no-underline"
            >
              Talk to sales
            </motion.a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="mt-5 text-xs text-[#555]">
            No credit card required &middot; Free plan includes 2 published sites
          </p>
        </AnimatedSection>
      </motion.div>
    </section>
  );
}
