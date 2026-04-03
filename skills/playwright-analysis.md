---
name: playwright-analysis
description: Structured Playwright-based reference site DOM analysis — the core tool for the Think phase of /copy
---

# Playwright Analysis Guide

Use this skill during the **Think phase** of /copy. Never guess CSS — extract it.

## When to Use

- Before ANY /copy implementation
- When /redesign needs reference comparison
- When user provides a screenshot and says "make it look like this"

## Analysis Workflow

### Step 1: Screenshot Capture

```javascript
const { chromium } = require('playwright');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(URL, { waitUntil: 'networkidle' });
await page.waitForTimeout(3000);

// Full viewport
await page.screenshot({ path: 'ref-desktop.png' });

// Section crops
await page.screenshot({ path: 'ref-nav.png', clip: { x: 0, y: 0, width: 1440, height: 120 } });
```

Always capture BEFORE reading any CSS/HTML.

### Step 2: Parent Chain Analysis

For each major element, walk up the parent chain:

```javascript
const chain = await page.evaluate(() => {
  const target = document.querySelector('.target-element');
  let el = target;
  const results = [];
  while (el && el !== document.body) {
    const s = getComputedStyle(el);
    results.push({
      tag: el.tagName,
      class: el.className?.substring(0, 80),
      position: s.position,
      background: s.backgroundColor,
      borderRadius: s.borderRadius,
      width: s.width,
      height: s.height,
      padding: s.padding,
      overflow: s.overflow,
      zIndex: s.zIndex,
    });
    el = el.parentElement;
  }
  return results;
});
```

### Step 3: Children & Decorative Elements (CRITICAL)

Absolute positioned elements, SVG corners, pseudo-element replacements — these are often missed.

```javascript
const children = await page.evaluate(() => {
  const parent = document.querySelector('.parent');
  return Array.from(parent.children).map(child => {
    const s = getComputedStyle(child);
    return {
      tag: child.tagName,
      class: child.className?.substring(0, 80),
      src: child.src || null,  // Catches IMG/SVG elements
      position: s.position,
      top: s.top, left: s.left, right: s.right, bottom: s.bottom,
      width: s.width, height: s.height,
      borderRadius: s.borderRadius,
      background: s.backgroundColor,
    };
  });
});
```

**Why this matters**: Catalis nav had `corner-left` and `corner-right` SVG images (24x24, absolute positioned) creating the notch effect. Without children analysis, these were invisible.

### Step 4: Scroll State Comparison

Many elements change on scroll (nav position, opacity, size).

```javascript
// Before scroll
const before = await page.evaluate(() => {
  const el = document.querySelector('.navbar');
  return el.getBoundingClientRect().toJSON();
});

// Scroll
await page.evaluate(() => window.scrollTo(0, 300));
await page.waitForTimeout(1000);

// After scroll
const after = await page.evaluate(() => {
  const el = document.querySelector('.navbar');
  return el.getBoundingClientRect().toJSON();
});

console.log(`top: ${before.top} → ${after.top}`);
console.log(`height: ${before.height} → ${after.height}`);
```

### Step 5: Design Token Extraction

Collect all tokens into structured format:

```javascript
const tokens = await page.evaluate(() => {
  const heading = document.querySelector('h1');
  const body = document.querySelector('p');
  const nav = document.querySelector('nav, [class*=nav]');
  const hero = document.querySelector('[class*=hero], section');
  
  const get = (el) => el ? getComputedStyle(el) : {};
  
  return {
    typography: {
      heading: { family: get(heading).fontFamily, size: get(heading).fontSize, weight: get(heading).fontWeight, lineHeight: get(heading).lineHeight, letterSpacing: get(heading).letterSpacing },
      body: { family: get(body).fontFamily, size: get(body).fontSize, weight: get(body).fontWeight },
    },
    colors: {
      heroBg: get(hero).backgroundColor,
      headingColor: get(heading).color,
      bodyColor: get(body).color,
      navBg: get(nav).backgroundColor,
    },
    layout: {
      heroWidth: get(hero).width,
      heroHeight: get(hero).height,
      heroBorderRadius: get(hero).borderRadius,
      heroOverflow: get(hero).overflow,
      navWidth: get(nav).width,
      navHeight: get(nav).height,
      navPosition: get(nav).position,
    },
  };
});
```

## Checklist

Before declaring Think phase complete:

- [ ] Desktop screenshot captured
- [ ] Mobile screenshot captured (375px)
- [ ] Parent chain analyzed for nav, hero, key sections
- [ ] **Children of each major element inspected** (catches decorative SVGs)
- [ ] Scroll state compared (before/after 300px)
- [ ] All design tokens extracted with computed values
- [ ] Decorative/absolute elements cataloged (SVG corners, pseudo-elements, overlays)
- [ ] Background implementation verified (image URL? gradient? solid?)
- [ ] Font families identified (exact names from computed style)

## Common Gotchas

1. **Corner SVGs**: Nav notch effects often use absolute-positioned SVG images, not CSS
2. **Scroll animations**: Nav height/position changes on scroll — check getBoundingClientRect before/after
3. **Background layers**: `backgroundImage` may have multiple layers (gradient + image)
4. **Pseudo-elements**: Check `::before`/`::after` for decorative content
5. **Badge backgrounds**: Often `rgba(255,255,255,0.2)`, not dark — always verify computed value
6. **useInView viewport margin**: Elements near viewport top may never trigger with negative margin
