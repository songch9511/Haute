import Link from "next/link";

const COLUMNS = [
  {
    label: "Product",
    links: [
      { href: "#pillars", label: "Architecture" },
      { href: "#benchmark", label: "Benchmark" },
      { href: "#install", label: "Session" },
    ],
  },
  {
    label: "Verifier",
    links: [
      { href: "#", label: "Code Oracle" },
      { href: "#", label: "Visual Oracle" },
      { href: "#", label: "Composite score" },
    ],
  },
  {
    label: "Memory",
    links: [
      { href: "#", label: "Three-tier tree" },
      { href: "#", label: "Memory tools" },
      { href: "#", label: "Shipped corpus" },
    ],
  },
  {
    label: "Archive",
    links: [
      { href: "#", label: "GitHub" },
      { href: "#", label: "Changelog" },
      { href: "#", label: "License" },
    ],
  },
];

export function UdFooter() {
  return (
    <footer className="px-6 md:px-12 pt-12 pb-10 bg-[#120e08] text-[#f5ede0]">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-12 gap-8 md:gap-6 mb-16 border-b border-[#3e2418] pb-14">
          <div className="col-span-12 md:col-span-4">
            <div className="font-[family-name:var(--font-cormorant)] font-semibold italic text-[40px] md:text-[56px] leading-[0.96] tracking-[-0.02em]">
              UDesigner<span className="not-italic text-[#c9a980]">.</span>
            </div>
            <p className="mt-4 font-[family-name:var(--font-cormorant)] font-semibold italic text-[18px] leading-[1.5] text-[#a0917f] max-w-[30ch]">
              A design agent with the instincts of an editor and the eye of an oracle.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.label} className="col-span-6 md:col-span-2">
              <div className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#8a3a1e] mb-5 pb-3 border-b border-[#3e2418]">
                {col.label}
              </div>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="font-[family-name:var(--font-cormorant)] font-semibold text-[17px] text-[#f5ede0] hover:text-[#c9a980] transition-colors duration-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-baseline justify-between gap-3">
          <div className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.22em] text-[#6b5a4a]">
            Last verified · 2026-04-05 · commit de0a66e · code 99/100
          </div>
          <div className="font-[family-name:var(--font-cormorant)] font-semibold italic text-[15px] text-[#a0917f]">
            Read-only oracle. No mutation. Lossless recall.
          </div>
        </div>
      </div>
    </footer>
  );
}
