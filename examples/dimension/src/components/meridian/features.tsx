"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const features = [
  {
    title: "Trace Explorer",
    description:
      "Waterfall view of every span in a distributed trace. Filter by service, latency, or error status.",
    snippet: `spans.filter(s => s.duration > 50)
  .sortBy("start_time")`,
    span: "lg:col-span-7",
  },
  {
    title: "Alert Rules",
    description:
      "Define thresholds on p99 latency, error rate, or throughput. Route to Slack, PagerDuty, or webhook.",
    snippet: `rule: p99_latency > 200ms
  → notify: #api-alerts`,
    span: "lg:col-span-5",
  },
  {
    title: "Team Dashboard",
    description:
      "Per-team views with endpoint ownership, SLA tracking, and weekly regression reports.",
    snippet: `team: payments
  sla: 99.95%
  endpoints: 34`,
    span: "lg:col-span-5",
  },
  {
    title: "API Diff",
    description:
      "Compare response shapes across deploys. Catch breaking changes before they reach production.",
    snippet: `diff v2.3.1 → v2.4.0
  + field: "metadata.tags"
  ~ type: "status" int→str`,
    span: "lg:col-span-7",
  },
];

export function MeridianFeatures() {
  return (
    <section
      id="features"
      className="px-6 py-20 lg:px-16"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div className="mx-auto max-w-6xl">
        <p
          className="mb-3 text-[11px] font-medium uppercase"
          style={{
            color: "#00d9a5",
            letterSpacing: "0.14em",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          Capabilities
        </p>
        <h2
          className="mb-12 text-3xl font-semibold tracking-tight lg:text-4xl"
          style={{ fontFamily: "var(--font-geist-mono)", color: "#f5f5f5" }}
        >
          Built for API-first teams
        </h2>

        {/* Bento: row 1 = 7+5, row 2 = 5+7 */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`${f.span} rounded-xl p-6 lg:p-8 animate-[fadeUp_0.45s_cubic-bezier(0.22,1,0.36,1)_both]`}
              style={{
                backgroundColor: "#0d0d0d",
                border: "1px solid rgba(255,255,255,0.06)",
                animationDelay: `${i * 0.08}s`,
              }}
            >
              <h3
                className="mb-2 text-lg font-medium"
                style={{
                  color: "#f5f5f5",
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                {f.title}
              </h3>
              <p
                className="mb-5 text-sm leading-relaxed"
                style={{ color: "#8a8a8a" }}
              >
                {f.description}
              </p>

              {/* Code snippet */}
              <pre
                className="overflow-x-auto rounded-lg px-4 py-3 text-[12px] leading-relaxed"
                style={{
                  backgroundColor: "#050505",
                  border: "1px solid rgba(255,255,255,0.04)",
                  fontFamily: "var(--font-geist-mono)",
                  color: "#00d9a5",
                }}
              >
                {f.snippet}
              </pre>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
