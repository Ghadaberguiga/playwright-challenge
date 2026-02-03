import { type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.inventoryItems = page.locator('.inventory_item_name');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}