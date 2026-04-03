# /redesign — Improve Existing UI

Audit and upgrade an existing interface to premium design quality.

## Usage
```
/redesign [file-or-directory]
```

---

## Phase 1: Think — "아직 코드 작성하지 마라"

> **Phase Gate**: `phase.json` → `{"phase": "think"}` 로 전환 후 시작

### 1a. Context Loading (직접 실행)
- Read `skills/taste-core.md`, `skills/anti-slop.md`
- Read target file(s) — framework, styling, component library 파악

### 1b-1d. 병렬 탐색 (Agent 도구 동시 호출)

```
┌─────────────────────────────────────────────────────┐
│  Agent 1: 6-Category Diagnosis                       │
│  → 대상 파일 읽고 Typography/Color/Spacing/          │
│    Interaction/Layout/Content 진단                    │
│  → severity (critical/warning/info) 테이블 출력      │
│                                                      │
│  Agent 2: Memory & Past Learnings                    │
│  → feedback_*, project_* 스캔                        │
│  → 유사 리디자인의 과거 성공/실패 요약                │
│                                                      │
│  Agent 3 (레퍼런스 제공 시): Reference Analysis      │
│  → Playwright DOM 분석 + 스크린샷                    │
│  → current vs reference diff 테이블                  │
└─────────────────────────────────────────────────────┘
```

### Think 결과물
- Agent 결과를 종합하여 **진단 테이블** 작성
- severity별 정렬: critical → warning → info

---

## Phase 2: Plan — Spec with Fix Order

Present fix plan with **measurable acceptance criteria**:

```
## Fix Plan

### Priority Order
1. Typography swaps (highest visual impact, lowest risk)
2. Color cleanup
3. Spacing normalization
4. Hover/active/focus states
5. Layout restructuring
6. Content replacement
7. Animation/polish

### Acceptance Criteria
- [ ] Heading font: X → Y
- [ ] Body contrast ratio: 3.2:1 → 4.5:1+
- [ ] Card padding: inconsistent → 24px uniform
- [ ] ...
```

**21st.dev Refinement** (for major overhauls):
- Read `skills/21st-dev.md`
- Use `21st_magic_component_refiner` with diagnosis results

**Quality Gate**: Wait for user approval.

---

## Phase 3: Execute — 우선순위별 수정

For each fix in priority order:
1. Apply the fix
2. quick-lint runs automatically
3. Screenshot → verify improvement → next fix

**Rules**:
- Hero/first-screen: `animate` directly, never `useInView`
- Don't introduce new anti-slop violations while fixing others
- If a fix causes unexpected side effects → stop, re-plan

---

## Phase 4: Verify

Run `/verify` on modified file(s). Fix failures → re-verify (max 3 rounds).

Show before/after summary:
- What changed and why
- Quality score improvement
- Any remaining warnings

---

## Phase 5: Wisdom

Extract learnings. Save to memory.
