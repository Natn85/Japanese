const { chromium } = require('playwright');
const TARGET = 'http://localhost:3000';
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Instrument speechSynthesis.speak to record calls
  await page.addInitScript(() => {
    window.__spoken = [];
    const orig = window.speechSynthesis.speak.bind(window.speechSynthesis);
    window.speechSynthesis.speak = (u) => {
      window.__spoken.push({ text: u.text, rate: u.rate, lang: u.lang });
      // don't actually call orig to avoid hanging on missing voices
    };
  });

  // --- Kana card click ---
  await page.goto(`${TARGET}/learn/hiragana`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Play pronunciation of あ/ }).click();
  await page.waitForTimeout(200);
  const kana = await page.evaluate(() => window.__spoken);
  console.log('KanaCard click ->', JSON.stringify(kana));

  // --- Pronounce page: Slow + Speak ---
  await page.goto(`${TARGET}/pronounce`, { waitUntil: 'networkidle' });
  await page.fill('#tts-input', 'ありがとう');
  await page.getByRole('button', { name: 'Slow' }).click();
  await page.getByRole('button', { name: /Speak/ }).click();
  await page.waitForTimeout(200);
  const pron = await page.evaluate(() => window.__spoken);
  console.log('Pronounce Slow Speak ->', JSON.stringify(pron));

  // --- Example chip ---
  await page.goto(`${TARGET}/pronounce`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /こんにちは/ }).click();
  await page.waitForTimeout(200);
  const chip = await page.evaluate(() => window.__spoken);
  console.log('Chip click ->', JSON.stringify(chip));

  await browser.close();
})();
