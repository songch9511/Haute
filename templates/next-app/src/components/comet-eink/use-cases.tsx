const cases = [
  { title: "SOTA CAD Foundation Model", desc: "Built a state-of-the-art CAD model in 6 hours for $20. Dimension Research took 6 months.", metric: "6 hrs", label: "vs 6 months" },
  { title: "Protein 3D Structure", desc: "Achieved SOTA on protein structure by compounding failed experiment data across 27 patterns.", metric: "27", label: "patterns compounded" },
  { title: "Frontend & Backend Dev", desc: "Full-stack development with shared memory. Design tokens and API contracts flow between sessions.", metric: "3x", label: "faster cycles" },
  { title: "Domain-Adapting Harness", desc: "Self-evolving test harnesses that learn project-specific patterns and compound failure knowledge.", metric: "91%", label: "prevention rate" },
];

export function EinkUseCases() {
  return (
    <section className="py-24 px-8 border-t border-[#d6d0c8]" id="use-cases">
      <div className="max-w-[1000px] mx-auto">
        <div className="max-w-[480px] mb-12">
          <div className="font-mono text-xs uppercase tracking-[0.15em] text-[#625d57] mb-3">Use Cases</div>
          <h2 className="text-[2.5rem] md:text-[3rem] font-mono font-bold leading-[1.1] tracking-tight mb-3" style={{ lineHeight: 1.1 }}>
            What teams build
            <br />with CoMeT
          </h2>
          <p className="text-base text-[#625d57] leading-relaxed">
            Agents that remember outperform agents that don&apos;t.
          </p>
        </div>

        {/* Orchestration note */}
        <div className="border border-[#1a1815] p-6 mb-8 flex flex-col md:flex-row gap-6 items-start">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-12 h-12 border border-[#1a1815] flex items-center justify-center font-mono text-xs font-bold">Orch</div>
            <div className="flex gap-1">
              {[0,1,2].map((i) => <div key={i} className="w-3 h-3 border border-[#d6d0c8]" />)}
            </div>
          </div>
          <div>
            <h3 className="font-mono text-lg font-bold tracking-tight leading-tight mb-1" style={{ lineHeight: 1.2 }}>24/7 Self-Evolving Agents</h3>
            <p className="text-base text-[#625d57] leading-relaxed">Orchestrator manages workers around the clock. Each accumulates failures, shares nodes, collective intelligence grows.</p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#d6d0c8]">
          {cases.map((c, i) => (
            <div key={c.title} className={`p-6 ${i < 2 ? "border-b border-[#d6d0c8]" : ""} ${i % 2 === 0 ? "md:border-r border-[#d6d0c8]" : ""}`}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-mono text-lg font-bold tracking-tight leading-tight" style={{ lineHeight: 1.2 }}>{c.title}</h3>
                <div className="text-right shrink-0 ml-4">
                  <div className="font-mono text-xl font-bold tracking-tight tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>{c.metric}</div>
                  <div className="font-mono text-xs text-[#625d57] uppercase tracking-wider">{c.label}</div>
                </div>
              </div>
              <p className="text-base text-[#625d57] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
