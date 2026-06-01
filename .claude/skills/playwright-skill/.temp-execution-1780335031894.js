const { chromium } = require('playwright');

const BASE = 'http://localhost:3000';
const OUT = 'C:\\Users\\dnatn\\AppData\\Local\\Temp';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));

  // ---- Katakana page ----
  await page.setViewportSize({ width: 1440, height: 900 });
  const resp = await page.goto(`${BASE}/learn/katakana`, { waitUntil: 'networkidle', timeout: 30000 });
  console.log('Katakana HTTP status:', resp.status());
  console.log('Title:', await page.title());

  const h1 = (await page.locator('h1').first().innerText()).replace(/\s+/g, ' ').trim();
  console.log('H1:', h1);

  // Count kana cards (KanaCard renders a <button> with a font-jp char span)
  const cards = await page.locator('section button.group').count();
  console.log('Kana card count:', cards, cards === 46 ? 'OK' : 'EXPECTED 46');

  // Row headings
  const rows = await page.locator('h3').allInnerTexts();
  console.log('Row headings:', rows.join(', '));

  // First/last kana to confirm katakana glyphs
  const first = await page.locator('section button.group span.font-jp').first().innerText();
  const last = await page.locator('section button.group span.font-jp').last().innerText();
  console.log('First glyph:', first, '(expect ア)   Last glyph:', last, '(expect ン)');

  // Video iframe
  const iframeSrc = await page.locator('iframe').first().getAttribute('src');
  console.log('Video iframe src:', iframeSrc);

  // Resources
  const resLinks = await page.locator('ul a[target="_blank"]').count();
  console.log('Resource links:', resLinks);

  // Mark complete button interaction
  const btn = page.getByRole('button', { name: /mark/i });
  console.log('Mark-complete label before:', (await btn.innerText()).trim());
  await btn.click();
  await page.waitForTimeout(500);
  console.log('Mark-complete label after :', (await btn.innerText()).trim());
  console.log('aria-pressed after click:', await btn.getAttribute('aria-pressed'));

  await page.screenshot({ path: `${OUT}\\katakana-desktop.png`, fullPage: true });
  console.log('saved katakana-desktop.png');

  // Hover state on a card (visual sanity)
  await page.locator('section button.group').nth(5).hover();
  await page.waitForTimeout(250);

  // Mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE}/learn/katakana`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${OUT}\\katakana-mobile.png`, fullPage: true });
  console.log('saved katakana-mobile.png');

  // ---- Hiragana page (parity) ----
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${BASE}/learn/hiragana`, { waitUntil: 'networkidle' });
  const hcards = await page.locator('section button.group').count();
  console.log('Hiragana kana card count:', hcards);
  await page.screenshot({ path: `${OUT}\\hiragana-desktop.png`, fullPage: true });
  console.log('saved hiragana-desktop.png');

  console.log('\nConsole/page errors:', errors.length ? errors.join('\n') : 'none');
  await browser.close();
})();
