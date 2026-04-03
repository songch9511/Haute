# LLM-as-Judge: Vision Model Design Evaluation

Using vision-capable LLMs to evaluate screenshot quality — possibilities, limitations, and implementation strategy.

---

## Concept

```
Playwright screenshot → Vision LLM (Claude/GPT-4V) → Score + Feedback
```

This addresses the gap between "technically correct" (automatable checks) and "aesthetically good" (subjective quality).

---

## What LLM-as-Judge Can Evaluate

| Quality | Can LLM Judge? | Confidence |
|---|---|---|
| "Does this look AI-generated?" | Yes — high | This is the core value prop |
| Overall aesthetic quality | Yes — medium | Subjective but consistent at extremes |
| Visual hierarchy clarity | Yes — medium | Can identify dominant vs secondary elements |
| Whitespace quality | Yes — medium | "Too dense" or "too sparse" judgments |
| Color harmony | Partially | Better at flagging clashes than rating harmony |
| Typography quality | Partially | Can spot obvious issues, less reliable on subtlety |
| Layout creativity | Yes — medium | Can detect "generic template" vs "intentional design" |
| Brand consistency | No | Requires brand knowledge not in screenshot |
| Accessibility | No | Cannot determine programmatic accessibility from image |

---

## Proposed Rubric

Send this rubric with each screenshot evaluation:

```markdown
Rate this UI screenshot on a 1-10 scale for each criterion:

1. **Anti-Generic Score** (1-10)
   Does this look like a unique, intentional design or a generic AI/template output?
   - 1-3: Obvious template/AI output (centered hero, 3-column cards, purple gradient)
   - 4-6: Somewhat generic but has some intentional choices
   - 7-10: Distinctive, feels hand-crafted by a designer

2. **Visual Hierarchy** (1-10)
   Is there a clear order of importance? Can you tell what to look at first?
   - 1-3: Everything competes for attention or nothing stands out
   - 4-6: Some hierarchy but inconsistent
   - 7-10: Clear, intentional hierarchy guiding the eye

3. **Spacing & Rhythm** (1-10)
   Is the whitespace intentional? Is there visual rhythm?
   - 1-3: Cramped or inconsistent spacing
   - 4-6: Adequate but unremarkable
   - 7-10: Generous, rhythmic, gives content room to breathe

4. **Polish** (1-10)
   Does it feel finished? Are details attended to?
   - 1-3: Feels like a rough draft
   - 4-6: Functional but missing refinement
   - 7-10: Every detail feels considered

Respond as JSON: { "anti_generic": N, "hierarchy": N, "spacing": N, "polish": N, "notes": "..." }
```

---

## Implementation

### Phase 2 Feature (not Phase 1)

```ts
// verifier/checks/llm-judge.ts (advisory, non-blocking)
async function llmJudge(screenshotPath: string): Promise<JudgeScore> {
  const screenshot = fs.readFileSync(screenshotPath, 'base64');
  
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',  // Vision-capable, cost-effective
    max_tokens: 500,
    messages: [{
      role: 'user',
      content: [
        { type: 'image', source: { type: 'base64', media_type: 'image/png', data: screenshot } },
        { type: 'text', text: RUBRIC_PROMPT }
      ]
    }]
  });
  
  return JSON.parse(response.content[0].text);
}
```

### Cost Estimate
- ~0.003 USD per screenshot evaluation (Sonnet, ~1500 input tokens with image)
- 2 viewports (desktop + mobile) × 1 page = ~0.006 USD per /verify run
- Acceptable for development workflow

---

## Known Limitations

### 1. Inconsistency
Same screenshot may get different scores on repeated evaluation.
- Mitigation: Average 3 evaluations, or use temperature 0
- Mitigation: Track scores over time in memory, flag anomalies

### 2. Circular Dependency
AI judging AI-generated design. The judge may share the same biases.
- Mitigation: The rubric explicitly asks about "AI tells"
- Mitigation: Use a different model for judging than generating (e.g., generate with Opus, judge with Sonnet)
- Mitigation: Automated checks remain the gate; LLM-as-Judge is advisory only

### 3. No Interaction Context
Screenshot is static — can't evaluate hover states, animations, transitions.
- Mitigation: Automated checks handle interaction quality
- Mitigation: Could record video/GIF, but cost and complexity increase significantly

### 4. Resolution / Rendering Differences
Screenshot quality depends on viewport size and device pixel ratio.
- Mitigation: Standardize: 1280×800 desktop, 375×812 mobile, 2x DPR

---

## Decision

**Phase 1:** Do NOT implement LLM-as-Judge. Focus on automated checks.
**Phase 2:** Add as `--judge` flag on /verify. Store scores in memory for trending.
**Phase 3:** Potentially use as a training signal — which designs score highest? Feed patterns back into skills.
