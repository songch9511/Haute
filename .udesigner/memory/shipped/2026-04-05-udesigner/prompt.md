# UDesigner — Stop shipping AI slop (self-landing)

**Source**: original (dogfood session Phase 6 C)
**Intent**: Meta landing page for UDesigner tool itself. Tech-tier (Vercel/Framer/Stripe class) not Agency-tier. Dark mono-dominant palette. Brutal anti-slop aesthetic — the landing IS the value prop. Real data only (actual code-oracle outputs, real commit hashes, real benchmark numbers). Zero marketing fluff.

## Original Prompt (session narrative)

Landing page for UDesigner — the high-agency design harness we're shipping. Aesthetic must embody the tool's own ethos: mono-tech, dark, restrained, zero AI defaults, confident asymmetry. Must include real proof — code-oracle output from the red-team test, actual benchmark numbers from the Catalis fix loop (79 → 99), real commit hashes in the footer. Eight sections: nav, hero, proof strip, two pillars (memory + oracle), how-it-works (5 phases), benchmark tables, install, footer. Layout diversity rules enforced — no two consecutive same-grid sections, ≥40% non-center, padding varied.

## Design Decisions

- **Tier**: Tech tier (Vercel/Framer/Stripe class), explicitly NOT agency tier. Precision > editorial drama.
- **Palette**: `#0a0a0a` bg + `#f5f5f5` text + `#00d9a5` accent (signal green, used ONLY for active states, key numbers, `$` prompt). Three colors total, zero gradients.
- **Typography**: Geist Mono for display (all section headers + code), Geist Sans for body. Mono-dominant. Scale: `clamp(3rem, 9vw, 8rem)` hero, down to `text-[11px]` mono eyebrows.
- **Motion**: Restrained. Spring easing, `y: 16 → 0` entries only. No `whileInView` on body sections (Playwright fullPage + intersection observer bug caught in dogfood).
- **Layout diversity**: 8 sections, 8 distinct patterns (pill nav / asymmetric 60-40 hero / full-width code block / 60-40 split / 40-60 split / horizontal scroll strip / 2-col tables / single-line terminal / 4-col footer).

## Key Content Anchors

- Hero: "Stop shipping AI slop." (italic accent on 'slop' via color token, not font-style)
- Proof strip: real `verifier/code-oracle.js verifier/red-team` output
- Pillars: ASCII memory tree + animated weight bars (Visual 45 / Code 40 / Mechanical 15)
- Benchmark: real Catalis before/after tables (79 → 99)
- Footer: live commit hash `e6eccce`, code score `99/100`

## Session Bugs Caught (feedback loop)

1. **`motion.width` animation** (line 122-123 pillars.tsx) — Code Oracle caught on per-section verify. Fixed to `scaleX` + `origin-left`.
2. **`whileInView` on body sections** — Visual Oracle caught. Playwright `fullPage: true` doesn't trigger intersection observer, so `initial={{ opacity: 0 }}` stays. All body-section `whileInView` replaced with immediate `animate`. The rule "hero must use immediate animate" should be extended to "any section captured by fullPage Playwright should use immediate animate".

## Lessons → Memory

- Future `/design` sessions: **do not use `whileInView` at all unless specifically designing for user-scroll UX**. Playwright capture is the default verification path.
- Horizontal scroll strips work (how-it-works) but only show 4 cards in 1440px viewport — if the 5th is critical, re-think layout.
- Meta prompts (tool landing for own tool) have **no external reference** — Parallel Agent Think step is mostly skippable in these cases.
