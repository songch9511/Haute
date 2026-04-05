#!/usr/bin/env node
/**
 * read_cluster — Tier 2 access: cluster detail + index entry.
 *
 * Usage:
 *   node .udesigner/memory/bin/read-cluster.js <cluster-name>
 *   node .udesigner/memory/bin/read-cluster.js warm-editorial
 *   node .udesigner/memory/bin/read-cluster.js --list
 */

const fs = require('fs');
const path = require('path');

const MEMORY_ROOT = path.resolve(__dirname, '..');
const CLUSTERS_DIR = path.join(MEMORY_ROOT, 'clusters');
const INDEX_FILE = path.join(CLUSTERS_DIR, 'index.json');

function parseArgs(argv) {
  const args = { name: '', list: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--list' || a === '-l') args.list = true;
    else if (!a.startsWith('--') && !args.name) args.name = a;
  }
  return args;
}

function readIndex() {
  if (!fs.existsSync(INDEX_FILE)) return { clusters: {} };
  return JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8'));
}

function readDetail(name) {
  const file = path.join(CLUSTERS_DIR, `${name}.md`);
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, 'utf8');
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const index = readIndex();

  if (args.list) {
    console.log(JSON.stringify({
      clusters: Object.keys(index.clusters || {}),
      index,
    }, null, 2));
    return;
  }

  if (!args.name) {
    console.error('Usage: read-cluster.js <cluster-name> | --list');
    process.exit(2);
  }

  const entry = (index.clusters || {})[args.name];
  const detail = readDetail(args.name);

  if (!entry && !detail) {
    console.log(JSON.stringify({ name: args.name, found: false }, null, 2));
    process.exit(1);
  }

  console.log(JSON.stringify({
    name: args.name,
    found: true,
    index_entry: entry || null,
    detail_md: detail || null,
  }, null, 2));
}

main();
