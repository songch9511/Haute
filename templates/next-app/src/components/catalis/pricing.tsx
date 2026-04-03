"use client";

import {
  motion,
  AnimatedSection,
  StaggerGroup,
  StaggerItem,
  springs,
} from "@/components/motion";
import { StarBadge } from "./star-badge";

const plans = [
  {
    name: "Starter Plan",
    price: "$49",
    features: [
      "Basic financial analytics tools",
      "Up to 3 user accounts",
      "Real-time exchange rate monitoring",
      "Monthly financial reports",
      "Email support",
    ],
  },
  {
    name: "Growth Plan",
    price: "$89",
    features: [
      "Advanced financial analytics tools",
      "Up to 10 user accounts",
      "Real-time exchange rate monitoring",
      "Custom monthly financial reports",
      "Priority email support",
    ],
  },
  {
    name: "Scale Plan",
    price: "$149",
    features: [
      "Advanced analytics with forecasting tools",
      "Unlimited user accounts",
      "Real-time exchange rate monitoring with alerts",
      "Custom and exportable financial reports",
      "Dedicated support via email and chat",
    ],
  },
];

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
      <circle cx="12" cy="12" r="10" stroke="#0054f9" strokeWidth="1.5" />
      <path d="M8 12l3 3 5-5" stroke="#0054f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CatalisPricing() {
  return (
    <section
      id="pricing"
      className="relative py-20 md:py-[5rem] overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 90% 60% at 40% 0%, rgba(255,255,255,0.4) 0%, transparent 45%),
          radial-gradient(ellipse 70% 45% at 80% 0%, rgba(255,255,255,0.3) 0%, transparent 40%),
          linear-gradient(180deg, #c0d9f0 0%, #7fbde3 35%, #5ca3d6 100%)
        `,
        backgroundColor: '#7fbde3',
      }}
    >

      <div className="max-w-[80rem] mx-auto px-6 md:px-[3.25rem]">
        {/* Header */}
        <AnimatedSection className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto mb-14">
          <StarBadge />
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,5vw,3.5rem)] leading-[1.15] tracking-[-0.04em] text-[#131313]">
            Simple, transparent <em className="italic">pricing</em>
          </h2>
          <p className="text-[#4c4c4c] text-base leading-relaxed">
            Choose a plan that fits your business needs and budget.
          </p>
        </AnimatedSection>

        {/* 3 white pricing cards on blue bg */}
        <StaggerGroup className="grid md:grid-cols-[0.9fr_1.2fr_0.9fr] gap-5 items-start">
          {plans.map((plan) => (
            <StaggerItem key={plan.name}>
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.15)" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-white rounded-[2rem] p-8 flex flex-col gap-6 h-full shadow-[0_0_32px_rgba(0,0,0,0.07)]"
              >
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
                      <path d="M14 0L16.8 11.2L28 14L16.8 16.8L14 28L11.2 16.8L0 14L11.2 11.2L14 0Z" fill="#0054f9" />
                    </svg>
                    <p className="text-sm font-medium text-[#131313]">
                      {plan.name}
                    </p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-[family-name:var(--font-cormorant)] text-5xl tracking-tight text-[#131313]">
                      {plan.price}
                    </span>
                    <span className="text-sm text-[#4c4c4c]">/month</span>
                  </div>
                </div>

                <div className="border-t border-[#efeff2] pt-4">
                  <p className="text-xs font-medium text-[#4c4c4c] mb-4">Features:</p>
                  <ul className="flex flex-col gap-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-sm text-[#4c4c4c]">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.a
                  href="#"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={springs.snappy}
                  className="mt-auto inline-flex items-center justify-center px-6 py-3 bg-[#131313] text-[#f0f0f0] text-sm font-medium rounded-full hover:bg-[#2a2a2a] transition-colors duration-200"
                >
                  Get Started
                </motion.a>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
