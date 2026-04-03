import { InteractiveGraph } from "./graph";

export function ObsidianFeatures() {
  return (
    <section id="features" className="px-6 py-[100px]">
      <div className="max-w-[1000px] mx-auto">
        {/* Feature 1: Linked Thinking */}
        <div className="text-center mb-20">
          <h2
            className="text-[36px] md:text-[60px] font-extrabold leading-[1.2] text-[#f8f8f8] mb-6"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            A second brain that{" "}
            <span
              className="font-extrabold"
              style={{
                background: "linear-gradient(135deg, #1A6DFF, #C822FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                opacity: 0.85,
              }}
            >
              thinks with you
            </span>
          </h2>
          <p className="text-[18px] md:text-[22px] leading-[1.55] text-[#bababa] max-w-[700px] mx-auto">
            Link ideas, discover connections, and build understanding over time.
            Your notes aren&apos;t files — they&apos;re neurons.
          </p>
        </div>

        {/* Interactive Graph */}
        <InteractiveGraph />

        {/* Feature 2: Writing Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-24">
          <div>
            <h3
              className="text-[28px] md:text-[46px] font-extrabold leading-[1.2] text-[#f8f8f8] mb-5"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              Write with telepathy
            </h3>
            <p className="text-[17px] leading-[1.6] text-[#bababa] mb-6">
              Start typing and watch your thoughts take shape. Markdown-native
              editing with live preview, slash commands, and hundreds of plugins
              to mold the editor to your workflow.
            </p>
            <ul className="space-y-3">
              {[
                "Live preview with no mode switching",
                "Slash commands for quick formatting",
                "Vim keybindings for power users",
                "Custom CSS themes and snippets",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-[#bababa]">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[hsl(254, 80%, 72%)] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="rounded-xl border p-6"
            style={{
              backgroundColor: "#242424",
              borderColor: "#363636",
              boxShadow:
                "0px 1px 2px rgba(0,0,0,0.12), 0px 3.4px 6.7px rgba(0,0,0,0.18), 0px 15px 30px rgba(0,0,0,0.3)",
            }}
          >
            <div className="space-y-2 text-[14px] leading-[1.7] font-mono">
              <p className="text-[#929292]">## Research Notes</p>
              <p className="text-[#dadada]">
                The connection between <span className="text-[hsl(254, 80%, 72%)]">[[rationalism]]</span> and
                modern AI architectures is worth exploring deeper.
              </p>
              <p className="text-[#dadada]">
                Key insight: both rely on{" "}
                <span className="font-semibold text-[#f8f8f8]">structured decomposition</span>{" "}
                of complex problems.
              </p>
              <p className="text-[#929292]">
                - [ ] Review Leibniz&apos;s calculus ratiocinator
              </p>
              <p className="text-[#929292]">
                - [x] Link to <span className="text-[hsl(254, 80%, 72%)]">[[Formal Systems]]</span>
              </p>
              <p className="text-[#929292]">
                &gt; &quot;The art of discovering causes of phenomena&quot; — Leibniz
              </p>
            </div>
          </div>
        </div>

        {/* Feature 3: Canvas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="order-2 md:order-1">
            <div
              className="rounded-xl border p-6 relative overflow-hidden"
              style={{
                backgroundColor: "#242424",
                borderColor: "#363636",
                minHeight: "320px",
                boxShadow:
                  "0px 1px 2px rgba(0,0,0,0.12), 0px 3.4px 6.7px rgba(0,0,0,0.18), 0px 15px 30px rgba(0,0,0,0.3)",
              }}
            >
              {/* Canvas dots background */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: "radial-gradient(circle, #929292 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              {/* Canvas cards */}
              <div
                className="absolute top-8 left-6 w-[180px] rounded-lg border p-4 z-10"
                style={{ backgroundColor: "#1e1e1e", borderColor: "#363636" }}
              >
                <div className="text-[12px] font-semibold text-[#dadada] mb-1">Project Meridian</div>
                <div className="text-[11px] text-[#929292]">Timeline, milestones, and research links</div>
              </div>
              <div
                className="absolute top-6 right-8 w-[160px] rounded-lg border p-4 z-10"
                style={{ backgroundColor: "#1e1e1e", borderColor: "#363636" }}
              >
                <div className="text-[12px] font-semibold text-[#dadada] mb-1">Literature Review</div>
                <div className="text-[11px] text-[#929292]">42 sources, 8 themes</div>
              </div>
              <div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[200px] rounded-lg border p-4 z-10"
                style={{ backgroundColor: "#1e1e1e", borderColor: "hsl(254, 80%, 72%)", borderWidth: "1px" }}
              >
                <div className="text-[12px] font-semibold text-[hsl(254, 80%, 72%)] mb-1">Key Insight</div>
                <div className="text-[11px] text-[#bababa]">
                  Structured memory trees outperform flat file systems by 3.7x on recall tasks
                </div>
              </div>
              {/* Connection lines — behind cards */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <line x1="30%" y1="35%" x2="50%" y2="75%" stroke="hsl(254, 80%, 72%)" strokeOpacity="0.3" strokeWidth="1" />
                <line x1="70%" y1="30%" x2="50%" y2="75%" stroke="hsl(254, 80%, 72%)" strokeOpacity="0.3" strokeWidth="1" />
              </svg>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h3
              className="text-[28px] md:text-[46px] font-extrabold leading-[1.2] text-[#f8f8f8] mb-5"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              Spark ideas on canvas
            </h3>
            <p className="text-[17px] leading-[1.6] text-[#bababa] mb-6">
              Arrange notes, images, and connections on an infinite spatial canvas.
              Plan projects, map relationships, and see the bigger picture — literally.
            </p>
            <ul className="space-y-3">
              {[
                "Drag and drop notes onto the canvas",
                "Draw connections between ideas",
                "Embed live note previews",
                "Group and color-code related concepts",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-[#bababa]">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[hsl(254, 80%, 72%)] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
