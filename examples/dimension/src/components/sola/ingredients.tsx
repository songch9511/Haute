"use client";

const ingredients = [
  {
    name: "Niacinamide",
    concentration: "10%",
    note: "Vitamin B3. Reduces pore appearance and evens tone over four weeks of daily use.",
    role: "Active",
  },
  {
    name: "Squalane",
    concentration: "Plant-derived",
    note: "Mirrors skin's natural sebum. Non-comedogenic. Absorbs in under thirty seconds.",
    role: "Emollient",
  },
  {
    name: "Ceramide NP",
    concentration: "2%",
    note: "Clinically shown to reduce transepidermal water loss by twenty-four percent in fourteen days.",
    role: "Lipid barrier",
  },
  {
    name: "Jojoba Oil",
    concentration: "Cold-pressed",
    note: "Closest plant oil to human sebum. Stable. Shelf-life without synthetic preservatives.",
    role: "Carrier",
  },
  {
    name: "Kaolin Clay",
    concentration: "French white",
    note: "Draws impurities without over-drying. pH-neutral. Safe for daily use on sensitive skin.",
    role: "Exfoliant",
  },
];

export function SolaIngredients() {
  return (
    <section
      id="ingredients"
      className="py-28 lg:py-36"
      style={{ backgroundColor: "#faf6f0" }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-16">
        <div className="mb-12 flex items-baseline justify-between">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.24em]"
            style={{ color: "#b5704f" }}
          >
            N° 04 · Ingredients
          </p>
          <p
            className="hidden text-[11px] font-medium uppercase tracking-[0.24em] md:block"
            style={{ color: "#8a7a6e" }}
          >
            Every item earns its place
          </p>
        </div>

        <h2
          className="mb-14 text-4xl font-light leading-[0.98] tracking-[-0.02em] lg:text-[72px]"
          style={{
            fontFamily: "Outfit, var(--font-geist-sans), sans-serif",
            color: "#2c2420",
          }}
        >
          Nine actives, maximum.
          <br />
          <span style={{ fontStyle: "italic", fontWeight: 300, color: "#b5704f" }}>
            Peer-reviewed only.
          </span>
        </h2>
      </div>

      {/* Horizontal editorial register — cards are text-only, no image roulette */}
      <div className="mx-auto max-w-[1360px] overflow-x-auto scroll-pl-6 lg:scroll-pl-16">
        <div className="flex gap-0 items-start justify-start md:justify-center px-6 lg:px-16">
          {ingredients.map((ing, i) => (
            <article
              key={ing.name}
              className="w-[250px] md:w-[260px] shrink-0 flex flex-col border-l pl-6 pr-6 animate-[fadeUp_0.5s_cubic-bezier(0.22,1,0.36,1)_both]"
              style={{
                borderColor: "#d8c9b3",
                animationDelay: `${i * 0.08}s`,
              }}
            >
              <div className="flex items-baseline justify-between mb-6">
                <span
                  className="text-[10px] font-medium uppercase tracking-[0.24em]"
                  style={{ color: "#b5704f" }}
                >
                  {ing.role}
                </span>
                <span
                  className="text-[10px] font-medium uppercase tracking-[0.18em]"
                  style={{ color: "#a8927e" }}
                >
                  {ing.concentration}
                </span>
              </div>
              <h3
                className="text-[28px] md:text-[32px] font-light leading-[0.96] tracking-[-0.015em]"
                style={{
                  fontFamily: "Outfit, var(--font-geist-sans), sans-serif",
                  color: "#2c2420",
                }}
              >
                {ing.name}
              </h3>
              <p
                className="mt-5 text-sm leading-[1.65]"
                style={{ color: "#5a4f47" }}
              >
                {ing.note}
              </p>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0.01; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
