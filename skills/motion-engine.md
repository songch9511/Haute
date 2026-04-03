---
name: motion-engine
description: Animation and interaction rules. Spring physics, scroll-triggered choreography, micro-interactions, and performance constraints.
---

# Motion Engine — Animation & Interaction Rules

## 1. Motion Intensity Levels

The `MOTION_INTENSITY` dial (1-10) determines what animation techniques are available:

| Level | Allowed Techniques |
|---|---|
| 1-2 | Hover color/opacity changes only. No transforms. |
| 3-4 | + Hover scale/translate. Button press feedback. Focus rings. |
| 5-6 | + Enter animations (fade-in on mount). Magnetic hover effects. Skeleton loading. |
| 7-8 | + Scroll-triggered animations. Stagger sequences. Parallax (subtle). |
| 9-10 | + Page transitions. Scroll hijack. Physics-based interactions. Particle effects. |

---

## 2. Core Animation Properties

### Allowed Properties (GPU-composited)
```css
transform    /* translate, scale, rotate */
opacity
filter       /* blur, brightness — use sparingly */
clip-path    /* reveal effects */
```

### Banned Properties (trigger layout/paint)
```css
width, height, top, left, right, bottom
margin, padding
border-width, border-radius (animating)
font-size, line-height
background-color  /* use opacity overlay instead */
```

### Exception
`background-color` transitions on buttons/links are allowed (small repaint area, expected UX pattern).

---

## 3. Timing & Easing

### Duration Scale
| Use Case | Duration | Easing |
|---|---|---|
| Hover state | 150ms | ease-out |
| Button press | 100ms | ease-in-out |
| Fade in/out | 200-300ms | ease-out |
| Slide/translate | 300-500ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Modal open | 250-350ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Modal close | 200ms | ease-in |
| Page transition | 400-600ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Stagger delay | 50-80ms per item | — |

### Spring Physics (Framer Motion)
```ts
// Standard spring — most UI elements
const standardSpring = { type: "spring", stiffness: 300, damping: 30 };

// Gentle spring — modals, overlays
const gentleSpring = { type: "spring", stiffness: 200, damping: 25 };

// Bouncy spring — playful elements (use sparingly)
const bouncySpring = { type: "spring", stiffness: 400, damping: 15 };

// Snappy spring — toggles, switches
const snappySpring = { type: "spring", stiffness: 500, damping: 35 };
```

### Rules
- Never use `linear` easing (feels robotic)
- Never exceed 800ms for any single animation
- Stagger sequences: max 8 items visible at once (beyond → batch animate)
- Exit animations should be 20-30% faster than enter animations

---

## 4. Interaction Patterns

### 4.1 Button Feedback
```css
/* Hover */
.btn:hover {
  transform: translateY(-1px);
  transition: all 150ms ease-out;
}

/* Active/Press */
.btn:active {
  transform: scale(0.98);
  transition: all 100ms ease-in-out;
}

/* Focus visible (keyboard) */
.btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

### 4.2 Card Hover (MOTION_INTENSITY ≥ 3)
```css
.card {
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
```

### 4.3 Magnetic Hover (MOTION_INTENSITY ≥ 5)
Element subtly follows cursor within its bounds. Use for CTAs and nav items only.
```ts
// Concept — track cursor position relative to element center
// Apply transform: translate(dx * 0.1, dy * 0.1) with spring
// Reset to center on mouse leave
```

### 4.4 Enter Animations (MOTION_INTENSITY ≥ 5)
```ts
// Fade up — default enter animation
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
};

// Scale in — modals, popovers
const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
};
```

### 4.5 Scroll-Triggered (MOTION_INTENSITY ≥ 7)
```ts
// Use Intersection Observer, NOT scroll event listeners
// Animate once on enter, don't re-animate on scroll back
// Threshold: 0.2 (element 20% visible triggers animation)
// Stagger children by 60ms each
```

### 4.6 Page Transitions (MOTION_INTENSITY ≥ 9)
```ts
// Exit: fade out + slight scale down (200ms)
// Enter: fade in + slight translate up (400ms)
// Overlap: 100ms (new page starts entering before old finishes)
// Use View Transitions API where supported, Framer Motion AnimatePresence fallback
```

---

## 5. Loading States

### Skeleton Screens (preferred over spinners)
```
- Match exact layout of loaded content
- Pulse animation: opacity 0.3 → 0.7, 1.5s duration, infinite
- Background: var(--bg-surface)
- Border-radius: match the content shape
- No shimmer/gradient sweep (overused AI pattern)
```

### Spinners (only when skeleton doesn't make sense)
```
- Simple ring/circle, NOT dots or fancy animations
- Size: 20px inline, 32px block-level
- Color: var(--text-tertiary)
- Animation: rotate 360deg, 0.8s linear infinite
```

### Progress Indicators
```
- Bar: 4px height, rounded-full, accent color
- Percentage: tabular-nums font
- Indeterminate: translateX animation (-100% → 100%), 1.5s
```

---

## 6. Micro-Interactions

### Toggle/Switch
- Spring transition (snappySpring) for the thumb
- Background color transition: 200ms
- Scale(0.95) on press

### Checkbox/Radio
- Scale bounce on check: scale(0.8) → scale(1.1) → scale(1)
- Checkmark: stroke-dashoffset animation (draw effect), 200ms

### Tooltip
- Delay: 500ms before show
- Enter: fade + translateY(4px → 0), 150ms
- Exit: fade, 100ms (no translate)

### Dropdown/Select
- Enter: scaleY(0.95) → scaleY(1) + fade, 200ms, transform-origin top
- Exit: fade, 150ms
- Items: stagger 30ms each (max 8 visible)

### Notification/Toast
- Enter from bottom-right: translateY(100%) → translateY(0), spring
- Auto-dismiss: slide out + fade, 300ms
- Stack: newer pushes older up with spring

---

## 7. Performance Rules

1. **`will-change`**: Only add to elements currently animating. Remove after animation completes.
2. **`useEffect` cleanup**: Every animation started in useEffect MUST return a cleanup function.
3. **Perpetual animations**: Isolate in their own Client Component (React). Use `requestAnimationFrame` with proper cancellation.
4. **Scroll listeners**: Use `Intersection Observer` or CSS `scroll-timeline`. Never raw `addEventListener('scroll')`.
5. **Reduced motion**: Always respect `prefers-reduced-motion`:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```
6. **Frame budget**: Target 60fps. If animation drops below, simplify or remove.
7. **Mobile**: Reduce MOTION_INTENSITY by 2 levels on mobile (fewer concurrent animations, simpler effects).
