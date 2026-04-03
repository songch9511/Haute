export function ObsidianSync() {
  return (
    <section id="sync" className="px-6 py-[100px]">
      <div className="max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <h2
              className="text-[36px] md:text-[60px] font-extrabold leading-[1.2] text-[#f8f8f8] mb-6"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              Sync securely
            </h2>
            <p className="text-[17px] leading-[1.6] text-[#bababa] mb-8">
              End-to-end encrypted synchronization across all your devices.
              Your notes stay private — we can&apos;t read them, even if we wanted to.
            </p>

            <div className="space-y-5">
              {[
                {
                  title: "End-to-end encrypted",
                  desc: "AES-256 encryption. Zero-knowledge architecture.",
                },
                {
                  title: "Version history",
                  desc: "Roll back any note to its state from the past 12 months.",
                },
                {
                  title: "Selective sync",
                  desc: "Choose which vaults and folders sync to each device.",
                },
                {
                  title: "Conflict resolution",
                  desc: "Intelligent merge when edits happen on multiple devices.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div
                    className="w-8 h-8 rounded-md shrink-0 flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: "hsla(254, 80%, 72%, 0.15)" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 8l3 3 5-5" stroke="hsl(254, 80%, 72%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[15px] font-semibold text-[#dadada]">
                      {item.title}
                    </div>
                    <div className="text-[14px] text-[#bababa] leading-[1.5]">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Devices mockup */}
          <div className="relative flex items-center justify-center" style={{ minHeight: "420px" }}>
            {/* Tablet */}
            <div
              className="w-[280px] md:w-[320px] rounded-2xl border p-4 relative z-10"
              style={{
                backgroundColor: "#1e1e1e",
                borderColor: "#363636",
                boxShadow:
                  "0px 1.8px 7.3px rgba(0,0,0,0.07), 0px 6.3px 24.7px rgba(0,0,0,0.11), 0px 30px 90px rgba(0,0,0,0.2)",
              }}
            >
              <div className="rounded-lg overflow-hidden">
                <div className="bg-[#242424] p-4 border-b border-[#363636]">
                  <div className="w-16 h-1.5 rounded-full bg-[#363636] mx-auto" />
                </div>
                <div className="bg-[#1e1e1e] p-4 space-y-3 min-h-[280px]">
                  <div className="text-[13px] font-extrabold text-[#f8f8f8]">Project Meridian</div>
                  <div className="text-[12px] text-[#bababa] leading-[1.6]">
                    Phase 2 kickoff moved to next Wednesday. Updated the timeline
                    and synced changes with the team vault.
                  </div>
                  <div className="flex gap-2 mt-3">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2a2a2a] text-[#bababa]">#project</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2a2a2a] text-[#bababa]">#team</span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#363636]">
                    <div className="text-[11px] text-[#929292]">3 linked notes &middot; synced 2m ago</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div
              className="absolute -bottom-4 -right-2 md:right-0 w-[140px] rounded-2xl border p-4 z-20"
              style={{
                backgroundColor: "#1e1e1e",
                borderColor: "#363636",
                boxShadow:
                  "0px 1.8px 7.3px rgba(0,0,0,0.07), 0px 6.3px 24.7px rgba(0,0,0,0.11), 0px 30px 90px rgba(0,0,0,0.2)",
              }}
            >
              <div className="rounded-lg overflow-hidden">
                <div className="bg-[#242424] p-4 border-b border-[#363636]">
                  <div className="w-10 h-1 rounded-full bg-[#363636] mx-auto" />
                </div>
                <div className="bg-[#1e1e1e] p-4 min-h-[160px]">
                  <div className="text-[10px] font-extrabold text-[#f8f8f8] mb-1">Quick Note</div>
                  <div className="text-[9px] text-[#bababa] leading-[1.5]">
                    Check the connection between distributed cognition and swarm intelligence...
                  </div>
                  <div className="mt-3 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#08b94e]" />
                    <span className="text-[8px] text-[#929292]">Synced</span>
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
