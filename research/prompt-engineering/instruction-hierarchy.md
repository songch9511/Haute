# Instruction Hierarchy: Priority When Rules Conflict

How UDesigner resolves conflicts between competing design rules.

---

## The Problem

Multiple skill files may give contradictory guidance:
- taste-core: "Use asymmetric layouts" (VARIANCE > 6)
- responsive: "Single column on mobile" (always)
- brutalist preset: "No border-radius" 
- taste-core: "Cards use rounded-xl (12px)"

The LLM must know which rule wins.

---

## Priority Levels (highest → lowest)

### P0: Accessibility (Never Violate)
- WCAG AA contrast ratios (4.5:1 normal, 3:1 large)
- Touch targets ≥ 44×44px
- Focus-visible indicators on all interactive elements
- Semantic HTML structure
- `prefers-reduced-motion` respect

**Rationale:** Legal requirement in many jurisdictions. User safety.

### P1: Anti-Slop Bans (Rarely Violate)
- All bans in anti-slop.md
- Content quality rules (no placeholder names, no lorem ipsum)

**Rationale:** Core value proposition of UDesigner. Violating these defeats the purpose.

**Exception:** User explicitly requests a banned pattern ("make a centered hero for this one").

### P2: Core Design Principles (Default)
- Typography system (taste-core §2)
- Color system (taste-core §3)
- Layout grid (taste-core §4)
- Component standards (taste-core §5)
- Performance constraints (taste-core §7)

**Rationale:** These establish the design system's coherence.

### P3: Style Preset Specifics (Flexible)
- Preset-specific overrides (soft, brutalist, minimal)
- When preset conflicts with taste-core, preset wins for its specific domain

**Example:** brutalist says "no border-radius" → overrides taste-core's "rounded-xl on cards"

### P4: Motion Engine (Most Flexible)
- Animation patterns from motion-engine.md
- These are suggestions, not requirements
- MOTION_INTENSITY dial scales from "no animation" to "full choreography"

**Rationale:** Animation is enhancement. A design without animation but with correct typography/color/spacing is still good. The reverse is not true.

### P5: Memory-Based Preferences
- User feedback stored in memory
- Project-specific design tokens

**Rationale:** User preference is important but may be outdated or context-specific. Apply when relevant, but don't override P0-P2.

---

## Conflict Resolution Examples

### Example 1: Asymmetry vs Mobile
- taste-core: DESIGN_VARIANCE > 6 → asymmetric layout
- taste-core: responsive → single column below md:
- **Resolution:** Asymmetric on desktop (≥ md:), single column on mobile. No conflict.

### Example 2: Preset vs Core
- brutalist: "No border-radius anywhere"
- taste-core: "Cards: rounded-xl"
- **Resolution:** Preset wins (P3 overrides P2 for preset-specific rules). Cards get 0px radius in brutalist.

### Example 3: Memory vs Anti-Slop
- User feedback memory: "I like the Inter font, keep using it"
- anti-slop: "Inter as sole font is banned"
- **Resolution:** Anti-slop wins (P1 > P5). Inter is OK as body paired with distinctive heading font. Suggest this compromise.

### Example 4: Motion vs Accessibility
- motion-engine: Scroll-triggered parallax animation
- accessibility: prefers-reduced-motion must disable animations
- **Resolution:** Accessibility wins (P0). Always include reduced-motion media query.

---

## Implementation in CLAUDE.md

The routing in CLAUDE.md loads skills in priority order. When generating, the LLM should:

1. Check P0 constraints first (will this be accessible?)
2. Check P1 bans (does this use any banned patterns?)
3. Apply P2 design system (typography, color, spacing, layout)
4. Apply P3 preset overrides (if a preset is active)
5. Apply P4 motion (at the appropriate MOTION_INTENSITY)
6. Apply P5 memory preferences (where they don't conflict with above)

The verifier checks also run in this priority order — P0 failures are "critical", P1 are "error", P2 are "warning", P3-P5 are "info".
