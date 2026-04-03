# /verify — Run Design Verification

Execute Playwright-based design quality checks on generated UI.

## Usage
```
/verify [file-or-url] [--checks all|spacing|typography|color|animation|responsive|anti-slop|visual-regression]
```

## Workflow

### 1. Target Resolution
- If file path: serve locally and get URL
- If URL: use directly
- If no argument: find most recently modified frontend file

### 2. Run Checks
Execute selected checks (default: all):

| Check | File | What It Measures |
|---|---|---|
| spacing-audit | spacing-audit.spec.ts | Padding/margin consistency, minimum values, rhythm |
| typography-check | typography-check.spec.ts | Font families, size scale, weight usage, banned fonts |
| color-audit | color-audit.spec.ts | Palette count, contrast ratios (WCAG AA), banned colors |
| animation-check | animation-check.spec.ts | Only transform/opacity animated, duration ranges, easing |
| responsive-check | responsive-check.spec.ts | Mobile single-column, breakpoint behavior, touch targets |
| anti-slop-scan | anti-slop-scan.spec.ts | Banned DOM patterns, generic class names, AI tells |
| visual-regression | visual-regression.spec.ts | Screenshot diff against baseline (if exists) |

### 3. Report
Output results as:
```
✓ spacing-audit      PASS
✓ typography-check   PASS
✗ color-audit        FAIL — contrast ratio 3.2:1 on .card-subtitle (need 4.5:1)
✓ animation-check    PASS
✓ responsive-check   PASS
✗ anti-slop-scan     FAIL — Inter font detected in body
✓ visual-regression  PASS (no baseline)

Score: 71/100 (5/7 passed)
```

### 4. Auto-fix Suggestions
For each FAIL, provide:
- What exactly failed
- The specific rule it violates (link to skill)
- Concrete fix suggestion with code

### 5. Re-verify Option
If fixes are applied, re-run only the failed checks to confirm resolution.
