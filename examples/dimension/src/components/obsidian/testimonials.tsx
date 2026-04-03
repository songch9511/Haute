const TESTIMONIALS = [
  {
    quote:
      "Prism changed how I think about note-taking. The graph view alone helped me discover connections in my research I'd missed for months.",
    name: "Lena Vasquez",
    role: "PhD Researcher, Cognitive Science",
  },
  {
    quote:
      "I migrated 4,000 notes from three different apps. Having everything in plain Markdown files that I actually own is worth more than any feature.",
    name: "Haruki Tanaka",
    role: "Software Architect",
  },
  {
    quote:
      "Our entire documentation runs on Prism Publish. The team writes in the app, and it goes live automatically. No static site generators needed.",
    name: "Amara Okonkwo",
    role: "Head of Engineering, Clearpath",
  },
];

export function ObsidianTestimonials() {
  return (
    <section className="px-6 py-[100px]">
      <div className="max-w-[700px] mx-auto space-y-12">
        {TESTIMONIALS.map((t) => (
          <blockquote
            key={t.name}
            className="border-l-2 pl-6 md:pl-8"
            style={{ borderColor: "hsl(254, 80%, 72%)" }}
          >
            <p className="text-[17px] leading-[1.65] text-[#dadada] mb-4">
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-semibold text-white shrink-0"
                style={{ backgroundColor: "hsl(254, 80%, 60%)" }}
              >
                {t.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <div className="text-[14px] font-semibold text-[#dadada]">
                  {t.name}
                </div>
                <div className="text-[13px] text-[#929292]">{t.role}</div>
              </div>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
