---
name: style-preset-catalis
description: Light, professional fintech aesthetic. Condensed serif headings, clean sans body, blue accent, generous whitespace, card-heavy layout with glassmorphic hero decorations.
---

# Catalis Preset — Light Professional Fintech

Override dials: `DESIGN_VARIANCE: 5, MOTION_INTENSITY: 7, VISUAL_DENSITY: 4`

## Typography
- Headings: Cormorant Garamond (condensed serif, weight 400, italic for emphasis words)
- Body: Inter (only as body, paired with distinctive heading — allowed per taste-core)
- Heading letter-spacing: -0.04em (tight, condensed feel)
- H1: 4.5rem / 1.1
- H2: 3.5rem / 1.2
- H3: 1.5rem / 1.33
- Body: 1rem / 1.5
- Body small: 0.875rem / 1.5
- Max 3 weights: 400 (heading), 400 (body), 500 (labels/buttons)

## Color
```
--bg-primary:    #fafafa       (NOT pure white)
--bg-elevated:   #ffffff
--bg-surface:    #f5f5f5
--bg-dark:       #1a1a1a       (footer, NOT pure black)
--border:        #efeff2
--border-alt:    #27272a
--text-primary:  #131313
--text-secondary:#4c4c4c
--text-on-dark:  #e8e8e8       (NOT pure white)
--accent:        #0054f9       (blue)
--accent-hover:  #003fd4
```

## Layout
- Container max-width: 80rem (1280px)
- Section padding: 5rem top/bottom
- Page padding: 3.25rem left/right (desktop), 1.5rem (mobile)
- Grid gap: 1.25rem (standard)
- Card padding: 2rem (large), 1.5rem (medium), 0.75rem (compact)

## Shadows
- Cards: 0 0 32px rgba(0,0,0,0.07)
- Elevated: 0 4px 15px rgba(0,0,0,0.12)
- Hero decorative: 0 5px 21px rgba(0,0,0,0.12)

## Buttons
- Primary: bg #0054f9, text white, px-6 py-2, rounded-full (2rem), font-medium
- Secondary: bg transparent, text #131313, border 1px #27272a, px-6 py-2, rounded-full
- Hover: translateY(-1px), shadow elevation
- Active: scale(0.98)

## Border Radius
- Cards: 2rem (32px)
- Feature cards: 1.5rem (24px)
- Buttons: 2rem (pill)
- Inputs: 1.5rem

## Motion
- Scroll-triggered fade-up on sections (MOTION: 7)
- Stagger children by 60ms
- Card hover: translateY(-2px) + shadow, 200ms
- Button: translateY(-1px), 150ms
- Testimonial: infinite horizontal scroll CSS animation
- Hero cards: staggered spring entrance from right
- Nav links: opacity 0.7 → 1 on hover

## Distinctive Patterns
- Blue star badge SVG before section headings
- Italic emphasis on key words in subheadings (serif italic)
- Corner SVG decorations on hero section
- Glassmorphism on hero decorative cards ONLY (max 2)
- Gradient fade edges (left/right) for testimonial scroll
- Dark footer with newsletter form
