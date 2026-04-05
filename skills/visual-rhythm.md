# Visual Rhythm — Page-Level Composition Skill

## Core Theory

Visual rhythm is the deliberate variation of visual weight, density, and space across a full page. Like music uses tempo changes, crescendos, and rests, a great landing page uses section contrast, spacing shifts, and density waves to create a cohesive narrative — not just a stack of blocks.

### The Section Monotony Problem

AI-generated pages default to uniform sections: same height, same padding, same background, same density. Every section gets py-20, a white background, and a centered heading. The result reads like a bulleted list, not a story. Users scroll without registering transitions because nothing signals "this is different — pay attention."

The root cause: AI treats each section as independent. It optimizes locally (this section looks good) but never globally (does the page flow?).

### The 3 Levers

All visual rhythm comes from varying three properties across sections:

1. **Height variation** — Tall sections command attention; short sections create breathing room or act as connective tissue. A page where every section is the same height has no visual hierarchy.

2. **Density variation** — Dense sections (grids, feature lists, pricing tables) demand cognitive effort. Sparse sections (hero, quote, CTA) provide rest. Alternating density prevents fatigue.

3. **Background variation** — Color and tone shifts create "chapter breaks." A dark section after three light ones signals a new act. Same-background sections blur together.

These levers are independent. A section can be tall+sparse (dramatic hero), short+dense (stat bar), or medium+sparse (testimonial quote). The combinations create the rhythm.

---

## Section Contrast Rules

**Never follow a dense section with another dense section.** Two feature grids back-to-back overwhelm. Insert a sparse break: a quote, a stat bar, a single-sentence CTA.

**After a tall hero, use a compact connector.** Logo strips, stat bars, or single-line social proof. The height drop signals "the intro is over, the content begins."

**Full-bleed sections demand contained follow-ups.** A full-width image or background section should be followed by a narrower, contained layout. The width contrast creates visual relief.

**Dark backgrounds are chapter breaks.** Use them to separate major page acts (intro, body, close). Never use dark backgrounds on adjacent sections — it erases the break effect.

### Contrast Pairs

These natural pairings create effective transitions:

- Tension then release: dense feature grid followed by a sparse quote
- Expansion then contraction: full-bleed image followed by narrow text column
- Dark then light: dark social proof section followed by white pricing
- Tall then short: hero followed by logo bar or stat strip
- Heavy then minimal: pricing table followed by single-line CTA

The principle: every section exists in contrast to its neighbors. If you cannot describe how a section differs from the one above it, the rhythm is broken.

---

## Spacing Variation Formula

Uniform padding is the most common rhythm killer. Not every section deserves the same vertical space.

### Spacing Scale

| Level | Class | Use When |
|-------|-------|----------|
| Compact | py-12 | Connective tissue: logo bars, stat strips, transition elements |
| Standard | py-16 | Default content sections: features, how-it-works, integrations |
| Breathing | py-24 | Sections that need room: testimonials, editorial content, comparisons |
| Dramatic | py-32 | Anchor sections: hero, final CTA, full-bleed statements |

### Spacing Rules

- The hero and final CTA always get dramatic spacing — they are the opening and closing acts
- Middle sections should vary between compact, standard, and breathing — never all one level
- After a dense section (pricing, feature grid), increase spacing on the next section by one level
- Connective sections (logo bars, stat strips, dividers) always use compact spacing
- Never use dramatic spacing on two adjacent sections — it creates a floating, disconnected feel
- When in doubt, alternate: standard → breathing → standard → compact → breathing

---

## Page-Level Pacing Templates

### 1. Editorial Flow

Best for: brand storytelling, agency sites, product narratives.

| Order | Section | Height | Density | Spacing | Background | Layout |
|-------|---------|--------|---------|---------|------------|--------|
| 1 | Hero | Tall | Sparse | Dramatic | Light | Single Column Center |
| 2 | Feature highlight | Medium | Dense | Standard | Light | Asymmetric Split |
| 3 | Quote/break | Short | Minimal | Compact | Dark | Single Column Center |
| 4 | Deep-dive editorial | Tall | Medium | Breathing | Light | Editorial Two-Column |
| 5 | CTA | Medium | Sparse | Dramatic | Dark | Single Column Center |

Rhythm profile: slow open, build density, pause, deep engagement, strong close.

### 2. Build-up Crescendo

Best for: SaaS launches, product announcements, conversion-heavy pages.

| Order | Section | Height | Density | Spacing | Background | Layout |
|-------|---------|--------|---------|---------|------------|--------|
| 1 | Logo/trust bar | Short | Compact | Compact | Light | Horizontal Scroll Strip |
| 2 | Problem statement | Medium | Sparse | Breathing | Light | Single Column Center |
| 3 | Solution intro | Medium | Medium | Standard | Gray | Asymmetric Split |
| 4 | Feature deep-dive | Tall | Dense | Standard | Light | Bento Grid |
| 5 | Social proof | Medium | Medium | Breathing | Dark | Card Carousel |
| 6 | CTA | Tall | Sparse | Dramatic | Dark | Single Column Center |

Rhythm profile: quiet start, escalating intensity, peak at features, emotional proof, dramatic close.

### 3. Alternating Density

Best for: feature-rich products, comparison pages, technical tools.

| Order | Section | Height | Density | Spacing | Background | Layout |
|-------|---------|--------|---------|---------|------------|--------|
| 1 | Hero | Tall | Sparse | Dramatic | Light | Single Column Center |
| 2 | Features | Medium | Dense | Standard | Gray | Three-Column Grid |
| 3 | Testimonial quote | Short | Sparse | Breathing | Light | Single Column Center |
| 4 | Pricing | Medium | Dense | Standard | Light | Comparison Table |
| 5 | CTA | Medium | Sparse | Dramatic | Dark | Single Column Center |

Rhythm profile: wave pattern — high-low-high-low — prevents cognitive fatigue.

### 4. Magazine Spread

Best for: creative portfolios, design agencies, editorial brands.

| Order | Section | Height | Density | Spacing | Background | Layout |
|-------|---------|--------|---------|---------|------------|--------|
| 1 | Hero editorial | Tall | Sparse | Dramatic | Light | Asymmetric Split |
| 2 | Two-up story | Medium | Medium | Standard | Light | Two-Column Equal |
| 3 | Full-bleed image | Tall | Minimal | Compact | Dark | Full-Width Media |
| 4 | Detail columns | Medium | Dense | Standard | Light | Three-Column Grid |
| 5 | Testimonial | Short | Sparse | Breathing | Gray | Single Column Center |
| 6 | CTA | Medium | Sparse | Dramatic | Dark | Single Column Center |

Rhythm profile: visual-led, image-heavy pacing with density only in the detail section.

### 5. Tech Product

Best for: developer tools, APIs, infrastructure products.

| Order | Section | Height | Density | Spacing | Background | Layout |
|-------|---------|--------|---------|---------|------------|--------|
| 1 | Hero with demo | Tall | Medium | Dramatic | Dark | Asymmetric Split |
| 2 | Feature tabs | Medium | Medium | Standard | Light | Tabbed Content |
| 3 | Code example | Short | Dense | Compact | Dark | Single Column Center |
| 4 | Integration grid | Medium | Dense | Standard | Light | Bento Grid |
| 5 | Pricing table | Medium | Dense | Breathing | Gray | Comparison Table |
| 6 | CTA | Short | Sparse | Dramatic | Light | Single Column Center |

Rhythm profile: dark-light alternation mirrors terminal/app context switching. Dense middle reflects technical depth; sparse bookends frame the pitch.

---

## Background Alternation Patterns

**Never use the same background tone three times consecutively.** Two lights in a row is acceptable; three creates a wall of sameness.

### Proven Sequences

- **Standard**: light → light → dark → light → light → dark
- **Subtle**: white → gray → white → dark → white → gray
- **Bold**: dark → light → dark → light → dark (high contrast, use sparingly)
- **Warm**: light → warm-gray → light → accent-dark → light

### Principles

Full-bleed color sections serve as visual anchors — use one in the middle and one at the end to create two "acts." A dark section in the middle of the page is the intermission; a dark section at the end is the curtain call.

When transitioning from light to dark, increase the preceding section's bottom padding by one level. The extra space prevents the dark section from feeling cramped against its neighbor.

Gradient transitions (subtle background color shifts between sections) work only when the colors are close in tone. Never gradient between white and dark — use a hard cut instead. Hard cuts are chapter breaks; gradients are paragraph transitions.
