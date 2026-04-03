#!/bin/bash
# Boulder Hook — Todo Enforcer
# Sisyphus-inspired: mechanically prevents premature completion claims.
# Runs as PostToolUse hook. Reads .udesigner/tasks.json (written by the agent
# at each TaskCreate/TaskUpdate) and warns if incomplete tasks remain.
#
# Exit 0 = pass (message is advisory), non-zero would block (we only advise).

TASKS_FILE="$(dirname "$0")/tasks.json"

# If no task file exists, nothing to enforce
[ -f "$TASKS_FILE" ] || exit 0

# Count incomplete tasks (status != "completed" and status != "deleted")
INCOMPLETE=$(node -e "
  try {
    const tasks = JSON.parse(require('fs').readFileSync('$TASKS_FILE', 'utf8'));
    const incomplete = tasks.filter(t => t.status !== 'completed' && t.status !== 'deleted');
    if (incomplete.length > 0) {
      console.log('⚠️  BOULDER: ' + incomplete.length + '개 태스크 미완료:');
      incomplete.forEach(t => console.log('   [' + t.status + '] ' + t.subject));
      console.log('   → 모든 태스크 완료 전까지 \"완료\" 선언 금지.');
    }
  } catch(e) {}
" 2>/dev/null)

if [ -n "$INCOMPLETE" ]; then
  echo "$INCOMPLETE"
fi

exit 0
