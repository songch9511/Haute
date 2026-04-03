"use client";

import {
  AnimatedSection,
  StaggerGroup,
  StaggerItem,
  motion,
} from "@/components/motion";

const features = [
  {
    title: "Component tracking",
    desc: "Every design component gets a lifecycle. See who\u2019s working on what, where it\u2019s blocked, and when it shipped.",
    wide: true,
    visual: true,
  },
  {
    title: "Figma sync",
    desc: "Bi-directional sync with Figma. Changes in your file appear in Clearpath within seconds.",
    wide: false,
    visual: false,
  },
  {
    title: "Review automation",
    desc: "Auto-assign reviewers based on component ownership. Reviews close 3.2x faster on average.",
    wide: false,
    visual: false,
  },
  {
    title: "Handoff spec",
    desc: "Generated specs include spacing, tokens, and responsive breakpoints. Engineers stop asking questions.",
    wide: false,
    visual: false,
  },
  {
    title: "Design system audit",
    desc: "Continuous monitoring of your design system. Clearpath flags inconsistencies, unused tokens, and drift between Figma and code.",
    wide: true,
    visual: false,
  },
];

const barData = [30, 55, 80, 45, 95, 60, 40];

export function Features() {
  return (
    <section className="py-24 px-8 max-w-[1280px] mx-auto" id="features">
      <AnimatedSection className="max-w-[480px] mb-16">
        <h2 className="text-[2.5rem] font-normal leading-[1.15] tracking-tight mb-4">
          One pipeline for
          <br />
          design delivery
        </h2>
        <p className="text-base text-[var(--text-secondary)] leading-relaxed">
          Stop juggling Figma, Slack threads, and Jira tickets. Clearpath tracks
          every component from concept to production.
        </p>
      </AnimatedSection>

      <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((f) => (
          <StaggerItem
            key={f.title}
            className={f.wide ? "md:col-span-2" : ""}
          >
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-8 h-full"
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--bg-surface)] flex items-center justify-center mb-6">
                <svg
                  className="w-5 h-5 text-[var(--accent)]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3v18" />
                  <path d="M3 12h18" />
                </svg>
              </div>
              <h3 className="text-xl font-normal leading-[1.15] tracking-tight mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {f.desc}
              </p>
              {f.visual && (
                <div className="mt-6 h-[120px] bg-[var(--bg-surface)] rounded-lg flex items-end gap-1.5 px-6 pb-4 overflow-hidden">
                  {barData.map((h, i) => (
                    <motion.div
                      key={i}
                      className={`w-6 rounded-t bg-[var(--accent)] ${h > 70 ? "opacity-90" : "opacity-40"}`}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
