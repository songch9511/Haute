# Memory Tools — Pillar A v1

Agent-facing policy for invoking the 3-tier memory system via CLI tools.

## Mental Model

UDesigner memory is a **CoMeT-inspired 3-tier tree** stored under `.udesigner/memory/`:

- **Tier 1 — `sum.md`**: always loaded in system prompt. Top-level taste profile, cluster distribution, strong don'ts. Never call a tool to read this — it is ambient context.
- **Tier 2 — `clusters/<name>.md`**: loaded when a keyword trigger matches. Contains cluster signature tokens + anti-patterns + representative shipped references.
- **Tier 3 — `shipped/<id>/`**: tool-call access only. Individual past shipped designs — node metadata, tokens, prompt, source fingerprint.

**Principle**: keep working context small. Pull from Tier 2 only on trigger match. Reach into Tier 3 only when you need concrete anchors (past source, exact tokens).

## The 3 Tools

All three are Node.js CLIs under `.udesigner/memory/bin/`. Call via Bash.

### 1. `memory_search` — keyword/trigger retrieval

```bash
node .udesigner/memory/bin/search.js "query words" --k 3
```

**When to call**: at the start of Think phase, right after Intent classification. Use the user's prompt keywords (e.g., "fintech landing editorial vibe") as the query.

**Output**: JSON with ranked list of matching shipped IDs + cluster + tags + matched triggers.

**Phase 1 limitation**: substring match only. Phase 4 upgrades to dual-path RAG (vector + trigger + RRF).

### 2. `read_cluster` — Tier 2 access

```bash
node .udesigner/memory/bin/read-cluster.js warm-editorial
node .udesigner/memory/bin/read-cluster.js --list
```

**When to call**: after `memory_search` returns hits, read the cluster of the top 1-2 results. This pulls signature tokens and anti-patterns into context.

**Output**: JSON with `index_entry` (metadata) + `detail_md` (full cluster markdown).

### 3. `read_shipped` — Tier 3 access (lossless recall)

```bash
node .udesigner/memory/bin/read-shipped.js catalis --parts tokens,prompt
node .udesigner/memory/bin/read-shipped.js 2026-04-05-catalis --parts all
```

**Parts**: `node`, `tokens`, `prompt`, `fingerprint`, or `all` (default).

**When to call**:
- **At Plan**: read top-1 shipped's `tokens` + `prompt` to anchor token choices.
- **During Execute**: read `fingerprint` if you need to match past layout structure; read specific `tokens` keys when uncertain about a value.
- **Never dump `all` into context unless absolutely needed** — prefer partial reads.

**Slug matching**: accepts full id (`2026-04-05-catalis`) or short slug (`catalis`). Short slug resolves to most recent match.

## Call Discipline (Budget Rules)

1. **One `memory_search` per session** — at Think start. Re-run only if the intent fundamentally shifts.
2. **≤ 2 `read_cluster` calls per session** — one for primary cluster, optionally one for contrast cluster.
3. **≤ 3 `read_shipped` calls per session** — for top matches only. Each call should request minimal `--parts` (usually `tokens` or `prompt`, not `all`).
4. **Never recall raw source code directly** — if you need a pattern, read `fingerprint` first to see if the pattern exists, then read the actual source file via the Read tool using the path from `node.source.paths`.

## Example Flow (Think phase)

```
User: "Build a pricing page for a fintech SaaS, editorial vibe"

Step 1 — memory_search:
  $ node .udesigner/memory/bin/search.js "fintech pricing editorial" --k 3
  → 1 hit: 2026-04-05-catalis (cluster: warm-editorial)

Step 2 — read_cluster:
  $ node .udesigner/memory/bin/read-cluster.js warm-editorial
  → signature tokens, anti-patterns, representative shipped

Step 3 — read_shipped (targeted):
  $ node .udesigner/memory/bin/read-shipped.js catalis --parts tokens,prompt
  → concrete color palette, type scale, past intent

Step 4 — Use results as generation anchor in Plan/Execute.
```

## When Memory is Silent

If `memory_search` returns 0 hits:
- Do not force a match. The prompt intent is novel relative to shipped history.
- Fall back to `sum.md` guidance + skills (taste-core, anti-slop, layout-patterns).
- After successful Execute, the new shipped entry will expand the corpus for next time.

## Invariants (Agent Must Respect)

1. **Tools are read-only**. No memory writes from Execute phase. Memory Push happens in Wisdom phase (Phase 1 = manual; Phase 5 = automatic via Sensor/Compactor).
2. **Partial reads preferred**. `--parts tokens` is cheaper than `--parts all`.
3. **Tool output is JSON**. Parse before acting — do not paraphrase raw output into decisions.
4. **Clusters are exclusive**. A shipped entry belongs to exactly one cluster. Do not cross-reference clusters unless explicitly contrasting.
5. **`sum.md` is ground truth for top-level taste**. If a cluster contradicts `sum.md`, trust `sum.md` and flag the conflict.
