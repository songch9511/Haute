"use client";

import {
  motion,
  AnimatedSection,
  StaggerGroup,
  StaggerItem,
  springs,
} from "@/components/motion";
import { StarBadge } from "./star-badge";

const coreFeatures = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
        <path d="M3 3v18h18" />
        <circle cx="9" cy="13" r="2" />
        <circle cx="15" cy="8" r="2" />
        <circle cx="19" cy="5" r="2" />
      </svg>
    ),
    iconBg: "bg-[#0054f9]",
    title: "Real-time analytics",
    description:
      "Gain actionable insights with our real-time analytics feature",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
    iconBg: "bg-[#131313]",
    title: "Mobile accessibility",
    description:
      "Manage your finances on the go with our mobile-friendly platform",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8" />
        <path d="M8 17h8" />
      </svg>
    ),
    iconBg: "bg-[#0054f9]",
    title: "Customizable reports",
    description:
      "Streamline your financial processes with automated workflows",
  },
];

export function CatalisCoreFeatures() {
  return (
    <section className="py-20 md:py-[5rem]">
      <div className="max-w-[80rem] mx-auto px-6 md:px-[3.25rem]">
        {/* Header — centered */}
        <AnimatedSection className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto mb-12">
          <div className="flex items-center gap-2">
            <StarBadge />
            <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
              <path d="M14 0L16.8 11.2L28 14L16.8 16.8L14 28L11.2 16.8L0 14L11.2 11.2L14 0Z" fill="#131313" />
            </svg>
          </div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,5vw,3.5rem)] leading-[1.2] tracking-[-0.04em] text-[#131313]">
            Core features that set us apart
            <br />
            from the <em className="italic">competition</em>
          </h2>
          <p className="text-[#4c4c4c] text-base leading-relaxed max-w-lg">
            Three capabilities designed to deliver exceptional performance and
            value, distinguishing us from the competition.
          </p>
        </AnimatedSection>

        {/* 3 cards in a row (matching reference layout) */}
        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_0.8fr] gap-5">
          {coreFeatures.map((f) => (
            <StaggerItem key={f.title}>
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-white rounded-[2rem] p-8 shadow-[0_0_32px_rgba(0,0,0,0.07)] flex flex-col gap-5 h-full"
              >
                <div className={`w-12 h-12 rounded-2xl ${f.iconBg} flex items-center justify-center`}>
                  {f.icon}
                </div>
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl tracking-tight text-[#131313]">
                  {f.title}
                </h3>
                <p className="text-sm text-[#4c4c4c] leading-relaxed flex-1">
                  {f.description}
                </p>
                <motion.a
                  href="#"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={springs.snappy}
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#131313] text-[#f0f0f0] text-sm font-medium rounded-full hover:bg-[#2a2a2a] transition-colors duration-200 mt-auto"
                >
                  Learn More
                </motion.a>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
