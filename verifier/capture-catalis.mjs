import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { resolve } from 'path';

const DIR = resolve(import.meta.dirname, 'snapshots/catalis-comparison');
mkdirSync(DIR, { recursive: true });

async function capture() {
  const browser = await chromium.launch();
  const viewportOpts = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 };

  // ── Reference: catalis-temlis.webflow.io ──
  console.log('Capturing reference (catalis-temlis.webflow.io)...');
  const refCtx = await browser.newContext(viewportOpts);
  const refPage = await refCtx.newPage();
  await refPage.goto('https://catalis-temlis.webflow.io/', { waitUntil: 'networkidle', timeout: 30000 });
  await refPage.waitForTimeout(3000);
  await refPage.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }' });
  await refPage.waitForTimeout(500);

  await refPage.screenshot({ path: `${DIR}/ref-hero.png` });
  await refPage.screenshot({ path: `${DIR}/ref-full.png`, fullPage: true });

  for (let i = 1; i <= 8; i++) {
    await refPage.evaluate((n) => window.scrollTo(0, window.innerHeight * n), i);
    await refPage.waitForTimeout(500);
    await refPage.screenshot({ path: `${DIR}/ref-scroll-${i}.png` });
  }
  await refCtx.close();

  // ── Ours: localhost:3000/catalis ──
  console.log('Capturing ours (localhost:3000/catalis)...');
  const ourCtx = await browser.newContext(viewportOpts);
  const ourPage = await ourCtx.newPage();
  await ourPage.goto('http://localhost:3000/catalis', { waitUntil: 'networkidle', timeout: 15000 });
  await ourPage.waitForTimeout(2000);
  await ourPage.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }' });
  await ourPage.waitForTimeout(500);

  await ourPage.screenshot({ path: `${DIR}/ours-hero.png` });
  await ourPage.screenshot({ path: `${DIR}/ours-full.png`, fullPage: true });

  for (let i = 1; i <= 8; i++) {
    await ourPage.evaluate((n) => window.scrollTo(0, window.innerHeight * n), i);
    await ourPage.waitForTimeout(500);
    await ourPage.screenshot({ path: `${DIR}/ours-scroll-${i}.png` });
  }
  await ourCtx.close();

  // ── Mobile comparison ──
  const mobileOpts = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 };

  console.log('Capturing reference mobile...');
  const refMCtx = await browser.newContext(mobileOpts);
  const refMPage = await refMCtx.newPage();
  await refMPage.goto('https://catalis-temlis.webflow.io/', { waitUntil: 'networkidle', timeout: 30000 });
  await refMPage.waitForTimeout(2000);
  await refMPage.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; }' });
  await refMPage.screenshot({ path: `${DIR}/ref-mobile.png`, fullPage: true });
  await refMCtx.close();

  console.log('Capturing ours mobile...');
  const ourMCtx = await browser.newContext(mobileOpts);
  const ourMPage = await ourMCtx.newPage();
  await ourMPage.goto('http://localhost:3000/catalis', { waitUntil: 'networkidle', timeout: 15000 });
  await ourMPage.waitForTimeout(2000);
  await ourMPage.addStyleTag({ content: '*, *::before, *::after { animation: none !important; transition: none !important; }' });
  await ourMPage.screenshot({ path: `${DIR}/ours-mobile.png`, fullPage: true });
  await ourMCtx.close();

  await browser.close();
  console.log(`Done! Screenshots saved to ${DIR}`);
}

capture().catch(console.error);
