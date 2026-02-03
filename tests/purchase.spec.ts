import { test, expect } from '@playwright/test';

test('Login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // fill username
  await page.getByPlaceholder('Username').fill('standard_user');

    // fill password
  await page.getByPlaceholder('password').fill('secret_sauce');

      // submit
  await page.locator('[data-test="login-button"]').click();

  // Expect a title "to contain" a substring.
  await expect(page.getByText('Swag Labs')).toBeVisible();i

});