---
name: uitripled
description: Integration guide for UI TripleD component registry — 278 production-ready animated components (shadcn/ui + Framer Motion). Search, fetch, and customize components during /design and /copy workflows.
---

# UI TripleD — Component Registry Integration

## Overview

UI TripleD is an open-source registry of 278 production-ready React components built with shadcn/ui + Framer Motion. Fully compatible with UDesigner's stack (React 19, Next.js 16, Tailwind v4, Framer Motion).

**Registry API**: `https://ui.tripled.work/r/{component-name}.json`
**Local Index**: `skills/uitripled-registry.json` (278 items, searchable)

## When to Use

- During `/design` — before building a section from scratch, check if uitripled has a matching block
- During `/copy` — use uitripled sections as a base, then customize to match the reference design
- When user requests specific interaction patterns (drag, magnetic hover, 3D flip, etc.)

## Component Categories

| Category | Count | Best For |
|---|---|---|
| sections | 74 | Hero, pricing, features, testimonials, CTA, FAQ, footer |
| components | 61 | Navbar, sidebar, chat, tabs, accordion, dialog, calendar |
| native | 61 | Buttons, badges, avatars, tooltips, typewriter, magnetic |
| cards | 30 | Product, blog, profile, checkout, wallet, ticket |
| page | 23 | Full landing pages, about pages, hero sections |
| decorative | 10 | Backgrounds, gradients, spotlight, cursor effects |
| micro | 8 | Toggle switches, favorite hearts, shimmer buttons |
| resumes | 8 | Resume/CV templates |

## How to Search

Read `skills/uitripled-registry.json` and search the `items` array:

```python
# Search by keyword in name or description
items = [i for i in data["items"] if "hero" in i["name"] or "hero" in i["description"].lower()]
```

**Prefer `-shadcnui` variants** over `-baseui` or `-carbon` (matches our Tailwind stack).

## How to Fetch a Component

```bash
curl -s "https://ui.tripled.work/r/{component-name}.json"
```

Response shape:
```json
{
  "name": "hero-section-shadcnui",
  "type": "registry:block",
  "dependencies": ["framer-motion", "lucide-react", "react"],
  "registryDependencies": ["button"],
  "files": [{
    "path": "...",
    "content": "\"use client\";\nimport { motion } from ...",
    "target": "components/uitripled/hero-section-shadcnui.tsx"
  }]
}
```

## Customization Rules (REQUIRED)

Fetched components MUST be customized before use. Never use them as-is:

1. **Replace colors** with the active style preset tokens
2. **Replace fonts** to match the typography pairing
3. **Strip banned patterns** per `anti-slop.md`:
   - Remove neon glow shadows
   - Replace pure #000/#fff with preset colors
   - Remove decorative gradients (unless preset allows)
   - Replace Inter-only with preset font pairing
4. **Adjust spacing** to match preset section padding
5. **Replace placeholder content** with realistic data
6. **Rename the component** to match project naming convention (e.g., `ObsidianHero` not `HeroSection`)
7. **Remove unused dependencies** (e.g., lucide-react if not needed)

## Workflow Integration

### In `/design`:
After Step 2 (Configuration), before Step 3 (Design Intent):
1. Read `skills/uitripled-registry.json`
2. For each planned section, search for matching components
3. If a match scores > 70% relevance: fetch it, customize it, use as base
4. If no good match: build from scratch as before

### In `/copy`:
After Step 5 (Plan Report), during Step 6 (Implementation):
1. For each section to build, search uitripled for matching blocks
2. Fetch matching components as starting points
3. Apply the auto-generated style preset to override all visual tokens
4. Restructure layout to match the reference exactly

## Key Components for Common Patterns

| Need | Component | Name |
|---|---|---|
| Landing hero | Hero with staggered reveal | `hero-section-shadcnui` |
| Feature grid | Animated grid with icons | `feature-grid-section-shadcnui` |
| Pricing table | Pricing cards with toggle | `pricing-section-shadcnui` |
| Testimonials | Quote carousel | `testimonials-section-shadcnui` |
| CTA banner | Gradient CTA | `cta-banner-section-shadcnui` |
| FAQ | Animated accordion | `faq-section-shadcnui` |
| Navbar | Animated underline nav | `animated-navbar-shadcnui` |
| Footer | Multi-column footer | `footer-section-shadcnui` |
| Chat UI | Full chat interface | `chat-app-shadcnui` |
| Command palette | Keyboard nav search | `command-palette-shadcnui` |
| 3D card flip | Credit card with flip | `credit-card-shadcnui` |
| Magnetic hover | Cursor-following wrapper | `native-magnetic-shadcnui` |
| Typewriter text | Auto-typing effect | `native-typewriter-shadcnui` |
| Background effect | Reactive grid | `reactive-background-grid-shadcnui` |
| Spotlight | Cursor spotlight | `spotlight-section-shadcnui` |
