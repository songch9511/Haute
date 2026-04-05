"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const tiers = [
  { name: "Solo", price: "$29", period: "/mo", cta: "Start Free", featured: false },
  { name: "Team", price: "$79", period: "/mo", cta: "Start Trial", featured: true },
  { name: "Scale", price: "$249", period: "/mo", cta: "Contact Sales", featured: false },
];

const featureRows = [
  { label: "Endpoints", values: ["Up to 50", "Up to 500", "Unlimited"] },
  { label: "Retention", values: ["7 days", "30 days", "90 days"] },
  { label: "Team members", values: ["1", "Up to 10", "Unlimited"] },
  { label: "Alert channels", values: ["Email", "Slack, PagerDuty", "Custom webhook"] },
  { label: "Trace sampling", values: ["10%", "50%", "100%"] },
  { label: "API Diff", values: [false, true, true] },
  { label: "SSO / SAML", values: [false, false, true] },
  { label: "SLA guarantee", values: [false, "99.9%", "99.99%"] },
  { label: "Dedicated support", values: [false, false, true] },
];

function CellValue({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 8.5L6.5 12L13 4" stroke="#00d9a5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (value === false) {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <line x1="4" y1="8" x2="12" y2="8" stroke="#4a4a4a" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return <span>{value}</span>;
}

export function MeridianPricing() {
  return (
    <section
      id="pricing"
      className="px-6 py-24 lg:px-16"
      style={{ backgroundColor: "#0d0d0d" }}
    >
      <div className="mx-auto max-w-5xl">
        <p
          className="mb-3 text-[11px] font-medium uppercase"
          style={{
            color: "#00d9a5",
            letterSpacing: "0.14em",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          Pricing
        </p>
        <h2
          className="mb-12 text-3xl font-semibold tracking-tight lg:text-4xl"
          style={{ fontFamily: "var(--font-geist-mono)", color: "#f5f5f5" }}
        >
          Pay for what you trace
        </h2>

        {/* Comparison table */}
        <div
          className="overflow-x-auto rounded-xl animate-[fadeUp_0.5s_cubic-bezier(0.22,1,0.36,1)_both]"
          style={{
            backgroundColor: "#0a0a0a",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <table
            className="w-full text-sm"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            {/* Header */}
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <th className="px-6 py-5 text-left" style={{ color: "#4a4a4a", width: "35%" }}>
                  Feature
                </th>
                {tiers.map((t) => (
                  <th key={t.name} className="px-6 py-5 text-center" style={{ width: "21.66%" }}>
                    <div className="flex flex-col items-center gap-1">
                      <span
                        className="text-xs font-medium uppercase"
                        style={{
                          color: t.featured ? "#00d9a5" : "#8a8a8a",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {t.name}
                      </span>
                      <span
                        className="text-2xl font-semibold"
                        style={{ color: "#f5f5f5" }}
                      >
                        {t.price}
                        <span className="text-sm font-normal" style={{ color: "#4a4a4a" }}>
                          {t.period}
                        </span>
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {featureRows.map((row) => (
                <tr
                  key={row.label}
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <td className="px-6 py-4 text-left" style={{ color: "#8a8a8a" }}>
                    {row.label}
                  </td>
                  {row.values.map((v, i) => (
                    <td
                      key={i}
                      className="px-6 py-4 text-center"
                      style={{
                        color: "#f5f5f5",
                        backgroundColor: tiers[i].featured
                          ? "rgba(0, 217, 165, 0.03)"
                          : "transparent",
                      }}
                    >
                      <div className="flex items-center justify-center">
                        <CellValue value={v} />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>

            {/* CTA row */}
            <tfoot>
              <tr>
                <td className="px-6 py-5" />
                {tiers.map((t) => (
                  <td key={t.name} className="px-6 py-5 text-center">
                    <motion.button
                      type="button"
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="rounded-md px-5 py-2.5 text-xs font-medium"
                      style={{
                        backgroundColor: t.featured ? "#00d9a5" : "transparent",
                        color: t.featured ? "#0a0a0a" : "#f5f5f5",
                        border: t.featured
                          ? "none"
                          : "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {t.cta}
                    </motion.button>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
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
