import { test, expect } from '@playwright/test';

import { LoginPage } from '../../../pages/LoginPage';

// Import your data
import * as testData from '../../../data/testData.json';

test('Locked out user', async ({ page }) => {

  // Initialize Pages
  const loginpage = new LoginPage(page);
  
  // 1. Start at Inventory using URL from JSON
  await loginpage.goto();

  // 5. Fill Information using User Data from JSON
  await loginpage.login(
    testData.locked.username,
    testData.locked.password
    );

  // Confirm login success
  await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();

});