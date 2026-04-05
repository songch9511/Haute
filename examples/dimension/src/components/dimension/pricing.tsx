"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

const tiers = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    description: "For individuals exploring Dimension's core workflow.",
    features: [
      "5 conversions per month",
      "Basic STEP export",
      "Community support",
      "Single project workspace",
    ],
    cta: "Start Free",
    recommended: false,
  },
  {
    name: "Pro",
    price: "$47",
    period: "/mo",
    description: "For teams shipping production CAD at scale.",
    features: [
      "Unlimited conversions",
      "All export formats (STEP, GLB, STL, DXF)",
      "Priority support & 4hr SLA",
      "Team workspaces & permissions",
      "API access (10k calls/mo)",
      "Version history & branching",
    ],
    cta: "Start 14-Day Trial",
    recommended: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations with dedicated infrastructure needs.",
    features: [
      "Dedicated compute cluster",
      "99.99% uptime SLA",
      "Custom integrations & SSO",
      "White-glove onboarding",
      "Dedicated account manager",
    ],
    cta: "Talk to Sales",
    recommended: false,
  },
];

export function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" className="py-24 bg-bg-primary">
      <div className="mx-auto max-w-[1180px] px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="mb-16"
        >
          <p className="text-[13px] font-mono text-accent-text tracking-[0.08em] uppercase mb-3">Pricing</p>
          <h2 className="font-heading text-[1.75rem] md:text-[2.5rem] font-bold tracking-[-0.03em] leading-[1.1] mb-4 max-w-[480px]">
            Simple plans,<br />no conversion limits on Pro.
          </h2>
          <p className="text-[16px] text-text-secondary max-w-[420px] leading-[1.6]">
            Start free. Upgrade when your team needs unlimited power.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr_1fr] gap-5 items-start">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className={`relative rounded-[var(--radius-lg)] p-8 ${
                tier.recommended
                  ? "bg-accent-bg border-2 border-accent md:p-10 md:py-12"
                  : "bg-bg-elevated border border-border"
              }`}
            >
              {tier.recommended && (
                <span className="absolute -top-3 left-8 text-[11px] font-semibold tracking-[0.06em] uppercase bg-accent text-bg-primary px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <h3 className="text-[18px] font-semibold mb-1">{tier.name}</h3>
              <p className="text-[13px] text-text-muted mb-6 leading-[1.5]">{tier.description}</p>

              <div className="flex items-baseline gap-1 mb-8">
                <span
                  className={`font-heading font-bold tracking-[-0.03em] ${
                    tier.recommended ? "text-[44px]" : "text-[36px]"
                  }`}
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="text-[14px] text-text-muted">{tier.period}</span>
                )}
              </div>

              <a
                href="#waitlist"
                className={`block text-center text-[14px] font-medium py-3.5 rounded-[var(--radius)] mb-8 transition-colors duration-150 ${
                  tier.recommended
                    ? "bg-accent text-bg-primary hover:bg-accent-hover"
                    : "bg-bg-surface text-text-primary hover:bg-bg-surface/80"
                }`}
              >
                {tier.cta}
              </a>

              <ul className="space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className={`mt-0.5 shrink-0 ${tier.recommended ? "text-accent-text" : "text-text-muted"}`}
                    >
                      <path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    <span className="text-[14px] leading-[1.5] text-text-secondary">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
