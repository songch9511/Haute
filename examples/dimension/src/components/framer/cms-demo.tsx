"use client";

import { motion } from "framer-motion";
import { AnimatedSection, ease } from "@/components/motion";

const rows = [
  { title: "Homepage Redesign", img: true, date: "Mar 28, 2026", category: "Marketing", slug: "/home" },
  { title: "Pricing v3", img: true, date: "Mar 26, 2026", category: "Product", slug: "/pricing" },
  { title: "Blog: Design Systems", img: false, date: "Mar 24, 2026", category: "Content", slug: "/blog/design-systems" },
  { title: "Careers Portal", img: true, date: "Mar 22, 2026", category: "HR", slug: "/careers" },
  { title: "Case Study: Meridian", img: true, date: "Mar 19, 2026", category: "Marketing", slug: "/cases/meridian" },
  { title: "API Reference", img: false, date: "Mar 17, 2026", category: "Docs", slug: "/docs/api" },
  { title: "Changelog Q1 2026", img: false, date: "Mar 15, 2026", category: "Product", slug: "/changelog" },
];

export function FramerCMSDemo() {
  return (
    <section className="py-32 px-8 bg-[#111113] text-[#e8e8e6]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.8fr] gap-16 items-start">
          <AnimatedSection>
            <span className="text-xs font-medium tracking-widest uppercase text-[#555] block mb-3">
              Content Management
            </span>
            <h2 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[1.1] tracking-tight mb-4">
              Content lives
              <br />
              next to design
            </h2>
            <p className="text-base text-[#888] leading-relaxed max-w-[360px]">
              A full CMS built into the editor. Create collections, define fields,
              and connect content to components — no external service required.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="bg-[#1a1a1e] border border-[#2a2a2e] rounded-xl overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-[2fr_60px_120px_100px_140px] gap-4 px-5 py-3 border-b border-[#2a2a2e] text-[11px] font-medium text-[#555]">
                <span>Title</span>
                <span>Image</span>
                <span>Date</span>
                <span>Category</span>
                <span>Slug</span>
              </div>

              {/* Table rows */}
              {rows.map((row, i) => (
                <motion.div
                  key={row.slug}
                  className="grid grid-cols-[2fr_60px_120px_100px_140px] gap-4 px-5 py-3.5 border-b border-[#2a2a2e] last:border-0 items-center hover:bg-[#222226] transition-colors duration-100 cursor-pointer"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05, ease: ease.out }}
                >
                  <span className="text-[13px] font-medium text-[#e8e8e6] truncate">{row.title}</span>
                  <span>
                    {row.img ? (
                      <div className="w-8 h-6 rounded bg-[#333] border border-[#444]" />
                    ) : (
                      <span className="text-[11px] text-[#555]">&mdash;</span>
                    )}
                  </span>
                  <span className="text-[12px] text-[#888] tabular-nums">{row.date}</span>
                  <span className="text-[11px] text-[#888] px-2 py-0.5 bg-[#2a2a2e] rounded w-fit">{row.category}</span>
                  <span className="text-[12px] text-[#555] font-mono truncate">{row.slug}</span>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
