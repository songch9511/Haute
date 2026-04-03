#!/bin/bash
# Session Resume — 새 대화에서 이전 세션 컨텍스트 자동 주입
# PreToolUse hook으로 모든 도구 첫 호출 시 실행.
# session.json이 있고 완료되지 않은 진행 중 세션이면 컨텍스트를 주입한다.
# 한 번 주입 후에는 resumed 플래그로 중복 주입 방지.

UDESIGNER_DIR="$(dirname "$0")"
SESSION_FILE="$UDESIGNER_DIR/session.json"
RESUME_FLAG="$UDESIGNER_DIR/.resumed"

# Already resumed in this session — skip
[ -f "$RESUME_FLAG" ] && exit 0

# No session to resume
[ -f "$SESSION_FILE" ] || exit 0

CONTEXT=$(node -e "
const fs = require('fs');

try {
  const s = JSON.parse(fs.readFileSync('$SESSION_FILE', 'utf8'));

  // Skip if session was completed
  if (s.completed_at) {
    process.exit(0);
  }

  // Skip if idle with no meaningful state
  if (s.phase === 'idle' && (!s.task || !s.task.name)) {
    process.exit(0);
  }

  const lines = [];
  lines.push('');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('🔄 SESSION RESUME — 이전 세션 복원');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('');

  if (s.task && s.task.name) {
    lines.push('  태스크: ' + s.task.name);
  }
  if (s.task && s.task.command) {
    lines.push('  커맨드: ' + s.task.command);
  }
  if (s.task && s.task.intent_class) {
    lines.push('  분류: ' + s.task.intent_class);
  }
  lines.push('  현재 단계: ' + (s.phase || 'unknown'));
  lines.push('  세션 ID: ' + (s.session_id || 'none'));
  lines.push('  마지막 업데이트: ' + (s.updated_at || 'unknown'));

  if (s.sections) {
    if (s.sections.completed && s.sections.completed.length > 0) {
      lines.push('  완료 섹션: ' + s.sections.completed.join(', '));
    }
    if (s.sections.in_progress) {
      lines.push('  진행 중: ' + s.sections.in_progress);
    }
    if (s.sections.remaining && s.sections.remaining.length > 0) {
      lines.push('  남은 섹션: ' + s.sections.remaining.join(', '));
    }
  }

  if (s.failures && s.failures.count > 0) {
    lines.push('  연속 실패: ' + s.failures.count + '/3');
  }

  if (s.spec) {
    lines.push('  스펙 파일: ' + s.spec);
  }

  if (s.oracle_results && s.oracle_results.length > 0) {
    const last = s.oracle_results[s.oracle_results.length - 1];
    lines.push('  마지막 Oracle: ' + (last.verdict || '') + ' (score: ' + (last.score || '?') + ')');
  }

  lines.push('');
  lines.push('  → 이 세션을 이어서 진행하세요.');
  lines.push('  → phase.json 현재 단계: ' + (s.phase || 'idle'));
  lines.push('  → 새로 시작하려면 phase.json을 idle로 리셋하세요.');
  lines.push('');

  console.log(lines.join('\n'));
} catch(e) {
  process.exit(0);
}
" 2>/dev/null)

if [ -n "$CONTEXT" ]; then
  echo "$CONTEXT"
  # Mark as resumed to prevent duplicate injection
  touch "$RESUME_FLAG"
fi

exit 0
