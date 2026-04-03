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

### 1a. Context Loading (직접 실행)
- Read `skills/taste-core.md`, `skills/anti-slop.md`, `skills/motion-engine.md`
- If preset specified: read `skills/style-presets/{preset}.md`
- Check memory for: user preferences, past feedback, project design tokens

### 1b-1d. 병렬 탐색 (Agent 도구 동시 호출)

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
