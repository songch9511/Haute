import { test, expect } from '@playwright/test';

/**
 * Typography Quality Checks
 * Verifies font selection, type scale, weight distribution, and heading hierarchy.
 * Source: skills/taste-core.md §2, skills/anti-slop.md §2
 */

interface TypographyData {
  fonts: string[];
  sizes: Record<string, number[]>;
  weights: string[];
  headingSizes: number[];
  bodySizes: number[];
  lineHeights: { tag: string; lineHeight: number; fontSize: number; ratio: number }[];
  letterSpacings: { tag: string; letterSpacing: string; fontSize: number }[];
}

async function extractTypography(page: any): Promise<TypographyData> {
  return page.evaluate(() => {
    const allElements = document.querySelectorAll('*');
    const fonts = new Set<string>();
    const weights = new Set<string>();
    const sizes: Record<string, number[]> = {};
    const headingSizes: number[] = [];
    const bodySizes: number[] = [];
    const lineHeights: any[] = [];
    const letterSpacings: any[] = [];

    allElements.forEach((el) => {
      const text = el.textContent?.trim();
      if (!text || text.length === 0) return;

      const style = getComputedStyle(el);
      const tag = el.tagName.toLowerCase();
      const fontSize = parseFloat(style.fontSize);

      fonts.add(style.fontFamily.split(',')[0].trim().replace(/['"]/g, ''));
      weights.add(style.fontWeight);

      if (!sizes[tag]) sizes[tag] = [];
      sizes[tag].push(fontSize);

      if (/^h[1-6]$/.test(tag)) {
        headingSizes.push(fontSize);
        const lh = parseFloat(style.lineHeight);
        if (!isNaN(lh)) {
          lineHeights.push({ tag, lineHeight: lh, fontSize, ratio: lh / fontSize });
        }
        letterSpacings.push({ tag, letterSpacing: style.letterSpacing, fontSize });
      }

      if (tag === 'p' || tag === 'span' || tag === 'li') {
        bodySizes.push(fontSize);
        const lh = parseFloat(style.lineHeight);
        if (!isNaN(lh)) {
          lineHeights.push({ tag, lineHeight: lh, fontSize, ratio: lh / fontSize });
        }
      }
    });

    return {
      fonts: [...fonts],
      sizes,
      weights: [...weights],
      headingSizes,
      bodySizes,
      lineHeights,
      letterSpacings,
    };
  });
}

test.describe('Typography Checks', () => {
  let data: TypographyData;

  test.beforeEach(async ({ page }) => {
    await page.goto('');
    await page.waitForFunction(() => (document as any).fonts.ready);
    await page.waitForTimeout(500); // Allow fonts to render
    data = await extractTypography(page);
  });

  test('no Inter as sole font', async () => {
    const hasInter = data.fonts.some((f) => f.toLowerCase() === 'inter');
    const hasOtherCustomFont = data.fonts.some(
      (f) => !['inter', 'sans-serif', 'serif', 'monospace', 'system-ui'].includes(f.toLowerCase())
    );

    if (hasInter) {
      expect(hasOtherCustomFont, 'Inter is the only custom font. Add a distinctive heading font.').toBe(true);
    }
  });

  test('has intentional font choice (not system stack only)', async () => {
    const systemFonts = ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif', 'serif'];
    const hasCustomFont = data.fonts.some((f) => !systemFonts.includes(f));
    expect(hasCustomFont, 'Only system fonts detected. Choose an intentional font.').toBe(true);
  });

  test('font family count is 1-3', async () => {
    const customFonts = data.fonts.filter(
      (f) => !['sans-serif', 'serif', 'monospace', 'system-ui', 'inherit'].includes(f.toLowerCase())
    );
    expect(customFonts.length, `${customFonts.length} font families: ${customFonts.join(', ')}`).toBeLessThanOrEqual(3);
    expect(customFonts.length, 'No custom fonts found').toBeGreaterThanOrEqual(1);
  });

  test('heading/body size contrast >= 2.5:1', async () => {
    if (data.headingSizes.length === 0 || data.bodySizes.length === 0) return;

    const maxHeading = Math.max(...data.headingSizes);
    const avgBody = data.bodySizes.reduce((a, b) => a + b, 0) / data.bodySizes.length;
    const ratio = maxHeading / avgBody;

    expect(ratio, `Heading/body ratio ${ratio.toFixed(1)}:1 — need >= 2.5:1`).toBeGreaterThanOrEqual(2.5);
  });

  test('H1 not oversized (max 72px / 4.5rem)', async () => {
    const h1Sizes = data.sizes['h1'] || [];
    for (const size of h1Sizes) {
      expect(size, `H1 is ${size}px — max 72px`).toBeLessThanOrEqual(72);
    }
  });

  test('font weight diversity (2-4 weights)', async () => {
    const uniqueWeights = new Set(data.weights.map((w) => parseInt(w, 10)));
    // Remove NaN (from 'normal', 'bold' that didn't parse)
    uniqueWeights.delete(NaN);
    expect(uniqueWeights.size, `Only ${uniqueWeights.size} font weight(s) used`).toBeGreaterThanOrEqual(2);
    expect(uniqueWeights.size, `${uniqueWeights.size} font weights — too many`).toBeLessThanOrEqual(4);
  });

  test('heading line-height is tight (1.0-1.3)', async () => {
    const headingLH = data.lineHeights.filter((lh) => /^h[1-3]$/.test(lh.tag));
    for (const lh of headingLH) {
      expect(
        lh.ratio,
        `${lh.tag} line-height ratio ${lh.ratio.toFixed(2)} — should be 1.0-1.3`
      ).toBeGreaterThanOrEqual(1.0);
      expect(lh.ratio, `${lh.tag} line-height ratio ${lh.ratio.toFixed(2)} — too loose`).toBeLessThanOrEqual(1.35);
    }
  });

  test('body line-height is readable (1.4-1.8)', async () => {
    const bodyLH = data.lineHeights.filter((lh) => ['p', 'li', 'span'].includes(lh.tag));
    for (const lh of bodyLH) {
      if (lh.fontSize < 12) continue; // Skip very small text
      expect(
        lh.ratio,
        `Body line-height ratio ${lh.ratio.toFixed(2)} — should be 1.4-1.8`
      ).toBeGreaterThanOrEqual(1.4);
      expect(lh.ratio, `Body line-height too loose: ${lh.ratio.toFixed(2)}`).toBeLessThanOrEqual(1.8);
    }
  });
});
