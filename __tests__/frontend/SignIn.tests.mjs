import puppeteer from 'puppeteer';

describe('Frontend Page Loading and SignIn', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should load the homepage', async () => {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    const pageTitle = await page.title();
    expect(pageTitle).toBe('Learning Hub');
  });

  it('should trigger the SignIn modal, log in as Teacher, and navigate to dashboard', async () => {
    await page.evaluate(() => {
      const loginLink = Array.from(document.querySelectorAll('span')).find(
        el => el.textContent.trim() === 'Login'
      );
      if (loginLink) {
        loginLink.click();
      } else {
        console.error('Login link not found');
      }
    });

    // Wait for the modal to appear using the modal's container class
    await page.waitForSelector('._container_1oxjf_15', { visible: true });

    const buttonExists = await page.$('button._button_1oxjf_73'); 
    if (!buttonExists) {
      console.error('Log In button not found!');
      throw new Error('Log In button not found!');
    }

    // Fill in the email and password using the input's id
    await page.type('#email', 'test.teacher@example.com');
    await page.type('#password', 'password123');

    // Click the Log In button using its class
    await page.click('button._button_1oxjf_73');

    // Wait for the login process to complete and dashboard to load
    await page.waitForSelector('span._navLink_19plf_10', { visible: true, timeout: 10000 });

    // Click on the Dashboard link
    await page.evaluate(() => {
      const dashboardLink = Array.from(document.querySelectorAll('span._navLink_19plf_10')).find(
        el => el.textContent.trim() === 'Dashboard'
      );
      if (dashboardLink) {
        dashboardLink.click();
      } else {
        console.error('Dashboard link not found');
      }
    });

    // Wait for the dashboard to load
    await page.waitForSelector('h1', { visible: true, timeout: 10000 });
    
    const dashboardTitle = await page.$eval('h1', el => el.textContent);
    expect(dashboardTitle).toBeTruthy();

    const url = await page.url();
    expect(url).toBe('http://localhost:5173/teacher/dashboard');
  }, 60000); 
});
