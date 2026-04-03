# /design — Create New UI

Generate a premium frontend interface from scratch.

## Usage
```
/design [category] [--preset soft|brutalist|minimal] [--variance N] [--motion N] [--density N]
```

Categories: ir-deck, dashboard, landing-page, presentation, portfolio, custom

## Workflow

### 1. Context Loading
- Read `skills/taste-core.md`
- Read `skills/anti-slop.md`
- Read `skills/motion-engine.md`
- If preset specified: read `skills/style-presets/{preset}.md`
- If category has an example: read `examples/{category}/example.md`
- Check memory for: user preferences, past feedback, project design tokens

### 2. Configuration
Set dial values (use defaults or user overrides):
- DESIGN_VARIANCE: $arguments.variance or 7
- MOTION_INTENSITY: $arguments.motion or 5
- VISUAL_DENSITY: $arguments.density or 4

### 3. Component Search (uitripled + 21st.dev)
Before building from scratch, search existing registries:

**Step A — uitripled (local registry, first priority):**
- Read `skills/uitripled.md` for integration guide
- Read `skills/uitripled-registry.json` and search for components matching planned sections
- For each match: fetch via `curl -s "https://ui.tripled.work/r/{name}.json"`
- Customize fetched components: replace colors/fonts/spacing with preset tokens, strip anti-slop violations, rename to project convention

**Step B — 21st.dev (AI generation, fills gaps):**
- Read `skills/21st-dev.md` for integration guide
- For sections with no uitripled match:
  1. Use `21st_magic_component_inspiration` to find design references
  2. Use `21st_magic_component_builder` to generate tailored components
  3. Customize output: apply preset tokens, strip anti-slop, rename

- If no good match from either source, build the section from scratch

### 4. Design Intent
Before writing code, briefly state:
- What layout strategy you're using and why
- What typography pairing you chose and why
- What color approach and why
- What motion patterns and why
- Which uitripled components were used as base (if any)

### 5. Image Sourcing
Before writing code, source all needed images:
- Read `skills/unsplash.md` for sourcing guide
- Identify every image slot: hero bg, card thumbnails, avatars, product shots
- Search Unsplash via `WebSearch` ("site:unsplash.com {keywords}") for each slot
- Build URLs with correct size params (`w`, `h`, `fit=crop`, `auto=format`, `q=80`)
- For Next.js: ensure `images.remotePatterns` includes `images.unsplash.com`
- No gray boxes. No placeholder URLs. Every `<img>` / `<Image>` must have a real Unsplash source.

### 6. Implementation
Generate the complete, runnable code. No placeholders. No "// add more here".

Requirements:
- Full responsive layout (mobile-first)
- All states: empty, loading, error, populated
- Real-looking data (no "John Doe", no "Lorem ipsum")
- Proper semantic HTML
- Accessibility (ARIA labels, contrast ratios)

### 7. Verification
After code generation:
1. quick-lint runs automatically (PostToolUse hook)
2. If quick-lint flags issues → fix immediately
3. Run `/verify` on the output
4. If verify fails → fix failed checks → re-verify (max 3 rounds)
5. Report verification results

### 8. Memory Update
- If this design introduces new patterns → note for future reference
- If user gives feedback → save to feedback memory
