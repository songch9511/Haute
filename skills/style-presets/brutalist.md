---
name: style-preset-brutalist
description: Swiss typography meets industrial terminal. Two modes — Swiss Print (clean grid) and CRT Terminal (retro tech). Raw, mechanical, zero decoration.
---

# Brutalist Preset — Industrial / Swiss / Terminal

Override dials: `DESIGN_VARIANCE: 9, MOTION_INTENSITY: 3, VISUAL_DENSITY: 7`

## Two Modes

### Mode A: Swiss Print
Clean, grid-obsessed, typographic hierarchy.

**Typography:**
- Headings: Neue Haas Grotesk, Helvetica Neue, or Geist Sans (weight 900)
- Body: Same family, weight 400
- ALL CAPS headings with wide letter-spacing (+0.1em)
- Strict modular scale: 1.5 ratio (major fifth)

**Color:**
```
--bg-primary:    #f5f3ef    (warm paper)
--text-primary:  #1a1a1a
--accent:        #e63946    (signal red — used ONLY for emphasis)
--border:        #1a1a1a    (full contrast borders)
```

**Layout:**
- Visible grid lines (1px borders between columns)
- No border-radius anywhere (0px on everything)
- Extreme type size contrast (12px body, 96px headline)
- Generous margins, tight line-height on headings (1.0)

### Mode B: CRT Terminal
Retro-tech monospace interface.

**Typography:**
- ALL text: Geist Mono or JetBrains Mono
- No font-size variation except hierarchy by weight/color
- Text rendering: slightly pixelated feel via text-shadow

**Color:**
```
--bg-primary:    #0a0a0a
--text-primary:  #33ff33    (phosphor green)
--text-secondary:#1a8a1a
--accent:        #ff3333    (error/alert only)
--border:        #1a331a
```

**Effects:**
- Scanline overlay: repeating-linear-gradient with 2px transparent/1px dark
- Text glow: `text-shadow: 0 0 8px rgba(51, 255, 51, 0.3)`
- Cursor blink animation on active elements
- CRT screen curvature: subtle `border-radius: 8px` on main container only

## Shared Rules (Both Modes)
- No shadows (flat design)
- No gradients
- No rounded corners (except CRT screen edge)
- No images — text and geometric shapes only
- Borders: always 1px or 2px, never subtle/transparent
- Motion: minimal — only state changes, no decorative animation
- Hover: invert colors (bg ↔ text) or underline only
- ASCII decoration allowed: `[ ]`, `|`, `—`, `>>`, `::`, `///`
