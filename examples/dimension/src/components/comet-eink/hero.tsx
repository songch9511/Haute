export function EinkHero() {
  return (
    <section className="min-h-dvh flex flex-col items-center justify-center px-8 pt-20 pb-16">
      <div className="max-w-[700px] mx-auto text-center">
        <div className="inline-block font-mono text-xs uppercase tracking-[0.15em] text-[#625d57] border border-[#d6d0c8] px-3 py-1.5 mb-10">
          Cognitive Memory Tree
        </div>

        <h1 className="text-[3rem] md:text-[4rem] font-mono font-bold leading-[1.08] tracking-tight text-[#1a1815] mb-6" style={{ lineHeight: 1.08 }}>
          Memory that
          <br />
          evolves with
          <br />
          your agents
        </h1>

        <p className="text-lg text-[#625d57] leading-relaxed max-w-[480px] mx-auto mb-10">
          Current agent memory is broken — simple markdown files, session silos,
          and O(n&sup2;) context costs. CoMeT replaces it with a structured memory tree
          that compresses losslessly, recalls instantly, and compounds knowledge over time.
        </p>

        <div className="flex gap-3 items-center justify-center flex-wrap">
          <a href="#cta" className="inline-flex items-center justify-center px-7 py-3 min-h-[48px] bg-[#1a1815] text-[#f5f1eb] text-base font-mono font-bold uppercase tracking-wider">
            Start building
          </a>
          <a href="#problem" className="inline-flex items-center justify-center px-7 py-3 min-h-[48px] border border-[#1a1815] text-[#1a1815] text-base font-mono font-bold uppercase tracking-wider">
            See the problem &darr;
          </a>
        </div>

        <p className="mt-6 text-base font-mono text-[#625d57] uppercase tracking-wider">
          Open source &middot; Works with Claude, OpenClaw, and any LLM agent
        </p>
      </div>

      {/* Tree diagram — thin lines, no fills */}
      <div className="mt-20 w-full max-w-[500px] mx-auto">
        <svg viewBox="0 0 500 180" fill="none" stroke="#1a1815" strokeWidth="1" className="w-full opacity-30">
          {/* Root */}
          <circle cx="250" cy="30" r="8" />
          <text x="250" y="34" textAnchor="middle" fontSize="6" fill="#1a1815" stroke="none">C</text>

          {/* Branches */}
          <line x1="250" y1="38" x2="100" y2="90" />
          <line x1="250" y1="38" x2="200" y2="90" />
          <line x1="250" y1="38" x2="300" y2="90" />
          <line x1="250" y1="38" x2="400" y2="90" />

          {/* Nodes */}
          {[
            { x: 100, y: 90, label: "Tool" },
            { x: 200, y: 90, label: "Session" },
            { x: 300, y: 90, label: "MCP" },
            { x: 400, y: 90, label: "Skill" },
          ].map((n) => (
            <g key={n.label}>
              <circle cx={n.x} cy={n.y} r="5" />
              <text x={n.x} y={n.y + 16} textAnchor="middle" fontSize="7" fill="#6b6560" stroke="none" fontFamily="monospace">{n.label}</text>
            </g>
          ))}

          {/* Leaf branches */}
          <line x1="100" y1="95" x2="60" y2="145" strokeDasharray="3 3" />
          <line x1="100" y1="95" x2="140" y2="145" strokeDasharray="3 3" />
          <line x1="300" y1="95" x2="270" y2="145" strokeDasharray="3 3" />
          <line x1="300" y1="95" x2="330" y2="145" strokeDasharray="3 3" />
          <line x1="400" y1="95" x2="380" y2="145" strokeDasharray="3 3" />
          <line x1="400" y1="95" x2="420" y2="145" strokeDasharray="3 3" />

          {/* Leaf labels */}
          {[
            { x: 60, y: 155, label: "Index" },
            { x: 140, y: 155, label: "Raw" },
            { x: 270, y: 155, label: "Detail" },
            { x: 330, y: 155, label: "Sum" },
            { x: 380, y: 155, label: "Trigger" },
            { x: 420, y: 155, label: "Rule" },
          ].map((n) => (
            <g key={n.label}>
              <circle cx={n.x} cy={n.y - 10} r="3" />
              <text x={n.x} y={n.y + 2} textAnchor="middle" fontSize="6" fill="#a39e96" stroke="none" fontFamily="monospace">{n.label}</text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}
