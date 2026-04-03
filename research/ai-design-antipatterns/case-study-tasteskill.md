# Case Study: taste-skill's Own Site vs Its Own Rules

**Date:** 2026-04-02
**Target:** https://www.tasteskill.dev/ (reproduced as static clone)
**Verifier:** UDesigner Playwright checks (7 categories, 68 tests)

---

## Result

**Score: 76/100 (52/68 passed)**

The "anti-slop frontend framework" fails 24% of its own design rules when tested with automated verification.

---

## Violations Found

### Anti-Slop (rule violations by the rule-maker)

| Violation | Rule | Irony Level |
|---|---|---|
| Centered hero (H1 + P + CTA, all text-center) | anti-slop §3.1 — banned when DESIGN_VARIANCE > 4 | **High** — this is the #1 "AI tell" the framework warns against |

### Typography (6 failures)

| Issue | Measured | Required |
|---|---|---|
| Heading/body size ratio (desktop) | 1.6:1 | >= 2.5:1 |
| Heading/body size ratio (mobile) | 1.3:1 | >= 2.5:1 |
| H2 line-height | 1.6 | 1.0-1.3 for headings |
| Manifesto text line-height | 1.05 | 1.4-1.8 for body text |

### Color / Accessibility (2 failures)

| Element | Contrast | Required |
|---|---|---|
| hero-github link (#71717a on #0e1011) | 3.95:1 | 4.5:1 (WCAG AA) |
| principle-number (#52525b on #0e1011) | 2.47:1 | 4.5:1 (WCAG AA) |

### Responsive / Mobile (2 failures)

| Issue | Measured | Required |
|---|---|---|
| Logo touch target | 26px height | 44px min |
| Social icons | 28px height | 44px min |
| GitHub link | 22px height | 44px min |

### Animation (1 category failure)

| Issue | Property | Alternative |
|---|---|---|
| FAQ accordion | max-height transition | (accepted as exception — no performant CSS alternative) |

---

## Analysis

### Why Does This Happen?

taste-skill defines design rules as markdown instructions but has **zero verification infrastructure**. The site was built by a human designer who:

1. Knew the rules intellectually but didn't check systematically
2. Made aesthetic choices (muted text at #52525b) that felt right visually but fail contrast math
3. Used a centered hero despite explicitly banning it — likely because it "worked" for this specific context
4. Didn't test touch targets on actual mobile viewports

This is the exact same failure mode as LLMs: **knowing the rules and following the rules are different things.**

### What This Proves for UDesigner

1. **Rules without verification are aspirational, not enforceable.** Even the rule-writer violates them.
2. **Automated measurement catches what visual intuition misses.** The 2.47:1 contrast ratio looks "fine" on a dark screen but fails accessibility standards.
3. **The verification loop is not optional.** It's the core differentiator between "design guidelines" and "design enforcement."

### Verifier Improvements Triggered

Two false positives were identified and fixed:
- Carousel/marquee horizontal layouts were flagged as "multi-column on mobile" → added overflow:hidden parent detection
- FAQ max-height transitions were flagged as "banned property animation" → added accordion exception

These refinements make the verifier more accurate without weakening its ability to catch real issues.

---

## Implication for Skills

The taste-core.md rules that tasteskill.dev violates are **correctly specified** — the violations are real problems. No rule changes needed. The verification layer is what was missing, and UDesigner provides it.
