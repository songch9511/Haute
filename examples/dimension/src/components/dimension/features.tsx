"use client";

import { motion } from "framer-motion";

export function Features() {
  return (
    <section id="features" className="border-b border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20 max-w-[480px]"
        >
          <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-text-muted mb-3">
            Capabilities
          </p>
          <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.02em] leading-[1.15] mb-4">
            Built for precision engineering.
          </h2>
          <p className="text-[14px] leading-[1.7] text-text-muted">
            Every feature designed around the workflows that mechanical
            engineers and product designers actually use.
          </p>
        </motion.div>

        {/* Bento Grid — true varied spans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {/* Row 1: 2 + 1 */}
          <FeatureCard
            span="md:col-span-2"
            title="AI-Powered 3D Generation"
            description="Upload multi-view 2D drawings. The geometry engine reads dimensions, GD&T callouts, and section views to produce a parametric BREP model — not mesh approximations."
            delay={0}
          >
            <AiGenerationVisual />
          </FeatureCard>

          <FeatureCard
            span="md:col-span-1"
            title="Chat-Based Editing"
            description="Modify geometry with plain language. 'Change this hole to ⌀12mm' or 'Add 2mm fillet to all edges.' Each edit is non-destructive."
            delay={0.08}
          >
            <ChatEditVisual />
          </FeatureCard>

          {/* Row 2: 1 + 2 */}
          <FeatureCard
            span="md:col-span-1"
            title="Version Snapshots"
            description="Every chat request creates a versioned snapshot. View, compare, or revert to any point in your editing history."
            delay={0.16}
          >
            <VersionVisual />
          </FeatureCard>

          <FeatureCard
            span="md:col-span-2"
            title="Multi-Format Export"
            description="Download production-ready files in STEP (for CNC/CAM), GLB (for web viewers and AR), or STL (for 3D printing). One model, every format."
            delay={0.24}
          >
            <ExportVisual />
          </FeatureCard>

          {/* Row 3: full width */}
          <FeatureCard
            span="md:col-span-3"
            title="Layer Tree & Interactive Viewport"
            description="Navigate model hierarchy with a structured layer tree. Select parts, groups, or individual meshes — selections sync between the tree and the 3D viewport with highlight and focus tracking."
            delay={0.32}
            horizontal
          >
            <LayerTreeVisual />
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  span,
  title,
  description,
  delay,
  horizontal,
  children,
}: {
  span: string;
  title: string;
  description: string;
  delay: number;
  horizontal?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`${span} bg-bg-main group`}
    >
      <div
        className={`p-6 md:p-8 h-full ${
          horizontal ? "md:flex md:items-center md:gap-12" : ""
        }`}
      >
        <div
          className={`mb-5 ${
            horizontal ? "md:mb-0 md:flex-1" : ""
          } border border-border-light rounded-[var(--radius)] p-4 flex items-center justify-center aspect-[16/9] ${
            horizontal ? "md:aspect-[3/1]" : ""
          }`}
        >
          {children}
        </div>
        <div className={horizontal ? "md:flex-1" : ""}>
          <h3 className="text-[16px] font-semibold mb-2 tracking-[-0.01em]">
            {title}
          </h3>
          <p className="text-[13px] leading-[1.7] text-text-muted">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Feature Visuals ── */

function AiGenerationVisual() {
  return (
    <svg width="280" height="100" viewBox="0 0 280 100" fill="none">
      {/* 2D drawing */}
      <rect x="10" y="10" width="60" height="80" stroke="#000" strokeWidth="0.75" fill="none" />
      <circle cx="40" cy="45" r="15" stroke="#000" strokeWidth="0.5" fill="none" />
      <circle cx="40" cy="45" r="6" stroke="#000" strokeWidth="0.5" fill="none" />
      {/* Dimension lines */}
      <line x1="15" y1="8" x2="65" y2="8" stroke="#c8c8c8" strokeWidth="0.5" />
      <text x="40" y="6" textAnchor="middle" fontSize="6" fontFamily="monospace" fill="#555">⌀30</text>
      {/* GD&T frame */}
      <rect x="15" y="72" width="50" height="10" stroke="#555" strokeWidth="0.5" fill="none" />
      <text x="40" y="80" textAnchor="middle" fontSize="6" fontFamily="monospace" fill="#555">⊥ 0.05 A</text>

      {/* Processing arrow */}
      <path d="M82 50 L118 50" stroke="#000" strokeWidth="0.75" />
      <path d="M114 46 L118 50 L114 54" stroke="#000" strokeWidth="0.75" />
      <rect x="88" y="38" width="22" height="10" rx="1" stroke="#555" strokeWidth="0.5" fill="none" />
      <text x="99" y="46" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="#555">AI</text>

      {/* 3D model */}
      <g transform="translate(140, 5)">
        <ellipse cx="60" cy="15" rx="40" ry="12" stroke="#000" strokeWidth="0.75" fill="none" />
        <line x1="20" y1="15" x2="20" y2="70" stroke="#000" strokeWidth="0.75" />
        <line x1="100" y1="15" x2="100" y2="70" stroke="#000" strokeWidth="0.75" />
        <ellipse cx="60" cy="70" rx="40" ry="12" stroke="#000" strokeWidth="0.75" fill="none" />
        {/* Inner hole */}
        <ellipse cx="60" cy="15" rx="14" ry="5" stroke="#000" strokeWidth="0.5" fill="none" />
        {/* Cross hatch hint */}
        <line x1="30" y1="35" x2="38" y2="43" stroke="#c8c8c8" strokeWidth="0.3" />
        <line x1="35" y1="35" x2="43" y2="43" stroke="#c8c8c8" strokeWidth="0.3" />
        <line x1="40" y1="35" x2="48" y2="43" stroke="#c8c8c8" strokeWidth="0.3" />
      </g>
    </svg>
  );
}

function ChatEditVisual() {
  return (
    <svg width="140" height="100" viewBox="0 0 140 100" fill="none">
      {/* Chat bubble */}
      <rect x="8" y="8" width="124" height="24" rx="2" stroke="#000" strokeWidth="0.75" fill="none" />
      <text x="14" y="24" fontSize="8" fontFamily="var(--font-family)" fill="#000">
        Change hole to ⌀12mm
      </text>
      {/* Response */}
      <rect x="8" y="40" width="124" height="20" rx="2" stroke="#000" strokeWidth="0.75" fill="#000" />
      <text x="14" y="54" fontSize="8" fontFamily="var(--font-family)" fill="#fff">
        ✓ Diameter updated: ⌀12mm
      </text>
      {/* Cursor blinking */}
      <rect x="8" y="72" width="124" height="20" rx="2" stroke="#c8c8c8" strokeWidth="0.75" fill="none" />
      <line x1="14" y1="78" x2="14" y2="86" stroke="#c8c8c8" strokeWidth="1" />
    </svg>
  );
}

function VersionVisual() {
  return (
    <svg width="140" height="100" viewBox="0 0 140 100" fill="none">
      {/* Timeline */}
      <line x1="20" y1="20" x2="20" y2="90" stroke="#000" strokeWidth="0.75" />

      {/* v1 */}
      <circle cx="20" cy="25" r="4" fill="#000" />
      <text x="30" y="28" fontSize="8" fontFamily="monospace" fill="#000">v1</text>
      <text x="50" y="28" fontSize="7" fill="#555">Initial model</text>

      {/* v2 */}
      <circle cx="20" cy="50" r="4" fill="#000" />
      <text x="30" y="53" fontSize="8" fontFamily="monospace" fill="#000">v2</text>
      <text x="50" y="53" fontSize="7" fill="#555">Column extended</text>

      {/* v3 — current */}
      <circle cx="20" cy="75" r="4" stroke="#000" strokeWidth="1.5" fill="none" />
      <circle cx="20" cy="75" r="1.5" fill="#000" />
      <text x="30" y="78" fontSize="8" fontFamily="monospace" fill="#000">v3</text>
      <text x="50" y="78" fontSize="7" fill="#555">Fillet added</text>
      <rect x="98" y="70" width="32" height="14" rx="1" stroke="#000" strokeWidth="0.5" fill="none" />
      <text x="114" y="80" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="#000">LIVE</text>
    </svg>
  );
}

function ExportVisual() {
  return (
    <svg width="280" height="80" viewBox="0 0 280 80" fill="none">
      {/* Center model icon */}
      <rect x="115" y="15" width="50" height="50" rx="2" stroke="#000" strokeWidth="0.75" fill="none" />
      <text x="140" y="45" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#000">3D</text>

      {/* STEP */}
      <path d="M110 40 L60 25" stroke="#000" strokeWidth="0.5" />
      <rect x="10" y="14" width="50" height="22" rx="2" stroke="#000" strokeWidth="0.75" fill="none" />
      <text x="35" y="29" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#000">.STEP</text>
      <text x="35" y="48" textAnchor="middle" fontSize="7" fill="#555">CNC / CAM</text>

      {/* GLB */}
      <path d="M170 40 L220 25" stroke="#000" strokeWidth="0.5" />
      <rect x="220" y="14" width="50" height="22" rx="2" stroke="#000" strokeWidth="0.75" fill="none" />
      <text x="245" y="29" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#000">.GLB</text>
      <text x="245" y="48" textAnchor="middle" fontSize="7" fill="#555">Web / AR</text>

      {/* STL */}
      <path d="M140 68 L140 72" stroke="#000" strokeWidth="0.5" />
      <text x="140" y="78" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#000">.STL</text>
    </svg>
  );
}

function LayerTreeVisual() {
  return (
    <svg width="360" height="60" viewBox="0 0 360 60" fill="none">
      {/* Tree structure */}
      <text x="10" y="15" fontSize="9" fontFamily="monospace" fill="#000">Scene</text>
      <line x1="14" y1="20" x2="14" y2="52" stroke="#c8c8c8" strokeWidth="0.5" />

      <line x1="14" y1="28" x2="28" y2="28" stroke="#c8c8c8" strokeWidth="0.5" />
      <text x="32" y="32" fontSize="8" fontFamily="monospace" fill="#000">Group_0</text>

      <line x1="36" y1="36" x2="36" y2="52" stroke="#c8c8c8" strokeWidth="0.5" />
      <line x1="36" y1="42" x2="50" y2="42" stroke="#c8c8c8" strokeWidth="0.5" />
      <rect x="52" y="36" width="68" height="14" rx="1" fill="#000" />
      <text x="58" y="46" fontSize="8" fontFamily="monospace" fill="#fff">Cylinder_part</text>

      <line x1="36" y1="52" x2="50" y2="52" stroke="#c8c8c8" strokeWidth="0.5" />
      <text x="54" y="56" fontSize="8" fontFamily="monospace" fill="#555">Flange_body</text>

      {/* Sync arrow */}
      <path d="M140 36 L160 36" stroke="#000" strokeWidth="0.5" />
      <path d="M157 33 L160 36 L157 39" stroke="#000" strokeWidth="0.5" />
      <text x="150" y="30" textAnchor="middle" fontSize="7" fill="#555">sync</text>

      {/* Viewport highlight */}
      <rect x="170" y="8" width="180" height="48" rx="2" stroke="#000" strokeWidth="0.75" fill="none" />
      {/* Grid */}
      <line x1="190" y1="8" x2="190" y2="56" stroke="#c8c8c8" strokeWidth="0.2" />
      <line x1="210" y1="8" x2="210" y2="56" stroke="#c8c8c8" strokeWidth="0.2" />
      <line x1="230" y1="8" x2="230" y2="56" stroke="#c8c8c8" strokeWidth="0.2" />
      <line x1="250" y1="8" x2="250" y2="56" stroke="#c8c8c8" strokeWidth="0.2" />
      <line x1="270" y1="8" x2="270" y2="56" stroke="#c8c8c8" strokeWidth="0.2" />
      <line x1="290" y1="8" x2="290" y2="56" stroke="#c8c8c8" strokeWidth="0.2" />
      <line x1="310" y1="8" x2="310" y2="56" stroke="#c8c8c8" strokeWidth="0.2" />
      <line x1="330" y1="8" x2="330" y2="56" stroke="#c8c8c8" strokeWidth="0.2" />
      <line x1="170" y1="24" x2="350" y2="24" stroke="#c8c8c8" strokeWidth="0.2" />
      <line x1="170" y1="40" x2="350" y2="40" stroke="#c8c8c8" strokeWidth="0.2" />

      {/* Highlighted part */}
      <ellipse cx="260" cy="25" rx="30" ry="10" stroke="#000" strokeWidth="1.5" fill="none" />
      <line x1="230" y1="25" x2="230" y2="48" stroke="#000" strokeWidth="0.75" />
      <line x1="290" y1="25" x2="290" y2="48" stroke="#000" strokeWidth="0.75" />
    </svg>
  );
}
