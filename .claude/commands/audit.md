# /audit — Design Quality Report

Generate a comprehensive quality report without modifying code.

## Usage
```
/audit [file-or-directory]
```

## Workflow

### 1. Scan
- Read `skills/anti-slop.md` for banned patterns (including section 8: Layout Rhythm Bans)
- Read `skills/layout-patterns.md` summary (first 40 lines) for layout vocabulary
- Read `skills/visual-rhythm.md` for page-level pacing assessment
- Read all target frontend files
- Parse: HTML structure, CSS properties, class names, inline styles

### 2. Analysis Categories

#### A. Anti-Slop Scan
Check for banned patterns:
- **Visual**: neon glows, pure #000, gradient text, custom cursors, purple/blue AI palette
- **Typography**: Inter/system-ui as primary, oversized H1 (> 4.5rem), serif in dashboards
- **Layout**: centered hero + subtitle + CTA combo, 3-column equal card grid, h-screen
- **Content**: "John Doe", "Lorem ipsum", round numbers ($100, 1000 users), "Acme/Nexus"
- **Dependencies**: unverified imports, default shadcn/ui without customization

#### B. Spacing Analysis
- Padding/margin distribution
- Consistency score (standard deviation of spacing values)
- Spacing scale adherence (4px/8px grid)

#### C. Color Analysis
- Unique colors count
- Contrast ratios (WCAG AA: 4.5:1 normal, 3:1 large text)
- Palette cohesion

#### D. Typography Analysis
- Font families used
- Size scale (min ratio between steps)
- Weight distribution

#### E. Responsiveness
- Breakpoint coverage
- Potential overflow issues
- Touch target sizes (minimum 44x44px)

#### F. Animation Analysis
- Properties being animated
- Duration ranges
- Performance flags (animating layout properties)

#### G. Layout Diversity
- Count distinct grid patterns across sections
- Check for consecutive identical layouts (anti-slop 8.1)
- Verify section height variation (anti-slop 8.2)
- Check centering diversity — not all sections center-aligned (anti-slop 8.3)
- Background alternation patterns (anti-slop 8.4)

#### H. Visual Rhythm
- Section spacing variation (not all same py-XX)
- Density wave assessment (dense/sparse alternation)
- Background color transitions (chapter breaks)
- Overall page pacing against templates in `visual-rhythm.md`

### 3. Scoring

```
Score = (passed_rules / total_rules) × 100

90-100: Premium quality
70-89:  Good, minor issues
50-69:  Needs work
0-49:   Major redesign needed
```

### 4. Output Format
```
## Design Quality Report: [filename]

### Score: 85/100 (Good)

### Critical (must fix)
- ❌ Inter font used as body font → swap to Geist/Outfit
- ❌ Contrast 2.8:1 on muted text → increase to 4.5:1

### Warnings (should fix)
- ⚠️ 12 unique colors → reduce to 6-8
- ⚠️ No hover states on interactive elements

### Info
- ℹ️ 4 breakpoints defined (good coverage)
- ℹ️ All animations use transform/opacity (good)
```
