#!/bin/bash
# Circuit Breaker — 3-Failure Auto-Stash
# Sisyphus-inspired: after 3 consecutive verification failures,
# automatically stashes changes and escalates to user.
#
# Runs as PostToolUse hook after Bash (detects verify/test failures).
# Tracks consecutive failures in failures.json.

FAIL_FILE="$(dirname "$0")/failures.json"
MAX_FAILURES=3

# Only trigger on commands that look like verification/test runs
if ! echo "$TOOL_INPUT" | grep -qiE '(playwright|verify|test|lint|check)'; then
  exit 0
fi

# Check if the command failed (exit code embedded in output)
# We check TOOL_OUTPUT for common failure indicators
if echo "$TOOL_OUTPUT" | grep -qiE '(FAIL|ERROR|failed|error:|✗|✘)'; then
  IS_FAILURE=true
else
  IS_FAILURE=false
fi

# Initialize or read failure counter
if [ -f "$FAIL_FILE" ]; then
  COUNT=$(node -e "
    try {
      const f = JSON.parse(require('fs').readFileSync('$FAIL_FILE', 'utf8'));
      console.log(f.count || 0);
    } catch(e) { console.log(0); }
  " 2>/dev/null)
else
  COUNT=0
fi

if [ "$IS_FAILURE" = "true" ]; then
  COUNT=$((COUNT + 1))

  # Write updated count
  node -e "
    const fs = require('fs');
    fs.writeFileSync('$FAIL_FILE', JSON.stringify({
      count: $COUNT,
      max: $MAX_FAILURES,
      last_failure: new Date().toISOString(),
      last_command: process.env.TOOL_INPUT || ''
    }, null, 2));
  " 2>/dev/null

  if [ "$COUNT" -ge "$MAX_FAILURES" ]; then
    echo ""
    echo "🔴 CIRCUIT BREAKER: ${COUNT}회 연속 실패 — 한계 도달!"
    echo "   자동 조치:"
    echo "   1. 현재 변경사항을 git stash로 보존합니다"
    echo "   2. 실패 로그를 .udesigner/failure-log.md에 기록합니다"
    echo ""
    echo "   → 더 이상 같은 접근으로 수정하지 마세요."
    echo "   → 실패 원인을 분석하고 다른 전략을 세우세요."
    echo "   → 유저에게 에스컬레이션을 고려하세요."
    echo ""

    # Auto-stash
    cd "$(git rev-parse --show-toplevel 2>/dev/null || echo '.')"
    STASH_MSG="circuit-breaker: ${COUNT} consecutive failures at $(date +%Y-%m-%dT%H:%M:%S)"
    git stash push -m "$STASH_MSG" 2>/dev/null

    if [ $? -eq 0 ]; then
      echo "   ✓ git stash 완료: \"$STASH_MSG\""
      echo "   ✓ 복구: git stash pop"
    else
      echo "   ⚠ git stash 실패 (변경사항 없음 또는 git 미설정)"
    fi

    # Log failure
    FAIL_LOG="$(dirname "$0")/failure-log.md"
    echo "" >> "$FAIL_LOG"
    echo "## Circuit Break — $(date +%Y-%m-%dT%H:%M:%S)" >> "$FAIL_LOG"
    echo "- Consecutive failures: $COUNT" >> "$FAIL_LOG"
    echo "- Last command: $TOOL_INPUT" >> "$FAIL_LOG"
    echo "- Action: git stash applied" >> "$FAIL_LOG"

    # Reset counter
    node -e "
      const fs = require('fs');
      fs.writeFileSync('$FAIL_FILE', JSON.stringify({ count: 0, max: $MAX_FAILURES, reset_at: new Date().toISOString(), reason: 'circuit breaker triggered' }, null, 2));
    " 2>/dev/null
  else
    REMAINING=$((MAX_FAILURES - COUNT))
    echo ""
    echo "⚠️  CIRCUIT BREAKER: ${COUNT}/${MAX_FAILURES} 연속 실패 (남은 기회: ${REMAINING})"
    echo "   → 같은 접근 반복 금지. 다른 전략을 시도하세요."
  fi
else
  # Success — reset counter
  if [ "$COUNT" -gt 0 ]; then
    node -e "
      const fs = require('fs');
      fs.writeFileSync('$FAIL_FILE', JSON.stringify({ count: 0, max: $MAX_FAILURES, reset_at: new Date().toISOString(), reason: 'success' }, null, 2));
    " 2>/dev/null
  fi
fi

exit 0
