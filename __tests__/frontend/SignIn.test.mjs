import puppeteer from 'puppeteer';

describe('SignIn Page Test', () => {
  let browser;
  let page;

  // Start the browser before all tests
  beforeAll(async () => {
    try {
      browser = await puppeteer.launch({
        headless: false, // Set to true if you want to run in headless mode
        slowMo: 100, // Slows down Puppeteer operations so you can see what's happening
      });
      page = await browser.newPage();
    } catch (error) {
      console.error('Error setting up the browser:', error);
      throw error;
    }
  });

  // Close the browser after all tests
  afterAll(async () => {
    try {
      await browser.close();
    } catch (error) {
      console.error('Error closing the browser:', error);
    }
  });

  it('should load the SignIn page and submit the form successfully', async () => {
    try {
      // Navigate to the SignIn page
      await page.goto('http://localhost:5173/signin', { waitUntil: 'networkidle2' });

      // Check if the page title is correct
      const pageTitle = await page.title();
      expect(pageTitle).toBe('Sign In | Learning Hub'); // Adjust the expected title as necessary

      // Simulate user typing into the email and password input fields
      await page.type('input[id="email"]', 'test@example.com');
      await page.type('input[id="password"]', 'password123');

      // Simulate form submission by clicking the Log In button
      await page.click('button[type="button"]'); // Adjust the selector based on your button structure

      // Wait for any necessary navigation or page updates after form submission
      await page.waitForNavigation({ waitUntil: 'networkidle2' });

      // Optionally, check for a success message or redirection after successful login
      const url = await page.url();
      expect(url).toBe('http://localhost:5173/dashboard'); // Adjust based on your post-login redirection

    } catch (error) {
      console.error('Error during SignIn test:', error);
      throw error;
    }
  });

  it('should display an error message for invalid credentials', async () => {
    try {
      // Navigate to the SignIn page
      await page.goto('http://localhost:5173/signin', { waitUntil: 'networkidle2' });

      // Simulate user typing incorrect email and password
      await page.type('input[id="email"]', 'wronguser@example.com');
      await page.type('input[id="password"]', 'wrongpassword');

      // Simulate form submission
      await page.click('button[type="button"]'); // Adjust the selector as needed

      // Wait for the error message to be displayed
      await page.waitForSelector('.error-message'); // Adjust based on your error message class or id

      // Check if the error message is displayed
      const errorMessage = await page.$eval('.error-message', el => el.textContent);
      expect(errorMessage).toContain('Invalid credentials'); // Adjust the expected error message

    } catch (error) {
      console.error('Error during invalid credentials test:', error);
      throw error;
    }
  });
});
