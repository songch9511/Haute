import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Visual Regression Check
 * Compares screenshots against baseline snapshots.
 * Source: research/verification-strategies/visual-regression.md
 */

const SNAPSHOTS_DIR = path.join(__dirname, '..', 'snapshots');

test.describe('Visual Regression', () => {
  test('desktop screenshot matches baseline', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'desktop') return;

    await page.goto('');

    // Wait for fonts and initial render
    await page.waitForFunction(() => (document as any).fonts.ready);
    await page.waitForTimeout(1000);

    // Disable animations for stable screenshots
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-delay: 0ms !important;
          transition-duration: 0.01ms !important;
          transition-delay: 0ms !important;
        }
      `,
    });
    await page.waitForTimeout(100);

    const screenshot = await page.screenshot({ fullPage: true });
    const baselinePath = path.join(SNAPSHOTS_DIR, 'desktop-baseline.png');

    if (fs.existsSync(baselinePath)) {
      // Compare against baseline
      expect(screenshot).toMatchSnapshot('desktop-baseline.png', {
        maxDiffPixelRatio: 0.05, // Allow 5% pixel difference
        threshold: 0.3,         // Lenient per-pixel threshold
      });
    } else {
      // No baseline — save current as reference
      fs.mkdirSync(SNAPSHOTS_DIR, { recursive: true });
      fs.writeFileSync(baselinePath, screenshot);
      console.log(`No baseline found. Saved current screenshot as baseline: ${baselinePath}`);
    }
  });

  test('mobile screenshot matches baseline', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'mobile') return;

    await page.goto('');

    await page.waitForFunction(() => (document as any).fonts.ready);
    await page.waitForTimeout(1000);

    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-delay: 0ms !important;
          transition-duration: 0.01ms !important;
          transition-delay: 0ms !important;
        }
      `,
    });
    await page.waitForTimeout(100);

    const screenshot = await page.screenshot({ fullPage: true });
    const baselinePath = path.join(SNAPSHOTS_DIR, 'mobile-baseline.png');

    if (fs.existsSync(baselinePath)) {
      expect(screenshot).toMatchSnapshot('mobile-baseline.png', {
        maxDiffPixelRatio: 0.05,
        threshold: 0.3,
      });
    } else {
      fs.mkdirSync(SNAPSHOTS_DIR, { recursive: true });
      fs.writeFileSync(baselinePath, screenshot);
      console.log(`No baseline found. Saved current screenshot as baseline: ${baselinePath}`);
    }
  });
});
