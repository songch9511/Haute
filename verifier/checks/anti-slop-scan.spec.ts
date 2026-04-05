import { test, expect } from '@playwright/test';

/**
 * Anti-Slop Pattern Detection
 * Scans rendered DOM for known AI-generic patterns.
 * Source: skills/anti-slop.md (all sections)
 */

interface SlopReport {
  centeredHero: boolean;
  threeEqualCards: boolean;
  placeholderNames: string[];
  roundNumbers: string[];
  loremIpsum: boolean;
  marketingFluff: string[];
  externalImages: string[];
  bentoPretenderRows: number;
  consecutiveIdenticalGrids: number;
  uniformBackgroundSections: boolean;
}

async function scanForSlop(page: any): Promise<SlopReport> {
  return page.evaluate(() => {
    const textContent = document.body.innerText || '';

    // ── Centered Hero Detection ──
    let centeredHero = false;
    const headings = document.querySelectorAll('h1, h2');
    headings.forEach((h) => {
      const hStyle = getComputedStyle(h);
      if (hStyle.textAlign === 'center' || hStyle.textAlign === '-webkit-center') {
        const next1 = h.nextElementSibling;
        const next2 = next1?.nextElementSibling;
        if (next1 && next2) {
          const next1Style = getComputedStyle(next1);
          const isNextP = next1.tagName === 'P' &&
            (next1Style.textAlign === 'center' || next1Style.textAlign === '-webkit-center');
          const isNextBtn = next2.tagName === 'A' || next2.tagName === 'BUTTON' ||
            next2.getAttribute('role') === 'button';
          if (isNextP && isNextBtn) {
            centeredHero = true;
          }
        }
      }
    });

    // ── Three Equal Cards Detection ──
    // Detects the classic "3 feature cards in a row" pattern in two ways:
    //
    // Method 1 (direct): Parent has exactly 3 equal-width children with identical structure.
    // Method 2 (grid-row): Inside a CSS Grid, any visual row has 3+ items that are
    //   equal-width AND share identical internal tag structure. This catches "bento pretenders"
    //   where a 6-item grid still has a row of 3 identical cards.
    let threeEqualCards = false;

    // Unwrap single-child wrapper divs (e.g., StaggerItem, motion.div)
    // to reach the actual content element.
    function unwrap(el: Element): Element {
      let current = el;
      while (current.children.length === 1 && current.children[0].tagName === 'DIV') {
        current = current.children[0];
      }
      return current;
    }

    function hasIdenticalStructure(elements: Element[]): boolean {
      if (elements.length < 3) return false;
      const widths = elements.map((c) => c.getBoundingClientRect().width);
      const allVisible = widths.every((w) => w > 150);
      const allEqual = allVisible && (Math.max(...widths) - Math.min(...widths) < 5);
      if (!allEqual) return false;

      // Unwrap single-child wrappers to reach actual content
      const unwrapped = elements.map(unwrap);

      // Each child must have >= 3 sub-elements (icon/img + heading + text pattern)
      const childCounts = unwrapped.map((c) => c.children.length);
      if (!childCounts.every((count) => count >= 3)) return false;

      // Check if child structures are identical
      const structures = unwrapped.map((c) =>
        [...c.children].map((gc) => gc.tagName).join(',')
      );
      return structures[0].length > 0 && new Set(structures).size === 1;
    }

    document.querySelectorAll('*').forEach((el) => {
      if (threeEqualCards) return; // already found
      const children = [...el.children];

      // Method 1: exactly 3 direct children
      if (children.length === 3 && hasIdenticalStructure(children)) {
        threeEqualCards = true;
        return;
      }

      // Method 2: CSS Grid with 3+ items on the same visual row
      const style = getComputedStyle(el);
      if (style.display === 'grid' && children.length >= 3) {
        // Group children by their visual row (top position)
        const byRow = new Map<number, Element[]>();
        children.forEach((child) => {
          const rect = child.getBoundingClientRect();
          if (rect.width < 10 || rect.height < 10) return;
          // Round top to nearest 5px to group items on the same row
          const rowKey = Math.round(rect.top / 5) * 5;
          if (!byRow.has(rowKey)) byRow.set(rowKey, []);
          byRow.get(rowKey)!.push(child);
        });

        for (const rowItems of byRow.values()) {
          if (rowItems.length >= 3 && hasIdenticalStructure(rowItems)) {
            threeEqualCards = true;
            return;
          }
        }
      }
    });

    // ── Placeholder Names ──
    const namePatterns = ['John Doe', 'Jane Smith', 'Jane Doe', 'John Smith', 'Alex Johnson',
      'user@example.com', 'admin@example.com'];
    const placeholderNames = namePatterns.filter((n) => textContent.includes(n));

    // ── Round Numbers ──
    const roundNumberRegex = /\$\d{1,3}(,000)+(?:\.\d{2})?|\$\d{2,3}\.00\b|\b100%\b|\b99%\b/g;
    const roundMatches = textContent.match(roundNumberRegex) || [];
    const roundNumbers = [...new Set(roundMatches)];

    // ── Lorem Ipsum ──
    const loremIpsum = /lorem\s+ipsum/i.test(textContent);

    // ── Marketing Fluff ──
    const fluffWords = ['Elevate', 'Seamless', 'Unleash', 'Empower', 'Supercharge',
      'Revolutionary', 'Next-generation', 'Cutting-edge', 'World-class', 'Best-in-class'];
    const marketingFluff = fluffWords.filter((w) => {
      const regex = new RegExp(`\\b${w}\\b`, 'i');
      return regex.test(textContent);
    });

    // ── External Placeholder Images ──
    const images = document.querySelectorAll('img');
    const externalImages: string[] = [];
    images.forEach((img) => {
      const src = img.getAttribute('src') || '';
      if (src.includes('unsplash.com') || src.includes('picsum.photos') ||
          src.includes('placeholder.com') || src.includes('placehold.co') ||
          src.includes('via.placeholder')) {
        externalImages.push(src.slice(0, 80));
      }
    });

    // ── Bento Pretender: CSS Grid rows with 3+ equal-width items (rendered level) ──
    let bentoPretenderRows = 0;
    document.querySelectorAll('*').forEach((el) => {
      const style = getComputedStyle(el);
      if (style.display !== 'grid') return;
      const children = [...el.children];
      if (children.length < 3) return;

      // Group children by visual row
      const byRow = new Map<number, Element[]>();
      children.forEach((child) => {
        const rect = child.getBoundingClientRect();
        if (rect.width < 10 || rect.height < 10) return;
        const rowKey = Math.round(rect.top / 5) * 5;
        if (!byRow.has(rowKey)) byRow.set(rowKey, []);
        byRow.get(rowKey)!.push(child);
      });

      for (const rowItems of byRow.values()) {
        if (rowItems.length < 3) continue;
        const widths = rowItems.map((c) => c.getBoundingClientRect().width);
        const allVisible = widths.every((w) => w > 80);
        const allEqual = allVisible && (Math.max(...widths) - Math.min(...widths) < 5);
        if (allEqual) bentoPretenderRows++;
      }
    });

    // ── Consecutive sections with identical grid-template-columns ──
    const sections = [...document.querySelectorAll('section')];
    let consecutiveIdenticalGrids = 0;
    for (let i = 1; i < sections.length; i++) {
      const prev = getComputedStyle(sections[i - 1]).gridTemplateColumns;
      const curr = getComputedStyle(sections[i]).gridTemplateColumns;
      if (prev === curr && prev !== 'none' && prev !== '') {
        consecutiveIdenticalGrids++;
      }
    }

    // ── Uniform background sections (section rhythm) ──
    // Flag if >70% of sections share the exact same background color
    let uniformBackgroundSections = false;
    if (sections.length >= 3) {
      const bgColors = sections.map((s) => getComputedStyle(s).backgroundColor);
      const freq: Record<string, number> = {};
      for (const bg of bgColors) freq[bg] = (freq[bg] || 0) + 1;
      const maxCount = Math.max(...Object.values(freq));
      if (maxCount / bgColors.length > 0.7) uniformBackgroundSections = true;
    }

    return {
      centeredHero,
      threeEqualCards,
      placeholderNames,
      roundNumbers,
      loremIpsum,
      marketingFluff,
      externalImages,
      bentoPretenderRows,
      consecutiveIdenticalGrids,
      uniformBackgroundSections,
    };
  });
}

test.describe('Anti-Slop Scan', () => {
  let report: SlopReport;

  test.beforeEach(async ({ page }) => {
    await page.goto('');
    await page.waitForTimeout(500);
    report = await scanForSlop(page);
  });

  test('no generic centered hero pattern', async () => {
    expect(
      report.centeredHero,
      'Centered hero (H1 + P + CTA) detected. Use asymmetric, split-screen, or editorial layout.'
    ).toBe(false);
  });

  test('no three-column equal card grid', async () => {
    expect(
      report.threeEqualCards,
      '3 equal-width cards with identical structure detected. Use bento grid, varied sizes, or list format.'
    ).toBe(false);
  });

  test('no placeholder names', async () => {
    expect(
      report.placeholderNames.length,
      `Placeholder names found: ${report.placeholderNames.join(', ')}. Use realistic, diverse names.`
    ).toBe(0);
  });

  test('no lorem ipsum', async () => {
    expect(report.loremIpsum, 'Lorem ipsum detected. Write real copy.').toBe(false);
  });

  test('no marketing fluff words', async () => {
    if (report.marketingFluff.length > 0) {
      expect(
        report.marketingFluff.length,
        `Marketing fluff: ${report.marketingFluff.join(', ')}. Use specific, concrete language.`
      ).toBe(0);
    }
  });

  test('no external placeholder images', async () => {
    expect(
      report.externalImages.length,
      `External placeholder images: ${report.externalImages.join(', ')}. Use CSS gradients or local SVG.`
    ).toBe(0);
  });

  test('minimal round numbers in data', async () => {
    // Warning only — some round numbers are legitimate
    if (report.roundNumbers.length > 2) {
      expect(
        report.roundNumbers.length,
        `${report.roundNumbers.length} round numbers: ${report.roundNumbers.join(', ')}. Use specific, odd numbers.`
      ).toBeLessThanOrEqual(2);
    }
  });

  test('no bento pretender grid rows (3+ equal-width items at rendered level)', async () => {
    expect(
      report.bentoPretenderRows,
      `${report.bentoPretenderRows} grid row(s) with 3+ equal-width items detected. ` +
        'True bento grids use varied column spans — avoid uniform card rows masquerading as bento.'
    ).toBe(0);
  });

  test('no consecutive sections with identical grid-template-columns', async () => {
    // Allow at most 1 consecutive match (some repetition is unavoidable)
    expect(
      report.consecutiveIdenticalGrids,
      `${report.consecutiveIdenticalGrids} consecutive section pair(s) share identical grid-template-columns. ` +
        'Vary layout structure between sections.'
    ).toBeLessThanOrEqual(1);
  });

  test('sections have varied background colors (rhythm)', async () => {
    expect(
      report.uniformBackgroundSections,
      'More than 70% of sections share the same background color. ' +
        'Alternate backgrounds (e.g., white/muted/dark) to create visual rhythm.'
    ).toBe(false);
  });
});
