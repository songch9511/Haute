---
name: taste-core
description: Core design principles for premium frontend generation. 3-dial parameterization, typography rules, color system, layout strategies, and component standards.
---

# Taste Core — Premium Design Principles

## 1. Configuration Dials

Three parameters control the design output. Set per-task; defaults below.

```
DESIGN_VARIANCE:  7   (1=symmetric/safe → 10=asymmetric/experimental)
MOTION_INTENSITY: 5   (1=hover-only → 10=scroll-triggered choreography)
VISUAL_DENSITY:   4   (1=spacious gallery → 10=packed cockpit/dashboard)
```

### Dial Thresholds (rules activate at these levels)

| Rule | Activates When |
|---|---|
| Centered hero sections BANNED | DESIGN_VARIANCE > 4 |
| Asymmetric grid layouts required | DESIGN_VARIANCE > 6 |
| Masonry/broken grid allowed | DESIGN_VARIANCE > 8 |
| Magnetic hover effects | MOTION_INTENSITY > 5 |
| Scroll-triggered animations | MOTION_INTENSITY > 6 |
| Page transition choreography | MOTION_INTENSITY > 8 |
| Monospace for all numbers | VISUAL_DENSITY > 7 |
| Compact spacing (py-2/py-3) | VISUAL_DENSITY > 7 |
| Data tables over cards | VISUAL_DENSITY > 8 |

---

## 2. Typography

### Font Selection
Choose ONE of these pairings. Never mix more than 2 families.

| Pairing | Headings | Body | Use Case |
|---|---|---|---|
| Modern Sans | Outfit / Cabinet Grotesk | Geist Sans | SaaS, dashboards |
| Tech Mono | Geist Mono | Geist Sans | Dev tools, data-heavy |
| Editorial | Playfair Display / Fraunces | Outfit | Landing pages, portfolios |
| Geometric | Satoshi / General Sans | Inter\* | (Inter ONLY as body, never alone) |

\*Inter may ONLY be used as body text paired with a distinctive heading font. Never as the sole font.

### Type Scale
Use a consistent ratio. Recommended: 1.25 (Major Third) or 1.333 (Perfect Fourth).

```
--text-xs:   0.75rem    (12px)
--text-sm:   0.875rem   (14px)
--text-base: 1rem       (16px)
--text-lg:   1.25rem    (20px)
--text-xl:   1.5rem     (24px)
--text-2xl:  2rem       (32px)
--text-3xl:  2.5rem     (40px)
--text-4xl:  3.5rem     (56px)
```

### Rules
- Heading/body size contrast ratio minimum 2.5:1 (e.g., 56px heading / 16px body = 3.5:1 ✓)
- Line-height: headings 1.1–1.2, body 1.5–1.7
- Letter-spacing: headings -0.02em to -0.04em (tight), body 0 to 0.01em
- Font-weight: use max 3 weights (e.g., 400, 500, 700)
- Numbers in data displays: always tabular-nums, consider monospace font

---

## 3. Color System

### Dark Mode (Default)
```
--bg-primary:    #0e1011    (canvas — NOT pure black)
--bg-elevated:   #161819    (cards, modals)
--bg-surface:    #1e2022    (input fields, hover states)
--border:        #2a2d2f    (subtle borders)
--text-primary:  #f0f0f0    (NOT pure white)
--text-secondary:#8a8f93    (muted text — must pass 4.5:1 on bg-primary)
--text-tertiary: #5a5f63    (labels, captions — must pass 3:1 on bg-primary for large text)
```

### Accent Colors
Choose ONE accent color. Use sparingly — max 10% of visible surface area.

| Mood | Primary Accent | Hover State |
|---|---|---|
| Trust/Finance | #22c55e (green) | #16a34a |
| Energy/Creative | #f59e0b (amber) | #d97706 |
| Calm/Professional | #3b82f6 (blue) | #2563eb |
| Premium/Luxury | #a78bfa (violet) | #8b5cf6 |
| Minimal/Neutral | #f0f0f0 (white) | #d4d4d4 |

### Rules
- Max 6 unique colors in the entire interface
- Never use pure #000000 or pure #ffffff
- All text must pass WCAG AA (4.5:1 normal text, 3:1 large text)
- Gradients: subtle and functional only (e.g., fade to transparent for overflow). No decorative gradients.
- No colored shadows (especially not neon glow)
- Opacity technique: prefer `hsla()` or `/opacity` over layering elements with `opacity` prop (avoids unintended child transparency)
- WCAG requires TWO accent shades: `--accent-bg` (darker, for buttons) + `--accent-text` (lighter, for links). A single accent fails both white-on-accent and accent-on-dark checks.

### Modern color layer — oklch + color-mix (2026-04, required for new designs)

Declare the canonical accent in **oklch** and derive hover/active/subtle states via `color-mix()` rather than hand-picking extra HEX values. oklch is perceptually uniform (channel shifts preserve chroma) and `color-mix()` removes the combinatorial state-token explosion.

```css
:root {
  /* Canonical — pick ONE per accent */
  --accent: oklch(0.74 0.17 158);          /* green */
  --surface: oklch(0.18 0.01 240);          /* near-black canvas */
  --ink: oklch(0.96 0 0);                   /* off-white text */

  /* Derived — never hand-pick these as separate hex */
  --accent-hover:   color-mix(in oklch, var(--accent) 88%, black);
  --accent-pressed: color-mix(in oklch, var(--accent) 78%, black);
  --accent-subtle:  color-mix(in oklch, var(--accent) 14%, var(--surface));
  --ink-muted:      color-mix(in oklch, var(--ink) 62%, var(--surface));
}
```

Rules:
- New designs declare accent/surface/ink as oklch. HEX is permitted only as a comment reference.
- State variants (hover/active/pressed/subtle) MUST be derived with `color-mix()`. Do NOT declare three parallel HEX constants for the same accent.
- Tailwind arbitrary values like `hover:bg-[#8b5cf6]` counting 3+ per file are a Code Oracle error — move the accent into a CSS variable and use `color-mix()`.
- Fallback: wrap in `@supports (color: color-mix(in oklch, red, blue))` only if targeting browsers older than 2024; current Baseline covers Chrome/Edge/Safari/Firefox.

### Light Mode
When light mode is needed, invert the scale:
```
--bg-primary:    #fafafa
--bg-elevated:   #ffffff
--bg-surface:    #f3f4f5
--border:        #e2e4e6
--text-primary:  #111111
--text-secondary:#6b7280
```

---

## 4. Layout & Spacing

> **Layout patterns and section composition:** See `layout-patterns.md` for layout vocabulary (15+ patterns with code).
> **Section pacing and visual rhythm:** See `visual-rhythm.md` for page-level composition templates.
> **Content-to-layout routing:** See `content-layout-map.md` for deciding which layout fits each content type.

### Grid System
- Use CSS Grid (not flexbox percentage math) for page-level layout
- 12-column grid with 24px gap (desktop), 16px gap (mobile)
- Content max-width: 1280px (dashboard), 960px (content/article), 1440px (full-width)

### Spacing Scale
Use 8px base unit. All spacing values should be multiples of 4px.

```
--space-1:  4px     (0.25rem)
--space-2:  8px     (0.5rem)
--space-3:  12px    (0.75rem)
--space-4:  16px    (1rem)
--space-6:  24px    (1.5rem)
--space-8:  32px    (2rem)
--space-12: 48px    (3rem)
--space-16: 64px    (4rem)
--space-24: 96px    (6rem)
--space-32: 128px   (8rem)
```

### Section Spacing
- Between major sections: VARY padding (see `visual-rhythm.md`). Never use the same py-XX on every section.
- Compact: py-12 to py-16 (48–64px) — stat bars, logo strips, transitions
- Standard: py-16 to py-24 (64–96px) — features, content sections
- Breathing: py-24 to py-32 (96–128px) — hero, CTA, dramatic pauses
- Inside cards/containers: p-6 to p-8 (24–32px)

### Responsive Breakpoints
```
sm:  640px   (large phone landscape)
md:  768px   (tablet)
lg:  1024px  (small desktop)
xl:  1280px  (desktop)
2xl: 1536px  (large desktop)
```

### Rules
- Mobile-first: design for < 768px first, then add complexity
- All multi-column layouts MUST collapse to single-column below `md:`
- Full-height sections: use `min-h-[100dvh]` (NOT `h-screen`)
- No horizontal scroll on any viewport
- Touch targets: minimum 44×44px on mobile
- Z-index stacking context: use inline `style={{ zIndex }}` on sections, not wrapper div classes
- `backgroundImage` + `backgroundColor` separately, never `background` shorthand (avoids computed bg transparency trap)

---

## 5. Components

### Buttons
```
Primary:   bg-accent text-bg-primary, px-6 py-3, rounded-lg (8px), font-medium
Secondary: border border-border text-primary, px-6 py-3, rounded-lg
Ghost:     text-secondary hover:text-primary, px-4 py-2
```
- Always include hover + active + focus-visible states
- Transition: 150ms ease-out on background-color and transform
- Active state: scale(0.98) + slightly darker bg

### Cards
- Use cards ONLY when content needs grouping. Spacing alone is often enough.
- bg-elevated, border border-border, rounded-xl (12px), p-6
- No shadow by default. Subtle shadow on hover only if interactive.
- Never stack more than 2 levels of nesting (card inside card)

### Inputs
- bg-surface, border border-border, rounded-lg, px-4 py-3
- Focus: ring-2 ring-accent/50, border-accent
- Placeholder text: text-tertiary
- Labels: text-sm font-medium text-secondary, mb-2

### Navigation
- Sticky top, bg-primary/80 backdrop-blur-xl, border-b border-border
- Height: 64px desktop, 56px mobile
- Logo left, nav center or right, actions far right
- Mobile: hamburger → full-screen overlay or slide-out drawer

---

## 6. Content Quality

### Data Realism
Never use generic placeholder data. Generate realistic content:

| Bad | Good |
|---|---|
| John Doe | Sarah Chen |
| $100.00 | $1,247.83 |
| 1,000 users | 14,729 users |
| Lorem ipsum | Actual descriptive copy |
| Acme Corp | Specific business name |
| user@example.com | s.chen@meridian.io |

### Image Strategy
- Use CSS gradients, SVG patterns, or abstract shapes instead of placeholder images
- If images are needed: use `<img>` with descriptive `alt` and `aspect-ratio` set
- Never reference external image URLs (Unsplash, Placeholder.com, etc.)
- For avatars: use initials with colored backgrounds

### Iconography
- Preferred libraries: Phosphor Icons, Lucide, Radix Icons
- Consistent style: don't mix outline and filled icons
- Size: 20px default, 16px compact, 24px emphasis
- Color: currentColor (inherits text color)

---

## 7. Performance Constraints

- Animate ONLY: `transform`, `opacity`, `filter`, `clip-path`
- Never animate: `width`, `height`, `top`, `left`, `margin`, `padding`
- Use `will-change` sparingly — only on elements currently animating
- Prefer CSS transitions over JS animation when possible
- `useEffect` animations MUST have cleanup functions
- Heavy perpetual animations: isolate in own Client Component
- Image: always specify width/height or aspect-ratio to prevent CLS

### Scroll-linked animation — prefer CSS `scroll-timeline` / `view()`

For body-section reveals and parallax, prefer native CSS scroll-driven animations over `useScroll` + `useTransform`. They run off the main thread and are GPU-composited by default.

```css
@keyframes slide-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
.reveal { animation: slide-up linear both; animation-timeline: view(); animation-range: entry 0% cover 30%; }
```

Rules:
- New body sections use CSS `animation-timeline: view()` for enter reveals. Hero is exempt (immediate `animate`).
- Importing `useScroll` / `useTransform` from `framer-motion` or `motion/react` in a non-hero file is a Code Oracle error. Move to CSS scroll-timeline unless the mapping is non-linear and genuinely requires JS (document the reason inline).
- Firefox lacks full support — include a `@supports (animation-timeline: view())` guard when the reveal is load-bearing; otherwise fall back to visible-at-rest (no hidden content).
