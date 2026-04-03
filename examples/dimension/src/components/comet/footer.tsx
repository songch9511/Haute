const columns = [
  { title: "Product", links: ["CoMeT Core", "CoBrA Agent", "Memory SDK", "CLI", "Changelog"] },
  { title: "Resources", links: ["Documentation", "Architecture Guide", "API Reference", "Examples", "Blog"] },
  { title: "Community", links: ["GitHub", "Discord", "Twitter", "Contributing", "Roadmap"] },
  { title: "Legal", links: ["MIT License", "Privacy", "Terms"] },
];

export function CometFooter() {
  return (
    <footer className="py-16 px-8 border-t border-white/[0.06] bg-[#0a0a0a]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded bg-[#10b981] flex items-center justify-center text-[8px] font-bold text-[#0a0a0a]">C</span>
              <span className="font-bold text-white text-sm">CoMeT</span>
            </div>
            <p className="text-xs text-[#9ca3af] leading-relaxed max-w-[180px]">
              Cognitive Memory Tree for self-evolving AI agents.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider mb-4">{col.title}</h4>
              <ul className="list-none flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[13px] text-[#9ca3af] no-underline hover:text-white transition-colors duration-150 min-h-[44px] inline-flex items-center">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/[0.06]">
          <span className="text-xs text-[#9ca3af]">&copy; 2026 CoMeT Project. Open source under MIT.</span>
          <div className="flex gap-6">
            {["GitHub", "Discord", "Twitter"].map((s) => (
              <a key={s} href="#" className="text-xs text-[#9ca3af] no-underline hover:text-[#9ca3af] transition-colors duration-150 min-h-[44px] inline-flex items-center">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
