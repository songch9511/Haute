# /verify — Run Design Verification (Pillar B, 3-lane)

Execute composite design quality verification across three independent lanes:
**Visual** (vision agent) + **Code** (AST oracle) + **Mechanical** (Playwright runtime).

**Oracle Gate**: 검증은 반드시 독립 에이전트가 수행한다. 자기 인증 금지.

## Usage
```
/verify [file-or-url] [--reference=<ref_url>] [--target-dir=<src-dir>]
```

## Three Lanes

| Lane | Weight | What it judges | How |
|---|---|---|---|
| **Visual** | 45% | Rendered pixels — 5초 임팩트, composition, typography drama, color harmony, agency-tier 유사도, AI slop smell | Vision sub-agent reads desktop+mobile screenshots, returns JSON verdict matching `verifier/visual-oracle-schema.json` |
| **Code** | 40% | Source AST — motion props, bento, useInView on hero, placeholder content, a11y, token adherence | `node verifier/code-oracle.js <target-dir>` |
| **Mechanical** | 15% | Playwright runtime checks — spacing, typography, color, animation, responsive, anti-slop-scan, layout-diversity | `npx playwright test` against live URL |

**Weight renormalization**: lanes can be individually skipped (no live server → skip mechanical; no screenshots captured → skip visual). The composite re-normalizes remaining weights so a 2-lane or 1-lane run is still a valid composite.

## Workflow

### Step 0. Oracle Gate — 독립 검증 에이전트 스폰 (read-only)

Implementing agent이 자기 코드를 직접 검증하지 않는다. 별도 sub-agent를 호출한다.

```
Agent(
  subagent_type: "general-purpose",
  description: "Visual Oracle — independent design critic",
  prompt: <see verifier/visual-oracle.md — full rubric + JSON schema>
)
```

**Oracle 제약**:
- `Edit` · `Write` 툴 사용 금지. Read-only.
- Screenshot 파일 경로를 Read 툴로 직접 읽어 판정.
- 출력은 `verifier/visual-oracle-schema.json` 형태의 **JSON only** (프롬프트 외부에 prose 금지).

### Step 1. Target Resolution
- 파일 경로 → 로컬 서버로 서빙, URL 획득
- URL → 직접 사용
- 인자 없음 → 가장 최근 수정된 프론트엔드 파일에서 역추론

### Step 2. Visual Lane — Screenshot Capture + Vision Verdict

```bash
# 2a. Capture screenshots (deterministic)
node verifier/visual-oracle.js --capture <target_url> --reference <ref_url>

# Output: { ok: true, desktop: "...png", mobile: "...png" }
```

```
# 2b. Assemble payload and spawn vision sub-agent
node verifier/visual-oracle.js --payload <target_url> --out /tmp/payload.json

# 2c. Driving agent invokes vision sub-agent with the payload.
# Sub-agent reads visual-oracle.md, reads both screenshots, returns JSON verdict.
# Verdict is written to /tmp/visual-verdict.json

# 2d. Validate + score
node verifier/visual-oracle.js --verdict /tmp/visual-verdict.json
```

### Step 3. Code Lane — AST Oracle

```bash
node verifier/code-oracle.js <target-dir> --json > /tmp/code-report.json
```

### Step 4. Mechanical Lane — Playwright Runtime

```bash
cd verifier && VERIFY_URL=<target_url> npx playwright test --reporter=json
```

### Step 5. Composite Aggregation

```bash
node verifier/composite-score.js \
  --url <target_url> \
  --target-dir <src-dir> \
  --visual-verdict /tmp/visual-verdict.json \
  [--reference <ref_url>] \
  --out /tmp/composite-results.json
```

Lanes can be selectively skipped via `--skip-visual` · `--skip-code` · `--skip-mechanical`. Composite renormalizes automatically.

### Step 6. Report Format

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  COMPOSITE SCORE: 82/100
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Visual:     85/100  (45%)  →  5초 임팩트 8, composition 7, typography 9…
  Code:       79/100  (40%)  →  4 err, 1 warn, 102 info across 12 files
  Mechanical: 82/100  (15%)  →  22/27 specs passed
  Lanes present: visual, code, mechanical
  Verdict: ⚠️ APPROVE_WARNING
```

### Verdict Thresholds

- `score ≥ 90` → **APPROVE** (wisdom 단계로 진행)
- `70 ≤ score < 90` → **APPROVE_WARNING** (개선 영역 나열, 진행은 가능)
- `score < 70` → **REJECT** (실패 항목 수정 필수)

### Step 7. Re-verify (on REJECT)

각 lane의 actionable fix를 기반으로 구현 에이전트가 수정 → 새 Oracle sub-agent로 재판정. Max 3 rounds. 3회 실패 시 Circuit Breaker 발동.

---

## Per-Section Quick Verify (Execute-phase 옵션)

Execute 단계의 섹션마다 경량 vision check를 추가로 수행할 수 있다. 전체 Oracle보다 빠르고 (Haiku 권장), actionable fix는 한 줄로 한정한다.

```
Agent(
  subagent_type: "general-purpose",
  description: "Per-Section Quick Verify",
  prompt: """
    Read the screenshot at {path}. Return JSON only:
    {"ok": boolean, "fix": string|null}

    ok=true: section is acceptable.
    ok=false: fix must name ONE concrete change (e.g., 'Hero title 2x larger, add italic').
    No prose outside JSON.
  """
)
```

섹션 단위 `ok=false`가 나오면 다음 섹션 생성 전에 즉시 수정. 전체 재작성 회피.

---

## Lane Independence Invariants

1. **Visual Lane**은 소스 코드에 접근하지 않는다. 스크린샷만 읽는다.
2. **Code Lane**은 런타임에 접근하지 않는다. AST만 본다.
3. **Mechanical Lane**은 의도에 접근하지 않는다. 렌더된 DOM 수치만 본다.
4. 각 Lane은 **독립적으로 존재**할 수 있다 (lane 하나만 돌려도 composite 산출 가능).
5. 최종 verdict는 composite-score.js가 내리며, 구현 에이전트가 override 불가.
