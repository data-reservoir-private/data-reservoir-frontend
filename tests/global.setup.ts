import { clerk, clerkSetup } from '@clerk/testing/playwright';
import { test as setup } from '@playwright/test';

setup.describe.configure({ mode: 'serial' });

setup('global setup', async () => {
  await clerkSetup();
  if (
    !process.env.E2E_CLERK_USER_USERNAME ||
    !process.env.E2E_CLERK_USER_PASSWORD
  ) {
    throw new Error(
      "Please provide E2E_CLERK_USER_USERNAME and E2E_CLERK_USER_PASSWORD environment variables."
    );
  }
});

setup("authenticate", async ({ page }) => {
  setup.setTimeout(15_000);
  page.setDefaultNavigationTimeout(0);
  await page.goto('/');
  await clerk.signIn({
    page,
    signInParams: {
      strategy: "password",
      identifier: process.env.E2E_CLERK_USER_USERNAME ?? "",
      password: process.env.E2E_CLERK_USER_PASSWORD ?? ""
    }
  });
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.waitForSelector("#web-name:has-text('Data Reservoir')");
  await page.context().storageState({ path: './playwright/.auth/auth.json' });
});