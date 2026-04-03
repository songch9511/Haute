import { test, expect } from '@playwright/test';

/**
 * Spacing Quality Checks
 * Verifies grid adherence, consistency, section rhythm, and minimum values.
 * Source: skills/taste-core.md §4, research/design-quality-metrics/visual-metrics.md §3
 */

interface SpacingData {
  allSpacings: number[];
  sectionPaddings: number[];
  cardPaddings: number[];
  gaps: number[];
  gridAdherence: number;
}

async function extractSpacing(page: any): Promise<SpacingData> {
  return page.evaluate(() => {
    const allSpacings: number[] = [];
    const sectionPaddings: number[] = [];
    const cardPaddings: number[] = [];
    const gaps: number[] = [];

    const elements = document.querySelectorAll('*');

    elements.forEach((el) => {
      const style = getComputedStyle(el);
      const tag = el.tagName.toLowerCase();

      // Collect padding and margin values
      ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight',
       'marginTop', 'marginBottom'].forEach((prop) => {
        const val = parseFloat(style[prop as any]);
        if (val > 0 && val < 500) {
          allSpacings.push(val);

          // Section-level elements — only vertical padding matters for section rhythm
          if (['section', 'main', 'article', 'header', 'footer'].includes(tag)) {
            if (prop === 'paddingTop' || prop === 'paddingBottom') sectionPaddings.push(val);
          }

          // Card-like elements: must have border-radius AND background AND be a meaningful size
          // Excludes small elements like badges, tags, and inline pills
          const rect = el.getBoundingClientRect();
          const isSubstantialSize = rect.width > 120 && rect.height > 80;
          const hasCardStyles = (el.classList?.contains('card') ||
            (style.borderRadius !== '0px' && style.backgroundColor !== 'rgba(0, 0, 0, 0)' && isSubstantialSize));
          if (hasCardStyles) {
            if (prop.startsWith('padding')) cardPaddings.push(val);
          }
        }
      });

      // Collect gap values
      const gap = parseFloat(style.gap);
      if (gap > 0 && gap < 200) {
        gaps.push(gap);
        allSpacings.push(gap);
      }
    });

    const gridAdherence = allSpacings.length > 0
      ? allSpacings.filter((s) => s % 4 === 0 || s % 4 < 0.5).length / allSpacings.length
      : 1;

    return { allSpacings, sectionPaddings, cardPaddings, gaps, gridAdherence };
  });
}

function stdDev(arr: number[]): number {
  if (arr.length === 0) return 0;
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  const variance = arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / arr.length;
  return Math.sqrt(variance);
}

test.describe('Spacing Checks', () => {
  let data: SpacingData;

  test.beforeEach(async ({ page }) => {
    await page.goto('');
    await page.waitForTimeout(500);
    data = await extractSpacing(page);
  });

  test('grid adherence > 70% (4px multiples)', async () => {
    expect(
      data.gridAdherence,
      `Only ${(data.gridAdherence * 100).toFixed(0)}% of spacing values are 4px multiples`
    ).toBeGreaterThan(0.7);
  });

  test('most section paddings >= 48px / py-12', async ({ }, testInfo) => {
    if (testInfo.project.name === 'mobile') return; // Skip on mobile — tighter spacing is OK
    if (data.sectionPaddings.length === 0) return;

    // At least 75% of section padding values should meet the minimum.
    // Allows auxiliary sections (social proof bars, dividers) to be tighter.
    const passing = data.sectionPaddings.filter((p) => p >= 48).length;
    const ratio = passing / data.sectionPaddings.length;
    expect(
      ratio,
      `Only ${(ratio * 100).toFixed(0)}% of section paddings >= 48px (need 75%+). Values: ${data.sectionPaddings.map(Math.round).join(', ')}px`
    ).toBeGreaterThanOrEqual(0.75);
  });

  test('card padding minimum (>= 16px / p-4)', async () => {
    if (data.cardPaddings.length === 0) return;

    const minPadding = Math.min(...data.cardPaddings);
    expect(
      minPadding,
      `Card padding ${minPadding}px is too tight — minimum 16px (p-4)`
    ).toBeGreaterThanOrEqual(16);
  });

  test('spacing consistency within similar elements', async () => {
    // Card paddings should be consistent
    if (data.cardPaddings.length >= 3) {
      const sd = stdDev(data.cardPaddings);
      expect(
        sd,
        `Card padding stddev ${sd.toFixed(1)}px — inconsistent spacing on similar elements`
      ).toBeLessThan(12);
    }
  });

  test('section spacing variation exists (rhythm)', async () => {
    if (data.sectionPaddings.length < 3) return;

    const uniqueValues = new Set(data.sectionPaddings.map((v) => Math.round(v / 8) * 8));
    expect(
      uniqueValues.size,
      'All sections have identical padding — vary spacing for visual rhythm'
    ).toBeGreaterThanOrEqual(2);
  });
});
