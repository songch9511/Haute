# Cluster: editorial-romantic

Magazine-tier editorial layouts that treat the product as an **exhibit in a printed issue**, not a dashboard. Warm cream grounds, Fraunces (or comparable soft editorial serif) as display face with `font-semibold` for readability, classical romantic paintings as full-bleed hero backgrounds or embedded plates, mono only as a code-exhibit accent. The aesthetic reference is 19th-century British romanticism (Turner, Constable, Friedrich) + contemporary art-magazine layouts (Apartamento, The Gentlewoman, PIN-UP).

## Representative Shipped

- `2026-04-05-udesigner` — UDesigner self-landing v3.4 editorial. Composite **93/100 APPROVE** (visual 88 / code 100 / mechanical 86). First entry to reach full APPROVE verdict.

## Signature Tokens

- **Background**: `#faf6ea` primary (warm cream, NOT pure white, NOT yellow). Alternating strips `#ede2cd` for emphasis
- **Foreground**: `#120e08` deep warm-black (NOT `#000000`, NOT cool `#131313`), `#2a1d10` body, `#6b5a4a` muted, `#a0917f` dim
- **Accent**: `#8a3a1e` deep sienna / terracotta — used for italic emphasis, eyebrow labels, single-word color pops. NEVER as background fill
- **Painting highlights**: `#ffd4a8` soft peach (for CTAs and key glyphs over dark painting backgrounds)
- **Border**: `#c4ae82` subtle warm tan for card edges, `#d4c4a8` for section dividers (use sparingly)
- **Typography**: **Fraunces** (via `--font-cormorant` variable, aliased for back-compat) with `font-semibold` class always applied to display headings. Geist Sans for body. Geist Mono for actual code blocks only
- **Display scale**: `clamp(3.5rem, 11vw, 10rem)` hero title, `text-[36-72px]` section headers, `text-[28-44px]` card titles
- **Tracking**: `-0.025em` to `-0.035em` on display, `0.22em` uppercase on mono eyebrows
- **Radii**: `rounded-[4px]` to `rounded-[6px]` on cards (printed paper, not soft UI chips), `rounded-full` only for hero CTA pills
- **Shadows**: **NONE on box elements** (user-enforced). Only `text-shadow` for readability over painting backgrounds

## Signature Patterns

- **Hero**: **Full-bleed romantic painting background** (e.g., Friedrich "Wanderer above the Sea of Fog") with a centered Fraunces serif display, italic-accent on one key word, small mono install command below the CTAs, painting attribution as bottom plate
- **Nav**: Full-width edge-to-edge dark translucent bar over the hero painting — `bg-[#faf6ea]/15 backdrop-blur-md` (15% cream glass) with warm-white text. No border-bottom, no shadow
- **Editorial folio lines**: `N° I · Exhibit`, `N° IV · Pillar · MMXXVI` mono eyebrows at `text-[10-11px]` with `tracking-[0.22em]`
- **Section layout**: Two-tier eyebrow (col-span-2 mono label + col-span-8 serif title + col-span-2 meta on the right) over a 12-col grid
- **Italic single-word accent**: Every section headline has one italic word in sienna accent — "Two *pillars* hold the weight", "Stop shipping *AI slop.*", "A fix loop, *proven live.*"
- **Terminal exhibits**: Actual CLI outputs presented as framed dark plates inside the editorial flow — treated as museum-label inlays, not decorative widgets
- **CTA close**: Large cream card over a full-height Constable-class pastoral painting, with bottom gradient fade-to-black meeting the footer seamlessly

## Content Principles

- **Real data over marketing prose**: actual code-oracle outputs, real commit hashes in the footer, verified benchmark numbers in the ledgers
- **Single sharp verb headlines** with italic emphasis on one word
- **Painting attributions in situ** — every painting has a figcaption with title + artist + year + exhibit number
- **Mono reserved for proof surfaces** — CLI blocks, commit hashes, stats. Never for display headings.

## Anti-patterns (specific to this cluster)

- Pure white backgrounds — breaks the warm editorial tone
- Box shadows on any surface (user-enforced rule from this session's feedback)
- Gratuitous section-header border-b dividers (user-enforced rule — "무의미한 구분선 남발 금지")
- Bright/cold accent colors like signal green — belongs to `mono-dark-tech`
- Mono display fonts — sans for body, serif for display, mono for code exhibits only
- Heavy card-modal styling (bg + border + shadow) — prefer flat column rules or airy padding
- Stock/AI illustration — only public-domain classical paintings (downloaded locally to `public/art/`)
- Centered-everything hero with stacked text + subtitle + CTA — this cluster uses asymmetric or painting-anchored heroes
- Remote Wikimedia URLs — use local `public/art/` to avoid hotlink 404s

## Relation to Other Clusters

- vs `warm-editorial` (Catalis/fintech): shares warm off-white axis and serif display, but `editorial-romantic` uses classical paintings as structural content and a brown/sienna palette rather than blue accent; also uses Fraunces rather than Cormorant
- vs `mono-dark-tech` (old UDesigner v1): complete inversion — dark → light, mono → serif, brutal → romantic, signal-green → sienna. Same product, two distinct aesthetic worlds
- vs `knowledge-tool-dark` (Obsidian): opposite brightness axis, opposite typography discipline, opposite imagery (screenshot mockups vs classical paintings)

## Composite Baseline

- `2026-04-05-udesigner`: **v3.4 composite 93/100 APPROVE** (visual 88 · code 100 · mechanical 86). Reached after 4 iteration rounds against Visual Oracle + user feedback loop.
