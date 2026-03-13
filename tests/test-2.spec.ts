import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.getByRole('link', { name: 'Export Data' }).click();
  await page.getByRole('button', { name: 'Open' }).first().click();
  await page.getByRole('option', { name: 'XLSX' }).click();
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.getByRole('button', { name: 'Export as xlsx' }).first()).toBeVisible();
  await expect(page.locator('body')).toContainText('Export as xlsx');
  await page.getByRole('button', { name: 'Open' }).first().click();
  await page.getByText('JSON', { exact: true }).click();
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByRole('button', { name: 'Export as json' }).first().click();
});