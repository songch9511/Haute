# /redesign — Improve Existing UI

Audit and upgrade an existing interface to premium design quality.

## Usage
```
/redesign [file-or-directory]
```

---

## Phase 1: Think — "아직 코드 작성하지 마라"

### 1a. Context Loading
- Read `skills/taste-core.md`, `skills/anti-slop.md`
- Check memory for: user preferences, project design tokens

### 1b. Scan
- Read target file(s)
- Identify: framework, styling approach, component library
- Catalog existing patterns

### 1c. Diagnose
Run audit checklist across 6 categories:
1. **Typography** — font choices, size scale, weight usage, line-height
2. **Color** — palette size, contrast ratios, consistency
3. **Spacing** — padding/margin consistency, rhythm
4. **Interaction** — hover/active/focus states, transitions
5. **Layout** — grid usage, responsive breakpoints, alignment
6. **Content** — placeholder quality, data realism

### 1d. Reference Comparison (if provided)
If user provides reference screenshot/URL:
- Read `skills/playwright-analysis.md`
- Capture screenshots, extract computed styles
- Create diff table: current vs reference for each element

Output diagnosis table with severity (critical / warning / info).

---

## Phase 2: Plan — Spec with Fix Order

Present fix plan with **measurable acceptance criteria**:

```
## Fix Plan

### Priority Order
1. Typography swaps (highest visual impact, lowest risk)
2. Color cleanup
3. Spacing normalization
4. Hover/active/focus states
5. Layout restructuring
6. Content replacement
7. Animation/polish

### Acceptance Criteria
- [ ] Heading font: X → Y
- [ ] Body contrast ratio: 3.2:1 → 4.5:1+
- [ ] Card padding: inconsistent → 24px uniform
- [ ] ...
```

**21st.dev Refinement** (for major overhauls):
- Read `skills/21st-dev.md`
- Use `21st_magic_component_refiner` with diagnosis results

**Quality Gate**: Wait for user approval.

---

## Phase 3: Execute — 우선순위별 수정

For each fix in priority order:
1. Apply the fix
2. quick-lint runs automatically
3. Screenshot → verify improvement → next fix

**Rules**:
- Hero/first-screen: `animate` directly, never `useInView`
- Don't introduce new anti-slop violations while fixing others
- If a fix causes unexpected side effects → stop, re-plan

---

## Phase 4: Verify

Run `/verify` on modified file(s). Fix failures → re-verify (max 3 rounds).

Show before/after summary:
- What changed and why
- Quality score improvement
- Any remaining warnings

---

## Phase 5: Wisdom

Extract learnings. Save to memory.
