---
name: style-preset-notion
description: Notion product page aesthetic. White canvas, blue primary accent, multi-color feature sections, NotionInter typography, generous spacing, 4-layer micro-shadows. Confident, playful-professional SaaS feel.
---

# Notion Preset — Clean Productivity Aesthetic

Override dials: `DESIGN_VARIANCE: 4, MOTION_INTENSITY: 5, VISUAL_DENSITY: 5`

## Typography
- Headings: Inter, weight 700, letter-spacing -0.03em
- Body: Inter weight 400, paired with Outfit weight 500 for eyebrows/labels
- Hero H1: 64px (4rem), line-height 1.05
- Section H2: 42px (2.625rem), line-height 1.14
- Body: 16px, line-height 1.5
- Small/eyebrow: 14px, weight 500, uppercase tracking 0.05em
- Max 3 weights: 400, 500, 700

## Color
```
--bg-primary:        #ffffff
--bg-elevated:       #f9f9f8     (gray-100, subtle cards)
--bg-surface:        #f6f5f4     (gray-200, hover states)
--border:            rgba(0,0,0,0.1)
--text-primary:      rgba(0,0,0,0.95)   (#000000f2)
--text-normal:       rgba(0,0,0,0.9)    (#000000e6)
--text-muted:        rgba(0,0,0,0.54)   (#0000008a)
--text-body:         #615d59     (gray-600, card body)
--accent:            #0075de     (blue-600, primary CTA)
--accent-hover:      #097fe8     (blue-500)
--accent-active:     #005bab     (blue-700)
--accent-soft:       #e6f3fe     (blue-200, secondary button bg)
--link:              #0075de
--link-hover:        #00396b
```

### Feature Section Colors (theme overrides)
```
--teal:    #27918d   (Custom Agents)
--red:     #f64932   (Smart Search)
--blue:    #097fe8   (AI Meeting Notes)
--yellow:  #ffb110   (Flexible Workflows — dark text only)
```

### Contrast Notes
- Yellow section: use `#191918` text (never white)
- Teal/Red sections: white text only on large/bold text (≥18px bold)
- Blue section: white text OK at all sizes on #0075de

## Layout
- Content max-width: 1252px, centered with 16px mobile / 24px desktop gutter
- Section padding: 160px (10rem) vertical
- Card padding: 24px (1.5rem)
- Grid gap: 16px mobile, 24px desktop
- Breakpoints: sm:600, md:840, lg:1080, xl:1200

## Shadows
```css
/* Level 1 — subtle */
--shadow-s: 0px 3px 9px rgba(0,0,0,0.03), 0px 0.7px 1.5px rgba(0,0,0,0.015);

/* Level 2 — cards, nav dropdown */
--shadow-m: 0px 4px 18px rgba(0,0,0,0.04),
            0px 2px 7.8px rgba(0,0,0,0.027),
            0px 0.8px 2.9px rgba(0,0,0,0.02),
            0px 0.2px 1px rgba(0,0,0,0.013);

/* Level 3 — elevated modals */
--shadow-l: 0px 20px 50px rgba(0,0,0,0.08), 0px 6px 16px rgba(0,0,0,0.04);
```

## Buttons
```
Primary (L):  bg #0075de, text white, h-[46px], px-5 py-[11px], rounded-[10px], font 16px/500
Primary (M):  bg #0075de, text white, h-[36px], px-3.5 py-1, rounded-lg, font 16px/500
Secondary:    bg #e6f3fe, text #005bab, same sizing, rounded-lg
Tertiary:     bg white, text rgba(0,0,0,0.95), border rgba(0,0,0,0.1), rounded-lg
Hover:        primary → #097fe8, secondary → #f2f9ff, tertiary → #f6f5f4
Active:       primary → #005bab, secondary → #93cdfe
```

## Border Radius
- XS: 4px (nav links)
- S: 6px (bento mobile)
- M: 8px (buttons, default)
- L: 10px (large buttons)
- XL: 12px (cards, bento desktop)
- 2XL: 16px (nav dropdown)
- Pill: 9999px (badges, tags)

## Motion
- Hover: 150ms ease-out (bg-color, transform)
- Fade in: 150ms ease-out
- Slide: 300ms cubic-bezier(0.86, 0, 0.07, 1)
- Mobile menu: 350ms cubic-bezier(0.16, 1, 0.3, 1)
- Nav border: appears on scroll (1px bottom)

## Distinctive Patterns
- Color-coded feature sections: each feature card has a unique theme color
- Multi-layer micro-shadows (4 layers) for depth without heaviness
- Clean white canvas — no textures, no grain, no gradients on sections
- Bento grid with mixed-size cards (wide + standard)
- Trust logos in horizontal conveyor with gradient edge fades
- Badge system: "New" / "Soon" pills on feature cards
- Generous section spacing (160px) creates breathing room
- Nav dropdowns with 16px radius + 4-layer shadow
