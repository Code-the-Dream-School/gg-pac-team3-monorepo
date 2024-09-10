import puppeteer from 'puppeteer';

describe('Frontend Page Loading', () => {
  let browser;
  let page;

  beforeAll(async () => {
    try {
      browser = await puppeteer.launch({
        headless: false,
        slowMo: 100,
      });
      page = await browser.newPage();
    } catch (error) {
      console.error('Error starting the browser:', error);
      throw error;
    }
  }, 10000);
  
  // Close the browser after all tests
  afterAll(async () => {
    try {
      await browser.close();
    } catch (error) {
      console.error('Error closing the browser:', error);
    }
  });

  it('should load the homepage', async () => {
    try {
      await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
      const pageTitle = await page.title();
      expect(pageTitle).toBe('Learning Hub'); 
    } catch (error) {
      console.error('Error during test:', error);
      throw error;
    }
  });
});

