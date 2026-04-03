# UDesigner Research

Empirical research that informs UDesigner's skills and verifier rules. Every design rule should trace back to evidence documented here.

## Research Areas

| Area | Key Question | Informs |
|---|---|---|
| [AI Design Antipatterns](./ai-design-antipatterns/) | Why do LLMs produce generic UI? | skills/anti-slop.md |
| [Design Quality Metrics](./design-quality-metrics/) | How to measure "good design" objectively? | verifier/checks/ |
| [Verification Strategies](./verification-strategies/) | How to automate design quality checks? | verifier/ architecture |
| [Prompt Engineering](./prompt-engineering/) | How to communicate design rules to LLMs effectively? | skills/ format, CLAUDE.md structure |

## Methodology

1. **Observation** — Generate 100+ UI samples, catalog repeated patterns
2. **Hypothesis** — Why does this pattern recur? (training data, RLHF, token efficiency)
3. **Metric** — Can we detect this pattern automatically? (DOM/CSS analysis)
4. **Rule** — Formalize as a ban + alternative in anti-slop.md
5. **Verification** — Implement detection in verifier/checks/

## Case Studies

| Target | Score | Key Finding |
|---|---|---|
| [tasteskill.dev](./ai-design-antipatterns/case-study-tasteskill.md) | 76/100 | Rule-only framework fails 24% of its own rules without verification |
| [framer.com clone](./ai-design-antipatterns/case-study-framer-clone.md) | 100/100 (3 iterations) | Text analysis misses tone; screenshot comparison is essential; verifier catches quality but not completeness |

## Traceability

Each rule in skills/ should reference its research source:
```
Rule: Inter font banned as sole font
Source: research/ai-design-antipatterns/pattern-catalog.md#typography
Evidence: 73/100 AI-generated samples used Inter as sole font
```
