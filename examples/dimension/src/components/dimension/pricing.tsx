"use client";

import { motion } from "framer-motion";

const plans = [
  {
    name: "D2C",
    subtitle: "Drawing → CAD",
    price: "$500",
    period: "/seat/mo",
    description: "2D drawings to 3D CAD models with AI geometry interpretation.",
    features: [
      "Unlimited 2D → 3D conversions",
      "Chat-based model editing",
      "Version history & snapshots",
      "STEP / GLB / STL export",
      "Standard reasoning credits included",
    ],
    cta: "Start Free Trial",
    elevated: false,
  },
  {
    name: "Bundle",
    subtitle: "D2C + C2D",
    price: "$833",
    period: "/seat/mo",
    description:
      "Full bidirectional pipeline. Convert drawings to models and models back to GD&T-annotated drawings.",
    features: [
      "Everything in D2C",
      "Everything in C2D",
      "Priority geometry processing",
      "Extended credit allowance",
      "Volume discount (10+ seats → 10% off)",
    ],
    cta: "Start Free Trial",
    elevated: true,
  },
  {
    name: "C2D",
    subtitle: "CAD → Drawing",
    price: "$500",
    period: "/seat/mo",
    description:
      "3D models to 2D engineering drawings with automated GD&T annotation.",
    features: [
      "3D → 2D drawing generation",
      "Automated GD&T callouts",
      "Multi-view layout (front, side, iso)",
      "PDF / DXF export",
      "Standard reasoning credits included",
    ],
    cta: "Start Free Trial",
    elevated: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-b border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20 text-center"
        >
          <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-muted mb-3">
            Pricing
          </p>
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] leading-[1.15] mb-4">
            One tool. Three modes.
          </h2>
          <p className="text-[14px] leading-[1.7] text-text-muted max-w-[440px] mx-auto">
            Pay per seat. Credits for geometry processing are included — pay
            only for overages.
          </p>
        </motion.div>

        {/* Cards — center one elevated */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.4,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`border border-border rounded-[var(--radius)] ${
                plan.elevated
                  ? "md:-mx-px md:relative md:z-10 md:scale-[1.04] bg-accent text-text-inverted"
                  : "bg-bg-main"
              }`}
            >
              <div className="p-6 md:p-8">
                {/* Plan name & badge */}
                <div className="flex items-center gap-2 mb-1">
                  <h3
                    className={`text-[15px] font-semibold tracking-[-0.01em] ${
                      plan.elevated ? "text-text-inverted" : ""
                    }`}
                  >
                    {plan.name}
                  </h3>
                  {plan.elevated && (
                    <span className="text-[10px] font-medium tracking-[0.08em] uppercase border border-text-inverted/30 px-2 py-0.5 rounded-[var(--radius-sm)]">
                      Best Value
                    </span>
                  )}
                </div>
                <p
                  className={`text-[12px] mb-4 ${
                    plan.elevated ? "text-text-inverted/70" : "text-text-muted"
                  }`}
                >
                  {plan.subtitle}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-[32px] font-bold tracking-[-0.03em] tabular-nums">
                    {plan.price}
                  </span>
                  <span
                    className={`text-[13px] ${
                      plan.elevated ? "text-text-inverted/60" : "text-text-muted"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>

                <p
                  className={`text-[13px] leading-[1.6] mb-6 ${
                    plan.elevated ? "text-text-inverted/80" : "text-text-muted"
                  }`}
                >
                  {plan.description}
                </p>

                {/* CTA */}
                <a
                  href="#waitlist"
                  className={`block text-center text-[13px] font-semibold py-3 rounded-[var(--radius)] transition-opacity duration-150 hover:opacity-80 mb-6 ${
                    plan.elevated
                      ? "bg-bg-main text-text-primary"
                      : "bg-accent text-text-inverted"
                  }`}
                >
                  {plan.cta}
                </a>

                {/* Features list */}
                <ul className="flex flex-col gap-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        className={`mt-0.5 shrink-0 ${
                          plan.elevated ? "text-text-inverted/70" : "text-text-muted"
                        }`}
                      >
                        <path
                          d="M3 8.5L6.5 12L13 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                      <span
                        className={`text-[13px] leading-[1.5] ${
                          plan.elevated
                            ? "text-text-inverted/90"
                            : "text-text-muted"
                        }`}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Credit pricing note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 border border-border-light rounded-[var(--radius)] p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <p className="text-[13px] font-semibold mb-1">Credit-based geometry processing</p>
            <p className="text-[12px] text-text-muted leading-[1.6]">
              Standard Reasoning at $40/1M tokens. Geometry Credits (αCAD) at
              $100/1M tokens. Base credits included with every seat.
            </p>
          </div>
          <a
            href="#waitlist"
            className="shrink-0 text-[12px] font-medium border border-border px-4 py-2 rounded-[var(--radius)] hover:bg-accent hover:text-text-inverted transition-colors duration-150"
          >
            Contact Sales
          </a>
        </motion.div>
      </div>
    </section>
  );
}
