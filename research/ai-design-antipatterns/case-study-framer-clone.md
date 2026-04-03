# Case Study: Framer.com Clone — Lessons from Iterative Redesign

**Date:** 2026-04-02
**Target:** https://www.framer.com/ → `templates/next-app/src/app/showcase-framer/`
**Stack:** Next.js 15 + Tailwind v4 + Framer Motion + Lenis
**Iterations:** 3 major versions (v1 light → v2 expanded → v3 dark redesign)
**Final Score:** 100/100 (68/68 checks)

---

## Timeline

| Version | What Changed | Trigger |
|---|---|---|
| v1 | 6 sections, light theme, wireframe placeholders | Initial implementation based on text analysis |
| v2 | 11 sections, added CMS/Portfolio/News/Experts/Community | User feedback: "missing sections" |
| v3 | Full dark theme, mosaic gallery, tab+demo features, colored placeholders | Screenshot comparison revealed fundamental tone mismatch |
| v3.1 | Testimonial indicator layout fix | User caught overlapping elements |

---

## Lesson 1: Text Analysis Is Not Enough — Screenshot First

### What happened
v1 was built from a text-based analysis of framer.com (fetched HTML/CSS). The analysis correctly identified colors (#0e1011 dark background), typography, and section structure. But the implementation came out as a **light theme** because:

- The analysis listed both light and dark color tokens
- The LLM defaulted to the "safer" light interpretation
- Without seeing the actual rendered page, the dominant visual impression (dark, bold, premium) was lost

### Rule for UDesigner
**Always capture and compare screenshots before declaring a clone/reproduction complete.** Text analysis of CSS variables tells you what colors exist, not which ones dominate the viewport.

### Implementation
The `verifier/capture-compare.mjs` script was created to automate side-by-side screenshot capture. This should be a standard step in any `/redesign` workflow.

---

## Lesson 2: "Inspired By" vs "Copy" — The Ambiguity Problem

### What happened
When asked to "copy" framer.com, the agent produced an "inspired by" interpretation:
- Changed centered hero to asymmetric split (following anti-slop rules)
- Changed 4-col feature grid to bento layout (following anti-slop rules)
- Used light theme (defaulting to "safe" choice)

The user's intent was closer reproduction. The agent followed its own design rules over the user's explicit request.

### Rule for UDesigner
**User intent overrides anti-slop rules when the user explicitly requests a specific pattern.** If the user says "copy this centered hero," the centered hero ban does not apply — the user is providing the design direction, not the AI.

### How to apply
Add to `research/prompt-engineering/instruction-hierarchy.md`:
```
P0.5: Explicit user design direction
  When the user provides a specific reference ("copy this", "match this layout"),
  their direction overrides anti-slop bans (P1). The user is the designer;
  anti-slop protects against AI defaults, not user choices.
```

---

## Lesson 3: Tone/Mood Cannot Be Decomposed Into Properties

### What happened
The text analysis correctly identified:
- Background color: `#0e1011`
- Text color: white/gray spectrum
- Font: specific families and weights

But v1 still felt completely different from framer.com. The issue: **the overall "mood" of a dark, premium site is not the sum of its individual CSS properties.** It emerges from:

- The ratio of dark to light surface area
- How images/demos interact with the dark background (bright content on dark canvas = contrast drama)
- The psychological weight of "darkness first" vs "lightness first"
- The gradient of trust: dark = exclusive/premium, light = open/accessible

### Rule for UDesigner
The verifier can check individual properties (font, color, spacing) but cannot assess **mood**. This is a strong argument for the LLM-as-Judge phase (research/verification-strategies/llm-as-judge.md). A vision model looking at both screenshots could have caught the tone mismatch immediately.

---

## Lesson 4: Placeholder Strategy Matters

### What happened
v1 used wireframe blocks (gray rectangles) as image placeholders. This made the page look like a prototype, not a product. framer.com uses rich, colorful site screenshots as its visual centerpiece.

v3 replaced wireframes with **colored placeholder cards** — each with a distinct background color, accent, and mock UI elements (nav, headings, CTAs). This preserved the visual rhythm of "colorful content on dark canvas" without needing real screenshots.

### Rule for UDesigner
Placeholder hierarchy (worst → best):
1. Empty space (missing content)
2. Gray rectangles (prototype feel)
3. Colored shapes with structure (visual rhythm preserved)
4. Actual content

For design testing, level 3 is the minimum acceptable standard. Gray wireframes are only appropriate when mocking a single component, not a full page.

---

## Lesson 5: layoutId Pitfalls in Framer Motion

### What happened
The testimonial section used `layoutId="testimonial-indicator"` for a sliding active indicator. But the indicator was rendered inside each of 4 buttons simultaneously, causing:

1. Multiple elements with the same `layoutId` competing for the same animation target
2. `absolute` positioning overlapping with sibling flex items (avatar circles)

The first fix (making all indicators render but only active one visible) still failed because `layoutId` expects exactly one mounted element at a time.

### Fix
Abandoned `layoutId` entirely. Replaced with a simple flex item `<div>` that uses `transition-colors` to fade between visible/invisible. The indicator is always in the layout flow, not absolutely positioned.

### Rule for framer-motion.md
```
layoutId rules:
- Only ONE element with a given layoutId should be mounted at any time
- Use AnimatePresence or conditional rendering to ensure this
- If you need a "sliding indicator" across always-mounted siblings,
  use CSS transitions on a flex/grid item instead of layoutId
- layoutId + absolute positioning inside flex containers = overlap bugs
```

---

## Lesson 6: Section Count ≠ Quality, But Completeness Matters

### What happened
v1 had 6 sections and scored 100/100 on the verifier. v2 had 11 sections and also scored 100/100. The verifier couldn't tell the difference because it checks quality properties, not structural completeness.

But the user immediately noticed missing sections. A page can be technically perfect (correct fonts, colors, spacing) while being structurally incomplete.

### Rule for UDesigner
The verifier measures **quality of what exists**, not **completeness relative to a reference**. For clone/reproduction tasks, a separate structural comparison step is needed:

1. Capture reference site's section list
2. Map each section to our implementation
3. Flag missing sections before running quality checks

This could be a new verifier check: `structural-comparison.spec.ts` that takes a reference URL and compares section counts/types.

---

## Lesson 7: Dark Theme Is Harder Than Light Theme

### What happened
The dark redesign (v3) required touching every single component — not just changing background colors, but:

- Border opacity (`border-[#e8e8e6]` → `border-white/[0.06]`)
- Text hierarchy (light-on-dark requires different gray steps than dark-on-light)
- Interactive states (hover on dark needs more subtle changes)
- Chart/data visualization colors (dark bars on light bg → light bars on dark bg)
- Badge/tag styling (bg-color relationships reverse)

### Rule for UDesigner
When switching themes, **every component must be re-evaluated, not just recolored.** The relationship between foreground and background changes, not just the values. This suggests that style presets (soft.md, brutalist.md, minimal.md) should define both light and dark variants, not assume one or the other.

---

## Summary: What the Verifier Caught vs What It Missed

| Category | Verifier | Screenshot Comparison | User Feedback |
|---|---|---|---|
| Font/typography correctness | ✓ Caught | — | — |
| Color contrast (WCAG) | ✓ Caught | — | — |
| Spacing consistency | ✓ Caught | — | — |
| Touch targets | ✓ Caught | — | — |
| Anti-slop patterns | ✓ Caught | — | — |
| Overall tone/mood mismatch | ✗ Missed | ✓ Caught | — |
| Missing sections | ✗ Missed | ✓ Caught | ✓ Caught |
| Placeholder quality | ✗ Missed | ✓ Caught | — |
| Element overlap (layout bug) | ✗ Missed | — | ✓ Caught |

**Conclusion:** The verifier is necessary but not sufficient. Three layers of verification are needed:
1. **Automated checks** (verifier) — catches measurable rule violations
2. **Visual comparison** (screenshot diff) — catches mood/structure/completeness gaps
3. **Human review** (user) — catches interaction bugs and subjective quality issues

This validates the phased approach in research/verification-strategies/llm-as-judge.md:
- Phase 1: Automated (done, working)
- Phase 2: LLM-as-Judge with screenshots (needed — would have caught mood mismatch)
- Phase 3: Human feedback loop (always needed as final gate)
