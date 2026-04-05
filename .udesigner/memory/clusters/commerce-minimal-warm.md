# Cluster: commerce-minimal-warm

Boutique e-commerce landings for skincare, beauty, fragrance, and lifestyle products. **Glossier · Aesop · Nécessaire · Byredo tier** — warm cream grounds, light-weight Outfit sans display, sienna/terracotta accent, high-quality product photography mixed with typography-only editorial sections. The aesthetic is quieter than `editorial-romantic` and more commercially focused — product is the anchor, not art.

## Representative Shipped

- `2026-04-06-sola` — Sola minimal skincare landing (composite 90/100 APPROVE, 2 rounds)

## Signature Tokens

- **Background**: `#faf6f0` primary warm cream, `#f5ede4` secondary (slightly darker cream for emphasis sections)
- **Foreground**: `#2c2420` warm dark brown, `#5a4f47` body, `#8a7a6e` muted, `#a8927e` dim
- **Accent**: `#b5704f` sienna/terracotta — used for eyebrow labels, italic emphasis, stat numbers, CTA band bg
- **Typography**: Outfit (light 300 / regular 400 / medium 500) for all display headings. Geist Sans body. No serif, no mono.
- **Display scale**: `clamp(3.5rem, 10vw, 10rem)` hero, `clamp(3.5rem, 8.5vw, 9rem)` pullquote, `text-[72-84px]` section headers
- **Weight**: `font-light` (300) for display headings, NOT semibold — this cluster is airy, not commanding
- **Italic accent**: key phrase in each headline gets `italic font-weight-300` in base text color or accent color
- **Radii**: `rounded-[4px]` on product cards (not rounded-2xl)
- **Shadows**: NONE (per cross-cluster rule)

## Signature Patterns

- **Hero**: full-bleed product still-life photography (single product on linen/cream) as background with warm overlay gradient. Title bottom-left, BIG scale, italic accent on second phrase. CTA + secondary link below.
- **Section numbering**: `N° 01 · Philosophy`, `N° 02 · Essentials` etc. — editorial folio eyebrows, text-[11px] uppercase tracking-[0.24em] in sienna
- **Photography allocation**: 5 photos total (hero, 3 products, CTA), rest is typography-only — prevents image quality roulette
- **Text-only sections**: Philosophy (stats trio), Lifestyle (warm sienna accent band with display-size pullquote), Ingredients (horizontal text-card strip) — typography carries weight without photography
- **Product grid**: 3 essentials (NOT 4) in asymmetric 7+5 top row + 12-wide bottom row. "Three essentials. That's it." — product count IS the message
- **Sienna accent band**: full-width warm terracotta bg with light-weight display pullquote as page's typographic climax
- **CTA**: 50/50 split with sienna left + photography right

## Content Principles

- **"Nothing extra" discipline**: brand copy applies to UI too. 3 products not 10. 9 actives not 30. Text-only where image adds no value.
- **Concentrations upfront**: ingredient cards show concentration + role as metadata, not hidden behind clicks
- **Real testimonials format**: named users with skin type + duration of use, not anonymous

## Anti-patterns (specific to this cluster)

- Serif display fonts — this is a sans cluster (Outfit). Serif belongs to `editorial-romantic` or `warm-editorial`
- Dark backgrounds — warm cream only, dark only in footer
- Busy photography (multiple products in one frame) — one product per still-life, clean negative space
- Image roulette with remote Unsplash URLs — download to `public/sola/` for reliability, visual-verify each before embedding
- rounded-2xl or large radii — this cluster uses sharp or near-sharp corners (rounded-[4px])
- Marketing fluff in product copy — use specific ingredients and concentrations instead

## Composite Baseline

- `2026-04-06-sola`: **90/100 APPROVE** (visual 83 · code 100 · mechanical 86). Reached in 2 iteration rounds — fastest to APPROVE in the system's history.
