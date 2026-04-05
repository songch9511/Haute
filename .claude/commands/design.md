# /design — Create New UI

Generate a premium frontend interface from scratch.

## Usage
```
/design [category] [--preset soft|brutalist|minimal] [--variance N] [--motion N] [--density N]
```

Categories: ir-deck, dashboard, landing-page, presentation, portfolio, custom

---

## Phase 1: Think — "아직 코드 작성하지 마라"

> **Phase Gate**: `phase.json` → `{"phase": "think"}` 로 전환 후 시작

### 1a. Memory Pull (Pillar A — CoMeT-inspired 3-tier)

**필수 단계. Context/Skill 로드보다 먼저 실행.**

1. **Tier 1 — Taste Summary 로드**: `.udesigner/memory/sum.md` 전체 읽어 컨텍스트에 유지. 이건 유저 취향의 top-level 지문이다.
2. **Tier 2 — Cluster 검색**: prompt에서 핵심 키워드 추출 후:
   ```bash
   node .udesigner/memory/bin/search.js "<keywords>" --k 3
   ```
   결과가 있으면 top cluster를 읽는다:
   ```bash
   node .udesigner/memory/bin/read-cluster.js <cluster-name>
   ```
3. **Tier 3 — Shipped anchor (선택)**: top-1 shipped가 현재 의도에 밀접하면 토큰/프롬프트만 부분 조회:
   ```bash
   node .udesigner/memory/bin/read-shipped.js <slug> --parts tokens,prompt
   ```
4. **Budget**: 이 단계에서 `search` 1회 + `read-cluster` 최대 2회 + `read-shipped` 최대 3회. `--parts all` 금지.
5. **No-match 대응**: hits가 0이면 memory는 침묵으로 두고 다음 단계 진행. 억지 매칭 금지.

**정책 레퍼런스**: `skills/memory.md` (tool 호출 discipline · invariants)

### 1b. Context Loading (직접 실행)
- Read `skills/taste-core.md`, `skills/anti-slop.md`, `skills/motion.md`
- Read `skills/layout-patterns.md` (summary section only), `skills/visual-rhythm.md`, `skills/content-layout-map.md`
- If preset specified: read `skills/style-presets/{preset}.md`
- Legacy memory 보조 스캔: user preferences, past feedback, project design tokens (Memory Pull의 cluster/shipped가 primary source — 여기선 보완)

### 1c-1e. 병렬 탐색 (Agent 도구 동시 호출)

**반드시 단일 메시지에서 3-4개 Agent를 동시 호출한다.**
순차 실행 금지. 독립적인 탐색은 모두 병렬.

```
┌─────────────────────────────────────────────────────┐
│  하나의 메시지에서 아래 Agent를 동시 호출:            │
│                                                      │
│  Agent 1: Reference Research                         │
│  → 카테고리 유사 사이트 검색 + 스크린샷 캡처          │
│  → Playwright DOM 분석 (skills/playwright-analysis.md)│
│                                                      │
│  Agent 2: Component Search                           │
│  → uitripled-registry.json에서 매칭 컴포넌트 검색     │
│  → 21st_magic_component_inspiration으로 영감 수집     │
│                                                      │
│  Agent 3: Image Sourcing                             │
│  → 모든 이미지 슬롯 식별 (hero, card, avatar)        │
│  → Unsplash 검색 + URL 빌드                          │
│                                                      │
│  Agent 4 (선택): Memory & Feedback Scan              │
│  → feedback_*, project_* 파일 전체 스캔              │
│  → 카테고리 관련 과거 학습 요약                       │
└─────────────────────────────────────────────────────┘
```

### Agent 프롬프트 작성 규칙
- 각 Agent에게 **구체적 목표 + 필요 파일경로 + 출력 형식** 명시
- "조사만 하고 코드 작성하지 마라" 반드시 포함
- 200단어 이내로 결과 요약 요청

### Think 결과물
- 4개 Agent 결과를 종합하여 **분석 요약** 작성
- 이것이 Plan 단계의 입력이 됨

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
| # | Section | Layout Pattern | Acceptance Criteria |
|---|---------|---------------|---------------------|
| 1 | Nav | [pattern name] | [layout, position, responsive behavior] |
| 2 | Hero | [pattern name] | [height, bg treatment, text hierarchy, CTA placement] |
| 3 | Features | [pattern name] | [grid layout, card structure, content] |
| ... | ... | ... | ... |

**Layout Diversity Rule**: No two consecutive sections may use the same grid pattern.

### Anti-Slop Pre-Check
- [ ] No 3-equal-card rows
- [ ] No Inter-only typography
- [ ] No centered hero + subtitle + CTA (unless VARIANCE ≤ 4)
- [ ] No round numbers in data
- [ ] No consecutive sections with identical layout patterns
```

**Quality Gate**: Present to user. No coding until approved.

---

## Phase 3: Execute — Spec을 따라 구현

### Per-Section Implementation
For each section:
1. Generate code following spec
2. code-oracle (Pillar B Code Lane) runs automatically via PostToolUse hook
3. **Verify layout differs from previous section** (different grid pattern, column count, or visual structure)
4. Screenshot → visual check → fix if needed → next section

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

## Skills Loaded
taste-core, anti-slop, motion, layout-patterns (summary), visual-rhythm, content-layout-map, 21st-dev, unsplash, [preset]
