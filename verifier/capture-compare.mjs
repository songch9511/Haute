import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { resolve } from 'path';

const DIR = resolve(import.meta.dirname, '../tests/red-team/framer-inspired/comparison');
mkdirSync(DIR, { recursive: true });

async function capture() {
  const browser = await chromium.launch();
  const viewportOpts = { viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2 };

  // ── Framer.com ──
  console.log('Capturing framer.com...');
  const fCtx = await browser.newContext(viewportOpts);
  const fPage = await fCtx.newPage();
  await fPage.goto('https://www.framer.com/', { waitUntil: 'networkidle', timeout: 30000 });
  await fPage.waitForTimeout(3000);
  await fPage.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }' });
  await fPage.waitForTimeout(500);

  await fPage.screenshot({ path: `${DIR}/framer-hero.png` });
  await fPage.screenshot({ path: `${DIR}/framer-full.png`, fullPage: true });

  for (let i = 1; i <= 5; i++) {
    await fPage.evaluate((n) => window.scrollTo(0, window.innerHeight * n), i);
    await fPage.waitForTimeout(400);
    await fPage.screenshot({ path: `${DIR}/framer-scroll-${i}.png` });
  }
  await fCtx.close();

  // ── Our showcase ──
  console.log('Capturing our showcase...');
  const oCtx = await browser.newContext(viewportOpts);
  const oPage = await oCtx.newPage();
  await oPage.goto('http://localhost:3000/showcase-framer', { waitUntil: 'networkidle', timeout: 15000 });
  await oPage.waitForTimeout(2000);
  await oPage.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }' });
  await oPage.waitForTimeout(500);

  await oPage.screenshot({ path: `${DIR}/ours-hero.png` });
  await oPage.screenshot({ path: `${DIR}/ours-full.png`, fullPage: true });

  for (let i = 1; i <= 5; i++) {
    await oPage.evaluate((n) => window.scrollTo(0, window.innerHeight * n), i);
    await oPage.waitForTimeout(400);
    await oPage.screenshot({ path: `${DIR}/ours-scroll-${i}.png` });
  }
  await oCtx.close();

  await browser.close();
  console.log('Done! Saved to ' + DIR);
}

capture().catch(console.error);
