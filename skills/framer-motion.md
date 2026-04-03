---
name: framer-motion
description: Framer Motion patterns for UDesigner. Spring presets, scroll animations, layout transitions, stagger choreography, and performance rules. Extends motion-engine.md with concrete React implementations.
---

# Framer Motion — Implementation Patterns

Extends `motion-engine.md` with concrete Framer Motion code. Load this skill when building React/Next.js interfaces with animation.

**Prerequisite:** Read `motion-engine.md` first. This file provides implementation, not theory.

---

## 1. Import from Template

Use the shared motion components from `@/components/motion.tsx`:

```tsx
import {
  AnimatedSection,
  StaggerGroup,
  StaggerItem,
  motion,
  springs,
  ease,
  fadeUpVariants,
  scaleInVariants,
  slideLeftVariants,
  slideRightVariants,
  revealVariants,
} from "@/components/motion";
```

Never re-define spring constants or easing curves inline. Always use the shared presets.

---

## 2. Enter Animations (MOTION_INTENSITY >= 5)

### Basic: Fade Up Section
```tsx
<AnimatedSection>
  <h2>Section title</h2>
  <p>Content appears with fade + translateY</p>
</AnimatedSection>
```

### Stagger: Children appear sequentially
```tsx
<StaggerGroup className="grid grid-cols-2 gap-4">
  <StaggerItem><Card /></StaggerItem>
  <StaggerItem><Card /></StaggerItem>
  <StaggerItem><Card /></StaggerItem>
  <StaggerItem><Card /></StaggerItem>
</StaggerGroup>
```

### Clip-path Reveal (headlines, images)
```tsx
<AnimatedSection variants={revealVariants}>
  <h1 className="text-4xl font-heading">Revealed headline</h1>
</AnimatedSection>
```

### Rules
- Max 8 stagger items visible at once. Beyond 8 → batch animate.
- Stagger delay: 60ms (set in `staggerContainer`). Never exceed 80ms.
- Enter animations fire ONCE (`useInView` with `once: true`). No re-trigger on scroll back.
- Delay prop on `AnimatedSection` for sequencing across sections: 0, 0.1, 0.2 max.

---

## 3. Hover & Press Interactions

### Button with spring feedback
```tsx
<motion.button
  whileHover={{ y: -1 }}
  whileTap={{ scale: 0.98 }}
  transition={springs.snappy}
  className="btn-primary"
>
  Click me
</motion.button>
```

### Card hover lift
```tsx
<motion.div
  whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
  transition={{ duration: 0.2, ease: "easeOut" }}
  className="card"
>
  {children}
</motion.div>
```

### Magnetic hover (CTAs only, MOTION_INTENSITY >= 5)
```tsx
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.1;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.1;
    setPosition({ x, y });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={position}
      transition={springs.standard}
    >
      {children}
    </motion.button>
  );
}
```

### Rules
- `whileHover` only on interactive elements (buttons, links, cards). Never on static text.
- `whileTap` scale: 0.97-0.99. Never below 0.95 (feels broken).
- Magnetic hover: CTAs and nav items ONLY. Never on body content.

---

## 4. Layout Animations

### Shared layout (tabs, toggles)
```tsx
<div className="flex gap-2">
  {tabs.map((tab) => (
    <button key={tab} onClick={() => setActive(tab)} className="relative px-4 py-2">
      {tab}
      {active === tab && (
        <motion.div
          layoutId="active-tab"
          className="absolute inset-0 bg-bg-surface rounded-lg -z-10"
          transition={springs.standard}
        />
      )}
    </button>
  ))}
</div>
```

### AnimatePresence (mount/unmount)
```tsx
import { AnimatePresence } from "framer-motion";

<AnimatePresence mode="wait">
  {isOpen && (
    <motion.div
      key="modal"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, ease: ease.out }}
    >
      <Modal />
    </motion.div>
  )}
</AnimatePresence>
```

### Rules
- `layoutId` for smooth position transitions between states (tabs, list reorder).
- `AnimatePresence mode="wait"` — old exits before new enters. Use `mode="popLayout"` for overlapping.
- Exit animations: 20-30% faster than enter. If enter is 0.4s, exit is 0.3s.
- Never animate layout on more than 5 elements simultaneously (performance).

---

## 5. Scroll-Triggered Patterns (MOTION_INTENSITY >= 7)

### Parallax element
```tsx
import { useScroll, useTransform } from "framer-motion";

function ParallaxSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div ref={ref}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
```

### Horizontal scroll section
```tsx
function HorizontalScroll({ children }: { children: React.ReactNode }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-dvh flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8">
          {children}
        </motion.div>
      </div>
    </section>
  );
}
```

### Progress-linked opacity
```tsx
const { scrollYProgress } = useScroll();
const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

<motion.nav style={{ opacity }} className="fixed top-0 ...">
```

### Rules
- Parallax offset: max ±40px. Subtle depth, not carnival ride.
- `useScroll` with `target` ref — never track global scroll for local effects.
- All scroll transforms use `useTransform` (GPU composited). Never `useMotionValueEvent` + setState.
- Horizontal scroll: provide clear visual affordance that content continues.

---

## 6. Number & Counter Animations

### Counting up
```tsx
import { useSpring, useTransform, motion } from "framer-motion";

function Counter({ target }: { target: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v) =>
    Math.round(v).toLocaleString()
  );

  useEffect(() => {
    if (isInView) spring.set(target);
  }, [isInView, spring, target]);

  return (
    <motion.span ref={ref} className="tabular-nums font-mono">
      {display}
    </motion.span>
  );
}
```

### Rules
- Numbers always use `tabular-nums` and monospace font.
- Counter spring: low stiffness (50), moderate damping (20) — feels organic, not twitchy.
- Only trigger when in view. Never auto-play on mount.

---

## 7. Performance Rules

### Client Components
Every component using `motion.*`, `useInView`, `useScroll`, or `AnimatePresence` MUST be a Client Component (`"use client"` directive).

### Cleanup
```tsx
// useEffect with Framer Motion values — no manual cleanup needed
// Motion values are cleaned up automatically when component unmounts.
// BUT: custom requestAnimationFrame loops MUST cancel:
useEffect(() => {
  const id = requestAnimationFrame(loop);
  return () => cancelAnimationFrame(id);
}, []);
```

### Bundle
- Import only what you use: `import { motion, useInView } from "framer-motion"`
- Never `import * as motion from "framer-motion"`
- Framer Motion supports tree-shaking — unused features are excluded.

### Avoid
- `useAnimation` — prefer declarative `animate` prop. Imperative only for complex sequencing.
- `animate` on mount without `useInView` — wastes animation on off-screen elements.
- Animating more than 20 elements simultaneously.
- `layout` prop on elements with `position: fixed` (breaks).
- Nesting `AnimatePresence` more than 2 levels deep.

---

## 8. Anti-Slop: Motion Edition

These Framer Motion patterns are banned:

| Banned | Why | Instead |
|---|---|---|
| `animate={{ rotate: 360 }}` on decorative elements | Distracting spinner aesthetic | Only on loading indicators |
| Bounce easing (`type: "spring", damping: 5`) | Feels like a toy, not premium | Use `springs.standard` (damping: 30) |
| Scale > 1.05 on hover | Inflated balloon effect | Max `scale: 1.02`, prefer `y: -2` |
| `whileInView` without `once` | Re-animates on every scroll — nauseating | Always `viewport={{ once: true }}` |
| Drag on non-interactive elements | Confusing UX, accidental activations | Only on sliders, drawers, sort handles |
| `initial={false}` as SSR hack | Causes flash of final state | Use proper `initial` + `animate` |
| Stagger > 100ms | Feels sluggish, user waits too long | Max 60-80ms per item |
