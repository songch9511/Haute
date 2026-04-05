"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const terminalLines = [
  { prompt: true, text: "meridian trace --endpoint /api/v2/users" },
  { prompt: false, text: "" },
  { prompt: false, text: "Trace mrd_8f2a4b1c  ·  7 spans  ·  23ms total", color: "#f5f5f5" },
  { prompt: false, text: "" },
  { prompt: false, text: "  gateway         3ms  ████░░░░░░░░░░░░  auth-check", color: "#00d9a5" },
  { prompt: false, text: "  auth-service    5ms  ████████░░░░░░░░  jwt-verify", color: "#00d9a5" },
  { prompt: false, text: "  user-service    8ms  ████████████░░░░  db-query", color: "#ffd166" },
  { prompt: false, text: "  cache-layer     2ms  ███░░░░░░░░░░░░░  redis-get", color: "#00d9a5" },
  { prompt: false, text: "  serializer      3ms  ████░░░░░░░░░░░░  json-encode", color: "#00d9a5" },
  { prompt: false, text: "  response        1ms  █░░░░░░░░░░░░░░░  http-write", color: "#00d9a5" },
  { prompt: false, text: "  logging         1ms  █░░░░░░░░░░░░░░░  async-emit", color: "#4a4a4a" },
  { prompt: false, text: "" },
  { prompt: false, text: "✓ No errors  ·  p99 latency: 47ms  ·  throughput: 1,247 req/s", color: "#00d9a5" },
];

export function MeridianProofStrip() {
  return (
    <section
      className="px-6 py-12 lg:px-16"
      style={{ backgroundColor: "#0d0d0d" }}
    >
      <div
        className="mx-auto max-w-6xl overflow-hidden rounded-xl animate-[fadeUp_0.5s_0.3s_cubic-bezier(0.22,1,0.36,1)_both]"
        style={{
          backgroundColor: "#050505",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-3 px-5 py-3"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#ff6b6b" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#ffd166" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#00d9a5" }} />
          </div>
          <span className="text-[11px]" style={{ color: "#4a4a4a" }}>
            terminal — meridian-cli v2.4.1
          </span>
        </div>

        {/* Terminal body */}
        <div className="overflow-x-auto p-5">
          <pre
            className="text-[13px] leading-[1.7]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            {terminalLines.map((line, i) => (
              <div key={i}>
                {line.prompt && (
                  <span style={{ color: "#00d9a5" }}>$ </span>
                )}
                <span style={{ color: line.color || "#4a4a4a" }}>
                  {line.text}
                </span>
              </div>
            ))}
          </pre>
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
