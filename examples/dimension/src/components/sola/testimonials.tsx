const testimonials = [
  {
    quote: "I stopped my 8-step routine and switched to Sola's serum + cream. My skin has never been calmer.",
    author: "Mina Park",
    detail: "Combination skin, 6 months with Sola",
  },
  {
    quote: "The Botanical Oil absorbed instantly — no residue, no fragrance, just soft skin by morning.",
    author: "Ava Richardson",
    detail: "Dry skin, 3 months with Sola",
  },
  {
    quote: "Finally a brand that lists concentrations upfront. I know exactly what I'm putting on my face.",
    author: "Leila Khoury",
    detail: "Sensitive skin, 4 months with Sola",
  },
];

export function SolaTestimonials() {
  return (
    <section className="px-6 py-24 lg:px-16" style={{ backgroundColor: "#f5ede4" }}>
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em]" style={{ color: "#b5704f" }}>
          Community
        </p>

        {/* Featured pull-quote */}
        <blockquote className="mb-16">
          <p className="max-w-2xl text-2xl font-medium leading-snug lg:text-4xl" style={{ fontFamily: "Outfit, var(--font-geist-sans)", color: "#2c2420" }}>
            &ldquo;{testimonials[0].quote}&rdquo;
          </p>
          <footer className="mt-6">
            <span className="text-sm font-medium" style={{ color: "#2c2420" }}>{testimonials[0].author}</span>
            <span className="ml-2 text-sm" style={{ color: "#8a7a6e" }}>— {testimonials[0].detail}</span>
          </footer>
        </blockquote>

        {/* Supporting quotes — 2-col */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonials.slice(1).map((t) => (
            <div key={t.author} className="rounded-2xl p-6" style={{ backgroundColor: "#faf6f0" }}>
              <p className="text-base leading-relaxed" style={{ color: "#2c2420" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-4">
                <span className="text-sm font-medium" style={{ color: "#2c2420" }}>{t.author}</span>
                <span className="ml-2 text-xs" style={{ color: "#8a7a6e" }}>— {t.detail}</span>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
