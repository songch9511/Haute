# UDesigner Memory Schema (Pillar A v1)

> CoMeT-inspired 3-tier memory tree. Visual + structural intent store, not anti-pattern log.
>
> **Write policy**: Phase 0-1 = manual append via Wisdom. Phase 5 = automatic via Sensor + Compactor.
>
> **Read policy**: `sum.md` always loaded in system prompt. `clusters/*` loaded when triggers match. `shipped/*` read only via memory tools.

## Directory Layout

```
.udesigner/memory/
├── schema.md                     # this file
├── sum.md                        # Tier 1 — always loaded, taste summary (1 paragraph)
├── triggers.json                 # keyword → shipped IDs map (for trigger-path RAG)
│
├── clusters/                     # Tier 2 — loaded on trigger match
│   ├── <cluster-name>.md         # cluster summary + representative shipped refs
│   └── index.json                # cluster centroids + metadata
│
└── shipped/                      # Tier 3 — tool-call access only
    └── <yyyy-mm-dd>-<slug>/
        ├── node.json             # metadata + references
        ├── prompt.md             # original prompt (reconstructed if backfilled)
        ├── tokens.json           # extracted design tokens
        ├── source-fingerprint.json  # AST-level structural summary
        ├── taste-embedding.json  # (Phase 4+) vision-extracted aesthetic vector
        └── screenshot.png        # (Phase 3+) captured output
```

## Tier 1 — `sum.md`

**Purpose**: Top-level taste profile. Always injected into Execute system prompt.

**Constraints**:
- ≤ 1 paragraph (≤ 400 chars recommended)
- Contains: aesthetic tendencies, cluster distribution, strong don'ts
- No project-specific details (those live in clusters/shipped)
- Rewritten by Compactor when cluster distribution shifts, never by hand in Phase 5+

## Tier 2 — `clusters/<name>.md`

**Purpose**: Mid-level aesthetic grouping. Loaded when trigger-path or visual-path RAG matches.

**Required sections**:
1. **Name + 1-line description**
2. **Representative shipped** — 2-4 shipped IDs (most canonical examples)
3. **Signature tokens** — color · type · spacing fingerprint
4. **Signature patterns** — recurring layout/motion choices
5. **Anti-patterns** — what this cluster explicitly avoids

**`clusters/index.json`**:
```json
{
  "<cluster-name>": {
    "centroid_embedding": [/* Phase 4+ vector */],
    "member_count": 0,
    "tags": ["..."],
    "last_updated": "<iso8601>"
  }
}
```

## Tier 3 — `shipped/<id>/node.json`

**Purpose**: Canonical metadata pointer for a single shipped design.

**Schema**:
```json
{
  "id": "<yyyy-mm-dd>-<slug>",
  "slug": "<short-name>",
  "title": "<human title>",
  "created_at": "<iso8601>",
  "cluster": "<cluster-name>",
  "tags": ["tag1", "tag2"],
  "triggers": ["keyword1", "keyword2"],
  "source": {
    "paths": ["path/to/source/file.tsx"],
    "commit": "<git sha>",
    "snapshot_dir": null
  },
  "verdict": {
    "composite": null,
    "visual": null,
    "code": null,
    "mechanical": null
  },
  "artifacts": {
    "screenshot_desktop": null,
    "screenshot_mobile": null,
    "embedding": null
  },
  "parent": null,
  "status": "shipped | candidate | archived"
}
```

**`source.paths`** is the canonical way to reference code. For reproducibility, `source.commit` pins to the git state at ship time. `snapshot_dir` is optional — used only when `paths` points outside the repo or when the source will move.

## Tier 3 — `tokens.json`

**Purpose**: Design-token distillation for Code Lane comparison and Visual Lane reference.

**Schema**:
```json
{
  "color": {
    "background": ["#fafafa"],
    "foreground": ["#131313"],
    "accent": ["#0054f9"],
    "muted": ["#6b7280"]
  },
  "typography": {
    "display_family": "cormorant",
    "body_family": "roboto",
    "display_scale": ["clamp(2.5rem, 5vw, 4.5rem)"],
    "body_scale": ["0.875rem", "1rem", "1.125rem"],
    "tracking": { "display": "-0.04em", "eyebrow": "0.08rem" }
  },
  "spacing": {
    "section_padding": ["h-screen p-3", "..."],
    "container": "max-w-[80rem]",
    "radius_large": "1.5rem",
    "radius_card": "32px"
  },
  "motion": {
    "signature_springs": ["gentle", "snappy"],
    "entry_distance": "y: 80",
    "stagger_delay": "0.1"
  }
}
```

## Tier 3 — `source-fingerprint.json`

**Purpose**: AST-level structural summary for Code Lane retrieval and comparison.

**Phase 0 form** (lightweight — hand/script-generated):
```json
{
  "component_count": 12,
  "client_components": 8,
  "motion_usage": { "framer_motion": true, "custom_wrapper": "@/components/motion" },
  "layout_patterns": {
    "hero": "center-stack + fan-spread-cards",
    "sections": ["split", "grid", "..."]
  },
  "banned_patterns_used": [],
  "ast_fingerprint": null
}
```

**Phase 2+ form** — replaced by ast-grep output (structural hash of JSX tree).

## Tier 3 — `prompt.md`

**Purpose**: Original user intent. Enables trigger-path RAG and post-hoc reasoning.

For backfilled entries (Phase 0), reconstruct from memory or note as reconstructed. Format:
```markdown
# <Title>

**Source**: original | reconstructed | inferred
**Intent**: <1-2 line summary>

<Full prompt text or reconstruction>
```

## Tier 3 — `taste-embedding.json` *(Phase 4+)*

Vector from vision model over `screenshot_desktop`. Used by visual-path RAG. Placeholder until Phase 4.

---

## Invariants

1. **Every `shipped/<id>/` MUST have** `node.json`, `prompt.md`, `tokens.json`, `source-fingerprint.json`. Missing optional fields are `null`, never absent.
2. **Cluster membership is exclusive** — each shipped belongs to exactly one cluster at a time (can migrate).
3. **`sum.md` is never edited by tools other than the Compactor** (Phase 5+) or intentional manual curation.
4. **Source files are not copied into `shipped/`** unless `snapshot_dir` is set; pointers + commit SHA are the norm.
5. **IDs are append-only** — renaming requires migration, deletion is archival (status: archived, not file deletion).
