#!/bin/bash
# Wisdom Auto-Extraction Hook
# Triggers after /verify passes. Detects verification success in Bash output
# and reminds the agent to extract learnings into the 5-category Wisdom system.
#
# Runs as PostToolUse hook on Bash.
# Exit 0 always (advisory, never blocks).

# Only trigger on verify/playwright commands
if ! echo "$TOOL_INPUT" | grep -qiE '(playwright|verify)'; then
  exit 0
fi

# Check for success signals (all tests passed)
if echo "$TOOL_OUTPUT" | grep -qiE '(passed|✓.*passed|PASS.*[5-9]|7 passed|score.*[89][0-9]|score.*100)'; then
  # Check for any failures — if there are failures, don't trigger wisdom
  if echo "$TOOL_OUTPUT" | grep -qiE '(FAIL|failed|✗|✘)'; then
    exit 0
  fi

  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "📝 WISDOM EXTRACTION — 검증 통과! 학습을 기록하세요."
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "다음 5가지 카테고리로 이번 태스크의 학습을 추출하세요:"
  echo ""
  echo "  1. Conventions — 사용한 디자인 패턴, 네이밍, 아키텍처"
  echo "  2. Successes   — 효과적이었던 접근, 잘 된 것"
  echo "  3. Failures    — 실패한 접근, 안티패턴"
  echo "  4. Gotchas     — 엣지 케이스, 까다로운 의존성"
  echo "  5. Commands    — 유용한 스크립트, 빌드 명령어"
  echo ""
  echo "→ memory에 feedback_* 또는 project_* 파일로 저장하세요."
  echo "→ 기존 메모리와 중복되지 않는 새로운 학습만 기록하세요."
  echo "→ Wisdom 추출 완료 후 phase.json을 'idle'로 전환하세요."
  echo ""
fi

exit 0
