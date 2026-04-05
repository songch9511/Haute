"use client";

import { motion } from "@/components/motion";

const HERO_PAINTING = "/art/friedrich-wanderer.jpg";

export function UdHero() {
  return (
    <section
      id="top"
      className="relative min-h-[100dvh] w-full overflow-hidden flex items-center justify-center"
    >
      {/* Full-bleed painting background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("${HERO_PAINTING}")`,
          backgroundSize: "cover",
          backgroundPosition: "center 25%",
          backgroundColor: "#c9a980",
        }}
      />

      {/* Warm atmospheric veil — preserves the painting but ensures text readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(250,246,234,0.35) 0%, rgba(250,246,234,0.15) 30%, rgba(18,14,8,0.35) 65%, rgba(18,14,8,0.7) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-[#120e08]/15" />

      {/* Top folio line — editorial masthead */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-28 md:top-32 left-1/2 -translate-x-1/2 w-[min(94vw,1280px)] px-6 md:px-12"
      >
        <div className="flex items-baseline justify-between border-t border-[#faf6ea]/40 pt-4">
          <div className="flex items-baseline gap-4 md:gap-8">
            <span className="font-[family-name:var(--font-geist-mono)] text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#faf6ea]/85">
              Issue N° IV · Pillar
            </span>
            <span className="hidden md:inline font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#faf6ea]/55">
              High-agency design
            </span>
          </div>
          <span className="font-[family-name:var(--font-geist-mono)] text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#faf6ea]/85">
            MMXXVI · Shipping
          </span>
        </div>
      </motion.div>

      {/* Centered display stack */}
      <div className="relative z-10 w-full px-6 md:px-12 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-cormorant)] text-[clamp(3.5rem,11vw,10rem)] leading-[0.9] tracking-[-0.035em] text-[#faf6ea] max-w-[14ch]"
          style={{ fontWeight: 600, textShadow: "0 2px 30px rgba(18,14,8,0.5)" }}
        >
          Stop shipping
          <br />
          <em
            className="italic text-[#ffd4a8]"
            style={{ fontWeight: 500 }}
          >
            AI slop.
          </em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 max-w-[54ch] text-[17px] md:text-[19px] leading-[1.55] text-[#faf6ea]/90 font-[family-name:var(--font-geist-sans)]"
          style={{ textShadow: "0 1px 20px rgba(18,14,8,0.5)" }}
        >
          A design harness with the instincts of an editor, the memory of an
          archive, and the eye of an oracle. Writes taste into the model, then
          catches what the model still gets wrong.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4"
        >
          <a
            href="#install"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#faf6ea] text-[#120e08] font-[family-name:var(--font-cormorant)] italic text-[20px] hover:bg-[#ffd4a8] transition-colors duration-300"
            style={{ fontWeight: 500 }}
          >
            Begin the session
            <span className="not-italic font-[family-name:var(--font-geist-mono)] text-[12px]">→</span>
          </a>
          <a
            href="#pillars"
            className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.22em] text-[#faf6ea]/80 hover:text-[#faf6ea] transition-colors duration-200 border-b border-[#faf6ea]/40 hover:border-[#faf6ea] pb-0.5"
          >
            Read the architecture
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 font-[family-name:var(--font-geist-mono)] text-[11px] md:text-[12px] text-[#faf6ea]/70 tracking-wide"
          style={{ textShadow: "0 1px 16px rgba(18,14,8,0.55)" }}
        >
          <span className="text-[#ffd4a8]">$</span>{" "}
          <span>npx @udesigner/verifier examples/my-page</span>
        </motion.div>
      </div>

      {/* Bottom plate attribution */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-[min(94vw,1280px)] px-6 md:px-12"
      >
        <div className="flex items-baseline justify-between border-t border-[#faf6ea]/30 pt-3">
          <span className="font-[family-name:var(--font-cormorant)] italic text-[13px] md:text-[15px] text-[#faf6ea]/85">
            Wanderer above the Sea of Fog,
            <span className="not-italic text-[#faf6ea]/55"> Caspar David Friedrich, c. 1818</span>
          </span>
          <span className="font-[family-name:var(--font-geist-mono)] text-[9px] md:text-[10px] uppercase tracking-[0.22em] text-[#faf6ea]/55">
            Plate · I · Oil on canvas
          </span>
        </div>
      </motion.div>
    </section>
  );
}
