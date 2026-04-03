"use client";

import {
  motion,
  AnimatedSection,
  StaggerGroup,
  StaggerItem,
} from "@/components/motion";
import { StarBadge } from "./star-badge";

/* ── Mockups adapted from 21st.dev patterns + Catalis reference ── */

function ExpenseMockup() {
  const bars = [
    { h: 35, opacity: 0.35 },
    { h: 55, opacity: 0.45 },
    { h: 40, opacity: 0.4 },
    { h: 75, opacity: 0.55 },
    { h: 50, opacity: 0.45 },
    { h: 90, opacity: 0.7 },
    { h: 65, opacity: 0.55 },
  ];

  return (
    <div className="bg-[#f3f4f6] rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[#131313]">Expenses</p>
        <span className="text-xs text-[#6b7280] bg-white border border-[#e5e7eb] px-3 py-1.5 rounded-full inline-flex items-center gap-1">
          Monthly
          <svg width="10" height="10" viewBox="0 0 20 20" fill="#6b7280"><path d="M5 8l5 5 5-5z" /></svg>
        </span>
      </div>
      <p className="text-5xl font-bold text-[#0054f9] tabular-nums tracking-tight">85%</p>
      <div className="flex items-end justify-between h-28 gap-2 pt-2">
        {bars.map((bar, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div className="w-full relative" style={{ height: '100%' }}>
              <div
                className="absolute bottom-0 w-full rounded-lg"
                style={{
                  height: `${bar.h}%`,
                  backgroundColor: `rgba(0, 84, 249, ${bar.opacity})`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AutomationMockup() {
  // Arc-shaped pill indicators like reference
  const pills = [
    { h: 20, o: 0.3 },
    { h: 32, o: 0.4 },
    { h: 44, o: 0.5 },
    { h: 56, o: 0.7 },
    { h: 64, o: 0.9 },
    { h: 56, o: 0.7 },
    { h: 44, o: 0.5 },
    { h: 32, o: 0.4 },
    { h: 20, o: 0.3 },
  ];

  return (
    <div className="bg-[#f3f4f6] rounded-2xl p-6 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[#131313]">Card user</p>
        <span className="text-xs text-[#6b7280] bg-white border border-[#e5e7eb] px-3 py-1.5 rounded-full inline-flex items-center gap-1">
          Monthly
          <svg width="10" height="10" viewBox="0 0 20 20" fill="#6b7280"><path d="M5 8l5 5 5-5z" /></svg>
        </span>
      </div>
      {/* Arc of pill-shaped indicators */}
      <div className="flex items-end justify-center gap-2 h-24 pt-4">
        {pills.map((p, i) => (
          <div
            key={i}
            className="w-4 rounded-full"
            style={{
              height: `${p.h}px`,
              backgroundColor: `rgba(0, 84, 249, ${p.o})`,
            }}
          />
        ))}
      </div>
      <div className="text-center pt-2">
        <p className="text-4xl font-bold text-[#131313] tabular-nums">80%</p>
        <p className="text-xs text-[#6b7280] mt-1">Responses this month</p>
      </div>
    </div>
  );
}

function SecurityMockup() {
  return (
    <div className="bg-[#f3f4f6] rounded-2xl p-6 space-y-4">
      <div>
        <p className="text-base font-semibold text-[#131313]">Unify your data,</p>
        <p className="text-base font-semibold text-[#131313]">Unlock your potential</p>
      </div>
      {/* Nested balance card */}
      <div className="bg-white rounded-xl p-5 border border-[#e5e7eb] space-y-3">
        <p className="text-xs text-[#6b7280]">Your balance</p>
        <p className="text-3xl font-bold text-[#131313] tabular-nums">$1,247</p>
      </div>
      {/* Decorative small bars + hatched circle */}
      <div className="flex items-end gap-3">
        <div className="flex items-end gap-1.5">
          <div className="w-6 h-5 rounded bg-[#0054f9]/15" />
          <div className="w-6 h-8 rounded bg-[#0054f9]/25" />
          <div className="w-6 h-12 rounded bg-[#0054f9]/35" />
        </div>
        <svg width="48" height="48" viewBox="0 0 48 48" className="ml-auto opacity-25">
          <circle cx="24" cy="24" r="22" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4 3" />
          <circle cx="24" cy="24" r="12" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="8" y1="8" x2="40" y2="40" stroke="#6b7280" strokeWidth="1" strokeDasharray="4 3" />
        </svg>
      </div>
    </div>
  );
}

function AuditMockup() {
  const bars = [30, 50, 38, 62, 45, 78, 55, 85];

  return (
    <div className="bg-[#f3f4f6] rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[#131313]">Transactions</p>
        <span className="text-xs text-[#6b7280] bg-white border border-[#e5e7eb] px-3 py-1.5 rounded-full inline-flex items-center gap-1">
          Monthly
          <svg width="10" height="10" viewBox="0 0 20 20" fill="#6b7280"><path d="M5 8l5 5 5-5z" /></svg>
        </span>
      </div>
      <div className="flex items-baseline gap-3">
        <p className="text-4xl font-bold text-[#131313] tabular-nums">85%</p>
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
          ↑ 12%
        </span>
      </div>
      {/* Wide bar chart */}
      <div className="flex items-end gap-1.5 h-20">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-md"
            style={{
              height: `${h}%`,
              backgroundColor: `rgba(0, 84, 249, ${0.15 + (h / 100) * 0.35})`,
            }}
          />
        ))}
      </div>
      {/* Hatched decoration */}
      <svg width="100%" height="28" viewBox="0 0 240 28" preserveAspectRatio="none" className="opacity-15">
        {Array.from({ length: 16 }).map((_, i) => (
          <line key={i} x1={i * 16} y1="28" x2={i * 16 + 12} y2="0" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" />
        ))}
      </svg>
    </div>
  );
}

/* ── Feature data ── */
const features = [
  {
    tag: "Clean Interface",
    title: "Intuitive user interface",
    description: "User-friendly design for effortless navigation and usability",
    mockup: <ExpenseMockup />,
  },
  {
    tag: "Faster",
    title: "Automated processes",
    description: "Streamlined workflows to increase efficiency and reduce manual tasks",
    mockup: <AutomationMockup />,
  },
  {
    tag: "Secure",
    title: "Secure transactions",
    description: "Safeguard your data with encrypted transactions and audit-ready compliance",
    mockup: <SecurityMockup />,
  },
  {
    tag: "Trusted Features",
    title: "Advanced security features",
    description: "Full traceability and audit-ready logs built into every action",
    mockup: <AuditMockup />,
  },
];

export function CatalisFeatures() {
  return (
    <section className="py-20 md:py-[5rem]">
      <div className="max-w-[80rem] mx-auto px-6 md:px-[3.25rem]">
        <AnimatedSection className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto mb-12">
          <StarBadge />
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,5vw,3.5rem)] leading-[1.15] tracking-[-0.04em] text-[#131313]">
            Tools that <em className="italic">strengthen</em> your
            <br />
            financial clarity
          </h2>
          <p className="text-[#4c4c4c] text-base leading-relaxed">
            Advanced instruments and live feeds to help you track, grow, and
            protect every dollar.
          </p>
        </AnimatedSection>

        <StaggerGroup className="grid sm:grid-cols-2 gap-5">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <motion.div
                whileHover={{ y: -3, boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-white rounded-[2rem] p-7 shadow-[0_0_32px_rgba(0,0,0,0.07)] flex flex-col gap-4 h-full"
              >
                <span className="self-start text-[10px] font-semibold tracking-[0.06rem] uppercase text-[#0054f9] bg-[#0054f9]/5 border border-[#0054f9]/15 px-3.5 py-1.5 rounded-full">
                  {f.tag}
                </span>
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl leading-tight tracking-tight text-[#131313]">
                  {f.title}
                </h3>
                <div className="my-1">{f.mockup}</div>
                <p className="text-sm text-[#4c4c4c] leading-relaxed">
                  {f.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
