# /copy — Design Copy from Reference

Reproduce a reference website's visual language as a new page.

## Usage
```
/copy <url-or-screenshot> [--name <project-name>] [--sections hero,features,pricing,cta,footer] [--content <topic>]
```

---

## Phase 1: Think — "아직 코드 작성하지 마라"

**Goal**: Fully understand the reference before writing a single line.

### 1a. Screenshot Capture (FIRST)
- Capture desktop (1440×900) + mobile (375×812) screenshots via Playwright
- Save as `ref-desktop.png`, `ref-mobile.png`
- Crop key areas: nav, hero text, cards, each section

### 1b. Playwright DOM Analysis
Read `skills/playwright-analysis.md` and execute the full workflow:
1. Parent chain for nav, hero, each major section
2. **Children of each element** — catch absolute positioned SVGs, decorative elements
3. Scroll state comparison (before/after 300px)
4. Pseudo-elements check (::before, ::after)

### 1c. Design Token Extraction
From Playwright computed styles (NOT guessing):
- Typography: font-family, size, weight, line-height, letter-spacing (exact values)
- Colors: all bg, text, accent, border colors (computed rgba)
- Layout: width, height, padding, border-radius, overflow, position
- Decorative: SVG corners, background layers, clip-paths
- Motion: scroll-driven changes, transition properties

**Output**: Design Token Summary table → show to user before proceeding.

---

## Phase 2: Plan — "아직 코드 작성하지 마라"

### 2a. Style Preset Creation
Create `skills/style-presets/{name}.md` from Playwright-verified tokens.

### 2b. Anti-Slop Conflict Check
Compare tokens against `skills/anti-slop.md`. Document resolutions.

### 2c. WCAG Contrast Verification
Calculate all text/bg contrast ratios. Split accent into two shades if needed.
- Normal text: ≥ 4.5:1
- Large text (≥ 24px): ≥ 3:1
- Light bg (brightness > 70%): text MUST be dark

### 2d. Spec with Acceptance Criteria
Present implementation plan with **measurable criteria per section**:

```
## Spec: {name}

### Sections
1. Nav — [exact computed styles from Playwright]
2. Hero — [exact computed styles]
3. ...

### Acceptance Criteria
- [ ] Nav: border-radius = 0 0 24px 24px
- [ ] Nav: corner SVGs at -left-6, -right-6 (if detected)
- [ ] Hero: background-image includes real photo URL
- [ ] Hero: text color = rgb(x,y,z) from computed style
- [ ] Each section bg color independently verified
- [ ] ...

### Implementation Order
Nav → Hero → About → Benefits → Features → Pricing → Testimonials → CTA → Footer
```

**Quality Gate**: Wait for user approval. No coding until approved.

---

## Phase 3: Execute — Spec을 따라 섹션별 구현

Read these skills before generating code:
- `skills/taste-core.md`, `skills/anti-slop.md`, `skills/motion-engine.md`
- `skills/uitripled.md` + `skills/21st-dev.md` (component search)
- `skills/unsplash.md` (image sourcing)
- `skills/style-presets/{name}.md` (just created)
- Check memory for: `feedback_*`, `project_*`

### Per-Section Loop
For each section in the spec:
1. Search uitripled → 21st.dev → from scratch
2. Source images via Unsplash
3. Implement
4. **Immediately**: screenshot → compare with reference → fix before next section

### Rules
- Colors/fonts/spacing from Playwright computed styles, not assumptions
- `backgroundImage` + `backgroundColor`, not `background` shorthand
- Hero/first-screen: `animate` directly, never `useInView`
- z-index: decorative `z-0`, content `z-10`
- Transparency: `hsla()`/`rgba()` for bg-only, never `opacity` on parent
- Real content, no placeholders

### Discovery → Re-plan
If something contradicts the spec → STOP → update spec → get approval → resume.

---

## Phase 4: Verify

```bash
cd verifier && VERIFY_URL="http://localhost:3000/{name}" npx playwright test --reporter=list --ignore-snapshots
```

For each failure: fix → re-verify (max 3 rounds).
Final: screenshot comparison with reference side-by-side.

---

## Phase 5: Wisdom Extraction

After completion, extract learnings into 5 categories:

| Category | What to capture |
|---|---|
| Conventions | Design patterns used (e.g., "corner SVGs for notch") |
| Successes | What worked (e.g., "Playwright children analysis") |
| Failures | What failed (e.g., "guessed badge bg wrong") |
| Gotchas | Edge cases (e.g., "useInView hides hero") |
| Commands | Useful scripts (e.g., "scroll state comparison") |

Save to memory. Update visual regression baselines if all checks pass.
