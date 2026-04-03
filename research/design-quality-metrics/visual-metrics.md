# Visual Metrics: Measuring Design Quality

Quantifiable metrics that can be extracted from rendered UI and compared against standards.

---

## 1. Typography Metrics

### 1.1 Font Diversity Score
- **Metric:** Count of unique font-family values
- **Good:** 1-2 families
- **Warning:** 3 families
- **Fail:** 4+ families or 0 custom fonts (system only)
- **How to measure:** Extract all computed font-family from DOM elements

### 1.2 Type Scale Ratio
- **Metric:** Ratio between consecutive font sizes in the hierarchy
- **Good:** Consistent ratio between 1.2 and 1.5 across all steps
- **Warning:** Ratio varies by > 0.15 between steps
- **Fail:** No discernible scale (random sizes)
- **How to measure:** Collect all unique font-size values, sort, compute ratios between adjacent steps

### 1.3 Heading/Body Contrast
- **Metric:** Largest heading font-size / body font-size
- **Good:** 2.5:1 to 4:1
- **Warning:** < 2:1 (too close) or > 5:1 (too extreme)
- **Fail:** < 1.5:1 (no hierarchy)
- **How to measure:** Compare largest h1/h2 computed size to p computed size

### 1.4 Weight Distribution
- **Metric:** Count of unique font-weight values
- **Good:** 2-3 weights (e.g., 400, 500, 700)
- **Warning:** 1 weight (monotone) or 4+ (noisy)
- **Fail:** Only 400 and 700 (the "bold or not" syndrome)

### 1.5 Line Height
- **Metric:** Computed line-height / font-size ratio
- **Good:** Headings 1.1-1.2, body 1.5-1.7
- **Warning:** Body < 1.4 or > 1.8
- **Fail:** Universal line-height (same value everywhere)

---

## 2. Color Metrics

### 2.1 Palette Size
- **Metric:** Count of unique hue families (group similar hues within 30° on color wheel)
- **Good:** 2-4 hue families
- **Warning:** 5-6 families
- **Fail:** 7+ families (rainbow)
- **How to measure:** Convert all colors to HSL, cluster by hue ±15°

### 2.2 Contrast Ratio (WCAG)
- **Metric:** Foreground/background luminance ratio per WCAG 2.1
- **Pass:** ≥ 4.5:1 for normal text (< 24px), ≥ 3:1 for large text (≥ 24px)
- **Fail:** Any text below threshold
- **How to measure:** For each text element, compute luminance of color and its background

### 2.3 Color Consistency
- **Metric:** Number of "near-duplicate" colors (ΔE < 5 in LAB space but different hex values)
- **Good:** 0 near-duplicates (every color is intentionally distinct)
- **Warning:** 1-2 near-duplicates
- **Fail:** 3+ near-duplicates (sloppy, undefined palette)

### 2.4 Accent Usage Ratio
- **Metric:** Total area of accent-colored elements / total viewport area
- **Good:** 3-10%
- **Warning:** < 2% (invisible accent) or > 15% (overwhelming)
- **Fail:** > 25% or 0% (no accent at all)

---

## 3. Spacing Metrics

### 3.1 Spacing Grid Adherence
- **Metric:** Percentage of padding/margin/gap values that are multiples of 4px
- **Good:** > 90%
- **Warning:** 70-90%
- **Fail:** < 70% (arbitrary spacing)
- **How to measure:** Extract all computed padding, margin, gap values; check divisibility by 4

### 3.2 Spacing Consistency (Standard Deviation)
- **Metric:** StdDev of spacing values used for similar elements (e.g., all card padding)
- **Good:** StdDev = 0 (perfectly consistent)
- **Warning:** StdDev < 8px
- **Fail:** StdDev > 8px (inconsistent spacing on same element types)

### 3.3 Section Rhythm
- **Metric:** Variation in vertical spacing between major sections
- **Good:** Uses 2-3 distinct spacing values (hierarchy)
- **Warning:** All sections have identical spacing (monotonous)
- **Fail:** Random spacing with no pattern

### 3.4 Content Density
- **Metric:** Text content area / total viewport area
- **Good:** 30-60% (balanced)
- **Warning:** < 20% (too sparse) or > 70% (too dense)
- **Context:** Adjust threshold by VISUAL_DENSITY dial

---

## 4. Layout Metrics

### 4.1 Alignment Score
- **Metric:** Percentage of elements whose left edges align to a grid column
- **Good:** > 85%
- **Warning:** 70-85%
- **Fail:** < 70% (no apparent grid)
- **How to measure:** Extract left offsets of all block elements, cluster into columns, count aligned vs misaligned

### 4.2 Responsive Behavior
- **Metric:** Pass/fail per breakpoint — does layout adapt properly?
- **Test viewports:** 375px (phone), 768px (tablet), 1280px (desktop)
- **Good:** All breakpoints show appropriate layout changes
- **Fail:** Content overflow or horizontal scroll at any viewport
- **How to measure:** Playwright viewport resizing + overflow detection

### 4.3 Visual Balance
- **Metric:** "Weight" distribution left vs right (element area × visual weight)
- **Good:** 40/60 to 60/40 split (asymmetric but balanced)
- **Warning:** 30/70+ (lopsided without intentional asymmetry)
- **Note:** This is hard to automate precisely — consider as LLM-as-Judge metric

---

## 5. Composite Score

```
DESIGN_SCORE = (
  typography_score × 0.25 +     # Font, scale, hierarchy, weights
  color_score × 0.20 +          # Palette, contrast, consistency
  spacing_score × 0.25 +        # Grid adherence, consistency, rhythm
  layout_score × 0.15 +         # Alignment, responsive, balance
  interaction_score × 0.15      # Hover states, transitions, loading
) × 100

Rating:
  90-100: Premium
  75-89:  Good
  60-74:  Needs improvement
  0-59:   Major redesign needed
```

These weights can be adjusted based on the design category (dashboards weight spacing higher, landing pages weight typography higher).
