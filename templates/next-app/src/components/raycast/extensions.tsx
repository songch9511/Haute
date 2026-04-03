"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { AnimatedSection, ease } from "@/components/motion";

/* ── Categories ── */
const categories = ["Productivity", "Engineering", "Design", "Writing"] as const;
type Category = (typeof categories)[number];

/* ── Extension card data ── */
interface ExtensionCard {
  name: string;
  description: string;
  iconBg: string;
  iconLetter: string;
  /** CSS gradient for the card background */
  cardGradient: string;
  /** What to render in the visual area */
  visual: "linear" | "translate" | "spotify" | "arc" | "notion" | "1password" | "todoist" | "figma" | "github" | "vscode" | "tailwind" | "grammarly";
}

const extensionsByCategory: Record<Category, ExtensionCard[]> = {
  Productivity: [
    {
      name: "Linear",
      description: "Create, search and modify your issues without leaving your keyboard.",
      iconBg: "#5e6ad2",
      iconLetter: "◇",
      cardGradient: "linear-gradient(160deg, #1a1d3a 0%, #12142a 40%, #0d0f1e 100%)",
      visual: "linear",
    },
    {
      name: "Google Translate",
      description: "Use Google Translate to effortlessly translate into multiple languages",
      iconBg: "#4285f4",
      iconLetter: "G",
      cardGradient: "linear-gradient(160deg, #0f2847 0%, #0a1a33 40%, #070d1e 100%)",
      visual: "translate",
    },
    {
      name: "Spotify",
      description: "Search for music and podcasts, browse your library, and control playback.",
      iconBg: "#1db954",
      iconLetter: "♫",
      cardGradient: "linear-gradient(160deg, #0a2e1a 0%, #071f12 40%, #040e09 100%)",
      visual: "spotify",
    },
    {
      name: "Arc",
      description: "Navigate your open tabs and spaces through your browser with ease.",
      iconBg: "#ff4f8b",
      iconLetter: "A",
      cardGradient: "linear-gradient(160deg, #2a0f1e 0%, #1a0a14 40%, #0e060c 100%)",
      visual: "arc",
    },
    {
      name: "Notion",
      description: "Search, create, and manage Notion pages and databases instantly.",
      iconBg: "#f0f0f0",
      iconLetter: "N",
      cardGradient: "linear-gradient(160deg, #1e1e1e 0%, #151515 40%, #0e0e0e 100%)",
      visual: "notion",
    },
    {
      name: "1Password",
      description: "Search and copy passwords from 1Password vaults directly.",
      iconBg: "#1a8cff",
      iconLetter: "1",
      cardGradient: "linear-gradient(160deg, #0a1e3d 0%, #071528 40%, #040c18 100%)",
      visual: "1password",
    },
  ],
  Engineering: [
    {
      name: "GitHub",
      description: "Search repos, manage pull requests, review issues, and check workflow runs.",
      iconBg: "#8b5cf6",
      iconLetter: "⚡",
      cardGradient: "linear-gradient(160deg, #1a1040 0%, #110a2e 40%, #0a061a 100%)",
      visual: "github",
    },
    {
      name: "VS Code",
      description: "Open recent projects and search workspaces from the command bar.",
      iconBg: "#007acc",
      iconLetter: "⌨",
      cardGradient: "linear-gradient(160deg, #0a1e3d 0%, #071528 40%, #040c18 100%)",
      visual: "vscode",
    },
    {
      name: "Linear",
      description: "Create, search and modify your issues without leaving your keyboard.",
      iconBg: "#5e6ad2",
      iconLetter: "◇",
      cardGradient: "linear-gradient(160deg, #1a1d3a 0%, #12142a 40%, #0d0f1e 100%)",
      visual: "linear",
    },
    {
      name: "Todoist",
      description: "Create tasks, check todos, and manage your projects seamlessly.",
      iconBg: "#e44332",
      iconLetter: "✓",
      cardGradient: "linear-gradient(160deg, #2e1010 0%, #1e0a0a 40%, #120606 100%)",
      visual: "todoist",
    },
  ],
  Design: [
    {
      name: "Figma",
      description: "Search files, open projects, and browse components instantly.",
      iconBg: "#a259ff",
      iconLetter: "F",
      cardGradient: "linear-gradient(160deg, #1e1040 0%, #14092e 40%, #0a051a 100%)",
      visual: "figma",
    },
    {
      name: "Tailwind CSS",
      description: "Search Tailwind CSS documentation and browse utility classes.",
      iconBg: "#06b6d4",
      iconLetter: "T",
      cardGradient: "linear-gradient(160deg, #0a2a30 0%, #071e22 40%, #040f12 100%)",
      visual: "tailwind",
    },
    {
      name: "Arc",
      description: "Navigate your open tabs and spaces through your browser with ease.",
      iconBg: "#ff4f8b",
      iconLetter: "A",
      cardGradient: "linear-gradient(160deg, #2a0f1e 0%, #1a0a14 40%, #0e060c 100%)",
      visual: "arc",
    },
    {
      name: "Spotify",
      description: "Search for music and podcasts, browse your library, and control playback.",
      iconBg: "#1db954",
      iconLetter: "♫",
      cardGradient: "linear-gradient(160deg, #0a2e1a 0%, #071f12 40%, #040e09 100%)",
      visual: "spotify",
    },
  ],
  Writing: [
    {
      name: "Google Translate",
      description: "Use Google Translate to effortlessly translate into multiple languages",
      iconBg: "#4285f4",
      iconLetter: "G",
      cardGradient: "linear-gradient(160deg, #0f2847 0%, #0a1a33 40%, #070d1e 100%)",
      visual: "translate",
    },
    {
      name: "Grammarly",
      description: "Check grammar, rewrite sentences, and improve clarity inline.",
      iconBg: "#15c39a",
      iconLetter: "G",
      cardGradient: "linear-gradient(160deg, #0a2e22 0%, #071e16 40%, #040e0b 100%)",
      visual: "grammarly",
    },
    {
      name: "Notion",
      description: "Search, create, and manage Notion pages and databases instantly.",
      iconBg: "#f0f0f0",
      iconLetter: "N",
      cardGradient: "linear-gradient(160deg, #1e1e1e 0%, #151515 40%, #0e0e0e 100%)",
      visual: "notion",
    },
    {
      name: "Todoist",
      description: "Create tasks, check todos, and manage your projects seamlessly.",
      iconBg: "#e44332",
      iconLetter: "✓",
      cardGradient: "linear-gradient(160deg, #2e1010 0%, #1e0a0a 40%, #120606 100%)",
      visual: "todoist",
    },
  ],
};

/* ── Visual illustrations per extension ── */
function ExtensionVisual({ type }: { type: ExtensionCard["visual"] }) {
  switch (type) {
    case "linear":
      return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {/* Abstract concentric arcs — Linear style */}
          <svg viewBox="0 0 300 300" className="w-[85%] h-[85%] opacity-30">
            <circle cx="150" cy="150" r="120" fill="none" stroke="#5e6ad2" strokeWidth="0.8" />
            <circle cx="150" cy="150" r="95" fill="none" stroke="#5e6ad2" strokeWidth="0.6" />
            <circle cx="150" cy="150" r="70" fill="none" stroke="#5e6ad2" strokeWidth="0.5" />
            <path d="M 150 30 A 120 120 0 0 1 270 150" fill="none" stroke="#8b9cf7" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 150 55 A 95 95 0 0 1 245 150" fill="none" stroke="#7b8ae7" strokeWidth="2" strokeLinecap="round" />
            <line x1="150" y1="30" x2="150" y2="270" stroke="#5e6ad2" strokeWidth="0.4" />
            <line x1="30" y1="150" x2="270" y2="150" stroke="#5e6ad2" strokeWidth="0.4" />
          </svg>
          {/* Bottom icons row */}
          <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3">
            {["#f5a623", "#f0f0f0", "#5e6ad2", "#22c55e"].map((color, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: `${color}60`, backgroundColor: `${color}15` }}
              >
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color, opacity: 0.7 }} />
              </div>
            ))}
          </div>
        </div>
      );

    case "translate":
      return (
        <div className="relative w-full h-full flex flex-col justify-center px-5 gap-3 overflow-hidden">
          {[
            ["Omelette du fromage", "بالجبنة"],
            ["Cheese Omelette", "Kaas omel..."],
            ["Tortilla de queso", "Ostomelett..."],
            ["Käse omlett", "Omelette al forn..."],
            ["Ushizi Omelette", "チーズオムレ..."],
            ["Omleta cu branza", "Trung tran..."],
            ["Truita de format...", "חביתת גבינה"],
          ].map(([left, right], i) => (
            <div key={i} className="flex items-center justify-between gap-4">
              <span
                className="text-[14px] sm:text-[16px] leading-tight truncate"
                style={{ color: i === 0 ? "#f0f0f0" : `rgba(240,240,240,${0.6 - i * 0.06})` }}
              >
                {left}
              </span>
              <span
                className="text-[14px] sm:text-[16px] leading-tight truncate text-right"
                style={{ color: `rgba(240,240,240,${0.35 - i * 0.03})` }}
              >
                {right}
              </span>
            </div>
          ))}
        </div>
      );

    case "spotify":
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
          {/* Radial green glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(29,185,84,0.15) 0%, transparent 70%)" }}
          />
          {/* Album art placeholder */}
          <div className="w-[140px] h-[140px] rounded-xl overflow-hidden mb-6" style={{ background: "linear-gradient(135deg, #2a1a1a 0%, #1a1215 100%)" }}>
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-[80px] h-[80px] rounded-full" style={{ background: "linear-gradient(135deg, #333 0%, #1a1a1a 100%)", boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)" }}>
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-[#0a0a0a]" />
                </div>
              </div>
            </div>
          </div>
          {/* Playback controls */}
          <div className="flex items-center gap-6">
            {[
              <svg key="prev" width="28" height="28" viewBox="0 0 24 24" fill="#f0f0f0"><path d="M19 20L9 12l10-8v16zM7 19V5H5v14h2z" /></svg>,
              <div key="play" className="w-12 h-12 rounded-full bg-[#f0f0f0] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#0e1011"><path d="M8 5v14l11-7z" /></svg>
              </div>,
              <svg key="next" width="28" height="28" viewBox="0 0 24 24" fill="#f0f0f0"><path d="M5 4l10 8-10 8V4zm12 1v14h2V5h-2z" /></svg>,
            ].map((el, i) => (
              <div key={i}>{el}</div>
            ))}
          </div>
        </div>
      );

    case "arc":
      return (
        <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <svg viewBox="0 0 300 300" className="w-[90%] h-[90%]">
            {/* Abstract swooping curves — Arc style */}
            <path d="M 20 280 Q 80 100 160 180 T 290 60" fill="none" stroke="#ff4f8b" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
            <path d="M 30 260 Q 100 120 180 200 T 280 80" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
            <path d="M 40 240 Q 120 140 200 180 T 270 100" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
            {/* Dots at intersections */}
            <circle cx="160" cy="180" r="4" fill="#ff4f8b" opacity="0.8" />
            <circle cx="240" cy="100" r="3" fill="#a855f7" opacity="0.6" />
          </svg>
          {/* Small labels */}
          <div className="absolute bottom-5 right-5 space-y-1.5 text-right">
            {["Spaces", "Work", "Personal", "All Tabs"].map((label, i) => (
              <div key={label} className="text-[11px]" style={{ color: `rgba(240,240,240,${0.5 - i * 0.1})` }}>
                {label}
              </div>
            ))}
          </div>
        </div>
      );

    case "notion":
      return (
        <div className="relative w-full h-full flex flex-col justify-center px-5 gap-2 overflow-hidden">
          {[
            { icon: "📄", title: "Q2 Product Roadmap", tag: "Engineering" },
            { icon: "📋", title: "Meeting Notes — April", tag: "General" },
            { icon: "🗂", title: "Design System v3", tag: "Design" },
            { icon: "📊", title: "Revenue Dashboard", tag: "Finance" },
            { icon: "🎯", title: "OKR Tracker 2026", tag: "Company" },
          ].map((item, i) => (
            <div
              key={item.title}
              className="flex items-center gap-3 px-3 py-2 rounded-lg"
              style={{ backgroundColor: i === 0 ? "rgba(240,240,240,0.06)" : "transparent" }}
            >
              <span className="text-[16px]">{item.icon}</span>
              <span className="text-[13px] text-[#e0e0e0] flex-1 truncate" style={{ opacity: 1 - i * 0.12 }}>
                {item.title}
              </span>
              <span className="text-[10px] text-[#8a8f93] shrink-0">{item.tag}</span>
            </div>
          ))}
        </div>
      );

    case "1password":
      return (
        <div className="relative w-full h-full flex flex-col justify-center px-5 gap-2.5 overflow-hidden">
          {[
            { service: "GitHub", user: "s.chen@meridian.io", strength: "strong" },
            { service: "AWS Console", user: "admin@clearpath.dev", strength: "strong" },
            { service: "Figma", user: "sarah@meridian.io", strength: "medium" },
            { service: "Slack", user: "s.chen@meridian.io", strength: "strong" },
          ].map((item, i) => (
            <div key={item.service} className="flex items-center gap-3 px-3 py-2.5 rounded-lg" style={{ backgroundColor: i === 0 ? "rgba(26,140,255,0.08)" : "transparent" }}>
              <div className="w-8 h-8 rounded-md bg-[#1a2433] flex items-center justify-center text-[11px] font-bold text-[#1a8cff]">
                {item.service.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] text-[#e0e0e0] truncate">{item.service}</div>
                <div className="text-[11px] text-[#8a8f93] truncate">{item.user}</div>
              </div>
              <div className="flex gap-0.5 shrink-0">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div
                    key={j}
                    className="w-1.5 h-4 rounded-full"
                    style={{
                      backgroundColor: item.strength === "strong" ? "#22c55e" : j < 3 ? "#f59e0b" : "#2a2d2f",
                      opacity: item.strength === "strong" ? 0.7 : 0.6,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case "todoist":
      return (
        <div className="relative w-full h-full flex flex-col justify-center px-5 gap-2 overflow-hidden">
          {[
            { task: "Review PR #847 — auth refactor", done: true, priority: "p1" },
            { task: "Prepare slide deck for Thursday", done: false, priority: "p1" },
            { task: "Update Figma component library", done: false, priority: "p2" },
            { task: "Reply to Elena's RFC feedback", done: false, priority: "p3" },
            { task: "Book flights for Berlin conf", done: false, priority: "p4" },
          ].map((item, i) => (
            <div key={item.task} className="flex items-center gap-3 px-3 py-2 rounded-lg" style={{ backgroundColor: i === 0 ? "rgba(228,67,50,0.08)" : "transparent" }}>
              <div
                className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                style={{
                  borderColor: item.done ? "#22c55e" : item.priority === "p1" ? "#e44332" : item.priority === "p2" ? "#f59e0b" : "#8a8f93",
                  backgroundColor: item.done ? "#22c55e" : "transparent",
                }}
              >
                {item.done && (
                  <svg width="8" height="8" viewBox="0 0 16 16" fill="none"><path d="M3 8L7 12L13 4" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                )}
              </div>
              <span
                className="text-[13px] truncate"
                style={{ color: item.done ? "#8a8f93" : "#e0e0e0", textDecoration: item.done ? "line-through" : "none" }}
              >
                {item.task}
              </span>
            </div>
          ))}
        </div>
      );

    case "github":
      return (
        <div className="relative w-full h-full flex flex-col justify-center px-5 gap-2 overflow-hidden">
          {[
            { title: "fix: resolve auth token refresh race", status: "merged", pr: "#2847" },
            { title: "feat: add team permission scoping", status: "open", pr: "#2851" },
            { title: "chore: bump dependencies to latest", status: "review", pr: "#2849" },
            { title: "docs: update API migration guide", status: "draft", pr: "#2853" },
          ].map((item, i) => (
            <div key={item.pr} className="flex items-center gap-3 px-3 py-2.5 rounded-lg" style={{ backgroundColor: i === 0 ? "rgba(139,92,246,0.08)" : "transparent" }}>
              <div className="w-4 h-4 shrink-0">
                <svg viewBox="0 0 16 16" fill={item.status === "merged" ? "#a78bfa" : item.status === "open" ? "#22c55e" : "#f59e0b"}>
                  <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12.5px] text-[#e0e0e0] truncate">{item.title}</div>
              </div>
              <span className="text-[10px] font-mono text-[#8a8f93] shrink-0">{item.pr}</span>
            </div>
          ))}
        </div>
      );

    case "vscode":
      return (
        <div className="relative w-full h-full flex flex-col justify-center px-5 gap-2 overflow-hidden">
          {[
            { project: "raycast-extension", path: "~/Developer/raycast", recent: "2m ago" },
            { project: "meridian-api", path: "~/Developer/meridian", recent: "1h ago" },
            { project: "design-system", path: "~/Developer/ds-v3", recent: "3h ago" },
            { project: "dotfiles", path: "~/.config", recent: "yesterday" },
          ].map((item, i) => (
            <div key={item.project} className="flex items-center gap-3 px-3 py-2.5 rounded-lg" style={{ backgroundColor: i === 0 ? "rgba(0,122,204,0.08)" : "transparent" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#007acc" strokeWidth="1.5" className="shrink-0">
                <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13 2v7h7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] text-[#e0e0e0] truncate">{item.project}</div>
                <div className="text-[11px] text-[#8a8f93] truncate">{item.path}</div>
              </div>
              <span className="text-[10px] text-[#8a8f93] shrink-0">{item.recent}</span>
            </div>
          ))}
        </div>
      );

    case "tailwind":
      return (
        <div className="relative w-full h-full flex flex-col justify-center px-5 gap-2 overflow-hidden">
          {[
            { cls: "flex items-center gap-4", desc: "Flexbox" },
            { cls: "grid grid-cols-3 gap-6", desc: "Grid" },
            { cls: "rounded-2xl shadow-lg", desc: "Border Radius" },
            { cls: "bg-gradient-to-r from-cyan-500", desc: "Gradient" },
            { cls: "transition-all duration-300", desc: "Transition" },
          ].map((item, i) => (
            <div key={item.cls} className="flex items-center gap-3 px-3 py-2 rounded-lg" style={{ backgroundColor: i === 0 ? "rgba(6,182,212,0.08)" : "transparent" }}>
              <code className="text-[11.5px] text-[#06b6d4] font-mono truncate flex-1">{item.cls}</code>
              <span className="text-[10px] text-[#8a8f93] shrink-0">{item.desc}</span>
            </div>
          ))}
        </div>
      );

    case "figma":
      return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 200 300" className="w-[50%] h-[70%]">
            <rect x="0" y="0" width="95" height="95" rx="47.5" fill="#f24e1e" opacity="0.8" />
            <rect x="105" y="0" width="95" height="95" rx="47.5" fill="#ff7262" opacity="0.8" />
            <rect x="0" y="105" width="95" height="95" rx="47.5" fill="#a259ff" opacity="0.8" />
            <circle cx="152.5" cy="152.5" r="47.5" fill="#1abcfe" opacity="0.8" />
            <rect x="0" y="210" width="95" height="90" rx="47.5" fill="#0acf83" opacity="0.8" />
          </svg>
        </div>
      );

    case "grammarly":
      return (
        <div className="relative w-full h-full flex flex-col justify-center px-5 gap-3 overflow-hidden">
          <div className="space-y-2">
            <p className="text-[13px] text-[#e0e0e0] leading-[1.6]">
              The team <span className="underline decoration-wavy decoration-[#e44332] underline-offset-4">was working</span> on several
              projects <span className="underline decoration-wavy decoration-[#f59e0b] underline-offset-4">simultanously</span> and
              needed to <span className="underline decoration-wavy decoration-[#e44332] underline-offset-4">insure</span> that all
              deliverables met the deadline.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#15c39a]/10 border border-[#15c39a]/20">
                <span className="text-[11px] text-[#15c39a] font-medium">3 suggestions</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#f0f0f0]/5 border border-[#f0f0f0]/10">
                <span className="text-[11px] text-[#8a8f93]">Clarity: 82</span>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

/* ── Main Component ── */
export function RaycastExtensions() {
  const [active, setActive] = useState<Category>("Productivity");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  /* Drag-to-scroll */
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !scrollRef.current) return;
      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX.current) * 1.2;
      scrollRef.current.scrollLeft = scrollLeft.current - walk;
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  /* Reset scroll on category change */
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  }, [active]);

  const cards = extensionsByCategory[active];

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8">
        {/* Header row: title left, tabs right */}
        <AnimatedSection>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-bold leading-[1.15] tracking-[-0.025em] text-[#f0f0f0]">
                There&apos;s an extension for that.
              </h2>
              <p className="mt-2 text-[16px] sm:text-[18px] leading-[1.55] text-[#8a8f93] max-w-[460px]">
                Use your favorite tools without even opening them.
              </p>
            </div>

            {/* Pill tabs */}
            <div
              className="inline-flex items-center gap-0.5 p-1 rounded-xl border border-[#2a2d2f] shrink-0"
              style={{ backgroundColor: "rgba(22, 24, 25, 0.8)" }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`relative px-4 py-2.5 sm:py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200 min-h-[44px] sm:min-h-0 ${
                    active === cat
                      ? "text-[#f0f0f0] bg-[#2a2d2f]"
                      : "text-[#8a8f93] hover:text-[#c0c0c0]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Carousel — full-bleed, horizontally scrollable */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ overflowX: "hidden" }}
        >
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing snap-x snap-mandatory scrollbar-hide max-w-[1440px] mx-auto px-5 md:px-8"
            data-carousel
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {cards.map((card, i) => (
              <motion.div
                key={`${active}-${card.name}-${i}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: ease.out, delay: i * 0.06 }}
                className="snap-start shrink-0 w-[340px] sm:w-[400px] md:w-[440px] rounded-[20px] overflow-hidden flex flex-col transition-all duration-300"
                style={{
                  height: "600px",
                  background: card.cardGradient,
                  border: `1px solid ${card.iconBg}25`,
                  boxShadow: `inset 0 1px 0 0 ${card.iconBg}15, inset 0 0 40px ${card.iconBg}06, 0 4px 24px rgba(0,0,0,0.3)`,
                }}
              >
                {/* Card header */}
                <div className="flex items-center justify-between px-6 pt-6 pb-0">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-[12px] flex items-center justify-center text-[17px] font-bold"
                      style={{
                        backgroundColor: `${card.iconBg}18`,
                        color: card.iconBg === "#f0f0f0" ? "#e0e0e0" : `color-mix(in srgb, ${card.iconBg} 55%, #f0f0f0)`,
                        border: `1px solid ${card.iconBg}30`,
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                      }}
                    >
                      {card.iconLetter}
                    </div>
                    <span className="text-[18px] font-semibold text-[#f0f0f0] tracking-[-0.01em]">
                      {card.name}
                    </span>
                  </div>
                  <div
                    className="w-9 h-9 rounded-[10px] flex items-center justify-center"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </div>

                {/* Description */}
                <p className="px-6 pt-4 pb-5 text-[15px] leading-[1.5] text-[#c0c4c8]">
                  {card.description}
                </p>

                {/* Visual illustration area — no inner container, bleeds into card */}
                <div className="flex-1 overflow-hidden relative">
                  {/* Subtle top separator — glass line */}
                  <div
                    className="absolute top-0 left-4 right-4 h-[1px]"
                    style={{ background: `linear-gradient(90deg, transparent, ${card.iconBg}20, transparent)` }}
                  />
                  <ExtensionVisual type={card.visual} />
                </div>
              </motion.div>
            ))}

            {/* Spacer for peek effect */}
            <div className="shrink-0 w-4 md:w-8" aria-hidden />
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center mt-5">
            <div className="w-10 h-1 rounded-full bg-[#2a2d2f]">
              <div className="w-5 h-full rounded-full bg-[#8a8f93]" />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
