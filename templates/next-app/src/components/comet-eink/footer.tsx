const columns = [
  { title: "Product", links: ["CoMeT Core", "CoBrA Agent", "Memory SDK", "CLI", "Changelog"] },
  { title: "Resources", links: ["Documentation", "Architecture", "API Reference", "Examples", "Blog"] },
  { title: "Community", links: ["GitHub", "Discord", "Twitter", "Contributing", "Roadmap"] },
];

export function EinkFooter() {
  return (
    <footer className="py-12 px-8 border-t border-[#d6d0c8]">
      <div className="max-w-[1000px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-4 h-4 border border-[#1a1815] flex items-center justify-center text-[7px] font-mono font-bold">C</span>
              <span className="font-mono font-bold text-base">CoMeT</span>
            </div>
            <p className="text-base text-[#625d57] leading-relaxed max-w-[160px]">
              Cognitive Memory Tree for self-evolving AI agents.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-[#625d57] mb-3">{col.title}</h4>
              <ul className="list-none flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-base text-[#625d57] no-underline hover:text-[#1a1815] hover:underline transition-colors duration-100 min-h-[44px] inline-flex items-center">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-[#d6d0c8]">
          <span className="font-mono text-xs text-[#625d57] uppercase tracking-wider">&copy; 2026 CoMeT. MIT License.</span>
          <div className="flex gap-4">
            {["GitHub", "Discord", "Twitter"].map((s) => (
              <a key={s} href="#" className="font-mono text-xs text-[#625d57] no-underline hover:text-[#1a1815] hover:underline transition-colors duration-100 uppercase tracking-wider min-h-[44px] inline-flex items-center">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
