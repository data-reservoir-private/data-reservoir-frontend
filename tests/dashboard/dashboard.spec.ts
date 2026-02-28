import { setupClerkTestingToken } from "@clerk/testing/playwright";
import test, { expect } from "@playwright/test";

test.describe.configure({ mode: 'serial' });

test.describe('Dashboard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await setupClerkTestingToken({ page });
    await page.goto('/');
  });
  test('dashboard', async ({ page }) => {
    await page.waitForSelector("#title:has-text('Dashboard')");
  
    const text = await page.locator('#total-entries').innerText();
    expect(parseInt(text)).not.toBeNaN();
  });

  test('dashboard_2', async ({ page }) => {
    await page.waitForSelector("#title:has-text('Dashboard')");
  
    const text = await page.locator('#total-entries').innerText();
    expect(parseInt(text)).not.toBeNaN();
  });
  
});
