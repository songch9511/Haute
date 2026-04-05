# Cluster: mono-dark-tech

Tech-tier (Vercel / Framer / Stripe / Linear / Raycast class) developer and design tool landings. Near-black grounds, mono-dominant typography, single signal-green accent, brutal anti-slop restraint, real data over marketing prose. Editorial confidence via asymmetry + dramatic scale contrast, not via ornamentation.

## Representative Shipped

- `2026-04-05-udesigner` — UDesigner self-landing (primary exemplar, composite 86/100)

## Signature Tokens

- **Background**: `#0a0a0a` primary (NOT `#000000`), `#0d0d0d` alternating strip, `#050505` for terminal/code surfaces
- **Foreground**: `#f5f5f5` primary, `#8a8a8a` muted, `#4a4a4a` dim (for meta/timestamps)
- **Accent**: `#00d9a5` signal green — used ONLY for active states, key numbers, `$` shell prompts. Never fill, never as secondary color
- **Signal**: `#ff6b6b` for errors, `#ffd166` for warnings (both muted, not saturated)
- **Border**: `rgba(255,255,255,0.08)` near-invisible dividers. Subtle border-as-structure
- **Typography**: **Mono-dominant** (Geist Mono / JetBrains Mono / Berkeley Mono) for display AND body. Sans only for long-form prose
- **Display scale**: `clamp(3rem, 9vw, 8rem)` hero, down to `text-[11px]` mono eyebrows with `0.14em` tracking
- **Radii**: `12px` cards (not soft, not sharp), `full` only for nav pills
- **Motion**: Restrained. Spring `[0.22, 1, 0.36, 1]`, `y: 8-24px` entries, no distances > 32px

## Signature Patterns

- **Nav**: Sticky pill, `bg-white/[0.04] backdrop-blur-xl`, mono monogram + accent CTA
- **Hero**: Asymmetric 60-40 or 70-30 split. Left = mono display title with **color-shift emphasis** (not italic). Right = live data cards or code block
- **Proof strip**: Full-width terminal card with real CLI output, syntax-minimal coloring (error red, warn yellow, accent green)
- **Section transitions**: Alternate `#0a0a0a` ↔ `#0d0d0d` backgrounds. No 3+ same background
- **Lists / tables**: Mono columns, tabular-nums, color encoding for numeric verdict (green/yellow/red)
- **Footer**: 4-5 col mono links, live commit hash + verification timestamp at bottom
- **Horizontal scroll**: `snap-x snap-mandatory` for phase strips or process steps — better than stacked grids for 4+ items
- **Animated reveals**: Use `transform` (x/y/scale/opacity) only. Bar fills via `scaleX + transformOrigin: left`, NOT `width`. No `whileInView` on body sections (Playwright fullPage incompatible)

## Content Principles

- **Real data only**: commit hashes, actual CLI output, verified benchmark numbers. Zero "lorem ipsum" / "John Doe" / fake company names
- **Mono code blocks prominent**: terminal aesthetic is part of the value prop, not decoration
- **Single-word color emphasis** replaces italic serif drama of warm-editorial cluster
- **Marketing fluff banned**: no "Elevate", "Seamless", "Unleash", "Next-generation". Describe actual behavior

## Anti-patterns (specific to this cluster)

- Purple/violet-to-blue gradients (LILA BAN — universal, but especially wrong here)
- Centered-everything hero with subtitle + CTA stack
- Stock icon sets (Lucide/Phosphor) used without typographic support — icons must be earned
- Generic feature grids (3-equal or 4-equal cards with icon+title+body pattern) — use asymmetric spans or horizontal scroll instead
- `whileInView` on body sections — intersection observer fails under Playwright fullPage capture
- `motion.width` animations — use `scaleX` + `origin-left`
- Soft pastel accents — palette must be high-contrast
- Serif display faces — mono-dominant is a hard cluster rule

## Composite Baseline

First shipment: **86/100** (visual 73 / code 100 / mechanical 86). Known refinement vectors for next iteration:
- Five-phases section too symmetric (Visual major)
- Install CTA too small relative to section weight (Visual major)
- Hero meta column disconnection (Visual minor)
