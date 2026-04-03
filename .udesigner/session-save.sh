#!/bin/bash
# Session Save — TPE 상태 자동 저장
# phase.json 변경을 감지하여 session.json에 전체 컨텍스트를 저장한다.
# PostToolUse hook으로 Edit|Write 후 실행: phase.json 변경 시만 동작.
#
# session.json 구조:
# {
#   "session_id": "uuid",
#   "task": { "name": "", "command": "", "intent_class": "" },
#   "phase": "think|plan|execute|verify|wisdom|idle",
#   "spec": "spec 파일 경로 (있으면)",
#   "sections": { "completed": [], "in_progress": "", "remaining": [] },
#   "tokens": { "typography": "", "colors": "", "layout": "" },
#   "failures": { "count": 0, "log": [] },
#   "oracle_results": [],
#   "updated_at": "ISO timestamp"
# }

UDESIGNER_DIR="$(dirname "$0")"
PHASE_FILE="$UDESIGNER_DIR/phase.json"
SESSION_FILE="$UDESIGNER_DIR/session.json"

# Only run if phase.json was just edited
if ! echo "$TOOL_INPUT" | grep -q "phase.json"; then
  exit 0
fi

[ -f "$PHASE_FILE" ] || exit 0

node -e "
const fs = require('fs');
const path = require('path');

const phaseFile = '$PHASE_FILE';
const sessionFile = '$SESSION_FILE';

try {
  const phase = JSON.parse(fs.readFileSync(phaseFile, 'utf8'));

  // Load existing session or create new
  let session = {};
  if (fs.existsSync(sessionFile)) {
    try { session = JSON.parse(fs.readFileSync(sessionFile, 'utf8')); } catch(e) {}
  }

  // Generate session_id if new
  if (!session.session_id) {
    session.session_id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  // Update phase
  session.phase = phase.phase || 'idle';

  // Preserve task info from phase.json
  if (phase.task) {
    session.task = Object.assign(session.task || {}, { name: phase.task });
  }
  if (phase.command) {
    session.task = Object.assign(session.task || {}, { command: phase.command });
  }
  if (phase.intent_class) {
    session.task = Object.assign(session.task || {}, { intent_class: phase.intent_class });
  }

  // Initialize sections tracking if not present
  if (!session.sections) {
    session.sections = { completed: [], in_progress: null, remaining: [] };
  }

  // Load failure count
  const failFile = path.join('$UDESIGNER_DIR', 'failures.json');
  if (fs.existsSync(failFile)) {
    try {
      const f = JSON.parse(fs.readFileSync(failFile, 'utf8'));
      session.failures = { count: f.count || 0 };
    } catch(e) {}
  }

  // Phase transition log
  if (!session.phase_log) session.phase_log = [];
  session.phase_log.push({
    phase: session.phase,
    at: new Date().toISOString()
  });
  // Keep only last 20 transitions
  if (session.phase_log.length > 20) {
    session.phase_log = session.phase_log.slice(-20);
  }

  // If transitioning to idle, mark session as complete
  if (session.phase === 'idle' && session.phase_log.length > 1) {
    const prevPhase = session.phase_log[session.phase_log.length - 2];
    if (prevPhase && prevPhase.phase === 'wisdom') {
      session.completed_at = new Date().toISOString();
    }
  }

  session.updated_at = new Date().toISOString();

  fs.writeFileSync(sessionFile, JSON.stringify(session, null, 2));
} catch(e) {
  // Silent fail — don't break the hook chain
}
" 2>/dev/null

exit 0
