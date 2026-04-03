"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedSection, springs } from "@/components/motion";

export function CometCTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={ref} className="py-32 px-8 bg-[#060806]" id="cta">
      <motion.div style={{ scale, opacity }} className="max-w-[720px] mx-auto text-center">
        <AnimatedSection>
          <div className="w-16 h-16 rounded-2xl bg-[#10b981]/20 border border-[#10b981]/30 flex items-center justify-center mx-auto mb-8">
            <span className="text-2xl font-bold text-[#10b981]">C</span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-bold leading-[1.06] tracking-tight mb-6">
            Give your agents
            <br />
            a real memory
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="text-lg text-[#9ca3af] leading-relaxed max-w-[480px] mx-auto mb-10">
            Stop losing context between sessions. Start compounding knowledge
            across agents. CoMeT is open source and ready to integrate.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="flex gap-3 items-center justify-center flex-wrap">
            <motion.a
              href="#"
              whileHover={{ y: -1, boxShadow: "0 4px 20px rgba(16, 185, 129, 0.2)" }}
              whileTap={{ scale: 0.98 }}
              transition={springs.snappy}
              className="inline-flex items-center justify-center px-8 py-3.5 min-h-[48px] bg-[#10b981] text-[#0a0a0a] text-base font-semibold rounded-xl no-underline"
            >
              Get started
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ y: -1, borderColor: "rgba(255,255,255,0.15)" }}
              whileTap={{ scale: 0.98 }}
              transition={springs.snappy}
              className="inline-flex items-center justify-center px-8 py-3.5 min-h-[48px] border border-white/[0.08] text-white text-base font-medium rounded-xl no-underline"
            >
              Read the docs
            </motion.a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="mt-5 text-xs text-[#9ca3af]">
            MIT License &middot; pip install comet-memory &middot; npm i @comet/agent
          </p>
        </AnimatedSection>
      </motion.div>
    </section>
  );
}
