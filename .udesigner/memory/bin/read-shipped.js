#!/usr/bin/env node
/**
 * read_shipped — Lossless recall of a single shipped entry.
 *
 * Usage:
 *   node .udesigner/memory/bin/read-shipped.js <slug> [--parts node,tokens,prompt,fingerprint]
 *   node .udesigner/memory/bin/read-shipped.js 2026-04-05-catalis --parts tokens,prompt
 *
 * Slug matching:
 *   - Accepts full id (2026-04-05-catalis) or short slug (catalis)
 *   - Short slug resolves to most recent matching shipped entry
 *
 * Parts:
 *   node          → node.json (metadata)
 *   tokens        → tokens.json
 *   prompt        → prompt.md (raw text)
 *   fingerprint   → source-fingerprint.json
 *   all (default) → everything above
 */

const fs = require('fs');
const path = require('path');

const MEMORY_ROOT = path.resolve(__dirname, '..');
const SHIPPED_DIR = path.join(MEMORY_ROOT, 'shipped');

const PART_FILES = {
  node: { name: 'node.json', json: true },
  tokens: { name: 'tokens.json', json: true },
  prompt: { name: 'prompt.md', json: false },
  fingerprint: { name: 'source-fingerprint.json', json: true },
};

function parseArgs(argv) {
  const args = { slug: '', parts: ['node', 'tokens', 'prompt', 'fingerprint'] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--parts' || a === '-p') {
      const raw = argv[++i] || '';
      if (raw === 'all') {
        args.parts = Object.keys(PART_FILES);
      } else {
        args.parts = raw.split(',').map(s => s.trim()).filter(Boolean);
      }
    } else if (!a.startsWith('--') && !args.slug) {
      args.slug = a;
    }
  }
  return args;
}

function resolveSlug(slug) {
  if (!fs.existsSync(SHIPPED_DIR)) return null;
  const entries = fs.readdirSync(SHIPPED_DIR).filter(e =>
    fs.statSync(path.join(SHIPPED_DIR, e)).isDirectory()
  );
  // Exact id match
  if (entries.includes(slug)) return slug;
  // Short slug match — find entries ending with `-<slug>`
  const matches = entries
    .filter(e => e.endsWith(`-${slug}`) || e === slug)
    .sort()
    .reverse(); // most recent first (ids are date-prefixed)
  return matches[0] || null;
}

function readPart(entryDir, partKey) {
  const def = PART_FILES[partKey];
  if (!def) return { error: `unknown part: ${partKey}` };
  const file = path.join(entryDir, def.name);
  if (!fs.existsSync(file)) return { missing: true };
  const raw = fs.readFileSync(file, 'utf8');
  return def.json ? { data: JSON.parse(raw) } : { data: raw };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.slug) {
    console.error('Usage: read-shipped.js <slug> [--parts node,tokens,prompt,fingerprint|all]');
    process.exit(2);
  }

  const resolvedId = resolveSlug(args.slug);
  if (!resolvedId) {
    console.log(JSON.stringify({ slug: args.slug, found: false, error: 'no matching shipped entry' }, null, 2));
    process.exit(1);
  }

  const entryDir = path.join(SHIPPED_DIR, resolvedId);
  const result = {
    slug: args.slug,
    resolved_id: resolvedId,
    found: true,
    parts: {},
  };

  for (const p of args.parts) {
    result.parts[p] = readPart(entryDir, p);
  }

  console.log(JSON.stringify(result, null, 2));
}

main();
