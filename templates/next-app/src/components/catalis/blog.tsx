"use client";

import Image from "next/image";
import {
  motion,
  AnimatedSection,
  StaggerGroup,
  StaggerItem,
} from "@/components/motion";
import { StarBadge } from "./star-badge";

const posts = [
  {
    photo: "photo-1529626455594-4ff0802cfb7e",
    title: "The CFO's Guide to Real-Time Financial Reporting",
    excerpt:
      "How leading finance teams are shifting to live dashboards — and what it means for month-end close.",
  },
  {
    photo: "photo-1524504388940-b1c1722653e1",
    title: "How to Build a Cash Reserve Without Starving Growth",
    excerpt:
      "Three frameworks that help fast-growing teams balance liquidity with investment.",
  },
  {
    photo: "photo-1521791136064-7986c2920216",
    title: "Five Reconciliation Mistakes That Cost Thousands",
    excerpt:
      "Manual matching and siloed data create errors that compound across your ledger.",
  },
];

export function CatalisBlog() {
  return (
    <section className="py-20 md:py-[5rem]">
      <div className="max-w-[80rem] mx-auto px-6 md:px-[3.25rem]">
        {/* Header — centered (matching reference) */}
        <AnimatedSection className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto mb-12">
          <div className="flex items-center gap-1">
            <StarBadge />
            <span className="text-xs font-medium tracking-[0.075rem] uppercase text-[#4c4c4c] ml-2">
              Blog and articles
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,5vw,3.5rem)] leading-[1.2] tracking-[-0.04em] text-[#131313]">
            Discover the latest <em className="italic">blogs</em>
          </h2>
          <p className="text-[#4c4c4c] text-base leading-relaxed max-w-lg">
            Practical perspectives on finance operations, analytics strategy,
            and scaling infrastructure.
          </p>
        </AnimatedSection>

        {/* 3-col blog cards (matching reference layout) */}
        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_0.9fr] gap-5">
          {posts.map((post) => (
            <StaggerItem key={post.title}>
              <motion.a
                href="#"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="block bg-white rounded-[2rem] overflow-hidden shadow-[0_0_32px_rgba(0,0,0,0.07)] h-full"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={`https://images.unsplash.com/${post.photo}?w=600&h=450&fit=crop&auto=format&q=80`}
                    alt={post.title}
                    width={600}
                    height={450}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6 flex flex-col gap-2">
                  <h3 className="font-[family-name:var(--font-cormorant)] text-xl tracking-tight text-[#131313] leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#4c4c4c] leading-relaxed">
                    {post.excerpt}
                  </p>
                  <span className="text-sm text-[#0054f9] font-medium mt-2">
                    Read more →
                  </span>
                </div>
              </motion.a>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
