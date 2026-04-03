"use client";

import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/motion";

const communityLinks = [
  {
    platform: "Slack",
    members: "32,841",
    description: "Join the community Slack to chat with other Raycast users, get help, and share your extensions.",
    cta: "Join Slack",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#e01e5a">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
      </svg>
    ),
    color: "#ff4478",
  },
  {
    platform: "X (Twitter)",
    members: "83,219",
    description: "Follow for product updates, tips from power users, and a peek behind the scenes at what we're building.",
    cta: "Follow @rayaborern",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#f0f0f0">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: "#f0f0f0",
  },
  {
    platform: "GitHub",
    members: "27,413",
    description: "Contribute to the extension ecosystem. Browse open-source extensions and submit your own.",
    cta: "Star on GitHub",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#f0f0f0">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    color: "#8a8f93",
  },
];

export function RaycastCommunity() {
  return (
    <section className="py-24 md:py-32 px-5">
      <div className="max-w-[1280px] mx-auto">
        <AnimatedSection className="text-center mb-14">
          <p className="text-[13px] font-medium text-[#f59e0b] tracking-[0.08em] uppercase mb-3">
            Community
          </p>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold leading-[1.1] tracking-[-0.03em] text-[#f0f0f0]">
            Built with the community
          </h2>
          <p className="mt-4 text-[16px] sm:text-[18px] leading-[1.6] text-[#8a8f93] max-w-[500px] mx-auto">
            Thousands of developers and creators building, sharing,
            and improving Raycast every day.
          </p>
        </AnimatedSection>

        {/* Varied grid: first card spans 2 cols (horizontal layout), remaining 2 are 1 col each */}
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {communityLinks.map((c, i) => (
            <StaggerItem key={c.platform} className={i === 0 ? "md:col-span-2" : ""}>
              <div className={`h-full rounded-2xl border border-[#2a2d2f] bg-[#161819] p-6 hover:border-[#3a3d3f] transition-colors duration-200 ${
                i === 0 ? "flex flex-col md:flex-row md:items-start gap-6" : "flex flex-col"
              }`}>
                <div className={i === 0 ? "shrink-0" : ""}>
                  <div className="mb-4">{c.icon}</div>
                  <h3 className="text-[18px] font-semibold leading-[1.2] text-[#f0f0f0] mb-1">
                    {c.platform}
                  </h3>
                  <p className="text-[13px] text-[#8a8f93] font-mono tabular-nums mb-3">
                    {c.members} members
                  </p>
                </div>
                <div className="flex flex-col flex-1">
                <p className="text-[14px] leading-[1.55] text-[#8a8f93] flex-1 mb-5">
                  {c.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-[13.5px] font-medium transition-colors duration-150"
                  style={{ color: c.color }}
                >
                  {c.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
