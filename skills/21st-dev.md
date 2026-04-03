---
name: 21st-dev
description: Integration guide for 21st.dev MCP tools — AI-powered component generation, design inspiration search, and UI refinement. Complements uitripled registry with on-demand component creation.
---

# 21st.dev — MCP Tool Integration

## Overview

21st.dev provides three MCP tools for premium UI component work:

| Tool | Purpose | When to Use |
|---|---|---|
| `21st_magic_component_builder` | Generate new components from description | Building sections not found in uitripled |
| `21st_magic_component_inspiration` | Search 21st.dev for design references | Before building, to find visual patterns |
| `21st_magic_component_refiner` | Improve existing components | During /redesign, after diagnosis |
| `logo_search` | Fetch company logos (TSX/SVG) | When UI needs brand logos |

## Priority Order: uitripled vs 21st.dev

1. **First**: Search `uitripled-registry.json` for matching components (local, fast)
2. **If no good match**: Use `21st_magic_component_inspiration` to find design references
3. **If inspiration found**: Use `21st_magic_component_builder` to generate a tailored component
4. **If building from scratch**: Use `21st_magic_component_builder` with detailed description
5. **After implementation**: Use `21st_magic_component_refiner` if quality needs improvement

uitripled is the first choice because components are pre-vetted. 21st.dev fills the gaps.

## Tool Usage

### Component Builder

Use when creating a new component that doesn't exist in uitripled:

```
Tool: mcp__magic__21st_magic_component_builder
Params:
  message: <full user request context>
  searchQuery: <2-4 word search, e.g. "pricing cards toggle">
  absolutePathToCurrentFile: <target file path>
  absolutePathToProjectDirectory: <project root>
  standaloneRequestQuery: <precise description of what to build>
```

**Important**: This tool returns a code snippet only. You must:
1. Apply active style preset tokens (colors, fonts, spacing)
2. Strip anti-slop violations
3. Integrate into the target file
4. Run quick-lint

### Component Inspiration

Use to discover design patterns before building:

```
Tool: mcp__magic__21st_magic_component_inspiration
Params:
  message: <what you're looking for>
  searchQuery: <2-4 word search, e.g. "hero gradient animation">
```

Returns JSON data of matching components with previews. Use this to:
- Inform design decisions before coding
- Find interaction patterns (drag, magnetic, 3D)
- Discover layout approaches for uncommon sections

### Component Refiner

Use to improve an existing component's UI quality:

```
Tool: mcp__magic__21st_magic_component_refiner
Params:
  userMessage: <what needs improvement>
  absolutePathToRefiningFile: <path to the component file>
  context: <specific UI elements and aspects to improve>
```

**Important**: Returns redesigned code + instructions. You must:
1. Verify changes align with active style preset
2. Strip anti-slop violations from refined output
3. Re-run quick-lint after applying

### Logo Search

Use when UI needs company/brand logos:

```
Tool: mcp__magic__logo_search
Params:
  queries: ["github", "slack", "discord"]
  format: "TSX"  (or "JSX", "SVG")
```

## Customization Rules (REQUIRED)

Same as uitripled — all 21st.dev output MUST be customized:

1. **Replace colors** with active style preset tokens
2. **Replace fonts** to match typography pairing
3. **Strip banned patterns** per `anti-slop.md`
4. **Adjust spacing** to match preset section padding
5. **Replace placeholder content** with realistic data
6. **Rename components** to match project naming convention
7. **Remove unused dependencies**

## Workflow Integration

### In `/design` (Step 3 — Component Search):
After searching uitripled, if no good match:
1. Use `21st_magic_component_inspiration` to find references
2. Use `21st_magic_component_builder` to generate the component
3. Customize per rules above

### In `/copy` (Step 6 — Implementation):
After searching uitripled for each section:
1. If uitripled has no match, use `21st_magic_component_builder` with the style preset context
2. Include reference design details in `standaloneRequestQuery`

### In `/redesign` (Step 4 — Fix):
After diagnosing issues:
1. For components needing significant visual improvement, use `21st_magic_component_refiner`
2. Pass diagnosis results as `context`
3. Apply refined output, then strip anti-slop violations
