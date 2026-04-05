#!/usr/bin/env node

/**
 * UDesigner Composite Score — Pillar B (Phase 3 v1)
 *
 * Aggregates three lanes into a single weighted composite:
 *
 *   Visual Lane    45% — vision-model judgment (verifier/visual-oracle.js)
 *   Code Lane      40% — AST / token rules    (verifier/code-oracle.js)
 *   Mechanical     15% — Playwright runtime   (verifier/checks/*.spec.ts)
 *
 * Each lane is optional. When a lane is absent, its weight is redistributed
 * proportionally across the remaining lanes. A run with only Code Lane (no
 * server running, no visual verdict yet) is still a valid composite — the
 * weights renormalize.
 *
 * Usage:
 *   node composite-score.js [--url <url>] [--target-dir <dir>] \
 *                           [--visual-verdict <json>] [--skip-mechanical] \
 *                           [--reference <url>] [--out <json>]
 *
 * Inputs by lane:
 *   Visual — either --visual-verdict <file> (pre-computed) or skipped
 *   Code   — --target-dir <dir> of .tsx sources (defaults to examples/dimension/src)
 *   Mech   — --url <url> for Playwright (defaults to VERIFY_URL env or skipped)
 */

const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const WEIGHTS_FULL = { visual: 0.45, code: 0.40, mechanical: 0.15 };
const ROOT = __dirname;

function parseArgs(argv) {
  const args = {
    url: null,
    targetDir: null,
    visualVerdict: null,
    skipMechanical: false,
    skipCode: false,
    skipVisual: false,
    reference: null,
    out: null,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--url') args.url = argv[++i];
    else if (a === '--target-dir') args.targetDir = argv[++i];
    else if (a === '--visual-verdict') args.visualVerdict = argv[++i];
    else if (a === '--skip-mechanical') args.skipMechanical = true;
    else if (a === '--skip-code') args.skipCode = true;
    else if (a === '--skip-visual') args.skipVisual = true;
    else if (a === '--reference') args.reference = argv[++i];
    else if (a === '--out') args.out = argv[++i];
    // Legacy flags for backward compat
    else if (a.startsWith('--url=')) args.url = a.split('=').slice(1).join('=');
    else if (a.startsWith('--reference=')) args.reference = a.split('=').slice(1).join('=');
  }
  return args;
}

// ─────────────────────────────────────────────────────────────────
// Visual Lane — read pre-computed verdict
// ─────────────────────────────────────────────────────────────────

function recomputeVisualComposite(scores) {
  if (!scores) return null;
  const keys = ['first_impression_impact', 'composition_balance', 'typography_drama', 'color_harmony', 'ai_slop_smell', 'agency_tier_similarity'];
  for (const k of keys) {
    if (typeof scores[k] !== 'number') return null;
  }
  const sum =
    scores.first_impression_impact +
    scores.composition_balance +
    scores.typography_drama +
    scores.color_harmony +
    (11 - scores.ai_slop_smell) +
    scores.agency_tier_similarity;
  return Math.max(0, Math.min(100, Math.round((sum / 6) * 10)));
}

function runVisualLane(verdictPath) {
  if (!verdictPath) return { present: false, reason: 'no --visual-verdict provided' };
  if (!fs.existsSync(verdictPath)) return { present: false, reason: `verdict file not found: ${verdictPath}` };
  try {
    const verdict = JSON.parse(fs.readFileSync(verdictPath, 'utf8'));
    // Always recompute from scores — agent-reported composite_visual is advisory only.
    // This is the design invariant: the script is source of truth for arithmetic,
    // the agent is source of truth for the 1-10 judgments.
    const computed = recomputeVisualComposite(verdict.scores);
    if (computed === null) {
      return { present: false, reason: 'verdict missing valid scores object' };
    }
    return {
      present: true,
      score: computed,
      reported_score: typeof verdict.composite_visual === 'number' ? verdict.composite_visual : null,
      score_drift: typeof verdict.composite_visual === 'number' ? computed - verdict.composite_visual : null,
      raw_verdict: verdict,
      critique_count: (verdict.critique || []).length,
      weakest: verdict.weakest_section || null,
      suggested_fix: verdict.suggested_fix || null,
    };
  } catch (e) {
    return { present: false, reason: `verdict parse error: ${e.message}` };
  }
}

// ─────────────────────────────────────────────────────────────────
// Code Lane — invoke code-oracle
// ─────────────────────────────────────────────────────────────────

function runCodeLane(targetDir) {
  if (!targetDir) return { present: false, reason: 'no --target-dir provided' };
  // Resolve relative to the caller's cwd (project root typically), not ROOT (verifier/)
  const resolved = path.resolve(process.cwd(), targetDir);
  if (!fs.existsSync(resolved)) return { present: false, reason: `target dir not found: ${resolved}` };
  try {
    const result = spawnSync('node', [path.join(ROOT, 'code-oracle.js'), resolved, '--json'], {
      cwd: ROOT,
      encoding: 'utf8',
      maxBuffer: 20 * 1024 * 1024,
    });
    if (result.status !== 0 && !result.stdout) {
      return { present: false, reason: result.stderr || 'code-oracle failed' };
    }
    const report = JSON.parse(result.stdout);
    return {
      present: true,
      score: report.score,
      errors: report.summary.error || 0,
      warnings: report.summary.warn || 0,
      info: report.summary.info || 0,
      files: report.files_scanned,
      rules_run: report.rules_run.length,
    };
  } catch (e) {
    return { present: false, reason: `code-oracle error: ${e.message}` };
  }
}

// ─────────────────────────────────────────────────────────────────
// Mechanical Lane — Playwright runtime checks
// ─────────────────────────────────────────────────────────────────

function runMechanicalLane(targetUrl) {
  if (!targetUrl) return { present: false, reason: 'no --url provided (Playwright needs a live URL)' };
  try {
    execSync('npx playwright test --reporter=json', {
      cwd: ROOT,
      env: { ...process.env, VERIFY_URL: targetUrl },
      stdio: ['pipe', 'pipe', 'pipe'],
      maxBuffer: 20 * 1024 * 1024,
    });
  } catch (e) {
    // Playwright exits non-zero on test failure — results.json is still written
  }
  const resultsPath = path.join(ROOT, 'results.json');
  if (!fs.existsSync(resultsPath)) {
    return { present: false, reason: 'Playwright results.json not produced' };
  }
  try {
    const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
    const all = [];
    (function walk(s) {
      if (!s) return;
      if (Array.isArray(s.specs)) all.push(...s.specs);
      if (Array.isArray(s.suites)) s.suites.forEach(walk);
    })({ suites: results.suites || [] });
    if (all.length === 0) return { present: false, reason: 'no playwright specs found in results' };
    const passed = all.filter(spec =>
      (spec.tests || []).every(t => (t.results || []).some(r => r.status === 'passed' || r.status === 'expected'))
    ).length;
    const score = Math.round((passed / all.length) * 100);
    return {
      present: true,
      score,
      passed,
      total: all.length,
    };
  } catch (e) {
    return { present: false, reason: `results parse error: ${e.message}` };
  }
}

// ─────────────────────────────────────────────────────────────────
// Composite aggregation — weight renormalization for missing lanes
// ─────────────────────────────────────────────────────────────────

function composite(lanes) {
  const present = Object.entries(lanes).filter(([, l]) => l.present);
  if (present.length === 0) {
    return { composite: null, reason: 'no lanes present', effective_weights: {} };
  }
  const totalWeight = present.reduce((sum, [name]) => sum + WEIGHTS_FULL[name], 0);
  const effective = {};
  let score = 0;
  for (const [name, lane] of present) {
    const w = WEIGHTS_FULL[name] / totalWeight;
    effective[name] = Math.round(w * 1000) / 1000;
    score += lane.score * w;
  }
  return {
    composite: Math.round(score),
    effective_weights: effective,
    lanes_present: present.map(([n]) => n),
  };
}

// ─────────────────────────────────────────────────────────────────
// Verdict thresholds
// ─────────────────────────────────────────────────────────────────

function thresholdVerdict(score) {
  if (score === null) return 'UNSCORED';
  if (score >= 90) return 'APPROVE';
  if (score >= 70) return 'APPROVE_WARNING';
  return 'REJECT';
}

// ─────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────

function main() {
  const args = parseArgs(process.argv.slice(2));

  console.log('\n🎯 UDesigner Composite Verification (Pillar B, 3-lane)\n');

  const lanes = {};

  // Visual Lane
  if (!args.skipVisual) {
    const visual = runVisualLane(args.visualVerdict);
    lanes.visual = visual;
    if (visual.present) {
      const drift = visual.score_drift != null && visual.score_drift !== 0
        ? `  (recomputed from scores; agent reported ${visual.reported_score}, drift ${visual.score_drift >= 0 ? '+' : ''}${visual.score_drift})`
        : '';
      console.log(`   Visual:     ${visual.score}/100  (45%)${drift}`);
    } else {
      console.log(`   Visual:     — skipped (${visual.reason})`);
    }
  }

  // Code Lane
  if (!args.skipCode) {
    const targetDir = args.targetDir || process.env.CODE_TARGET_DIR;
    const code = runCodeLane(targetDir);
    lanes.code = code;
    if (code.present) {
      console.log(`   Code:       ${code.score}/100  (40%)  — ${code.errors} err, ${code.warnings} warn, ${code.info} info  across ${code.files} files`);
    } else {
      console.log(`   Code:       — skipped (${code.reason})`);
    }
  }

  // Mechanical Lane
  if (!args.skipMechanical) {
    const url = args.url || process.env.VERIFY_URL;
    const mech = runMechanicalLane(url);
    lanes.mechanical = mech;
    if (mech.present) {
      console.log(`   Mechanical: ${mech.score}/100  (15%)  — ${mech.passed}/${mech.total} specs passed`);
    } else {
      console.log(`   Mechanical: — skipped (${mech.reason})`);
    }
  }

  const comp = composite(lanes);
  const verdict = thresholdVerdict(comp.composite);

  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  COMPOSITE SCORE: ${comp.composite ?? 'N/A'}${comp.composite != null ? '/100' : ''}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  if (comp.composite != null) {
    console.log(`  Lanes present: ${comp.lanes_present.join(', ')}`);
    console.log(`  Effective weights (renormalized): ${JSON.stringify(comp.effective_weights)}`);
    const icon = verdict === 'APPROVE' ? '✅' : verdict === 'APPROVE_WARNING' ? '⚠️ ' : verdict === 'REJECT' ? '❌' : '—';
    console.log(`  Verdict: ${icon} ${verdict}`);
  } else {
    console.log(`  ${comp.reason}`);
  }
  console.log('');

  const output = {
    composite_score: comp.composite,
    verdict,
    lanes,
    effective_weights: comp.effective_weights,
    lanes_present: comp.lanes_present || [],
    target_url: args.url,
    target_dir: args.targetDir,
    reference_url: args.reference,
    timestamp: new Date().toISOString(),
  };

  const outPath = args.out || path.join(ROOT, 'composite-results.json');
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2));

  process.exit(comp.composite == null ? 2 : (comp.composite >= 70 ? 0 : 1));
}

main();
