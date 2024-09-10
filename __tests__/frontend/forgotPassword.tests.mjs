import puppeteer from 'puppeteer';

describe('Frontend Page Loading and Forgot Password', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false }); // Set to true for headless mode
    page = await browser.newPage();
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' }); // Ensure page is fully loaded
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should trigger the Forgot Password form, send a reset link, and verify success message', async () => {
    // Trigger the Login form
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

    // Wait for the SignIn modal to appear using the modal's container class
    await page.waitForSelector('._container_1oxjf_15', { visible: true });

    // Click the Forgot Password link within the SignIn form
    await page.evaluate(() => {
      const forgotPasswordLink = Array.from(document.querySelectorAll('a')).find(
        el => el.textContent.trim() === 'Forgot Password?'
      );
      if (forgotPasswordLink) {
        forgotPasswordLink.click();
      } else {
        console.error('Forgot Password link not found');
      }
    });

    // Wait for the Forgot Password form to appear
    await page.waitForSelector('div._pageContainer_1ad17_17', { visible: true });

    // Enter email and click Send Reset Link
    await page.type('input#email', 'edithharrison0422@gmail.com'); // Enter email
    await page.click('button._resetButton_1ad17_67'); // Click Send Reset Link button

    // Wait for and verify the success message or any response indicating success
    await page.waitForSelector('p._resendText_1ad17_41', { visible: true });
    const successMessage = await page.$eval('p._resendText_1ad17_41', el => el.textContent);
    expect(successMessage).toContain('Didn\'t receive the email?'); // Adjust based on actual message

    // Optionally, verify other texts or elements
    const resendLinkText = await page.$eval('a._resendLink_1ad17_90', el => el.textContent);
    expect(resendLinkText).toContain('Resend it');
  }, 10000); // Increase timeout to 10000 ms (10 seconds)
});
