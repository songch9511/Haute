"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const tabs = [
  {
    label: "AI Agent",
    eyebrow: "AI-Powered",
    headline: "Your AI teammate",
    description:
      "Gather Agent understands your entire workspace — drafting docs, answering questions, and connecting ideas across thousands of pages.",
  },
  {
    label: "Smart Docs",
    eyebrow: "Documents",
    headline: "Documents that work",
    description:
      "Rich editing with databases, embeds, and real-time collaboration built in. Turn any doc into a workflow.",
  },
  {
    label: "Team Wikis",
    eyebrow: "Knowledge Base",
    headline: "Knowledge that stays current",
    description:
      "Verified pages, auto-updating references, and AI-powered search so your team wiki never goes stale.",
  },
  {
    label: "Automations",
    eyebrow: "Workflows",
    headline: "Work on autopilot",
    description:
      "Set triggers and actions across your workspace. From standup summaries to project updates — automate the repetitive.",
  },
];

function AgentMockup() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div
          className="w-7 h-7 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,117,222,0.1)" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1v12M1 7h12"
              stroke="#0075de"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div
          className="rounded-lg px-3.5 py-2.5 text-sm flex-1"
          style={{
            backgroundColor: "rgba(0,117,222,0.06)",
            color: "rgba(0,0,0,0.8)",
            border: "1px solid rgba(0,117,222,0.12)",
          }}
        >
          Draft a project brief for the Q3 launch based on our planning docs
        </div>
      </div>
      <div className="flex items-start gap-3">
        <div
          className="w-7 h-7 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center"
          style={{ backgroundColor: "#0075de" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 2v3.5L8.5 7"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="6" cy="6" r="4.5" stroke="#ffffff" strokeWidth="1.2" />
          </svg>
        </div>
        <div
          className="rounded-lg px-3.5 py-2.5 text-sm flex-1"
          style={{
            backgroundColor: "#ffffff",
            color: "rgba(0,0,0,0.7)",
            border: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <p style={{ color: "rgba(0,0,0,0.9)", fontWeight: 500 }}>
            Gather Agent
          </p>
          <p className="mt-1.5">
            I found 8 relevant pages. Here&apos;s a draft brief with key
            milestones, owners, and success metrics pulled from your planning
            workspace.
          </p>
          <div
            className="mt-2 flex items-center gap-2 text-xs"
            style={{ color: "#0075de" }}
          >
            <span>View draft</span>
            <span style={{ color: "rgba(0,0,0,0.2)" }}>|</span>
            <span>3 sources cited</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocsMockup() {
  return (
    <div className="flex flex-col gap-2.5">
      <div
        className="flex items-center gap-2 pb-2.5"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
      >
        <div
          className="w-5 h-5 rounded"
          style={{ backgroundColor: "rgba(0,117,222,0.12)" }}
        />
        <span
          className="text-sm font-medium"
          style={{ color: "rgba(0,0,0,0.9)" }}
        >
          Sprint Planning — Week 14
        </span>
        <div className="ml-auto flex -space-x-1.5">
          <div
            className="w-5 h-5 rounded-full"
            style={{ backgroundColor: "#27918d", border: "2px solid #f9f9f8" }}
          />
          <div
            className="w-5 h-5 rounded-full"
            style={{ backgroundColor: "#097fe8", border: "2px solid #f9f9f8" }}
          />
          <div
            className="w-5 h-5 rounded-full"
            style={{ backgroundColor: "#f64932", border: "2px solid #f9f9f8" }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <div
          className="h-3 rounded-sm"
          style={{ backgroundColor: "rgba(0,0,0,0.08)", width: "85%" }}
        />
        <div
          className="h-3 rounded-sm"
          style={{ backgroundColor: "rgba(0,0,0,0.08)", width: "60%" }}
        />
        <div
          className="h-3 rounded-sm"
          style={{ backgroundColor: "rgba(0,0,0,0.05)", width: "72%" }}
        />
      </div>
      <div
        className="mt-1 rounded-lg p-3 text-xs"
        style={{
          backgroundColor: "rgba(0,117,222,0.05)",
          border: "1px solid rgba(0,117,222,0.1)",
          color: "rgba(0,0,0,0.6)",
        }}
      >
        <div className="flex items-center gap-1.5 mb-1.5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect
              x="1"
              y="2"
              width="10"
              height="8"
              rx="1.5"
              stroke="#0075de"
              strokeWidth="1"
            />
            <path d="M1 5h10" stroke="#0075de" strokeWidth="1" />
          </svg>
          <span style={{ color: "#0075de", fontWeight: 500 }}>
            Linked Database
          </span>
        </div>
        3 tasks assigned, 1 completed
      </div>
      <div className="flex flex-col gap-1">
        <div
          className="h-3 rounded-sm"
          style={{ backgroundColor: "rgba(0,0,0,0.06)", width: "90%" }}
        />
        <div
          className="h-3 rounded-sm"
          style={{ backgroundColor: "rgba(0,0,0,0.06)", width: "45%" }}
        />
      </div>
    </div>
  );
}

function WikiMockup() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 mb-1">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 2h10a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z"
            stroke="rgba(0,0,0,0.4)"
            strokeWidth="1.2"
          />
          <path d="M5 5h6M5 8h4M5 11h5" stroke="rgba(0,0,0,0.3)" strokeWidth="1" strokeLinecap="round" />
        </svg>
        <span className="text-sm font-medium" style={{ color: "rgba(0,0,0,0.9)" }}>
          Engineering Wiki
        </span>
      </div>
      {[
        { title: "API Reference", verified: true },
        { title: "Deployment Guide", verified: true },
        { title: "Onboarding Checklist", verified: false },
      ].map((item) => (
        <div
          key={item.title}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2"
          style={{ backgroundColor: "rgba(0,0,0,0.03)" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect
              x="2"
              y="2"
              width="10"
              height="10"
              rx="2"
              stroke="rgba(0,0,0,0.25)"
              strokeWidth="1"
            />
            <path d="M5 5h4M5 7.5h3" stroke="rgba(0,0,0,0.2)" strokeWidth="0.8" strokeLinecap="round" />
          </svg>
          <span className="text-xs flex-1" style={{ color: "rgba(0,0,0,0.7)" }}>
            {item.title}
          </span>
          {item.verified && (
            <span
              className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
              style={{
                backgroundColor: "rgba(39,145,141,0.1)",
                color: "#27918d",
              }}
            >
              Verified
            </span>
          )}
        </div>
      ))}
      <div
        className="mt-1 flex items-center gap-1.5 text-xs px-1"
        style={{ color: "rgba(0,0,0,0.4)" }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1" />
          <path d="M6 3.5v3l2 1" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        </svg>
        Last updated 2 hours ago
      </div>
    </div>
  );
}

function AutomationMockup() {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg"
        style={{
          backgroundColor: "rgba(0,117,222,0.06)",
          color: "#0075de",
          border: "1px solid rgba(0,117,222,0.1)",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 1v4l2.5-1.5M7 5L4.5 3.5"
            stroke="#0075de"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 5v4"
            stroke="#0075de"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx="7" cy="11" r="1.5" stroke="#0075de" strokeWidth="1" />
        </svg>
        When: New meeting ends
      </div>
      <div className="flex items-center justify-center">
        <div
          className="w-px h-5"
          style={{ backgroundColor: "rgba(0,0,0,0.12)" }}
        />
      </div>
      <div
        className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg"
        style={{
          backgroundColor: "rgba(0,0,0,0.03)",
          color: "rgba(0,0,0,0.7)",
          border: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="2" y="3" width="10" height="8" rx="1.5" stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
          <path d="M5 6h4M5 8.5h3" stroke="rgba(0,0,0,0.25)" strokeWidth="0.8" strokeLinecap="round" />
        </svg>
        Then: Create summary in meeting notes
      </div>
      <div className="flex items-center justify-center">
        <div
          className="w-px h-5"
          style={{ backgroundColor: "rgba(0,0,0,0.12)" }}
        />
      </div>
      <div
        className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg"
        style={{
          backgroundColor: "rgba(0,0,0,0.03)",
          color: "rgba(0,0,0,0.7)",
          border: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2.5 7.5l3 3 6-6"
            stroke="rgba(0,0,0,0.35)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Then: Assign action items to owners
      </div>
      <div
        className="flex items-center gap-1.5 text-[10px] mt-1 px-1"
        style={{ color: "rgba(0,0,0,0.4)" }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: "#27918d" }}
        />
        Active — ran 14 times this week
      </div>
    </div>
  );
}

const mockups = [AgentMockup, DocsMockup, WikiMockup, AutomationMockup];

export default function Carousel() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const Mockup = mockups[active];

  return (
    <section
      ref={ref}
      className="py-32 lg:py-40 px-4 lg:px-6"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <div className="mx-auto max-w-[1252px]">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, transform: "translateY(20px)" }}
          animate={inView ? { opacity: 1, transform: "translateY(0px)" } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2
            className="text-3xl md:text-[2.625rem] font-bold"
            style={{
              color: "rgba(0,0,0,0.95)",
              letterSpacing: "-0.03em",
            }}
          >
            Built for modern teams
          </h2>
          <p
            className="text-lg mt-4 mx-auto max-w-[600px]"
            style={{ color: "rgba(0,0,0,0.54)" }}
          >
            Gather 3.0 brings AI-native workflows to every part of your
            workspace.
          </p>
        </motion.div>

        {/* Tab bar */}
        <motion.div
          className="mt-12 overflow-x-auto"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div
            className="flex min-w-max md:min-w-0 md:justify-center"
            style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}
          >
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActive(i)}
                className="relative px-5 py-3 text-sm transition-colors duration-200"
                style={{
                  color:
                    active === i ? "rgba(0,0,0,0.95)" : "rgba(0,0,0,0.54)",
                  fontWeight: active === i ? 500 : 400,
                  minWidth: "44px",
                  minHeight: "44px",
                }}
                onMouseEnter={(e) => {
                  if (active !== i)
                    e.currentTarget.style.color = "rgba(0,0,0,0.7)";
                }}
                onMouseLeave={(e) => {
                  if (active !== i)
                    e.currentTarget.style.color = "rgba(0,0,0,0.54)";
                }}
              >
                {tab.label}
                {active === i && (
                  <motion.div
                    layoutId="carousel-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ backgroundColor: "#0075de" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content panel */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, transform: "translateY(12px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              exit={{ opacity: 0, transform: "translateY(-8px)" }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="grid md:grid-cols-2 gap-10 items-center">
                {/* Left: text */}
                <div>
                  <span
                    className="text-sm font-medium uppercase"
                    style={{
                      fontFamily: "var(--font-outfit)",
                      letterSpacing: "0.06em",
                      color: "#0075de",
                    }}
                  >
                    {tabs[active].eyebrow}
                  </span>
                  <h3
                    className="text-2xl font-bold mt-3"
                    style={{ color: "rgba(0,0,0,0.95)" }}
                  >
                    {tabs[active].headline}
                  </h3>
                  <p
                    className="mt-3 leading-relaxed"
                    style={{ color: "rgba(0,0,0,0.6)" }}
                  >
                    {tabs[active].description}
                  </p>
                  <a
                    href="#"
                    className="inline-block mt-4 text-sm font-medium transition-all duration-200"
                    style={{
                      color: "#0075de",
                      minHeight: "44px",
                      lineHeight: "44px",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.textDecoration = "underline")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.textDecoration = "none")
                    }
                  >
                    Learn more&nbsp;&rarr;
                  </a>
                </div>

                {/* Right: mockup */}
                <div
                  className="rounded-xl"
                  style={{
                    backgroundColor: "#f9f9f8",
                    border: "1px solid rgba(0,0,0,0.1)",
                    aspectRatio: "4/3",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Mockup />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
