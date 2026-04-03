---
name: style-preset-minimal
description: Editorial/Notion-style clean interface. Warm monochrome, extreme typographic discipline, crisp borders, keyboard-first UX.
---

# Minimal Preset — Editorial / Clean

Override dials: `DESIGN_VARIANCE: 5, MOTION_INTENSITY: 3, VISUAL_DENSITY: 5`

## Typography
- Primary: Geist Sans (weight 400 body, 500 headings)
- Monospace accents: Geist Mono for labels, metadata, timestamps
- Type scale: conservative 1.2 ratio (minor third)
- Headings: 500 weight, NOT bold. Hierarchy by size and spacing, not weight.
- Uppercase sparingly: only for small labels/badges, letter-spacing +0.05em

## Color
```
Light mode (default for this preset):
--bg-primary:    #fafaf9    (warm white)
--bg-elevated:   #ffffff
--bg-surface:    #f3f2f0
--border:        #e8e6e3    (warm gray border)
--text-primary:  #1c1917    (warm black)
--text-secondary:#78716c
--text-tertiary: #a8a29e
--accent:        #1c1917    (black as accent — links, buttons)
```

## Layout
- Single-column content: max-width 680px (like a document)
- Sidebar + content: 240px sidebar + fluid content
- Generous vertical spacing: py-16 between sections
- Consistent horizontal padding: px-6 mobile, px-8 desktop
- No cards — use spacing and subtle borders to separate content

## Components

### Navigation
- Left sidebar, full height, 240px wide
- Sections separated by 1px border, not headings
- Active item: bg-surface, font-weight 500
- Collapse to hamburger below md:

### Lists
- No bullets — use spacing (gap-3 between items)
- Interactive rows: full-width hover bg-surface
- Metadata right-aligned in muted text

### Buttons
- Primary: bg-text-primary text-bg-primary (inverted)
- Secondary: border border-border (outlined)
- Border-radius: 6px (subtle, not too round)
- Size: compact — px-3 py-1.5 text-sm

### Inputs
- Border-bottom only (no full border box) for text fields
- OR: very subtle full border (border-border)
- Focus: border-text-primary (black focus, not colored ring)

### Badges / Tags
- Inline, text-xs, font-mono
- bg-surface text-secondary
- border-radius: 4px, px-2 py-0.5

### Keyboard Shortcuts
- Display with `<kbd>` styling
- bg-surface border border-border rounded-md px-1.5 py-0.5 text-xs font-mono
- Shadow: inset 0 -1px 0 border (pressed key effect)

## Motion
- Minimal: 150ms ease-out for hover states only
- No enter animations
- No scroll effects
- Page transitions: instant (no animation)
- Preference: CSS transitions only, no JS animation library

## Distinctive Patterns
- Breadcrumbs with `/` separator in muted text
- Timestamp format: relative ("2h ago") in font-mono
- Empty states: centered icon (24px, muted) + single line text
- Dividers: 1px border-border, full width, my-8
- Tooltip: plain text, no bg, just appears below with small arrow
