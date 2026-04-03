"use client";

import {
  motion,
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

/* Circular progress ring for center card */
function ProgressRing({ percent = 80, size = 180 }: { percent?: number; size?: number }) {
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width={size} height={size} className="mx-auto">
      {/* Background track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#e8edf3"
        strokeWidth={stroke}
        strokeLinecap="round"
      />
      {/* Progress arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#0054f9"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}

export function CatalisHero() {
  return (
    <section className="h-screen p-3">
      <div
        className="relative h-full rounded-[32px] overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(180deg, rgba(75,130,185,0.7) 0%, rgba(75,130,185,0.5) 35%, rgba(75,130,185,0.2) 60%, transparent 100%),
            radial-gradient(ellipse 130% 50% at 40% 100%, rgba(255,255,255,0.3) 0%, transparent 50%),
            url("https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?w=1920&h=1080&fit=crop&auto=format&q=80")
          `,
          backgroundSize: 'cover, cover, cover',
          backgroundPosition: 'center, center, center 60%',
          backgroundColor: '#5a9ac8',
        }}
      >
        <div className="max-w-[80rem] mx-auto px-6 md:px-[3.25rem] relative">
          {/* Spacer for fixed nav */}
          <div className="h-16" />

          {/* Centered text content */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto pt-8 md:pt-12">
            {/* Badge — bg-white/20, matching reference */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l2.09 6.26L20.18 10l-6.09 1.74L12 18l-2.09-6.26L3.82 10l6.09-1.74L12 2z" fill="white" />
                </svg>
                <span className="text-xs font-medium tracking-[0.08rem] uppercase text-white">
                  From Strategy to Success
                </span>
              </span>
            </motion.div>

            {/* Heading — 72px matching reference */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] tracking-[-0.04em] text-white">
                Build and <em className="italic">Growth</em> with
                <br />
                Scalable Tools
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-5"
            >
              <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                Easily adapt to changes and scale your operations with our flexible infrastructure, designed to support your business growth.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-3 mt-8"
            >
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
            </motion.div>
          </div>

          {/* Fan-spread cards */}
          <div className="relative flex justify-center items-end mt-10 md:mt-16 h-[260px] md:h-[360px]">
            {/* Left card — hatched bar chart */}
            <HeroCard
              rotate={-8}
              delay={0.4}
              className="absolute -bottom-8 left-[5%] md:left-[12%] w-[220px] md:w-[320px] p-5 md:p-7 z-10 origin-bottom"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs md:text-base font-bold text-[#131313]">Transactions</span>
              </div>
              <div className="flex items-baseline gap-2 mb-3">
                <p className="text-2xl md:text-4xl font-bold text-[#131313] tabular-nums">85%</p>
                <span className="text-[10px] md:text-xs text-emerald-600 font-semibold">↑ 12%</span>
              </div>
              <div className="flex items-end gap-1.5 md:gap-2 h-20 md:h-28">
                {[45, 70, 55, 85, 60, 95, 75].map((h, i) => (
                  <svg key={i} className="flex-1" style={{ height: `${h}%` }} viewBox="0 0 40 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id={`hatch-${i}`} patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                        <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(0,84,249,0.35)" strokeWidth="3" />
                      </pattern>
                    </defs>
                    <rect x="2" y="0" width="36" height="100" rx="8" fill={`url(#hatch-${i})`} />
                  </svg>
                ))}
              </div>
            </HeroCard>

            {/* Center card — circular progress ring (matching reference) */}
            <HeroCard
              rotate={0}
              delay={0.3}
              className="relative -bottom-8 w-[250px] md:w-[380px] p-6 md:p-8 z-20"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-base md:text-lg font-bold text-[#131313]">Card user</span>
                <span className="text-[10px] md:text-xs text-[#6b7280] bg-white border border-[#e5e7eb] px-3 py-1.5 rounded-full inline-flex items-center gap-1">
                  Monthly
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="#6b7280"><path d="M5 8l5 5 5-5z" /></svg>
                </span>
              </div>
              {/* Circular progress ring */}
              <div className="hidden md:block">
                <ProgressRing percent={80} size={180} />
              </div>
              <div className="md:hidden">
                <ProgressRing percent={80} size={120} />
              </div>
              <div className="text-center mt-4">
                <p className="text-3xl md:text-5xl font-bold text-[#131313] tabular-nums">80%</p>
                <p className="text-xs md:text-sm text-[#6b7280] mt-1">Responses this month</p>
              </div>
            </HeroCard>

            {/* Right card — bar chart + legend */}
            <HeroCard
              rotate={8}
              delay={0.5}
              className="absolute -bottom-8 right-[5%] md:right-[12%] w-[200px] md:w-[280px] p-5 md:p-6 z-10 origin-bottom"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] md:text-xs text-[#6b7280]">Monthly</span>
                <svg width="12" height="12" viewBox="0 0 20 20" fill="#6b7280"><path d="M5 8l5 5 5-5z" /></svg>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#0054f9]" />
                  <span className="text-[10px] md:text-xs text-[#6b7280]">Income</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#131313]" />
                  <span className="text-[10px] md:text-xs text-[#6b7280]">Free Budget</span>
                </div>
              </div>
              <div className="flex items-end gap-1.5 md:gap-2 h-14 md:h-20">
                {[35, 55, 75, 50, 90, 65].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-lg"
                    style={{
                      height: `${h}%`,
                      backgroundColor: i % 2 === 0 ? 'rgba(0,84,249,0.35)' : 'rgba(19,19,19,0.12)',
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
