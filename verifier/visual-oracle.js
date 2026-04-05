#!/usr/bin/env node
/**
 * Visual Oracle Runner — Pillar B, Visual Lane (Phase 3 v1)
 *
 * Deterministic wrapper around the vision-agent judgment step. Does the
 * scaffolding work (screenshot capture, prompt assembly, verdict validation,
 * score calculation) so the driving agent only has to call the sub-agent
 * with the pre-assembled payload.
 *
 * Three modes:
 *   1. --capture <url>  → only capture desktop + mobile screenshots, emit paths
 *   2. --payload <url>  → capture + print ready-to-paste agent prompt
 *   3. --verdict <json> → validate a verdict file against the schema and score it
 *
 * The actual vision call happens outside this script — the driving Claude
 * session uses the Agent tool with a vision-capable sub-agent and pastes
 * this script's payload output. The sub-agent returns JSON which is piped
 * back via --verdict for scoring.
 *
 * Usage:
 *   node verifier/visual-oracle.js --capture http://localhost:3000/catalis
 *   node verifier/visual-oracle.js --payload http://localhost:3000/catalis
 *   node verifier/visual-oracle.js --verdict path/to/verdict.json
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const VERIFIER_ROOT = __dirname;
const PROJECT_ROOT = path.resolve(VERIFIER_ROOT, '..');
const SCHEMA_PATH = path.join(VERIFIER_ROOT, 'visual-oracle-schema.json');
const PROMPT_PATH = path.join(VERIFIER_ROOT, 'visual-oracle.md');
const CAPTURE_DIR = path.join(VERIFIER_ROOT, '.visual-oracle-captures');
const FEEDBACK_DIGEST_PATH = path.join(PROJECT_ROOT, '.udesigner', 'feedback-digest.json');

function parseArgs(argv) {
  const args = { mode: null, value: null, reference: null, out: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--capture') { args.mode = 'capture'; args.value = argv[++i]; }
    else if (a === '--payload') { args.mode = 'payload'; args.value = argv[++i]; }
    else if (a === '--verdict') { args.mode = 'verdict'; args.value = argv[++i]; }
    else if (a === '--reference') { args.reference = argv[++i]; }
    else if (a === '--out') { args.out = argv[++i]; }
  }
  return args;
}

function ensureCaptureDir() {
  if (!fs.existsSync(CAPTURE_DIR)) fs.mkdirSync(CAPTURE_DIR, { recursive: true });
}

function slugifyUrl(url) {
  return url.replace(/^https?:\/\//, '').replace(/[^\w.-]+/g, '_').slice(0, 80);
}

// ─────────────────────────────────────────────────────────────────
// Capture via Playwright — inline script
// ─────────────────────────────────────────────────────────────────

function captureScreenshots(url) {
  ensureCaptureDir();
  const slug = slugifyUrl(url);
  const desktop = path.join(CAPTURE_DIR, `${slug}-desktop.png`);
  const mobile = path.join(CAPTURE_DIR, `${slug}-mobile.png`);

  const script = `
    const { chromium } = require('playwright');
    (async () => {
      const browser = await chromium.launch();
      try {
        // Desktop
        const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        const pageD = await desktop.newPage();
        await pageD.goto(${JSON.stringify(url)}, { waitUntil: 'networkidle', timeout: 30000 });
        await pageD.waitForTimeout(800);
        await pageD.screenshot({ path: ${JSON.stringify(desktop)}, fullPage: true });
        await desktop.close();
        // Mobile
        const mobile = await browser.newContext({ viewport: { width: 375, height: 812 } });
        const pageM = await mobile.newPage();
        await pageM.goto(${JSON.stringify(url)}, { waitUntil: 'networkidle', timeout: 30000 });
        await pageM.waitForTimeout(800);
        await pageM.screenshot({ path: ${JSON.stringify(mobile)}, fullPage: true });
        await mobile.close();
      } finally {
        await browser.close();
      }
    })().catch(e => { console.error('capture error:', e.message); process.exit(2); });
  `;
  const result = spawnSync('node', ['-e', script], { cwd: VERIFIER_ROOT, encoding: 'utf8' });
  if (result.status !== 0) {
    return { ok: false, error: result.stderr || result.stdout || 'capture failed', desktop: null, mobile: null };
  }
  return {
    ok: fs.existsSync(desktop) && fs.existsSync(mobile),
    desktop,
    mobile,
  };
}

// ─────────────────────────────────────────────────────────────────
// Payload assembly — prompt for sub-agent
// ─────────────────────────────────────────────────────────────────

function loadFeedbackDigest() {
  if (!fs.existsSync(FEEDBACK_DIGEST_PATH)) return '';
  try {
    const digest = JSON.parse(fs.readFileSync(FEEDBACK_DIGEST_PATH, 'utf8'));
    if (!digest.rejected_patterns || digest.rejected_patterns.length === 0) return '';
    const lines = [
      '',
      '## User Feedback History (auto-injected)',
      '',
      'The user has **explicitly rejected** these visual patterns in prior sessions. Penalize them in your scoring:',
      '',
    ];
    for (const r of digest.rejected_patterns) {
      lines.push(`- **${r.pattern}**: ${r.context}`);
    }
    if (digest.validated_approaches && digest.validated_approaches.length > 0) {
      lines.push('', 'Patterns the user has **validated** (do not penalize):');
      for (const v of digest.validated_approaches) {
        lines.push(`- **${v.pattern}**: ${v.context}`);
      }
    }
    lines.push('');
    return lines.join('\n');
  } catch { return ''; }
}

function buildAgentPayload(url, captures, reference) {
  const promptContent = fs.existsSync(PROMPT_PATH) ? fs.readFileSync(PROMPT_PATH, 'utf8') : '(visual-oracle.md missing)';
  const feedbackSection = loadFeedbackDigest();
  const schemaContent = fs.existsSync(SCHEMA_PATH) ? fs.readFileSync(SCHEMA_PATH, 'utf8') : '{}';

  return {
    instructions: promptContent + feedbackSection,
    schema: JSON.parse(schemaContent),
    target: url,
    reference: reference || null,
    desktop_screenshot: captures.desktop,
    mobile_screenshot: captures.mobile,
    invocation_hint: [
      'Invoke via Agent tool:',
      '  subagent_type: general-purpose (or vision-capable preset)',
      '  description: "Visual Oracle — independent design critic"',
      '  prompt: (paste instructions above, then attach desktop_screenshot and mobile_screenshot paths via Read tool calls)',
      '',
      'Sub-agent MUST:',
      '  - Read both screenshot paths via the Read tool',
      '  - Produce ONLY a JSON object matching the schema',
      '  - Write the JSON to a file and pipe back to: node verifier/visual-oracle.js --verdict <file>',
    ].join('\n'),
  };
}

// ─────────────────────────────────────────────────────────────────
// Verdict validation + scoring
// ─────────────────────────────────────────────────────────────────

function validateVerdict(verdict) {
  const required = ['scores', 'composite_visual', 'verdict', 'critique', 'weakest_section', 'suggested_fix'];
  for (const key of required) {
    if (!(key in verdict)) return { ok: false, error: `missing field: ${key}` };
  }
  const scores = verdict.scores;
  const scoreKeys = ['first_impression_impact', 'composition_balance', 'typography_drama', 'color_harmony', 'ai_slop_smell', 'agency_tier_similarity'];
  for (const k of scoreKeys) {
    if (typeof scores[k] !== 'number' || scores[k] < 1 || scores[k] > 10) {
      return { ok: false, error: `scores.${k} must be integer 1-10, got ${scores[k]}` };
    }
  }
  if (!['APPROVE', 'APPROVE_WARNING', 'REJECT'].includes(verdict.verdict)) {
    return { ok: false, error: `verdict must be APPROVE | APPROVE_WARNING | REJECT` };
  }
  if (!Array.isArray(verdict.critique)) return { ok: false, error: 'critique must be array' };
  return { ok: true };
}

function computeCompositeVisual(scores) {
  // AI slop is inverse — subtract from 11
  const total =
    scores.first_impression_impact +
    scores.composition_balance +
    scores.typography_drama +
    scores.color_harmony +
    (11 - scores.ai_slop_smell) +
    scores.agency_tier_similarity;
  return Math.max(0, Math.min(100, Math.round((total / 6) * 10)));
}

function thresholdVerdict(composite) {
  if (composite >= 90) return 'APPROVE';
  if (composite >= 70) return 'APPROVE_WARNING';
  return 'REJECT';
}

// ─────────────────────────────────────────────────────────────────
// Mode handlers
// ─────────────────────────────────────────────────────────────────

function handleCapture(args) {
  if (!args.value) { console.error('--capture requires a URL'); process.exit(2); }
  console.error(`Capturing ${args.value}...`);
  const result = captureScreenshots(args.value);
  if (!result.ok) {
    console.log(JSON.stringify({ ok: false, error: result.error || 'capture failed' }, null, 2));
    process.exit(1);
  }
  console.log(JSON.stringify({ ok: true, desktop: result.desktop, mobile: result.mobile }, null, 2));
}

function handlePayload(args) {
  if (!args.value) { console.error('--payload requires a URL'); process.exit(2); }
  const captures = captureScreenshots(args.value);
  if (!captures.ok) {
    console.log(JSON.stringify({ ok: false, error: captures.error || 'capture failed' }, null, 2));
    process.exit(1);
  }
  const payload = buildAgentPayload(args.value, captures, args.reference);
  if (args.out) {
    fs.writeFileSync(args.out, JSON.stringify(payload, null, 2));
    console.error(`Payload written to ${args.out}`);
    console.log(JSON.stringify({ ok: true, out: args.out, desktop: captures.desktop, mobile: captures.mobile }));
  } else {
    console.log(JSON.stringify(payload, null, 2));
  }
}

function handleVerdict(args) {
  if (!args.value) { console.error('--verdict requires a file path'); process.exit(2); }
  if (!fs.existsSync(args.value)) { console.error(`file not found: ${args.value}`); process.exit(2); }
  let verdict;
  try {
    verdict = JSON.parse(fs.readFileSync(args.value, 'utf8'));
  } catch (e) {
    console.error(`invalid JSON: ${e.message}`);
    process.exit(1);
  }
  const validation = validateVerdict(verdict);
  if (!validation.ok) {
    console.log(JSON.stringify({ ok: false, error: validation.error, verdict }, null, 2));
    process.exit(1);
  }
  const computed = computeCompositeVisual(verdict.scores);
  const recommended = thresholdVerdict(computed);
  const reportedMatches = computed === verdict.composite_visual;
  const verdictMatches = recommended === verdict.verdict;

  const report = {
    ok: true,
    target: verdict.target || null,
    composite_visual: {
      reported: verdict.composite_visual,
      computed,
      matches: reportedMatches,
    },
    verdict: {
      reported: verdict.verdict,
      recommended,
      matches: verdictMatches,
    },
    scores: verdict.scores,
    critique_count: verdict.critique.length,
    weakest_section: verdict.weakest_section,
    suggested_fix: verdict.suggested_fix,
  };
  console.log(JSON.stringify(report, null, 2));
  // Exit 0 if valid and >= 70, 1 if valid but rejected
  process.exit(computed >= 70 ? 0 : 1);
}

// ─────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.mode) {
    console.error('Usage:');
    console.error('  visual-oracle.js --capture <url>');
    console.error('  visual-oracle.js --payload <url> [--reference <url>] [--out <file>]');
    console.error('  visual-oracle.js --verdict <json-file>');
    process.exit(2);
  }
  if (args.mode === 'capture') handleCapture(args);
  else if (args.mode === 'payload') handlePayload(args);
  else if (args.mode === 'verdict') handleVerdict(args);
}

main();
