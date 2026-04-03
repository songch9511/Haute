const problems = [
  { label: "Simple .md", title: "Flat file memory", desc: "CLAUDE.md and MEMORY.md are just text files. No structure, no hierarchy, no relations between memories." },
  { label: "Tool Bloat", title: "Tool culling overhead", desc: "Agents load all tools into context every turn. As MCP servers grow, the base prompt balloons." },
  { label: "Session Silo", title: "Isolated sessions", desc: "Each conversation is a walled garden. Agent A learns something useful but Agent B starts from zero." },
  { label: "Small Context", title: "Context window limits", desc: "Even 200K tokens fill up fast. The LLM compresses by dropping information — lossy and uncontrolled." },
  { label: "O(n\u00B2) Cost", title: "Quadratic scaling", desc: "Every token attends to every other token. Double the memory, quadruple the cost." },
];

export function EinkProblem() {
  return (
    <section className="py-24 px-8 border-t border-[#d6d0c8]" id="problem">
      <div className="max-w-[1000px] mx-auto">
        <div className="max-w-[480px] mb-12">
          <div className="font-mono text-xs uppercase tracking-[0.15em] text-[#1a1815] mb-3 underline underline-offset-4 decoration-[#d6d0c8]">
            The Problem
          </div>
          <h2 className="text-[2.5rem] md:text-[3rem] font-mono font-bold leading-[1.1] tracking-tight mb-4" style={{ lineHeight: 1.1 }}>
            Current memory is
            <br />broken for agents
          </h2>
          <p className="text-base text-[#625d57] leading-relaxed">
            Five problems that compound into one reality: agents forget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-0 border border-[#d6d0c8]">
          {problems.map((p, i) => (
            <div
              key={p.label}
              className={`p-6 border-b border-[#d6d0c8] last:border-b-0 ${
                i < 2 ? "md:col-span-3 md:border-r md:border-[#d6d0c8]" :
                "md:col-span-2 md:border-r md:border-[#d6d0c8]"
              } ${i === 1 ? "md:border-r-0" : ""} ${i === 4 ? "md:border-r-0" : ""}`}
            >
              <div className="font-mono text-xs uppercase tracking-[0.15em] text-[#625d57] mb-3">
                {p.label}
              </div>
              <h3 className="text-lg font-mono font-bold tracking-tight mb-2" style={{ lineHeight: 1.2 }}>
                {p.title}
              </h3>
              <p className="text-base text-[#625d57] leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
