"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const toolOptions = ["Docs", "Wiki", "Projects", "Calendar", "Notes"] as const;

const MONTHLY_COST_PER_TOOL = 18.5;
const GATHER_MONTHLY_PER_USER = 8;

export default function Calculator() {
  const [teamSize, setTeamSize] = useState(50);
  const [selectedTools, setSelectedTools] = useState<Set<string>>(
    new Set(["Docs", "Wiki", "Projects"])
  );

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const toolCount = selectedTools.size;
  const annualSavings =
    teamSize * toolCount * MONTHLY_COST_PER_TOOL * 12 -
    teamSize * GATHER_MONTHLY_PER_USER * 12;
  const hoursSaved = teamSize * 3.2;
  const oldCost = teamSize * toolCount * MONTHLY_COST_PER_TOOL * 12;
  const gatherCost = teamSize * GATHER_MONTHLY_PER_USER * 12;
  const roi = gatherCost > 0 ? Math.round((annualSavings / gatherCost) * 100) : 0;

  const toggleTool = (tool: string) => {
    setSelectedTools((prev) => {
      const next = new Set(prev);
      if (next.has(tool)) {
        if (next.size > 1) next.delete(tool);
      } else {
        next.add(tool);
      }
      return next;
    });
  };

  const formatCurrency = (n: number) =>
    "$" + Math.round(n).toLocaleString("en-US");

  return (
    <section
      style={{ backgroundColor: "#f9f9f8" }}
      className="py-32 lg:py-40"
    >
      <div ref={ref} className="mx-auto max-w-[1252px] px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, transform: "translateY(24px)" }}
          animate={isInView ? { opacity: 1, transform: "translateY(0px)" } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2
            className="text-3xl md:text-[2.625rem] font-bold tracking-[-0.03em]"
            style={{ color: "rgba(0,0,0,0.95)" }}
          >
            More productivity. Fewer tools.
          </h2>
          <p
            className="mt-4 max-w-[560px] text-lg"
            style={{ color: "rgba(0,0,0,0.54)" }}
          >
            Replace your scattered stack of apps with one workspace that does it
            all.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-8"
          initial={{ opacity: 0, transform: "translateY(32px)" }}
          animate={isInView ? { opacity: 1, transform: "translateY(0px)" } : {}}
          transition={{
            duration: 0.6,
            delay: 0.15,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {/* Left: Controls */}
          <div className="md:col-span-2 flex flex-col gap-8">
            {/* Team size slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label
                  className="text-sm font-medium"
                  style={{
                    color: "rgba(0,0,0,0.9)",
                    fontFamily: "var(--font-outfit)",
                  }}
                >
                  Team size
                </label>
                <span
                  className="text-sm font-semibold tabular-nums"
                  style={{ color: "rgba(0,0,0,0.95)" }}
                >
                  {teamSize}
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={500}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #0075de ${
                    ((teamSize - 5) / 495) * 100
                  }%, rgba(0,0,0,0.1) ${((teamSize - 5) / 495) * 100}%)`,
                }}
              />
              <div
                className="flex justify-between mt-1.5 text-xs"
                style={{ color: "rgba(0,0,0,0.4)" }}
              >
                <span>5</span>
                <span>500</span>
              </div>
            </div>

            {/* Tools replaced */}
            <div>
              <label
                className="text-sm font-medium mb-3 block"
                style={{
                  color: "rgba(0,0,0,0.9)",
                  fontFamily: "var(--font-outfit)",
                }}
              >
                Tools replaced
              </label>
              <div className="flex flex-wrap gap-2">
                {toolOptions.map((tool) => {
                  const isSelected = selectedTools.has(tool);
                  return (
                    <button
                      key={tool}
                      onClick={() => toggleTool(tool)}
                      className="min-h-[44px] min-w-[44px] rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 cursor-pointer select-none"
                      style={{
                        backgroundColor: isSelected ? "#0075de" : "transparent",
                        color: isSelected ? "#ffffff" : "rgba(0,0,0,0.7)",
                        border: isSelected
                          ? "1px solid #0075de"
                          : "1px solid rgba(0,0,0,0.15)",
                      }}
                    >
                      {tool}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Results */}
          <div
            className="md:col-span-3 rounded-xl p-8"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid rgba(0,0,0,0.1)",
              boxShadow:
                "0px 4px 18px rgba(0,0,0,0.04), 0px 2px 7.8px rgba(0,0,0,0.027), 0px 0.8px 2.9px rgba(0,0,0,0.02), 0px 0.2px 1px rgba(0,0,0,0.013)",
            }}
          >
            <p
              className="text-sm"
              style={{
                color: "rgba(0,0,0,0.54)",
                fontFamily: "var(--font-outfit)",
              }}
            >
              Annual savings
            </p>
            <p
              className="text-[3rem] font-bold tabular-nums leading-tight mt-1"
              style={{ color: "rgba(0,0,0,0.95)" }}
            >
              {annualSavings > 0 ? formatCurrency(annualSavings) : "$0"}
            </p>
            <p className="text-sm mt-2" style={{ color: "rgba(0,0,0,0.54)" }}>
              per year, based on {teamSize} people replacing {toolCount} tool
              {toolCount !== 1 ? "s" : ""}
            </p>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: "#f9f9f8" }}
              >
                <p
                  className="text-xl font-bold tabular-nums"
                  style={{ color: "rgba(0,0,0,0.95)" }}
                >
                  {hoursSaved.toFixed(1)}
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "rgba(0,0,0,0.54)" }}
                >
                  Hours saved/week
                </p>
              </div>
              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: "#f9f9f8" }}
              >
                <p
                  className="text-xl font-bold tabular-nums"
                  style={{ color: "rgba(0,0,0,0.95)" }}
                >
                  {toolCount}
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "rgba(0,0,0,0.54)" }}
                >
                  Fewer apps
                </p>
              </div>
              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: "#f9f9f8" }}
              >
                <p
                  className="text-xl font-bold tabular-nums"
                  style={{ color: "rgba(0,0,0,0.95)" }}
                >
                  {roi}%
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "rgba(0,0,0,0.54)" }}
                >
                  ROI
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
