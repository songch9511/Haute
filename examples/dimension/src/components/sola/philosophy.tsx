export function SolaPhilosophy() {
  return (
    <section
      id="philosophy"
      className="px-6 py-28 lg:px-16 lg:py-36"
      style={{ backgroundColor: "#faf6f0" }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Eyebrow */}
        <div className="mb-10 flex items-baseline justify-between">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.24em]"
            style={{ color: "#b5704f" }}
          >
            N° 01 · Philosophy
          </p>
          <p
            className="hidden text-[11px] font-medium uppercase tracking-[0.24em] md:block"
            style={{ color: "#8a7a6e" }}
          >
            Fewer ingredients, higher standards
          </p>
        </div>

        {/* Headline — takes the full width, asymmetric hang on left */}
        <h2
          className="mb-12 max-w-4xl text-4xl font-light leading-[0.98] tracking-[-0.02em] lg:text-[84px]"
          style={{
            fontFamily: "Outfit, var(--font-geist-sans), sans-serif",
            color: "#2c2420",
          }}
        >
          Your skin doesn&apos;t need
          <br />
          <span style={{ fontStyle: "italic", fontWeight: 300, color: "#b5704f" }}>
            twelve steps.
          </span>
        </h2>

        {/* Body + stats — 12-col asymmetric layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6 lg:col-start-2">
            <p
              className="text-base leading-[1.75] lg:text-[17px]"
              style={{ color: "#5a4f47" }}
            >
              We started Sola because skincare became noise. Dozens of products, hundreds
              of ingredients, endless routines. We went back to the science and found that
              skin thrives with less — fewer ingredients at higher concentrations,
              fragrance-free, peer-reviewed only. Every formula has a maximum of nine
              actives. If an ingredient doesn&apos;t have clinical evidence, it never
              makes it into the bottle.
            </p>
          </div>

          {/* Stats — 3 vertical strips */}
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="flex flex-col divide-y" style={{ borderColor: "#e8dfd3" }}>
              {[
                { num: "9", label: "Max actives per formula" },
                { num: "0", label: "Synthetic fragrances" },
                { num: "100%", label: "Sourcing transparency" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="flex items-baseline gap-5 py-5"
                  style={{ borderTop: i === 0 ? "1px solid #e8dfd3" : "none" }}
                >
                  <span
                    className="text-4xl font-light tabular-nums lg:text-5xl"
                    style={{
                      color: "#b5704f",
                      fontFamily: "Outfit, var(--font-geist-sans), sans-serif",
                      minWidth: "80px",
                    }}
                  >
                    {s.num}
                  </span>
                  <p
                    className="text-sm leading-snug"
                    style={{ color: "#5a4f47" }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
