export function ShowcaseFooter() {
  return (
    <footer className="py-16 px-8 border-t border-[var(--border)]">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-[0.8125rem] text-[var(--text-tertiary)]">
          Atelier Design Studio &middot; San Francisco
        </div>
        <ul className="flex gap-6 list-none flex-wrap justify-center">
          {["Twitter", "Dribbble", "GitHub", "LinkedIn"].map((link) => (
            <li key={link}>
              <a
                href="#"
                className="text-[0.8125rem] text-[var(--text-tertiary)] no-underline hover:text-[var(--text-secondary)] transition-colors duration-150 min-h-[44px] inline-flex items-center"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
