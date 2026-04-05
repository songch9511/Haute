"use client";

const columns = [
  {
    title: "Product",
    links: ["Trace Explorer", "Alerts", "Dashboards", "API Diff", "CLI"],
  },
  {
    title: "Developers",
    links: ["Documentation", "API Reference", "SDKs", "Changelog", "Status"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Security"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "DPA", "SOC 2"],
  },
];

export function MeridianFooter() {
  return (
    <footer
      className="px-6 py-16 lg:px-16"
      style={{ backgroundColor: "#050505" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {columns.map((col) => (
            <div key={col.title}>
              <h4
                className="mb-4 text-[11px] font-medium uppercase"
                style={{
                  color: "#8a8a8a",
                  letterSpacing: "0.14em",
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-150"
                      style={{
                        color: "#4a4a4a",
                        fontFamily: "var(--font-geist-mono)",
                      }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLElement).style.color = "#f5f5f5")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLElement).style.color = "#4a4a4a")
                      }
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 flex flex-col items-start justify-between gap-4 pt-8 md:flex-row md:items-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2">
            <span
              className="flex h-6 w-6 items-center justify-center rounded text-[10px] font-medium"
              style={{ backgroundColor: "#00d9a5", color: "#0a0a0a" }}
            >
              M
            </span>
            <span
              className="text-xs"
              style={{
                color: "#4a4a4a",
                fontFamily: "var(--font-geist-mono)",
              }}
            >
              Meridian Labs, Inc.
            </span>
          </div>

          <span
            className="text-[11px]"
            style={{
              color: "#4a4a4a",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            commit 4ec8fb9 · verified 2026-04-06T01:37:00Z
          </span>
        </div>
      </div>
    </footer>
  );
}
