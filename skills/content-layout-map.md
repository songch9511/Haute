# Content Layout Map

## Purpose & Usage

Used during Plan phase to assign layouts to sections before writing any code.
This is ROUTING LOGIC only — it selects which layout-pattern to use, not how to implement it.

Priority chain: content-layout-map (which pattern?) → layout-patterns.md (how to implement it)

Load this skill when: assigning section layouts during Plan phase.
Do not load during Think or Execute phases.
After routing, read the referenced layout-patterns.md section for implementation details.

---

## Decision Tree

### Hero
**AI Default:** centered heading + subheading + CTA button on plain or gradient background
**Agency Choices:** (1) Split-screen hero — headline+CTA left, visual right. (2) Full-bleed editorial — oversized type, image as bg layer. (3) Angled/diagonal — bg clip 10-15deg, offset content. (4) Asymmetric overlap — text bleeds into image zone, z-layered.
**Selection:** Product with strong visual → split-screen. Editorial tone → full-bleed. Startup energy → angled. Premium/luxury → asymmetric overlap.
**Pattern Ref:** `layout-patterns.md § Hero Layouts`

### Features (3-6 items)
**AI Default:** 3 equal-width icon+title+description cards in a row
**Agency Choices:** (1) Asymmetric bento grid — mixed cell sizes, no uniform rows. (2) Featured+grid — 1 large hero feature, N smaller subordinate items. (3) Staggered offset — cards at alternating vertical positions, diagonal flow.
**Selection:** 4-6 unequal-weight features → bento. 1 primary + supporting → featured+grid. 3 equal-weight → staggered offset.
**Pattern Ref:** `layout-patterns.md § Bento Grid`, `§ Featured + Grid`

### Features (single highlight)
**AI Default:** centered text block with image below or beside it
**Agency Choices:** (1) Split-screen sticky visual — text scrolls, visual stays pinned. (2) Overlapping z-layer — text card overlaps image, depth via z-index. (3) Magazine spread — full-width, editorial grid, image bleeds to edge.
**Selection:** Long multi-point copy → sticky split. Short punchy copy + strong image → z-layer. Premium/publication tone → magazine spread.
**Pattern Ref:** `layout-patterns.md § Sticky Split`, `§ Z-Layer Overlap`

### Pricing (2-4 tiers)
**AI Default:** centered equal-width cards with "Popular" badge on middle tier
**Agency Choices:** (1) Featured tier editorial — recommended tier visually larger/offset, others recede. (2) Comparison table — rows per feature, tiers as columns. (3) Horizontal scroll cards — tiers overflow on mobile, all visible on desktop.
**Selection:** Clear upsell intent → featured editorial. Detailed feature matrix / B2B → comparison table. 4 tiers / mobile-first → horizontal scroll.
**Pattern Ref:** `layout-patterns.md § Pricing Editorial`, `§ Comparison Table`

### Testimonials (3+ quotes)
**AI Default:** carousel/slider with dot pagination
**Agency Choices:** (1) Masonry quote wall — varying-height cards in multi-column masonry. (2) Editorial pull-quote — 1 featured quote large, others small around it. (3) Logo marquee + featured — client logos in marquee, 1-2 quotes static.
**Selection:** 6+ similar-weight quotes → masonry. 1-3 high-authority quotes → pull-quote. B2B with recognizable logos → marquee+featured.
**Pattern Ref:** `layout-patterns.md § Masonry`, `§ Editorial Pull-Quote`

### Team / About
**AI Default:** uniform grid of circular avatar cards with name + title
**Agency Choices:** (1) Magazine layout — 1 featured person large, others in subordinate grid. (2) Staggered cards — alternating heights/offsets, no uniform rows. (3) Horizontal scroll — cards overflow; good for 6+ people.
**Selection:** Founder-led / clear hierarchy → magazine. Small team 3-5, equal weight → staggered. Large team 6+ → horizontal scroll.
**Pattern Ref:** `layout-patterns.md § Magazine Grid`, `§ Horizontal Scroll`

### CTA (call to action)
**AI Default:** centered headline + paragraph + button on a colored background band
**Agency Choices:** (1) Split-background — left half brand color, right half dark/light, content straddles split. (2) Full-bleed asymmetric — oversized headline, CTA offset, bg image or texture. (3) Floating card — elevated card with shadow, floats above page bg.
**Selection:** Page-end conversion → split-background. Mid-page interrupt → floating card. Hero-scale closing → full-bleed asymmetric.
**Pattern Ref:** `layout-patterns.md § CTA Patterns`

### FAQ
**AI Default:** single-column accordion list
**Agency Choices:** (1) 2-column layout — questions left, answers right, no collapse needed. (2) Tabbed categories — group by topic, tabs switch category. (3) Search-first — prominent input filters questions live.
**Selection:** 6-12 FAQs, general audience → 2-column. 12+ FAQs across topics → tabbed. Technical product, users know what they want → search-first.
**Pattern Ref:** `layout-patterns.md § FAQ Layouts`

### Stats / Numbers
**AI Default:** row of centered big numbers with labels below each
**Agency Choices:** (1) Staggered counters — numbers at different sizes, offset vertically, diagonal flow. (2) Integrated background — numbers as texture/watermark, copy overlaid. (3) Scattered organic — numbers placed freely on grid with connective lines.
**Selection:** 3-4 stats, standalone section → staggered. Stats supporting narrative → integrated bg. Editorial brand → scattered organic.
**Pattern Ref:** `layout-patterns.md § Stats Layouts`

### Logos / Partners
**AI Default:** equally spaced row of logos at uniform size
**Agency Choices:** (1) Marquee animation — infinite horizontal scroll, logos fade at edges. (2) Varying sizes + opacity — logos at 2-3 sizes, opacity 0.4-0.6, no uniform row. (3) Clustered organic — irregular cluster, slight rotation variance.
**Selection:** 8+ logos → marquee. 4-8 logos with brand hierarchy → varying sizes. Agency/portfolio context → clustered organic.
**Pattern Ref:** `layout-patterns.md § Logo Displays`

---

## Combination Rules

1. Never use the same layout pattern for two consecutive sections.
2. Grid section (bento, masonry, equal-card) → next section must be editorial or full-bleed.
3. Split-screen section → do not follow with another split-screen.
4. Alternate dense and sparse sections — see `visual-rhythm.md § Dense-Sparse Alternation`.
5. Every 4 content sections must include at least 1 visual break (full-bleed, oversized type, or whitespace section).
6. Hero constrains section 2: split-screen hero → section 2 full-width; full-bleed hero → split or grid ok; angled hero → return to baseline (editorial or flat grid).
7. Avoid opening and closing the page with the same layout family.

---

## Quick Reference Table

| Content Type    | Avoid                  | Prefer                              | Pattern Ref          |
|-----------------|------------------------|-------------------------------------|----------------------|
| Hero            | centered heading+CTA   | split-screen, full-bleed editorial  | `§ Hero Layouts`     |
| Features 3-6    | equal 3-card row       | bento grid, featured+grid           | `§ Bento Grid`       |
| Features single | centered text+image    | sticky split, z-layer overlap       | `§ Sticky Split`     |
| Pricing         | equal cards + badge    | featured editorial, comparison table| `§ Pricing Editorial`|
| Testimonials    | carousel               | masonry wall, editorial pull-quote  | `§ Masonry`          |
| Team/About      | uniform avatar grid    | magazine layout, staggered cards    | `§ Magazine Grid`    |
| CTA             | centered band          | split-background, floating card     | `§ CTA Patterns`     |
| FAQ             | accordion list         | 2-column, tabbed categories         | `§ FAQ Layouts`      |
| Stats           | centered equal row     | staggered counters, integrated bg   | `§ Stats Layouts`    |
| Logos           | uniform spaced row     | marquee, varying opacity sizes      | `§ Logo Displays`    |
