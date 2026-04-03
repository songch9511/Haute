# Haute

A high-agency design agent for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) that generates premium, production-grade frontends — not generic AI-looking interfaces.

Haute enforces design quality through research-backed rules, automated Playwright verification, and a persistent memory system that learns from your feedback.

## Why

AI coding agents produce "AI-smelling" UIs: Inter font, purple gradients, 3-column card grids, excessive border-radius. Haute fixes this with:

- **Anti-slop rules** — a banned-pattern database that blocks generic AI defaults
- **Automated verification** — Playwright checks for contrast, spacing, typography, responsiveness, and anti-slop compliance
- **Memory** — your design feedback accumulates across sessions, so corrections stick
- **On-demand skill loading** — only loads the rules relevant to each task, saving context budget

## Requirements

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) CLI
- Node.js 18+
- (Optional) [21st.dev](https://21st.dev) MCP server for AI component generation

## Setup

```bash
git clone https://github.com/songch9511/Haute.git
cd Haute

# Install verifier dependencies
cd verifier && npm install && npx playwright install && cd ..
```

Open the project in Claude Code:

```bash
claude
```

Haute's `CLAUDE.md` and hooks are picked up automatically. No additional configuration needed.

## Commands

| Command | What it does |
|---|---|
| `/design` | Create a new UI from scratch |
| `/copy` | Reproduce a reference design |
| `/redesign` | Improve an existing UI |
| `/verify` | Run the full Playwright verification suite |
| `/audit` | Get an anti-slop quality report |

### Examples

```
/design a landing page for a developer tool, brutalist style
/copy https://linear.app
/redesign src/components/hero.tsx
/verify
/audit src/app/page.tsx
```

## How it works

```
Generate → quick-lint (auto) → Fix if needed → Full verify → Done
```

1. **Route** — `CLAUDE.md` determines the task type and loads the relevant skills
2. **Generate** — Code is produced following taste-core rules and the selected style preset
3. **Quick-lint** — A PostToolUse hook runs automatically on every `.tsx`/`.html`/`.css` edit
4. **Full verify** — 7 Playwright checks validate the output before completion

### Verification checks

| Check | What it measures |
|---|---|
| `anti-slop-scan` | Banned AI patterns in the DOM |
| `color-audit` | WCAG AA contrast ratios |
| `spacing-audit` | Padding/margin/gap consistency |
| `typography-check` | Font families, size hierarchy |
| `responsive-check` | Mobile single-column layout |
| `animation-check` | Only `transform`/`opacity` used |
| `visual-regression` | Screenshot diff against baseline |

## 3-Dial System

Every design task is tuned by three parameters:

| Dial | Range | Default | Controls |
|---|---|---|---|
| `DESIGN_VARIANCE` | 1–10 | 7 | Layout experimentation level |
| `MOTION_INTENSITY` | 1–10 | 5 | Animation complexity |
| `VISUAL_DENSITY` | 1–10 | 4 | Content density |

Override per-task: "design a dashboard, variance 9, motion 3"

## Style Presets

| Preset | Aesthetic |
|---|---|
| `soft` | Luxury / agency |
| `brutalist` | Swiss / industrial |
| `minimal` | Editorial / clean |
| `obsidian` | Dark knowledge-tool |
| `notion` | Productivity / clean SaaS |
| `catalis` | Modern corporate |

## Project Structure

```
Haute/
├── CLAUDE.md                 # Master router + global rules
├── .claude/
│   ├── settings.json         # Hooks (auto-verification triggers)
│   └── commands/             # Slash command definitions
├── skills/                   # Design rules (loaded on demand)
│   ├── taste-core.md         # Core design principles
│   ├── anti-slop.md          # Banned patterns database
│   ├── motion-engine.md      # Animation/interaction rules
│   ├── 21st-dev.md           # 21st.dev MCP integration
│   ├── unsplash.md           # Real image sourcing
│   └── style-presets/        # Visual style definitions
├── research/                 # Evidence backing the rules
├── verifier/                 # Playwright-based quality checks
├── templates/                # Verified starter projects
│   ├── next-app/             # Next.js + Tailwind
│   └── static-html/          # Pure HTML/CSS/JS
└── tests/                    # Red-team tests + comparisons
```

## License

MIT
