"use client";

import { motion } from "framer-motion";
import { AnimatedSection, StaggerGroup, StaggerItem, fadeUpVariants } from "@/components/motion";

const experts = [
  { name: "Sora Tanaka", location: "Tokyo, JP", specialty: "Brand & Identity" },
  { name: "Lucas Bergmann", location: "Berlin, DE", specialty: "Product Design" },
  { name: "Amara Osei", location: "London, UK", specialty: "Motion Design" },
  { name: "Elena Vasquez", location: "Barcelona, ES", specialty: "E-commerce" },
  { name: "Wei Chen", location: "San Francisco, US", specialty: "Design Systems" },
  { name: "Ines Moreau", location: "Paris, FR", specialty: "Creative Direction" },
  { name: "Henrik Larsen", location: "Copenhagen, DK", specialty: "Web Development" },
  { name: "Priya Sharma", location: "Mumbai, IN", specialty: "UX Research" },
];

export function FramerExperts() {
  return (
    <section className="py-32 px-8 border-y border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection className="max-w-[480px] mb-16">
          <span className="text-xs font-medium tracking-widest uppercase text-[#555] block mb-3">Marketplace</span>
          <h2 className="text-[2rem] md:text-[2.5rem] font-bold leading-[1.08] tracking-tight mb-4">Find an expert</h2>
          <p className="text-base text-[#888] leading-relaxed">Certified Prism experts around the world. Hire one to build, redesign, or optimize your site.</p>
        </AnimatedSection>

        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {experts.map((e) => (
            <StaggerItem key={e.name} variants={fadeUpVariants}>
              <motion.div whileHover={{ y: -3, borderColor: "rgba(255,255,255,0.1)" }} transition={{ duration: 0.2, ease: "easeOut" }} className="bg-[#111115] border border-white/[0.06] rounded-xl p-5 cursor-pointer">
                <div className="w-11 h-11 rounded-full bg-white/[0.06] border border-white/[0.06] flex items-center justify-center text-xs font-semibold text-[#888] mb-4">{e.name.split(" ").map(n => n[0]).join("")}</div>
                <h3 className="text-sm font-semibold tracking-tight mb-0.5">{e.name}</h3>
                <p className="text-xs text-[#555] mb-3">{e.location}</p>
                <span className="text-[11px] font-medium text-[#888] bg-white/[0.04] border border-white/[0.06] px-2 py-1 rounded-md">{e.specialty}</span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
