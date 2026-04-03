# Visual Regression: Screenshot-Based Verification

Strategies for comparing generated UI against baselines using screenshot diffing.

---

## Approach

Visual regression testing captures a screenshot of the rendered UI and compares it against a stored baseline. This detects unintended visual changes.

### How It Works in UDesigner

```
1. Example index.html exists as golden baseline
2. New UI is generated
3. Playwright renders both at same viewport
4. Pixel-by-pixel comparison with threshold
5. Diff highlights areas of difference
```

### When to Use
- `/verify` command with `--checks visual-regression`
- Only meaningful when a baseline exists (e.g., examples/ snapshots)
- NOT used for first-time generation (no baseline to compare against)

---

## Tools

### Playwright Built-in
```ts
// Take screenshot
await page.screenshot({ path: 'output.png', fullPage: true });

// Compare with threshold
expect(await page.screenshot()).toMatchSnapshot('baseline.png', {
  maxDiffPixels: 100,       // Allow some pixel variance
  threshold: 0.2,           // Per-pixel color difference threshold (0-1)
});
```

### pixelmatch (Playwright uses this internally)
- Fast pixel-level comparison
- Configurable threshold for anti-aliasing tolerance
- Outputs diff image highlighting changes

---

## Challenges for Design Verification

### 1. No Fixed Baseline for New Designs
- First generation has nothing to compare against
- Solution: Compare against category example (examples/{category}/snapshot.png)
- This is a "style similarity" check, not an "exact match" check
- Higher threshold (0.3-0.4) when comparing against category example vs exact baseline

### 2. Dynamic Content
- Different text content = different layout = false positive
- Solution: Mask text regions or compare structural regions only (header, nav, spacing patterns)

### 3. Font Loading Race Conditions
- Font may not be loaded when screenshot is taken
- Solution: Wait for `document.fonts.ready` before screenshot

### 4. Animation State
- Screenshots capture a single frame — animation state varies
- Solution: Disable animations before screenshot
  ```ts
  await page.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; }' });
  ```

---

## Implementation Plan for UDesigner

### Phase 1: Structural Comparison
Compare overall layout structure, not pixel-perfect:
- Viewport: 1280×800 (desktop), 375×812 (mobile)
- Threshold: 0.3 (lenient)
- Focus: major layout regions, not content

### Phase 2: Category Style Matching
Compare against category baseline:
- Does the IR deck look like an IR deck? (data density, chart presence, formal typography)
- Does the landing page have variety? (not generic centered hero)
- Measured by structural similarity, not pixel match

### Phase 3: Regression After Redesign
After /redesign, compare before/after:
- Strict threshold (0.1) on areas that should NOT change
- Lenient threshold (0.4) on areas that were redesigned
