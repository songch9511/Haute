# /copy — Design Copy from Reference

Analyze a reference website's design and reproduce it as a new page with the same visual language but original content.

## Usage
```
/copy <url-or-screenshot> [--name <project-name>] [--sections hero,features,pricing,cta,footer] [--content <topic>]
```

- `url-or-screenshot`: Reference site URL or screenshot path to copy from
- `--name`: Route name for the new page (default: inferred from URL)
- `--sections`: Which sections to include (default: all detected)
- `--content`: Topic/product for original content (default: similar to reference)

## Workflow

### 1. Reference Analysis

Extract the complete design language from the reference:

**Fetch & Analyze** (use WebFetch for URLs, Read for screenshots):
- Color palette: all background, text, accent, border colors (exact hex/hsl values)
- Typography: font families, weights, sizes for each heading level and body
- Spacing: section padding, card padding, gaps, grid system
- Shadows: box-shadow layers, blur values, opacity
- Border radius: per component type
- Navigation: height, position, transparency, blur
- Buttons: padding, radius, font-size, hover states
- Motion: transition durations, easing functions, animation patterns
- Layout: max-width, grid columns, section structure
- Distinctive patterns: anything unique (asymmetric radius, gradients, textures)

If WebFetch cannot extract CSS details, launch an Agent to fetch stylesheets directly.

**Output a Design Token Summary** to the user before proceeding. Format:

```
## Design Analysis — {site name}
| Token       | Value                    |
|-------------|--------------------------|
| Background  | #1e1e1e                  |
| Text        | #dadada                  |
| Accent      | hsl(254, 80%, 68%)       |
| Font        | Inter 800 / Inter 400    |
| Nav         | Fixed 66px, blur(5px)    |
| ...         | ...                      |

Sections detected: Hero, Features, Plugins, Sync, Publish, Pricing, CTA, Footer
```

Wait for user confirmation before proceeding.

### 2. Design System Creation

Create a style preset file at `skills/style-presets/{name}.md`:

```markdown
---
name: style-preset-{name}
description: {one-line description of the visual identity}
---
# {Name} Preset — {Aesthetic Description}
Override dials: `DESIGN_VARIANCE: N, MOTION_INTENSITY: N, VISUAL_DENSITY: N`
## Typography
## Color
## Layout
## Shadows
## Buttons
## Border Radius
## Motion
## Distinctive Patterns
```

Follow the format of existing presets in `skills/style-presets/`.

### 3. Anti-Slop Conflict Check

Compare extracted design tokens against `skills/anti-slop.md` rules. For each conflict:

| Reference Pattern | Anti-Slop Rule | Resolution |
|---|---|---|
| Centered hero | Banned if VARIANCE > 4 | Lower VARIANCE to 4 |
| Inter sole font | Inter-only banned | Pair with second font |

Adjust DESIGN_VARIANCE, MOTION_INTENSITY, VISUAL_DENSITY accordingly.
Document all resolutions in the plan.

### 4. WCAG Contrast Verification

Before implementation, calculate contrast ratios for all text/background combinations:
- Normal text on primary bg: must be ≥ 4.5:1
- Large text (≥ 24px or ≥ 18.66px bold) on primary bg: must be ≥ 3:1
- White text on accent bg (buttons): must be ≥ 4.5:1
- Accent text on primary bg (links): must be ≥ 4.5:1

**If a single accent color fails both directions**, create two shades:
- `accent-bg`: darker shade for backgrounds with white text
- `accent-text`: lighter shade for text on dark backgrounds

### 5. Plan Report

Present the implementation plan to the user:

```
## Implementation Plan
- Route: /obsidian
- Sections: Nav, Hero, Features, Plugins, Sync, Publish, Pricing, CTA, Footer
- Anti-slop adjustments: [list]
- Contrast adjustments: [list]
- Dial settings: VARIANCE X, MOTION Y, DENSITY Z
```

Wait for user confirmation.

### 6. Implementation

Read these skills before generating code:
- `skills/taste-core.md`
- `skills/anti-slop.md`
- `skills/motion-engine.md`
- `skills/uitripled.md` (component registry integration)
- `skills/style-presets/{name}.md` (just created)
- Check memory for: `feedback_*` (past corrections), `project_*` (design tokens)

**Component Search (uitripled + 21st.dev):**
Before building each section from scratch:

*uitripled (first priority):*
1. Read `skills/uitripled-registry.json` and search for matching section blocks
2. For each match: `curl -s "https://ui.tripled.work/r/{name}.json"` to fetch source
3. Customize: replace colors/fonts/spacing with the style preset, strip anti-slop violations, rename

*21st.dev (fills gaps):*
4. Read `skills/21st-dev.md` for integration guide
5. For sections with no uitripled match: use `21st_magic_component_inspiration` then `21st_magic_component_builder`
6. Include reference design details in `standaloneRequestQuery` for accurate generation
7. Customize output with the style preset tokens

8. If no good match from either source, build from scratch

**Image Sourcing (Unsplash):**
Before writing code, source all needed images:
- Read `skills/unsplash.md` for sourcing guide
- Identify every image slot from the reference: hero bg, card images, avatars, product shots
- Search Unsplash via `WebSearch` ("site:unsplash.com {keywords}") matching the reference mood
- Build URLs with correct size params and `auto=format&q=80`
- For Next.js: ensure `images.remotePatterns` includes `images.unsplash.com`
- Match the reference's color temperature and style in photo selection

Generate the complete page:
- Page file: `src/app/{name}/page.tsx`
- Components: `src/components/{name}/*.tsx`
- One component per section (nav, hero, features, etc.)

Requirements:
- All colors, fonts, spacing match the style preset exactly
- Full responsive layout (mobile-first, single-column below md:)
- Real-looking content (no "John Doe", no "Lorem ipsum")
- Proper semantic HTML + accessibility
- No placeholders or "// add more here"
- Interactive elements where appropriate (Canvas graphs, mockup UIs)
- Bento grids must be gapless (every cell filled)
- Use `hsla()`/`rgba()` for bg-only transparency (never `opacity` on parent with children)
- Decorative SVG/lines must have lower z-index than content cards

### 7. Verification

Run the full verification pipeline:
```bash
cd verifier && VERIFY_URL="http://localhost:3000/{name}" npx playwright test --reporter=list --ignore-snapshots
```

For each failure:
1. Identify root cause
2. Apply targeted fix
3. Re-run only failed checks
4. Max 3 fix-verify rounds

### 8. Completion

When all checks pass:
1. Update visual regression baselines:
   ```bash
   VERIFY_URL="http://localhost:3000/{name}" npx playwright test visual-regression --update-snapshots
   ```
2. Report final score and screenshot
3. Save any new design patterns to memory

## Lessons Learned (built-in)

These are automatically applied during implementation:

- **Two accent shades**: If accent fails WCAG both as bg and text, split into `accent-bg` (darker) and `accent-text` (lighter)
- **Bento grid math**: Total cell spans must equal grid columns × rows. Fill remaining cells with CTA/stat cards.
- **Content blocks fill space**: Use `flex-1` not `mt-auto` for inner content that should stretch.
- **Force graph physics**: Scale repulsion to canvas dimensions, pre-simulate 150 ticks, concentric ring initial positions.
- **Anti-slop mobile**: 3 equal-width cards trigger even on mobile (stacked = same width). Vary child HTML structure.
- **z-index layering**: Decorative elements `z-0`, content cards `z-10`.
- **opacity trap**: `opacity` on parent dims all children. Use `hsla()` for bg-only.
