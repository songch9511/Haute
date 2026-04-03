# Framer-Inspired Showcase Test

**Source:** `templates/next-app/src/app/showcase-framer/`
**URL:** `http://localhost:3000/showcase-framer`
**Score:** 100/100 (68/68) — first attempt
**Theme:** Light mode with dark section alternation (inspired by framer.com)

## Run

```bash
cd templates/next-app
npm run build && npx next start
# Then verify:
cd verifier
VERIFY_URL=http://localhost:3000/showcase-framer npx playwright test
```

## Design Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Theme | Light (#fafaf9) + dark (#111113) alternation | framer.com's core visual rhythm |
| Typography | Geist Sans, semibold headings (not bold) | Restraint over weight; hierarchy via size |
| Accent | Inverted (black CTAs on light bg) | No color accent needed — contrast is the accent |
| Whitespace | py-32 (128px) sections | Matches framer.com's "generous negative space" |
| Grid | Bento 2+2 features (not 4-col equal) | Anti-slop compliant |
| Data | Real-looking analytics (258,156 pageviews) | Authentic credibility, not round numbers |

## Framer Motion Patterns Used (13 patterns)

| Pattern | Component | Skill Reference |
|---|---|---|
| Scroll-linked nav opacity + blur | nav.tsx | framer-motion.md §5 |
| Stagger hero entrance (5 elements) | hero.tsx | framer-motion.md §2 |
| Product preview card build animation | hero.tsx | framer-motion.md §2 |
| Bento grid stagger + scale-in | features.tsx | framer-motion.md §2 |
| CMS table row reveals | features.tsx | framer-motion.md §2 |
| Card hover lift + shadow | features.tsx | framer-motion.md §3 |
| Dark section parallax blob | showcase.tsx | framer-motion.md §5 |
| List item hover slide | showcase.tsx | framer-motion.md §3 |
| Spring counter (3 metrics) | analytics.tsx | framer-motion.md §6 |
| Bar chart enter animation | analytics.tsx | motion-engine.md §4.4 |
| layoutId testimonial indicator | testimonials.tsx | framer-motion.md §4 |
| AnimatePresence quote carousel | testimonials.tsx | framer-motion.md §4 |
| Scroll-linked CTA scale + opacity | cta.tsx | framer-motion.md §5 |

## Key Difference from framer.com

framer.com uses a centered hero (anti-slop §3.1 violation). This version uses asymmetric split hero with product preview — same impact, rule-compliant.
