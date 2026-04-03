# Context Budget: Optimal Information Delivery

How to maximize design quality within limited context windows.

---

## The Problem

Context windows are finite. Loading all skills, all examples, all memory into every task wastes tokens and can actually degrade output quality (instruction dilution).

---

## Instruction Dilution Effect

**Observation:** LLM adherence to instructions decreases as instruction volume increases.

| Instructions Loaded | Adherence to Critical Rules | Adherence to Minor Rules |
|---|---|---|
| < 500 tokens | ~95% | ~90% |
| 500-1500 tokens | ~90% | ~75% |
| 1500-3000 tokens | ~85% | ~55% |
| 3000+ tokens | ~75% | ~40% |

**Implication:** Loading 5000 tokens of design rules achieves LESS than loading 1500 tokens of the most relevant rules.

---

## UDesigner's Budget Strategy

### Tier 1: Always Loaded (~200 tokens)
CLAUDE.md — routing logic, 3-dial defaults, core workflow

### Tier 2: Task-Relevant Skills (~500-900 tokens)
Loaded by the command being executed:
- /design → taste-core + anti-slop + (preset) + (motion)
- /redesign → taste-core + anti-slop
- /audit → anti-slop only
- /verify → none (verifier runs directly)

### Tier 3: Context-Specific (~100-300 tokens)
Loaded when matching context exists:
- example.md for the matching category
- Memory: relevant feedback and project tokens

### Tier 4: Never Auto-Loaded
- Research documents (reference material, not runtime instructions)
- Other category examples (only load the matching one)
- Full verifier check code (verifier runs independently)

---

## Skill File Size Constraints

Each skill file should stay within budget:

| File | Max Lines | Max Tokens | Rationale |
|---|---|---|---|
| CLAUDE.md | 80 | 250 | Loaded every task — must be minimal |
| taste-core.md | 200 | 500 | Core rules — moderate |
| anti-slop.md | 250 | 600 | Comprehensive bans — larger is OK |
| motion-engine.md | 180 | 400 | Only loaded when animation needed |
| style-preset/*.md | 80 | 200 | Small, focused overrides |
| example.md | 50 | 100 | Concise reference, not full code |

---

## Command-Level Budget Control

Each command file specifies exactly what to load:

```markdown
# /design command
## Context Loading (budget: 1500 tokens)
1. Read skills/taste-core.md        (~500 tokens)
2. Read skills/anti-slop.md         (~600 tokens)  
3. IF preset: Read skills/style-presets/{preset}.md  (~200 tokens)
4. IF category match: Read examples/{cat}/example.md (~100 tokens)
5. Check memory for relevant feedback (~100 tokens)
---
Total: 1300-1500 tokens of instructions
```

This is enforced by the command structure, not by the LLM's judgment. The LLM reads what the command tells it to read.

---

## Optimization Techniques

### 1. Frontload Critical Rules
Put the most important rules at the TOP of each skill file. LLMs attend more to early content.

### 2. Use Structured Formats
Tables and lists have better adherence than prose paragraphs:
```
❌ "You should try to use fonts like Geist or Outfit rather than Inter..."
✅ | Banned | Alternative |
   | Inter (sole) | Geist, Outfit, Cabinet Grotesk |
```

### 3. Positive + Negative Pairing
Each ban should immediately follow with the alternative. Don't separate "what not to do" from "what to do instead."

### 4. Concrete Over Abstract
```
❌ "Use generous whitespace"
✅ "Section padding: min py-24 (96px) between major sections"
```

### 5. Progressive Disclosure
Don't load motion-engine.md if the user asked for a simple static page. Don't load preset details if no preset was requested. Let the command decide.
