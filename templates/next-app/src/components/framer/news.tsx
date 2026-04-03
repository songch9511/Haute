"use client";

import { motion } from "framer-motion";
import { AnimatedSection, StaggerGroup, StaggerItem, scaleInVariants } from "@/components/motion";

const posts = [
  { title: "Introducing Prism Analytics", date: "Mar 28, 2026", category: "Product", readTime: "4 min" },
  { title: "How Meridian Labs Cut Launch Time by 60%", date: "Mar 22, 2026", category: "Case Study", readTime: "7 min" },
  { title: "Design Systems at Scale: Lessons from 500 Teams", date: "Mar 15, 2026", category: "Engineering", readTime: "12 min" },
];

export function FramerNews() {
  return (
    <section className="py-32 px-8">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs font-medium tracking-widest uppercase text-[#555] block mb-3">
              Blog
            </span>
            <h2 className="text-[2rem] md:text-[2.5rem] font-bold leading-[1.08] tracking-tight">
              Latest news
            </h2>
          </div>
          <a href="#" className="text-sm text-[#888] hover:text-white transition-colors duration-150 hidden md:block min-h-[44px] inline-flex items-center">
            View all posts &rarr;
          </a>
        </AnimatedSection>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post) => (
            <StaggerItem key={post.title} variants={scaleInVariants}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="bg-[#111115] border border-white/[0.06] rounded-xl overflow-hidden cursor-pointer group"
              >
                <div className="aspect-[16/9] bg-[#1a1a1e] flex items-center justify-center relative overflow-hidden">
                  <div className="w-16 h-16 rounded-full bg-white/[0.04] group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] font-medium text-[#999] bg-white/[0.06] backdrop-blur-sm px-2 py-1 rounded-md border border-white/[0.06]">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-[#555] mb-3">
                    <span className="tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>{post.date}</span>
                    <span>&middot;</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-base font-semibold tracking-tight leading-snug group-hover:text-[#888] transition-colors duration-150">
                    {post.title}
                  </h3>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
