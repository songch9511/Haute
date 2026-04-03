const columns = [
  { title: "Product", links: ["Features", "Pricing", "Templates", "Integrations", "Changelog", "AI"] },
  { title: "Solutions", links: ["Portfolios", "Startups", "Agencies", "Enterprise", "E-commerce"] },
  { title: "Marketplace", links: ["Experts", "Templates", "Plugins", "Components", "Icons"] },
  { title: "Resources", links: ["Documentation", "Blog", "Community", "Tutorials", "Support"] },
  { title: "Company", links: ["About", "Careers", "Contact", "Press", "Brand Assets"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security", "GDPR", "Cookies"] },
];

export function FramerFooter() {
  return (
    <footer className="py-16 px-8 border-t border-white/[0.06] bg-[#0a0a0a]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-8 mb-16">
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <span className="font-bold text-white text-base tracking-tight">Prism</span>
            <p className="text-xs text-[#555] mt-2 leading-relaxed max-w-[180px]">The visual site builder for teams that care about design.</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-semibold text-[#555] uppercase tracking-wider mb-4">{col.title}</h4>
              <ul className="list-none flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}><a href="#" className="text-[13px] text-[#666] no-underline hover:text-white transition-colors duration-150 min-h-[44px] inline-flex items-center">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/[0.06]">
          <span className="text-xs text-[#555]">&copy; 2026 Prism Inc. All rights reserved.</span>
          <div className="flex gap-6">
            {["Twitter", "GitHub", "LinkedIn", "YouTube"].map((s) => (
              <a key={s} href="#" className="text-xs text-[#555] no-underline hover:text-[#888] transition-colors duration-150 min-h-[44px] inline-flex items-center">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
