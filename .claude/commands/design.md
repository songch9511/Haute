# /design — Create New UI

Generate a premium frontend interface from scratch.

## Usage
```
/design [category] [--preset soft|brutalist|minimal] [--variance N] [--motion N] [--density N]
```

Categories: ir-deck, dashboard, landing-page, presentation, portfolio, custom

---

## Phase 1: Think — "아직 코드 작성하지 마라"

### 1a. Context Loading
- Read `skills/taste-core.md`, `skills/anti-slop.md`, `skills/motion-engine.md`
- If preset specified: read `skills/style-presets/{preset}.md`
- Check memory for: user preferences, past feedback, project design tokens

### 1b. Reference Research
- Search for similar high-quality sites in the category
- If found: capture screenshot + Playwright analysis (`skills/playwright-analysis.md`)
- Identify design patterns worth adopting

### 1c. Component Search
Before building from scratch:
- Read `skills/uitripled.md` → search registry for matching sections
- Read `skills/21st-dev.md` → use `21st_magic_component_inspiration` for ideas

### 1d. Image Sourcing
- Read `skills/unsplash.md`
- Identify every image slot: hero bg, card thumbnails, avatars, product shots
- Search Unsplash, build URLs with correct params
- No gray boxes. Every `<img>` must have a real source.

---

## Phase 2: Plan — "아직 코드 작성하지 마라"

### 2a. Design Intent
State briefly:
- Layout strategy and why
- Typography pairing and why
- Color approach and why
- Motion patterns and why
- Which uitripled/21st.dev components will be used

### 2b. Dial Configuration
- DESIGN_VARIANCE: $arguments.variance or 7
- MOTION_INTENSITY: $arguments.motion or 5
- VISUAL_DENSITY: $arguments.density or 4

### 2c. Spec with Acceptance Criteria
```
## Spec: {name}

### Sections & Criteria
1. Nav — [layout, position, responsive behavior]
2. Hero — [height, bg treatment, text hierarchy, CTA placement]
3. Features — [grid layout, card structure, content]
...

### Anti-Slop Pre-Check
- [ ] No 3-equal-card rows
- [ ] No Inter-only typography
- [ ] No centered hero + subtitle + CTA (unless VARIANCE ≤ 4)
- [ ] No round numbers in data
```

**Quality Gate**: Present to user. No coding until approved.

---

## Phase 3: Execute — Spec을 따라 구현

### Per-Section Implementation
For each section:
1. Generate code following spec
2. quick-lint runs automatically
3. Screenshot → visual check → fix if needed → next section

### Requirements
- Full responsive (mobile-first, single-column below md:)
- All states: empty, loading, error, populated
- Real-looking data, proper semantic HTML, accessibility
- No placeholders, no "// add more here"
- Hero/first-screen: `animate` directly, never `useInView`

---

## Phase 4: Verify

Run `/verify` on output. Fix failures → re-verify (max 3 rounds).

---

## Phase 5: Wisdom

Extract learnings (Conventions, Successes, Failures, Gotchas, Commands).
Save to memory for future tasks.
