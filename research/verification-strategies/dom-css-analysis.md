# DOM/CSS Analysis: Rule Verification via Rendered Properties

How to extract design properties from a rendered page and check them against UDesigner rules.

---

## Architecture

```
Playwright loads page
       │
       ▼
page.evaluate(() => { ... })
  → Extract all computed styles
  → Analyze DOM structure
  → Return structured report
       │
       ▼
Check report against rules
       │
       ▼
Pass / Warn / Fail per check
```

---

## Extraction Functions

### Typography Extraction
```ts
async function extractTypography(page: Page) {
  return page.evaluate(() => {
    const elements = document.querySelectorAll('*');
    const fonts = new Set<string>();
    const sizes = new Map<string, number[]>(); // tag → sizes
    const weights = new Set<string>();
    
    elements.forEach(el => {
      const style = getComputedStyle(el);
      if (el.textContent?.trim()) {
        fonts.add(style.fontFamily);
        weights.add(style.fontWeight);
        const tag = el.tagName.toLowerCase();
        if (!sizes.has(tag)) sizes.set(tag, []);
        sizes.get(tag)!.push(parseFloat(style.fontSize));
      }
    });
    
    return { fonts: [...fonts], sizes: Object.fromEntries(sizes), weights: [...weights] };
  });
}
```

### Color Extraction
```ts
async function extractColors(page: Page) {
  return page.evaluate(() => {
    const elements = document.querySelectorAll('*');
    const colors = new Set<string>();
    const bgColors = new Set<string>();
    const contrasts: { element: string; fg: string; bg: string; ratio: number }[] = [];
    
    elements.forEach(el => {
      const style = getComputedStyle(el);
      if (el.textContent?.trim()) {
        colors.add(style.color);
        bgColors.add(style.backgroundColor);
        // Calculate contrast ratio...
      }
    });
    
    return { textColors: [...colors], bgColors: [...bgColors], contrasts };
  });
}
```

### Spacing Extraction
```ts
async function extractSpacing(page: Page) {
  return page.evaluate(() => {
    const elements = document.querySelectorAll('section, div, main, article, aside, header, footer, nav');
    const spacings: number[] = [];
    
    elements.forEach(el => {
      const style = getComputedStyle(el);
      ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight',
       'marginTop', 'marginBottom', 'gap'].forEach(prop => {
        const val = parseFloat(style[prop as any]);
        if (val > 0) spacings.push(val);
      });
    });
    
    return { spacings, gridAdherence: spacings.filter(s => s % 4 === 0).length / spacings.length };
  });
}
```

### Layout Pattern Detection
```ts
async function detectLayoutPatterns(page: Page) {
  return page.evaluate(() => {
    const patterns: string[] = [];
    
    // Detect centered hero: h1 + p + button/a, all centered
    const centeredStack = document.querySelectorAll('h1, h2');
    centeredStack.forEach(h => {
      const style = getComputedStyle(h);
      if (style.textAlign === 'center') {
        const next1 = h.nextElementSibling;
        const next2 = next1?.nextElementSibling;
        if (next1?.tagName === 'P' && getComputedStyle(next1).textAlign === 'center' &&
            next2 && (next2.tagName === 'A' || next2.tagName === 'BUTTON')) {
          patterns.push('CENTERED_HERO');
        }
      }
    });
    
    // Detect 3-column equal cards
    document.querySelectorAll('[class*="grid"], [style*="grid"]').forEach(grid => {
      const children = grid.children;
      if (children.length === 3) {
        const widths = [...children].map(c => c.getBoundingClientRect().width);
        if (Math.max(...widths) - Math.min(...widths) < 2) {
          // Check if structure is identical
          const structures = [...children].map(c => 
            [...c.children].map(gc => gc.tagName).join(',')
          );
          if (new Set(structures).size === 1) {
            patterns.push('THREE_EQUAL_CARDS');
          }
        }
      }
    });
    
    return patterns;
  });
}
```

---

## Check Implementation Pattern

Each verifier check follows this structure:

```ts
// verifier/checks/typography-check.spec.ts
import { test, expect } from '@playwright/test';

test('typography quality', async ({ page }) => {
  await page.goto(process.env.VERIFY_URL || 'http://localhost:3000');
  await page.waitForFunction(() => document.fonts.ready);
  
  const typography = await extractTypography(page);
  
  // Check 1: No Inter as sole font
  const hasOnlyInter = typography.fonts.every(f => f.includes('Inter'));
  expect(hasOnlyInter, 'Inter is the only font — add a distinctive heading font').toBe(false);
  
  // Check 2: Font diversity (1-2 families)
  const uniqueFamilies = new Set(typography.fonts.map(f => f.split(',')[0].trim()));
  expect(uniqueFamilies.size, `Too many font families: ${uniqueFamilies.size}`).toBeLessThanOrEqual(3);
  
  // Check 3: Heading/body size contrast
  // ...
});
```

---

## Performance Considerations

- Extract all properties in a SINGLE `page.evaluate()` call (reduce IPC overhead)
- Cache extraction results across checks in the same test run
- quick-lint.js does static file analysis (no browser needed) for the PostToolUse hook
- Full Playwright extraction only runs on /verify or PreCommit

---

## Limitations

1. **Computed styles may differ from intended styles** — browser normalization
2. **Pseudo-elements** — ::before/::after may contain visual content not captured by standard queries
3. **Shadow DOM** — Components using shadow DOM need special handling
4. **Canvas/SVG** — Chart libraries render to canvas — content not inspectable via DOM
5. **Dynamic content** — Content rendered after JS execution requires waiting for specific selectors
