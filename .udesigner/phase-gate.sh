#!/bin/bash
# Phase Gate — Plan Phase Tool-Block
# Sisyphus-inspired: physically blocks Write/Edit on implementation files
# during Think or Plan phases. The agent writes phase.json to declare
# the current TPE phase; this hook reads it and blocks if needed.
#
# Runs as PreToolUse hook on Edit|Write.
# Exit 0 = allow, Exit 2 = block with message.

PHASE_FILE="$(dirname "$0")/phase.json"

# If no phase file, allow (not in TPE flow)
[ -f "$PHASE_FILE" ] || exit 0

# Read current phase
PHASE=$(node -e "
  try {
    const p = JSON.parse(require('fs').readFileSync('$PHASE_FILE', 'utf8'));
    console.log(p.phase || 'execute');
  } catch(e) { console.log('execute'); }
" 2>/dev/null)

# Only block during think or plan phases
if [ "$PHASE" = "think" ] || [ "$PHASE" = "plan" ]; then
  # Check if the file being edited is an implementation file
  FILE_PATH="$TOOL_INPUT"
  if echo "$FILE_PATH" | grep -qE '\.(tsx|jsx|ts|js|css|scss|html|vue|svelte)$'; then
    # Allow edits to skill/config/spec files
    if echo "$FILE_PATH" | grep -qE '(skills/|\.claude/|\.udesigner/|verifier/|spec\.md|CLAUDE\.md)'; then
      exit 0
    fi
    echo "🚫 PHASE GATE: 현재 [$PHASE] 단계입니다."
    echo "   구현 파일(.tsx/.css 등) 편집은 Plan 승인 후 Execute 단계에서만 가능합니다."
    echo "   → phase.json을 'execute'로 변경한 뒤 진행하세요."
    exit 2
  fi
fi

exit 0
