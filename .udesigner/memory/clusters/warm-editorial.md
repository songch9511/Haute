# Cluster: warm-editorial

Editorial layouts on warm off-white grounds (#fafafa class). Serif display + geometric sans body. Restrained accent color, asymmetric hero compositions, card-based information architecture with soft shadows and large radii.

## Representative Shipped

- `2026-04-05-catalis` — Kova financial analytics landing (primary exemplar)

## Signature Tokens

- **Background**: `#fafafa` warm off-white
- **Foreground**: `#131313` near-black (not pure black)
- **Accent**: saturated blue `#0054f9` (used sparingly — accent only, never fill)
- **Muted**: `#6b7280` for captions/metadata
- **Display font**: serif class (Cormorant Garamond or similar) with italic emphasis for single words
- **Body font**: geometric sans (Roboto / Inter)
- **Tracking**: display `-0.04em`, eyebrow `0.08rem` uppercase
- **Radius**: `1.5rem` for cards, `32px` for section frames
- **Card surfaces**: `bg-white/85 backdrop-blur-[10px]` with `shadow-[0_8px_32px_rgba(0,0,0,0.15)]`

## Signature Patterns

- **Hero**: center-stacked text + **fan-spread cards** (rotate -8° / 0° / 8°) at bottom
- **Navigation**: fixed with notch structure or pill-shape, light background over hero gradient
- **Section flow**: alternating alignment — center, split, grid, stats, back to center
- **Motion**: spring-based (`springs.gentle` for content, `springs.snappy` for interactive), y-offset entry distance 16-80px
- **Imagery**: real photography with color-tinted gradient overlay (never flat gradient as bg)

## Anti-patterns

- No equal-children bento grids
- No gradient button backgrounds via CSS shorthand (`background: linear-gradient(...)`) — must use `backgroundImage` + `backgroundColor`
- No `useInView` on hero — hero must `animate` immediately on mount
- No uniform `py-24` across all sections
- No 3+ consecutive sections with center alignment
