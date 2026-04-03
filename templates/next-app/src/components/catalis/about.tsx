"use client";

import Image from "next/image";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/motion";
import { StarBadge } from "./star-badge";

const stats = [
  { value: "82%", label: "Reduction in reporting time" },
  { value: "$73k", label: "Savings per month (avg)" },
  { value: "99.7", label: "Increase in billing accuracy" },
];

export function CatalisAbout() {
  return (
    <section id="about" className="py-20 md:py-[5rem]">
      <div className="max-w-[80rem] mx-auto px-6 md:px-[3.25rem]">
        {/* Centered header text */}
        <AnimatedSection className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto mb-12">
          <StarBadge />
          <p className="text-xs font-medium tracking-[0.075rem] uppercase text-[#4c4c4c]">
            about us
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.75rem,4vw,3rem)] leading-[1.2] tracking-[-0.04em] text-[#131313]">
            We help teams turn raw financial data into decisions that move the
            needle and drive measurable outcomes.
          </h2>
        </AnimatedSection>

        {/* Image centered with overlay card */}
        <AnimatedSection className="flex justify-center mb-12">
          <div className="relative w-full max-w-md">
            <div className="rounded-[2rem] overflow-hidden aspect-[3/4]">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&auto=format&q=80"
                alt="Financial analyst reviewing data"
                width={600}
                height={800}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            {/* Small overlay card mimicking the reference */}
            <div className="absolute top-4 right-[-1rem] md:right-[-2rem] bg-white/80 backdrop-blur-[10px] border border-white/60 rounded-xl p-3 shadow-[0_4px_15px_rgba(0,0,0,0.12)]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[#131313] tabular-nums">85%</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-1.5 h-4 bg-[#0054f9] rounded-sm" style={{ height: `${10 + i * 3}px` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Stats row */}
        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="flex items-baseline gap-3">
                <p className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl tracking-tight text-[#131313]">
                  {stat.value}
                </p>
                <p className="text-sm text-[#4c4c4c] leading-snug">
                  {stat.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
