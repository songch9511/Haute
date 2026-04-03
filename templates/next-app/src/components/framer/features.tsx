"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatedSection, ease } from "@/components/motion";

const features = [
  {
    id: "ai",
    label: "AI",
    desc: "Generate site layouts and advanced components in seconds with AI, so you can skip the blank canvas and start designing with confidence.",
  },
  {
    id: "design",
    label: "Design",
    desc: "Craft responsive layouts and bring them to life with smooth effects, interactions, and animations. Build exactly what you imagine, visually.",
  },
  {
    id: "cms",
    label: "CMS",
    desc: "Manage and update your content effortlessly with a built-in CMS. Keep your site fresh without touching code.",
  },
  {
    id: "collaborate",
    label: "Collaborate",
    desc: "Work together in real time with built-in multiplayer editing. Leave comments, share previews, and publish — all from one place.",
  },
];

/* ── Demo Panels ── */

function AIDemo() {
  return (
    <div className="bg-[#111115] rounded-l-xl md:rounded-r-none border border-white/[0.06] md:border-r-0 p-6 lg:p-8 h-full flex flex-col h-[75vh] min-h-[500px]">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-6 h-6 rounded-lg bg-white/[0.06]" />
        <span className="text-xs font-medium text-[#888]">Prism AI</span>
      </div>
      <div className="bg-white/[0.04] rounded-lg p-4 mb-4 border border-white/[0.06]">
        <p className="text-sm text-[#ccc] leading-relaxed">Design three unique landing pages for a modern design agency.</p>
      </div>
      <div className="flex items-start gap-3 mt-2">
        <div className="w-5 h-5 rounded bg-white/[0.08] shrink-0 mt-0.5" />
        <p className="text-sm text-[#888] leading-relaxed">I created three unique layouts with distinct visual approaches...</p>
      </div>
      <div className="mt-auto pt-6">
        <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.04] rounded-lg border border-white/[0.06]">
          <span className="text-sm text-[#555]">Ask Prism...</span>
          <div className="ml-auto w-5 h-5 rounded bg-white/[0.06]" />
        </div>
      </div>
    </div>
  );
}

function DesignDemo() {
  return (
    <div className="bg-[#111115] rounded-l-xl md:rounded-r-none border border-white/[0.06] md:border-r-0 p-5 lg:p-8 h-full grid grid-cols-[160px_1fr] gap-4 h-[75vh] min-h-[500px]">
      <div className="space-y-4">
        <div className="text-[11px] font-semibold text-[#555] uppercase tracking-wider flex items-center justify-between">Design <span className="text-[#444]">+</span></div>
        {["Headers", "Assets", "Icons", "Style Guide"].map((p) => (
          <div key={p} className="flex items-center gap-2 text-[12px] text-[#888] py-1">
            <div className="w-3.5 h-3.5 rounded bg-white/[0.06]" />{p}
          </div>
        ))}
        <div className="text-[11px] font-semibold text-[#555] uppercase tracking-wider flex items-center justify-between mt-6">Pages <span className="text-[#444]">+</span></div>
        {["/home", "/about", "/blog", "/pricing", "/work"].map((p) => (
          <div key={p} className="flex items-center gap-2 text-[12px] text-[#888] py-0.5">
            <svg className="w-3 h-3 text-[#444]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>{p}
          </div>
        ))}
      </div>
      <div className="bg-white/[0.02] rounded-lg border border-white/[0.04] p-6 flex flex-col gap-3">
        <div className="h-5 w-3/4 bg-white/[0.1] rounded" />
        <div className="h-5 w-1/2 bg-white/[0.08] rounded" />
        <div className="h-3 w-full bg-white/[0.04] rounded mt-2" />
        <div className="h-3 w-4/5 bg-white/[0.04] rounded" />
        <div className="flex gap-2 mt-4">
          <div className="h-7 w-20 bg-white/[0.1] rounded-md" />
          <div className="h-7 w-20 bg-white/[0.04] rounded-md" />
        </div>
      </div>
    </div>
  );
}

function CMSDemo() {
  const collections = [
    { name: "Updates", count: 153 }, { name: "Categories", count: 8 }, { name: "Blog", count: 9 },
  ];
  const synced = [
    { name: "Notion", count: 85, color: "#1a1a1a" }, { name: "Google Sheets", count: 12, color: "#34a853" }, { name: "HubSpot", count: 32, color: "#ff7a59" },
  ];
  return (
    <div className="bg-[#111115] rounded-l-xl md:rounded-r-none border border-white/[0.06] md:border-r-0 p-5 lg:p-8 h-full grid grid-cols-[180px_1fr] gap-4 h-[75vh] min-h-[500px]">
      <div className="space-y-3">
        <div className="text-[11px] font-semibold text-[#555] uppercase tracking-wider">Collections</div>
        {collections.map((c) => (
          <div key={c.name} className="flex items-center justify-between text-[12px] text-[#888] py-1 px-2 rounded hover:bg-white/[0.03]">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-white/[0.08]" />{c.name}</div>
            <span className="text-[11px] text-[#555] tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>{c.count}</span>
          </div>
        ))}
        <div className="text-[11px] font-semibold text-[#555] uppercase tracking-wider mt-4">Synced</div>
        {synced.map((s) => (
          <div key={s.name} className="flex items-center justify-between text-[12px] text-[#888] py-1 px-2 rounded">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded" style={{ backgroundColor: s.color }} />{s.name}</div>
            <span className="text-[11px] text-[#555] tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>{s.count}</span>
          </div>
        ))}
      </div>
      <div className="bg-white/[0.02] rounded-lg border border-white/[0.04] overflow-hidden">
        <div className="grid grid-cols-[1fr_60px_100px] gap-3 px-4 py-2 border-b border-white/[0.04] text-[10px] text-[#555] font-medium">
          <span>Title</span><span>Image</span><span>Date</span>
        </div>
        {["Auto Translate", "March Update: Bento", "Chromatic Aberration", "Shaders"].map((t, i) => (
          <div key={t} className="grid grid-cols-[1fr_60px_100px] gap-3 px-4 py-2.5 border-b border-white/[0.04] last:border-0 text-[12px]">
            <span className="text-[#ccc]">{t}</span>
            <div className="w-6 h-4 rounded bg-white/[0.06]" />
            <span className="text-[#555] tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>Mar {31 - i * 3}, 2026</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CollabDemo() {
  const cursors = [
    { name: "Sarah", color: "#3b82f6", x: 30, y: 20 },
    { name: "Marcus", color: "#22c55e", x: 65, y: 50 },
    { name: "Aisha", color: "#f59e0b", x: 45, y: 75 },
  ];
  return (
    <div className="bg-[#111115] rounded-l-xl md:rounded-r-none border border-white/[0.06] md:border-r-0 p-6 lg:p-8 h-full relative overflow-hidden h-[75vh] min-h-[500px]">
      <div className="space-y-3 mb-8">
        <div className="h-6 w-3/4 bg-white/[0.08] rounded" />
        <div className="h-6 w-1/2 bg-white/[0.06] rounded" />
        <div className="h-3 w-full bg-white/[0.03] rounded mt-4" />
        <div className="h-3 w-4/5 bg-white/[0.03] rounded" />
      </div>
      {cursors.map((c) => (
        <div key={c.name} className="absolute flex items-start gap-1" style={{ left: `${c.x}%`, top: `${c.y}%` }}>
          <svg width="12" height="16" viewBox="0 0 12 16" fill={c.color}><path d="M0 0L12 8.5L5.5 9.5L3 16L0 0Z" /></svg>
          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md text-white" style={{ backgroundColor: c.color }}>{c.name}</span>
        </div>
      ))}
      <div className="absolute bottom-8 right-8 bg-white/[0.06] border border-white/[0.08] rounded-lg p-3 max-w-[180px]">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-4 h-4 rounded-full bg-[#3b82f6]" />
          <span className="text-[10px] font-medium text-[#ccc]">Sarah</span>
        </div>
        <p className="text-[11px] text-[#888] leading-relaxed">Can we try a wider layout here?</p>
      </div>
    </div>
  );
}

const demos: Record<string, () => React.JSX.Element> = {
  ai: AIDemo,
  design: DesignDemo,
  cms: CMSDemo,
  collaborate: CollabDemo,
};

/* ── Main Component: Scroll-Linked Sticky Tabs (framer.com pattern) ── */
/*
 * How it works:
 * - Page scrolls normally
 * - Left column is sticky (stays in viewport)
 * - Right column has tall (~80vh) demo panels that scroll past naturally
 * - IntersectionObserver detects which demo is in view → updates left tab
 * - Clicking a tab scrolls to that demo
 */

export function FramerFeatures() {
  const [active, setActive] = useState("ai");
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    features.forEach((f) => {
      const el = panelRefs.current[f.id];
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(f.id);
        },
        { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (id: string) => {
    const el = panelRefs.current[id];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section className="bg-[#0a0a0a] text-white py-32 overflow-x-clip">
      {/* Heading — contained */}
      <div className="max-w-[1200px] mx-auto px-8">
        <AnimatedSection className="mb-16">
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-bold leading-[1.05] tracking-tight max-w-[500px]">
            Create,
            <br />
            collaborate,
            <br />
            and go live
          </h2>
        </AnimatedSection>
      </div>

      {/* Two-column: left contained, right bleeds to edge */}
      <div className="flex items-start gap-12">
        {/* Left spacer to align with 1200px container */}
        <div className="hidden md:block shrink-0" style={{ width: "max(calc((100vw - 1200px) / 2 + 32px), 32px)" }} />

        {/* Left: sticky tab list */}
        <div className="hidden md:block sticky top-24 self-start shrink-0 w-[280px]">
          {features.map((f) => (
            <button
              key={f.id}
              onClick={() => handleClick(f.id)}
              className="flex items-start gap-4 py-5 border-b border-white/[0.06] bg-transparent border-x-0 border-t-0 cursor-pointer text-left min-h-[44px] w-full"
                style={{ fontFamily: "inherit" }}
              >
                <div
                  className={`w-[2px] self-stretch shrink-0 rounded-full transition-all duration-300 ${
                    active === f.id ? "bg-white" : "bg-transparent"
                  }`}
                />
                <div>
                  <h3
                    className={`text-2xl font-semibold tracking-tight transition-colors duration-200 ${
                      active === f.id ? "text-white" : "text-[#444]"
                    }`}
                  >
                    {f.label}
                  </h3>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: active === f.id ? 140 : 0,
                      opacity: active === f.id ? 1 : 0,
                    }}
                  >
                    <p className="text-sm text-[#888] leading-relaxed mt-2 max-w-[240px]">
                      {f.desc}
                    </p>
                    <span className="text-sm text-white mt-3 inline-block">
                      Learn more &rsaquo;
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

        {/* Right: tall demo panels — bleeds to right edge of viewport */}
        <div className="flex-1 min-w-0 flex flex-col gap-0 pr-0">
          {features.map((f) => {
            const DemoComponent = demos[f.id];
            return (
              <div
                key={f.id}
                ref={(el) => { panelRefs.current[f.id] = el; }}
                className="min-h-[90vh] flex flex-col justify-center py-8 pr-0 md:-mr-8"
              >
                {/* Mobile: label above demo */}
                <h3 className="text-xl font-semibold tracking-tight mb-2 md:hidden px-8">{f.label}</h3>
                <p className="text-sm text-[#888] leading-relaxed mb-6 md:hidden px-8">{f.desc}</p>
                <DemoComponent />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
