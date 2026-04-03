# Few-Shot vs Rules: Instruction Effectiveness

Comparing two primary approaches to guiding LLM design output.

---

## Rules-Based (anti-slop.md approach)

```
"Never use Inter as the sole font. Use Geist, Outfit, or Cabinet Grotesk instead."
```

### Pros
- Token-efficient (~10-30 tokens per rule)
- Easy to add/remove rules
- Clear pass/fail for verification
- Scales well (50+ rules in < 500 tokens of instructions)

### Cons
- Negative rules ("don't do X") don't teach the positive alternative's aesthetic
- Rules interact in complex ways that are hard to predict
- LLM may follow the letter but not the spirit
- Over-specified rules constrain creativity

### Best For
- Binary violations (use/don't use specific font)
- Measurable properties (contrast ratio, spacing values)
- Pattern banning (centered hero, 3-col cards)

---

## Few-Shot Examples (example.md approach)

```
"Here's a premium IR deck layout: [code/description]"
```

### Pros
- Teaches aesthetic holistically — the LLM sees how rules interact
- Demonstrates "what good looks like" rather than "what bad looks like"
- Better for complex qualities (visual hierarchy, rhythm, polish)
- LLM can generalize from example to new contexts

### Cons
- Token-expensive (100-500 tokens per example)
- Examples can become stale (dependencies change, trends shift)
- LLM may copy too literally (overfitting to the example)
- Hard to maintain — changing design system requires updating all examples

### Best For
- Category-specific patterns (IR deck looks different from portfolio)
- Complex aesthetic qualities that are hard to describe as rules
- Showing how multiple rules work together
- Bootstrap for new categories

---

## UDesigner's Hybrid Approach

```
skills/*.md     → Rules (what NOT to do + measurable standards)
examples/*.md   → Few-shot (what the category SHOULD look like)
verifier/       → Post-hoc enforcement (did it actually follow either?)
```

### Loading Strategy

```
Always load:        skills/taste-core.md (rules — ~400 tokens)
                    skills/anti-slop.md (bans — ~500 tokens)

Conditionally load: skills/motion-engine.md (if animation needed — ~300 tokens)
                    skills/style-presets/{x}.md (if preset requested — ~200 tokens)
                    examples/{category}/example.md (if category matches — ~100 tokens)

Never load all at once. Token budget per task: ~1500 tokens of instructions max.
```

### Why This Works
1. Rules prevent the obvious failures (anti-slop)
2. Examples show the target aesthetic for the category
3. Verifier catches anything rules + examples missed
4. Memory accumulates project-specific refinements over time

The three layers compensate for each other's weaknesses:
- Rules alone → technically correct but potentially soulless
- Examples alone → good aesthetic but may drift from rules
- Verifier alone → reactive, can't guide generation
- All three → informed generation + objective verification + learning loop

---

## Token Budget Allocation

For a typical /design task, target context usage:

| Source | Tokens | Purpose |
|---|---|---|
| CLAUDE.md | ~200 | Routing, high-level rules |
| taste-core.md | ~400 | Design system fundamentals |
| anti-slop.md | ~500 | Banned patterns |
| motion-engine.md | ~300 | Animation rules (if needed) |
| style preset | ~200 | Style-specific overrides (if needed) |
| example.md | ~100 | Category reference (if available) |
| Memory files | ~200 | User preferences, past feedback |
| **Total** | **~1500-1900** | |

This leaves ample room for the actual generation task in the context window.
