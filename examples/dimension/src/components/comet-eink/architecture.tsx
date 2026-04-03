export function EinkArchitecture() {
  return (
    <section className="py-24 px-8 border-t border-[#d6d0c8]" id="architecture">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center max-w-[500px] mx-auto mb-12">
          <div className="font-mono text-xs uppercase tracking-[0.15em] text-[#625d57] mb-3">Architecture</div>
          <h2 className="text-[2.5rem] md:text-[3rem] font-mono font-bold leading-[1.1] tracking-tight mb-3" style={{ lineHeight: 1.1 }}>
            Before &amp; After
          </h2>
          <p className="text-base text-[#625d57] leading-relaxed">From flat files to a living memory tree.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#d6d0c8]">
          {/* ── Before: NOW ── */}
          <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-[#d6d0c8]">
            <div className="flex items-center gap-2 mb-8">
              <span className="font-mono text-xs font-bold uppercase tracking-wider underline decoration-wavy decoration-[#1a1815]/30">Now</span>
            </div>

            {/* Bloated system prompt */}
            <div className="border border-[#d6d0c8] p-5 mb-3">
              <div className="font-mono text-xs text-[#625d57] uppercase tracking-[0.15em] mb-3">System Prompt (base)</div>
              <div className="flex flex-wrap gap-2 mb-4">
                {["MCP Tools", "SKILL.md", "CLAUDE.md", "SOULS.md", "Memory.md", "Rules"].map((t) => (
                  <span key={t} className="font-mono text-xs px-2.5 py-1 border border-[#d6d0c8]">{t}</span>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-[#d6d0c8] pt-3 mt-2">
                <span className="font-mono text-xs text-[#625d57]">Context usage</span>
                <span className="font-mono text-xs font-bold text-[#1a1815]" style={{ fontVariantNumeric: "tabular-nums" }}>~87% full</span>
              </div>
              <div className="h-2 bg-[#d6d0c8] mt-2">
                <div className="h-full bg-[#1a1815]" style={{ width: "87%" }} />
              </div>
            </div>

            {/* Problems list */}
            <div className="space-y-0 mt-6">
              {[
                { issue: "Tool Culling", detail: "28 tools loaded, 3 used" },
                { issue: "Siloed Sessions", detail: "No cross-session knowledge" },
                { issue: "Lossy Compaction", detail: "LLM summarizes \u2192 data lost" },
                { issue: "O(n\u00B2) Cost", detail: "2\u00D7 memory = 4\u00D7 cost" },
                { issue: "No Recall Path", detail: "Grep or nothing" },
              ].map((item) => (
                <div key={item.issue} className="flex items-center gap-3 py-3 border-b border-[#d6d0c8] last:border-0">
                  <span className="text-[#1a1815] shrink-0 font-mono text-base">&times;</span>
                  <span className="font-mono text-base font-bold flex-1">{item.issue}</span>
                  <span className="font-mono text-xs text-[#625d57] shrink-0">{item.detail}</span>
                </div>
              ))}
            </div>

            <div className="text-center font-mono text-sm font-bold text-[#625d57] mt-8 line-through decoration-2">NOT ENOUGH</div>
          </div>

          {/* ── After: COMET ── */}
          <div className="p-8 md:p-10">
            <div className="flex items-center gap-2 mb-8">
              <span className="font-mono text-xs font-bold uppercase tracking-wider border-b-2 border-[#1a1815]">CoMeT</span>
            </div>

            {/* Optimized slim prompt */}
            <div className="border border-[#1a1815] p-5 mb-3">
              <div className="font-mono text-xs text-[#625d57] uppercase tracking-[0.15em] mb-3">System Prompt (optimized)</div>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Summary", "Triggers", "Active Rules"].map((t) => (
                  <span key={t} className="font-mono text-xs px-2.5 py-1 border border-[#1a1815] font-bold">{t}</span>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-[#d6d0c8] pt-3 mt-2">
                <span className="font-mono text-xs text-[#625d57]">Context usage</span>
                <span className="font-mono text-xs font-bold text-[#1a1815]" style={{ fontVariantNumeric: "tabular-nums" }}>~4 KB</span>
              </div>
              <div className="h-2 bg-[#d6d0c8] mt-2">
                <div className="h-full bg-[#1a1815]" style={{ width: "8%" }} />
              </div>
            </div>

            {/* Memory branches with stats */}
            <div className="mt-6 space-y-0">
              <div className="font-mono text-xs text-[#625d57] uppercase tracking-[0.15em] mb-3">External Memory Tree</div>
              {[
                { branch: "Tool", nodes: "847", retention: "Per-task" },
                { branch: "Session", nodes: "234", retention: "Per-session" },
                { branch: "MCP", nodes: "156", retention: "Persistent" },
                { branch: "Skill", nodes: "93", retention: "Permanent" },
              ].map((b, i) => (
                <div key={b.branch} className="flex items-center gap-4 py-3 border-b border-[#d6d0c8] last:border-0">
                  <div className="w-2.5 h-2.5 border border-[#1a1815] rounded-full shrink-0" style={{ backgroundColor: i === 0 ? "#1a1815" : "transparent" }} />
                  <span className="font-mono text-base font-bold w-16 shrink-0">{b.branch}</span>
                  <span className="font-mono text-xs text-[#625d57] border border-[#d6d0c8] px-2 py-0.5 shrink-0">{b.retention}</span>
                  <span className="font-mono text-xs text-[#625d57] ml-auto shrink-0" style={{ fontVariantNumeric: "tabular-nums" }}>{b.nodes} nodes</span>
                </div>
              ))}
            </div>

            {/* Recall pipeline */}
            <div className="mt-6">
              <div className="font-mono text-xs text-[#625d57] uppercase tracking-[0.15em] mb-3">Lossless Recall Pipeline</div>
              <div className="flex items-center flex-wrap gap-y-2">
                {["Index", "Trigger", "Raw", "Detail", "Summary"].map((step, i) => (
                  <div key={step} className="flex items-center">
                    <span className="font-mono text-xs px-3 py-1.5 border border-[#1a1815] font-bold">{step}</span>
                    {i < 4 && (
                      <svg width="16" height="12" viewBox="0 0 16 12" className="shrink-0 mx-1">
                        <path d="M2 6H14M11 3L14 6L11 9" stroke="#1a1815" strokeWidth="1" fill="none" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom summary */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#d6d0c8]">
              <span className="font-mono text-xs text-[#625d57]" style={{ fontVariantNumeric: "tabular-nums" }}>1,330 nodes &middot; 4 branches</span>
              <span className="font-mono text-sm font-bold text-[#1a1815]" style={{ fontVariantNumeric: "tabular-nums" }}>20.9 MB</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
