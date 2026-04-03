"use client";

import { motion } from "framer-motion";

const FOOTER_COLUMNS = [
  {
    heading: "Product",
    links: [
      "Overview",
      "Docs",
      "Wikis",
      "Projects",
      "AI",
      "Templates",
      "Integrations",
    ],
  },
  {
    heading: "Solutions",
    links: [
      "Enterprise",
      "Startups",
      "Education",
      "Engineering",
      "Design",
      "Product",
    ],
  },
  {
    heading: "Resources",
    links: [
      "Blog",
      "Help center",
      "Guides",
      "API docs",
      "Community",
      "What's new",
    ],
  },
  {
    heading: "Company",
    links: ["About", "Careers", "Press", "Contact", "Security", "Privacy"],
  },
];

function GatherLogo() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="28" height="28" rx="6" fill="rgba(0,0,0,0.95)" />
      <path
        d="M8 10.5C8 9.12 9.12 8 10.5 8H17.5C18.88 8 20 9.12 20 10.5V11.5H14.5C12.57 11.5 11 13.07 11 15V20H10.5C9.12 20 8 18.88 8 17.5V10.5Z"
        fill="#f0f0f0"
      />
      <rect x="13" y="13" width="7" height="7" rx="2" fill="#0075de" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      className="py-16 lg:py-20"
      style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}
    >
      <div className="mx-auto max-w-[1252px] px-4 lg:px-6">
        {/* CTA banner */}
        <motion.div
          className="mb-16 rounded-2xl p-10 md:p-16"
          style={{ backgroundColor: "#191918" }}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2
            className="text-2xl md:text-3xl font-bold"
            style={{ color: "#f0f0f0" }}
          >
            Start building with Gather
          </h2>
          <p className="mt-3 text-base" style={{ color: "#a39e98" }}>
            Free for individuals. Team plans for organizations of every size.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#"
              className="inline-flex items-center justify-center font-medium transition-colors duration-150"
              style={{
                height: "46px",
                paddingLeft: "20px",
                paddingRight: "20px",
                backgroundColor: "#0075de",
                color: "#ffffff",
                borderRadius: "10px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#097fe8")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#0075de")
              }
            >
              Get Gather free
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center font-medium transition-colors duration-150"
              style={{
                height: "46px",
                paddingLeft: "20px",
                paddingRight: "20px",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#f0f0f0",
                borderRadius: "10px",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(255,255,255,0.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              Contact sales
            </a>
          </div>
        </motion.div>

        {/* Footer columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Logo column — visible on lg only */}
          <div className="hidden lg:block">
            <div className="flex items-center gap-2.5">
              <GatherLogo />
              <span
                className="text-base font-semibold"
                style={{ color: "rgba(0,0,0,0.95)" }}
              >
                Gather
              </span>
            </div>
            <p className="mt-5 text-xs" style={{ color: "rgba(0,0,0,0.54)" }}>
              &copy; 2026 Gather Labs, Inc.
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3
                className="mb-4 text-sm font-semibold"
                style={{ color: "rgba(0,0,0,0.95)" }}
              >
                {col.heading}
              </h3>
              <ul>
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="block py-1.5 text-sm transition-colors duration-150"
                      style={{ color: "#615d59" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "rgba(0,0,0,0.95)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#615d59")
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
          className="mt-12 flex flex-wrap items-center justify-between gap-4 pt-6"
          style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
        >
          {/* Language selector */}
          <button
            className="inline-flex items-center gap-1.5 text-sm transition-colors duration-150"
            style={{ color: "rgba(0,0,0,0.54)" }}
            type="button"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="7" cy="7" r="6" />
              <path d="M1 7h12" />
              <path d="M7 1a10.4 10.4 0 0 1 2.6 6A10.4 10.4 0 0 1 7 13" />
              <path d="M7 1a10.4 10.4 0 0 0-2.6 6A10.4 10.4 0 0 0 7 13" />
            </svg>
            English
          </button>

          {/* Legal links */}
          <div className="flex items-center gap-1 text-sm" style={{ color: "rgba(0,0,0,0.54)" }}>
            <a
              href="#"
              className="transition-colors duration-150"
              style={{ color: "rgba(0,0,0,0.54)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(0,0,0,0.95)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(0,0,0,0.54)")
              }
            >
              Terms
            </a>
            <span style={{ color: "rgba(0,0,0,0.3)" }}>&middot;</span>
            <a
              href="#"
              className="transition-colors duration-150"
              style={{ color: "rgba(0,0,0,0.54)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(0,0,0,0.95)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(0,0,0,0.54)")
              }
            >
              Privacy
            </a>
            <span style={{ color: "rgba(0,0,0,0.3)" }}>&middot;</span>
            <a
              href="#"
              className="transition-colors duration-150"
              style={{ color: "rgba(0,0,0,0.54)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(0,0,0,0.95)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(0,0,0,0.54)")
              }
            >
              Cookie settings
            </a>
          </div>
        </div>

        {/* Mobile-only copyright (visible below lg) */}
        <div className="mt-8 lg:hidden">
          <div className="flex items-center gap-2.5">
            <GatherLogo />
            <span
              className="text-base font-semibold"
              style={{ color: "rgba(0,0,0,0.95)" }}
            >
              Gather
            </span>
          </div>
          <p className="mt-3 text-xs" style={{ color: "rgba(0,0,0,0.54)" }}>
            &copy; 2026 Gather Labs, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
