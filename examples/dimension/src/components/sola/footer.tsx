"use client";

const columns = [
  { title: "Shop", links: ["All Products", "Starter Set", "Gift Cards"] },
  { title: "About", links: ["Our Story", "Ingredients", "Sustainability", "Press"] },
  { title: "Help", links: ["FAQ", "Shipping", "Returns", "Contact"] },
];

export function SolaFooter() {
  return (
    <footer className="px-6 py-16 lg:px-16" style={{ backgroundColor: "#2c2420" }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:gap-12">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em]" style={{ color: "rgba(250, 246, 240, 0.5)" }}>
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-150"
                      style={{ color: "rgba(250, 246, 240, 0.6)" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#faf6f0")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(250, 246, 240, 0.6)")}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 pt-8 md:flex-row md:items-center" style={{ borderTop: "1px solid rgba(250, 246, 240, 0.1)" }}>
          <span className="text-lg font-medium tracking-wide" style={{ color: "#faf6f0", fontFamily: "Outfit, var(--font-geist-sans)" }}>
            sola
          </span>
          <span className="text-xs" style={{ color: "rgba(250, 246, 240, 0.4)" }}>
            Sola Labs, Inc. — Thoughtful skincare since 2024
          </span>
        </div>
      </div>
    </footer>
  );
}
