# Automated Scoring: What Can and Can't Be Measured

Honest assessment of which design qualities are automatable via Playwright and which require human/LLM judgment.

---

## Fully Automatable (Playwright + DOM analysis)

| Metric | Method | Confidence |
|---|---|---|
| Font families used | getComputedStyle().fontFamily | 100% |
| Font sizes + scale ratio | getComputedStyle().fontSize | 100% |
| Color values (hex/rgb) | getComputedStyle().color/backgroundColor | 100% |
| Contrast ratios (WCAG) | Color extraction + luminance calculation | 100% |
| Spacing values | getComputedStyle().padding/margin/gap | 100% |
| Grid adherence (4px multiples) | Math check on spacing values | 100% |
| Responsive overflow | scrollWidth > clientWidth check per viewport | 100% |
| Touch target sizes | getBoundingClientRect() on interactive elements | 100% |
| Banned font detection | String match on fontFamily | 100% |
| Banned color detection | Exact hex match | 100% |
| Animated properties | Intercept transition/animation CSS | 95% |
| Hover state presence | Compare styles before/after hover event | 95% |
| Focus-visible presence | Tab navigation + style comparison | 95% |
| CLS score | PerformanceObserver | 90% |
| Animation duration | Parse transition-duration / animation-duration | 90% |

## Partially Automatable (heuristic-based, may have false positives)

| Metric | Method | Confidence | Limitation |
|---|---|---|---|
| Centered hero pattern | DOM structure analysis (h1 + p + button, all centered) | 80% | May miss non-standard structures |
| 3-column card detection | Sibling count + width comparison + child structure | 75% | Legitimate 3-col layouts exist |
| Content placeholder detection | Regex on text content | 85% | New placeholder patterns emerge |
| Spacing consistency | StdDev calculation on similar elements | 80% | Defining "similar elements" is fuzzy |
| Visual hierarchy | Font-size distribution analysis | 70% | Context-dependent |
| Palette cohesion | HSL clustering | 70% | Color theory is subjective |

## NOT Automatable (requires human/LLM judgment)

| Quality | Why It Can't Be Automated |
|---|---|
| **Overall aesthetic quality** | "Does this look good?" is subjective and contextual |
| **Brand alignment** | Does it match the company's identity? Requires external reference |
| **Information hierarchy** | Is the right content emphasized? Requires understanding the content |
| **Emotional tone** | Does the design feel "premium"? "Playful"? "Trustworthy"? |
| **Layout creativity** | Is the layout interesting or just technically correct? |
| **Content quality** | Is the copy well-written? Does the data tell a story? |
| **Contextual appropriateness** | Is a dark dashboard appropriate for a healthcare app? |
| **Visual balance** | Hard to reduce to a formula without context |

---

## The LLM-as-Judge Opportunity

For the "NOT automatable" qualities, a vision-capable LLM could potentially score:

```
Approach:
1. Playwright takes full-page screenshot
2. Screenshot sent to Claude/GPT-4V with scoring rubric
3. LLM rates on: aesthetic quality, hierarchy, creativity, tone
4. Scores are advisory (not gate-blocking)
```

**Pros:**
- Covers the subjective dimensions no rule-based system can
- Can judge "does this look like an AI made it?" holistically
- Can compare against reference screenshots ("does this match the style of X?")

**Cons:**
- Adds latency (API call per verification run)
- Costs money per call
- May be inconsistent (different scores on same screenshot)
- Creates circular dependency (AI judging AI)

**Recommendation for UDesigner:**
- Phase 1: Automated checks only (verifier/checks/)
- Phase 2: Add LLM-as-Judge as optional `--judge` flag on /verify
- Keep automated checks as the gate; LLM-as-Judge as advisory scoring
- Store LLM-as-Judge scores in memory for trend tracking

---

## Scoring Implementation

### Automated Score (Phase 1)
```
Each check returns: PASS (1.0), WARN (0.7), FAIL (0.0)

Category scores:
  typography_score = avg(font_checks) × 0.25
  color_score = avg(color_checks) × 0.20
  spacing_score = avg(spacing_checks) × 0.25
  layout_score = avg(layout_checks) × 0.15
  interaction_score = avg(interaction_checks) × 0.15

total_score = sum(category_scores) × 100
```

### LLM-as-Judge Score (Phase 2, advisory)
```
Rubric sent to vision LLM:
  aesthetic: 1-10
  hierarchy: 1-10
  creativity: 1-10
  polish: 1-10
  
advisory_score = avg(rubric) × 10
```

### Combined Score
```
final_score = automated_score × 0.7 + advisory_score × 0.3
(only when --judge flag is used; otherwise automated_score alone)
```
