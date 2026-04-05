"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function MeridianCta() {
  return (
    <section
      className="px-6 py-32 lg:px-16"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Left — headline */}
        <div
          className="animate-[fadeUp_0.5s_cubic-bezier(0.22,1,0.36,1)_both]"
        >
          <h2
            className="text-3xl font-semibold tracking-tight lg:text-5xl"
            style={{
              fontFamily: "var(--font-geist-mono)",
              color: "#f5f5f5",
              lineHeight: 1.1,
            }}
          >
            Start monitoring
            <br />
            in{" "}
            <span style={{ color: "#00d9a5" }}>90 seconds</span>
          </h2>
          <p
            className="mt-4 max-w-md text-base leading-relaxed"
            style={{ color: "#8a8a8a" }}
          >
            No credit card required. Free tier includes 50 endpoints and 7-day
            retention. Upgrade when you need more.
          </p>
        </div>

        {/* Right — install command */}
        <div
          className="animate-[fadeUp_0.5s_0.1s_cubic-bezier(0.22,1,0.36,1)_both]"
        >
          <div
            className="overflow-hidden rounded-xl"
            style={{
              backgroundColor: "#0d0d0d",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="flex items-center gap-2 px-5 py-3"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#ff6b6b" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#ffd166" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#00d9a5" }} />
              </div>
              <span
                className="ml-2 text-[11px]"
                style={{ color: "#4a4a4a", fontFamily: "var(--font-geist-mono)" }}
              >
                terminal
              </span>
            </div>
            <div className="p-5">
              <pre
                className="text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                <span style={{ color: "#00d9a5" }}>$</span>{" "}
                <span style={{ color: "#f5f5f5" }}>npx meridian init</span>
                {"\n\n"}
                <span style={{ color: "#8a8a8a" }}>  Detecting framework...</span>
                {"\n"}
                <span style={{ color: "#00d9a5" }}>  ✓</span>{" "}
                <span style={{ color: "#8a8a8a" }}>Next.js 15.2 detected</span>
                {"\n"}
                <span style={{ color: "#00d9a5" }}>  ✓</span>{" "}
                <span style={{ color: "#8a8a8a" }}>SDK installed</span>
                {"\n"}
                <span style={{ color: "#00d9a5" }}>  ✓</span>{" "}
                <span style={{ color: "#8a8a8a" }}>12 routes instrumented</span>
                {"\n\n"}
                <span style={{ color: "#00d9a5" }}>  Ready.</span>{" "}
                <span style={{ color: "#8a8a8a" }}>Dashboard → meridian.dev/d/your-project</span>
              </pre>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <motion.button
              type="button"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-md px-6 py-3 text-sm font-medium"
              style={{
                backgroundColor: "#00d9a5",
                color: "#0a0a0a",
                fontFamily: "var(--font-geist-mono)",
              }}
            >
              Get Started Free
            </motion.button>
            <a
              href="#pricing"
              className="text-sm"
              style={{
                color: "#8a8a8a",
                fontFamily: "var(--font-geist-mono)",
              }}
            >
              View pricing →
            </a>
          </div>
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
