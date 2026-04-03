"use client";

import { motion, type Variants } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

/* ── Spring Presets (from motion-engine.md) ── */
export const springs = {
  standard: { type: "spring" as const, stiffness: 300, damping: 30 },
  gentle: { type: "spring" as const, stiffness: 200, damping: 25 },
  bouncy: { type: "spring" as const, stiffness: 400, damping: 15 },
  snappy: { type: "spring" as const, stiffness: 500, damping: 35 },
};

/* ── Easing ── */
export const ease = {
  out: [0.16, 1, 0.3, 1] as [number, number, number, number],
  inOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
};

/* ── Fade Up (default enter) ── */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/* ── Stagger Container ── */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

/* ── Scale In (modals, cards) ── */
export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

/* ── Slide from Left ── */
export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

/* ── Slide from Right ── */
export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

/* ── Reveal (clip-path) ── */
export const revealVariants: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: { clipPath: "inset(0 0 0% 0)" },
};

/* ── Reusable Animated Section ── */
export function AnimatedSection({
  children,
  className,
  variants = fadeUpVariants,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.5, ease: ease.out, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Stagger Group ── */
export function StaggerGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Stagger Item (use inside StaggerGroup) ── */
export function StaggerItem({
  children,
  className,
  variants = fadeUpVariants,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
}) {
  return (
    <motion.div
      variants={variants}
      transition={{ duration: 0.4, ease: ease.out }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Re-export motion for convenience ── */
export { motion, useInView };
