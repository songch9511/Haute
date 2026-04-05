# Cluster: knowledge-tool-dark

Productivity / knowledge-management tool landings in the Obsidian · Notion · Roam · Logseq lineage. **Dark but soft** (not brutal), Inter-family sans throughout, purple or blue HSL signature accent, **centered hero** with headline + CTA stack + large screenshot-as-hero mockup. Aimed at thinkers and note-takers, not developers. Differs deliberately from `mono-dark-tech` on two axes: softer dark grounds, screenshot mockups as the hero centerpiece.

## Representative Shipped

- `2026-04-05-obsidian` — Prism knowledge vault landing (source-only backfill, provisional-until-verified)

## Signature Tokens

- **Background**: dark gray `#1e1e1e` / `#242424` (NOT `#000000` pure black, NOT `#0a0a0a` near-black). The grey gives warmth
- **Foreground**: `#f8f8f8` primary, `#dadada` body, `#bababa` muted, `#929292` captions
- **Border**: `#363636` explicit hex + `rgba(255,255,255,0.1)` for chrome/overlays
- **Accent**: `hsl(254, 80%, 60%)` purple primary + `hsl(254, 80%, 72%)` / `78%` for logo marks and highlights. HSL inline, not Tailwind arbitrary
- **Typography**: Inter for everything. Sans-only cluster. Display uses `font-extrabold` at `text-[48px]` mobile / `text-[70px]` desktop with `leading-[1.22]`
- **Radii**: `rounded-xl` for large cards/screenshots, `rounded-md` for buttons, `rounded-full` for avatars/badges
- **Shadows**: Layered soft shadows `0px 1.8px 7.3px / 0px 6.3px 24.7px / 0px 30px 90px` — the long-distance blur is signature

## Signature Patterns

- **Hero**: Centered (yes, this cluster breaks the general "40% non-center" rule — centered is the cluster aesthetic). Headline → subtitle → CTA pair → large screenshot below
- **Screenshot-as-hero**: Fake macOS window with traffic-light dots + title bar + vault/nav sidebar + content area. The mockup IS the dominant visual, not a decoration
- **Background effect**: Starfield-style dot-pattern via layered `radial-gradient(1px 1px at X% Y%, ...)` — gives atmospheric depth without being noisy
- **Nav**: Fixed full-width (not pill), `backdrop-blur(5px)` on translucent bg, logo + 5 horizontal links + primary CTA
- **Section flow**: Feature + plugin + sync + publish + testimonial + pricing + CTA → typical productivity-tool funnel
- **Motion**: CSS `transition-colors` and `transition-[border-color]` dominant. Low use of framer-motion

## Content Principles

- **Real product framing**: screenshot shows actual product in-situ, not abstract UI bits
- **Single sharp headline** ("Sharpen your thinking" → short verb-led directive, not a value prop sentence)
- **Two-CTA hero**: primary (purple filled) + secondary (transparent border)
- **Brand trust via mockup density**: sidebar lists real-sounding vault contents (Daily Notes, Projects, Research, etc.) — not lorem

## Anti-patterns (specific to this cluster)

- Pure black backgrounds (`#000`) — breaks the soft warm dark of the cluster
- Mono display fonts — this is a sans cluster, mono belongs to `mono-dark-tech`
- Serif display faces — belongs to `warm-editorial`
- Signal-green accents — purple/blue is the identity
- Asymmetric hero compositions — centered is the rule here, not the anti-rule
- AI-slop placeholder sidebar labels ("Notes", "Files", "Projects" used alone) — must use real-sounding vault names

## Relation to Other Clusters

- vs `warm-editorial`: opposite brightness axis (dark vs warm-light), opposite typography (sans vs serif display)
- vs `mono-dark-tech`: same dark axis but softer `#1e1e1e` vs `#0a0a0a`, sans vs mono, screenshot-hero vs asymmetric-title-hero, purple accent vs signal-green
- **Key insight**: this cluster is the "creative productivity" tier — tools for thinkers. `mono-dark-tech` is the "engineering infrastructure" tier — tools for builders. Both are dark but their users and aesthetic discipline differ

## Composite Baseline

- `2026-04-05-obsidian`: **unverified** (backfill, no Visual Oracle pass). Next `/verify` run should produce the first real number for this cluster.
