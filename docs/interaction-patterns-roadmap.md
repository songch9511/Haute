# Interaction Patterns Roadmap

> UDesigner를 랜딩 페이지 에이전트에서 **인터랙션 디자인 에이전트**로 확장하기 위한 구현 계획서.
> 작성일: 2026-04-06

---

## 현재 상태

| 항목 | 상태 |
|------|------|
| `motion.md` (225줄) | Framer Motion 기초만 커버 — hover, stagger, 기본 parallax |
| 인터랙션 검증 | 전무. Visual/Code/Mechanical 3-lane에 인터랙션 체크 없음 |
| 커버 안 되는 영역 | scroll choreography, gesture, drag, physics, keyboard, 3D, page transition |

**핵심 문제**: 현재 UDesigner는 "static composition agent" — 섹션 배치와 기본 reveal 수준. 진짜 에이전시 사이트의 차별점인 인터랙션 레이어가 부재.

---

## 설계 원칙

1. **motion.md 위에 쌓는다** — 기존 motion.md는 "base animation primitives"로 유지. 새 스킬은 그 위의 interaction layer
2. **검증 없으면 출시 없다** — 각 Phase의 스킬은 반드시 대응하는 verifier 체크와 함께 배포
3. **점진적 복잡도** — scroll/cursor(즉각 체감) → drag/keyboard(조작감) → narrative/3D(고급)
4. **anti-slop 동시 확장** — 인터랙션에도 "AI스러운" 패턴이 있음. 스킬과 금지 목록을 동시에 관리

---

## Phase 0 — Foundation (즉시 착수)

### 목표
가장 임팩트 큰 두 인터랙션 축(scroll, cursor)을 스킬로 정의하고, anti-slop을 확장한다.

### 산출물

#### 1. `skills/scroll-interaction.md` (~250줄)

| 섹션 | 내용 |
|------|------|
| Overview | Scroll을 "세 번째 축"으로 활용하는 이론 — 시간(animation) + 공간(layout) + 깊이(scroll) |
| Library Stack | GSAP ScrollTrigger + Lenis smooth scroll + CSS scroll-timeline (progressive enhancement) |
| Patterns | **Pin & Scrub** — 섹션 고정 후 스크롤로 애니메이션 제어 |
| | **Horizontal Scroll** — 가로 스크롤 섹션 (gallery, timeline) |
| | **Parallax Depth Layers** — 3+ 레이어 속도차로 깊이감 |
| | **Scroll Progress** — 프로그레스 바, 숫자 카운터, 배경색 전환 |
| | **Reveal Sequence** — 스크롤 위치 기반 순차 등장 (stagger와 다름 — 스크롤 위치에 연동) |
| | **Zoom Through** — 스크롤하면 화면이 확대되며 다음 섹션으로 진입 |
| Rules | cleanup on unmount (GSAP kill), passive listener, will-change 관리, Lenis destroy |
| Anti-patterns | scroll-hijack without escape key/gesture, 60fps 미달 transform, overscroll 무시 |
| Performance | `requestAnimationFrame` budget, layer promotion 전략, `content-visibility: auto` |
| Verification | code-oracle 규칙 ID 목록, Playwright 체크 시나리오 |

#### 2. `skills/cursor-interaction.md` (~200줄)

| 섹션 | 내용 |
|------|------|
| Overview | 커서를 "사용자의 연장"으로 활용 — 호버가 아니라 대화 |
| Patterns | **Magnetic Button** — 반경 내 진입 시 버튼이 커서 쪽으로 이동 (spring physics) |
| | **Tilt Card** — perspective + rotateX/Y로 3D 기울기 (마우스 위치 연동) |
| | **Custom Cursor** — 기본 커서 대체, 컨텍스트별 변형 (link → arrow, image → zoom) |
| | **Hover Reveal** — 마우스 위치에 따라 콘텐츠 노출 (이미지, 텍스트, 색상) |
| | **Text Scramble** — 호버 시 글자가 랜덤 문자로 변하다가 원래 텍스트로 수렴 |
| | **Pointer Follow** — 커서를 따라다니는 요소 (spotlight, gradient, particle) |
| | **Cursor Trail** — 커서 궤적을 시각화 (fade trail, ribbon) |
| Rules | touch device fallback 필수 (`@media (hover: hover)`), GPU-composited props only |
| Anti-patterns | 커서 숨기고 대체만 제공 (접근성 위반), hover-only 콘텐츠 (touch 불가), 과도한 magnetic 반경 |
| Accessibility | `prefers-reduced-motion` 시 static fallback, keyboard focus equivalent |
| Verification | touch-fallback-required 규칙, hover-state Playwright 체크 |

#### 3. `skills/anti-slop.md` 확장 (~30줄 추가)

```
## Section 8: Interaction Anti-Slop

### 8.1 Scroll
- scroll-hijack without escape (사용자가 스크롤 제어권을 잃음)
- janky scroll animation (requestAnimationFrame 밖에서 DOM 조작)
- parallax on every section (1-2개만, 나머지는 normal flow)
- scroll-triggered sound/video autoplay without user consent

### 8.2 Cursor
- custom cursor without native cursor fallback
- hover-only interaction without touch alternative
- magnetic radius > 100px (짜증 유발)
- text scramble on non-interactive elements (읽기 방해)
- cursor trail length > 20 points (성능 저하)

### 8.3 General
- animation on page load > 3초 (사용자 이탈)
- interaction blocking scroll (스크롤 불가 구간)
- GPU layer explosion (> 30 promoted layers)
```

### 완료 기준
- [ ] `scroll-interaction.md` 작성 + CLAUDE.md skill 목록에 등록
- [ ] `cursor-interaction.md` 작성 + CLAUDE.md skill 목록에 등록
- [ ] `anti-slop.md` Section 8 추가
- [ ] 기존 `motion.md`에서 역할 재정의 주석 추가 ("base primitives — see scroll-interaction.md, cursor-interaction.md for interaction layer")

---

## Phase 1 — Verification (Phase 0 직후)

### 목표
Phase 0 스킬에 대응하는 검증 체계를 구축한다. **검증 없는 스킬은 신뢰할 수 없다.**

### 산출물

#### 1. `verifier/checks/scroll-interaction.spec.ts`

| 체크 | 방법 |
|------|------|
| ScrollTrigger 작동 | Playwright scroll simulate → pin 요소 위치 확인 |
| Lenis smooth scroll | scroll-behavior 확인 + 스크롤 속도 측정 |
| Parallax depth | 스크롤 전후 레이어 위치 차이 비교 |
| Cleanup | 페이지 이탈 후 메모리 누수 체크 (GSAP instance count) |
| Horizontal scroll | 가로 스크롤 섹션 내 콘텐츠 도달 가능성 |

#### 2. `verifier/checks/cursor-interaction.spec.ts`

| 체크 | 방법 |
|------|------|
| Hover state 전환 | `page.hover()` → 스타일 변경 확인 |
| Magnetic 반경 | 커서 이동 → 버튼 transform 값 측정 |
| Touch fallback | viewport 768px + touch 시뮬레이션 → 동일 기능 접근 가능 |
| Custom cursor | `.cursor` 요소 존재 + pointer-events: none 확인 |

#### 3. `code-oracle.js` 규칙 추가

| 규칙 ID | 카테고리 | 검출 |
|---------|----------|------|
| `gsap-cleanup-on-unmount` | L2-AST | useEffect return에서 ScrollTrigger.kill() 또는 ctx.revert() 호출 |
| `no-scroll-hijack-without-escape` | L2-AST | scroll-lock 시 escape handler 존재 확인 |
| `touch-fallback-required` | L2-AST | `onMouseMove`/`onMouseEnter` 있으면 `onTouchStart`/`@media (hover:hover)` 존재 |
| `lenis-destroy-on-unmount` | L2-AST | Lenis 인스턴스 생성 시 cleanup 확인 |
| `no-layout-thrash-in-raf` | L2-AST | rAF 콜백 내 offsetHeight/getBoundingClientRect 호출 금지 |

#### 4. `visual-oracle.md` rubric 확장

기존 6개 차원에 선택적 7번째 추가:
- `interaction_choreography` (1-10) — 인터랙션이 있는 페이지에서만 활성화
- composite 계산 시 가중치: 기존 6개 균등 → 인터랙션 포함 시 7개 균등

### 완료 기준
- [ ] `scroll-interaction.spec.ts` 작성 + 로컬 테스트 통과
- [ ] `cursor-interaction.spec.ts` 작성 + 로컬 테스트 통과
- [ ] `code-oracle.js`에 5개 규칙 추가 + 단위 테스트
- [ ] `visual-oracle.md` rubric 확장 (선택적 차원)
- [ ] `composite-score.js`에서 7번째 차원 처리 로직 추가

---

## Phase 2 — Advanced Patterns (Phase 1 검증 후)

### 목표
조작감과 접근성을 커버하는 세 번째 인터랙션 레이어.

### 산출물

#### 1. `skills/drag-interaction.md` (~200줄)

| 패턴 | 설명 |
|------|------|
| Drag Reorder | 리스트/그리드 아이템 드래그 정렬 (Kanban, sortable list) |
| Spring-back | 드래그 후 놓으면 원래 위치로 탄성 복귀 |
| Elastic Boundaries | 드래그 경계에서 탄성 저항 |
| Momentum Throw | 드래그 속도에 따른 관성 이동 |
| Drag to Reveal | 드래그로 숨겨진 콘텐츠 노출 (swipe-to-delete, pull-to-refresh) |
| Constraints | Framer Motion drag constraints, axis lock, snap points |

#### 2. `skills/keyboard-interaction.md` (~180줄)

| 패턴 | 설명 |
|------|------|
| Focus Management | roving tabindex, focus trap (modal), focus restoration |
| Keyboard Navigation | Arrow keys (menu, grid), Home/End, Page Up/Down |
| Skip Links | 키보드 사용자를 위한 콘텐츠 건너뛰기 |
| ARIA Live Regions | 동적 콘텐츠 변경 시 스크린리더 알림 |
| Shortcut System | 키보드 단축키 (? for help modal, / for search) |
| Focus Visible | `:focus-visible` 링 스타일링, OS 설정 존중 |

#### 3. `skills/micro-sequence.md` (~180줄)

| 패턴 | 설명 |
|------|------|
| Button State Chain | idle → hover → press → loading → success/error |
| Toggle Morphing | 아이콘/텍스트가 상태 전환 시 모핑 |
| Notification Entrance | toast/snackbar 등장/퇴장 choreography |
| Form Validation | 실시간 입력 피드백 애니메이션 |
| Skeleton → Content | 로딩 스켈레톤에서 실제 콘텐츠로의 전환 |
| AnimatePresence Orchestration | 여러 요소의 exit/enter 시퀀싱 |

### 완료 기준
- [ ] 3개 스킬 작성
- [ ] 각 스킬에 대응하는 `verifier/checks/*.spec.ts` 추가
- [ ] `code-oracle.js` 규칙 추가 (focus-trap-escape, aria-live-on-dynamic, drag-cleanup)
- [ ] `anti-slop.md`에 drag/keyboard/micro-sequence 안티패턴 추가

---

## Phase 3 — Narrative & 3D (Phase 2 안정화 후)

### 목표
에이전시 최상위 티어의 인터랙션 — 스토리텔링, 3D, 페이지 전환.

### 산출물

#### 1. `skills/scroll-storytelling.md` (~250줄)

| 패턴 | 설명 |
|------|------|
| Scene Transition | 스크롤로 장면 전환 (fade through, slide, zoom) |
| Multi-Act Structure | 스크롤 전체를 3-5막 구조로 설계 |
| Character Animation | 스크롤에 연동된 캐릭터/오브젝트 이동 (새가 날아가는 등) |
| Text Reveal | 스크롤 위치에 따른 텍스트 순차 등장/강조 |
| Progress Indicator | 스토리 진행도 시각화 (chapter dots, scroll bar) |
| Background Evolution | 스크롤에 따른 배경 변화 (시간대, 색상, 분위기) |

#### 2. `skills/3d-interaction.md` (~200줄)

| 패턴 | 설명 |
|------|------|
| React Three Fiber 기초 | Canvas, mesh, material, lighting, camera 기본 |
| 3D Tilt Card | CSS perspective가 아닌 실제 3D 오브젝트 기울기 |
| Embedded Scene | 웹페이지 안의 3D 장면 (제품 뷰어, 지구본) |
| Particle System | 마우스/스크롤 반응형 파티클 |
| Depth of Field | 스크롤 위치에 따른 포커스/블러 |
| Performance | instancing, LOD, offscreen canvas, 모바일 fallback |

#### 3. `skills/page-transition.md` (~150줄)

| 패턴 | 설명 |
|------|------|
| View Transitions API | 브라우저 네이티브 페이지 전환 |
| Shared Element | 페이지 간 공유 요소 모핑 (리스트 → 디테일) |
| Route Animation | Next.js App Router + Framer Motion 라우트 전환 |
| Exit/Enter Choreography | 퇴장 순서 → 전환 → 등장 순서 시퀀싱 |

### 완료 기준
- [ ] 3개 스킬 작성
- [ ] 3D는 R3F 의존성이므로 `package.json` 템플릿에 optional dependency 가이드
- [ ] verifier: 3D canvas render 확인 (Playwright `canvas` element 존재 + WebGL context)
- [ ] scroll-storytelling: 전체 스크롤 시뮬레이션 + 장면 전환 포인트 확인

---

## Phase 4 — Interaction Memory & Presets

### 목표
Pillar A(Design Memory)에 인터랙션 차원을 추가하고, 다이얼 시스템을 확장한다.

### 산출물

#### 1. 4번째 다이얼: `INTERACTION_COMPLEXITY` (1-10)

| 레벨 | 허용 범위 |
|------|----------|
| 1-3 | hover feedback + 기본 scroll reveal만 (현재 motion.md 수준) |
| 4-5 | + magnetic button, tilt card, parallax layers |
| 6-7 | + scroll pin/scrub, drag interaction, custom cursor |
| 8-9 | + scroll storytelling, micro-sequence, 3D tilt |
| 10 | + full 3D scene, page transition, scroll-hijack narrative |

#### 2. Memory 클러스터 확장

| 클러스터 | 트리거 태그 |
|----------|------------|
| `interactive-narrative` | scroll-story, scene-based, multi-act |
| `scroll-heavy` | parallax, pin-scrub, horizontal-scroll |
| `gesture-rich` | drag, cursor-follow, magnetic, tilt |

#### 3. `content-layout-map.md` 확장

인터랙션 라우팅 추가:
- "제품 비교" → scroll pin + 고정 테이블
- "포트폴리오" → horizontal scroll gallery
- "스토리" → scroll storytelling multi-act
- "대시보드 프리뷰" → embedded 3D/interactive demo

### 완료 기준
- [ ] `taste-core.md`에 `INTERACTION_COMPLEXITY` 다이얼 추가
- [ ] `content-layout-map.md` 인터랙션 라우팅 추가
- [ ] Memory 클러스터 3개 정의 (shipped 엔트리 없이 provisional)
- [ ] CLAUDE.md에 4-Dial 체계 반영
- [ ] 전체 스킬 간 cross-reference 정리

---

## 의존성 그래프

```
Phase 0 ─── scroll-interaction.md + cursor-interaction.md + anti-slop 확장
   │
   ▼
Phase 1 ─── verifier 체크 + code-oracle 규칙 + visual-oracle rubric 확장
   │
   ▼
Phase 2 ─── drag + keyboard + micro-sequence 스킬 + 검증
   │
   ▼
Phase 3 ─── scroll-storytelling + 3D + page-transition 스킬 + 검증
   │
   ▼
Phase 4 ─── INTERACTION_COMPLEXITY 다이얼 + memory 클러스터 + content-layout-map 확장
```

각 Phase는 이전 Phase의 검증이 완료된 후 착수. 단, Phase 내부의 스킬들은 병렬 작성 가능.

---

## CLAUDE.md 변경점 요약

| 항목 | 변경 |
|------|------|
| Skill 목록 | `scroll-interaction.md`, `cursor-interaction.md` 추가 (Phase 0) → Phase별 추가 |
| Skill conflict priority | `anti-slop` > `scroll-interaction` > `cursor-interaction` > `layout-patterns` > `motion` > `taste-core` |
| 3-Dial → 4-Dial | `INTERACTION_COMPLEXITY` 추가 (Phase 4) |
| Layout diversity rules | 인터랙션 다양성 규칙 추가 ("연속 2개 섹션이 같은 인터랙션 패턴 금지") |
| Commands | `/design`, `/copy`에서 인터랙션 스킬 로딩 조건 추가 (INTERACTION_COMPLEXITY > 3일 때) |

---

## 리스크 & 완화

| 리스크 | 완화 |
|--------|------|
| GSAP 라이선스 (상업 프로젝트 유료) | CSS scroll-timeline을 progressive enhancement로 병기, GSAP 없이도 기본 동작 |
| 3D 성능 (모바일) | `skills/3d-interaction.md`에 모바일 fallback 필수 규칙 포함 |
| 스킬 총량 context budget 초과 | 인터랙션 스킬은 INTERACTION_COMPLEXITY > 3일 때만 로드 (on-demand) |
| 검증 복잡도 증가 | Phase별 점진적 추가, 기존 3-lane 아키텍처 유지 |
| scroll-hijack UX 악화 | anti-slop에 "escape hatch 필수" 규칙으로 강제 |

---

## Addendum — 2026-04-06: Token & CSS Platform Modernization

Phase 0 착수 전 선행 슬라이스. 리서치 결과(oklch + color-mix, CSS scroll-timeline 가능, View Transitions baseline)를 하네스에 반영.

### Shipped in this slice

| 파일 | 변경 |
|------|------|
| `skills/taste-core.md` §3 | Modern color layer: oklch 캐논 + `color-mix()`로 hover/active/pressed 파생. HEX는 참조용 주석으로만 허용. |
| `skills/taste-core.md` §7 | Scroll-linked animation 가이드: CSS `animation-timeline: view()` + `@keyframes` 패턴, useScroll 금지 이유. |
| `skills/anti-slop.md` §6.4 | Ban: non-hero file에서 `useScroll`/`useTransform` import. |
| `skills/anti-slop.md` §6.5 | Ban: 파일당 arbitrary-value HEX state class 3+ (`hover:bg-[#...]`). |
| `skills/anti-slop.md` §7 | VERIFIER_RULES 표에 INTERACTION_CHECKS 2행 추가. |
| `verifier/code-oracle.js` L2.27 | Rule `prefer-css-scroll-timeline` — severity: error. AST ImportDeclaration 기반, `isHeroFile()` exempt. |
| `verifier/code-oracle.js` L2.28 | Rule `prefer-color-mix-for-states` — severity: error. 파일당 3+ hex state class 감지. |

### Severity policy

- 두 rule 모두 **error (−5 점/건)**. 다음 `/design` 태스크부터 REJECT 임계선 반영.
- 기존 shipped 페이지는 재검증 대상이 아님. Regression 회피 목적.
- Fixture 검증 완료 (`/tmp/udesigner-oracle-fixture`): positive 2건 적중, hero exempt 및 2-hit 임계선 미만 negative 2건 무발화.

### Deferred (다음 슬라이스 후보)

- `framer-motion` → `motion/react` 패키지 경로 이전 (Code Oracle 레퍼런스 포함)
- `@starting-style` + Popover API를 tooltip/dropdown 프리셋으로 skill 편입
- Cross-document View Transitions (`@view-transition { navigation: auto }`) 패턴
- Magic UI / Aceternity / Motion Primitives 컴포넌트 화이트리스트 정책 결정
- Tailwind config를 oklch 네이티브 팔레트로 전환 (브레이킹 검토 필요)
