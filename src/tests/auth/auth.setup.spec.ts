import { test as setup, expect } from '@playwright/test';

// This line forces the setup to ignore the global storageState config
setup.use({ storageState: { cookies: [], origins: [] } });

setup('authenticate and save state', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  // Fill login
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Confirm login success
  await expect(page.getByText('Swag Labs')).toBeVisible();

  // Save authenticated state to storageState.json
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});
