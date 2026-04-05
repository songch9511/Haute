# UDesigner Harness v3.1 — PRD

**Status:** Draft
**Owner:** Daniel
**Date:** 2026-04-05
**Previous version:** v3 (shipped 2026-04-05, 6 phases complete)

---

## 1. Background

UDesigner v3 shipped with a generation-first philosophy: 4 new design knowledge skills (layout-patterns, visual-rhythm, reference-learning, content-layout-map), composite verification (mechanical 40% / layout diversity 35% / reference comparison 25%), and Oracle Gate v3.

**First-run validation:**

| Test | Score | Outcome |
|------|-------|---------|
| `/design` Dimension redesign | 83/100 | APPROVE_WARNING |
| `/copy` journey-digital.com (round 1) | 75/100 | APPROVE_WARNING |
| `/copy` journey-digital.com (round 2, after fixes) | 68/100 | REJECT (regression) |
| `/copy` journey-digital.com (round 3, full fixes) | 89/100 | APPROVE_WARNING |
| `/copy` journey-digital.com v2 (lessons applied) | **76/76 mechanical** | First-try pass |

**The ceiling problem:**
Despite 76/76 mechanical checks passing on journey-copy-v2, the result still does not capture the **agency design intent** of the reference. The verifier rules that prevent AI slop also cap the ceiling for genuine craft:

- `no external placeholder images` → blocks real photography → grey gradient tiles
- `font family count ≤ 3` → blocks signature display fonts like Journey Vina Sans
- `h1 ≤ 72px` → blocks the 240px editorial type that defines journey-digital
- `line-height 1.0-1.3 headings` → blocks ultra-tight 0.8 editorial typography
- `3-equal card ban` → forces artificial asymmetry even when symmetry is intentional

Floor goes up, ceiling comes down. The deep-interview's "attention vs knowledge" hypothesis is confirmed: adding skills closes the floor gap but does not close the taste gap.

## 2. Problem Statement

**v3 produces AI-acceptable output but not agency-authentic output.**

When copying a reference (journey-digital.com), the harness correctly extracts tokens (colors, fonts, spacing) and avoids known AI tells. However, the output loses the reference's visual DNA — the signature typography, the real photography, the intentional breaking of conventions that makes the reference distinctive.

The verifier treats all designs as equal and applies universal rules. But agency design is intentionally distinctive — it breaks rules on purpose. A reference-driven copy needs the verifier to **adapt to the reference**, not impose absolute standards.

## 3. Goals

**Primary goal:** Break the agency-taste ceiling so `/copy` output is visually indistinguishable from the reference at 80% pixel-level fidelity.

**Secondary goals:**
- Maintain v3's mechanical quality floor (no AI slop regressions)
- Add vision-based feedback during generation, not just post-hoc verification
- Build a sustainable asset pipeline that replaces placeholder gradients with real imagery
- Enable signature typography (custom display fonts) when reference uses them

**Success metrics:**
- `/copy` journey-digital.com v3.1 scores ≥ 90/100 on **first** Oracle round
- Reference comparison score (25%) improves from ~18-20 to ~22-25 on average
- Visual blind test: LLM vision model cannot distinguish copy from reference in ≥ 50% of cases
- Zero mechanical regressions: mechanical 40% stays at 38+ on all copies

## 4. Non-Goals

- Replacing v3's TPE protocol or phase gates
- Building a vector-search RAG service (still out of scope per v3 spec)
- Supporting non-web design (mobile apps, print)
- Matching pixel-perfect typography when custom fonts cannot be licensed
- Real-time collaborative design features
- Replacing the deep-interview → ralplan → autopilot pipeline for new harness work

## 5. Requirements

### 5.1 Priority 1: Reference Mode (P0 — ship first)

**What:** When `/copy` runs with a reference URL, the verifier switches to "reference mode" and derives allowed thresholds from the reference itself rather than applying absolute rules.

**Why:** Absolute rules (Unsplash banned, h1 ≤ 72px, font count ≤ 3) force the copy to deviate from the reference even when the reference uses those very patterns intentionally. Reference mode makes the verifier a comparison tool, not an absolute gatekeeper.

**How:**

1. Add `verifier/reference-mode.js` that runs **before** the Playwright test suite
2. Input: reference URL (from `/copy` argument)
3. Process:
   - Launch Playwright, navigate to reference URL
   - Extract: all computed font-families, max h1 size, max line-height ratio, external image domains used, grid patterns per section, font weight counts
   - Write to `verifier/reference-thresholds.json`
4. Modified checks read from `reference-thresholds.json`:
   - `anti-slop-scan.spec.ts`: allow external images IF reference uses same domain
   - `typography-check.spec.ts`: cap at `max(3, reference_font_count)`
   - Remove absolute `h1 ≤ 72px` cap; use `reference_h1 * 1.2` as cap
   - Remove absolute line-height bounds; use `reference_heading_lh ± 0.1` as bound
5. Non-reference mode (/design with no reference): keep absolute rules
6. Fallback: if `reference-mode.js` fails to fetch reference, log warning and use absolute rules

**Acceptance criteria:**
- [ ] `verifier/reference-mode.js` exists and produces valid `reference-thresholds.json`
- [ ] `/copy journey-digital.com` passes mechanical checks while allowing h1 at 4.5rem+ if reference has it
- [ ] `/copy` allows real photography URLs when reference uses them
- [ ] `/design` (no reference) still enforces absolute rules
- [ ] Reference mode is documented in `skills/reference-learning.md`

**Estimated effort:** 2-3 hours

---

### 5.2 Priority 2: Vision Feedback Loop (P0 — ship with P1)

**What:** Upgrade the LLM blind test from 0% informational to a generation-time guidance loop. After each section is implemented, a vision model compares the section screenshot against the reference screenshot and returns specific gap descriptions for the implementing agent to address.

**Why:** Mechanical checks only detect what can be measured (grid patterns, font count, contrast ratios). They cannot measure typography character, composition balance, visual hierarchy, or emotional tone. A vision model can.

The key insight: vision feedback must happen **during** generation, not after. Post-hoc verification tells you you failed; generation-time guidance tells you what to build.

**How:**

1. Create `verifier/vision-judge.js`:
   - Input: `--target=<section_url>`, `--reference=<reference_url>`, `--section=<section_name>`
   - Capture both screenshots at 1440px
   - Send to Claude vision API with prompt template:
     ```
     Compare these two screenshots. The left is the current implementation, the right is the reference.
     Identify the top 3 design intent gaps, from highest to lowest impact.
     For each gap, describe:
     - What the reference does (specific detail)
     - What the current implementation is missing
     - A concrete fix directive the implementing agent can execute

     Format as JSON: { gaps: [ { priority, what_reference_does, what_is_missing, fix_directive } ] }
     ```
   - Return the JSON gap analysis
2. Modify `/copy` Execute phase:
   - After each section's code is generated, run `vision-judge.js` on that section
   - Feed gap analysis back to the implementing agent
   - Agent applies the fix directives before moving to the next section
   - Max 2 iterations per section (prevent infinite loops)
3. Modify `/verify` composite scoring:
   - LLM blind test weight moves from 0% → 15%
   - Mechanical drops to 35%, layout diversity to 25%, reference comparison to 25%
4. Log all vision-judge outputs to `.omc/vision-calibration/` for future calibration

**Acceptance criteria:**
- [ ] `verifier/vision-judge.js` exists and calls Claude vision API successfully
- [ ] Returns valid JSON gap analysis in expected format
- [ ] `/copy` Execute phase integrates vision feedback between sections
- [ ] Section iteration loops terminate after 2 rounds max
- [ ] Calibration logs accumulate in `.omc/vision-calibration/`
- [ ] `/verify` scoring weights updated, documented in CLAUDE.md
- [ ] Composite score v3.1 = mechanical 35% + layout 25% + reference 25% + vision 15%

**Estimated effort:** 4-6 hours

---

### 5.3 Priority 3: Asset Library Skill (P1)

**What:** Create `skills/assets.md` with curated, license-compliant assets that `/copy` can use in place of gradient placeholders: real photography sets, SVG patterns, editorial display fonts.

**Why:** Real agency sites use real photography and signature fonts. v3 blocks Unsplash URLs and caps fonts at 3, forcing the output into grey gradient tiles and system-adjacent fonts. Reference mode (P1) allows external images conditionally, but there still needs to be a curated source.

**How:**

1. Create `skills/assets.md` with sections:
   - **Photography collections** (by mood/subject):
     - Editorial portraits (curated Unsplash IDs with stable URLs)
     - Architecture & urban (Pexels IDs)
     - Abstract & texture (source attribution included)
     - Product & workspace
   - **SVG pattern library:**
     - Grain/noise overlays as data URIs
     - Editorial textures (dot grids, diagonal hatches)
     - Decorative shapes (blobs, circles, lines)
   - **Editorial display fonts (Fontshare/Google Fonts):**
     - Vina Sans — massive display, journey-digital vibe
     - Bricolage Grotesque — editorial with character
     - Chillax — modern geometric
     - Migra — serif with personality
     - Gambarino — bold display
   - Each entry includes: license, source URL, typical usage, example pairing
2. Update `skills/unsplash.md` to cross-reference assets.md for curated IDs
3. Add asset loading rules: `/copy` auto-loads assets.md when reference uses photography; `/design` loads when preset specifies editorial tier
4. Size cap: assets.md ≤ 250 lines (within context budget)

**Acceptance criteria:**
- [ ] `skills/assets.md` exists with all 4 sections
- [ ] At least 30 curated image IDs with stable URLs
- [ ] At least 5 SVG pattern data URIs
- [ ] At least 5 editorial display fonts with license info
- [ ] File stays within 250-line hard cap
- [ ] `/copy` command auto-loads assets.md when reference uses external images
- [ ] CLAUDE.md documents the new skill

**Estimated effort:** 6-8 hours (most time spent curating and testing asset URLs)

---

### 5.4 Priority 4: Vision-Guided Think Phase (P2)

**What:** In `/copy` Think phase, use the vision model to extract **design directives** from the reference screenshot, not just DOM tokens. The Think output becomes actionable per-section instructions rather than a flat token table.

**Why:** Tokens tell you "what" — `#d7ff6b lime accent, 56px h1, 2-col grid`. They do not tell you "why" — `lime accent used only on the conversion line to create a visual hotspot; 56px h1 is intentionally oversized to make the page feel editorial rather than corporate; 2-col grid breaks to 12-col when the content shifts from narrative to data`. A vision model can read intent; DOM extraction cannot.

**How:**

1. Add vision model call to `/copy` Think phase (after Playwright DOM analysis):
   - Input: reference screenshot (desktop + mobile), DOM tokens
   - Prompt: "You are a senior art director. Analyze this reference page section by section. For each section, describe the design intent in 2-3 sentences: what the designer is trying to achieve, why that layout was chosen, what emotion it should evoke. Output per-section directives that another designer can implement."
   - Output: `reference-directives.json` with per-section intent
2. Merge directives with DOM tokens in Plan phase:
   - Plan spec includes both "tokens" (what) and "directives" (why) columns
3. Execute phase reads directives when implementing each section
4. Requires Priority 2 (Vision Feedback Loop) infrastructure to be in place

**Acceptance criteria:**
- [ ] `/copy` Think phase calls vision model for design directive extraction
- [ ] Directives saved to `.omc/think/reference-directives.json`
- [ ] Plan spec template updated with Directives column
- [ ] Execute phase agents receive directives alongside tokens
- [ ] Documented in `skills/reference-learning.md`

**Estimated effort:** 3-4 hours (requires P2 completion first)

---

### 5.5 Priority 5: Agency Preset Library (P2)

**What:** Analyze 5+ reference agency sites and save each as a style preset in `skills/style-presets/agency-{name}.md`. Each preset captures signature characteristics that can be invoked by name.

**Why:** journey-digital.com has a distinct aesthetic. So does pagebreak.nyc, basic/dept, huge inc, fantasy.co. These are repeatable patterns — if we analyze them once and save them as presets, future `/copy` and `/design` tasks can invoke them directly without re-analyzing.

**How:**

1. Create presets for each of the 5 reference tiers:
   - `agency-journey.md` — massive editorial type + dark+lime + real photography
   - `agency-pagebreak.md` — brutalist grid + serif + high whitespace
   - `agency-basic.md` — minimal precision + restrained color + modular
   - `agency-huge.md` — bold experiments + asymmetric + dynamic
   - `agency-fantasy.md` — ornamental serif + warm palette + editorial
2. Each preset file includes:
   - Color system (primary, accent, dark/light sections)
   - Typography pairing (display + body + mono)
   - Layout pattern preferences (which layout-patterns work well)
   - Motion approach (subtle vs dramatic)
   - Asset style (photography vs illustration vs pattern)
   - Visual rhythm template (which pacing template fits)
3. Add preset matcher: `/copy` can auto-suggest the nearest preset based on reference DOM analysis
4. Each preset stays ≤ 150 lines

**Acceptance criteria:**
- [ ] 5 agency presets exist in `skills/style-presets/`
- [ ] Each preset is self-contained and ≤ 150 lines
- [ ] `/copy` suggests matching preset when reference URL provided
- [ ] `/design --preset agency-journey` produces output with journey-digital characteristics
- [ ] Presets documented in CLAUDE.md routing table

**Estimated effort:** 8-12 hours (most time on analyzing references)

---

## 6. Implementation Plan

### Phase A — Foundation (P0, ships first)
**Duration:** 1 day
1. Priority 1: Reference Mode
2. Priority 2: Vision Feedback Loop
3. Integration testing: re-run `/copy journey-digital.com` and verify ≥ 90 first round

### Phase B — Asset Enablement (P1, ships second)
**Duration:** 1 day
4. Priority 3: Asset Library Skill
5. Update `/copy` and `/design` to load assets.md conditionally
6. Integration testing: verify journey copy uses real photography + editorial font

### Phase C — Intent Capture (P2, ships third)
**Duration:** 2 days
7. Priority 4: Vision-Guided Think Phase (depends on P2)
8. Priority 5: Agency Preset Library
9. Integration testing: verify preset matching and directive extraction

### Ship criteria
- All P0 acceptance criteria met
- Integration test: `/copy journey-digital.com` scores ≥ 90 on first Oracle round
- No mechanical regressions on existing `/design` tests
- CLAUDE.md updated to v3.1

## 7. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Vision API latency slows `/copy` significantly | High | Medium | Cache vision responses; limit to 2 iterations per section |
| Reference mode over-loosens rules and allows actual AI slop | Medium | High | Reference mode only activates when valid reference URL present; absolute floor stays (no #000 bg, no Lorem ipsum) |
| Asset URLs break over time (Unsplash CDN changes) | Medium | Medium | Document license + backup source for each asset; refresh quarterly |
| Custom display fonts don't render on all devices | Low | Low | Always specify fallback stack; test across browsers |
| Vision model bias (Claude rating its own output) | Medium | Medium | Log all vision responses for calibration; add user override |
| Preset library becomes stale (agencies redesign) | Low | Low | Version presets by analysis date; refresh annually |

## 8. Open Questions

1. **Vision API cost:** Each `/copy` run with vision feedback will cost ~$0.10-0.50 in API credits. Acceptable for a local dev tool, but should be documented.
2. **Reference mode default:** Should reference mode be opt-in (`/copy --reference-mode`) or auto-enabled when a reference URL is provided? Proposed: auto-enabled.
3. **Preset format:** Should presets be markdown skill files or JSON config? Proposed: markdown to match existing skill structure.
4. **Asset curation ownership:** Who maintains the asset library as URLs break? Proposed: quarterly refresh task added to v3.2 roadmap.
5. **Font licensing:** Should we include commercial fonts (Vina Sans is Fontshare free tier) or limit to open-source? Proposed: free tier acceptable, document attribution requirements.

## 9. Success Criteria (Ship/No-Ship)

**Must ship (v3.1.0):**
- Reference Mode functional
- Vision Feedback Loop integrated into `/copy` Execute phase
- `/copy journey-digital.com` scores ≥ 90 on first Oracle round
- No regressions on `/design` absolute mode

**Nice to have (v3.1.1):**
- Asset Library with 30+ curated assets
- Agency preset library with 5+ presets
- Vision-Guided Think phase

**Blocking ship (must fix before launch):**
- Mechanical checks regress below 35/40 on any test
- Vision API calls fail consistently
- Reference mode produces false negatives (rejecting valid copies)

## 10. Appendix: Evidence from v3 First Runs

### What worked in v3
- TPE protocol and phase gates — mechanical enforcement kept the agent honest
- Oracle Gate v3 without worktree — faster, still independent
- Composite scoring caught real issues (line-height, contrast, touch targets)
- 4 new skills (layout-patterns, visual-rhythm, reference-learning, content-layout-map) provided useful vocabulary

### What didn't work in v3
- Absolute verifier rules capped quality ceiling for reference-driven copies
- LLM blind test at 0% weight was unused dead weight
- DOM-only token extraction missed design intent
- No asset pipeline → forced gradient placeholders
- Context budget was tight: /design at ~15K cap left no room for vision prompts

### Specific data points
- journey-copy-v1 lost 6/25 on reference comparison due to missing lime accents, wrong section text, placeholder images
- journey-copy-v2 achieved 76/76 mechanical but user feedback: "Agency 디자인(Human intent)가 반영된 디자인은 아직 무리"
- Gradient tile workaround passed checks but lost visual DNA — this is the core problem v3.1 must solve
