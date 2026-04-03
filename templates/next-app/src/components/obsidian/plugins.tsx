function DataviewMock() {
  return (
    <div className="mt-4 flex-1 rounded-lg p-4 font-mono text-[12px] leading-[1.7] bg-[#1a1a1a] border border-[#2a2a2a] overflow-hidden flex flex-col justify-center">
      <div className="text-[#929292]">{"```dataview"}</div>
      <div className="text-[hsl(254,80%,72%)]">TABLE</div>
      <div className="text-[#dadada]">{"  file.name AS \"Note\","}</div>
      <div className="text-[#dadada]">{"  file.mtime AS \"Modified\","}</div>
      <div className="text-[#dadada]">{"  length(file.inlinks) AS \"Links\""}</div>
      <div className="text-[hsl(254,80%,72%)]">FROM <span className="text-[#dadada]">#philosophy</span></div>
      <div className="text-[hsl(254,80%,72%)]">WHERE <span className="text-[#dadada]">file.mtime &gt;= date(today) - dur(7d)</span></div>
      <div className="text-[hsl(254,80%,72%)]">SORT <span className="text-[#dadada]">file.mtime DESC</span></div>
      <div className="text-[hsl(254,80%,72%)]">LIMIT <span className="text-[#dadada]">15</span></div>
      <div className="text-[#929292]">{"```"}</div>
    </div>
  );
}

function ExcalidrawMock() {
  return (
    <div className="mt-auto pt-4 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] p-4 overflow-hidden h-[72px] relative">
      <svg viewBox="0 0 400 50" fill="none" className="w-full h-full opacity-50">
        <path d="M20 8 L100 6 L102 42 L18 44 Z" stroke="#929292" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <text x="35" y="30" fill="#929292" fontSize="10" fontFamily="sans-serif">Idea A</text>
        <path d="M108 25 L155 25" stroke="#929292" strokeWidth="1.5" />
        <path d="M150 20 L157 25 L150 30" stroke="#929292" strokeWidth="1.5" fill="none" />
        <ellipse cx="205" cy="25" rx="38" ry="20" stroke="hsl(254,80%,72%)" strokeWidth="1.5" fill="none" strokeOpacity="0.6" />
        <text x="188" y="29" fill="hsl(254,80%,72%)" fontSize="10" fontFamily="sans-serif" fillOpacity="0.8">Idea B</text>
        <path d="M245 25 L290 25" stroke="#929292" strokeWidth="1.5" />
        <path d="M285 20 L292 25 L285 30" stroke="#929292" strokeWidth="1.5" fill="none" />
        <path d="M300 5 L380 5 L380 45 L300 45 Z" stroke="#929292" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
        <text x="315" y="29" fill="#929292" fontSize="10" fontFamily="sans-serif">Result</text>
      </svg>
    </div>
  );
}

function KanbanMock() {
  return (
    <div className="mt-auto pt-4 flex gap-2 overflow-hidden">
      {[
        { title: "To Do", items: ["Research", "Draft"] },
        { title: "Doing", items: ["Review"] },
        { title: "Done", items: ["Outline", "Notes"] },
      ].map((col) => (
        <div key={col.title} className="flex-1 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] p-2 min-w-0">
          <div className="text-[9px] font-semibold text-[#929292] uppercase tracking-wider mb-1.5">{col.title}</div>
          {col.items.map((item) => (
            <div key={item} className="text-[10px] text-[#bababa] bg-[#242424] rounded px-1.5 py-1 mb-1 truncate">{item}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function ObsidianPlugins() {
  return (
    <section id="plugins" className="px-6 py-[100px]">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-[36px] md:text-[60px] font-extrabold leading-[1.2] text-[#f8f8f8] mb-6"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            Extend everything
          </h2>
          <p className="text-[18px] md:text-[22px] leading-[1.55] text-[#bababa] max-w-[600px] mx-auto">
            Over 1,700 community plugins. From task management to AI integration — make it yours.
          </p>
        </div>

        {/*
          Bento grid — explicit placement, no gaps.
          Desktop (md+): 4 columns x 3 rows
          ┌───────────┬───────┬───────┐
          │ Dataview   │ Templ │ Calen │
          │ (2×2)      ├───────┼───────┤
          │            │ Tasks │Kanban │
          ├────────────┴───────┼───────┤
          │ Excalidraw (3×1)   │       │
          └────────────────────┘       │
          ... actually let's do:
          ┌──────────┬─────┬─────┐
          │Dataview  │Templ│Calen│
          │(2c×2r)   ├─────┴─────┤
          │          │ Kanban    │
          │          │ (2c×1r)   │
          ├──────┬───┴───┬───────┤
          │Tasks │Excali │       │
          │(1c)  │draw   │ +1700 │
          │      │(2c)   │ more  │
          └──────┴───────┴───────┘
        */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4" style={{ gridAutoRows: "auto" }}>

          {/* 1. Dataview — 2col × 2row, top-left */}
          <div
            className="md:col-span-2 md:row-span-2 rounded-xl border p-6 flex flex-col transition-[border-color] duration-150 hover:border-[#4a4a4a]"
            style={{ backgroundColor: "#242424", borderColor: "#363636", boxShadow: "0px 1px 1px 1px rgba(0,0,0,0.5)" }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[18px] font-extrabold text-white" style={{ backgroundColor: "hsl(254, 80%, 60%)" }}>D</div>
              <span className="text-[12px] text-[#929292]">2.4M installs</span>
            </div>
            <h3 className="text-[18px] font-semibold leading-[1.25] text-[#dadada] mb-2">Dataview</h3>
            <p className="text-[14px] leading-[1.5] text-[#bababa]">Query your notes like a database. Filter, sort, and display data from across your entire vault.</p>
            <DataviewMock />
          </div>

          {/* 2. Templater — 1col, top row */}
          <div
            className="rounded-xl border p-6 flex flex-col transition-[border-color] duration-150 hover:border-[#4a4a4a]"
            style={{ backgroundColor: "#242424", borderColor: "#363636", boxShadow: "0px 1px 1px 1px rgba(0,0,0,0.5)" }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[18px] font-extrabold text-white" style={{ backgroundColor: "hsl(254, 80%, 60%)" }}>T</div>
              <span className="text-[12px] text-[#929292]">1.8M</span>
            </div>
            <h3 className="text-[16px] font-semibold leading-[1.25] text-[#dadada] mb-1">Templater</h3>
            <p className="text-[13px] leading-[1.5] text-[#bababa]">Dynamic templates with variables and scripts</p>
          </div>

          {/* 3. Calendar — 1col, top row */}
          <div
            className="rounded-xl border p-6 flex flex-col transition-[border-color] duration-150 hover:border-[#4a4a4a]"
            style={{ backgroundColor: "#242424", borderColor: "#363636", boxShadow: "0px 1px 1px 1px rgba(0,0,0,0.5)" }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[18px] font-extrabold text-white" style={{ backgroundColor: "hsl(254, 80%, 60%)" }}>C</div>
              <span className="text-[12px] text-[#929292]">1.6M</span>
            </div>
            <h3 className="text-[16px] font-semibold leading-[1.25] text-[#dadada] mb-1">Calendar</h3>
            <p className="text-[13px] leading-[1.5] text-[#bababa]">Visual daily notes navigation</p>
          </div>

          {/* 4. Kanban — 2col, second row right side */}
          <div
            className="md:col-span-2 rounded-xl border p-6 flex flex-col transition-[border-color] duration-150 hover:border-[#4a4a4a]"
            style={{ backgroundColor: "#242424", borderColor: "#363636", boxShadow: "0px 1px 1px 1px rgba(0,0,0,0.5)" }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[18px] font-extrabold text-white" style={{ backgroundColor: "hsl(254, 80%, 60%)" }}>K</div>
              <span className="text-[12px] text-[#929292]">987K installs</span>
            </div>
            <h3 className="text-[16px] font-semibold leading-[1.25] text-[#dadada] mb-1">Kanban</h3>
            <p className="text-[13px] leading-[1.5] text-[#bababa]">Markdown-backed Kanban boards for project tracking</p>
            <KanbanMock />
          </div>

          {/* 5. Tasks — 1col, third row */}
          <div
            className="rounded-xl border p-6 flex flex-col transition-[border-color] duration-150 hover:border-[#4a4a4a]"
            style={{ backgroundColor: "#242424", borderColor: "#363636", boxShadow: "0px 1px 1px 1px rgba(0,0,0,0.5)" }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[18px] font-extrabold text-white" style={{ backgroundColor: "hsl(254, 80%, 60%)" }}>T</div>
              <span className="text-[12px] text-[#929292]">842K</span>
            </div>
            <h3 className="text-[16px] font-semibold leading-[1.25] text-[#dadada] mb-1">Tasks</h3>
            <p className="text-[13px] leading-[1.5] text-[#bababa]">Track tasks with due dates, priorities, and recurring schedules</p>
          </div>

          {/* 6. Excalidraw — 2col, third row */}
          <div
            className="md:col-span-2 rounded-xl border p-6 flex flex-col transition-[border-color] duration-150 hover:border-[#4a4a4a]"
            style={{ backgroundColor: "#242424", borderColor: "#363636", boxShadow: "0px 1px 1px 1px rgba(0,0,0,0.5)" }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[18px] font-extrabold text-white" style={{ backgroundColor: "hsl(254, 80%, 60%)" }}>E</div>
              <span className="text-[12px] text-[#929292]">1.2M installs</span>
            </div>
            <h3 className="text-[16px] font-semibold leading-[1.25] text-[#dadada] mb-1">Excalidraw</h3>
            <p className="text-[13px] leading-[1.5] text-[#bababa]">Freehand drawing and diagrams inside notes</p>
            <ExcalidrawMock />
          </div>

          {/* 7. +1700 more — 1col, fills remaining cell */}
          <div
            className="rounded-xl border p-6 flex flex-col items-center justify-center text-center transition-[border-color] duration-150 hover:border-[hsl(254,80%,72%)]"
            style={{ backgroundColor: "#242424", borderColor: "#363636", boxShadow: "0px 1px 1px 1px rgba(0,0,0,0.5)" }}
          >
            <div className="text-[32px] font-extrabold text-[hsl(254,80%,72%)] leading-[1.1] mb-2">1,700+</div>
            <p className="text-[13px] leading-[1.4] text-[#929292]">community plugins and growing</p>
          </div>
        </div>

        <div className="text-center mt-10">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[16px] text-[hsl(254,80%,72%)] hover:underline transition-colors duration-150"
          >
            Browse all plugins
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 3l5 5-5 5" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
