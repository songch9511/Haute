# /copy — Design Copy from Reference

Reproduce a reference website's visual language as a new page.

## Usage
```
/copy <url-or-screenshot> [--name <project-name>] [--sections hero,features,pricing,cta,footer] [--content <topic>]
```

---

## Phase 1: Think — "아직 코드 작성하지 마라"

> **Phase Gate**: `phase.json` → `{"phase": "think"}` 로 전환 후 시작

**Goal**: Fully understand the reference before writing a single line.

### 1a. Memory Pull (Pillar A — CoMeT-inspired 3-tier)

**필수 단계. Screenshot 캡처보다 먼저 실행.**

1. **Tier 1 — Taste Summary 로드**: `.udesigner/memory/sum.md` 전체 읽기.
2. **Tier 2 — Cluster 검색**: 레퍼런스 URL·타이틀·예상 aesthetic에서 키워드 추출 후:
   ```bash
   node .udesigner/memory/bin/search.js "<keywords>" --k 3
   ```
   유사 cluster 히트 시:
   ```bash
   node .udesigner/memory/bin/read-cluster.js <cluster-name>
   ```
3. **Tier 3 — 유사 shipped 부분 조회 (선택)**: 과거에 같은 카테고리 카피가 있었다면 토큰·프롬프트 anchor로:
   ```bash
   node .udesigner/memory/bin/read-shipped.js <slug> --parts tokens,prompt
   ```
4. **Budget**: `search` 1회 + `read-cluster` ≤ 2 + `read-shipped` ≤ 3, 항상 `--parts` 최소화.
5. **No-match 대응**: hits 0이면 memory 침묵, 다음 단계 진행.

**주의**: Memory Pull은 **레퍼런스 분석의 대체가 아니다**. Playwright DOM 분석이 본 진실 소스이며, Memory는 _과거 학습을 기억하기 위한 보조 anchor_일 뿐이다.

**정책 레퍼런스**: `skills/memory.md`

### 1b. Screenshot Capture (FIRST — 직접 실행)
- Capture desktop (1440×900) + mobile (375×812) screenshots via Playwright
- Save as `ref-desktop.png`, `ref-mobile.png`
- Crop key areas: nav, hero text, cards, each section
- **스크린샷 완료 후 아래 병렬 탐색 시작**

### 1b-1c. 병렬 탐색 (Agent 도구 동시 호출)

**스크린샷 캡처 후, 단일 메시지에서 3-4개 Agent를 동시 호출한다.**

```
┌─────────────────────────────────────────────────────┐
│  하나의 메시지에서 아래 Agent를 동시 호출:            │
│                                                      │
│  Agent 1: DOM Analysis — Nav & Hero                  │
│  → skills/playwright-analysis.md 워크플로우 실행     │
│  → Nav: parent chain + children + scroll state       │
│  → Hero: parent chain + children + decorative 요소    │
│  → 출력: 디자인 토큰 테이블                          │
│                                                      │
│  Agent 2: DOM Analysis — Body Sections               │
│  → About, Benefits, Features, Pricing 등 분석        │
│  → 각 섹션: parent chain + children + pseudo-elements │
│  → 출력: 섹션별 디자인 토큰 테이블                    │
│                                                      │
│  Agent 3: Component & Image Search                   │
│  → uitripled-registry.json 매칭 컴포넌트 검색        │
│  → Unsplash 이미지 소싱 (hero bg, cards, avatars)    │
│  → 21st_magic_component_inspiration 검색             │
│                                                      │
│  Agent 4: Memory & Past Learnings                    │
│  → feedback_*, project_* 스캔                        │
│  → 유사 카피 태스크의 과거 실패/성공 요약             │
└─────────────────────────────────────────────────────┘
```

### Agent 프롬프트 작성 규칙
- 각 Agent에게 **레퍼런스 URL + 분석 대상 섹션 + 출력 형식** 명시
- "조사만 하고 코드 작성하지 마라" 반드시 포함
- DOM 분석 Agent에게는 `skills/playwright-analysis.md` 경로 전달

### Think 결과물
- Agent 결과를 종합하여 **Design Token Summary** 테이블 작성
- Typography, Colors, Layout, Decorative, Motion 카테고리별 정리
- → 이것이 Plan 단계의 입력이 됨

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
- `skills/taste-core.md`, `skills/anti-slop.md`, `skills/motion.md`
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
