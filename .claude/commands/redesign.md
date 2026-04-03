# /redesign — Improve Existing UI

Audit and upgrade an existing interface to premium design quality.

## Usage
```
/redesign [file-or-directory]
```

## Workflow

### 1. Context Loading
- Read `skills/taste-core.md`
- Read `skills/anti-slop.md`
- Check memory for: user preferences, project design tokens

### 2. Scan
- Read the target file(s)
- Identify: framework, styling approach, component library
- Catalog existing patterns

### 3. Diagnose (run /audit internally)
Run the audit checklist across 6 categories:
1. **Typography** — font choices, size scale, weight usage, line-height
2. **Color** — palette size, contrast ratios, consistency
3. **Spacing** — padding/margin consistency, rhythm
4. **Interaction** — hover/active/focus states, transitions
5. **Layout** — grid usage, responsive breakpoints, alignment
6. **Content** — placeholder quality, data realism

Output a diagnosis table with severity (critical / warning / info).

### 4. Fix (priority order)
Apply fixes in this order — each fix gets quick-lint checked:
1. Typography swaps (highest visual impact, lowest risk)
2. Color cleanup
3. Spacing normalization
4. Hover/active/focus states
5. Layout restructuring
6. Content replacement
7. Animation/polish (last — builds on everything above)

**21st.dev Refinement (optional):**
For components needing significant visual overhaul:
- Read `skills/21st-dev.md` for integration guide
- Use `21st_magic_component_refiner` with diagnosis results as context
- Apply refined output, then strip anti-slop violations and re-lint

### 5. Verify
Run `/verify` on the modified file(s).

### 6. Report
Show before/after summary:
- What changed and why
- Quality score improvement
- Any remaining warnings
