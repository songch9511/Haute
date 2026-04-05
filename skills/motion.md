---
name: motion
description: Unified animation & interaction rules — theory + Framer Motion implementation. Spring physics, scroll choreography, micro-interactions, performance constraints. Replaces motion-engine.md + framer-motion.md.
---

# Motion — Animation & Interaction

## 1. Motion Intensity Dial

`MOTION_INTENSITY` (1-10) determines available techniques:

| Level | Techniques |
|---|---|
| 1-2 | Hover color/opacity only |
| 3-4 | + Hover scale/translate, button press, focus rings |
| 5-6 | + Enter animations, magnetic hover, skeleton loading |
| 7-8 | + Scroll-triggered, stagger sequences, subtle parallax |
| 9-10 | + Page transitions, scroll hijack, physics-based |

**Mobile:** Reduce intensity by 2 levels (fewer concurrent animations).

---

## 2. Allowed & Banned Properties

**GPU-composited (allowed):** `transform`, `opacity`, `filter`, `clip-path`

**Trigger layout/paint (banned):** `width`, `height`, `top`, `left`, `margin`, `padding`, `border-width`, `font-size`

**Exception:** `background-color` on buttons/links (small repaint, expected UX).

---

## 3. Timing, Easing & Springs

### Duration Scale
| Use Case | Duration | Easing |
|---|---|---|
| Hover | 150ms | ease-out |
| Button press | 100ms | ease-in-out |
| Fade in/out | 200-300ms | ease-out |
| Slide/translate | 300-500ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Modal open/close | 250-350ms / 200ms | ease-out / ease-in |
| Page transition | 400-600ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Stagger delay | 50-80ms/item | — |

### Spring Presets
```ts
const springs = {
  standard: { type: "spring", stiffness: 300, damping: 30 },   // Most UI
  gentle:   { type: "spring", stiffness: 200, damping: 25 },   // Modals
  bouncy:   { type: "spring", stiffness: 400, damping: 15 },   // Playful (sparingly)
  snappy:   { type: "spring", stiffness: 500, damping: 35 },   // Toggles
};
```

### Rules
- Never `linear` easing. Never exceed 800ms. Exit 20-30% faster than enter.
- Max 8 stagger items visible; beyond → batch animate.
- Always respect `prefers-reduced-motion: reduce`.

---

## 4. Interaction Patterns + Implementation

### 4.1 Button Feedback
```tsx
<motion.button
  whileHover={{ y: -1 }}
  whileTap={{ scale: 0.98 }}
  transition={springs.snappy}
>
  {children}
</motion.button>
```
- `whileTap` scale: 0.97-0.99. Never below 0.95.
- Always include `:focus-visible` ring (`outline: 2px solid var(--accent)`).

### 4.2 Card Hover (INTENSITY >= 3)
```tsx
<motion.div
  whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
  transition={{ duration: 0.2, ease: "easeOut" }}
>
  {children}
</motion.div>
```
- `whileHover` only on interactive elements. Never on static text.

### 4.3 Magnetic Hover (INTENSITY >= 5, CTAs only)
```tsx
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.1,
      y: (e.clientY - rect.top - rect.height / 2) * 0.1,
    });
  };
  return (
    <motion.button ref={ref} onMouseMove={handleMouse}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={pos} transition={springs.standard}>
      {children}
    </motion.button>
  );
}
```

### 4.4 Enter Animations (INTENSITY >= 5)
```tsx
// Fade up — default enter
<AnimatedSection>
  <h2>Content fades up on viewport enter</h2>
</AnimatedSection>

// Stagger children
<StaggerGroup className="grid grid-cols-2 gap-4">
  <StaggerItem><Card /></StaggerItem>
  <StaggerItem><Card /></StaggerItem>
</StaggerGroup>

// Clip-path reveal (headlines)
<AnimatedSection variants={revealVariants}>
  <h1>Revealed headline</h1>
</AnimatedSection>
```
- Fire ONCE (`viewport={{ once: true }}`). No re-trigger on scroll back.
- **CRITICAL:** Never use `useInView` on hero/first-screen content. Use `animate` directly (immediate).

### 4.5 Layout Animations
```tsx
// Shared layout (tabs, toggles)
{active === tab && (
  <motion.div layoutId="active-tab" className="absolute inset-0 bg-surface rounded-lg -z-10"
    transition={springs.standard} />
)}

// AnimatePresence (mount/unmount)
<AnimatePresence mode="wait">
  {isOpen && (
    <motion.div key="modal"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}>
      <Modal />
    </motion.div>
  )}
</AnimatePresence>
```
- Never animate `layout` on >5 elements simultaneously.
- Never nest `AnimatePresence` >2 levels deep.

### 4.6 Scroll-Triggered (INTENSITY >= 7)
```tsx
// Parallax
function ParallaxSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  return <div ref={ref}><motion.div style={{ y }}>{children}</motion.div></div>;
}

// Horizontal scroll
function HorizontalScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 h-dvh flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8">{children}</motion.div>
      </div>
    </section>
  );
}
```
- Parallax max ±40px. Use `useTransform` (GPU), never `setState`.

### 4.7 Number Counters
```tsx
function Counter({ target }: { target: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString());
  useEffect(() => { if (isInView) spring.set(target); }, [isInView, spring, target]);
  return <motion.span ref={ref} className="tabular-nums font-mono">{display}</motion.span>;
}
```

---

## 5. Force-Directed Graphs (Advanced)

When using force-directed physics (D3-force, custom):
- Parameters MUST scale with canvas size (don't hardcode)
- Pre-simulate 150+ ticks before first render (avoids chaotic initial state)
- Use soft boundaries (`velocity *= -0.5`) not hard clamps
- Isolate in own Client Component with `requestAnimationFrame` cleanup

---

## 6. Performance & Anti-Slop

### Performance
- `"use client"` on all components using `motion.*`, `useInView`, `useScroll`
- `will-change` only during animation, remove after
- `useEffect` animations MUST return cleanup. Custom rAF MUST cancel.
- Import selectively: `import { motion, useInView } from "framer-motion"`
- Max 20 simultaneous animated elements

### Banned Motion Patterns
| Banned | Why | Instead |
|---|---|---|
| `rotate: 360` on decorative elements | Spinner aesthetic | Only on loading indicators |
| `damping: 5` (bounce) | Feels toylike | `springs.standard` (damping: 30) |
| `scale > 1.05` on hover | Balloon effect | Max 1.02, prefer `y: -2` |
| `whileInView` without `once` | Nauseating re-animation | `viewport={{ once: true }}` |
| Drag on non-interactive elements | Confusing UX | Only sliders, drawers, sort handles |
| `initial={false}` as SSR hack | Flash of final state | Proper `initial` + `animate` |
| Stagger > 100ms | Sluggish | Max 60-80ms |
