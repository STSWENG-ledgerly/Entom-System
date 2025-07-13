const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');

jest.setTimeout(30000); // Increase timeout for browser startup and page load

describe('Login Page E2E (Selenium)', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost:3000'); // Update to your dev server if needed
  });

  afterAll(async () => {
    if (driver) await driver.quit();
  });

  it('logs in successfully and redirects to /MainMenu', async () => {
    await driver.findElement(By.css('input[placeholder="Username"]')).sendKeys('admin');
    await driver.findElement(By.css('input[placeholder="Admin Password"]')).sendKeys('admin123');
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.urlContains('/MainMenu'), 5000);
    const url = await driver.getCurrentUrl();
    expect(url).toContain('/MainMenu');
  });

  it('shows error for incorrect login', async () => {
    await driver.get('http://localhost:3000'); // reload login page

    await driver.findElement(By.css('input[placeholder="Username"]')).sendKeys('wrong');
    await driver.findElement(By.css('input[placeholder="Admin Password"]')).sendKeys('invalid');
    await driver.findElement(By.css('button[type="submit"]')).click();

    const errorSpan = await driver.wait(
      until.elementLocated(By.css('span')),
      5000
    );
    const errorText = await errorSpan.getText();
    expect(errorText.length).toBeGreaterThan(0);
  });
});
