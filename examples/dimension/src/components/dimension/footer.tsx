export function Footer() {
  return (
    <footer className="py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5 mb-4">
              <svg
                width="22"
                height="22"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M16 2L28 16L16 30L4 16L16 2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M16 8L22 16L16 24L10 16L16 8Z"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <circle cx="16" cy="16" r="2" fill="currentColor" />
              </svg>
              <span className="text-[12px] font-semibold tracking-[0.08em] uppercase leading-tight">
                The Dimension Company
              </span>
            </div>
            <p className="text-[12px] text-text-muted leading-[1.7] max-w-[280px]">
              AI-powered engineering CAD tools. Converting 2D drawings to 3D
              models and back — with geometric precision.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase mb-3">
              Product
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="#features"
                  className="text-[13px] text-text-muted hover:text-text-primary transition-colors duration-150"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-[13px] text-text-muted hover:text-text-primary transition-colors duration-150"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[13px] text-text-muted hover:text-text-primary transition-colors duration-150"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[13px] text-text-muted hover:text-text-primary transition-colors duration-150"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase mb-3">
              Company
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="#"
                  className="text-[13px] text-text-muted hover:text-text-primary transition-colors duration-150"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[13px] text-text-muted hover:text-text-primary transition-colors duration-150"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[13px] text-text-muted hover:text-text-primary transition-colors duration-150"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase mb-3">
              Legal
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="#"
                  className="text-[13px] text-text-muted hover:text-text-primary transition-colors duration-150"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[13px] text-text-muted hover:text-text-primary transition-colors duration-150"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase mb-3">
              Connect
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="#"
                  className="text-[13px] text-text-muted hover:text-text-primary transition-colors duration-150"
                >
                  X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[13px] text-text-muted hover:text-text-primary transition-colors duration-150"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[13px] text-text-muted hover:text-text-primary transition-colors duration-150"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border-light flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-text-muted">
            &copy; 2026 The Dimension Company. All rights reserved.
          </p>
          <p className="text-[10px] text-text-muted font-mono">
            ⌖ A &nbsp; ⊥ 0.05 &nbsp; ◎ ⌀0.02 M
          </p>
        </div>
      </div>
    </footer>
  );
}
