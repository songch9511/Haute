"use client";

import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/motion";

const features = [
  {
    title: "Clipboard History",
    description: "Every text, image, link, and color you've copied — instantly searchable and always at your fingertips.",
    kbd: "⌘ ⇧ V",
    preview: [
      { type: "text", content: "const API_KEY = process.env…", time: "2m ago" },
      { type: "link", content: "https://linear.app/team/PRJ-847", time: "5m ago" },
      { type: "color", content: "#ff3563", time: "12m ago" },
      { type: "text", content: "Meeting notes: Q2 roadmap…", time: "1h ago" },
    ],
  },
  {
    title: "Window Management",
    description: "Snap windows into precise positions with keyboard shortcuts. Halves, thirds, quarters, or custom layouts.",
    kbd: "⌃ ⌥ →",
    preview: [
      { label: "Left Half", keys: "⌃⌥ ←" },
      { label: "Right Half", keys: "⌃⌥ →" },
      { label: "Center", keys: "⌃⌥ C" },
      { label: "Maximize", keys: "⌃⌥ ↵" },
      { label: "Left Third", keys: "⌃⌥ D" },
      { label: "Right Two-Thirds", keys: "⌃⌥ E" },
    ],
  },
  {
    title: "Snippets",
    description: "Type abbreviations that expand into full text blocks — emails, code templates, signatures, and date stamps.",
    kbd: "⌘ ⇧ .",
    preview: [
      { keyword: "!email", expansion: "Thank you for reaching out. I'll review this and…" },
      { keyword: "!sig", expansion: "— Sarah Chen, Staff Engineer @ Meridian" },
      { keyword: "!date", expansion: "April 3, 2026" },
      { keyword: "!pr", expansion: "## Summary\\n\\n## Test Plan\\n\\n## Screenshots" },
    ],
  },
  {
    title: "File Search",
    description: "Find any file on your machine in milliseconds. Searches filenames, content, and metadata simultaneously.",
    kbd: "⌘ ⇧ F",
    preview: [
      { name: "raycast-proposal.pdf", path: "~/Documents/Work/", size: "2.4 MB" },
      { name: "raycast-config.json", path: "~/.config/raycast/", size: "847 B" },
      { name: "RaycastExtension.swift", path: "~/Developer/plugins/", size: "12.3 KB" },
    ],
  },
  {
    title: "Quicklinks",
    description: "Open frequently visited URLs, local folders, and deep links to apps — all with custom keyboard shortcuts.",
    kbd: "⌘ ⌥ L",
    preview: [
      { label: "Figma — Design System", url: "figma.com/file/Kd8s…" },
      { label: "Linear — Current Sprint", url: "linear.app/team/sprint" },
      { label: "Vercel — Deployments", url: "vercel.com/dashboard" },
    ],
  },
  {
    title: "Calculator",
    description: "Compute math, convert currencies, and evaluate expressions — results copy to clipboard automatically.",
    kbd: "⌘ =",
    preview: [
      { expr: "24 * 365.25", result: "8,766" },
      { expr: "128 USD to EUR", result: "€117.43" },
      { expr: "sqrt(144) + 2^8", result: "268" },
    ],
  },
];

export function RaycastBuiltInFeatures() {
  return (
    <section className="py-24 md:py-32 px-5">
      <div className="max-w-[1280px] mx-auto">
        <AnimatedSection className="text-center mb-14">
          <p className="text-[13px] font-medium text-[#ff3563] tracking-[0.08em] uppercase mb-3">
            Built-in Tools
          </p>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold leading-[1.1] tracking-[-0.03em] text-[#f0f0f0] max-w-[650px] mx-auto">
            Productivity tools, no install needed
          </h2>
          <p className="mt-4 text-[16px] sm:text-[18px] leading-[1.6] text-[#8a8f93] max-w-[500px] mx-auto">
            Raycast ships with essential tools built right in.
            Every feature is one keystroke away.
          </p>
        </AnimatedSection>

        {/* True bento grid — every row has varied column spans */}
        {/* Row pattern: 2+1, 1+2, 2+1 — no row has 3 equal items */}
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, i) => {
            // i=0: col-span-2, i=1: col-span-1
            // i=2: col-span-1, i=3: col-span-2
            // i=4: col-span-2, i=5: col-span-1
            const spanTwo = i === 0 || i === 3 || i === 4;
            return (
            <StaggerItem
              key={feature.title}
              className={spanTwo ? "md:col-span-2" : ""}
            >
            {/* close tag below */}
              <div className="h-full rounded-2xl border border-[#2a2d2f] bg-[#161819] p-6 flex flex-col hover:border-[#3a3d3f] transition-colors duration-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[18px] font-semibold leading-[1.2] text-[#f0f0f0] tracking-[-0.01em]">
                    {feature.title}
                  </h3>
                  <kbd className="text-[11px] text-[#8a8f93] font-mono px-2 py-1 rounded border border-[#2a2d2f] bg-[#1e2022]">
                    {feature.kbd}
                  </kbd>
                </div>
                <p className="text-[14px] leading-[1.55] text-[#8a8f93] mb-5">
                  {feature.description}
                </p>

                {/* Mini preview */}
                <div className="mt-auto rounded-xl bg-[#0e1011] border border-[#2a2d2f] overflow-hidden">
                  {feature.title === "Clipboard History" && (
                    <div className="divide-y divide-[#2a2d2f]">
                      {(feature.preview as Array<{ type: string; content: string; time: string }>).map((item) => (
                        <div key={item.content} className="flex items-center justify-between px-4 py-2.5">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="text-[11px] text-[#8a8f93] w-3">
                              {item.type === "color" ? "●" : item.type === "link" ? "🔗" : "T"}
                            </span>
                            <span className="text-[12.5px] text-[#8a8f93] truncate font-mono" style={item.type === "color" ? { color: item.content } : {}}>
                              {item.content}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#8a8f93] shrink-0 ml-3">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {feature.title === "Window Management" && (
                    <div className="p-4 grid grid-cols-3 gap-2">
                      {(feature.preview as Array<{ label: string; keys: string }>).map((item) => (
                        <div key={item.label} className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-[#161819] transition-colors">
                          <div className="w-full h-[28px] rounded border border-[#2a2d2f] bg-[#161819] flex items-center justify-center">
                            <div
                              className="bg-[#ff3563]/20 rounded-sm"
                              style={{
                                width: item.label.includes("Half") ? "50%" : item.label.includes("Third") ? "33%" : item.label.includes("Two") ? "66%" : "90%",
                                height: "80%",
                              }}
                            />
                          </div>
                          <span className="text-[10px] text-[#8a8f93]">{item.keys}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {feature.title === "Snippets" && (
                    <div className="divide-y divide-[#2a2d2f]">
                      {(feature.preview as Array<{ keyword: string; expansion: string }>).map((item) => (
                        <div key={item.keyword} className="px-4 py-2.5 flex items-start gap-3">
                          <code className="text-[12px] text-[#ff3563] font-mono shrink-0">{item.keyword}</code>
                          <span className="text-[12px] text-[#8a8f93] truncate">{item.expansion}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {feature.title === "File Search" && (
                    <div className="divide-y divide-[#2a2d2f]">
                      {(feature.preview as Array<{ name: string; path: string; size: string }>).map((item) => (
                        <div key={item.name} className="px-4 py-2.5 flex items-center justify-between">
                          <div className="min-w-0">
                            <div className="text-[12.5px] text-[#f0f0f0] truncate">{item.name}</div>
                            <div className="text-[11px] text-[#8a8f93] truncate">{item.path}</div>
                          </div>
                          <span className="text-[11px] text-[#8a8f93] shrink-0 ml-3 font-mono tabular-nums">{item.size}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {feature.title === "Quicklinks" && (
                    <div className="divide-y divide-[#2a2d2f]">
                      {(feature.preview as Array<{ label: string; url: string }>).map((item) => (
                        <div key={item.label} className="px-4 py-2.5">
                          <div className="text-[12.5px] text-[#f0f0f0]">{item.label}</div>
                          <div className="text-[11px] text-[#8a8f93]">{item.url}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {feature.title === "Calculator" && (
                    <div className="divide-y divide-[#2a2d2f]">
                      {(feature.preview as Array<{ expr: string; result: string }>).map((item) => (
                        <div key={item.expr} className="px-4 py-2.5 flex items-center justify-between">
                          <span className="text-[12.5px] text-[#8a8f93] font-mono">{item.expr}</span>
                          <span className="text-[13px] text-[#f0f0f0] font-mono font-medium tabular-nums">{item.result}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
