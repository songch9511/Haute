export function ObsidianCTA() {
  return (
    <section
      id="download"
      className="px-6 py-[120px] text-center"
      style={{
        backgroundImage: `radial-gradient(1px 1px at 25% 35%, rgba(255,255,255,0.1) 0%, transparent 100%),
          radial-gradient(1px 1px at 75% 65%, rgba(255,255,255,0.08) 0%, transparent 100%),
          radial-gradient(1.5px 1.5px at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 100%)`,
        backgroundSize: "600px 300px",
        backgroundRepeat: "repeat",
      }}
    >
      <h2
        className="text-[36px] md:text-[60px] font-extrabold leading-[1.2] text-[#f8f8f8] mb-6"
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      >
        Start thinking better
      </h2>
      <p className="text-[18px] md:text-[22px] leading-[1.55] text-[#bababa] max-w-[550px] mx-auto mb-10">
        Available on macOS, Windows, Linux, iOS, and Android. Free to use, no account required.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="#"
          className="inline-flex items-center justify-center min-h-[52px] px-10 py-3.5 rounded-md text-[18px] font-semibold text-white transition-colors duration-150"
          style={{ backgroundColor: "hsl(254, 80%, 60%)" }}
        >
          Download for macOS
        </a>
        <a
          href="#"
          className="inline-flex items-center justify-center min-h-[52px] px-10 py-3.5 rounded-md text-[18px] font-semibold text-[#dadada] border transition-colors duration-150"
          style={{ borderColor: "rgba(255,255,255,0.15)" }}
        >
          Other platforms
        </a>
      </div>

      <p className="mt-6 text-[14px] text-[#929292]">
        v1.7.4 &middot; 127 MB &middot; Requires macOS 12+
      </p>
    </section>
  );
}
