# UDesigner PRD
## High-Agency Design Agent for Claude Code

**Version:** 0.1.0
**Date:** 2026-04-02
**Author:** Daniel Song + Claude

---

## 1. Problem Statement

AI 코딩 에이전트가 프론트엔드 UI를 생성할 때, 결과물은 거의 항상 "AI스러운" generic 디자인이 된다. Inter 폰트, 보라색 그라데이션, 3컬럼 카드 그리드, 과도한 border-radius — 이런 패턴이 반복되는 이유는:

1. **RLHF 편향** — 학습 시 "안전한" 평균적 디자인이 보상받음
2. **학습 데이터 편향** — 템플릿/보일러플레이트 코드가 학습 데이터의 다수
3. **검증 부재** — 생성된 디자인의 품질을 측정하거나 강제할 메커니즘이 없음
4. **상태 없음** — 유저의 피드백이 다음 생성에 반영되지 않음

**기존 솔루션(taste-skill)의 한계:**
- 순수 마크다운 규칙만 존재, 실제 검증 없음 (자가 선언 방식)
- Stateless — 매 세션 리셋, 피드백 학습 불가
- 라우팅 없음 — 모든 규칙이 항상 로드되어 토큰 낭비
- 규칙의 실증적 근거 부족

---

## 2. Solution Overview

UDesigner는 Claude Code 하네스 위에 구축된 **High-Agency Design Agent**로, 다음 파이프라인을 통해 premium 디자인을 보장한다:

```
Research(근거) → Skills(규칙) → Examples(레퍼런스) → Generate(생성) → Verify(검증) → Memory(학습)
```

### 핵심 차별점
| 기능 | taste-skill | UDesigner |
|---|---|---|
| 검증 | 자가 선언 체크리스트 | Playwright + Hooks 강제 |
| 상태 | Stateless | Memory로 피드백 학습 |
| 라우팅 | 전체 로드 | CLAUDE.md 라우터 → 필요한 skill만 |
| 근거 | 사후 정당화 | research → skill → verifier 인과체계 |
| 레퍼런스 | 스크린샷만 | .md(AI용) + .html(검증용) + .png(regression용) |

---

## 3. Architecture

### 3.1 디렉토리 구조

```
UDesigner/
├── CLAUDE.md                          # [A] 마스터 라우터 + 글로벌 규칙
├── .claude/
│   ├── settings.json                  # [B] Hooks (자동 검증 트리거)
│   └── commands/
│       ├── design.md                  # [C1] /design 커맨드
│       ├── redesign.md                # [C2] /redesign 커맨드
│       ├── verify.md                  # [C3] /verify 커맨드
│       └── audit.md                   # [C4] /audit 커맨드
│
├── research/                          # [D] 실증 연구
│   ├── README.md
│   ├── ai-design-antipatterns/
│   │   ├── root-causes.md
│   │   ├── pattern-catalog.md
│   │   └── remediation.md
│   ├── design-quality-metrics/
│   │   ├── visual-metrics.md
│   │   ├── interaction-metrics.md
│   │   └── automated-scoring.md
│   ├── verification-strategies/
│   │   ├── visual-regression.md
│   │   ├── dom-css-analysis.md
│   │   └── llm-as-judge.md
│   └── prompt-engineering/
│       ├── instruction-hierarchy.md
│       ├── few-shot-vs-rules.md
│       └── context-budget.md
│
├── skills/                            # [E] 디자인 규칙
│   ├── taste-core.md                  # 핵심 디자인 원칙
│   ├── anti-slop.md                   # 금지 패턴 DB
│   ├── motion-engine.md               # 애니메이션 규칙
│   └── style-presets/
│       ├── soft.md                    # 럭셔리/에이전시
│       ├── brutalist.md               # 브루탈리스트
│       └── minimal.md                 # 미니멀/에디토리얼
│
├── examples/                          # [F] 레퍼런스 + 검증 기준선
│   ├── README.md
│   ├── ir-deck/
│   │   ├── example.md                 # AI 레퍼런스 (토큰 경제적)
│   │   ├── index.html                 # 렌더링 가능한 완성본
│   │   └── snapshot.png               # visual regression 기준
│   ├── dashboard/
│   │   ├── example.md
│   │   ├── index.html
│   │   └── snapshot.png
│   ├── landing-page/
│   │   ├── example.md
│   │   ├── index.html
│   │   └── snapshot.png
│   ├── presentation/
│   │   ├── example.md
│   │   ├── index.html
│   │   └── snapshot.png
│   └── portfolio/
│       ├── example.md
│       ├── index.html
│       └── snapshot.png
│
├── verifier/                          # [G] 자동 검증
│   ├── package.json
│   ├── playwright.config.ts
│   ├── quick-lint.js                  # PostToolUse hook용 경량 린트
│   ├── checks/
│   │   ├── visual-regression.spec.ts  # 스크린샷 비교
│   │   ├── spacing-audit.spec.ts      # 간격/여백 검증
│   │   ├── typography-check.spec.ts   # 폰트/크기 규칙 검증
│   │   ├── color-audit.spec.ts        # 팔레트/대비 검증
│   │   ├── animation-check.spec.ts    # 애니메이션 존재/성능
│   │   ├── responsive-check.spec.ts   # 반응형 레이아웃
│   │   └── anti-slop-scan.spec.ts     # DOM에서 금지 패턴 탐지
│   └── snapshots/                     # 기준 스크린샷 저장소
│
└── templates/                         # [H] 검증 통과한 스타터
    ├── next-app/                      # Next.js + Tailwind 스타터
    └── static-html/                   # 순수 HTML/CSS/JS 스타터
```

### 3.2 컴포넌트별 역할

#### [A] CLAUDE.md — 마스터 라우터

**책임:** 태스크 분류 → 적절한 command/skill 연결
**원칙:** 가볍게 유지 (< 100줄). 구체적 규칙은 skills/에 위임

```
입력 분석 → 카테고리 판단 → command 라우팅 → skill 로딩 지시
```

라우팅 매트릭스:
| 유저 의도 | Command | Skills 로드 | Verifier |
|---|---|---|---|
| 새 UI 생성 | /design | taste-core + anti-slop + [preset] | 전체 |
| 기존 UI 개선 | /redesign | taste-core + anti-slop | audit → targeted |
| 품질 검증 | /verify | - | 전체 |
| 품질 리포트 | /audit | anti-slop | scan만 |

#### [B] settings.json — Hooks

**책임:** 하네스 레벨 강제 — AI가 우회 불가

| Hook | Trigger | Action |
|---|---|---|
| PostToolUse (Edit/Write) | .tsx/.html/.css 수정 시 | quick-lint.js 실행 |
| PreCommit | git commit 시 | Playwright 전체 검증 |

#### [C] Commands — 슬래시 커맨드

**책임:** 각 워크플로우의 절차 정의

- `/design [category] [preset]` — 새 UI 생성 파이프라인
- `/redesign [target]` — 기존 UI 개선 파이프라인  
- `/verify [target]` — Playwright 검증 실행
- `/audit [target]` — 품질 감사 리포트 생성

각 command는 다음을 명시:
1. 어떤 skill을 읽을 것인가
2. 어떤 memory를 참조할 것인가
3. 어떤 verifier를 실행할 것인가
4. 실패 시 어떻게 재시도할 것인가

#### [D] Research — 실증 연구

**책임:** skills와 verifier의 규칙에 대한 실증적 근거 제공

| 영역 | 핵심 질문 | 출력 |
|---|---|---|
| ai-design-antipatterns | AI가 왜 generic UI를 만드나? | 금지 패턴 목록 → anti-slop.md |
| design-quality-metrics | "좋은 디자인"을 어떻게 측정하나? | 측정 가능한 메트릭 → verifier checks |
| verification-strategies | 디자인 검증 자동화 방법은? | 검증 전략 → verifier 구현 |
| prompt-engineering | 규칙을 어떻게 전달해야 효과적인가? | 최적 구조 → skills 포맷 |

#### [E] Skills — 디자인 규칙

**책임:** AI가 따라야 할 디자인 원칙과 제약 조건

구조 원칙:
- 각 skill은 독립적 — 다른 skill 없이도 작동
- research/의 근거 참조를 명시
- 3-dial 파라미터 시스템: `DESIGN_VARIANCE`, `MOTION_INTENSITY`, `VISUAL_DENSITY`
- 규칙은 "무엇을 하지 마라" (금지)와 "대신 이렇게 해라" (대안) 쌍으로 구성

#### [F] Examples — 레퍼런스 + 검증 기준선

**책임:** 3중 기능

| 파일 | 소비자 | 용도 |
|---|---|---|
| example.md | AI 에이전트 | few-shot 레퍼런스 (생성 시 참조) |
| index.html | Playwright | golden baseline (검증 기준) |
| snapshot.png | Verifier | visual regression 비교 |

카테고리: IR Deck, Dashboard, Landing Page, Presentation, Portfolio

#### [G] Verifier — 자동 검증

**책임:** 생성된 UI의 품질을 객관적으로 측정

| Check | 측정 대상 | 판정 기준 |
|---|---|---|
| visual-regression | 전체 레이아웃 | golden baseline 대비 diff threshold |
| spacing-audit | padding, margin, gap | 일관성 + 최소값 준수 |
| typography-check | font-family, size, weight | 금지 폰트 없음 + 크기 대비 존재 |
| color-audit | 팔레트, contrast ratio | WCAG AA + 팔레트 제한 |
| animation-check | transition, animation | transform/opacity만 사용 + duration 범위 |
| responsive-check | 브레이크포인트별 레이아웃 | 모바일 단일컬럼 collapse |
| anti-slop-scan | DOM 구조 + 클래스명 | 금지 패턴 0건 |

2단계 검증:
- **quick-lint** (PostToolUse): CSS/클래스 레벨 빠른 스캔 (< 2초)
- **full-verify** (PreCommit / /verify): Playwright 렌더링 후 전체 검증 (< 30초)

#### [H] Templates — 검증 통과한 스타터

**책임:** 이미 검증 통과한 기본 구조 제공으로 초기 품질 보장

---

## 4. Memory 설계

### 4.1 메모리 타입별 용도

| 타입 | 저장 내용 | 사용 시점 |
|---|---|---|
| **user** | 디자인 취향, 선호 스택, 역할 | 모든 /design, /redesign |
| **feedback** | 수정 지시 축적 (간격, 색상, 모션 등) | 규칙 조정, 기본값 변경 |
| **project** | 확정된 디자인 토큰, 검증 통과 패턴 | /design 시 일관성 유지 |
| **reference** | Figma URL, 디자인 시스템 문서, 영감 사이트 | 레퍼런스 참조 |

### 4.2 피드백 루프

```
유저 피드백 ("간격 더 넓게")
     │
     ▼
feedback memory 저장
  "section padding 기본값: py-16 → py-24"
  Why: 유저가 2회 이상 동일 피드백
  How to apply: /design 시 spacing 기본값으로 적용
     │
     ▼
다음 /design 실행 시 memory 참조
     │
     ▼
verifier가 memory 기준값으로 검증
```

---

## 5. 워크플로우

### 5.1 /design 워크플로우

```
1. 유저 입력 분석
   ├── 카테고리 판단 (ir-deck, dashboard, landing 등)
   └── 스타일 프리셋 판단 (soft, brutalist, minimal)

2. 컨텍스트 로딩
   ├── skills/taste-core.md
   ├── skills/anti-slop.md
   ├── skills/[preset].md (해당 시)
   ├── examples/[category]/example.md
   └── memory/ 에서 user, feedback, project 참조

3. 생성
   ├── 디자인 의도 명시 (왜 이런 선택을 하는지)
   └── 코드 생성

4. 검증 (자동)
   ├── quick-lint (PostToolUse hook)
   │   ├── Pass → 계속
   │   └── Fail → 즉시 수정 후 재검증
   └── full-verify (/verify 또는 PreCommit)
       ├── Pass → 완료
       └── Fail → 실패 항목별 수정 → 재검증 (최대 3회)

5. 결과
   ├── 검증 리포트 출력
   └── 검증 통과 패턴 → memory에 저장
```

### 5.2 /redesign 워크플로우

```
1. 대상 파일/컴포넌트 스캔
2. /audit 실행 → 문제점 진단
3. 우선순위 정렬 (타이포 → 컬러 → 간격 → 인터랙션 → 레이아웃)
4. 순차 수정 (각 수정마다 quick-lint)
5. full-verify
```

### 5.3 /verify 워크플로우

```
1. 대상 파일 렌더링 (Playwright)
2. 7개 check 실행
3. 결과 리포트 생성
   ├── Pass/Fail 요약
   ├── 실패 항목별 상세 (스크린샷 diff 포함)
   └── 수정 제안
```

### 5.4 /audit 워크플로우

```
1. 대상 파일/디렉토리 스캔
2. anti-slop 패턴 매칭
3. 품질 점수 산출 (0-100)
4. 카테고리별 리포트 출력
```

---

## 6. 구현 순서

의존성 기반 순서:

### Phase 1: Foundation
| # | 작업 | 산출물 | 의존성 |
|---|---|---|---|
| 1.1 | Research 작성 | research/ 전체 | 없음 |
| 1.2 | 핵심 Skills 작성 | taste-core.md, anti-slop.md, motion-engine.md | research 참조 |
| 1.3 | Style Presets 작성 | soft.md, brutalist.md, minimal.md | 1.2 |

### Phase 2: Reference
| # | 작업 | 산출물 | 의존성 |
|---|---|---|---|
| 2.1 | Example .md 작성 | 5개 카테고리 example.md | 1.2 skills 참조 |
| 2.2 | Example .html 구현 | 5개 카테고리 index.html | 2.1 |
| 2.3 | Snapshot 생성 | 5개 카테고리 snapshot.png | 2.2 |

### Phase 3: Verification
| # | 작업 | 산출물 | 의존성 |
|---|---|---|---|
| 3.1 | Verifier 세팅 | package.json, playwright.config.ts | 없음 |
| 3.2 | Quick-lint 구현 | quick-lint.js | 1.2 anti-slop 규칙 참조 |
| 3.3 | Playwright checks 구현 | 7개 .spec.ts 파일 | 1.2 + 2.3 snapshots |

### Phase 4: Harness
| # | 작업 | 산출물 | 의존성 |
|---|---|---|---|
| 4.1 | CLAUDE.md 작성 | CLAUDE.md | 1.2, 2.1 (라우팅 대상) |
| 4.2 | Commands 작성 | 4개 .md 파일 | 모든 이전 단계 |
| 4.3 | Hooks 설정 | settings.json | 3.2, 3.3 |

### Phase 5: Templates + Polish
| # | 작업 | 산출물 | 의존성 |
|---|---|---|---|
| 5.1 | Templates 생성 | next-app/, static-html/ | 모든 이전 단계 |
| 5.2 | 통합 테스트 | examples를 /design → /verify 파이프라인으로 검증 | 모든 이전 단계 |
| 5.3 | Memory 초기 세팅 | MEMORY.md + 초기 메모리 파일 | 모든 이전 단계 |

---

## 7. 성공 기준

### 기능적
- [ ] `/design landing-page` 실행 시 Playwright 검증 통과하는 HTML 생성
- [ ] `/verify` 실행 시 7개 check 모두 리포트 출력
- [ ] `/audit` 실행 시 anti-slop 위반 0건인 코드에 100점 부여
- [ ] `/redesign` 실행 시 기존 코드의 품질 점수 향상

### 품질적
- [ ] 생성된 UI에서 Inter 폰트, 보라 그라데이션 등 "AI 냄새" 0건
- [ ] 모든 생성물 모바일 반응형 (< 768px 단일컬럼)
- [ ] 애니메이션은 transform/opacity만 사용 (Lighthouse Performance > 90)
- [ ] WCAG AA contrast ratio 준수

### 시스템적
- [ ] PostToolUse hook 실행 시간 < 2초
- [ ] Full verify 실행 시간 < 30초
- [ ] Memory 피드백이 다음 생성에 실제 반영됨
- [ ] CLAUDE.md < 100줄 유지

---

## 8. 제약 사항

- **프레임워크:** React/Next.js + Tailwind CSS 우선, 순수 HTML도 지원
- **테스트:** Playwright만 사용 (Cypress, Puppeteer 등 불필요)
- **토큰 예산:** 각 skill < 500줄, example.md < 100줄
- **검증 범위:** 시각적 품질에 집중, 기능 테스트는 범위 밖
- **의존성 최소화:** verifier 외에는 npm 패키지 의존 없음

---

## 9. 열린 질문

1. **LLM-as-Judge:** Playwright 검증 외에, LLM이 스크린샷을 보고 품질 판단하는 레이어를 추가할 것인가?
2. **Figma 연동:** Figma 디자인 토큰을 자동으로 skills에 반영하는 파이프라인이 필요한가?
3. **다국어:** 한국어/일본어 등 CJK 타이포그래피 규칙을 별도 skill로 분리할 것인가?
4. **팀 공유:** Memory를 팀 레벨로 공유하는 메커니즘이 필요한가?
