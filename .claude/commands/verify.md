# /verify — Run Design Verification

Execute Playwright-based design quality checks on generated UI.
**Oracle Gate**: 검증은 반드시 독립 에이전트가 수행한다. 자기 인증 금지.

## Usage
```
/verify [file-or-url] [--checks all|spacing|typography|color|animation|responsive|anti-slop|visual-regression]
```

## Workflow

### 0. Oracle Gate — 독립 검증 에이전트 실행

**구현 에이전트는 자기 코드를 직접 검증하지 않는다.**
반드시 별도 Agent를 호출하여 독립적으로 검증한다.

```
Agent(
  subagent_type: "general-purpose",
  isolation: "worktree",
  description: "Oracle — 독립 디자인 검증",
  prompt: """
    당신은 UDesigner Oracle — 독립 검증 에이전트입니다.
    구현 에이전트의 출력물을 독립적으로 검증합니다.
    구현 에이전트의 "통과" 주장을 신뢰하지 마세요.

    ## 검증 대상
    URL: {target_url}

    ## 검증 절차
    1. cd verifier && npx playwright test --reporter=list
    2. 7개 체크 결과를 아래 형식으로 보고
    3. 실패 항목마다 구체적 원인 + 수정 제안
    4. 스크린샷을 캡처하여 시각적 품질 독립 판단
    5. 레퍼런스와 비교 (있는 경우)

    ## 보고 형식
    각 체크: ✓ PASS 또는 ✗ FAIL — 실패 사유
    Score: N/100 (passed/total)
    판정: APPROVE 또는 REJECT (사유)

    ## 규칙
    - 70점 미만: 무조건 REJECT
    - 70-89점: WARNING과 함께 APPROVE (수정 권고 목록 첨부)
    - 90점 이상: APPROVE
    - 코드를 수정하지 마세요. 보고만 하세요.
  """
)
```

**Oracle 결과 처리**:
- `APPROVE` → Wisdom 단계로 진행
- `REJECT` → 실패 항목 수정 후 Oracle 재호출 (max 3 rounds)
- Oracle 에이전트의 판정이 최종. 구현 에이전트가 override 불가.

---

### 1. Target Resolution
- If file path: serve locally and get URL
- If URL: use directly
- If no argument: find most recently modified frontend file

### 2. Run Checks (Oracle 에이전트가 실행)
Execute selected checks (default: all):

| Check | File | What It Measures |
|---|---|---|
| spacing-audit | spacing-audit.spec.ts | Padding/margin consistency, minimum values, rhythm |
| typography-check | typography-check.spec.ts | Font families, size scale, weight usage, banned fonts |
| color-audit | color-audit.spec.ts | Palette count, contrast ratios (WCAG AA), banned colors |
| animation-check | animation-check.spec.ts | Only transform/opacity animated, duration ranges, easing |
| responsive-check | responsive-check.spec.ts | Mobile single-column, breakpoint behavior, touch targets |
| anti-slop-scan | anti-slop-scan.spec.ts | Banned DOM patterns, generic class names, AI tells |
| visual-regression | visual-regression.spec.ts | Screenshot diff against baseline (if exists) |

### 3. Report
Oracle outputs results as:
```
✓ spacing-audit      PASS
✓ typography-check   PASS
✗ color-audit        FAIL — contrast ratio 3.2:1 on .card-subtitle (need 4.5:1)
✓ animation-check    PASS
✓ responsive-check   PASS
✗ anti-slop-scan     FAIL — Inter font detected in body
✓ visual-regression  PASS (no baseline)

Score: 71/100 (5/7 passed)
판정: REJECT — 70점 이상이나 critical 실패 2건
```

### 4. Auto-fix Suggestions
For each FAIL, Oracle provides:
- What exactly failed
- The specific rule it violates (link to skill)
- Concrete fix suggestion with code

### 5. Re-verify
After fixes: Oracle 재호출 (새로운 독립 에이전트). Max 3 rounds.
3회 실패 시 → Circuit Breaker 발동.
