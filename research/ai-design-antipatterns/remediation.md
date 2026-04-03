# Remediation: How to Fix AI Design Antipatterns

Strategies that work (and don't work) for overcoming the patterns cataloged in pattern-catalog.md.

---

## Strategy Comparison

| Strategy | Effectiveness | Token Cost | Maintainability |
|---|---|---|---|
| Banning patterns (anti-slop) | High | Low | High |
| Providing alternatives | Medium-High | Medium | Medium |
| Few-shot examples | High | High | Low (stale quickly) |
| Design tokens in context | High | Medium | High |
| Post-generation verification | Very High | Zero (at generation time) | High |
| System prompt rules | Medium | Low | High |

---

## 1. Ban + Alternative (Most Effective Single Strategy)

**How it works:** For each banned pattern, provide a specific alternative.

```
❌ Ban: Inter as sole font
✅ Alternative: Geist Sans (heading) + Geist Sans (body), or Outfit + Geist Mono

❌ Ban: 3-column equal card grid
✅ Alternative: Bento grid with 2 large + 2 small, or list with hover expand
```

**Why it works:**
- LLMs follow negative constraints more reliably than positive aspirations
- "Don't use Inter" is more actionable than "choose a distinctive font"
- The alternative removes the model's need to search its training data for options

**Limitation:**
- Doesn't scale to every possible situation
- Model may find creative ways to technically comply while violating the spirit

---

## 2. Design Tokens (Reduces Token Cost of Good Design)

**How it works:** Provide CSS variables / Tailwind config that encode the design system.

```css
:root {
  --bg-primary: #0e1011;
  --text-primary: #f0f0f0;
  --accent: #22c55e;
  --font-heading: 'Outfit', sans-serif;
  --font-body: 'Geist Sans', sans-serif;
}
```

**Why it works:**
- Referencing `var(--bg-primary)` is fewer tokens than remembering "#0e1011"
- Self-reinforcing: once defined, the model uses them consistently
- Prevents color/font drift in long generations

**How UDesigner uses this:**
- taste-core.md defines the default token set
- Memory stores project-specific token overrides
- Verifier checks that only token values are used (no arbitrary hex)

---

## 3. Post-Generation Verification (Highest Ceiling)

**How it works:** Let the LLM generate freely, then check the output against rules.

**This is the core UDesigner innovation vs taste-skill.**

Verification catches what instructions miss:
- Drift: model starts correct but degrades over long output
- Interpretation: model "follows" a rule but misunderstands the intent
- Omission: model skips a rule when juggling many constraints
- Hallucination: model claims it followed a rule it actually violated

**Two-stage verification:**
1. **quick-lint** (static analysis, < 2s): Catches font, color, layout pattern violations by parsing CSS/HTML
2. **Playwright verify** (rendered check, < 30s): Catches visual issues that only appear when rendered (actual spacing, contrast, overflow)

---

## 4. Instruction Hierarchy (Controls Conflict Resolution)

**Problem:** When rules conflict, the model makes arbitrary choices.

Example conflict:
- Rule A: "Use asymmetric layouts" (DESIGN_VARIANCE > 6)
- Rule B: "Ensure mobile responsive single-column" (always)
- These don't actually conflict, but the model may treat "asymmetric" as incompatible with "single-column collapse"

**Solution:** Explicit priority ordering in skills:

```
Priority 1 (Never violate): Accessibility (contrast, touch targets, ARIA)
Priority 2 (Rarely violate): Anti-slop bans
Priority 3 (Default): taste-core design principles
Priority 4 (Flexible): Style preset specifics
Priority 5 (Flexible): Motion engine suggestions
```

**How UDesigner implements this:**
- Each skill rule has an implicit priority based on its file
- CLAUDE.md establishes the loading order = priority order
- Verifier checks are ordered by priority (contrast fails block deploy, minor spacing issues are warnings)

---

## 5. What DOESN'T Work Well

### Long positive descriptions
"Create a design that feels premium, sophisticated, with attention to spacing and typography..."
→ Too vague. Model maps "premium" to its training data average = generic.

### Too many simultaneous constraints
More than ~15 active rules → model starts dropping the less emphasized ones.
→ UDesigner mitigates this by loading only relevant skills per task.

### Rules without examples
"Use interesting typography" without specifying which fonts → model defaults to Inter.
→ Every ban must have a concrete alternative.

### One-time instruction
Rules in a system prompt degrade as conversation/generation grows longer.
→ The quick-lint hook re-enforces rules at every file save, not just at generation start.
