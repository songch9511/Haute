"use client";

const products = [
  {
    name: "Clarity Serum",
    actives: "Niacinamide 10% · Zinc PCA",
    description: "Targets texture and excess oil without stripping the barrier.",
    price: "$48",
    image: "/sola/product-serum.jpg",
    span: "lg:col-span-7",
    aspect: "5/4",
  },
  {
    name: "Barrier Cream",
    actives: "Ceramide NP · Squalane",
    description: "Repairs the lipid barrier. Locks in moisture overnight.",
    price: "$52",
    image: "/sola/product-cream.jpg",
    span: "lg:col-span-5",
    aspect: "4/5",
  },
  {
    name: "Clay Cleanser",
    actives: "Kaolin Clay · Oat Extract",
    description: "Gentle daily cleanse. pH-balanced. Respects the microbiome.",
    price: "$32",
    image: "/sola/product-cleanser.jpg",
    span: "lg:col-span-12",
    aspect: "16/7",
  },
];

export function SolaProducts() {
  return (
    <section
      id="products"
      className="px-6 py-28 lg:px-16 lg:py-36"
      style={{ backgroundColor: "#f5ede4" }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Eyebrow header */}
        <div className="mb-12 flex items-baseline justify-between">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.24em]"
            style={{ color: "#b5704f" }}
          >
            N° 02 · Essentials
          </p>
          <p
            className="hidden text-[11px] font-medium uppercase tracking-[0.24em] md:block"
            style={{ color: "#8a7a6e" }}
          >
            Three formulas. Nothing more.
          </p>
        </div>

        <h2
          className="mb-14 text-4xl font-light leading-[0.98] tracking-[-0.02em] lg:text-[84px]"
          style={{
            fontFamily: "Outfit, var(--font-geist-sans), sans-serif",
            color: "#2c2420",
          }}
        >
          Three essentials.
          <br />
          <span style={{ fontStyle: "italic", fontWeight: 300, color: "#b5704f" }}>
            That&apos;s it.
          </span>
        </h2>

        {/* 7+5 top row, then full-width cleanser bottom */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          {products.map((p, i) => (
            <article
              key={p.name}
              className={`${p.span} group animate-[fadeUp_0.55s_cubic-bezier(0.22,1,0.36,1)_both] overflow-hidden rounded-[4px]`}
              style={{
                backgroundColor: "#faf6f0",
                animationDelay: `${i * 0.08}s`,
              }}
            >
              <div className="overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.02]"
                  style={{ aspectRatio: p.aspect }}
                />
              </div>
              <div className="px-6 py-6 lg:px-8 lg:py-7">
                <div className="flex items-baseline justify-between">
                  <h3
                    className="text-[22px] font-light tracking-tight lg:text-[26px]"
                    style={{
                      fontFamily: "Outfit, var(--font-geist-sans), sans-serif",
                      color: "#2c2420",
                    }}
                  >
                    {p.name}
                  </h3>
                  <span
                    className="text-base font-medium tabular-nums"
                    style={{ color: "#b5704f" }}
                  >
                    {p.price}
                  </span>
                </div>
                <p
                  className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.18em]"
                  style={{ color: "#b5704f" }}
                >
                  {p.actives}
                </p>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "#5a4f47" }}
                >
                  {p.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0.01; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
