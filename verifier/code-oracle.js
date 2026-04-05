#!/usr/bin/env node
/**
 * UDesigner Code Oracle — Pillar B, Code Lane (Phase 2 v1)
 *
 * AST-level structural + token checks on source files. Replaces the regex-based
 * quick-lint.js and absorbs anti-slop-scan / layout-diversity checks into a
 * single deterministic verifier.
 *
 * Usage:
 *   node verifier/code-oracle.js <target-dir> [--json] [--rules r1,r2]
 *   node verifier/code-oracle.js examples/dimension/src/components/catalis
 *
 * Rule layers:
 *   L2 — AST structural (JSX shape, motion props, imports)
 *   L3 — Token adherence (hex literals, arbitrary Tailwind values)
 *   L4 — (reserved for LLM code review, not implemented in Phase 2)
 *
 * Dependencies: @babel/parser, @babel/traverse
 *
 * Exit code: 0 if zero errors, 1 if any errors, 2 on fatal.
 */

const fs = require('fs');
const path = require('path');

let parser, traverse;
try {
  parser = require('@babel/parser');
  traverse = require('@babel/traverse').default;
} catch (err) {
  console.error('Code Oracle requires @babel/parser and @babel/traverse.');
  console.error('Install: cd verifier && npm install --save-dev @babel/parser @babel/traverse');
  process.exit(2);
}

// ─────────────────────────────────────────────────────────────────
// File discovery
// ─────────────────────────────────────────────────────────────────

function walkTsxFiles(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  const stat = fs.statSync(dir);
  if (stat.isFile()) {
    if (dir.endsWith('.tsx') || dir.endsWith('.jsx')) out.push(dir);
    return out;
  }
  for (const entry of fs.readdirSync(dir)) {
    if (entry === 'node_modules' || entry.startsWith('.') || entry === 'dist' || entry === 'build') continue;
    const full = path.join(dir, entry);
    const s = fs.statSync(full);
    if (s.isDirectory()) out.push(...walkTsxFiles(full));
    else if (full.endsWith('.tsx') || full.endsWith('.jsx')) out.push(full);
  }
  return out;
}

function parseFile(file) {
  const code = fs.readFileSync(file, 'utf8');
  try {
    const ast = parser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
      errorRecovery: true,
    });
    return { ast, code, file };
  } catch (err) {
    return { ast: null, code, file, parseError: err.message };
  }
}

// ─────────────────────────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────────────────────────

function isClassNameAttr(attr) {
  return attr.type === 'JSXAttribute' && (attr.name.name === 'className' || attr.name.name === 'class');
}

function getStringLiteralClassName(attr) {
  if (!isClassNameAttr(attr) || !attr.value) return null;
  if (attr.value.type === 'StringLiteral') return attr.value.value;
  // Template literals with no interpolation
  if (attr.value.type === 'JSXExpressionContainer') {
    const expr = attr.value.expression;
    if (expr.type === 'StringLiteral') return expr.value;
    if (expr.type === 'TemplateLiteral' && expr.expressions.length === 0) {
      return expr.quasis.map(q => q.value.cooked).join('');
    }
  }
  return null;
}

function getOpeningElementName(node) {
  if (node.type !== 'JSXElement') return null;
  const opening = node.openingElement.name;
  if (opening.type === 'JSXIdentifier') return opening.name;
  if (opening.type === 'JSXMemberExpression') {
    // e.g., motion.div — return "motion.div"
    const obj = opening.object.type === 'JSXIdentifier' ? opening.object.name : '?';
    const prop = opening.property.type === 'JSXIdentifier' ? opening.property.name : '?';
    return `${obj}.${prop}`;
  }
  return null;
}

function getAttr(openingElement, name) {
  for (const attr of openingElement.attributes || []) {
    if (attr.type === 'JSXAttribute' && attr.name.name === name) return attr;
  }
  return null;
}

function fileBaseName(file) {
  return path.basename(file, path.extname(file));
}

function isHeroFile(file) {
  const base = fileBaseName(file).toLowerCase();
  return base === 'hero' || base.startsWith('hero-') || base.endsWith('-hero');
}

// ─────────────────────────────────────────────────────────────────
// Rule definitions
// Each rule: { id, severity, category, description, run(parsed) → violations[] }
// A violation: { file, line?, message }
// ─────────────────────────────────────────────────────────────────

const rules = [];

// L2.1 — useInView on hero
rules.push({
  id: 'no-useInView-on-hero',
  severity: 'error',
  category: 'motion',
  description: 'hero components must animate immediately on mount, not via useInView (it hides content until scrolled)',
  run({ ast, file }) {
    if (!isHeroFile(file) || !ast) return [];
    const violations = [];
    traverse(ast, {
      ImportSpecifier(pathNode) {
        if (pathNode.node.imported && pathNode.node.imported.name === 'useInView') {
          violations.push({ file, line: pathNode.node.loc && pathNode.node.loc.start.line, message: 'useInView imported in hero component — hero must use immediate animate' });
        }
      },
      CallExpression(pathNode) {
        const callee = pathNode.node.callee;
        if (callee.type === 'Identifier' && callee.name === 'useInView') {
          violations.push({ file, line: pathNode.node.loc && pathNode.node.loc.start.line, message: 'useInView() called in hero component' });
        }
      },
    });
    return violations;
  },
});

// L2.2 — Motion animate props limited to transform/opacity
const ALLOWED_MOTION_PROPS = new Set([
  'x', 'y', 'z',
  'opacity',
  'scale', 'scaleX', 'scaleY',
  'rotate', 'rotateX', 'rotateY', 'rotateZ',
  'skew', 'skewX', 'skewY',
  'translateX', 'translateY',
]);
rules.push({
  id: 'motion-transform-opacity-only',
  severity: 'error',
  category: 'motion',
  description: 'framer-motion animate/initial/exit props must use transform or opacity only (x/y/scale/rotate/opacity)',
  run({ ast, file }) {
    if (!ast) return [];
    const violations = [];
    const MOTION_ATTRS = new Set(['initial', 'animate', 'exit', 'whileHover', 'whileTap', 'whileInView']);

    traverse(ast, {
      JSXOpeningElement(pathNode) {
        const name = pathNode.node.name;
        // Only motion.* or Motion* components
        const elName = name.type === 'JSXMemberExpression'
          ? (name.object.name === 'motion' ? 'motion.' + (name.property.name || '') : null)
          : null;
        if (!elName) return;

        for (const attr of pathNode.node.attributes) {
          if (attr.type !== 'JSXAttribute' || !MOTION_ATTRS.has(attr.name.name)) continue;
          const value = attr.value;
          if (!value || value.type !== 'JSXExpressionContainer') continue;
          const expr = value.expression;
          if (expr.type !== 'ObjectExpression') continue;
          for (const prop of expr.properties) {
            if (prop.type !== 'ObjectProperty' && prop.type !== 'Property') continue;
            const key = prop.key;
            const keyName = key.type === 'Identifier' ? key.name : key.type === 'StringLiteral' ? key.value : null;
            if (!keyName) continue;
            if (!ALLOWED_MOTION_PROPS.has(keyName)) {
              violations.push({
                file,
                line: prop.loc && prop.loc.start.line,
                message: `motion prop "${attr.name.name}.${keyName}" is not in transform/opacity set — animate only x/y/scale/rotate/opacity`,
              });
            }
          }
        }
      },
    });
    return violations;
  },
});

// L2.3 — Bento pretender: grid-cols-3 with exactly 3 direct children that are structurally similar
rules.push({
  id: 'no-bento-pretender',
  severity: 'warn',
  category: 'layout',
  description: 'a 3-column grid with 3 equal-structure children is a "bento pretender" — use explicit span variation or a different layout',
  run({ ast, file }) {
    if (!ast) return [];
    const violations = [];
    traverse(ast, {
      JSXElement(pathNode) {
        const opening = pathNode.node.openingElement;
        const classAttr = opening.attributes.find(a => a.type === 'JSXAttribute' && a.name.name === 'className');
        if (!classAttr) return;
        const cls = getStringLiteralClassName(classAttr) || '';
        if (!/\bgrid\b/.test(cls) || !/\bgrid-cols-3\b/.test(cls)) return;
        // Count direct JSX element children (not whitespace text)
        const children = pathNode.node.children.filter(c => c.type === 'JSXElement' || c.type === 'JSXFragment');
        if (children.length !== 3) return;
        // Check if all three children have no col-span override
        const allEqual = children.every(child => {
          if (child.type !== 'JSXElement') return false;
          const childClass = child.openingElement.attributes.find(a => a.type === 'JSXAttribute' && a.name.name === 'className');
          const childCls = childClass ? (getStringLiteralClassName(childClass) || '') : '';
          return !/col-span-/.test(childCls);
        });
        if (allEqual) {
          violations.push({
            file,
            line: pathNode.node.loc && pathNode.node.loc.start.line,
            message: '3-column grid with 3 equal-structure children (no col-span variation) — looks like AI bento pretender',
          });
        }
      },
    });
    return violations;
  },
});

// L2.4 — h-screen / 100vh
rules.push({
  id: 'no-h-screen',
  severity: 'warn',
  category: 'layout',
  description: 'h-screen / 100vh is unreliable on mobile browsers — use min-h-[100dvh]',
  run({ ast, file, code }) {
    if (!ast) return [];
    const violations = [];
    traverse(ast, {
      JSXAttribute(pathNode) {
        if (pathNode.node.name.name !== 'className') return;
        const cls = getStringLiteralClassName(pathNode.node);
        if (!cls) return;
        if (/\bh-screen\b/.test(cls) || /\bmin-h-screen\b/.test(cls)) {
          violations.push({ file, line: pathNode.node.loc && pathNode.node.loc.start.line, message: 'h-screen / min-h-screen used — prefer min-h-[100dvh] for mobile reliability' });
        }
      },
    });
    return violations;
  },
});

// L2.5 — Purple-to-blue gradient (LILA BAN)
rules.push({
  id: 'no-purple-blue-gradient',
  severity: 'error',
  category: 'color',
  description: 'purple-to-blue / violet-to-indigo gradient is AI slop — pick a single accent color',
  run({ file, code }) {
    const violations = [];
    const lines = code.split('\n');
    lines.forEach((line, i) => {
      if (/(from-purple|from-violet)/.test(line) && /(to-blue|to-indigo)/.test(line)) {
        violations.push({ file, line: i + 1, message: 'purple/violet → blue/indigo gradient — LILA BAN' });
      }
    });
    return violations;
  },
});

// L2.6 — Pure black bg
rules.push({
  id: 'no-pure-black-bg',
  severity: 'warn',
  category: 'color',
  description: 'pure #000 background is flat and harsh — use near-black like #0e1011',
  run({ code, file }) {
    const violations = [];
    const lines = code.split('\n');
    lines.forEach((line, i) => {
      if (/\bbg-black\b/.test(line) && !/\bbg-black\/\d/.test(line)) {
        violations.push({ file, line: i + 1, message: 'bg-black — use near-black #0e1011 for softer contrast' });
      }
      if (/bg-\[#000000\]|bg-\[#000\]/.test(line)) {
        violations.push({ file, line: i + 1, message: 'bg-[#000000] literal — use near-black token' });
      }
    });
    return violations;
  },
});

// L2.7 — Placeholder names / lorem ipsum
rules.push({
  id: 'no-placeholder-content',
  severity: 'error',
  category: 'content',
  description: 'placeholder content (John Doe, Lorem ipsum, Acme Corp) breaks immersion',
  run({ code, file }) {
    const violations = [];
    const PLACEHOLDERS = [
      /\bJohn Doe\b/,
      /\bJane Doe\b/,
      /\bJane Smith\b/,
      /\bJohn Smith\b/,
      /\bAlex Johnson\b/,
      /lorem\s+ipsum/i,
      /\bAcme Corp\b/,
      /\bNova Corp\b/,
    ];
    const lines = code.split('\n');
    lines.forEach((line, i) => {
      for (const pat of PLACEHOLDERS) {
        if (pat.test(line)) {
          violations.push({ file, line: i + 1, message: `placeholder content detected: ${pat.source}` });
        }
      }
    });
    return violations;
  },
});

// L2.8 — Marketing fluff words
rules.push({
  id: 'no-marketing-fluff',
  severity: 'warn',
  category: 'content',
  description: 'generic marketing adjectives (Elevate, Seamless, Revolutionary) are AI filler',
  run({ code, file }) {
    const violations = [];
    const WORDS = ['Elevate', 'Seamless', 'Unleash', 'Empower', 'Supercharge', 'Revolutionary', 'Next-generation', 'Cutting-edge', 'Game-changing'];
    const lines = code.split('\n');
    lines.forEach((line, i) => {
      // Only consider JSX text, not import paths or comments
      if (line.trim().startsWith('//') || line.trim().startsWith('import')) return;
      for (const w of WORDS) {
        const re = new RegExp(`\\b${w}\\b`);
        if (re.test(line)) {
          violations.push({ file, line: i + 1, message: `marketing fluff "${w}" — be specific` });
        }
      }
    });
    return violations;
  },
});

// L2.9 — div with onClick (should be button)
rules.push({
  id: 'no-div-onclick',
  severity: 'warn',
  category: 'a11y',
  description: 'interactive <div onClick> should be <button> for accessibility',
  run({ ast, file }) {
    if (!ast) return [];
    const violations = [];
    traverse(ast, {
      JSXOpeningElement(pathNode) {
        if (pathNode.node.name.type !== 'JSXIdentifier' || pathNode.node.name.name !== 'div') return;
        for (const attr of pathNode.node.attributes) {
          if (attr.type === 'JSXAttribute' && attr.name.name === 'onClick') {
            violations.push({
              file,
              line: pathNode.node.loc && pathNode.node.loc.start.line,
              message: '<div onClick> — use <button> with type="button"',
            });
          }
        }
      },
    });
    return violations;
  },
});

// L2.10 — img without alt
rules.push({
  id: 'img-missing-alt',
  severity: 'warn',
  category: 'a11y',
  description: '<img> without alt attribute fails accessibility and SEO',
  run({ ast, file }) {
    if (!ast) return [];
    const violations = [];
    traverse(ast, {
      JSXOpeningElement(pathNode) {
        if (pathNode.node.name.type !== 'JSXIdentifier') return;
        if (pathNode.node.name.name !== 'img' && pathNode.node.name.name !== 'Image') return;
        const hasAlt = pathNode.node.attributes.some(a => a.type === 'JSXAttribute' && a.name.name === 'alt');
        if (!hasAlt) {
          violations.push({ file, line: pathNode.node.loc && pathNode.node.loc.start.line, message: `<${pathNode.node.name.name}> missing alt attribute` });
        }
      },
    });
    return violations;
  },
});

// L2.11 — Emoji in JSX text
rules.push({
  id: 'no-emoji-in-jsx',
  severity: 'warn',
  category: 'content',
  description: 'emoji in UI is usually AI slop — use a proper icon library',
  run({ code, file }) {
    const violations = [];
    const emojiRe = /[\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}]/u;
    const lines = code.split('\n');
    lines.forEach((line, i) => {
      if (line.trim().startsWith('//')) return;
      if (emojiRe.test(line)) {
        violations.push({ file, line: i + 1, message: 'emoji in source — use Phosphor / Lucide icons' });
      }
    });
    return violations;
  },
});

// L2.12 — AI-smell comments
rules.push({
  id: 'no-ai-smell-comments',
  severity: 'warn',
  category: 'code-quality',
  description: 'narration comments ("This component renders...") signal AI authorship',
  run({ code, file }) {
    const violations = [];
    const patterns = [
      /\/\/\s*This (component|function|hook|handler|method|module) /i,
      /\/\/\s*(Helper|Utility) (function|method) /i,
      /\/\/\s*(Handle|Process|Render|Setup|Initialize|Configure) the /i,
      /\/\*\*?\s*\n\s*\*?\s*(This|The|A) (component|function|hook) /i,
    ];
    const lines = code.split('\n');
    lines.forEach((line, i) => {
      for (const pat of patterns) {
        if (pat.test(line)) {
          violations.push({ file, line: i + 1, message: 'AI-smell comment — remove narration' });
          break;
        }
      }
    });
    return violations;
  },
});

// L2.13 — Section structure repetition (3+ consecutive <section> with identical className)
rules.push({
  id: 'no-section-repetition',
  severity: 'error',
  category: 'layout',
  description: '3+ consecutive <section> elements with identical className tokens is layout monotony',
  run({ ast, file }) {
    if (!ast) return [];
    const sectionClasses = [];
    traverse(ast, {
      JSXOpeningElement(pathNode) {
        if (pathNode.node.name.type !== 'JSXIdentifier' || pathNode.node.name.name !== 'section') return;
        const classAttr = pathNode.node.attributes.find(a => a.type === 'JSXAttribute' && a.name.name === 'className');
        const cls = classAttr ? (getStringLiteralClassName(classAttr) || '<dynamic>') : '<none>';
        const normalized = cls.trim().split(/\s+/).sort().join(' ');
        sectionClasses.push({ normalized, line: pathNode.node.loc && pathNode.node.loc.start.line });
      },
    });
    const violations = [];
    for (let i = 0; i < sectionClasses.length - 2; i++) {
      if (
        sectionClasses[i].normalized !== '<dynamic>' &&
        sectionClasses[i].normalized === sectionClasses[i + 1].normalized &&
        sectionClasses[i + 1].normalized === sectionClasses[i + 2].normalized
      ) {
        violations.push({
          file,
          line: sectionClasses[i].line,
          message: `3+ consecutive <section> with identical className ("${sectionClasses[i].normalized.slice(0, 60)}…")`,
        });
        break;
      }
    }
    return violations;
  },
});

// L2.14 — Uniform section padding (>60% same py-* class)
rules.push({
  id: 'uniform-section-padding',
  severity: 'warn',
  category: 'layout',
  description: '>60% of sections using the same vertical padding produces flat rhythm',
  run({ ast, file }) {
    if (!ast) return [];
    const pyValues = [];
    traverse(ast, {
      JSXOpeningElement(pathNode) {
        if (pathNode.node.name.type !== 'JSXIdentifier' || pathNode.node.name.name !== 'section') return;
        const classAttr = pathNode.node.attributes.find(a => a.type === 'JSXAttribute' && a.name.name === 'className');
        const cls = classAttr ? (getStringLiteralClassName(classAttr) || '') : '';
        const m = cls.match(/\bpy-[\w[\]]+/);
        if (m) pyValues.push(m[0]);
      },
    });
    if (pyValues.length < 3) return [];
    const freq = {};
    for (const v of pyValues) freq[v] = (freq[v] || 0) + 1;
    const max = Math.max(...Object.values(freq));
    const dominant = Object.keys(freq).find(k => freq[k] === max);
    if (max / pyValues.length > 0.6) {
      return [{
        file,
        message: `${Math.round((max / pyValues.length) * 100)}% of sections use "${dominant}" — vary vertical rhythm`,
      }];
    }
    return [];
  },
});

// L2.15 — Centered-everything detection
rules.push({
  id: 'centered-everything',
  severity: 'warn',
  category: 'layout',
  description: '>60% of sections using text-center reads as AI default — vary alignment',
  run({ ast, file }) {
    if (!ast) return [];
    let total = 0;
    let centered = 0;
    traverse(ast, {
      JSXElement(pathNode) {
        if (pathNode.node.openingElement.name.type !== 'JSXIdentifier' || pathNode.node.openingElement.name.name !== 'section') return;
        total += 1;
        // Serialize section innards
        const inner = JSON.stringify(pathNode.node);
        if (/"text-center"/.test(inner) || /text-center/.test(inner)) centered += 1;
      },
    });
    if (total < 3) return [];
    if (centered / total > 0.6) {
      return [{ file, message: `${centered}/${total} sections use text-center (${Math.round(centered / total * 100)}%) — vary alignment` }];
    }
    return [];
  },
});

// L2.16 — Arbitrary Tailwind hex literals (token bypass signal)
// Info-level: Phase 3+ will cross-ref shipped tokens.json to filter legitimate uses.
rules.push({
  id: 'arbitrary-hex-tailwind',
  severity: 'info',
  category: 'tokens',
  description: 'inline hex literals in Tailwind arbitrary values bypass the design token system',
  run({ code, file }) {
    const violations = [];
    const lines = code.split('\n');
    lines.forEach((line, i) => {
      const matches = line.match(/(bg|text|border|from|to|via|fill|stroke)-\[#[0-9a-fA-F]{3,8}\]/g);
      if (matches) {
        violations.push({ file, line: i + 1, message: `arbitrary hex in className: ${matches.slice(0, 3).join(', ')} — prefer token` });
      }
    });
    return violations;
  },
});

// L2.17 — External placeholder image services
rules.push({
  id: 'no-placeholder-image-service',
  severity: 'warn',
  category: 'content',
  description: 'placeholder image services (picsum, placeholder.com, via.placeholder) signal unfinished work',
  run({ code, file }) {
    const violations = [];
    const patterns = [
      { re: /picsum\.photos/, name: 'picsum.photos' },
      { re: /placeholder\.com/, name: 'placeholder.com' },
      { re: /via\.placeholder/, name: 'via.placeholder' },
      { re: /placehold\.co/, name: 'placehold.co' },
    ];
    const lines = code.split('\n');
    lines.forEach((line, i) => {
      for (const p of patterns) {
        if (p.re.test(line)) {
          violations.push({ file, line: i + 1, message: `placeholder image service: ${p.name}` });
        }
      }
    });
    return violations;
  },
});

// L2.18 — Over-commenting (>15% comment lines)
rules.push({
  id: 'over-commenting',
  severity: 'warn',
  category: 'code-quality',
  description: 'excessive comments signal AI over-narration',
  run({ code, file }) {
    const lines = code.split('\n');
    if (lines.length < 20) return [];
    const commentLines = lines.filter(l => /^\s*\/\//.test(l)).length;
    const ratio = commentLines / lines.length;
    if (ratio > 0.15) {
      return [{ file, message: `${Math.round(ratio * 100)}% comment lines (${commentLines}/${lines.length}) — remove obvious narration` }];
    }
    return [];
  },
});

// L2.19 — <div role="button"> without keyboard handler
rules.push({
  id: 'div-role-button-no-keyboard',
  severity: 'warn',
  category: 'a11y',
  description: '<div role="button"> must also handle keyboard (Enter/Space) or use a real button',
  run({ ast, file }) {
    if (!ast) return [];
    const violations = [];
    traverse(ast, {
      JSXOpeningElement(pathNode) {
        if (pathNode.node.name.type !== 'JSXIdentifier' || pathNode.node.name.name !== 'div') return;
        const roleAttr = pathNode.node.attributes.find(a => a.type === 'JSXAttribute' && a.name.name === 'role');
        if (!roleAttr || roleAttr.value.type !== 'StringLiteral' || roleAttr.value.value !== 'button') return;
        const hasKeyHandler = pathNode.node.attributes.some(a => a.type === 'JSXAttribute' && /^onKey/.test(a.name.name));
        if (!hasKeyHandler) {
          violations.push({ file, line: pathNode.node.loc && pathNode.node.loc.start.line, message: '<div role="button"> without onKeyDown/onKeyPress — prefer <button>' });
        }
      },
    });
    return violations;
  },
});

// L2.20 — background shorthand with gradient (should be backgroundImage + backgroundColor)
rules.push({
  id: 'no-background-gradient-shorthand',
  severity: 'warn',
  category: 'css',
  description: 'CSS `background: linear-gradient(...)` shorthand erases backgroundColor fallback — use backgroundImage + backgroundColor separately',
  run({ code, file }) {
    const violations = [];
    const lines = code.split('\n');
    lines.forEach((line, i) => {
      // Match `background:` (not background-color:, background-image:) with gradient
      if (/(?:^|[\s{;])background\s*:\s*(linear|radial|conic)-gradient/.test(line)) {
        violations.push({ file, line: i + 1, message: 'background shorthand + gradient — split into backgroundImage + backgroundColor' });
      }
    });
    return violations;
  },
});

// ─────────────────────────────────────────────────────────────────
// L2.21–L2.25 — sum.md don'ts sync (v3.2 post-mortem)
// ─────────────────────────────────────────────────────────────────

// L2.21 — whileInView on non-hero body sections
rules.push({
  id: 'no-whileInView-on-body',
  severity: 'error',
  category: 'motion',
  description: 'whileInView on body sections creates invisible void in Playwright fullPage capture — use immediate animate with delay',
  run({ ast, file }) {
    if (!ast || isHeroFile(file)) return [];
    const violations = [];
    traverse(ast, {
      JSXAttribute(pathNode) {
        if (pathNode.node.name.name === 'whileInView') {
          violations.push({
            file,
            line: pathNode.node.loc && pathNode.node.loc.start.line,
            message: 'whileInView on body section — Playwright fullPage won\'t trigger viewport intersection; use animate with delay instead',
          });
        }
      },
    });
    return violations;
  },
});

// L2.22 — box-shadow on cards/panels/surfaces
rules.push({
  id: 'no-box-shadow-on-surface',
  severity: 'error',
  category: 'color',
  description: 'box-shadow on card/panel surfaces is visual noise — use border or elevation via spacing only',
  run({ code, file }) {
    const violations = [];
    const lines = code.split('\n');
    lines.forEach((line, i) => {
      // shadow-* in Tailwind className (exclude shadow-none, shadow-inner, hover:shadow-*)
      if (/\bshadow-(?!none|inner)/.test(line) && !/\/\//.test(line.split('shadow')[0])) {
        // Skip hover-only shadows (intentional interaction feedback)
        if (/hover:shadow-/.test(line) && !/\bshadow-(?!none|inner)/.test(line.replace(/hover:shadow-\S+/g, ''))) return;
        // Check if it's in a className context (rough heuristic)
        if (/className/.test(line) || /class=/.test(line) || /`[^`]*shadow-/.test(line)) {
          violations.push({
            file,
            line: i + 1,
            message: 'shadow-* on element — remove for flat design; use border-[0.5px] or spacing for depth',
          });
        }
      }
      // Inline boxShadow style prop
      if (/boxShadow\s*:/.test(line) && !/\/\//.test(line.split('boxShadow')[0])) {
        violations.push({
          file,
          line: i + 1,
          message: 'boxShadow inline style — remove entirely or use border for separation',
        });
      }
    });
    return violations;
  },
});

// L2.23 — gratuitous section dividers (border-b spam on headings/sections)
rules.push({
  id: 'no-gratuitous-dividers',
  severity: 'warn',
  category: 'layout',
  description: 'border-b dividers on headings/sections are decorative noise in modern design — keep only if structurally essential',
  run({ code, file }) {
    const violations = [];
    let borderBCount = 0;
    const lines = code.split('\n');
    lines.forEach((line, i) => {
      if (/\bborder-b\b/.test(line) && /className/.test(line)) {
        borderBCount++;
        if (borderBCount > 2) {
          violations.push({
            file,
            line: i + 1,
            message: `border-b divider #${borderBCount} — likely gratuitous; modern design uses spacing/color-shift for separation`,
          });
        }
      }
    });
    return violations;
  },
});

// L2.24 — undefined CSS variable fonts (silent fallback to serif)
rules.push({
  id: 'no-undefined-css-var-fonts',
  severity: 'error',
  category: 'css',
  description: 'CSS var(--font-*) usage must have a matching definition in layout.tsx or globals.css — silent fallback causes wrong font rendering',
  run({ code, file }) {
    const violations = [];
    const lines = code.split('\n');
    const basename = file.split('/').pop() || '';
    if (basename === 'layout.tsx' || basename === 'globals.css') return [];

    // Walk up to find layout.tsx and globals.css, collect defined --font-* vars
    const definedVars = new Set();
    let dir = path.dirname(file);
    for (let depth = 0; depth < 8; depth++) {
      for (const candidate of ['layout.tsx', 'globals.css']) {
        const candidatePath = path.join(dir, candidate);
        if (fs.existsSync(candidatePath)) {
          const content = fs.readFileSync(candidatePath, 'utf8');
          const varMatches = content.match(/--font-[\w-]+/g);
          if (varMatches) varMatches.forEach(v => definedVars.add('var(' + v + ')'));
        }
      }
      // Also check app/ directory structure (Next.js convention)
      const appDir = path.join(dir, 'app');
      if (fs.existsSync(appDir)) {
        for (const candidate of ['layout.tsx', 'globals.css']) {
          const candidatePath = path.join(appDir, candidate);
          if (fs.existsSync(candidatePath)) {
            const content = fs.readFileSync(candidatePath, 'utf8');
            const varMatches = content.match(/--font-[\w-]+/g);
            if (varMatches) varMatches.forEach(v => definedVars.add('var(' + v + ')'));
          }
        }
      }
      const parent = path.dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }

    lines.forEach((line, i) => {
      const matches = line.match(/var\(--font-[\w-]+\)/g);
      if (matches) {
        for (const m of matches) {
          if (!definedVars.has(m)) {
            violations.push({
              file,
              line: i + 1,
              message: `${m} — not found in any layout.tsx or globals.css up the directory tree; undefined vars silently fall back to browser default serif`,
            });
          }
        }
      }
    });
    return violations;
  },
});

// L2.25 — Wikimedia upload path URLs (frequent 404s, hotlink-unfriendly)
rules.push({
  id: 'no-wikimedia-upload-path',
  severity: 'error',
  category: 'content',
  description: 'upload.wikimedia.org URLs are unstable (404, throttled) — use Unsplash API or local assets',
  run({ code, file }) {
    const violations = [];
    const lines = code.split('\n');
    lines.forEach((line, i) => {
      if (/upload\.wikimedia\.org\/wikipedia\/commons\//.test(line)) {
        violations.push({
          file,
          line: i + 1,
          message: 'Wikimedia Commons URL — unstable for production; use curated assets or Unsplash',
        });
      }
    });
    return violations;
  },
});

// L2.26 — motion initial opacity:0 on non-interactive elements (invisible before JS hydration)
rules.push({
  id: 'no-motion-initial-opacity-zero',
  severity: 'warn',
  category: 'motion',
  description: 'motion.* with initial={{ opacity: 0 }} hides content until JS loads — use CSS @keyframes for section-level reveals',
  run({ code, file }) {
    const violations = [];
    const lines = code.split('\n');
    lines.forEach((line, i) => {
      // Detect <motion.div/section/etc with initial={{ opacity: 0
      if (/initial\s*=\s*\{\s*\{[^}]*opacity\s*:\s*0/.test(line)) {
        // Skip if it's whileHover/whileTap context (interactive, OK)
        if (/whileHover|whileTap|AnimatePresence|exit\s*=/.test(line)) return;
        // Check surrounding lines for interactive context
        const context = lines.slice(Math.max(0, i - 2), Math.min(lines.length, i + 3)).join(' ');
        if (/whileHover|whileTap|AnimatePresence|exit\s*=|layoutId/.test(context)) return;
        violations.push({
          file,
          line: i + 1,
          message: 'motion initial={{ opacity: 0 }} — content invisible until JS hydrates; use CSS @keyframes animation for section reveals instead',
        });
      }
    });
    return violations;
  },
});

// ─────────────────────────────────────────────────────────────────
// Runner
// ─────────────────────────────────────────────────────────────────

function runRulesOnFile(parsed, enabledRules) {
  const all = [];
  for (const rule of enabledRules) {
    try {
      const vios = rule.run(parsed) || [];
      for (const v of vios) {
        all.push({ ...v, rule: rule.id, severity: rule.severity, category: rule.category });
      }
    } catch (err) {
      all.push({ rule: rule.id, severity: 'error', category: 'meta', file: parsed.file, message: `rule threw: ${err.message}` });
    }
  }
  return all;
}

function main() {
  const argv = process.argv.slice(2);
  const args = { target: '', json: false, rules: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--json') args.json = true;
    else if (a === '--rules') args.rules = argv[++i].split(',').map(s => s.trim());
    else if (!a.startsWith('--') && !args.target) args.target = a;
  }

  if (!args.target) {
    console.error('Usage: code-oracle.js <target-dir-or-file> [--json] [--rules r1,r2]');
    process.exit(2);
  }

  const files = walkTsxFiles(args.target);
  if (files.length === 0) {
    console.error(`No .tsx/.jsx files in ${args.target}`);
    process.exit(2);
  }

  const enabled = args.rules ? rules.filter(r => args.rules.includes(r.id)) : rules;
  if (enabled.length === 0) {
    console.error(`No matching rules. Available: ${rules.map(r => r.id).join(', ')}`);
    process.exit(2);
  }

  const report = {
    target: args.target,
    files_scanned: files.length,
    rules_run: enabled.map(r => r.id),
    violations: [],
    summary: { error: 0, warn: 0, info: 0 },
    by_rule: {},
    by_file: {},
  };

  for (const file of files) {
    const parsed = parseFile(file);
    if (parsed.parseError) {
      report.violations.push({ rule: '__parse_error__', severity: 'error', file, message: parsed.parseError });
      report.summary.error += 1;
      continue;
    }
    const vios = runRulesOnFile(parsed, enabled);
    for (const v of vios) {
      report.violations.push(v);
      report.summary[v.severity] = (report.summary[v.severity] || 0) + 1;
      report.by_rule[v.rule] = (report.by_rule[v.rule] || 0) + 1;
      const rel = path.relative(args.target, v.file);
      report.by_file[rel] = (report.by_file[rel] || 0) + 1;
    }
  }

  // Scoring: errors × 5, warnings × 1 (capped at 30 total warning penalty), info ignored.
  // Rationale: errors are high-confidence, warnings medium-confidence (cap prevents
  // a single noisy rule from dominating), info is reporting-only (awaits cross-ref).
  const errorPenalty = report.summary.error * 5;
  const warnPenalty = Math.min(30, report.summary.warn * 1);
  const score = Math.max(0, 100 - errorPenalty - warnPenalty);
  report.score = score;
  report.scoring = {
    formula: 'max(0, 100 - 5*errors - min(30, warnings))',
    error_penalty: errorPenalty,
    warn_penalty: warnPenalty,
    info_counted: false,
  };

  if (args.json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(`\nCode Oracle — ${args.target}`);
    console.log(`  Files:    ${report.files_scanned}`);
    console.log(`  Rules:    ${enabled.length}`);
    console.log(`  Errors:   ${report.summary.error || 0}  (×5 penalty)`);
    console.log(`  Warnings: ${report.summary.warn || 0}  (×1, capped at 30)`);
    console.log(`  Info:     ${report.summary.info || 0}  (not scored)`);
    console.log(`  Score:    ${score}/100`);
    if (report.violations.length > 0) {
      console.log('\nViolations by rule:');
      const grouped = {};
      for (const v of report.violations) {
        grouped[v.rule] = grouped[v.rule] || [];
        grouped[v.rule].push(v);
      }
      // Sort: errors first, warns second, info last; within each, by count desc
      const sevOrder = { error: 0, warn: 1, info: 2 };
      const sortedRules = Object.entries(grouped).sort((a, b) => {
        const aSev = sevOrder[a[1][0].severity] ?? 3;
        const bSev = sevOrder[b[1][0].severity] ?? 3;
        if (aSev !== bSev) return aSev - bSev;
        return b[1].length - a[1].length;
      });
      for (const [rule, vs] of sortedRules) {
        const icon = vs[0].severity === 'error' ? '✗' : vs[0].severity === 'warn' ? '⚠' : 'ℹ';
        console.log(`\n  ${icon} [${rule}] × ${vs.length}`);
        for (const v of vs.slice(0, 3)) {
          console.log(`    ${path.relative(args.target, v.file)}${v.line ? ':' + v.line : ''} — ${v.message}`);
        }
        if (vs.length > 3) console.log(`    … +${vs.length - 3} more`);
      }
    }
    console.log('');
  }

  // Exit 1 only on errors — warnings/info don't fail the oracle
  process.exit(report.summary.error > 0 ? 1 : 0);
}

main();
