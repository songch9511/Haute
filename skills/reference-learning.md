---
name: reference-learning
description: Extract design decisions (not just tokens) from reference sites during Think phase — WHY choices create impact, not just WHAT was chosen
---

# Reference Learning Guide

Complements `playwright-analysis.md` (which extracts tokens). This skill extracts **design decisions**.
Use during Think phase of `/copy` and `/design` (when reference exists).

## When to Use

- After `playwright-analysis.md` has captured tokens
- Before writing any implementation spec in Plan phase
- When you need to understand WHY a page feels impactful, not just what colors it uses

**Core rule**: Always screenshot before coding. Text analysis never captures visual patterns.

## Design Decision Extraction Template

Fill this out for every reference analysis:

```
## Reference Analysis: {site_name}

### First Impression (5-second test)
- What catches the eye first?
- What emotion does the page evoke?
- What's the visual surprise or hook?

### Layout Strategy
- How many distinct layout patterns are used?
- Are sections visually diverse or repetitive?
- Where are the visual "breaks" or rhythm changes?
- Is the layout asymmetric, editorial, or grid-based?

### Typography Hierarchy
- How is scale used to create drama?
- What's the largest text size and where?
- How does heading size vary across sections?

### Color Strategy
- How many background colors are used?
- Where do dark/light transitions happen?
- Is color used to guide the eye?

### Motion & Interaction
- What animates on scroll?
- Are animations subtle or dramatic?
- How does motion support the narrative?

### Visual Storytelling
- What story does the page tell?
- How do sections build on each other?
- Where is the emotional climax?

### Key Design Decisions (3–5 entries)
- Decision: {what they did}
- Why it works: {the design principle behind it}
- How to apply: {actionable rule for this project}
```

## Analysis Methodology

### Step 1: Screenshot First (Non-Negotiable)

```javascript
// Desktop
await page.setViewportSize({ width: 1440, height: 900 });
await page.screenshot({ path: 'ref-desktop.png', fullPage: true });

// Mobile
await page.setViewportSize({ width: 375, height: 812 });
await page.screenshot({ path: 'ref-mobile.png', fullPage: true });
```

Do not proceed until both screenshots exist. Visual patterns cannot be inferred from DOM text.

### Step 2: Scroll-Through Observation

Scroll top to bottom, noting section transitions:

```javascript
const sections = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('section, [class*=section], main > div')).map(el => {
    const s = getComputedStyle(el);
    return {
      class: el.className?.substring(0, 60),
      bg: s.backgroundColor,
      padding: s.paddingTop + ' ' + s.paddingBottom,
      height: el.getBoundingClientRect().height,
    };
  });
});
```

Map background color transitions — dark→light→dark is a visual chapter signal.

### Step 3: Fill the Extraction Template

Complete every field. Leave nothing as "unknown" — use Playwright to verify.

### Step 4: Identify the 3 Most Impactful Decisions

From the template, select the 3 decisions that most explain why the page feels premium. These become the design brief's core constraints.

### Step 5: Produce the Design Brief

One-page summary (see Output Format below). This is the Plan phase input.

## Common Agency Patterns to Look For

Things agencies do that AI defaults don't:

- **Asymmetric layouts**: Content offset to one side, not center-aligned grids
- **Typography as design element**: Oversized headings (80–120px+), mixed weights within a single line
- **Intentional negative space**: Large empty zones that create breathing room — resist filling them
- **Section transitions that flow**: Each section references the previous visually (color echo, shape continuation)
- **Real photography**: Actual humans/objects, not abstract gradients or illustrations
- **Color as chapters**: Dark section signals topic shift, not just aesthetic contrast
- **Micro-interactions**: Hover states, cursor followers, subtle parallax — never purely static
- **Custom dividers**: Diagonal cuts, wave SVGs, bleed images — not straight horizontal rules
- **Editorial grid breaks**: Full-bleed images, content that bleeds past the container
- **Specificity in copy**: Concrete numbers and outcomes in headings, not generic claims

## Output Format

Reference analysis produces four artifacts for the Plan phase:

1. **Design Brief** — filled Extraction Template (the template above, completed)
2. **Layout pattern selections** — named patterns mapped to `layout-patterns.md`
3. **Visual rhythm template** — section sequence with background colors, mapped to `visual-rhythm.md`
4. **Anti-patterns list** — specific things this reference avoids that AI would default to

Example anti-patterns list entry:
> "Site uses no card borders — avoid adding border or shadow to content cards. Separation is achieved through background color only."

## Checklist

Before leaving Think phase:

- [ ] Desktop + mobile screenshots captured
- [ ] Extraction template fully completed (no empty fields)
- [ ] 3 most impactful decisions identified with "why it works" rationale
- [ ] Section background sequence mapped (light/dark rhythm)
- [ ] Design brief written and ready for Plan phase input
- [ ] Anti-patterns list written
