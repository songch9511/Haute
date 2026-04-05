"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const apiResponse = `{
  "endpoint": "/api/v2/users",
  "method": "GET",
  "status": 200,
  "latency_ms": 23,
  "region": "us-east-1",
  "trace_id": "mrd_8f2a4b1c",
  "spans": 7,
  "errors": 0
}`;

export function MeridianHero() {
  return (
    <section
      className="relative px-6 pt-32 pb-20 lg:px-16 lg:pt-40 lg:pb-28"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left — 7 cols */}
        <div
          className="flex flex-col justify-start lg:col-span-7 animate-[fadeUp_0.6s_cubic-bezier(0.22,1,0.36,1)_forwards]"
        >
          <p
            className="mb-4 text-[11px] font-medium uppercase"
            style={{
              color: "#8a8a8a",
              letterSpacing: "0.14em",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            <span style={{ color: "#00d9a5" }}>$</span> API Observability
          </p>

          <h1
            className="leading-[1.05] font-semibold tracking-tight"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              fontFamily: "var(--font-geist-mono)",
              color: "#f5f5f5",
            }}
          >
            See{" "}
            <span style={{ color: "#00d9a5" }}>every request</span>
            <br />
            Fix before
            <br />
            users notice
          </h1>

          <p
            className="mt-6 max-w-md text-base leading-relaxed"
            style={{ color: "#8a8a8a" }}
          >
            Real-time API monitoring with distributed tracing, intelligent
            alerts, and latency breakdowns. From first request to production
            incident — Meridian watches so you don't have to.
          </p>

          <div className="mt-8 flex items-center gap-4">
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
              Start Free
            </motion.button>
            <motion.a
              href="#docs"
              whileHover={{ y: -1 }}
              className="rounded-md px-6 py-3 text-sm font-medium"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#f5f5f5",
                fontFamily: "var(--font-geist-mono)",
              }}
            >
              View Docs
            </motion.a>
          </div>
        </div>

        {/* Right — 5 cols: API response card */}
        <div
          className="lg:col-span-5 animate-[fadeUp_0.6s_0.15s_cubic-bezier(0.22,1,0.36,1)_both]"
        >
          <div
            className="overflow-hidden rounded-xl"
            style={{
              backgroundColor: "#0d0d0d",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Title bar */}
            <div
              className="flex items-center gap-2 px-4 py-3"
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
                GET /api/v2/users — 200 OK
              </span>
            </div>

            {/* Code body */}
            <pre
              className="overflow-x-auto p-5 text-[13px] leading-relaxed"
              style={{
                fontFamily: "var(--font-geist-mono)",
                color: "#8a8a8a",
              }}
            >
              <code>
                {apiResponse.split("\n").map((line, i) => {
                  let colored = line;
                  if (line.includes('"status": 200'))
                    return (
                      <span key={i}>
                        {'  "status": '}
                        <span style={{ color: "#00d9a5" }}>200</span>
                        {",\n"}
                      </span>
                    );
                  if (line.includes('"latency_ms": 23'))
                    return (
                      <span key={i}>
                        {'  "latency_ms": '}
                        <span style={{ color: "#00d9a5" }}>23</span>
                        {",\n"}
                      </span>
                    );
                  if (line.includes('"errors": 0'))
                    return (
                      <span key={i}>
                        {'  "errors": '}
                        <span style={{ color: "#00d9a5" }}>0</span>
                        {"\n"}
                      </span>
                    );
                  return <span key={i}>{line + "\n"}</span>;
                })}
              </code>
            </pre>
          </div>
        </div>
      </div>

      {/* CSS keyframe for hero — no JS dependency */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
