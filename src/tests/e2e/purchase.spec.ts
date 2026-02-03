import { test, expect } from '@playwright/test';

import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage'; // Added this

// Import your data
import * as testData from '../../data/testData.json';

test('Full Purchase Flow with POM', async ({ page }) => {
  // Initialize Pages
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // 1. Start at Inventory using URL from JSON
  await page.goto(testData.urls.inventory);

  // 2. Add Items
  await inventoryPage.addItemsToCart();
  
  // Dynamically check count based on the number of products in your JSON array
  const productCount = testData.products.length.toString();
  await expect(inventoryPage.cartBadge).toHaveText(productCount);

  // 3. Go to Cart and Verify using product names from JSON
  await inventoryPage.goToCart();
  
  // Verify the first product from our JSON list is visible in the cart
  await expect(page.getByText(testData.products[0])).toBeVisible();

  // 4. Start Checkout
  await cartPage.proceedToCheckout();
  
  // 5. Fill Information using User Data from JSON
  await checkoutPage.fillInformation(
    testData.user.firstName,
    testData.user.lastName,
    testData.user.zipCode
  );

  // Final Assertion: Verify we moved to the overview step
  await expect(page).toHaveURL(/.*checkout-step-two/);
});