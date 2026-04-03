import { test, expect } from '@playwright/test';

/**
 * Color Quality Checks
 * Verifies palette size, contrast ratios, banned colors, and color consistency.
 * Source: skills/taste-core.md §3, skills/anti-slop.md §1
 */

interface ColorData {
  textColors: string[];
  bgColors: string[];
  allColors: string[];
  contrasts: { selector: string; fg: string; bg: string; ratio: number }[];
  hasPureBlack: boolean;
  hasPureWhite: boolean;
  hasNeonShadow: boolean;
}

function luminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

async function extractColors(page: any): Promise<ColorData> {
  return page.evaluate(() => {
    function parseColor(color: string): [number, number, number] | null {
      const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (match) return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
      return null;
    }

    function lum(r: number, g: number, b: number): number {
      const [rs, gs, bs] = [r, g, b].map((c) => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }

    function cr(l1: number, l2: number): number {
      return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    }

    const elements = document.querySelectorAll('*');
    const textColors = new Set<string>();
    const bgColors = new Set<string>();
    const allColors = new Set<string>();
    let hasPureBlack = false;
    let hasPureWhite = false;
    let hasNeonShadow = false;
    const contrasts: any[] = [];

    // Only scan visible elements inside <body>
    const bodyElements = document.body.querySelectorAll('*');
    bodyElements.forEach((el) => {
      const style = getComputedStyle(el);
      const tag = el.tagName.toLowerCase();

      // Skip non-rendered elements
      if (['script', 'style', 'link', 'meta', 'head', 'title', 'noscript'].includes(tag)) return;
      if (style.display === 'none' || style.visibility === 'hidden') return;

      const text = el.textContent?.trim();
      const bgColor = style.backgroundColor;
      const fgColor = style.color;

      if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
        bgColors.add(bgColor);
        allColors.add(bgColor);
        if (bgColor === 'rgb(0, 0, 0)') hasPureBlack = true;
      }

      if (text && text.length > 0) {
        textColors.add(fgColor);
        allColors.add(fgColor);
        if (fgColor === 'rgb(255, 255, 255)') hasPureWhite = true;

        // Calculate contrast with effective background
        // Walk up the DOM to find the nearest opaque background
        let effectiveBg = bgColor;
        function isTransparent(color: string): boolean {
          if (color === 'rgba(0, 0, 0, 0)' || color === 'transparent') return true;
          const alphaMatch = color.match(/rgba\([^)]*,\s*([\d.]+)\s*\)/);
          return alphaMatch ? parseFloat(alphaMatch[1]) < 0.9 : false;
        }
        if (isTransparent(bgColor)) {
          let parent = el.parentElement;
          while (parent) {
            const parentBg = getComputedStyle(parent).backgroundColor;
            if (parentBg && !isTransparent(parentBg)) {
              effectiveBg = parentBg;
              break;
            }
            parent = parent.parentElement;
          }
          // If we reach the top without finding opaque bg, assume page background
          if (isTransparent(effectiveBg)) effectiveBg = 'rgb(14, 16, 17)';
        }
        const fgParsed = parseColor(fgColor);
        const bgParsed = parseColor(effectiveBg);
        if (fgParsed && bgParsed) {
          const fgLum = lum(...fgParsed);
          const bgLum = lum(...bgParsed);
          const ratio = cr(fgLum, bgLum);
          const fontSize = parseFloat(style.fontSize);
          const isLargeText = fontSize >= 24 || (fontSize >= 18.66 && parseInt(style.fontWeight) >= 700);

          if ((!isLargeText && ratio < 4.5) || (isLargeText && ratio < 3)) {
            // Build a simple selector
            const selector = el.tagName.toLowerCase() +
              (el.id ? `#${el.id}` : '') +
              (el.className && typeof el.className === 'string' ? `.${el.className.split(' ')[0]}` : '');
            contrasts.push({ selector, fg: fgColor, bg: bgColor, ratio: Math.round(ratio * 100) / 100 });
          }
        }
      }

      // Check for neon shadows
      const shadow = style.boxShadow;
      if (shadow && shadow !== 'none') {
        const colorMatch = shadow.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]+)?\)/);
        if (colorMatch) {
          const [, r, g, b, a] = colorMatch;
          const isNeutral = parseInt(r) === parseInt(g) && parseInt(g) === parseInt(b);
          const alpha = parseFloat(a || '1');
          if (!isNeutral && alpha > 0.3) {
            hasNeonShadow = true;
          }
        }
      }
    });

    return {
      textColors: [...textColors],
      bgColors: [...bgColors],
      allColors: [...allColors],
      contrasts,
      hasPureBlack,
      hasPureWhite,
      hasNeonShadow,
    };
  });
}

test.describe('Color Checks', () => {
  let data: ColorData;

  test.beforeEach(async ({ page }) => {
    await page.goto('');
    await page.waitForTimeout(500);
    data = await extractColors(page);
  });

  test('no pure #000000 background', async () => {
    expect(data.hasPureBlack, 'Pure black (#000) background detected. Use #0e1011 or similar.').toBe(false);
  });

  test('no neon glow box-shadows', async () => {
    expect(data.hasNeonShadow, 'Neon glow shadow detected. Use subtle neutral shadows.').toBe(false);
  });

  test('WCAG AA contrast ratios', async () => {
    if (data.contrasts.length > 0) {
      const failures = data.contrasts.map(
        (c) => `${c.selector}: ${c.ratio}:1 (fg: ${c.fg}, bg: ${c.bg})`
      );
      expect(data.contrasts.length, `Contrast failures:\n${failures.join('\n')}`).toBe(0);
    }
  });

  test('palette size <= 8 unique hue families', async () => {
    // Group colors by hue (within 30° on color wheel)
    function parseRgb(color: string): [number, number, number] | null {
      const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (match) return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
      return null;
    }

    function rgbToHue(r: number, g: number, b: number): number {
      r /= 255; g /= 255; b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      if (max === min) return -1; // achromatic
      let h = 0;
      const d = max - min;
      if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      else if (max === g) h = ((b - r) / d + 2) / 6;
      else h = ((r - g) / d + 4) / 6;
      return h * 360;
    }

    const hues: number[] = [];
    for (const color of data.allColors) {
      const rgb = parseRgb(color);
      if (rgb) {
        const hue = rgbToHue(...rgb);
        if (hue >= 0) hues.push(hue);
      }
    }

    // Cluster hues within 30°
    const clusters: number[] = [];
    for (const h of hues) {
      if (!clusters.some((c) => Math.abs(c - h) < 30 || Math.abs(c - h) > 330)) {
        clusters.push(h);
      }
    }

    expect(clusters.length, `${clusters.length} hue families — aim for <= 8`).toBeLessThanOrEqual(8);
  });
});
