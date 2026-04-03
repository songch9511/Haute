"use client";

import { motion } from "framer-motion";

function WorkspaceMockup() {
  return (
    <div
      className="mx-auto w-full"
      style={{
        maxWidth: 1000,
        aspectRatio: "16 / 10",
        borderRadius: 12,
        border: "1px solid rgba(0,0,0,0.1)",
        boxShadow:
          "0px 4px 18px rgba(0,0,0,0.04), 0px 2px 7.8px rgba(0,0,0,0.027), 0px 0.8px 2.9px rgba(0,0,0,0.02), 0px 0.2px 1px rgba(0,0,0,0.013)",
        overflow: "hidden",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Top bar */}
      <div
        className="flex items-center"
        style={{
          height: 40,
          backgroundColor: "#f9f9f8",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          padding: "0 14px",
          gap: 8,
        }}
      >
        {/* Window dots */}
        <div className="flex gap-1.5">
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.12)" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.12)" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.12)" }} />
        </div>
        {/* Tab titles */}
        <div className="flex gap-0 ml-4">
          <div
            style={{
              padding: "6px 14px",
              fontSize: 12,
              color: "rgba(0,0,0,0.54)",
              backgroundColor: "#ffffff",
              borderRadius: "6px 6px 0 0",
              border: "1px solid rgba(0,0,0,0.1)",
              borderBottom: "1px solid #ffffff",
              fontFamily: "var(--font-inter)",
            }}
          >
            Q3 Roadmap
          </div>
          <div
            style={{
              padding: "6px 14px",
              fontSize: 12,
              color: "rgba(0,0,0,0.35)",
              fontFamily: "var(--font-inter)",
            }}
          >
            Meeting Notes
          </div>
        </div>
      </div>

      {/* Content area: sidebar + document */}
      <div className="flex" style={{ height: "calc(100% - 40px)" }}>
        {/* Sidebar */}
        <div
          className="hidden sm:block flex-shrink-0"
          style={{
            width: 200,
            backgroundColor: "#f9f9f8",
            borderRight: "1px solid rgba(0,0,0,0.1)",
            padding: "16px 10px",
          }}
        >
          {/* Sidebar items */}
          {[
            { label: "Home", active: false },
            { label: "Q3 Roadmap", active: true },
            { label: "Design System", active: false },
            { label: "Engineering", active: false },
            { label: "Team Wiki", active: false },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                padding: "6px 10px",
                borderRadius: 6,
                fontSize: 13,
                color: item.active ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.45)",
                backgroundColor: item.active ? "rgba(0,0,0,0.04)" : "transparent",
                fontFamily: "var(--font-inter)",
                fontWeight: item.active ? 500 : 400,
                marginBottom: 2,
              }}
            >
              {item.label}
            </div>
          ))}
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", margin: "12px 10px" }} />
          {[
            "Sprint Board",
            "Launch Checklist",
            "API Docs",
          ].map((label) => (
            <div
              key={label}
              style={{
                padding: "6px 10px",
                borderRadius: 6,
                fontSize: 13,
                color: "rgba(0,0,0,0.35)",
                fontFamily: "var(--font-inter)",
                marginBottom: 2,
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Document area */}
        <div style={{ flex: 1, padding: "32px 40px", overflow: "hidden" }}>
          {/* Document title */}
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: "rgba(0,0,0,0.9)",
              fontFamily: "var(--font-inter)",
              marginBottom: 6,
            }}
          >
            Q3 Product Roadmap
          </div>
          <div
            style={{
              fontSize: 13,
              color: "rgba(0,0,0,0.35)",
              fontFamily: "var(--font-inter)",
              marginBottom: 24,
            }}
          >
            Last edited by Sarah C. - 2 hours ago
          </div>

          {/* Faux text blocks */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                height: 12,
                width: "90%",
                backgroundColor: "#f6f5f4",
                borderRadius: 3,
              }}
            />
            <div
              style={{
                height: 12,
                width: "75%",
                backgroundColor: "#f6f5f4",
                borderRadius: 3,
              }}
            />
            <div
              style={{
                height: 12,
                width: "82%",
                backgroundColor: "#f6f5f4",
                borderRadius: 3,
              }}
            />
            <div style={{ height: 8 }} />
            {/* Inline block element - a "table" */}
            <div
              style={{
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr 0.8fr",
                  fontSize: 11,
                  fontFamily: "var(--font-inter)",
                  color: "rgba(0,0,0,0.4)",
                  fontWeight: 500,
                  backgroundColor: "#f9f9f8",
                  padding: "8px 12px",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <span>Task</span>
                <span>Owner</span>
                <span>Status</span>
              </div>
              {[
                { task: "Auth v2 migration", owner: "Marcus R.", status: "In progress" },
                { task: "Dashboard redesign", owner: "Aisha P.", status: "Review" },
                { task: "API rate limiting", owner: "James L.", status: "Done" },
              ].map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.2fr 1fr 0.8fr",
                    fontSize: 12,
                    fontFamily: "var(--font-inter)",
                    color: "rgba(0,0,0,0.6)",
                    padding: "8px 12px",
                    borderBottom: i < 2 ? "1px solid rgba(0,0,0,0.04)" : "none",
                  }}
                >
                  <span>{row.task}</span>
                  <span>{row.owner}</span>
                  <span
                    style={{
                      color:
                        row.status === "Done"
                          ? "#16a34a"
                          : row.status === "Review"
                          ? "#d97706"
                          : "#0075de",
                      fontWeight: 500,
                    }}
                  >
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ height: 4 }} />
            <div
              style={{
                height: 12,
                width: "65%",
                backgroundColor: "#f6f5f4",
                borderRadius: 3,
              }}
            />
            <div
              style={{
                height: 12,
                width: "58%",
                backgroundColor: "#f6f5f4",
                borderRadius: 3,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      className="pt-40 pb-20 px-4 lg:px-6"
      style={{ backgroundColor: "#ffffff", fontFamily: "var(--font-inter)" }}
    >
      <div className="mx-auto" style={{ maxWidth: 1252 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          <h1
            className="text-[2.25rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] font-bold mx-auto"
            style={{
              color: "rgba(0,0,0,0.95)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              maxWidth: 800,
            }}
          >
            One workspace. Every workflow.
          </h1>
          <p
            className="text-lg md:text-xl mx-auto mt-5"
            style={{
              color: "rgba(0,0,0,0.54)",
              maxWidth: 640,
              lineHeight: 1.55,
            }}
          >
            Gather brings your notes, docs, projects, and knowledge together
            — powered by AI that actually understands your work.
          </p>

          {/* CTAs */}
          <div className="flex flex-row items-center justify-center gap-3 mt-8 flex-wrap">
            <a
              href="#signup"
              className="font-medium inline-flex items-center justify-center transition-colors duration-150"
              style={{
                height: 46,
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: "#0075de",
                color: "#f0f0f0",
                borderRadius: 10,
                fontSize: 15,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#097fe8")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0075de")}
            >
              Get Gather free
            </a>
            <a
              href="#demo"
              className="font-medium inline-flex items-center justify-center transition-colors duration-150"
              style={{
                height: 46,
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: "#ffffff",
                color: "rgba(0,0,0,0.95)",
                borderRadius: 10,
                fontSize: 15,
                border: "1px solid rgba(0,0,0,0.1)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f6f5f4")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
            >
              Request a demo
            </a>
          </div>
        </motion.div>

        {/* Product mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-16"
        >
          <WorkspaceMockup />
        </motion.div>
      </div>
    </section>
  );
}
