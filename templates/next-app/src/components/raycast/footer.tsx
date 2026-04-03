"use client";

const footerColumns = [
  {
    title: "Product",
    links: [
      "Store",
      "Pro",
      "Teams",
      "Pricing",
      "Changelog",
      "Browser Extension",
      "iOS",
      "Windows",
    ],
  },
  {
    title: "Core Features",
    links: [
      "AI",
      "Notes",
      "Clipboard History",
      "Window Management",
      "Snippets",
      "File Search",
      "Quicklinks",
      "Calculator",
    ],
  },
  {
    title: "Developers",
    links: [
      "API Docs",
      "Build an Extension",
      "Publish to Store",
      "Extension Guidelines",
      "CLI",
    ],
  },
  {
    title: "Company",
    links: [
      "About",
      "Customers",
      "Careers",
      "Blog",
      "Press Kit",
      "Legal",
      "Privacy",
      "Contact",
    ],
  },
  {
    title: "Community",
    links: [
      "Slack",
      "X (Twitter)",
      "GitHub",
      "Dribbble",
      "YouTube",
      "Ambassadors",
    ],
  },
];

export function RaycastFooter() {
  return (
    <footer className="border-t border-[#2a2d2f] px-5 pt-16 pb-10">
      <div className="max-w-[1280px] mx-auto">
        {/* Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-6">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[12px] font-semibold text-[#8a8f93] uppercase tracking-[0.06em] mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[13.5px] text-[#8a8f93] hover:text-[#f0f0f0] transition-colors duration-150"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-14 pt-8 border-t border-[#2a2d2f] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h4 className="text-[14px] font-medium text-[#f0f0f0] mb-1">
              Stay in the loop
            </h4>
            <p className="text-[13px] text-[#8a8f93]">
              Product updates, tips, and community highlights. No spam.
            </p>
          </div>
          <form className="flex gap-2 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="you@email.com"
              className="h-[40px] px-4 rounded-lg text-[13.5px] text-[#f0f0f0] placeholder:text-[#8a8f93] bg-[#1e2022] border border-[#2a2d2f] focus:border-[#ff3563] focus:ring-1 focus:ring-[#ff3563]/30 outline-none transition-all duration-150 flex-1 md:w-[260px]"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="h-[40px] px-5 rounded-lg text-[13px] font-medium text-[#0e1011] transition-all duration-150 hover:opacity-90 active:scale-[0.98] shrink-0"
              style={{ backgroundColor: "#ff4c4c", backgroundImage: "linear-gradient(135deg, #ff6363 0%, #ff3563 100%)" }}
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[#2a2d2f] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: "#ff4c4c", backgroundImage: "linear-gradient(135deg, #ff6363 0%, #ff3563 100%)" }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M3 8L7 12L13 4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-[13px] text-[#8a8f93]">
              Raycast Technologies Inc.
            </span>
          </div>
          <p className="text-[12px] text-[#8a8f93]">
            &copy; 2026 Raycast. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
