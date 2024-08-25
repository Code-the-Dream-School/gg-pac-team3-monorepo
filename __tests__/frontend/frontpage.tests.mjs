import puppeteer from 'puppeteer';

describe('Frontend Page Loading', () => {
  let browser;
  let page;

  // Start the browser before all tests
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false, 
      slowMo: 100, 
    });
    page = await browser.newPage();
  });

  // Close the browser after all tests
  afterAll(async () => {
    await browser.close();
  });

  it('should load the homepage', async () => {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    const pageTitle = await page.title();
    expect(pageTitle).toBe('Vite + React'); 
  });

});
