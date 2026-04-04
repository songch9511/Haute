# UDesigner Agent 구조 (v3)

High-Agency Design Agent — 에이전시/테크 티어 수준의 프론트엔드를 생성하는 것이 목표.
**Generation over Policing**: 사후 검열이 아니라 생성 단계에서 고급 감각을 주입한다.

## 1. TPE Protocol
모든 프론트엔드 작업은 Think → Plan → Execute → Verify → Wisdom 순서.
```
idle → think → plan → [유저 승인] → execute → verify → wisdom → idle
```
- **Think**: 레퍼런스/메모리 분석, 코드 금지
- **Plan**: 측정 가능한 수락 기준 + 섹션별 레이아웃 패턴, 코드 금지
- **Execute**: 섹션 단위 구현 + 즉시 검증
- **Verify**: Oracle(독립 Agent)이 composite-score 실행
- **Wisdom**: 5 카테고리(Conventions/Successes/Failures/Gotchas/Commands) 학습 추출

## 2. Intent Gate
| 복잡도 | TPE 레벨 |
|---|---|
| Trivial (값 교체) | Execute only |
| Explicit (섹션 추가) | Think + Execute |
| Open-ended (새 페이지/카피) | Full TPE + Plan 승인 |
| Ambiguous | 유저에게 질문 |

## 3. Sisyphus 기계적 강제 (Hooks)
- **Boulder** — 미완료 태스크 있으면 "완료" 차단
- **Phase Gate** — Think/Plan 단계의 `.tsx/.css` 편집 물리 차단
- **Circuit Breaker** — 연속 3회 실패 시 auto `git stash` + 전략 재수립
- **Session Continuity** — `.udesigner/session.json`에 phase/섹션/Oracle 결과 자동 저장·복원

## 4. Commands
| Command | 용도 | TPE |
|---|---|---|
| `/design` | 새 UI 생성 | Full |
| `/copy` | 레퍼런스 카피 | Full |
| `/redesign` | 기존 UI 개선 | Think + Execute |
| `/verify` | 품질 검증 | Execute only |
| `/audit` | 품질 리포트 | Think only |

## 5. Skills (on-demand, ~15K 토큰 캡)
- `taste-core` — 디자인 토큰
- `anti-slop` — 금지 패턴 DB (44+ 규칙)
- `motion` — 애니메이션 이론 + 구현
- `layout-patterns` — 18개 레이아웃 (요약 상시 + 상세 on-demand)
- `visual-rhythm` / `content-layout-map` — 섹션 페이싱 & 라우팅
- `reference-learning` / `playwright-analysis` — 레퍼런스 DOM 분석
- `21st-dev` / `unsplash` / `uitripled` — 컴포넌트·이미지 소싱
- `style-presets/*` — 6개 프리셋 (soft, brutalist, minimal, obsidian, catalis, notion)

**충돌 우선순위**: anti-slop > layout-patterns > taste-core (토큰은 taste-core 우선)

## 6. Oracle Gate — 독립 검증
구현 Agent는 자기 코드를 직접 /verify 하지 않는다. **Read-only Oracle Agent**가 `verifier/composite-score.js` 실행.

| 컴포넌트 | 가중치 |
|---|---|
| Mechanical checks (Playwright) | 40% |
| Layout diversity | 35% |
| Reference comparison | 25% |

- `< 70` REJECT / `70–89` APPROVE w/ WARNING / `≥ 90` APPROVE
- Oracle 판정이 최종, 구현 Agent override 불가

## 7. Layout Diversity Rules (mechanically enforced)
1. 인접 섹션에서 동일 grid-template-columns 금지
2. 섹션 padding 다양화 (전부 `py-24` 금지)
3. 40% 이상 섹션은 center-align이 아니어야 함
4. 3연속 동일 배경색 금지

## 8. 3-Dial Configuration
- `DESIGN_VARIANCE` 1–10 (default 7)
- `MOTION_INTENSITY` 1–10 (default 5)
- `VISUAL_DENSITY` 1–10 (default 4)

## 9. Memory
`feedback_*` / `project_*` / `user_*` 메모리가 Think 단계에서 로드됨. 디자인 lesson은 대부분 skill 파일에 인코딩되어 있고, 메모리는 유저 개별 피드백 + 프로젝트 맥락 중심.
