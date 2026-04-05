"use client";

export function SolaHero() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      {/* Product-still-life background — warm cream ethereal minimal */}
      <img
        src="/sola/hero-product.jpg"
        alt="Sola Body Lotion tube resting on soft white linen — minimal still life"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Warm ambient veil — preserves image warmth, ensures text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(44,36,32,0.15) 0%, rgba(44,36,32,0.05) 30%, rgba(44,36,32,0.35) 70%, rgba(44,36,32,0.65) 100%)",
        }}
      />

      {/* Content — editorial folio structure */}
      <div className="relative z-10 flex min-h-[100dvh] flex-col items-start justify-end px-6 pb-20 lg:px-16 lg:pb-28">
        <div className="max-w-2xl animate-[fadeUp_0.8s_cubic-bezier(0.22,1,0.36,1)_both]">
          <p
            className="mb-4 text-[11px] font-medium uppercase tracking-[0.24em]"
            style={{ color: "rgba(250, 246, 240, 0.75)" }}
          >
            Est. 2024 · Thoughtful Skincare
          </p>
          <h1
            className="font-light leading-[0.92] tracking-[-0.025em]"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 10rem)",
              color: "#faf6f0",
              fontFamily: "Outfit, var(--font-geist-sans), sans-serif",
              textShadow: "0 2px 30px rgba(44,36,32,0.45)",
            }}
          >
            Nothing
            <br />
            extra.
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 300, color: "#f5d5b5" }}>
              Everything
              <br />
              essential.
            </span>
          </h1>
          <p
            className="mt-6 max-w-md text-base leading-relaxed lg:text-[17px]"
            style={{
              color: "rgba(250, 246, 240, 0.88)",
              textShadow: "0 1px 12px rgba(44,36,32,0.45)",
            }}
          >
            Formulas stripped to what your skin actually needs. Botanical actives, zero filler, fully transparent sourcing.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="#products"
              className="rounded-full px-7 py-3.5 text-sm font-medium transition-transform duration-150 hover:-translate-y-0.5"
              style={{
                backgroundColor: "#faf6f0",
                color: "#2c2420",
                fontFamily: "Outfit, var(--font-geist-sans), sans-serif",
              }}
            >
              Shop the Essentials
            </a>
            <a
              href="#philosophy"
              className="text-sm font-medium"
              style={{
                color: "rgba(250, 246, 240, 0.85)",
                borderBottom: "1px solid rgba(250, 246, 240, 0.4)",
                paddingBottom: "2px",
              }}
            >
              Read our philosophy →
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
