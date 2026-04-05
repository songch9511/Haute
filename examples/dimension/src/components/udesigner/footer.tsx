import Link from "next/link";

const COLUMNS = [
  {
    label: "product",
    links: [
      { href: "#pillars", label: "architecture" },
      { href: "#benchmark", label: "benchmark" },
      { href: "#install", label: "install" },
    ],
  },
  {
    label: "verifier",
    links: [
      { href: "#", label: "code-oracle" },
      { href: "#", label: "visual-oracle" },
      { href: "#", label: "composite-score" },
    ],
  },
  {
    label: "memory",
    links: [
      { href: "#", label: "3-tier tree" },
      { href: "#", label: "memory tools" },
      { href: "#", label: "shipped corpus" },
    ],
  },
  {
    label: "repo",
    links: [
      { href: "#", label: "github" },
      { href: "#", label: "changelog" },
      { href: "#", label: "license" },
    ],
  },
];

export function UdFooter() {
  return (
    <footer className="px-6 md:px-12 pt-20 md:pt-24 pb-10 bg-[#050505] border-t border-white/[0.05]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="font-[family-name:var(--font-geist-mono)] text-[13px] text-[#f5f5f5]">
              udesigner<span className="text-[#00d9a5]">/</span>
            </div>
            <p className="mt-3 font-[family-name:var(--font-geist-mono)] text-[11px] text-[#4a4a4a] leading-relaxed max-w-[180px]">
              high-agency design harness for the ai era
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.label}>
              <div className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.14em] text-[#4a4a4a] mb-4">
                {col.label}
              </div>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="font-[family-name:var(--font-geist-mono)] text-[12px] text-[#8a8a8a] hover:text-[#f5f5f5] transition-colors duration-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-6 border-t border-white/[0.05]">
          <div className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[#4a4a4a]">
            // last verified: 2026-04-05 · commit e6eccce · code 99/100
          </div>
          <div className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[#4a4a4a]">
            read-only oracle · no mutation · lossless recall
          </div>
        </div>
      </div>
    </footer>
  );
}
