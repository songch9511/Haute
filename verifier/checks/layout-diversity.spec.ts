import { test, expect } from '@playwright/test';

/**
 * Layout Diversity Checks
 * Verifies that sections use varied layouts rather than repeating the same grid/padding/alignment.
 * Source: skills/anti-slop.md §3, skills/taste-core.md §4
 */

test.describe('Layout Diversity', () => {
  test('no consecutive identical grids', async ({ page }) => {
    await page.goto('');
    await page.waitForTimeout(500);

    const sections = await page.$$('section');
    const gridPatterns: string[] = [];

    for (const section of sections) {
      const grid = await section.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return computed.gridTemplateColumns || 'none';
      });
      gridPatterns.push(grid);
    }

    // Check no 3+ consecutive sections have the same grid pattern
    for (let i = 0; i < gridPatterns.length - 2; i++) {
      if (
        gridPatterns[i] === gridPatterns[i + 1] &&
        gridPatterns[i + 1] === gridPatterns[i + 2]
      ) {
        expect.soft(
          false,
          `Sections ${i + 1}–${i + 3} share identical grid: "${gridPatterns[i]}". ` +
            'Use varied layouts — alternate between full-bleed, split, bento, and list formats.'
        ).toBeTruthy();
      }
    }

    // Warn if >40% of consecutive section pairs share the same non-trivial grid
    let consecutiveSame = 0;
    for (let i = 1; i < gridPatterns.length; i++) {
      if (gridPatterns[i] === gridPatterns[i - 1] && gridPatterns[i] !== 'none') {
        consecutiveSame++;
      }
    }

    const matchRate =
      gridPatterns.length > 1 ? consecutiveSame / (gridPatterns.length - 1) : 0;
    expect(
      matchRate,
      `${Math.round(matchRate * 100)}% of consecutive section pairs share identical grid-template-columns. ` +
        'Vary layout structure — sections should feel distinct from each other.'
    ).toBeLessThan(0.4);
  });

  test('varied section heights (padding diversity)', async ({ page }) => {
    await page.goto('');
    await page.waitForTimeout(500);

    const sections = await page.$$('section');
    const paddings: string[] = [];

    for (const section of sections) {
      const padding = await section.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return `${computed.paddingTop}-${computed.paddingBottom}`;
      });
      paddings.push(padding);
    }

    if (paddings.length >= 3) {
      const uniquePaddings = new Set(paddings);
      expect(
        uniquePaddings.size,
        `All ${paddings.length} sections share identical vertical padding. ` +
          'Vary section heights for visual rhythm (e.g., mix py-16, py-24, py-32).'
      ).toBeGreaterThan(1);
    }
  });

  test('not all sections centered', async ({ page }) => {
    await page.goto('');
    await page.waitForTimeout(500);

    const sections = await page.$$('section');
    let centeredCount = 0;

    for (const section of sections) {
      const isCentered = await section.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return computed.textAlign === 'center';
      });
      if (isCentered) centeredCount++;
    }

    if (sections.length >= 3) {
      const centeredRate = centeredCount / sections.length;
      expect(
        centeredRate,
        `${Math.round(centeredRate * 100)}% of sections are center-aligned. ` +
          'At least 40% should use left-aligned, split, or editorial layouts.'
      ).toBeLessThan(0.6);
    }
  });
});
