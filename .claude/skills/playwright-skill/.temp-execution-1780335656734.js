
const { chromium, firefox, webkit, devices } = require('playwright');
const helpers = require('./lib/helpers');

// Extra headers from environment variables (if configured)
const __extraHeaders = helpers.getExtraHeadersFromEnv();

/**
 * Utility to merge environment headers into context options.
 * Use when creating contexts with raw Playwright API instead of helpers.createContext().
 * @param {Object} options - Context options
 * @returns {Object} Options with extraHTTPHeaders merged in
 */
function getContextOptionsWithHeaders(options = {}) {
  if (!__extraHeaders) return options;
  return {
    ...options,
    extraHTTPHeaders: {
      ...__extraHeaders,
      ...(options.extraHTTPHeaders || {})
    }
  };
}

(async () => {
  try {
    
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1024, height: 700 });
await page.goto('http://localhost:3000/learn/katakana', { waitUntil: 'networkidle' });
// scrollbar width = window.innerWidth - documentElement.clientWidth
const sbw = await page.evaluate(() => window.innerWidth - document.documentElement.clientWidth);
const before = await page.evaluate(() => window.scrollY);
await page.mouse.wheel(0, 1200);
await page.waitForTimeout(300);
const after = await page.evaluate(() => window.scrollY);
console.log('Scrollbar width (px):', sbw, sbw === 0 ? 'HIDDEN OK' : 'STILL VISIBLE');
console.log('scrollY before:', before, ' after wheel:', after, after > before ? 'SCROLL WORKS' : 'SCROLL BROKEN');
await browser.close();

  } catch (error) {
    console.error('❌ Automation error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
})();
