export function SolaLifestyle() {
  return (
    <section
      className="relative overflow-hidden px-6 py-32 lg:px-16 lg:py-44"
      style={{ backgroundColor: "#b5704f" }}
    >
      {/* Subtle texture via layered radial gradients — warm paper-like */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 30%, rgba(250,246,240,0.4) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(44,36,32,0.3) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <p
          className="mb-10 text-[11px] font-medium uppercase tracking-[0.24em]"
          style={{ color: "rgba(250, 246, 240, 0.65)" }}
        >
          N° 03 · A guiding principle
        </p>

        <blockquote className="max-w-5xl">
          <p
            className="font-light leading-[0.95] tracking-[-0.025em]"
            style={{
              fontSize: "clamp(3.5rem, 8.5vw, 9rem)",
              color: "#faf6f0",
              fontFamily: "Outfit, var(--font-geist-sans), sans-serif",
            }}
          >
            Skin that feels
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 300 }}>
              like yours again.
            </span>
          </p>

          <footer className="mt-16 flex items-baseline gap-8 lg:mt-20">
            <span
              className="h-px w-24"
              style={{ backgroundColor: "rgba(250, 246, 240, 0.5)" }}
            />
            <div>
              <p
                className="text-sm font-medium lg:text-base"
                style={{ color: "rgba(250, 246, 240, 0.92)" }}
              >
                The brief, written in 2024
              </p>
              <p
                className="mt-1.5 text-[11px] uppercase tracking-[0.22em]"
                style={{ color: "rgba(250, 246, 240, 0.6)" }}
              >
                Every formula still answers to it
              </p>
            </div>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
