"use client";

import {
  motion,
  AnimatedSection,
  StaggerGroup,
  StaggerItem,
  springs,
} from "@/components/motion";
import { StarBadge } from "./star-badge";

const benefits = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0054f9" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    title: "Budgeting & expense tracking",
    description:
      "Categorize transactions automatically and set dynamic budgets that adjust to spending patterns across departments.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0054f9" strokeWidth="1.5">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-8 4 4 6-10" />
      </svg>
    ),
    title: "Portfolio management",
    description:
      "Track returns against benchmarks, monitor allocation, and rebalance with one-click execution.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0054f9" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Real-time reconciliation",
    description:
      "Match incoming payments to invoices within seconds, flagging discrepancies before they cascade.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0054f9" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Growth playbook",
    description:
      "Run scenario models for hiring and expansion — see how each decision impacts runway and margin.",
  },
];

export function CatalisBenefits() {
  return (
    <section className="px-4 md:px-6 py-2">
    <div
      className="relative py-20 md:py-[5rem] overflow-hidden rounded-[2rem]"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 100% 50% at 30% 0%, rgba(255,255,255,0.4) 0%, transparent 45%),
          url("https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?w=1920&h=1080&fit=crop&auto=format&q=80")
        `,
        backgroundSize: 'cover, cover',
        backgroundPosition: 'center, center',
        backgroundColor: '#7fbde3',
      }}
    >

      <div className="max-w-[80rem] mx-auto px-6 md:px-[3.25rem]">
        {/* Header — centered, white text to contrast sky bg */}
        <AnimatedSection className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto mb-12">
          <StarBadge />
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,5vw,3.5rem)] leading-[1.15] tracking-[-0.04em] text-white">
            Make payment easy, simplify
            <br />
            <span className="text-white/60 font-[family-name:var(--font-cormorant)]">
              your finance
            </span>
          </h2>
          <p className="text-white/70 text-base leading-relaxed max-w-lg">
            Adapt to market shifts and scale operations with flexible tooling
            built around your workflow — not the other way around.
          </p>
        </AnimatedSection>

        {/* 4-col cards with varied inner structure */}
        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, i) => (
            <StaggerItem key={b.title}>
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.15)" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-white rounded-[2rem] p-7 shadow-[0_0_32px_rgba(0,0,0,0.07)] flex flex-col gap-4 h-full"
              >
                <div className="w-11 h-11 rounded-xl bg-[#0054f9]/5 flex items-center justify-center">
                  {b.icon}
                </div>
                <h3 className="font-[family-name:var(--font-cormorant)] text-xl tracking-tight text-[#131313] leading-tight">
                  {b.title}
                </h3>
                <p className="text-sm text-[#4c4c4c] leading-relaxed">
                  {b.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <AnimatedSection delay={0.2} className="flex justify-center mt-10">
          <motion.a
            href="#pricing"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={springs.snappy}
            className="inline-flex items-center px-8 py-3 bg-[#131313] text-[#f0f0f0] text-sm font-medium rounded-full hover:bg-[#2a2a2a] transition-colors duration-200"
          >
            Get Started
          </motion.a>
        </AnimatedSection>
      </div>
    </div>
    </section>
  );
}
