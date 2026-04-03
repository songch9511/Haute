"use client";

const logos = [
  "Figma",
  "Stripe",
  "Vercel",
  "Linear",
  "Ramp",
  "Loom",
  "Mercury",
  "Datadog",
];

function LogoRow() {
  return (
    <div
      className="inline-flex items-center"
      style={{ gap: 48 }}
      aria-hidden="true"
    >
      {logos.map((name) => (
        <span
          key={name}
          className="font-bold whitespace-nowrap select-none"
          style={{
            fontSize: 18,
            color: "rgba(0,0,0,0.35)",
            letterSpacing: "0.04em",
            fontFamily: "var(--font-inter)",
          }}
        >
          {name}
        </span>
      ))}
    </div>
  );
}

export default function LogoWall() {
  return (
    <section
      className="py-16 overflow-hidden"
      style={{
        borderTop: "1px solid rgba(0,0,0,0.06)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        backgroundColor: "#ffffff",
      }}
    >
      <p
        className="text-center font-medium mb-8"
        style={{
          fontSize: 14,
          color: "rgba(0,0,0,0.4)",
          fontFamily: "var(--font-outfit)",
        }}
      >
        Trusted by teams at
      </p>

      <div className="relative">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: 120,
            background: "linear-gradient(to right, #ffffff 0%, transparent 100%)",
          }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: 120,
            background: "linear-gradient(to left, #ffffff 0%, transparent 100%)",
          }}
        />

        {/* Scrolling track */}
        <div
          className="flex"
          style={{
            animation: "logo-scroll 30s linear infinite",
            width: "fit-content",
            gap: 48,
          }}
        >
          <LogoRow />
          <LogoRow />
          <LogoRow />
          <LogoRow />
        </div>
      </div>

      <style jsx>{`
        @keyframes logo-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
