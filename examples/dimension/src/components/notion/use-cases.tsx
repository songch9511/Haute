"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ICONS: Record<string, React.ReactNode> = {
  lightbulb: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0075de" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2Z" />
    </svg>
  ),
  mic: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0075de" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  ),
  "file-text": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0075de" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  ),
  "message-square": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0075de" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
    </svg>
  ),
  "git-branch": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0075de" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  ),
  clipboard: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0075de" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  ),
  calendar: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0075de" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  mail: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0075de" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="22 7 12 13 2 7" />
    </svg>
  ),
};

interface UseCase {
  icon: string;
  input: string;
  output: string;
  description: string;
  variant?: "accent-border" | "tinted-bg";
}

const USE_CASES: UseCase[] = [
  {
    icon: "lightbulb",
    input: "Brainstorm",
    output: "Roadmap",
    description:
      "Turn loose ideas into a prioritized product roadmap with milestones.",
    variant: "accent-border",
  },
  {
    icon: "mic",
    input: "Meeting",
    output: "Action items",
    description:
      "Extract tasks, owners, and deadlines from meeting transcripts.",
  },
  {
    icon: "file-text",
    input: "Raw data",
    output: "Weekly report",
    description:
      "Summarize metrics and highlights into a stakeholder-ready brief.",
    variant: "tinted-bg",
  },
  {
    icon: "message-square",
    input: "Slack threads",
    output: "Knowledge base",
    description:
      "Distill scattered discussions into structured wiki pages.",
  },
  {
    icon: "git-branch",
    input: "PRs & commits",
    output: "Changelog",
    description:
      "Generate user-facing release notes from engineering activity.",
    variant: "accent-border",
  },
  {
    icon: "clipboard",
    input: "Research notes",
    output: "Brief",
    description:
      "Synthesize interview notes into a clear research findings doc.",
  },
  {
    icon: "calendar",
    input: "Calendar",
    output: "Standup prep",
    description:
      "Pull relevant updates from your schedule and recent work.",
    variant: "tinted-bg",
  },
  {
    icon: "mail",
    input: "Email threads",
    output: "Project updates",
    description:
      "Consolidate client correspondence into team-visible status updates.",
  },
];

function UseCaseCard({
  useCase,
  index,
  inView,
}: {
  useCase: UseCase;
  index: number;
  inView: boolean;
}) {
  const hasBorder = useCase.variant === "accent-border";
  const hasTintedBg = useCase.variant === "tinted-bg";

  return (
    <motion.div
      className="rounded-xl p-5 transition-shadow duration-200"
      style={{
        backgroundColor: hasTintedBg ? "#f9f9f8" : "#ffffff",
        border: "1px solid rgba(0,0,0,0.1)",
        borderLeft: hasBorder ? "3px solid #0075de" : "1px solid rgba(0,0,0,0.1)",
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{
        duration: 0.45,
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        boxShadow:
          "0px 4px 18px rgba(0,0,0,0.04), 0px 2px 7.8px rgba(0,0,0,0.027), 0px 0.8px 2.9px rgba(0,0,0,0.02), 0px 0.2px 1px rgba(0,0,0,0.013)",
      }}
    >
      <div>{ICONS[useCase.icon]}</div>

      <div className="mt-3 flex items-center gap-2">
        <span
          className="text-xs"
          style={{
            color: "rgba(0,0,0,0.54)",
            fontFamily: "var(--font-outfit)",
          }}
        >
          {useCase.input}
        </span>
        <span className="text-xs" style={{ color: "rgba(0,0,0,0.34)" }}>
          →
        </span>
      </div>

      <span
        className="mt-1 block text-sm font-medium"
        style={{ color: "rgba(0,0,0,0.95)" }}
      >
        {useCase.output}
      </span>

      <p className="mt-2 text-xs" style={{ color: "#615d59" }}>
        {useCase.description}
      </p>
    </motion.div>
  );
}

export default function UseCases() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-32 lg:py-40">
      <div className="mx-auto max-w-[1252px] px-4 lg:px-6">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2
            className="text-3xl md:text-[2.625rem] font-bold tracking-[-0.03em]"
            style={{ color: "rgba(0,0,0,0.95)" }}
          >
            From idea to impact
          </h2>
          <p
            className="mx-auto mt-4 max-w-[600px] text-lg"
            style={{ color: "rgba(0,0,0,0.54)" }}
          >
            See how teams use Gather AI to turn everyday inputs into structured
            outputs.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div
          ref={ref}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {USE_CASES.map((uc, i) => (
            <UseCaseCard key={uc.icon} useCase={uc} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
