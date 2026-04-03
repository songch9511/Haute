"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface CardData {
  eyebrow: string;
  badge: { label: string; bg: string; text: string } | null;
  title: string;
  body: string;
  color: string;
  mockup: React.ReactNode;
}

/* ── Mockups ─────────────────────────────────────────────── */

function AgentChatMockup() {
  return (
    <div className="flex flex-col gap-2.5">
      <div
        className="rounded-lg px-3 py-2 text-xs self-end max-w-[80%]"
        style={{
          backgroundColor: "rgba(39,145,141,0.08)",
          color: "rgba(0,0,0,0.7)",
          border: "1px solid rgba(39,145,141,0.15)",
        }}
      >
        Summarize this week&apos;s engineering updates
      </div>
      <div className="flex items-start gap-2">
        <div
          className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center"
          style={{ backgroundColor: "#27918d" }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M5 1v8M1 5h8"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div
          className="rounded-lg px-3 py-2 text-xs flex-1"
          style={{
            backgroundColor: "#ffffff",
            color: "rgba(0,0,0,0.65)",
            border: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <span className="font-medium" style={{ color: "rgba(0,0,0,0.85)" }}>
            3 PRs merged
          </span>
          , auth flow redesign shipped, and the search index migration is 80%
          complete.
        </div>
      </div>
      <div className="flex items-start gap-2">
        <div className="w-6 h-6 flex-shrink-0" />
        <div
          className="rounded-lg px-3 py-2 text-xs flex-1"
          style={{
            backgroundColor: "#ffffff",
            color: "rgba(0,0,0,0.65)",
            border: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <span style={{ color: "#27918d", fontWeight: 500 }}>
            2 blockers
          </span>{" "}
          flagged for review in the deploy pipeline.
        </div>
      </div>
    </div>
  );
}

function SearchMockup() {
  return (
    <div className="flex flex-col gap-2.5">
      <div
        className="flex items-center gap-2 rounded-lg px-3 py-2"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid rgba(0,0,0,0.12)",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle
            cx="6"
            cy="6"
            r="4"
            stroke="rgba(0,0,0,0.35)"
            strokeWidth="1.2"
          />
          <path
            d="M9 9l3 3"
            stroke="rgba(0,0,0,0.35)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-xs" style={{ color: "rgba(0,0,0,0.7)" }}>
          deployment rollback procedure
        </span>
      </div>
      {[
        { title: "Incident Response Playbook", match: "98% match" },
        { title: "Deploy Pipeline Docs", match: "91% match" },
        { title: "SRE Runbooks — Rollback", match: "87% match" },
      ].map((item) => (
        <div
          key={item.title}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2"
          style={{ backgroundColor: "rgba(0,0,0,0.02)" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect
              x="1.5"
              y="1.5"
              width="9"
              height="9"
              rx="1.5"
              stroke="rgba(0,0,0,0.2)"
              strokeWidth="0.8"
            />
            <path
              d="M4 4h4M4 6h3"
              stroke="rgba(0,0,0,0.18)"
              strokeWidth="0.7"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-xs flex-1" style={{ color: "rgba(0,0,0,0.7)" }}>
            {item.title}
          </span>
          <span
            className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
            style={{
              backgroundColor: "rgba(246,73,50,0.08)",
              color: "#f64932",
            }}
          >
            {item.match}
          </span>
        </div>
      ))}
    </div>
  );
}

function MeetingMockup() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 mb-1">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: "#097fe8" }}
        />
        <span
          className="text-xs font-medium"
          style={{ color: "rgba(0,0,0,0.85)" }}
        >
          Design Sync — Apr 2
        </span>
        <span className="text-[10px] ml-auto" style={{ color: "rgba(0,0,0,0.4)" }}>
          42 min
        </span>
      </div>
      <div
        className="flex flex-col gap-1.5 rounded-lg p-2.5"
        style={{ backgroundColor: "rgba(0,0,0,0.02)" }}
      >
        <span
          className="text-[10px] font-medium uppercase"
          style={{
            color: "#097fe8",
            letterSpacing: "0.05em",
          }}
        >
          Action Items
        </span>
        {[
          { text: "Finalize onboarding illustrations", owner: "Sara" },
          { text: "Ship settings redesign to staging", owner: "Jae" },
          { text: "Review pricing page copy", owner: "Lin" },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-2">
            <div
              className="w-3.5 h-3.5 rounded flex-shrink-0 flex items-center justify-center"
              style={{ border: "1.2px solid rgba(9,127,232,0.4)" }}
            >
              <div
                className="w-1.5 h-1.5 rounded-sm"
                style={{ backgroundColor: "rgba(9,127,232,0.3)" }}
              />
            </div>
            <span className="text-[11px] flex-1" style={{ color: "rgba(0,0,0,0.65)" }}>
              {item.text}
            </span>
            <span
              className="text-[10px] px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: "rgba(9,127,232,0.07)",
                color: "#097fe8",
              }}
            >
              {item.owner}
            </span>
          </div>
        ))}
      </div>
      <div
        className="flex flex-col gap-1 rounded-lg p-2.5"
        style={{ backgroundColor: "rgba(0,0,0,0.02)" }}
      >
        <span
          className="text-[10px] font-medium uppercase"
          style={{ color: "rgba(0,0,0,0.4)", letterSpacing: "0.05em" }}
        >
          Decisions
        </span>
        <span className="text-[11px]" style={{ color: "rgba(0,0,0,0.6)" }}>
          Launch new nav by end of sprint 12
        </span>
      </div>
    </div>
  );
}

function KanbanMockup() {
  const columns = [
    {
      title: "To Do",
      items: ["API rate limiting", "Error page refresh"],
    },
    {
      title: "In Progress",
      items: ["Dashboard filters"],
    },
    {
      title: "Done",
      items: ["Auth flow v2", "Export CSV"],
    },
  ];

  return (
    <div className="flex gap-2 overflow-hidden">
      {columns.map((col) => (
        <div key={col.title} className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "#ffb110" }}
            />
            <span
              className="text-[10px] font-medium truncate"
              style={{ color: "#191918" }}
            >
              {col.title}
            </span>
            <span
              className="text-[10px] ml-auto"
              style={{ color: "rgba(0,0,0,0.35)" }}
            >
              {col.items.length}
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            {col.items.map((item) => (
              <div
                key={item}
                className="rounded-md px-2 py-1.5 text-[10px]"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid rgba(0,0,0,0.08)",
                  color: "#191918",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Card data ───────────────────────────────────────────── */

const cards: CardData[] = [
  {
    eyebrow: "AI Agents",
    badge: {
      label: "New",
      bg: "rgba(39,145,141,0.1)",
      text: "#27918d",
    },
    title: "Build agents for any workflow",
    body: "Create custom AI agents that understand your team\u2019s context, processes, and preferences.",
    color: "#27918d",
    mockup: <AgentChatMockup />,
  },
  {
    eyebrow: "Search",
    badge: {
      label: "New",
      bg: "rgba(246,73,50,0.1)",
      text: "#f64932",
    },
    title: "Find anything, instantly",
    body: "Semantic search across every page, database, and comment \u2014 surfacing answers, not just links.",
    color: "#f64932",
    mockup: <SearchMockup />,
  },
  {
    eyebrow: "Meetings",
    badge: null,
    title: "Notes that write themselves",
    body: "Auto-capture action items, decisions, and follow-ups from every meeting. Synced to your projects.",
    color: "#097fe8",
    mockup: <MeetingMockup />,
  },
  {
    eyebrow: "Workflows",
    badge: {
      label: "Soon",
      bg: "rgba(255,177,16,0.1)",
      text: "#704b00",
    },
    title: "Projects that adapt to you",
    body: "Kanban, timeline, calendar, or table \u2014 switch views in one click. Track everything from sprints to launches.",
    color: "#ffb110",
    mockup: <KanbanMockup />,
  },
];

/* ── Card component ──────────────────────────────────────── */

function FeatureCard({
  card,
  index,
  inView,
}: {
  card: CardData;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      className="rounded-md md:rounded-xl flex flex-col"
      style={{
        border: "1px solid rgba(0,0,0,0.1)",
        boxShadow:
          "0px 4px 18px rgba(0,0,0,0.04), 0px 2px 7.8px rgba(0,0,0,0.027), 0px 0.8px 2.9px rgba(0,0,0,0.02), 0px 0.2px 1px rgba(0,0,0,0.013)",
        padding: "24px",
        minHeight: "380px",
        backgroundColor: "#ffffff",
      }}
      initial={{ opacity: 0, transform: "translateY(28px)" }}
      animate={
        inView ? { opacity: 1, transform: "translateY(0px)" } : {}
      }
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {/* Eyebrow + badge */}
      <div className="flex items-center gap-2">
        <span
          className="text-xs font-medium uppercase"
          style={{
            letterSpacing: "0.06em",
            color: "rgba(0,0,0,0.54)",
          }}
        >
          {card.eyebrow}
        </span>
        {card.badge && (
          <span
            className="text-xs font-medium rounded-full px-2 py-0.5"
            style={{
              backgroundColor: card.badge.bg,
              color: card.badge.text,
            }}
          >
            {card.badge.label}
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className="text-xl font-bold mt-2"
        style={{ color: "rgba(0,0,0,0.95)" }}
      >
        {card.title}
      </h3>

      {/* Body */}
      <p className="text-sm mt-2" style={{ color: "#615d59" }}>
        {card.body}
      </p>

      {/* Visual mockup area */}
      <div
        className="mt-6 flex-1 rounded-lg p-4"
        style={{
          backgroundColor: "#f9f9f8",
          border: "1px solid rgba(0,0,0,0.06)",
          minHeight: "160px",
        }}
      >
        {card.mockup}
      </div>
    </motion.div>
  );
}

/* ── Main component ──────────────────────────────────────── */

export default function BentoGrid() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-32 lg:py-40 px-4 lg:px-6"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <div className="mx-auto max-w-[1252px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {cards.map((card, i) => (
            <FeatureCard key={card.eyebrow} card={card} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
