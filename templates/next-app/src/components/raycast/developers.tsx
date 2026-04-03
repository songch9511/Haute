"use client";

import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/motion";

const devFeatures = [
  {
    title: "React to macOS",
    description:
      "Build native-feeling extensions with React and TypeScript. Use familiar patterns — hooks, state, effects — to build desktop-class UIs.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#61dafb" strokeWidth="1.5">
        <circle cx="12" cy="12" r="2.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    title: "Built-in UI Components",
    description:
      "Lists, forms, detail views, grids, and action panels. Pre-built components that automatically adapt to the Raycast design language.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    title: "Batteries Included",
    description:
      "Caching, preferences, OAuth, local storage, and keyboard shortcuts. Everything you need ships with the API — no extra dependencies.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="18" height="10" rx="2" />
        <path d="M22 11v2" />
        <path d="M6 11v2" />
        <path d="M10 11v2" />
        <path d="M14 11v2" />
      </svg>
    ),
  },
  {
    title: "Publish to the Store",
    description:
      "Share your extensions with thousands of users. Built-in review pipeline, automatic updates, and install analytics.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
];

export function RaycastDevelopers() {
  return (
    <section className="py-24 md:py-32 px-5">
      <div className="max-w-[1280px] mx-auto">
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            {/* Left: text content — 2 cols */}
            <div className="lg:col-span-2">
              <p className="text-[13px] font-medium text-[#22c55e] tracking-[0.08em] uppercase mb-3">
                Developers
              </p>
              <h2 className="text-[32px] sm:text-[40px] font-bold leading-[1.1] tracking-[-0.03em] text-[#f0f0f0]">
                Build extensions for thousands
              </h2>
              <p className="mt-4 text-[15px] leading-[1.6] text-[#8a8f93] max-w-[400px]">
                Use the Raycast API to create extensions that integrate
                with macOS. React, TypeScript, and a full component library
                — everything you need to go from idea to Store in hours.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="#docs"
                  className="inline-flex items-center justify-center h-[40px] px-5 rounded-xl text-[13.5px] font-medium text-[#0e1011] transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: "#ff4c4c", backgroundImage: "linear-gradient(135deg, #ff6363 0%, #ff3563 100%)" }}
                >
                  Read the docs
                </a>
                <a
                  href="#api"
                  className="inline-flex items-center justify-center h-[40px] px-5 rounded-xl text-[13.5px] font-medium text-[#e8e8e8] border border-[#2a2d2f] hover:bg-[#1e2022] transition-all duration-150 active:scale-[0.98]"
                >
                  API Reference
                </a>
              </div>
            </div>

            {/* Right: feature cards — 3 cols */}
            <div className="lg:col-span-3">
              <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {devFeatures.map((f) => (
                  <StaggerItem key={f.title}>
                    <div className="h-full rounded-xl border border-[#2a2d2f] bg-[#161819] p-5 hover:border-[#3a3d3f] transition-colors duration-200">
                      <div className="mb-3">{f.icon}</div>
                      <h3 className="text-[15px] font-semibold leading-[1.2] text-[#f0f0f0] mb-1.5">
                        {f.title}
                      </h3>
                      <p className="text-[13px] leading-[1.55] text-[#8a8f93]">
                        {f.description}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </AnimatedSection>

        {/* Code snippet preview */}
        <AnimatedSection className="mt-12" delay={0.15}>
          <div className="rounded-2xl border border-[#2a2d2f] bg-[#161819] overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-[#2a2d2f]">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]/60" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]/60" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]/60" />
              </div>
              <span className="text-[12px] text-[#8a8f93] ml-2">src/search.tsx</span>
            </div>
            <pre
              className="p-5 text-[13px] leading-[1.7] overflow-x-auto"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              <code>
                <span className="text-[#c678dd]">import</span>
                <span className="text-[#8a8f93]">{" { "}</span>
                <span className="text-[#e5c07b]">List</span>
                <span className="text-[#8a8f93]">{", "}</span>
                <span className="text-[#e5c07b]">ActionPanel</span>
                <span className="text-[#8a8f93]">{", "}</span>
                <span className="text-[#e5c07b]">Action</span>
                <span className="text-[#8a8f93]">{" } "}</span>
                <span className="text-[#c678dd]">from</span>
                <span className="text-[#98c379]"> &quot;@raycast/api&quot;</span>
                <span className="text-[#8a8f93]">;</span>
                {"\n\n"}
                <span className="text-[#c678dd]">export default function</span>
                <span className="text-[#61afef]"> SearchRepos</span>
                <span className="text-[#8a8f93]">() {"{"}</span>
                {"\n"}
                <span className="text-[#8a8f93]">{"  "}</span>
                <span className="text-[#c678dd]">const</span>
                <span className="text-[#8a8f93]"> [</span>
                <span className="text-[#e06c75]">repos</span>
                <span className="text-[#8a8f93]">, </span>
                <span className="text-[#e06c75]">setRepos</span>
                <span className="text-[#8a8f93]">] = </span>
                <span className="text-[#61afef]">useState</span>
                <span className="text-[#8a8f93]">([]);</span>
                {"\n\n"}
                <span className="text-[#8a8f93]">{"  "}</span>
                <span className="text-[#c678dd]">return</span>
                <span className="text-[#8a8f93]"> (</span>
                {"\n"}
                <span className="text-[#8a8f93]">{"    "}&lt;</span>
                <span className="text-[#e5c07b]">List</span>
                <span className="text-[#d19a66]"> searchBarPlaceholder</span>
                <span className="text-[#8a8f93]">=</span>
                <span className="text-[#98c379]">&quot;Search repositories...&quot;</span>
                <span className="text-[#8a8f93]">&gt;</span>
                {"\n"}
                <span className="text-[#8a8f93]">{"      {"}</span>
                <span className="text-[#e06c75]">repos</span>
                <span className="text-[#8a8f93]">.map(</span>
                <span className="text-[#e06c75]">repo</span>
                <span className="text-[#c678dd]"> =&gt; </span>
                <span className="text-[#8a8f93]">(</span>
                {"\n"}
                <span className="text-[#8a8f93]">{"        "}&lt;</span>
                <span className="text-[#e5c07b]">List.Item</span>
                {"\n"}
                <span className="text-[#8a8f93]">{"          "}</span>
                <span className="text-[#d19a66]">key</span>
                <span className="text-[#8a8f93]">={"{"}</span>
                <span className="text-[#e06c75]">repo.id</span>
                <span className="text-[#8a8f93]">{"}"}</span>
                {"\n"}
                <span className="text-[#8a8f93]">{"          "}</span>
                <span className="text-[#d19a66]">title</span>
                <span className="text-[#8a8f93]">={"{"}</span>
                <span className="text-[#e06c75]">repo.name</span>
                <span className="text-[#8a8f93]">{"}"}</span>
                {"\n"}
                <span className="text-[#8a8f93]">{"          "}</span>
                <span className="text-[#d19a66]">subtitle</span>
                <span className="text-[#8a8f93]">={"{"}</span>
                <span className="text-[#e06c75]">repo.description</span>
                <span className="text-[#8a8f93]">{"}"}</span>
                {"\n"}
                <span className="text-[#8a8f93]">{"        "}/&gt;</span>
                {"\n"}
                <span className="text-[#8a8f93]">{"      "})){"}"}</span>
                {"\n"}
                <span className="text-[#8a8f93]">{"    "}&lt;/</span>
                <span className="text-[#e5c07b]">List</span>
                <span className="text-[#8a8f93]">&gt;</span>
                {"\n"}
                <span className="text-[#8a8f93]">{"  "});</span>
                {"\n"}
                <span className="text-[#8a8f93]">{"}"}</span>
              </code>
            </pre>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
