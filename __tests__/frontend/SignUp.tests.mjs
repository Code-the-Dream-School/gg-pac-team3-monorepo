import puppeteer from 'puppeteer';

describe('Frontend Page Loading and SignUp', () => {
  let browser;
  let page;
  let testEmail;
  const baseUrl = 'http://localhost:5173/';

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
    });
    page = await browser.newPage();
    // Generate a unique email for each test run
    testEmail = `testuser${Date.now()}@example.com`;
  });

  afterAll(async () => {
    // Close the browser
    await browser.close();
  });

  it('should load the homepage', async () => {
    await page.goto(baseUrl, { waitUntil: 'networkidle2' });
    const pageTitle = await page.title();
    expect(pageTitle).toBe('Learning Hub');
  });

  it('should trigger the SignUp modal, register a new user, and verify successful registration', async () => {
    // Trigger the SignUp modal
    await page.evaluate(() => {
      const signUpLink = Array.from(document.querySelectorAll('span')).find(
        el => el.textContent.trim() === 'Register'
      );
      if (signUpLink) {
        signUpLink.click();
      } else {
        console.error('Register link not found');
      }
    });

    // Wait for the modal to appear using the modal's container class
    await page.waitForSelector('._container_1qrbo_14', { visible: true });

    // Fill in the registration details
    await page.type('#name', 'Test User');
    await page.type('#email', testEmail); 
    await page.type('#password', 'password123');
    await page.select('#userType', 'Teacher');

    // Click the Register button
    await page.click('button._registerButton_1qrbo_73');

    // Wait for the registration process to complete and check for success message
    await page.waitForSelector('p._successMessage_1qrbo_117', { visible: true, timeout: 10000 });
    const successMessage = await page.$eval('p._successMessage_1qrbo_117', el => el.textContent);
    expect(successMessage).toContain('You have registered successfully, please login.');
  }, 60000);
});
