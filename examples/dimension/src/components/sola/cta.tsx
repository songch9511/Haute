export function SolaCta() {
  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-2"
      style={{ minHeight: "560px" }}
    >
      {/* Left — warm accent CTA block */}
      <div
        className="flex flex-col justify-center px-6 py-24 lg:px-16"
        style={{ backgroundColor: "#b5704f" }}
      >
        <p
          className="mb-6 text-[11px] font-medium uppercase tracking-[0.24em]"
          style={{ color: "rgba(250, 246, 240, 0.65)" }}
        >
          N° 05 · The Starter Set
        </p>
        <h2
          className="max-w-md text-4xl font-light leading-[0.98] tracking-[-0.015em] lg:text-[64px]"
          style={{
            fontFamily: "Outfit, var(--font-geist-sans), sans-serif",
            color: "#faf6f0",
          }}
        >
          Start with
          <br />
          <span style={{ fontStyle: "italic", fontWeight: 300 }}>
            the essentials.
          </span>
        </h2>
        <p
          className="mt-6 max-w-sm text-base leading-relaxed lg:text-[17px]"
          style={{ color: "rgba(250, 246, 240, 0.85)" }}
        >
          Clarity Serum + Barrier Cream at twenty percent off. Free shipping on every order. Thirty-day returns, no questions.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <a
            href="#products"
            className="inline-block rounded-full px-7 py-3.5 text-sm font-medium transition-transform duration-150 hover:-translate-y-0.5"
            style={{
              backgroundColor: "#faf6f0",
              color: "#2c2420",
              fontFamily: "Outfit, var(--font-geist-sans), sans-serif",
            }}
          >
            Get the Starter Set — $72
          </a>
          <span
            className="text-[11px] uppercase tracking-[0.2em]"
            style={{ color: "rgba(250, 246, 240, 0.65)" }}
          >
            Normally $100 · Save $28
          </span>
        </div>
      </div>

      {/* Right — contextual vanity photograph */}
      <div className="relative overflow-hidden">
        <img
          src="/sola/cta-vanity.jpg"
          alt="Minimal bathroom vanity with natural light and botanical plants — at-home ritual"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
