#!/usr/bin/env node
/**
 * memory_search — Phase 1 keyword-path retrieval (trigger matching).
 *
 * Usage:
 *   node .udesigner/memory/bin/search.js "query words" [--k 3]
 *   node .udesigner/memory/bin/search.js --query "pricing brutalist" --k 5
 *
 * Output: JSON array of matched shipped entries, ranked by trigger-match score.
 *
 * Phase 4 will replace this with dual-path RAG (visual + trigger + RRF).
 */

const fs = require('fs');
const path = require('path');

const MEMORY_ROOT = path.resolve(__dirname, '..');
const SHIPPED_DIR = path.join(MEMORY_ROOT, 'shipped');
const TRIGGERS_FILE = path.join(MEMORY_ROOT, 'triggers.json');

function parseArgs(argv) {
  const args = { query: '', k: 3 };
  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--k' || a === '-k') {
      args.k = parseInt(argv[++i], 10) || 3;
    } else if (a === '--query' || a === '-q') {
      args.query = argv[++i] || '';
    } else if (a.startsWith('--')) {
      continue;
    } else {
      positional.push(a);
    }
  }
  if (!args.query && positional.length) args.query = positional.join(' ');
  return args;
}

function tokenize(str) {
  return str
    .toLowerCase()
    .split(/[\s,]+/)
    .map(t => t.trim())
    .filter(Boolean);
}

function readJSON(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function scoreShippedByTriggers(query, triggersMap) {
  const tokens = tokenize(query);
  const scores = new Map(); // shippedId -> { score, matched: Set<trigger> }

  for (const [trigger, shippedIds] of Object.entries(triggersMap)) {
    const triggerLower = trigger.toLowerCase();
    let matchWeight = 0;
    for (const tok of tokens) {
      if (triggerLower.includes(tok) || tok.includes(triggerLower)) {
        // longer matches score higher
        matchWeight += Math.min(tok.length, triggerLower.length) / 4;
      }
    }
    if (matchWeight === 0) continue;
    for (const id of shippedIds) {
      if (!scores.has(id)) scores.set(id, { score: 0, matched: new Set() });
      const entry = scores.get(id);
      entry.score += matchWeight;
      entry.matched.add(trigger);
    }
  }

  return scores;
}

function summarizeShipped(id) {
  const nodeFile = path.join(SHIPPED_DIR, id, 'node.json');
  if (!fs.existsSync(nodeFile)) return null;
  const node = readJSON(nodeFile);
  return {
    id: node.id,
    slug: node.slug,
    title: node.title,
    cluster: node.cluster,
    tags: node.tags,
    created_at: node.created_at,
    source_paths_count: (node.source && node.source.paths) ? node.source.paths.length : 0,
    source_commit: node.source ? node.source.commit : null,
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.query) {
    console.error('Usage: search.js "query" [--k N]');
    process.exit(2);
  }

  if (!fs.existsSync(TRIGGERS_FILE)) {
    console.log(JSON.stringify({ query: args.query, k: args.k, results: [], reason: 'no triggers.json' }, null, 2));
    return;
  }

  const triggers = readJSON(TRIGGERS_FILE);
  const scores = scoreShippedByTriggers(args.query, triggers.map || {});

  const ranked = [...scores.entries()]
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, args.k)
    .map(([id, entry]) => {
      const summary = summarizeShipped(id);
      return {
        ...summary,
        score: Number(entry.score.toFixed(2)),
        matched_triggers: [...entry.matched],
      };
    })
    .filter(Boolean);

  console.log(JSON.stringify({
    query: args.query,
    k: args.k,
    total_candidates: scores.size,
    results: ranked,
  }, null, 2));
}

main();
