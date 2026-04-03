import { test, expect } from '@playwright/test';

/**
 * Responsive Design Checks
 * Verifies no horizontal overflow, mobile single-column, and touch targets.
 * Source: skills/taste-core.md §4
 */

test.describe('Responsive Checks', () => {
  test('no horizontal overflow at any viewport', async ({ page }, testInfo) => {
    await page.goto('');
    await page.waitForTimeout(500);

    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    expect(overflow, `Horizontal overflow detected at ${testInfo.project.name} viewport`).toBe(false);
  });

  test('mobile single-column layout', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'mobile') return;

    await page.goto('');
    await page.waitForTimeout(500);

    // Check for multi-column grid/flex layouts that don't collapse
    const multiColumnElements = await page.evaluate(() => {
      const issues: string[] = [];
      const elements = document.querySelectorAll('*');

      elements.forEach((el) => {
        const style = getComputedStyle(el);
        const rect = el.getBoundingClientRect();

        // Skip elements outside viewport or very small
        if (rect.width < 10 || rect.height < 10) return;
        if (rect.top > window.innerHeight * 3) return; // Only check above-fold + 2 screens

        // Skip carousels/marquees: parent has overflow:hidden and children are
        // intentionally wider than viewport (horizontal scroll pattern)
        if (style.overflow === 'hidden' || style.overflowX === 'hidden') return;
        // Skip elements whose own parent clips them (carousel track inside container)
        const parentStyle = el.parentElement ? getComputedStyle(el.parentElement) : null;
        if (parentStyle && (parentStyle.overflow === 'hidden' || parentStyle.overflowX === 'hidden')) return;

        // Check if element has children side-by-side
        const children = el.children;
        if (children.length >= 2) {
          const childRects = [...children].map((c) => c.getBoundingClientRect());
          // Are any two children side by side (overlapping vertically)?
          for (let i = 0; i < childRects.length - 1; i++) {
            for (let j = i + 1; j < childRects.length; j++) {
              const a = childRects[i];
              const b = childRects[j];
              // Both visible and side-by-side
              if (a.width > 100 && b.width > 100 && // Both meaningful width
                  Math.abs(a.top - b.top) < a.height * 0.5 && // Similar vertical position
                  a.width + b.width > window.innerWidth * 0.9) { // Taking most of viewport
                const selector = el.tagName.toLowerCase() +
                  (el.className && typeof el.className === 'string' ? `.${el.className.split(' ')[0]}` : '');
                issues.push(selector);
              }
            }
          }
        }
      });

      return [...new Set(issues)];
    });

    if (multiColumnElements.length > 0) {
      // Allow structural/wrapper elements — these are not content layout issues
      const nonNavIssues = multiColumnElements.filter((s) => {
        const tag = s.split('.')[0];
        if (['nav', 'header', 'footer', 'body', 'svg', 'section'].includes(tag)) return false;
        // Skip page-level wrappers (divs that are direct bg containers)
        if (s.includes('bg-[#') || s.includes('bg-[rgba')) return false;
        return true;
      });
      expect(
        nonNavIssues.length,
        `Multi-column layout on mobile: ${nonNavIssues.join(', ')}. Should collapse to single-column.`
      ).toBe(0);
    }
  });

  test('touch targets >= 44x44px on mobile', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'mobile') return;

    await page.goto('');
    await page.waitForTimeout(500);

    const smallTargets = await page.evaluate(() => {
      const interactiveSelectors = 'a, button, input, select, textarea, [role="button"], [onclick], [tabindex]';
      const elements = document.querySelectorAll(interactiveSelectors);
      const issues: { selector: string; width: number; height: number }[] = [];

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Skip hidden or off-screen elements
        if (rect.width === 0 || rect.height === 0) return;
        if (rect.top > window.innerHeight * 2) return;

        if (rect.width < 44 || rect.height < 44) {
          const selector = el.tagName.toLowerCase() +
            (el.textContent?.trim().slice(0, 20) ? `("${el.textContent.trim().slice(0, 20)}")` : '');
          issues.push({
            selector,
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          });
        }
      });

      return issues;
    });

    if (smallTargets.length > 0) {
      const details = smallTargets.slice(0, 5).map(
        (t) => `${t.selector}: ${t.width}×${t.height}px`
      ).join(', ');
      expect(
        smallTargets.length,
        `${smallTargets.length} touch targets too small: ${details}. Min 44×44px.`
      ).toBe(0);
    }
  });

  test('no h-screen / 100vh usage', async ({ page }) => {
    await page.goto('');

    const hasVh = await page.evaluate(() => {
      const all = document.querySelectorAll('*');
      for (const el of all) {
        const style = getComputedStyle(el);
        // Check if height is exactly viewport height (100vh resolves to viewport height)
        if (el.getAttribute('style')?.includes('100vh') ||
            el.className?.toString().includes('h-screen')) {
          return true;
        }
      }
      return false;
    });

    expect(hasVh, 'h-screen or 100vh detected. Use min-h-[100dvh] instead.').toBe(false);
  });
});
