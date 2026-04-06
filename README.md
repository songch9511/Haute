# Haute — High-Agency Design Agent

**AI가 만든 UI는 왜 항상 AI스러운가?** Inter 폰트, 보라색 그라데이션, 3컬럼 카드 그리드, 과도한 border-radius. Haute는 이 문제를 **생성 시점**에서 해결한다. 사후 검수가 아닌, 에이전시 수준의 디자인 DNA를 생성 파이프라인에 직접 주입하는 Claude Code 하네스.

> **Generation over Policing.** 나쁜 출력을 잡는 것이 아니라, 처음부터 좋은 출력이 나오도록 가르친다.

---

## Problem

AI 코딩 에이전트의 프론트엔드 생성물은 구조적으로 generic해질 수밖에 없다:

| 원인 | 결과 |
|---|---|
| RLHF 편향 | "안전한" 평균적 디자인이 보상받음 |
| 학습 데이터 편향 | 템플릿/보일러플레이트가 다수 |
| 검증 부재 | 품질을 측정하거나 강제할 메커니즘 없음 |
| 상태 없음 | 유저 피드백이 다음 생성에 반영 안 됨 |

기존 접근(마크다운 규칙 + 자가 체크리스트)은 실패한다. 규칙을 쓰는 것과 규칙을 **강제하는 것**은 다르다.

---

## Solution: Two Pillars

Haute의 핵심은 두 개의 독립 축이다. 하나는 취향을 기억하고, 하나는 품질을 측정한다.

### Pillar A — Design Memory (3-Tier Tree)

CoMeT 영감의 계층적 디자인 기억 시스템. `.udesigner/memory/`에 위치.

```
Tier 1  sum.md           항상 로드. 전체 취향 프로필 (1 paragraph)
Tier 2  clusters/*.md    트리거 매칭 시 로드. 미학적 그룹 (editorial-romantic, commerce-minimal-warm, ...)
Tier 3  shipped/*/       도구 호출로만 접근. 개별 출하 디자인 (tokens, AST fingerprint, screenshot)
```

세션마다 자연 축적된다. 새 디자인이 출하될 때마다 클러스터가 풍부해지고, 다음 생성의 품질 베이스라인이 올라간다. **복리 구조**.

### Pillar B — Design Oracle (3-Lane Verification)

구현 에이전트와 **완전히 분리된** 읽기 전용 검증 에이전트. 자기 코드를 자기가 평가하지 않는다.

| Lane | Weight | 입력 | 검증 대상 |
|---|---|---|---|
| **Visual** | 45% | 렌더링된 스크린샷 | 첫인상, 구성, 타이포그래피, 색상, 에이전시 유사도 |
| **Code** | 40% | 소스 AST | 모션 프롭, 레이아웃 다양성, 토큰 준수, 20+ 구조 규칙 |
| **Mechanical** | 15% | 런타임 DOM (Playwright) | WCAG 대비, 반응형, 안티슬롭 패턴, 애니메이션 |

복합 점수: `(visual×0.45 + code×0.40 + mechanical×0.15)`. **90+ APPROVE**, 70-89 WARNING, <70 REJECT.

**Lane 독립성 불변량**: Visual은 소스를 못 보고, Code는 런타임을 못 보고, Mechanical은 의도를 추론하지 않는다. 각 레인이 고유한 증거만 추가한다.

---

## Think-Plan-Execute Protocol (TPE)

모든 디자인 작업은 5단계 프로토콜을 따른다. Phase gate가 시스템 레벨에서 강제한다 — "의지력"이 아닌 **물리적 차단**.

```
Think ──→ Plan ──→ Execute ──→ Verify ──→ Wisdom
 │          │         │           │          │
 │          │         │           │          └─ 학습 → Memory에 저장
 │          │         │           └─ Oracle 3-lane 평가. 최대 3라운드 수정
 │          │         └─ 섹션별 구현. Code Oracle이 매 편집마다 실행
 │          └─ 수용 기준 + 레이아웃 패턴. 유저 승인 대기
 └─ 파일 읽기, 메모리 풀, 레퍼런스 분석. 코드 작성 물리적으로 차단됨
```

**Intent Gate**가 복잡도에 따라 TPE 깊이를 자동 조절:

| 복잡도 | 예시 | TPE 레벨 |
|---|---|---|
| **Trivial** | 색상/텍스트 수정 | Execute only |
| **Explicit** | 섹션 추가, 컴포넌트 교체 | Think + Execute |
| **Open-ended** | 새 페이지, 레퍼런스 카피 | Full TPE + Plan 승인 |
| **Ambiguous** | "더 좋게 만들어줘" | 유저에게 범위 질문 |

---

## Sisyphus Hooks (Mechanical Enforcement)

규칙은 의지력으로 지키는 것이 아니다. 4개의 시스템 훅이 물리적으로 강제한다.

| Hook | 트리거 | 동작 |
|---|---|---|
| **Phase Gate** | `.tsx/.css` 편집 시도 | Think/Plan 단계면 편집 물리 차단 |
| **Boulder** | 모든 도구 사용 후 | `tasks.json` 미완료 시 "완료" 선언 차단 |
| **Circuit Breaker** | 테스트 실패 3회 연속 | 자동 `git stash` + 전략 재수립 강제 |
| **Session Continuity** | 편집/쓰기 후 | 세션 상태 자동 저장/복원 |

---

## Commands

| Command | 용도 | Memory 사용 | Oracle 사용 |
|---|---|---|---|
| `/design` | 새 UI 생성 | Full Pull (sum + cluster + shipped) | 3-lane |
| `/copy` | 레퍼런스 사이트 복제 | Pull + Playwright DOM 분석 | 3-lane |
| `/redesign` | 기존 UI 개선 | sum + 해당 cluster | Visual + Code |
| `/verify` | 품질 검증만 | — | 3-lane |
| `/audit` | 품질 리포트 | sum 참조 | Code + Mechanical |

### Examples

```
/design a landing page for a developer tool, brutalist style
/copy https://linear.app
/redesign src/components/hero.tsx — 더 에이전시스럽게
/verify
/audit src/app/page.tsx
```

---

## Skills (On-Demand Knowledge)

15개의 마크다운 스킬 파일이 커맨드별로 필요한 것만 로드된다. 세션당 최대 15K 토큰 컨텍스트 예산.

| Skill | 역할 |
|---|---|
| `anti-slop.md` | 44+ 금지 패턴 DB + 대체 방법 |
| `taste-core.md` | 디자인 토큰 (타이포그래피, 색상, 간격) |
| `layout-patterns.md` | 18개 레이아웃 패턴 (영웅, 벤토, 비대칭, ...) |
| `motion.md` | Framer Motion 이론 + spring/stagger 설정 |
| `visual-rhythm.md` | 섹션 페이싱 + 시각적 리듬 |
| `content-layout-map.md` | 콘텐츠 유형 → 레이아웃 자동 라우팅 |
| `playwright-analysis.md` | 레퍼런스 DOM 추출 기법 |
| `popover-patterns.md` | Native Popover API + dialog 패턴 |

**충돌 우선순위**: `anti-slop` > `layout-patterns` > `taste-core`

### Style Presets

| Preset | Aesthetic |
|---|---|
| `soft` | Luxury / agency |
| `brutalist` | Swiss / industrial |
| `minimal` | Editorial / clean |
| `obsidian` | Dark knowledge-tool |
| `catalis` | Modern corporate |
| `notion` | Productivity / clean SaaS |

---

## Anti-Slop: What We Ban

AI 디자인의 "냄새"를 제거하기 위해 44+ 패턴을 금지하고 대체 방법을 제공한다:

- **레이아웃**: 3컬럼 동일 카드 그리드, 연속 동일 배경색, 60%+ 중앙 정렬
- **타이포그래피**: Inter-only, 균일한 py-24 섹션 리듬
- **색상**: 보라-파랑 그라데이션 (LILA BAN), 순수 #000000
- **모션**: `whileInView` (Playwright 비호환), `whileHover.boxShadow`, `motion.width`
- **콘텐츠**: Lorem ipsum, John/Jane Doe, "Elevate" / "Seamless" / "Unleash"
- **스타일**: 카드 box-shadow, 과도한 border-radius, 의미 없는 구분선
- **접근성**: `div` + `onClick`, `img` without `alt`

---

## 3-Dial Configuration

디자인 성향을 3개 다이얼로 조절:

| Dial | Range | Default | 설명 |
|---|---|---|---|
| `DESIGN_VARIANCE` | 1-10 | 7 | 레이아웃 실험성 |
| `MOTION_INTENSITY` | 1-10 | 5 | 애니메이션 복잡도 |
| `VISUAL_DENSITY` | 1-10 | 4 | 콘텐츠 밀도 |

Override per-task: `"design a dashboard, variance 9, motion 3"`

---

## Results

현재 출하된 디자인과 복합 점수:

| Design | Cluster | Composite | Rounds | Status |
|---|---|---|---|---|
| UDesigner v3.4 (self-landing) | `editorial-romantic` | **93** | 4 | APPROVE |
| Sola (skincare e-commerce) | `commerce-minimal-warm` | **90** | 2 | APPROVE |
| Catalis (fintech analytics) | `warm-editorial` | 61 | — | provisional |
| Obsidian (knowledge tool) | `knowledge-tool-dark` | — | — | backfilled |

**Vanilla Claude 대비 핵심 차이**:

- Anti-slop violation rate: **0** (vanilla 평균 12+ violations)
- Layout diversity: 연속 동일 그리드 **0회** (vanilla는 3컬럼 카드 반복)
- Mobile responsive: **100%** single-column collapse (vanilla는 overflow 빈발)
- Human intervention: 평균 **2라운드** (vanilla는 "이상해, 다시" 무한 루프)

---

## Repository Structure

```
Haute/
├── CLAUDE.md                    # 마스터 라우터 + 아키텍처 정의
├── PRD.md                       # 제품 요구사항 문서
├── .claude/
│   ├── settings.json            # Sisyphus Hooks 설정
│   └── commands/                # /design, /copy, /redesign, /verify, /audit
├── .udesigner/
│   ├── memory/                  # Pillar A — 3-tier Design Memory
│   │   ├── sum.md               # Tier 1: 취향 프로필
│   │   ├── clusters/            # Tier 2: 미학적 그룹 (5개)
│   │   ├── shipped/             # Tier 3: 출하 디자인 (4개)
│   │   └── bin/                 # CLI 도구 (search, read-cluster, read-shipped)
│   ├── boulder.sh               # Sisyphus: 미완료 작업 차단
│   ├── phase-gate.sh            # Sisyphus: Think/Plan 시 코드 편집 차단
│   └── circuit-breaker.sh       # Sisyphus: 3회 실패 시 자동 stash
├── skills/                      # On-demand 디자인 규칙 (15개 스킬)
│   ├── anti-slop.md             # 44+ 금지 패턴
│   ├── taste-core.md            # 디자인 토큰
│   ├── layout-patterns.md       # 18 레이아웃 패턴
│   ├── motion.md                # 애니메이션 이론
│   └── style-presets/           # 6개 프리셋
├── verifier/                    # Pillar B — Design Oracle
│   ├── composite-score.js       # 3-lane 오케스트레이터
│   ├── code-oracle.js           # AST 기반 코드 검증 (20+ 규칙)
│   ├── visual-oracle.js         # 비전 에이전트 래퍼
│   └── checks/                  # 7개 Playwright 테스트 스위트
├── examples/dimension/          # 출하 디자인 레퍼런스 (Next.js)
├── research/                    # 실증 연구 (안티패턴, 메트릭, 검증 전략)
├── tests/red-team/              # 안티 예제 + 시각 비교
└── docs/                        # 전략 문서 + 로드맵
```

---

## How It Works (For Product Owners)

1. **프롬프트 하나**로 시작: "SaaS 랜딩 페이지 만들어줘" 또는 "이 레퍼런스 사이트 분석해서 비슷하게"
2. **TPE 프로토콜**이 자동 가동: Think(분석) → Plan(설계, 유저 승인) → Execute(구현) → Verify(검증)
3. **Design Memory**가 과거 출하물의 토큰/패턴을 참조하여 일관된 품질 베이스라인 유지
4. **Design Oracle**이 3-lane 독립 검증 수행, 복합 점수 90+ 달성 시 자동 승인
5. **학습이 축적**: 매 출하마다 Memory에 새 클러스터/토큰이 저장되어 다음 생성이 더 나아짐

**핵심**: 사람이 "이거 AI스러운데" 하고 되돌리는 루프를 **시스템이 자동으로** 수행한다. PO는 최종 결과물만 리뷰하면 된다.

---

## Roadmap

| Phase | 목표 | 상태 |
|---|---|---|
| **P0** | Benchmark Suite — vanilla vs Haute 정량 비교 | planned |
| **P0** | Reference Corpus — `/copy` 분석 결과 영구 보관 | planned |
| **P0** | Failure Harvesting — 실패 패턴 자동 수집 파이프라인 | planned |
| **P1** | Verifier 독립 npm 패키지화 (CI/CD 통합) | planned |
| **P1** | Style Preset 확장 (미니 디자인 시스템) | planned |
| **P2** | Before/After 케이스 스터디 | planned |
| **P4** | Dual-path RAG (Memory 자동 검색) | viable |
| **P5** | Compactor (Memory 자동 압축/재구성) | viable |

---

## Tech Stack

- **Runtime**: [Claude Code](https://claude.ai/code) (CLI)
- **Framework**: Next.js 16 + React 19 + Tailwind v4
- **Animation**: Framer Motion + CSS `@keyframes`
- **Verification**: Playwright + @babel/parser + Vision Agent
- **Memory**: File-based 3-tier tree (CoMeT-inspired)

---

## Requirements

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) CLI
- Node.js 18+
- (Optional) [21st.dev](https://21st.dev) MCP server for component generation

## Setup

```bash
git clone https://github.com/songch9511/Haute.git
cd Haute

# Install verifier dependencies
cd verifier && npm install && npx playwright install && cd ..
```

Open the project in Claude Code — `CLAUDE.md` and hooks activate automatically:

```bash
claude
```

---

## License

MIT
