# Root Causes: Why LLMs Produce Generic UI

## 1. RLHF Training Bias

**Observation:** LLMs trained with RLHF (Reinforcement Learning from Human Feedback) converge toward "safe" average designs.

**Mechanism:**
- Human raters evaluate code output during training
- "Works correctly" scores higher than "looks distinctive"
- A centered hero with clear CTA is always "correct" — it's never penalized
- An asymmetric layout might confuse raters → lower reward signal
- Over thousands of training iterations, the model learns: generic = safe = high reward

**Evidence:**
- Compare outputs at temperature 0.0 vs 1.0: low temperature produces nearly identical layouts across prompts
- The same 3-column card grid appears regardless of whether the prompt says "dashboard" or "portfolio"

**Implication for UDesigner:**
- Rules must explicitly BAN the "safe average" patterns
- Positive examples (what TO do) are less effective than bans (what NOT to do) because the model's default is the banned pattern

---

## 2. Training Data Composition

**Observation:** The majority of frontend code in training data comes from tutorials, documentation, and templates — not production sites.

**Breakdown (estimated):**
| Source | Proportion | Design Quality |
|---|---|---|
| Tutorials/docs (MDN, React docs) | ~35% | Minimal styling, functional |
| Templates (Tailwind UI, shadcn examples) | ~25% | Generic but clean |
| Open-source projects (GitHub) | ~25% | Varies wildly |
| Blog posts / Stack Overflow | ~10% | Snippet-level, no design |
| Production sites (real companies) | ~5% | High quality but rare |

**Consequence:**
- The model's "default" output reflects tutorial/template quality
- Inter + Tailwind defaults + shadcn components = the statistical mode of the training data
- Production-level design decisions (custom type scales, intentional color palettes, considered spacing) are underrepresented

**Implication for UDesigner:**
- Skills must inject the "production 5%" knowledge that's underrepresented in training
- Few-shot examples from production-quality work are more effective than rules alone

---

## 3. Token Efficiency Pressure

**Observation:** LLMs optimize for completing the task in fewer tokens, which leads to design shortcuts.

**Shortcuts observed:**
| Shortcut | Tokens Saved | Design Cost |
|---|---|---|
| `bg-black text-white` instead of custom colors | ~20 | Harsh, generic |
| `flex justify-between` instead of CSS Grid | ~15 | Less control |
| Inline `className` instead of design tokens | ~30+ | Inconsistency |
| `font-bold` instead of specific weight | ~5 | Less nuanced |
| 3 identical cards instead of varied layout | ~100+ | Template look |

**Mechanism:**
- The model has a bias toward shorter completions (from RLHF — shorter but correct > longer and correct)
- Custom design systems require more tokens (define variables, then reference them)
- Repetitive layouts (3 cards with same structure) are token-efficient via copy-paste patterns

**Implication for UDesigner:**
- Rules must make the "short path" unacceptable
- Providing design tokens (color variables, spacing scale) reduces the token cost of doing it right

---

## 4. Context Window Asymmetry

**Observation:** The model sees the instruction once but generates thousands of tokens. Design coherence degrades as generation length increases.

**Pattern:**
- First component generated: follows instructions closely
- Third component: starts drifting toward defaults
- By the fifth section: likely using `bg-gray-100`, `p-4`, `rounded-lg` defaults

**Mechanism:**
- Design rules in the system prompt become diluted as the generated content grows
- The model's attention shifts from "follow the rules" to "complete the current pattern"
- Self-reinforcing: once the model generates a `bg-gray-100`, it's likely to repeat it

**Implication for UDesigner:**
- Verification MUST happen post-generation, not just pre-generation
- The quick-lint hook catches drift in real-time as files are edited
- Design tokens defined early in the file serve as in-context reminders

---

## 5. Lack of Visual Feedback Loop

**Observation:** LLMs generate code without ever seeing the rendered result. They have no visual feedback.

**Consequence:**
- Spacing that "looks right" in code (p-4) may look wrong rendered (too tight for the element's role)
- Color combinations that are technically correct (pass contrast) may feel wrong visually
- Animation timing that's mathematically reasonable (300ms) may feel sluggish for the interaction type

**This is the most fundamental limitation and the core argument for the Playwright verifier.**

The verifier provides the visual feedback loop that the LLM lacks:
1. Generate code
2. Render in real browser
3. Measure actual visual properties
4. Compare against standards
5. Report back to the LLM for correction

**Implication for UDesigner:**
- The verifier is not optional — it's the single most important differentiator
- Rules alone (taste-skill approach) can never fully solve this
- The LLM-as-Judge approach (screenshot evaluation) could close the loop further
