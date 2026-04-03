export function EinkCTA() {
  return (
    <section className="py-24 px-8 border-t border-[#d6d0c8]" id="cta">
      <div className="max-w-[600px] mx-auto text-center">
        <div className="w-14 h-14 border border-[#1a1815] flex items-center justify-center mx-auto mb-8">
          <span className="font-mono text-xl font-bold">C</span>
        </div>

        <h2 className="text-[3rem] md:text-[3.5rem] font-mono font-bold leading-[1.06] tracking-tight mb-6" style={{ lineHeight: 1.06 }}>
          Give your agents
          <br />a real memory
        </h2>

        <p className="text-lg text-[#625d57] leading-relaxed max-w-[440px] mx-auto mb-10">
          Stop losing context between sessions. Start compounding knowledge
          across agents. CoMeT is open source and ready to integrate.
        </p>

        <div className="flex gap-3 items-center justify-center flex-wrap">
          <a href="#" className="inline-flex items-center justify-center px-8 py-3.5 min-h-[48px] bg-[#1a1815] text-[#f5f1eb] font-mono text-base font-bold uppercase tracking-wider">
            Get started
          </a>
          <a href="#" className="inline-flex items-center justify-center px-8 py-3.5 min-h-[48px] border border-[#1a1815] text-[#1a1815] font-mono text-base font-bold uppercase tracking-wider">
            Read the docs
          </a>
        </div>

        <p className="mt-6 font-mono text-xs text-[#625d57] uppercase tracking-[0.15em]">
          MIT License &middot; pip install comet-memory &middot; npm i @comet/agent
        </p>
      </div>
    </section>
  );
}
