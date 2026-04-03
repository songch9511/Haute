"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/motion";
import { StarBadge } from "./star-badge";

const testimonials = [
  {
    name: "Raquel Mota",
    role: "CFO at Clearpath",
    photo: "photo-1494790108377-be9c29b29330",
    quote:
      "Kova cut our month-end close from nine days to three. The automated reconciliation alone saved our team 40 hours a week — hours we now spend on analysis instead of data entry.",
  },
  {
    name: "Tariq Osman",
    role: "Head of Finance at Openframe",
    photo: "photo-1507003211169-0a1dd7228f2d",
    quote:
      "We evaluated four platforms before choosing Kova. The real-time dashboards and granular permissions meant we could roll it out to department leads without worrying about data exposure.",
  },
  {
    name: "Lena Marchetti",
    role: "VP Operations at Dovetail",
    photo: "photo-1438761681033-6461ffad8d80",
    quote:
      "The scenario modeling tool changed how we plan headcount. We can model three hiring paths side-by-side and see exactly how each affects runway. No more spreadsheet gymnastics.",
  },
  {
    name: "Daniel Voss",
    role: "Controller at Meridian Labs",
    photo: "photo-1472099645785-5658abf4ff4e",
    quote:
      "Our auditors used to dread the documentation phase. With Kova's audit log exports, what took two weeks now takes an afternoon. That alone justified the subscription.",
  },
  {
    name: "Amara Singh",
    role: "Founder at Ridgeline",
    photo: "photo-1534528741775-53994a69daeb",
    quote:
      "I check Kova on my phone every morning before standup. Cash position, outstanding receivables, burn rate — all in one glance. It's the first tool that actually reduced my financial anxiety.",
  },
  {
    name: "Marcus Hale",
    role: "Director of Strategy at Waypoint",
    photo: "photo-1500648767791-00dcc994a43e",
    quote:
      "We consolidated three separate finance tools into Kova. The integration was smoother than expected, and the support team stayed on calls until every edge case was resolved.",
  },
];

function QuoteIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#4c4c4c" opacity={0.2}>
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.689 11 13.2 11 15c0 1.891-1.567 3.5-3.5 3.5-1.29 0-2.462-.6-2.917-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.689 21 13.2 21 15c0 1.891-1.567 3.5-3.5 3.5-1.29 0-2.462-.6-2.917-1.179z" />
    </svg>
  );
}

export function CatalisTestimonials() {
  return (
    <section className="py-20 md:py-[5rem] overflow-hidden">
      <div className="max-w-[80rem] mx-auto px-6 md:px-[3.25rem] mb-12">
        <AnimatedSection className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <StarBadge />
            <svg width="14" height="14" viewBox="0 0 28 28" fill="none">
              <path d="M14 0L16.8 11.2L28 14L16.8 16.8L14 28L11.2 16.8L0 14L11.2 11.2L14 0Z" fill="#131313" />
            </svg>
          </div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,5vw,3.5rem)] leading-[1.2] tracking-[-0.04em] text-[#131313]">
            What our <em className="italic">clients</em> are saying
          </h2>
          <p className="text-[#4c4c4c] text-base leading-relaxed">
            Teams across industries rely on Kova to make faster, more confident
            financial decisions.
          </p>
        </AnimatedSection>
      </div>

      {/* Infinite horizontal scroll — cards with photo on top (matching reference) */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#fafafa] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#fafafa] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-5 animate-[scroll_45s_linear_infinite] hover:[animation-play-state:paused] w-max">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="bg-white rounded-[2rem] w-[300px] shrink-0 shadow-[0_0_32px_rgba(0,0,0,0.07)] flex flex-col overflow-hidden"
            >
              {/* Headshot photo at top */}
              <div className="relative w-full aspect-[3/2]">
                <Image
                  src={`https://images.unsplash.com/${t.photo}?w=400&h=270&fit=crop&crop=face&auto=format&q=80`}
                  alt={t.name}
                  width={400}
                  height={270}
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Quote + name */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <QuoteIcon />
                <p className="text-sm text-[#4c4c4c] leading-relaxed flex-1">
                  {t.quote}
                </p>
                <div className="pt-3 border-t border-[#efeff2]">
                  <p className="text-sm font-medium text-[#131313]">
                    {t.name}
                  </p>
                  <p className="text-xs text-[#4c4c4c]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
