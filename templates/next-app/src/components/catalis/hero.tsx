"use client";

import {
  motion,
  AnimatedSection,
  springs,
} from "@/components/motion";

function HeroCard({
  className,
  rotate,
  delay = 0,
  children,
}: {
  className?: string;
  rotate: number;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springs.gentle, delay }}
      style={{ rotate: `${rotate}deg` }}
      className={`rounded-[1.5rem] bg-white/85 backdrop-blur-[10px] border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.15)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function CatalisHero() {
  return (
    <section className="pt-4 px-4 md:px-6 pb-0">
      {/* Inner container WITH sky background (no z-index hack) */}
      <div
        className="relative min-h-[100dvh] rounded-[2rem] overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 140% 60% at 25% 100%, rgba(255,255,255,0.9) 0%, transparent 50%),
            radial-gradient(ellipse 110% 50% at 75% 100%, rgba(255,255,255,0.85) 0%, transparent 45%),
            radial-gradient(ellipse 80% 40% at 50% 100%, rgba(255,255,255,0.95) 0%, transparent 35%),
            linear-gradient(180deg, #c0d6ee 0%, #8fbee3 25%, #6aadda 50%, #5ca3d6 75%, #4a97cd 100%)
          `,
          backgroundColor: '#7fbde3',
        }}
      >
        <div className="max-w-[80rem] mx-auto px-6 md:px-[3.25rem] relative">
          {/* Centered text content */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto pt-24 md:pt-28">
            {/* Badge */}
            <AnimatedSection className="flex items-center gap-2 mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a1a]/40 backdrop-blur-sm rounded-full">
                <svg width="14" height="14" viewBox="0 0 28 28" fill="none">
                  <path
                    d="M14 0L16.8 11.2L28 14L16.8 16.8L14 28L11.2 16.8L0 14L11.2 11.2L14 0Z"
                    fill="#f0c040"
                  />
                </svg>
                <span className="text-xs font-medium tracking-[0.08rem] uppercase text-white">
                  From Strategy to Success
                </span>
              </span>
            </AnimatedSection>

            {/* Heading — white on sky */}
            <AnimatedSection delay={0.1}>
              <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.1] tracking-[-0.04em] text-white">
                Build and <em className="italic">Growth</em> with
                <br />
                Scalable Tools
              </h1>
            </AnimatedSection>

            {/* Description — muted white */}
            <AnimatedSection delay={0.15} className="mt-5">
              <p className="text-white/70 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
                Easily adapt to changes and scale your operations with our
                flexible infrastructure, designed to support your business growth.
              </p>
            </AnimatedSection>

            {/* CTA */}
            <AnimatedSection delay={0.2} className="flex flex-wrap justify-center gap-3 mt-8">
              <motion.a
                href="#pricing"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={springs.snappy}
                className="inline-flex items-center px-7 py-3 bg-[#1a1a1a] text-white text-sm font-medium rounded-full hover:bg-[#2a2a2a] transition-colors duration-200"
              >
                Get Started
              </motion.a>
              <motion.a
                href="#about"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={springs.snappy}
                className="inline-flex items-center px-7 py-3 bg-white text-[#131313] text-sm font-medium rounded-full hover:bg-[#f0f0f0] transition-colors duration-200"
              >
                Learn More
              </motion.a>
            </AnimatedSection>
          </div>

          {/* Fan-spread cards peeking from bottom */}
          <div className="relative flex justify-center items-end mt-16 md:mt-24 h-[260px] md:h-[320px]">
            {/* Left card — tilted left */}
            <HeroCard
              rotate={-8}
              delay={0.4}
              className="absolute bottom-[-70px] left-[2%] md:left-[10%] w-52 md:w-64 p-5 z-0 origin-bottom"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#131313]">Transactions</span>
                <span className="text-[10px] text-emerald-600 font-medium">↑ 12%</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-[#131313] tabular-nums mb-3">
                85%
              </p>
              <div className="flex items-end gap-1 h-14">
                {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-md"
                    style={{
                      height: `${h}%`,
                      backgroundColor: `rgba(0, 84, 249, ${0.2 + (h / 100) * 0.3})`,
                    }}
                  />
                ))}
              </div>
            </HeroCard>

            {/* Center card — upright */}
            <HeroCard
              rotate={0}
              delay={0.3}
              className="relative bottom-[-50px] w-64 md:w-80 p-6 z-20"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-[#131313]">Card user</span>
                <span className="text-xs text-[#6b7280] bg-white border border-[#e5e7eb] px-3 py-1 rounded-full inline-flex items-center gap-1">
                  Monthly
                  <svg width="10" height="10" viewBox="0 0 20 20" fill="#6b7280">
                    <path d="M5 8l5 5 5-5z" />
                  </svg>
                </span>
              </div>
              <div className="flex items-end justify-center gap-1.5 h-20 my-2">
                {[18, 28, 40, 52, 60, 52, 40, 28, 18].map((h, i) => (
                  <div
                    key={i}
                    className="w-3.5 rounded-full bg-[#0054f9]"
                    style={{
                      height: `${h}px`,
                      opacity: 0.4 + (h / 60) * 0.6,
                    }}
                  />
                ))}
              </div>
              <div className="text-center mt-2">
                <p className="text-3xl md:text-4xl font-bold text-[#131313] tabular-nums">
                  80%
                </p>
                <p className="text-xs text-[#6b7280] mt-1">Responses this month</p>
              </div>
            </HeroCard>

            {/* Right card — tilted right */}
            <HeroCard
              rotate={8}
              delay={0.5}
              className="absolute bottom-[-70px] right-[2%] md:right-[10%] w-48 md:w-56 p-5 z-0 origin-bottom"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] text-[#6b7280]">Monthly</span>
                <svg width="10" height="10" viewBox="0 0 20 20" fill="#6b7280">
                  <path d="M5 8l5 5 5-5z" />
                </svg>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#0054f9]" />
                  <span className="text-[10px] text-[#6b7280]">Income</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#131313]" />
                  <span className="text-[10px] text-[#6b7280]">Free Budget</span>
                </div>
              </div>
              <div className="flex items-end gap-1 h-10">
                {[30, 50, 70, 45, 85, 60].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded"
                    style={{
                      height: `${h}%`,
                      backgroundColor: i % 2 === 0 ? 'rgba(0,84,249,0.3)' : 'rgba(19,19,19,0.15)',
                    }}
                  />
                ))}
              </div>
            </HeroCard>
          </div>
        </div>
      </div>
    </section>
  );
}
