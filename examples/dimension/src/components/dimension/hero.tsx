"use client";

import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export function Hero() {
  return (
    <section className="relative bg-bg-primary overflow-hidden" style={{ paddingTop: 160, paddingBottom: 128 }}>
      {/* Subtle grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="hero-grid" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M64 0L0 0 0 64" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto" style={{ maxWidth: 1280, padding: "0 24px" }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left content — 7 cols */}
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.08em] uppercase text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Now in public beta
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06, ease }}
              className="text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] font-bold leading-[1.05] tracking-tight font-heading text-text-primary mb-6"
            >
              2D to 3D{" "}
              <br className="hidden sm:block" />
              in Seconds
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12, ease }}
              className="text-[17px] md:text-[18px] text-text-secondary leading-[1.65] max-w-[480px] mb-10"
            >
              Upload 2D engineering drawings. AI generates precise 3D models.
              Edit via chat. Export to STEP, GLB, or STL in one click.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#start"
                className="inline-flex items-center justify-center text-[15px] font-medium bg-accent text-bg-primary px-7 h-12 rounded-lg hover:bg-accent-hover transition-colors"
              >
                Start Free
              </a>
              <a
                href="#demo"
                className="inline-flex items-center justify-center text-[15px] font-medium border border-border text-text-primary px-7 h-12 rounded-lg hover:bg-white/[0.04] transition-colors"
              >
                Watch Demo
              </a>
            </motion.div>
          </div>

          {/* Right visual — 5 cols, pushed down */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="md:col-span-5 mt-4 md:mt-16"
          >
            <div className="bg-bg-elevated rounded-2xl border border-border overflow-hidden" style={{ aspectRatio: "4/5" }}>
              {/* Fake app chrome */}
              <div className="h-10 border-b border-border flex items-center px-4 gap-2">
                <span className="w-2 h-2 rounded-full bg-text-muted/30" />
                <span className="w-2 h-2 rounded-full bg-text-muted/30" />
                <span className="w-2 h-2 rounded-full bg-text-muted/30" />
                <span className="ml-3 text-[10px] text-text-muted font-mono">model-preview.glb</span>
              </div>

              {/* 3D viewport placeholder */}
              <div className="flex-1 flex items-center justify-center p-8 h-full">
                <div className="text-center">
                  <svg width="120" height="140" viewBox="0 0 120 140" fill="none" className="mx-auto mb-4 text-text-muted/20">
                    <path d="M60 10L110 40V100L60 130L10 100V40Z" stroke="currentColor" strokeWidth="1" />
                    <path d="M60 10V130M10 40L110 100M110 40L10 100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                    <circle cx="60" cy="70" r="20" stroke="currentColor" strokeWidth="0.8" />
                  </svg>
                  <div className="text-[11px] text-text-muted font-mono">Generating 3D model...</div>
                  <div className="mt-3 w-32 mx-auto h-1 rounded-full bg-bg-surface overflow-hidden">
                    <div className="h-full w-2/3 rounded-full bg-accent/60" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
