import { chromium } from '@playwright/test';

const COMPARE_DIR = __dirname;

async function capture() {
  const browser = await chromium.launch();

  // Capture framer.com
  console.log('Capturing framer.com...');
  const framerCtx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
  });
  const framerPage = await framerCtx.newPage();
  await framerPage.goto('https://www.framer.com/', { waitUntil: 'networkidle', timeout: 30000 });
  await framerPage.waitForTimeout(2000);
  // Disable animations for clean screenshots
  await framerPage.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; }' });
  await framerPage.waitForTimeout(500);

  // Hero viewport
  await framerPage.screenshot({ path: `${COMPARE_DIR}/framer-hero.png` });
  // Full page
  await framerPage.screenshot({ path: `${COMPARE_DIR}/framer-full.png`, fullPage: true });

  // Scroll to specific sections and capture
  await framerPage.evaluate(() => window.scrollTo(0, window.innerHeight));
  await framerPage.waitForTimeout(300);
  await framerPage.screenshot({ path: `${COMPARE_DIR}/framer-section2.png` });

  await framerPage.evaluate(() => window.scrollTo(0, window.innerHeight * 2));
  await framerPage.waitForTimeout(300);
  await framerPage.screenshot({ path: `${COMPARE_DIR}/framer-section3.png` });

  await framerPage.evaluate(() => window.scrollTo(0, window.innerHeight * 3));
  await framerPage.waitForTimeout(300);
  await framerPage.screenshot({ path: `${COMPARE_DIR}/framer-section4.png` });

  await framerCtx.close();

  // Capture our showcase
  console.log('Capturing our showcase...');
  const ourCtx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
  });
  const ourPage = await ourCtx.newPage();
  await ourPage.goto('http://localhost:3000/showcase-framer', { waitUntil: 'networkidle', timeout: 15000 });
  await ourPage.waitForTimeout(2000);
  await ourPage.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; }' });
  await ourPage.waitForTimeout(500);

  // Hero viewport
  await ourPage.screenshot({ path: `${COMPARE_DIR}/ours-hero.png` });
  // Full page
  await ourPage.screenshot({ path: `${COMPARE_DIR}/ours-full.png`, fullPage: true });

  await ourPage.evaluate(() => window.scrollTo(0, window.innerHeight));
  await ourPage.waitForTimeout(300);
  await ourPage.screenshot({ path: `${COMPARE_DIR}/ours-section2.png` });

  await ourPage.evaluate(() => window.scrollTo(0, window.innerHeight * 2));
  await ourPage.waitForTimeout(300);
  await ourPage.screenshot({ path: `${COMPARE_DIR}/ours-section3.png` });

  await ourPage.evaluate(() => window.scrollTo(0, window.innerHeight * 3));
  await ourPage.waitForTimeout(300);
  await ourPage.screenshot({ path: `${COMPARE_DIR}/ours-section4.png` });

  await ourCtx.close();
  await browser.close();
  console.log('Done! Screenshots saved to', COMPARE_DIR);
}

capture().catch(console.error);
