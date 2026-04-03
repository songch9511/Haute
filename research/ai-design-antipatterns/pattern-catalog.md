# Pattern Catalog: AI-Generated Design Antipatterns

Empirical catalog of patterns that recur in AI-generated frontend code. Each pattern is documented with frequency, detection method, and the skill rule it informs.

---

## Methodology

Generate UI samples across multiple prompts (landing page, dashboard, portfolio, SaaS, blog) using Claude, GPT-4, and Gemini. Catalog recurring visual patterns.

Sample size target: 100 unique generations. Current: initial observations (to be expanded with empirical data).

---

## Typography Patterns

### T1: Inter Monoculture
- **Frequency:** ~70% of samples
- **Manifestation:** `font-family: 'Inter', sans-serif` as the only font declaration
- **Detection:** Parse CSS — single font-family containing "Inter" with no secondary pairing
- **→ Rule:** anti-slop.md §2.1

### T2: Bold Everything
- **Frequency:** ~55%
- **Manifestation:** Headings use `font-bold` (700) across all levels. No weight variation.
- **Detection:** Count unique font-weight values. If ≤ 2 (400 and 700 only) → flag
- **→ Rule:** taste-core.md §2 (max 3 weights, use 400/500/700)

### T3: Giant Hero Text
- **Frequency:** ~60%
- **Manifestation:** H1 at 5rem+ (80px+), often with `font-extrabold`
- **Detection:** Compute H1 font-size in px. If > 72px → flag
- **→ Rule:** anti-slop.md §2.3

### T4: Missing Letter-Spacing
- **Frequency:** ~80%
- **Manifestation:** Default letter-spacing (0) on large headings. Looks loose and amateurish.
- **Detection:** Headings > 2rem without negative letter-spacing → flag
- **→ Rule:** taste-core.md §2 (headings: -0.02em to -0.04em)

---

## Color Patterns

### C1: The Purple-Blue Gradient
- **Frequency:** ~40%
- **Manifestation:** `bg-gradient-to-r from-purple-500 to-blue-500` or similar as primary identity
- **Detection:** Gradient with both purple and blue hue stops → flag
- **→ Rule:** anti-slop.md §1.6 (LILA BAN)

### C2: Pure Black/White
- **Frequency:** ~65%
- **Manifestation:** `bg-black` or `#000` background, `text-white` or `#fff` text
- **Detection:** Exact #000000 or #ffffff values → flag
- **→ Rule:** anti-slop.md §1.2, §1.3

### C3: Neon Box Shadows
- **Frequency:** ~30%
- **Manifestation:** `box-shadow: 0 0 20px rgba(139, 92, 246, 0.5)` — colored glow effects
- **Detection:** box-shadow with alpha > 0.3 in non-neutral color → flag
- **→ Rule:** anti-slop.md §1.1

### C4: Too Many Colors
- **Frequency:** ~45%
- **Manifestation:** 10+ distinct colors in a single interface. No cohesive palette.
- **Detection:** Extract unique color values, count. If > 8 → warn, > 12 → flag
- **→ Rule:** taste-core.md §3 (max 6 unique colors)

---

## Layout Patterns

### L1: The Centered Stack
- **Frequency:** ~75% of landing pages
- **Manifestation:** `text-center` + H1 + subtitle paragraph + CTA button, all centered vertically
- **Detection:** 3+ adjacent sibling elements all with text-align: center, including h1/h2 + p + a/button
- **→ Rule:** anti-slop.md §3.1

### L2: Three-Column Equal Cards
- **Frequency:** ~65%
- **Manifestation:** 3 cards, equal width, identical structure (icon + title + description)
- **Detection:** 3 sibling elements with identical child structure and equal width → flag
- **→ Rule:** anti-slop.md §3.2

### L3: Everything Rounded
- **Frequency:** ~70%
- **Manifestation:** `rounded-lg` or `rounded-xl` on every element, including where it doesn't help
- **Detection:** > 80% of bordered elements have border-radius > 8px → warn
- **→ Rule:** Intentional radius: match element role (buttons: 8px, cards: 12px, pills: full)

### L4: No Visual Hierarchy
- **Frequency:** ~50%
- **Manifestation:** All sections have same padding, same card sizes, same element proportions
- **Detection:** Standard deviation of section padding < 8px → flag (too uniform)
- **→ Rule:** taste-core.md §4 (vary section spacing py-24 to py-32)

---

## Content Patterns

### D1: Placeholder Names
- **Frequency:** ~85%
- **Manifestation:** "John Doe", "Jane Smith", "user@example.com"
- **Detection:** String match against known placeholder list
- **→ Rule:** anti-slop.md §4.1

### D2: Round Numbers
- **Frequency:** ~70%
- **Manifestation:** "$100", "10,000 users", "99% uptime"
- **Detection:** Regex for amounts ending in 00/000 or percentages at 99/100
- **→ Rule:** anti-slop.md §4.2

### D3: Startup Cliché Copy
- **Frequency:** ~60%
- **Manifestation:** "Elevate your workflow", "Seamlessly integrate", "Unleash the power of"
- **Detection:** String match against banned phrase list
- **→ Rule:** anti-slop.md §4.4

---

## Interaction Patterns

### I1: No Hover States
- **Frequency:** ~40%
- **Manifestation:** Interactive elements (buttons, links, cards) with no hover/active/focus styling
- **Detection:** Interactive elements without :hover pseudo-class or transition property → flag
- **→ Rule:** taste-core.md §5 (always include hover + active + focus-visible)

### I2: No Loading States
- **Frequency:** ~55%
- **Manifestation:** No skeleton screens, no spinners, no loading indication
- **Detection:** Absence of loading/skeleton components or conditional rendering for loading state → warn
- **→ Rule:** motion-engine.md §5

### I3: Abrupt Transitions
- **Frequency:** ~35%
- **Manifestation:** State changes (open/close, show/hide) with no transition, just instant swap
- **Detection:** Elements with display:none toggling without CSS transition or animation → warn
- **→ Rule:** motion-engine.md §3 (all state changes get transition)
