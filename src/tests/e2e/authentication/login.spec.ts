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

test('problem user', async ({ page }) => {

  // Initialize Pages
    const loginpage = new LoginPage(page);

  // 1. Start at Inventory using URL from JSON
    await loginpage.goto();

  // 5. Fill Information using User Data from JSON
    await loginpage.login(
    testData.problem.username,
    testData.problem.password
    );
        const start = Date.now(); // record start time

    // Confirm login succeeded
    await expect(page.getByText('Swag Labs')).toBeVisible();

    const end = Date.now(); // record end time

    // Calculate total time in milliseconds
    const loginTime = end - start;

    console.log('Login took (ms):', loginTime);

    //1️⃣ Get all product images
    const images = page.locator('.inventory_item_img img');

    //2️⃣ Extract all image src attributes
    const srcList = await images.evaluateAll(imgs => imgs.map(img => img.getAttribute('src')));
/*Example result:
[
    '/static/media/sl-404.168b1cce.jpg',
    '/static/media/sl-404.168b1cce.jpg',
    '/static/media/sl-404.168b1cce.jpg'
]
    */
   //3️⃣ Remove null values (safety step)
    const validSrcs = srcList.filter(Boolean);

    //4️⃣ Deletes duplicates
    const uniqueImages = new Set(validSrcs);

    console.log('Unique images:', Array.from(uniqueImages));
    console.log('Number of unique images:', uniqueImages.size);
    console.log('Total number of images:', validSrcs.length);

  // 5️⃣If there are fewer images than products → some images are reused
    expect(uniqueImages.size).toBeLessThan(validSrcs.length);

});

test('performance glitch user', async ({ page }) => {

    const start = Date.now(); // record start time

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
    await expect(page.getByText('Swag Labs')).toBeVisible();

    const end = Date.now(); // record end time

    // Calculate total time in milliseconds
    const loginTime = end - start;

    console.log('Login took (ms):', loginTime);

});

for (const password of testData.invalidPasswords) {
test(`Login fails with invalid password: ${password}`, async ({ page }) => {
  // Initialize Pages
    const loginpage = new LoginPage(page);

  // 1. Start at Inventory using URL from JSON
    await loginpage.goto();

  // 5. Fill Information using User Data from JSON
    await loginpage.login(
    testData.problem.username,
    password
    );

    await expect(page.getByText('Epic sadface: Username and password do not match')).toBeVisible();
})};