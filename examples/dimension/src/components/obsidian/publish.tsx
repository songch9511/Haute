export function ObsidianPublish() {
  return (
    <section id="publish" className="px-6 py-[100px]">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-14">
          <h2
            className="text-[36px] md:text-[60px] font-extrabold leading-[1.2] text-[#f8f8f8] mb-6"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            Publish instantly
          </h2>
          <p className="text-[18px] md:text-[22px] leading-[1.55] text-[#bababa] max-w-[650px] mx-auto">
            Turn any note into a beautiful website. Digital gardens, documentation,
            wikis — published with a single click.
          </p>
        </div>

        {/* Published site mockup */}
        <div
          className="rounded-xl border overflow-hidden"
          style={{
            borderColor: "#363636",
            boxShadow:
              "0px 1.8px 7.3px rgba(0,0,0,0.07), 0px 6.3px 24.7px rgba(0,0,0,0.11), 0px 30px 90px rgba(0,0,0,0.2)",
          }}
        >
          {/* Browser chrome */}
          <div className="bg-[#242424] px-4 py-3 flex items-center gap-3 border-b border-[#363636]">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#fb464c]/80" />
              <span className="w-3 h-3 rounded-full bg-[#e0ac00]/80" />
              <span className="w-3 h-3 rounded-full bg-[#08b94e]/80" />
            </div>
            <div
              className="flex-1 max-w-[400px] mx-auto bg-[#1e1e1e] rounded-md px-4 py-1.5 text-[13px] text-[#929292] text-center"
            >
              publish.prism.md/research-notes
            </div>
          </div>

          {/* Site content */}
          <div className="bg-[#1e1e1e] flex min-h-[400px]">
            {/* Sidebar nav */}
            <div className="hidden md:block w-[220px] border-r border-[#363636] p-5">
              <div className="text-[13px] font-semibold text-[#dadada] mb-4">Research Notes</div>
              <div className="space-y-0.5">
                {[
                  { name: "Getting Started", active: false },
                  { name: "Philosophy of Mind", active: true },
                  { name: "Epistemology", active: false },
                  { name: "Logic & Formal Systems", active: false },
                  { name: "Reading List", active: false },
                  { name: "Glossary", active: false },
                ].map((item) => (
                  <div
                    key={item.name}
                    className={`text-[13px] py-1.5 px-2.5 rounded ${
                      item.active
                        ? "text-[#dadada] bg-[#2a2a2a]"
                        : "text-[#929292]"
                    }`}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Page content */}
            <div className="flex-1 p-8 md:p-12 max-w-[720px]">
              <div className="text-[11px] uppercase tracking-wider text-[#929292] mb-4">
                Research Notes / Philosophy
              </div>
              <h1
                className="text-[28px] md:text-[36px] font-extrabold text-[#f8f8f8] mb-6 leading-[1.2]"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                Philosophy of Mind
              </h1>
              <div className="space-y-4 text-[15px] leading-[1.7] text-[#bababa]">
                <p>
                  The study of the nature of mind, mental events, mental functions,
                  consciousness, and their relationship to the physical body.
                </p>
                <p>
                  Central questions include the <span className="text-[hsl(254, 80%, 72%)]">mind-body problem</span>,
                  the nature of <span className="text-[hsl(254, 80%, 72%)]">consciousness</span>,
                  and whether artificial systems can possess genuine understanding.
                </p>
                <div className="mt-6 p-4 rounded-lg bg-[#242424] border border-[#363636]">
                  <div className="text-[12px] uppercase tracking-wider text-[#929292] mb-2 font-semibold">
                    Linked Notes
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Descartes", "Consciousness", "Chinese Room", "Qualia", "Functionalism"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="text-[12px] px-2.5 py-1 rounded-md bg-[#2a2a2a] text-[hsl(254, 80%, 72%)]"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
