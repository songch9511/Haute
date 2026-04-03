# Interaction Metrics: Measuring Animation & Interaction Quality

Quantifiable metrics for evaluating the quality of motion design and interactive elements.

---

## 1. Animation Property Safety

### 1.1 GPU-Composited Properties
- **Metric:** Percentage of animated properties that are GPU-composited (transform, opacity, filter, clip-path)
- **Good:** 100%
- **Warning:** > 80%
- **Fail:** < 80% (animating layout properties)
- **How to measure:** Intercept CSS transitions and animations, check property names

### 1.2 Duration Appropriateness
- **Metric:** Animation duration ranges by interaction type
- **Standards:**
  - Hover: 100-200ms
  - State change (open/close): 200-400ms
  - Enter animation: 300-600ms
  - Page transition: 400-700ms
- **Fail:** Any animation > 800ms, or hover > 300ms, or button press > 200ms

### 1.3 Easing Function Usage
- **Metric:** Count of `linear` easing vs custom/ease-out
- **Good:** 0 uses of `linear` (except for infinite rotation like spinners)
- **Warning:** 1-2 uses of `linear` on non-rotation animations
- **Fail:** `linear` as the default easing

---

## 2. Interactive State Coverage

### 2.1 Hover State Presence
- **Metric:** Percentage of interactive elements (buttons, links, cards) with hover styling
- **Good:** 100%
- **Warning:** > 80%
- **Fail:** < 80%
- **How to measure:** For each `<a>`, `<button>`, `[role="button"]`, `[onclick]`:
  - Trigger hover event
  - Compare computed styles before/after
  - If no change → no hover state

### 2.2 Focus-Visible State
- **Metric:** Percentage of focusable elements with visible focus indicator
- **Good:** 100% (accessibility requirement)
- **Fail:** Any focusable element without visible focus change
- **How to measure:** Tab through all interactive elements, check for outline/ring/border change

### 2.3 Active/Press State
- **Metric:** Percentage of buttons/clickable elements with :active or mousedown styling
- **Good:** > 80%
- **Warning:** 50-80%
- **Info-only below 50%** (nice-to-have, not critical)

### 2.4 Disabled State
- **Metric:** If there are disabled elements, do they have distinct visual treatment?
- **Good:** Reduced opacity (0.5-0.6) + cursor: not-allowed
- **Fail:** Disabled but visually identical to enabled

---

## 3. Loading Experience

### 3.1 Loading State Existence
- **Metric:** Are loading states implemented?
- **Good:** Skeleton screens matching content layout
- **Acceptable:** Simple spinner
- **Fail:** No loading indication (blank → content jump)
- **How to measure:** Search for loading/skeleton components, conditional rendering patterns

### 3.2 Content Layout Shift (CLS)
- **Metric:** Cumulative Layout Shift score
- **Good:** < 0.1
- **Warning:** 0.1-0.25
- **Fail:** > 0.25
- **How to measure:** Playwright can compute CLS using PerformanceObserver

### 3.3 Empty State Design
- **Metric:** Are empty/zero-data states designed?
- **Good:** Purposeful empty state (icon + message + action)
- **Fail:** Blank area or "No data" text only

---

## 4. Touch & Accessibility

### 4.1 Touch Target Size
- **Metric:** Minimum dimension of interactive elements on mobile viewport
- **Good:** All targets ≥ 44×44px
- **Warning:** Some targets 36-44px
- **Fail:** Any target < 36px
- **How to measure:** Set viewport to 375px, measure bounding box of all interactive elements

### 4.2 Reduced Motion Respect
- **Metric:** Does the interface respond to `prefers-reduced-motion: reduce`?
- **Good:** All animations disabled or simplified
- **Fail:** Animations continue unchanged
- **How to measure:** Set media query via Playwright, check if animations stop

---

## 5. Performance

### 5.1 Frame Rate During Animation
- **Metric:** Average FPS during active animations
- **Good:** ≥ 55fps (near 60)
- **Warning:** 40-55fps
- **Fail:** < 40fps (perceptible jank)
- **How to measure:** Playwright Performance API, requestAnimationFrame timing

### 5.2 will-change Hygiene
- **Metric:** Elements with `will-change` that are NOT currently animating
- **Good:** 0 (will-change only on active animations)
- **Warning:** 1-3 persistent will-change properties
- **Fail:** > 3 (GPU memory waste)
