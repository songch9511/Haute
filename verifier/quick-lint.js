#!/usr/bin/env node

/**
 * UDesigner Quick Lint
 *
 * Lightweight static analysis for PostToolUse hook.
 * Parses CSS/HTML for anti-slop pattern violations without browser rendering.
 * Target: < 2 seconds execution time.
 */

const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];
if (!filePath) {
  console.log('Usage: node quick-lint.js <file>');
  process.exit(0);
}

if (!fs.existsSync(filePath)) {
  process.exit(0);
}

const content = fs.readFileSync(filePath, 'utf-8');
const issues = [];

// ─── Typography Checks ───

// Inter as sole font (no second font family defined)
if (/font-family:\s*['"]?Inter['"]?\s*[,;}\n]/.test(content) || /fontFamily:\s*['"]Inter['"]/.test(content)) {
  // Check if there's another font-family declaration
  const fontDeclarations = content.match(/font-family|fontFamily/g) || [];
  if (fontDeclarations.length <= 1) {
    issues.push({ severity: 'error', rule: 'anti-slop §2.1', message: 'Inter is the only font. Add a distinctive heading font (Geist, Outfit, Cabinet Grotesk).' });
  }
}

// System font stack as design choice
if (/font-family:\s*-apple-system/.test(content) && !/font-family:\s*['"][\w\s]+['"]/.test(content)) {
  issues.push({ severity: 'warn', rule: 'anti-slop §2.2', message: 'System font stack used without a custom font. Choose an intentional font.' });
}

// ─── Color Checks ───

// Pure black background
if (/(?:background(?:-color)?|bg)[\s:]*#000000/.test(content) || /(?:className|class)=["'][^"']*bg-black[^"']*["']/.test(content)) {
  issues.push({ severity: 'error', rule: 'anti-slop §1.2', message: 'Pure #000000 background. Use #0e1011 or similar near-black.' });
}

// Pure white text
if (/(?:^|[\s;])color\s*:\s*#ffffff/m.test(content) || /(?:className|class)=["'][^"']*text-white[^"']*["']/.test(content)) {
  issues.push({ severity: 'warn', rule: 'anti-slop §1.3', message: 'Pure #ffffff text. Consider #f0f0f0 for reduced eye strain.' });
}

// Neon glow box-shadow (colored shadow with high alpha)
const neonShadowRegex = /box-shadow\s*:.*rgba?\s*\(\s*(?!0\s*,\s*0\s*,\s*0)[\d\s,]+,\s*0\.[3-9]\s*\)/;
if (neonShadowRegex.test(content)) {
  issues.push({ severity: 'error', rule: 'anti-slop §1.1', message: 'Neon glow box-shadow detected. Use subtle neutral shadow or none.' });
}

// Purple-blue gradient (LILA BAN)
if (/(?:from-purple|from-violet).*(?:to-blue|to-indigo)/s.test(content) || /gradient.*(?:purple|#8b5cf6).*(?:blue|#3b82f6)/s.test(content)) {
  issues.push({ severity: 'error', rule: 'anti-slop §1.6', message: 'Purple-to-blue gradient detected (LILA BAN). Choose a single accent color.' });
}

// ─── Layout Checks ───

// h-screen usage
if (/(?:className|class)=["'][^"']*h-screen[^"']*["']/.test(content) || /height\s*:\s*100vh/.test(content)) {
  issues.push({ severity: 'error', rule: 'anti-slop §3.3', message: 'h-screen/100vh detected. Use min-h-[100dvh] instead.' });
}

// ─── Content Checks ───

// Generic placeholder names
const placeholderNames = ['John Doe', 'Jane Smith', 'Jane Doe', 'John Smith', 'Alex Johnson'];
for (const name of placeholderNames) {
  if (content.includes(name)) {
    issues.push({ severity: 'error', rule: 'anti-slop §4.1', message: `Placeholder name "${name}" detected. Use realistic, diverse names.` });
  }
}

// Lorem ipsum
if (/lorem\s+ipsum/i.test(content)) {
  issues.push({ severity: 'error', rule: 'anti-slop §4.5', message: 'Lorem ipsum detected. Write real copy.' });
}

// Marketing fluff
const fluffWords = ['Elevate', 'Seamless', 'Unleash', 'Empower', 'Supercharge', 'Revolutionary', 'Next-generation'];
for (const word of fluffWords) {
  const regex = new RegExp(`\\b${word}\\b`, 'i');
  if (regex.test(content)) {
    issues.push({ severity: 'warn', rule: 'anti-slop §4.4', message: `Marketing fluff "${word}" detected. Use specific, concrete language.` });
  }
}

// Startup clichés
const cliches = ['Acme', 'Nexus', 'Synergy', 'Quantum', 'Nova Corp', 'Apex'];
for (const name of cliches) {
  if (content.includes(name)) {
    issues.push({ severity: 'warn', rule: 'anti-slop §4.3', message: `Startup cliché "${name}" detected. Use a realistic company name.` });
  }
}

// Emoji as UI elements
const emojiPattern = /[\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}]/u;
if (emojiPattern.test(content)) {
  issues.push({ severity: 'warn', rule: 'anti-slop §1.7', message: 'Emoji detected in code. Use proper icon library (Phosphor, Lucide).' });
}

// ─── Dependency Checks ───

// Unsplash URLs
if (/unsplash\.com/.test(content) || /picsum\.photos/.test(content) || /placeholder\.com/.test(content)) {
  issues.push({ severity: 'error', rule: 'anti-slop §5.1', message: 'External placeholder image URL detected. Use CSS gradients or local SVG.' });
}

// ─── Output ───

if (issues.length === 0) {
  console.log(`✓ quick-lint: ${path.basename(filePath)} — no issues`);
  process.exit(0);
}

const errors = issues.filter(i => i.severity === 'error');
const warns = issues.filter(i => i.severity === 'warn');

console.log(`\n⚠ quick-lint: ${path.basename(filePath)} — ${errors.length} error(s), ${warns.length} warning(s)\n`);

for (const issue of issues) {
  const icon = issue.severity === 'error' ? '✗' : '⚠';
  console.log(`  ${icon} [${issue.rule}] ${issue.message}`);
}

console.log('');
process.exit(errors.length > 0 ? 1 : 0);
