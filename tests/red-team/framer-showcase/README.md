# Framer Motion Showcase Test

**Source:** `templates/next-app/src/app/showcase/`
**URL:** `http://localhost:3000/showcase`
**Score:** 100/100 (68/68) — first attempt

## Run

```bash
cd templates/next-app
npm run build && npx next start
# Then verify:
cd verifier
VERIFY_URL=http://localhost:3000/showcase npx playwright test
```

## Framer Motion Patterns Used

| Pattern | Component | Skill Reference |
|---|---|---|
| Parallax scroll (useScroll + useTransform) | hero.tsx | framer-motion.md §5 |
| Clip-path reveal | hero.tsx | framer-motion.md §2 |
| Stagger grid (StaggerGroup + StaggerItem) | work-grid.tsx | framer-motion.md §2 |
| Card hover lift (whileHover y:-4) | work-grid.tsx | framer-motion.md §3 |
| Scroll-driven horizontal movement | horizontal-gallery.tsx | framer-motion.md §5 |
| Shared layout (layoutId tab indicator) | service-tabs.tsx | framer-motion.md §4 |
| AnimatePresence (tab content swap) | service-tabs.tsx | framer-motion.md §4 |
| Spring counter (useSpring + useTransform) | stats.tsx | framer-motion.md §6 |
| Magnetic hover (cursor-relative transform) | nav.tsx | framer-motion.md §3 |
| Form → success AnimatePresence | contact.tsx | framer-motion.md §4 |
| Layered card stagger (stacked composition) | hero.tsx | framer-motion.md §2 |
| Bar chart enter animation | hero.tsx, features.tsx | motion-engine.md §4.4 |
