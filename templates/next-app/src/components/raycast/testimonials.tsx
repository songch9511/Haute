"use client";

import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/motion";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Staff Engineer",
    company: "Vercel",
    initials: "SC",
    color: "#3b82f6",
    quote: "Raycast replaced five apps for me. Clipboard history, window management, snippets — all in one place. My Mac feels half-empty without it.",
    topExtension: "GitHub",
  },
  {
    name: "Marcus Rivera",
    role: "Design Lead",
    company: "Linear",
    initials: "MR",
    color: "#a78bfa",
    quote: "The Figma extension alone saved me 20 minutes a day. Searching files, opening projects — no more digging through browser tabs.",
    topExtension: "Figma",
  },
  {
    name: "Aisha Patel",
    role: "CEO",
    company: "Clearpath",
    initials: "AP",
    color: "#f59e0b",
    quote: "I recommended Raycast to our entire engineering team. Two weeks later, everyone built custom AI commands for their workflows.",
    topExtension: "AI Commands",
  },
  {
    name: "Jonas Müller",
    role: "iOS Developer",
    company: "Pitch",
    initials: "JM",
    color: "#22c55e",
    quote: "Window management with keyboard shortcuts changed how I work on a single monitor. I can tile four terminal sessions in under a second.",
    topExtension: "Window Management",
  },
  {
    name: "Yuki Tanaka",
    role: "Product Manager",
    company: "Notion",
    initials: "YT",
    color: "#ff3563",
    quote: "Snippets for email templates, meeting notes, and status updates. I type three characters and get a full formatted response.",
    topExtension: "Snippets",
  },
  {
    name: "Elena Kowalski",
    role: "Freelance Developer",
    company: "Independent",
    initials: "EK",
    color: "#06b6d4",
    quote: "As a freelancer, speed is money. Raycast lets me switch between client projects, search docs, and manage todos without lifting my fingers from the keyboard.",
    topExtension: "Todoist",
  },
];

export function RaycastTestimonials() {
  return (
    <section className="py-24 md:py-32 px-5">
      <div className="max-w-[1280px] mx-auto">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold leading-[1.1] tracking-[-0.03em] text-[#f0f0f0]">
            Loved by people who ship
          </h2>
          <p className="mt-4 text-[16px] sm:text-[18px] leading-[1.6] text-[#8a8f93] max-w-[480px] mx-auto">
            Developers, designers, and founders who use Raycast every day.
          </p>
        </AnimatedSection>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <div className="h-full rounded-2xl border border-[#2a2d2f] bg-[#161819] p-6 flex flex-col">
                {/* Quote */}
                <p className="text-[14.5px] leading-[1.6] text-[#8a8f93] flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author + meta */}
                <div className="mt-5 pt-4 border-t border-[#2a2d2f] flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-semibold text-[#0e1011] shrink-0"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13.5px] font-medium text-[#f0f0f0]">{t.name}</div>
                    <div className="text-[12px] text-[#8a8f93]">
                      {t.role} at {t.company}
                    </div>
                  </div>
                  <div className="ml-auto shrink-0">
                    <span className="text-[11px] text-[#8a8f93] px-2 py-0.5 rounded border border-[#2a2d2f]">
                      {t.topExtension}
                    </span>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
