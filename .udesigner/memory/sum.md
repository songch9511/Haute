# Taste Summary

**Aesthetic range** *(2 shipped — trajectory still early, two distinct clusters):*

The taste profile spans two intentionally different axes, not a unified style:

- **`warm-editorial`** — serif display (Cormorant class) + geometric sans body, warm off-white grounds (`#fafafa`), restrained saturated accent, asymmetric fan-spread hero compositions, 1.5–2rem rounded radii. Editorial drama via italic emphasis and generous whitespace. Catalis (fintech-analytics landing) is the representative but ships with REJECT-level Visual Oracle findings — source-only backfill, defect-aware.

- **`mono-dark-tech`** — tech-tier mono-dominant (Geist Mono / JetBrains) on near-black grounds (`#0a0a0a`), single signal-green accent (`#00d9a5`) used only for active states and key numbers. Brutal anti-slop restraint, real data over marketing prose, editorial confidence via asymmetry + scale contrast rather than ornamentation. UDesigner self-landing is the representative — first entry to reach APPROVE_WARNING (86/100) via full 3-lane composite on live render.

**Cluster distribution** *(2 shipped)*:
- `mono-dark-tech` — 1 (UDesigner, composite 86/100, status: validated)
- `warm-editorial` — 1 (Catalis, composite 61/100, status: provisional-with-defects)

**Cross-cluster constants** *(shared don'ts regardless of aesthetic)*:
- Equal-children bento grids (especially 3-equal card rows with icon+title+body)
- `useInView` on hero sections (hero must animate immediately on mount)
- `whileInView` on body sections (incompatible with Playwright `fullPage: true` capture — intersection observer does not fire, sections render invisible in Visual Oracle evidence)
- `whileHover.boxShadow` or other non-transform motion props (use CSS `hover:shadow-*` + `transition-shadow` instead)
- `motion.width` animations (use `scaleX` + `origin-left`)
- Purple/violet-to-blue gradients (LILA BAN)
- CSS `background:` shorthand with gradient — must be `backgroundImage` + `backgroundColor` separately
- Center-aligned layouts exceeding 60% of sections
- Uniform `py-24` section rhythm
- Marketing fluff ("Elevate", "Seamless", "Unleash", "Next-generation")
- Placeholder names (John Doe, Jane Doe, Acme Corp, Nova Corp) and Lorem ipsum
- `div` with `onClick` (use `button` with `type="button"`)
- `img` without `alt`

**Source-only backfill lesson** *(encoded 2026-04-05 after dogfood)*: Phase 0 backfill populated `warm-editorial` from source code inspection only — Visual Oracle never ran. The Phase 3 MVP live test revealed 3 blocker-severity rendering issues in Catalis that pure source analysis missed. **Rule going forward**: future Memory Push must include at least one live Visual Oracle pass before a shipped entry is claimed as cluster exemplar. Source tokens + AST fingerprint are insufficient evidence of aesthetic quality.

**Dogfood lesson (Phase 6 C)**: `whileInView` + Playwright fullPage capture is incompatible — intersection observer does not fire for layout-based screenshots. This was discovered live when UDesigner landing's 3500px body void was caught by Visual Oracle. All body-section entry animations must use immediate `animate` or CSS transitions, not `whileInView`. The existing "hero must use immediate animate" rule now extends to the entire page when Playwright is the default verification path.

**Open trajectory**: 2 shipped across 2 clusters — still insufficient for trend inference but enough to establish dual-aesthetic baseline. Compactor (Phase 5) will begin reshaping this file at cluster count ≥ 5 or member count ≥ 8. Until then, manual curation on Wisdom phase.
