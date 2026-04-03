"use client";

import Image from "next/image";
import { motion, AnimatedSection, springs } from "@/components/motion";
import { StarBadge } from "./star-badge";

export function CatalisCTA() {
  return (
    <section id="contact" className="py-20 md:py-[5rem]">
      <div className="max-w-[80rem] mx-auto px-6 md:px-[3.25rem]">
        <div className="relative rounded-[2rem] py-24 px-8 overflow-hidden">
          {/* Background landscape image (matching reference) */}
          <Image
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&h=600&fit=crop&auto=format&q=80"
            alt=""
            fill
            className="object-cover -z-10"
            aria-hidden="true"
          />
          {/* Dark overlay for text contrast */}
          <div className="absolute inset-0 bg-[#131313]/40 -z-10" />

          {/* Decorative SVGs */}
          <svg className="absolute top-6 left-6 w-16 h-16 text-white/20" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1" />
            <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="1" />
          </svg>
          <svg className="absolute bottom-6 right-6 w-20 h-20 text-white/20" viewBox="0 0 80 80" fill="none">
            <rect x="4" y="4" width="72" height="72" rx="10" stroke="currentColor" strokeWidth="1" />
            <rect x="20" y="20" width="40" height="40" rx="6" stroke="currentColor" strokeWidth="1" />
          </svg>

          <div className="relative z-10 flex flex-col items-center text-center gap-5 max-w-xl mx-auto">
            <AnimatedSection className="flex flex-col items-center gap-5">
              <StarBadge />
              <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,5vw,3.5rem)] leading-[1.2] tracking-[-0.04em] text-white">
                Join us
              </h2>
              <p className="font-[family-name:var(--font-cormorant)] text-xl text-white/80 tracking-tight">
                Achieve operational clarity with <em className="italic">Kova</em>
              </p>
              <p className="text-white/70 text-base leading-relaxed">
                Founded by data engineers and former CFOs, we build analytics
                tools for finance teams of every size — from seed-stage to
                public.
              </p>
              <motion.a
                href="#pricing"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={springs.snappy}
                className="inline-flex items-center px-8 py-3 bg-white text-[#131313] text-sm font-medium rounded-full hover:bg-[#f0f0f0] transition-colors duration-200 mt-2"
              >
                Get Started
              </motion.a>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
