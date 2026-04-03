export function ObsidianHero() {
  return (
    <section
      className="relative pt-[220px] pb-20 md:pb-[80px] text-center px-6"
      style={{
        backgroundImage: `radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 100%),
          radial-gradient(1px 1px at 40% 70%, rgba(255,255,255,0.1) 0%, transparent 100%),
          radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,0.12) 0%, transparent 100%),
          radial-gradient(1px 1px at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 100%),
          radial-gradient(1.5px 1.5px at 10% 60%, rgba(255,255,255,0.15) 0%, transparent 100%),
          radial-gradient(1px 1px at 90% 80%, rgba(255,255,255,0.1) 0%, transparent 100%),
          radial-gradient(1px 1px at 50% 40%, rgba(255,255,255,0.12) 0%, transparent 100%),
          radial-gradient(1.5px 1.5px at 30% 90%, rgba(255,255,255,0.08) 0%, transparent 100%),
          radial-gradient(1px 1px at 70% 10%, rgba(255,255,255,0.14) 0%, transparent 100%),
          radial-gradient(1px 1px at 15% 45%, rgba(255,255,255,0.1) 0%, transparent 100%)`,
        backgroundSize: "800px 400px",
        backgroundPosition: "center 180px",
        backgroundRepeat: "repeat-x",
      }}
    >
      <h1
        className="text-[48px] md:text-[70px] font-extrabold leading-[1.22] text-[#f8f8f8] max-w-[800px] mx-auto"
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      >
        Sharpen your thinking
      </h1>

      <p className="mt-6 text-[18px] md:text-[24px] leading-[1.5] text-[#bababa] max-w-[600px] mx-auto">
        The free and flexible app for your private thoughts.
        Write, link, and organize — your way.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="#download"
          className="inline-flex items-center justify-center min-h-[52px] px-10 py-3.5 rounded-md text-[18px] font-semibold text-white transition-colors duration-150"
          style={{ backgroundColor: "hsl(254, 80%, 60%)" }}
        >
          Download for free
        </a>
        <a
          href="#features"
          className="inline-flex items-center justify-center min-h-[52px] px-10 py-3.5 rounded-md text-[18px] font-semibold text-[#dadada] border transition-colors duration-150"
          style={{ borderColor: "rgba(255,255,255,0.15)" }}
        >
          See what&apos;s new
        </a>
      </div>

      {/* Screenshot mockup */}
      <div className="mt-16 mx-auto max-w-[1000px] px-4">
        <div
          className="rounded-xl overflow-hidden border transition-[border-color] duration-250 ease-in-out"
          style={{
            borderColor: "#363636",
            boxShadow:
              "0px 1.8px 7.3px rgba(0,0,0,0.07), 0px 6.3px 24.7px rgba(0,0,0,0.11), 0px 30px 90px rgba(0,0,0,0.2)",
          }}
        >
          {/* Fake editor window */}
          <div className="bg-[#242424] p-4 flex items-center gap-2 border-b border-[#363636]">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#fb464c]/80" />
              <span className="w-3 h-3 rounded-full bg-[#e0ac00]/80" />
              <span className="w-3 h-3 rounded-full bg-[#08b94e]/80" />
            </div>
            <div className="flex-1 text-center text-[13px] text-[#929292]">
              Prism — Daily Notes
            </div>
          </div>
          <div className="bg-[#1e1e1e] flex min-h-[400px] md:min-h-[500px]">
            {/* Sidebar */}
            <div className="hidden md:block w-[220px] border-r border-[#363636] p-4">
              <div className="text-[11px] uppercase tracking-wider text-[#929292] mb-3 font-semibold">
                Vault
              </div>
              {[
                { name: "Daily Notes", active: true },
                { name: "Projects", active: false },
                { name: "Research", active: false },
                { name: "Templates", active: false },
                { name: "Archive", active: false },
              ].map((item) => (
                <div
                  key={item.name}
                  className={`text-[14px] py-1.5 px-2 rounded ${
                    item.active
                      ? "text-[#dadada] bg-[#2a2a2a]"
                      : "text-[#bababa]"
                  }`}
                >
                  {item.name}
                </div>
              ))}
              <div className="mt-6 text-[11px] uppercase tracking-wider text-[#929292] mb-3 font-semibold">
                Tags
              </div>
              {["#philosophy", "#projects", "#ideas", "#reading"].map((tag) => (
                <div key={tag} className="text-[13px] py-1 px-2 text-[hsl(254, 80%, 72%)]">
                  {tag}
                </div>
              ))}
            </div>
            {/* Editor area */}
            <div className="flex-1 p-6 md:p-10">
              <h2
                className="text-[28px] md:text-[32px] font-extrabold leading-[1.15] text-[#f8f8f8] mb-4"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                April 3, 2026
              </h2>
              <div className="space-y-3 text-[15px] leading-[1.7] text-[#bababa]">
                <p>
                  Finished reading Descartes&apos; <em className="text-[#dadada]">Meditations</em>.
                  The radical doubt method connects to the epistemology notes from last week
                  — linked to{" "}
                  <span className="text-[hsl(254, 80%, 72%)]">[[Epistemology Foundations]]</span>.
                </p>
                <p>
                  Meeting with the research team at 14:00. Need to prepare the literature
                  review outline. Cross-referencing with{" "}
                  <span className="text-[hsl(254, 80%, 72%)]">[[Project Meridian]]</span>{" "}
                  and{" "}
                  <span className="text-[hsl(254, 80%, 72%)]">[[Q2 Research Goals]]</span>.
                </p>
                <p className="text-[#929292]">
                  — 3 backlinks &middot; last edited 09:41
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
