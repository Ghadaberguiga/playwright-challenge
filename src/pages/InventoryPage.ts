import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly backpackAddBtn: Locator;
  readonly bikeLightAddBtn: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backpackAddBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.bikeLightAddBtn = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addItemsToCart() {
    await this.backpackAddBtn.click();
    await this.bikeLightAddBtn.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}