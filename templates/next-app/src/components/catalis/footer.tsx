"use client";

import { useState } from "react";
import { motion, springs } from "@/components/motion";

const footerLinks = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#pricing" },
      { label: "Integrations", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Status", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
];

export function CatalisFooter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="bg-[#1a1a1a] text-[#e8e8e8] rounded-t-[2rem]">
      <div className="max-w-[80rem] mx-auto px-6 md:px-[3.25rem] py-16">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12">
          {/* Brand + Newsletter */}
          <div className="flex flex-col gap-6">
            <a
              href="#"
              className="font-[family-name:var(--font-cormorant)] text-2xl tracking-tight text-[#e8e8e8]"
            >
              Kova
            </a>
            <p className="text-sm text-[#e8e8e8]/60 leading-relaxed max-w-xs">
              Financial analytics built for teams that move fast and need
              clarity at every turn.
            </p>
            <div>
              <p className="text-sm text-[#e8e8e8]/80 mb-3">
                Subscribe to our newsletter
              </p>
              {submitted ? (
                <p className="text-sm text-[#0054f9]">
                  Thanks for subscribing.
                </p>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email) setSubmitted(true);
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="flex-1 bg-[#2a2a2a] border border-[#3a3a3a] rounded-full px-4 py-2 text-sm text-[#e8e8e8] placeholder:text-[#666] focus:outline-none focus:border-[#0054f9] transition-colors"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    transition={springs.snappy}
                    className="px-5 py-2 bg-[#0054f9] text-[#f0f0f0] text-sm font-medium rounded-full hover:bg-[#003fd4] transition-colors duration-200 shrink-0"
                  >
                    Join
                  </motion.button>
                </form>
              )}
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <p className="text-xs font-medium tracking-[0.075rem] uppercase text-[#e8e8e8]/40">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#e8e8e8]/60 hover:text-[#e8e8e8] transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-[#2a2a2a] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#e8e8e8]/40">
            &copy; 2025 Kova. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-[#e8e8e8]/40 hover:text-[#e8e8e8]/80 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-[#e8e8e8]/40 hover:text-[#e8e8e8]/80 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
