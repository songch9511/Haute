"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedSection, revealVariants, ease } from "@/components/motion";

export function ShowcaseHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-dvh flex items-center px-8 pt-16 overflow-hidden"
    >
      {/* Parallax background shapes */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[15%] right-[10%] w-[300px] h-[300px] rounded-full bg-[var(--accent)]/5 blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-[20%] left-[5%] w-[200px] h-[200px] rounded-full bg-[var(--bg-surface)] blur-2xl pointer-events-none"
      />

      <motion.div style={{ opacity }} className="max-w-[1280px] mx-auto w-full grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-12 items-center">
        {/* Left: Typography */}
        <div>
          <AnimatedSection>
            <span className="inline-block text-xs font-medium tracking-widest uppercase text-[var(--text-tertiary)] mb-6">
              Design Studio &mdash; Est. 2019
            </span>
          </AnimatedSection>

          <AnimatedSection variants={revealVariants} delay={0.1}>
            <h1 className="text-[2.75rem] md:text-[3.5rem] font-normal leading-[1.1] tracking-tight mb-6">
              We craft interfaces
              <br />
              that <em className="italic text-[var(--accent)]">move</em> people
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-[480px] mb-8">
              Atelier is a design studio specializing in motion-rich digital
              experiences. Every interaction is choreographed, every transition
              intentional.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="flex gap-4 items-center">
              <motion.a
                href="#work"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center px-6 py-3 min-h-[44px] bg-[var(--accent)] text-[var(--bg-primary)] text-base font-medium rounded-lg no-underline"
              >
                View our work
              </motion.a>
              <motion.a
                href="#services"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center px-6 py-3 min-h-[44px] border border-[var(--border)] text-[var(--text-primary)] text-base font-medium rounded-lg no-underline"
              >
                Our process
              </motion.a>
            </div>
          </AnimatedSection>
        </div>

        {/* Right: Animated composition */}
        <AnimatedSection delay={0.2} className="relative hidden md:block">
          <div className="relative aspect-square max-w-[420px] mx-auto">
            {/* Layered cards with stagger */}
            {[
              { rotate: -6, scale: 0.92, z: 0, bg: "var(--bg-surface)", delay: 0.4 },
              { rotate: -3, scale: 0.96, z: 1, bg: "var(--bg-elevated)", delay: 0.5 },
              { rotate: 0, scale: 1, z: 2, bg: "var(--bg-elevated)", delay: 0.6 },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, rotate: card.rotate }}
                animate={{ opacity: 1, y: 0, rotate: card.rotate }}
                transition={{ duration: 0.6, delay: card.delay, ease: ease.out }}
                className="absolute inset-0 rounded-xl border border-[var(--border)] p-6"
                style={{
                  backgroundColor: card.bg,
                  zIndex: card.z,
                  transform: `scale(${card.scale})`,
                }}
              >
                {i === 2 && (
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 mb-4" />
                      <div className="h-3 w-3/4 bg-[var(--bg-surface)] rounded mb-2" />
                      <div className="h-3 w-1/2 bg-[var(--bg-surface)] rounded" />
                    </div>
                    <div className="flex gap-2">
                      {[60, 80, 45, 90, 70, 55, 85].map((h, j) => (
                        <motion.div
                          key={j}
                          className="flex-1 bg-[var(--accent)] rounded-t opacity-50"
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 0.5, delay: 0.8 + j * 0.05, ease: ease.out }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </motion.div>
    </section>
  );
}
