"use client";

export function EinkNav() {
  return (
    <nav className="sticky top-0 z-50 h-14 flex items-center justify-between px-8 bg-[#f5f1eb] border-b border-[#d6d0c8]">
      <a href="/comet-eink" className="font-mono font-bold text-[#1a1815] text-base tracking-tight min-h-[44px] inline-flex items-center gap-2">
        <span className="w-5 h-5 border border-[#1a1815] flex items-center justify-center text-[8px] font-bold">C</span>
        CoMeT
      </a>

      <div className="hidden md:flex items-center gap-6">
        {["Problem", "Solution", "Architecture", "Use Cases"].map((link) => (
          <a key={link} href={`#${link.toLowerCase().replace(" ", "-")}`} className="text-xs font-mono text-[#625d57] hover:text-[#1a1815] transition-colors duration-100 min-h-[44px] inline-flex items-center uppercase tracking-wider">
            {link}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <a href="#" className="text-xs font-mono text-[#625d57] hover:text-[#1a1815] transition-colors duration-100 min-h-[44px] min-w-[44px] inline-flex items-center justify-center uppercase tracking-wider">
          Docs
        </a>
        <a href="#cta" className="px-4 py-2 min-h-[44px] bg-[#1a1815] text-[#f5f1eb] text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center">
          Get Started
        </a>
      </div>
    </nav>
  );
}
