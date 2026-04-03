---
name: style-preset-obsidian
description: Obsidian.md-inspired dark-first aesthetic. Near-black canvas, purple accent, Inter ExtraBold headlines, generous whitespace, conservative motion. Developer-tool feel with editorial boldness.
---

# Obsidian Preset — Dark Knowledge-Tool Aesthetic

Override dials: `DESIGN_VARIANCE: 4, MOTION_INTENSITY: 3, VISUAL_DENSITY: 3`

## Typography
- Headings: Inter, weight 800 (ExtraBold), large scale (60-70px hero, 46px section)
- Body: Inter, weight 400, 16px base, line-height 1.5
- Logo: Avenir Next or Geist Sans, uppercase, letter-spacing 2px
- Heading line-height: ~1.2 (86px for 70px text)
- Body line-height: 1.5
- Max 3 weights: 400, 600, 800

## Color
```
--bg-primary:      #1e1e1e     (near-black canvas)
--bg-elevated:     #242424     (cards, sections)
--bg-surface:      #2a2a2a     (inputs, hover)
--border:          #363636     (subtle borders)
--border-light:    rgba(255, 255, 255, 0.1)   (nav, dividers)
--text-primary:    #dadada     (NOT pure white)
--text-muted:      #bababa     (secondary text)
--text-faint:      #5a5a5a     (labels, captions)
--accent:          hsl(254, 80%, 68%)   (purple — CTA, links, highlights)
--accent-hover:    hsl(254, 80%, 73%)   (hover state)
--gradient-start:  #1A6DFF     (blue — text gradient only)
--gradient-end:    #C822FF     (magenta — text gradient only)
```

### Gradient Rule
Blue-to-magenta gradient ONLY on text (logo, key emphasis). Never on backgrounds or cards.
```css
.gradient-text {
  background: linear-gradient(135deg, #1A6DFF, #C822FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900;
  opacity: 0.8;
}
```

## Layout
- Content max-width: 1000px, centered
- Section padding: 100px vertical, 30px horizontal
- Subfeature cards: bg-elevated, 1px solid border, radius 10px, shadow 3-layer
- Nav: fixed 66px, semi-transparent bg + backdrop-blur(5px)
- Hero: centered, generous top padding (220px), starfield background pattern

## Shadows (3-layer system)
```css
/* Subtle */
--shadow-s: 0px 1px 2px rgba(0,0,0,0.12),
            0px 3.4px 6.7px rgba(0,0,0,0.18),
            0px 15px 30px rgba(0,0,0,0.3);

/* Dramatic */
--shadow-l: 0px 1.8px 7.3px rgba(0,0,0,0.07),
            0px 6.3px 24.7px rgba(0,0,0,0.11),
            0px 30px 90px rgba(0,0,0,0.2);
```

## Buttons
- Primary: bg accent purple, white text, px-10 py-3.5, radius 6px
- Secondary: transparent, 1px border, same padding/radius
- Font: 18px

## Border Radius
- Small: 4px (buttons, inputs)
- Medium: 8px (cards)
- Large: 12px (modals)
- XL: 16px (feature panels)
- Signature: `30px 3px 30px 3px` (pricing cards — asymmetric)

## Motion
- Conservative: 100-250ms durations, ease-in-out
- No decorative animations
- Hover transitions only (color, border-color, transform)
- Screenshot border-color transition: 250ms ease-in-out
- Dropdown: scale + fade, 200ms

## Distinctive Patterns
- Starfield SVG background on hero (repeat-x)
- 3-layer box shadows for depth
- Asymmetric border-radius on pricing cards
- Frosted glass nav (backdrop-blur + semi-transparent)
- Horizontal gallery with gradient edge fades
- Large whitespace sections (100px+ vertical padding)
