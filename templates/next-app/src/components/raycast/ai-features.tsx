"use client";

import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/motion";

const features = [
  {
    tag: "Quick AI",
    title: "Ask anything, get answers instantly",
    description:
      "Highlight text anywhere and get instant summaries, translations, or explanations. Built into every context — no tab-switching needed.",
    mockup: {
      query: "Explain this error in simple terms",
      response:
        "The TypeError occurs because `user.profile` is undefined when the component mounts. The API call hasn't resolved yet. Wrap the access in optional chaining: `user?.profile?.name`",
    },
    accent: "#ff3563",
  },
  {
    tag: "AI Chat",
    title: "Your always-on thinking partner",
    description:
      "Full conversational AI with web search, code execution, and file context. Remembers your conversation history across sessions.",
    mockup: {
      query: "Draft a PR description for the auth refactor",
      response:
        "## Summary\nRefactors authentication flow from session-based to JWT tokens. Adds refresh token rotation with 7-day expiry. Migrates 3 endpoints.\n\n## Changes\n- `auth/login` → returns access + refresh tokens\n- `middleware/auth` → validates JWT instead of session lookup\n- Adds `POST /auth/refresh` endpoint",
    },
    accent: "#a78bfa",
  },
  {
    tag: "AI Commands",
    title: "Build custom workflows with AI",
    description:
      "Create reusable AI commands with custom prompts, model selection, and creativity settings. Chain them into multi-step automations.",
    mockup: {
      query: "/fix-grammar",
      response:
        'Original: "The datas was showing that users is not able to login"\nFixed: "The data showed that users were unable to log in"\n\n3 corrections applied: subject-verb agreement, tense consistency, phrasal simplification.',
    },
    accent: "#f59e0b",
  },
];

export function RaycastAIFeatures() {
  return (
    <section className="py-24 md:py-32 px-5">
      <div className="max-w-[1280px] mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="text-[13px] font-medium text-[#a78bfa] tracking-[0.08em] uppercase mb-3">
            Raycast AI
          </p>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold leading-[1.1] tracking-[-0.03em] text-[#f0f0f0] max-w-[700px] mx-auto">
            AI that lives where you work
          </h2>
          <p className="mt-4 text-[16px] sm:text-[18px] leading-[1.6] text-[#8a8f93] max-w-[520px] mx-auto">
            Not another chat window. Raycast AI is built into the command bar —
            available in any context, on any screen.
          </p>
        </AnimatedSection>

        <StaggerGroup className="space-y-6">
          {features.map((feature, i) => (
            <StaggerItem key={feature.tag}>
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center p-6 md:p-10 rounded-2xl border border-[#2a2d2f] bg-[#161819] ${
                  i % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
                style={i % 2 === 1 ? { direction: "rtl" } : undefined}
              >
                {/* Text content */}
                <div style={i % 2 === 1 ? { direction: "ltr" } : undefined}>
                  <span
                    className="inline-block text-[12px] font-semibold tracking-[0.06em] uppercase px-2.5 py-1 rounded-md mb-4"
                    style={{
                      color: feature.accent,
                      backgroundColor: `${feature.accent}15`,
                    }}
                  >
                    {feature.tag}
                  </span>
                  <h3 className="text-[24px] sm:text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-[#f0f0f0]">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-[#8a8f93] max-w-[440px]">
                    {feature.description}
                  </p>
                </div>

                {/* Chat mockup */}
                <div
                  className="rounded-xl border border-[#2a2d2f] bg-[#0e1011] overflow-hidden"
                  style={i % 2 === 1 ? { direction: "ltr" } : undefined}
                >
                  {/* User message */}
                  <div className="px-5 pt-5 pb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#1e2022] flex items-center justify-center text-[12px] text-[#8a8f93] font-medium shrink-0">
                        Y
                      </div>
                      <div className="text-[13.5px] text-[#f0f0f0] leading-[1.5] pt-0.5">
                        {feature.mockup.query}
                      </div>
                    </div>
                  </div>
                  {/* AI response */}
                  <div className="px-5 pb-5 pt-2">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: `linear-gradient(135deg, ${feature.accent}, ${feature.accent}88)` }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                      </div>
                      <div
                        className="text-[13px] text-[#8a8f93] leading-[1.65] whitespace-pre-line font-mono pt-0.5"
                        style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                      >
                        {feature.mockup.response}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
