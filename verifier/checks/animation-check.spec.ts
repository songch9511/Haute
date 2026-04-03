import { test, expect } from '@playwright/test';

/**
 * Animation Quality Checks
 * Verifies animated properties, durations, easing, and reduced-motion support.
 * Source: skills/motion-engine.md, skills/taste-core.md §7
 */

interface AnimationData {
  transitions: { selector: string; property: string; duration: string; easing: string }[];
  animations: { selector: string; name: string; duration: string }[];
  bannedPropertyAnimations: { selector: string; property: string }[];
  hasLinearEasing: boolean;
  hasReducedMotionQuery: boolean;
  maxDurationMs: number;
}

async function extractAnimations(page: any): Promise<AnimationData> {
  return page.evaluate(() => {
    const transitions: any[] = [];
    const animations: any[] = [];
    const bannedPropertyAnimations: any[] = [];
    let hasLinearEasing = false;
    let maxDurationMs = 0;

    const bannedProps = ['width', 'height', 'top', 'left', 'right', 'bottom', 'margin', 'padding', 'border-width', 'font-size'];
    // Allowed exceptions: accordion/disclosure patterns use max-height
    // because there is no performant CSS-only alternative for variable-height expand/collapse.
    const allowedExceptions = ['max-height'];
    const elements = document.querySelectorAll('*');

    elements.forEach((el) => {
      const style = getComputedStyle(el);
      const selector = el.tagName.toLowerCase() +
        (el.id ? `#${el.id}` : '') +
        (el.className && typeof el.className === 'string' ? `.${el.className.split(' ')[0]}` : '');

      // Check transitions
      if (style.transitionProperty && style.transitionProperty !== 'none' && style.transitionProperty !== 'all') {
        const props = style.transitionProperty.split(',').map((p: string) => p.trim());
        const durations = style.transitionDuration.split(',').map((d: string) => d.trim());
        const easings = style.transitionTimingFunction.split(',').map((e: string) => e.trim());

        props.forEach((prop: string, i: number) => {
          const dur = durations[i] || durations[0];
          const ease = easings[i] || easings[0];
          transitions.push({ selector, property: prop, duration: dur, easing: ease });

          if (bannedProps.some((bp) => prop.includes(bp)) &&
              !allowedExceptions.some((ex) => prop === ex)) {
            bannedPropertyAnimations.push({ selector, property: prop });
          }
          if (ease === 'linear') hasLinearEasing = true;

          const ms = parseFloat(dur) * (dur.includes('ms') ? 1 : 1000);
          if (ms > maxDurationMs) maxDurationMs = ms;
        });
      }

      // Check for 'all' transition (may include banned properties)
      if (style.transitionProperty === 'all') {
        const dur = style.transitionDuration;
        const ease = style.transitionTimingFunction;
        transitions.push({ selector, property: 'all', duration: dur, easing: ease });
        if (ease === 'linear') hasLinearEasing = true;
      }

      // Check CSS animations
      if (style.animationName && style.animationName !== 'none') {
        const dur = style.animationDuration;
        animations.push({ selector, name: style.animationName, duration: dur });

        const ms = parseFloat(dur) * (dur.includes('ms') ? 1 : 1000);
        if (ms > maxDurationMs && style.animationIterationCount !== 'infinite') maxDurationMs = ms;
      }
    });

    // Check for prefers-reduced-motion in stylesheets
    let hasReducedMotionQuery = false;
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule instanceof CSSMediaRule && rule.conditionText?.includes('prefers-reduced-motion')) {
            hasReducedMotionQuery = true;
          }
        }
      } catch {
        // CORS — can't read external stylesheets
      }
    }

    return {
      transitions,
      animations,
      bannedPropertyAnimations,
      hasLinearEasing,
      hasReducedMotionQuery,
      maxDurationMs,
    };
  });
}

test.describe('Animation Checks', () => {
  let data: AnimationData;

  test.beforeEach(async ({ page }) => {
    await page.goto('');
    await page.waitForTimeout(500);
    data = await extractAnimations(page);
  });

  test('no banned property animations (width, height, top, left, etc.)', async () => {
    if (data.bannedPropertyAnimations.length > 0) {
      const details = data.bannedPropertyAnimations
        .map((b) => `${b.selector}: ${b.property}`)
        .join(', ');
      expect(
        data.bannedPropertyAnimations.length,
        `Banned animated properties: ${details}. Use transform/opacity instead.`
      ).toBe(0);
    }
  });

  test('no linear easing on non-rotation animations', async () => {
    // Linear is OK for infinite rotation (spinners)
    const nonSpinnerLinear = data.transitions.filter(
      (t) => t.easing === 'linear' && !t.property.includes('rotate')
    );
    expect(
      nonSpinnerLinear.length,
      'Linear easing detected. Use ease-out, ease-in-out, or cubic-bezier.'
    ).toBe(0);
  });

  test('no animation exceeds 800ms', async () => {
    expect(
      data.maxDurationMs,
      `Max animation duration ${data.maxDurationMs}ms exceeds 800ms limit`
    ).toBeLessThanOrEqual(800);
  });

  test('prefers-reduced-motion is respected', async () => {
    // Only check if there are animations
    if (data.transitions.length > 0 || data.animations.length > 0) {
      expect(
        data.hasReducedMotionQuery,
        'Animations exist but no prefers-reduced-motion media query found'
      ).toBe(true);
    }
  });
});
