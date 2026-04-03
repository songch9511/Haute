---
name: style-preset-soft
description: Luxury/agency aesthetic. Glass morphism, editorial typography, warm tones, generous whitespace. Feels like a $150k agency build.
---

# Soft Preset — Luxury Agency Aesthetic

Override dials: `DESIGN_VARIANCE: 8, MOTION_INTENSITY: 6, VISUAL_DENSITY: 3`

## Typography
- Headings: Playfair Display or Fraunces (serif, editorial feel)
- Body: Outfit or Satoshi (geometric sans, clean contrast)
- Heading weight: 400-500 (light and elegant, NOT bold)
- Letter-spacing headings: -0.03em
- Text sizes: larger than default — base 18px, headings up to 4rem

## Color
```
--bg-primary:    #0c0c0c
--bg-elevated:   #141414  with backdrop-blur-xl (glass effect)
--border:        rgba(255, 255, 255, 0.06)
--text-primary:  #ede9e3    (warm off-white)
--text-secondary:#8a8580    (warm gray)
--accent:        #c8a97e    (warm gold — NOT bright yellow)
```

## Layout
- Extreme whitespace: section padding py-32 to py-48
- Asymmetric layouts: 60/40 or 70/30 splits
- Double-bezel: nested containers with subtle border differences
  ```
  outer: border border-white/5 rounded-2xl p-1
  inner: bg-elevated rounded-xl p-8
  ```
- Max-width: 960px for content areas

## Motion
- Spring-based: gentleSpring for everything
- Hover: subtle translateY(-2px) + warm shadow
- Enter: slow fade-up (500ms, ease-out)
- Parallax: subtle depth on scroll (max 20px offset)

## Distinctive Patterns
- Oversized quotes with thin serif font
- Subtle grain texture overlay (opacity 0.03)
- Horizontal rules: 1px, gradient from transparent → border → transparent
- Image treatment: slight desaturation (filter: saturate(0.85))
