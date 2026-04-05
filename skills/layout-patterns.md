---
name: layout-patterns
description: Agency-grade layout patterns that break AI-formulaic rhythm. Summary always loaded; reference sections read on demand via offset/limit.
---

# Layout Patterns — Agency-Grade Section Design

**Purpose:** Eliminate predictable hero/features/pricing rhythm. Every section uses a layout that real agencies (journey-digital, pagebreak.nyc, Vercel, Stripe) would ship.

## Pattern Catalog

| # | Pattern | Description | Lines | Best For |
|---|---------|-------------|-------|----------|
| 1 | Split-Screen Hero | Asymmetric L/R with offset vertical alignment | 43-77 | Product launches, SaaS landing |
| 2 | Full-Bleed Overlay Hero | Edge-to-edge visual with text overlay zones | 78-109 | Portfolio, brand story, editorial |
| 3 | Editorial Hero | Oversized typography, minimal imagery | 110-136 | Agency sites, content platforms |
| 4 | Angled Divider Hero | Diagonal clip-path creating visual tension | 137-165 | Bold brands, creative tools |
| 5 | Asymmetric Bento Grid | Mixed col-span grid, NO equal cards | 166-206 | Features, capabilities, dashboards |
| 6 | Staggered Offset Grid | Alternating L/R alignment with vertical offset | 207-245 | Process steps, case studies |
| 7 | Magazine Spread | Text wraps around featured visual element | 246-280 | About sections, deep dives |
| 8 | Horizontal Scroll Showcase | Overflow-x gallery with snap points | 281-310 | Portfolios, product galleries |
| 9 | Sticky Sidebar + Scroll | Fixed sidebar with scrolling content pane | 311-345 | Documentation, long-form features |
| 10 | Overlapping Z-Layer Cards | Cards with negative margin overlap and z-index | 346-382 | Testimonials, team, highlights |
| 11 | Timeline Vertical Flow | Alternating left/right nodes on a center spine | 383-412 | Changelog, history, roadmap |
| 12 | Featured + Supporting Grid | One large item + smaller supporting items | 413-454 | Blog, news, case studies |
| 13 | Masonry Quote Wall | Variable-height testimonial tiles | 455-484 | Social proof, reviews |
| 14 | Editorial Pull-Quote | Oversized quote as design element | 485-506 | Testimonial spotlight, brand voice |
| 15 | Logo Marquee + Testimonial | Infinite scroll logos above featured quote | 507-545 | Trust signals, enterprise landing |
| 16 | Comparison Table | Structured comparison, NOT equal cards | 546-589 | Pricing, plan comparison |
| 17 | Featured Tier Editorial | One plan dominates with editorial layout | 590-645 | Pricing with clear recommendation |
| 18 | Split-Background CTA | Full-width CTA with two-tone background split | 646-679 | Final conversion sections |

## Quick Reference

- **Hero sections** -> patterns 1-4 (lines 43-165)
- **Feature/content sections** -> patterns 5-12 (lines 166-454)
- **Social proof/testimonials** -> patterns 13-15 (lines 455-545)
- **CTA/pricing** -> patterns 16-18 (lines 546-679)

---
<!-- REFERENCE SECTIONS BELOW — Read on demand via Read(offset, limit) -->

## Section: Split-Screen Hero

Asymmetric two-column hero. Content sits left at ~55% width, visual right at ~45%. Vertical alignment is deliberately offset -- text starts higher than the image.

**When to use:** Product launches, SaaS landing pages. When you have a strong visual asset (screenshot, 3D render, illustration).

**Anti-pattern warning:** AI defaults to 50/50 split with vertically centered content on both sides. Real agencies use 55/45 or 60/40 and offset the vertical rhythm.

```jsx
<section className="min-h-screen flex items-start pt-32 pb-20 px-6 lg:px-16">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto w-full">
    {/* Content — 7 cols, aligned to top */}
    <div className="lg:col-span-7 flex flex-col justify-start">
      <p className="text-sm tracking-widest uppercase text-neutral-400 mb-4">Introducing v2.0</p>
      <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight text-neutral-100 leading-[1.05]">
        Ship faster<br />without compromise
      </h1>
      <p className="mt-6 text-lg text-neutral-400 max-w-md">
        The deployment platform that scales with your ambition.
      </p>
      <div className="mt-10 flex gap-4">
        <button className="px-6 py-3 bg-neutral-100 text-neutral-900 rounded-lg text-sm font-medium">Get started</button>
        <button className="px-6 py-3 border border-neutral-700 text-neutral-300 rounded-lg text-sm">Learn more</button>
      </div>
    </div>
    {/* Visual — 5 cols, pushed down */}
    <div className="lg:col-span-5 lg:mt-16">
      <div className="aspect-[4/5] rounded-2xl bg-neutral-800 overflow-hidden">
        <img src="/hero-visual.webp" alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  </div>
</section>
```

## Section: Full-Bleed Overlay Hero

Edge-to-edge background visual with text positioned in a specific zone (bottom-left or center). No container max-width on the background. Text uses a semi-transparent scrim or relies on image darkness.

**When to use:** Brand-first storytelling, portfolio headers, editorial sites.

**Anti-pattern warning:** AI places text dead-center with a full overlay gradient. Agencies anchor text to a corner or edge, using localized scrim not full-surface darkening.

```jsx
<section className="relative min-h-screen w-full overflow-hidden">
  {/* Full-bleed image */}
  <img
    src="/hero-bg.webp" alt=""
    className="absolute inset-0 w-full h-full object-cover"
  />
  {/* Localized scrim — bottom only */}
  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-transparent" />
  {/* Content anchored bottom-left */}
  <div className="relative z-10 min-h-screen flex items-end pb-20 px-6 lg:px-16">
    <div className="max-w-2xl">
      <h1 className="text-4xl lg:text-6xl font-semibold text-neutral-100 tracking-tight leading-[1.1]">
        We build things<br />people remember
      </h1>
      <p className="mt-4 text-lg text-neutral-300">Creative studio based in Brooklyn, NY</p>
      <button className="mt-8 px-8 py-3 bg-white text-neutral-900 rounded-full text-sm font-medium">
        View work
      </button>
    </div>
  </div>
</section>
```

## Section: Editorial Hero

Typography IS the visual. Oversized heading (8xl+) with generous letter-spacing. Minimal or no imagery -- the words dominate.

**When to use:** Agency portfolios, content platforms, personal brands. When the name/statement is the product.

**Anti-pattern warning:** AI adds decorative images or icons to fill space. The whole point is letting typography breathe. Resist the urge to fill.

```jsx
<section className="min-h-screen flex flex-col justify-center px-6 lg:px-16 py-32">
  <div className="max-w-7xl mx-auto w-full">
    <p className="text-sm tracking-widest uppercase text-neutral-500 mb-8">Design & Engineering</p>
    <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter text-neutral-100 leading-[0.9]">
      Page<br />Break
    </h1>
    <div className="mt-16 flex items-end justify-between">
      <p className="text-lg text-neutral-400 max-w-sm">
        We craft digital experiences that challenge convention.
      </p>
      <a href="#work" className="text-sm text-neutral-400 underline underline-offset-4 hover:text-neutral-200 transition-colors">
        See our work
      </a>
    </div>
  </div>
</section>
```

## Section: Angled Divider Hero

Uses `clip-path` to create a diagonal edge between the hero and the next section, adding visual tension and breaking the horizontal line monotony.

**When to use:** Bold brands, creative tools. When the page needs energy and forward momentum.

**Anti-pattern warning:** AI uses subtle 2-3 degree angles that look like a bug. Commit to 5-8 degrees minimum. Also, AI forgets to handle the gap the clip-path creates on the following section.

```jsx
<section className="relative min-h-screen flex items-center px-6 lg:px-16 bg-neutral-900"
  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}>
  <div className="max-w-7xl mx-auto w-full pb-24">
    <h1 className="text-5xl lg:text-7xl font-bold text-neutral-100 tracking-tight">
      Break the grid.<br />Own the canvas.
    </h1>
    <p className="mt-6 text-lg text-neutral-400 max-w-lg">
      Design tools for teams that refuse to blend in.
    </p>
    <button className="mt-10 px-8 py-4 bg-amber-400 text-neutral-900 rounded-lg text-sm font-bold">
      Start creating
    </button>
  </div>
</section>
{/* Next section overlaps into the clipped space */}
<section className="relative -mt-24 pt-32 px-6 lg:px-16">
  {/* Content continues... */}
</section>
```

## Section: Asymmetric Bento Grid

Mixed-size grid cells using varied `col-span` and `row-span`. The key is NO row of equal-width items. At least one item spans 2 columns or 2 rows.

**When to use:** Features, capabilities, dashboard previews. Anywhere you have 4-8 items to showcase.

**Anti-pattern warning:** AI creates 3 equal cards in a row and calls it "bento." Real bento has size hierarchy -- one large cell (2x2 or 2x1), two medium, and 2-3 small. Check that grid-rows > 1 to confirm it is actually bento.

```jsx
<section className="py-24 px-6 lg:px-16">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-semibold text-neutral-100 mb-12">What we do differently</h2>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {/* Featured — 2 cols, 2 rows */}
      <div className="col-span-2 row-span-2 rounded-2xl bg-neutral-800 p-8 flex flex-col justify-end min-h-[400px]">
        <h3 className="text-2xl font-semibold text-neutral-100">AI-native workflows</h3>
        <p className="mt-2 text-neutral-400">Built from the ground up for how teams actually work.</p>
      </div>
      {/* Medium */}
      <div className="col-span-2 lg:col-span-1 rounded-2xl bg-neutral-800 p-6">
        <h3 className="text-lg font-medium text-neutral-100">Real-time sync</h3>
        <p className="mt-2 text-sm text-neutral-400">Changes propagate in under 50ms.</p>
      </div>
      {/* Medium */}
      <div className="col-span-2 lg:col-span-1 rounded-2xl bg-neutral-800 p-6">
        <h3 className="text-lg font-medium text-neutral-100">Version control</h3>
        <p className="mt-2 text-sm text-neutral-400">Git-native branching for every project.</p>
      </div>
      {/* Wide bottom */}
      <div className="col-span-2 rounded-2xl bg-neutral-800 p-6 flex items-center gap-6">
        <div className="w-12 h-12 rounded-xl bg-neutral-700 flex-shrink-0" />
        <div>
          <h3 className="text-lg font-medium text-neutral-100">Edge deployment</h3>
          <p className="mt-1 text-sm text-neutral-400">35 regions, zero config.</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

## Section: Staggered Offset Grid

Items alternate between left-aligned and right-aligned, with intentional vertical offset creating a zigzag visual rhythm. Not a grid in the CSS sense -- uses flex or manual positioning.

**When to use:** Process steps, case studies, project showcases. Linear narratives that need visual variety.

**Anti-pattern warning:** AI stacks items in a straight column or uses a uniform 2-column grid. The stagger must be visible -- use `ml-auto` on alternating items and vary the top margin.

```jsx
<section className="py-24 px-6 lg:px-16">
  <div className="max-w-5xl mx-auto space-y-8">
    {/* Item 1 — left */}
    <div className="max-w-lg">
      <span className="text-sm text-neutral-500 font-mono">01</span>
      <h3 className="mt-2 text-2xl font-semibold text-neutral-100">Discovery & Research</h3>
      <p className="mt-3 text-neutral-400">We interview stakeholders, audit existing systems, and map the competitive landscape.</p>
    </div>
    {/* Item 2 — right, offset down */}
    <div className="max-w-lg ml-auto mt-4">
      <span className="text-sm text-neutral-500 font-mono">02</span>
      <h3 className="mt-2 text-2xl font-semibold text-neutral-100">Strategy & Architecture</h3>
      <p className="mt-3 text-neutral-400">Information architecture, user flows, and technical specifications before any pixel work.</p>
    </div>
    {/* Item 3 — left, offset */}
    <div className="max-w-lg mt-4">
      <span className="text-sm text-neutral-500 font-mono">03</span>
      <h3 className="mt-2 text-2xl font-semibold text-neutral-100">Design & Prototype</h3>
      <p className="mt-3 text-neutral-400">High-fidelity prototypes tested with real users before development begins.</p>
    </div>
    {/* Item 4 — right */}
    <div className="max-w-lg ml-auto mt-4">
      <span className="text-sm text-neutral-500 font-mono">04</span>
      <h3 className="mt-2 text-2xl font-semibold text-neutral-100">Build & Launch</h3>
      <p className="mt-3 text-neutral-400">Production-grade code with performance budgets baked into every sprint.</p>
    </div>
  </div>
</section>
```

## Section: Magazine Spread

A featured visual element (image, video, illustration) sits prominently while text content wraps or flows around it. Inspired by print editorial layout.

**When to use:** About sections, deep dives, feature highlights where one visual tells the story.

**Anti-pattern warning:** AI places image and text in equal 50/50 columns. Magazine spread gives the visual 60-70% of the space and lets text sit in the remaining area with generous padding.

```jsx
<section className="py-24 px-6 lg:px-16">
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
    {/* Visual — dominant */}
    <div className="lg:col-span-8">
      <div className="aspect-[16/10] rounded-2xl bg-neutral-800 overflow-hidden">
        <img src="/feature-spread.webp" alt="" className="w-full h-full object-cover" />
      </div>
    </div>
    {/* Text — secondary, vertically offset */}
    <div className="lg:col-span-4 lg:pt-16">
      <p className="text-sm tracking-widest uppercase text-neutral-500 mb-4">About the project</p>
      <h2 className="text-3xl font-semibold text-neutral-100 leading-snug">
        Three years of craft distilled into one platform
      </h2>
      <p className="mt-6 text-neutral-400 leading-relaxed">
        We spent 18 months in research alone, interviewing over 200 teams
        to understand what actually blocks creative velocity.
      </p>
      <a href="/about" className="mt-8 inline-block text-sm text-neutral-300 underline underline-offset-4">
        Read the full story
      </a>
    </div>
  </div>
</section>
```

## Section: Horizontal Scroll Showcase

Overflow-x container with scroll-snap for a gallery of items that extends beyond the viewport. Visible overflow signals more content.

**When to use:** Project portfolios, product galleries, screenshot showcases. When items are visually rich and benefit from large display.

**Anti-pattern warning:** AI wraps items or reduces them to fit in a grid. The deliberate overflow is the design -- items should be partially visible at the edge to invite scrolling. Always add `scroll-snap-type` for mobile.

```jsx
<section className="py-24">
  <div className="max-w-7xl mx-auto px-6 lg:px-16 mb-8">
    <h2 className="text-3xl font-semibold text-neutral-100">Selected work</h2>
  </div>
  <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 lg:px-16 pb-6
    scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]
    [&::-webkit-scrollbar]:hidden">
    {projects.map((project) => (
      <div key={project.id}
        className="snap-start flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[40vw]">
        <div className="aspect-[4/3] rounded-2xl bg-neutral-800 overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>
        <h3 className="mt-4 text-lg font-medium text-neutral-100">{project.title}</h3>
        <p className="mt-1 text-sm text-neutral-400">{project.category}</p>
      </div>
    ))}
  </div>
</section>
```

## Section: Sticky Sidebar + Scroll

Left column is `position: sticky` with a heading or nav. Right column scrolls through multiple content blocks. Creates a reading experience that maintains context.

**When to use:** Feature deep-dives, documentation-style marketing, long-form content with navigation.

**Anti-pattern warning:** AI makes both columns scroll together, losing the sticky benefit. Ensure the sidebar `top` value accounts for any fixed nav. Also, sidebar must have `self-start` to prevent stretching.

```jsx
<section className="py-24 px-6 lg:px-16">
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
    {/* Sticky sidebar */}
    <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
      <p className="text-sm tracking-widest uppercase text-neutral-500 mb-4">Platform</p>
      <h2 className="text-4xl font-semibold text-neutral-100 leading-tight">
        Everything you need, nothing you don't
      </h2>
      <p className="mt-4 text-neutral-400">Scroll to explore each capability.</p>
    </div>
    {/* Scrolling content */}
    <div className="lg:col-span-8 space-y-24">
      {features.map((feature) => (
        <div key={feature.id}>
          <div className="aspect-video rounded-2xl bg-neutral-800 mb-6 overflow-hidden">
            <img src={feature.image} alt="" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-2xl font-semibold text-neutral-100">{feature.title}</h3>
          <p className="mt-3 text-neutral-400 max-w-lg">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

## Section: Overlapping Z-Layer Cards

Cards use negative margins or translate to overlap each other, creating depth. Combined with subtle shadows and z-index hierarchy.

**When to use:** Testimonials, team members, highlight cards. When you want to break the flat-grid monotony.

**Anti-pattern warning:** AI spaces cards evenly with identical elevation. The overlap must be intentional -- 20-40px overlap with ascending z-index. Use `hover:z-50` so focused cards pop forward.

```jsx
<section className="py-24 px-6 lg:px-16">
  <div className="max-w-5xl mx-auto">
    <h2 className="text-3xl font-semibold text-neutral-100 mb-16 text-center">What people say</h2>
    <div className="flex flex-col lg:flex-row items-center justify-center">
      {testimonials.map((t, i) => (
        <div key={t.id}
          className="w-full lg:w-80 rounded-2xl bg-neutral-800 border border-neutral-700/50 p-8
            transition-all duration-300 hover:z-50 hover:scale-105"
          style={{
            marginLeft: i > 0 ? '-2rem' : '0',
            zIndex: i + 1,
            transform: `rotate(${(i - 1) * 2}deg)`,
          }}>
          <p className="text-neutral-300 leading-relaxed">"{t.quote}"</p>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-700" />
            <div>
              <p className="text-sm font-medium text-neutral-100">{t.name}</p>
              <p className="text-xs text-neutral-500">{t.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

## Section: Timeline Vertical Flow

Center spine with alternating left/right content nodes. Each node connects to the spine with a dot or line.

**When to use:** Changelog, company history, product roadmap, process documentation.

**Anti-pattern warning:** AI uses a simple ordered list or stacks items vertically without the alternating layout. The visual spine is essential -- use a pseudo-element or border for the center line.

```jsx
<section className="py-24 px-6 lg:px-16">
  <div className="max-w-4xl mx-auto relative">
    {/* Center spine */}
    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-neutral-700 -translate-x-1/2 hidden lg:block" />
    <div className="space-y-16 lg:space-y-24">
      {events.map((event, i) => (
        <div key={event.id}
          className={`relative lg:w-1/2 ${i % 2 === 0 ? 'lg:pr-16' : 'lg:ml-auto lg:pl-16'}`}>
          {/* Spine dot */}
          <div className={`hidden lg:block absolute top-2 w-3 h-3 rounded-full bg-neutral-400
            ${i % 2 === 0 ? '-right-1.5' : '-left-1.5'}`} />
          <span className="text-sm text-neutral-500 font-mono">{event.date}</span>
          <h3 className="mt-2 text-xl font-semibold text-neutral-100">{event.title}</h3>
          <p className="mt-2 text-neutral-400">{event.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

## Section: Featured + Supporting Grid

One dominant item takes 60-70% of the space. Remaining items fill a smaller grid alongside or below it.

**When to use:** Blog landing, news sections, case study overviews. When one item deserves emphasis.

**Anti-pattern warning:** AI makes all items the same size. The featured item must be visually dominant -- at least 2x the area of any supporting item.

```jsx
<section className="py-24 px-6 lg:px-16">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-semibold text-neutral-100 mb-12">Latest stories</h2>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Featured */}
      <div className="lg:col-span-7">
        <div className="aspect-[16/10] rounded-2xl bg-neutral-800 overflow-hidden">
          <img src={featured.image} alt="" className="w-full h-full object-cover" />
        </div>
        <span className="mt-4 inline-block text-sm text-neutral-500">{featured.category}</span>
        <h3 className="mt-2 text-2xl font-semibold text-neutral-100">{featured.title}</h3>
        <p className="mt-2 text-neutral-400 max-w-lg">{featured.excerpt}</p>
      </div>
      {/* Supporting */}
      <div className="lg:col-span-5 space-y-6">
        {supporting.map((post) => (
          <div key={post.id} className="flex gap-4">
            <div className="w-24 h-24 rounded-xl bg-neutral-800 flex-shrink-0 overflow-hidden">
              <img src={post.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-xs text-neutral-500">{post.category}</span>
              <h4 className="mt-1 text-base font-medium text-neutral-100">{post.title}</h4>
              <p className="mt-1 text-sm text-neutral-400 line-clamp-2">{post.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
```

## Section: Masonry Quote Wall

Variable-height testimonial cards using CSS columns (not grid) for true masonry. Cards have different lengths creating organic rhythm.

**When to use:** Social proof sections, customer reviews, community feedback. When you have 6+ testimonials.

**Anti-pattern warning:** AI uses `grid-template-rows` with equal heights. True masonry requires `columns` CSS property or a JS masonry library. CSS columns are the lightest solution.

```jsx
<section className="py-24 px-6 lg:px-16">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-semibold text-neutral-100 mb-12">Loved by teams worldwide</h2>
    <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
      {quotes.map((q) => (
        <div key={q.id} className="break-inside-avoid rounded-2xl bg-neutral-800 border border-neutral-700/50 p-6">
          <p className="text-neutral-300 leading-relaxed">{q.text}</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-neutral-700" />
            <div>
              <p className="text-sm font-medium text-neutral-100">{q.name}</p>
              <p className="text-xs text-neutral-500">{q.company}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

## Section: Editorial Pull-Quote

A single testimonial displayed as an oversized design element. The quote text itself becomes the visual, set in large serif or display type.

**When to use:** Hero testimonial, brand voice showcase, breaking up content rhythm with a single powerful statement.

**Anti-pattern warning:** AI shrinks quotes into small cards with avatar + stars. The pull-quote pattern makes the text massive (3xl-5xl) and treats it as typography, not a card component.

```jsx
<section className="py-32 px-6 lg:px-16">
  <div className="max-w-5xl mx-auto text-center">
    <blockquote className="text-3xl md:text-5xl font-light text-neutral-100 leading-snug tracking-tight">
      "This changed how our entire team thinks about deployment. We shipped 3x faster in the first month."
    </blockquote>
    <div className="mt-10">
      <p className="text-base font-medium text-neutral-200">Sarah Chen</p>
      <p className="text-sm text-neutral-500">VP Engineering, Acme Corp</p>
    </div>
  </div>
</section>
```

## Section: Logo Marquee + Featured Testimonial

Infinite-scrolling logo strip for trust signals, paired with a featured testimonial below. The marquee uses CSS animation, no JS.

**When to use:** Enterprise landing pages, trust-building sections. When you need both breadth (many logos) and depth (one powerful quote).

**Anti-pattern warning:** AI displays logos in a static grid. The marquee movement signals "we have so many clients we can't fit them all." Use `@keyframes` with `translateX` for smooth infinite scroll.

```jsx
<section className="py-24 overflow-hidden">
  {/* Logo marquee */}
  <div className="relative mb-16">
    <div className="flex animate-marquee gap-16 items-center">
      {[...logos, ...logos].map((logo, i) => (
        <img key={i} src={logo.src} alt={logo.name}
          className="h-8 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all flex-shrink-0" />
      ))}
    </div>
  </div>
  {/* Featured testimonial */}
  <div className="max-w-3xl mx-auto px-6 lg:px-16 text-center">
    <blockquote className="text-2xl md:text-3xl font-light text-neutral-200 leading-relaxed">
      "The platform that finally made our DevOps team redundant -- in the best way."
    </blockquote>
    <div className="mt-8 flex items-center justify-center gap-4">
      <div className="w-12 h-12 rounded-full bg-neutral-700" />
      <div className="text-left">
        <p className="text-sm font-medium text-neutral-100">James Rodriguez</p>
        <p className="text-xs text-neutral-500">CTO, Meridian Health</p>
      </div>
    </div>
  </div>
</section>
{/* Add to tailwind.config.js or globals.css:
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .animate-marquee { animation: marquee 30s linear infinite; }
*/}
```

## Section: Comparison Table

Structured table layout for pricing or feature comparison. Uses a real table or grid with clear column headers and row differentiation. NOT cards.

**When to use:** Pricing pages, feature comparisons, plan selection. When users need to compare options side by side.

**Anti-pattern warning:** AI defaults to 3 equal pricing cards with "Popular" badge. A comparison table is more useful and more professional. If you must use cards, make one visually dominant (scaled up, different background).

```jsx
<section className="py-24 px-6 lg:px-16">
  <div className="max-w-5xl mx-auto">
    <h2 className="text-3xl font-semibold text-neutral-100 mb-4">Simple, transparent pricing</h2>
    <p className="text-neutral-400 mb-12">No hidden fees. Scale when you're ready.</p>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-neutral-700">
            <th className="py-4 pr-8 text-sm font-medium text-neutral-400 w-1/3">Feature</th>
            <th className="py-4 px-8 text-sm font-medium text-neutral-400">Starter</th>
            <th className="py-4 px-8 text-sm font-medium text-neutral-100 bg-neutral-800/50 rounded-t-xl">Pro</th>
            <th className="py-4 pl-8 text-sm font-medium text-neutral-400">Enterprise</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          <tr className="border-b border-neutral-800">
            <td className="py-4 pr-8 text-neutral-300">Projects</td>
            <td className="py-4 px-8 text-neutral-400">3</td>
            <td className="py-4 px-8 text-neutral-200 bg-neutral-800/50">Unlimited</td>
            <td className="py-4 pl-8 text-neutral-400">Unlimited</td>
          </tr>
          <tr className="border-b border-neutral-800">
            <td className="py-4 pr-8 text-neutral-300">Team members</td>
            <td className="py-4 px-8 text-neutral-400">1</td>
            <td className="py-4 px-8 text-neutral-200 bg-neutral-800/50">10</td>
            <td className="py-4 pl-8 text-neutral-400">Unlimited</td>
          </tr>
          {/* More rows... */}
        </tbody>
      </table>
    </div>
  </div>
</section>
```

## Section: Featured Tier Editorial

One pricing tier is presented with editorial treatment -- larger, different background, more detail. Supporting tiers are minimal.

**When to use:** When you have a clear recommended plan and want to drive conversions to it.

**Anti-pattern warning:** AI gives all tiers equal visual weight with a tiny "Recommended" badge. The featured tier should be 2-3x the visual prominence -- larger font, expanded feature list, different background.

```jsx
<section className="py-24 px-6 lg:px-16">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-semibold text-neutral-100 mb-16 text-center">Choose your plan</h2>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Minimal tier */}
      <div className="lg:col-span-3 rounded-2xl border border-neutral-800 p-6 lg:mt-8">
        <h3 className="text-lg font-medium text-neutral-300">Starter</h3>
        <p className="mt-2 text-3xl font-semibold text-neutral-100">$0</p>
        <p className="text-sm text-neutral-500">Free forever</p>
        <ul className="mt-6 space-y-3 text-sm text-neutral-400">
          <li>3 projects</li><li>1 GB storage</li><li>Community support</li>
        </ul>
        <button className="mt-8 w-full py-2.5 border border-neutral-700 text-neutral-300 rounded-lg text-sm">
          Get started
        </button>
      </div>
      {/* FEATURED tier */}
      <div className="lg:col-span-6 rounded-2xl bg-neutral-800 border border-neutral-600 p-10">
        <p className="text-sm text-amber-400 font-medium mb-2">Most popular</p>
        <h3 className="text-2xl font-semibold text-neutral-100">Pro</h3>
        <p className="mt-3 text-5xl font-bold text-neutral-100">$29<span className="text-lg font-normal text-neutral-400">/mo</span></p>
        <p className="mt-2 text-neutral-400">Everything you need to ship at scale.</p>
        <ul className="mt-8 space-y-3 text-sm text-neutral-300">
          <li>Unlimited projects</li><li>100 GB storage</li><li>Priority support</li>
          <li>Custom domains</li><li>Advanced analytics</li><li>Team collaboration</li>
        </ul>
        <button className="mt-10 w-full py-3 bg-neutral-100 text-neutral-900 rounded-lg text-sm font-medium">
          Start free trial
        </button>
      </div>
      {/* Minimal tier */}
      <div className="lg:col-span-3 rounded-2xl border border-neutral-800 p-6 lg:mt-8">
        <h3 className="text-lg font-medium text-neutral-300">Enterprise</h3>
        <p className="mt-2 text-3xl font-semibold text-neutral-100">Custom</p>
        <p className="text-sm text-neutral-500">Tailored to your needs</p>
        <ul className="mt-6 space-y-3 text-sm text-neutral-400">
          <li>Everything in Pro</li><li>SSO & SAML</li><li>Dedicated support</li>
        </ul>
        <button className="mt-8 w-full py-2.5 border border-neutral-700 text-neutral-300 rounded-lg text-sm">
          Contact sales
        </button>
      </div>
    </div>
  </div>
</section>
```

## Section: Split-Background CTA

Full-width section with the background split into two tones (e.g., dark left / slightly lighter right, or image left / solid right). CTA content sits at the boundary.

**When to use:** Final conversion section, newsletter signup, contact CTA. When you want visual weight without a full image.

**Anti-pattern warning:** AI centers a CTA in a plain section with a gradient background. The split creates tension and draws the eye to the content at the seam. Use `overflow-hidden` and absolute positioning for the split.

```jsx
<section className="relative py-32 overflow-hidden">
  {/* Background split */}
  <div className="absolute inset-0 flex">
    <div className="w-1/2 bg-neutral-800" />
    <div className="w-1/2 bg-neutral-900" />
  </div>
  {/* Content at the seam */}
  <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16 text-center">
    <h2 className="text-4xl md:text-5xl font-semibold text-neutral-100 tracking-tight">
      Ready to build something real?
    </h2>
    <p className="mt-6 text-lg text-neutral-400 max-w-xl mx-auto">
      Join 12,000+ teams already shipping faster with our platform.
    </p>
    <div className="mt-10 flex gap-4 justify-center">
      <button className="px-8 py-3.5 bg-neutral-100 text-neutral-900 rounded-lg text-sm font-medium">
        Start for free
      </button>
      <button className="px-8 py-3.5 border border-neutral-600 text-neutral-300 rounded-lg text-sm">
        Talk to sales
      </button>
    </div>
  </div>
</section>
```
