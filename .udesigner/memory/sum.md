# Taste Summary

**Aesthetic range** *(3 shipped across 4 clusters — early trajectory, one cluster is now deprecated-by-migration):*

The taste profile spans deliberately different worlds rather than a single house style. Each cluster is a separate discipline, not a variation.

- **`editorial-romantic`** — Magazine-tier layouts with warm cream grounds (`#faf6ea`), Fraunces semibold serif display, sienna accent (`#8a3a1e`), and classical romantic paintings (Friedrich, Constable, Turner) as full-bleed hero backgrounds or embedded plates. Product framed as an exhibit in a printed issue. **UDesigner self-landing v3.4 is the representative — first entry to reach full APPROVE verdict (composite 93/100).**
- **`warm-editorial`** — Cormorant serif + geometric sans body on warm off-white `#fafafa`, saturated blue accent, asymmetric fan-spread hero compositions. Catalis (fintech analytics) is the representative but ships with REJECT-level Visual Oracle findings — source-only backfill, defect-aware.
- **`knowledge-tool-dark`** — Inter sans throughout on soft dark `#1e1e1e` ground, purple HSL accent, centered hero with screenshot-as-hero mockup. Obsidian/Prism clone — creative productivity tier. Source-only backfill, unverified.
- **`mono-dark-tech`** — Geist Mono dominant on brutal `#0a0a0a` ground, signal-green accent, asymmetric title hero. Originally held UDesigner v1 (composite 86) but **migrated out in v3.4 per user feedback**. Cluster definition retained as a valid aesthetic option with zero current members.

**Cluster distribution** *(3 shipped / 4 clusters defined)*:
- `editorial-romantic` — 1 (UDesigner v3.4, composite **93 ✅ APPROVE**, status: validated) ⭐ highest score
- `warm-editorial` — 1 (Catalis, composite 61, status: provisional-with-defects)
- `knowledge-tool-dark` — 1 (Obsidian/Prism, composite null, status: backfilled-unverified)
- `mono-dark-tech` — 0 members (deprecated-by-migration, definition retained)

**Cross-cluster constants** *(shared don'ts regardless of aesthetic)*:
- Equal-children bento grids (especially 3-equal card rows with icon+title+body)
- `useInView` on hero sections — hero must animate immediately on mount
- `whileInView` on **any** body section — incompatible with Playwright `fullPage: true` capture. Intersection observer does not fire for layout-based screenshots, so `initial: opacity 0` stays and sections render invisible. Use immediate `animate` everywhere captured by Playwright.
- `whileHover.boxShadow` or other non-transform motion props — use CSS `hover:shadow-*` + `transition-shadow` instead
- `motion.width` animations — use `scaleX` + `origin-left` and set static `width` via style
- Purple/violet-to-blue gradients (LILA BAN)
- CSS `background:` shorthand with gradient — must be `backgroundImage` + `backgroundColor` separately
- Center-aligned layouts exceeding 60% of sections (except when the cluster explicitly allows centered heros, e.g., `knowledge-tool-dark`)
- Uniform `py-24` section rhythm
- Marketing fluff ("Elevate", "Seamless", "Unleash", "Next-generation")
- Placeholder names (John Doe, Jane Doe, Acme Corp, Nova Corp) and Lorem ipsum
- `div` with `onClick` (use `button` with `type="button"`)
- `img` without `alt`
- **Box shadows** on any card / panel / surface *(user-enforced rule from v3.3 feedback — "그림자 제거")*. Only `text-shadow` for readability over image backgrounds is allowed.
- **Gratuitous section-header border-b dividers** *(user-enforced rule from v3.3 feedback — "무의미한 구분선 남발 금지")*. Keep only structurally essential rules.
- **Card-modal heavy styling** (bg + border + shadow) when the cluster voice is editorial. Prefer flat column rules and airy padding.
- **Remote Wikimedia image URLs** direct-path. Use `Special:FilePath` or download to local `public/art/` to avoid 404s on arbitrary hash-path guesses.

**Source-only backfill lesson** *(encoded 2026-04-05 after Catalis dogfood)*: Phase 0 populated `warm-editorial` from source code inspection only — Visual Oracle never ran. Phase 3 MVP live test revealed 3 blocker-severity rendering issues Catalis had that pure source analysis missed. **Rule**: future Memory Push must include at least one live Visual Oracle pass before a shipped entry is claimed as cluster exemplar. Source tokens + AST fingerprint are insufficient evidence of aesthetic quality.

**whileInView incompatibility lesson** *(encoded 2026-04-05 after UDesigner v1 dogfood)*: `whileInView` + Playwright fullPage capture = sections rendered invisible (3500px black void caught by Visual Oracle). The "hero must use immediate animate" rule extends to the entire page when Playwright is the verification path.

**Editorial redesign lesson** *(encoded 2026-04-06 after UDesigner v3.4 session)*: A single product can live credibly in multiple clusters. UDesigner v1 was a perfectly defensible `mono-dark-tech` landing (composite 86), but user feedback that "개발자 도구 느낌" conflicted with the "design agent" positioning triggered a full editorial pivot to `editorial-romantic`. Result: composite 61 → 93 across 4 iteration rounds in one session. Key insight: **positioning determines cluster, not capability**. Before locking a cluster assignment, confirm the product's positioning matches the cluster's tone, not just its technical feasibility.

**User vs Oracle preference divergence lesson** *(encoded 2026-04-06)*: Visual Oracle is advisor, not dictator. In this session Oracle preferred a zig-zag staggered five-movements layout (flagged it +8 delta), but user explicitly rejected it and chose a flat horizontal scroll. Composite reached APPROVE 91 → 93 with the user-preferred layout anyway. **When user preference and Oracle recommendation diverge, user wins, and the composite often improves anyway because user-preferred layouts carry semantic coherence the Oracle's rubric can't measure.**

**Font loading lesson** *(encoded 2026-04-06)*: CSS variables for fonts (e.g., `var(--font-cormorant)`) must be defined in the global layout head or a parent CSS class. Missing definition causes silent fallback to system font — the page renders but the intended serif display never appears. Always verify `--font-*` CSS var is defined before writing components that depend on it. `font-semibold` class should be applied explicitly to all display headings using Fraunces/Cormorant — the variable fonts' default weight (400) reads as too thin for editorial drama.

**Wikimedia image lesson** *(encoded 2026-04-06)*: Don't guess `upload.wikimedia.org/wikipedia/commons/<hash>/<filename>` paths — the hash depends on the MD5 of the filename and is easy to get wrong (404). Use `commons.wikimedia.org/wiki/Special:FilePath/<filename>?width=<N>` which resolves the hash server-side, or download to local `public/art/` for production reliability (avoids hotlink/CORS).

**Open trajectory**: Compactor (Phase 5) will begin reshaping this file at cluster count ≥ 5 or member count ≥ 8. Until then, manual curation on Wisdom phase. Current state is strong enough to start a Phase 4 (Dual-path RAG) experiment — 3 shipped across 4 clusters gives clustering logic something real to retrieve against.
